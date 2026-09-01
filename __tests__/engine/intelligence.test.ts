/**
 * Tests for the Codebase Intelligence Engine.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createGraph, addNode, connect } from '@/engine/core/graph';
import type { ApplicationGraph, GraphNode } from '@/engine/core/types';
import {
  analyzeCodebase,
  queryIntel,
  inferPurpose,
  inferDomain,
  assessChangeFrequency,
  estimateComplexity,
  assessHealth,
  findCoChangedFiles,
  type CodeIntel,
} from '@/engine/intelligence';

function makeNode(
  id: string,
  path: string,
  kind: GraphNode['kind'] = 'file',
  meta: Record<string, unknown> = {},
): GraphNode {
  return { id, name: id, kind, path, language: 'ts', loc: [1, 50], meta, contentHash: 'abc' };
}

describe('Codebase Intelligence Engine', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    graph = createGraph('/test/project');
  });

  // ── analyzeCodebase ─────────────────────────────────────────────

  describe('analyzeCodebase', () => {
    it('should generate intelligence for every node in the graph', () => {
      addNode(graph, makeNode('a', 'src/components/Button.tsx', 'component'));
      addNode(graph, makeNode('b', 'src/lib/format.ts', 'utility'));

      const intel = analyzeCodebase(graph);
      expect(intel.size).toBe(2);
    });

    it('should include purpose, domain, complexity, health, and relationships', () => {
      addNode(graph, makeNode('btn', 'src/components/Button.tsx', 'component'));

      const intel = analyzeCodebase(graph);
      const btnIntel = intel.get('btn')!;

      expect(btnIntel.purpose).toBeTruthy();
      expect(btnIntel.domain).toBeTruthy();
      expect(btnIntel.complexity).toBeDefined();
      expect(btnIntel.complexity.cyclomatic).toBeGreaterThanOrEqual(1);
      expect(btnIntel.complexity.lines).toBe(49);
      expect(btnIntel.health).toBeDefined();
      expect(typeof btnIntel.health.score).toBe('number');
      expect(btnIntel.relationships).toBeDefined();
      expect(Array.isArray(btnIntel.relationships.upstream)).toBe(true);
      expect(Array.isArray(btnIntel.relationships.downstream)).toBe(true);
      expect(Array.isArray(btnIntel.relationships.coChanged)).toBe(true);
    });
  });

  // ── queryIntel ───────────────────────────────────────────────────

  describe('queryIntel', () => {
    it('should filter by path substring', () => {
      addNode(graph, makeNode('a', 'src/components/Button.tsx', 'component'));
      addNode(graph, makeNode('b', 'src/lib/format.ts', 'utility'));

      const results = queryIntel(graph, { path: 'components', includeUnused: true });
      expect(results).toHaveLength(1);
      expect(results[0]!.nodeId).toBe('a');
    });

    it('should filter by node kind', () => {
      addNode(graph, makeNode('a', 'src/components/Button.tsx', 'component'));
      addNode(graph, makeNode('b', 'src/lib/format.ts', 'utility'));

      const results = queryIntel(graph, { kind: 'utility', includeUnused: true });
      expect(results).toHaveLength(1);
      expect(results[0]!.nodeId).toBe('b');
    });

    it('should filter by domain', () => {
      addNode(graph, makeNode('login', 'src/auth/login.tsx', 'component'));
      addNode(graph, makeNode('util', 'src/utils/format.ts', 'utility'));

      const results = queryIntel(graph, { domain: 'auth', includeUnused: true });
      expect(results).toHaveLength(1);
      expect(results[0]!.nodeId).toBe('login');
    });

    it('should exclude unused nodes by default', () => {
      // 'orphan' has no dependents
      addNode(graph, makeNode('orphan', 'src/lib/orphan.ts', 'utility', { exported: true }));
      addNode(graph, makeNode('used', 'src/lib/used.ts', 'utility'));
      addNode(graph, makeNode('consumer', 'src/components/C.tsx', 'component'));
      addNode(graph, makeNode('page', 'src/app/page.tsx', 'page'));
      connect(graph, 'consumer', 'used', 'imports');
      connect(graph, 'page', 'consumer', 'imports'); // page depends on consumer

      const results = queryIntel(graph, { includeUnused: false });
      expect(results.some((r) => r.nodeId === 'orphan')).toBe(false);
      expect(results.some((r) => r.nodeId === 'consumer')).toBe(true);
    });
  });

  // ── inferPurpose ────────────────────────────────────────────────

  describe('inferPurpose', () => {
    it('should describe a component based on kind', () => {
      const node = makeNode('Button', 'src/components/Button.tsx', 'component');
      const purpose = inferPurpose(node, graph);
      expect(purpose.toLowerCase()).toContain('component');
    });

    it('should detect auth-related purpose from naming', () => {
      const node = makeNode('AuthProvider', 'src/auth/AuthProvider.tsx', 'component');
      const purpose = inferPurpose(node, graph);
      expect(purpose.toLowerCase()).toContain('auth');
    });

    it('should detect validation purpose from imports', () => {
      addNode(graph, makeNode('zod', 'node_modules/zod/index.ts', 'utility'));
      const node = makeNode('schema', 'src/lib/schema.ts', 'utility');
      addNode(graph, node);
      connect(graph, 'schema', 'zod', 'imports');

      const purpose = inferPurpose(node, graph);
      expect(purpose.toLowerCase()).toContain('validation');
    });

    it('should use explicit purpose from metadata when available', () => {
      const node = makeNode('x', 'src/x.ts', 'file', { purpose: 'Custom purpose' });
      const purpose = inferPurpose(node, graph);
      expect(purpose).toBe('Custom purpose');
    });
  });

  // ── inferDomain ─────────────────────────────────────────────────

  describe('inferDomain', () => {
    it('should infer auth domain from path', () => {
      const node = makeNode('login', 'src/auth/login.tsx', 'component');
      expect(inferDomain(node)).toBe('auth');
    });

    it('should infer payments domain from path', () => {
      const node = makeNode('checkout', 'src/app/checkout/page.tsx', 'page');
      expect(inferDomain(node)).toBe('payments');
    });

    it('should infer ui-kit domain for button/input components', () => {
      const node = makeNode('Button', 'src/components/Button.tsx', 'component');
      expect(inferDomain(node)).toBe('ui-kit');
    });

    it('should return "other" for unrecognizable paths', () => {
      const node = makeNode('foo', 'src/abc/xyz.ts', 'file');
      expect(inferDomain(node)).toBe('other');
    });
  });

  // ── assessChangeFrequency ───────────────────────────────────────

  describe('assessChangeFrequency', () => {
    it('should return "untested" when no test is associated', () => {
      const node = makeNode('util', 'src/utils/format.ts', 'utility');
      addNode(graph, node);

      expect(assessChangeFrequency(node, graph)).toBe('untested');
    });

    it('should return "stable" for a type with a test and few dependents', () => {
      addNode(graph, makeNode('types', 'src/types/index.ts', 'type'));
      addNode(graph, makeNode('types.test', 'src/types/index.test.ts', 'test'));

      const node = graph.nodes.get('types')!;
      expect(assessChangeFrequency(node, graph)).toBe('stable');
    });

    it('should return "volatile" for heavily depended-upon config', () => {
      addNode(graph, makeNode('config', 'src/config.ts', 'config'));
      addNode(graph, makeNode('config.test', 'src/config.test.ts', 'test'));

      // Create 10 dependents
      for (let i = 0; i < 10; i++) {
        const id = `dep${i}`;
        addNode(graph, makeNode(id, `src/components/Dep${i}.tsx`, 'component'));
        connect(graph, id, 'config', 'imports');
      }

      const node = graph.nodes.get('config')!;
      expect(assessChangeFrequency(node, graph)).toBe('volatile');
    });
  });

  // ── estimateComplexity ──────────────────────────────────────────

  describe('estimateComplexity', () => {
    it('should compute lines from loc range', () => {
      const node = makeNode('x', 'src/x.ts', 'file');
      const complexity = estimateComplexity(node);
      expect(complexity.lines).toBe(49);
    });

    it('should use metadata cyclomatic when available', () => {
      const node = makeNode('x', 'src/x.ts', 'file', { cyclomatic: 7 });
      const complexity = estimateComplexity(node);
      expect(complexity.cyclomatic).toBe(7);
    });

    it('should estimate cyclomatic from lines when not in metadata', () => {
      const node = makeNode('x', 'src/x.ts', 'file');
      const complexity = estimateComplexity(node);
      expect(complexity.cyclomatic).toBeGreaterThanOrEqual(1);
      expect(complexity.cognitive).toBeGreaterThanOrEqual(complexity.cyclomatic);
    });
  });

  // ── assessHealth ────────────────────────────────────────────────

  describe('assessHealth', () => {
    it('should give high score to a healthy node', () => {
      const intel: CodeIntel = {
        nodeId: 'a',
        purpose: 'Test',
        domain: 'utils',
        stakeholders: [],
        changeFrequency: 'stable',
        complexity: { cyclomatic: 2, cognitive: 3, lines: 30, importCount: 1 },
        health: { score: 100, issues: [], strengths: [] },
        relationships: { upstream: [], downstream: ['b'], coChanged: [] },
      };
      addNode(graph, makeNode('a', 'src/utils/a.ts', 'utility'));

      const health = assessHealth(intel, graph);
      expect(health.score).toBeGreaterThan(70);
      expect(health.strengths.length).toBeGreaterThan(0);
    });

    it('should penalize untested code', () => {
      const intel: CodeIntel = {
        nodeId: 'a',
        purpose: 'Test',
        domain: 'utils',
        stakeholders: [],
        changeFrequency: 'untested',
        complexity: { cyclomatic: 2, cognitive: 3, lines: 30, importCount: 0 },
        health: { score: 100, issues: [], strengths: [] },
        relationships: { upstream: [], downstream: [], coChanged: [] },
      };
      addNode(graph, makeNode('a', 'src/utils/a.ts', 'utility', { exported: true }));

      const health = assessHealth(intel, graph);
      expect(health.issues.some((i) => i.toLowerCase().includes('test'))).toBe(true);
    });

    it('should penalize high complexity', () => {
      const intel: CodeIntel = {
        nodeId: 'a',
        purpose: 'Test',
        domain: 'utils',
        stakeholders: [],
        changeFrequency: 'stable',
        complexity: { cyclomatic: 20, cognitive: 35, lines: 600, importCount: 2 },
        health: { score: 100, issues: [], strengths: [] },
        relationships: { upstream: [], downstream: ['b'], coChanged: [] },
      };
      addNode(graph, makeNode('a', 'src/utils/a.ts', 'utility'));

      const health = assessHealth(intel, graph);
      expect(health.issues.some((i) => i.toLowerCase().includes('complexity'))).toBe(true);
      expect(health.issues.some((i) => i.toLowerCase().includes('oversized'))).toBe(true);
      expect(health.score).toBeLessThan(80);
    });
  });

  // ── findCoChangedFiles ──────────────────────────────────────────

  describe('findCoChangedFiles', () => {
    it('should find sibling files in the same directory', () => {
      addNode(graph, makeNode('a', 'src/components/A.tsx', 'component'));
      addNode(graph, makeNode('b', 'src/components/B.tsx', 'component'));
      addNode(graph, makeNode('c', 'src/lib/C.ts', 'utility'));

      const node = graph.nodes.get('a')!;
      const coChanged = findCoChangedFiles(node, graph);

      expect(coChanged).toContain('b');
      expect(coChanged).not.toContain('c');
    });

    it('should find associated test files', () => {
      addNode(graph, makeNode('Button', 'src/components/Button.tsx', 'component'));
      addNode(graph, makeNode('Button.test', 'src/components/Button.test.tsx', 'test'));

      const node = graph.nodes.get('Button')!;
      const coChanged = findCoChangedFiles(node, graph);

      expect(coChanged).toContain('Button.test');
    });

    it('should find files with similar dependency sets (Jaccard)', () => {
      // a and b both import from sharedLib
      addNode(graph, makeNode('sharedLib', 'src/lib/shared.ts', 'utility'));
      addNode(graph, makeNode('a', 'src/components/A.tsx', 'component'));
      addNode(graph, makeNode('b', 'src/components/B.tsx', 'component'));
      addNode(graph, makeNode('c', 'src/components/C.tsx', 'component'));

      connect(graph, 'a', 'sharedLib', 'imports');
      connect(graph, 'b', 'sharedLib', 'imports');
      // c imports something different
      addNode(graph, makeNode('otherLib', 'src/lib/other.ts', 'utility'));
      connect(graph, 'c', 'otherLib', 'imports');

      const node = graph.nodes.get('a')!;
      const coChanged = findCoChangedFiles(node, graph);

      expect(coChanged).toContain('b');
    });

    it('should return empty for an isolated node', () => {
      addNode(graph, makeNode('lone', 'src/lone.ts', 'file'));

      const node = graph.nodes.get('lone')!;
      const coChanged = findCoChangedFiles(node, graph);

      expect(coChanged).toHaveLength(0);
    });
  });
});
