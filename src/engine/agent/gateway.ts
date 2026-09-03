/**
 * FerrumEngine v2 — AI Agent Gateway
 *
 * The safety layer between autonomous AI agents and production code.
 * Agents request operations through Ferrum, and Ferrum validates
 * before allowing changes to proceed.
 *
 * Protocol:
 *   1. Agent authenticates (identity + scopes)
 *   2. Agent requests an operation
 *   3. Ferrum validates permissions
 *   4. Ferrum analyzes proposed changes
 *   5. Ferrum returns structured response (allowed/denied + evidence)
 */

import type {
  AgentIdentity,
  AgentRequest,
  AgentResponse,
  AgentScope,
  ProposedChange,
  ChangeVerification,
  ImpactAnalysis,
  ApplicationGraph,
  Finding,
  RiskLevel,
} from "../core/types";
import { analyzeImpact } from "../impact/impact";

// ──────────────────────────────────────────────────────────────────────
// SCOPE PERMISSIONS
// ──────────────────────────────────────────────────────────────────────

/** What each scope allows. */
const SCOPE_OPERATIONS: Record<AgentScope, string[]> = {
  read: ["inspect_project", "inspect_architecture", "inspect_dependencies", "inspect_user_journey", "explain"],
  analyze: ["analyze_change", "analyze_security", "analyze_performance", "analyze_accessibility", "analyze_reliability"],
  test: ["run_tests", "detect_regressions"],
  suggest: ["suggest_refactor", "generate_test_plan"],
  modify: ["apply_safe_change", "prepare_pull_request"],
  deploy: ["deploy"],
};

/** Operations that require specific scopes. */
const OPERATION_REQUIRED_SCOPES: Record<string, AgentScope[]> = {
  inspect_project: ["read"],
  inspect_architecture: ["read"],
  inspect_dependencies: ["read"],
  inspect_user_journey: ["read"],
  explain: ["read"],
  analyze_change: ["analyze"],
  analyze_security: ["analyze"],
  analyze_performance: ["analyze"],
  analyze_accessibility: ["analyze"],
  analyze_reliability: ["analyze"],
  run_tests: ["test"],
  detect_regressions: ["test"],
  suggest_refactor: ["suggest"],
  generate_test_plan: ["suggest"],
  apply_safe_change: ["modify"],
  prepare_pull_request: ["suggest"],
  deploy: ["deploy"],
};

// ──────────────────────────────────────────────────────────────────────
// GATEWAY
// ──────────────────────────────────────────────────────────────────────

export interface GatewayConfig {
  /** Risk level above which changes are auto-blocked. */
  autoBlockThreshold?: RiskLevel;
  /** Maximum files an agent can change in one request. */
  maxFilesPerRequest?: number;
  /** Whether to require human approval for 'modify' scope. */
  requireHumanApproval?: boolean;
  /** Audit log callback. */
  onAudit?: (entry: AuditEntry) => void;
}

export interface AuditEntry {
  timestamp: number;
  agentId: string;
  agentType: string;
  operation: string;
  allowed: boolean;
  risk?: RiskLevel;
  reason?: string;
  durationMs: number;
}

const DEFAULT_CONFIG: GatewayConfig = {
  autoBlockThreshold: "critical",
  maxFilesPerRequest: 20,
  requireHumanApproval: true,
};

/**
 * The Ferrum Agent Gateway.
 *
 * Processes agent requests, validates permissions, runs analysis,
 * and returns structured responses with risk assessments.
 */
export class AgentGateway {
  private config: GatewayConfig;
  private auditLog: AuditEntry[] = [];

