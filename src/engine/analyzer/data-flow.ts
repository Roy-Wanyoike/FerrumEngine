/**
 * FerrumEngine v2 — Data Flow Intelligence Analyzer
 *
 * Analyzes the application graph for data flow issues:
 *   - Prop drilling (5+ levels)
 *   - Global state mutations
 *   - PII flow to client
 *   - Unvalidated input flow
 *   - State coupling
 */

import type {
  ApplicationGraph,
  Finding,
  AnalysisResult,
  Severity,
  EvidenceType,
} from "../core/types";
import { generateId, getDependencies, getDependents } from "../core/graph";

// ──────────────────────────────────────────────────────────────────────
// ANALYZER CONFIG
// ──────────────────────────────────────────────────────────────────────

export interface DataFlowConfig {
  /** Max prop drilling depth before flagging. */
  maxPropDrillingDepth?: number;
  /** Names of global state stores to check. */
  globalStoreNames?: string[];
  /** PII field name patterns. */
  piiPatterns?: RegExp[];
}

const DEFAULT_CONFIG: DataFlowConfig = {
  maxPropDrillingDepth: 5,
  globalStoreNames: [],
  piiPatterns: [
    /email/i,
    /phone|telephone|mobile/i,
    /ssn|social.?security/i,
    /credit.?card|card.?number/i,
    /password|passwd|pwd/i,
    /address/i,
    /date.?of.?birth|dob/i,
    /passport|national.?id/i,
  ],
};

// ──────────────────────────────────────────────────────────────────────
// MAIN ANALYZER
// ──────────────────────────────────────────────────────────────────────

export function analyzeDataFlow(
  graph: ApplicationGraph,
  config: DataFlowConfig = {},
): AnalysisResult {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const startTime = performance.now();
  const findings: Finding[] = [];

  findings.push(...detectPropDrilling(graph, cfg));
  findings.push(...detectGlobalStateMutations(graph, cfg));
  findings.push(...detectPiiFlowToClient(graph, cfg));
  findings.push(...detectUnvalidatedInputFlow(graph));
  findings.push(...detectStateCoupling(graph));

  const durationMs = performance.now() - startTime;

  return {
    analyzer: "data-flow",
    category: "data-flow",
    durationMs,
    findings,
    summary: summarizeFindings(findings),
  };
}

// ──────────────────────────────────────────────────────────────────────
// DETECTORS
// ──────────────────────────────────────────────────────────────────────

function detectPropDrilling(
  graph: ApplicationGraph,
  cfg: DataFlowConfig,
): Finding[] {
  const findings: Finding[] = [];
  const maxDepth = cfg.maxPropDrillingDepth ?? 5;

  // Find prop chains: component → renders → component → renders → ...
  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "component") continue;
    const meta = node.meta as Record<string, unknown>;
    const propChainDepth = typeof meta.propChainDepth === "number" ? meta.propChainDepth : 0;

    if (propChainDepth >= maxDepth) {
      const severity: Severity = propChainDepth > maxDepth + 3 ? "high" : "medium";
      findings.push({
        id: generateId(node.path, `prop-drill:${nodeId}`),
        category: "data-flow",
        severity,
        title: `Prop drilling: ${node.name} (${propChainDepth} levels)`,
        description: `Component ${node.name} receives props through ${propChainDepth} levels of drilling, exceeding the ${maxDepth}-level threshold. Deep prop drilling makes refactoring painful and data flow hard to trace.`,
        evidence: [{
          description: `${propChainDepth} prop chain levels (threshold: ${maxDepth})`,
          filePath: node.path,
          data: { depth: propChainDepth, threshold: maxDepth },
        }],
        affectedNodes: [nodeId],
        evidenceType: "measured" as EvidenceType,
        confidence: 0.85,
        suggestion: "Replace deep prop drilling with React Context, a state management library, or composition patterns.",
        ruleId: "dataflow/prop-drilling",
      });
    }
  }

  return findings;
}

function detectGlobalStateMutations(
  graph: ApplicationGraph,
  cfg: DataFlowConfig,
): Finding[] {
  const findings: Finding[] = [];
  const storeNames = cfg.globalStoreNames ?? [];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "store") continue;
    const meta = node.meta as Record<string, unknown>;
    const mutators = getDependents(graph, nodeId).filter((d) => {
      const edgeIds = graph.incoming.get(nodeId);
      if (!edgeIds) return false;
      return [...edgeIds].some((eId) => {
        const edge = graph.edges.get(eId);
        return edge?.kind === "writes-state" && edge.source === d.id;
      });
    });

    if (mutators.length >= 10) {
      const severity: Severity = mutators.length >= 20 ? "high" : "medium";
      findings.push({
        id: generateId(node.path, `global-mutation:${nodeId}`),
        category: "data-flow",
        severity,
        title: `Global state mutation hotspot: ${node.name} (${mutators.length} mutators)`,
        description: `Store ${node.name} is mutated by ${mutators.length} different components. Many mutators increase the risk of conflicting updates and make state changes hard to trace.`,
        evidence: [{
          description: `${mutators.length} components mutate this store`,
          filePath: node.path,
          nodeIds: mutators.slice(0, 10).map((m) => m.id),
        }],
        affectedNodes: [nodeId],
        evidenceType: "measured" as EvidenceType,
        confidence: 0.8,
        suggestion: "Reduce the number of mutators by consolidating related mutations, using actions/reducers, or splitting the store into more focused slices.",
        ruleId: "dataflow/global-mutation",
      });
    }
  }

  return findings;
}

