// ─── Main Index ─────────────────────────────────────────────

export type { ModernCSSConfig, CascadeLayerOrder } from "./types";

export {
  generateCascadeLayerCSS,
} from "./cascade-layers";
export { generateContainerQueryCSS } from "./container-queries";
export { generateScrollDrivenCSS } from "./scroll-driven";
export { generateAnchorPositioningCSS } from "./anchor-positioning";
export { generateViewTransitionsCSS } from "./view-transitions";
export { generateScopeCSS } from "./scope";
export { generatePropertyDeclarations } from "./property-declarations";
export { generateScrollSnapCSS } from "./scroll-snap";
export { generateColorMixCSS } from "./color-mix";

import type { ModernCSSConfig } from "./types";
import { generatePropertyDeclarations } from "./property-declarations";
import { generateContainerQueryCSS } from "./container-queries";
import { generateScrollDrivenCSS } from "./scroll-driven";
import { generateAnchorPositioningCSS } from "./anchor-positioning";
import { generateViewTransitionsCSS } from "./view-transitions";
import { generateScopeCSS } from "./scope";
import { generateScrollSnapCSS } from "./scroll-snap";
import { generateColorMixCSS } from "./color-mix";
/**
 * Generate the complete modern CSS output.
 * Include this after the cascade layer declaration.
 *
 * @example
 * ```ts
 * import { generateModernCSS } from '@ferrum/modern-css';
 * const css = generateModernCSS();
 * ```
 */
export function generateModernCSS(config: ModernCSSConfig = {}): string {
  const sections: string[] = [
    generatePropertyDeclarations(config.prefix),
    "",
    generateContainerQueryCSS(config),
    "",
    generateScrollDrivenCSS(config),
    "",
    generateAnchorPositioningCSS(config),
    "",
    generateViewTransitionsCSS(config),
    "",
    generateScopeCSS(config),
    "",
    generateScrollSnapCSS(config),
    "",
    generateColorMixCSS(config),
  ];

  return sections.join("\n\n");
}