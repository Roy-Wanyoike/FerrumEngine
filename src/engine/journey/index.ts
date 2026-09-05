/**
 * FerrumEngine v2 — User Journey Engine
 *
 * Analyzes user journeys through the application graph to find
 * bottlenecks, dead ends, and unreachable states.
 *
 * The journey engine walks the graph from entry points (routes, pages)
 * following navigation edges to map out real user paths through the app.
 */

import type {
  ApplicationGraph,
  Finding,
  FerrumId,
  NodeKind,
  UserJourney,
  UserJourneyStep,
  JourneyAnalysis,
  RiskLevel,
} from '../core/types';

// ──────────────────────────────────────────────────────────────────────
// JOURNEY TYPES
// ──────────────────────────────────────────────────────────────────────

/** A single step in a traced journey through the graph. */
export interface JourneyStep {
  /** Node ID. */
  nodeId: string;
  /** Node kind. */
  nodeKind: NodeKind;
  /** File path. */
  path: string;
  /** How the user arrived at this step. */
  type: 'entry' | 'navigation' | 'interaction' | 'api-call' | 'redirect' | 'error';
}

/** Complete result of mapping a journey. */
export interface JourneyResult {
  /** The journey definition. */
  journey: UserJourney;
  /** Traced steps through the graph. */
  steps: JourneyStep[];
  /** Analysis of the journey. */
  analysis: JourneyAnalysis;
  /** Issues found along the journey. */
  issues: Finding[];
}

/** Coverage analysis for a set of journeys. */
export interface JourneyCoverage {
  /** Number of pages covered by journeys. */
  covered: number;
  /** Total number of pages in the graph. */
  total: number;
  /** Percentage of coverage (0-100). */
  percentage: number;
  /** Paths of uncovered pages. */
  uncovered: string[];
}

// ──────────────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────────────

let _findingCounter = 0;

function newFindingId(): FerrumId {
  return `jf_${++_findingCounter}` as FerrumId;
}

/** Reset counter (useful for testing). */
export function resetJourneyCounters(): void {
  _findingCounter = 0;
}

/** Get all route/page nodes from the graph. */
function getPageNodes(graph: ApplicationGraph) {
  const pages = graph.byKind.get('page');
  const routes = graph.byKind.get('route');
  const nodeIds = new Set<FerrumId>();
  if (pages) for (const id of pages) nodeIds.add(id);
  if (routes) for (const id of routes) nodeIds.add(id);
  return [...nodeIds].map((id) => graph.nodes.get(id)!).filter(Boolean);
}

/** Get all API nodes from the graph. */
function getApiNodes(graph: ApplicationGraph) {
  const apis = graph.byKind.get('api');
  if (!apis) return [];
  return [...apis].map((id) => graph.nodes.get(id)!).filter(Boolean);
}

/** Get outgoing navigation edges (routes-to, fetches) from a node. */
function getNavigationTargets(graph: ApplicationGraph, nodeId: FerrumId): Array<{ targetId: FerrumId; kind: string }> {
  const outEdges = graph.outgoing.get(nodeId);
  if (!outEdges) return [];
  const targets: Array<{ targetId: FerrumId; kind: string }> = [];
  for (const eId of outEdges) {
    const edge = graph.edges.get(eId);
    if (edge && (edge.kind === 'routes-to' || edge.kind === 'fetches')) {
      targets.push({ targetId: edge.target, kind: edge.kind });
    }
  }
  return targets;
}

// ──────────────────────────────────────────────────────────────────────
// JOURNEY MAPPING
// ──────────────────────────────────────────────────────────────────────

/**
 * Trace a user journey from a given entry point through the graph.
 *
 * Walks navigation edges (routes-to, fetches) from the starting node,
 * building up the full path a user would take.
 */
export function mapJourney(
  graph: ApplicationGraph,
  startPath: string,
  maxDepth = 20,
): JourneyResult {
  // Find the starting node by path
  const startNodeIds = graph.byPath.get(startPath);
  let startNode = startNodeIds
    ? [...startNodeIds].map((id) => graph.nodes.get(id)!).find(Boolean)
    : undefined;

  // Fallback: try finding by route meta
  if (!startNode) {
    for (const node of graph.nodes.values()) {
      if (node.meta.route === startPath) {
        startNode = node;
        break;
      }
    }
  }

  const steps: JourneyStep[] = [];
  const visited = new Set<FerrumId>();
  const routesVisited: string[] = [];

  if (startNode) {
    walkGraph(graph, startNode, steps, visited, routesVisited, 0, maxDepth);
  }

  // Build the journey object
  const journeySteps: UserJourneyStep[] = steps.map((step) => ({
    name: step.path,
    nodeIds: [step.nodeId],
    tested: false, // Will be determined by graph analysis
    hasRecovery: false,
    securitySensitive: false,
  }));

  const journey: UserJourney = {
    name: `Journey from ${startPath}`,
    steps: journeySteps,
    routes: routesVisited,
  };

  // Analyze the journey
  const analysis = analyzeJourney(journey, steps);
  const issues = findJourneyIssues(graph, steps);

  return { journey, steps, analysis, issues };
}

