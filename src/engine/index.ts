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

// Impact engine
export { analyzeImpact, diffGraphs, type ImpactOptions } from './impact/impact';

// Scoring
export { calculateScores, formatScoreReport, scoreToGrade, type ScoringOptions } from './scoring/scoring';

// Agent gateway
export { AgentGateway, type GatewayConfig, type AuditEntry } from './agent/gateway';

// ──────────────────────────────────────────────────────────────────────
// HIGH-LEVEL API
// ──────────────────────────────────────────────────────────────────────

import { buildGraph } from './graph/builder';
import { analyzeArchitecture } from './analyzer/architecture';
import { calculateScores, formatScoreReport } from './scoring/scoring';
import type { ApplicationGraph, FullAnalysis, FerrumConfig } from './core/types';

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

  // Run all analyzers
  const results = [
    analyzeArchitecture(graph),
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
 */
export function doctor(
  rootPath: string,
  config: FerrumConfig = {},
): string {
  const analysis = analyze(rootPath, config);
  return formatScoreReport(analysis.scores);
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
