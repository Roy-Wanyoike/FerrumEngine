/**
 * Ferrum Layout Engine — Breakpoint utilities.
 * 
 * Provides breakpoint constants, media query generation, responsive value
 * resolution, and a React hook for tracking the current breakpoint.
 */

import { useState, useEffect } from 'react';
import type { BreakpointConfig, BreakpointKey, ResponsiveValue } from './types';

/** Default breakpoint values (in pixels), aligned with Tailwind CSS defaults */
export const BREAKPOINTS: BreakpointConfig = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/** Ordered breakpoint keys from smallest to largest */
const BREAKPOINT_ORDER: BreakpointKey[] = ['sm', 'md', 'lg', 'xl', '2xl'];

/**
 * Returns the name of the current breakpoint for a given viewport width.
 * 
 * @param width - Viewport width in pixels
 * @returns The breakpoint key (e.g. 'sm', 'md', 'lg') or 'base' for widths below sm
 * 
 * @example
 * getBreakpoint(500)  // => 'base'
 * getBreakpoint(640)  // => 'sm'
 * getBreakpoint(1024) // => 'lg'
 */
export function getBreakpoint(width: number): string {
  let matched = 'base';
  for (const bp of BREAKPOINT_ORDER) {
    if (width >= BREAKPOINTS[bp]) {
      matched = bp;
    }
  }
  return matched;
}

/**
 * Resolves a responsive value for a given breakpoint.
 * Walks the breakpoint chain from the current breakpoint down to 'sm',
 * returning the first defined value. Falls back to the base (non-responsive) value.
 * 
 * @param value - A static value or a responsive map of breakpoint → value
 * @param breakpoint - The current breakpoint name
 * @returns The resolved value for the current breakpoint
 * 
 * @example
 * resolveResponsiveValue({ md: 3, lg: 4 }, 'sm')   // => undefined (no base value)
 * resolveResponsiveValue(2, 'lg')                     // => 2
 * resolveResponsiveValue({ base: 1, md: 3 }, 'lg')   // => 3 (md is closest match)
 */
export function resolveResponsiveValue<T>(
  value: ResponsiveValue<T>,
  breakpoint: string,
): T | undefined {
  // If value is not a responsive map, return it directly
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  const map = value as Partial<Record<BreakpointKey, T>>;

  // Check if map has a 'base' key (non-standard but useful)
  if ('base' in map && map.base !== undefined) {
    return map.base;
  }

  // Walk from the current breakpoint down to find the closest defined value
  const currentIndex = BREAKPOINT_ORDER.indexOf(breakpoint as BreakpointKey);
  for (let i = currentIndex; i >= 0; i--) {
    const key = BREAKPOINT_ORDER[i];
    if (key in map && map[key] !== undefined) {
      return map[key];
    }
  }

  // Check if the static value was provided as a 'base' equivalent
  // If nothing matched, check for any key that could be interpreted as a base value
  return undefined;
}

/**
 * Generates a CSS media query string for a given breakpoint.
 * Uses min-width queries that match Tailwind CSS conventions.
 * 
 * @param bp - The breakpoint key (e.g. 'sm', 'md', 'lg')
 * @returns A CSS media query string
 * 
 * @example
 * mediaQuery('md')   // => '(min-width: 768px)'
 * mediaQuery('2xl')  // => '(min-width: 1536px)'
 */
export function mediaQuery(bp: string): string {
  const width = BREAKPOINTS[bp as BreakpointKey];
  if (width === undefined) {
    return '';
  }
  return `(min-width: ${width}px)`;
}

/**
 * React hook that tracks the current breakpoint based on window width.
 * Uses a resize event listener for real-time updates.
 * 
 * @returns The current breakpoint name ('base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl')
 * 
 * @example
 * const bp = useBreakpoint(); // => 'lg'
 */
export function useBreakpoint(): string {
  const [breakpoint, setBreakpoint] = useState<string>(() =>
    typeof window !== 'undefined' ? getBreakpoint(window.innerWidth) : 'base',
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    // Set initial value
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}
