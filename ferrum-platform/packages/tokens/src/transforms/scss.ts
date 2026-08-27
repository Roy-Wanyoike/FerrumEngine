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
 * Converts an HSLColor object to an SCSS hsl() string.
 * SCSS uses comma-separated syntax: hsl(270, 80%, 60%)
 */
function hslToScss(c: HSLColor): string {
  return `hsl(${c.h}, ${c.s}%, ${c.l}%)`;
}

/**
 * Converts a camelCase or kebab-case segment to SCSS variable-friendly format.
 */
function toScssVarName(segments: string[]): string {
  return segments
    .map((seg) => {
      if (seg === "DEFAULT") return "";
      return seg.replace(/([A-Z])/g, "-$1").toLowerCase();
    })
    .filter(Boolean)
    .join("-");
}

/**
 * Recursively flattens a nested token object into SCSS variable declarations.
 */
function flattenToScssVars(
  obj: Record<string, unknown>,
  prefix: string[] = [],
  lines: string[] = [],
): string[] {
  for (const [key, value] of Object.entries(obj)) {
    const segments = [...prefix, key];

    if (isHSLColor(value)) {
      const varName = `$ferrum-${toScssVarName(segments)}`;
      lines.push(`${varName}: ${hslToScss(value)};`);
    } else if (Array.isArray(value)) {
      // Skip arrays (shadows) — handled separately
      continue;
    } else if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      flattenToScssVars(
        value as Record<string, unknown>,
        segments,
        lines,
      );
    } else if (typeof value === "string" || typeof value === "number") {
      const varName = `$ferrum-${toScssVarName(segments)}`;
      const scssValue = typeof value === "number" ? String(value) : value;
      lines.push(`${varName}: ${scssValue};`);
    }
  }

  return lines;
}

/**
 * Converts shadow layers to SCSS $variable declarations.
 */
function shadowsToScssVars(
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
      const varName = `$ferrum-${toScssVarName(segments)}`;
      lines.push(`${varName}: ${parts};`);
    } else if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      shadowsToScssVars(
        value as Record<string, unknown>,
        segments,
        lines,
      );
    }
  }

  return lines;
}

/**
 * Converts the entire token set to SCSS $variable declarations.
 *
 * @param allTokens - The aggregated ferrumTokens object
 * @returns Complete SCSS string with $variable declarations
 */
export function tokensToScssVariables(allTokens: Record<string, unknown>): string {
  const lines: string[] = [];
  lines.push("// ─── Ferrum Design Tokens (auto-generated) ──────────────────────────");
  lines.push("// Do not edit manually. Regenerate with: npx ferrum-tokens build:scss");
  lines.push("");

  for (const [category, value] of Object.entries(allTokens)) {
    lines.push(`// ${category}`);
    if (category === "shadows") {
      shadowsToScssVars(
        value as Record<string, unknown>,
        [category],
        lines,
      );
    } else if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      flattenToScssVars(
        value as Record<string, unknown>,
        [category],
        lines,
      );
    }
    lines.push("");
  }

  return lines.join("\n");
}