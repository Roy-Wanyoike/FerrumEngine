// ─── Types ───────────────────────────────────────────────────────────────────

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

export type ColorScale = {
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

export interface SemanticColors {
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

// ─── Helper ─────────────────────────────────────────────────────────────────

function hsl(h: number, s: number, l: number): HSLColor {
  return { h, s, l };
}

function scale(
  base: HSLColor,
  lightest: HSLColor,
  dark: HSLColor,
  darkest: HSLColor,
  nearBlack: HSLColor,
): ColorScale {
  return {
    DEFAULT: base,
    50: lightest,
    100: hsl(lightest.h, lightest.s, lightest.l - 2),
    200: hsl(lightest.h, lightest.s, lightest.l - 6),
    300: hsl(base.h, base.s, base.l + 18),
    400: hsl(base.h, base.s, base.l + 10),
    500: base,
    600: hsl(dark.h, dark.s, dark.l + 8),
    700: dark,
    800: hsl(darkest.h, darkest.s, darkest.l + 8),
    900: darkest,
    950: nearBlack,
  };
}

// ─── Primary (Purple-based) ─────────────────────────────────────────────────

export const primary = scale(
  hsl(270, 80, 60),   // DEFAULT / 500
  hsl(270, 95, 97),   // 50
  hsl(270, 82, 42),   // 700
  hsl(270, 72, 24),   // 900
  hsl(270, 70, 12),   // 950
);

// ─── Secondary (Pink-based) ─────────────────────────────────────────────────

export const secondary = scale(
  hsl(330, 75, 55),
  hsl(330, 90, 97),
  hsl(330, 70, 38),
  hsl(330, 60, 22),
  hsl(330, 55, 11),
);

// ─── Accent (Violet) ────────────────────────────────────────────────────────

export const accent = scale(
  hsl(255, 70, 58),
  hsl(255, 85, 97),
  hsl(255, 65, 40),
  hsl(255, 55, 24),
  hsl(255, 50, 12),
);

// ─── Success (Emerald/Green) ────────────────────────────────────────────────

export const success = scale(
  hsl(160, 70, 40),
  hsl(160, 75, 96),
  hsl(160, 65, 28),
  hsl(160, 55, 16),
  hsl(160, 50, 8),
);

// ─── Warning (Amber/Yellow) ─────────────────────────────────────────────────

export const warning = scale(
  hsl(38, 90, 52),
  hsl(38, 95, 96),
  hsl(38, 80, 38),
  hsl(38, 70, 22),
  hsl(38, 65, 10),
);

// ─── Danger (Red) ───────────────────────────────────────────────────────────

export const danger = scale(
  hsl(0, 78, 52),
  hsl(0, 85, 96),
  hsl(0, 70, 38),
  hsl(0, 60, 22),
  hsl(0, 55, 10),
);

// ─── Info (Sky/Blue) ────────────────────────────────────────────────────────

export const info = scale(
  hsl(210, 80, 50),
  hsl(210, 90, 96),
  hsl(210, 70, 36),
  hsl(210, 60, 20),
  hsl(210, 55, 10),
);

// ─── Muted (Slate/Gray) ─────────────────────────────────────────────────────

export const muted = scale(
  hsl(220, 14, 46),
  hsl(220, 15, 96),
  hsl(220, 12, 34),
  hsl(220, 10, 20),
  hsl(220, 8, 10),
);

// ─── Neutral tokens ─────────────────────────────────────────────────────────

export const foreground = scale(
  hsl(240, 10, 8),
  hsl(240, 10, 98),
  hsl(240, 10, 6),
  hsl(240, 10, 4),
  hsl(240, 10, 2),
);

export const background = scale(
  hsl(240, 20, 98),
  hsl(240, 20, 100),
  hsl(240, 18, 95),
  hsl(240, 15, 90),
  hsl(240, 12, 85),
);

export const border = scale(
  hsl(220, 13, 82),
  hsl(220, 13, 97),
  hsl(220, 11, 70),
  hsl(220, 10, 55),
  hsl(220, 8, 40),
);

export const card = scale(
  hsl(240, 20, 99),
  hsl(240, 20, 100),
  hsl(240, 18, 96),
  hsl(240, 15, 92),
  hsl(240, 12, 88),
);

export const popover = scale(
  hsl(240, 20, 99),
  hsl(240, 20, 100),
  hsl(240, 18, 96),
  hsl(240, 15, 92),
  hsl(240, 12, 88),
);

export const ring = scale(
  hsl(270, 80, 60),
  hsl(270, 95, 95),
  hsl(270, 82, 50),
  hsl(270, 72, 35),
  hsl(270, 70, 20),
);

export const input = scale(
  hsl(220, 13, 82),
  hsl(220, 13, 97),
  hsl(220, 11, 70),
  hsl(220, 10, 55),
  hsl(220, 8, 40),
);

export const destructive = scale(
  hsl(0, 78, 52),
  hsl(0, 85, 96),
  hsl(0, 70, 38),
  hsl(0, 60, 22),
  hsl(0, 55, 10),
);

// ─── Aggregated semantic colors ─────────────────────────────────────────────

export const colors: SemanticColors = {
  primary,
  secondary,
  accent,
  success,
  warning,
  danger,
  info,
  muted,
  foreground,
  background,
  border,
  card,
  popover,
  ring,
  input,
  destructive,
} as const;