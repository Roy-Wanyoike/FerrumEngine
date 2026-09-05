/**
 * FerrumEngine v2 — Public API
 *
 * The main entry point for the Ferrum Intelligence Engine.
 * This is the only file consumers should import from 'ferrum-engine'.
 *
 * Usage (Node.js):
 *   import { analyze, analyzeImpact, doctor } from '@/engine';
 *   const report = analyze('/path/to/project');
 *
 * Usage (Agent):
 *   import { AgentGateway } from '@/engine';
 *   const gateway = new AgentGateway();
 *   const response = await gateway.handleRequest(request, graph);
 */

// Core types (re-exported for consumers)
export type {
  FerrumId,
  NodeKind,
  EdgeKind,
  GraphNode,
  GraphEdge,
  ApplicationGraph,
  Evidence,
  Finding,
  AnalysisResult,
  FullAnalysis,
  Severity,
  RiskLevel,
  AnalysisCategory,
  EvidenceType,
  ScoreDimension,
  ReliabilityScores,
  ImpactAnalysis,
  AffectedArea,
  AgentIdentity,
  AgentRequest,
  AgentResponse,
  AgentScope,
  ProposedChange,
  ChangeVerification,
  UserJourney,
  JourneyAnalysis,
  CLIConfig,
  FerrumConfig,
  PolicyThresholds,
} from './core/types';

// Graph operations
export {
  createGraph,
  addNode,
  addEdge,
  connect,
  getNodesByKind,
  getNodesByPath,
  getDependents,
  getDependencies,
  getTransitiveDependents,
  getTransitiveDependencies,
  findPaths,
  detectCycles,
  getGraphStats,
  generateId,
} from './core/graph';

// Graph builder
export { buildGraph, type BuildResult } from './graph/builder';

// Parsers
export {
  parseFile,
  detectFramework,
  contentHash,
  resolveImportPath,
  shouldExclude,
  isSourceFile,
} from './graph/parser';

// Analyzers
export { analyzeArchitecture, type ArchitectureConfig } from './analyzer/architecture';
export { analyzePerformance, type PerformanceConfig } from './analyzer/performance';
export { analyzeSecurity, type SecurityConfig } from './analyzer/security';
export { analyzeReliability, type ReliabilityConfig } from './analyzer/reliability';
export { analyzeTesting, type TestingConfig } from './analyzer/testing';
export { analyzeAccessibility, type AccessibilityConfig } from './analyzer/accessibility';
export { analyzeDependencies, type DependenciesConfig } from './analyzer/dependencies';
export { analyzeMaintainability, type MaintainabilityConfig } from './analyzer/maintainability';
export { analyzeComplexity, type ComplexityConfig } from './analyzer/complexity';
export { analyzeConfiguration, type ConfigurationConfig } from './analyzer/configuration';
export { analyzeApiContracts, type ApiContractsConfig } from './analyzer/api-contracts';
export { analyzeDataFlow, type DataFlowConfig } from './analyzer/data-flow';
export { analyzeInfrastructure, type InfrastructureConfig } from './analyzer/infrastructure';
export { analyzeDeploymentRisk, type DeploymentRiskConfig } from './analyzer/deployment-risk';
export { analyzeOwnership, type OwnershipConfig } from './analyzer/ownership';
export { analyzeCompliance, type ComplianceConfig } from './analyzer/compliance';
export { analyzeObservability, type ObservabilityConfig } from './analyzer/observability';

// Impact engine
export { analyzeImpact, diffGraphs, type ImpactOptions } from './impact/impact';

// Scoring
export { calculateScores, formatScoreReport, scoreToGrade, type ScoringOptions } from './scoring/scoring';

// Agent gateway
export { AgentGateway, type GatewayConfig, type AuditEntry } from './agent/gateway';

// Flight recorder
export {
  startSession,
  recordEvent,
  endSession,
  analyzeSession,
  findErrorChain,
  reconstructNavigationPath,
  buildRenderTimeline,
  detectAnomalies,
  resetCounters as resetFlightCounters,
  type FlightEvent,
  type FlightSession,
  type FlightAnalysis,
  type SessionMetadata,
} from './flight-recorder';

