/**
 * FerrumEngine v2 — Compliance Intelligence Analyzer
 *
 * Analyzes the application graph for compliance issues:
 *   - License incompatibilities
 *   - Missing license headers
 *   - GDPR data handling issues (PII in logs)
 *   - SOC2 control gaps
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

export interface ComplianceConfig {
  /** Licenses that are incompatible with the project license. */
  incompatibleLicenses?: string[];
  /** Project's own license (for compatibility checks). */
  projectLicense?: string;
  /** File patterns that should have license headers. */
  licenseHeaderRequired?: RegExp[];
  /** PII field patterns for GDPR checks. */
  piiPatterns?: RegExp[];
}

const DEFAULT_CONFIG: ComplianceConfig = {
  incompatibleLicenses: ["GPL-2.0", "GPL-3.0", "AGPL-3.0"],
  projectLicense: "MIT",
  licenseHeaderRequired: [/\.ts$/, /\.tsx$/],
  piiPatterns: [
    /email/i,
    /phone|telephone/i,
    /ssn|social.?security/i,
    /credit.?card/i,
    /password/i,
    /address/i,
    /passport|national.?id/i,
  ],
};

// ──────────────────────────────────────────────────────────────────────
// MAIN ANALYZER
// ──────────────────────────────────────────────────────────────────────

export function analyzeCompliance(
  graph: ApplicationGraph,
  config: ComplianceConfig = {},
): AnalysisResult {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const startTime = performance.now();
  const findings: Finding[] = [];

  findings.push(...detectLicenseIncompatibilities(graph, cfg));
  findings.push(...detectMissingLicenseHeaders(graph, cfg));
  findings.push(...detectGdprIssues(graph, cfg));
  findings.push(...detectSoc2ControlGaps(graph));

  const durationMs = performance.now() - startTime;

  return {
    analyzer: "compliance",
    category: "compliance",
    durationMs,
    findings,
    summary: summarizeFindings(findings),
  };
}

// ──────────────────────────────────────────────────────────────────────
// DETECTORS
// ──────────────────────────────────────────────────────────────────────

function detectLicenseIncompatibilities(
  graph: ApplicationGraph,
  cfg: ComplianceConfig,
): Finding[] {
  const findings: Finding[] = [];
  const incompatible = cfg.incompatibleLicenses ?? [];
  if (incompatible.length === 0) return findings;

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "package") continue;
    const meta = node.meta as Record<string, unknown>;
    const license = typeof meta.license === "string" ? meta.license : null;

    if (license && incompatible.includes(license)) {
      findings.push({
        id: generateId(node.path, `license-incompat:${nodeId}`),
        category: "compliance",
        severity: "high",
        title: `License incompatibility: ${node.name} (${license})`,
        description: `Dependency ${node.name} uses ${license} license, which is incompatible with the project's ${cfg.projectLicense} license. This may require code to be distributed under ${license}.`,
        evidence: [{
          description: `Package ${node.name} uses ${license} license`,
          filePath: node.path,
          data: { package: node.name, license, projectLicense: cfg.projectLicense },
        }],
        affectedNodes: [nodeId],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.95,
        suggestion: `Replace ${node.name} with a permissively-licensed alternative or obtain a commercial license. Consult legal if needed.`,
        ruleId: "compliance/license-incompat",
      });
    }
  }

  return findings;
}

function detectMissingLicenseHeaders(
  graph: ApplicationGraph,
  cfg: ComplianceConfig,
): Finding[] {
  const findings: Finding[] = [];
  const patterns = cfg.licenseHeaderRequired ?? [];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "file") continue;
    const shouldHaveHeader = patterns.some((p) => p.test(node.path));
    if (!shouldHaveHeader) continue;

    const meta = node.meta as Record<string, unknown>;
    const hasLicenseHeader = meta.hasLicenseHeader === true;

    if (!hasLicenseHeader) {
      findings.push({
        id: generateId(node.path, `no-license-header:${nodeId}`),
        category: "compliance",
        severity: "low",
        title: `Missing license header: ${node.name}`,
        description: `File ${node.path} has no license header. All source files should include the project license header for legal clarity.`,
        evidence: [{
          description: "No license header found in file",
          filePath: node.path,
        }],
        affectedNodes: [nodeId],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.9,
        suggestion: "Add the project license header to this file. Use a tool like license-checker or add header automatically via CI.",
        ruleId: "compliance/missing-license-header",
      });
    }
  }

  return findings;
}

