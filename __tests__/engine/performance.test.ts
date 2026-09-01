/**
 * Tests for the Performance Analyzer.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createGraph, addNode, connect, generateId } from '@/engine/core/graph';
import { analyzePerformance } from '@/engine/analyzer/performance';
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

describe('Performance Analyzer', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    graph = createGraph('/test/project');
  });

  it('should detect large bundle imports (lodash)', () => {
    const page = makeNode('page:Home', 'page', 'src/app/page.tsx');
    const lodash = makeNode('pkg:lodash', 'package', 'node_modules/lodash/index.js');
    addNode(graph, page);
    addNode(graph, lodash);
    connect(graph, page.id, lodash.id, 'imports');

    const result = analyzePerformance(graph);
    const heavyFindings = result.findings.filter(f => f.ruleId === 'perf/large-bundle-import');
    expect(heavyFindings.length).toBeGreaterThan(0);
    expect(heavyFindings[0]!.severity).toBe('low');
    expect(heavyFindings[0]!.title).toContain('lodash');
  });

  it('should detect missing dynamic imports for route-level packages', () => {
    const page = makeNode('page:Dashboard', 'page', 'src/app/dashboard/page.tsx');
    const heavyPkg = makeNode('pkg:three', 'package', 'node_modules/three/build/three.module.js');
    addNode(graph, page);
    addNode(graph, heavyPkg);
    connect(graph, page.id, heavyPkg.id, 'imports');

    const result = analyzePerformance(graph);
    const dynamicFindings = result.findings.filter(f => f.ruleId === 'perf/missing-dynamic-import');
    expect(dynamicFindings.length).toBeGreaterThan(0);
    expect(dynamicFindings[0]!.title).toContain('Dashboard');
  });

  it('should detect unoptimized image imports', () => {
    const comp = makeNode('comp:Hero', 'component', 'src/components/Hero.tsx', { usesNextImage: false, lazyLoading: false });
    const img = makeNode('asset:hero', 'asset', 'public/hero-banner.png');
    addNode(graph, comp);
    addNode(graph, img);
    connect(graph, comp.id, img.id, 'imports');

    const result = analyzePerformance(graph);
    const imgFindings = result.findings.filter(f => f.ruleId === 'perf/image-optimization');
    expect(imgFindings.length).toBeGreaterThan(0);
    expect(imgFindings[0]!.title).toContain('Hero');
  });

  it('should not flag images using next/image', () => {
    const comp = makeNode('comp:OptHero', 'component', 'src/components/OptHero.tsx', { usesNextImage: true });
    const img = makeNode('asset:hero2', 'asset', 'public/hero-banner.png');
    addNode(graph, comp);
    addNode(graph, img);
    connect(graph, comp.id, img.id, 'imports');

    const result = analyzePerformance(graph);
    const imgFindings = result.findings.filter(f => f.ruleId === 'perf/image-optimization');
    expect(imgFindings).toHaveLength(0);
  });

  it('should detect large component files', () => {
    const bigComp = makeNode('comp:BigComp', 'component', 'src/components/BigComp.tsx');
    // Override loc to simulate 400 lines
    bigComp.loc = [1, 401];
    addNode(graph, bigComp);

    const result = analyzePerformance(graph);
    const largeFindings = result.findings.filter(f => f.ruleId === 'perf/large-component');
    expect(largeFindings.length).toBeGreaterThan(0);
    expect(largeFindings[0]!.description).toContain('400');
  });

  it('should detect barrel file with many re-exports', () => {
    const barrel = makeNode('index:utils', 'file', 'src/utils/index.ts');
    addNode(graph, barrel);
    // Add 16 export edges
    for (let i = 0; i < 16; i++) {
      const mod = makeNode(`util:${i}`, 'utility', `src/utils/util${i}.ts`);
      addNode(graph, mod);
      connect(graph, barrel.id, mod.id, 'exports');
    }

    const result = analyzePerformance(graph);
    const barrelFindings = result.findings.filter(f => f.ruleId === 'perf/barrel-file');
    expect(barrelFindings.length).toBeGreaterThan(0);
    expect(barrelFindings[0]!.description).toContain('16');
  });

  it('should return correct analysis metadata', () => {
    const result = analyzePerformance(graph);
    expect(result.analyzer).toBe('performance');
    expect(result.category).toBe('performance');
    expect(result.durationMs).toBeGreaterThanOrEqual(0);
    expect(result.summary).toBeDefined();
  });
});
