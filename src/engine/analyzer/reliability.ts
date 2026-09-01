/**
 * FerrumEngine v2 - Reliability Analyzer
 *
 * Analyzes the application graph for reliability issues:
 *   - Missing error boundaries
 *   - Unhandled promise rejections
 *   - Missing loading/error states (Next.js App Router)
 *   - Bare fetch calls without error handling
 *   - Components that could throw without error boundaries
 *   - Missing fallback for conditional rendering
 */

import type {
  ApplicationGraph,
  Finding,
  AnalysisResult,
  Severity,
} from "../core/types";
import { generateId, getDependencies, getDependents } from "../core/graph";

// ----------------------------------------------------------------
// ANALYZER CONFIG
// ----------------------------------------------------------------

export interface ReliabilityConfig {
  /** Whether to check for Next.js App Router loading/error files. */
  checkNextjsStates?: boolean;
}

const DEFAULT_CONFIG: ReliabilityConfig = {
  checkNextjsStates: true,
};

// ----------------------------------------------------------------
// MAIN ANALYZER
// ----------------------------------------------------------------

export function analyzeReliability(
  graph: ApplicationGraph,
  config: ReliabilityConfig = {},
): AnalysisResult {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const startTime = performance.now();
  const findings: Finding[] = [];

  findings.push(...detectMissingErrorBoundaries(graph));
  findings.push(...detectUnhandledPromiseRejections(graph));
  findings.push(...detectMissingLoadingErrorStates(graph, cfg));
  findings.push(...detectBareFetchCalls(graph));
  findings.push(...detectUnprotectedThrowingComponents(graph));
  findings.push(...detectMissingConditionalFallbacks(graph));

  const durationMs = performance.now() - startTime;

  return {
    analyzer: "reliability",
    category: "reliability",
    durationMs,
    findings,
    summary: summarizeFindings(findings),
  };
}

// ----------------------------------------------------------------
// DETECTORS
// ----------------------------------------------------------------

function detectMissingErrorBoundaries(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  // Check if the app has any error boundary components at all
  const hasErrorBoundary = [...graph.nodes.values()].some((node) => {
    const meta = node.meta as Record<string, unknown>;
    return (
      meta.isErrorBoundary === true ||
      meta.componentDidCatch === true ||
      meta.getDerivedStateFromError === true ||
      node.name.toLowerCase().includes("errorboundary") ||
      node.name.toLowerCase().includes("error-boundary")
    );
  });

  if (!hasErrorBoundary) {
    // Find the root layout component
    const layouts = [...graph.nodes.values()].filter(
      (n) => n.kind === "layout",
    );

    if (layouts.length > 0) {
      findings.push({
        id: generateId(layouts[0]!.path, "no-error-boundary"),
        category: "reliability",
        severity: "high",
        title: "No error boundaries detected",
        description: "The application has no React error boundaries. Unhandled errors in components will crash the entire application tree.",
        evidence: layouts.map((l) => ({
          description: `Layout ${l.path} has no error boundary ancestor`,
          filePath: l.path,
        })),
        affectedNodes: layouts.map((l) => l.id),
        suggestion: "Add React error boundaries around key sections of your app, especially around route handlers and complex UI trees.",
        ruleId: "reliability/missing-error-boundary",
      });
    }
  }

  return findings;
}

function detectUnhandledPromiseRejections(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const node of graph.nodes.values()) {
    if (node.kind !== "function" && node.kind !== "hook" && node.kind !== "component") continue;

    const meta = node.meta as Record<string, unknown>;
    const isAsync = meta.async === true;
    const hasTryCatch = meta.hasTryCatch === true;
    const hasErrorHandling = meta.hasErrorHandling === true;

    if (isAsync && !hasTryCatch && !hasErrorHandling) {
      findings.push({
        id: generateId(node.path, `unhandled-promise:${node.id}`),
        category: "reliability",
        severity: "medium",
        title: `Unhandled promise: ${node.name}`,
        description: `Async function ${node.name} in ${node.path} has no try/catch or error handling. Unhandled rejections will propagate as uncaught errors.`,
        evidence: [{
          description: "Async function without try/catch",
          filePath: node.path,
          line: node.loc[0],
        }],
        affectedNodes: [node.id],
        suggestion: "Wrap async operations in try/catch blocks, or add .catch() handlers to returned promises.",
        ruleId: "reliability/unhandled-promise",
      });
    }
  }

  return findings;
}

