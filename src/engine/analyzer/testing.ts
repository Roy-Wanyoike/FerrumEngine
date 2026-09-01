/**
 * FerrumEngine v2 — Testing Analyzer
 *
 * Analyzes the application graph for testing issues:
 *   - Untested modules (files with no corresponding test file)
 *   - Test coverage gaps (components with many dependents but no tests)
 *   - Test file anti-patterns (test files that only import but don't test)
 *   - Missing integration tests for API routes
 *   - Test files testing deleted/nonexistent modules
 *   - Large test files suggesting testing fatigue
 */

import type {
  ApplicationGraph,
  Finding,
  AnalysisResult,
  Severity,
} from "../core/types";
import { generateId, getDependents } from "../core/graph";

// ──────────────────────────────────────────────────────────────────────
// ANALYZER CONFIG
// ──────────────────────────────────────────────────────────────────────

export interface TestingConfig {
  /** Min dependents before flagging as needing tests. */
  dependentThreshold?: number;
  /** Max test file lines before flagging as too large. */
  maxTestFileLines?: number;
  /** Patterns for test file discovery. */
  testFilePatterns?: RegExp[];
}

const DEFAULT_CONFIG: TestingConfig = {
  dependentThreshold: 3,
  maxTestFileLines: 500,
  testFilePatterns: [
    /[\\/]__tests__[\\/]/,
    /[\\/]test[\\/]/,
    /[\\/]tests[\\/]/,
    /[\\/]spec[\\/]/,
    /[\\/]specs[\\/]/,
    /\.test\.(ts|tsx|js|jsx|mjs|cjs)$/,
    /\.spec\.(ts|tsx|js|jsx|mjs|cjs)$/,
  ],
};

// ──────────────────────────────────────────────────────────────────────
// MAIN ANALYZER
// ──────────────────────────────────────────────────────────────────────

export function analyzeTesting(
  graph: ApplicationGraph,
  config: TestingConfig = {},
): AnalysisResult {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const startTime = performance.now();
  const findings: Finding[] = [];

  findings.push(...detectUntestedModules(graph, cfg));
  findings.push(...detectTestCoverageGaps(graph, cfg));
  findings.push(...detectTestAntiPatterns(graph));
  findings.push(...detectMissingApiTests(graph));
  findings.push(...detectOrphanedTests(graph));
  findings.push(...detectLargeTestFiles(graph, cfg));

  const durationMs = performance.now() - startTime;

  return {
    analyzer: "testing",
    category: "testing",
    durationMs,
    findings,
    summary: summarizeFindings(findings),
  };
}

// ──────────────────────────────────────────────────────────────────────
// DETECTORS
// ──────────────────────────────────────────────────────────────────────

function isTestFile(path: string, patterns: RegExp[]): boolean {
  return patterns.some((p) => p.test(path));
}

function detectUntestedModules(
  graph: ApplicationGraph,
  cfg: TestingConfig,
): Finding[] {
  const findings: Finding[] = [];
  const patterns = cfg.testFilePatterns ?? [];

  // Collect all test file paths
  const testPaths = new Set<string>();
  for (const node of graph.nodes.values()) {
    if (node.kind === "test" || isTestFile(node.path, patterns)) {
      testPaths.add(node.path);
    }
  }

  // Check source files for corresponding tests
  const testedSourcePaths = new Set<string>();
  for (const testPath of testPaths) {
    // Find what this test targets via test-of edges
    const testNode = [...graph.nodes.values()].find(
      (n) => n.path === testPath,
    );
    if (testNode) {
      const testOfEdges = [...graph.outgoing.get(testNode.id) ?? []]
        .map((eId) => graph.edges.get(eId)!)
        .filter(Boolean)
        .filter((e) => e.kind === "test-of");
      for (const edge of testOfEdges) {
        const target = graph.nodes.get(edge.target);
        if (target) testedSourcePaths.add(target.path);
      }
    }

    // Also check by naming convention
    const basePath = testPath
      .replace(/\.test\.[^.]+$/, "")
      .replace(/\.spec\.[^.]+$/, "");
    for (const ext of [".ts", ".tsx", ".js", ".jsx"]) {
      testedSourcePaths.add(basePath + ext);
    }
  }

  // Find untested source files (skip configs, assets, etc.)
  const skippableKinds = new Set(["config", "asset", "style", "type", "enum", "interface"]);
  for (const node of graph.nodes.values()) {
    if (skippableKinds.has(node.kind)) continue;
    if (node.kind !== "file" && node.kind !== "component" && node.kind !== "hook"
      && node.kind !== "utility" && node.kind !== "function" && node.kind !== "api") continue;

    if (isTestFile(node.path, patterns)) continue;
    if (testedSourcePaths.has(node.path)) continue;

    findings.push({
      id: generateId(node.path, `untested:${node.id}`),
      category: "testing",
      severity: "low",
      title: `Untested module: ${node.name}`,
      description: `${node.path} has no corresponding test file. Untested code is a liability for refactoring and catching regressions.`,
      evidence: [{
        description: "No test file found",
        filePath: node.path,
      }],
      affectedNodes: [node.id],
      suggestion: `Add a test file following your project's conventions (e.g., ${node.path.replace(/\.[^.]+$/, ".test.ts")}).`,
      ruleId: "testing/untested-module",
    });
  }

  return findings;
}

