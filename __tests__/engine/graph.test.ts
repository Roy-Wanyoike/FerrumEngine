/**
 * Tests for the Ferrum Application Graph.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  createGraph,
  addNode,
  connect,
  getNodesByKind,
  getNodesByPath,
  getDependents,
  getDependencies,
  getTransitiveDependents,
  getTransitiveDependencies,
  detectCycles,
  getGraphStats,
  generateId,
} from '@/engine/core/graph';
import type { GraphNode, ApplicationGraph } from '@/engine/core/types';

function makeNode(id: string, kind: GraphNode['kind'] = 'file', path: string = id): GraphNode {
  return {
    id,
    name: id,
    kind,
    path,
    language: 'ts',
    loc: [1, 10],
    meta: {},
    contentHash: 'abc',
  };
}

describe('Application Graph', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    graph = createGraph('/test/project');
  });

  it('should create an empty graph', () => {
    expect(graph.nodes.size).toBe(0);
    expect(graph.edges.size).toBe(0);
    expect(graph.rootPath).toBe('/test/project');
  });

  it('should add a node and retrieve by kind', () => {
    const node = makeNode('comp:Button', 'component', 'src/Button.tsx');
    addNode(graph, node);
    expect(graph.nodes.size).toBe(1);
    const components = getNodesByKind(graph, 'component');
    expect(components).toHaveLength(1);
    expect(components[0]!.id).toBe('comp:Button');
  });

  it('should index nodes by path', () => {
    addNode(graph, makeNode('n1', 'file', 'src/app/page.tsx'));
    addNode(graph, makeNode('n2', 'function', 'src/app/page.tsx'));
    const byPath = getNodesByPath(graph, 'src/app/page.tsx');
    expect(byPath).toHaveLength(2);
  });

  it('should connect two nodes with an edge', () => {
    addNode(graph, makeNode('a'));
    addNode(graph, makeNode('b'));
    connect(graph, 'a', 'b', 'imports');
    expect(graph.edges.size).toBe(1);
  });

  it('should return direct dependents', () => {
    addNode(graph, makeNode('util'));
    addNode(graph, makeNode('comp1'));
    addNode(graph, makeNode('comp2'));
    connect(graph, 'comp1', 'util', 'imports');
    connect(graph, 'comp2', 'util', 'imports');
    const deps = getDependents(graph, 'util');
    expect(deps).toHaveLength(2);
  });

  it('should return direct dependencies', () => {
    addNode(graph, makeNode('page'));
    addNode(graph, makeNode('comp'));
    addNode(graph, makeNode('util'));
    connect(graph, 'page', 'comp', 'imports');
    connect(graph, 'page', 'util', 'imports');
    const deps = getDependencies(graph, 'page');
    expect(deps).toHaveLength(2);
  });

  it('should follow transitive dependents', () => {
    addNode(graph, makeNode('util'));
    addNode(graph, makeNode('comp'));
    addNode(graph, makeNode('page'));
    connect(graph, 'comp', 'util', 'imports');
    connect(graph, 'page', 'comp', 'imports');
    const trans = getTransitiveDependents(graph, 'util');
    expect(trans).toHaveLength(2);
  });

  it('should follow transitive dependencies', () => {
    addNode(graph, makeNode('page'));
    addNode(graph, makeNode('comp'));
    addNode(graph, makeNode('util'));
    connect(graph, 'page', 'comp', 'imports');
    connect(graph, 'comp', 'util', 'imports');
    const trans = getTransitiveDependencies(graph, 'page');
    expect(trans).toHaveLength(2);
  });

  it('should detect a direct cycle', () => {
    addNode(graph, makeNode('a'));
    addNode(graph, makeNode('b'));
    connect(graph, 'a', 'b', 'imports');
    connect(graph, 'b', 'a', 'imports');
    const cycles = detectCycles(graph, 'a');
    expect(cycles.length).toBeGreaterThan(0);
  });

  it('should detect no cycle in a DAG', () => {
    addNode(graph, makeNode('a'));
    addNode(graph, makeNode('b'));
    addNode(graph, makeNode('c'));
    connect(graph, 'a', 'b', 'imports');
    connect(graph, 'a', 'c', 'imports');
    connect(graph, 'b', 'c', 'imports');
    const cycles = detectCycles(graph, 'a');
    expect(cycles).toHaveLength(0);
  });

  it('should detect a 3-node cycle', () => {
    addNode(graph, makeNode('a'));
    addNode(graph, makeNode('b'));
    addNode(graph, makeNode('c'));
    connect(graph, 'a', 'b', 'imports');
    connect(graph, 'b', 'c', 'imports');
    connect(graph, 'c', 'a', 'imports');
    const cycles = detectCycles(graph, 'a');
    expect(cycles.length).toBeGreaterThan(0);
    expect(cycles[0]!.length).toBeGreaterThanOrEqual(3);
  });

  it('should return correct graph stats', () => {
    addNode(graph, makeNode('a', 'file'));
    addNode(graph, makeNode('b', 'component'));
    connect(graph, 'a', 'b', 'imports');
    const stats = getGraphStats(graph);
    expect(stats.totalNodes).toBe(2);
    expect(stats.totalEdges).toBe(1);
    expect(stats.nodesByKind['file']).toBe(1);
    expect(stats.nodesByKind['component']).toBe(1);
  });

  it('should generate deterministic IDs', () => {
    const id1 = generateId('src/app/page.tsx', 'Page');
    const id2 = generateId('src/app/page.tsx', 'Page');
    expect(id1).toBe(id2);
  });

  it('should produce different IDs for different inputs', () => {
    const id1 = generateId('src/a.ts', 'A');
    const id2 = generateId('src/b.ts', 'B');
    expect(id1).not.toBe(id2);
  });
});
