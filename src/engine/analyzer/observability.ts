/**
 * FerrumEngine v2 — Observability Intelligence Analyzer
 *
 * Analyzes the application graph for observability issues:
 *   - Missing error logging
 *   - Untraced API calls
 *   - Blind spots (no logging in critical paths)
 *   - Missing metrics
 *   - Alert gaps
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

export interface ObservabilityConfig {
  /** Max number of API calls without tracing before flagging. */
  untracedThreshold?: number;
  /** Critical path patterns that must have logging. */
  criticalPathPatterns?: RegExp[];
  /** Metrics that should be present for services. */
  requiredMetrics?: string[];
}

const DEFAULT_CONFIG: ObservabilityConfig = {
  untracedThreshold: 0,
  criticalPathPatterns: [],
  requiredMetrics: ["error_rate", "latency", "throughput"],
};

// ──────────────────────────────────────────────────────────────────────
// MAIN ANALYZER
// ──────────────────────────────────────────────────────────────────────

export function analyzeObservability(
  graph: ApplicationGraph,
  config: ObservabilityConfig = {},
): AnalysisResult {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const startTime = performance.now();
  const findings: Finding[] = [];

  findings.push(...detectMissingErrorLogging(graph));
  findings.push(...detectUntracedApiCalls(graph, cfg));
  findings.push(...detectBlindSpots(graph, cfg));
  findings.push(...detectMissingMetrics(graph, cfg));
  findings.push(...detectAlertGaps(graph));

  const durationMs = performance.now() - startTime;

  return {
    analyzer: "observability",
    category: "observability",
    durationMs,
    findings,
    summary: summarizeFindings(findings),
  };
}

// ──────────────────────────────────────────────────────────────────────
// DETECTORS
// ──────────────────────────────────────────────────────────────────────

function detectMissingErrorLogging(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "function" && node.kind !== "method") continue;
    const meta = node.meta as Record<string, unknown>;
    const hasErrorHandling = meta.hasErrorHandling === true || meta.hasTryCatch === true;
    const hasErrorLogging = meta.hasErrorLogging === true || meta.logsErrors === true;

    if (hasErrorHandling && !hasErrorLogging) {
      findings.push({
        id: generateId(node.path, `no-error-log:${nodeId}`),
        category: "observability",
        severity: "medium",
        title: `Missing error logging: ${node.name}`,
        description: `Function ${node.name} has error handling (try/catch) but does not log the error. Silent error swallowing makes debugging extremely difficult.`,
        evidence: [{
          description: "Error handling without logging detected",
          filePath: node.path,
          line: node.loc[0],
        }],
        affectedNodes: [nodeId],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.85,
        suggestion: "Add error logging in catch blocks. Include error message, stack trace, and relevant context.",
        ruleId: "observe/missing-error-logging",
      });
    }
  }

  return findings;
}

function detectUntracedApiCalls(
  graph: ApplicationGraph,
  cfg: ObservabilityConfig,
): Finding[] {
  const findings: Finding[] = [];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "api") continue;
    const meta = node.meta as Record<string, unknown>;
    const isTraced = meta.isTraced === true || meta.hasTracing === true || meta.distributedTracing === true;

    if (!isTraced) {
      findings.push({
        id: generateId(node.path, `untraced:${nodeId}`),
        category: "observability",
        severity: "medium",
        title: `Untraced API call: ${node.name}`,
        description: `API endpoint ${node.name} has no distributed tracing. Without tracing, it is difficult to debug latency issues and trace request flows across services.`,
        evidence: [{
          description: "No distributed tracing configured",
          filePath: node.path,
        }],
        affectedNodes: [nodeId],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.8,
        suggestion: "Add distributed tracing (e.g., OpenTelemetry, Jaeger, AWS X-Ray). Ensure trace context is propagated across service boundaries.",
        ruleId: "observe/untraced-api",
      });
    }
  }

  return findings;
}

function detectBlindSpots(
  graph: ApplicationGraph,
  cfg: ObservabilityConfig,
): Finding[] {
  const findings: Finding[] = [];
  const patterns = cfg.criticalPathPatterns ?? [];

  // Check critical path patterns for logging
  for (const pattern of patterns) {
    const matchingNodes = [...graph.nodes.values()].filter(
      (node) => pattern.test(node.path) || pattern.test(node.name),
    );

    for (const node of matchingNodes) {
      const meta = node.meta as Record<string, unknown>;
      const hasLogging = meta.hasLogging === true || meta.hasConsole === true;

      if (!hasLogging) {
        findings.push({
          id: generateId(node.path, `blind-spot:${node.id}`),
          category: "observability",
          severity: "high",
          title: `Observability blind spot: ${node.name}`,
          description: `Critical path node ${node.name} has no logging. This is a blind spot where issues will be undetectable in production.`,
          evidence: [{
            description: `No logging in critical path (pattern: ${pattern.source})`,
            filePath: node.path,
          }],
          affectedNodes: [node.id],
          evidenceType: "detected" as EvidenceType,
          confidence: 0.75,
          suggestion: "Add structured logging at key points in this critical path. Log entry/exit, errors, and important state changes.",
          ruleId: "observe/blind-spot",
        });
      }
    }
  }

  return findings;
}

function detectMissingMetrics(
  graph: ApplicationGraph,
  cfg: ObservabilityConfig,
): Finding[] {
  const findings: Finding[] = [];
  const required = cfg.requiredMetrics ?? [];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "service" && node.kind !== "api") continue;
    const meta = node.meta as Record<string, unknown>;
    const definedMetrics: string[] = Array.isArray(meta.metrics) ? meta.metrics as string[] : [];

    const missing = required.filter((m) => !definedMetrics.includes(m));
    if (missing.length > 0) {
      findings.push({
        id: generateId(node.path, `missing-metrics:${nodeId}`),
        category: "observability",
        severity: "medium",
        title: `Missing metrics: ${node.name}`,
        description: `Service ${node.name} is missing recommended metrics: ${missing.join(", ")}. Without these metrics, performance issues cannot be detected proactively.`,
        evidence: [{
          description: `Missing: ${missing.join(", ")}`,
          filePath: node.path,
          data: { missing, defined: definedMetrics },
        }],
        affectedNodes: [nodeId],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.8,
        suggestion: `Add metrics for: ${missing.join(", ")}. Use a metrics library (Prometheus, StatsD, CloudWatch) to instrument this service.`,
        ruleId: "observe/missing-metrics",
      });
    }
  }

  return findings;
}

function detectAlertGaps(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  // Check for services with error-rate metrics but no alerts
  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "service") continue;
    const meta = node.meta as Record<string, unknown>;
    const hasMetrics = meta.hasMetrics === true || Array.isArray(meta.metrics) && (meta.metrics as string[]).length > 0;
    const hasAlerts = meta.hasAlerts === true || meta.alertingEnabled === true;

    if (hasMetrics && !hasAlerts) {
      findings.push({
        id: generateId(node.path, `alert-gap:${nodeId}`),
        category: "observability",
        severity: "medium",
        title: `Alert gap: ${node.name} has metrics but no alerts`,
        description: `Service ${node.name} collects metrics but has no alerting configured. Metrics without alerts are only useful for manual investigation, not proactive incident response.`,
        evidence: [{
          description: "Metrics present, no alerting configured",
          filePath: node.path,
        }],
        affectedNodes: [nodeId],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.8,
        suggestion: "Configure alerts for key metrics: error rate > threshold, latency p99 > threshold, throughput anomalies. Integrate with PagerDuty, OpsGenie, or similar.",
        ruleId: "observe/alert-gap",
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
