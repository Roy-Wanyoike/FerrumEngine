/**
 * Ferrum A11y — Reduced motion utilities.
 *
 * Detects the user's `prefers-reduced-motion` setting and provides
 * utilities to conditionally apply animations.
 *
 * @module ferrum-a11y/reduced-motion
 */

import { useState, useEffect } from 'react';
import type { ReducedMotionResult } from './types';

/**
 * Determine the user's motion preference.
 *
 * - `'full'`    — no preference or prefers reduced-motion: no-preference
 * - `'reduced'` — prefers-reduced-motion: reduce
 * - `'none'`    — no CSS media query match (SSR fallback)
 *
 * SSR-safe: returns `'none'` when `window` is unavailable.
 */
export function getReducedMotion(): 'full' | 'reduced' | 'none' {
  if (typeof window === 'undefined') return 'none';

  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mql.matches ? 'reduced' : 'full';
}

/**
 * Returns `false` when the user prefers reduced motion.
 *
 * @param preference - Explicit preference string; if omitted, detected
 *                     at call time via `getReducedMotion()`.
 */
export function shouldAnimate(preference?: string): boolean {
  const pref = preference ?? getReducedMotion();
  return pref !== 'reduced';
}

/**
 * Scale an animation duration based on the user's motion preference.
 *
 * - `'full'`    — returns `baseMs` unchanged.
 * - `'reduced'` — returns `0` (animations disabled).
 * - `'none'`    — returns `baseMs` unchanged (SSR / unknown).
 *
 * @param baseMs     - The intended duration in milliseconds.
 * @param preference - Explicit preference string; detected if omitted.
 */
export function getAnimationDuration(baseMs: number, preference?: string): number {
  const pref = preference ?? getReducedMotion();
  if (pref === 'reduced') return 0;
  return baseMs;
}

/**
 * React hook that reactively tracks the user's `prefers-reduced-motion`
 * preference.
 *
 * Attaches a `change` event listener on the matching `MediaQueryList`
 * so the component re-renders when the OS setting changes.
 */
export function useReducedMotion(): ReducedMotionResult {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');

    function handler(e: MediaQueryListEvent): void {
      setPrefersReduced(e.matches);
    }

    mql.addEventListener('change', handler);
    // Sync initial value (in case it changed between useState init and effect)
    setPrefersReduced(mql.matches);

    return () => {
      mql.removeEventListener('change', handler);
    };
  }, []);

  return {
    prefersReduced,
    theme: prefersReduced ? 'reduced' : 'full',
  };
}
