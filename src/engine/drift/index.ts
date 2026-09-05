/**
 * FerrumEngine v2 — Architecture Drift Detector
 *
 * Detects when the actual architecture diverges from the intended/documented
 * architecture. Compares the current graph against architectural rules and
 * historical baselines to surface structural changes and layer violations.
 */

import type {
  ApplicationGraph,
  Finding,
  FerrumId,
  Severity,
} from '../core/types';
import { getDependencies } from '../core/graph';

// ──────────────────────────────────────────────────────────────────────
// DRIFT TYPES
// ──────────────────────────────────────────────────────────────────────

/** A named architectural layer with import-direction rules. */
export interface LayerRule {
  /** Layer name (e.g., 'components', 'lib', 'pages'). */
  name: string;
  /** Layers that ARE allowed to import from this layer. */
  allowedImporters: string[];
  /** Layers this layer IS allowed to import from. */
  allowedImports: string[];
}

/** A frozen snapshot of the architecture at a point in time. */
export interface ArchitectureBaseline {
  /** Unique baseline ID. */
  id: string;
  /** When the baseline was captured (unix ms). */
  timestamp: number;
  /** Layer rules in effect at capture time. */
  rules: LayerRule[];
  /** Aggregate statistics of the graph at capture time. */
  stats: {
    nodeCount: number;
    edgeCount: number;
    maxDepth: number;
    avgCoupling: number;
  };
  /** The set of node IDs present at capture time (for diffing). */
  nodeIds: string[];
  /** The set of edge IDs present at capture time (for diffing). */
  edgeIds: string[];
  /** Current rule-violation fingerprints (for tracking resolved/new violations). */
  violationFingerprints: string[];
}

/** Result of comparing the current graph against a baseline. */
export interface DriftResult {
  /** The baseline being compared against. */
  baseline: ArchitectureBaseline;
  /** All drift findings (structural + rule violations). */
  drifts: Finding[];
  /** Summary statistics. */
  summary: {
    totalDrifts: number;
    newViolations: number;
    resolvedViolations: number;
    structuralChanges: {
      nodesAdded: number;
      nodesRemoved: number;
      edgesAdded: number;
      edgesRemoved: number;
    };
    /** 0-100 drift score. 100 = no drift. */
    driftScore: number;
  };
}

// ──────────────────────────────────────────────────────────────────────
// BASELINE CAPTURE
// ──────────────────────────────────────────────────────────────────────

/**
 * Capture a baseline snapshot of the current architecture.
 *
 * Stores node/edge sets, aggregate stats, and any rule violations present
 * so that future comparisons can detect both structural and rule drift.
 */
export function captureBaseline(
  graph: ApplicationGraph,
  rules?: LayerRule[],
): ArchitectureBaseline {
  const activeRules = rules ?? defaultLayerRules('next');
  const nodeIds = [...graph.nodes.keys()];
  const edgeIds = [...graph.edges.keys()];

  const stats = computeGraphStats(graph);

  // Capture current violations as fingerprints for diffing
  const violations = detectRuleDrift(graph, activeRules);
  const violationFingerprints = violations.map((v) => v.id);

  return {
    id: `baseline_${Date.now().toString(36)}`,
    timestamp: Date.now(),
    rules: activeRules,
    stats,
    nodeIds,
    edgeIds,
    violationFingerprints,
  };
}

// ──────────────────────────────────────────────────────────────────────
// DRIFT COMPARISON
// ──────────────────────────────────────────────────────────────────────

/**
 * Compare the current graph against a previously captured baseline.
 *
 * Returns structural changes (added/removed nodes & edges) and rule
 * violation drift (new violations, resolved violations).
 */
