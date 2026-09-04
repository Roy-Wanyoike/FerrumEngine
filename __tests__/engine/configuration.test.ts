/**
 * Tests for the Configuration Analyzer.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createGraph, addNode, connect } from '@/engine/core/graph';
import { analyzeConfiguration } from '@/engine/analyzer/configuration';
import type { GraphNode, ApplicationGraph } from '@/engine/core/types';

function makeNode(id: string, kind: GraphNode['kind'] = 'config', path: string = id, meta: Record<string, unknown> = {}): GraphNode {
  return { id, name: id, kind, path, language: 'ts', loc: [1, 10], meta, contentHash: 'abc' };
}

describe('Configuration Analyzer', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    graph = createGraph('/test/project');
  });

  it('should detect missing env var validation', () => {
    const cfg = makeNode('cfg:main', 'config', 'src/config.ts', { envVarReferences: ['DATABASE_URL'] });
    addNode(graph, cfg);
    const result = analyzeConfiguration(graph, { requiredEnvVars: ['DATABASE_URL'] });
    const envFindings = result.findings.filter(f => f.ruleId === 'config/missing-env-validation');
    expect(envFindings.length).toBeGreaterThan(0);
    expect(envFindings[0]!.evidenceType).toBe('detected');
  });

  it('should not flag validated env vars', () => {
    const cfg = makeNode('cfg:main', 'config', 'src/config.ts', { validatesEnv: true, envVars: ['DATABASE_URL'] });
    addNode(graph, cfg);
    const result = analyzeConfiguration(graph, { requiredEnvVars: ['DATABASE_URL'] });
    const envFindings = result.findings.filter(f => f.ruleId === 'config/missing-env-validation');
    expect(envFindings).toHaveLength(0);
  });

  it('should detect hardcoded config values', () => {
    const cfg = makeNode('cfg:hard', 'config', 'src/hard.ts', { code: 'const url = "http://api.example.com:3000";' });
    addNode(graph, cfg);
    const result = analyzeConfiguration(graph);
    const hcFindings = result.findings.filter(f => f.ruleId === 'config/hardcoded-value');
    expect(hcFindings.length).toBeGreaterThan(0);
    expect(hcFindings[0]!.evidenceType).toBe('detected');
  });

  it('should detect config type mismatches', () => {
    const cfg = makeNode('cfg:type', 'config', 'src/types.ts', { typeMismatches: [{ key: 'PORT', expected: 'number', actual: 'string' }] });
    addNode(graph, cfg);
    const result = analyzeConfiguration(graph);
    const typeFindings = result.findings.filter(f => f.ruleId === 'config/type-mismatch');
    expect(typeFindings.length).toBeGreaterThan(0);
  });

  it('should detect missing .env.example file', () => {
    const cfg = makeNode('cfg:env', 'config', 'src/env.ts', { envVarReferences: ['API_KEY', 'DB_URL'] });
    addNode(graph, cfg);
    const result = analyzeConfiguration(graph);
    const exampleFindings = result.findings.filter(f => f.ruleId === 'config/missing-env-example');
    expect(exampleFindings.length).toBeGreaterThan(0);
  });

  it('should detect .env.example gaps', () => {
    const cfg = makeNode('cfg:env', 'config', 'src/env.ts', { envVarReferences: ['API_KEY', 'DB_URL'] });
    const example = makeNode('cfg:example', 'config', '.env.example', { isEnvExample: true, envVars: ['API_KEY'] });
    addNode(graph, cfg); addNode(graph, example);
    const result = analyzeConfiguration(graph);
    const gapFindings = result.findings.filter(f => f.ruleId === 'config/env-example-gaps');
    expect(gapFindings.length).toBeGreaterThan(0);
  });

  it('should detect config drift', () => {
    const cfg = makeNode('cfg:drift', 'config', 'src/config.ts', { configDrift: [{ key: 'CACHE_TTL', env1: 'staging', env2: 'production', value1: '300', value2: '3600' }] });
    addNode(graph, cfg);
    const result = analyzeConfiguration(graph);
    const driftFindings = result.findings.filter(f => f.ruleId === 'config/config-drift');
    expect(driftFindings.length).toBeGreaterThan(0);
  });

  it('should set correct evidenceType on all findings', () => {
    const cfg = makeNode('cfg:main', 'config', 'src/config.ts', { envVarReferences: ['DATABASE_URL'] });
    addNode(graph, cfg);
    const result = analyzeConfiguration(graph, { requiredEnvVars: ['DATABASE_URL'] });
    for (const finding of result.findings) {
      expect(finding.evidenceType).toBeDefined();
      expect(['measured', 'detected', 'estimated']).toContain(finding.evidenceType);
    }
  });

  it('should return correct category and analyzer name', () => {
    const result = analyzeConfiguration(graph);
    expect(result.analyzer).toBe('configuration');
    expect(result.category).toBe('configuration');
  });
});
