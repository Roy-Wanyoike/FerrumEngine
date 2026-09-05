/**
 * FerrumEngine v2 — Dependency Analyzer
 *
 * Analyzes the application graph for dependency issues:
 *   - Outdated dependency patterns
 *   - Duplicate dependencies
 *   - Unused dependencies
 *   - Missing peer dependencies
 *   - Non-semver dependencies
 *   - Heavy dependencies
 *   - Dependency cycles between packages (monorepo)
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

export interface DependenciesConfig {
  /** Known heavy packages with approximate sizes (kB). */
  heavyPackages?: Record<string, number>;
  /** Max major version lag before flagging as outdated. */
  outdatedThreshold?: number;
}

const DEFAULT_CONFIG: DependenciesConfig = {
  heavyPackages: {
    lodash: 72,
    moment: 70,
    jquery: 87,
    "three.js": 600,
    d3: 250,
    "chart.js": 200,
    firebase: 150,
    fabric: 300,
    "pdf-lib": 400,
    "aws-sdk": 700,
    "@tensorflow/tfjs": 800,
    electron: 500,
    "socket.io": 50,
  },
  outdatedThreshold: 2,
};

// ──────────────────────────────────────────────────────────────────────
// MAIN ANALYZER
// ──────────────────────────────────────────────────────────────────────

export function analyzeDependencies(
  graph: ApplicationGraph,
  config: DependenciesConfig = {},
): AnalysisResult {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const startTime = performance.now();
  const findings: Finding[] = [];

  findings.push(...detectOutdatedDependencies(graph, cfg));
  findings.push(...detectDuplicateDependencies(graph));
  findings.push(...detectUnusedDependencies(graph));
  findings.push(...detectMissingPeerDependencies(graph));
  findings.push(...detectNonSemverDependencies(graph));
  findings.push(...detectHeavyDependencies(graph, cfg));
  findings.push(...detectMonorepoCycles(graph));

  const durationMs = performance.now() - startTime;

  return {
    analyzer: "dependencies",
    category: "dependencies",
    durationMs,
    findings,
    summary: summarizeFindings(findings),
  };
}

// ──────────────────────────────────────────────────────────────────────
// DETECTORS
// ──────────────────────────────────────────────────────────────────────

function detectOutdatedDependencies(
  graph: ApplicationGraph,
  cfg: DependenciesConfig,
): Finding[] {
  const findings: Finding[] = [];
  const threshold = cfg.outdatedThreshold ?? 2;

  for (const node of graph.nodes.values()) {
    if (node.kind !== "package") continue;

    const meta = node.meta as Record<string, unknown>;
    const currentMajor = Number(meta.installedMajor ?? 0);
    const latestMajor = Number(meta.latestMajor ?? 0);
    const currentVersion = String(meta.installedVersion ?? "unknown");
    const latestVersion = String(meta.latestVersion ?? "unknown");

    if (latestMajor > 0 && (latestMajor - currentMajor) >= threshold) {
      findings.push({
        id: generateId(node.path, `outdated:${node.id}`),
        category: "dependencies",
        severity: (latestMajor - currentMajor) >= threshold * 2 ? "high" : "medium",
        title: `Outdated dependency: ${node.name} (${currentVersion} → ${latestVersion})`,
        description: `${node.name} is ${latestMajor - currentMajor} major versions behind latest. This may include security fixes, performance improvements, and new features.`,
        evidence: [{
          description: `Installed: ${currentVersion}, Latest: ${latestVersion} (${latestMajor - currentMajor} majors behind)`,
          filePath: node.path,
        }],
        affectedNodes: [node.id],
        suggestion: `Update ${node.name} to the latest version. Check breaking changes before upgrading.`,
        ruleId: "deps/outdated",
      });
    }
  }

  return findings;
}

