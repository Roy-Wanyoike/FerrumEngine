/**
 * FerrumEngine v2 — Doctor Module Types
 *
 * The Doctor provides a comprehensive health check and automated
 * remediation system. It diagnoses project issues, suggests fixes
 * categorized by risk level, and can auto-apply safe fixes.
 */

import type { Finding, AnalysisCategory } from '../core/types';
import type { SuggestedFix } from '../verify/types';

// ──────────────────────────────────────────────────────────────────────
// DOCTOR FIX SUGGESTION
// ──────────────────────────────────────────────────────────────────────

/** Risk level of applying a fix. */
export type FixRiskLevel = 'safe' | 'moderate' | 'risky';

/**
 * A fix suggestion from the Doctor, enriched with risk assessment
 * and categorization metadata.
 */
export interface DoctorFixSuggestion {
  /** The finding this fix addresses. */
  finding: Finding;
  /** The suggested fix (from the verification system). */
  fix: SuggestedFix;
  /** Risk level of applying this fix. */
  riskLevel: FixRiskLevel;
  /** Which analysis dimension this belongs to. */
  category: AnalysisCategory;
  /** Whether this fix can be applied automatically. */
  autoFixable: boolean;
}

// ──────────────────────────────────────────────────────────────────────
// DOCTOR CONFIG
// ──────────────────────────────────────────────────────────────────────

/**
 * Configuration for the Doctor module.
 */
export interface DoctorConfig {
  /** Whether to apply fixes (default: false). */
  fix: boolean;
  /** Preview changes without modifying files (default: false). */
  dryRun: boolean;
  /** Maximum risk level of fixes to apply (default: 'safe'). */
  riskTolerance: FixRiskLevel;
  /** Filter findings by analysis category. */
  categories?: AnalysisCategory[];
}

/** Default Doctor configuration. */
export const DEFAULT_DOCTOR_CONFIG: DoctorConfig = {
  fix: false,
  dryRun: false,
  riskTolerance: 'safe',
};

// ──────────────────────────────────────────────────────────────────────
// REMEDIATION RESULT
// ──────────────────────────────────────────────────────────────────────

/**
 * Result of applying fixes via the remediation system.
 */
export interface RemediationResult {
  /** Files that were modified. */
  applied: string[];
  /** Files that were skipped (too risky or not auto-fixable). */
  skipped: string[];
  /** Any errors encountered during remediation. */
  errors: string[];
  /** Whether this was a dry run. */
  dryRun: boolean;
}

// ──────────────────────────────────────────────────────────────────────
// DOCTOR DIAGNOSIS
// ──────────────────────────────────────────────────────────────────────

/** Health grade assigned by the Doctor. */
export type HealthGrade = 'A' | 'B' | 'C' | 'D' | 'F';

/**
 * The full diagnosis result from the Doctor.
 *
 * Contains the health score, grade, all findings, categorized
 * fix suggestions, a human-readable summary, and timing info.
 */
export interface DoctorDiagnosis {
  /** Overall health score (0-100). */
  healthScore: number;
  /** Letter grade based on health score. */
  grade: HealthGrade;
  /** All findings from analysis. */
  findings: Finding[];
  /** Categorized fix suggestions. */
  fixSuggestions: DoctorFixSuggestion[];
  /** Human-readable summary. */
  summary: string;
  /** Duration of the diagnosis in milliseconds. */
  durationMs: number;
  /** Remediation result (if fixes were applied). */
  remediation?: RemediationResult;
}
