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
 * Converts a value to a TypeScript literal string representation.
 */
function toTsLiteral(value: unknown, indent: string): string {
  if (isHSLColor(value)) {
    return `{ h: ${value.h}, s: ${value.s}, l: ${value.l} }`;
  }

  if (typeof value === "string") {
    return JSON.stringify(value);
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    const items = value
      .map((item) => toTsLiteral(item, indent + "  "))
      .join(",\n" + indent + "  ");
    return `[\n${indent}  ${items}\n${indent}]`;
  }

  if (typeof value === "object" && value !== null) {
    const entries = Object.entries(value)
      .map(
        ([k, v]) =>
          `${JSON.stringify(k)}: ${toTsLiteral(v, indent + "  ")}`,
      )
      .join(",\n" + indent + "  ");
    return `{\n${indent}  ${entries}\n${indent}}`;
  }

  return String(value);
}

/**
 * Infers a TypeScript type string from a runtime value.
 */
function inferTypeFromValue(value: unknown, indent: string): string {
  if (isHSLColor(value)) {
    return "{ h: number; s: number; l: number }";
  }

  if (typeof value === "string") return "string";
  if (typeof value === "number") return "number";

  if (Array.isArray(value)) {
    if (value.length > 0) {
      const itemType = inferTypeFromValue(value[0], indent + "  ");
      return `${itemType}[]`;
    }
    return "unknown[]";
  }

  if (typeof value === "object" && value !== null) {
    const entries = Object.entries(value)
      .map(
        ([k, v]) =>
          `${JSON.stringify(k)}: ${inferTypeFromValue(v, indent + "  ")}`,
      )
      .join(";\n" + indent + "  ");
    return `{\n${indent}  ${entries}\n${indent}}`;
  }

  return "unknown";
}

/**
 * Generates TypeScript const declarations with `as const` assertions and
 * corresponding type definitions from the token set.
 *
 * @param allTokens - The aggregated ferrumTokens object
 * @returns An object with `declarations` (const strings) and `types` (type strings)
 */
export function tokensToTypeScriptTypes(allTokens: Record<string, unknown>): {
  declarations: string;
  types: string;
} {
  const declarationLines: string[] = [];
  const typeLines: string[] = [];

  declarationLines.push(
    "// ─── Ferrum Design Tokens (auto-generated) ──────────────────────────",
  );
  declarationLines.push(
    "// Do not edit manually. Regenerate with: npx ferrum-tokens build:ts",
  );
  declarationLines.push("");

  typeLines.push(
    "// ─── Ferrum Design Token Types (auto-generated) ──────────────────────",
  );
  typeLines.push("");

  for (const [category, value] of Object.entries(allTokens)) {
    if (
      typeof value !== "object" ||
      value === null ||
      Array.isArray(value)
    ) {
      continue;
    }

    const constName = `ferrum${category.charAt(0).toUpperCase()}${category.slice(1)}`;
    const typeName = `${category.charAt(0).toUpperCase()}${category.slice(1)}Tokens`;

    // Generate const declaration
    declarationLines.push(
      `export const ${constName} = ${toTsLiteral(value, "")} as const;`,
    );
    declarationLines.push("");

    // Generate type by inferring from the runtime value
    const inferredType = inferTypeFromValue(value, "  ");
    typeLines.push(`export type ${typeName} = ${inferredType};`);
    typeLines.push("");
  }

  // Add the aggregate type
  const categoryNames = Object.keys(allTokens)
    .map(
      (cat) =>
        `${cat}: ${cat.charAt(0).toUpperCase()}${cat.slice(1)}Tokens`,
    )
    .join(";\n  ");
  typeLines.push("export type FerrumGeneratedTokens = {");
  typeLines.push(`  ${categoryNames};`);
  typeLines.push("};");
  typeLines.push("");

  return {
    declarations: declarationLines.join("\n"),
    types: typeLines.join("\n"),
  };
}