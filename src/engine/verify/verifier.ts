/**
 * FerrumEngine v2 — Autonomous Verifier
 *
 * The core engine of the autonomous verification loop.
 *
 * Flow:
 *   AI writes code → Ferrum analyzes → identifies risks →
 *   AI receives diagnostics → modifies → re-analyzes →
 *   tests/security/arch/perf/reliability → PASS/WARN/BLOCK
 *
 * The AutonomousVerifier checks a FullAnalysis against a set of
 * VerificationRequirements and produces a tri-state verdict:
 *   - PASS:  all requirements satisfied
 *   - WARN:  some requirements not met, but not blocking
 *   - BLOCK: critical requirement(s) failed — code must not ship
 */

import type {
  FullAnalysis,
  Finding,
  AnalysisCategory,
  Severity,
} from '../core/types';
import type {
  VerificationVerdict,
  VerificationRequirement,
  VerificationDiagnostic,
  VerificationResult,
  VerificationConfig,
  SuggestedFix,
} from './types';

// ──────────────────────────────────────────────────────────────────────
// SEVERITY RANKING
// ──────────────────────────────────────────────────────────────────────

const SEVERITY_RANK: Record<Severity, number> = {
  info: 0,
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
};

const PRIORITY_MAP: Record<Severity, SuggestedFix['priority']> = {
  info: 'low',
  low: 'low',
  medium: 'medium',
  high: 'high',
  critical: 'critical',
};

// ──────────────────────────────────────────────────────────────────────
// AUTONOMOUS VERIFIER
// ──────────────────────────────────────────────────────────────────────

export class AutonomousVerifier {
  private readonly requirements: VerificationRequirement[];
  private readonly maxIterations: number;
  private readonly autoBlockOnCritical: boolean;
  private readonly scoreThresholds: Record<string, number>;

  constructor(config: VerificationConfig) {
    this.requirements = config.requirements;
    this.maxIterations = config.maxIterations ?? 5;
    this.autoBlockOnCritical = config.autoBlockOnCritical ?? true;
    this.scoreThresholds = config.scoreThresholds ?? {};
  }

  // ────────────────────────────────────────────────────────────────────
  // ONE-SHOT VERIFICATION
  // ────────────────────────────────────────────────────────────────────

  /**
   * Verify a FullAnalysis against all configured requirements.
   *
   * Returns a VerificationResult with an overall PASS/WARN/BLOCK verdict
   * and per-dimension diagnostics.
   */
  verify(analysis: FullAnalysis, changedFiles?: string[]): VerificationResult {
    const diagnostics: VerificationDiagnostic[] = [];

    // Check auto-block on critical findings first
    const allFindings = analysis.results.flatMap((r) => r.findings);
    const hasCriticalFindings = allFindings.some(
      (f) => f.severity === 'critical',
    );

    // Check each requirement
    for (const requirement of this.requirements) {
      const diagnostic = this.checkRequirement(analysis, requirement);
      diagnostics.push(diagnostic);
    }

    // Auto-block: if any critical findings exist and autoBlockOnCritical is on,
    // upgrade any WARN to BLOCK, and add a synthetic BLOCK diagnostic if all
    // requirements otherwise passed (so overall verdict becomes BLOCK)
    if (this.autoBlockOnCritical && hasCriticalFindings) {
      let anyNonPass = false;
      for (const diag of diagnostics) {
        if (diag.verdict === 'WARN') {
          diag.verdict = 'BLOCK';
          anyNonPass = true;
        } else if (diag.verdict === 'BLOCK') {
          anyNonPass = true;
        }
      }
      // If all requirements passed but we have critical findings, add a
      // synthetic diagnostic so the overall verdict is BLOCK
      if (!anyNonPass) {
        const criticalFindings = allFindings.filter(
          (f) => f.severity === 'critical',
        );
        diagnostics.push({
          dimension: 'auto-block',
          verdict: 'BLOCK',
          findings: criticalFindings,
          suggestedFixes: this.generateFindingFixes('auto-block', criticalFindings),
        });
      }
    }

    // Determine overall verdict
    const verdict = this.computeOverallVerdict(diagnostics);

    // Build summary
    const summary = this.buildSummary(verdict, diagnostics);

    return {
      verdict,
      diagnostics,
      iteration: 0,
      iterationsRemaining: this.maxIterations,
      reAnalysisRequired: verdict === 'BLOCK' && this.maxIterations > 0,
      summary,
      timestamp: Date.now(),
    };
  }

