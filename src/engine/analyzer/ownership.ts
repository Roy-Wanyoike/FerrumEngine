/**
 * FerrumEngine v2 — Ownership Intelligence Analyzer
 *
 * Analyzes the application graph for ownership issues:
 *   - CODEOWNERS coverage gaps
 *   - Orphaned modules (no owner)
 *   - Bus factor (single owner for critical paths)
 *   - Team coupling
 */

import type {
  ApplicationGraph,
  Finding,
  AnalysisResult,
  Severity,
  EvidenceType,
} from "../core/types";
import { generateId, getDependents } from "../core/graph";

// ──────────────────────────────────────────────────────────────────────
// ANALYZER CONFIG
// ──────────────────────────────────────────────────────────────────────

export interface OwnershipConfig {
  /** Min % of files that should be covered by CODEOWNERS. */
  minCodeownersCoverage?: number;
  /** Max % of critical paths one owner can own before bus factor risk. */
  busFactorThreshold?: number;
  /** Max cross-team dependencies before flagging team coupling. */
  maxCrossTeamDeps?: number;
}

const DEFAULT_CONFIG: OwnershipConfig = {
  minCodeownersCoverage: 0.8,
  busFactorThreshold: 0.5,
  maxCrossTeamDeps: 5,
};

// ──────────────────────────────────────────────────────────────────────
// MAIN ANALYZER
// ──────────────────────────────────────────────────────────────────────

export function analyzeOwnership(
  graph: ApplicationGraph,
  config: OwnershipConfig = {},
): AnalysisResult {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const startTime = performance.now();
  const findings: Finding[] = [];

  findings.push(...detectCodeownersGaps(graph, cfg));
  findings.push(...detectOrphanedModules(graph));
  findings.push(...detectBusFactor(graph, cfg));
  findings.push(...detectTeamCoupling(graph, cfg));

  const durationMs = performance.now() - startTime;

  return {
    analyzer: "ownership",
    category: "ownership",
    durationMs,
    findings,
    summary: summarizeFindings(findings),
  };
}

// ──────────────────────────────────────────────────────────────────────
// DETECTORS
// ──────────────────────────────────────────────────────────────────────

function detectCodeownersGaps(
  graph: ApplicationGraph,
  cfg: OwnershipConfig,
): Finding[] {
  const findings: Finding[] = [];
  const minCoverage = cfg.minCodeownersCoverage ?? 0.8;

  const totalFiles: string[] = [];
  const coveredFiles: string[] = [];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "file") continue;
    totalFiles.push(nodeId);
    const meta = node.meta as Record<string, unknown>;
    const hasOwner = Array.isArray(meta.owners) && (meta.owners as string[]).length > 0;
    if (hasOwner || meta.codeownersEntry === true) {
      coveredFiles.push(nodeId);
    }
  }

  if (totalFiles.length > 0) {
    const coverage = coveredFiles.length / totalFiles.length;
    if (coverage < minCoverage) {
      const severity: Severity = coverage < 0.5 ? "high" : "medium";
      findings.push({
        id: generateId("ownership", "codeowners-gaps"),
        category: "ownership",
        severity,
        title: `CODEOWNERS coverage gap: ${Math.round(coverage * 100)}% covered`,
        description: `Only ${Math.round(coverage * 100)}% of files are covered by CODEOWNERS (threshold: ${Math.round(minCoverage * 100)}%). ${totalFiles.length - coveredFiles.length} files have no owner assignment.`,
        evidence: [{
          description: `${coveredFiles.length}/${totalFiles.length} files covered`,
          data: { covered: coveredFiles.length, total: totalFiles.length, coverage },
        }],
        affectedNodes: totalFiles.filter((id) => !coveredFiles.includes(id)),
        evidenceType: "measured" as EvidenceType,
        confidence: 0.9,
        suggestion: "Add CODEOWNERS entries for uncovered files. Assign teams or individuals to all significant directories.",
        ruleId: "ownership/codeowners-gap",
      });
    }
  }

  return findings;
}

function detectOrphanedModules(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "module" && node.kind !== "file") continue;
    const meta = node.meta as Record<string, unknown>;
    const owners = Array.isArray(meta.owners) ? meta.owners as string[] :
      typeof meta.owner === "string" ? [meta.owner] : [];
    const hasCodeowners = meta.codeownersEntry === true;

    if (owners.length === 0 && !hasCodeowners) {
      // Check if any parent directory has ownership
      const dependents = getDependents(graph, nodeId);
      if (dependents.length > 0) {
        findings.push({
          id: generateId(node.path, `orphan:${nodeId}`),
          category: "ownership",
          severity: "low",
          title: `Orphaned module: ${node.name}`,
          description: `Module ${node.name} has no owner in CODEOWNERS or metadata. Orphaned modules can accumulate technical debt without accountability.`,
          evidence: [{
            description: "No owner assigned",
            filePath: node.path,
          }],
          affectedNodes: [nodeId],
          evidenceType: "detected" as EvidenceType,
          confidence: 0.85,
          suggestion: "Assign an owner or team to this module in CODEOWNERS.",
          ruleId: "ownership/orphaned",
        });
      }
    }
  }

  return findings;
}

