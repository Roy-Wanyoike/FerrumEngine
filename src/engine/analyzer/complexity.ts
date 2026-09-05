/**
 * FerrumEngine v2 — Complexity Intelligence Analyzer
 *
 * Analyzes the application graph for code complexity issues:
 *   - High cyclomatic complexity (many branches in functions)
 *   - Deep nesting (4+ levels)
 *   - Long functions (50+ lines)
 *   - Too many parameters (5+)
 *   - Callback hell
 *   - Large files
 */

import type {
  ApplicationGraph,
  Finding,
  AnalysisResult,
  Severity,
  EvidenceType,
} from "../core/types";
import { generateId } from "../core/graph";

// ──────────────────────────────────────────────────────────────────────
// ANALYZER CONFIG
// ──────────────────────────────────────────────────────────────────────

export interface ComplexityConfig {
  /** Max cyclomatic complexity before flagging. */
  maxCyclomaticComplexity?: number;
  /** Max nesting depth before flagging. */
  maxNestingDepth?: number;
  /** Max function lines before flagging. */
  maxFunctionLines?: number;
  /** Max parameter count before flagging. */
  maxParameters?: number;
  /** Max file lines before flagging. */
  maxFileLines?: number;
}

const DEFAULT_CONFIG: ComplexityConfig = {
  maxCyclomaticComplexity: 10,
  maxNestingDepth: 4,
  maxFunctionLines: 50,
  maxParameters: 5,
  maxFileLines: 500,
};

// ──────────────────────────────────────────────────────────────────────
// MAIN ANALYZER
// ──────────────────────────────────────────────────────────────────────

export function analyzeComplexity(
  graph: ApplicationGraph,
  config: ComplexityConfig = {},
): AnalysisResult {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const startTime = performance.now();
  const findings: Finding[] = [];

  findings.push(...detectHighCyclomaticComplexity(graph, cfg));
  findings.push(...detectDeepNesting(graph, cfg));
  findings.push(...detectLongFunctions(graph, cfg));
  findings.push(...detectTooManyParameters(graph, cfg));
  findings.push(...detectCallbackHell(graph));
  findings.push(...detectLargeFiles(graph, cfg));

  const durationMs = performance.now() - startTime;

  return {
    analyzer: "complexity",
    category: "complexity",
    durationMs,
    findings,
    summary: summarizeFindings(findings),
  };
}

// ──────────────────────────────────────────────────────────────────────
// DETECTORS
// ──────────────────────────────────────────────────────────────────────

function detectHighCyclomaticComplexity(
  graph: ApplicationGraph,
  cfg: ComplexityConfig,
): Finding[] {
  const findings: Finding[] = [];
  const threshold = cfg.maxCyclomaticComplexity ?? 10;

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "function" && node.kind !== "method") continue;
    const meta = node.meta as Record<string, unknown>;
    const complexity = typeof meta.cyclomaticComplexity === "number" ? meta.cyclomaticComplexity : 0;

    if (complexity >= threshold) {
      const severity: Severity = complexity > threshold * 2 ? "critical" : complexity > threshold * 1.5 ? "high" : "medium";
      findings.push({
        id: generateId(node.path, `cyclomatic:${nodeId}`),
        category: "complexity",
        severity,
        title: `High cyclomatic complexity: ${node.name} (${complexity})`,
        description: `Function ${node.name} has cyclomatic complexity of ${complexity}, exceeding the threshold of ${threshold}. High complexity makes code harder to test and maintain.`,
        evidence: [{
          description: `Cyclomatic complexity = ${complexity} (threshold: ${threshold})`,
          filePath: node.path,
          line: node.loc[0],
          data: { complexity, threshold },
        }],
        affectedNodes: [nodeId],
        evidenceType: "measured" as EvidenceType,
        confidence: 0.95,
        suggestion: "Reduce complexity by extracting helper functions, using early returns, or replacing nested conditionals with lookup tables or polymorphism.",
        ruleId: "complexity/cyclomatic",
      });
    }
  }

  return findings;
}

function detectDeepNesting(
  graph: ApplicationGraph,
  cfg: ComplexityConfig,
): Finding[] {
  const findings: Finding[] = [];
  const maxDepth = cfg.maxNestingDepth ?? 4;

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "function" && node.kind !== "method") continue;
    const meta = node.meta as Record<string, unknown>;
    const depth = typeof meta.nestingDepth === "number" ? meta.nestingDepth : 0;

    if (depth >= maxDepth) {
      const severity: Severity = depth > maxDepth + 3 ? "high" : "medium";
      findings.push({
        id: generateId(node.path, `nesting:${nodeId}`),
        category: "complexity",
        severity,
        title: `Deep nesting: ${node.name} (${depth} levels)`,
        description: `Function ${node.name} has ${depth} levels of nesting, exceeding the ${maxDepth}-level threshold. Deep nesting reduces readability and increases cognitive load.`,
        evidence: [{
          description: `Nesting depth = ${depth} (threshold: ${maxDepth})`,
          filePath: node.path,
          line: node.loc[0],
          data: { depth, threshold: maxDepth },
        }],
        affectedNodes: [nodeId],
        evidenceType: "measured" as EvidenceType,
        confidence: 0.9,
        suggestion: "Flatten nesting using early returns, guard clauses, or extracting nested logic into separate functions.",
        ruleId: "complexity/deep-nesting",
      });
    }
  }

  return findings;
}