/** Recursively walk the graph following navigation edges. */
function walkGraph(
  graph: ApplicationGraph,
  node: { id: FerrumId; kind: NodeKind; path: string; meta: Record<string, unknown> },
  steps: JourneyStep[],
  visited: Set<FerrumId>,
  routesVisited: string[],
  depth: number,
  maxDepth: number,
  arrivalEdgeKind?: string,
): void {
  if (depth > maxDepth || visited.has(node.id)) return;
  visited.add(node.id);

  const stepType: JourneyStep['type'] =
    depth === 0
      ? 'entry'
      : arrivalEdgeKind === 'fetches'
        ? 'api-call'
        : node.kind === 'api'
          ? 'api-call'
          : 'navigation';

  steps.push({
    nodeId: node.id,
    nodeKind: node.kind,
    path: node.path,
    type: stepType,
  });

  const route = node.meta.route as string | undefined;
  if (route) {
    routesVisited.push(route);
  }

  // Follow navigation edges
  const targets = getNavigationTargets(graph, node.id);
  for (const { targetId, kind } of targets) {
    const target = graph.nodes.get(targetId);
    if (target && !visited.has(target.id)) {
      walkGraph(graph, target, steps, visited, routesVisited, depth + 1, maxDepth, kind);
    }
  }
}

/** Analyze a journey and produce a JourneyAnalysis. */
function analyzeJourney(journey: UserJourney, steps: JourneyStep[]): JourneyAnalysis {
  const totalSteps = steps.length;
  const testedSteps = 0; // Would require test graph integration
  const recoverySteps = 0;
  const securitySensitiveSteps = steps.filter(
    (s) => s.path.includes('auth') || s.path.includes('login') || s.path.includes('payment'),
  ).length;

  const risk: RiskLevel =
    securitySensitiveSteps > 0 && testedSteps === 0
      ? 'high'
      : totalSteps > 10
        ? 'medium'
        : 'low';

  return {
    journey: journey.name,
    totalSteps,
    testedSteps,
    recoverySteps,
    securitySensitiveSteps,
    risk,
    findings: [],
  };
}

/** Find issues along a traced journey. */
function findJourneyIssues(graph: ApplicationGraph, steps: JourneyStep[]): Finding[] {
  const issues: Finding[] = [];

  for (const step of steps) {
    // Check if a step node has no outgoing navigation (dead end in the journey)
    const navTargets = getNavigationTargets(graph, step.nodeId);
    if (
      navTargets.length === 0 &&
      step.type !== 'entry' &&
      step.nodeKind !== 'api' &&
      steps.indexOf(step) < steps.length - 1
    ) {
      // Not the last step but has no navigation — possible broken flow
      // (skip if it IS the last step, that's expected)
    }
  }

  // Check for API calls without caching hints
  for (const step of steps) {
    if (step.nodeKind === 'api') {
      const node = graph.nodes.get(step.nodeId);
      if (node && !node.meta.cacheable) {
        issues.push({
          id: newFindingId(),
          category: 'performance',
          severity: 'low',
          title: `API call without caching: ${step.path}`,
          description: `The journey makes an API call to ${step.path} with no caching configuration.`,
          evidence: [{ description: `Node: ${step.nodeId}`, filePath: step.path }],
          affectedNodes: [step.nodeId],
          suggestion: 'Consider adding cache headers or client-side caching for this API endpoint.',
          ruleId: 'journey:uncached-api',
        });
      }
    }
  }

  return issues;
}

// ──────────────────────────────────────────────────────────────────────
// BOTTLENECK DETECTION
// ──────────────────────────────────────────────────────────────────────

/**
 * Identify slow/heavy steps in a journey.
 *
 * Looks for pages with many imports, API calls without caching,
 * and deeply nested component trees.
 */
