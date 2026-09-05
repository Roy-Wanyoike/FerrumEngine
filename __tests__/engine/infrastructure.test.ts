/**
 * Tests for the Infrastructure Analyzer.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createGraph, addNode, connect } from '@/engine/core/graph';
import { analyzeInfrastructure } from '@/engine/analyzer/infrastructure';
import type { GraphNode, ApplicationGraph } from '@/engine/core/types';

function makeNode(id: string, kind: GraphNode['kind'] = 'service', path: string = id, meta: Record<string, unknown> = {}): GraphNode {
  return { id, name: id, kind, path, language: 'ts', loc: [1, 10], meta, contentHash: 'abc' };
}

describe('Infrastructure Analyzer', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    graph = createGraph('/test/project');
  });

  it('should detect missing IaC definitions', () => {
    const svc = makeNode('svc:api', 'service', 'src/api.ts');
    addNode(graph, svc);
    const result = analyzeInfrastructure(graph);
    const iacFindings = result.findings.filter(f => f.ruleId === 'infra/missing-iac');
    expect(iacFindings.length).toBeGreaterThan(0);
    expect(iacFindings[0]!.evidenceType).toBe('detected');
  });

  it('should not flag when IaC exists', () => {
    const svc = makeNode('svc:api', 'service', 'src/api.ts');
    const iac = makeNode('cfg:tf', 'config', 'infra/main.tf', { isIac: true });
    addNode(graph, svc); addNode(graph, iac);
    const result = analyzeInfrastructure(graph);
    const iacFindings = result.findings.filter(f => f.ruleId === 'infra/missing-iac');
    expect(iacFindings).toHaveLength(0);
  });

  it('should detect hardcoded infrastructure references', () => {
    const cfg = makeNode('cfg:hard', 'config', 'src/config.ts', { code: 'arn:aws:s3:::my-bucket' });
    addNode(graph, cfg);
    const result = analyzeInfrastructure(graph);
    const hcFindings = result.findings.filter(f => f.ruleId === 'infra/hardcoded-reference');
    expect(hcFindings.length).toBeGreaterThan(0);
  });

  it('should detect missing monitoring', () => {
    const svc = makeNode('svc:api', 'service', 'src/api.ts', { hasMonitoring: false });
    addNode(graph, svc);
    const result = analyzeInfrastructure(graph);
    const monFindings = result.findings.filter(f => f.ruleId === 'infra/missing-monitoring');
    expect(monFindings.length).toBeGreaterThan(0);
  });

  it('should not flag services with monitoring', () => {
    const svc = makeNode('svc:api', 'service', 'src/api.ts', { hasMonitoring: true });
    addNode(graph, svc);
    const result = analyzeInfrastructure(graph);
    const monFindings = result.findings.filter(f => f.ruleId === 'infra/missing-monitoring' && f.affectedNodes.includes(svc.id));
    expect(monFindings).toHaveLength(0);
  });

  it('should detect resource drift', () => {
    const cfg = makeNode('cfg:infra', 'config', 'src/infra.ts', { resourceDrift: [{ resource: 'ecs-cluster', expected: '2 instances', actual: '3 instances' }] });
    addNode(graph, cfg);
    const result = analyzeInfrastructure(graph);
    const driftFindings = result.findings.filter(f => f.ruleId === 'infra/resource-drift');
    expect(driftFindings.length).toBeGreaterThan(0);
  });

  it('should detect missing backup configuration', () => {
    const db = makeNode('svc:db', 'service', 'src/database.ts', { isDatabase: true, hasBackup: false });
    addNode(graph, db);
    const result = analyzeInfrastructure(graph);
    const backupFindings = result.findings.filter(f => f.ruleId === 'infra/missing-backup');
    expect(backupFindings.length).toBeGreaterThan(0);
  });

  it('should set correct evidenceType on all findings', () => {
    const svc = makeNode('svc:api', 'service', 'src/api.ts');
    addNode(graph, svc);
    const result = analyzeInfrastructure(graph);
    for (const finding of result.findings) {
      expect(finding.evidenceType).toBeDefined();
      expect(['measured', 'detected', 'estimated']).toContain(finding.evidenceType);
    }
  });

  it('should return correct category and analyzer name', () => {
    const result = analyzeInfrastructure(graph);
    expect(result.analyzer).toBe('infrastructure');
    expect(result.category).toBe('infrastructure');
  });
});
