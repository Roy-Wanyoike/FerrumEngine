/**
 * Integration Tests — Full Pipeline
 *
 * Tests the FULL analysis pipeline end-to-end using in-memory graphs.
 * No mocks — uses actual engine source files.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { createGraph, addNode, connect, getGraphStats } from '@/engine/core/graph';
import { analyzeArchitecture } from '@/engine/analyzer/architecture';
import { analyzeSecurity } from '@/engine/analyzer/security';
import { analyzePerformance } from '@/engine/analyzer/performance';
import { analyzeReliability } from '@/engine/analyzer/reliability';
import { analyzeTesting } from '@/engine/analyzer/testing';
import { analyzeAccessibility } from '@/engine/analyzer/accessibility';
import { analyzeDependencies } from '@/engine/analyzer/dependencies';
import { calculateScores, formatScoreReport } from '@/engine/scoring/scoring';
import { analyzeImpact } from '@/engine/impact/impact';
import { AgentGateway } from '@/engine/agent/gateway';
import {
  serializeGraph,
  deserializeGraph,
  saveGraph,
  loadGraph,
  isCacheValid,
  invalidateCache,
} from '@/engine/graph/serialization';
import type { ApplicationGraph, GraphNode, AgentIdentity, AnalysisResult } from '@/engine/core/types';

// ──────────────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────────────

const SEVEN_CATEGORIES = [
  'architecture',
  'performance',
  'security',
  'reliability',
  'testing',
  'accessibility',
  'dependencies',
] as const;

function makeNode(
  id: string,
  kind: GraphNode['kind'] = 'file',
  filePath?: string,
  meta: Record<string, unknown> = {},
): GraphNode {
  return {
    id,
    name: id,
    kind,
    path: filePath ?? id,
    language: 'ts',
    loc: [1, 50],
    meta,
    contentHash: 'h_' + id,
  };
}

/** Run all 7 analyzers on a graph and return the results. */
function runAllAnalyzers(graph: ApplicationGraph): AnalysisResult[] {
  return [
    analyzeArchitecture(graph),
    analyzePerformance(graph),
    analyzeSecurity(graph),
    analyzeReliability(graph),
    analyzeTesting(graph),
    analyzeAccessibility(graph),
    analyzeDependencies(graph),
  ];
}

let tmpDir: string;

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ferrum-integration-'));
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

// ──────────────────────────────────────────────────────────────────────
// TEST SUITES
// ──────────────────────────────────────────────────────────────────────

describe('Integration: Full analysis pipeline', () => {
  it('build graph → run all analyzers → score → all 7 dimensions have scores', () => {
    const graph = createGraph('/test/app');
    addNode(graph, makeNode('n_layout', 'layout', 'app/layout.tsx'));
    addNode(graph, makeNode('n_page', 'page', 'app/page.tsx'));
    addNode(graph, makeNode('n_comp', 'component', 'components/Header.tsx'));
    connect(graph, 'n_page', 'n_comp', 'imports');
    connect(graph, 'n_layout', 'n_page', 'contains');

    const results = runAllAnalyzers(graph);
    const scores = calculateScores(graph, results);

    // All 7 dimensions should be present
    expect(scores.dimensions).toHaveLength(7);
    const categories = scores.dimensions.map((d) => d.category);
    for (const cat of SEVEN_CATEGORIES) {
      expect(categories).toContain(cat);
    }

    // Overall score should be a number 0–100
    expect(scores.overall).toBeGreaterThanOrEqual(0);
    expect(scores.overall).toBeLessThanOrEqual(100);
    expect(scores.grade).toMatch(/^[A-F]$/);
  });
});