export function findJourneyBottlenecks(
  graph: ApplicationGraph,
  journey: UserJourney,
): Finding[] {
  const findings: Finding[] = [];

  for (const step of journey.steps) {
    for (const nodeId of step.nodeIds) {
      const node = graph.nodes.get(nodeId);
      if (!node) continue;

      // Check import count
      const outEdges = graph.outgoing.get(nodeId);
      const importCount = outEdges
        ? [...outEdges].filter((eId) => graph.edges.get(eId)?.kind === 'imports').length
        : 0;

      const IMPORT_THRESHOLD = 15;
      if (importCount > IMPORT_THRESHOLD) {
        findings.push({
          id: newFindingId(),
          category: 'performance',
          severity: importCount > 30 ? 'high' : 'medium',
          title: `Heavy import count on ${node.name}`,
          description: `Step "${step.name}" imports ${importCount} modules, which may cause slow initial load.`,
          evidence: [{ description: `${importCount} imports`, filePath: node.path }],
          affectedNodes: [nodeId],
          suggestion: 'Consider code splitting, lazy loading, or barrel file optimization to reduce the import count.',
          ruleId: 'journey:heavy-imports',
        });
      }

      // Check for API calls without caching
      const fetchEdges = outEdges
        ? [...outEdges].filter((eId) => graph.edges.get(eId)?.kind === 'fetches')
        : [];
      for (const eId of fetchEdges) {
        const edge = graph.edges.get(eId);
        if (edge && !edge.meta.cacheable) {
          const targetNode = graph.nodes.get(edge.target);
          findings.push({
            id: newFindingId(),
            category: 'performance',
            severity: 'medium',
            title: `Uncached API call from ${node.name}`,
            description: `Step "${step.name}" makes an API call to ${targetNode?.path ?? edge.target} without caching.`,
            evidence: [{ description: `Fetches ${edge.target}`, filePath: node.path }],
            affectedNodes: [nodeId, edge.target],
            suggestion: 'Add SWR/React Query caching or implement server-side cache headers.',
            ruleId: 'journey:uncached-fetch',
          });
        }
      }
    }
  }

  return findings;
}

// ──────────────────────────────────────────────────────────────────────
// DEAD END DETECTION
// ──────────────────────────────────────────────────────────────────────

/**
 * Detect pages with no outgoing navigation edges.
 *
 * Users reaching these pages have no way to navigate further
 * (no links to other pages), which may indicate a dead end.
 */
export function detectDeadEnds(graph: ApplicationGraph): Finding[] {
  const findings: Finding[] = [];
  const pageNodes = getPageNodes(graph);

  for (const page of pageNodes) {
    const navTargets = getNavigationTargets(graph, page.id);
    if (navTargets.length === 0) {
      findings.push({
        id: newFindingId(),
        category: 'architecture',
        severity: 'medium',
        title: `Dead end page: ${page.name}`,
        description: `Page "${page.name}" (${page.path}) has no outgoing navigation edges. Users reaching this page cannot navigate further through the app.`,
        evidence: [{ description: 'No routes-to edges found', filePath: page.path }],
        affectedNodes: [page.id],
        suggestion: 'Add navigation links or a redirect to guide users to other parts of the application.',
        ruleId: 'journey:dead-end',
      });
    }
  }

  return findings;
}

// ──────────────────────────────────────────────────────────────────────
// UNREACHABLE PAGE DETECTION
// ──────────────────────────────────────────────────────────────────────

/**
 * Detect pages not reachable from any entry point.
 *
 * Performs BFS from the given entry points and reports any
 * page/route nodes that were never visited.
 */
export function detectUnreachablePages(
  graph: ApplicationGraph,
  entryPoints: string[],
): Finding[] {
  const findings: Finding[] = [];
  const pageNodes = getPageNodes(graph);

  // BFS from entry points
  const visited = new Set<FerrumId>();
  const queue: FerrumId[] = [];

  // Find entry point nodes
  for (const ep of entryPoints) {
    const nodeIds = graph.byPath.get(ep);
    if (nodeIds) {
      for (const id of nodeIds) {
        if (!visited.has(id)) {
          visited.add(id);
          queue.push(id);
        }
      }
    }
    // Also try route meta
    for (const node of graph.nodes.values()) {
      if (node.meta.route === ep && !visited.has(node.id)) {
        visited.add(node.id);
        queue.push(node.id);
      }
    }
  }

  // BFS following all edges
  while (queue.length > 0) {
    const current = queue.shift()!;
    const outEdges = graph.outgoing.get(current);
    if (!outEdges) continue;
    for (const eId of outEdges) {
      const edge = graph.edges.get(eId);
      if (edge && !visited.has(edge.target)) {
        visited.add(edge.target);
        queue.push(edge.target);
      }
    }
  }

  // Find unreachable pages
  for (const page of pageNodes) {
    if (!visited.has(page.id)) {
      findings.push({
        id: newFindingId(),
        category: 'architecture',
        severity: 'medium',
        title: `Unreachable page: ${page.name}`,
        description: `Page "${page.name}" (${page.path}) is not reachable from any defined entry point (${entryPoints.join(', ')}).`,
        evidence: [{ description: 'Not reachable via BFS from entry points', filePath: page.path }],
        affectedNodes: [page.id],
        suggestion: 'Add navigation links to this page, or remove it if it is unused code.',
        ruleId: 'journey:unreachable',
      });
    }
  }

  return findings;
}

