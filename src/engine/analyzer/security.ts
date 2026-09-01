/**
 * FerrumEngine v2 — Security Analyzer
 *
 * Analyzes the application graph for security issues:
 *   - Dangerous API patterns (eval, innerHTML, dangerouslySetInnerHTML)
 *   - Hardcoded secrets (API keys, tokens, passwords)
 *   - Missing CSRF protection on API routes
 *   - Client-side auth logic
 *   - Non-HTTPS external API calls
 *   - Missing input sanitization on API routes
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

export interface SecurityConfig {
  /** Regex patterns for dangerous API calls. */
  dangerousPatterns?: RegExp[];
  /** Regex patterns for hardcoded secrets. */
  secretPatterns?: RegExp[];
  /** Domains that are allowed to use HTTP. */
  allowedHttpDomains?: string[];
}

const DEFAULT_CONFIG: SecurityConfig = {
  dangerousPatterns: [
    /\beval\s*\(/,
    /\.innerHTML\s*=/,
    /dangerouslySetInnerHTML/,
    /document\.write\s*\(/,
    /new\s+Function\s*\(/,
    /setTimeout\s*\([^,]*['"`]/, // setTimeout with string arg
  ],
  secretPatterns: [
    /(?:api[_-]?key|apikey)\s*[=:']\s*['"][^'"]{8,}/i,
    /(?:secret|token|password|passwd|pwd)\s*[=:']\s*['"][^'"]{8,}/i,
    /(?:Bearer|Authorization)\s*[:\s]+['"][^'"]{10,}/i,
    /(?:PRIVATE_KEY|SIGNING_KEY|ENCRYPTION_KEY)\s*[=:']\s*['"][^'"]{8,}/i,
    /ghp_[A-Za-z0-9]{36,}/, // GitHub PAT
    /sk-[A-Za-z0-9]{48,}/, // OpenAI API key
    /xox[bpas]-[A-Za-z0-9-]+/, // Slack tokens
  ],
  allowedHttpDomains: ["localhost", "127.0.0.1", "0.0.0.0"],
};

// ──────────────────────────────────────────────────────────────────────
// MAIN ANALYZER
// ──────────────────────────────────────────────────────────────────────

export function analyzeSecurity(
  graph: ApplicationGraph,
  config: SecurityConfig = {},
): AnalysisResult {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const startTime = performance.now();
  const findings: Finding[] = [];

  findings.push(...detectDangerousPatterns(graph, cfg));
  findings.push(...detectHardcodedSecrets(graph, cfg));
  findings.push(...detectMissingCsrfProtection(graph));
  findings.push(...detectClientSideAuthLogic(graph));
  findings.push(...detectNonHttpsApiCalls(graph, cfg));
  findings.push(...detectMissingInputSanitization(graph));

  const durationMs = performance.now() - startTime;

  return {
    analyzer: "security",
    category: "security",
    durationMs,
    findings,
    summary: summarizeFindings(findings),
  };
}

// ──────────────────────────────────────────────────────────────────────
// DETECTORS
// ──────────────────────────────────────────────────────────────────────

function detectDangerousPatterns(
  graph: ApplicationGraph,
  cfg: SecurityConfig,
): Finding[] {
  const findings: Finding[] = [];
  const patterns = cfg.dangerousPatterns ?? [];

  for (const node of graph.nodes.values()) {
    // Check node name and meta for dangerous patterns
    const meta = node.meta as Record<string, unknown>;
    const codeSnippets: string[] = [];

    // Gather searchable strings from meta
    if (typeof meta.code === "string") codeSnippets.push(meta.code);
    if (Array.isArray(meta.calls)) codeSnippets.push(...(meta.calls as string[]));
    if (typeof meta.body === "string") codeSnippets.push(meta.body);

    for (const pattern of patterns) {
      for (const snippet of codeSnippets) {
        const match = pattern.exec(snippet);
        if (match) {
          const matched = match[0] ?? pattern.source;
          const severity: Severity = matched.includes("eval") || matched.includes("document.write")
            ? "critical"
            : matched.includes("dangerouslySetInnerHTML") || matched.includes("innerHTML")
              ? "high"
              : "medium";

          findings.push({
            id: generateId(node.path, `dangerous:${pattern.source}`),
            category: "security",
            severity,
            title: `Dangerous pattern: ${matched} in ${node.name}`,
            description: `Potentially dangerous API call "${matched}" found in ${node.path}. This can lead to XSS, code injection, or other security vulnerabilities.`,
            evidence: [{
              description: `Pattern "${pattern.source}" matched: "${matched}"`,
              filePath: node.path,
              line: typeof meta.line === "number" ? meta.line : node.loc[0],
            }],
            affectedNodes: [node.id],
            suggestion: `Replace "${matched}" with a safer alternative. Use textContent instead of innerHTML, avoid eval(), and sanitize user input.`,
            ruleId: "security/dangerous-pattern",
          });
        }
      }
    }
  }

  return findings;
}

function detectHardcodedSecrets(
  graph: ApplicationGraph,
  cfg: SecurityConfig,
): Finding[] {
  const findings: Finding[] = [];
  const patterns = cfg.secretPatterns ?? [];

  for (const node of graph.nodes.values()) {
    if (node.kind === "test") continue; // skip test files

    const meta = node.meta as Record<string, unknown>;
    const codeSnippets: string[] = [];

    if (typeof meta.code === "string") codeSnippets.push(meta.code);
    if (typeof meta.body === "string") codeSnippets.push(meta.body);

    // Also check the node name for obvious secrets
    codeSnippets.push(node.name);

    for (const pattern of patterns) {
      for (const snippet of codeSnippets) {
        if (pattern.test(snippet)) {
          // Don't include the actual secret in evidence
          const severity: Severity = pattern.source.includes("ghp_") || pattern.source.includes("sk-")
            ? "critical"
            : "high";

          findings.push({
            id: generateId(node.path, `secret:${pattern.source}`),
            category: "security",
            severity,
            title: `Hardcoded secret in ${node.name}`,
            description: `A potential hardcoded secret or credential was detected in ${node.path}. Secrets should be stored in environment variables, not in source code.`,
            evidence: [{
              description: `Secret pattern matched (redacted)`,
              filePath: node.path,
            }],
            affectedNodes: [node.id],
            suggestion: "Move this secret to an environment variable. Use .env files (excluded from VCS) or a secrets manager.",
            ruleId: "security/hardcoded-secret",
          });
          break; // one finding per node per pattern is enough
        }
      }
    }
  }

  return findings;
}

function detectMissingCsrfProtection(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const node of graph.nodes.values()) {
    if (node.kind !== "api") continue;

    const meta = node.meta as Record<string, unknown>;
    const method = String(meta.method ?? "GET").toUpperCase();

    // Only flag mutating methods
    if (method === "GET" || method === "HEAD") continue;

    const hasCsrf = meta.csrfProtection === true || meta.hasCsrf === true;

    if (!hasCsrf) {
      findings.push({
        id: generateId(node.path, `csrf:${node.id}`),
        category: "security",
        severity: "high",
        title: `Missing CSRF protection: ${node.name} (${method})`,
        description: `API route ${node.path} accepts ${method} requests without CSRF protection. This makes it vulnerable to Cross-Site Request Forgery attacks.`,
        evidence: [{
          description: `${method} route without CSRF protection`,
          filePath: node.path,
        }],
        affectedNodes: [node.id],
        suggestion: "Add CSRF token validation for mutating API routes. Use frameworks like csrf-csrf or Next.js built-in CSRF protection.",
        ruleId: "security/missing-csrf",
      });
    }
  }

  return findings;
}

function detectClientSideAuthLogic(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const node of graph.nodes.values()) {
    if (node.kind !== "component" && node.kind !== "page") continue;

    const meta = node.meta as Record<string, unknown>;
    const hasAuthCheck = meta.hasAuthCheck === true;
    const authChecks = Array.isArray(meta.authChecks) ? (meta.authChecks as string[]) : [];

    if (!hasAuthCheck && authChecks.length === 0) continue;

    // Check if auth is also enforced server-side
    const deps = getDependencies(graph, node.id);
    const hasMiddlewareAuth = deps.some((d) => {
      const dMeta = d.meta as Record<string, unknown>;
      return d.kind === "middleware" && (dMeta.authGuard === true || dMeta.hasAuth === true);
    });

    const hasApiAuth = deps.some((d) => {
      const dMeta = d.meta as Record<string, unknown>;
      return d.kind === "api" && (dMeta.authGuard === true || dMeta.hasAuth === true);
    });

    if (!hasMiddlewareAuth && !hasApiAuth) {
      findings.push({
        id: generateId(node.path, `client-auth:${node.id}`),
        category: "security",
        severity: "high",
        title: `Client-side only auth: ${node.name}`,
        description: `${node.path} performs authentication checks in client-side code without corresponding server-side enforcement. Client-side auth can be bypassed.`,
        evidence: [{
          description: "Auth checks found in component, but no server-side auth guard dependency",
          filePath: node.path,
        }],
        affectedNodes: [node.id],
        suggestion: "Add authentication verification in middleware or API routes. Client-side checks are for UX only, not security.",
        ruleId: "security/client-side-auth",
      });
    }
  }

  return findings;
}

function detectNonHttpsApiCalls(
  graph: ApplicationGraph,
  cfg: SecurityConfig,
): Finding[] {
  const findings: Finding[] = [];
  const allowed = cfg.allowedHttpDomains ?? [];

  for (const edge of graph.edges.values()) {
    if (edge.kind !== "fetches") continue;

    const meta = edge.meta as Record<string, unknown>;
    const url = String(meta.url ?? "");

    if (!url.startsWith("http://")) continue;

    // Check if it's an allowed local domain
    const isAllowed = allowed.some((domain) => url.includes(domain));
    if (isAllowed) continue;

    const sourceNode = graph.nodes.get(edge.source);
    if (!sourceNode) continue;

    findings.push({
      id: generateId(sourceNode.path, `http-fetch:${edge.id}`),
      category: "security",
      severity: "high",
      title: `Non-HTTPS API call in ${sourceNode.name}`,
      description: `${sourceNode.path} makes a request to "${url.replace(/\/\/[^/]+@/, "//")}" over HTTP. This exposes data in transit to potential interception.`,
      evidence: [{
        description: `HTTP URL detected: ${url.substring(0, 80)}`,
        filePath: sourceNode.path,
      }],
      affectedNodes: [edge.source],
      suggestion: "Change the URL to use HTTPS. If the API doesn't support HTTPS, consider using a proxy or different service.",
      ruleId: "security/non-https",
    });
  }

  return findings;
}

function detectMissingInputSanitization(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const node of graph.nodes.values()) {
    if (node.kind !== "api") continue;

    const meta = node.meta as Record<string, unknown>;
    const acceptsInput = meta.acceptsBody === true || meta.acceptsQuery === true || meta.acceptsParams === true;
    const hasValidation = meta.hasValidation === true || meta.hasSanitization === true || meta.usesZod === true;

    if (acceptsInput && !hasValidation) {
      const method = String(meta.method ?? "POST").toUpperCase();
      findings.push({
        id: generateId(node.path, `no-sanitize:${node.id}`),
        category: "security",
        severity: "high",
        title: `Missing input validation: ${node.name} (${method})`,
        description: `API route ${node.path} accepts user input but has no detected input validation/sanitization. This can lead to injection attacks, data corruption, or crashes.`,
        evidence: [{
          description: `${method} route accepts input without validation`,
          filePath: node.path,
        }],
        affectedNodes: [node.id],
        suggestion: "Add input validation using a schema library (e.g., zod, yup, joi) and sanitize user input before processing.",
        ruleId: "security/missing-input-validation",
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
