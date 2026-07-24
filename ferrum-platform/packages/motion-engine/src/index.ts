/**
 * @ferrum/motion-engine — Universal Motion Engine
 *
 * The intelligence layer for motion in the Ferrum design system.
 * Provides semantic tokens, recipes, composition, presets, timeline,
 * semantic motion, hover, text, cursor, morph, depth, attention,
 * interaction, shape, and glass effects.
 */

import type { MotionConfig } from "./types";
import { minifyCSS } from "./types";
import { generateMotionTokensCSS } from "./tokens";
import { generateMotionRecipesCSS } from "./recipes";
import { generateCompositionCSS } from "./composition";
import { generateMotionPresetsCSS } from "./presets";
import { generateTimelineCSS } from "./timeline";
import { generateSemanticCSS } from "./semantic";
import { generateHoverCSS } from "./hover";
import { generateTextCSS } from "./text";
import { generateCursorCSS } from "./cursor";
import { generateMorphCSS } from "./morph";
import { generateDepthCSS } from "./depth";
import { generateAttentionCSS } from "./attention";
import { generateInteractionCSS } from "./interaction";
import { generateShapeCSS } from "./shape";
import { generateGlassCSS } from "./glass";

export type { MotionConfig } from "./types";
export { minifyCSS } from "./types";
export { MOTION_TOKENS } from "./tokens";
export { generateMotionTokensCSS } from "./tokens";
export { generateMotionRecipesCSS } from "./recipes";
export { generateCompositionCSS } from "./composition";
export { generateMotionPresetsCSS } from "./presets";
export { generateTimelineCSS } from "./timeline";
export { generateSemanticCSS } from "./semantic";
export { generateHoverCSS } from "./hover";
export { generateTextCSS } from "./text";
export { generateCursorCSS } from "./cursor";
export { generateMorphCSS } from "./morph";
export { generateDepthCSS } from "./depth";
export { generateAttentionCSS } from "./attention";
export { generateInteractionCSS } from "./interaction";
export { generateShapeCSS } from "./shape";
export { generateGlassCSS } from "./glass";

export interface MotionEngineConfig extends MotionConfig {
  includeTokens?: boolean;
  includeRecipes?: boolean;
  includeComposition?: boolean;
  includePresets?: boolean;
  includeTimeline?: boolean;
  includeSemantic?: boolean;
  includeHover?: boolean;
  includeText?: boolean;
  includeCursor?: boolean;
  includeMorph?: boolean;
  includeDepth?: boolean;
  includeAttention?: boolean;
  includeInteraction?: boolean;
  includeShape?: boolean;
  includeGlass?: boolean;
}

/**
 * Generate the complete motion-engine CSS output.
 *
 * @example
 * ```ts
 * import { generateMotionEngineCSS } from "@ferrum/motion-engine";
 *
 * // Everything
 * const allCSS = generateMotionEngineCSS();
 *
 * // Selective
 * const selective = generateMotionEngineCSS({
 *   includeTokens: true,
 *   includeRecipes: true,
 *   includePresets: true,
 * });
 * ```
 */
export function generateMotionEngineCSS(config: MotionEngineConfig = {}): string {
  const opts: Required<MotionEngineConfig> = {
    minify: false,
    prefix: "fr",
    includeTokens: true,
    includeRecipes: true,
    includeComposition: true,
    includePresets: true,
    includeTimeline: true,
    includeSemantic: true,
    includeHover: true,
    includeText: true,
    includeCursor: true,
    includeMorph: true,
    includeDepth: true,
    includeAttention: true,
    includeInteraction: true,
    includeShape: true,
    includeGlass: true,
    ...config,
  };

  const sections: string[] = [];

  if (opts.includeTokens) sections.push(generateMotionTokensCSS({ minify: false, prefix: opts.prefix }));
  if (opts.includeRecipes) sections.push(generateMotionRecipesCSS({ minify: false, prefix: opts.prefix }));
  if (opts.includeComposition) sections.push(generateCompositionCSS({ minify: false, prefix: opts.prefix }));
  if (opts.includePresets) sections.push(generateMotionPresetsCSS({ minify: false, prefix: opts.prefix }));
  if (opts.includeTimeline) sections.push(generateTimelineCSS({ minify: false, prefix: opts.prefix }));
  if (opts.includeSemantic) sections.push(generateSemanticCSS({ minify: false, prefix: opts.prefix }));
  if (opts.includeHover) sections.push(generateHoverCSS(opts.prefix));
  if (opts.includeText) sections.push(generateTextCSS(opts.prefix));
  if (opts.includeCursor) sections.push(generateCursorCSS(opts.prefix));
  if (opts.includeMorph) sections.push(generateMorphCSS(opts.prefix));
  if (opts.includeDepth) sections.push(generateDepthCSS(opts.prefix));
  if (opts.includeAttention) sections.push(generateAttentionCSS(opts.prefix));
  if (opts.includeInteraction) sections.push(generateInteractionCSS(opts.prefix));
  if (opts.includeShape) sections.push(generateShapeCSS(opts.prefix));
  if (opts.includeGlass) sections.push(generateGlassCSS(opts.prefix));

  const combined = sections.join("\n\n");

  return opts.minify ? minifyCSS(combined) : combined;
}