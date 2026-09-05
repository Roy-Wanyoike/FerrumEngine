/**
 * FerrumEngine v2 — Performance Analyzer
 *
 * Analyzes the application graph for performance issues:
 *   - Large bundle imports (lodash, moment, jquery)
 *   - Missing dynamic imports for route-level components
 *   - Image optimization issues
 *   - Unoptimized re-render potential
 *   - Large component files (>300 lines)
 *   - Barrel file performance issues
 */

import type {
  ApplicationGraph,
  Finding,
  AnalysisResult,
  Severity,
} from "../core/types";
import { generateId, getDependencies } from "../core/graph";

// ──────────────────────────────────────────────────────────────────────
// ANALYZER CONFIG
// ──────────────────────────────────────────────────────────────────────

export interface PerformanceConfig {
  /** Max component file lines before flagging. */
  maxComponentLines?: number;
  /** Known heavy libraries with approximate bundle sizes (kB). */
  heavyLibraries?: Record<string, number>;
  /** Max re-exports in a barrel file before flagging. */
  barrelThreshold?: number;
}

const DEFAULT_CONFIG: PerformanceConfig = {
  maxComponentLines: 300,
  heavyLibraries: {
    lodash: 72,
    "lodash-es": 72,
    moment: 70,
    jquery: 87,
    "three.js": 600,
    d3: 250,
    "chart.js": 200,
    firebase: 150,
    fabric: 300,
    "pdf-lib": 400,
  },
  barrelThreshold: 15,
};

// ──────────────────────────────────────────────────────────────────────
// MAIN ANALYZER
// ──────────────────────────────────────────────────────────────────────

export function analyzePerformance(
  graph: ApplicationGraph,
  config: PerformanceConfig = {},
): AnalysisResult {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const startTime = performance.now();
  const findings: Finding[] = [];

  findings.push(...detectLargeBundleImports(graph, cfg));
  findings.push(...detectMissingDynamicImports(graph, cfg));
  findings.push(...detectImageOptimizationIssues(graph));
  findings.push(...detectUnoptimizedRerenders(graph));
  findings.push(...detectLargeComponentFiles(graph, cfg));
  findings.push(...detectBarrelFileIssues(graph, cfg));

  const durationMs = performance.now() - startTime;

  return {
    analyzer: "performance",
    category: "performance",
    durationMs,
    findings,
    summary: summarizeFindings(findings),
  };
}

// ──────────────────────────────────────────────────────────────────────
// DETECTORS
// ──────────────────────────────────────────────────────────────────────

function detectLargeBundleImports(
  graph: ApplicationGraph,
  cfg: PerformanceConfig,
): Finding[] {
  const findings: Finding[] = [];
  const heavyLibs = cfg.heavyLibraries ?? {};

  for (const edge of graph.edges.values()) {
    if (edge.kind !== "imports") continue;
    const sourceNode = graph.nodes.get(edge.source);
    const targetNode = graph.nodes.get(edge.target);
    if (!sourceNode || !targetNode) continue;

    // Check if target is a package node from a known heavy library
    const libName = Object.keys(heavyLibs).find(
      (lib) =>
        targetNode.path.includes(`node_modules/${lib}`) ||
        targetNode.name === lib ||
        targetNode.path.startsWith(lib + "/"),
    );

    if (libName) {
      const size = heavyLibs[libName]!;
      const severity: Severity = size > 300 ? "high" : size > 100 ? "medium" : "low";

      findings.push({
        id: generateId(sourceNode.path, `heavy-import:${libName}`),
        category: "performance",
        severity,
        title: `Large bundle import: ${libName} (~${size}kB)`,
        description: `${sourceNode.name} statically imports ${libName}, adding approximately ${size}kB to the bundle. Consider using tree-shakeable alternatives or dynamic imports.`,
        evidence: [{
          description: `${sourceNode.path} imports ${libName} (~${size}kB)`,
          filePath: sourceNode.path,
          line: sourceNode.loc[0],
        }],
        affectedNodes: [edge.source, edge.target],
        suggestion: `Replace ${libName} with a lighter alternative or use dynamic import() to code-split this dependency.`,
        ruleId: "perf/large-bundle-import",
      });
    }
  }

  return findings;
}

function detectMissingDynamicImports(
  graph: ApplicationGraph,
  _cfg: PerformanceConfig,
): Finding[] {
  const findings: Finding[] = [];

  // Find page/route nodes that import heavy deps statically
  for (const node of graph.nodes.values()) {
    if (node.kind !== "page" && node.kind !== "route") continue;

    const deps = getDependencies(graph, node.id);
    const heavyDeps = deps.filter((d) => {
      const importEdge = [...graph.edges.values()].find(
        (e) => e.source === node.id && e.target === d.id && e.kind === "imports",
      );
      // Flag if it's a static import of a package (not dynamic)
      if (!importEdge) return false;
      if (importEdge.dynamic) return false; // already dynamic
      return d.kind === "package" || d.path.includes("node_modules");
    });

    if (heavyDeps.length > 0) {
      const depNames = heavyDeps.map((d) => d.name);
      findings.push({
        id: generateId(node.path, `missing-dynamic:${node.id}`),
        category: "performance",
        severity: "medium",
        title: `Route-level static imports: ${node.name}`,
        description: `Page/route ${node.name} statically imports ${depNames.length} external package(s): ${depNames.join(", ")}. These should be dynamically imported for code splitting.`,
        evidence: [{
          description: `Static imports: ${depNames.join(", ")}`,
          filePath: node.path,
        }],
        affectedNodes: [node.id, ...heavyDeps.map((d) => d.id)],
        suggestion: "Use next/dynamic or import() for route-level heavy dependencies to enable code splitting.",
        ruleId: "perf/missing-dynamic-import",
      });
    }
  }

  return findings;
}

