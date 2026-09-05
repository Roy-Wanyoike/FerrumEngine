/**
 * FerrumEngine v2 — Maintainability Intelligence Analyzer
 *
 * Analyzes the application graph for maintainability issues:
 *   - Code churn (files changed too often)
 *   - Ownership concentration (one person owns too much)
 *   - Stale code (files not changed in 6+ months)
 *   - Dead exports (exported but never imported)
 *   - Oversized files
 *   - God modules (too many dependents)
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

export interface MaintainabilityConfig {
  /** Max change count before flagging as high-churn. */
  churnThreshold?: number;
  /** Max % of code one owner can control before flagging. */
  ownershipConcentrationThreshold?: number;
  /** Days without change before flagging as stale. */
  staleThresholdDays?: number;
  /** Max file lines before flagging as oversized. */
  maxFileLines?: number;
  /** Max dependents before flagging as god module. */
  godModuleThreshold?: number;
}

const DEFAULT_CONFIG: MaintainabilityConfig = {
  churnThreshold: 20,
  ownershipConcentrationThreshold: 0.4,
  staleThresholdDays: 180,
  maxFileLines: 500,
  godModuleThreshold: 20,
};

// ──────────────────────────────────────────────────────────────────────
// MAIN ANALYZER
// ──────────────────────────────────────────────────────────────────────

export function analyzeMaintainability(
  graph: ApplicationGraph,
  config: MaintainabilityConfig = {},
): AnalysisResult {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const startTime = performance.now();
  const findings: Finding[] = [];

  findings.push(...detectCodeChurn(graph, cfg));
  findings.push(...detectOwnershipConcentration(graph, cfg));
  findings.push(...detectStaleCode(graph, cfg));
  findings.push(...detectDeadExports(graph));
  findings.push(...detectOversizedFiles(graph, cfg));
  findings.push(...detectGodModules(graph, cfg));

  const durationMs = performance.now() - startTime;

  return {
    analyzer: "maintainability",
    category: "maintainability",
    durationMs,
    findings,
    summary: summarizeFindings(findings),
  };
}

// ──────────────────────────────────────────────────────────────────────
// DETECTORS
// ──────────────────────────────────────────────────────────────────────

function detectCodeChurn(
  graph: ApplicationGraph,
  cfg: MaintainabilityConfig,
): Finding[] {
  const findings: Finding[] = [];
  const threshold = cfg.churnThreshold ?? 20;

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "file") continue;
    const meta = node.meta as Record<string, unknown>;
    const changeCount = typeof meta.changeCount === "number" ? meta.changeCount : 0;

    if (changeCount >= threshold) {
      const severity: Severity = changeCount > threshold * 2 ? "high" : "medium";
      findings.push({
        id: generateId(node.path, `churn:${nodeId}`),
        category: "maintainability",
        severity,
        title: `High code churn: ${node.name} (${changeCount} changes)`,
        description: `File ${node.path} has been changed ${changeCount} times, exceeding the churn threshold of ${threshold}. High churn indicates instability or frequent refactoring needs.`,
        evidence: [{
          description: `${changeCount} changes (threshold: ${threshold})`,
          filePath: node.path,
          data: { changeCount, threshold },
        }],
        affectedNodes: [nodeId],
        evidenceType: "measured" as EvidenceType,
        confidence: 0.9,
        suggestion: "Investigate why this file changes so frequently. Consider splitting it, stabilizing its API, or moving volatile logic elsewhere.",
        ruleId: "maint/code-churn",
      });
    }
  }

  return findings;
}

function detectOwnershipConcentration(
  graph: ApplicationGraph,
  cfg: MaintainabilityConfig,
): Finding[] {
  const findings: Finding[] = [];
  const threshold = cfg.ownershipConcentrationThreshold ?? 0.4;

  // Count files per owner
  const ownerFiles = new Map<string, string[]>();
  let totalFiles = 0;

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "file") continue;
    totalFiles++;
    const meta = node.meta as Record<string, unknown>;
    const owners = Array.isArray(meta.owners) ? meta.owners as string[] :
      typeof meta.owner === "string" ? [meta.owner] : [];
    for (const owner of owners) {
      const files = ownerFiles.get(owner) ?? [];
      files.push(node.path);
      ownerFiles.set(owner, files);
    }
  }

  if (totalFiles === 0) return findings;

  for (const [owner, files] of ownerFiles) {
    const ratio = files.length / totalFiles;
    if (ratio >= threshold) {
      const severity: Severity = ratio > 0.6 ? "high" : "medium";
      findings.push({
        id: generateId(`ownership:${owner}`, `concentration`),
        category: "maintainability",
        severity,
        title: `Ownership concentration: ${owner} owns ${Math.round(ratio * 100)}% of files`,
        description: `Owner "${owner}" is responsible for ${files.length} of ${totalFiles} files (${Math.round(ratio * 100)}%), exceeding the ${Math.round(threshold * 100)}% threshold. This creates a bottleneck and bus-factor risk.`,
        evidence: [{
          description: `${files.length} files owned out of ${totalFiles}`,
          data: { owner, fileCount: files.length, totalFiles, ratio },
        }],
        affectedNodes: [],
        evidenceType: "measured" as EvidenceType,
        confidence: 0.85,
        suggestion: "Distribute ownership by onboarding more contributors or using CODEOWNERS to assign areas to different teams.",
        ruleId: "maint/ownership-concentration",
      });
    }
  }

  return findings;
}

