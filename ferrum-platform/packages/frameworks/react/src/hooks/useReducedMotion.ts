import { useState, useEffect } from 'react';

/**
 * Hook that returns whether the user prefers reduced motion.
 *
 * SSR-safe: defaults to `false` on the server.
 *
 * @example
 * ```tsx
 * const prefersReducedMotion = useReducedMotion();
 * if (prefersReducedMotion) {
 *   // Show a static version
 * }
 * ```
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial value
    setPrefersReducedMotion(mql.matches);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}