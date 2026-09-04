/**
 * FerrumEngine v2 — Graph Serialization
 *
 * Serializes ApplicationGraph to/from plain JSON-serializable objects
 * for caching to disk and cross-session persistence.
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

import type {
  ApplicationGraph,
  AnalysisCategory,
  GraphNode,
  GraphEdge,
  NodeKind,
  EdgeKind,
} from '../core/types';
import { getGraphStats } from '../core/graph';

// ──────────────────────────────────────────────────────────────────────
// SERIALIZED TYPES
// ──────────────────────────────────────────────────────────────────────

export interface SerializedGraph {
  version: string;
  timestamp: number;
  projectPath: string;
  framework: string | null;
  nodes: SerializedNode[];
  edges: SerializedEdge[];
  stats: GraphStats;
}

export interface SerializedNode {
  id: string;
  kind: string;
  name: string;
  path: string;
  language: string;
  loc: [number, number];
  hash: string | null;
  meta: Record<string, unknown>;
  // Ownership & Git metadata
  owner?: string;
  team?: string;
  gitCommit?: string;
  gitAuthor?: string;
  gitBlame?: string;
  lastModified?: number;
}

export interface SerializedEdge {
  id: string;
  source: string;
  target: string;
  kind: string;
  dynamic: boolean;
  meta: Record<string, unknown>;
}

export interface GraphStats {
  totalNodes: number;
  totalEdges: number;
  nodesByKind: Record<string, number>;
  edgesByKind: Record<string, number>;
  totalFiles: number;
  analysisDurationMs: number;
}

// ──────────────────────────────────────────────────────────────────────
// CONSTANTS
// ──────────────────────────────────────────────────────────────────────

const CACHE_VERSION = '2.0.0';
const CACHE_DIR = '.ferrum/cache';
const CACHE_FILE = 'graph.json';
const CACHE_MAX_AGE_MS = 5 * 60 * 1000; // 5 minutes

// ──────────────────────────────────────────────────────────────────────
// SERIALIZATION
// ──────────────────────────────────────────────────────────────────────

/** Detect framework from the graph nodes. */
function detectFramework(graph: ApplicationGraph): string | null {
  for (const node of graph.nodes.values()) {
    const meta = node.meta as Record<string, unknown>;
    if (typeof meta.framework === 'string') return meta.framework;
    if (typeof meta.isNext === 'boolean' && meta.isNext) return 'next';
    if (typeof meta.isReact === 'boolean' && meta.isReact) return 'react';
    if (typeof meta.isVue === 'boolean' && meta.isVue) return 'vue';
  }
  // Fallback: check for known framework-specific paths
  const hasNextRouter = [...graph.nodes.values()].some(
    (n) => n.kind === 'layout' && n.path.includes('app/'),
  );
  if (hasNextRouter) return 'next';
  return null;
}

/**
 * Convert an ApplicationGraph to a plain JSON-serializable object.
 */
export function serializeGraph(
  graph: ApplicationGraph,
  projectPath: string,
): SerializedGraph {
  const nodes: SerializedNode[] = [];
  for (const node of graph.nodes.values()) {
    const sNode: SerializedNode = {
      id: node.id,
      kind: node.kind,
      name: node.name,
      path: node.path,
      language: node.language,
      loc: node.loc,
      hash: node.contentHash,
      meta: node.meta,
    };
    if (node.owner) sNode.owner = node.owner;
    if (node.team) sNode.team = node.team;
    if (node.gitCommit) sNode.gitCommit = node.gitCommit;
    if (node.gitAuthor) sNode.gitAuthor = node.gitAuthor;
    if (node.gitBlame) sNode.gitBlame = node.gitBlame;
    if (node.lastModified) sNode.lastModified = node.lastModified;
    nodes.push(sNode);
  }

  const edges: SerializedEdge[] = [];
  for (const edge of graph.edges.values()) {
    edges.push({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      kind: edge.kind,
      dynamic: edge.dynamic,
      meta: edge.meta,
    });
  }

  return {
    version: CACHE_VERSION,
    timestamp: graph.analyzedAt,
    projectPath,
    framework: detectFramework(graph),
    nodes,
    edges,
    stats: getGraphStats(graph),
  };
}

/**
 * Rebuild an ApplicationGraph from serialized data, reconstructing all indexes.
 */