function detectImageOptimizationIssues(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const edge of graph.edges.values()) {
    if (edge.kind !== "imports") continue;
    const sourceNode = graph.nodes.get(edge.source);
    const targetNode = graph.nodes.get(edge.target);
    if (!sourceNode || !targetNode) continue;

    // Detect image imports in component files without using next/image
    const isImage =
      targetNode.kind === "asset" &&
      /\.(png|jpg|jpeg|gif|bmp|webp|svg)$/i.test(targetNode.path);

    if (isImage) {
      const meta = sourceNode.meta as Record<string, unknown>;
      const usesNextImage = meta.usesNextImage === true;
      const hasLazyLoading = meta.lazyLoading === true;

      if (!usesNextImage && !hasLazyLoading) {
        findings.push({
          id: generateId(sourceNode.path, `img-opt:${targetNode.path}`),
          category: "performance",
          severity: "medium",
          title: `Unoptimized image import in ${sourceNode.name}`,
          description: `${sourceNode.path} imports image ${targetNode.path} without using next/image or lazy loading. This can result in unoptimized image delivery.`,
          evidence: [{
            description: `Image ${targetNode.path} imported without optimization`,
            filePath: sourceNode.path,
          }],
        affectedNodes: [edge.source, edge.target],
          suggestion: `Use next/image for automatic optimization, or add loading="lazy" to <img> tags.`,
          ruleId: "perf/image-optimization",
        });
      }
    }
  }

  return findings;
}

function detectUnoptimizedRerenders(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const node of graph.nodes.values()) {
    if (node.kind !== "component") continue;

    const deps = getDependencies(graph, node.id);
    const importCount = deps.filter((d) => {
      const edge = [...graph.edges.values()].find(
        (e) => e.source === node.id && e.target === d.id && e.kind === "imports",
      );
      return !!edge;
    }).length;

    const meta = node.meta as Record<string, unknown>;
    const hasMemo = meta.memo === true || meta.useMemo === true || meta.useCallback === true;

    // Flag components with many imports but no memo hints
    if (importCount > 8 && !hasMemo) {
      findings.push({
        id: generateId(node.path, `rerender:${node.id}`),
        category: "performance",
        severity: importCount > 15 ? "medium" : "low",
        title: `Potential re-render overhead: ${node.name} (${importCount} imports)`,
        description: `Component ${node.name} imports ${importCount} dependencies but has no memoization hints (React.memo, useMemo, useCallback). This may cause unnecessary re-renders.`,
        evidence: [{
          description: `${importCount} imports, no memoization detected`,
          filePath: node.path,
        }],
        affectedNodes: [node.id],
        suggestion: "Consider wrapping with React.memo, extracting expensive computations into useMemo, or memoizing callbacks with useCallback.",
        ruleId: "perf/unoptimized-rerender",
      });
    }
  }

  return findings;
}

function detectLargeComponentFiles(
  graph: ApplicationGraph,
  cfg: PerformanceConfig,
): Finding[] {
  const findings: Finding[] = [];
  const maxLines = cfg.maxComponentLines ?? 300;

  for (const node of graph.nodes.values()) {
    if (node.kind !== "component" && node.kind !== "page") continue;

    const lines = node.loc[1] - node.loc[0];
    if (lines > maxLines) {
      const severity: Severity = lines > maxLines * 3 ? "high" : lines > maxLines * 1.5 ? "medium" : "low";
      findings.push({
        id: generateId(node.path, `large-comp:${node.id}`),
        category: "performance",
        severity,
        title: `Large component file: ${node.name} (${lines} lines)`,
        description: `Component ${node.name} is ${lines} lines long (threshold: ${maxLines}). Large components are harder to optimize and may indicate too much responsibility.`,
        evidence: [{
          description: `${lines} lines (threshold: ${maxLines})`,
          filePath: node.path,
          line: maxLines,
        }],
        affectedNodes: [node.id],
        suggestion: "Split this component into smaller, focused sub-components. Extract hooks, utilities, and child components.",
        ruleId: "perf/large-component",
      });
    }
  }

  return findings;
}

function detectBarrelFileIssues(
  graph: ApplicationGraph,
  cfg: PerformanceConfig,
): Finding[] {
  const findings: Finding[] = [];
  const threshold = cfg.barrelThreshold ?? 15;

  for (const node of graph.nodes.values()) {
    if (node.kind !== "file") continue;
    if (!node.path.endsWith("/index.ts") && !node.path.endsWith("/index.tsx") && !node.path.endsWith("/index.js")) continue;

    // Count outgoing exports
    const exportEdges = [...graph.outgoing.get(node.id) ?? []]
      .map((eId) => graph.edges.get(eId)!)
      .filter(Boolean)
      .filter((e) => e.kind === "exports");

    if (exportEdges.length >= threshold) {
      findings.push({
        id: generateId(node.path, `barrel:${node.id}`),
        category: "performance",
        severity: "low",
        title: `Barrel file with many re-exports: ${node.path} (${exportEdges.length})`,
        description: `Barrel file ${node.path} re-exports ${exportEdges.length} modules. This can prevent tree-shaking and increase bundle size.`,
        evidence: [{
          description: `${exportEdges.length} re-exports (threshold: ${threshold})`,
          filePath: node.path,
        }],
        affectedNodes: [node.id],
        suggestion: "Consider using direct imports instead of barrel files, or split the barrel into smaller, domain-specific barrels.",
        ruleId: "perf/barrel-file",
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