function detectBusFactor(
  graph: ApplicationGraph,
  cfg: OwnershipConfig,
): Finding[] {
  const findings: Finding[] = [];
  const threshold = cfg.busFactorThreshold ?? 0.5;

  // Count critical paths (files with many dependents) per owner
  const ownerCriticalCount = new Map<string, number>();
  let totalCritical = 0;

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "file" && node.kind !== "module") continue;
    const dependents = getDependents(graph, nodeId);
    if (dependents.length < 5) continue; // not critical
    totalCritical++;

    const meta = node.meta as Record<string, unknown>;
    const owners = Array.isArray(meta.owners) ? meta.owners as string[] :
      typeof meta.owner === "string" ? [meta.owner] : [];

    for (const owner of owners) {
      ownerCriticalCount.set(owner, (ownerCriticalCount.get(owner) ?? 0) + 1);
    }
  }

  if (totalCritical > 0) {
    for (const [owner, count] of ownerCriticalCount) {
      const ratio = count / totalCritical;
      if (ratio >= threshold) {
        const severity: Severity = ratio > 0.7 ? "high" : "medium";
        findings.push({
          id: generateId("ownership", `bus-factor:${owner}`),
          category: "ownership",
          severity,
          title: `Bus factor risk: ${owner} owns ${Math.round(ratio * 100)}% of critical paths`,
          description: `Owner "${owner}" is responsible for ${count} of ${totalCritical} critical paths. If this person leaves, ${Math.round(ratio * 100)}% of critical code has no knowledgeable owner.`,
          evidence: [{
            description: `${count}/${totalCritical} critical paths owned`,
            data: { owner, criticalCount: count, totalCritical, ratio },
          }],
          affectedNodes: [],
          evidenceType: "measured" as EvidenceType,
          confidence: 0.8,
          suggestion: "Distribute critical path ownership across multiple people/teams. Ensure knowledge sharing through documentation and pair programming.",
          ruleId: "ownership/bus-factor",
        });
      }
    }
  }

  return findings;
}

function detectTeamCoupling(
  graph: ApplicationGraph,
  cfg: OwnershipConfig,
): Finding[] {
  const findings: Finding[] = [];
  const maxDeps = cfg.maxCrossTeamDeps ?? 5;

  // Check for modules owned by different teams that import each other
  const teamDeps = new Map<string, Set<string>>();

  for (const edge of graph.edges.values()) {
    if (edge.kind !== "imports" && edge.kind !== "depends-on") continue;
    const sourceNode = graph.nodes.get(edge.source);
    const targetNode = graph.nodes.get(edge.target);
    if (!sourceNode || !targetNode) continue;

    const sourceMeta = sourceNode.meta as Record<string, unknown>;
    const targetMeta = targetNode.meta as Record<string, unknown>;
    const sourceTeam = typeof sourceMeta.team === "string" ? sourceMeta.team : null;
    const targetTeam = typeof targetMeta.team === "string" ? targetMeta.team : null;

    if (sourceTeam && targetTeam && sourceTeam !== targetTeam) {
      const key = `${sourceTeam}→${targetTeam}`;
      const deps = teamDeps.get(key) ?? new Set();
      deps.add(edge.id);
      teamDeps.set(key, deps);
    }
  }

  for (const [coupling, deps] of teamDeps) {
    if (deps.size >= maxDeps) {
      findings.push({
        id: generateId("ownership", `team-coupling:${coupling}`),
        category: "ownership",
        severity: "medium",
        title: `Team coupling: ${coupling} (${deps.size} dependencies)`,
        description: `Teams ${coupling} have ${deps.size} cross-team dependencies. High cross-team coupling creates coordination overhead and deployment conflicts.`,
        evidence: [{
          description: `${deps.size} cross-team dependencies (threshold: ${maxDeps})`,
          data: { coupling, count: deps.size },
        }],
        affectedNodes: [],
        evidenceType: "measured" as EvidenceType,
        confidence: 0.75,
        suggestion: "Decouple these teams by introducing shared interfaces/APIs, moving shared code to a common library, or restructuring ownership boundaries.",
        ruleId: "ownership/team-coupling",
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
