// ─── Constants ───────────────────────────────────────────────────────────────

/** Prefix used for all Ferrum CSS custom properties and data attributes. */
export const FERRUM_PREFIX = "fr";

/** Current major version of the Ferrum Platform. */
export const FERRUM_VERSION = "0.0.1";

/** Prefix applied to CSS custom properties (e.g. `--fr-color-primary`). */
export const CSS_CUSTOM_PROPERTY_PREFIX = `--${FERRUM_PREFIX}`;

// ─── Types ───────────────────────────────────────────────────────────────────

/** A single named breakpoint with a minimum width in pixels. */
export interface FerrumBreakpoint {
  /** Breakpoint name (e.g. "sm", "md", "lg"). */
  name: string;
  /** Minimum viewport width in pixels. */
  minWidth: number;
}

/** Theme tokens consumed by Ferrum components. */
export interface FerrumTheme {
  /** Primary brand color tokens. */
  colors: {
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    input: string;
    ring: string;
    destructive: string;
    destructiveForeground: string;
  };
  /** Named radius values. */
  radii: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  /** Named spacing scale values. */
  spacing: {
    0: string;
    px: string;
    "0.5": string;
    1: string;
    "1.5": string;
    2: string;
    2.5: string;
    3: string;
    4: string;
    5: string;
    6: string;
    8: string;
    10: string;
    12: string;
    16: string;
    20: string;
    24: string;
    32: string;
    40: string;
    48: string;
    56: string;
    64: string;
  };
  /** Named font size values. */
  fontSizes: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
  };
  /** Font family stacks. */
  fonts: {
    sans: string;
    mono: string;
  };
}

/** Configuration object consumed across the Ferrum Platform. */
export interface FerrumConfig {
  /** CSS class / CSS-variable prefix. Default: "fr". */
  prefix: string;
  /** Whether CSS reset styles are injected. */
  resetCSS: boolean;
  /** Responsive breakpoints. */
  breakpoints: FerrumBreakpoint[];
  /** Theme tokens. */
  theme: FerrumTheme;
}

// ─── Defaults ────────────────────────────────────────────────────────────────

const defaultBreakpoints: FerrumBreakpoint[] = [
  { name: "sm", minWidth: 640 },
  { name: "md", minWidth: 768 },
  { name: "lg", minWidth: 1024 },
  { name: "xl", minWidth: 1280 },
  { name: "2xl", minWidth: 1536 },
];

const defaultTheme: FerrumTheme = {
  colors: {
    primary: "hsl(222.2 47.4% 11.2%)",
    primaryForeground: "hsl(210 40% 98%)",
    secondary: "hsl(210 40% 96.1%)",
    secondaryForeground: "hsl(222.2 47.4% 11.2%)",
    accent: "hsl(210 40% 96.1%)",
    accentForeground: "hsl(222.2 47.4% 11.2%)",
    background: "hsl(0 0% 100%)",
    foreground: "hsl(222.2 84% 4.9%)",
    muted: "hsl(210 40% 96.1%)",
    mutedForeground: "hsl(215.4 16.3% 46.9%)",
    border: "hsl(214.3 31.8% 91.4%)",
    input: "hsl(214.3 31.8% 91.4%)",
    ring: "hsl(222.2 84% 4.9%)",
    destructive: "hsl(0 84.2% 60.2%)",
    destructiveForeground: "hsl(210 40% 98%)",
  },
  radii: {
    none: "0px",
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    full: "9999px",
  },
  spacing: {
    0: "0px",
    px: "1px",
    "0.5": "0.125rem",
    1: "0.25rem",
    "1.5": "0.375rem",
    2: "0.5rem",
    2.5: "0.625rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    32: "8rem",
    40: "10rem",
    48: "12rem",
    56: "14rem",
    64: "16rem",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
  },
  fonts: {
    sans:
      'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono:
      'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
  },
};

const defaultConfig: FerrumConfig = {
  prefix: FERRUM_PREFIX,
  resetCSS: true,
  breakpoints: defaultBreakpoints,
  theme: defaultTheme,
};

// ─── Utility ─────────────────────────────────────────────────────────────────

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Create a Ferrum configuration by merging user-provided overrides
 * with the built-in defaults. Nested objects are merged shallowly
 * per level, so you only need to specify the tokens you want to
 * override.
 *
 * @example
 * ```ts
 * const config = createConfig({
 *   prefix: "app",
 *   theme: {
 *     colors: {
 *       primary: "hsl(250 100% 60%)",
 *     },
 *   },
 * });
 * ```
 */
export function createConfig(
  overrides: DeepPartial<FerrumConfig> = {},
): FerrumConfig {
  return {
    prefix: overrides.prefix ?? defaultConfig.prefix,
    resetCSS: overrides.resetCSS ?? defaultConfig.resetCSS,
    breakpoints: (overrides.breakpoints ?? defaultConfig.breakpoints) as FerrumBreakpoint[],
    theme: {
      colors: { ...defaultConfig.theme.colors, ...overrides.theme?.colors },
      radii: { ...defaultConfig.theme.radii, ...overrides.theme?.radii },
      spacing: {
        ...defaultConfig.theme.spacing,
        ...overrides.theme?.spacing,
      },
      fontSizes: {
        ...defaultConfig.theme.fontSizes,
        ...overrides.theme?.fontSizes,
      },
      fonts: { ...defaultConfig.theme.fonts, ...overrides.theme?.fonts },
    },
  };
}