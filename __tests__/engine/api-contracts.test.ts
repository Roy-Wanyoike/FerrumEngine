/**
 * Tests for the API Contracts Analyzer.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createGraph, addNode, connect } from '@/engine/core/graph';
import { analyzeApiContracts } from '@/engine/analyzer/api-contracts';
import type { GraphNode, ApplicationGraph } from '@/engine/core/types';

function makeNode(id: string, kind: GraphNode['kind'] = 'api', path: string = id, meta: Record<string, unknown> = {}): GraphNode {
  return { id, name: id, kind, path, language: 'ts', loc: [1, 10], meta, contentHash: 'abc' };
}

describe('API Contracts Analyzer', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    graph = createGraph('/test/project');
  });

  it('should detect breaking API changes', () => {
    const api = makeNode('api:users', 'api', 'src/api/users.ts', { breakingChanges: [{ type: 'removed-endpoint', detail: 'DELETE /users/:id removed' }] });
    addNode(graph, api);
    const result = analyzeApiContracts(graph);
    const breakFindings = result.findings.filter(f => f.ruleId === 'api/breaking-change');
    expect(breakFindings.length).toBeGreaterThan(0);
    expect(breakFindings[0]!.severity).toBe('critical');
    expect(breakFindings[0]!.evidenceType).toBe('detected');
  });

  it('should detect missing API versioning', () => {
    const api = makeNode('api:data', 'api', 'src/api/data.ts', { path: '/api/data' });
    addNode(graph, api);
    const result = analyzeApiContracts(graph);
    const verFindings = result.findings.filter(f => f.ruleId === 'api/missing-versioning');
    expect(verFindings.length).toBeGreaterThan(0);
  });

  it('should not flag versioned APIs', () => {
    const api = makeNode('api:v1data', 'api', 'src/api/v1/data.ts', { path: '/v1/data', versioned: true });
    addNode(graph, api);
    const result = analyzeApiContracts(graph);
    const verFindings = result.findings.filter(f => f.ruleId === 'api/missing-versioning');
    expect(verFindings).toHaveLength(0);
  });

  it('should detect undocumented endpoints', () => {
    const api = makeNode('api:undoc', 'api', 'src/api/undoc.ts');
    addNode(graph, api);
    const result = analyzeApiContracts(graph);
    const docFindings = result.findings.filter(f => f.ruleId === 'api/undocumented');
    expect(docFindings.length).toBeGreaterThan(0);
  });

  it('should detect missing error responses', () => {
    const api = makeNode('api:noerrs', 'api', 'src/api/noerrs.ts', { errorCodes: [200] });
    addNode(graph, api);
    const result = analyzeApiContracts(graph);
    const errFindings = result.findings.filter(f => f.ruleId === 'api/missing-error-responses');
    expect(errFindings.length).toBeGreaterThan(0);
  });

  it('should not flag endpoints with all error codes', () => {
    const api = makeNode('api:good', 'api', 'src/api/good.ts', { errorCodes: [200, 400, 401, 500] });
    addNode(graph, api);
    const result = analyzeApiContracts(graph);
    const errFindings = result.findings.filter(f => f.ruleId === 'api/missing-error-responses' && f.affectedNodes.includes(api.id));
    expect(errFindings).toHaveLength(0);
  });

  it('should detect inconsistent response shapes', () => {
    const api1 = makeNode('api:users1', 'api', 'src/api/users/list.ts', { path: '/api/users/list', responseShape: 'UserListResponse' });
    const api2 = makeNode('api:users2', 'api', 'src/api/users/detail.ts', { path: '/api/users/detail', responseShape: 'UserDetailResponse' });
    addNode(graph, api1); addNode(graph, api2);
    const result = analyzeApiContracts(graph);
    const shapeFindings = result.findings.filter(f => f.ruleId === 'api/inconsistent-response');
    expect(shapeFindings.length).toBeGreaterThan(0);
  });

  it('should set correct evidenceType on all findings', () => {
    const api = makeNode('api:users', 'api', 'src/api/users.ts', { breakingChanges: [{ type: 'changed-param-type', detail: 'id: string -> number' }] });
    addNode(graph, api);
    const result = analyzeApiContracts(graph);
    for (const finding of result.findings) {
      expect(finding.evidenceType).toBeDefined();
      expect(['measured', 'detected', 'estimated']).toContain(finding.evidenceType);
    }
  });

  it('should return correct category and analyzer name', () => {
    const result = analyzeApiContracts(graph);
    expect(result.analyzer).toBe('api-contracts');
    expect(result.category).toBe('api-contracts');
  });
});
