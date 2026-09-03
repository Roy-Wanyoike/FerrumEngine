/**
 * @fileoverview Ferrum Paint Worklet registration utility.
 *
 * Provides feature detection for the CSS Paint API (Houdini) and a
 * convenience function to register all Ferrum paint worklets at once.
 *
 * @example
 * ```ts
 * import { registerFerrumPaintWorklets, isPaintAPISupported } from '@roycss/effects/ferrum-paint';
 *
 * if (isPaintAPISupported()) {
 *   registerFerrumPaintWorklets();
 * }
 * ```
 */

/**
 * List of all Ferrum paint worklet names.
 */
export const FERRUM_WORKLET_NAMES = [
  'ferrum-glow',
  'ferrum-glass',
  'ferrum-ripple',
  'ferrum-noise',
  'ferrum-gradient-mesh',
  'ferrum-confetti',
] as const;

/** Union type of all worklet names. */
export type FerrumWorkletName = (typeof FERRUM_WORKLET_NAMES)[number];

/**
 * Mapping from worklet name to its module file path (relative to this file).
 * These paths resolve to the actual JS files served from `/worklets/`.
 */
export const WORKLET_MODULES: Record<FerrumWorkletName, string> = {
  'ferrum-glow': 'ferrum-glow.js',
  'ferrum-glass': 'ferrum-glass.js',
  'ferrum-ripple': 'ferrum-ripple.js',
  'ferrum-noise': 'ferrum-noise.js',
  'ferrum-gradient-mesh': 'ferrum-gradient-mesh.js',
  'ferrum-confetti': 'ferrum-confetti.js',
};

/**
 * Check if the browser supports the CSS Paint API (Houdini `paintWorklet`).
 * Safe for SSR — returns `false` when `window` or `CSS` is unavailable.
 */
export function isPaintAPISupported(): boolean {
  if (typeof window === 'undefined') return false;
  const css = window.CSS as unknown as { paintWorklet?: { addModule: (url: string) => Promise<void> } } | undefined;
  return css != null && css.paintWorklet != null;
}

/**
 * Generate the URL for a specific worklet module.
 *
 * In production, worklets are copied to `public/worklets/` and served
 * as static files. In development, they may be served via the dev server.
 *
 * @param name - The worklet name (e.g. `'ferrum-glow'`)
 * @returns The absolute URL to the worklet JS file
 */
export function getWorkletURL(name: FerrumWorkletName): string {
  const filename = WORKLET_MODULES[name];
  return `/worklets/${filename}`;
}

/**
 * Get URLs for all Ferrum paint worklet modules.
 *
 * @returns Array of absolute URLs to all worklet JS files
 */
export function getAllWorkletURLs(): string[] {
  return FERRUM_WORKLET_NAMES.map(getWorkletURL);
}

/**
 * Register all Ferrum Paint worklets with the browser.
 *
 * This function:
 * 1. Checks for Paint API support (returns `false` if not supported)
 * 2. Loads all 6 worklet modules via `CSS.paintWorklet.addModule()`
 * 3. Returns a Promise that resolves when all modules are loaded
 *
 * @returns `true` if registration was attempted, `false` if Paint API is not supported
 * @throws If any worklet module fails to load
 *
 * @example
 * ```ts
 * const registered = registerFerrumPaintWorklets();
 * if (!registered) {
 *   console.warn('CSS Paint API not supported — using fallback styles');
 * }
 * ```
 */
export async function registerFerrumPaintWorklets(): Promise<boolean> {
  if (!isPaintAPISupported()) {
    return false;
  }

  const css = window.CSS as unknown as { paintWorklet: { addModule: (url: string) => Promise<void> } };
  const urls = getAllWorkletURLs();

  await Promise.all(urls.map((url) => css.paintWorklet.addModule(url)));
  return true;
}

/**
 * Generate CSS that uses `paint()` function values with `@supports` guards.
 *
 * This is useful for creating progressive-enhancement CSS where the paint
 * function is used when available, and a fallback is used otherwise.
 *
 * @param workletName - The registered paint worklet name
 * @param fallbackProperty - The CSS property to set (default: `'background'`)
 * @param fallbackValue - The CSS value to use as fallback
 * @returns A string of CSS rules
 *
 * @example
 * ```ts
 * const css = generatePaintCSS('ferrum-glow', 'background', '#1a1a2e');
 * // Returns:
 * // @supports (background: paint(id)) {
 * //   .ferrum-glow-element { background: paint(ferrum-glow); }
 * // }
 * ```
 */
export function generatePaintCSS(
  workletName: FerrumWorkletName,
  fallbackProperty = 'background',
  fallbackValue = 'transparent',
): string {
  const supportsQuery = `@supports (${fallbackProperty}: paint(id)) {
  .ferrum-${workletName.replace('ferrum-', '')}-element {
    ${fallbackProperty}: paint(${workletName});
  }
}

.ferrum-${workletName.replace('ferrum-', '')}-element {
  ${fallbackProperty}: ${fallbackValue};
}`;
  return supportsQuery;
}
