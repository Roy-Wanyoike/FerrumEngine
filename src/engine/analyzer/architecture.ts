/**
 * FerrumEngine v2 — Architecture Intelligence Analyzer
 *
 * Analyzes the application graph for architectural issues:
 *   - Circular dependencies
 *   - Excessive coupling (too many dependents)
 *   - Architectural violations (incorrect dependency direction)
 *   - Oversized modules
 *   - Dead code (nodes with no dependents)
 *   - Architectural drift detection
 */

import type {
  ApplicationGraph,
  Finding,
  AnalysisResult,
  GraphNode,
  Severity,
} from "../core/types";
import { detectCycles, getDependents, getDependencies, getGraphStats } from "../core/graph";
import { generateId } from "../core/graph";

// ──────────────────────────────────────────────────────────────────────
// ANALYZER CONFIG
// ──────────────────────────────────────────────────────────────────────

export interface ArchitectureConfig {
  /** Max allowed cycle length before upgrading severity. */
  maxCycleLength?: number;
  /** Max direct dependents before flagging as tightly coupled. */
  couplingThreshold?: number;
  /** Max file size (lines) before flagging as oversized. */
  maxFileSize?: number;
  /** Architectural layer rules (source layer → allowed target layers). */
  layerRules?: LayerRule[];
}

export interface LayerRule {
  /** Source layer pattern (regex). */
  from: RegExp;
  /** Allowed target layer patterns. */
  to: RegExp[];
}