export function deserializeGraph(data: SerializedGraph): ApplicationGraph {
  const graph: ApplicationGraph = {
    rootPath: data.projectPath,
    nodes: new Map(),
    edges: new Map(),
    outgoing: new Map(),
    incoming: new Map(),
    byPath: new Map(),
    byKind: new Map(),
    analyzedAt: data.timestamp,
    analysisDurationMs: data.stats.analysisDurationMs,
  };

  // Reconstruct nodes and all indexes
  for (const sNode of data.nodes) {
    const node: GraphNode = {
      id: sNode.id,
      kind: sNode.kind as NodeKind,
      name: sNode.name,
      path: sNode.path,
      language: sNode.language,
      loc: sNode.loc,
      meta: sNode.meta,
      contentHash: sNode.hash ?? '',
      owner: sNode.owner,
      team: sNode.team,
      gitCommit: sNode.gitCommit,
      gitAuthor: sNode.gitAuthor,
      gitBlame: sNode.gitBlame,
      lastModified: sNode.lastModified,
    };
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

  // Reconstruct edges and adjacency indexes
  for (const sEdge of data.edges) {
    const edge: GraphEdge = {
      id: sEdge.id,
      source: sEdge.source,
      target: sEdge.target,
      kind: sEdge.kind as EdgeKind,
      dynamic: sEdge.dynamic,
      meta: sEdge.meta,
    };
    graph.edges.set(edge.id, edge);

    const outSet = graph.outgoing.get(edge.source) ?? new Set();
    outSet.add(edge.id);
    graph.outgoing.set(edge.source, outSet);

    const inSet = graph.incoming.get(edge.target) ?? new Set();
    inSet.add(edge.id);
    graph.incoming.set(edge.target, inSet);
  }

  return graph;
}

// ──────────────────────────────────────────────────────────────────────
// CACHE I/O
// ──────────────────────────────────────────────────────────────────────

/** Resolve the default cache file path. */
function resolveCachePath(projectPath: string, cachePath?: string): string {
  if (cachePath) return cachePath;
  return path.join(projectPath, CACHE_DIR, CACHE_FILE);
}

/**
 * Save a graph to the cache directory.
 * Creates the cache directory if it doesn't exist.
 * Returns the path where the graph was saved.
 */
export function saveGraph(
  graph: ApplicationGraph,
  projectPath: string,
  cachePath?: string,
): string {
  const targetPath = resolveCachePath(projectPath, cachePath);
  const serialized = serializeGraph(graph, projectPath);

  // Ensure directory exists
  const dir = path.dirname(targetPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(targetPath, JSON.stringify(serialized, null, 2), 'utf-8');
  return targetPath;
}

/**
 * Load a graph from cache.
 * Returns null if the cache file doesn't exist or is stale (> 5 min old).
 */
export function loadGraph(
  projectPath: string,
  cachePath?: string,
): SerializedGraph | null {
  const targetPath = resolveCachePath(projectPath, cachePath);

  if (!fs.existsSync(targetPath)) return null;

  try {
    const raw = fs.readFileSync(targetPath, 'utf-8');
    const data: SerializedGraph = JSON.parse(raw);

    // Validate basic structure
    if (!data.version || !data.nodes || !data.edges || !data.stats) {
      return null;
    }

    // Check freshness
    const age = Date.now() - data.timestamp;
    if (age > CACHE_MAX_AGE_MS) return null;

    return data;
  } catch {
    return null;
  }
}

/**
 * Check if the cache file exists and is recent (< 5 minutes old).
 */
export function isCacheValid(
  projectPath: string,
  cachePath?: string,
): boolean {
  const targetPath = resolveCachePath(projectPath, cachePath);

  if (!fs.existsSync(targetPath)) return false;

  try {
    const stat = fs.statSync(targetPath);
    const age = Date.now() - stat.mtimeMs;
    return age <= CACHE_MAX_AGE_MS;
  } catch {
    return false;
  }
}

/**
 * Delete the graph cache file if it exists.
 */
export function invalidateCache(
  projectPath: string,
  cachePath?: string,
): void {
  const targetPath = resolveCachePath(projectPath, cachePath);

  if (fs.existsSync(targetPath)) {
    fs.unlinkSync(targetPath);
  }
}
