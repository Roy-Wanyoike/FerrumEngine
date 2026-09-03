/**
 * FerrumEngine v2 — Change Impact Engine
 *
 * Given a set of changed files, determine:
 *   - Which nodes are directly and transitively affected
 *   - Which routes, tests, APIs, and user journeys are impacted
 *   - The overall risk level
 *   - Recommended verification steps
 */

import type {
  ApplicationGraph,
  ImpactAnalysis,
  AffectedArea,
  RiskLevel,
  Finding,
  Severity,
  FerrumId,
  GraphNode,
} from "../core/types";
import {
  getTransitiveDependents,
  getDependents,
  getDependencies,
  getNodesByKind,
  getNodesByPath,
} from "../core/graph";
import { generateId } from "../core/graph";

// ──────────────────────────────────────────────────────────────────────
// IMPACT ANALYSIS
// ──────────────────────────────────────────────────────────────────────

export interface ImpactOptions {
  /** Max transitive depth to follow. */
  maxDepth?: number;
  /** Whether to include transitive dependents. */
  transitive?: boolean;
}

/**
 * Analyze the impact of a set of changed files.
 */
export function analyzeImpact(
  graph: ApplicationGraph,
  changedFiles: string[],
  options: ImpactOptions = {},
): ImpactAnalysis {
  const cfg = { maxDepth: 10, transitive: true, ...options };
  const affected: AffectedArea[] = [];
  const affectedRoutePaths = new Set<string>();
  const affectedTestPaths = new Set<string>();
  const affectedApiPaths = new Set<string>();
  const securityImplications: string[] = [];
  const allAffectedIds = new Set<FerrumId>();

  // Collect all affected node IDs
  for (const changedFile of changedFiles) {
    const fileNodes = getNodesByPath(graph, changedFile);
    for (const fileNode of fileNodes) {
      if (fileNode.kind !== "file") continue;

      // Direct dependents (distance 1)
      const directDeps = getDependents(graph, fileNode.id);
      for (const dep of directDeps) {
        if (!allAffectedIds.has(dep.id)) {
          allAffectedIds.add(dep.id);
          affected.push({
            nodeId: dep.id,
            name: dep.name,
            kind: dep.kind,
            path: dep.path,
            impact: `Directly depends on changed file ${changedFile}`,
            distance: 1,
          });
        }
      }

      // Transitive dependents (distance > 1)
      if (cfg.transitive) {
        const transDeps = getTransitiveDependents(graph, fileNode.id);
        for (const dep of transDeps) {
          if (!allAffectedIds.has(dep.id)) {
            allAffectedIds.add(dep.id);
            affected.push({
              nodeId: dep.id,
              name: dep.name,
              kind: dep.kind,
              path: dep.path,
              impact: `Transitively depends on changed file ${changedFile}`,
              distance: 2,
            });
          }
        }
      }
    }
  }

  // Classify affected nodes by kind
  // Also check the changed files themselves for security sensitivity
  for (const changedFile of changedFiles) {
    if (changedFile.includes('auth') || changedFile.includes('middleware') || changedFile.includes('security')) {
      securityImplications.push(`${changedFile} — security-sensitive module changed`);
    }
  }

  for (const id of allAffectedIds) {
    const node = graph.nodes.get(id);
    if (!node) continue;

    if (node.kind === "route") {
      affectedRoutePaths.add((node.meta as Record<string, unknown>)?.route as string ?? node.path);
    }
    if (node.kind === "test") {
      affectedTestPaths.add(node.path);
    }
    if (node.kind === "api") {
      affectedApiPaths.add(node.path);
    }
    // Security boundary: if changed file touches auth/middleware, flag it
    if (node.path.includes("auth") || node.path.includes("middleware") || node.path.includes("security")) {
      securityImplications.push(`${node.path} — security-sensitive module affected`);
    }
  }

  // Calculate risk level
  const risk = calculateRisk(affected, affectedRoutePaths, securityImplications);

  // Generate verification recommendations
  const recommendedVerification = generateVerificationRecommendations(
    affected,
    [...affectedRoutePaths],
    [...affectedApiPaths],
    securityImplications,
  );

  return {
    changedFiles,
    risk,
    affected,
    affectedRoutes: [...affectedRoutePaths],
    affectedTests: [...affectedTestPaths],
    affectedApis: [...affectedApiPaths],
    affectedJourneys: [], // Populated when journey mapping exists
    securityImplications,
    recommendedVerification,
    summary: generateImpactSummary(changedFiles, affected, risk),
  };
}

// ──────────────────────────────────────────────────────────────────────
// RISK CALCULATION
// ──────────────────────────────────────────────────────────────────────

