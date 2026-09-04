/**
 * FerrumEngine v2 — API Contracts Intelligence Analyzer
 *
 * Analyzes the application graph for API contract issues:
 *   - Breaking API changes (removed endpoints, changed parameter types)
 *   - Missing API versioning
 *   - Undocumented endpoints
 *   - Inconsistent response shapes
 *   - Missing error responses
 */

import type {
  ApplicationGraph,
  Finding,
  AnalysisResult,
  Severity,
  EvidenceType,
} from "../core/types";
import { generateId, getDependencies } from "../core/graph";

// ──────────────────────────────────────────────────────────────────────
// ANALYZER CONFIG
// ──────────────────────────────────────────────────────────────────────

export interface ApiContractsConfig {
  /** API path patterns that should be versioned. */
  versionedPathPatterns?: RegExp[];
  /** Expected error response codes per endpoint. */
  requiredErrorCodes?: number[];
}

const DEFAULT_CONFIG: ApiContractsConfig = {
  versionedPathPatterns: [/^\/api\//],
  requiredErrorCodes: [400, 401, 500],
};

// ──────────────────────────────────────────────────────────────────────
// MAIN ANALYZER
// ──────────────────────────────────────────────────────────────────────

export function analyzeApiContracts(
  graph: ApplicationGraph,
  config: ApiContractsConfig = {},
): AnalysisResult {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const startTime = performance.now();
  const findings: Finding[] = [];

  findings.push(...detectBreakingChanges(graph));
  findings.push(...detectMissingApiVersioning(graph, cfg));
  findings.push(...detectUndocumentedEndpoints(graph));
  findings.push(...detectInconsistentResponseShapes(graph));
  findings.push(...detectMissingErrorResponses(graph, cfg));

  const durationMs = performance.now() - startTime;

  return {
    analyzer: "api-contracts",
    category: "api-contracts",
    durationMs,
    findings,
    summary: summarizeFindings(findings),
  };
}

// ──────────────────────────────────────────────────────────────────────
// DETECTORS
// ──────────────────────────────────────────────────────────────────────

function detectBreakingChanges(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "api") continue;
    const meta = node.meta as Record<string, unknown>;
    const breakingChanges = Array.isArray(meta.breakingChanges)
      ? meta.breakingChanges as Array<{type: string; detail: string}>
      : [];

    for (const change of breakingChanges) {
      const severity: Severity = change.type === "removed-endpoint" ? "critical" :
        change.type === "changed-param-type" ? "high" : "medium";
      findings.push({
        id: generateId(node.path, `breaking:${change.type}:${nodeId}`),
        category: "api-contracts",
        severity,
        title: `Breaking API change: ${change.type} in ${node.name}`,
        description: `API endpoint ${node.name} has a breaking change: ${change.detail}. This will break existing consumers.`,
        evidence: [{
          description: `${change.type}: ${change.detail}`,
          filePath: node.path,
          data: change,
        }],
        affectedNodes: [nodeId],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.9,
        suggestion: "Version this API endpoint or provide backward compatibility. Consider using API versioning (e.g., /v2/) for breaking changes.",
        ruleId: "api/breaking-change",
      });
    }
  }

  return findings;
}

function detectMissingApiVersioning(
  graph: ApplicationGraph,
  cfg: ApiContractsConfig,
): Finding[] {
  const findings: Finding[] = [];
  const patterns = cfg.versionedPathPatterns ?? [];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "api") continue;
    const meta = node.meta as Record<string, unknown>;
    const apiPath = typeof meta.path === "string" ? meta.path : node.path;
    const isVersioned = /\/v\d+\//.test(apiPath) || meta.versioned === true;

    const shouldCheck = patterns.some((p) => p.test(apiPath));
    if (shouldCheck && !isVersioned) {
      findings.push({
        id: generateId(node.path, `no-version:${nodeId}`),
        category: "api-contracts",
        severity: "medium",
        title: `Missing API versioning: ${node.name}`,
        description: `API endpoint ${apiPath} is not versioned. Without versioning, any change is potentially breaking for consumers.`,
        evidence: [{
          description: `Path ${apiPath} has no version prefix (e.g., /v1/)`,
          filePath: node.path,
          data: { apiPath },
        }],
        affectedNodes: [nodeId],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.8,
        suggestion: "Add API versioning to the endpoint path (e.g., /v1/resource) or use header-based versioning.",
        ruleId: "api/missing-versioning",
      });
    }
  }

  return findings;
}