  constructor(config: GatewayConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Process an agent request.
   */
  async handleRequest<T = unknown>(
    request: AgentRequest<T>,
    graph?: ApplicationGraph,
  ): Promise<AgentResponse<T>> {
    const startTime = performance.now();

    // 1. Validate permissions
    const permResult = this.validatePermissions(request);
    if (!permResult.allowed) {
      const response = this.deniedResponse(request, permResult.reason!);
      this.audit(request, response, startTime);
      return response;
    }

    // 2. For 'modify' operations, verify proposed changes
    if (request.operation === "apply_safe_change" && graph) {
      const changes = (request.params as { changes: ProposedChange[] }).changes;
      const verification = this.verifyChanges(changes, graph);

      if (!verification.approved) {
        const response: AgentResponse<T> = {
          requestId: request.requestId,
          allowed: false,
          error: `Change blocked: ${verification.findings.map((f) => f.title).join(", ")}`,
          risk: verification.risk,
          findings: verification.findings,
          durationMs: performance.now() - startTime,
        };
        this.audit(request, response, startTime);
        return response;
      }

      // If human approval is required, mark as allowed but pending
      if (this.config.requireHumanApproval) {
        const response: AgentResponse<T> = {
          requestId: request.requestId,
          allowed: true,
          data: { verification, requiresHumanApproval: true } as unknown as T,
          risk: verification.risk,
          findings: verification.findings,
          durationMs: performance.now() - startTime,
        };
        this.audit(request, response, startTime);
        return response;
      }
    }

    // 3. Allow the operation
    const response: AgentResponse<T> = {
      requestId: request.requestId,
      allowed: true,
      durationMs: performance.now() - startTime,
    };
    this.audit(request, response, startTime);
    return response;
  }

  /**
   * Verify a set of proposed code changes.
   */
  verifyChanges(
    changes: ProposedChange[],
    graph: ApplicationGraph,
  ): ChangeVerification {
    const findings: Finding[] = [];
    const allAffected: string[] = [];

    if (changes.length > (this.config.maxFilesPerRequest ?? 20)) {
      findings.push({
        id: `gateway:too-many-files:${changes.length}`,
        category: "architecture",
        severity: "high",
        title: `Agent requests ${changes.length} file changes (max: ${this.config.maxFilesPerRequest ?? 20})`,
        description: "Large change sets increase regression risk and make review difficult.",
        evidence: [{ description: `${changes.length} files requested` }],
        affectedNodes: [],
        ruleId: "gateway/max-files",
      });
    }

    // Run impact analysis for each changed file
    const changedPaths = changes.map((c) => c.filePath);
    const impact = analyzeImpact(graph, changedPaths);
    allAffected.push(...impact.affected.map((a) => a.path));

    if (impact.risk === "critical" || impact.risk === "high") {
      findings.push({
        id: `gateway:high-impact:${changedPaths.join(",")}`,
        category: "architecture",
        severity: impact.risk === "critical" ? "critical" : "high",
        title: `High-impact change: ${impact.affected.length} nodes affected`,
        description: impact.summary,
        evidence: [{ description: impact.summary }],
        affectedNodes: impact.affected.map((a) => a.nodeId),
        ruleId: "gateway/impact-check",
      });
    }

    if (impact.securityImplications.length > 0) {
      findings.push({
        id: `gateway:security-concern`,
        category: "security",
        severity: "high",
        title: "Change affects security-sensitive code",
        description: impact.securityImplications.join("; "),
        evidence: impact.securityImplications.map((s) => ({ description: s })),
        affectedNodes: [],
        ruleId: "gateway/security-check",
      });
    }

    const SEVERITY_ORDER: Record<RiskLevel, number> = { low: 1, medium: 2, high: 3, critical: 4 };
    const threshold = this.config.autoBlockThreshold;
    const autoBlocked = threshold
      ? findings.some((f) =>
          (SEVERITY_ORDER[f.severity as RiskLevel] ?? 0) >= (SEVERITY_ORDER[threshold] ?? 0)
        )
      : false;

    return {
      approved: !autoBlocked && findings.filter((f) => f.severity === "critical" || f.severity === "high").length === 0,
      risk: impact.risk,
      findings,
      impact,
      requiredActions: impact.recommendedVerification,
    };
  }

  /** Get the audit log. */
  getAuditLog(): AuditEntry[] {
    return [...this.auditLog];
  }

  // ── Private methods ────────────────────────────────────────────

  private validatePermissions<T>(
    request: AgentRequest<T>,
  ): { allowed: boolean; reason?: string } {
    const { agent, operation } = request;

    // Check if the operation exists
    const requiredScopes = OPERATION_REQUIRED_SCOPES[operation];
    if (!requiredScopes) {
      return { allowed: false, reason: `Unknown operation: ${operation}` };
    }

    // Check if the agent has the required scope
    const hasScope = requiredScopes.some((s) => agent.scopes.includes(s));
    if (!hasScope) {
      return {
        allowed: false,
        reason: `Operation '${operation}' requires one of these scopes: ${requiredScopes.join(", ")}. Agent has: ${agent.scopes.join(", ")}`,
      };
    }

    // Autonomous agents need explicit modify scope
    if (agent.type === "autonomous" && operation === "apply_safe_change") {
      if (!agent.scopes.includes("modify")) {
        return { allowed: false, reason: "Autonomous agents require explicit 'modify' scope for code changes" };
      }
    }

    return { allowed: true };
  }

  private deniedResponse<T>(
    request: AgentRequest<T>,
    reason: string,
  ): AgentResponse<T> {
    return {
      requestId: request.requestId,
      allowed: false,
      error: reason,
      durationMs: 0,
    };
  }

  private audit<T>(
    request: AgentRequest<T>,
    response: AgentResponse<T>,
    startTime: number,
  ): void {
    const entry: AuditEntry = {
      timestamp: Date.now(),
      agentId: request.agent.id,
      agentType: request.agent.type,
      operation: request.operation,
      allowed: response.allowed,
      risk: response.risk,
      reason: response.error,
      durationMs: performance.now() - startTime,
    };
    this.auditLog.push(entry);
    this.config.onAudit?.(entry);
  }
}
