/**
 * FerrumEngine v2 — Core Types
 *
 * The foundational type system for the Frontend Intelligence & Reliability Engine.
 * These types are framework-agnostic and describe the universal model
 * Ferrum uses to represent, analyze, and reason about software applications.
 */

// ──────────────────────────────────────────────────────────────────────
// APPLICATION GRAPH TYPES
// ──────────────────────────────────────────────────────────────────────

/** Unique identifier for any node in the application graph. */
export type FerrumId = string;

/** Node kinds that can exist in the application graph. */
export type NodeKind =
  | "repository"
  | "application"
  | "service"
  | "module"
  | "package"
  | "file"
  | "function"
  | "class"
  | "component"
  | "route"
  | "api"
  | "hook"
  | "store"
  | "event"
  | "test"
  | "page"
  | "layout"
  | "middleware"
  | "config"
  | "asset"
  | "style"
  | "script"
  | "type"
  | "enum"
  | "interface"
  | "utility";

/** Edge kinds that describe relationships between nodes. */
export type EdgeKind =
  | "imports"
  | "exports"
  | "renders"
  | "contains"
  | "calls"
  | "reads-state"
  | "writes-state"
  | "listens"
  | "emits"
  | "depends-on"
  | "test-of"
  | "extends"
  | "implements"
  | "routes-to"
  | "fetches"
  | "provides"
  | "consumes"
  | "guards"
  | "configures";

/** Severity levels for findings. */
export type Severity = "info" | "low" | "medium" | "high" | "critical";

/** Risk levels for impact analysis. */
export type RiskLevel = "low" | "medium" | "high" | "critical";

/** Analysis categories. */
export type AnalysisCategory =
  | "architecture"
  | "performance"
  | "security"
  | "reliability"
  | "testing"
  | "accessibility"
  | "dependencies"
  | "maintainability"
  | "complexity"
  | "configuration"
  | "api-contracts"
  | "data-flow"
  | "infrastructure"
  | "deployment-risk"
  | "ownership"
  | "compliance"
  | "observability";

// ──────────────────────────────────────────────────────────────────────
// GRAPH NODE
// ──────────────────────────────────────────────────────────────────────

export interface GraphNode {
  /** Unique identifier (stable across analyses). */
  id: FerrumId;
  /** Human-readable name. */
  name: string;
  /** Node type. */
  kind: NodeKind;
  /** File system path (relative to project root). */
  path: string;
  /** Programming language. */
  language: string;
  /** Line range [start, end] within the file. */
  loc: [number, number];
  /** Key-value metadata (framework, export type, etc.). */
  meta: Record<string, unknown>;
  /** Hash of the node's source content (for change detection). */
  contentHash: string;
}

// ──────────────────────────────────────────────────────────────────────
// GRAPH EDGE
// ──────────────────────────────────────────────────────────────────────

export interface GraphEdge {
  /** Unique identifier. */
  id: FerrumId;
  /** Source node ID. */
  source: FerrumId;
  /** Target node ID. */
  target: FerrumId;
  /** Relationship type. */
  kind: EdgeKind;
  /** Whether this is a dynamic (runtime) or static relationship. */
  dynamic: boolean;
  /** Metadata (e.g., import specifiers, call arguments). */
  meta: Record<string, unknown>;
}

// ──────────────────────────────────────────────────────────────────────
// APPLICATION GRAPH
// ──────────────────────────────────────────────────────────────────────

export interface ApplicationGraph {
  /** Project root path. */
  rootPath: string;
  /** All nodes indexed by ID. */
  nodes: Map<FerrumId, GraphNode>;
  /** All edges indexed by ID. */
  edges: Map<FerrumId, GraphEdge>;
  /** Adjacency: source ID → outgoing edge IDs. */
  outgoing: Map<FerrumId, Set<FerrumId>>;
  /** Reverse adjacency: target ID → incoming edge IDs. */
  incoming: Map<FerrumId, Set<FerrumId>>;
  /** Nodes indexed by file path. */
  byPath: Map<string, Set<FerrumId>>;
  /** Nodes indexed by kind. */
  byKind: Map<NodeKind, Set<FerrumId>>;
  /** Analysis timestamp. */
  analyzedAt: number;
  /** Analysis duration in ms. */
  analysisDurationMs: number;
}

// ──────────────────────────────────────────────────────────────────────
// EVIDENCE CLASSIFICATION
// ──────────────────────────────────────────────────────────────────────