export function compareWithBaseline(
  graph: ApplicationGraph,
  baseline: ArchitectureBaseline,
): DriftResult {
  const structural = detectStructuralDrift(graph, baseline);
  const ruleFindings = detectRuleDrift(graph, baseline.rules);

  // Classify rule violations as new vs resolved
  const currentFingerprints = new Set(ruleFindings.map((f) => f.id));
  const baselineFingerprints = new Set(baseline.violationFingerprints);

  const newViolations = ruleFindings.filter((f) => !baselineFingerprints.has(f.id)).length;
  const resolvedViolations = baseline.violationFingerprints.filter(
    (fp) => !currentFingerprints.has(fp),
  ).length;

  // Convert structural changes into findings
  const structuralFindings = structuralChangesToFindings(structural, baseline);

  const allDrifts: Finding[] = [...structuralFindings, ...ruleFindings];

  const driftResult: DriftResult = {
    baseline,
    drifts: allDrifts,
    summary: {
      totalDrifts: allDrifts.length,
      newViolations,
      resolvedViolations,
      structuralChanges: structural,
      driftScore: 0, // computed below
    },
  };

  driftResult.summary.driftScore = calculateDriftScore(driftResult);
  return driftResult;
}

// ──────────────────────────────────────────────────────────────────────
// STRUCTURAL DRIFT DETECTION
// ──────────────────────────────────────────────────────────────────────

/**
 * Detect structural changes between the current graph and a baseline.
 *
 * Compares node IDs and edge IDs to find additions and removals.
 */
export function detectStructuralDrift(
  graph: ApplicationGraph,
  baseline: ArchitectureBaseline,
): DriftResult['summary']['structuralChanges'] {
  const currentNodes = new Set(graph.nodes.keys());
  const baselineNodes = new Set(baseline.nodeIds);

  const nodesAdded = [...currentNodes].filter((id) => !baselineNodes.has(id)).length;
  const nodesRemoved = [...baselineNodes].filter((id) => !currentNodes.has(id)).length;

  const currentEdges = new Set(graph.edges.keys());
  const baselineEdges = new Set(baseline.edgeIds);

  const edgesAdded = [...currentEdges].filter((id) => !baselineEdges.has(id)).length;
  const edgesRemoved = [...baselineEdges].filter((id) => !currentEdges.has(id)).length;

  return { nodesAdded, nodesRemoved, edgesAdded, edgesRemoved };
}

// ──────────────────────────────────────────────────────────────────────
// RULE DRIFT DETECTION
// ──────────────────────────────────────────────────────────────────────

/**
 * Detect layer-rule violations in the current graph.
 *
 * Walks all import edges and checks whether the source node's layer
 * is allowed to import from the target node's layer according to the rules.
 */
export function detectRuleDrift(
  graph: ApplicationGraph,
  rules: LayerRule[],
): Finding[] {
  if (rules.length === 0) return [];

  const findings: Finding[] = [];
  const ruleMap = new Map(rules.map((r) => [r.name, r]));

  for (const edge of graph.edges.values()) {
    if (edge.kind !== 'imports') continue;

    const sourceNode = graph.nodes.get(edge.source);
    const targetNode = graph.nodes.get(edge.target);
    if (!sourceNode || !targetNode) continue;

    const sourceLayer = resolveLayer(sourceNode.path, rules);
    const targetLayer = resolveLayer(targetNode.path, rules);

    if (!sourceLayer || !targetLayer) continue;

    const rule = ruleMap.get(sourceLayer);
    if (!rule) continue;

    const isAllowed = rule.allowedImports.includes(targetLayer);
    if (!isAllowed) {
      findings.push({
        id: `drift:rule:${edge.id}`,
        category: 'architecture',
        severity: 'medium' as Severity,
        title: `Layer violation: ${sourceLayer} → ${targetLayer}`,
        description: `A module in '${sourceLayer}' (${sourceNode.path}) imports from '${targetLayer}' (${targetNode.path}), which violates the architectural layer rules.`,
        evidence: [
          {
            description: `${sourceNode.path} imports ${targetNode.path}`,
            filePath: sourceNode.path,
            nodeIds: [edge.source, edge.target],
          },
        ],
        affectedNodes: [edge.source, edge.target],
        suggestion: `Move the imported module to a shared layer, or update the layer rules if this import is intentional.`,
        ruleId: `drift/layer-${sourceLayer}-imports-${targetLayer}`,
      });
    }
  }

  return findings;
}

// ──────────────────────────────────────────────────────────────────────
// DEFAULT LAYER RULES
// ──────────────────────────────────────────────────────────────────────

/**
 * Provide default layer rules for common frameworks.
 *
 * @param framework - One of 'next', 'react', 'vue', 'svelte', or 'generic'.
 */