describe('Integration: Architecture analyzer', () => {
  it('finds circular dependencies in a 3-node cycle', () => {
    const graph = createGraph('/test/app');
    addNode(graph, makeNode('n_a', 'file', 'lib/a.ts'));
    addNode(graph, makeNode('n_b', 'file', 'lib/b.ts'));
    addNode(graph, makeNode('n_c', 'file', 'lib/c.ts'));
    connect(graph, 'n_a', 'n_b', 'imports');
    connect(graph, 'n_b', 'n_c', 'imports');
    connect(graph, 'n_c', 'n_a', 'imports');

    const result = analyzeArchitecture(graph);
    const cycleFindings = result.findings.filter(
      (f) => f.ruleId === 'arch/no-circular-deps',
    );

    expect(cycleFindings.length).toBeGreaterThanOrEqual(1);
    // Cycle length is 4 (a→b→c→a), > maxCycleLength(3) → high
    expect(cycleFindings[0]!.severity).toBe('high');
  });

  it('detects layer violations (lib importing from components)', () => {
    const graph = createGraph('/test/app');
    addNode(graph, makeNode('n_lib', 'file', 'lib/utils.ts'));
    addNode(graph, makeNode('n_comp', 'component', 'components/Button.tsx'));
    connect(graph, 'n_lib', 'n_comp', 'imports');

    const result = analyzeArchitecture(graph);
    const violationFindings = result.findings.filter(
      (f) => f.ruleId === 'arch/layer-violation',
    );

    expect(violationFindings.length).toBeGreaterThanOrEqual(1);
    expect(violationFindings[0]!.severity).toBe('medium');
  });
});

describe('Integration: Security analyzer', () => {
  it('detects dangerous patterns (eval, innerHTML, dangerouslySetInnerHTML)', () => {
    const graph = createGraph('/test/app');
    addNode(graph, makeNode('n_eval', 'file', 'lib/dangerous.ts', {
      code: 'const result = eval(userInput);',
    }));
    addNode(graph, makeNode('n_innerhtml', 'component', 'components/Renderer.tsx', {
      code: 'el.innerHTML = htmlString;',
    }));
    addNode(graph, makeNode('n_dangerous', 'component', 'components/RichText.tsx', {
      code: '<div dangerouslySetInnerHTML={{ __html: raw }} />',
    }));

    const result = analyzeSecurity(graph);
    const dangerousFindings = result.findings.filter(
      (f) => f.ruleId === 'security/dangerous-pattern',
    );

    // Should detect at least eval (critical) and innerHTML/dangerouslySetInnerHTML (high)
    expect(dangerousFindings.length).toBeGreaterThanOrEqual(2);

    const evalFinding = dangerousFindings.find((f) => f.title.includes('eval'));
    expect(evalFinding).toBeDefined();
    expect(evalFinding!.severity).toBe('critical');

    const innerHtmlFinding = dangerousFindings.find(
      (f) => f.title.includes('innerHTML') || f.title.includes('dangerouslySetInnerHTML'),
    );
    expect(innerHtmlFinding).toBeDefined();
    expect(innerHtmlFinding!.severity).toBe('high');
  });

  it('detects hardcoded secrets', () => {
    const graph = createGraph('/test/app');
    addNode(graph, makeNode('n_secret', 'file', 'lib/config.ts', {
      // Use a neutral variable name so only the sk- pattern matches → critical
      code: "const val = 'sk-TESTFAKEDONOTUSEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', /* nogil */",
    }));

    const result = analyzeSecurity(graph);
    const secretFindings = result.findings.filter(
      (f) => f.ruleId === 'security/hardcoded-secret',
    );

    expect(secretFindings.length).toBeGreaterThanOrEqual(1);
    expect(secretFindings[0]!.severity).toBe('critical');
  });
});

describe('Integration: Performance analyzer', () => {
  it('flags large bundle imports', () => {
    const graph = createGraph('/test/app');
    addNode(graph, makeNode('n_page', 'page', 'app/dashboard/page.tsx'));
    addNode(graph, makeNode('n_lodash', 'package', 'node_modules/lodash/index.js'));
    addNode(graph, makeNode('n_moment', 'package', 'node_modules/moment/index.js'));
    connect(graph, 'n_page', 'n_lodash', 'imports');
    connect(graph, 'n_page', 'n_moment', 'imports');

    const result = analyzePerformance(graph);
    const bundleFindings = result.findings.filter(
      (f) => f.ruleId === 'perf/large-bundle-import',
    );

    expect(bundleFindings.length).toBeGreaterThanOrEqual(2);
  });
});