// Journey engine
export {
  mapJourney,
  findJourneyBottlenecks,
  detectDeadEnds,
  detectUnreachablePages,
  analyzeJourneyCoverage,
  suggestJourneys,
  resetJourneyCounters,
  type JourneyStep,
  type JourneyResult,
  type JourneyCoverage,
} from './journey';

// Drift detector
export {
  captureBaseline,
  compareWithBaseline,
  detectStructuralDrift,
  detectRuleDrift,
  defaultLayerRules,
  calculateDriftScore,
  type ArchitectureBaseline,
  type LayerRule,
  type DriftResult,
} from './drift';

// Codebase intelligence
export {
  analyzeCodebase,
  queryIntel,
  inferPurpose,
  inferDomain,
  assessChangeFrequency,
  estimateComplexity,
  assessHealth,
  findCoChangedFiles,
  type CodeIntel,
  type IntelQuery,
} from './intelligence';

// Graph serialization
export {
  serializeGraph,
  deserializeGraph,
  saveGraph,
  loadGraph,
  isCacheValid,
  invalidateCache,
  type SerializedGraph,
  type SerializedNode,
  type SerializedEdge,
} from './graph/serialization';

// Plugin system
export {
  createPluginManager,
  type FerrumPlugin,
  type PluginHook,
  type PluginEventType,
  type PluginContext,
  type CustomAnalyzer,
  type FrameworkAdapter,
  type PluginLogger,
  type PluginManager,
} from './plugin';

// Built-in adapters
export { builtInAdapters } from './plugin/builtins';

// Config loader
export { loadFerrumConfig, loadFerrumConfigAsync } from './plugin/config-loader';

// Application IR (language-independent intermediate representation)
export type {
  IRSymbolKind,
  IRModifier,
  IRReferenceKind,
  IRTypeRef,
  IRLocation,
  IRPointLocation,
  IRLineLocation,
  IRSymbol,
  IRReference,
  IRControlFlow,
  IRDataFlow,
  ApplicationIR,
  IRBuilderConfig,
  IRLanguageAdapter,
  IRQueryResult,
  IRStats,
} from './ir/ir-types';

export {
  IR_VERSION,
  generateSymbolId,
  generateCFId,
  generateIRId,
  fnv1aHash,
  buildIR,
  buildControlFlow,
  mergeIR,
  queryIR,
  computeIRStats,
  getSymbolById,
  getOutgoingReferences,
  getIncomingReferences,
  serializeIR,
  deserializeIR,
  computeIRHash,
  isIRCacheValid,
  serializeIRCompact,
  isTypeScriptAdapterAvailable,
  buildTypeScriptIR,
  typescriptAdapter,
} from './ir';

// Autonomous Verification
export {
  AutonomousVerifier,
} from './verify';

export type {
  VerificationVerdict,
  VerificationRequirement,
  VerificationDiagnostic,
  VerificationResult,
  VerificationConfig,
  SuggestedFix,
} from './verify';

// Doctor Module
export { runDoctor, generateFixSuggestions, applyFixes } from './doctor';

export type {
  DoctorDiagnosis,
  DoctorFixSuggestion,
  DoctorConfig,
  RemediationResult,
} from './doctor';

// Software Time Machine
export type {
  GraphStats as TimeMachineGraphStats,
  TimeSnapshot,
  TemporalQuery,
  TemporalResult,
  Regression as TimeRegression,
  Improvement as TimeImprovement,
  DriftEvent,
  Introduction as FindingIntroduction,
  Resolution as FindingResolution,
  CommitInfo,
  DiffStats,
  DiffFile,
} from './time-machine';

export {
  getCommitRange,
  getCommitInfo,
  getCommitCount,
  getCommitDiff,
  getChangedFiles,
  findLastModification,
  findIntroduction as findFindingIntroduction,
  getFileBlame,
  checkoutCommit,
  getCurrentHead,
  getCurrentBranch,
  resolveRef,
  isGitRepo,
  getRepoRoot,
  captureSnapshot,
  analyzeTimeRange,
  findRegressions as findTimeRegressions,
  findImprovements as findTimeImprovements,
  findIntroductions as findFindingIntroductions,
  findResolutions as findFindingResolutions,
  trackDriftOverTime,
  answerTemporalQuestion,
} from './time-machine';

