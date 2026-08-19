// Ferrum Runtime — Reduced Motion Detection

import type { ReducedMotionHandler } from './types';

let listeners: ReducedMotionHandler[] = [];
let cached: boolean | null = null;
let mql: MediaQueryList | null = null;

/** Detect whether the user prefers reduced motion */
export function detectReducedMotion(): boolean {
  if (cached !== null) return cached;
  if (typeof window === 'undefined') return false;
  cached = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return cached;
}

/** Subscribe to reduced-motion preference changes */
export function onReducedMotionChange(handler: ReducedMotionHandler): () => void {
  listeners.push(handler);

  if (!mql && typeof window !== 'undefined') {
    mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    mql.addEventListener('change', (e) => {
      cached = e.matches;
      for (const h of listeners) h(cached);
    });
  }

  return () => {
    listeners = listeners.filter(h => h !== handler);
  };
}

/** Force-invalidate the cached value (useful in tests) */
export function resetReducedMotionCache(): void {
  cached = null;
}