function detectPiiFlowToClient(
  graph: ApplicationGraph,
  cfg: DataFlowConfig,
): Finding[] {
  const findings: Finding[] = [];
  const piiPatterns = cfg.piiPatterns ?? [];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "api") continue;
    const meta = node.meta as Record<string, unknown>;
    const responseFields: string[] = Array.isArray(meta.responseFields) ? meta.responseFields as string[] : [];
    const isClientFacing = meta.clientFacing === true || meta.isPublic === true;

    if (!isClientFacing) continue;

    const piiFields = responseFields.filter((field) =>
      piiPatterns.some((p) => p.test(field)),
    );

    if (piiFields.length > 0) {
      findings.push({
        id: generateId(node.path, `pii-flow:${nodeId}`),
        category: "data-flow",
        severity: "critical",
        title: `PII flows to client: ${node.name}`,
        description: `API endpoint ${node.name} exposes personally identifiable information fields to the client: ${piiFields.join(", ")}. This may violate privacy regulations (GDPR, CCPA).`,
        evidence: [{
          description: `PII fields: ${piiFields.join(", ")}`,
          filePath: node.path,
          data: { piiFields },
        }],
        affectedNodes: [nodeId],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.85,
        suggestion: "Remove PII from client-facing API responses, hash/mask sensitive fields, or require explicit user consent for data access.",
        ruleId: "dataflow/pii-to-client",
      });
    }
  }

  return findings;
}

function detectUnvalidatedInputFlow(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "api") continue;
    const meta = node.meta as Record<string, unknown>;
    const hasInput = meta.acceptsBody === true || meta.acceptsParams === true;
    const hasValidation = meta.hasValidation === true || meta.usesZod === true || meta.hasSanitization === true;

    if (hasInput && !hasValidation) {
      // Trace where the input flows
      const deps = getDependencies(graph, nodeId);
      const internalDeps = deps.filter((d) => d.kind === "function" || d.kind === "module");

      findings.push({
        id: generateId(node.path, `unvalidated-flow:${nodeId}`),
        category: "data-flow",
        severity: "high",
        title: `Unvalidated input flow: ${node.name}`,
        description: `API endpoint ${node.name} accepts input without validation. This unvalidated data flows to ${internalDeps.length} internal module(s), potentially causing injection or corruption.`,
        evidence: [{
          description: `Input accepted without validation, flows to ${internalDeps.length} internal modules`,
          filePath: node.path,
          nodeIds: internalDeps.slice(0, 5).map((d) => d.id),
        }],
        affectedNodes: [nodeId, ...internalDeps.slice(0, 5).map((d) => d.id)],
        evidenceType: "detected" as EvidenceType,
        confidence: 0.9,
        suggestion: "Add input validation at the API boundary before data flows to internal modules. Use schema validation (e.g., zod).",
        ruleId: "dataflow/unvalidated-input",
      });
    }
  }

  return findings;
}

function detectStateCoupling(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];

  for (const [nodeId, node] of graph.nodes) {
    if (node.kind !== "store") continue;
    const dependents = getDependents(graph, nodeId);
    // Components that both read and write to the same store
    const coupledComponents: string[] = [];
    for (const dep of dependents) {
      if (dep.kind !== "component") continue;
      const outEdges = graph.outgoing.get(dep.id);
      if (!outEdges) continue;
      const writesToStore = [...outEdges].some((eId) => {
        const edge = graph.edges.get(eId);
        return edge?.kind === "writes-state" && edge.target === nodeId;
      });
      if (writesToStore) coupledComponents.push(dep.name);
    }

    if (coupledComponents.length >= 5) {
      findings.push({
        id: generateId(node.path, `state-coupling:${nodeId}`),
        category: "data-flow",
        severity: "medium",
        title: `State coupling: ${node.name} (${coupledComponents.length} read-write components)`,
        description: `Store ${node.name} is both read and written by ${coupledComponents.length} components, indicating tight state coupling. Changes in one component's writes can unexpectedly affect others.`,
        evidence: [{
          description: `${coupledComponents.length} components both read and write: ${coupledComponents.slice(0, 5).join(", ")}`,
          filePath: node.path,
        }],
        affectedNodes: [nodeId],
        evidenceType: "measured" as EvidenceType,
        confidence: 0.75,
        suggestion: "Decouple components by using derived state, selectors, or splitting the store into independent slices.",
        ruleId: "dataflow/state-coupling",
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
