// Ferrum Motion — Staggered Animations

import type { StaggerOptions } from './types';
import { shouldReduceMotion } from './reduced-motion';

const STAGGER_DEFAULTS: Required<StaggerOptions> = {
  delay: 50,
  direction: 'forward',
  startDelay: 0,
};

/** Run callbacks on an array of elements with staggered timing */
export function stagger<T>(
  items: T[],
  apply: (item: T, index: number) => void,
  options?: StaggerOptions
): () => void {
  const cfg = { ...STAGGER_DEFAULTS, ...options };
  const timers: ReturnType<typeof setTimeout>[] = [];

  if (shouldReduceMotion()) {
    // Apply all instantly
    for (let i = 0; i < items.length; i++) apply(items[i]!, i);
    return () => {};
  }

  function getDelay(index: number): number {
    const n = items.length;

    switch (cfg.direction) {
      case 'reverse':
        return cfg.startDelay + (n - 1 - index) * cfg.delay;
      case 'center': {
        const center = (n - 1) / 2;
        return cfg.startDelay + Math.abs(index - center) * cfg.delay;
      }
      case 'edges': {
        const center = (n - 1) / 2;
        return cfg.startDelay + (center - Math.abs(index - center)) * cfg.delay;
      }
      default: // forward
        return cfg.startDelay + index * cfg.delay;
    }
  }

  for (let i = 0; i < items.length; i++) {
    const idx = i;
    const timer = setTimeout(() => apply(items[idx]!, idx), getDelay(i));
    timers.push(timer);
  }

  return () => {
    for (const t of timers) clearTimeout(t);
  };
}

/** Chain multiple functions sequentially with delays */
export function chain(
  ...fns: Array<() => void | Promise<void>>
): { run: () => Promise<void> } {
  return {
    async run(): Promise<void> {
      for (const fn of fns) {
        await fn();
      }
    },
  };
}