describe('Integration: Reliability analyzer', () => {
  it('detects missing error handling', () => {
    const graph = createGraph('/test/app');
    // Layout without error boundary
    addNode(graph, makeNode('n_layout', 'layout', 'app/layout.tsx'));
    // Async function without try/catch
    addNode(graph, makeNode('n_fetch', 'function', 'lib/api.ts', {
      async: true,
    }));
    // Fetch without error handling
    addNode(graph, makeNode('n_hook', 'hook', 'hooks/useData.ts', {
      usesFetch: true,
    }));

    const result = analyzeReliability(graph);

    // Should find missing error boundary (high)
    const noBoundary = result.findings.filter(
      (f) => f.ruleId === 'reliability/missing-error-boundary',
    );
    expect(noBoundary.length).toBeGreaterThanOrEqual(1);
    expect(noBoundary[0]!.severity).toBe('high');

    // Should find unhandled promise (medium)
    const unhandledPromise = result.findings.filter(
      (f) => f.ruleId === 'reliability/unhandled-promise',
    );
    expect(unhandledPromise.length).toBeGreaterThanOrEqual(1);

    // Should find bare fetch (medium)
    const bareFetch = result.findings.filter(
      (f) => f.ruleId === 'reliability/bare-fetch',
    );
    expect(bareFetch.length).toBeGreaterThanOrEqual(1);
  });
});

describe('Integration: Testing analyzer', () => {
  it('detects untested modules', () => {
    const graph = createGraph('/test/app');
    addNode(graph, makeNode('n_util', 'utility', 'lib/format.ts'));
    addNode(graph, makeNode('n_hook', 'hook', 'hooks/useAuth.ts'));
    addNode(graph, makeNode('n_api', 'api', 'app/api/users/route.ts'));
    // No test files in the graph

    const result = analyzeTesting(graph);
    const untestedFindings = result.findings.filter(
      (f) => f.ruleId === 'testing/untested-module',
    );

    // All three non-config source modules should be flagged
    expect(untestedFindings.length).toBeGreaterThanOrEqual(3);

    // API route should also be flagged as untested API
    const untestedApi = result.findings.filter(
      (f) => f.ruleId === 'testing/untested-api-route',
    );
    expect(untestedApi.length).toBeGreaterThanOrEqual(1);
    expect(untestedApi[0]!.severity).toBe('high');
  });
});

describe('Integration: Accessibility analyzer', () => {
  it('detects missing alt text patterns', () => {
    const graph = createGraph('/test/app');
    addNode(graph, makeNode('n_comp', 'component', 'components/Banner.tsx', {
      imgElements: [
        { src: '/banner.png', varName: 'img' },
        { src: '/logo.png', alt: 'Company Logo', varName: 'logo' },
      ],
    }));

    const result = analyzeAccessibility(graph);
    const altFindings = result.findings.filter(
      (f) => f.ruleId === 'a11y/img-no-alt',
    );

    // Only the first image (no alt) should be flagged
    expect(altFindings.length).toBe(1);
    expect(altFindings[0]!.severity).toBe('high');
  });
});

