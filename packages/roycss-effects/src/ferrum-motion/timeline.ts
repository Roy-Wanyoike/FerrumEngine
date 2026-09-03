// Ferrum Motion — Timeline Composition

import type { TimelineSequence, TimelineOptions, TimelineController } from './types';
import { shouldReduceMotion } from './reduced-motion';

const DEFAULT_EASING = (t: number): number => t;

/** Create a timeline that sequences multiple animation steps */
export function timeline(
  sequences: TimelineSequence[],
  options?: TimelineOptions
): TimelineController {
  let state: TimelineController['state'] = 'idle';
  let rafId: number | null = null;
  let startTime: number | null = null;
  let currentTime = 0;
  let direction = 1; // 1 = forward, -1 = reverse

  // Compute cumulative offsets
  const offsets: number[] = [];
  let totalDuration = 0;
  for (const seq of sequences) {
    offsets.push(totalDuration + (seq.delay ?? 0));
    totalDuration += (seq.delay ?? 0) + seq.duration;
  }

  function applyFrame(timeMs: number): void {
    for (let i = 0; i < sequences.length; i++) {
      const seq = sequences[i]!;
      const start = offsets[i]!;
      const end = start + seq.duration;
      const easing = seq.easing ?? DEFAULT_EASING;

      if (timeMs >= start && timeMs <= end) {
        const localProgress = (timeMs - start) / seq.duration;
        seq.apply(easing(Math.min(1, Math.max(0, localProgress))));
      } else if (timeMs > end) {
        seq.apply(easing(1));
      } else {
        seq.apply(easing(0));
      }
    }
  }

  function tick(timestamp: number): void {
    if (state !== 'running') return;
    if (startTime === null) startTime = timestamp;

    const elapsed = (timestamp - startTime) * direction;
    currentTime = direction === 1
      ? Math.min(elapsed, totalDuration)
      : Math.max(elapsed, 0);

    applyFrame(currentTime);

    const done = direction === 1 ? currentTime >= totalDuration : currentTime <= 0;
    if (done) {
      state = 'finished';
      rafId = null;
      startTime = null;
      if (options?.loop) {
        if (options?.alternate) direction *= -1;
        play();
      } else {
        options?.onComplete?.();
      }
      return;
    }

    rafId = requestAnimationFrame(tick);
  }

  function play(): void {
    if (shouldReduceMotion()) {
      applyFrame(direction === 1 ? totalDuration : 0);
      state = 'finished';
      options?.onComplete?.();
      return;
    }
    state = 'running';
    startTime = null;
    rafId = requestAnimationFrame(tick);
  }

  return {
    play,
    pause(): void {
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
      state = 'paused';
    },
    reverse(): void {
      direction *= -1;
      if (state === 'idle' || state === 'finished') play();
    },
    seek(progress: number): void {
      const clamped = Math.min(1, Math.max(0, progress));
      currentTime = clamped * totalDuration;
      applyFrame(currentTime);
      state = 'paused';
    },
    get state() { return state; },
  };
}