#!/usr/bin/env node
// ════════════════════════════════════════════════════════════════
// split-effects-css.mjs
// Splits public/ferrum-effects.css into per-category CSS files
// under public/effects/{category}.css with a manifest.json.
// ════════════════════════════════════════════════════════════════

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "fs";
import { join, basename, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const CSS_FILE = join(ROOT, "public/ferrum-effects.css");
const CATEGORY_DIR = join(ROOT, "src/lib/effects/by-category");
const OUTPUT_DIR = join(ROOT, "public/effects");
const MANIFEST_FILE = join(OUTPUT_DIR, "manifest.json");

// ─── 1. Read category TS files, extract className → category map ───
function buildClassNameToCategoryMap() {
  const map = new Map(); // className → category
  const categoryClassNames = new Map(); // category → Set<className>

  const files = readdirSync(CATEGORY_DIR).filter(f => f.endsWith(".ts"));

  for (const file of files) {
    const category = basename(file, ".ts");
    const content = readFileSync(join(CATEGORY_DIR, file), "utf-8");

    // Extract all className values: "className": "roycss-..."
    const classNameRegex = /"className"\s*:\s*"([^"]+)"/g;
    let match;
    while ((match = classNameRegex.exec(content)) !== null) {
      const cn = match[1];
      map.set(cn, category);
      if (!categoryClassNames.has(category)) {
        categoryClassNames.set(category, new Set());
      }
      categoryClassNames.get(category).add(cn);
    }
  }

  return { classNameToCategory: map, categoryClassNames };
}

// ─── 2. Parse CSS into blocks ─────────────────────────────────
// A "block" is either:
//   - A class/selector rule: `.foo { ... }` or `.foo::before { ... }`
//   - A @keyframes rule: `@keyframes name { ... }`
// We need to handle nested braces.

function parseCSSBlocks(css) {
  const blocks = []; // { type: 'rule'|'keyframe', selector: string, body: string, raw: string, startLine: number }
  let i = 0;
  let lineNum = 1;
  const len = css.length;

  while (i < len) {
    // Skip whitespace
    if (css[i] === "\n") { lineNum++; i++; continue; }
    if (css[i] === " " || css[i] === "\t" || css[i] === "\r") { i++; continue; }

    // Skip comments
    if (css[i] === "/" && css[i + 1] === "*") {
      const end = css.indexOf("*/", i + 2);
      if (end === -1) break;
      const commentLines = css.slice(i, end + 2).split("\n").length - 1;
      lineNum += commentLines;
      i = end + 2;
      continue;
    }

    // Detect @keyframes
    if (css.startsWith("@keyframes", i)) {
      const blockStart = i;
      i += 10; // skip @keyframes
      // skip whitespace
      while (i < len && (css[i] === " " || css[i] === "\t" || css[i] === "\n" || css[i] === "\r")) {
        if (css[i] === "\n") lineNum++;
        i++;
      }
      // read name
      let nameStart = i;
      while (i < len && css[i] !== "{" && css[i] !== " " && css[i] !== "\n" && css[i] !== "\r") i++;
      const name = css.slice(nameStart, i).trim();
      // skip to {
      while (i < len && css[i] !== "{") {
        if (css[i] === "\n") lineNum++;
        i++;
      }
      if (i >= len) break;
      i++; // skip {
      // find matching }
      let depth = 1;
      let bodyStart = i;
      while (i < len && depth > 0) {
        if (css[i] === "{") depth++;
        if (css[i] === "}") depth--;
        if (css[i] === "\n") lineNum++;
        i++;
      }
      const body = css.slice(bodyStart, i - 1);
      const raw = css.slice(blockStart, i);
      blocks.push({ type: "keyframe", name, body, raw, startLine: lineNum });
      continue;
    }

    // Detect a CSS rule (selector { ... })
    // A rule starts with a non-whitespace, non-@ character (or @ but not @keyframes)
    if (css[i] === "@" && !css.startsWith("@keyframes", i)) {
      // Other at-rule (like @media) — skip it
      let depth = 0;
      while (i < len) {
        if (css[i] === "{") depth++;
        if (css[i] === "}") {
          depth--;
          if (depth === 0) { i++; break; }
        }
        if (css[i] === "\n") lineNum++;
        i++;
      }
      continue;
    }

    if (css[i] === "}" || css[i] === ";") {
      i++;
      continue;
    }

    // Read selector
    const selectorStart = i;
    while (i < len && css[i] !== "{") {
      if (css[i] === "\n") lineNum++;
      i++;
    }
    if (i >= len) break;

    const selector = css.slice(selectorStart, i).trim();
    i++; // skip {

    // Read body with brace matching
    let depth = 1;
    let bodyStart = i;
    while (i < len && depth > 0) {
      if (css[i] === "{") depth++;
      if (css[i] === "}") depth--;
      if (css[i] === "\n") lineNum++;
      i++;
    }
    const body = css.slice(bodyStart, i - 1);
    const raw = css.slice(selectorStart, i);
    blocks.push({ type: "rule", selector, body, raw, startLine: lineNum });
  }

  return blocks;
}

// ─── 3. Extract animation names from CSS body ─────────────────
function extractAnimationNames(body) {
  const names = new Set();
  // Match animation: ... name ... or animation-name: name;
  const animRegex = /animation(?:-name)?\s*:\s*([^;{}]+)/g;
  let m;
  while ((m = animRegex.exec(body)) !== null) {
    const value = m[1].trim();
    // Animation value can be: name duration timing ... or just name
    // Split by comma for multiple animations, then take first token of each
    const parts = value.split(",");
    for (const part of parts) {
      const tokens = part.trim().split(/\s+/);
      // First token that looks like a name (not a number, not a keyword)
      for (const token of tokens) {
        if (token && !/^(\d|none|inherit|initial|unset|ease|linear|ease-in|ease-out|ease-in-out|step-start|step-end|infinite|alternate|reverse|both|forwards|backwards|normal|running|paused)/.test(token)) {
          names.add(token);
          break; // first token is the name
        }
      }
    }
  }
  return names;
}