function detectMissingLoadingErrorStates(
  graph: ApplicationGraph,
  cfg: ReliabilityConfig,
): Finding[] {
  const findings: Finding[] = [];

  if (!cfg.checkNextjsStates) return findings;

  // Collect route directories that have page components
  const routeDirs = new Map<string, string>(); // dir -> page nodeId
  for (const node of graph.nodes.values()) {
    if (node.kind === "page") {
      const dir = node.path.split("/").slice(0, -1).join("/");
      if (dir) routeDirs.set(dir, node.id);
    }
  }

  // Collect paths of all loading.tsx and error.tsx files
  const loadingPaths = new Set<string>();
  const errorPaths = new Set<string>();
  for (const node of graph.nodes.values()) {
    if (node.path.endsWith("/loading.tsx") || node.path.endsWith("/loading.jsx")) {
      loadingPaths.add(node.path.split("/").slice(0, -1).join("/"));
    }
    if (node.path.endsWith("/error.tsx") || node.path.endsWith("/error.jsx")) {
      errorPaths.add(node.path.split("/").slice(0, -1).join("/"));
    }
  }

  for (const [dir, pageId] of routeDirs) {
    const hasLoading = loadingPaths.has(dir);
    const hasError = errorPaths.has(dir);

    if (!hasLoading) {
      const pageNode = graph.nodes.get(pageId)!;
      findings.push({
        id: generateId(dir, "missing-loading-state"),
        category: "reliability",
        severity: "low",
        title: `Missing loading.tsx in ${dir}`,
        description: `Route directory ${dir}/ has a page component but no loading.tsx. Users will see a blank screen during data fetching.`,
        evidence: [{
          description: "No loading.tsx found in route directory",
          filePath: pageNode.path,
        }],
        affectedNodes: [pageId],
        suggestion: "Add a loading.tsx file to show a loading skeleton or spinner during page data fetching.",
        ruleId: "reliability/missing-loading-state",
      });
    }

    if (!hasError) {
      const pageNode = graph.nodes.get(pageId)!;
      findings.push({
        id: generateId(dir, "missing-error-state"),
        category: "reliability",
        severity: "medium",
        title: `Missing error.tsx in ${dir}`,
        description: `Route directory ${dir}/ has a page component but no error.tsx. Runtime errors will propagate to the nearest parent error boundary or crash the page.`,
        evidence: [{
          description: "No error.tsx found in route directory",
          filePath: pageNode.path,
        }],
        affectedNodes: [pageId],
        suggestion: "Add an error.tsx file to gracefully handle runtime errors and provide recovery options.",
        ruleId: "reliability/missing-error-state",
      });
    }
  }

  return findings;
}

function detectBareFetchCalls(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const node of graph.nodes.values()) {
    if (node.kind !== "component" && node.kind !== "hook" && node.kind !== "function") continue;

    const meta = node.meta as Record<string, unknown>;
    const hasFetch = meta.usesFetch === true || meta.usesAxios === true;
    const hasErrorHandling = meta.hasErrorHandling === true || meta.hasTryCatch === true;

    if (hasFetch && !hasErrorHandling) {
      findings.push({
        id: generateId(node.path, `bare-fetch:${node.id}`),
        category: "reliability",
        severity: "medium",
        title: `Fetch without error handling: ${node.name}`,
        description: `${node.name} in ${node.path} makes fetch/axios calls without error handling. Network failures will result in unhandled rejections.`,
        evidence: [{
          description: "Fetch/axios call without try/catch or .catch()",
          filePath: node.path,
          line: node.loc[0],
        }],
        affectedNodes: [node.id],
        suggestion: "Wrap fetch calls in try/catch or add .catch() handlers. Consider using a shared fetch utility with built-in error handling.",
        ruleId: "reliability/bare-fetch",
      });
    }
  }

  return findings;
}

