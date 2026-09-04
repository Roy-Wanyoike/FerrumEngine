/**
 * Tests for the Complexity Analyzer.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createGraph, addNode, connect } from '@/engine/core/graph';
import { analyzeComplexity } from '@/engine/analyzer/complexity';
import type { GraphNode, ApplicationGraph } from '@/engine/core/types';

function makeNode(id: string, kind: GraphNode['kind'] = 'function', path: string = id, meta: Record<string, unknown> = {}, loc: [number, number] = [1, 10]): GraphNode {
  return { id, name: id, kind, path, language: 'ts', loc, meta, contentHash: 'abc' };
}

describe('Complexity Analyzer', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    graph = createGraph('/test/project');
  });

  it('should detect high cyclomatic complexity', () => {
    const fn = makeNode('fn:complex', 'function', 'src/complex.ts', { cyclomaticComplexity: 15 });
    addNode(graph, fn);
    const result = analyzeComplexity(graph);
    const ccFindings = result.findings.filter(f => f.ruleId === 'complexity/cyclomatic');
    expect(ccFindings.length).toBeGreaterThan(0);
    expect(ccFindings[0]!.evidenceType).toBe('measured');
  });

  it('should not flag cyclomatic complexity below threshold', () => {
    const fn = makeNode('fn:simple', 'function', 'src/simple.ts', { cyclomaticComplexity: 5 });
    addNode(graph, fn);
    const result = analyzeComplexity(graph);
    const ccFindings = result.findings.filter(f => f.ruleId === 'complexity/cyclomatic');
    expect(ccFindings).toHaveLength(0);
  });

  it('should detect deep nesting', () => {
    const fn = makeNode('fn:deep', 'function', 'src/deep.ts', { nestingDepth: 6 });
    addNode(graph, fn);
    const result = analyzeComplexity(graph);
    const nestFindings = result.findings.filter(f => f.ruleId === 'complexity/deep-nesting');
    expect(nestFindings.length).toBeGreaterThan(0);
    expect(nestFindings[0]!.evidenceType).toBe('measured');
  });

  it('should detect long functions', () => {
    const fn = makeNode('fn:long', 'function', 'src/long.ts', {}, [1, 80]);
    addNode(graph, fn);
    const result = analyzeComplexity(graph);
    const longFindings = result.findings.filter(f => f.ruleId === 'complexity/long-function');
    expect(longFindings.length).toBeGreaterThan(0);
    expect(longFindings[0]!.evidenceType).toBe('measured');
  });

  it('should not flag functions below line threshold', () => {
    const fn = makeNode('fn:short', 'function', 'src/short.ts', {}, [1, 20]);
    addNode(graph, fn);
    const result = analyzeComplexity(graph);
    const longFindings = result.findings.filter(f => f.ruleId === 'complexity/long-function');
    expect(longFindings).toHaveLength(0);
  });

  it('should detect too many parameters', () => {
    const fn = makeNode('fn:manyparams', 'function', 'src/many.ts', { paramCount: 7 });
    addNode(graph, fn);
    const result = analyzeComplexity(graph);
    const paramFindings = result.findings.filter(f => f.ruleId === 'complexity/too-many-params');
    expect(paramFindings.length).toBeGreaterThan(0);
  });

  it('should detect callback hell', () => {
    const fn = makeNode('fn:cbhell', 'function', 'src/cbhell.ts', { callbackDepth: 4 });
    addNode(graph, fn);
    const result = analyzeComplexity(graph);
    const cbFindings = result.findings.filter(f => f.ruleId === 'complexity/callback-hell');
    expect(cbFindings.length).toBeGreaterThan(0);
    expect(cbFindings[0]!.evidenceType).toBe('detected');
  });

  it('should detect large files', () => {
    const file = makeNode('file:big', 'file', 'src/big.ts', {}, [1, 700]);
    addNode(graph, file);
    const result = analyzeComplexity(graph);
    const largeFindings = result.findings.filter(f => f.ruleId === 'complexity/large-file');
    expect(largeFindings.length).toBeGreaterThan(0);
  });

  it('should set correct evidenceType on all findings', () => {
    const fn = makeNode('fn:complex', 'function', 'src/complex.ts', { cyclomaticComplexity: 15 });
    addNode(graph, fn);
    const result = analyzeComplexity(graph);
    for (const finding of result.findings) {
      expect(finding.evidenceType).toBeDefined();
      expect(['measured', 'detected', 'estimated']).toContain(finding.evidenceType);
    }
  });

  it('should return correct category and analyzer name', () => {
    const result = analyzeComplexity(graph);
    expect(result.analyzer).toBe('complexity');
    expect(result.category).toBe('complexity');
  });
});