/** How a finding's evidence was obtained. */
export type EvidenceType = 'measured' | 'detected' | 'estimated' | 'predicted' | 'ai-suggested';

// ──────────────────────────────────────────────────────────────────────
// FINDINGS & EVIDENCE
// ──────────────────────────────────────────────────────────────────────

/** A single piece of evidence supporting a finding. */
export interface Evidence {
  /** Human-readable description. */
  description: string;
  /** File path. */
  filePath?: string;
  /** Line number. */
  line?: number;
  /** Related node IDs. */
  nodeIds?: FerrumId[];
  /** Raw data (code snippet, metric value, etc.). */
  data?: unknown;
}

/** A finding from any analyzer. */
export interface Finding {
  /** Unique identifier. */
  id: FerrumId;
  /** Analysis category. */
  category: AnalysisCategory;
  /** Severity. */
  severity: Severity;
  /** Human-readable title. */
  title: string;
  /** Detailed description. */
  description: string;
  /** Evidence supporting this finding. */
  evidence: Evidence[];
  /** Affected node IDs. */
  affectedNodes: FerrumId[];
  /** Suggestion for remediation. */
  suggestion?: string;
  /** Rule ID that generated this finding. */
  ruleId?: string;
  /** How the evidence for this finding was obtained. */
  evidenceType?: EvidenceType;
  /** Confidence level 0-1 for this finding. */
  confidence?: number;
}

// ──────────────────────────────────────────────────────────────────────
// ANALYSIS RESULTS
// ──────────────────────────────────────────────────────────────────────

/** Result from a single analyzer. */
export interface AnalysisResult {
  /** Analyzer name. */
  analyzer: string;
  /** Category. */
  category: AnalysisCategory;
  /** Duration in ms. */
  durationMs: number;
  /** Findings. */
  findings: Finding[];
  /** Summary counts. */
  summary: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
}

/** Complete analysis output. */
export interface FullAnalysis {
  /** Project root. */
  rootPath: string;
  /** Application graph. */
  graph: ApplicationGraph;
  /** All analysis results. */
  results: AnalysisResult[];
  /** Reliability scores. */
  scores: ReliabilityScores;
  /** Total analysis duration. */
  totalDurationMs: number;
}

// ──────────────────────────────────────────────────────────────────────
// RELIABILITY SCORING
// ──────────────────────────────────────────────────────────────────────

/** A single dimension score. */
export interface ScoreDimension {
  /** Category name. */
  category: AnalysisCategory;
  /** Score 0-100. */
  score: number;
  /** Grade. */
  grade: "A" | "B" | "C" | "D" | "F";
  /** Evidence items explaining the score. */
  evidence: Evidence[];
  /** Findings that reduced this score. */
  findings: Finding[];
}

/** All reliability scores. */
export interface ReliabilityScores {
  /** Per-dimension scores. */
  dimensions: ScoreDimension[];
  /** Weighted overall score. */
  overall: number;
  /** Overall grade. */
  grade: "A" | "B" | "C" | "D" | "F";
  /** Calculated at. */
  calculatedAt: number;
}

// ──────────────────────────────────────────────────────────────────────
// CHANGE IMPACT
// ──────────────────────────────────────────────────────────────────────

/** Affected area from a change. */
export interface AffectedArea {
  /** Node ID. */
  nodeId: FerrumId;
  /** Node name. */
  name: string;
  /** Node kind. */
  kind: NodeKind;
  /** Path. */
  path: string;
  /** How this node is affected. */
  impact: string;
  /** Distance from the changed node (1 = direct, 2 = indirect, etc.). */
  distance: number;
}

/** Result of a change impact analysis. */
export interface ImpactAnalysis {
  /** Changed file(s). */
  changedFiles: string[];
  /** Overall risk level. */
  risk: RiskLevel;
  /** Affected nodes. */
  affected: AffectedArea[];
  /** Affected routes. */
  affectedRoutes: string[];
  /** Affected tests. */
  affectedTests: string[];
  /** Affected APIs. */
  affectedApis: string[];
  /** Affected user journeys (if mapped). */
  affectedJourneys: string[];
  /** Security boundary crossings. */
  securityImplications: string[];
  /** Estimated performance impact. */
   performanceImpact?: {
    estimatedSizeChange: string;
    affectedBundles: string[];
  };
  /** Recommended verification steps. */
  recommendedVerification: string[];
  /** Summary. */
  summary: string;
}

// ──────────────────────────────────────────────────────────────────────
// AGENT GATEWAY
// ──────────────────────────────────────────────────────────────────────

