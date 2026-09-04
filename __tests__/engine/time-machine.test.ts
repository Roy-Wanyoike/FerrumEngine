/**
 * Tests for the Software Time Machine.
 *
 * Since we can't rely on real git repos in tests, we test the analysis
 * logic directly with synthetic snapshots. Git integration is tested
 * via integration tests against real repositories.
 */

import { describe, it, expect } from 'vitest';
import type {
  TimeSnapshot,
  TemporalQuery,
  GraphStats,
} from '@/engine/time-machine/types';
import {
  findRegressions,
  findImprovements,
  findIntroductions,
  findResolutions,
  trackDriftOverTime,
  answerTemporalQuestion,
} from '@/engine/time-machine/analyzer';

// ──────────────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────────────

function makeSnapshot(overrides: Partial<TimeSnapshot> & { commit: string }): TimeSnapshot {
  return {
    timestamp: Date.now(),
    author: 'test-author',
    message: 'test commit',
    graphStats: {
      totalNodes: 100,
      totalEdges: 200,
      nodesByKind: {},
      edgesByKind: {},
      totalFiles: 50,
    },
    scores: {
      architecture: 80,
      performance: 85,
      security: 90,
      reliability: 75,
      testing: 70,
    },
    findingsCount: {
      critical: 0,
      high: 1,
      medium: 3,
      low: 5,
    },
    ...overrides,
  };
}

function makeGraphStats(overrides: Partial<GraphStats> = {}): GraphStats {
  return {
    totalNodes: 100,
    totalEdges: 200,
    nodesByKind: {},
    edgesByKind: {},
    totalFiles: 50,
    ...overrides,
  };
}

// ──────────────────────────────────────────────────────────────────────
// REGRESSION DETECTION
// ──────────────────────────────────────────────────────────────────────

describe('findRegressions', () => {
  it('should detect a score decrease as a regression', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', scores: { security: 90 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', scores: { security: 70 }, timestamp: 2000 }),
    ];

    const regressions = findRegressions(snapshots);
    expect(regressions).toHaveLength(1);
    expect(regressions[0].dimension).toBe('security');
    expect(regressions[0].from).toBe(90);
    expect(regressions[0].to).toBe(70);
    expect(regressions[0].delta).toBe(20);
    expect(regressions[0].commit).toBe('bbb');
  });

  it('should not report a score increase as a regression', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', scores: { security: 70 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', scores: { security: 90 }, timestamp: 2000 }),
    ];

    const regressions = findRegressions(snapshots);
    expect(regressions).toHaveLength(0);
  });

  it('should not report when score stays the same', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', scores: { security: 80 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', scores: { security: 80 }, timestamp: 2000 }),
    ];

    const regressions = findRegressions(snapshots);
    expect(regressions).toHaveLength(0);
  });

  it('should filter by dimension', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', scores: { security: 90, performance: 80 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', scores: { security: 70, performance: 60 }, timestamp: 2000 }),
    ];

    const regressions = findRegressions(snapshots, ['security']);
    expect(regressions).toHaveLength(1);
    expect(regressions[0].dimension).toBe('security');
  });

  it('should respect threshold', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', scores: { security: 90 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', scores: { security: 85 }, timestamp: 2000 }),
    ];

    // Threshold of 10 — a 5-point regression should be filtered out
    const regressions = findRegressions(snapshots, undefined, 10);
    expect(regressions).toHaveLength(0);
  });

  it('should detect multiple regressions across multiple snapshots', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', scores: { security: 90, performance: 85 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', scores: { security: 80, performance: 85 }, timestamp: 2000 }),
      makeSnapshot({ commit: 'ccc', scores: { security: 80, performance: 70 }, timestamp: 3000 }),
    ];

    const regressions = findRegressions(snapshots);
    expect(regressions).toHaveLength(2);
    expect(regressions[0].dimension).toBe('security');
    expect(regressions[1].dimension).toBe('performance');
  });

  it('should handle empty snapshots', () => {
    expect(findRegressions([])).toHaveLength(0);
    expect(findRegressions([makeSnapshot({ commit: 'aaa' })])).toHaveLength(0);
  });

  it('should include author and timestamp in regression', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', author: 'alice', scores: { security: 90 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', author: 'bob', scores: { security: 70 }, timestamp: 2000 }),
    ];

    const regressions = findRegressions(snapshots);
    expect(regressions[0].author).toBe('bob');
    expect(regressions[0].timestamp).toBe(2000);
  });
});