const DEFAULT_CONFIG: ArchitectureConfig = {
  maxCycleLength: 3,
  couplingThreshold: 15,
  maxFileSize: 500,
  layerRules: [
    // Components can depend on lib, hooks, utils — not on pages or api routes
    { from: /components\//, to: [/lib\//, /hooks\//, /utils\//, /components\//] },
    // Pages can depend on components, lib, hooks
    { from: /app\/(?!api)/, to: [/components\//, /lib\//, /hooks\//] },
    // API routes should only depend on lib
    { from: /app\/api/, to: [/lib\//, /utils\//] },
    // Lib should not depend on components or app
    { from: /lib\//, to: [/lib\//, /utils\//] },
    // Hooks should not depend on components
    { from: /hooks\//, to: [/lib\//, /hooks\//, /utils\//] },
  ],
};

// ──────────────────────────────────────────────────────────────────────
// MAIN ANALYZER
// ──────────────────────────────────────────────────────────────────────

export function analyzeArchitecture(
  graph: ApplicationGraph,
  config: ArchitectureConfig = {},
): AnalysisResult {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const startTime = performance.now();
  const findings: Finding[] = [];

  findings.push(...detectCircularDependencies(graph, cfg));
  findings.push(...detectExcessiveCoupling(graph, cfg));
  findings.push(...detectOversizedModules(graph, cfg));
  findings.push(...detectDeadCode(graph));
  findings.push(...detectArchitecturalViolations(graph, cfg));
  findings.push(...detectDuplicatedAbstractions(graph));

  const durationMs = performance.now() - startTime;

  return {
    analyzer: "architecture",
    category: "architecture",
    durationMs,
    findings,
    summary: summarizeFindings(findings),
  };
}

// ──────────────────────────────────────────────────────────────────────
// DETECTORS
// ──────────────────────────────────────────────────────────────────────

function detectCircularDependencies(
  graph: ApplicationGraph,
  cfg: ArchitectureConfig,
): Finding[] {
  const findings: Finding[] = [];
  const visited = new Set<string>();

  for (const [nodeId, node] of graph.nodes) {
    if (visited.has(nodeId)) continue;
    if (node.kind !== "file" && node.kind !== "module" && node.kind !== "component") continue;

    const cycles = detectCycles(graph, nodeId);
    for (const cycle of cycles) {
      // Deduplicate: only report each cycle once
      const cycleKey = [...cycle].sort().join("→");
      if (visited.has(cycleKey)) continue;
      visited.add(cycleKey);

      const cycleNames = cycle.map((id) => graph.nodes.get(id)?.name ?? id);
      const severity: Severity = cycle.length > (cfg.maxCycleLength ?? 3) ? "high" : "medium";

      findings.push({
        id: generateId(node.path, `cycle:${cycleKey}`),
        category: "architecture",
        severity,
        title: `Circular dependency: ${cycleNames[0]} ↔ ${cycleNames[cycleNames.length - 2] ?? "self"}`,
        description: `A circular dependency exists between ${cycle.length} modules. This can cause initialization order issues, make code harder to reason about, and create fragile coupling.`,
        evidence: [{
          description: `Cycle: ${cycleNames.join(" → ")}`,
          nodeIds: cycle,
        }],
        affectedNodes: cycle,
        suggestion: "Break the cycle by extracting the shared dependency into a separate module, using dependency injection, or restructuring the import graph.",
        ruleId: "arch/no-circular-deps",
      });
    }
  }

  return findings;
}

function detectExcessiveCoupling(
  graph: ApplicationGraph,
  cfg: ArchitectureConfig,
): Finding[] {
  const findings: Finding[] = [];
  const threshold = cfg.couplingThreshold ?? 15;

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "file" && node.kind !== "module" && node.kind !== "utility") continue;

    const dependents = getDependents(graph, nodeId);
    if (dependents.length >= threshold) {
      findings.push({
        id: generateId(node.path, `coupling:${nodeId}`),
        category: "architecture",
        severity: dependents.length > threshold * 2 ? "high" : "medium",
        title: `Tightly coupled: ${node.name} (${dependents.length} dependents)`,
        description: `This module has ${dependents.length} direct dependents. Changes to it will propagate widely. Consider whether this coupling is necessary or if the responsibility should be distributed.`,
        evidence: [{
          description: `${dependents.length} modules depend on ${node.name}`,
          filePath: node.path,
          nodeIds: [nodeId, ...dependents.map((d) => d.id)],
        }],
        affectedNodes: [nodeId, ...dependents.map((d) => d.id)],
        suggestion: "Consider splitting this module, using an interface/abstraction layer, or applying the dependency inversion principle.",
        ruleId: "arch/excessive-coupling",
      });
    }
  }

  return findings;
}

function detectOversizedModules(
  graph: ApplicationGraph,
  cfg: ArchitectureConfig,
): Finding[] {
  const findings: Finding[] = [];
  const maxSize = cfg.maxFileSize ?? 500;

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "file") continue;
    const lines = node.loc[1] - node.loc[0];
    if (lines > maxSize) {
      findings.push({
        id: generateId(node.path, `oversized:${nodeId}`),
        category: "architecture",
        severity: lines > maxSize * 3 ? "high" : lines > maxSize * 1.5 ? "medium" : "low",
        title: `Oversized file: ${node.name} (${lines} lines)`,
        description: `This file exceeds ${maxSize} lines (${lines} lines). Large files tend to accumulate unrelated concerns and become difficult to maintain.`,
        evidence: [{
          description: `${lines} lines (threshold: ${maxSize})`,
          filePath: node.path,
          line: maxSize,
        }],
        affectedNodes: [nodeId],
        suggestion: "Split this file into smaller, focused modules. Each module should have a single clear responsibility.",
        ruleId: "arch/file-size",
      });
    }
  }

  return findings;
}

function detectDeadCode(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const [nodeId, node] of graph.nodes) {
    // Only check exported symbols and utilities, not files/routes/configs
    if (node.kind !== "utility" && node.kind !== "function" && node.kind !== "class") continue;
    if (!(node.meta as Record<string, unknown>)?.exported) continue;

    const dependents = getDependents(graph, nodeId);
    if (dependents.length === 0) {
      findings.push({
        id: generateId(node.path, `dead-code:${nodeId}`),
        category: "architecture",
        severity: "low",
        title: `Potentially unused export: ${node.name}`,
        description: `This exported symbol has no importers in the scanned codebase. It may be dead code or only used externally.`,
        evidence: [{
          description: "No dependents found",
          filePath: node.path,
        }],
        affectedNodes: [nodeId],
        suggestion: "Verify this export is used. If not, consider removing it to reduce maintenance burden.",
        ruleId: "arch/dead-code",
      });
    }
  }

  return findings;
}

function detectArchitecturalViolations(
  graph: ApplicationGraph,
  cfg: ArchitectureConfig,
): Finding[] {
  const findings: Finding[] = [];
  const rules = cfg.layerRules ?? [];

  if (rules.length === 0) return findings;

  for (const edge of graph.edges.values()) {
    if (edge.kind !== "imports") continue;
    const sourceNode = graph.nodes.get(edge.source);
    const targetNode = graph.nodes.get(edge.target);
    if (!sourceNode || !targetNode) continue;

    for (const rule of rules) {
      if (!rule.from.test(sourceNode.path)) continue;

      const allowed = rule.to.some((pattern) => pattern.test(targetNode.path));
      if (!allowed) {
        findings.push({
          id: generateId(sourceNode.path, `violation:${edge.id}`),
          category: "architecture",
          severity: "medium",
          title: `Architectural violation: ${sourceNode.path} → ${targetNode.path}`,
          description: `A ${sourceNode.kind} in "${sourceNode.path.split("/")[0] ?? sourceNode.path}" imports from "${targetNode.path.split("/")[0] ?? targetNode.path}", which may violate the intended layer boundaries.`,
          evidence: [{
            description: `${sourceNode.path} imports ${targetNode.path}`,
            filePath: sourceNode.path,
          }],
          affectedNodes: [edge.source, edge.target],
          suggestion: "Move the shared logic to a lower-level module (e.g., lib/) that both layers can depend on.",
          ruleId: "arch/layer-violation",
        });
      }
    }
  }

  return findings;
}

function detectDuplicatedAbstractions(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  // Group by name to find similarly-named modules
  const byName = new Map<string, GraphNode[]>();
  for (const node of graph.nodes.values()) {
    if (node.kind !== "component" && node.kind !== "utility" && node.kind !== "function") continue;
    const name = node.name.toLowerCase();
    const existing = byName.get(name) ?? [];
    existing.push(node);
    byName.set(name, existing);
  }

  for (const [name, nodes] of byName) {
    if (nodes.length <= 1) continue;
    // Filter: must be in different directories
    const dirs = new Set(nodes.map((n) => n.path.split("/").slice(0, -1).join("/")));
    if (dirs.size <= 1) continue;

    findings.push({
      id: generateId(nodes[0]!.path, `dup:${name}`),
      category: "architecture",
      severity: "low",
      title: `Possible duplication: ${name} (${nodes.length} definitions)`,
      description: `Found ${nodes.length} definitions of "${name}" across different directories. This may indicate duplicated logic that could be consolidated.`,
      evidence: nodes.map((n) => ({
        description: `Defined in ${n.path}`,
        filePath: n.path,
        nodeIds: [n.id],
      })),
      affectedNodes: nodes.map((n) => n.id),
      suggestion: "Review these definitions and consolidate into a single shared abstraction if they serve the same purpose.",
      ruleId: "arch/duplicated-abstraction",
    });
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
