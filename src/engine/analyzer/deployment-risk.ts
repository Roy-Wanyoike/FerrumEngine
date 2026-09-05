/**
 * FerrumEngine v2 — Deployment Risk Intelligence Analyzer
 *
 * Analyzes the application graph for deployment risk issues:
 *   - Missing health checks
 *   - No rollback strategy
 *   - Database migration risks
 *   - Config-dependent deployments
 *   - Missing canary/blue-green setup
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

export interface DeploymentRiskConfig {
  /** Paths that indicate deployment configuration. */
  deployConfigPaths?: RegExp[];
  /** Max allowed migration risk level. */
  maxMigrationRisk?: "low" | "medium" | "high";
}

const DEFAULT_CONFIG: DeploymentRiskConfig = {
  deployConfigPaths: [/deploy/, /\.github\/workflows/, /dockerfile/i, /kubernetes/],
  maxMigrationRisk: "medium",
};

// ──────────────────────────────────────────────────────────────────────
// MAIN ANALYZER
// ──────────────────────────────────────────────────────────────────────

export function analyzeDeploymentRisk(
  graph: ApplicationGraph,
  config: DeploymentRiskConfig = {},
): AnalysisResult {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const startTime = performance.now();
  const findings: Finding[] = [];

  findings.push(...detectMissingHealthChecks(graph));
  findings.push(...detectNoRollbackStrategy(graph));
  findings.push(...detectDatabaseMigrationRisks(graph, cfg));
  findings.push(...detectConfigDependentDeployments(graph));
  findings.push(...detectMissingCanaryBlueGreen(graph));

  const durationMs = performance.now() - startTime;

  return {
    analyzer: "deployment-risk",
    category: "deployment-risk",
    durationMs,
    findings,
    summary: summarizeFindings(findings),
  };
}

// ──────────────────────────────────────────────────────────────────────
// DETECTORS
// ──────────────────────────────────────────────────────────────────────

function detectMissingHealthChecks(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "service" && node.kind !== "api") continue;
    const meta = node.meta as Record<string, unknown>;
    const hasHealthCheck = meta.hasHealthCheck === true || meta.healthEndpoint === true;

    if (!hasHealthCheck) {
      findings.push({
        id: generateId(node.path, `no-health:${nodeId}`),
        category: "deployment-risk",
        severity: "high",
        title: `Missing health check: ${node.name}`,
        description: `Service/endpoint ${node.name} has no health check. Without health checks, orchestrators cannot determine if the service is ready to receive traffic.`,
        evidence: [{
          description: "No health check endpoint detected",
          filePath: node.path,
        }],
        affectedNodes: [nodeId],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.85,
        suggestion: "Add a /health or /ready endpoint that verifies critical dependencies (DB, cache, etc.) are accessible.",
        ruleId: "deploy/missing-health-check",
      });
    }
  }

  return findings;
}

function detectNoRollbackStrategy(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  // Check deployment configs for rollback strategies
  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "config") continue;
    const meta = node.meta as Record<string, unknown>;
    const isDeployConfig = meta.isDeployConfig === true || /deploy|workflow|pipeline/i.test(node.path);
    if (!isDeployConfig) continue;

    const hasRollback = meta.hasRollback === true || meta.rollbackEnabled === true;
    if (!hasRollback) {
      findings.push({
        id: generateId(node.path, `no-rollback:${nodeId}`),
        category: "deployment-risk",
        severity: "high",
        title: `No rollback strategy: ${node.name}`,
        description: `Deployment configuration ${node.name} has no rollback strategy. Failed deployments will leave the service in a broken state.`,
        evidence: [{
          description: "No rollback mechanism detected in deployment config",
          filePath: node.path,
        }],
        affectedNodes: [nodeId],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.8,
        suggestion: "Add automatic rollback on deployment failure. Use Kubernetes rollouts, AWS ECS rollback, or CI/CD rollback steps.",
        ruleId: "deploy/no-rollback",
      });
    }
  }

  return findings;
}

