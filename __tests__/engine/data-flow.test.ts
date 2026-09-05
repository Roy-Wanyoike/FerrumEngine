/**
 * Tests for the Data Flow Analyzer.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createGraph, addNode, connect } from '@/engine/core/graph';
import { analyzeDataFlow } from '@/engine/analyzer/data-flow';
import type { GraphNode, ApplicationGraph } from '@/engine/core/types';

function makeNode(id: string, kind: GraphNode['kind'] = 'component', path: string = id, meta: Record<string, unknown> = {}): GraphNode {
  return { id, name: id, kind, path, language: 'ts', loc: [1, 10], meta, contentHash: 'abc' };
}

describe('Data Flow Analyzer', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    graph = createGraph('/test/project');
  });

  it('should detect prop drilling', () => {
    const comp = makeNode('comp:deep', 'component', 'src/deep.tsx', { propChainDepth: 6 });
    addNode(graph, comp);
    const result = analyzeDataFlow(graph);
    const drillFindings = result.findings.filter(f => f.ruleId === 'dataflow/prop-drilling');
    expect(drillFindings.length).toBeGreaterThan(0);
    expect(drillFindings[0]!.evidenceType).toBe('measured');
  });

  it('should not flag prop drilling below threshold', () => {
    const comp = makeNode('comp:shallow', 'component', 'src/shallow.tsx', { propChainDepth: 3 });
    addNode(graph, comp);
    const result = analyzeDataFlow(graph);
    const drillFindings = result.findings.filter(f => f.ruleId === 'dataflow/prop-drilling');
    expect(drillFindings).toHaveLength(0);
  });

  it('should detect PII flow to client', () => {
    const api = makeNode('api:profile', 'api', 'src/api/profile.ts', { clientFacing: true, responseFields: ['email', 'phone', 'name'] });
    addNode(graph, api);
    const result = analyzeDataFlow(graph);
    const piiFindings = result.findings.filter(f => f.ruleId === 'dataflow/pii-to-client');
    expect(piiFindings.length).toBeGreaterThan(0);
    expect(piiFindings[0]!.severity).toBe('critical');
    expect(piiFindings[0]!.evidenceType).toBe('detected');
  });

  it('should not flag non-client-facing APIs for PII', () => {
    const api = makeNode('api:internal', 'api', 'src/api/internal.ts', { clientFacing: false, responseFields: ['email'] });
    addNode(graph, api);
    const result = analyzeDataFlow(graph);
    const piiFindings = result.findings.filter(f => f.ruleId === 'dataflow/pii-to-client');
    expect(piiFindings).toHaveLength(0);
  });

  it('should detect unvalidated input flow', () => {
    const api = makeNode('api:input', 'api', 'src/api/input.ts', { acceptsBody: true, hasValidation: false });
    addNode(graph, api);
    const result = analyzeDataFlow(graph);
    const unvalFindings = result.findings.filter(f => f.ruleId === 'dataflow/unvalidated-input');
    expect(unvalFindings.length).toBeGreaterThan(0);
    expect(unvalFindings[0]!.evidenceType).toBe('detected');
  });

  it('should detect global state mutation hotspots', () => {
    const store = makeNode('store:global', 'store', 'src/store.ts');
    addNode(graph, store);
    for (let i = 0; i < 15; i++) {
      const comp = makeNode(`comp:${i}`, 'component', `src/comp${i}.tsx`);
      addNode(graph, comp);
      connect(graph, comp.id, store.id, 'writes-state');
    }
    const result = analyzeDataFlow(graph);
    const mutFindings = result.findings.filter(f => f.ruleId === 'dataflow/global-mutation');
    expect(mutFindings.length).toBeGreaterThan(0);
  });

  it('should detect state coupling', () => {
    const store = makeNode('store:coupled', 'store', 'src/coupled.ts');
    addNode(graph, store);
    for (let i = 0; i < 6; i++) {
      const comp = makeNode(`ccomp:${i}`, 'component', `src/ccomp${i}.tsx`);
      addNode(graph, comp);
      connect(graph, comp.id, store.id, 'writes-state');
      connect(graph, comp.id, store.id, 'reads-state');
    }
    const result = analyzeDataFlow(graph);
    const couplingFindings = result.findings.filter(f => f.ruleId === 'dataflow/state-coupling');
    expect(couplingFindings.length).toBeGreaterThan(0);
  });

  it('should set correct evidenceType on all findings', () => {
    const comp = makeNode('comp:deep', 'component', 'src/deep.tsx', { propChainDepth: 6 });
    addNode(graph, comp);
    const result = analyzeDataFlow(graph);
    for (const finding of result.findings) {
      expect(finding.evidenceType).toBeDefined();
      expect(['measured', 'detected', 'estimated']).toContain(finding.evidenceType);
    }
  });

  it('should return correct category and analyzer name', () => {
    const result = analyzeDataFlow(graph);
    expect(result.analyzer).toBe('data-flow');
    expect(result.category).toBe('data-flow');
  });
});
