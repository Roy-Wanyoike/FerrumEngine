// ─── Types ───────────────────────────────────────────────────────────────────

export type FontFamilyScale = {
  sans: string;
  mono: string;
  serif: string;
};

export type FontSizeScale = {
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

export type FontWeightScale = {
  thin: number;
  light: number;
  normal: number;
  medium: number;
  semibold: number;
  bold: number;
  extrabold: number;
  black: number;
};

export type LineHeightScale = {
  none: number;
  tight: number;
  snug: number;
  normal: number;
  relaxed: number;
  loose: number;
};

export type LetterSpacingScale = {
  tighter: string;
  tight: string;
  normal: string;
  wide: string;
  wider: string;
  widest: string;
};

// ─── Font Families ──────────────────────────────────────────────────────────

export const fontFamilies: FontFamilyScale = {
  sans:
    'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  mono:
    '"JetBrains Mono", ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
  serif:
    'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
} as const;

// ─── Font Sizes (rem) ──────────────────────────────────────────────────────

export const fontSizes: FontSizeScale = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
} as const;

// ─── Font Weights ───────────────────────────────────────────────────────────

export const fontWeights: FontWeightScale = {
  thin: 100,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

// ─── Line Heights ───────────────────────────────────────────────────────────

export const lineHeights: LineHeightScale = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
} as const;

// ─── Letter Spacings (em) ──────────────────────────────────────────────────

export const letterSpacings: LetterSpacingScale = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
} as const;