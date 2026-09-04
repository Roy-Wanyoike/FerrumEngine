/**
 * Tests for the Maintainability Analyzer.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createGraph, addNode, connect, generateId } from '@/engine/core/graph';
import { analyzeMaintainability } from '@/engine/analyzer/maintainability';
import type { GraphNode, ApplicationGraph } from '@/engine/core/types';

function makeNode(id: string, kind: GraphNode['kind'] = 'file', path: string = id, meta: Record<string, unknown> = {}, loc: [number, number] = [1, 10]): GraphNode {
  return { id, name: id, kind, path, language: 'ts', loc, meta, contentHash: 'abc' };
}

describe('Maintainability Analyzer', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    graph = createGraph('/test/project');
  });

  it('should detect high code churn', () => {
    const file = makeNode('file:a', 'file', 'src/a.ts', { changeCount: 25 });
    addNode(graph, file);
    const result = analyzeMaintainability(graph);
    const churnFindings = result.findings.filter(f => f.ruleId === 'maint/code-churn');
    expect(churnFindings.length).toBeGreaterThan(0);
    expect(churnFindings[0]!.evidenceType).toBe('measured');
    expect(churnFindings[0]!.confidence).toBeGreaterThanOrEqual(0.9);
  });

  it('should not flag churn below threshold', () => {
    const file = makeNode('file:b', 'file', 'src/b.ts', { changeCount: 5 });
    addNode(graph, file);
    const result = analyzeMaintainability(graph);
    const churnFindings = result.findings.filter(f => f.ruleId === 'maint/code-churn');
    expect(churnFindings).toHaveLength(0);
  });

  it('should detect ownership concentration', () => {
    const f1 = makeNode('f1', 'file', 'src/f1.ts', { owner: 'alice' });
    const f2 = makeNode('f2', 'file', 'src/f2.ts', { owner: 'alice' });
    const f3 = makeNode('f3', 'file', 'src/f3.ts', { owner: 'alice' });
    addNode(graph, f1); addNode(graph, f2); addNode(graph, f3);
    const result = analyzeMaintainability(graph, { ownershipConcentrationThreshold: 0.5 });
    const ownerFindings = result.findings.filter(f => f.ruleId === 'maint/ownership-concentration');
    expect(ownerFindings.length).toBeGreaterThan(0);
    expect(ownerFindings[0]!.evidenceType).toBe('measured');
  });

  it('should detect stale code', () => {
    const staleDate = Date.now() - 200 * 24 * 60 * 60 * 1000; // 200 days ago
    const file = makeNode('file:stale', 'file', 'src/stale.ts', { lastChanged: staleDate });
    addNode(graph, file);
    const result = analyzeMaintainability(graph);
    const staleFindings = result.findings.filter(f => f.ruleId === 'maint/stale-code');
    expect(staleFindings.length).toBeGreaterThan(0);
    expect(staleFindings[0]!.evidenceType).toBe('measured');
  });

  it('should detect dead exports', () => {
    const fn = makeNode('fn:unused', 'function', 'src/unused.ts', { exported: true });
    addNode(graph, fn);
    const result = analyzeMaintainability(graph);
    const deadFindings = result.findings.filter(f => f.ruleId === 'maint/dead-export');
    expect(deadFindings.length).toBeGreaterThan(0);
    expect(deadFindings[0]!.evidenceType).toBe('detected');
  });

  it('should not flag dead exports with dependents', () => {
    const fn = makeNode('fn:used', 'function', 'src/used.ts', { exported: true });
    const consumer = makeNode('c1', 'component', 'src/consumer.ts');
    addNode(graph, fn); addNode(graph, consumer);
    connect(graph, consumer.id, fn.id, 'imports');
    const result = analyzeMaintainability(graph);
    const deadFindings = result.findings.filter(f => f.ruleId === 'maint/dead-export' && f.affectedNodes.includes(fn.id));
    expect(deadFindings).toHaveLength(0);
  });

  it('should detect oversized files', () => {
    const file = makeNode('file:big', 'file', 'src/big.ts', {}, [1, 800]);
    addNode(graph, file);
    const result = analyzeMaintainability(graph);
    const sizeFindings = result.findings.filter(f => f.ruleId === 'maint/oversized-file');
    expect(sizeFindings.length).toBeGreaterThan(0);
    expect(sizeFindings[0]!.evidenceType).toBe('measured');
  });

  it('should detect god modules', () => {
    const mod = makeNode('mod:god', 'module', 'src/god.ts');
    addNode(graph, mod);
    for (let i = 0; i < 25; i++) {
      const dep = makeNode(`dep:${i}`, 'file', `src/dep${i}.ts`);
      addNode(graph, dep);
      connect(graph, dep.id, mod.id, 'imports');
    }
    const result = analyzeMaintainability(graph);
    const godFindings = result.findings.filter(f => f.ruleId === 'maint/god-module');
    expect(godFindings.length).toBeGreaterThan(0);
    expect(godFindings[0]!.evidenceType).toBe('measured');
  });

  it('should set correct evidenceType on all findings', () => {
    const file = makeNode('file:a', 'file', 'src/a.ts', { changeCount: 25 });
    addNode(graph, file);
    const result = analyzeMaintainability(graph);
    for (const finding of result.findings) {
      expect(finding.evidenceType).toBeDefined();
      expect(['measured', 'detected', 'estimated']).toContain(finding.evidenceType);
    }
  });

  it('should return correct category and analyzer name', () => {
    const result = analyzeMaintainability(graph);
    expect(result.analyzer).toBe('maintainability');
    expect(result.category).toBe('maintainability');
  });
});
