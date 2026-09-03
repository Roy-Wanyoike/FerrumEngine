/**
 * @fileoverview Ferrum Paint (Houdini) — public API
 *
 * Re-exports the registration utilities and worklet metadata so consumers
 * can import from a single entry point:
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
 * } from '@roycss/effects/ferrum-paint';
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
} from './register';

export type { FerrumWorkletName } from './register';
