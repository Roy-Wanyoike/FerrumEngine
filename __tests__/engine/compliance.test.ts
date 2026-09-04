/**
 * Tests for the Compliance Analyzer.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createGraph, addNode, connect } from '@/engine/core/graph';
import { analyzeCompliance } from '@/engine/analyzer/compliance';
import type { GraphNode, ApplicationGraph } from '@/engine/core/types';

function makeNode(id: string, kind: GraphNode['kind'] = 'package', path: string = id, meta: Record<string, unknown> = {}): GraphNode {
  return { id, name: id, kind, path, language: 'ts', loc: [1, 10], meta, contentHash: 'abc' };
}

describe('Compliance Analyzer', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    graph = createGraph('/test/project');
  });

  it('should detect license incompatibilities', () => {
    const pkg = makeNode('pkg:gpl', 'package', 'node_modules/gpl-lib/index.js', { license: 'GPL-3.0' });
    addNode(graph, pkg);
    const result = analyzeCompliance(graph);
    const licFindings = result.findings.filter(f => f.ruleId === 'compliance/license-incompat');
    expect(licFindings.length).toBeGreaterThan(0);
    expect(licFindings[0]!.evidenceType).toBe('detected');
  });

  it('should not flag compatible licenses', () => {
    const pkg = makeNode('pkg:mit', 'package', 'node_modules/mit-lib/index.js', { license: 'MIT' });
    addNode(graph, pkg);
    const result = analyzeCompliance(graph);
    const licFindings = result.findings.filter(f => f.ruleId === 'compliance/license-incompat');
    expect(licFindings).toHaveLength(0);
  });

  it('should detect missing license headers', () => {
    const file = makeNode('file:src', 'file', 'src/index.ts', { hasLicenseHeader: false });
    addNode(graph, file);
    const result = analyzeCompliance(graph);
    const hdrFindings = result.findings.filter(f => f.ruleId === 'compliance/missing-license-header');
    expect(hdrFindings.length).toBeGreaterThan(0);
  });

  it('should detect PII in logs', () => {
    const fn = makeNode('fn:logger', 'function', 'src/logger.ts', { loggedFields: ['email', 'userId'] });
    addNode(graph, fn);
    const result = analyzeCompliance(graph);
    const piiFindings = result.findings.filter(f => f.ruleId === 'compliance/pii-in-logs');
    expect(piiFindings.length).toBeGreaterThan(0);
    expect(piiFindings[0]!.severity).toBe('critical');
  });

  it('should detect PII stored without consent', () => {
    const store = makeNode('store:user', 'store', 'src/user-store.ts', { storesPii: true, hasConsentCheck: false });
    addNode(graph, store);
    const result = analyzeCompliance(graph);
    const consentFindings = result.findings.filter(f => f.ruleId === 'compliance/pii-no-consent');
    expect(consentFindings.length).toBeGreaterThan(0);
  });

  it('should detect SOC2 control gaps', () => {
    // Empty graph - no audit logging, access controls, or encryption
    const result = analyzeCompliance(graph);
    const soc2Findings = result.findings.filter(f => f.ruleId?.startsWith('compliance/soc2'));
    expect(soc2Findings.length).toBeGreaterThan(0);
  });

  it('should not flag SOC2 when controls exist', () => {
    const audit = makeNode('fn:audit', 'function', 'src/audit.ts', { auditLogging: true });
    const auth = makeNode('mw:auth', 'middleware', 'src/auth.ts', { authGuard: true });
    const enc = makeNode('svc:enc', 'service', 'src/enc.ts', { encryption: true });
    addNode(graph, audit); addNode(graph, auth); addNode(graph, enc);
    const result = analyzeCompliance(graph);
    const soc2Findings = result.findings.filter(f => f.ruleId?.startsWith('compliance/soc2'));
    expect(soc2Findings).toHaveLength(0);
  });

  it('should set correct evidenceType on all findings', () => {
    const pkg = makeNode('pkg:gpl', 'package', 'node_modules/gpl-lib/index.js', { license: 'GPL-3.0' });
    addNode(graph, pkg);
    const result = analyzeCompliance(graph);
    for (const finding of result.findings) {
      expect(finding.evidenceType).toBeDefined();
      expect(['measured', 'detected', 'estimated']).toContain(finding.evidenceType);
    }
  });

  it('should return correct category and analyzer name', () => {
    const result = analyzeCompliance(graph);
    expect(result.analyzer).toBe('compliance');
    expect(result.category).toBe('compliance');
  });
});
