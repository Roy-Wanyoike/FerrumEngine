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
 * Recursively flattens a nested token object into a flat dot-notation map.
 * HSL colors are serialized as [h, s, l] arrays.
 */
function flattenToDotNotation(
  obj: Record<string, unknown>,
  prefix: string[] = [],
  result: Record<string, unknown> = {},
): Record<string, unknown> {
  for (const [key, value] of Object.entries(obj)) {
    const segments = [...prefix, key];
    const dotKey = segments.join(".");

    if (isHSLColor(value)) {
      result[dotKey] = [value.h, value.s, value.l];
    } else if (Array.isArray(value)) {
      // Serialize shadow arrays as-is (plain objects)
      result[dotKey] = value.map((layer) => ({ ...layer }));
    } else if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      flattenToDotNotation(
        value as Record<string, unknown>,
        segments,
        result,
      );
    } else {
      result[dotKey] = value;
    }
  }

  return result;
}

/**
 * Serializes all tokens to a flat JSON object with dot-notation keys.
 *
 * @param allTokens - The aggregated ferrumTokens object
 * @returns A flat JSON-compatible object where keys use dot notation
 *   (e.g., "colors.primary.500", "spacing.4")
 */
export function tokensToJson(
  allTokens: Record<string, unknown>,
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [category, value] of Object.entries(allTokens)) {
    if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      flattenToDotNotation(
        value as Record<string, unknown>,
        [category],
        result,
      );
    }
  }

  return result;
}