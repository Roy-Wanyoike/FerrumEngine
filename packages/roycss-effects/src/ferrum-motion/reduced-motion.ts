// Ferrum Motion — Motion-specific Reduced Motion Handling
//
// Self-contained reduced-motion detection (inlined from ferrum-runtime
// as part of the RoyCSS extraction — ADR-011).

type ReducedMotionHandler = (reduced: boolean) => void;

let _listeners: ReducedMotionHandler[] = [];
let _cached: boolean | null = null;
let _mql: MediaQueryList | null = null;

/** Detect whether the user prefers reduced motion */
function detectReducedMotion(): boolean {
  if (_cached !== null) return _cached;
  if (typeof window === 'undefined') return false;
  _cached = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return _cached;
}

/** Subscribe to reduced-motion preference changes */
function onReducedMotionChange(handler: ReducedMotionHandler): () => void {
  _listeners.push(handler);

  if (!_mql && typeof window !== 'undefined') {
    _mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    _mql.addEventListener('change', (e) => {
      _cached = e.matches;
      for (const h of _listeners) h(_cached);
    });
  }

  return () => {
    _listeners = _listeners.filter(h => h !== handler);
  };
}

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