function calculateRisk(
  affected: AffectedArea[],
  affectedRoutes: Set<string>,
  securityImplications: string[],
): RiskLevel {
  // Critical: security-sensitive changes
  if (securityImplications.length > 0) return "critical";

  // Critical: affecting 10+ routes
  if (affectedRoutes.size >= 10) return "critical";

  // High: affecting 5+ routes or 50+ nodes
  if (affectedRoutes.size >= 5 || affected.length >= 50) return "high";

  // High: affecting any route with no tests
  if (affectedRoutes.size >= 1) return "high";

  // Medium: affecting 10+ nodes
  if (affected.length >= 10) return "medium";

  // Low: small impact
  if (affected.length >= 1) return "low";

  return "low";
}

// ──────────────────────────────────────────────────────────────────────
// VERIFICATION RECOMMENDATIONS
// ──────────────────────────────────────────────────────────────────────

function generateVerificationRecommendations(
  affected: AffectedArea[],
  routes: string[],
  apis: string[],
  security: string[],
): string[] {
  const recs: string[] = [];

  if (security.length > 0) {
    recs.push("Run security audit — authentication/authorization flows may be affected");
    recs.push("Verify CSRF protection is intact");
    recs.push("Test with different user roles/permissions");
  }

  if (routes.length > 0) {
    recs.push(`Manually test ${routes.length} affected route(s): ${routes.slice(0, 5).join(", ")}${routes.length > 5 ? "..." : ""}`);
  }

  if (apis.length > 0) {
    recs.push(`Verify ${apis.length} affected API endpoint(s): ${apis.slice(0, 3).join(", ")}`);
  }

  // Check for affected components that lack tests
  const untestedComponents = affected.filter(
    (a) => a.kind === "component" && !affected.some((t) => t.kind === "test" && t.path.includes(a.name.toLowerCase())),
  );
  if (untestedComponents.length > 0) {
    recs.push(`${untestedComponents.length} affected component(s) may lack dedicated tests`);
  }

  if (affected.length > 30) {
    recs.push("High blast radius — consider breaking this into smaller, focused changes");
  }

  if (recs.length === 0) {
    recs.push("Run existing test suite to verify no regressions");
  }

  return recs;
}

// ──────────────────────────────────────────────────────────────────────
// SUMMARY GENERATION
// ──────────────────────────────────────────────────────────────────────

function generateImpactSummary(
  changedFiles: string[],
  affected: AffectedArea[],
  risk: RiskLevel,
): string {
  const componentCount = affected.filter((a) => a.kind === "component").length;
  const routeCount = new Set(affected.filter((a) => a.kind === "route").map((a) => a.path)).size;
  const testCount = affected.filter((a) => a.kind === "test").length;
  const apiCount = affected.filter((a) => a.kind === "api").length;

  const parts: string[] = [
    `Modified ${changedFiles.length} file(s)`,
  ];

  if (componentCount > 0) parts.push(`affects ${componentCount} component(s)`);
  if (routeCount > 0) parts.push(`affects ${routeCount} route(s)`);
  if (apiCount > 0) parts.push(`affects ${apiCount} API(s)`);
  if (testCount > 0) parts.push(`${testCount} test(s) may need updates`);

  parts.push(`Risk: ${risk.toUpperCase()}`);

  return parts.join(". ") + ".";
}

// ──────────────────────────────────────────────────────────────────────
// DIFF-AWARE IMPACT
// ──────────────────────────────────────────────────────────────────────

/**
 * Compare two graphs (before and after) to identify what changed.
 * Useful for CI/CD integration where you have the previous graph cached.
 */
export function diffGraphs(
  before: ApplicationGraph,
  after: ApplicationGraph,
): {
  addedNodes: GraphNode[];
  removedNodes: GraphNode[];
  modifiedNodes: GraphNode[];
  newEdges: number;
  removedEdges: number;
} {
  const addedNodes: GraphNode[] = [];
  const removedNodes: GraphNode[] = [];
  const modifiedNodes: GraphNode[] = [];

  // Nodes added or modified
  for (const [id, node] of after.nodes) {
 const beforeNode = before.nodes.get(id);
    if (!beforeNode) {
      addedNodes.push(node);
    } else if (beforeNode.contentHash !== node.contentHash) {
      modifiedNodes.push(node);
    }
  }

  // Nodes removed
  for (const [id, node] of before.nodes) {
    if (!after.nodes.has(id)) {
      removedNodes.push(node);
    }
  }

  return {
    addedNodes,
    removedNodes,
    modifiedNodes,
    newEdges: Math.max(0, after.edges.size - before.edges.size),
    removedEdges: Math.max(0, before.edges.size - after.edges.size),
  };
}
