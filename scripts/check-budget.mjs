#!/usr/bin/env node
/**
 * Ferrum Performance Budget Checker
 *
 * Runs in CI to enforce bundle size, dependency count,
 * and architecture constraints. Fails with exit code 1 if any
 * HARD budget is exceeded. Soft budgets generate warnings.
 *
 * Features:
 *   - Hard limits (build fails if exceeded)
 *   - Soft limits (warnings only)
 *   - Trend tracking (compare with previous build baseline)
 *   - JSON export for CI artifacts
 *
 * Usage: node scripts/check-budget.mjs
 * Usage: node scripts/check-budget.mjs --json  (machine-readable output)
 */

import { readFileSync, readdirSync, statSync, existsSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { execSync } from "node:child_process";

const KB = 1024;
const ROOT = resolve(import.meta.dirname, "..");
const JSON_OUTPUT = process.argv.includes("--json");

let passed = true;
let warnings = [];
let violations = [];
const results = {};

function check(name, actual, budget, unit = "KB", soft = false) {
  const ok = actual <= budget;
  const status = ok ? "✅" : (soft ? "⚠️" : "❌");
  const pct = Math.round((actual / budget) * 100);

  if (unit === "count" || unit === "MB") {
    const displayVal = unit === "count" ? Math.round(actual) : (actual / KB / KB).toFixed(1);
    const displayBudget = unit === "count" ? Math.round(budget) : (budget / KB / KB).toFixed(1);
    console.log(`  ${status} ${name}: ${displayVal} ${unit} / ${displayBudget} ${unit} (${pct}%)`);
  } else {
    console.log(`  ${status} ${name}: ${Math.round(actual / KB).toLocaleString()} ${unit} / ${Math.round(budget / KB).toLocaleString()} ${unit} (${pct}%)`);
  }

  if (!ok) {
    if (soft) {
      warnings.push(`${name}: exceeds soft limit (${pct}%)`);
    } else {
      passed = false;
      violations.push(`${name}: exceeds ${Math.round(budget / KB)}${unit}`);
    }
  }

  results[name] = { actual, budget, pct, ok };
}

function trendCheck(name, actual, baseline) {
  const diff = actual - baseline;
  const pctChange = Math.round((diff / baseline) * 100);
  const arrow = diff > 0 ? "📈" : (diff < 0 ? "📉" : "➡️");
  const sign = diff >= 0 ? "+" : "";
  if (Math.abs(pctChange) > 5) {
    console.log(`     ${arrow} Trend vs baseline: ${sign}${pctChange}% (baseline: ${Math.round(baseline / KB)}KB)`);
    if (pctChange > 10) {
      warnings.push(`${name}: ${sign}${pctChange}% vs baseline — investigate`);
    }
  }
}

// ─── Baseline tracking ──────────────────────────────────────
const baselinePath = join(ROOT, ".budget-baseline.json");
let baseline = null;
try {
  baseline = JSON.parse(readFileSync(baselinePath, "utf-8"));
  console.log("📋 Loaded baseline from .budget-baseline.json");
} catch {
  console.log("📋 No baseline found — will save current results as baseline");
}

// ─── 1. First-Load JS Bundle Size ───────────────────────────
console.log("\n📦 First-Load JS Bundle Size");
const staticDir = join(ROOT, ".next/static/chunks");
const routeStatsPath = join(ROOT, ".next/diagnostics/route-bundle-stats.json");

// Measure first-load JS (chunks needed for initial page render only)
let firstLoadJS = 0;
let maxChunk = 0;
let totalJS = 0;
try {
  const routeStats = JSON.parse(readFileSync(routeStatsPath, "utf-8"));
  const route = routeStats.find(r => r.route === "/");
  if (route) {
    const seen = new Set();
    for (const chunkPath of route.firstLoadChunkPaths) {
      const fullPath = join(ROOT, chunkPath);
      if (seen.has(chunkPath) || !existsSync(fullPath)) continue;
      seen.add(chunkPath);
      const size = statSync(fullPath).size;
      firstLoadJS += size;
      if (size > maxChunk) maxChunk = size;
    }
  }
  // Also scan all chunks for total JS and max chunk reporting
  for (const f of readdirSync(staticDir)) {
    if (!f.endsWith(".js")) continue;
    const size = statSync(join(staticDir, f)).size;
    totalJS += size;
    if (size > maxChunk) maxChunk = size;
  }

  // Hard limit: 200KB gzip estimate (~600KB raw) for first load
  check("First-Load JS (gzip estimate)", firstLoadJS, 600 * KB);
  console.log(`     First-Load JS (raw): ${Math.round(firstLoadJS / KB).toLocaleString()} KB`);
  console.log(`     First-Load JS (~gzip): ~${Math.round(firstLoadJS / KB / 3)} KB`);

  // Soft limit: warn if > 500KB raw (potential regression)
  check("First-Load JS (soft limit)", firstLoadJS, 500 * KB, "KB", true);

  // Hard: largest chunk
  check("Largest Chunk", maxChunk, 250 * KB);

  // Soft: warn if largest chunk > 200KB
  check("Largest Chunk (soft limit)", maxChunk, 200 * KB, "KB", true);

  console.log(`     Total all JS: ${Math.round(totalJS / KB).toLocaleString()} KB`);

  // Trend tracking
  if (baseline?.firstLoadJS) trendCheck("First-Load JS", firstLoadJS, baseline.firstLoadJS);

} catch {
  // Fallback: measure all JS chunks if route stats unavailable
  try {
    for (const f of readdirSync(staticDir)) {
      if (!f.endsWith(".js")) continue;
      const size = statSync(join(staticDir, f)).size;
      totalJS += size;
      if (size > maxChunk) maxChunk = size;
    }
    console.log("  ⚠️  No route-bundle-stats.json — measuring all chunks as fallback");
    check("Total JS Payload (all chunks)", totalJS, 2200 * KB);
    check("Largest Chunk", maxChunk, 250 * KB);
  } catch {
    console.log("  ⚠️  No build artifacts found — run `next build` first");
  }
}

// ─── 2. CSS Bundle Size ───────────────────────────────────────
console.log("\n🎨 CSS Bundle Size");
let totalCSS = 0;
try {
  for (const f of readdirSync(staticDir)) {
    if (!f.endsWith(".css")) continue;
    totalCSS += statSync(join(staticDir, f)).size;
  }
  check("Initial CSS", totalCSS, 300 * KB);

  // Soft limit
  check("Initial CSS (soft limit)", totalCSS, 200 * KB, "KB", true);

  if (baseline?.totalCSS) trendCheck("CSS", totalCSS, baseline.totalCSS);
} catch {}

// ─── 3. Effects CSS (on-demand) ──────────────────────────────
console.log("\n✨ Effects CSS (on-demand)");
const effectsCSS = join(ROOT, "public/ferrum-effects.css");
try {
  const eSize = statSync(effectsCSS).size;
  check("Effects CSS", eSize, 650 * KB);
} catch {}

// ─── 4. Runtime Dependencies ────────────────────────────────
console.log("\n📚 Runtime Dependencies");
const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf-8"));
const runtimeDeps = Object.keys(pkg.dependencies || {}).length;

// Hard: must not exceed 13
check("Runtime deps", runtimeDeps, 13, "count");

// Soft: warn if approaching limit
check("Runtime deps (soft limit)", runtimeDeps, 10, "count", true);

console.log(`     Dependencies: ${Object.keys(pkg.dependencies || {}).join(", ")}`);

// ─── 5. node_modules Size ────────────────────────────────────
console.log("\n📂 node_modules Size");
try {
  const nmSize = parseInt(execSync("du -sb node_modules | cut -f1", { cwd: ROOT }).toString().trim());
  check("node_modules", nmSize, 700 * KB * KB, "MB");

  // Soft limit: warn if > 400MB
  check("node_modules (soft limit)", nmSize, 400 * KB * KB, "MB", true);
} catch {}

// ─── 6. File Size Limits ──────────────────────────────────────
console.log("\n📏 File Size Limits");
const srcDir = join(ROOT, "src");
const dataFileMax = 4000;
const componentMax = 500;
function scanDir(dir, ext) {
  let results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...scanDir(full, ext));
    } else if (entry.name.endsWith(ext)) {
      const lines = readFileSync(full, "utf-8").split("\n").length;
      const isData = full.includes("lib/") && full.includes("-data");
      const max = isData ? dataFileMax : componentMax;
      if (lines > max) results.push({ file: full.replace(ROOT + "/", ""), lines, max });
    }
  }
  return results;
}
const bigFiles = scanDir(srcDir, ".ts").concat(scanDir(srcDir, ".tsx"));
for (const f of bigFiles) {
  const over = f.lines - f.max;
  console.log(`  ⚠️  ${f.file}: ${f.lines} lines (max ${f.max}, +${over})`);
}
if (bigFiles.length === 0) console.log("  ✅ All files within limits");

