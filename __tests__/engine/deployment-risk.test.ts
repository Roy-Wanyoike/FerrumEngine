/**
 * Tests for the Deployment Risk Analyzer.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createGraph, addNode, connect } from '@/engine/core/graph';
import { analyzeDeploymentRisk } from '@/engine/analyzer/deployment-risk';
import type { GraphNode, ApplicationGraph } from '@/engine/core/types';

function makeNode(id: string, kind: GraphNode['kind'] = 'service', path: string = id, meta: Record<string, unknown> = {}): GraphNode {
  return { id, name: id, kind, path, language: 'ts', loc: [1, 10], meta, contentHash: 'abc' };
}

describe('Deployment Risk Analyzer', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    graph = createGraph('/test/project');
  });

  it('should detect missing health checks', () => {
    const svc = makeNode('svc:api', 'service', 'src/api.ts', { hasHealthCheck: false });
    addNode(graph, svc);
    const result = analyzeDeploymentRisk(graph);
    const healthFindings = result.findings.filter(f => f.ruleId === 'deploy/missing-health-check');
    expect(healthFindings.length).toBeGreaterThan(0);
    expect(healthFindings[0]!.evidenceType).toBe('detected');
  });

  it('should not flag services with health checks', () => {
    const svc = makeNode('svc:api', 'service', 'src/api.ts', { hasHealthCheck: true });
    addNode(graph, svc);
    const result = analyzeDeploymentRisk(graph);
    const healthFindings = result.findings.filter(f => f.ruleId === 'deploy/missing-health-check' && f.affectedNodes.includes(svc.id));
    expect(healthFindings).toHaveLength(0);
  });

  it('should detect no rollback strategy', () => {
    const cfg = makeNode('cfg:deploy', 'config', '.github/workflows/deploy.yml', { isDeployConfig: true, hasRollback: false });
    addNode(graph, cfg);
    const result = analyzeDeploymentRisk(graph);
    const rbFindings = result.findings.filter(f => f.ruleId === 'deploy/no-rollback');
    expect(rbFindings.length).toBeGreaterThan(0);
  });

  it('should detect database migration risks', () => {
    const cfg = makeNode('cfg:migrate', 'config', 'src/migrate.ts', { migrations: [{ name: 'drop-users-col', risk: 'high', reversible: false }] });
    addNode(graph, cfg);
    const result = analyzeDeploymentRisk(graph);
    const migFindings = result.findings.filter(f => f.ruleId === 'deploy/migration-risk');
    expect(migFindings.length).toBeGreaterThan(0);
    expect(migFindings[0]!.severity).toBe('critical');
  });

  it('should detect config-dependent deployments', () => {
    const svc = makeNode('svc:api', 'service', 'src/api.ts', { configDependencies: ['DB_URL', 'REDIS_URL', 'S3_BUCKET'] });
    addNode(graph, svc);
    const result = analyzeDeploymentRisk(graph);
    const cfgFindings = result.findings.filter(f => f.ruleId === 'deploy/config-dependent');
    expect(cfgFindings.length).toBeGreaterThan(0);
  });

  it('should detect missing canary/blue-green deployment', () => {
    const svc = makeNode('svc:api', 'service', 'src/api.ts');
    addNode(graph, svc);
    const result = analyzeDeploymentRisk(graph);
    const canaryFindings = result.findings.filter(f => f.ruleId === 'deploy/no-canary-blue-green');
    expect(canaryFindings.length).toBeGreaterThan(0);
  });

  it('should not flag services with canary deployment', () => {
    const svc = makeNode('svc:api', 'service', 'src/api.ts', { canaryDeployment: true });
    addNode(graph, svc);
    const result = analyzeDeploymentRisk(graph);
    const canaryFindings = result.findings.filter(f => f.ruleId === 'deploy/no-canary-blue-green');
    expect(canaryFindings).toHaveLength(0);
  });

  it('should set correct evidenceType on all findings', () => {
    const svc = makeNode('svc:api', 'service', 'src/api.ts');
    addNode(graph, svc);
    const result = analyzeDeploymentRisk(graph);
    for (const finding of result.findings) {
      expect(finding.evidenceType).toBeDefined();
      expect(['measured', 'detected', 'estimated']).toContain(finding.evidenceType);
    }
  });

  it('should return correct category and analyzer name', () => {
    const result = analyzeDeploymentRisk(graph);
    expect(result.analyzer).toBe('deployment-risk');
    expect(result.category).toBe('deployment-risk');
  });
});
