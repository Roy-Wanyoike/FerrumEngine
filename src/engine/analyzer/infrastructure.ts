/**
 * FerrumEngine v2 — Infrastructure Intelligence Analyzer
 *
 * Analyzes the application graph for infrastructure issues:
 *   - Missing IaC definitions
 *   - Hardcoded infrastructure references
 *   - Missing monitoring/alerting
 *   - Resource drift
 *   - Missing backup configurations
 */

import type {
  ApplicationGraph,
  Finding,
  AnalysisResult,
  Severity,
  EvidenceType,
} from "../core/types";
import { generateId } from "../core/graph";

// ──────────────────────────────────────────────────────────────────────
// ANALYZER CONFIG
// ──────────────────────────────────────────────────────────────────────

export interface InfrastructureConfig {
  /** Infrastructure paths/patterns that should have IaC. */
  iacPaths?: RegExp[];
  /** Services that should have monitoring. */
  monitoredServicePatterns?: RegExp[];
  /** Critical resources that should have backups. */
  backupRequiredPatterns?: RegExp[];
}

const DEFAULT_CONFIG: InfrastructureConfig = {
  iacPaths: [/infrastructure/, /deploy/, /terraform/, /cloudformation/],
  monitoredServicePatterns: [/api/, /service/, /worker/],
  backupRequiredPatterns: [/database/, /storage/],
};

// ──────────────────────────────────────────────────────────────────────
// MAIN ANALYZER
// ──────────────────────────────────────────────────────────────────────

export function analyzeInfrastructure(
  graph: ApplicationGraph,
  config: InfrastructureConfig = {},
): AnalysisResult {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const startTime = performance.now();
  const findings: Finding[] = [];

  findings.push(...detectMissingIac(graph, cfg));
  findings.push(...detectHardcodedInfraReferences(graph));
  findings.push(...detectMissingMonitoring(graph, cfg));
  findings.push(...detectResourceDrift(graph));
  findings.push(...detectMissingBackupConfig(graph, cfg));

  const durationMs = performance.now() - startTime;

  return {
    analyzer: "infrastructure",
    category: "infrastructure",
    durationMs,
    findings,
    summary: summarizeFindings(findings),
  };
}

// ──────────────────────────────────────────────────────────────────────
// DETECTORS
// ──────────────────────────────────────────────────────────────────────

function detectMissingIac(
  graph: ApplicationGraph,
  cfg: InfrastructureConfig,
): Finding[] {
  const findings: Finding[] = [];

  // Check if there are any IaC files in the graph
  const hasIac = [...graph.nodes.values()].some((node) => {
    const meta = node.meta as Record<string, unknown>;
    return node.kind === "config" && (
      meta.isIac === true ||
      node.path.endsWith(".tf") ||
      node.path.endsWith(".yaml") && node.path.includes("cloudformation") ||
      node.path.endsWith(".yml") && node.path.includes("kubernetes")
    );
  });

  // Check for service/deployment nodes that should have IaC
  const serviceNodes = [...graph.nodes.entries()].filter(
    ([, node]) => node.kind === "service" || (node.kind === "config" && /deploy|infra|service/.test(node.path)),
  );

  if (!hasIac && serviceNodes.length > 0) {
    findings.push({
      id: generateId("infra", "missing-iac"),
      category: "infrastructure",
      severity: "high",
      title: "Missing Infrastructure as Code definitions",
      description: `The project has ${serviceNodes.length} service/deployment configuration(s) but no Infrastructure as Code (IaC) definitions. Manual infrastructure is error-prone and not reproducible.`,
      evidence: [{
        description: `${serviceNodes.length} service configurations without IaC`,
        data: { serviceCount: serviceNodes.length },
      }],
      affectedNodes: serviceNodes.map(([, node]) => node.id),
      evidenceType: "detected" as EvidenceType,
      confidence: 0.8,
      suggestion: "Define infrastructure using Terraform, CloudFormation, Pulumi, or Kubernetes manifests. Version control all infrastructure definitions.",
      ruleId: "infra/missing-iac",
    });
  }

  return findings;
}

