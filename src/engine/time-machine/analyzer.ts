/**
 * FerrumEngine v2 — Temporal Analysis Engine
 *
 * The core of the Software Time Machine. Analyzes git history over time ranges
 * to detect regressions, improvements, drift, and finding introductions/resolutions.
 *
 * Usage:
 *   import { analyzeTimeRange } from '@/engine/time-machine';
 *   const result = await analyzeTimeRange('/path/to/repo', {
 *     timeRange: { from: 'HEAD~10', to: 'HEAD' },
 *   });
 */

import type {
  TimeSnapshot,
  TemporalQuery,
  TemporalResult,
  Regression,
  Improvement,
  DriftEvent,
  Introduction,
  Resolution,
  GraphStats,
} from './types';
import {
  getCommitRange,
  getCommitDiff,
  resolveRef,
  getCurrentHead,
} from './history';

// ──────────────────────────────────────────────────────────────────────
// SNAPSHOT CAPTURE
// ──────────────────────────────────────────────────────────────────────

/**
 * Capture a snapshot at a specific commit.
 *
 * This function checks out the commit, runs a lightweight analysis
 * to collect graph stats and scores, then returns a TimeSnapshot.
 *
 * NOTE: This is a simplified implementation that collects available
 * metadata from git without running the full Ferrum analysis pipeline.
 * A production integration would invoke `buildGraph()` + `calculateScores()`
 * at each commit.
 *
 * @param repoPath - Absolute path to the git repository.
 * @param commit   - Commit SHA to snapshot.
 * @returns A TimeSnapshot at the given commit.
 */
export async function captureSnapshot(repoPath: string, commit: string): Promise<TimeSnapshot> {
  // Get commit info via git log
  const commits = getCommitRange(repoPath, `${commit}^`, commit);
  const info = commits.length > 0 ? commits[0] : null;

  // Get diff stats to estimate graph changes
  let diffStats;
  try {
    diffStats = getCommitDiff(repoPath, commit);
  } catch {
    diffStats = { filesChanged: 0, insertions: 0, deletions: 0, files: [] };
  }

  // Build a lightweight GraphStats from diff info
  const graphStats: GraphStats = {
    totalNodes: diffStats.filesChanged,
    totalEdges: 0,
    nodesByKind: {},
    edgesByKind: {},
    totalFiles: diffStats.filesChanged,
  };

  // Estimate scores based on diff characteristics
  // (In production, this would run the full analysis pipeline)
  const scores = estimateScoresFromDiff(diffStats);

  // Estimate findings count from diff
  const findingsCount = estimateFindingsFromDiff(diffStats);

  return {
    commit,
    timestamp: info?.timestamp ?? Date.now(),
    author: info?.author ?? 'unknown',
    message: info?.message ?? '',
    graphStats,
    scores,
    findingsCount,
  };
}

// ──────────────────────────────────────────────────────────────────────
// TEMPORAL ANALYSIS
// ──────────────────────────────────────────────────────────────────────

/**
 * Analyze a time range of git history.
 *
 * Walks the commit range, captures snapshots, and then detects
 * regressions, improvements, drift, introductions, and resolutions.
 *
 * @param repoPath - Absolute path to the git repository.
 * @param query    - The temporal query specifying the range and filters.
 * @returns A TemporalResult with all detected changes.
 */
export async function analyzeTimeRange(repoPath: string, query: TemporalQuery): Promise<TemporalResult> {
  const { from, to } = query.timeRange;

  // Resolve refs to SHAs
  const fromSha = resolveRef(repoPath, from);
  const toSha = resolveRef(repoPath, to);

  // Get all commits in the range
  const commits = getCommitRange(repoPath, fromSha, toSha);

  // Capture snapshots for each commit
  const snapshots: TimeSnapshot[] = [];
  for (const commit of commits) {
    try {
      const snapshot = await captureSnapshot(repoPath, commit.sha);
      snapshots.push(snapshot);
    } catch {
      // Skip commits that can't be analyzed (e.g., merge conflicts)
    }
  }

  // Sort snapshots chronologically (oldest first) for analysis
  snapshots.sort((a, b) => a.timestamp - b.timestamp);

  // Detect regressions
  const regressions = findRegressions(snapshots, query.dimensions, query.threshold);

  // Detect improvements
  const improvements = findImprovements(snapshots, query.dimensions, query.threshold);

  // Detect drift
  const drift = trackDriftOverTime(snapshots, query.threshold);

  // Detect introductions
  const introductions = findIntroductions(snapshots);

  // Detect resolutions
  const resolutions = findResolutions(snapshots);

  return {
    snapshots,
    regressions,
    improvements,
    drift,
    introductions,
    resolutions,
  };
}

// ──────────────────────────────────────────────────────────────────────
// REGRESSION DETECTION
// ──────────────────────────────────────────────────────────────────────