function detectStaleCode(
  graph: ApplicationGraph,
  cfg: MaintainabilityConfig,
): Finding[] {
  const findings: Finding[] = [];
  const staleDays = cfg.staleThresholdDays ?? 180;
  const now = Date.now();

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "file") continue;
    const meta = node.meta as Record<string, unknown>;
    const lastChanged = typeof meta.lastChanged === "number" ? meta.lastChanged : null;

    if (lastChanged !== null) {
      const daysSinceChange = (now - lastChanged) / (1000 * 60 * 60 * 24);
      if (daysSinceChange >= staleDays) {
        const severity: Severity = daysSinceChange > staleDays * 2 ? "medium" : "low";
        findings.push({
          id: generateId(node.path, `stale:${nodeId}`),
          category: "maintainability",
          severity,
          title: `Stale code: ${node.name} (${Math.round(daysSinceChange)} days unchanged)`,
          description: `File ${node.path} has not been changed in ${Math.round(daysSinceChange)} days, exceeding the ${staleDays}-day stale threshold. It may be dead code or need review.`,
          evidence: [{
            description: `${Math.round(daysSinceChange)} days since last change (threshold: ${staleDays})`,
            filePath: node.path,
            data: { daysSinceChange: Math.round(daysSinceChange), threshold: staleDays },
          }],
          affectedNodes: [nodeId],
          evidenceType: "measured" as EvidenceType,
          confidence: 0.7,
          suggestion: "Review this file to determine if it is still needed. Remove dead code or update stale logic.",
          ruleId: "maint/stale-code",
        });
      }
    }
  }

  return findings;
}

function detectDeadExports(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "function" && node.kind !== "class" && node.kind !== "utility") continue;
    const meta = node.meta as Record<string, unknown>;
    if (!meta.exported) continue;

    const dependents = getDependents(graph, nodeId);
    if (dependents.length === 0) {
      findings.push({
        id: generateId(node.path, `dead-export:${nodeId}`),
        category: "maintainability",
        severity: "low",
        title: `Dead export: ${node.name}`,
        description: `Exported symbol ${node.name} in ${node.path} is never imported anywhere in the codebase. This is dead code that increases maintenance burden.`,
        evidence: [{
          description: "No importers found for this export",
          filePath: node.path,
        }],
        affectedNodes: [nodeId],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.8,
        suggestion: "Remove this export if it is truly unused. Verify it is not consumed by external packages before deleting.",
        ruleId: "maint/dead-export",
      });
    }
  }

  return findings;
}

function detectOversizedFiles(
  graph: ApplicationGraph,
  cfg: MaintainabilityConfig,
): Finding[] {
  const findings: Finding[] = [];
  const maxLines = cfg.maxFileLines ?? 500;

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "file") continue;
    const lines = node.loc[1] - node.loc[0];
    if (lines > maxLines) {
      const severity: Severity = lines > maxLines * 3 ? "high" : lines > maxLines * 1.5 ? "medium" : "low";
      findings.push({
        id: generateId(node.path, `oversized:${nodeId}`),
        category: "maintainability",
        severity,
        title: `Oversized file: ${node.name} (${lines} lines)`,
        description: `File ${node.path} has ${lines} lines, exceeding the ${maxLines}-line threshold. Large files are harder to understand, test, and maintain.`,
        evidence: [{
          description: `${lines} lines (threshold: ${maxLines})`,
          filePath: node.path,
          data: { lines, threshold: maxLines },
        }],
        affectedNodes: [nodeId],
        evidenceType: "measured" as EvidenceType,
        confidence: 0.95,
        suggestion: "Split this file into smaller, focused modules with clear single responsibilities.",
        ruleId: "maint/oversized-file",
      });
    }
  }

  return findings;
}

function detectGodModules(
  graph: ApplicationGraph,
  cfg: MaintainabilityConfig,
): Finding[] {
  const findings: Finding[] = [];
  const threshold = cfg.godModuleThreshold ?? 20;

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "file" && node.kind !== "module") continue;
    const dependents = getDependents(graph, nodeId);
    if (dependents.length >= threshold) {
      const severity: Severity = dependents.length > threshold * 2 ? "high" : "medium";
      findings.push({
        id: generateId(node.path, `god-module:${nodeId}`),
        category: "maintainability",
        severity,
        title: `God module: ${node.name} (${dependents.length} dependents)`,
        description: `Module ${node.name} has ${dependents.length} dependents, exceeding the threshold of ${threshold}. Too many consumers make changes risky and coupling high.`,
        evidence: [{
          description: `${dependents.length} dependents (threshold: ${threshold})`,
          filePath: node.path,
          nodeIds: [nodeId, ...dependents.slice(0, 10).map((d) => d.id)],
        }],
        affectedNodes: [nodeId],
        evidenceType: "measured" as EvidenceType,
        confidence: 0.9,
        suggestion: "Decompose this module into smaller, more focused modules. Use the single-responsibility principle.",
        ruleId: "maint/god-module",
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