// ──────────────────────────────────────────────────────────────────────
// JOURNEY COVERAGE
// ──────────────────────────────────────────────────────────────────────

/**
 * Analyze how much of the application is covered by defined journeys.
 *
 * Traces each journey through the graph and reports which pages
 * are not covered by any journey.
 */
export function analyzeJourneyCoverage(
  graph: ApplicationGraph,
  journeys: UserJourney[],
): JourneyCoverage {
  const pageNodes = getPageNodes(graph);
  const coveredPaths = new Set<string>();

  for (const journey of journeys) {
    for (const step of journey.steps) {
      for (const nodeId of step.nodeIds) {
        coveredPaths.add(nodeId);
      }
    }
    // Also cover routes
    for (const route of journey.routes) {
      coveredPaths.add(route);
    }
  }

  const uncovered: string[] = [];
  for (const page of pageNodes) {
    if (!coveredPaths.has(page.id)) {
      uncovered.push(page.path);
    }
  }

  const total = pageNodes.length;
  const covered = total - uncovered.length;
  const percentage = total > 0 ? Math.round((covered / total) * 100) : 100;

  return { covered, total, percentage, uncovered };
}

// ──────────────────────────────────────────────────────────────────────
// AUTO-SUGGEST JOURNEYS
// ──────────────────────────────────────────────────────────────────────

/**
 * Auto-suggest user journeys based on graph structure.
 *
 * Finds entry points (pages with no incoming routes-to edges)
 * and traces paths through the navigation graph, emitting
 * suggested UserJourney objects.
 */
export function suggestJourneys(graph: ApplicationGraph): UserJourney[] {
  const pageNodes = getPageNodes(graph);
  const apiNodes = getApiNodes(graph);
  const journeys: UserJourney[] = [];

  if (pageNodes.length === 0) return journeys;

  // Find entry points: pages with no incoming routes-to edges
  const hasIncomingRoute = new Set<FerrumId>();
  for (const edge of graph.edges.values()) {
    if (edge.kind === 'routes-to') {
      hasIncomingRoute.add(edge.target);
    }
  }

  const entryPoints = pageNodes.filter((p) => !hasIncomingRoute.has(p.id));

  // If no clear entry points, use all pages as potential starts
  const starts = entryPoints.length > 0 ? entryPoints : [pageNodes[0]!];

  for (const start of starts) {
 const visited = new Set<FerrumId>();
    const steps: UserJourneyStep[] = [];
    const routes: string[] = [];

    // Walk from this entry point
    walkForSuggestion(graph, start, visited, steps, routes, 0, 15);

    if (steps.length > 0) {
      const route = start.meta.route as string | undefined;
      journeys.push({
        name: `Auto: ${route ?? start.path}`,
        steps,
        routes: [...new Set(routes)],
        tags: ['auto-generated'],
      });
    }
  }

  // Also suggest API-heavy journeys
  for (const api of apiNodes) {
    // Find pages that call this API
    const callers: FerrumId[] = [];
    for (const edge of graph.edges.values()) {
      if (edge.kind === 'fetches' && edge.target === api.id) {
        callers.push(edge.source);
      }
    }
    if (callers.length > 0) {
      journeys.push({
        name: `API: ${api.name}`,
        steps: [
          ...callers.map((cId) => {
            const cNode = graph.nodes.get(cId);
            return {
              name: cNode?.name ?? cId,
              nodeIds: [cId],
              tested: false,
              hasRecovery: false,
              securitySensitive: false,
            };
          }),
          {
            name: api.name,
            nodeIds: [api.id],
            apis: [api.path],
            tested: false,
            hasRecovery: false,
            securitySensitive: false,
          },
        ],
        routes: callers
          .map((cId) => graph.nodes.get(cId)?.meta.route as string | undefined)
          .filter((r): r is string => !!r),
        tags: ['auto-generated', 'api-journey'],
      });
    }
  }

  return journeys;
}

/** Walk graph for journey suggestion building. */
function walkForSuggestion(
  graph: ApplicationGraph,
  node: { id: FerrumId; path: string },
  visited: Set<FerrumId>,
  steps: UserJourneyStep[],
  routes: string[],
  depth: number,
  maxDepth: number,
): void {
  if (depth > maxDepth || visited.has(node.id)) return;
  visited.add(node.id);

  steps.push({
    name: node.path,
    nodeIds: [node.id],
    tested: false,
    hasRecovery: false,
    securitySensitive: node.path.includes('auth') || node.path.includes('login'),
  });

  const route = graph.nodes.get(node.id)?.meta.route as string | undefined;
  if (route) routes.push(route);

  const targets = getNavigationTargets(graph, node.id);
  for (const { targetId } of targets) {
    const target = graph.nodes.get(targetId);
    if (target) {
      walkForSuggestion(graph, target, visited, steps, routes, depth + 1, maxDepth);
    }
  }
}