// ──────────────────────────────────────────────────────────────────────
// IMPROVEMENT DETECTION
// ──────────────────────────────────────────────────────────────────────

describe('findImprovements', () => {
  it('should detect a score increase as an improvement', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', scores: { security: 70 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', scores: { security: 90 }, timestamp: 2000 }),
    ];

    const improvements = findImprovements(snapshots);
    expect(improvements).toHaveLength(1);
    expect(improvements[0].dimension).toBe('security');
    expect(improvements[0].delta).toBe(20);
  });

  it('should not report a score decrease as an improvement', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', scores: { security: 90 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', scores: { security: 70 }, timestamp: 2000 }),
    ];

    const improvements = findImprovements(snapshots);
    expect(improvements).toHaveLength(0);
  });

  it('should respect threshold for improvements', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', scores: { security: 70 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', scores: { security: 75 }, timestamp: 2000 }),
    ];

    const improvements = findImprovements(snapshots, undefined, 10);
    expect(improvements).toHaveLength(0);
  });

  it('should filter improvements by dimension', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', scores: { security: 70, performance: 60 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', scores: { security: 90, performance: 80 }, timestamp: 2000 }),
    ];

    const improvements = findImprovements(snapshots, ['performance']);
    expect(improvements).toHaveLength(1);
    expect(improvements[0].dimension).toBe('performance');
  });

  it('should include from and to scores in improvement', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', scores: { testing: 50 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', scores: { testing: 85 }, timestamp: 2000 }),
    ];

    const improvements = findImprovements(snapshots);
    expect(improvements[0].from).toBe(50);
    expect(improvements[0].to).toBe(85);
    expect(improvements[0].delta).toBe(35);
  });
});

// ──────────────────────────────────────────────────────────────────────
// INTRODUCTION FINDING
// ──────────────────────────────────────────────────────────────────────

describe('findIntroductions', () => {
  it('should detect when a finding first appears', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', findingsCount: { critical: 0, high: 0 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', findingsCount: { critical: 1, high: 0 }, timestamp: 2000 }),
    ];

    const introductions = findIntroductions(snapshots);
    expect(introductions).toHaveLength(1);
    expect(introductions[0].finding).toBe('critical');
    expect(introductions[0].commit).toBe('bbb');
  });

  it('should not re-report findings already seen in earlier snapshots', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', findingsCount: { critical: 1 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', findingsCount: { critical: 2 }, timestamp: 2000 }),
    ];

    const introductions = findIntroductions(snapshots);
    expect(introductions).toHaveLength(1);
    expect(introductions[0].commit).toBe('aaa');
  });

  it('should handle empty snapshots', () => {
    expect(findIntroductions([])).toHaveLength(0);
  });

  it('should handle multiple new findings in one snapshot', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', findingsCount: {}, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', findingsCount: { critical: 1, high: 2, medium: 3 }, timestamp: 2000 }),
    ];

    const introductions = findIntroductions(snapshots);
    expect(introductions).toHaveLength(3);
  });

  it('should set category equal to the finding key', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', findingsCount: { high: 0 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', findingsCount: { high: 1 }, timestamp: 2000 }),
    ];

    const introductions = findIntroductions(snapshots);
    expect(introductions[0].category).toBe('high');
  });

  it('should include author and timestamp', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', findingsCount: { low: 0 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', author: 'charlie', findingsCount: { low: 5 }, timestamp: 2000 }),
    ];

    const introductions = findIntroductions(snapshots);
    expect(introductions[0].author).toBe('charlie');
    expect(introductions[0].timestamp).toBe(2000);
  });
});