function detectLongFunctions(
  graph: ApplicationGraph,
  cfg: ComplexityConfig,
): Finding[] {
  const findings: Finding[] = [];
  const maxLines = cfg.maxFunctionLines ?? 50;

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "function" && node.kind !== "method") continue;
    const lines = node.loc[1] - node.loc[0];

    if (lines >= maxLines) {
      const severity: Severity = lines > maxLines * 3 ? "high" : lines > maxLines * 1.5 ? "medium" : "low";
      findings.push({
        id: generateId(node.path, `long-fn:${nodeId}`),
        category: "complexity",
        severity,
        title: `Long function: ${node.name} (${lines} lines)`,
        description: `Function ${node.name} is ${lines} lines long, exceeding the ${maxLines}-line threshold. Long functions are harder to understand, test, and reuse.`,
        evidence: [{
          description: `${lines} lines (threshold: ${maxLines})`,
          filePath: node.path,
          line: node.loc[0],
          data: { lines, threshold: maxLines },
        }],
        affectedNodes: [nodeId],
        evidenceType: "measured" as EvidenceType,
        confidence: 0.95,
        suggestion: "Break this function into smaller, single-purpose functions. Each function should do one thing well.",
        ruleId: "complexity/long-function",
      });
    }
  }

  return findings;
}

function detectTooManyParameters(
  graph: ApplicationGraph,
  cfg: ComplexityConfig,
): Finding[] {
  const findings: Finding[] = [];
  const maxParams = cfg.maxParameters ?? 5;

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "function" && node.kind !== "method") continue;
    const meta = node.meta as Record<string, unknown>;
    const paramCount = typeof meta.paramCount === "number" ? meta.paramCount : 0;

    if (paramCount >= maxParams) {
      const severity: Severity = paramCount > maxParams + 3 ? "high" : "medium";
      findings.push({
        id: generateId(node.path, `params:${nodeId}`),
        category: "complexity",
        severity,
        title: `Too many parameters: ${node.name} (${paramCount} params)`,
        description: `Function ${node.name} takes ${paramCount} parameters, exceeding the ${maxParams}-parameter threshold. Many parameters increase call-site complexity and error-proneness.`,
        evidence: [{
          description: `${paramCount} parameters (threshold: ${maxParams})`,
          filePath: node.path,
          line: node.loc[0],
          data: { paramCount, threshold: maxParams },
        }],
        affectedNodes: [nodeId],
        evidenceType: "measured" as EvidenceType,
        confidence: 0.9,
        suggestion: "Group related parameters into an options object or use a builder pattern to reduce the number of arguments.",
        ruleId: "complexity/too-many-params",
      });
    }
  }

  return findings;
}

function detectCallbackHell(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "function" && node.kind !== "method") continue;
    const meta = node.meta as Record<string, unknown>;
    const callbackDepth = typeof meta.callbackDepth === "number" ? meta.callbackDepth : 0;

    if (callbackDepth >= 3) {
      const severity: Severity = callbackDepth >= 5 ? "high" : "medium";
      findings.push({
        id: generateId(node.path, `callback-hell:${nodeId}`),
        category: "complexity",
        severity,
        title: `Callback hell: ${node.name} (${callbackDepth} nested callbacks)`,
        description: `Function ${node.name} has ${callbackDepth} levels of nested callbacks. This creates deeply indented, hard-to-follow code.`,
        evidence: [{
          description: `${callbackDepth} nested callback levels`,
          filePath: node.path,
          line: node.loc[0],
          data: { callbackDepth },
        }],
        affectedNodes: [nodeId],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.85,
        suggestion: "Replace nested callbacks with async/await, Promises, or use a library like async.js for flow control.",
        ruleId: "complexity/callback-hell",
      });
    }
  }

  return findings;
}

function detectLargeFiles(
  graph: ApplicationGraph,
  cfg: ComplexityConfig,
): Finding[] {
  const findings: Finding[] = [];
  const maxLines = cfg.maxFileLines ?? 500;

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "file") continue;
    const lines = node.loc[1] - node.loc[0];
    if (lines > maxLines) {
      const severity: Severity = lines > maxLines * 3 ? "high" : "medium";
      findings.push({
        id: generateId(node.path, `large-file:${nodeId}`),
        category: "complexity",
        severity,
        title: `Large file: ${node.name} (${lines} lines)`,
        description: `File ${node.path} has ${lines} lines, exceeding the ${maxLines}-line threshold. Large files increase navigation and comprehension cost.`,
        evidence: [{
          description: `${lines} lines (threshold: ${maxLines})`,
          filePath: node.path,
          data: { lines, threshold: maxLines },
        }],
        affectedNodes: [nodeId],
        evidenceType: "measured" as EvidenceType,
        confidence: 0.9,
        suggestion: "Split this file into smaller modules grouped by responsibility.",
        ruleId: "complexity/large-file",
      });
    }
  }

  return findings;
}

// ──────────────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────────────

function summarizeFindings(findings: Finding[]) {
  return {
    critical: findings.filter((f) => f.severity === "critical").length,
    high: findings.filter((f) => f.severity === "high").length,
    medium: findings.filter((f) => f.severity === "medium").length,
    low: findings.filter((f) => f.severity === "low").length,
    info: findings.filter((f) => f.severity === "info").length,
  };
}
