import type { HSLColor } from "../tokens/colors";

/**
 * Checks if a value is an HSL color object.
 */
function isHSLColor(value: unknown): value is HSLColor {
  return (
    typeof value === "object" &&
    value !== null &&
    "h" in value &&
    "s" in value &&
    "l" in value &&
    typeof (value as HSLColor).h === "number" &&
    typeof (value as HSLColor).s === "number" &&
    typeof (value as HSLColor).l === "number"
  );
}

/**
 * Converts an HSLColor object to a CSS hsl() string.
 */
function hslToCss(c: HSLColor): string {
  return `hsl(${c.h} ${c.s}% ${c.l}%)`;
}

/**
 * Converts a single ColorScale (e.g. primary) to a Tailwind color object.
 * Preserves the nested structure: { DEFAULT, 50, 100, ..., 950 }
 */
function transformSingleColorScale(
  scale: Record<string, unknown>,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(scale)) {
    if (isHSLColor(value)) {
      result[key] = hslToCss(value);
    }
  }
  return result;
}

/**
 * Converts the full SemanticColors object to a Tailwind nested color config.
 * Output: { primary: { DEFAULT: "...", 50: "...", ... }, secondary: { ... }, ... }
 */
function transformColors(
  colors: Record<string, unknown>,
): Record<string, Record<string, string>> {
  const result: Record<string, Record<string, string>> = {};
  for (const [name, scale] of Object.entries(colors)) {
    if (
      typeof scale === "object" &&
      scale !== null &&
      !Array.isArray(scale)
    ) {
      result[name] = transformSingleColorScale(
        scale as Record<string, unknown>,
      );
    }
  }
  return result;
}

/**
 * Converts shadow layers to a CSS box-shadow string.
 */
function shadowToCss(layers: unknown[]): string {
  return layers
    .map((layer) => {
      const l = layer as {
        x: number;
        y: number;
        blur: number;
        spread: number;
        color: string;
        opacity: number;
      };
      return `${l.x}px ${l.y}px ${l.blur}px ${l.spread}px rgba(${l.color}, ${l.opacity})`;
    })
    .join(", ");
}

/**
 * Converts the entire token set to a Tailwind CSS compatible theme config.
 *
 * @param allTokens - The aggregated ferrumTokens object
 * @returns A JavaScript object ready to merge into a Tailwind config
 */
export function tokensToTailwindConfig(
  allTokens: Record<string, unknown>,
): Record<string, unknown> {
  const config: Record<string, unknown> = {};

  // Colors — nested structure for Tailwind
  if (allTokens.colors && typeof allTokens.colors === "object") {
    config.colors = transformColors(
      allTokens.colors as Record<string, unknown>,
    );
  }

  // Spacing
  if (allTokens.spacing && typeof allTokens.spacing === "object") {
    config.spacing = { ...allTokens.spacing } as Record<string, unknown>;
  }

  // Border radius
  if (allTokens.radius && typeof allTokens.radius === "object") {
    config.borderRadius = { ...allTokens.radius } as Record<string, unknown>;
  }

  // Font family
  if (allTokens.fontFamilies && typeof allTokens.fontFamilies === "object") {
    const ff = allTokens.fontFamilies as Record<string, string>;
    config.fontFamily = {
      sans: [ff.sans],
      mono: [ff.mono],
      serif: [ff.serif],
    };
  }

  // Font size
  if (allTokens.fontSizes && typeof allTokens.fontSizes === "object") {
    config.fontSize = { ...allTokens.fontSizes } as Record<string, unknown>;
  }

  // Font weight
  if (allTokens.fontWeights && typeof allTokens.fontWeights === "object") {
    config.fontWeight = {
      ...allTokens.fontWeights,
    } as Record<string, unknown>;
  }

  // Line height
  if (allTokens.lineHeights && typeof allTokens.lineHeights === "object") {
    config.lineHeight = {
      ...allTokens.lineHeights,
    } as Record<string, unknown>;
  }

  // Letter spacing
  if (allTokens.letterSpacings && typeof allTokens.letterSpacings === "object") {
    config.letterSpacing = {
      ...allTokens.letterSpacings,
    } as Record<string, unknown>;
  }

  // Box shadow
  if (allTokens.shadows && typeof allTokens.shadows === "object") {
    const sh = allTokens.shadows as Record<string, unknown>;
    const shadowMap: Record<string, string> = {};
    for (const [key, value] of Object.entries(sh)) {
      if (Array.isArray(value)) {
        shadowMap[key] = shadowToCss(value);
      }
    }
    config.boxShadow = shadowMap;
  }

  // Screens (breakpoints)
  if (allTokens.breakpoints && typeof allTokens.breakpoints === "object") {
    const bp = allTokens.breakpoints as Record<string, string>;
    config.screens = {};
    for (const [key, value] of Object.entries(bp)) {
      (config.screens as Record<string, string>)[key] = value;
    }
  }

  // Z-index
  if (allTokens.zIndex && typeof allTokens.zIndex === "object") {
    config.zIndex = { ...allTokens.zIndex } as Record<string, unknown>;
  }

  return config;
}