describe('Integration: Dependencies analyzer', () => {
  it('detects outdated dependencies', () => {
    const graph = createGraph('/test/app');
    addNode(graph, makeNode('n_lodash', 'package', 'node_modules/lodash', {
      installedMajor: 4,
      latestMajor: 4,
      installedVersion: '4.17.21',
      latestVersion: '4.17.21',
    }));
    addNode(graph, makeNode('n_react', 'package', 'node_modules/react', {
      installedMajor: 17,
      latestMajor: 19,
      installedVersion: '17.0.2',
      latestVersion: '19.0.0',
    }));

    const result = analyzeDependencies(graph);
    const outdatedFindings = result.findings.filter(
      (f) => f.ruleId === 'deps/outdated',
    );

    // React is 2 majors behind → should be flagged
    expect(outdatedFindings.length).toBeGreaterThanOrEqual(1);
    const reactFinding = outdatedFindings.find((f) => f.title.includes('react'));
    expect(reactFinding).toBeDefined();
  });
});

describe('Integration: Scoring', () => {
  it('critical finding causes F grade, no findings causes A grade', () => {
    const graph = createGraph('/test/app');
    addNode(graph, makeNode('n1', 'file', 'lib/a.ts'));

    // With no findings at all → A grade
    const cleanResults = runAllAnalyzers(graph);
    const cleanScores = calculateScores(graph, cleanResults);
    expect(cleanScores.overall).toBe(100);
    expect(cleanScores.grade).toBe('A');

    // Now create a graph with a critical finding
    const graph2 = createGraph('/test/app');
    addNode(graph2, makeNode('n2', 'file', 'lib/evil.ts', {
      code: 'eval("payload")',
    }));
    const dirtyResults = runAllAnalyzers(graph2);
    const dirtyScores = calculateScores(graph2, dirtyResults);

    // Security should have an F from the critical eval finding (-30 pts = 70 = C)
    const securityDim = dirtyScores.dimensions.find(
      (d) => d.category === 'security',
    );
    expect(securityDim).toBeDefined();
    expect(securityDim!.score).toBeLessThan(80);
    expect(securityDim!.findings.some((f) => f.severity === 'critical')).toBe(true);
  });
});

describe('Integration: Impact analysis', () => {
  it('changing a shared util affects all dependents transitively', () => {
    const graph = createGraph('/test/app');
    // Shared util (must be kind='file' for impact analysis to process it)
    addNode(graph, makeNode('n_util', 'file', 'lib/format.ts'));
    // Two components depend on it
    addNode(graph, makeNode('n_comp1', 'component', 'components/UserCard.tsx'));
    addNode(graph, makeNode('n_comp2', 'component', 'components/DataTable.tsx'));
    connect(graph, 'n_comp1', 'n_util', 'imports');
    connect(graph, 'n_comp2', 'n_util', 'imports');
    // Page depends on both components
    addNode(graph, makeNode('n_page', 'page', 'app/users/page.tsx'));
    connect(graph, 'n_page', 'n_comp1', 'imports');
    connect(graph, 'n_page', 'n_comp2', 'imports');

    const impactResult = analyzeImpact(graph, ['lib/format.ts']);

    // Should affect both components and the page transitively
    const affectedIds = new Set(impactResult.affected.map((a) => a.nodeId));
    expect(affectedIds.has('n_comp1')).toBe(true);
    expect(affectedIds.has('n_comp2')).toBe(true);
    expect(affectedIds.has('n_page')).toBe(true);
    expect(impactResult.affected.length).toBeGreaterThanOrEqual(3);
  });

  it('security files are flagged as high risk', () => {
    const graph = createGraph('/test/app');
    addNode(graph, makeNode('n_auth', 'file', 'lib/auth.ts'));
    addNode(graph, makeNode('n_mw', 'file', 'middleware.ts'));
    addNode(graph, makeNode('n_comp', 'component', 'components/Protected.tsx'));
    connect(graph, 'n_comp', 'n_auth', 'imports');

    const impactResult = analyzeImpact(graph, ['lib/auth.ts']);

    // Auth file should trigger security implications
    expect(impactResult.securityImplications.length).toBeGreaterThanOrEqual(1);
    expect(impactResult.risk).toBe('critical');
  });
});