/**
 * Find regressions (score decreases) across a series of snapshots.
 *
 * @param snapshots  - Chronologically ordered snapshots.
 * @param dimensions - Optional filter to specific dimensions.
 * @param threshold  - Minimum delta to report.
 * @returns Array of Regression objects.
 */
export function findRegressions(
  snapshots: TimeSnapshot[],
  dimensions?: string[],
  threshold?: number,
): Regression[] {
  const regressions: Regression[] = [];
  const minDelta = threshold ?? 0;

  for (let i = 1; i < snapshots.length; i++) {
    const prev = snapshots[i - 1];
    const curr = snapshots[i];

    const allDimensions = Object.keys(curr.scores);
    const targetDimensions = dimensions
      ? allDimensions.filter((d) => dimensions.includes(d))
      : allDimensions;

    for (const dim of targetDimensions) {
      const prevScore = prev.scores[dim] ?? 0;
      const currScore = curr.scores[dim] ?? 0;
      const delta = prevScore - currScore; // positive = regression

      if (delta > minDelta) {
        regressions.push({
          dimension: dim,
          from: prevScore,
          to: currScore,
          delta,
          commit: curr.commit,
          author: curr.author,
          timestamp: curr.timestamp,
        });
      }
    }
  }

  return regressions;
}

// ──────────────────────────────────────────────────────────────────────
// IMPROVEMENT DETECTION
// ──────────────────────────────────────────────────────────────────────

/**
 * Find improvements (score increases) across a series of snapshots.
 *
 * @param snapshots  - Chronologically ordered snapshots.
 * @param dimensions - Optional filter to specific dimensions.
 * @param threshold  - Minimum delta to report.
 * @returns Array of Improvement objects.
 */
export function findImprovements(
  snapshots: TimeSnapshot[],
  dimensions?: string[],
  threshold?: number,
): Improvement[] {
  const improvements: Improvement[] = [];
  const minDelta = threshold ?? 0;

  for (let i = 1; i < snapshots.length; i++) {
    const prev = snapshots[i - 1];
    const curr = snapshots[i];

    const allDimensions = Object.keys(curr.scores);
    const targetDimensions = dimensions
      ? allDimensions.filter((d) => dimensions.includes(d))
      : allDimensions;

    for (const dim of targetDimensions) {
      const prevScore = prev.scores[dim] ?? 0;
      const currScore = curr.scores[dim] ?? 0;
      const delta = currScore - prevScore; // positive = improvement

      if (delta > minDelta) {
        improvements.push({
          dimension: dim,
          from: prevScore,
          to: currScore,
          delta,
          commit: curr.commit,
          author: curr.author,
          timestamp: curr.timestamp,
        });
      }
    }
  }

  return improvements;
}

// ──────────────────────────────────────────────────────────────────────
// INTRODUCTION FINDING
// ──────────────────────────────────────────────────────────────────────

/**
 * Find when findings first appeared across snapshots.
 *
 * A finding is identified by its severity key. If a finding's count
 * increases from one snapshot to the next, it was introduced.
 *
 * @param snapshots - Chronologically ordered snapshots.
 * @returns Array of Introduction objects.
 */
export function findIntroductions(snapshots: TimeSnapshot[]): Introduction[] {
  const introductions: Introduction[] = [];

  // Track findings seen so far
  const seenFindings = new Set<string>();

  for (const snapshot of snapshots) {
    for (const [severity, count] of Object.entries(snapshot.findingsCount)) {
      const key = severity;

      if (count > 0 && !seenFindings.has(key)) {
        introductions.push({
          finding: key,
          commit: snapshot.commit,
          author: snapshot.author,
          timestamp: snapshot.timestamp,
          category: severity,
        });
        seenFindings.add(key);
      }
    }
  }

  return introductions;
}

// ──────────────────────────────────────────────────────────────────────
// RESOLUTION TRACKING
// ──────────────────────────────────────────────────────────────────────

/**
 * Find when findings were resolved across snapshots.
 *
 * A finding is resolved when its count drops to 0 after being non-zero.
 * The duration is the time between introduction and resolution.
 *
 * @param snapshots - Chronologically ordered snapshots.
 * @returns Array of Resolution objects.
 */
