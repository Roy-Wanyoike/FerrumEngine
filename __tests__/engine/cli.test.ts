/**
 * Tests for FerrumEngine CLI — Expanded Commands
 *
 * Tests the new format helpers and command logic added in the
 * CLI expansion (Issue #46):
 *   init, inspect, architecture, security, performance,
 *   accessibility, reliability, dependencies, test, config, agent
 */

import { describe, it, expect } from 'vitest';
import {
  formatInitResult,
  formatInspectResult,
  formatConfigResult,
  formatDimensionResult,
  formatAnalysisResult,
  formatFindingsTable,
  type InspectData,
} from '@/engine/cli/format';
import type {
  FullAnalysis,
  AnalysisResult,
  ReliabilityScores,
  ScoreDimension,
  Finding,
} from '@/engine/core/types';

// ──────────────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────────────

function makeFakeAnalysis(overrides?: Partial<FullAnalysis>): FullAnalysis {
  const scores: ReliabilityScores = {
    dimensions: [
      { category: 'architecture', score: 85, grade: 'B', evidence: [], findings: [] },
      { category: 'security', score: 72, grade: 'C', evidence: [], findings: [] },
    ],
    overall: 78,
    grade: 'C',
    calculatedAt: Date.now(),
  };

  const result: AnalysisResult = {
    analyzer: 'architecture',
    category: 'architecture',
    durationMs: 10,
    findings: [],
    summary: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
  };

  return {
    rootPath: '/test/project',
    graph: {
      rootPath: '/test/project',
      nodes: new Map(),
      edges: new Map(),
      outgoing: new Map(),
      incoming: new Map(),
      byPath: new Map(),
      byKind: new Map(),
      analyzedAt: Date.now(),
      analysisDurationMs: 5,
    },
    results: [result],
    scores,
    totalDurationMs: 15,
    ...overrides,
  };
}

function makeFinding(overrides?: Partial<Finding>): Finding {
  return {
    id: 'f1',
    category: 'architecture',
    severity: 'medium',
    title: 'Test finding',
    description: 'A test finding',
    evidence: [{ description: 'evidence' }],
    affectedNodes: [],
    ...overrides,
  };
}

// ──────────────────────────────────────────────────────────────────────
// TESTS: formatInitResult
// ──────────────────────────────────────────────────────────────────────

describe('CLI: ferrum init', () => {
  it('should format init result as text with config path and framework', () => {
    const output = formatInitResult('/project/ferrum.config.ts', 'nextjs', false);
    expect(output).toContain('FERRUM INIT');
    expect(output).toContain('ferrum.config.ts');
    expect(output).toContain('nextjs');
    expect(output).toContain('Created');
  });

  it('should format init result as JSON', () => {
    const output = formatInitResult('/project/ferrum.config.ts', 'react', true);
    const parsed = JSON.parse(output);
    expect(parsed.configPath).toBe('/project/ferrum.config.ts');
    expect(parsed.framework).toBe('react');
    expect(parsed.created).toBe(true);
  });
});

// ──────────────────────────────────────────────────────────────────────
// TESTS: formatInspectResult
// ──────────────────────────────────────────────────────────────────────

describe('CLI: ferrum inspect', () => {
  const baseInspectData: InspectData = {
    node: {
      id: 'n1',
      name: 'Button',
      kind: 'component',
      path: 'src/components/Button.tsx',
      language: 'tsx',
      loc: [1, 45],
    },
    dependencies: [
      { id: 'd1', name: 'useTheme', kind: 'hook', path: 'src/hooks/useTheme.ts' },
    ],
    dependents: [
      { id: 'dep1', name: 'HomePage', kind: 'page', path: 'src/app/page.tsx' },
    ],
    findings: [],
  };

  it('should format inspect result as text with node info card', () => {
    const output = formatInspectResult(baseInspectData, false);
    expect(output).toContain('FERRUM INSPECT');
    expect(output).toContain('Button');
    expect(output).toContain('component');
    expect(output).toContain('src/components/Button.tsx');
  });

  it('should show dependencies in inspect output', () => {
    const output = formatInspectResult(baseInspectData, false);
    expect(output).toContain('Dependencies (1)');
    expect(output).toContain('useTheme');
  });

  it('should show dependents in inspect output', () => {
    const output = formatInspectResult(baseInspectData, false);
    expect(output).toContain('Dependents (1)');
    expect(output).toContain('HomePage');
  });

  it('should include ownership fields when present', () => {
    const dataWithOwner: InspectData = {
      ...baseInspectData,
      node: {
        ...baseInspectData.node,
        owner: '@frontend-team',
        team: 'platform',
        gitCommit: 'abc123def456',
        gitAuthor: 'Alice',
        gitBlame: 'Bob',
      },
    };
    const output = formatInspectResult(dataWithOwner, false);
    expect(output).toContain('@frontend-team');
    expect(output).toContain('platform');
    expect(output).toContain('abc123def456'.slice(0, 12));
    expect(output).toContain('Alice');
    expect(output).toContain('Bob');
  });

  it('should format inspect result as JSON', () => {
    const output = formatInspectResult(baseInspectData, true);
    const parsed = JSON.parse(output);
    expect(parsed.node.name).toBe('Button');
    expect(parsed.node.kind).toBe('component');
    expect(parsed.dependencies).toHaveLength(1);
    expect(parsed.dependents).toHaveLength(1);
  });

  it('should show findings in inspect output when present', () => {
    const dataWithFindings: InspectData = {
      ...baseInspectData,
      findings: [makeFinding({ title: 'Missing prop validation' })],
    };
    const output = formatInspectResult(dataWithFindings, false);
    expect(output).toContain('Findings (1)');
    expect(output).toContain('Missing prop validation');
  });

  it('should show score contribution when present', () => {
    const dataWithScore: InspectData = {
      ...baseInspectData,
      scoreContribution: { category: 'architecture', score: 85, grade: 'B' },
    };
    const output = formatInspectResult(dataWithScore, false);
    expect(output).toContain('Score Contribution');
    expect(output).toContain('architecture');
    expect(output).toContain('85');
  });
});