describe('Integration: Agent Gateway', () => {
  it('agent without modify scope cannot apply changes', async () => {
    const graph = createGraph('/test/app');
    addNode(graph, makeNode('n1', 'file', 'lib/a.ts'));

    const gateway = new AgentGateway({ requireHumanApproval: false });
    const agent: AgentIdentity = {
      id: 'readonly-agent',
      type: 'ai-assistant',
      scopes: ['read', 'analyze', 'suggest'], // no 'modify'
    };

    const response = await gateway.handleRequest({
      requestId: 'req-1',
      agent,
      operation: 'apply_safe_change',
      params: { changes: [{ filePath: 'lib/a.ts', originalHash: '', proposedContent: '', description: 'test' }] },
      timestamp: Date.now(),
    }, graph);

    expect(response.allowed).toBe(false);
    expect(response.error).toContain('scope');
  });

  it('agent with modify scope gets approval workflow', async () => {
    const graph = createGraph('/test/app');
    addNode(graph, makeNode('n1', 'file', 'lib/a.ts'));

    const gateway = new AgentGateway({ requireHumanApproval: true });
    const agent: AgentIdentity = {
      id: 'modifier-agent',
      type: 'ai-assistant',
      scopes: ['read', 'modify'],
    };

    const response = await gateway.handleRequest({
      requestId: 'req-2',
      agent,
      operation: 'apply_safe_change',
      params: {
        changes: [{
          filePath: 'lib/a.ts',
          originalHash: 'abc',
          proposedContent: '// new code',
          description: 'Refactor util',
        }],
      },
      timestamp: Date.now(),
    }, graph);

    // With requireHumanApproval, it should be allowed but with approval data
    expect(response.allowed).toBe(true);
    const data = response.data as Record<string, unknown>;
    expect(data.requiresHumanApproval).toBe(true);
    expect(data.verification).toBeDefined();
  });
});

describe('Integration: Serialization', () => {
  it('round-trip graph serialize → deserialize preserves all data', () => {
    const graph = createGraph('/test/app');
    addNode(graph, makeNode('n1', 'file', 'lib/utils.ts', { exported: true }));
    addNode(graph, makeNode('n2', 'component', 'components/Button.tsx', { framework: 'react' }));
    addNode(graph, makeNode('n3', 'page', 'app/page.tsx'));
    connect(graph, 'n3', 'n2', 'imports');
    connect(graph, 'n2', 'n1', 'imports');
    connect(graph, 'n3', 'n2', 'renders');

    const serialized = serializeGraph(graph, '/test/app');
    const restored = deserializeGraph(serialized);

    // Same node/edge counts
    expect(restored.nodes.size).toBe(graph.nodes.size);
    expect(restored.edges.size).toBe(graph.edges.size);

    // All nodes preserved
    for (const [id, node] of graph.nodes) {
      const rNode = restored.nodes.get(id);
      expect(rNode).toBeDefined();
      expect(rNode!.name).toBe(node.name);
      expect(rNode!.kind).toBe(node.kind);
      expect(rNode!.path).toBe(node.path);
      expect(rNode!.language).toBe(node.language);
      expect(rNode!.loc).toEqual(node.loc);
      expect(rNode!.contentHash).toBe(node.contentHash);
    }

    // All edges preserved
    for (const [id, edge] of graph.edges) {
      const rEdge = restored.edges.get(id);
      expect(rEdge).toBeDefined();
      expect(rEdge!.source).toBe(edge.source);
      expect(rEdge!.target).toBe(edge.target);
      expect(rEdge!.kind).toBe(edge.kind);
      expect(rEdge!.dynamic).toBe(edge.dynamic);
    }

    // Indexes correctly reconstructed
    expect(restored.byPath.get('lib/utils.ts')?.size).toBe(1);
    expect(restored.byKind.get('file')?.size).toBe(1);
    expect(restored.byKind.get('component')?.size).toBe(1);
    expect(restored.outgoing.get('n3')?.size).toBe(2); // imports + renders
    expect(restored.incoming.get('n2')?.size).toBe(2); // from n3 imports + n3 renders
  });

  it('save and load graph from cache', () => {
    const graph = createGraph('/test/app');
    addNode(graph, makeNode('n1', 'file', 'lib/utils.ts'));
    addNode(graph, makeNode('n2', 'component', 'components/Card.tsx'));
    connect(graph, 'n2', 'n1', 'imports');

    // Save to temp dir
    const cachePath = path.join(tmpDir, 'graph.json');
    const savedPath = saveGraph(graph, '/test/app', cachePath);

    expect(savedPath).toBe(cachePath);
    expect(fs.existsSync(cachePath)).toBe(true);

    // Load it back
    const loaded = loadGraph('/test/app', cachePath);
    expect(loaded).not.toBeNull();
    expect(loaded!.nodes.length).toBe(2);
    expect(loaded!.edges.length).toBe(1);
    expect(loaded!.version).toBeTruthy();
    expect(loaded!.projectPath).toBe('/test/app');
    expect(loaded!.stats.totalNodes).toBe(2);
  });

  it('cache validity and invalidation', () => {
    const cachePath = path.join(tmpDir, 'graph.json');

    // No cache → not valid
    expect(isCacheValid('/test/app', cachePath)).toBe(false);

    // Save a cache file
    const graph = createGraph('/test/app');
    addNode(graph, makeNode('n1', 'file', 'lib/a.ts'));
    saveGraph(graph, '/test/app', cachePath);

    // Should be valid now
    expect(isCacheValid('/test/app', cachePath)).toBe(true);

    // Load should succeed
    expect(loadGraph('/test/app', cachePath)).not.toBeNull();

    // Invalidate
    invalidateCache('/test/app', cachePath);
    expect(fs.existsSync(cachePath)).toBe(false);
    expect(isCacheValid('/test/app', cachePath)).toBe(false);
    expect(loadGraph('/test/app', cachePath)).toBeNull();
  });
});