function detectGdprIssues(
  graph: ApplicationGraph,
  cfg: ComplianceConfig,
): Finding[] {
  const findings: Finding[] = [];
  const piiPatterns = cfg.piiPatterns ?? [];

  // Check for PII in logs
  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "function" && node.kind !== "method") continue;
    const meta = node.meta as Record<string, unknown>;
    const loggedFields: string[] = Array.isArray(meta.loggedFields) ? meta.loggedFields as string[] : [];

    const piiLogged = loggedFields.filter((field) =>
      piiPatterns.some((p) => p.test(field)),
    );

    if (piiLogged.length > 0) {
      findings.push({
        id: generateId(node.path, `pii-logged:${nodeId}`),
        category: "compliance",
        severity: "critical",
        title: `PII in logs: ${node.name}`,
        description: `Function ${node.name} logs personally identifiable information fields: ${piiLogged.join(", ")}. This violates GDPR Article 5(1)(f) data minimization principle.`,
        evidence: [{
          description: `PII fields logged: ${piiLogged.join(", ")}`,
          filePath: node.path,
          data: { piiFields: piiLogged },
        }],
        affectedNodes: [nodeId],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.9,
        suggestion: "Remove PII from log statements. Hash or mask sensitive fields before logging. Implement a log sanitizer.",
        ruleId: "compliance/pii-in-logs",
      });
    }
  }

  // Check for PII stored without consent
  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "store" && node.kind !== "api") continue;
    const meta = node.meta as Record<string, unknown>;
    const storesPii = meta.storesPii === true || meta.containsPii === true;
    const hasConsent = meta.hasConsentCheck === true || meta.gdprCompliant === true;

    if (storesPii && !hasConsent) {
      findings.push({
        id: generateId(node.path, `pii-no-consent:${nodeId}`),
        category: "compliance",
        severity: "high",
        title: `PII stored without consent: ${node.name}`,
        description: `${node.kind === "store" ? "Store" : "API"} ${node.name} stores PII without a consent check. GDPR requires explicit consent before storing personal data.`,
        evidence: [{
          description: "PII storage without consent mechanism",
          filePath: node.path,
        }],
        affectedNodes: [nodeId],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.85,
        suggestion: "Add a consent check before storing PII. Implement a consent management system and data retention policies.",
        ruleId: "compliance/pii-no-consent",
      });
    }
  }

  return findings;
}

function detectSoc2ControlGaps(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  // Check for SOC2 control requirements
  const hasAuditLogging = [...graph.nodes.values()].some((n) => {
    const meta = n.meta as Record<string, unknown>;
    return meta.auditLogging === true;
  });

  const hasAccessControls = [...graph.nodes.values()].some((n) => {
    const meta = n.meta as Record<string, unknown>;
    return meta.accessControl === true || n.kind === "middleware" && meta.authGuard === true;
  });

  const hasDataEncryption = [...graph.nodes.values()].some((n) => {
    const meta = n.meta as Record<string, unknown>;
    return meta.encryption === true || meta.encrypted === true;
  });

  if (!hasAuditLogging) {
    findings.push({
      id: generateId("compliance", "soc2-audit-logging"),
      category: "compliance",
      severity: "high",
      title: "SOC2 gap: Missing audit logging",
      description: "No audit logging detected in the application. SOC2 requires audit trails for security-relevant events.",
      evidence: [{
        description: "No audit logging configuration found",
      }],
      affectedNodes: [],
      evidenceType: "detected" as EvidenceType,
      confidence: 0.7,
      suggestion: "Implement audit logging for authentication events, data access, and configuration changes. Use a structured logging format.",
      ruleId: "compliance/soc2-audit-logging",
    });
  }

  if (!hasAccessControls) {
    findings.push({
      id: generateId("compliance", "soc2-access-controls"),
      category: "compliance",
      severity: "high",
      title: "SOC2 gap: Missing access controls",
      description: "No access control mechanisms detected. SOC2 requires role-based access controls to protect sensitive data.",
      evidence: [{
        description: "No access control or auth guard middleware found",
      }],
      affectedNodes: [],
      evidenceType: "detected" as EvidenceType,
      confidence: 0.65,
      suggestion: "Implement role-based access control (RBAC). Add auth guards to sensitive routes and APIs.",
      ruleId: "compliance/soc2-access-controls",
    });
  }

  if (!hasDataEncryption) {
    findings.push({
      id: generateId("compliance", "soc2-encryption"),
      category: "compliance",
      severity: "medium",
      title: "SOC2 gap: Missing data encryption",
      description: "No data encryption detected. SOC2 requires encryption of sensitive data at rest and in transit.",
      evidence: [{
        description: "No encryption configuration found",
      }],
      affectedNodes: [],
      evidenceType: "detected" as EvidenceType,
      confidence: 0.6,
      suggestion: "Encrypt sensitive data at rest (e.g., AES-256) and ensure TLS for data in transit. Use a key management service.",
      ruleId: "compliance/soc2-encryption",
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
