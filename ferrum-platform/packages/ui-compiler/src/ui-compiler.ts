// ─── Ferrum UI Compiler — Main Pipeline ──────────────────────────────────
// Orchestrates: Intent → UI-IR → Optimize → Backend.
// This is the "llvm-cl" equivalent — the top-level compiler driver.
// Zero external dependencies.
//
// Pipeline:
//   UIIntent
//     → [Intent Parser] → UIRModule (SSA IR)
//     → [9 Optimization Passes] → Optimized UIRModule
//     → [Backend CodeGen] → CSS / Canvas / Compositor output
// ═══════════════════════════════════════════════════════════════════════════

import type {
  UICompileResult,
  UICompileStats,
  UICompileWarning,
  UICompilerOptions,
  UIIntent,
} from "./types";
import { DEFAULT_DEVICE_PROFILE } from "./types";
import { parseIntent, parseIntentTree } from "./intent-parser";
import { runOptimizationPasses } from "./optimizer";
import {
  cssBackend,
  canvasBackend,
  compositorBackend,
  renderGraphBackend,
} from "./backends";

// ─── Main Compile Function ───────────────────────────────────────────────────

export function compile(
  intent: UIIntent,
  options: UICompilerOptions = {},
): UICompileResult {
  const startTime = performance.now();
  const warnings: UICompileWarning[] = [];
  const errors: UICompileWarning[] = [];
  const allDecisions: UICompileResult["decisions"] = [];

  const device = options.deviceProfile ?? DEFAULT_DEVICE_PROFILE;
  const target = options.target ?? "css";

  // ── Phase 1: Parse Intent → UI-IR ────────────────────────────────────
  const parseStart = performance.now();
  let irModule;
  try {
    irModule = parseIntent(intent, device);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    errors.push({ message: `Parse error: ${message}`, severity: "error" });
    return makeErrorResult(message, intent, startTime, errors);
  }
  const parseTime = performance.now() - parseStart;

  // ── Phase 2: Run Optimization Passes ──────────────────────────────────
  const optStart = performance.now();
  let optResult;
  try {
    optResult = runOptimizationPasses(irModule, options);
    irModule = optResult.module;
    allDecisions.push(...optResult.decisions);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    warnings.push({ message: `Optimization warning: ${message}`, severity: "warn", pass: "optimizer" });
  }
  const optimizationTime = performance.now() - optStart;

  // ── Phase 3: Backend Code Generation ──────────────────────────────────
  const codegenStart = performance.now();
  let css: string | undefined;
  let canvasCode: string | undefined;
  let webglCode: string | undefined;
  const renderGraph = irModule.renderGraph;
  const displayList = irModule.displayList;

  try {
    // CSS Backend (always run for decisions)
    const cssResult = cssBackend(irModule);
    css = cssResult.css;
    allDecisions.push(...cssResult.decisions);

    // Canvas Backend (if requested)
    if (target === "canvas" || target === "webgl") {
      const canvasResult = canvasBackend(irModule);
      canvasCode = canvasResult.canvasCode;
      allDecisions.push(...canvasResult.decisions);
    }

    // Compositor Backend (always run for analysis)
    const compResult = compositorBackend(irModule);
    allDecisions.push(...compResult.decisions);

    // Render Graph Backend (if render graph exists)
    if (renderGraph) {
      const rgResult = renderGraphBackend(irModule);
      allDecisions.push(...rgResult.decisions);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    warnings.push({ message: `Codegen warning: ${message}`, severity: "warn", pass: "backend" });
  }
  const codegenTime = performance.now() - codegenStart;

  // ── Build Stats ───────────────────────────────────────────────────────
  const totalTime = performance.now() - startTime;
  const stats: UICompileStats = {
    parseTime,
    irGenTime: parseTime,
    optimizationTime,
    codegenTime,
    totalTime,
    inputIntents: 1,
    irInstructions: irModule.instructions.length,
    irValues: irModule.values.size,
    reactiveScopes: irModule.reactiveScopes.length,
    renderPasses: renderGraph?.passes.length ?? 0,
    displayItems: displayList?.length ?? 0,
    layers: new Set(displayList?.map((d) => d.layerId)).size ?? 0,
    deadProperties: optResult?.deadCount ?? 0,
    cssBytes: css ? new TextEncoder().encode(css).length : undefined,
  };

  return {
    ir: irModule,
    css,
    canvasCode,
    webglCode,
    displayList,
    renderGraph,
    stats,
    warnings,
    errors,
    decisions: allDecisions,
  };
}

// ─── Multi-Intent Compile ────────────────────────────────────────────────────

export function compileTree(
  intents: UIIntent[],
  options: UICompilerOptions = {},
): UICompileResult {
  const startTime = performance.now();
  const warnings: UICompileWarning[] = [];
  const errors: UICompileWarning[] = [];
  const allDecisions: UICompileResult["decisions"] = [];

  const device = options.deviceProfile ?? DEFAULT_DEVICE_PROFILE;

  // Parse all intents into a single module
  const parseStart = performance.now();
  let irModule;
  try {
    irModule = parseIntentTree(intents, device);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    errors.push({ message: `Parse error: ${message}`, severity: "error" });
    return makeErrorResult(message, intents[0], startTime, errors, intents.length);
  }
  const parseTime = performance.now() - parseStart;

  // Optimize
  const optStart = performance.now();
  let optResult;
  try {
    optResult = runOptimizationPasses(irModule, options);
    irModule = optResult.module;
    allDecisions.push(...optResult.decisions);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    warnings.push({ message: `Optimization warning: ${message}`, severity: "warn" });
  }
  const optimizationTime = performance.now() - optStart;

  // Generate CSS
  const codegenStart = performance.now();
  let css: string | undefined;
  try {
    const cssResult = cssBackend(irModule);
    css = cssResult.css;
    allDecisions.push(...cssResult.decisions);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    warnings.push({ message: `Codegen warning: ${message}`, severity: "warn" });
  }
  const codegenTime = performance.now() - codegenStart;

  const totalTime = performance.now() - startTime;

  return {
    ir: irModule,
    css,
    displayList: irModule.displayList,
    renderGraph: irModule.renderGraph,
    stats: {
      parseTime,
      irGenTime: parseTime,
      optimizationTime,
      codegenTime,
      totalTime,
      inputIntents: intents.length,
      irInstructions: irModule.instructions.length,
      irValues: irModule.values.size,
      reactiveScopes: irModule.reactiveScopes.length,
      renderPasses: irModule.renderGraph?.passes.length ?? 0,
      displayItems: irModule.displayList?.length ?? 0,
      layers: 1,
      deadProperties: optResult?.deadCount ?? 0,
      cssBytes: css ? new TextEncoder().encode(css).length : undefined,
    },
    warnings,
    errors,
    decisions: allDecisions,
  };
}

// ─── Error Result Helper ──────────────────────────────────────────────────────

function makeErrorResult(
  message: string,
  intent: UIIntent | undefined,
  startTime: number,
  errors: UICompileWarning[],
  intentCount = 1,
): UICompileResult {
  return {
    ir: {
      id: `error-${Date.now()}`,
      version: "0.1.0",
      intents: intent ? [intent] : [],
      values: new Map(),
      instructions: [],
      propertyGraph: [],
      reactiveScopes: [],
      metadata: {},
    },
    stats: {
      parseTime: 0,
      irGenTime: 0,
      optimizationTime: 0,
      codegenTime: 0,
      totalTime: performance.now() - startTime,
      inputIntents: intentCount,
      irInstructions: 0,
      irValues: 0,
      reactiveScopes: 0,
      renderPasses: 0,
      displayItems: 0,
      layers: 0,
      deadProperties: 0,
    },
    warnings: [],
    errors,
    decisions: [],
  };
}