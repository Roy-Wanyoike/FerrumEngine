// ─── Re-export token modules and their types ─────────────────────────────────
export { colors, type HSLColor, type SemanticColors, type ColorScale } from "./tokens/colors";
export { spacing, type SpacingScale } from "./tokens/spacing";
export { radius, type RadiusScale } from "./tokens/radius";
export {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  type FontFamilyScale,
  type FontSizeScale,
  type FontWeightScale,
  type LineHeightScale,
  type LetterSpacingScale,
} from "./tokens/typography";
export { shadows, type ShadowValue, type ShadowScale } from "./tokens/elevation";
export { durations, easings, type DurationScale, type EasingScale } from "./tokens/motion";
export { breakpoints, type BreakpointScale } from "./tokens/breakpoints";
export { zIndex, type ZIndexScale } from "./tokens/z-index";
export { opacity, type OpacityScale } from "./tokens/opacity";

// ─── Re-export transform functions ───────────────────────────────────────────
export { tokensToCssVariables } from "./transforms/css";
export { tokensToTailwindConfig } from "./transforms/tailwind";
export { tokensToScssVariables } from "./transforms/scss";
export { tokensToJson } from "./transforms/json";
export { tokensToTypeScriptTypes } from "./transforms/typescript";

// ─── Import concrete values for aggregation ──────────────────────────────────
import { colors, type SemanticColors } from "./tokens/colors";
import { spacing, type SpacingScale } from "./tokens/spacing";
import { radius, type RadiusScale } from "./tokens/radius";
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  type FontFamilyScale,
  type FontSizeScale,
  type FontWeightScale,
  type LineHeightScale,
  type LetterSpacingScale,
} from "./tokens/typography";
import { shadows, type ShadowScale } from "./tokens/elevation";
import { durations, easings, type DurationScale, type EasingScale } from "./tokens/motion";
import { breakpoints, type BreakpointScale } from "./tokens/breakpoints";
import { zIndex, type ZIndexScale } from "./tokens/z-index";
import { opacity, type OpacityScale } from "./tokens/opacity";

// ─── Aggregated tokens object ───────────────────────────────────────────────

export interface FerrumTokens {
  colors: SemanticColors;
  spacing: SpacingScale;
  radius: RadiusScale;
  fontFamilies: FontFamilyScale;
  fontSizes: FontSizeScale;
  fontWeights: FontWeightScale;
  lineHeights: LineHeightScale;
  letterSpacings: LetterSpacingScale;
  shadows: ShadowScale;
  durations: DurationScale;
  easings: EasingScale;
  breakpoints: BreakpointScale;
  zIndex: ZIndexScale;
  opacity: OpacityScale;
}

export const ferrumTokens: FerrumTokens = {
  colors,
  spacing,
  radius,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  shadows,
  durations,
  easings,
  breakpoints,
  zIndex,
  opacity,
} as const;