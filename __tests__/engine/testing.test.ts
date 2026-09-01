/**
 * Tests for the Testing Analyzer.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createGraph, addNode, connect } from '@/engine/core/graph';
import { analyzeTesting } from '@/engine/analyzer/testing';
import type { GraphNode, ApplicationGraph } from '@/engine/core/types';

function makeNode(id: string, kind: GraphNode['kind'] = 'file', path: string = id, meta: Record<string, unknown> = {}): GraphNode {
  return {
    id,
    name: id,
    kind,
    path,
    language: 'ts',
    loc: [1, 10],
    meta,
    contentHash: 'abc',
  };
}

describe('Testing Analyzer', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    graph = createGraph('/test/project');
  });

  it('should detect untested modules', () => {
    const comp = makeNode('comp:Button', 'component', 'src/components/Button.tsx');
    addNode(graph, comp);

    const result = analyzeTesting(graph);
    const untestedFindings = result.findings.filter(f => f.ruleId === 'testing/untested-module');
    expect(untestedFindings.length).toBeGreaterThan(0);
    expect(untestedFindings[0]!.title).toContain('Button');
  });

  it('should detect coverage gaps for widely-used components', () => {
    const util = makeNode('util:formatDate', 'utility', 'src/utils/formatDate.ts');
    addNode(graph, util);
    // Add 4 dependents
    for (let i = 0; i < 4; i++) {
      const dep = makeNode(`comp:Consumer${i}`, 'component', `src/components/Consumer${i}.tsx`);
      addNode(graph, dep);
      connect(graph, dep.id, util.id, 'imports');
    }

    const result = analyzeTesting(graph);
    const gapFindings = result.findings.filter(f => f.ruleId === 'testing/coverage-gap');
    expect(gapFindings.length).toBeGreaterThan(0);
    expect(gapFindings[0]!.severity).toBe('medium');
  });

  it('should detect test files without assertions', () => {
    const test = makeNode('test:lazy', 'test', '__tests__/utils/lazy.test.ts', {
      hasAssertions: false,
    });
    addNode(graph, test);

    const result = analyzeTesting(graph);
    const antiFindings = result.findings.filter(f => f.ruleId === 'testing/no-assertions');
    expect(antiFindings.length).toBeGreaterThan(0);
  });

  it('should detect untested API routes', () => {
    const api = makeNode('api:users', 'api', 'app/api/users/route.ts');
    addNode(graph, api);

    const result = analyzeTesting(graph);
    const apiFindings = result.findings.filter(f => f.ruleId === 'testing/untested-api-route');
    expect(apiFindings.length).toBeGreaterThan(0);
    expect(apiFindings[0]!.severity).toBe('high');
  });

  it('should detect orphaned tests targeting deleted modules', () => {
    const test = makeNode('test:old', 'test', '__tests__/old-deleted.test.ts');
    addNode(graph, test);
    // Edge pointing to a non-existent node
    connect(graph, test.id, 'nonexistent-node-id', 'test-of', { targetName: 'DeletedModule' });

    const result = analyzeTesting(graph);
    const orphanFindings = result.findings.filter(f => f.ruleId === 'testing/orphaned-test');
    expect(orphanFindings.length).toBeGreaterThan(0);
  });

  it('should detect large test files', () => {
    const test = makeNode('test:big', 'test', '__tests__/integration/big.test.ts');
    test.loc = [1, 600];
    addNode(graph, test);

    const result = analyzeTesting(graph);
    const largeFindings = result.findings.filter(f => f.ruleId === 'testing/large-test-file');
    expect(largeFindings.length).toBeGreaterThan(0);
  });

  it('should return correct analysis metadata', () => {
    const result = analyzeTesting(graph);
    expect(result.analyzer).toBe('testing');
    expect(result.category).toBe('testing');
    expect(result.summary).toBeDefined();
  });
});
