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
 * Converts a camelCase or kebab-case string to a CSS custom property name.
 * Replaces DEFAULT with empty string so "primary.DEFAULT" becomes "primary".
 */
function toCssVarName(segments: string[]): string {
  return segments
    .map((seg) => {
      if (seg === "DEFAULT") return "";
      return seg.replace(/([A-Z])/g, "-$1").toLowerCase();
    })
    .filter(Boolean)
    .join("-");
}

/**
 * Recursively flattens a nested token object into CSS custom property declarations.
 */
function flattenToCssVars(
  obj: Record<string, unknown>,
  prefix: string[] = [],
  lines: string[] = [],
): string[] {
  for (const [key, value] of Object.entries(obj)) {
    const segments = [...prefix, key];

    if (isHSLColor(value)) {
      const varName = `--ferrum-${toCssVarName(segments)}`;
      lines.push(`  ${varName}: ${hslToCss(value)};`);
    } else if (Array.isArray(value)) {
      // Skip arrays (shadows) — handled separately
      continue;
    } else if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      flattenToCssVars(
        value as Record<string, unknown>,
        segments,
        lines,
      );
    } else if (typeof value === "string" || typeof value === "number") {
      const varName = `--ferrum-${toCssVarName(segments)}`;
      const cssValue = typeof value === "number" ? String(value) : value;
      lines.push(`  ${varName}: ${cssValue};`);
    }
  }

  return lines;
}

/**
 * Converts shadow layers to CSS box-shadow values and emits them as CSS vars.
 */
function shadowsToCssVars(
  shadows: Record<string, unknown>,
  prefix: string[] = [],
  lines: string[] = [],
): string[] {
  for (const [key, value] of Object.entries(shadows)) {
    const segments = [...prefix, key];

    if (Array.isArray(value)) {
      const parts = value
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
      const varName = `--ferrum-${toCssVarName(segments)}`;
      lines.push(`  ${varName}: ${parts};`);
    } else if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      shadowsToCssVars(
        value as Record<string, unknown>,
        segments,
        lines,
      );
    }
  }

  return lines;
}

/**
 * Converts the entire token set to CSS custom properties under :root.
 *
 * @param allTokens - The aggregated ferrumTokens object
 * @returns Complete CSS string with :root selector
 */
export function tokensToCssVariables(allTokens: Record<string, unknown>): string {
  const lines: string[] = [];
  lines.push(":root {");

  for (const [category, value] of Object.entries(allTokens)) {
    if (category === "shadows") {
      shadowsToCssVars(
        value as Record<string, unknown>,
        [category],
        lines,
      );
    } else if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      flattenToCssVars(
        value as Record<string, unknown>,
        [category],
        lines,
      );
    }
  }

  lines.push("}");
  return lines.join("\n") + "\n";
}