// ─── 4. Build roycss → rc mapping ─────────────────────────────
function roycssToRc(className) {
  if (className.startsWith("roycss-")) {
    return "rc-" + className.slice(8);
  }
  return null;
}

// ─── Main ──────────────────────────────────────────────────────
function main() {
  console.log("Reading category files...");
  const { classNameToCategory, categoryClassNames } = buildClassNameToCategoryMap();
  console.log(`Found ${classNameToCategory.size} class names across ${categoryClassNames.size} categories`);

  // Also build rc- className → category mapping
  for (const [cn, cat] of classNameToCategory) {
    const rcCn = roycssToRc(cn);
    if (rcCn && !classNameToCategory.has(rcCn)) {
      classNameToCategory.set(rcCn, cat);
      categoryClassNames.get(cat).add(rcCn);
    }
  }
  console.log(`With rc- aliases: ${classNameToCategory.size} class names`);

  console.log("Parsing ferrum-effects.css...");
  const cssContent = readFileSync(CSS_FILE, "utf-8");
  const blocks = parseCSSBlocks(cssContent);
  console.log(`Parsed ${blocks.length} CSS blocks (${blocks.filter(b => b.type === 'rule').length} rules, ${blocks.filter(b => b.type === 'keyframe').length} keyframes)`);

  // Build lookup: baseClassName → rule blocks
  // A baseClassName is like "roycss-hover-glow-border" or "rc-hover-glow-border"
  const ruleBlocksByBase = new Map(); // baseClassName → [block, ...]
  const keyframeBlocksByName = new Map(); // name → block

  for (const block of blocks) {
    if (block.type === "keyframe") {
      keyframeBlocksByName.set(block.name, block);
    } else {
      // Extract base class name from selector
      // Selectors like: ".roycss-hover-glow-border", ".roycss-hover-glow-border:hover", ".roycss-hover-glow-border::before"
      // Also handle: ".rc-hover-glow-border", ".card-holographic", etc.
      const match = block.selector.match(/^\.([a-zA-Z0-9_-]+)/);
      if (match) {
        const base = match[1];
        if (!ruleBlocksByBase.has(base)) {
          ruleBlocksByBase.set(base, []);
        }
        ruleBlocksByBase.get(base).push(block);
      }
    }
  }

  // ─── 5. Assemble per-category CSS ─────────────────────────────
  const categoryCSS = new Map(); // category → Set<block raw strings>
  const categoryEffectCount = new Map(); // category → count of roycss-* effects (not rc- duplicates)
  const usedKeyframes = new Map(); // category → Set<keyframe names>

  for (const [category, classNames] of categoryClassNames) {
    const cssParts = new Set();
    const kfNames = new Set();
    let effectCount = 0;

    for (const cn of classNames) {
      const rules = ruleBlocksByBase.get(cn);
      if (!rules) continue;

      // Only count roycss-* as actual effects (rc-* are aliases)
      if (cn.startsWith("roycss-")) effectCount++;

      for (const rule of rules) {
        cssParts.add(rule.raw);
        // Extract referenced keyframes
        const animNames = extractAnimationNames(rule.body);
        for (const name of animNames) {
          kfNames.add(name);
        }
      }
    }

    // Add keyframe blocks
    for (const kfName of kfNames) {
      const kfBlock = keyframeBlocksByName.get(kfName);
      if (kfBlock) {
        cssParts.add(kfBlock.raw);
      }
    }

    categoryCSS.set(category, cssParts);
    categoryEffectCount.set(category, effectCount);
    usedKeyframes.set(category, kfNames);
  }

  // ─── 6. Write output files ────────────────────────────────────
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const manifest = {};
  let totalSize = 0;

  // Sort categories for consistent output
  const sortedCategories = [...categoryCSS.keys()].sort();

  for (const category of sortedCategories) {
    const parts = [...categoryCSS.get(category)];
    // Sort: keyframes first, then rules alphabetically
    parts.sort((a, b) => {
      const aIsKf = a.startsWith("@keyframes");
      const bIsKf = b.startsWith("@keyframes");
      if (aIsKf && !bIsKf) return -1;
      if (!aIsKf && bIsKf) return 1;
      return a.localeCompare(b);
    });

    const cssContent = parts.join("\n");
    const filePath = join(OUTPUT_DIR, `${category}.css`);
    const size = Buffer.byteLength(cssContent, "utf-8");

    writeFileSync(filePath, cssContent, "utf-8");
    totalSize += size;

    manifest[category] = {
      file: `${category}.css`,
      size,
      effectCount: categoryEffectCount.get(category),
      keyframeCount: usedKeyframes.get(category).size,
    };

    console.log(`  ${category}.css: ${(size / 1024).toFixed(1)}KB (${categoryEffectCount.get(category)} effects, ${usedKeyframes.get(category).size} keyframes)`);
  }

  // Write manifest
  writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
  console.log(`\nManifest written to ${MANIFEST_FILE}`);
  console.log(`Total per-category CSS: ${(totalSize / 1024).toFixed(1)}KB`);
  console.log(`Original monolithic: ${(Buffer.byteLength(readFileSync(CSS_FILE, "utf-8"), "utf-8") / 1024).toFixed(1)}KB`);
  console.log(`Categories: ${sortedCategories.length}`);
}

main();
