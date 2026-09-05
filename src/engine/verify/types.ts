/**
 * FerrumEngine v2 — Autonomous Verification Types
 *
 * The PASS/WARN/BLOCK verdict system that drives the autonomous
 * verification loop. AI writes code → Ferrum analyzes → identifies
 * risks → AI receives diagnostics → modifies → re-analyzes →
 * tests/security/arch/perf/reliability → PASS/WARN/BLOCK
 */

import type { Finding, Severity } from '../core/types';

// ──────────────────────────────────────────────────────────────────────
// VERDICT
// ──────────────────────────────────────────────────────────────────────

/** The tri-state verdict for a verification check. */
export type VerificationVerdict = 'PASS' | 'WARN' | 'BLOCK';

// ──────────────────────────────────────────────────────────────────────
// REQUIREMENTS
// ──────────────────────────────────────────────────────────────────────

/**
 * A single verification requirement that must be satisfied.
 *
 * Requirements define the policy gate: what dimensions to check,
 * minimum scores, maximum allowed findings by severity, and
 * mandatory checks that must all pass.
 */
export interface VerificationRequirement {
  /** The analysis dimension this requirement covers (e.g. 'security', 'architecture'). */
  dimension: string;
  /** Minimum score (0-100) required for this dimension. */
  minScore?: number;
  /** Maximum number of findings allowed per severity level. */
  maxFindings?: { severity: Severity; max: number };
  /** Specific check/rule IDs that must pass (no findings with these ruleIds). */
  requiredChecks?: string[];
  /** If true, failing this requirement triggers a BLOCK. Otherwise just WARN. */
  blocking?: boolean;
}

// ──────────────────────────────────────────────────────────────────────
// DIAGNOSTICS
// ──────────────────────────────────────────────────────────────────────

/**
 * A suggested fix that an AI agent can apply to resolve a finding.
 */
export interface SuggestedFix {
  /** File path to modify. */
  filePath: string;
  /** Human-readable description of the fix. */
  description: string;
  /** The action to take (e.g. "Add input validation", "Replace eval with Function constructor"). */
  action: string;
  /** Priority of this fix. */
  priority: 'critical' | 'high' | 'medium' | 'low';
}

/**
 * Diagnostic output for a single dimension's verification.
 */
export interface VerificationDiagnostic {
  /** The dimension that was checked. */
  dimension: string;
  /** The verdict for this dimension. */
  verdict: VerificationVerdict;
  /** The numeric score (if applicable). */
  score?: number;
  /** Findings that caused the verdict. */
  findings: Finding[];
  /** Suggested fixes an AI agent can apply. */
  suggestedFixes: SuggestedFix[];
}

// ──────────────────────────────────────────────────────────────────────
// VERIFICATION RESULT
// ──────────────────────────────────────────────────────────────────────

/**
 * The complete result of a verification pass.
 */
export interface VerificationResult {
  /** The overall verdict. */
  verdict: VerificationVerdict;
  /** Per-dimension diagnostics. */
  diagnostics: VerificationDiagnostic[];
  /** Current iteration number (0-based for first pass). */
  iteration: number;
  /** How many re-analysis iterations remain. */
  iterationsRemaining: number;
  /** Whether another re-analysis iteration is needed (BLOCK with iterations left). */
  reAnalysisRequired: boolean;
  /** Human-readable summary. */
  summary: string;
  /** Timestamp of this result. */
  timestamp: number;
}

// ──────────────────────────────────────────────────────────────────────
// CONFIGURATION
// ──────────────────────────────────────────────────────────────────────

/**
 * Configuration for the AutonomousVerifier.
 */
export interface VerificationConfig {
  /** The requirements to check against. */
  requirements: VerificationRequirement[];
  /** Maximum number of re-analysis iterations (default: 5). */
  maxIterations?: number;
  /** Automatically BLOCK when any critical-severity finding is present (default: true). */
  autoBlockOnCritical?: boolean;
  /** Per-dimension score thresholds (dimension → minimum score). */
  scoreThresholds?: Record<string, number>;
}
