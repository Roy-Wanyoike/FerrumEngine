/**
 * Tests for the Change Impact Engine.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createGraph, addNode, connect } from '@/engine/core/graph';
import { analyzeImpact } from '@/engine/impact/impact';
import type { ApplicationGraph, GraphNode } from '@/engine/core/types';

function makeNode(id: string, kind: GraphNode['kind'] = 'file', path: string = id, meta: Record<string, unknown> = {}): GraphNode {
  return { id, name: id, kind, path, language: 'ts', loc: [1, 10], meta, contentHash: 'abc' };
}

describe('Change Impact Engine', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    graph = createGraph('/test/project');
  });

  it('should report low risk for isolated file changes', () => {
    addNode(graph, makeNode('util.ts', 'file', 'src/lib/util.ts'));
    const impact = analyzeImpact(graph, ['src/lib/util.ts']);
    expect(impact.risk).toBe('low');
    expect(impact.changedFiles).toEqual(['src/lib/util.ts']);
  });

  it('should detect direct dependents', () => {
    addNode(graph, makeNode('util', 'file', 'src/lib/util.ts'));
    addNode(graph, makeNode('comp', 'component', 'src/comp.tsx'));
    connect(graph, 'comp', 'util', 'imports');
    const impact = analyzeImpact(graph, ['src/lib/util.ts']);
    expect(impact.affected).toHaveLength(1);
    expect(impact.affected[0]!.distance).toBe(1);
  });

  it('should detect transitive dependents', () => {
    addNode(graph, makeNode('util', 'file', 'src/lib/util.ts'));
    addNode(graph, makeNode('comp', 'component', 'src/comp.tsx'));
    addNode(graph, makeNode('page', 'component', 'src/app/page.tsx'));
    connect(graph, 'comp', 'util', 'imports');
    connect(graph, 'page', 'comp', 'imports');
    const impact = analyzeImpact(graph, ['src/lib/util.ts']);
    expect(impact.affected.length).toBeGreaterThanOrEqual(2);
  });

  it('should flag security implications for auth files', () => {
    addNode(graph, makeNode('auth', 'file', 'src/lib/auth.ts'));
    addNode(graph, makeNode('comp', 'component', 'src/comp.tsx'));
    connect(graph, 'comp', 'auth', 'imports');
    const impact = analyzeImpact(graph, ['src/lib/auth.ts']);
    expect(impact.securityImplications.length).toBeGreaterThan(0);
    expect(impact.risk).toBe('critical');
  });

  it('should generate verification recommendations', () => {
    addNode(graph, makeNode('util', 'file', 'src/lib/util.ts'));
    addNode(graph, makeNode('page', 'route', 'src/app/page.tsx', { route: '/' }));
    connect(graph, 'page', 'util', 'imports');
    const impact = analyzeImpact(graph, ['src/lib/util.ts']);
    expect(impact.recommendedVerification.length).toBeGreaterThan(0);
  });

  it('should produce a non-empty summary', () => {
    addNode(graph, makeNode('a', 'file', 'src/a.ts'));
    const impact = analyzeImpact(graph, ['src/a.ts']);
    expect(impact.summary.length).toBeGreaterThan(0);
  });
});