// ──────────────────────────────────────────────────────────────────────
// RESOLUTION TRACKING
// ──────────────────────────────────────────────────────────────────────

describe('findResolutions', () => {
  it('should detect when a finding is resolved', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', findingsCount: { critical: 1 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', findingsCount: { critical: 0 }, timestamp: 2000 }),
    ];

    const resolutions = findResolutions(snapshots);
    expect(resolutions).toHaveLength(1);
    expect(resolutions[0].finding).toBe('critical');
    expect(resolutions[0].introducedAt).toBe('aaa');
    expect(resolutions[0].resolvedAt).toBe('bbb');
    expect(resolutions[0].duration).toBe(1000);
  });

  it('should calculate duration correctly', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', findingsCount: { high: 2 }, timestamp: 5000 }),
      makeSnapshot({ commit: 'bbb', findingsCount: { high: 2 }, timestamp: 10000 }),
      makeSnapshot({ commit: 'ccc', findingsCount: { high: 0 }, timestamp: 15000 }),
    ];

    const resolutions = findResolutions(snapshots);
    expect(resolutions).toHaveLength(1);
    expect(resolutions[0].duration).toBe(10000); // 15000 - 5000
  });

  it('should not report resolution for findings still present', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', findingsCount: { critical: 1 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', findingsCount: { critical: 1 }, timestamp: 2000 }),
    ];

    const resolutions = findResolutions(snapshots);
    expect(resolutions).toHaveLength(0);
  });

  it('should handle empty snapshots', () => {
    expect(findResolutions([])).toHaveLength(0);
  });

  it('should set category on resolution', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', findingsCount: { medium: 3 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', findingsCount: { medium: 0 }, timestamp: 2000 }),
    ];

    const resolutions = findResolutions(snapshots);
    expect(resolutions[0].category).toBe('medium');
  });
});

// ──────────────────────────────────────────────────────────────────────
// DRIFT TRACKING
// ──────────────────────────────────────────────────────────────────────

describe('trackDriftOverTime', () => {
  it('should detect structural drift (node changes)', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({
        commit: 'aaa',
        graphStats: makeGraphStats({ totalNodes: 100, totalEdges: 200, totalFiles: 50 }),
        timestamp: 1000,
      }),
      makeSnapshot({
        commit: 'bbb',
        graphStats: makeGraphStats({ totalNodes: 110, totalEdges: 200, totalFiles: 50 }),
        timestamp: 2000,
      }),
    ];

    const drift = trackDriftOverTime(snapshots);
    expect(drift).toHaveLength(1);
    expect(drift[0].nodeDelta).toBe(10);
    expect(drift[0].edgeDelta).toBe(0);
  });

  it('should detect score drift', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({
        commit: 'aaa',
        graphStats: makeGraphStats({ totalNodes: 100 }),
        scores: { security: 90 },
        timestamp: 1000,
      }),
      makeSnapshot({
        commit: 'bbb',
        graphStats: makeGraphStats({ totalNodes: 100 }),
        scores: { security: 75 },
        timestamp: 2000,
      }),
    ];

    const drift = trackDriftOverTime(snapshots);
    expect(drift).toHaveLength(1);
    expect(drift[0].changedDimensions).toContain('security');
  });

  it('should not report drift when nothing changes', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', scores: { security: 80 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', scores: { security: 80 }, timestamp: 2000 }),
    ];

    const drift = trackDriftOverTime(snapshots);
    expect(drift).toHaveLength(0);
  });

  it('should respect custom threshold for drift', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', scores: { security: 80 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', scores: { security: 82 }, timestamp: 2000 }),
    ];

    // Default threshold is 1, so a 2-point change should be detected
    const drift1 = trackDriftOverTime(snapshots);
    expect(drift1).toHaveLength(1);

    // With threshold of 5, a 2-point change should not be detected
    const drift2 = trackDriftOverTime(snapshots, 5);
    expect(drift2).toHaveLength(0);
  });

  it('should handle empty snapshots', () => {
    expect(trackDriftOverTime([])).toHaveLength(0);
    expect(trackDriftOverTime([makeSnapshot({ commit: 'aaa' })])).toHaveLength(0);
  });

  it('should track fromCommit and toCommit correctly', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'first', graphStats: makeGraphStats({ totalNodes: 50 }), scores: { a: 50 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'second', graphStats: makeGraphStats({ totalNodes: 60 }), scores: { a: 50 }, timestamp: 2000 }),
    ];

    const drift = trackDriftOverTime(snapshots);
    expect(drift[0].fromCommit).toBe('first');
    expect(drift[0].toCommit).toBe('second');
  });

  it('should detect drift in total files', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', graphStats: makeGraphStats({ totalFiles: 50 }), scores: { a: 80 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', graphStats: makeGraphStats({ totalFiles: 55 }), scores: { a: 80 }, timestamp: 2000 }),
    ];

    const drift = trackDriftOverTime(snapshots);
    expect(drift).toHaveLength(1);
    expect(drift[0].fileDelta).toBe(5);
  });
});

