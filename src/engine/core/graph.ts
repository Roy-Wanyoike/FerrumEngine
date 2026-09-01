/**
 * FerrumEngine v2 — Application Graph
 *
 * The foundational data structure. Ferrum scans an application and constructs
 * a living graph of nodes (files, components, functions, routes, etc.) and
 * edges (imports, calls, renders, depends-on, etc.).
 *
 * This graph is the foundation for ALL analysis: architecture, impact,
 * scoring, agent verification — everything queries the graph.
 */

import type {
  FerrumId,
  NodeKind,
  EdgeKind,
  GraphNode,
  GraphEdge,
  ApplicationGraph,
} from "./types";

// ──────────────────────────────────────────────────────────────────────
// ID GENERATION
// ──────────────────────────────────────────────────────────────────────

let _idCounter = 0;

/** Generate a stable, deterministic ID from a file path and symbol name. */
export function generateId(filePath: string, symbol: string): FerrumId {
  // Simple deterministic hash — production can use xxhash/cityhash
  const raw = `${filePath}:${symbol}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const chr = raw.charCodeAt(i);
    hash = ((hash << 5) - hash + chr) | 0;
  }
  // Use the absolute value to avoid negative IDs
  return `n_${Math.abs(hash).toString(36)}`;
}

/** Generate an edge ID from source + target + kind. */
export function generateEdgeId(source: FerrumId, target: FerrumId, kind: EdgeKind): FerrumId {
  return `e_${source}->${target}:${kind}`;
}

/** Generate a sequential ID (for non-deterministic nodes). */
export function sequentialId(): FerrumId {
  return `n_seq_${++_idCounter}`;
}

// ──────────────────────────────────────────────────────────────────────
// GRAPH BUILDER
// ──────────────────────────────────────────────────────────────────────

/** Options for graph construction. */
export interface GraphBuildOptions {
  /** Project root path. */
  rootPath: string;
  /** Source directories to scan (relative to root). */
  srcDirs?: string[];
  /** Glob patterns to exclude. */
  exclude?: string[];
}

/** Create an empty application graph. */
export function createGraph(rootPath: string): ApplicationGraph {
  return {
    rootPath,
    nodes: new Map(),
    edges: new Map(),
    outgoing: new Map(),
    incoming: new Map(),
    byPath: new Map(),
    byKind: new Map(),
    analyzedAt: Date.now(),
    analysisDurationMs: 0,
  };
}

/** Add a node to the graph. */
export function addNode(graph: ApplicationGraph, node: GraphNode): void {
  graph.nodes.set(node.id, node);

  // Index by path
  const pathSet = graph.byPath.get(node.path) ?? new Set();
  pathSet.add(node.id);
  graph.byPath.set(node.path, pathSet);

  // Index by kind
  const kindSet = graph.byKind.get(node.kind) ?? new Set();
  kindSet.add(node.id);
  graph.byKind.set(node.kind, kindSet);

  // Initialize adjacency entries
  if (!graph.outgoing.has(node.id)) graph.outgoing.set(node.id, new Set());
  if (!graph.incoming.has(node.id)) graph.incoming.set(node.id, new Set());
}

/** Add an edge to the graph. */
export function addEdge(graph: ApplicationGraph, edge: GraphEdge): void {
  graph.edges.set(edge.id, edge);

  const outSet = graph.outgoing.get(edge.source) ?? new Set();
  outSet.add(edge.id);
  graph.outgoing.set(edge.source, outSet);

  const inSet = graph.incoming.get(edge.target) ?? new Set();
  inSet.add(edge.id);
  graph.incoming.set(edge.target, inSet);
}

/** Create and add an edge in one call. */
export function connect(
  graph: ApplicationGraph,
  sourceId: FerrumId,
  targetId: FerrumId,
  kind: EdgeKind,
  meta: Record<string, unknown> = {},
  dynamic = false,
): void {
  const edge: GraphEdge = {
    id: generateEdgeId(sourceId, targetId, kind),
    source: sourceId,
    target: targetId,
    kind,
    dynamic,
    meta,
  };
  addEdge(graph, edge);
}

// ──────────────────────────────────────────────────────────────────────
// GRAPH QUERIES
// ──────────────────────────────────────────────────────────────────────

/** Get all nodes of a specific kind. */
export function getNodesByKind(graph: ApplicationGraph, kind: NodeKind): GraphNode[] {
  const ids = graph.byKind.get(kind);
  if (!ids) return [];
  return [...ids].map((id) => graph.nodes.get(id)!).filter(Boolean);
}

/** Get all nodes for a file path. */
export function getNodesByPath(graph: ApplicationGraph, path: string): GraphNode[] {
  const ids = graph.byPath.get(path);
  if (!ids) return [];
  return [...ids].map((id) => graph.nodes.get(id)!).filter(Boolean);
}

/** Get direct dependents (what imports this node). */
export function getDependents(graph: ApplicationGraph, nodeId: FerrumId): GraphNode[] {
  const incomingEdgeIds = graph.incoming.get(nodeId);
  if (!incomingEdgeIds) return [];
  return [...incomingEdgeIds]
    .map((eId) => graph.edges.get(eId)!) 
    .filter(Boolean)
    .map((e) => graph.nodes.get(e.source)!)
    .filter(Boolean);
}

/** Get direct dependencies (what this node imports). */
export function getDependencies(graph: ApplicationGraph, nodeId: FerrumId): GraphNode[] {
  const outgoingEdgeIds = graph.outgoing.get(nodeId);
  if (!outgoingEdgeIds) return [];
  return [...outgoingEdgeIds]
    .map((eId) => graph.edges.get(eId)!)
    .filter(Boolean)
    .map((e) => graph.nodes.get(e.target)!)
    .filter(Boolean);
}

/** Get all transitive dependents (full reverse dependency tree). */
export function getTransitiveDependents(
  graph: ApplicationGraph,
  nodeId: FerrumId,
): GraphNode[] {
  const visited = new Set<FerrumId>();
  const result: GraphNode[] = [];

  function walk(currentId: FerrumId): void {
    if (visited.has(currentId)) return;
    visited.add(currentId);

    for (const dep of getDependents(graph, currentId)) {
      result.push(dep);
      walk(dep.id);
    }
  }

  walk(nodeId);
  return result;
}

/** Get all transitive dependencies (full forward dependency tree). */
export function getTransitiveDependencies(
  graph: ApplicationGraph,
  nodeId: FerrumId,
): GraphNode[] {
  const visited = new Set<FerrumId>();
  const result: GraphNode[] = [];

  function walk(currentId: FerrumId): void {
    if (visited.has(currentId)) return;
    visited.add(currentId);

    for (const dep of getDependencies(graph, currentId)) {
      result.push(dep);
      walk(dep.id);
    }
  }

  walk(nodeId);
  return result;
}

/** Find paths between two nodes (BFS, limited depth). */
export function findPaths(
  graph: ApplicationGraph,
  fromId: FerrumId,
  toId: FerrumId,
  maxDepth = 10,
): GraphNode[][] {
  const paths: GraphNode[][] = [];
  const fromNode = graph.nodes.get(fromId);
  if (!fromNode) return paths;

  function bfs(current: GraphNode[], visited: Set<FerrumId>, depth: number): void {
    if (depth > maxDepth) return;
    const last = current[current.length - 1];
    if (last.id === toId) {
      paths.push([...current]);
      return;
    }

    for (const dep of getDependencies(graph, last.id)) {
      if (!visited.has(dep.id)) {
        visited.add(dep.id);
        bfs([...current, dep], visited, depth + 1);
      }
    }
  }

  bfs([fromNode], new Set([fromId]), 0);
  return paths;
}

/** Detect circular dependencies from a given node. */
export function detectCycles(
  graph: ApplicationGraph,
  startId: FerrumId,
): FerrumId[][] {
  const cycles: FerrumId[][] = [];

  function dfs(
    currentId: FerrumId,
    path: FerrumId[],
    visited: Set<FerrumId>,
    recStack: Set<FerrumId>,
  ): void {
    visited.add(currentId);
    recStack.add(currentId);
    path.push(currentId);

    for (const dep of getDependencies(graph, currentId)) {
      if (!visited.has(dep.id)) {
        dfs(dep.id, path, visited, recStack);
      } else if (recStack.has(dep.id)) {
        // Found a cycle — extract it
        const cycleStart = path.indexOf(dep.id);
        if (cycleStart !== -1) {
          cycles.push([...path.slice(cycleStart), dep.id]);
        }
      }
    }

    path.pop();
    recStack.delete(currentId);
  }

  dfs(startId, [], new Set(), new Set());
  return cycles;
}

/** Get graph statistics. */
export function getGraphStats(graph: ApplicationGraph) {
  const kindCounts: Record<string, number> = {};
  for (const [kind, ids] of graph.byKind) {
    kindCounts[kind] = ids.size;
  }

  const edgeKindCounts: Record<string, number> = {};
  for (const edge of graph.edges.values()) {
    edgeKindCounts[edge.kind] = (edgeKindCounts[edge.kind] ?? 0) + 1;
  }

  return {
    totalNodes: graph.nodes.size,
    totalEdges: graph.edges.size,
    nodesByKind: kindCounts,
    edgesByKind: edgeKindCounts,
    totalFiles: graph.byPath.size,
    analysisDurationMs: graph.analysisDurationMs,
  };
}
