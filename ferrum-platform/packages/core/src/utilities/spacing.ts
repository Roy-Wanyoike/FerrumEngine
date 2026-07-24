/**
 * Spacing utility classes — Margin and Padding
 * Each unit maps to 0.25rem (e.g., spacing-4 = 1rem)
 */

function spacingValue(n: number): string {
  if (n === 0) return "0";
  return `var(--ferrum-spacing-${n}, ${n * 0.25}rem)`;
}

function generateSpacingClasses(): string {
  const lines: string[] = [];
  const prefix = "  ";

  lines.push("/* === Margin === */");

  // All-side margin
  for (let i = 0; i <= 12; i++) {
    lines.push(`${prefix}.fr-m-${i} { margin: ${spacingValue(i)}; }`);
  }

  lines.push("");
  lines.push(`${prefix}.fr-mx-auto { margin-left: auto; margin-right: auto; }`);
  lines.push(`${prefix}.fr-my-auto { margin-top: auto; margin-bottom: auto; }`);

  lines.push("");

  // Margin top
  lines.push("/* === Margin Top === */");
  for (let i = 0; i <= 12; i++) {
    lines.push(`${prefix}.fr-mt-${i} { margin-top: ${spacingValue(i)}; }`);
  }

  lines.push("");

  // Margin bottom
  lines.push("/* === Margin Bottom === */");
  for (let i = 0; i <= 12; i++) {
    lines.push(`${prefix}.fr-mb-${i} { margin-bottom: ${spacingValue(i)}; }`);
  }

  lines.push("");

  // Margin left
  lines.push("/* === Margin Left === */");
  for (let i = 0; i <= 12; i++) {
    lines.push(`${prefix}.fr-ml-${i} { margin-left: ${spacingValue(i)}; }`);
  }

  lines.push("");

  // Margin right
  lines.push("/* === Margin Right === */");
  for (let i = 0; i <= 12; i++) {
    lines.push(`${prefix}.fr-mr-${i} { margin-right: ${spacingValue(i)}; }`);
  }

  lines.push("");
  lines.push("/* === Padding === */");

  // All-side padding
  for (let i = 0; i <= 12; i++) {
    lines.push(`${prefix}.fr-p-${i} { padding: ${spacingValue(i)}; }`);
  }

  lines.push("");

  // Padding X (horizontal)
  lines.push("/* === Padding X (Horizontal) === */");
  for (let i = 0; i <= 12; i++) {
    lines.push(`${prefix}.fr-px-${i} { padding-left: ${spacingValue(i)}; padding-right: ${spacingValue(i)}; }`);
  }

  lines.push("");

  // Padding Y (vertical)
  lines.push("/* === Padding Y (Vertical) === */");
  for (let i = 0; i <= 12; i++) {
    lines.push(`${prefix}.fr-py-${i} { padding-top: ${spacingValue(i)}; padding-bottom: ${spacingValue(i)}; }`);
  }

  lines.push("");

  // Padding top
  lines.push("/* === Padding Top === */");
  for (let i = 0; i <= 12; i++) {
    lines.push(`${prefix}.fr-pt-${i} { padding-top: ${spacingValue(i)}; }`);
  }

  lines.push("");

  // Padding bottom
  lines.push("/* === Padding Bottom === */");
  for (let i = 0; i <= 12; i++) {
    lines.push(`${prefix}.fr-pb-${i} { padding-bottom: ${spacingValue(i)}; }`);
  }

  lines.push("");

  // Padding left
  lines.push("/* === Padding Left === === */");
  for (let i = 0; i <= 12; i++) {
    lines.push(`${prefix}.fr-pl-${i} { padding-left: ${spacingValue(i)}; }`);
  }

  lines.push("");

  // Padding right
  lines.push("/* === Padding Right === === */");
  for (let i = 0; i <= 12; i++) {
    lines.push(`${prefix}.fr-pr-${i} { padding-right: ${spacingValue(i)}; }`);
  }

  return lines.join("\n");
}

export const spacingCSS = `
/* ===== Ferrum Spacing Utilities ===== */

${generateSpacingClasses()}
`.trim();