// ─── Motion Class Mapping ────────────────────────────────────────────────────

const ANIMATION_MAP: Record<string, string> = {
  'fade-in': 'fr-fade-in',
  'fade-out': 'fr-fade-out',
  'slide-up': 'fr-slide-up',
  'slide-down': 'fr-slide-down',
  'slide-left': 'fr-slide-left',
  'slide-right': 'fr-slide-right',
  'scale-up': 'fr-scale-up',
  'scale-down': 'fr-scale-down',
  'bounce': 'fr-bounce',
  'pulse': 'fr-pulse',
  'shake': 'fr-shake',
  'spin': 'fr-spin',
  'fade-in-up': 'fr-fade-in-up',
  'fade-in-down': 'fr-fade-in-down',
  'fade-in-left': 'fr-fade-in-left',
  'fade-in-right': 'fr-fade-in-right',
  'zoom-in': 'fr-zoom-in',
  'zoom-out': 'fr-zoom-out',
  'flip': 'fr-flip',
  'rotate': 'fr-rotate',
  'swing': 'fr-swing',
  'rubber-band': 'fr-rubber-band',
  'jello': 'fr-jello',
  'heart-beat': 'fr-heart-beat',
  'wobble': 'fr-wobble',
};

/**
 * Returns an array of Ferrum CSS class names for the given motion type.
 *
 * @param type - Animation name (e.g. 'fade-in', 'slide-up')
 * @returns Array of CSS class names to apply
 *
 * @example
 * ```ts
 * getMotionClasses('fade-in');  // ['fr-fade-in']
 * getMotionClasses('unknown');  // ['unknown']
 * ```
 */
export function getMotionClasses(type: string): string[] {
  const className = ANIMATION_MAP[type] ?? type;
  return [className];
}

/**
 * SSR-safe check for `prefers-reduced-motion: reduce`.
 * Returns `false` when `window` is not available (server-side).
 */
export function getReducedMotionValue(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}