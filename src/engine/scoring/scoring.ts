/**
 * FerrumEngine v2 — Reliability Scoring Engine
 *
 * Calculates evidence-based reliability scores across 7 dimensions.
 * Every score is traceable to actual findings. No vanity metrics.
 */

import type {
  ApplicationGraph,
  AnalysisResult,
  ReliabilityScores,
  ScoreDimension,
  AnalysisCategory,
  Finding,
  Severity,
} from "../core/types";

// ──────────────────────────────────────────────────────────────────────
// SCORING CONFIG
// ──────────────────────────────────────────────────────────────────────

/** Points deducted per severity level. */
const SEVERITY_PENALTY: Record<Severity, number> = {
  info: 0,
  low: 3,
  medium: 8,
  high: 15,
  critical: 30,
};

/** Weight of each dimension in the overall score (must sum to 1). */
const DEFAULT_WEIGHTS: Record<AnalysisCategory, number> = {
  architecture: 0.08,
  performance: 0.08,
  security: 0.10,
  reliability: 0.08,
  testing: 0.08,
  accessibility: 0.06,
  dependencies: 0.06,
  maintainability: 0.06,
  complexity: 0.06,
  configuration: 0.05,
  "api-contracts": 0.05,
  "data-flow": 0.05,
  infrastructure: 0.04,
  "deployment-risk": 0.04,
  ownership: 0.04,
  compliance: 0.04,
  observability: 0.03,
};

/** Base score for each dimension (before deductions). */
const BASE_SCORE = 100;

// ──────────────────────────────────────────────────────────────────────
// MAIN SCORER
// ──────────────────────────────────────────────────────────────────────

export interface ScoringOptions {
  /** Custom weights per dimension. */
  weights?: Partial<Record<AnalysisCategory, number>>;
  /** Custom base score (for testing). */
  baseScore?: number;
}

/**
 * Calculate reliability scores from analysis results.
 *
 * Every point deduction is backed by a specific finding with evidence.
 */
export function calculateScores(
  graph: ApplicationGraph,
  results: AnalysisResult[],
  options: ScoringOptions = {},
): ReliabilityScores {
  const weights = { ...DEFAULT_WEIGHTS, ...options.weights };
  const base = options.baseScore ?? BASE_SCORE;

  const dimensions: ScoreDimension[] = [];

  for (const category of Object.keys(weights) as AnalysisCategory[]) {
    const categoryResults = results.filter((r) => r.category === category);
    const findings = categoryResults.flatMap((r) => r.findings);

    const dimension = scoreDimension(category, findings, base);
    dimensions.push(dimension);
  }

  // Calculate weighted overall score
  let weightedSum = 0;
  let totalWeight = 0;
  for (const dim of dimensions) {
    const w = weights[dim.category] ?? 0;
    weightedSum += dim.score * w;
    totalWeight += w;
  }
  const overall = totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;

  return {
    dimensions,
    overall,
    grade: scoreToGrade(overall),
    calculatedAt: Date.now(),
  };
}

/**
 * Score a single dimension based on its findings.
 */
function scoreDimension(
  category: AnalysisCategory,
  findings: Finding[],
  base: number,
): ScoreDimension {
  let score = base;

  const evidence = findings.map((f) => ({
    description: `[${f.severity.toUpperCase()}] ${f.title}: ${f.description}`,
    filePath: f.evidence[0]?.filePath,
    line: f.evidence[0]?.line,
    nodeIds: f.affectedNodes,
  }));

  // Deduct points for each finding based on severity
  for (const finding of findings) {
    score -= SEVERITY_PENALTY[finding.severity];
  }

  // Prevent negative scores
  score = Math.max(0, Math.min(100, score));

  return {
    category,
    score,
    grade: scoreToGrade(score),
    evidence,
    findings,
  };
}

/** Convert a numeric score to a letter grade. */
export function scoreToGrade(score: number): "A" | "B" | "C" | "D" | "F" {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 65) return "C";
  if (score >= 50) return "D";
  return "F";
}

// ──────────────────────────────────────────────────────────────────────
// QUICK SCORING HELPERS
// ──────────────────────────────────────────────────────────────────────

/**
 * Get a quick summary of the most impactful findings per category.
 * Useful for the CLI `ferrum doctor` output.
 */
export function getScoreExplanation(dim: ScoreDimension): string[] {
  const lines: string[] = [];

  // Sort findings by severity (critical first)
  const sorted = [...dim.findings].sort(
    (a, b) => SEVERITY_PENALTY[b.severity] - SEVERITY_PENALTY[a.severity],
  );

  for (const f of sorted.slice(0, 5)) {
    const penalty = SEVERITY_PENALTY[f.severity];
    lines.push(`  \u2193 ${penalty} pts  ${f.title}`);
  }

  return lines;
}

/** Format a full score report as text (for CLI output). */
export function formatScoreReport(scores: ReliabilityScores): string {
  const lines: string[] = [];
  lines.push("");
  lines.push("  FERRUM RELIABILITY REPORT");
  lines.push("  " + "─".repeat(40));
  lines.push("");

  // Overall
  const gradeDisplay = `
  Overall: ${scores.overall}/100 (${scores.grade})\n`;
  lines.push(gradeDisplay);
  lines.push("");

  // Per-dimension
  for (const dim of scores.dimensions) {
    const bar = buildScoreBar(dim.score);
    lines.push(`  ${padEnd(dim.category, 16)} ${bar}  ${dim.score}/100 (${dim.grade})`);

    // Show top deductions
    if (dim.findings.length > 0) {
      const explanations = getScoreExplanation(dim);
 for (const exp of explanations.slice(0, 3)) {
        lines.push(exp);
      }
      if (dim.findings.length > 3) {
        lines.push(`  ... and ${dim.findings.length - 3} more`);
      }
      lines.push("");
    }
  }

  lines.push("  " + "─".repeat(40));
  lines.push("");
  return lines.join("\n");
}

function buildScoreBar(score: number): string {
  const filled = Math.round(score / 5);
  return "█".repeat(filled) + "░".repeat(20 - filled);
}

function padEnd(str: string, len: number): string {
  return str.length >= len ? str : str + " ".repeat(len - str.length);
}
