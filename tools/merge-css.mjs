#!/usr/bin/env node
/**
 * merge-css.mjs — Consolidate roycss.css + ferrum-effects.css into a single file.
 * Preserves both prefix namespaces (roycss-* and rc-*) for backwards compat.
 * Deduplicates @keyframes blocks to avoid bloat.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PUBLIC = join(process.cwd(), "public");
const OUT = join(PUBLIC, "ferrum-effects.css");

// Read both files
const roycss = readFileSync(join(PUBLIC, "roycss.css"), "utf-8");
const ferrum = readFileSync(join(PUBLIC, "ferrum-effects.css"), "utf-8");

// Extract keyframes names from each file
function extractKeyframesNames(css) {
  const names = new Set();
  const re = /@keyframes\s+([a-zA-Z0-9_-]+)/g;
  let m;
  while ((m = re.exec(css)) !== null) names.add(m[1]);
  return names;
}

const roycssKeyframes = extractKeyframesNames(roycss);
const ferrumKeyframes = extractKeyframesNames(ferrum);

// Find duplicate keyframes names
const dupes = [...roycssKeyframes].filter(n => ferrumKeyframes.has(n));

// Remove duplicate @keyframes blocks from ferrum (keep roycss version — it comes first)
let ferrumCleaned = ferrum;
for (const name of dupes) {
  // Remove @keyframes name { ... } blocks (handling nested braces)
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`@keyframes\\s+${escaped}\\s*\\{[^}]*(?:\\{[^}]*\\}[^}]*)*\\}`, 'g');
  ferrumCleaned = ferrumCleaned.replace(re, '');
}

// Build merged file
const totalKeyframes = roycssKeyframes.size + ferrumKeyframes.size - dupes.length;
const header = `/* ============================================================
 * FerrumCSS Unified Effects Library
 * Consolidated from RoyCSS v3.0 + FerrumCSS Effects
 *
 * Effects: 906+ | Keyframes: ${totalKeyframes} (deduplicated)
 * Prefixes: roycss-* (legacy), rc-* (canonical)
 *
 * Auto-generated — do not edit manually.
 * Source: roycss.css, ferrum-effects.css
 * ============================================================ */
`;

const merged = header + "\n" + roycss + "\n" + ferrumCleaned;

writeFileSync(OUT, merged, "utf-8");

const originalSize = Buffer.byteLength(roycss) + Buffer.byteLength(ferrum);
const mergedSize = Buffer.byteLength(merged);
const saved = originalSize - mergedSize;

console.log(`CSS merged successfully`);
console.log(`  roycss.css:      ${(Buffer.byteLength(roycss) / 1024).toFixed(1)} KB`);
console.log(`  ferrum-effects:  ${(Buffer.byteLength(ferrum) / 1024).toFixed(1)} KB`);
console.log(`  ---------------------------`);
console.log(`  merged output:  ${(mergedSize / 1024).toFixed(1)} KB`);
console.log(`  duplicate kfs:   ${dupes.length} removed`);
console.log(`  total saved:    ${(saved / 1024).toFixed(1)} KB`);
console.log(`  output:         public/ferrum-effects.css`);