function detectDuplicateDependencies(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  // Group package nodes by base name
  const byName = new Map<string, Array<{ node: typeof graph.nodes extends Map<string, infer V> ? V : never; version: string }>>();
  for (const node of graph.nodes.values()) {
    if (node.kind !== "package") continue;
    const meta = node.meta as Record<string, unknown>;
    const version = String(meta.installedVersion ?? meta.version ?? "unknown");
    const baseName = node.name.replace(/@[~^][\d.]+$/, "");
    const existing = byName.get(baseName) ?? [];
    existing.push({ node, version });
    byName.set(baseName, existing);
  }

  for (const [name, entries] of byName) {
    const versions = new Set(entries.map((e) => e.version));
    if (versions.size <= 1) continue;

    findings.push({
      id: generateId("package.json", `duplicate:${name}`),
      category: "dependencies",
      severity: "medium",
      title: `Duplicate dependency versions: ${name}`,
      description: `${name} is installed at ${versions.size} different versions: ${[...versions].join(", ")}. This can cause bugs from inconsistent behavior and increases bundle size.`,
      evidence: entries.map((e) => ({
        description: `Version ${e.version} in ${e.node.path}`,
        filePath: e.node.path,
      })),
      affectedNodes: entries.map((e) => e.node.id),
      suggestion: "Deduplicate by updating all dependents to use the same version, or use package resolution overrides.",
      ruleId: "deps/duplicate-versions",
    });
  }

  return findings;
}

function detectUnusedDependencies(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  // Collect all imported package names from edges
  const importedPackages = new Set<string>();
  for (const edge of graph.edges.values()) {
    if (edge.kind !== "imports") continue;
    const target = graph.nodes.get(edge.target);
    if (target && (target.kind === "package" || target.path.includes("node_modules"))) {
      importedPackages.add(target.name);
    }
  }

  // Check package nodes that are never imported
  for (const node of graph.nodes.values()) {
    if (node.kind !== "package") continue;

    const meta = node.meta as Record<string, unknown>;
    const isDevDep = meta.isDevDependency === true;

    // Skip dev dependencies for unused detection (they may be used in tooling)
    if (isDevDep) continue;

    if (!importedPackages.has(node.name)) {
      findings.push({
        id: generateId(node.path, `unused:${node.id}`),
        category: "dependencies",
        severity: "low",
        title: `Possibly unused dependency: ${node.name}`,
        description: `${node.name} is listed as a dependency but is never imported in source files. It may be unused or only used indirectly.`,
        evidence: [{
          description: "No import edges found for this package",
          filePath: node.path,
        }],
        affectedNodes: [node.id],
        suggestion: "Verify this dependency is needed. If not, remove it to reduce install size and attack surface.",
        ruleId: "deps/unused",
      });
    }
  }

  return findings;
}

function detectMissingPeerDependencies(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const node of graph.nodes.values()) {
    if (node.kind !== "package") continue;

    const meta = node.meta as Record<string, unknown>;
    const peerDeps = Array.isArray(meta.peerDependencies) ? (meta.peerDependencies as string[]) : [];
    const peerDepsMeta = meta.peerDependencies as Record<string, string> | undefined;

    // Get peer dep names
    const peerNames: string[] = [];
    if (Array.isArray(peerDeps)) {
      peerNames.push(...peerDeps);
    } else if (peerDepsMeta && typeof peerDepsMeta === "object") {
      peerNames.push(...Object.keys(peerDepsMeta));
    }

    // Check if each peer dep exists as a package in the graph
    const allPackageNames = new Set(
      [...graph.nodes.values()].filter((n) => n.kind === "package").map((n) => n.name),
    );

    for (const peerName of peerNames) {
      if (!allPackageNames.has(peerName)) {
        findings.push({
          id: generateId(node.path, `missing-peer:${peerName}`),
          category: "dependencies",
          severity: "medium",
          title: `Missing peer dependency: ${peerName} (required by ${node.name})`,
          description: `${node.name} expects ${peerName} as a peer dependency, but it is not installed. This may cause runtime errors or incorrect behavior.`,
          evidence: [{
            description: `${peerName} is a peer dependency of ${node.name} but not installed`,
            filePath: node.path,
          }],
          affectedNodes: [node.id],
          suggestion: `Install ${peerName} as a dependency: npm install ${peerName}`,
          ruleId: "deps/missing-peer",
        });
      }
    }
  }

  return findings;
}