function detectHardcodedInfraReferences(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];
  const infraPatterns = [
    /arn:aws:[a-z0-9-]+:/,
    /i-[a-f0-9]{17,}/, // EC2 instance ID
    /db-[a-z0-9-]+/, // RDS identifier
    /s3-[a-z0-9-]+\.amazonaws\.com/,
    /\.cloudfront\.net/,
    /elasticbeanstalk\.com/,
    /execute-api\.[a-z0-9-]+\.amazonaws\.com/,
  ];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind === "config" || node.kind === "file") {
      const meta = node.meta as Record<string, unknown>;
      const code = typeof meta.code === "string" ? meta.code : "";
      if (typeof meta.body === "string") { /* check body too */ }

      for (const pattern of infraPatterns) {
        const match = pattern.exec(code);
        if (match) {
          findings.push({
            id: generateId(node.path, `hardcoded-infra:${pattern.source}:${nodeId}`),
            category: "infrastructure",
            severity: "high",
            title: `Hardcoded infrastructure reference: ${node.name}`,
            description: `Hardcoded infrastructure reference "${match[0].substring(0, 40)}..." found in ${node.path}. These should be parameterized for environment portability.`,
            evidence: [{
              description: `Pattern "${pattern.source}" matched`,
              filePath: node.path,
              data: { matched: match[0].substring(0, 40) },
            }],
            affectedNodes: [nodeId],
            evidenceType: "detected" as EvidenceType,
            confidence: 0.85,
            suggestion: "Replace hardcoded references with environment variables, SSM parameters, or IaC outputs.",
            ruleId: "infra/hardcoded-reference",
          });
        }
      }
    }
  }

  return findings;
}

function detectMissingMonitoring(
  graph: ApplicationGraph,
  cfg: InfrastructureConfig,
): Finding[] {
  const findings: Finding[] = [];
  const patterns = cfg.monitoredServicePatterns ?? [];

  // Find services and check if they have monitoring
  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "service" && node.kind !== "api") continue;
    const meta = node.meta as Record<string, unknown>;
    const hasMonitoring = meta.hasMonitoring === true || meta.hasAlerts === true || meta.hasMetrics === true;

    if (!hasMonitoring) {
      const isRelevant = patterns.length === 0 || patterns.some((p) => p.test(node.path) || p.test(node.name));
      if (isRelevant) {
        findings.push({
          id: generateId(node.path, `no-monitoring:${nodeId}`),
          category: "infrastructure",
          severity: "medium",
          title: `Missing monitoring: ${node.name}`,
          description: `Service ${node.name} has no monitoring or alerting configured. Without monitoring, issues go undetected until users report them.`,
          evidence: [{
            description: "No monitoring/alerting configuration found",
            filePath: node.path,
          }],
          affectedNodes: [nodeId],
          evidenceType: "detected" as EvidenceType,
          confidence: 0.75,
          suggestion: "Add health checks, metrics (e.g., response time, error rate), and alerts for this service. Use CloudWatch, Datadog, or Prometheus.",
          ruleId: "infra/missing-monitoring",
        });
      }
    }
  }

  return findings;
}

function detectResourceDrift(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "config") continue;
    const meta = node.meta as Record<string, unknown>;
    const driftItems = Array.isArray(meta.resourceDrift) ? meta.resourceDrift as Array<{resource: string; expected: string; actual: string}> : [];

    for (const drift of driftItems) {
      findings.push({
        id: generateId(node.path, `drift:${drift.resource}:${nodeId}`),
        category: "infrastructure",
        severity: "high",
        title: `Resource drift: ${drift.resource}`,
        description: `Infrastructure resource "${drift.resource}" has drifted from its IaC definition. Expected: "${drift.expected}", actual: "${drift.actual}". Drift can cause outages and security issues.`,
        evidence: [{
          description: `Expected "${drift.expected}", actual "${drift.actual}"`,
          filePath: node.path,
          data: drift,
        }],
        affectedNodes: [nodeId],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.9,
        suggestion: "Reconcile the drifted resource with its IaC definition. Run `terraform plan` or equivalent to detect drift regularly.",
        ruleId: "infra/resource-drift",
      });
    }
  }

  return findings;
}

function detectMissingBackupConfig(
  graph: ApplicationGraph,
  cfg: InfrastructureConfig,
): Finding[] {
  const findings: Finding[] = [];
  const patterns = cfg.backupRequiredPatterns ?? [];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "service" && node.kind !== "config") continue;
    const meta = node.meta as Record<string, unknown>;
    const hasBackup = meta.hasBackup === true || meta.backupEnabled === true;
    const isDataStore = patterns.some((p) => p.test(node.path) || p.test(node.name)) ||
      meta.isDatabase === true || meta.isStorage === true;

    if (isDataStore && !hasBackup) {
      findings.push({
        id: generateId(node.path, `no-backup:${nodeId}`),
        category: "infrastructure",
        severity: "high",
        title: `Missing backup configuration: ${node.name}`,
        description: `Data resource ${node.name} has no backup configuration. Data loss is irreversible without backups.`,
        evidence: [{
          description: "No backup configuration found for data resource",
          filePath: node.path,
        }],
        affectedNodes: [nodeId],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.85,
        suggestion: "Configure automated backups for this resource. Set backup retention, frequency, and test restoration procedures.",
        ruleId: "infra/missing-backup",
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