/** Permission scope for agent operations. */
export type AgentScope =
  | "read"
  | "analyze"
  | "test"
  | "suggest"
  | "modify"
  | "deploy";

/** Agent identity. */
export interface AgentIdentity {
  /** Agent name/ID. */
  id: string;
  /** Agent type (human, ai-assistant, autonomous). */
  type: "human" | "ai-assistant" | "autonomous";
  /** Granted scopes. */
  scopes: AgentScope[];
  /** Optional parent request ID for tracing. */
  parentRequestId?: string;
}

/** Agent request to Ferrum. */
export interface AgentRequest<T = unknown> {
  /** Request ID for tracing. */
  requestId: string;
  /** Agent identity. */
  agent: AgentIdentity;
  /** Operation name. */
  operation: string;
  /** Operation parameters. */
  params: T;
  /** Timestamp. */
  timestamp: number;
}

/** Agent response from Ferrum. */
export interface AgentResponse<T = unknown> {
  /** Matching request ID. */
  requestId: string;
  /** Whether the operation was allowed. */
  allowed: boolean;
  /** Result data (if allowed). */
  data?: T;
  /** Error message (if denied). */
  error?: string;
  /** Risk assessment. */
   risk?: RiskLevel;
  /** Findings from verification. */
  findings?: Finding[];
  /** Processing time. */
  durationMs: number;
}

/** A proposed code change from an agent. */
export interface ProposedChange {
  /** File path. */
  filePath: string;
  /** Original content hash. */
  originalHash: string;
  /** Proposed new content. */
  proposedContent: string;
  /** Change description. */
  description: string;
}

/** Verification result for a proposed change. */
export interface ChangeVerification {
  /** Whether the change is approved. */
  approved: boolean;
  /** Risk level. */
  risk: RiskLevel;
  /** Findings. */
  findings: Finding[];
  /** Impact analysis. */
  impact?: ImpactAnalysis;
  /** Required actions before approval. */
  requiredActions: string[];
}

// ──────────────────────────────────────────────────────────────────────
// CLI
// ──────────────────────────────────────────────────────────────────────

export interface CLIConfig {
  /** Project root (defaults to cwd). */
  root?: string;
  /** Output format. */
  format?: "text" | "json" | "sarif";
  /** Specific analyzers to run (default: all). */
  analyzers?: AnalysisCategory[];
  /** Severity threshold. */
  severity?: Severity;
  /** Output file path. */
  output?: string;
  /** Whether to include evidence. */
  evidence?: boolean;
  /** Configuration file path. */
  config?: string;
}

export interface FerrumConfig {
  /** Project name. */
  name?: string;
  /** Root directory. */
  root?: string;
  /** Source directories to analyze. */
  srcDirs?: string[];
  /** Files/patterns to exclude. */
  exclude?: string[];
  /** Framework detection overrides. */
  framework?: string;
  /** Scoring weights per dimension. */
  scoringWeights?: Partial<Record<AnalysisCategory, number>>;
  /** Policy thresholds. */
  policies?: PolicyThresholds[];
  /** Plugin configurations. */
  plugins?: PluginConfig[];
}

export interface PolicyThresholds {
  category: AnalysisCategory;
  minScore: number;
  action: "warn" | "block";
}

export interface PluginConfig {
  name: string;
  enabled: boolean;
  options?: Record<string, unknown>;
}

// ──────────────────────────────────────────────────────────────────────
// USER JOURNEYS
// ──────────────────────────────────────────────────────────────────────

export interface UserJourney {
  /** Journey name. */
  name: string;
  /** Ordered steps. */
  steps: UserJourneyStep[];
  /** Associated routes. */
  routes: string[];
  /** Tags. */
  tags?: string[];
}

export interface UserJourneyStep {
  /** Step name. */
  name: string;
  /** Associated component/node IDs. */
  nodeIds: FerrumId[];
  /** Associated API endpoints. */
  apis?: string[];
  /** Is this step tested? */
  tested: boolean;
  /** Has failure recovery? */
  hasRecovery: boolean;
  /** Security-sensitive? */
  securitySensitive: boolean;
}

export interface JourneyAnalysis {
  /** Journey name. */
  journey: string;
  /** Total steps. */
  totalSteps: number;
  /** Steps with tests. */
  testedSteps: number;
  /** Steps with recovery. */
  recoverySteps: number;
  /** Steps that are security-sensitive. */
  securitySensitiveSteps: number;
  /** Overall journey risk. */
  risk: RiskLevel;
  /** Findings. */
  findings: Finding[];
}
