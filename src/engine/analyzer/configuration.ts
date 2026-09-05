/**
 * FerrumEngine v2 — Configuration Intelligence Analyzer
 *
 * Analyzes the application graph for configuration issues:
 *   - Missing env var validation
 *   - Hardcoded config values
 *   - Config type mismatches
 *   - Missing .env.example entries
 *   - Config drift (different values in different environments)
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

export interface ConfigurationConfig {
  /** Env vars that are required and should be validated. */
  requiredEnvVars?: string[];
  /** Patterns that indicate hardcoded config values. */
  hardcodedPatterns?: RegExp[];
  /** Max number of env vars allowed without .env.example entry. */
  missingExampleThreshold?: number;
}

const DEFAULT_CONFIG: ConfigurationConfig = {
  requiredEnvVars: [],
  hardcodedPatterns: [
    /localhost:\d{4}/,
    /127\.0\.0\.1:\d{4}/,
    /0\.0\.0\.0:\d{4}/,
    /https?:\/\/[a-zA-Z0-9.-]+\.(com|io|dev|org)/,
  ],
  missingExampleThreshold: 0,
};

// ──────────────────────────────────────────────────────────────────────
// MAIN ANALYZER
// ──────────────────────────────────────────────────────────────────────

export function analyzeConfiguration(
  graph: ApplicationGraph,
  config: ConfigurationConfig = {},
): AnalysisResult {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const startTime = performance.now();
  const findings: Finding[] = [];

  findings.push(...detectMissingEnvVarValidation(graph, cfg));
  findings.push(...detectHardcodedConfigValues(graph, cfg));
  findings.push(...detectConfigTypeMismatches(graph));
  findings.push(...detectMissingEnvExample(graph));
  findings.push(...detectConfigDrift(graph));

  const durationMs = performance.now() - startTime;

  return {
    analyzer: "configuration",
    category: "configuration",
    durationMs,
    findings,
    summary: summarizeFindings(findings),
  };
}

// ──────────────────────────────────────────────────────────────────────
// DETECTORS
// ──────────────────────────────────────────────────────────────────────

function detectMissingEnvVarValidation(
  graph: ApplicationGraph,
  cfg: ConfigurationConfig,
): Finding[] {
  const findings: Finding[] = [];
  const required = cfg.requiredEnvVars ?? [];
  if (required.length === 0) return findings;

  // Find env var references in the graph
  const validatedVars = new Set<string>();
  const referencedVars = new Map<string, { nodeId: string; path: string }>();

  for (const [nodeId, node] of graph.nodes) {
    const meta = node.meta as Record<string, unknown>;
    // Track validated env vars (found in validation schemas)
    if (node.kind === "config" || (meta.validatesEnv === true)) {
      const vars = Array.isArray(meta.envVars) ? meta.envVars as string[] : [];
      for (const v of vars) validatedVars.add(v);
    }
    // Track referenced env vars
    if (Array.isArray(meta.envVarReferences)) {
      for (const v of meta.envVarReferences as string[]) {
        referencedVars.set(v, { nodeId, path: node.path });
      }
    }
  }

  for (const envVar of required) {
    if (!validatedVars.has(envVar)) {
      const ref = referencedVars.get(envVar);
      findings.push({
        id: generateId("env", `no-validation:${envVar}`),
        category: "configuration",
        severity: "high",
        title: `Missing env var validation: ${envVar}`,
        description: `Required environment variable ${envVar} is used but not validated. Missing validation can cause runtime errors and silent misconfiguration.`,
        evidence: [{
          description: `${envVar} is not validated at startup`,
          filePath: ref?.path,
          data: { envVar },
        }],
        affectedNodes: ref ? [ref.nodeId] : [],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.9,
        suggestion: `Add validation for ${envVar} using a schema library (e.g., zod) or a startup validation check.`,
        ruleId: "config/missing-env-validation",
      });
    }
  }

  return findings;
}

function detectHardcodedConfigValues(
  graph: ApplicationGraph,
  cfg: ConfigurationConfig,
): Finding[] {
  const findings: Finding[] = [];
  const patterns = cfg.hardcodedPatterns ?? [];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "config" && node.kind !== "file") continue;
    const meta = node.meta as Record<string, unknown>;
    const code = typeof meta.code === "string" ? meta.code : "";

    for (const pattern of patterns) {
      const match = pattern.exec(code);
      if (match) {
        findings.push({
          id: generateId(node.path, `hardcoded:${pattern.source}:${nodeId}`),
          category: "configuration",
          severity: "medium",
          title: `Hardcoded config value in ${node.name}: "${match[0]}"`,
          description: `A hardcoded configuration value "${match[0]}" was detected in ${node.path}. Hardcoded values make environment-specific configuration impossible.`,
          evidence: [{
            description: `Pattern "${pattern.source}" matched: "${match[0]}"`,
            filePath: node.path,
            data: { matched: match[0], pattern: pattern.source },
          }],
          affectedNodes: [nodeId],
          evidenceType: "detected" as EvidenceType,
          confidence: 0.8,
          suggestion: "Move this value to an environment variable or configuration file.",
          ruleId: "config/hardcoded-value",
        });
      }
    }
  }

  return findings;
}

