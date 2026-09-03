/**
 * @module ferrum-studio/breakpoints
 * Responsive breakpoint definitions and utilities.
 * Provides predefined viewport breakpoints, active-breakpoint detection,
 * and per-element breakpoint style resolution.
 */

import type { Breakpoint, CanvasElement } from './types';

/**
 * Predefined responsive breakpoints for the studio canvas.
 * Ordered from smallest to largest viewport width.
 */
export const STUDIO_BREAKPOINTS: Breakpoint[] = [
  { name: 'mobile',  minWidth: 0,    maxWidth: 639,  isActive: false },
  { name: 'tablet',  minWidth: 640,  maxWidth: 1023, isActive: false },
  { name: 'desktop', minWidth: 1024, maxWidth: 1439, isActive: false },
  { name: 'wide',    minWidth: 1440, maxWidth: Infinity, isActive: false },
];

/**
 * Determine which breakpoints are active for a given canvas/viewport width.
 * A breakpoint is active if the width falls within its [minWidth, maxWidth] range.
 *
 * @param canvasWidth - The viewport width in pixels.
 * @returns An array of breakpoints with isActive correctly set.
 */
export function getActiveBreakpoints(canvasWidth: number): Breakpoint[] {
  return STUDIO_BREAKPOINTS.map((bp) => ({
    ...bp,
    isActive: canvasWidth >= bp.minWidth && canvasWidth <= bp.maxWidth,
  }));
}

/**
 * Resolve element styles for a specific breakpoint.
 * Looks for a `breakpointStyles` prop on the element containing
 * per-breakpoint style overrides.
 *
 * @param element - The canvas element.
 * @param breakpoint - The breakpoint name (e.g. 'mobile', 'desktop').
 * @returns Style overrides for the breakpoint, or an empty object.
 */
export function getElementBreakpointStyles(
  element: CanvasElement,
  breakpoint: string,
): Record<string, string> {
  // Breakpoint styles stored as a JSON string in props
  const raw = element.props['breakpointStyles'];
  if (typeof raw !== 'string') return {};

  try {
    const parsed = JSON.parse(raw) as Record<string, Record<string, string>>;
    return parsed[breakpoint] ?? {};
  } catch {
    return {};
  }
}
