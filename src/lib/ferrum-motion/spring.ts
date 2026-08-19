// Ferrum Motion — Spring Physics (Damped Harmonic Oscillator)
// F = -kx - cv  where k = stiffness, c = damping, v = velocity

import type { SpringConfig, SpringController } from './types';
import { shouldReduceMotion } from './reduced-motion';

const DEFAULT_CONFIG: Required<Pick<SpringConfig, 'stiffness' | 'damping' | 'mass' | 'precision' | 'velocity'>> = {
  stiffness: 100,
  damping: 10,
  mass: 1,
  precision: 0.01,
  velocity: 0,
};

/** Create a spring-animated value with real damped harmonic oscillator physics */
export function spring(value: number, config?: SpringConfig): SpringController {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  let current = value;
  let velocity = cfg.velocity;
  let target = value;
  let rafId: number | null = null;
  let running = false;
  let lastTime: number | null = null;

  function step(timestamp: number): void {
    if (!running) return;
    if (lastTime === null) lastTime = timestamp;
    const dt = Math.min((timestamp - lastTime) / 1000, 0.064); // cap at ~64ms
    lastTime = timestamp;

    // Damped harmonic oscillator: F = -kx - cv
    // a = F/m = (-k*(x-t) - c*v) / m
    const displacement = current - target;
    const springForce = -cfg.stiffness * displacement;
    const dampingForce = -cfg.damping * velocity;
    const acceleration = (springForce + dampingForce) / cfg.mass;

    // Semi-implicit Euler integration
    velocity += acceleration * dt;
    current += velocity * dt;

    // Check if settled
    const isSettled =
      Math.abs(velocity) < cfg.precision &&
      Math.abs(current - target) < cfg.precision;

    if (isSettled) {
      current = target;
      velocity = 0;
      running = false;
      rafId = null;
      lastTime = null;
      return;
    }

    rafId = requestAnimationFrame(step);
  }

  function start(): void {
    if (running) return;
    if (shouldReduceMotion()) {
      current = target;
      velocity = 0;
      return;
    }
    running = true;
    lastTime = null;
    rafId = requestAnimationFrame(step);
  }

  function stop(): void {
    running = false;
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
    lastTime = null;
  }

  return {
    to(_t: number): Animation {
      target = _t;
      start();
      // Return a minimal stub that satisfies the Animation interface
      return {
        finished: Promise.resolve(),
        currentTime: 0,
        playState: 'finished',
        cancel() {},
        finish() {},
        pause() {},
        play() {},
        reverse() {},
      } as unknown as Animation;
    },
    set(v: number): void {
      stop();
      current = v;
      velocity = 0;
    },
    get(): number {
      return current;
    },
    pause(): void {
      stop();
    },
    resume(): void {
      start();
    },
    stop(): void {
      stop();
    },
  };
}
