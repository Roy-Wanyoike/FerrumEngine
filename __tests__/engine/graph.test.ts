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

// ──────────────────────────────────────────────────────────────────────
// NEW NODE KINDS (Issue #48)
// ──────────────────────────────────────────────────────────────────────

describe('New NodeKinds (Issue #48)', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    graph = createGraph('/test/project');
  });

  it('should add and retrieve "database" node kind', () => {
    addNode(graph, makeNode('db:prisma', 'database', 'prisma/schema.prisma'));
    const dbNodes = getNodesByKind(graph, 'database');
    expect(dbNodes).toHaveLength(1);
    expect(dbNodes[0]!.name).toBe('db:prisma');
  });

  it('should add and retrieve "queue" node kind', () => {
    addNode(graph, makeNode('q:email', 'queue', 'src/queues/email.ts'));
    const qNodes = getNodesByKind(graph, 'queue');
    expect(qNodes).toHaveLength(1);
    expect(qNodes[0]!.name).toBe('q:email');
  });

  it('should add and retrieve "infrastructure" node kind', () => {
    addNode(graph, makeNode('infra:tf', 'infrastructure', 'infra/main.tf'));
    const infraNodes = getNodesByKind(graph, 'infrastructure');
    expect(infraNodes).toHaveLength(1);
  });

  it('should add and retrieve "deployment" node kind', () => {
    addNode(graph, makeNode('deploy:ci', 'deployment', '.github/workflows/ci.yml'));
    const deployNodes = getNodesByKind(graph, 'deployment');
    expect(deployNodes).toHaveLength(1);
  });

  it('should add and retrieve "worker" node kind', () => {
    addNode(graph, makeNode('w:sync', 'worker', 'src/workers/sync.ts'));
    const workerNodes = getNodesByKind(graph, 'worker');
    expect(workerNodes).toHaveLength(1);
  });

  it('should add and retrieve "journey" node kind', () => {
    addNode(graph, makeNode('j:checkout', 'journey', 'src/journeys/checkout.ts'));
    const journeyNodes = getNodesByKind(graph, 'journey');
    expect(journeyNodes).toHaveLength(1);
  });

  it('should add and retrieve "security-boundary" node kind', () => {
    addNode(graph, makeNode('sb:auth', 'security-boundary', 'src/middleware/auth.ts'));
    const sbNodes = getNodesByKind(graph, 'security-boundary');
    expect(sbNodes).toHaveLength(1);
  });

  it('should count all 8 new node kinds in graph stats', () => {
    const newKinds: GraphNode['kind'][] = [
      'database', 'queue', 'infrastructure', 'deployment',
      'worker', 'journey', 'security-boundary',
    ];
    // Add one of each (7 unique new kinds — "event" already existed)
    for (const kind of newKinds) {
      addNode(graph, makeNode(`n:${kind}`, kind, `src/${kind}/index.ts`));
    }
    const stats = getGraphStats(graph);
    expect(stats.totalNodes).toBe(7);
    for (const kind of newKinds) {
      expect(stats.nodesByKind[kind]).toBe(1);
    }
  });
});

// ──────────────────────────────────────────────────────────────────────
// OWNERSHIP & GIT METADATA (Issue #48)
// ──────────────────────────────────────────────────────────────────────

describe('GraphNode Ownership & Git Metadata (Issue #48)', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    graph = createGraph('/test/project');
  });

  it('should store owner and team metadata on a node', () => {
    const node: GraphNode = {
      id: 'n1',
      name: 'Button',
      kind: 'component',
      path: 'src/Button.tsx',
      language: 'tsx',
      loc: [1, 50],
      meta: {},
      contentHash: 'abc',
      owner: '@frontend-team',
      team: 'platform',
    };
    addNode(graph, node);
    const stored = graph.nodes.get('n1')!;
    expect(stored.owner).toBe('@frontend-team');
    expect(stored.team).toBe('platform');
  });

  it('should store git metadata on a node', () => {
    const node: GraphNode = {
      id: 'n2',
      name: 'apiRoute',
      kind: 'api',
      path: 'src/api/route.ts',
      language: 'ts',
      loc: [1, 30],
      meta: {},
      contentHash: 'def',
      gitCommit: 'abc123def456789',
      gitAuthor: 'alice@example.com',
      gitBlame: 'bob@example.com',
      lastModified: 1700000000000,
    };
    addNode(graph, node);
    const stored = graph.nodes.get('n2')!;
    expect(stored.gitCommit).toBe('abc123def456789');
    expect(stored.gitAuthor).toBe('alice@example.com');
    expect(stored.gitBlame).toBe('bob@example.com');
    expect(stored.lastModified).toBe(1700000000000);
  });

  it('should allow nodes without ownership/git fields (backwards compat)', () => {
    const node: GraphNode = {
      id: 'n3',
      name: 'util',
      kind: 'utility',
      path: 'src/util.ts',
      language: 'ts',
      loc: [1, 10],
      meta: {},
      contentHash: 'ghi',
    };
    addNode(graph, node);
    const stored = graph.nodes.get('n3')!;
    expect(stored.owner).toBeUndefined();
    expect(stored.team).toBeUndefined();
    expect(stored.gitCommit).toBeUndefined();
    expect(stored.lastModified).toBeUndefined();
  });

  it('should preserve ownership metadata when querying by kind', () => {
    const node: GraphNode = {
      id: 'n4',
      name: 'dbModel',
      kind: 'database',
      path: 'prisma/schema.prisma',
      language: 'prisma',
      loc: [1, 100],
      meta: {},
      contentHash: 'jkl',
      owner: '@backend-team',
      team: 'data',
      gitCommit: 'deadbeef',
      lastModified: 1700000000000,
    };
    addNode(graph, node);
    const dbNodes = getNodesByKind(graph, 'database');
    expect(dbNodes).toHaveLength(1);
    expect(dbNodes[0]!.owner).toBe('@backend-team');
    expect(dbNodes[0]!.team).toBe('data');
    expect(dbNodes[0]!.gitCommit).toBe('deadbeef');
  });

  it('should connect new node kinds with edges', () => {
    const dbNode: GraphNode = {
      id: 'db1', name: 'UserModel', kind: 'database',
      path: 'db/users.ts', language: 'ts', loc: [1, 50],
      meta: {}, contentHash: 'x',
    };
    const workerNode: GraphNode = {
      id: 'w1', name: 'SyncWorker', kind: 'worker',
      path: 'src/workers/sync.ts', language: 'ts', loc: [1, 30],
      meta: {}, contentHash: 'y',
    };
    addNode(graph, dbNode);
    addNode(graph, workerNode);
    connect(graph, 'w1', 'db1', 'depends-on');

    const deps = getDependencies(graph, 'w1');
    expect(deps).toHaveLength(1);
    expect(deps[0]!.kind).toBe('database');
    expect(deps[0]!.name).toBe('UserModel');
  });
});
