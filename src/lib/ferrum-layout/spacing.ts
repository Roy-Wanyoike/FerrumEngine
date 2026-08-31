/**
 * Ferrum Layout Engine — Spacing utilities.
 * 
 * Provides a spacing scale, gap/margin/padding helpers, and token
 * resolution for consistent spacing throughout layouts.
 */

/**
 * Full spacing scale with Tailwind-compatible values.
 * Includes the standard 0–96 scale (step 4) plus half-steps.
 */
export const SPACING_SCALE: Record<string, number> = {
  '0': 0,
  '0.5': 2,
  '1': 4,
  '1.5': 6,
  '2': 8,
  '2.5': 10,
  '3': 12,
  '3.5': 14,
  '4': 16,
  '5': 20,
  '6': 24,
  '7': 28,
  '8': 32,
  '9': 36,
  '10': 40,
  '11': 44,
  '12': 48,
  '14': 56,
  '16': 64,
  '20': 80,
  '24': 96,
};

/**
 * Converts a numeric value to a CSS gap string.
 * 
 * @param value - Gap in pixels
 * @returns CSS gap value string
 * 
 * @example
 * gap(16)  // => '16px'
 * gap(0)   // => '0px'
 */
export function gap(value: number): string {
  return `${value}px`;
}

/**
 * Generates a CSS margin property string.
 * 
 * @param value - Margin in pixels
 * @param direction - Direction to apply margin (default: 'all')
 * @returns CSS margin value or shorthand
 * 
 * @example
 * margin(16)          // => '16px'
 * margin(16, 'top')   // => '16px 0 0 0'
 * margin(8, 'x')      // => '0 8px 0 8px'
 * margin(8, 'y')      // => '8px 0 8px 0'
 */
export function margin(value: number, direction: string = 'all'): string {
  const v = `${value}px`;

  switch (direction) {
    case 'top':
      return `${v} 0 0 0`;
    case 'right':
      return `0 ${v} 0 0`;
    case 'bottom':
      return `0 0 ${v} 0`;
    case 'left':
      return `0 0 0 ${v}`;
    case 'x':
      return `0 ${v} 0 ${v}`;
    case 'y':
      return `${v} 0 ${v} 0`;
    default: // 'all'
      return v;
  }
}

/**
 * Generates a CSS padding property string.
 * 
 * @param value - Padding in pixels
 * @param direction - Direction to apply padding (default: 'all')
 * @returns CSS padding value or shorthand
 * 
 * @example
 * padding(16)          // => '16px'
 * padding(16, 'top')   // => '16px 0 0 0'
 * padding(8, 'x')      // => '0 8px 0 8px'
 * padding(8, 'y')      // => '8px 0 8px 0'
 */
export function padding(value: number, direction: string = 'all'): string {
  const v = `${value}px`;

  switch (direction) {
    case 'top':
      return `${v} 0 0 0`;
    case 'right':
      return `0 ${v} 0 0`;
    case 'bottom':
      return `0 0 ${v} 0`;
    case 'left':
      return `0 0 0 ${v}`;
    case 'x':
      return `0 ${v} 0 ${v}`;
    case 'y':
      return `${v} 0 ${v} 0`;
    default: // 'all'
      return v;
  }
}

/**
 * Resolves a spacing token string to its pixel value.
 * 
 * @param token - Spacing token (e.g. '4', '1.5', 'md')
 * @returns Pixel value if token is found, null otherwise
 * 
 * @example
 * resolveSpacing('4')     // => 16
 * resolveSpacing('1.5')   // => 6
 * resolveSpacing('24')    // => 96
 * resolveSpacing('md')    // => null
 */
export function resolveSpacing(token: string): number | null {
  if (token in SPACING_SCALE) {
    return SPACING_SCALE[token]!;
  }
  return null;
}
