interface HSLColor {
    h: number;
    s: number;
    l: number;
}
type ColorScale = {
    DEFAULT: HSLColor;
    50: HSLColor;
    100: HSLColor;
    200: HSLColor;
    300: HSLColor;
    400: HSLColor;
    500: HSLColor;
    600: HSLColor;
    700: HSLColor;
    800: HSLColor;
    900: HSLColor;
    950: HSLColor;
};
interface SemanticColors {
    primary: ColorScale;
    secondary: ColorScale;
    accent: ColorScale;
    success: ColorScale;
    warning: ColorScale;
    danger: ColorScale;
    info: ColorScale;
    muted: ColorScale;
    foreground: ColorScale;
    background: ColorScale;
    border: ColorScale;
    card: ColorScale;
    popover: ColorScale;
    ring: ColorScale;
    input: ColorScale;
    destructive: ColorScale;
}
declare const colors: SemanticColors;

type SpacingScale = {
    0: string;
    px: string;
    0.5: string;
    1: string;
    1.5: string;
    2: string;
    2.5: string;
    3: string;
    3.5: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    11: string;
    12: string;
    14: string;
    16: string;
    20: string;
    24: string;
    28: string;
    32: string;
    36: string;
    40: string;
    44: string;
    48: string;
    52: string;
    56: string;
    60: string;
    64: string;
    72: string;
    80: string;
    96: string;
};
declare const spacing: SpacingScale;

type RadiusScale = {
    none: string;
    sm: string;
    DEFAULT: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    full: string;
};
declare const radius: RadiusScale;

type FontFamilyScale = {
    sans: string;
    mono: string;
    serif: string;
};
type FontSizeScale = {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
    "5xl": string;
};
type FontWeightScale = {
    thin: number;
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
    extrabold: number;
    black: number;
};
type LineHeightScale = {
    none: number;
    tight: number;
    snug: number;
    normal: number;
    relaxed: number;
    loose: number;
};
type LetterSpacingScale = {
    tighter: string;
    tight: string;
    normal: string;
    wide: string;
    wider: string;
    widest: string;
};
declare const fontFamilies: FontFamilyScale;
declare const fontSizes: FontSizeScale;
declare const fontWeights: FontWeightScale;
declare const lineHeights: LineHeightScale;
declare const letterSpacings: LetterSpacingScale;

interface ShadowLayer {
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: string;
    opacity: number;
}
type ShadowValue = ShadowLayer[];
interface ShadowScale {
    sm: ShadowValue;
    DEFAULT: ShadowValue;
    md: ShadowValue;
    lg: ShadowValue;
    xl: ShadowValue;
    "2xl": ShadowValue;
    inner: ShadowValue;
}
declare const shadows: ShadowScale;

type DurationScale = {
    instant: string;
    fast: string;
    normal: string;
    slow: string;
    slower: string;
    slugish: string;
};
type EasingScale = {
    default: string;
    in: string;
    out: string;
    inOut: string;
    bounceIn: string;
    bounceOut: string;
    spring: string;
    sharp: string;
    gentle: string;
};
declare const durations: DurationScale;
declare const easings: EasingScale;

type BreakpointScale = {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
};
declare const breakpoints: BreakpointScale;

type ZIndexScale = {
    hide: number;
    dropdown: number;
    sticky: number;
    fixed: number;
    modal: number;
    popover: number;
    tooltip: number;
    skipLink: number;
};
declare const zIndex: ZIndexScale;

type OpacityScale = {
    0: number;
    5: number;
    10: number;
    15: number;
    20: number;
    25: number;
    30: number;
    35: number;
    40: number;
    45: number;
    50: number;
    55: number;
    60: number;
    65: number;
    70: number;
    75: number;
    80: number;
    85: number;
    90: number;
    95: number;
    100: number;
};
declare const opacity: OpacityScale;

/**
 * Converts the entire token set to CSS custom properties under :root.
 *
 * @param allTokens - The aggregated ferrumTokens object
 * @returns Complete CSS string with :root selector
 */
declare function tokensToCssVariables(allTokens: Record<string, unknown>): string;

/**
 * Converts the entire token set to a Tailwind CSS compatible theme config.
 *
 * @param allTokens - The aggregated ferrumTokens object
 * @returns A JavaScript object ready to merge into a Tailwind config
 */
declare function tokensToTailwindConfig(allTokens: Record<string, unknown>): Record<string, unknown>;

/**
 * Converts the entire token set to SCSS $variable declarations.
 *
 * @param allTokens - The aggregated ferrumTokens object
 * @returns Complete SCSS string with $variable declarations
 */
declare function tokensToScssVariables(allTokens: Record<string, unknown>): string;

/**
 * Serializes all tokens to a flat JSON object with dot-notation keys.
 *
 * @param allTokens - The aggregated ferrumTokens object
 * @returns A flat JSON-compatible object where keys use dot notation
 *   (e.g., "colors.primary.500", "spacing.4")
 */
declare function tokensToJson(allTokens: Record<string, unknown>): Record<string, unknown>;

/**
 * Generates TypeScript const declarations with `as const` assertions and
 * corresponding type definitions from the token set.
 *
 * @param allTokens - The aggregated ferrumTokens object
 * @returns An object with `declarations` (const strings) and `types` (type strings)
 */
declare function tokensToTypeScriptTypes(allTokens: Record<string, unknown>): {
    declarations: string;
    types: string;
};

interface FerrumTokens {
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
declare const ferrumTokens: FerrumTokens;

export { type BreakpointScale, type ColorScale, type DurationScale, type EasingScale, type FerrumTokens, type FontFamilyScale, type FontSizeScale, type FontWeightScale, type HSLColor, type LetterSpacingScale, type LineHeightScale, type OpacityScale, type RadiusScale, type SemanticColors, type ShadowScale, type ShadowValue, type SpacingScale, type ZIndexScale, breakpoints, colors, durations, easings, ferrumTokens, fontFamilies, fontSizes, fontWeights, letterSpacings, lineHeights, opacity, radius, shadows, spacing, tokensToCssVariables, tokensToJson, tokensToScssVariables, tokensToTailwindConfig, tokensToTypeScriptTypes, zIndex };
