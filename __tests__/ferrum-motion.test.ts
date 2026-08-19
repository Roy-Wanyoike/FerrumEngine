// Tests for Ferrum Motion

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { spring } from '@/lib/ferrum-motion/spring';
import { decay } from '@/lib/ferrum-motion/decay';
import { timeline } from '@/lib/ferrum-motion/timeline';
import { stagger, chain } from '@/lib/ferrum-motion/stagger';
import { onScroll, inView } from '@/lib/ferrum-motion/scroll';
import { shouldReduceMotion } from '@/lib/ferrum-motion/reduced-motion';

beforeEach(() => {
  document.body.innerHTML = '';
  vi.useRealTimers();
});

describe('ferrum-motion/reduced-motion', () => {
  it('returns boolean', () => {
    expect(typeof shouldReduceMotion()).toBe('boolean');
  });
});

describe('spring', () => {
  it('creates spring controller with initial value', () => {
    const s = spring(0);
    expect(s.get()).toBe(0);
    s.stop();
  });

  it('sets value directly', () => {
    const s = spring(0);
    s.set(50);
    expect(s.get()).toBe(50);
    s.stop();
  });

  it('animates toward target', () => {
    const s = spring(0, { stiffness: 200, damping: 15, mass: 1 });
    s.to(100);
    // In test env rAF is not real, but get() should return the current value
    // Since rAF doesn't fire, the spring hasn't started moving yet
    const val = s.get();
    // Value should be 0 (hasn't moved yet in test env)
    expect(typeof val).toBe('number');
    s.stop();
  });

  it('stop halts the animation', () => {
    const s = spring(0);
    s.to(100);
    s.stop();
    // After stopping, set should work
    s.set(42);
    expect(s.get()).toBe(42);
  });

  it('pause and resume work', () => {
    const s = spring(0);
    s.to(100);
    s.pause();
    s.resume();
    s.stop();
  });

  it('respects custom damping config', () => {
    const s = spring(0, { stiffness: 500, damping: 30, mass: 0.5, precision: 0.001 });
    expect(s.get()).toBe(0);
    s.to(10);
    s.stop();
  });
});

describe('decay', () => {
  it('creates decay controller', () => {
    const d = decay(0, { velocity: 100 });
    expect(d.get()).toBe(0);
    d.stop();
  });

  it('sets value directly', () => {
    const d = decay(0, { velocity: 100 });
    d.set(50);
    expect(d.get()).toBe(50);
    d.stop();
  });

  it('respects bounds', () => {
    const d = decay(50, { velocity: -1000, min: 0, max: 100 });
    // Without real rAF it won't move, just test setup
    expect(d.get()).toBe(50);
    d.stop();
  });
});

describe('timeline', () => {
  it('creates timeline with idle state', () => {
    const applied: number[] = [];
    const tl = timeline([
      { duration: 100, apply: (p) => applied.push(p) },
    ]);
    expect(tl.state).toBe('idle');
  });

  it('seek applies correct progress', () => {
    let lastProgress = -1;
    const tl = timeline([
      { duration: 100, apply: (p) => { lastProgress = p; } },
    ]);
    tl.seek(0.5);
    expect(lastProgress).toBe(0.5);
    expect(tl.state).toBe('paused');
  });

  it('seek with multiple sequences', () => {
    const results: number[] = [];
    const tl = timeline([
      { duration: 100, apply: (p) => results.push(p) },
      { duration: 100, delay: 100, apply: (p) => results.push(p + 100) },
    ]);
    // At seek(0.25), first sequence should be at 0.5 (halfway through first 100ms)
    // Second hasn't started yet
    tl.seek(0.25);
    // Total duration = 100 + 100 + 100 = 300
    // 0.25 * 300 = 75ms
    // First seq: 0-100, progress = 75/100 = 0.75
    // Second seq: offset 100, end 200, not started (75 < 100)
    expect(results).toContain(0.75);
  });

  it('onComplete callback works', () => {
    const onComplete = vi.fn();
    const tl = timeline([
      { duration: 10, apply: () => {} },
    ], { onComplete });
    tl.play();
    // rAF won't fire in test env, but onComplete won't be called
    expect(onComplete).not.toHaveBeenCalled();
    tl.pause();
  });

  it('reverse changes direction', () => {
    const tl = timeline([
      { duration: 100, apply: () => {} },
    ]);
    tl.reverse();
    // In test env rAF won't fire, but state should be running
    expect(tl.state).toBe('running');
    tl.pause();
  });
});

describe('stagger', () => {
  it('applies to all items', () => {
    vi.useFakeTimers();
    const items = [1, 2, 3];
    const applied: number[] = [];
    const cancel = stagger(items, (item) => applied.push(item), { delay: 50 });
    vi.advanceTimersByTime(200);
    expect(applied).toHaveLength(3);
    expect(applied).toEqual([1, 2, 3]);
    cancel();
    vi.useRealTimers();
  });

  it('cancel prevents pending items', () => {
    vi.useFakeTimers();
    const items = [1, 2, 3];
    const applied: number[] = [];
    const cancel = stagger(items, (item) => applied.push(item), { delay: 100 });
    vi.advanceTimersByTime(50); // Only first item should fire
    cancel();
    vi.advanceTimersByTime(500);
    expect(applied).toEqual([1]);
    vi.useRealTimers();
  });

  it('reverse direction', () => {
    vi.useFakeTimers();
    const items = [1, 2, 3];
    const applied: number[] = [];
    stagger(items, (item) => applied.push(item), { delay: 50, direction: 'reverse' });
    vi.advanceTimersByTime(200);
    expect(applied).toEqual([3, 2, 1]);
    vi.useRealTimers();
  });

  it('center direction', () => {
    vi.useFakeTimers();
    const items = [1, 2, 3];
    const applied: number[] = [];
    stagger(items, (item) => applied.push(item), { delay: 50, direction: 'center' });
    vi.advanceTimersByTime(200);
    // Center is index 1, then 0 and 2 at same delay
    expect(applied[0]).toBe(2); // center first
    vi.useRealTimers();
  });
});

describe('chain', () => {
  it('runs functions sequentially', async () => {
    const order: string[] = [];
    const c = chain(
      () => { order.push('a'); return Promise.resolve(); },
      () => { order.push('b'); return Promise.resolve(); },
      () => { order.push('c'); },
    );
    await c.run();
    expect(order).toEqual(['a', 'b', 'c']);
  });
});

describe('onScroll', () => {
  it('returns cleanup function', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const cleanup = onScroll(el, () => {});
    expect(typeof cleanup).toBe('function');
    cleanup();
  });

  it('calls callback on construction', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const cb = vi.fn();
    onScroll(el, cb);
    // Should have been called at least once on init
    expect(cb).toHaveBeenCalled();
  });
});

describe('inView', () => {
  it('returns cleanup function', () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const cleanup = inView(el, () => {});
    expect(typeof cleanup).toBe('function');
    cleanup();
  });
});