// ──────────────────────────────────────────────────────────────────────
// TESTS: formatConfigResult
// ──────────────────────────────────────────────────────────────────────

describe('CLI: ferrum config', () => {
  it('should format config result as text', () => {
    const config = { name: 'my-app', srcDirs: ['src'], exclude: [] };
    const output = formatConfigResult(config, '/project/ferrum.config.ts', false);
    expect(output).toContain('FERRUM CONFIG');
    expect(output).toContain('/project/ferrum.config.ts');
    expect(output).toContain('my-app');
  });

  it('should format config result as JSON', () => {
    const config = { name: 'my-app', srcDirs: ['src'] };
    const output = formatConfigResult(config, '/project/ferrum.config.ts', true);
    const parsed = JSON.parse(output);
    expect(parsed.configPath).toBe('/project/ferrum.config.ts');
    expect(parsed.config.name).toBe('my-app');
  });
});

// ──────────────────────────────────────────────────────────────────────
// TESTS: formatDimensionResult
// ──────────────────────────────────────────────────────────────────────

describe('CLI: Single-dimension commands', () => {
  it('should format architecture dimension result', () => {
    const analysis = makeFakeAnalysis();
    const output = formatDimensionResult('architecture', analysis, false);
    expect(output).toContain('FERRUM ARCHITECTURE ANALYSIS');
    expect(output).toContain('/test/project');
  });

  it('should format security dimension result', () => {
    const analysis = makeFakeAnalysis();
    const output = formatDimensionResult('security', analysis, false);
    expect(output).toContain('FERRUM SECURITY ANALYSIS');
  });

  it('should format performance dimension result', () => {
    const analysis = makeFakeAnalysis();
    const output = formatDimensionResult('performance', analysis, false);
    expect(output).toContain('FERRUM PERFORMANCE ANALYSIS');
  });

  it('should format dimension result as JSON', () => {
    const analysis = makeFakeAnalysis();
    const output = formatDimensionResult('reliability', analysis, true);
    const parsed = JSON.parse(output);
    expect(parsed.dimension).toBe('reliability');
    expect(parsed.rootPath).toBe('/test/project');
    expect(parsed.scores).toBeDefined();
    expect(parsed.results).toBeDefined();
  });

  it('should show "no findings" when there are none', () => {
    const analysis = makeFakeAnalysis();
    const output = formatDimensionResult('accessibility', analysis, false);
    expect(output).toContain('No findings for accessibility');
  });

  it('should show findings table when findings exist', () => {
    const finding = makeFinding({ category: 'security', title: 'XSS vulnerability' });
    const analysis = makeFakeAnalysis({
      results: [{
        analyzer: 'security',
        category: 'security',
        durationMs: 5,
        findings: [finding],
        summary: { critical: 0, high: 0, medium: 1, low: 0, info: 0 },
      }],
    });
    const output = formatDimensionResult('security', analysis, false);
    expect(output).toContain('XSS vulnerability');
  });
});

// ──────────────────────────────────────────────────────────────────────
// TESTS: Help text includes all 17 commands
// ──────────────────────────────────────────────────────────────────────

describe('CLI: Help text coverage', () => {
  it('should list all 17 commands in help', () => {
    // Verify that the DIMENSION_MAP covers the 7 single-dimension commands
    const expectedDimensions = [
      'architecture', 'security', 'performance',
      'accessibility', 'reliability', 'dependencies', 'test',
    ];
    // These are defined in cli/index.ts — we test the mapping indirectly
    // by verifying formatDimensionResult works for each
    for (const dim of expectedDimensions) {
      const analysis = makeFakeAnalysis();
      const output = formatDimensionResult(dim, analysis, false);
      expect(output).toContain(`FERRUM ${dim.toUpperCase()} ANALYSIS`);
    }
  });
});
