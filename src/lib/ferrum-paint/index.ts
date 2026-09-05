/**
 * @fileoverview Ferrum Paint (Houdini) — public API
 *
 * Re-export stub — code moved to @roycss/effects (ADR-011)
 *
 * ```ts
 * import {
 *   registerFerrumPaintWorklets,
 *   isPaintAPISupported,
 *   FERRUM_WORKLET_NAMES,
 *   WORKLET_MODULES,
 *   getWorkletURL,
 *   getAllWorkletURLs,
 *   generatePaintCSS,
 * } from '@/lib/ferrum-paint';
 * ```
 */

export {
  registerFerrumPaintWorklets,
  isPaintAPISupported,
  getWorkletURL,
  getAllWorkletURLs,
  generatePaintCSS,
  FERRUM_WORKLET_NAMES,
  WORKLET_MODULES,
} from '@roycss/effects/ferrum-paint';

export type { FerrumWorkletName } from '@roycss/effects/ferrum-paint';
