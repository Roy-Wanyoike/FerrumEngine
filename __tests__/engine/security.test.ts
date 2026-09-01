/**
 * Tests for the Security Analyzer.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createGraph, addNode, connect } from '@/engine/core/graph';
import { analyzeSecurity } from '@/engine/analyzer/security';
import type { GraphNode, ApplicationGraph } from '@/engine/core/types';

function makeNode(id: string, kind: GraphNode['kind'] = 'file', path: string = id, meta: Record<string, unknown> = {}): GraphNode {
  return {
    id,
    name: id,
    kind,
    path,
    language: 'ts',
    loc: [1, 10],
    meta,
    contentHash: 'abc',
  };
}

describe('Security Analyzer', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    graph = createGraph('/test/project');
  });

  it('should detect eval() usage', () => {
    const file = makeNode('file:bad', 'file', 'src/lib/parser.ts', {
      code: 'const result = eval(userInput);',
    });
    addNode(graph, file);

    const result = analyzeSecurity(graph);
    const evalFindings = result.findings.filter(f => f.ruleId === 'security/dangerous-pattern');
    expect(evalFindings.length).toBeGreaterThan(0);
    expect(evalFindings[0]!.severity).toBe('critical');
    expect(evalFindings[0]!.title).toContain('eval');
  });

  it('should detect dangerouslySetInnerHTML', () => {
    const comp = makeNode('comp:RichText', 'component', 'src/components/RichText.tsx', {
      code: '<div dangerouslySetInnerHTML={{ __html: rawHtml }} />',
    });
    addNode(graph, comp);

    const result = analyzeSecurity(graph);
    const dangerousFindings = result.findings.filter(f => f.ruleId === 'security/dangerous-pattern');
    expect(dangerousFindings.length).toBeGreaterThan(0);
    expect(dangerousFindings[0]!.severity).toBe('high');
  });

  it('should detect hardcoded secrets', () => {
    const config = makeNode('file:config', 'file', 'src/lib/config.ts', {
      code: "const API_KEY = 'sk-abcdefghijklmnopqrstuvwxyzaabbccddeeffgggghhhhiiiiiiiiiiiiii';",
    });
    addNode(graph, config);

    const result = analyzeSecurity(graph);
    const secretFindings = result.findings.filter(f => f.ruleId === 'security/hardcoded-secret');
    expect(secretFindings.length).toBeGreaterThan(0);
    expect(secretFindings[0]!.severity).toBe('high');
  });

  it('should detect missing CSRF protection on POST API routes', () => {
    const api = makeNode('api:createUser', 'api', 'app/api/users/route.ts', {
      method: 'POST',
      acceptsBody: true,
    });
    addNode(graph, api);

    const result = analyzeSecurity(graph);
    const csrfFindings = result.findings.filter(f => f.ruleId === 'security/missing-csrf');
    expect(csrfFindings.length).toBeGreaterThan(0);
    expect(csrfFindings[0]!.severity).toBe('high');
  });

  it('should detect non-HTTPS fetch calls', () => {
    const comp = makeNode('comp:Data', 'component', 'src/components/Data.tsx');
    addNode(graph, comp);
    // Add a fetch edge with http:// URL
    connect(graph, comp.id, 'some-target', 'fetches', { url: 'http://evil-api.example.com/data' });

    const result = analyzeSecurity(graph);
    const httpFindings = result.findings.filter(f => f.ruleId === 'security/non-https');
    expect(httpFindings.length).toBeGreaterThan(0);
    expect(httpFindings[0]!.severity).toBe('high');
  });

  it('should not flag localhost HTTP URLs', () => {
    const comp = makeNode('comp:Dev', 'component', 'src/components/Dev.tsx');
    addNode(graph, comp);
    connect(graph, comp.id, 'some-target', 'fetches', { url: 'http://localhost:3000/api/health' });

    const result = analyzeSecurity(graph);
    const httpFindings = result.findings.filter(f => f.ruleId === 'security/non-https');
    expect(httpFindings).toHaveLength(0);
  });

  it('should detect missing input validation on API routes', () => {
    const api = makeNode('api:search', 'api', 'app/api/search/route.ts', {
      method: 'POST',
      acceptsBody: true,
      hasValidation: false,
    });
    addNode(graph, api);

    const result = analyzeSecurity(graph);
    const validationFindings = result.findings.filter(f => f.ruleId === 'security/missing-input-validation');
    expect(validationFindings.length).toBeGreaterThan(0);
  });

  it('should return correct analysis metadata', () => {
    const result = analyzeSecurity(graph);
    expect(result.analyzer).toBe('security');
    expect(result.category).toBe('security');
    expect(result.summary).toBeDefined();
  });
});