export function defaultLayerRules(framework: string): LayerRule[] {
  switch (framework) {
    case 'next':
      return [
        {
          name: 'pages',
          allowedImporters: [],
          allowedImports: ['components', 'lib', 'hooks', 'utils', 'styles', 'types'],
        },
        {
          name: 'components',
          allowedImporters: ['pages', 'components', 'layouts'],
          allowedImports: ['lib', 'hooks', 'utils', 'styles', 'types', 'components'],
        },
        {
          name: 'hooks',
          allowedImporters: ['pages', 'components', 'hooks'],
          allowedImports: ['lib', 'utils', 'types', 'hooks'],
        },
        {
          name: 'lib',
          allowedImporters: ['pages', 'components', 'hooks', 'api'],
          allowedImports: ['utils', 'types', 'lib'],
        },
        {
          name: 'api',
          allowedImporters: [],
          allowedImports: ['lib', 'utils', 'types'],
        },
        {
          name: 'utils',
          allowedImporters: ['pages', 'components', 'hooks', 'lib', 'api', 'utils'],
          allowedImports: ['utils', 'types'],
        },
        {
          name: 'styles',
          allowedImporters: ['pages', 'components', 'layouts'],
          allowedImports: ['styles'],
        },
        {
          name: 'types',
          allowedImporters: ['pages', 'components', 'hooks', 'lib', 'api', 'utils'],
          allowedImports: ['types'],
        },
        {
          name: 'layouts',
          allowedImporters: ['pages'],
          allowedImports: ['components', 'lib', 'hooks', 'utils', 'styles', 'types'],
        },
      ];

    case 'react':
      return [
        {
          name: 'components',
          allowedImporters: ['pages', 'components', 'layouts'],
          allowedImports: ['hooks', 'lib', 'utils', 'types', 'styles', 'components'],
        },
        {
          name: 'pages',
          allowedImporters: [],
          allowedImports: ['components', 'hooks', 'lib', 'utils', 'types'],
        },
        {
          name: 'hooks',
          allowedImporters: ['components', 'pages', 'hooks'],
          allowedImports: ['lib', 'utils', 'types', 'hooks'],
        },
        {
          name: 'lib',
          allowedImporters: ['components', 'pages', 'hooks'],
          allowedImports: ['utils', 'types', 'lib'],
        },
        {
          name: 'utils',
          allowedImporters: ['components', 'pages', 'hooks', 'lib'],
          allowedImports: ['utils', 'types'],
        },
        {
          name: 'types',
          allowedImporters: ['components', 'pages', 'hooks', 'lib', 'utils'],
          allowedImports: ['types'],
        },
      ];

    case 'vue':
      return [
        {
          name: 'views',
          allowedImporters: [],
          allowedImports: ['components', 'composables', 'lib', 'utils', 'types'],
        },
        {
          name: 'components',
          allowedImporters: ['views', 'components', 'layouts'],
          allowedImports: ['composables', 'lib', 'utils', 'types', 'styles', 'components'],
        },
        {
          name: 'composables',
          allowedImporters: ['views', 'components', 'composables'],
          allowedImports: ['lib', 'utils', 'types', 'composables'],
        },
        {
          name: 'lib',
          allowedImporters: ['views', 'components', 'composables', 'stores'],
          allowedImports: ['utils', 'types', 'lib'],
        },
        {
          name: 'stores',
          allowedImporters: ['views', 'components', 'composables'],
          allowedImports: ['lib', 'utils', 'types'],
        },
        {
          name: 'utils',
          allowedImporters: ['views', 'components', 'composables', 'lib', 'stores'],
          allowedImports: ['utils', 'types'],
        },
        {
          name: 'types',
          allowedImporters: ['views', 'components', 'composables', 'lib', 'stores', 'utils'],
          allowedImports: ['types'],
        },
      ];

    case 'svelte':
      return [
        {
          name: 'routes',
          allowedImporters: [],
          allowedImports: ['components', 'lib', 'utils', 'types', 'stores'],
        },
        {
          name: 'components',
          allowedImporters: ['routes', 'components', 'layouts'],
          allowedImports: ['lib', 'utils', 'types', 'styles', 'stores', 'components'],
        },
        {
          name: 'lib',
          allowedImporters: ['routes', 'components', 'stores'],
          allowedImports: ['utils', 'types', 'lib'],
        },
        {
          name: 'stores',
          allowedImporters: ['routes', 'components'],
          allowedImports: ['lib', 'utils', 'types'],
        },
        {
          name: 'utils',
          allowedImporters: ['routes', 'components', 'lib', 'stores'],
          allowedImports: ['utils', 'types'],
        },
        {
          name: 'types',
          allowedImporters: ['routes', 'components', 'lib', 'stores', 'utils'],
          allowedImports: ['types'],
        },
      ];

    default:
      // Generic: no layer restrictions
      return [
        {
          name: 'src',
          allowedImporters: [],
          allowedImports: ['src', 'lib', 'utils', 'types'],
        },
        {
          name: 'lib',
          allowedImporters: ['src'],
          allowedImports: ['utils', 'types', 'lib'],
        },
        {
          name: 'utils',
          allowedImporters: ['src', 'lib'],
          allowedImports: ['utils', 'types'],
        },
        {
          name: 'types',
          allowedImporters: ['src', 'lib', 'utils'],
          allowedImports: ['types'],
        },
      ];
  }
}

