// Ferrum Motion — Motion-specific Reduced Motion Handling

import { detectReducedMotion, onReducedMotionChange } from '../ferrum-runtime/reduced-motion';

/** Return true if animations should be skipped/instant */
export function shouldReduceMotion(): boolean {
  return detectReducedMotion();
}

/** Get an instant (zero-duration) animation if reduced motion, else the real one */
export function instantOrAnimation<T extends { finished: Promise<unknown> }>(
  factory: () => T
): T {
  if (shouldReduceMotion()) {
    // Return a no-op animation that resolves immediately
    return { finished: Promise.resolve() } as T;
  }
  return factory();
}

/** Subscribe to reduced motion changes in motion context */
export function onMotionReducedChange(handler: (reduced: boolean) => void): () => void {
  return onReducedMotionChange(handler);
}