function detectUndocumentedEndpoints(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "api") continue;
    const meta = node.meta as Record<string, unknown>;
    const isDocumented = meta.documented === true || meta.hasOpenApi === true || meta.hasSwagger === true;

    if (!isDocumented) {
      findings.push({
        id: generateId(node.path, `undocumented:${nodeId}`),
        category: "api-contracts",
        severity: "low",
        title: `Undocumented API endpoint: ${node.name}`,
        description: `API endpoint ${node.name} has no documentation (OpenAPI/Swagger). Undocumented APIs are hard to discover and use correctly.`,
        evidence: [{
          description: "No OpenAPI/Swagger documentation found",
          filePath: node.path,
        }],
        affectedNodes: [nodeId],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.85,
        suggestion: "Add OpenAPI/Swagger documentation for this endpoint. Include request/response schemas and examples.",
        ruleId: "api/undocumented",
      });
    }
  }

  return findings;
}

function detectInconsistentResponseShapes(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  // Group API endpoints by response shape
  const shapeGroups = new Map<string, { nodeId: string; node: typeof graph.nodes extends Map<string, infer V> ? V : never }[]>();

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "api") continue;
    const meta = node.meta as Record<string, unknown>;
    const responseShape = typeof meta.responseShape === "string" ? meta.responseShape : null;
    if (!responseShape) continue;

    const group = shapeGroups.get(responseShape) ?? [];
    group.push({ nodeId, node } as any);
    shapeGroups.set(responseShape, group);
  }

  // Check for endpoints that share a prefix but have different shapes
  const apiByPrefix = new Map<string, { nodeId: string; path: string; shape: string }[]>();

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "api") continue;
    const meta = node.meta as Record<string, unknown>;
    const shape = typeof meta.responseShape === "string" ? meta.responseShape : "unknown";
    const apiPath = typeof meta.path === "string" ? meta.path : node.path;
    const prefix = apiPath.split("/").slice(0, 3).join("/");
    const group = apiByPrefix.get(prefix) ?? [];
    group.push({ nodeId, path: apiPath, shape });
    apiByPrefix.set(prefix, group);
  }

  for (const [prefix, endpoints] of apiByPrefix) {
    if (endpoints.length < 2) continue;
    const shapes = new Set(endpoints.map((e) => e.shape));
    if (shapes.size > 1) {
      findings.push({
        id: generateId(prefix, "inconsistent-shape"),
        category: "api-contracts",
        severity: "medium",
        title: `Inconsistent response shapes under ${prefix}`,
        description: `API endpoints under ${prefix} have ${shapes.size} different response shapes. Consistent response shapes improve API usability.`,
        evidence: endpoints.map((e) => ({
          description: `${e.path}: shape "${e.shape}"`,
          filePath: e.path,
        })),
        affectedNodes: endpoints.map((e) => e.nodeId),
        evidenceType: "detected" as EvidenceType,
        confidence: 0.7,
        suggestion: "Standardize response shapes across related endpoints. Use a common envelope pattern (e.g., { data, meta, errors }).",
        ruleId: "api/inconsistent-response",
      });
    }
  }

  return findings;
}

function detectMissingErrorResponses(
  graph: ApplicationGraph,
  cfg: ApiContractsConfig,
): Finding[] {
  const findings: Finding[] = [];
  const requiredCodes = cfg.requiredErrorCodes ?? [400, 401, 500];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "api") continue;
    const meta = node.meta as Record<string, unknown>;
    const definedCodes: number[] = Array.isArray(meta.errorCodes) ? meta.errorCodes as number[] : [];
    const missingCodes = requiredCodes.filter((code) => !definedCodes.includes(code));

    if (missingCodes.length > 0) {
      findings.push({
        id: generateId(node.path, `missing-errors:${nodeId}`),
        category: "api-contracts",
        severity: "low",
        title: `Missing error responses: ${node.name}`,
        description: `API endpoint ${node.name} is missing error response definitions for status codes: ${missingCodes.join(", ")}. Consumers need error responses for proper error handling.`,
        evidence: [{
          description: `Missing error codes: ${missingCodes.join(", ")}`,
          filePath: node.path,
          data: { missingCodes, definedCodes },
        }],
        affectedNodes: [nodeId],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.75,
        suggestion: `Define error responses for status codes ${missingCodes.join(", ")} in the API documentation and implementation.`,
        ruleId: "api/missing-error-responses",
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