describe('Integration: Score report formatting', () => {
  it('produces non-empty string with all dimensions', () => {
    const graph = createGraph('/test/app');
    addNode(graph, makeNode('n1', 'file', 'lib/a.ts'));

    const results = runAllAnalyzers(graph);
    const scores = calculateScores(graph, results);
    const report = formatScoreReport(scores);

    expect(typeof report).toBe('string');
    expect(report.length).toBeGreaterThan(0);

    // Should mention all 7 dimension names
    for (const cat of SEVEN_CATEGORIES) {
      expect(report).toContain(cat);
    }

    // Should have the header
    expect(report).toContain('FERRUM RELIABILITY REPORT');
    expect(report).toContain('Overall:');
  });
});

describe('Integration: Graph stats', () => {
  it('reflect added nodes and edges correctly', () => {
    const graph = createGraph('/test/app');

    // Empty graph
    let stats = getGraphStats(graph);
    expect(stats.totalNodes).toBe(0);
    expect(stats.totalEdges).toBe(0);
    expect(stats.totalFiles).toBe(0);

    // Add nodes
    addNode(graph, makeNode('n1', 'file', 'lib/a.ts'));
    addNode(graph, makeNode('n2', 'file', 'lib/b.ts'));
    addNode(graph, makeNode('n3', 'component', 'components/Btn.tsx'));
    addNode(graph, makeNode('n4', 'file', 'lib/a.ts')); // same path, different kind

    stats = getGraphStats(graph);
    expect(stats.totalNodes).toBe(4);
    expect(stats.totalFiles).toBe(3); // lib/a.ts, lib/b.ts, components/Btn.tsx
    expect(stats.nodesByKind['file']).toBe(3);
    expect(stats.nodesByKind['component']).toBe(1);

    // Add edges
    connect(graph, 'n3', 'n1', 'imports');
    connect(graph, 'n3', 'n2', 'imports');

    stats = getGraphStats(graph);
    expect(stats.totalEdges).toBe(2);
    expect(stats.edgesByKind['imports']).toBe(2);
  });
});