// ──────────────────────────────────────────────────────────────────────
// HIGH-LEVEL API
// ──────────────────────────────────────────────────────────────────────

import { buildGraph } from './graph/builder';
import { analyzeArchitecture } from './analyzer/architecture';
import { analyzePerformance } from './analyzer/performance';
import { analyzeSecurity } from './analyzer/security';
import { analyzeReliability } from './analyzer/reliability';
import { analyzeTesting } from './analyzer/testing';
import { analyzeAccessibility } from './analyzer/accessibility';
import { analyzeDependencies } from './analyzer/dependencies';
import { analyzeMaintainability } from './analyzer/maintainability';
import { analyzeComplexity } from './analyzer/complexity';
import { analyzeConfiguration } from './analyzer/configuration';
import { analyzeApiContracts } from './analyzer/api-contracts';
import { analyzeDataFlow } from './analyzer/data-flow';
import { analyzeInfrastructure } from './analyzer/infrastructure';
import { analyzeDeploymentRisk } from './analyzer/deployment-risk';
import { analyzeOwnership } from './analyzer/ownership';
import { analyzeCompliance } from './analyzer/compliance';
import { analyzeObservability } from './analyzer/observability';
import { calculateScores, formatScoreReport } from './scoring/scoring';
import type { ApplicationGraph, FullAnalysis, FerrumConfig } from './core/types';
import { runDoctor as runDoctorInternal } from './doctor';

/**
 * Run a full Ferrum analysis on a project.
 *
 * This is the primary API for both the CLI and programmatic usage.
 */
export function analyze(
  rootPath: string,
  config: FerrumConfig = {},
): FullAnalysis {
  const startTime = performance.now();

  // Build the application graph
  const { graph } = buildGraph(rootPath, config);

  // Run all analyzers (17 dimensions)
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

  // Calculate scores
  const scores = calculateScores(graph, results);

  return {
    rootPath,
    graph,
    results,
    scores,
    totalDurationMs: performance.now() - startTime,
  };
}

/**
 * Run `ferrum doctor` — a health check for a project.
 *
 * Returns a human-readable report string.
 * Uses the dedicated Doctor module for full diagnosis.
 */
export function doctor(
  rootPath: string,
  config: FerrumConfig = {},
): string {
  const diagnosis = runDoctorInternal(rootPath, {}, config);
  return formatDoctorReport(diagnosis);
}

/**
 * Format a DoctorDiagnosis into a human-readable report.
 */
function formatDoctorReport(diagnosis: import('./doctor/types').DoctorDiagnosis): string {
  const lines: string[] = [];
  lines.push('');
  lines.push('  FERRUM DOCTOR REPORT');
  lines.push('  ' + '─'.repeat(40));
  lines.push('');
  lines.push(`  Health: ${diagnosis.healthScore}/100 (Grade: ${diagnosis.grade})`);
  lines.push('');

  if (diagnosis.findings.length > 0) {
    lines.push(`  Findings: ${diagnosis.findings.length}`);
    lines.push(`  Fix suggestions: ${diagnosis.fixSuggestions.length}`);

    const autoFixable = diagnosis.fixSuggestions.filter((s) => s.autoFixable).length;
    lines.push(`  Auto-fixable: ${autoFixable}`);
  } else {
    lines.push('  ✓ No issues found. Project is healthy!');
  }

  if (diagnosis.remediation) {
    lines.push('');
    lines.push(`  Fixes applied: ${diagnosis.remediation.applied.length}`);
    lines.push(`  Fixes skipped: ${diagnosis.remediation.skipped.length}`);
    if (diagnosis.remediation.dryRun) {
      lines.push('  (dry-run mode — no files modified)');
    }
  }

  lines.push('');
  lines.push('  ' + '─'.repeat(40));
  lines.push('');
  return lines.join('\n');
}

/**
 * Run a change impact analysis.
 *
 * Returns structured impact data suitable for CI/CD or agent consumption.
 */
export function impact(
  rootPath: string,
  changedFiles: string[],
  config: FerrumConfig = {},
) {
  const { graph } = buildGraph(rootPath, config);
  return analyzeImpact(graph, changedFiles);
}
