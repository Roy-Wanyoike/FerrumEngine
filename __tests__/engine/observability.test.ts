/**
 * Tests for the Observability Analyzer.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createGraph, addNode, connect } from '@/engine/core/graph';
import { analyzeObservability } from '@/engine/analyzer/observability';
import type { GraphNode, ApplicationGraph } from '@/engine/core/types';

function makeNode(id: string, kind: GraphNode['kind'] = 'function', path: string = id, meta: Record<string, unknown> = {}): GraphNode {
  return { id, name: id, kind, path, language: 'ts', loc: [1, 10], meta, contentHash: 'abc' };
}

describe('Observability Analyzer', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    graph = createGraph('/test/project');
  });

  it('should detect missing error logging', () => {
    const fn = makeNode('fn:swallow', 'function', 'src/swallow.ts', { hasErrorHandling: true, hasErrorLogging: false });
    addNode(graph, fn);
    const result = analyzeObservability(graph);
    const errFindings = result.findings.filter(f => f.ruleId === 'observe/missing-error-logging');
    expect(errFindings.length).toBeGreaterThan(0);
    expect(errFindings[0]!.evidenceType).toBe('detected');
  });

  it('should not flag functions that log errors', () => {
    const fn = makeNode('fn:good', 'function', 'src/good.ts', { hasErrorHandling: true, hasErrorLogging: true });
    addNode(graph, fn);
    const result = analyzeObservability(graph);
    const errFindings = result.findings.filter(f => f.ruleId === 'observe/missing-error-logging' && f.affectedNodes.includes(fn.id));
    expect(errFindings).toHaveLength(0);
  });

  it('should detect untraced API calls', () => {
    const api = makeNode('api:untraced', 'api', 'src/api/untraced.ts', { isTraced: false });
    addNode(graph, api);
    const result = analyzeObservability(graph);
    const traceFindings = result.findings.filter(f => f.ruleId === 'observe/untraced-api');
    expect(traceFindings.length).toBeGreaterThan(0);
  });

  it('should not flag traced APIs', () => {
    const api = makeNode('api:traced', 'api', 'src/api/traced.ts', { isTraced: true });
    addNode(graph, api);
    const result = analyzeObservability(graph);
    const traceFindings = result.findings.filter(f => f.ruleId === 'observe/untraced-api' && f.affectedNodes.includes(api.id));
    expect(traceFindings).toHaveLength(0);
  });

  it('should detect observability blind spots', () => {
    const fn = makeNode('fn:critical', 'function', 'src/payment.ts', { hasLogging: false });
    addNode(graph, fn);
    const result = analyzeObservability(graph, { criticalPathPatterns: [/payment/] });
    const blindFindings = result.findings.filter(f => f.ruleId === 'observe/blind-spot');
    expect(blindFindings.length).toBeGreaterThan(0);
  });

  it('should detect missing metrics', () => {
    const svc = makeNode('svc:api', 'service', 'src/api.ts', { metrics: [] });
    addNode(graph, svc);
    const result = analyzeObservability(graph);
    const metricsFindings = result.findings.filter(f => f.ruleId === 'observe/missing-metrics');
    expect(metricsFindings.length).toBeGreaterThan(0);
  });

  it('should detect alert gaps', () => {
    const svc = makeNode('svc:api', 'service', 'src/api.ts', { hasMetrics: true, hasAlerts: false });
    addNode(graph, svc);
    const result = analyzeObservability(graph);
    const alertFindings = result.findings.filter(f => f.ruleId === 'observe/alert-gap');
    expect(alertFindings.length).toBeGreaterThan(0);
  });

  it('should set correct evidenceType on all findings', () => {
    const fn = makeNode('fn:swallow', 'function', 'src/swallow.ts', { hasErrorHandling: true, hasErrorLogging: false });
    addNode(graph, fn);
    const result = analyzeObservability(graph);
    for (const finding of result.findings) {
      expect(finding.evidenceType).toBeDefined();
      expect(['measured', 'detected', 'estimated']).toContain(finding.evidenceType);
    }
  });

  it('should return correct category and analyzer name', () => {
    const result = analyzeObservability(graph);
    expect(result.analyzer).toBe('observability');
    expect(result.category).toBe('observability');
  });
});