function detectConfigTypeMismatches(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "config") continue;
    const meta = node.meta as Record<string, unknown>;
    const typeMismatches = Array.isArray(meta.typeMismatches) ? meta.typeMismatches as Array<{key: string; expected: string; actual: string}> : [];

    for (const mismatch of typeMismatches) {
      findings.push({
        id: generateId(node.path, `type-mismatch:${mismatch.key}:${nodeId}`),
        category: "configuration",
        severity: "high",
        title: `Config type mismatch: ${mismatch.key}`,
        description: `Configuration key "${mismatch.key}" expected type "${mismatch.expected}" but got "${mismatch.actual}". Type mismatches can cause subtle runtime errors.`,
        evidence: [{
          description: `Expected ${mismatch.expected}, got ${mismatch.actual}`,
          filePath: node.path,
          data: mismatch,
        }],
        affectedNodes: [nodeId],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.95,
        suggestion: `Ensure ${mismatch.key} is of type ${mismatch.expected}. Add type coercion or validation at the config entry point.`,
        ruleId: "config/type-mismatch",
      });
    }
  }

  return findings;
}

function detectMissingEnvExample(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  // Check if .env.example exists and covers all referenced env vars
  const referencedVars = new Set<string>();
  const exampleVars = new Set<string>();
  let hasEnvExample = false;

  for (const [nodeId, node] of graph.nodes) {
    const meta = node.meta as Record<string, unknown>;
    if (Array.isArray(meta.envVarReferences)) {
      for (const v of meta.envVarReferences as string[]) referencedVars.add(v);
    }
    if (node.path.endsWith(".env.example") || meta.isEnvExample === true) {
      hasEnvExample = true;
      const vars = Array.isArray(meta.envVars) ? meta.envVars as string[] : [];
      for (const v of vars) exampleVars.add(v);
    }
  }

  if (!hasEnvExample && referencedVars.size > 0) {
    findings.push({
      id: generateId("config", "missing-env-example"),
      category: "configuration",
      severity: "medium",
      title: `Missing .env.example file`,
      description: `The project references ${referencedVars.size} environment variables but has no .env.example file. This makes onboarding and environment setup difficult.`,
      evidence: [{
        description: `${referencedVars.size} env vars referenced, no .env.example found`,
        data: { referencedCount: referencedVars.size },
      }],
      affectedNodes: [],
      evidenceType: "detected" as EvidenceType,
      confidence: 0.85,
      suggestion: "Create a .env.example file documenting all required environment variables with placeholder values.",
      ruleId: "config/missing-env-example",
    });
  }

  // Check for referenced vars missing from .env.example
  const missing = [...referencedVars].filter((v) => !exampleVars.has(v));
  if (missing.length > 0 && hasEnvExample) {
    findings.push({
      id: generateId("config", "env-example-gaps"),
      category: "configuration",
      severity: "low",
      title: `Missing .env.example entries: ${missing.join(", ")}`,
      description: `${missing.length} environment variable(s) are referenced in code but missing from .env.example: ${missing.join(", ")}.`,
      evidence: [{
        description: `Missing: ${missing.join(", ")}`,
        data: { missingVars: missing },
      }],
      affectedNodes: [],
      evidenceType: "detected" as EvidenceType,
      confidence: 0.9,
      suggestion: "Add these variables to .env.example with placeholder values and descriptions.",
      ruleId: "config/env-example-gaps",
    });
  }

  return findings;
}

function detectConfigDrift(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "config") continue;
    const meta = node.meta as Record<string, unknown>;
    const drift = Array.isArray(meta.configDrift) ? meta.configDrift as Array<{key: string; env1: string; env2: string; value1: string; value2: string}> : [];

    for (const d of drift) {
      findings.push({
        id: generateId(node.path, `drift:${d.key}:${nodeId}`),
        category: "configuration",
        severity: "medium",
        title: `Config drift: ${d.key} differs between ${d.env1} and ${d.env2}`,
        description: `Configuration key "${d.key}" has different values in ${d.env1} ("${d.value1}") vs ${d.env2} ("${d.value2}"). This drift may cause environment-specific bugs.`,
        evidence: [{
          description: `${d.env1}: "${d.value1}" vs ${d.env2}: "${d.value2}"`,
          filePath: node.path,
          data: d,
        }],
        affectedNodes: [nodeId],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.75,
        suggestion: "Unify configuration across environments or document intentional differences.",
        ruleId: "config/config-drift",
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
