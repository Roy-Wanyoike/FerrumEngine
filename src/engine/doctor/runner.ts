/**
 * FerrumEngine v2 — Doctor Runner
 *
 * The main entry point for the Doctor module. Orchestrates analysis,
 * fix suggestion generation, and optional remediation.
 */

import type { Finding, AnalysisCategory, FerrumConfig } from '../core/types';
import { buildGraph } from '../graph/builder';
import { analyzeArchitecture } from '../analyzer/architecture';
import { analyzePerformance } from '../analyzer/performance';
import { analyzeSecurity } from '../analyzer/security';
import { analyzeReliability } from '../analyzer/reliability';
import { analyzeTesting } from '../analyzer/testing';
import { analyzeAccessibility } from '../analyzer/accessibility';
import { analyzeDependencies } from '../analyzer/dependencies';
import { analyzeMaintainability } from '../analyzer/maintainability';
import { analyzeComplexity } from '../analyzer/complexity';
import { analyzeConfiguration } from '../analyzer/configuration';
import { analyzeApiContracts } from '../analyzer/api-contracts';
import { analyzeDataFlow } from '../analyzer/data-flow';
import { analyzeInfrastructure } from '../analyzer/infrastructure';
import { analyzeDeploymentRisk } from '../analyzer/deployment-risk';
import { analyzeOwnership } from '../analyzer/ownership';
import { analyzeCompliance } from '../analyzer/compliance';
import { analyzeObservability } from '../analyzer/observability';
import { calculateScores, scoreToGrade } from '../scoring/scoring';
import { generateFixSuggestions } from './suggest';
import { applyFixes } from './remediate';
import type {
  DoctorDiagnosis,
  DoctorConfig,
  RemediationResult,
  HealthGrade,
} from './types';
import { DEFAULT_DOCTOR_CONFIG } from './types';

// ──────────────────────────────────────────────────────────────────────
// SUMMARY GENERATION
// ──────────────────────────────────────────────────────────────────────

/**
 * Generate a human-readable summary of the diagnosis.
 */
function generateSummary(
  healthScore: number,
  grade: HealthGrade,
  findings: Finding[],
  suggestions: import('./types').DoctorFixSuggestion[],
  remediation?: RemediationResult,
): string {
  const lines: string[] = [];

  lines.push(`Health Score: ${healthScore}/100 (Grade: ${grade})`);
  lines.push('');

  // Finding counts by severity
  const critical = findings.filter((f) => f.severity === 'critical').length;
  const high = findings.filter((f) => f.severity === 'high').length;
  const medium = findings.filter((f) => f.severity === 'medium').length;
  const low = findings.filter((f) => f.severity === 'low').length;
  const info = findings.filter((f) => f.severity === 'info').length;

  if (findings.length === 0) {
    lines.push('No issues found. Project is healthy!');
  } else {
    lines.push(`Found ${findings.length} issue(s):`);
    if (critical > 0) lines.push(`  Critical: ${critical}`);
    if (high > 0) lines.push(`  High: ${high}`);
    if (medium > 0) lines.push(`  Medium: ${medium}`);
    if (low > 0) lines.push(`  Low: ${low}`);
    if (info > 0) lines.push(`  Info: ${info}`);
  }

  lines.push('');

  // Fix suggestions
  const autoFixable = suggestions.filter((s) => s.autoFixable).length;
  const safeFixes = suggestions.filter((s) => s.riskLevel === 'safe').length;
  const moderateFixes = suggestions.filter((s) => s.riskLevel === 'moderate').length;
  const riskyFixes = suggestions.filter((s) => s.riskLevel === 'risky').length;

  if (suggestions.length > 0) {
    lines.push(`${suggestions.length} fix suggestion(s) available:`);
    lines.push(`  Auto-fixable: ${autoFixable}`);
    lines.push(`  Safe: ${safeFixes}, Moderate: ${moderateFixes}, Risky: ${riskyFixes}`);
  } else {
    lines.push('No fix suggestions available.');
  }

  // Remediation results
  if (remediation) {
    lines.push('');
    if (remediation.dryRun) {
      lines.push('Dry run mode — no files were modified.');
    }
    lines.push(`  Applied: ${remediation.applied.length} fix(es)`);
    lines.push(`  Skipped: ${remediation.skipped.length} fix(es)`);
    if (remediation.errors.length > 0) {
      lines.push(`  Errors: ${remediation.errors.length}`);
    }
  }

  return lines.join('\n');
}

// ──────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ──────────────────────────────────────────────────────────────────────

/**
 * Run the Doctor — a comprehensive health check for a project.
 *
 * This is the main entry point for the Doctor module. It:
 *   1. Runs a full Ferrum analysis on the project
 *   2. Generates fix suggestions from the findings
 *   3. Optionally applies safe fixes (respecting riskTolerance and dryRun)
 *   4. Returns a structured DoctorDiagnosis
 *
 * @param rootPath - Path to the project root
 * @param config - Doctor configuration (fix, dryRun, riskTolerance, categories)
 * @param ferrumConfig - Optional FerrumConfig for the analysis
 * @returns The complete diagnosis
 */
export function runDoctor(
  rootPath: string,
  config: Partial<DoctorConfig> = {},
  ferrumConfig: FerrumConfig = {},
): DoctorDiagnosis {
  const startTime = performance.now();

  // Merge with defaults
  const fullConfig: DoctorConfig = { ...DEFAULT_DOCTOR_CONFIG, ...config };

  // Step 1: Run full analysis (inline to avoid circular import)
  const { graph } = buildGraph(rootPath, ferrumConfig);
  const results = [
    analyzeArchitecture(graph),
    analyzePerformance(graph),
    analyzeSecurity(graph),
    analyzeReliability(graph),
    analyzeTesting(graph),
    analyzeAccessibility(graph),
    analyzeDependencies(graph),
    analyzeMaintainability(graph),
    analyzeComplexity(graph),
    analyzeConfiguration(graph),
    analyzeApiContracts(graph),
    analyzeDataFlow(graph),
    analyzeInfrastructure(graph),
    analyzeDeploymentRisk(graph),
    analyzeOwnership(graph),
    analyzeCompliance(graph),
    analyzeObservability(graph),
  ];
  const scores = calculateScores(graph, results);
  const overallScore = scores.overall;

  // Collect all findings
  let findings: Finding[] = results.flatMap((r) => r.findings);

  // Filter by categories if specified
  if (fullConfig.categories && fullConfig.categories.length > 0) {
    const categorySet = new Set<AnalysisCategory>(fullConfig.categories);
    findings = findings.filter((f) => categorySet.has(f.category));
  }

  // Step 2: Generate fix suggestions
  const fixSuggestions = generateFixSuggestions(findings);

  // Step 3: Apply fixes if requested
  let remediation: RemediationResult | undefined;
  if (fullConfig.fix) {
    remediation = applyFixes(fixSuggestions, fullConfig);
  }

  // Calculate health score and grade
  const healthScore = overallScore;
  const grade = scoreToGrade(healthScore) as HealthGrade;

  const durationMs = performance.now() - startTime;

  // Generate summary
  const summary = generateSummary(healthScore, grade, findings, fixSuggestions, remediation);

  return {
    healthScore,
    grade,
    findings,
    fixSuggestions,
    summary,
    durationMs,
    remediation,
  };
}