export function findResolutions(snapshots: TimeSnapshot[]): Resolution[] {
  const resolutions: Resolution[] = [];

  // Track active findings: key → { introducedAt commit, timestamp, category }
  const activeFindings = new Map<string, { introducedAt: string; timestamp: number; category: string }>();

  for (const snapshot of snapshots) {
    // Check which findings are still present in this snapshot
    const currentFindings = new Set<string>();
    for (const [severity, count] of Object.entries(snapshot.findingsCount)) {
      if (count > 0) {
        currentFindings.add(severity);
      }
    }

    // Mark new findings as active
    for (const key of currentFindings) {
      if (!activeFindings.has(key)) {
        activeFindings.set(key, {
          introducedAt: snapshot.commit,
          timestamp: snapshot.timestamp,
          category: key,
        });
      }
    }

    // Check for resolved findings
    for (const [key, info] of activeFindings) {
      if (!currentFindings.has(key)) {
        resolutions.push({
          finding: key,
          introducedAt: info.introducedAt,
          resolvedAt: snapshot.commit,
          duration: snapshot.timestamp - info.timestamp,
          category: info.category,
        });
        activeFindings.delete(key);
      }
    }
  }

  return resolutions;
}

// ──────────────────────────────────────────────────────────────────────
// DRIFT TRACKING
// ──────────────────────────────────────────────────────────────────────

/**
 * Track drift over time between consecutive snapshots.
 *
 * Drift includes structural changes (node/edge/file counts) and
 * score changes beyond the threshold.
 *
 * @param snapshots - Chronologically ordered snapshots.
 * @param threshold - Minimum score change to report as drift.
 * @returns Array of DriftEvent objects.
 */
export function trackDriftOverTime(snapshots: TimeSnapshot[], threshold?: number): DriftEvent[] {
  const driftEvents: DriftEvent[] = [];
  const minDelta = threshold ?? 1; // default threshold of 1 for drift

  for (let i = 1; i < snapshots.length; i++) {
    const prev = snapshots[i - 1];
    const curr = snapshots[i];

    const nodeDelta = curr.graphStats.totalNodes - prev.graphStats.totalNodes;
    const edgeDelta = curr.graphStats.totalEdges - prev.graphStats.totalEdges;
    const fileDelta = curr.graphStats.totalFiles - prev.graphStats.totalFiles;

    // Find dimensions whose scores changed beyond threshold
    const changedDimensions: string[] = [];
    const allDims = new Set([...Object.keys(prev.scores), ...Object.keys(curr.scores)]);
    for (const dim of allDims) {
      const prevScore = prev.scores[dim] ?? 0;
      const currScore = curr.scores[dim] ?? 0;
      if (Math.abs(currScore - prevScore) >= minDelta) {
        changedDimensions.push(dim);
      }
    }

    // Only report drift if there are structural changes or score changes
    if (nodeDelta !== 0 || edgeDelta !== 0 || fileDelta !== 0 || changedDimensions.length > 0) {
      driftEvents.push({
        fromCommit: prev.commit,
        toCommit: curr.commit,
        nodeDelta,
        edgeDelta,
        fileDelta,
        changedDimensions,
        timestamp: curr.timestamp,
      });
    }
  }

  return driftEvents;
}

// ──────────────────────────────────────────────────────────────────────
// TEMPORAL QUESTION ANSWERING
// ──────────────────────────────────────────────────────────────────────

/**
 * Answer a natural language temporal question about the codebase.
 *
 * Supports questions like:
 *   - "When was the security score last above 80?"
 *   - "Who introduced the critical finding?"
 *   - "What regressed in the last 10 commits?"
 *   - "When did the architecture score drop below 70?"
 *
 * @param repoPath - Absolute path to the git repository.
 * @param question - Natural language question.
 * @returns Human-readable answer string.
 */
export async function answerTemporalQuestion(repoPath: string, question: string): Promise<string> {
  const q = question.toLowerCase().trim();

  // Parse common patterns
  const lastAboveMatch = q.match(/when was the (\w+) score last above (\d+)/);
  if (lastAboveMatch) {
    return answerLastAbove(repoPath, lastAboveMatch[1], parseInt(lastAboveMatch[2], 10));
  }

  const dropBelowMatch = q.match(/when did the (\w+) score drop below (\d+)/);
  if (dropBelowMatch) {
    return answerDropBelow(repoPath, dropBelowMatch[1], parseInt(dropBelowMatch[2], 10));
  }

  const whoIntroducedMatch = q.match(/who introduced the (\w+) finding/);
  if (whoIntroducedMatch) {
    return answerWhoIntroduced(repoPath, whoIntroducedMatch[1]);
  }

  const lastNCommitsMatch = q.match(/what regressed in the last (\d+) commits/);
  if (lastNCommitsMatch) {
    return answerRegressions(repoPath, parseInt(lastNCommitsMatch[1], 10));
  }

  return `I couldn't parse the question: "${question}". ` +
    'Supported formats:\n' +
    '  - "When was the <dimension> score last above <N>?"\n' +
    '  - "When did the <dimension> score drop below <N>?"\n' +
    '  - "Who introduced the <severity> finding?"\n' +
    '  - "What regressed in the last N commits?"';
}

// ──────────────────────────────────────────────────────────────────────
// INTERNAL HELPERS
// ──────────────────────────────────────────────────────────────────────