function detectUnprotectedThrowingComponents(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  // Find error boundary nodes
  const errorBoundaryIds = new Set(
    [...graph.nodes.values()]
      .filter((n) => {
        const m = n.meta as Record<string, unknown>;
        return (
          m.isErrorBoundary === true ||
          m.componentDidCatch === true ||
          n.name.toLowerCase().includes("errorboundary") ||
          n.name.toLowerCase().includes("error-boundary")
        );
      })
      .map((n) => n.id),
  );

  if (errorBoundaryIds.size === 0) return findings;

  // Find components that could throw (use data fetching, access properties, etc.)
  for (const node of graph.nodes.values()) {
    if (node.kind !== "component" && node.kind !== "page") continue;

    const meta = node.meta as Record<string, unknown>;
    const couldThrow = meta.couldThrow === true || meta.usesFetch === true || meta.usesPropertyAccess === true;

    if (!couldThrow) continue;

    // Walk up the render tree to check for error boundary ancestor
    const dependents = getDependents(graph, node.id);
    const allAncestors = new Set<string>();
    const queue = [...dependents.map((d) => d.id)];
    while (queue.length > 0) {
      const current = queue.shift()!;
      if (allAncestors.has(current)) continue;
      allAncestors.add(current);
      const parentDependents = getDependents(graph, current);
      queue.push(...parentDependents.map((d) => d.id));
    }

    const hasBoundaryAncestor = [...allAncestors].some((id) => errorBoundaryIds.has(id));

    if (!hasBoundaryAncestor) {
      findings.push({
        id: generateId(node.path, `unprotected-throw:${node.id}`),
        category: "reliability",
        severity: "medium",
        title: `Unprotected throwing component: ${node.name}`,
        description: `${node.name} in ${node.path} could throw at runtime but has no error boundary ancestor in the render tree.`,
        evidence: [{
          description: "Component could throw; no error boundary in ancestor chain",
          filePath: node.path,
        }],
        affectedNodes: [node.id],
        suggestion: "Wrap this component (or its parent) in a React error boundary to prevent crashes from propagating.",
        ruleId: "reliability/unprotected-throwing-component",
      });
    }
  }

  return findings;
}

function detectMissingConditionalFallbacks(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const node of graph.nodes.values()) {
    if (node.kind !== "component") continue;

    const meta = node.meta as Record<string, unknown>;
    const hasConditionalRender = meta.hasConditionalRender === true;
    const hasFallback = meta.hasFallback === true;
    const returnsNull = meta.returnsNull === true;

    if (hasConditionalRender && !hasFallback && returnsNull) {
      findings.push({
        id: generateId(node.path, `no-fallback:${node.id}`),
        category: "reliability",
        severity: "low",
        title: `Conditional render without fallback: ${node.name}`,
        description: `${node.name} in ${node.path} conditionally renders null/undefined without a visible fallback. This can create blank UI sections.`,
        evidence: [{
          description: "Conditional rendering returns null without fallback UI",
          filePath: node.path,
          line: node.loc[0],
        }],
        affectedNodes: [node.id],
        suggestion: "Add a fallback UI (loading skeleton, empty state, or placeholder) for the null/undefined case.",
        ruleId: "reliability/missing-conditional-fallback",
      });
    }
  }

  return findings;
}

// ----------------------------------------------------------------
// HELPERS
// ----------------------------------------------------------------

function summarizeFindings(findings: Finding[]) {
  return {
    critical: findings.filter((f) => f.severity === "critical").length,
    high: findings.filter((f) => f.severity === "high").length,
    medium: findings.filter((f) => f.severity === "medium").length,
    low: findings.filter((f) => f.severity === "low").length,
    info: findings.filter((f) => f.severity === "info").length,
  };
}
