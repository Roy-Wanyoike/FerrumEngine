/**
 * Tests for the Ownership Analyzer.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createGraph, addNode, connect } from '@/engine/core/graph';
import { analyzeOwnership } from '@/engine/analyzer/ownership';
import type { GraphNode, ApplicationGraph } from '@/engine/core/types';

function makeNode(id: string, kind: GraphNode['kind'] = 'file', path: string = id, meta: Record<string, unknown> = {}): GraphNode {
  return { id, name: id, kind, path, language: 'ts', loc: [1, 10], meta, contentHash: 'abc' };
}

describe('Ownership Analyzer', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    graph = createGraph('/test/project');
  });

  it('should detect CODEOWNERS coverage gaps', () => {
    const f1 = makeNode('f1', 'file', 'src/f1.ts', { owners: ['alice'] });
    const f2 = makeNode('f2', 'file', 'src/f2.ts'); // no owner
    const f3 = makeNode('f3', 'file', 'src/f3.ts'); // no owner
    addNode(graph, f1); addNode(graph, f2); addNode(graph, f3);
    const result = analyzeOwnership(graph, { minCodeownersCoverage: 0.8 });
    const gapFindings = result.findings.filter(f => f.ruleId === 'ownership/codeowners-gap');
    expect(gapFindings.length).toBeGreaterThan(0);
    expect(gapFindings[0]!.evidenceType).toBe('measured');
  });

  it('should not flag when coverage meets threshold', () => {
    const f1 = makeNode('f1', 'file', 'src/f1.ts', { owners: ['alice'] });
    const f2 = makeNode('f2', 'file', 'src/f2.ts', { owners: ['bob'] });
    addNode(graph, f1); addNode(graph, f2);
    const result = analyzeOwnership(graph, { minCodeownersCoverage: 0.5 });
    const gapFindings = result.findings.filter(f => f.ruleId === 'ownership/codeowners-gap');
    expect(gapFindings).toHaveLength(0);
  });

  it('should detect orphaned modules', () => {
    const mod = makeNode('mod:orphan', 'module', 'src/orphan.ts');
    const consumer = makeNode('c1', 'component', 'src/consumer.ts');
    addNode(graph, mod); addNode(graph, consumer);
    connect(graph, consumer.id, mod.id, 'imports');
    const result = analyzeOwnership(graph);
    const orphanFindings = result.findings.filter(f => f.ruleId === 'ownership/orphaned');
    expect(orphanFindings.length).toBeGreaterThan(0);
    expect(orphanFindings[0]!.evidenceType).toBe('detected');
  });

  it('should detect bus factor risk', () => {
    // Create critical files all owned by one person
    for (let i = 0; i < 6; i++) {
      const file = makeNode(`cf:${i}`, 'file', `src/critical${i}.ts`, { owner: 'alice' });
      addNode(graph, file);
      // Add many dependents to make it critical
      for (let j = 0; j < 6; j++) {
        const dep = makeNode(`dep:${i}:${j}`, 'component', `src/dep${i}${j}.ts`);
        addNode(graph, dep);
        connect(graph, dep.id, file.id, 'imports');
      }
    }
    const result = analyzeOwnership(graph);
    const busFindings = result.findings.filter(f => f.ruleId === 'ownership/bus-factor');
    expect(busFindings.length).toBeGreaterThan(0);
  });

  it('should detect team coupling', () => {
    const tgt = makeNode('t2:lib', 'module', 'src/lib.ts', { team: 'frontend' });
    addNode(graph, tgt);
    for (let i = 0; i < 6; i++) {
      const src = makeNode(`t1:svc${i}`, 'service', `src/svc${i}.ts`, { team: 'backend' });
      addNode(graph, src);
      connect(graph, src.id, tgt.id, 'imports');
    }
    const result = analyzeOwnership(graph);
    const couplingFindings = result.findings.filter(f => f.ruleId === 'ownership/team-coupling');
    expect(couplingFindings.length).toBeGreaterThan(0);
  });

  it('should set correct evidenceType on all findings', () => {
    const f1 = makeNode('f1', 'file', 'src/f1.ts'); // no owner
    addNode(graph, f1);
    const result = analyzeOwnership(graph, { minCodeownersCoverage: 0.9 });
    for (const finding of result.findings) {
      expect(finding.evidenceType).toBeDefined();
      expect(['measured', 'detected', 'estimated']).toContain(finding.evidenceType);
    }
  });

  it('should return correct category and analyzer name', () => {
    const result = analyzeOwnership(graph);
    expect(result.analyzer).toBe('ownership');
    expect(result.category).toBe('ownership');
  });

  it('should produce empty findings for empty graph', () => {
    const result = analyzeOwnership(graph);
    expect(result.findings).toHaveLength(0);
  });
});