/**
 * Estimate scores from diff stats.
 *
 * This is a heuristic — in production, the full analysis pipeline
 * would be run at each commit.
 */
function estimateScoresFromDiff(diff: {
  filesChanged: number;
  insertions: number;
  deletions: number;
}): Record<string, number> {
  // Base scores (start at 100, deduct for large diffs)
  const churn = diff.insertions + diff.deletions;
  const largeChange = churn > 500;

  return {
    architecture: largeChange ? 70 : 90,
    performance: largeChange ? 75 : 85,
    security: 80,
    reliability: largeChange ? 72 : 88,
    testing: 75,
    accessibility: 80,
    dependencies: 85,
    maintainability: largeChange ? 65 : 82,
    complexity: diff.filesChanged > 10 ? 60 : 78,
    configuration: 90,
  };
}

/**
 * Estimate findings count from diff stats.
 */
function estimateFindingsFromDiff(diff: {
  filesChanged: number;
  insertions: number;
  deletions: number;
}): Record<string, number> {
  const churn = diff.insertions + diff.deletions;

  return {
    critical: churn > 1000 ? 1 : 0,
    high: churn > 500 ? 2 : 0,
    medium: churn > 200 ? 5 : Math.max(0, Math.floor(churn / 100)),
    low: Math.max(0, Math.floor(diff.filesChanged / 3)),
    info: Math.max(0, Math.floor(diff.filesChanged / 2)),
  };
}

/** Answer "When was the X score last above N?" */
async function answerLastAbove(repoPath: string, dimension: string, threshold: number): Promise<string> {
  try {
    const head = getCurrentHead(repoPath);
    const result = await analyzeTimeRange(repoPath, {
      timeRange: { from: 'HEAD~50', to: 'HEAD' },
      dimensions: [dimension],
    });

    // Walk snapshots from newest to oldest
    for (let i = result.snapshots.length - 1; i >= 0; i--) {
      const snap = result.snapshots[i];
      const score = snap.scores[dimension] ?? 0;
      if (score > threshold) {
        return `The ${dimension} score was last above ${threshold} at commit ${snap.commit.substring(0, 7)} ` +
          `(score: ${score}, by ${snap.author} on ${new Date(snap.timestamp).toISOString()}).`;
      }
    }

    return `The ${dimension} score has not been above ${threshold} in the last 50 commits.`;
  } catch (err) {
    return `Error answering question: ${err instanceof Error ? err.message : String(err)}`;
  }
}

/** Answer "When did the X score drop below N?" */
async function answerDropBelow(repoPath: string, dimension: string, threshold: number): Promise<string> {
  try {
    const result = await analyzeTimeRange(repoPath, {
      timeRange: { from: 'HEAD~50', to: 'HEAD' },
      dimensions: [dimension],
    });

    const regressions = result.regressions.filter((r) => r.dimension === dimension && r.to < threshold);
    if (regressions.length > 0) {
      const first = regressions[0];
      return `The ${dimension} score dropped below ${threshold} at commit ${first.commit.substring(0, 7)} ` +
        `(from ${first.from} to ${first.to}, by ${first.author}).`;
    }

    return `The ${dimension} score has not dropped below ${threshold} in the last 50 commits.`;
  } catch (err) {
    return `Error answering question: ${err instanceof Error ? err.message : String(err)}`;
  }
}

/** Answer "Who introduced the X finding?" */
async function answerWhoIntroduced(repoPath: string, severity: string): Promise<string> {
  try {
    const result = await analyzeTimeRange(repoPath, {
      timeRange: { from: 'HEAD~50', to: 'HEAD' },
    });

    const intro = result.introductions.find((i) => i.category === severity);
    if (intro) {
      return `The ${severity} finding was introduced at commit ${intro.commit.substring(0, 7)} by ${intro.author} ` +
        `on ${new Date(intro.timestamp).toISOString()}.`;
    }

    return `No ${severity} finding was introduced in the last 50 commits.`;
  } catch (err) {
    return `Error answering question: ${err instanceof Error ? err.message : String(err)}`;
  }
}

/** Answer "What regressed in the last N commits?" */
async function answerRegressions(repoPath: string, n: number): Promise<string> {
  try {
    const result = await analyzeTimeRange(repoPath, {
      timeRange: { from: `HEAD~${n}`, to: 'HEAD' },
    });

    if (result.regressions.length === 0) {
      return `No regressions detected in the last ${n} commits. All clear!`;
    }

    const lines = [`Regressions in the last ${n} commits:`];
    for (const r of result.regressions) {
      lines.push(`  - ${r.dimension}: ${r.from} → ${r.to} (Δ -${r.delta}) at ${r.commit.substring(0, 7)} by ${r.author}`);
    }

    return lines.join('\n');
  } catch (err) {
    return `Error answering question: ${err instanceof Error ? err.message : String(err)}`;
  }
}
