// ─── Cascade Layers ──────────────────────────────────────────────
// Establishes the ferrum cascade layer order so consumers can
// interleave their own layers predictably.

import type { CascadeLayerOrder } from "./types";

const defaultLayerOrder: CascadeLayerOrder = {
  reset: "ferrum.reset",
  base: "ferrum.base",
  tokens: "ferrum.tokens",
  utilities: "ferrum.utilities",
  components: "ferrum.components",
  layouts: "ferrum.layouts",
  semantic: "ferrum.semantic",
  paint: "ferrum.paint",
  overrides: "ferrum.overrides",
};

/**
 * Generate the @layer declaration that establishes the ordering
 * of all FerrumCSS layers. Include this once in your root stylesheet.
 *
 * @example
 * ```css
 * @import "ferrumcss/layers.css";
 * @import "my-custom.css" layer(my-custom);
 * ```
 */
export function generateCascadeLayerCSS(
  order: Partial<CascadeLayerOrder> = {},
): string {
  const layers = { ...defaultLayerOrder, ...order };
  const layerNames = Object.values(layers);

  return `/* ═══════════════════════════════════════════════════
   FerrumCSS Cascade Layer Order
   Import this FIRST to establish layer priority.
   Your own styles go after — they win over all ferrum layers.
   ═══════════════════════════════════════════════════ */

@layer ${layerNames.join(", ")};

/* ─── Layer descriptions ─── */
/* ferrum.reset    — CSS reset / normalize          (lowest priority) */
/* ferrum.base     — Base element styles              */
/* ferrum.tokens   — Design token CSS variables       */
/* ferrum.utilities — Utility classes (spacing, etc.) */
/* ferrum.components — Reusable UI component styles   */
/* ferrum.layouts  — Page/section layout patterns     */
/* ferrum.semantic — Semantic class compositions      */
/* ferrum.paint    — Houdini Paint API backgrounds    */
/* ferrum.overrides — User/theme override layer       (highest priority) */`.trim();
}