/**
 * Tests for the Architecture Drift Detector.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createGraph, addNode, connect } from '@/engine/core/graph';
import type { ApplicationGraph, GraphNode } from '@/engine/core/types';
import {
  captureBaseline,
  compareWithBaseline,
  detectStructuralDrift,
  detectRuleDrift,
  defaultLayerRules,
  calculateDriftScore,
  type LayerRule,
  type ArchitectureBaseline,
} from '@/engine/drift';

function makeNode(id: string, path: string, kind: GraphNode['kind'] = 'file'): GraphNode {
  return { id, name: id, kind, path, language: 'ts', loc: [1, 50], meta: {}, contentHash: 'abc' };
}

const SIMPLE_RULES: LayerRule[] = [
  { name: 'pages', allowedImporters: [], allowedImports: ['components', 'lib', 'utils'] },
  { name: 'components', allowedImporters: ['pages'], allowedImports: ['lib', 'utils'] },
  { name: 'lib', allowedImporters: ['pages', 'components'], allowedImports: ['utils'] },
  { name: 'utils', allowedImporters: ['pages', 'components', 'lib'], allowedImports: [] },
];

describe('Architecture Drift Detector', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    graph = createGraph('/test/project');
  });

  // ── captureBaseline ─────────────────────────────────────────────

  describe('captureBaseline', () => {
    it('should capture a baseline with correct node/edge counts', () => {
      addNode(graph, makeNode('a', 'src/lib/a.ts'));
      addNode(graph, makeNode('b', 'src/components/b.tsx'));
      connect(graph, 'b', 'a', 'imports');

      const baseline = captureBaseline(graph, SIMPLE_RULES);

      expect(baseline.stats.nodeCount).toBe(2);
      expect(baseline.stats.edgeCount).toBe(1);
      expect(baseline.nodeIds).toContain('a');
      expect(baseline.nodeIds).toContain('b');
      expect(baseline.timestamp).toBeGreaterThan(0);
      expect(baseline.rules).toBe(SIMPLE_RULES);
    });

    it('should use default Next.js rules when none provided', () => {
      addNode(graph, makeNode('a', 'src/lib/a.ts'));
      const baseline = captureBaseline(graph);

      expect(baseline.rules.length).toBeGreaterThan(0);
      expect(baseline.rules.some((r) => r.name === 'pages')).toBe(true);
      expect(baseline.rules.some((r) => r.name === 'components')).toBe(true);
    });

    it('should compute maxDepth and avgCoupling', () => {
      addNode(graph, makeNode('util', 'src/utils/ut.ts'));
      addNode(graph, makeNode('lib', 'src/lib/lib.ts'));
      addNode(graph, makeNode('comp', 'src/components/c.tsx'));
      connect(graph, 'lib', 'util', 'imports');
      connect(graph, 'comp', 'lib', 'imports');

      const baseline = captureBaseline(graph, SIMPLE_RULES);

      expect(baseline.stats.maxDepth).toBeGreaterThanOrEqual(1);
      expect(baseline.stats.avgCoupling).toBeGreaterThanOrEqual(0);
    });
  });

  // ── compareWithBaseline ──────────────────────────────────────────

  describe('compareWithBaseline', () => {
    it('should report no drift when graph is unchanged', () => {
      addNode(graph, makeNode('a', 'src/lib/a.ts'));
      addNode(graph, makeNode('b', 'src/components/b.tsx'));
      connect(graph, 'b', 'a', 'imports');

      const baseline = captureBaseline(graph, SIMPLE_RULES);
      const result = compareWithBaseline(graph, baseline);

      expect(result.summary.totalDrifts).toBe(0);
      expect(result.summary.newViolations).toBe(0);
      expect(result.summary.resolvedViolations).toBe(0);
      expect(result.summary.driftScore).toBe(100);
      expect(result.summary.structuralChanges.nodesAdded).toBe(0);
      expect(result.summary.structuralChanges.nodesRemoved).toBe(0);
    });

    it('should detect added and removed nodes', () => {
      addNode(graph, makeNode('a', 'src/lib/a.ts'));
      const baseline = captureBaseline(graph, SIMPLE_RULES);

      // Mutate: add a node, remove node 'a'
      const graph2 = createGraph('/test/project');
      addNode(graph2, makeNode('b', 'src/components/b.tsx'));

      const result = compareWithBaseline(graph2, baseline);

      expect(result.summary.structuralChanges.nodesAdded).toBe(1);
      expect(result.summary.structuralChanges.nodesRemoved).toBe(1);
      expect(result.summary.driftScore).toBeLessThan(100);
    });

    it('should detect new and resolved rule violations', () => {
      // Baseline: clean graph
      addNode(graph, makeNode('lib', 'src/lib/x.ts'));
      addNode(graph, makeNode('comp', 'src/components/y.tsx'));
      connect(graph, 'comp', 'lib', 'imports');
      const baseline = captureBaseline(graph, SIMPLE_RULES);

      // Current: add a violation — utils importing from components
      const graph2 = createGraph('/test/project');
      addNode(graph2, makeNode('lib', 'src/lib/x.ts'));
      addNode(graph2, makeNode('comp', 'src/components/y.tsx'));
      addNode(graph2, makeNode('util', 'src/utils/z.ts'));
      addNode(graph2, makeNode('comp2', 'src/components/w.tsx'));
      connect(graph2, 'comp', 'lib', 'imports');
      connect(graph2, 'util', 'comp2', 'imports'); // violation: utils → components

      const result = compareWithBaseline(graph2, baseline);

      expect(result.summary.newViolations).toBeGreaterThanOrEqual(1);
      expect(result.summary.driftScore).toBeLessThan(100);
    });
  });

  // ── detectStructuralDrift ────────────────────────────────────────

  describe('detectStructuralDrift', () => {
    it('should return zero changes for identical graphs', () => {
      addNode(graph, makeNode('a', 'src/a.ts'));
      const baseline = captureBaseline(graph, SIMPLE_RULES);
      const structural = detectStructuralDrift(graph, baseline);

      expect(structural.nodesAdded).toBe(0);
      expect(structural.nodesRemoved).toBe(0);
      expect(structural.edgesAdded).toBe(0);
      expect(structural.edgesRemoved).toBe(0);
    });

    it('should count edge changes', () => {
      addNode(graph, makeNode('a', 'src/a.ts'));
      addNode(graph, makeNode('b', 'src/b.ts'));
      const baseline = captureBaseline(graph, SIMPLE_RULES);

      // Add an edge
      connect(graph, 'a', 'b', 'imports');
      const structural = detectStructuralDrift(graph, baseline);

      expect(structural.edgesAdded).toBe(1);
    });
  });

  // ── detectRuleDrift ──────────────────────────────────────────────

  describe('detectRuleDrift', () => {
    it('should find no violations in a compliant graph', () => {
      addNode(graph, makeNode('comp', 'src/components/Button.tsx'));
      addNode(graph, makeNode('lib', 'src/lib/format.ts'));
      connect(graph, 'comp', 'lib', 'imports');

      const violations = detectRuleDrift(graph, SIMPLE_RULES);
      expect(violations).toHaveLength(0);
    });

    it('should detect when a lib module imports from components', () => {
      addNode(graph, makeNode('lib', 'src/lib/helper.ts'));
      addNode(graph, makeNode('comp', 'src/components/Card.tsx'));
      connect(graph, 'lib', 'comp', 'imports'); // lib → components is NOT in allowedImports for lib

      const violations = detectRuleDrift(graph, SIMPLE_RULES);
      expect(violations).toHaveLength(1);
      expect(violations[0]!.ruleId).toContain('lib-imports-components');
    });

    it('should return empty for empty rules', () => {
      addNode(graph, makeNode('a', 'src/a.ts'));
      const violations = detectRuleDrift(graph, []);
      expect(violations).toHaveLength(0);
    });
  });

  // ── defaultLayerRules ────────────────────────────────────────────

  describe('defaultLayerRules', () => {
    it('should return rules for next.js', () => {
      const rules = defaultLayerRules('next');
      expect(rules.length).toBeGreaterThan(0);
      expect(rules.some((r) => r.name === 'pages')).toBe(true);
      expect(rules.some((r) => r.name === 'components')).toBe(true);
      expect(rules.some((r) => r.name === 'hooks')).toBe(true);
    });

    it('should return rules for react', () => {
      const rules = defaultLayerRules('react');
      expect(rules.length).toBeGreaterThan(0);
      expect(rules.some((r) => r.name === 'components')).toBe(true);
      expect(rules.some((r) => r.name === 'hooks')).toBe(true);
    });

    it('should return rules for vue', () => {
      const rules = defaultLayerRules('vue');
      expect(rules.length).toBeGreaterThan(0);
      expect(rules.some((r) => r.name === 'views')).toBe(true);
      expect(rules.some((r) => r.name === 'composables')).toBe(true);
    });

    it('should return rules for svelte', () => {
      const rules = defaultLayerRules('svelte');
      expect(rules.length).toBeGreaterThan(0);
      expect(rules.some((r) => r.name === 'routes')).toBe(true);
      expect(rules.some((r) => r.name === 'stores')).toBe(true);
    });

    it('should return generic rules for unknown framework', () => {
      const rules = defaultLayerRules('unknown-framework');
      expect(rules.length).toBeGreaterThan(0);
      expect(rules.some((r) => r.name === 'src')).toBe(true);
    });
  });

  // ── calculateDriftScore ──────────────────────────────────────────

  describe('calculateDriftScore', () => {
    it('should return 100 for no drift', () => {
      const baseline: ArchitectureBaseline = {
        id: 'test',
        timestamp: Date.now(),
        rules: SIMPLE_RULES,
        stats: { nodeCount: 0, edgeCount: 0, maxDepth: 0, avgCoupling: 0 },
        nodeIds: [],
        edgeIds: [],
        violationFingerprints: [],
      };
      const result = compareWithBaseline(graph, baseline);
      // Empty graph compared against empty baseline = no drift
      expect(result.summary.driftScore).toBe(100);
    });

    it('should decrease score for structural changes', () => {
      addNode(graph, makeNode('a', 'src/a.ts'));
      const baseline = captureBaseline(graph, SIMPLE_RULES);

      // Add a node
      const graph2 = createGraph('/test/project');
      addNode(graph2, makeNode('a', 'src/a.ts'));
      addNode(graph2, makeNode('b', 'src/b.ts'));

      const result = compareWithBaseline(graph2, baseline);
      expect(result.summary.driftScore).toBeLessThan(100);
      expect(result.summary.driftScore).toBeGreaterThan(0);
    });

    it('should decrease score for new violations', () => {
      addNode(graph, makeNode('a', 'src/utils/a.ts'));
      addNode(graph, makeNode('b', 'src/lib/b.ts'));
      connect(graph, 'b', 'a', 'imports');
      const baseline = captureBaseline(graph, SIMPLE_RULES);

      // Add a violation
      const graph2 = createGraph('/test/project');
      addNode(graph2, makeNode('a', 'src/utils/a.ts'));
      addNode(graph2, makeNode('b', 'src/lib/b.ts'));
      addNode(graph2, makeNode('c', 'src/components/c.tsx'));
      connect(graph2, 'b', 'a', 'imports');
      connect(graph2, 'a', 'c', 'imports'); // violation: utils → components

      const result = compareWithBaseline(graph2, baseline);
      expect(result.summary.driftScore).toBeLessThan(100);
    });

    it('should boost score for resolved violations', () => {
      // Baseline has a violation
      addNode(graph, makeNode('util', 'src/utils/a.ts'));
      addNode(graph, makeNode('comp', 'src/components/b.tsx'));
      connect(graph, 'util', 'comp', 'imports'); // violation
      const baseline = captureBaseline(graph, SIMPLE_RULES);

      // Remove the violating edge
      const graph2 = createGraph('/test/project');
      addNode(graph2, makeNode('util', 'src/utils/a.ts'));
      addNode(graph2, makeNode('comp', 'src/components/b.tsx'));

      const result = compareWithBaseline(graph2, baseline);
      expect(result.summary.resolvedViolations).toBe(1);
      expect(result.summary.driftScore).toBeGreaterThan(100 - 5); // structural cost for removing edge
    });
  });
});