function detectTestCoverageGaps(
  graph: ApplicationGraph,
  cfg: TestingConfig,
): Finding[] {
  const findings: Finding[] = [];
  const threshold = cfg.dependentThreshold ?? 3;
  const patterns = cfg.testFilePatterns ?? [];

  for (const node of graph.nodes.values()) {
    if (node.kind !== "component" && node.kind !== "utility" && node.kind !== "hook") continue;

    const dependents = getDependents(graph, node.id);
    if (dependents.length < threshold) continue;

    // Check if this node has any test-of edges pointing to it
    const hasTests = [...graph.incoming.get(node.id) ?? []]
      .map((eId) => graph.edges.get(eId)!)
      .filter(Boolean)
      .some((e) => e.kind === "test-of");

    if (!hasTests) {
      findings.push({
        id: generateId(node.path, `coverage-gap:${node.id}`),
        category: "testing",
        severity: "medium",
        title: `Coverage gap: ${node.name} (${dependents.length} dependents, no tests)`,
        description: `${node.name} is used by ${dependents.length} modules but has no tests. Given its wide usage, bugs here will have outsized impact.`,
        evidence: [{
          description: `${dependents.length} dependents, no test coverage`,
          filePath: node.path,
        }],
        affectedNodes: [node.id, ...dependents.map((d) => d.id)],
        suggestion: "Prioritize adding tests for this module. It has many consumers, so bugs here cascade widely.",
        ruleId: "testing/coverage-gap",
      });
    }
  }

  return findings;
}

function detectTestAntiPatterns(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const node of graph.nodes.values()) {
    if (node.kind !== "test") continue;

    const meta = node.meta as Record<string, unknown>;
    const hasAssertions = meta.hasAssertions === true || meta.assertionCount > 0;
    const importCount = meta.importCount ?? 0;

    // Test file that only imports but doesn't test
    if (!hasAssertions) {
      findings.push({
        id: generateId(node.path, `no-assertions:${node.id}`),
        category: "testing",
        severity: "medium",
        title: `Test file without assertions: ${node.name}`,
        description: `${node.path} appears to be a test file but contains no assertions. This gives a false sense of test coverage.`,
        evidence: [{
          description: "No test assertions detected",
          filePath: node.path,
        }],
        affectedNodes: [node.id],
        suggestion: "Add meaningful test assertions, or remove this test file if it's no longer relevant.",
        ruleId: "testing/no-assertions",
      });
    }
  }

  return findings;
}

function detectMissingApiTests(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  // Find all API routes
  const apiNodes = [...graph.nodes.values()].filter((n) => n.kind === "api");

  // Find all test nodes that test API routes
  const testedApiPaths = new Set<string>();
  for (const edge of graph.edges.values()) {
    if (edge.kind !== "test-of") continue;
    const targetNode = graph.nodes.get(edge.target);
    if (targetNode?.kind === "api") {
      testedApiPaths.add(targetNode.path);
    }
  }

  for (const apiNode of apiNodes) {
    if (testedApiPaths.has(apiNode.path)) continue;

    findings.push({
      id: generateId(apiNode.path, `no-api-test:${apiNode.id}`),
      category: "testing",
      severity: "high",
      title: `Untested API route: ${apiNode.name}`,
      description: `API route ${apiNode.path} has no integration tests. API routes handle external input and should be thoroughly tested.`,
      evidence: [{
        description: "No test-of edges found for this API route",
        filePath: apiNode.path,
      }],
      affectedNodes: [apiNode.id],
      suggestion: "Add integration tests for this API route covering success cases, error cases, and edge cases.",
      ruleId: "testing/untested-api-route",
    });
  }

  return findings;
}

function detectOrphanedTests(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const node of graph.nodes.values()) {
    if (node.kind !== "test") continue;

    // Check if test-of edges point to existing nodes
    const testOfEdges = [...graph.outgoing.get(node.id) ?? []]
      .map((eId) => graph.edges.get(eId)!)
      .filter(Boolean)
      .filter((e) => e.kind === "test-of");

    for (const edge of testOfEdges) {
      const targetNode = graph.nodes.get(edge.target);
      if (!targetNode) {
        // Target no longer exists
        const targetName = String(edge.meta.targetName ?? edge.meta.importPath ?? "unknown");
        findings.push({
          id: generateId(node.path, `orphaned-test:${edge.target}`),
          category: "testing",
          severity: "low",
          title: `Orphaned test: ${node.name} targets ${targetName}`,
          description: `Test file ${node.path} tests "${targetName}" which no longer exists in the codebase. This test should be removed or updated.`,
          evidence: [{
            description: `Test target "${targetName}" not found in graph`,
            filePath: node.path,
          }],
          affectedNodes: [node.id],
          suggestion: `Remove or update this test to match the current codebase structure.`,
          ruleId: "testing/orphaned-test",
        });
      }
    }
  }

  return findings;
}

function detectLargeTestFiles(
  graph: ApplicationGraph,
  cfg: TestingConfig,
): Finding[] {
  const findings: Finding[] = [];
  const maxLines = cfg.maxTestFileLines ?? 500;

  for (const node of graph.nodes.values()) {
    if (node.kind !== "test") continue;

    const lines = node.loc[1] - node.loc[0];
    if (lines > maxLines) {
      findings.push({
        id: generateId(node.path, `large-test:${node.id}`),
        category: "testing",
        severity: lines > maxLines * 2 ? "medium" : "low",
        title: `Large test file: ${node.name} (${lines} lines)`,
        description: `Test file ${node.path} is ${lines} lines (threshold: ${maxLines}). Very large test files may indicate testing fatigue and reduced maintainability.`,
        evidence: [{
          description: `${lines} lines (threshold: ${maxLines})`,
          filePath: node.path,
          line: maxLines,
        }],
        affectedNodes: [node.id],
        suggestion: "Split this test file into smaller, focused test files organized by feature or behavior.",
        ruleId: "testing/large-test-file",
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