  // ────────────────────────────────────────────────────────────────────
  // ITERATIVE VERIFICATION LOOP
  // ────────────────────────────────────────────────────────────────────

  /**
   * Iteratively verify and re-analyze until PASS or max iterations reached.
   *
   * This is the core of the AI agent workflow:
   *   1. Run initial verification
   *   2. If BLOCK and iterations remain, call reAnalyze() to let AI fix code
   *   3. Re-verify the updated analysis
   *   4. Repeat until PASS or max iterations exhausted
   *
   * @param initialAnalysis - The first FullAnalysis to verify
   * @param reAnalyze - Callback that re-runs analysis after AI modifies code
   * @param changedFiles - Files that were changed (for impact scoping)
   */
  async iterativeVerify(
    initialAnalysis: FullAnalysis,
    reAnalyze: () => Promise<FullAnalysis>,
    changedFiles: string[],
  ): Promise<VerificationResult> {
    let currentAnalysis = initialAnalysis;
    let iteration = 0;
    const maxIterations = this.maxIterations;

    // Initial verification
    let result = this.verify(currentAnalysis, changedFiles);

    // If we already PASS or WARN (non-blocking), return immediately
    if (result.verdict !== 'BLOCK') {
      return result;
    }

    // Iterative loop: BLOCK → reAnalyze → re-verify
    while (
      result.verdict === 'BLOCK' &&
      iteration < maxIterations
    ) {
      iteration++;

      // Call the reAnalyze callback (AI agent modifies code, then re-analyzes)
      currentAnalysis = await reAnalyze();

      // Re-verify with the updated analysis
      result = this.verify(currentAnalysis, changedFiles);

      // Update iteration tracking
      result = {
        ...result,
        iteration,
        iterationsRemaining: maxIterations - iteration,
        reAnalysisRequired:
          result.verdict === 'BLOCK' && iteration < maxIterations,
      };
    }

    return result;
  }

  // ────────────────────────────────────────────────────────────────────
  // REQUIREMENT CHECKING
  // ────────────────────────────────────────────────────────────────────

  /**
   * Check a single requirement against the analysis.
   *
   * Returns a VerificationDiagnostic with:
   * - The verdict for this dimension
   * - Any findings that caused the failure
   * - Suggested fixes the AI agent can apply
   */
  checkRequirement(
    analysis: FullAnalysis,
    requirement: VerificationRequirement,
  ): VerificationDiagnostic {
    const dimension = requirement.dimension;

    // Gather findings for this dimension
    const dimensionFindings = this.getFindingsForDimension(
      analysis,
      dimension,
    );

    // Get score for this dimension
    const score = this.getScoreForDimension(analysis, dimension);

    // Track all failures
    const failedFindings: Finding[] = [];
    const suggestedFixes: SuggestedFix[] = [];
    let verdict: VerificationVerdict = 'PASS';

    // ── Check minScore ──
    const effectiveMinScore =
      requirement.minScore ?? this.scoreThresholds[dimension] ?? undefined;
    if (effectiveMinScore !== undefined && score !== undefined) {
      if (score < effectiveMinScore) {
        verdict = requirement.blocking !== false ? 'BLOCK' : 'WARN';
        // Find the findings that contributed to the low score
        failedFindings.push(...dimensionFindings);
        suggestedFixes.push(
          ...this.generateScoreFixes(dimension, score, effectiveMinScore, dimensionFindings),
        );
      }
    }

    // ── Check maxFindings ──
    if (requirement.maxFindings) {
      const { severity, max } = requirement.maxFindings;
      const findingsAtSeverity = dimensionFindings.filter(
        (f) => f.severity === severity,
      );
      if (findingsAtSeverity.length > max) {
        const failVerdict: VerificationVerdict =
          requirement.blocking !== false ? 'BLOCK' : 'WARN';
        // Escalate: BLOCK takes precedence over WARN
        if (failVerdict === 'BLOCK' || verdict === 'PASS') {
          verdict = failVerdict;
        }
        failedFindings.push(...findingsAtSeverity.slice(max));
        suggestedFixes.push(
          ...this.generateFindingFixes(dimension, findingsAtSeverity.slice(max)),
        );
      }
    }

    // ── Check requiredChecks ──
    if (requirement.requiredChecks) {
      for (const checkId of requirement.requiredChecks) {
        const checkFindings = dimensionFindings.filter(
          (f) => f.ruleId === checkId,
        );
        if (checkFindings.length > 0) {
          const failVerdict: VerificationVerdict =
            requirement.blocking !== false ? 'BLOCK' : 'WARN';
          if (failVerdict === 'BLOCK' || verdict === 'PASS') {
            verdict = failVerdict;
          }
          failedFindings.push(...checkFindings);
          suggestedFixes.push(
            ...this.generateFindingFixes(dimension, checkFindings),
          );
        }
      }
    }

    return {
      dimension,
      verdict,
      score,
      findings: failedFindings,
      suggestedFixes,
    };
  }

