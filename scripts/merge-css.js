#!/usr/bin/env node
/**
 * merge-css.js — Consolidate roycss.css + ferrum-effects.css into a single file.
 * Preserves both prefix namespaces (roycss-* and rc-*) for backwards compat.
 * Deduplicates @keyframes blocks to avoid bloat.
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const PUBLIC = join(process.cwd(), "public");
const OUT = join(PUBLIC, "ferrum-effects.css");

// Read both files
const roycss = readFileSync(join(PUBLIC, "roycss.css"), "utf-8");
const ferrum = readFileSync(join(PUBLIC, "ferrum-effects.css"), "utf-8");

// Extract keyframes names from each file
function extractKeyframesNames(css: string): Set<string> {
  const names = new Set<string>();
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
  const re = new RegExp(`@keyframes\\s+${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{[^}]*(?:\\{[^}]*\\}[^}]*)*\\}`, 'g');
  ferrumCleaned = ferrumCleaned.replace(re, '');
}

// Build merged file
const header = `/* ============================================================
 * FerrumCSS Unified Effects Library
 * Consolidated from RoyCSS v3.0 + FerrumCSS Effects
 *
 * Effects: 906+ | Keyframes: ${roycssKeyframes.size + ferrumKeyframes.size - dupes.length} (deduplicated)
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

console.log(`✅ CSS merged successfully`);
console.log(`   roycss.css:      ${(Buffer.byteLength(roycss) / 1024).toFixed(1)} KB`);
console.log(`   ferrum-effects:  ${(Buffer.byteLength(ferrum) / 1024).toFixed(1)} KB`);
console.log(`   ─────────────────────────────`);
console.log(`   merged output:  ${(mergedSize / 1024).toFixed(1)} KB`);
console.log(`   duplicate kfs:   ${dupes.length} removed`);
console.log(`   total saved:    ${(saved / 1024).toFixed(1)} KB`);
console.log(`   output:         public/ferrum-effects.css`);
