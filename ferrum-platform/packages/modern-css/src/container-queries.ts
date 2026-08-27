// ─── Container Queries ────────────────────────────────────────
// First-class container query utilities.
// Container queries let components respond to their parent's size,
// not the viewport. This is the biggest layout paradigm shift since flexbox.

import type { ModernCSSConfig } from "./types";

/**
 * Generate container query utilities.
 *
 * Includes:
 * - `.fr-container` — base container definition
 * - Named containers: `.fr-c-card`, `.fr-c-sidebar`, `.fr-c-nav`, etc.
 * - Size query utilities: `@container min-width` responsive variants
 * - Style query utilities: `@container style(--theme: dark)`
 * - Container query length units: `cqw`, `cqh`
 */
export function generateContainerQueryCSS(config: ModernCSSConfig = {}): string {
  const p = config.prefix ?? "fr";

  const namedContainers = config.containerNames ?? [
    "card", "sidebar", "nav", "widget", "panel", "modal", "hero", "section",
  ];

  const lines: string[] = [
    `/* ═══════════════════════════════════════════════════`,
    `   FerrumCSS Container Queries`,
    `   Components respond to their parent size, not viewport.`,
    `   ═══════════════════════════════════════════════════ */`,
    ``,
    `/* ─── Base container definition ─── */`,
    `@layer ferrum.utilities {`,
    `  .${p}-container {`,
    `    container-type: inline-size;`,
    `    container-name: ${p}-container;`,
    `  }`,
    ``,
    `  /* Container query sizing — name + type in one class */`,
    `  .${p}-c-size { container-type: inline-size; }`,
    `  .${p}-c-inline { container-type: inline-size; }`,
    `  .${p}-c-size-normal { container-type: size; }`,
    `  .${p}-c-none { container-type: normal; }`,
    ``,
    `  /* Named containers — give semantic names to query targets */`,
  ];

  for (const name of namedContainers) {
    lines.push(`  .${p}-c-${name} {`);
    lines.push(`    container-type: inline-size;`);
    lines.push(`    container-name: ${p}-${name};`);
    lines.push(`  }`);
  }

  lines.push(`}`);

  // Size query responsive utilities
  lines.push(``);
  lines.push(`/* ─── Container size query utilities ─── */`);
  lines.push(`/* Use inside a @container block or with auto-generated queries */`);
  lines.push(`@layer ferrum.utilities {`);

  const sizeVariants = [
    { name: "sm", min: 320, max: 479 },
    { name: "md", min: 480, max: 639 },
    { name: "lg", min: 640, max: 1023 },
    { name: "xl", min: 1024, max: 1279 },
    { name: "2xl", min: 1280, max: Infinity },
  ];

  for (const v of sizeVariants) {
    const maxClause = v.max === Infinity ? "" : ` and (max-width: ${v.max}px)`;
    lines.push(
      `  @container (min-width: ${v.min}px}${maxClause}) {`,
    );
    lines.push(`    .${p}-\@${v.name}:hidden { display: none; }`);
    lines.push(`    .${p}-\@${v.name}:flex { display: flex; }`);
    lines.push(`    .${p}-\@${v.name}:grid { display: grid; }`);
    lines.push(`    .${p}-\@${v.name}:block { display: block; }`);
    lines.push(`    .${p}-\@${v.name}:stack { flex-direction: column; }`);
    lines.push(`    .${p}-\@${v.name}:row { flex-direction: row; }`);
    lines.push(`    .${p}-\@${v.name}:text-sm { font-size: 0.875rem; }`);
    lines.push(`    .${p}-\@${v.name}:text-base { font-size: 1rem; }`);
    lines.push(`    .${p}-\@${v.name}:text-lg { font-size: 1.125rem; }`);
    lines.push(`    .${p}-\@${v.name}:gap-2 { gap: 0.5rem; }`);
    lines.push(`    .${p}-\@${v.name}:gap-4 { gap: 1rem; }`);
    lines.push(`    .${p}-\@${v.name}:gap-6 { gap: 1.5rem; }`);
    lines.push(`    .${p}-\@${v.name}:p-4 { padding: 1rem; }`);
    lines.push(`    .${p}-\@${v.name}:p-6 { padding: 1.5rem; }`);
    lines.push(`  }`);
    lines.push(``);
  }

  lines.push(`}`);

  // Style queries (custom property-based)
  lines.push(``);
  lines.push(`/* ─── Container style queries ─── */`);
  lines.push(`/* Respond to parent's CSS custom property values */`);
  lines.push(`@layer ferrum.utilities {`);
  lines.push(`  /* Theme-aware component variants via style queries */`);
  lines.push(`  @container style(--fr-theme: dark) {`);
  lines.push(`    .${p}-dark\:bg { background: var(--fr-colors-gray-900); }`);
  lines.push(`    .${p}-dark\:text { color: var(--fr-colors-gray-100); }`);
  lines.push(`    .${p}-dark\:border { border-color: var(--fr-colors-gray-700); }`);
  lines.push(`  }`);
  lines.push(``);
  lines.push(`  @container style(--fr-theme: light) {`);
  lines.push(`    .${p}-light\:bg { background: var(--fr-colors-white); }`);
  lines.push(`    .${p}-light\:text { color: var(--fr-colors-gray-900); }`);
  lines.push(`    .${p}-light\:border { border-color: var(--fr-colors-gray-200); }`);
  lines.push(`  }`);
  lines.push(``);
  lines.push(`  /* Card density style query */`);
  lines.push(`  @container style(--fr-density: compact) {`);
  lines.push(`    .${p}-compact\:p { padding: 0.5rem; }`);
  lines.push(`    .${p}-compact\:gap { gap: 0.375rem; }`);
  lines.push(`    .${p}-compact\:text { font-size: 0.75rem; }`);
  lines.push(`  }`);
  lines.push(`}`);

  /* ─── NEW: Style Query utilities (@container style()) ─── */
  /* Respond to parent's CSS custom property values — 2024+ browsers */
  lines.push(``);
  lines.push(`/* ─── Container style query utilities ─── */`);
  lines.push(`/* Style queries let components respond to custom property changes. */`);
  lines.push(`/* Supports: Chrome 111+, Safari 17.2+, Firefox 128+ */`);
  lines.push(`@layer ferrum.modern {`);

  /* Theme style queries */
  lines.push(`  /* Theme: dark mode via style query */`);
  lines.push(`  .${p}-cq-style-dark {`);
  lines.push(`    @container style(--ferrum-theme: dark) {`);
  lines.push(`      background: var(--ferrum-bg-dark, #0f172a);`);
  lines.push(`      color: var(--ferrum-text-on-dark, #e2e8f0);`);
  lines.push(`      border-color: var(--ferrum-border-dark, #1e293b);`);
  lines.push(`    }`);
  lines.push(`  }`);
  lines.push(``);
  lines.push(`  /* Theme: light mode via style query */`);
  lines.push(`  .${p}-cq-style-light {`);
  lines.push(`    @container style(--ferrum-theme: light) {`);
  lines.push(`      background: var(--ferrum-bg-light, #ffffff);`);
  lines.push(`      color: var(--ferrum-text-on-light, #0f172a);`);
  lines.push(`      border-color: var(--ferrum-border-light, #e2e8f0);`);
  lines.push(`    }`);
  lines.push(`  }`);

  /* Density style queries */
  lines.push(``);
  lines.push(`  /* Density: compact layout */`);
  lines.push(`  .${p}-cq-style-density-compact {`);
  lines.push(`    @container style(--ferrum-density: compact) {`);
  lines.push(`      padding: var(--ferrum-space-1, 0.25rem);`);
  lines.push(`      gap: var(--ferrum-space-1, 0.25rem);`);
  lines.push(`      font-size: var(--ferrum-text-xs, 0.75rem);`);
  lines.push(`      line-height: 1.25;`);
  lines.push(`    }`);
  lines.push(`  }`);
  lines.push(``);
  lines.push(`  /* Density: comfortable layout */`);
  lines.push(`  .${p}-cq-style-density-comfortable {`);
  lines.push(`    @container style(--ferrum-density: comfortable) {`);
  lines.push(`      padding: var(--ferrum-space-4, 1rem);`);
  lines.push(`      gap: var(--ferrum-space-3, 0.75rem);`);
  lines.push(`      font-size: var(--ferrum-text-base, 1rem);`);
  lines.push(`      line-height: 1.75;`);
  lines.push(`    }`);
  lines.push(`  }`);

  /* Accent color style queries */
  const accentColors = ["blue", "green", "red", "purple", "orange", "teal"];
  lines.push(``);
  lines.push(`  /* Accent color style queries */`);
  lines.push(`  /* Use: parent sets --ferrum-accent: blue, child uses .fr-cq-style-accent-blue */`);
  for (const accent of accentColors) {
    lines.push(`  .${p}-cq-style-accent-${accent} {`);
    lines.push(`    @container style(--ferrum-accent: ${accent}) {`);
    lines.push(`      color: var(--ferrum-accent-${accent}-600, currentColor);`);
    lines.push(`      background: var(--ferrum-accent-${accent}-50, transparent);`);
    lines.push(`      border-color: var(--ferrum-accent-${accent}-200, transparent);`);
    lines.push(`    }`);
    lines.push(`  }`);
  }

  lines.push(`}`);

  /* ─── NEW: Scroll-State Query utilities (2026 feature) ─── */
  /* Container scroll-state queries — respond to scroll state of a container */
  /* Experimental: Chrome 130+ behind flag, advancing to stable in 2026 */
  lines.push(``);
  lines.push(`/* ─── Container scroll-state queries (2026) ─── */`);
  lines.push(`/* @container scroll-state() queries let components react to */`);
  lines.push(`/* their container's scroll state (stuck, snapped, etc.) */`);
  lines.push(`/* Supports: Chrome 130+ (experimental), Safari TP, Firefox behind flag */`);
  lines.push(`@supports (selector(@container scroll-state(stuck))) {`);
  lines.push(`@layer ferrum.modern {`);

  lines.push(`  /* Sticky stuck state — applies when container has position: sticky and is stuck */`);
  lines.push(`  .${p}-sq-stuck {`);
  lines.push(`    @container scroll-state(stuck) {`);
  lines.push(`      background: var(--ferrum-surface-stuck, var(--ferrum-bg-light, #ffffff));`);
  lines.push(`      box-shadow: var(--ferrum-shadow-stuck, 0 1px 3px rgba(0, 0, 0, 0.12));`);
  lines.push(`      border-bottom-color: var(--ferrum-border-stuck, #e2e8f0);`);
  lines.push(`    }`);
  lines.push(`  }`);

  lines.push(``);
  lines.push(`  /* Snapped state — applies when container is at a scroll-snap stop */`);
  lines.push(`  .${p}-sq-snapped {`);
  lines.push(`    @container scroll-state(snapped) {`);
  lines.push(`      opacity: 1;`);
  lines.push(`      transform: scale(1.02);`);
  lines.push(`      transition: transform 0.2s ease, opacity 0.2s ease;`);
  lines.push(`    }`);
  lines.push(`  }`);

  lines.push(``);
  lines.push(`  /* Inline scroll state — container is actively being scrolled inline */`);
  lines.push(`  .${p}-sq-inline {`);
  lines.push(`    @container scroll-state(inline) {`);
  lines.push(`      pointer-events: none;`);
  lines.push(`      user-select: none;`);
  lines.push(`    }`);
  lines.push(`  }`);

  lines.push(``);
  lines.push(`  /* None scroll state — container is not scrolled */`);
  lines.push(`  .${p}-sq-none {`);
  lines.push(`    @container scroll-state(none) {`);
  lines.push(`      opacity: 0.7;`);
  lines.push(`      filter: blur(1px);`);
  lines.push(`      transition: opacity 0.3s ease, filter 0.3s ease;`);
  lines.push(`    }`);
  lines.push(`  }`);

  lines.push(`}`);
  lines.push(`}`);

  return lines.join("\n");
}