// ──────────────────────────────────────────────────────────────────────
// TEMPORAL QUESTION ANSWERING
// ──────────────────────────────────────────────────────────────────────

describe('answerTemporalQuestion', () => {
  it('should return a helpful message for unrecognized questions', async () => {
    const answer = await answerTemporalQuestion('/fake/repo', 'what is the meaning of life?');
    expect(answer).toContain("couldn't parse the question");
  });

  it('should list supported formats for unrecognized questions', async () => {
    const answer = await answerTemporalQuestion('/fake/repo', 'gibberish');
    expect(answer).toContain('Supported formats');
  });

  it('should include the original question in the error message', async () => {
    const answer = await answerTemporalQuestion('/fake/repo', 'my custom question?');
    expect(answer).toContain('my custom question?');
  });
});

// ──────────────────────────────────────────────────────────────────────
// COMPLEX SCENARIOS
// ──────────────────────────────────────────────────────────────────────

describe('Complex temporal scenarios', () => {
  it('should track a finding from introduction through resolution', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', findingsCount: { critical: 0, high: 0 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', findingsCount: { critical: 1, high: 0 }, timestamp: 2000 }),
      makeSnapshot({ commit: 'ccc', findingsCount: { critical: 1, high: 1 }, timestamp: 3000 }),
      makeSnapshot({ commit: 'ddd', findingsCount: { critical: 0, high: 1 }, timestamp: 4000 }),
      makeSnapshot({ commit: 'eee', findingsCount: { critical: 0, high: 0 }, timestamp: 5000 }),
    ];

    const introductions = findIntroductions(snapshots);
    const resolutions = findResolutions(snapshots);

    // Both critical and high should be introduced
    expect(introductions).toHaveLength(2);
    expect(introductions.find((i) => i.finding === 'critical')?.commit).toBe('bbb');
    expect(introductions.find((i) => i.finding === 'high')?.commit).toBe('ccc');

    // Both should be resolved
    expect(resolutions).toHaveLength(2);
    expect(resolutions.find((r) => r.finding === 'critical')?.resolvedAt).toBe('ddd');
    expect(resolutions.find((r) => r.finding === 'high')?.resolvedAt).toBe('eee');
  });

  it('should detect alternating regressions and improvements', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', scores: { security: 90 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', scores: { security: 70 }, timestamp: 2000 }),
      makeSnapshot({ commit: 'ccc', scores: { security: 85 }, timestamp: 3000 }),
      makeSnapshot({ commit: 'ddd', scores: { security: 60 }, timestamp: 4000 }),
    ];

    const regressions = findRegressions(snapshots);
    const improvements = findImprovements(snapshots);

    // Two regressions: 90→70, 85→60
    expect(regressions).toHaveLength(2);
    // One improvement: 70→85
    expect(improvements).toHaveLength(1);
    expect(improvements[0].delta).toBe(15);
  });

  it('should compute drift across multiple consecutive changes', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'a', graphStats: makeGraphStats({ totalNodes: 100, totalEdges: 200, totalFiles: 50 }), scores: { arch: 80 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'b', graphStats: makeGraphStats({ totalNodes: 105, totalEdges: 210, totalFiles: 52 }), scores: { arch: 78 }, timestamp: 2000 }),
      makeSnapshot({ commit: 'c', graphStats: makeGraphStats({ totalNodes: 102, totalEdges: 205, totalFiles: 51 }), scores: { arch: 82 }, timestamp: 3000 }),
    ];

    const drift = trackDriftOverTime(snapshots);
    expect(drift).toHaveLength(2);

    // a→b: +5 nodes, +10 edges, +2 files
    expect(drift[0].nodeDelta).toBe(5);
    expect(drift[0].edgeDelta).toBe(10);
    expect(drift[0].fileDelta).toBe(2);

    // b→c: -3 nodes, -5 edges, -1 files
    expect(drift[1].nodeDelta).toBe(-3);
    expect(drift[1].edgeDelta).toBe(-5);
    expect(drift[1].fileDelta).toBe(-1);
  });

  it('should handle a full regression→improvement→resolution lifecycle', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({
        commit: 'v1',
        scores: { security: 95, performance: 90 },
        findingsCount: { critical: 0, high: 0 },
        timestamp: 1000,
      }),
      makeSnapshot({
        commit: 'v2',
        scores: { security: 70, performance: 90 },
        findingsCount: { critical: 1, high: 0 },
        timestamp: 2000,
      }),
      makeSnapshot({
        commit: 'v3',
        scores: { security: 85, performance: 90 },
        findingsCount: { critical: 0, high: 0 },
        timestamp: 3000,
      }),
    ];

    const regressions = findRegressions(snapshots);
    const improvements = findImprovements(snapshots);
    const introductions = findIntroductions(snapshots);
    const resolutions = findResolutions(snapshots);

    // Security regressed at v2
    expect(regressions).toHaveLength(1);
    expect(regressions[0].dimension).toBe('security');
    expect(regressions[0].commit).toBe('v2');

    // Security improved at v3
    expect(improvements).toHaveLength(1);
    expect(improvements[0].dimension).toBe('security');
    expect(improvements[0].commit).toBe('v3');

    // Critical finding introduced at v2
    expect(introductions).toHaveLength(1);
    expect(introductions[0].finding).toBe('critical');

    // Critical finding resolved at v3
    expect(resolutions).toHaveLength(1);
    expect(resolutions[0].resolvedAt).toBe('v3');
    expect(resolutions[0].duration).toBe(1000);
  });

  it('should correctly handle new dimensions appearing in later snapshots', () => {
    const snapshots: TimeSnapshot[] = [
      makeSnapshot({ commit: 'aaa', scores: { security: 80 }, timestamp: 1000 }),
      makeSnapshot({ commit: 'bbb', scores: { security: 80, accessibility: 60 }, timestamp: 2000 }),
    ];

    // accessibility appeared with a score of 60, but it wasn't in the previous
    // snapshot so prev score is 0 — this is a regression
    const regressions = findRegressions(snapshots);
    // accessibility: from 0 (not present) to 60, so this is not a regression
    // security: 80 → 80, no change
    expect(regressions).toHaveLength(0);

    // But accessibility went from 0 to 60, which is an improvement
    const improvements = findImprovements(snapshots);
    expect(improvements).toHaveLength(1);
    expect(improvements[0].dimension).toBe('accessibility');
  });
});