function detectNonSemverDependencies(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const node of graph.nodes.values()) {
    if (node.kind !== "package") continue;

    const meta = node.meta as Record<string, unknown>;
    const version = String(meta.installedVersion ?? meta.version ?? "");

    // Check for non-semver patterns
    const isGitUrl = version.startsWith("git+") || version.includes("github:") || /^https?:\/\//.test(version);
    const isFileProtocol = version.startsWith("file:") || version.startsWith("link:");
    const isNonSemver = isGitUrl || isFileProtocol;

    if (isNonSemver) {
      findings.push({
        id: generateId(node.path, `non-semver:${node.id}`),
        category: "dependencies",
        severity: "medium",
        title: `Non-semver dependency: ${node.name} (${version.substring(0, 50)})`,
        description: `${node.name} uses a ${isGitUrl ? "git URL" : "file/link protocol"} instead of a semver range. This makes builds non-reproducible and auditing difficult.`,
        evidence: [{
          description: `Version resolved to: ${version.substring(0, 80)}`,
          filePath: node.path,
        }],
        affectedNodes: [node.id],
        suggestion: "Use a published npm package with a semver range instead. If using a git dependency, pin to a specific commit hash.",
        ruleId: "deps/non-semver",
      });
    }
  }

  return findings;
}

function detectHeavyDependencies(
  graph: ApplicationGraph,
  cfg: DependenciesConfig,
): Finding[] {
  const findings: Finding[] = [];
  const heavy = cfg.heavyPackages ?? {};

  for (const node of graph.nodes.values()) {
    if (node.kind !== "package") continue;

    const size = heavy[node.name];
    if (size === undefined) continue;

    const severity: Severity = size > 500 ? "high" : "medium";

    findings.push({
      id: generateId(node.path, `heavy:${node.name}`),
      category: "dependencies",
      severity,
      title: `Heavy dependency: ${node.name} (~${size}kB)`,
      description: `${node.name} adds approximately ${size}kB to the bundle. Consider lighter alternatives.`,
      evidence: [{
        description: `Estimated size: ~${size}kB`,
        filePath: node.path,
      }],
      affectedNodes: [node.id],
      suggestion: `Consider replacing ${node.name} with a lighter alternative. For example: lodash → native methods, moment → date-fns/dayjs, jquery → vanilla JS.`,
      ruleId: "deps/heavy-package",
    });
  }

  return findings;
}

function detectMonorepoCycles(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  // Find module/service nodes that import each other
  const workspaceNodes = [...graph.nodes.values()].filter(
    (n) => n.kind === "module" || n.kind === "service" || n.kind === "package",
  );

  for (const nodeA of workspaceNodes) {
    for (const nodeB of workspaceNodes) {
      if (nodeA.id === nodeB.id) continue;

      // Check if A imports B and B imports A
      const aImportsB = [...graph.outgoing.get(nodeA.id) ?? []]
        .map((eId) => graph.edges.get(eId)!)
        .filter(Boolean)
        .some((e) => e.source === nodeA.id && e.target === nodeB.id && e.kind === "imports");

      const bImportsA = [...graph.outgoing.get(nodeB.id) ?? []]
        .map((eId) => graph.edges.get(eId)!)
        .filter(Boolean)
        .some((e) => e.source === nodeB.id && e.target === nodeA.id && e.kind === "imports");

      if (aImportsB && bImportsA) {
        const pairKey = [nodeA.id, nodeB.id].sort().join(":");
        findings.push({
          id: generateId(nodeA.path, `monorepo-cycle:${pairKey}`),
          category: "dependencies",
          severity: "high",
          title: `Monorepo dependency cycle: ${nodeA.name} ↔ ${nodeB.name}`,
          description: `${nodeA.name} and ${nodeB.name} import each other, creating a circular dependency between workspace packages. This can cause build issues and make the dependency graph fragile.`,
          evidence: [{
            description: `${nodeA.name} → ${nodeB.name} → ${nodeA.name}`,
            nodeIds: [nodeA.id, nodeB.id],
          }],
          affectedNodes: [nodeA.id, nodeB.id],
          suggestion: "Break the cycle by extracting shared code into a separate shared package, or restructuring the dependency direction.",
          ruleId: "deps/monorepo-cycle",
        });
      }
    }
  }

  // Deduplicate pairs
  const seen = new Set<string>();
  return findings.filter((f) => {
    const key = f.affectedNodes.sort().join(":");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
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