// ──────────────────────────────────────────────────────────────────────
// DRIFT SCORE CALCULATION
// ──────────────────────────────────────────────────────────────────────

/**
 * Calculate a drift score from 0 to 100.
 *
 * 100 = no drift at all.
 * 0  = maximum possible drift.
 *
 * Scoring formula:
 *   - Start at 100
 *   - Structural changes: -0.5 per node change, -0.2 per edge change
 *   - Rule violations: -5 per new violation
 *   - Floor at 0
 */
export function calculateDriftScore(driftResult: DriftResult): number {
  const { summary } = driftResult;

  let score = 100;

  // Structural changes
  const totalNodeChanges = summary.structuralChanges.nodesAdded + summary.structuralChanges.nodesRemoved;
  const totalEdgeChanges = summary.structuralChanges.edgesAdded + summary.structuralChanges.edgesRemoved;

  score -= totalNodeChanges * 0.5;
  score -= totalEdgeChanges * 0.2;

  // Rule violations (only count new ones — existing violations don't add penalty)
  score -= summary.newViolations * 5;

  // Bonus: resolved violations improve the score slightly
  score += Math.min(summary.resolvedViolations * 2, 10);

  return Math.max(0, Math.min(100, Math.floor(score)));
}

// ──────────────────────────────────────────────────────────────────────
// INTERNAL HELPERS
// ──────────────────────────────────────────────────────────────────────

/** Compute aggregate statistics for a graph. */
function computeGraphStats(graph: ApplicationGraph): ArchitectureBaseline['stats'] {
  const nodeCount = graph.nodes.size;
  const edgeCount = graph.edges.size;

  // Compute max depth via BFS from root-like nodes (nodes with no incoming edges)
  let maxDepth = 0;
  const visited = new Set<FerrumId>();
  const queue: Array<{ id: FerrumId; depth: number }> = [];

  // Seed with nodes that have no incoming import edges
  for (const [id] of graph.nodes) {
    const incomingEdges = graph.incoming.get(id);
    const hasIncomingImport = incomingEdges
      ? [...incomingEdges].some((eId) => graph.edges.get(eId)?.kind === 'imports')
      : false;
    if (!hasIncomingImport) {
      queue.push({ id, depth: 1 });
      visited.add(id);
    }
  }

  while (queue.length > 0) {
    const { id, depth } = queue.shift()!;
    if (depth > maxDepth) maxDepth = depth;

    const outEdges = graph.outgoing.get(id);
    if (outEdges) {
      for (const eId of outEdges) {
        const edge = graph.edges.get(eId);
        if (!edge || edge.kind !== 'imports') continue;
        if (!visited.has(edge.target)) {
          visited.add(edge.target);
          queue.push({ id: edge.target, depth: depth + 1 });
        }
      }
    }
  }

  // Average coupling = average number of dependents per node
  let totalDependents = 0;
  for (const [, node] of graph.nodes) {
    totalDependents += graph.incoming.get(node.id)?.size ?? 0;
  }
  const avgCoupling = nodeCount > 0 ? Math.round((totalDependents / nodeCount) * 100) / 100 : 0;

  return { nodeCount, edgeCount, maxDepth, avgCoupling };
}