  // ────────────────────────────────────────────────────────────────────
  // DIAGNOSTIC FORMATTING
  // ────────────────────────────────────────────────────────────────────

  /**
   * Format diagnostics as a structured string that an AI agent can consume.
   *
   * The output is designed to be:
   * - Machine-parseable (structured sections)
   * - Actionable (includes suggested fixes with file paths)
   * - Prioritized (critical findings first)
   */
  formatDiagnostics(result: VerificationResult): string {
    const lines: string[] = [];

    lines.push('═══════════════════════════════════════════════════');
    lines.push(`FERRUM VERIFICATION — ${result.verdict}`);
    lines.push('═══════════════════════════════════════════════════');
    lines.push('');
    lines.push(`Iteration: ${result.iteration} | Remaining: ${result.iterationsRemaining}`);
    lines.push(`Re-analysis required: ${result.reAnalysisRequired ? 'YES' : 'NO'}`);
    lines.push('');

    for (const diag of result.diagnostics) {
      const icon =
        diag.verdict === 'PASS' ? '✓' :
        diag.verdict === 'WARN' ? '⚠' : '✗';

      lines.push(`── ${icon} ${diag.dimension} ──`);
      lines.push(`   Verdict: ${diag.verdict}`);

      if (diag.score !== undefined) {
        lines.push(`   Score: ${diag.score}/100`);
      }

      if (diag.findings.length > 0) {
        lines.push(`   Findings (${diag.findings.length}):`);
        const sorted = [...diag.findings].sort(
          (a, b) => SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity],
        );
        for (const f of sorted.slice(0, 10)) {
          lines.push(`     • [${f.severity.toUpperCase()}] ${f.title}`);
          if (f.suggestion) {
            lines.push(`       → ${f.suggestion}`);
          }
        }
        if (diag.findings.length > 10) {
          lines.push(`     ... and ${diag.findings.length - 10} more`);
        }
      }

      if (diag.suggestedFixes.length > 0) {
        lines.push(`   Suggested fixes:`);
        const sortedFixes = [...diag.suggestedFixes].sort(
          (a, b) => PRIORITY_RANK[b.priority] - PRIORITY_RANK[a.priority],
        );
        for (const fix of sortedFixes) {
          lines.push(`     [${fix.priority.toUpperCase()}] ${fix.filePath}: ${fix.action}`);
        }
      }

      lines.push('');
    }

    lines.push('───────────────────────────────────────────────────');
    lines.push(result.summary);
    lines.push('───────────────────────────────────────────────────');