// ─── Save baseline for future comparison ──────────────────
if (!baseline) {
  const newBaseline = { firstLoadJS, totalJS, totalCSS, timestamp: new Date().toISOString() };
  writeFileSync(baselinePath, JSON.stringify(newBaseline, null, 2));
  console.log("\n💾 Saved baseline to .budget-baseline.json");
}

// ─── Results ─────────────────────────────────────────────────
console.log("\n" + "═".repeat(50));

if (warnings.length > 0) {
  console.log(`⚠️  ${warnings.length} WARNING(S)`);
  for (const w of warnings) console.log(`   → ${w}`);
}

if (passed && violations.length === 0) {
  console.log("✅ ALL HARD BUDGETS PASSED" + (warnings.length > 0 ? ` (${warnings.length} soft warnings)` : ""));
  if (JSON_OUTPUT) {
    process.stdout.write(JSON.stringify({ status: "pass", results, warnings }, null, 2));
  }
  process.exit(0);
} else {
  console.log(`❌ ${violations.length} VIOLATION(S) FOUND`);
  for (const v of violations) console.log(`   → ${v}`);
  if (JSON_OUTPUT) {
    process.stdout.write(JSON.stringify({ status: "fail", results, violations, warnings }, null, 2));
  }
  process.exit(1);
}