function detectDatabaseMigrationRisks(
  graph: ApplicationGraph,
  cfg: DeploymentRiskConfig,
): Finding[] {
  const findings: Finding[] = [];
  const maxRisk = cfg.maxMigrationRisk ?? "medium";
  const riskOrder = { low: 0, medium: 1, high: 2 };

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "config" && node.kind !== "file") continue;
    const meta = node.meta as Record<string, unknown>;
    const migrations = Array.isArray(meta.migrations) ? meta.migrations as Array<{name: string; risk: "low" | "medium" | "high"; reversible: boolean}> : [];

    for (const migration of migrations) {
      const exceedsThreshold = (riskOrder[migration.risk] ?? 0) > (riskOrder[maxRisk] ?? 1);
      if (exceedsThreshold || !migration.reversible) {
        const severity: Severity = !migration.reversible ? "critical" : migration.risk === "high" ? "high" : "medium";
        findings.push({
          id: generateId(node.path, `migration-risk:${migration.name}:${nodeId}`),
          category: "deployment-risk",
          severity,
          title: `Database migration risk: ${migration.name}`,
          description: `Migration ${migration.name} has risk level "${migration.risk}"${!migration.reversible ? " and is NOT reversible" : ""}. High-risk or irreversible migrations can cause data loss or downtime.`,
          evidence: [{
            description: `Risk: ${migration.risk}, reversible: ${migration.reversible}`,
            filePath: node.path,
            data: migration,
          }],
          affectedNodes: [nodeId],
          evidenceType: "detected" as EvidenceType,
          confidence: 0.9,
          suggestion: "Make this migration reversible by adding a down migration. Review and test in staging before applying to production. Consider running during low-traffic periods.",
          ruleId: "deploy/migration-risk",
        });
      }
    }
  }

  return findings;
}

function detectConfigDependentDeployments(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "service") continue;
    const meta = node.meta as Record<string, unknown>;
    const configDeps = Array.isArray(meta.configDependencies) ? meta.configDependencies as string[] : [];

    if (configDeps.length >= 3) {
      findings.push({
        id: generateId(node.path, `config-deploy:${nodeId}`),
        category: "deployment-risk",
        severity: "medium",
        title: `Config-dependent deployment: ${node.name}`,
        description: `Service ${node.name} depends on ${configDeps.length} configuration values: ${configDeps.join(", ")}. Deployment success depends on these configs being present and correct.`,
        evidence: [{
          description: `${configDeps.length} config dependencies: ${configDeps.join(", ")}`,
          filePath: node.path,
          data: { configDeps },
        }],
        affectedNodes: [nodeId],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.75,
        suggestion: "Validate all config dependencies before deployment. Use config validation at startup and fail fast if required configs are missing.",
        ruleId: "deploy/config-dependent",
      });
    }
  }

  return findings;
}

function detectMissingCanaryBlueGreen(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  // Check if any services use canary or blue-green deployment
  const services: { id: string; name: string; path: string }[] = [];
  let hasAdvancedDeployment = false;

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "service") continue;
    const meta = node.meta as Record<string, unknown>;
    services.push({ id: nodeId, name: node.name, path: node.path });

    if (meta.canaryDeployment === true || meta.blueGreenDeployment === true ||
        meta.rollingDeployment === true) {
      hasAdvancedDeployment = true;
    }
  }

  if (services.length > 0 && !hasAdvancedDeployment) {
    findings.push({
      id: generateId("deploy", "no-canary-bg"),
      category: "deployment-risk",
      severity: "medium",
      title: "Missing canary/blue-green deployment strategy",
      description: `The project has ${services.length} service(s) but no canary or blue-green deployment strategy. Direct deployments risk exposing all users to a bad release simultaneously.`,
      evidence: services.slice(0, 5).map((s) => ({
        description: `Service: ${s.name}`,
        filePath: s.path,
      })),
      affectedNodes: services.map((s) => s.id),
      evidenceType: "detected" as EvidenceType,
      confidence: 0.7,
      suggestion: "Implement canary deployments or blue-green deployment strategy to gradually roll out changes and enable quick rollback.",
      ruleId: "deploy/no-canary-blue-green",
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
