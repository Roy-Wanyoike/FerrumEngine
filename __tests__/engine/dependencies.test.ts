/**
 * Tests for the Dependency Analyzer.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createGraph, addNode, connect } from '@/engine/core/graph';
import { analyzeDependencies } from '@/engine/analyzer/dependencies';
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

describe('Dependencies Analyzer', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    graph = createGraph('/test/project');
  });

  it('should detect outdated dependencies', () => {
    const pkg = makeNode('pkg:react', 'package', 'node_modules/react', {
      installedMajor: 16,
      latestMajor: 18,
      installedVersion: '16.8.0',
      latestVersion: '18.2.0',
    });
    addNode(graph, pkg);

    const result = analyzeDependencies(graph);
    const outdatedFindings = result.findings.filter(f => f.ruleId === 'deps/outdated');
    expect(outdatedFindings.length).toBeGreaterThan(0);
  });

  it('should detect duplicate dependency versions', () => {
    const pkg1 = makeNode('pkg:lodash', 'package', 'node_modules/lodash', {
      installedVersion: '4.17.21',
    });
    pkg1.name = 'lodash';
    const pkg2 = makeNode('pkg:lodash2', 'package', 'node_modules/some-dep/node_modules/lodash', {
      installedVersion: '3.10.1',
    });
    pkg2.name = 'lodash';
    addNode(graph, pkg1);
    addNode(graph, pkg2);

    const result = analyzeDependencies(graph);
    const dupFindings = result.findings.filter(f => f.ruleId === 'deps/duplicate-versions');
    expect(dupFindings.length).toBeGreaterThan(0);
    expect(dupFindings[0]!.title).toContain('lodash');
  });

  it('should detect unused dependencies', () => {
    const pkg = makeNode('pkg:moment', 'package', 'node_modules/moment', {
      isDevDependency: false,
    });
    addNode(graph, pkg);
    // No import edges pointing to this package

    const result = analyzeDependencies(graph);
    const unusedFindings = result.findings.filter(f => f.ruleId === 'deps/unused');
    expect(unusedFindings.length).toBeGreaterThan(0);
    expect(unusedFindings[0]!.severity).toBe('low');
  });

  it('should detect non-semver git dependencies', () => {
    const pkg = makeNode('pkg:custom-lib', 'package', 'node_modules/custom-lib', {
      installedVersion: 'github:user/repo#abc123',
    });
    addNode(graph, pkg);

    const result = analyzeDependencies(graph);
    const nonSemverFindings = result.findings.filter(f => f.ruleId === 'deps/non-semver');
    expect(nonSemverFindings.length).toBeGreaterThan(0);
  });

  it('should detect heavy dependencies', () => {
    const pkg = makeNode('pkg:three', 'package', 'node_modules/three');
    pkg.name = 'three';
    addNode(graph, pkg);

    const result = analyzeDependencies(graph);
    const heavyFindings = result.findings.filter(f => f.ruleId === 'deps/heavy-package');
    expect(heavyFindings.length).toBeGreaterThan(0);
    expect(heavyFindings[0]!.title).toContain('three');
  });

  it('should detect monorepo dependency cycles', () => {
    const modA = makeNode('mod:pkg-a', 'module', 'packages/pkg-a/index.ts');
    const modB = makeNode('mod:pkg-b', 'module', 'packages/pkg-b/index.ts');
    addNode(graph, modA);
    addNode(graph, modB);
    connect(graph, modA.id, modB.id, 'imports');
    connect(graph, modB.id, modA.id, 'imports');

    const result = analyzeDependencies(graph);
    const cycleFindings = result.findings.filter(f => f.ruleId === 'deps/monorepo-cycle');
    expect(cycleFindings.length).toBeGreaterThan(0);
    expect(cycleFindings[0]!.severity).toBe('high');
  });

  it('should return correct analysis metadata', () => {
    const result = analyzeDependencies(graph);
    expect(result.analyzer).toBe('dependencies');
    expect(result.category).toBe('dependencies');
    expect(result.summary).toBeDefined();
  });
});