    return lines.join('\n');
  }

  // ────────────────────────────────────────────────────────────────────
  // PRIVATE HELPERS
  // ────────────────────────────────────────────────────────────────────

  /**
   * Get all findings for a specific dimension from the analysis.
   */
  private getFindingsForDimension(
    analysis: FullAnalysis,
    dimension: string,
  ): Finding[] {
    return analysis.results
      .filter((r) => r.category === dimension)
      .flatMap((r) => r.findings);
  }

  /**
   * Get the score for a specific dimension from the analysis.
   */
  private getScoreForDimension(
    analysis: FullAnalysis,
    dimension: string,
  ): number | undefined {
    const dimScore = analysis.scores.dimensions.find(
      (d) => d.category === dimension,
    );
    return dimScore?.score;
  }

  /**
   * Compute the overall verdict from per-dimension diagnostics.
   *
   * Rules:
   *   - If any diagnostic is BLOCK → overall BLOCK
   *   - If any diagnostic is WARN (and none BLOCK) → overall WARN
   *   - Otherwise → PASS
   */
  private computeOverallVerdict(
    diagnostics: VerificationDiagnostic[],
  ): VerificationVerdict {
    const hasBlock = diagnostics.some((d) => d.verdict === 'BLOCK');
    const hasWarn = diagnostics.some((d) => d.verdict === 'WARN');

    if (hasBlock) return 'BLOCK';
    if (hasWarn) return 'WARN';
    return 'PASS';
  }

  /**
   * Build a human-readable summary of the verification result.
   */
  private buildSummary(
    verdict: VerificationVerdict,
    diagnostics: VerificationDiagnostic[],
  ): string {
    const passCount = diagnostics.filter((d) => d.verdict === 'PASS').length;
    const warnCount = diagnostics.filter((d) => d.verdict === 'WARN').length;
    const blockCount = diagnostics.filter((d) => d.verdict === 'BLOCK').length;
    const total = diagnostics.length;

    switch (verdict) {
      case 'PASS':
        return `All ${total} verification requirements passed. Code is approved for deployment.`;
      case 'WARN': {
        const warnDims = diagnostics
          .filter((d) => d.verdict === 'WARN')
          .map((d) => d.dimension)
          .join(', ');
        return (
          `Verification completed with warnings: ${warnCount}/${total} requirements flagged ` +
          `(${warnDims}). Review recommended but not blocking.`
        );
      }
      case 'BLOCK': {
        const blockDims = diagnostics
          .filter((d) => d.verdict === 'BLOCK')
          .map((d) => d.dimension)
          .join(', ');
        return (
          `Verification BLOCKED: ${blockCount}/${total} requirements failed ` +
          `(${blockDims}). Code must not be deployed until issues are resolved.`
        );
      }
    }
  }

  /**
   * Generate suggested fixes for a score deficit.
   */
  private generateScoreFixes(
    dimension: string,
    currentScore: number,
    minScore: number,
    findings: Finding[],
  ): SuggestedFix[] {
    const deficit = minScore - currentScore;

    // Sort findings by severity (worst first) to suggest the most impactful fixes
    const sorted = [...findings].sort(
      (a, b) => SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity],
    );

    return sorted.slice(0, Math.min(sorted.length, 5)).map((f) => ({
      filePath: f.evidence[0]?.filePath ?? 'unknown',
      description: `Fix ${f.severity} finding to improve ${dimension} score (current: ${currentScore}, needed: ${minScore}, deficit: ${deficit})`,
      action: f.suggestion ?? `Address: ${f.title}`,
      priority: PRIORITY_MAP[f.severity],
    }));
  }

  /**
   * Generate suggested fixes for specific findings.
   */
  private generateFindingFixes(
    dimension: string,
    findings: Finding[],
  ): SuggestedFix[] {
    return findings.map((f) => ({
      filePath: f.evidence[0]?.filePath ?? 'unknown',
      description: `Fix ${f.severity} finding in ${dimension}: ${f.title}`,
      action: f.suggestion ?? `Resolve: ${f.title}`,
      priority: PRIORITY_MAP[f.severity],
    }));
  }
}

// ──────────────────────────────────────────────────────────────────────
// PRIORITY RANKING (for sorting fixes)
// ──────────────────────────────────────────────────────────────────────

const PRIORITY_RANK: Record<SuggestedFix['priority'], number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};
