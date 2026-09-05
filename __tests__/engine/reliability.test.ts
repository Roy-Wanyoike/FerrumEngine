/**
 * Tests for the Reliability Analyzer.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createGraph, addNode, connect } from '@/engine/core/graph';
import { analyzeReliability } from '@/engine/analyzer/reliability';
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

describe('Reliability Analyzer', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    graph = createGraph('/test/project');
  });

  it('should detect missing error boundaries when layouts exist', () => {
    const layout = makeNode('layout:root', 'layout', 'src/app/layout.tsx');
    addNode(graph, layout);

    const result = analyzeReliability(graph);
    const ebFindings = result.findings.filter(f => f.ruleId === 'reliability/missing-error-boundary');
    expect(ebFindings.length).toBeGreaterThan(0);
    expect(ebFindings[0]!.severity).toBe('high');
  });

  it('should not flag error boundary when one exists', () => {
    const layout = makeNode('layout:root', 'layout', 'src/app/layout.tsx');
    const eb = makeNode('comp:ErrorBoundary', 'component', 'src/components/ErrorBoundary.tsx', {
      isErrorBoundary: true,
    });
    addNode(graph, layout);
    addNode(graph, eb);

    const result = analyzeReliability(graph);
    const ebFindings = result.findings.filter(f => f.ruleId === 'reliability/missing-error-boundary');
    expect(ebFindings).toHaveLength(0);
  });

  it('should detect unhandled promise rejections', () => {
    const fn = makeNode('fn:fetchData', 'function', 'src/lib/api.ts', {
      async: true,
      hasTryCatch: false,
    });
    addNode(graph, fn);

    const result = analyzeReliability(graph);
    const promiseFindings = result.findings.filter(f => f.ruleId === 'reliability/unhandled-promise');
    expect(promiseFindings.length).toBeGreaterThan(0);
    expect(promiseFindings[0]!.severity).toBe('medium');
  });

  it('should not flag async functions with try/catch', () => {
    const fn = makeNode('fn:safeFetch', 'function', 'src/lib/safe-api.ts', {
      async: true,
      hasTryCatch: true,
    });
    addNode(graph, fn);

    const result = analyzeReliability(graph);
    const promiseFindings = result.findings.filter(f => f.ruleId === 'reliability/unhandled-promise');
    expect(promiseFindings).toHaveLength(0);
  });

  it('should detect bare fetch calls without error handling', () => {
    const comp = makeNode('comp:DataLoader', 'component', 'src/components/DataLoader.tsx', {
      usesFetch: true,
      hasErrorHandling: false,
    });
    addNode(graph, comp);

    const result = analyzeReliability(graph);
    const fetchFindings = result.findings.filter(f => f.ruleId === 'reliability/bare-fetch');
    expect(fetchFindings.length).toBeGreaterThan(0);
  });

  it('should detect missing loading.tsx for routes', () => {
    const page = makeNode('page:dashboard', 'page', 'src/app/dashboard/page.tsx');
    addNode(graph, page);

    const result = analyzeReliability(graph);
    const loadingFindings = result.findings.filter(f => f.ruleId === 'reliability/missing-loading-state');
    expect(loadingFindings.length).toBeGreaterThan(0);
  });

  it('should return correct analysis metadata', () => {
    const result = analyzeReliability(graph);
    expect(result.analyzer).toBe('reliability');
    expect(result.category).toBe('reliability');
    expect(result.summary).toBeDefined();
  });
});
