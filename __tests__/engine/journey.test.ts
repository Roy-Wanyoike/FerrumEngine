/**
 * Tests for the User Journey Engine.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { createGraph, addNode, connect } from '@/engine/core/graph';
import {
  mapJourney,
  findJourneyBottlenecks,
  detectDeadEnds,
  detectUnreachablePages,
  analyzeJourneyCoverage,
  suggestJourneys,
  resetJourneyCounters,
} from '@/engine/journey';
import type { ApplicationGraph, GraphNode, UserJourney } from '@/engine/core/types';

function makeNode(
  id: string,
  kind: GraphNode['kind'] = 'page',
  path: string = id,
  meta: Record<string, unknown> = {},
): GraphNode {
  return { id, name: id, kind, path, language: 'ts', loc: [1, 10], meta, contentHash: 'abc' };
}

describe('User Journey Engine', () => {
  let graph: ApplicationGraph;

  beforeEach(() => {
    resetJourneyCounters();
    graph = createGraph('/test/project');
  });

  it('should map a journey from an entry point through navigation edges', () => {
    addNode(graph, makeNode('home', 'page', 'src/app/page.tsx', { route: '/' }));
    addNode(graph, makeNode('dashboard', 'page', 'src/app/dashboard/page.tsx', { route: '/dashboard' }));
    addNode(graph, makeNode('settings', 'page', 'src/app/settings/page.tsx', { route: '/settings' }));
    connect(graph, 'home', 'dashboard', 'routes-to');
    connect(graph, 'dashboard', 'settings', 'routes-to');

    const result = mapJourney(graph, 'src/app/page.tsx');
    expect(result.steps.length).toBeGreaterThanOrEqual(3);
    expect(result.steps[0]!.type).toBe('entry');
    expect(result.analysis.totalSteps).toBeGreaterThanOrEqual(3);
    expect(result.analysis.risk).toBeDefined();
  });

  it('should detect dead end pages with no outgoing navigation', () => {
    addNode(graph, makeNode('home', 'page', 'src/app/page.tsx', { route: '/' }));
    addNode(graph, makeNode('dashboard', 'page', 'src/app/dashboard/page.tsx', { route: '/dashboard' }));
    connect(graph, 'home', 'dashboard', 'routes-to');
    // dashboard has no outgoing navigation → dead end

    const findings = detectDeadEnds(graph);
    const deadEnd = findings.find((f) => f.affectedNodes.includes('dashboard'));
    expect(deadEnd).toBeDefined();
    expect(deadEnd!.ruleId).toBe('journey:dead-end');
    expect(deadEnd!.severity).toBe('medium');
  });

  it('should not flag pages with outgoing navigation as dead ends', () => {
    addNode(graph, makeNode('home', 'page', 'src/app/page.tsx', { route: '/' }));
    addNode(graph, makeNode('about', 'page', 'src/app/about/page.tsx', { route: '/about' }));
    connect(graph, 'home', 'about', 'routes-to');
    connect(graph, 'about', 'home', 'routes-to');

    const findings = detectDeadEnds(graph);
    expect(findings).toHaveLength(0);
  });

  it('should detect unreachable pages from entry points', () => {
    addNode(graph, makeNode('home', 'page', 'src/app/page.tsx', { route: '/' }));
    addNode(graph, makeNode('dashboard', 'page', 'src/app/dashboard/page.tsx', { route: '/dashboard' }));
    addNode(graph, makeNode('orphan', 'page', 'src/app/orphan/page.tsx', { route: '/orphan' }));
    connect(graph, 'home', 'dashboard', 'routes-to');
    // orphan is not connected to anything

    const findings = detectUnreachablePages(graph, ['src/app/page.tsx']);
    const unreachable = findings.find((f) => f.affectedNodes.includes('orphan'));
    expect(unreachable).toBeDefined();
    expect(unreachable!.ruleId).toBe('journey:unreachable');
  });

  it('should not flag connected pages as unreachable', () => {
    addNode(graph, makeNode('home', 'page', 'src/app/page.tsx', { route: '/' }));
    addNode(graph, makeNode('dashboard', 'page', 'src/app/dashboard/page.tsx', { route: '/dashboard' }));
    connect(graph, 'home', 'dashboard', 'routes-to');

    const findings = detectUnreachablePages(graph, ['src/app/page.tsx']);
    expect(findings).toHaveLength(0);
  });

  it('should calculate journey coverage correctly', () => {
    addNode(graph, makeNode('home', 'page', 'src/app/page.tsx'));
    addNode(graph, makeNode('dashboard', 'page', 'src/app/dashboard/page.tsx'));
    addNode(graph, makeNode('settings', 'page', 'src/app/settings/page.tsx'));

    const journey: UserJourney = {
      name: 'Home to Dashboard',
      steps: [
        { name: 'Home', nodeIds: ['home'], tested: false, hasRecovery: false, securitySensitive: false },
        { name: 'Dashboard', nodeIds: ['dashboard'], tested: false, hasRecovery: false, securitySensitive: false },
      ],
      routes: ['/', '/dashboard'],
    };

    const coverage = analyzeJourneyCoverage(graph, [journey]);
    expect(coverage.total).toBe(3);
    expect(coverage.covered).toBe(2);
    expect(coverage.percentage).toBeCloseTo(67, 0);
    expect(coverage.uncovered).toContain('src/app/settings/page.tsx');
  });

  it('should report 100% coverage when all pages are in journeys', () => {
    addNode(graph, makeNode('home', 'page', 'src/app/page.tsx'));

    const journey: UserJourney = {
      name: 'Only page',
      steps: [
        { name: 'Home', nodeIds: ['home'], tested: false, hasRecovery: false, securitySensitive: false },
      ],
      routes: ['/'],
    };

    const coverage = analyzeJourneyCoverage(graph, [journey]);
    expect(coverage.percentage).toBe(100);
    expect(coverage.uncovered).toHaveLength(0);
  });

  it('should detect bottleneck findings for pages with heavy imports', () => {
    // Create a page with many imports
    addNode(graph, makeNode('heavy-page', 'page', 'src/app/heavy/page.tsx'));
    for (let i = 0; i < 20; i++) {
      const depId = `dep_${i}`;
      addNode(graph, makeNode(depId, 'file', `src/lib/util${i}.ts`));
      connect(graph, 'heavy-page', depId, 'imports');
    }

    const journey: UserJourney = {
      name: 'Heavy page journey',
      steps: [
        { name: 'Heavy', nodeIds: ['heavy-page'], tested: false, hasRecovery: false, securitySensitive: false },
      ],
      routes: ['/heavy'],
    };

    const bottlenecks = findJourneyBottlenecks(graph, journey);
    expect(bottlenecks.length).toBeGreaterThanOrEqual(1);
    expect(bottlenecks[0]!.ruleId).toBe('journey:heavy-imports');
  });

  it('should suggest journeys from graph structure', () => {
    addNode(graph, makeNode('home', 'page', 'src/app/page.tsx', { route: '/' }));
    addNode(graph, makeNode('about', 'page', 'src/app/about/page.tsx', { route: '/about' }));
    connect(graph, 'home', 'about', 'routes-to');

    const suggested = suggestJourneys(graph);
    expect(suggested.length).toBeGreaterThanOrEqual(1);
    // The auto-generated journey should start from home (entry point — no incoming routes-to)
    const entryJourney = suggested.find((j) => j.name.includes('Auto'));
    expect(entryJourney).toBeDefined();
    expect(entryJourney!.steps.length).toBeGreaterThanOrEqual(2);
    expect(entryJourney!.tags).toContain('auto-generated');
  });

  it('should suggest API journeys for API nodes', () => {
    addNode(graph, makeNode('user-page', 'page', 'src/app/user/page.tsx'));
    addNode(graph, makeNode('user-api', 'api', 'src/app/api/user/route.ts'));
    connect(graph, 'user-page', 'user-api', 'fetches');

    const suggested = suggestJourneys(graph);
    const apiJourney = suggested.find((j) => j.tags?.includes('api-journey'));
    expect(apiJourney).toBeDefined();
    expect(apiJourney!.steps.some((s) => s.nodeIds.includes('user-api'))).toBe(true);
  });
});
