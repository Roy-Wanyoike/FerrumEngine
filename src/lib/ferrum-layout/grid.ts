/**
 * Ferrum Layout Engine — Grid layout utilities.
 * 
 * Generates Tailwind-compatible class strings and CSS property objects
 * for CSS Grid layouts, including auto-fit responsive grids.
 */

import type { GridConfig, GapPreset, ResponsiveValue } from './types';

/** Named gap presets mapping to pixel values */
export const GAP_PRESETS: Record<GapPreset, number> = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
};

/** Tailwind gap class mapping */
const GAP_CLASSES: Record<GapPreset, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
};

/** Tailwind grid-cols class for common column counts */
const COL_CLASSES: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
};

/** Tailwind responsive grid-cols class prefixes */
const RESPONSIVE_COL_CLASSES: Record<string, Record<number, string>> = {
  sm: { 1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4', 6: 'sm:grid-cols-6' },
  md: { 1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4', 5: 'md:grid-cols-5', 6: 'md:grid-cols-6' },
  lg: { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5', 6: 'lg:grid-cols-6' },
  xl: { 3: 'xl:grid-cols-3', 4: 'xl:grid-cols-4', 5: 'xl:grid-cols-5', 6: 'xl:grid-cols-6' },
  '2xl': { 4: '2xl:grid-cols-4', 5: '2xl:grid-cols-5', 6: '2xl:grid-cols-6' },
};

/**
 * Generates a Tailwind-compatible class string for a grid layout.
 * 
 * @param config - Grid configuration
 * @returns Space-separated Tailwind CSS classes
 * 
 * @example
 * gridClass({ cols: 3, gap: 'md' })
 * // => 'grid gap-4 grid-cols-3'
 * 
 * gridClass({ cols: 1, gap: 'sm', minChildWidth: 250 })
 * // => 'grid gap-2 auto-grid-[250px]'
 */
export function gridClass(config: GridConfig): string {
  const classes: string[] = ['grid'];

  // Handle auto-fit grid
  if (config.minChildWidth !== undefined) {
    classes.push(`auto-grid-[${config.minChildWidth}px]`);
  } else if (typeof config.cols === 'number') {
    const colClass = COL_CLASSES[config.cols];
    if (colClass) {
      classes.push(colClass);
    }
  } else if (typeof config.cols === 'object' && config.cols !== null) {
    // Responsive cols — use base or first defined value
    const colsMap = config.cols as Partial<Record<string, number>>;
    if (colsMap.base !== undefined && COL_CLASSES[colsMap.base]) {
      classes.push(COL_CLASSES[colsMap.base]);
    } else {
      // Default to 1 col at base
      classes.push('grid-cols-1');
    }
    // Add responsive prefixes
    for (const [bp, count] of Object.entries(colsMap)) {
      if (bp === 'base') continue;
      const bpClasses = RESPONSIVE_COL_CLASSES[bp];
      if (bpClasses && count !== undefined && bpClasses[count]) {
        classes.push(bpClasses[count]);
      }
    }
  }

  // Gap
  if (config.gap !== undefined) {
    if (typeof config.gap === 'string' && config.gap in GAP_CLASSES) {
      classes.push(GAP_CLASSES[config.gap as GapPreset]);
    } else if (typeof config.gap === 'number') {
      classes.push(`gap-[${config.gap}px]`);
    }
  }

  return classes.join(' ');
}

/**
 * Generates a class string for an auto-fit/auto-fill grid.
 * Uses CSS Grid's `auto-fill` with `minmax()` for responsive columns
 * without media queries.
 * 
 * @param minChildWidth - Minimum width of each child in pixels
 * @param gap - Optional gap value (preset name or pixel value)
 * @returns Space-separated Tailwind CSS classes
 * 
 * @example
 * autoGridClass(250, 'md')
 * // => 'grid gap-4 auto-grid-[250px]'
 */
export function autoGridClass(minChildWidth: number, gap?: GapPreset | number): string {
  const classes: string[] = ['grid', `auto-grid-[${minChildWidth}px]`];

  if (gap !== undefined) {
    if (typeof gap === 'string' && gap in GAP_CLASSES) {
      classes.push(GAP_CLASSES[gap as GapPreset]);
    } else if (typeof gap === 'number') {
      classes.push(`gap-[${gap}px]`);
    }
  }

  return classes.join(' ');
}

/**
 * Generates CSS properties object for grid-template-columns.
 * Useful when you need dynamic column values in a style prop.
 * 
 * @param cols - Number of columns (static or responsive map)
 * @param currentBreakpoint - Current breakpoint for resolving responsive values
 * @returns CSS properties object suitable for a React style prop
 * 
 * @example
 * gridTemplateColumns(3)
 * // => { gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }
 */
export function gridTemplateColumns(
  cols: ResponsiveValue<number>,
  currentBreakpoint?: string,
): Record<string, string> {
  let colCount: number;

  if (typeof cols === 'number') {
    colCount = cols;
  } else if (currentBreakpoint) {
    // Importing resolveResponsiveValue would create a circular dep if done at module level
    // so we inline the resolution logic here
    const map = cols as Partial<Record<string, number>>;
    if (map.base !== undefined) {
      colCount = map.base;
    } else {
      // Walk from current breakpoint down to smallest
      const order = ['2xl', 'xl', 'lg', 'md', 'sm'];
      const idx = order.indexOf(currentBreakpoint);
      colCount = 1; // default
      // Search from the current breakpoint index upward (toward smaller bps)
      for (let i = idx; i < order.length; i++) {
        const key = order[i];
        if (key in map && map[key] !== undefined) {
          colCount = map[key]!;
          break;
        }
      }
    }
  } else {
    // No breakpoint provided, try to use base or first entry
    const map = cols as Partial<Record<string, number>>;
    colCount = map.base ?? 1;
  }

  return {
    gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
  };
}