/**
 * Resolve a file path to its architectural layer name.
 *
 * Checks the path against each rule's name to find the best match.
 */
function resolveLayer(path: string, rules: LayerRule[]): string | null {
  const normalized = path.replace(/\\/g, '/');
  const segments = normalized.split('/').filter(Boolean);

  // Try to match path segments to layer names
  for (const segment of segments) {
    for (const rule of rules) {
      if (segment === rule.name || segment === `${rule.name}s`) {
        return rule.name;
      }
      // Special mappings for common conventions
      if (rule.name === 'pages' && (segment === 'app' || segment === 'pages')) {
        // For Next.js app/ directory, check if this looks like a page
        if (segment === 'app') return 'pages';
        if (segment === 'pages') return 'pages';
      }
      if (rule.name === 'api' && (segment === 'api' || (segment === 'app' && segments.includes('api')))) {
        // api routes
      }
    }
  }

  // Second pass: check for partial matches and common aliases
  const pathLower = normalized.toLowerCase();
  const aliasMap: Record<string, string[]> = {
    pages: ['app/', 'pages/', 'routes/', 'views/'],
    components: ['components/', 'ui/', 'widgets/'],
    hooks: ['hooks/', 'composables/'],
    lib: ['lib/', 'services/', 'core/'],
    utils: ['utils/', 'helpers/', 'util/'],
    types: ['types/', 'interfaces/', 'models/'],
    styles: ['styles/', 'css/', 'scss/', 'style/'],
    layouts: ['layouts/', 'layout/'],
    stores: ['stores/', 'store/', 'state/'],
    api: ['api/'],
  };

  for (const [layer, patterns] of Object.entries(aliasMap)) {
    // Only suggest layers that exist in the rules
    if (!rules.some((r) => r.name === layer)) continue;
    for (const pattern of patterns) {
      if (pathLower.includes(pattern)) return layer;
    }
  }

  return null;
}

/** Convert structural changes into findings for the drift result. */
function structuralChangesToFindings(
  structural: DriftResult['summary']['structuralChanges'],
  _baseline: ArchitectureBaseline,
): Finding[] {
  const findings: Finding[] = [];

  if (structural.nodesAdded > 0) {
    findings.push({
      id: 'drift:structural:nodes-added',
      category: 'architecture',
      severity: 'info' as Severity,
      title: `${structural.nodesAdded} node(s) added since baseline`,
      description: `The graph has ${structural.nodesAdded} more nodes than the baseline snapshot.`,
      evidence: [{ description: `${structural.nodesAdded} new nodes detected` }],
      affectedNodes: [],
      ruleId: 'drift/nodes-added',
    });
  }

  if (structural.nodesRemoved > 0) {
    findings.push({
      id: 'drift:structural:nodes-removed',
      category: 'architecture',
      severity: structural.nodesRemoved > 5 ? ('medium' as Severity) : ('low' as Severity),
      title: `${structural.nodesRemoved} node(s) removed since baseline`,
      description: `The graph has ${structural.nodesRemoved} fewer nodes than the baseline snapshot. This may indicate deleted files or refactored modules.`,
      evidence: [{ description: `${structural.nodesRemoved} nodes removed` }],
      affectedNodes: [],
      ruleId: 'drift/nodes-removed',
    });
  }

  if (structural.edgesAdded > 0) {
    findings.push({
      id: 'drift:structural:edges-added',
      category: 'architecture',
      severity: 'info' as Severity,
      title: `${structural.edgesAdded} edge(s) added since baseline`,
      description: `New import/dependency edges have been added.`,
      evidence: [{ description: `${structural.edgesAdded} new edges detected` }],
      affectedNodes: [],
      ruleId: 'drift/edges-added',
    });
  }

  if (structural.edgesRemoved > 0) {
    findings.push({
      id: 'drift:structural:edges-removed',
      category: 'architecture',
      severity: 'low' as Severity,
      title: `${structural.edgesRemoved} edge(s) removed since baseline`,
      description: `Some import/dependency edges have been removed. This may indicate decoupling or deleted code.`,
      evidence: [{ description: `${structural.edgesRemoved} edges removed` }],
      affectedNodes: [],
      ruleId: 'drift/edges-removed',
    });
  }

  return findings;
}
