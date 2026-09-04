/**
 * FerrumEngine v2 — Software Time Machine Types
 *
 * Defines the type system for temporal querying over git history.
 * Enables tracking regressions, introductions, resolutions, and
 * architectural drift across commits and time ranges.
 */

// ──────────────────────────────────────────────────────────────────────
// GRAPH STATS (lightweight, for snapshots)
// ──────────────────────────────────────────────────────────────────────

/** Aggregate statistics of the application graph at a point in time. */
export interface GraphStats {
  totalNodes: number;
  totalEdges: number;
  nodesByKind: Record<string, number>;
  edgesByKind: Record<string, number>;
  totalFiles: number;
}

// ──────────────────────────────────────────────────────────────────────
// TIME SNAPSHOT
// ──────────────────────────────────────────────────────────────────────

/** A frozen snapshot of the codebase at a specific commit. */
export interface TimeSnapshot {
  /** The commit SHA. */
  commit: string;
  /** Unix timestamp (ms) of the commit. */
  timestamp: number;
  /** Author of the commit. */
  author: string;
  /** Commit message (first line). */
  message: string;
  /** Graph statistics at this commit. */
  graphStats: GraphStats;
  /** Dimension → score at this commit. */
  scores: Record<string, number>;
  /** Severity → count of findings at this commit. */
  findingsCount: Record<string, number>;
}

// ──────────────────────────────────────────────────────────────────────
// TEMPORAL QUERY
// ──────────────────────────────────────────────────────────────────────

/** A query over a time range of git history. */
export interface TemporalQuery {
  /** Commit range — SHAs ('abc123'..'def456') or relative refs ('HEAD~10'..'HEAD'). */
  timeRange: { from: string; to: string };
  /** Filter to specific scoring dimensions (e.g. ['security', 'performance']). */
  dimensions?: string[];
  /** Minimum change magnitude to report (0–100). */
  threshold?: number;
}

// ──────────────────────────────────────────────────────────────────────
// TEMPORAL RESULT
// ──────────────────────────────────────────────────────────────────────

/** The result of a temporal query. */
export interface TemporalResult {
  /** Snapshots at each commit in the range. */
  snapshots: TimeSnapshot[];
  /** Score regressions detected. */
  regressions: Regression[];
  /** Score improvements detected. */
  improvements: Improvement[];
  /** Drift events between consecutive snapshots. */
  drift: DriftEvent[];
  /** Findings that first appeared in the range. */
  introductions: Introduction[];
  /** Findings that were fixed in the range. */
  resolutions: Resolution[];
}

// ──────────────────────────────────────────────────────────────────────
// REGRESSION
// ──────────────────────────────────────────────────────────────────────

/** A score regression — a dimension score that decreased. */
export interface Regression {
  /** The dimension that regressed (e.g. 'security'). */
  dimension: string;
  /** Score before the regression. */
  from: number;
  /** Score after the regression. */
  to: number;
  /** Magnitude of the decrease (positive number). */
  delta: number;
  /** Commit where the regression occurred. */
  commit: string;
  /** Author of the regressing commit. */
  author: string;
  /** Timestamp of the regressing commit. */
  timestamp: number;
}

// ──────────────────────────────────────────────────────────────────────
// IMPROVEMENT
// ──────────────────────────────────────────────────────────────────────

/** A score improvement — a dimension score that increased. */
export interface Improvement {
  /** The dimension that improved. */
  dimension: string;
  /** Score before the improvement. */
  from: number;
  /** Score after the improvement. */
  to: number;
  /** Magnitude of the increase (positive number). */
  delta: number;
  /** Commit where the improvement occurred. */
  commit: string;
  /** Author of the improving commit. */
  author: string;
  /** Timestamp of the improving commit. */
  timestamp: number;
}

// ──────────────────────────────────────────────────────────────────────
// DRIFT EVENT
// ──────────────────────────────────────────────────────────────────────

/** A drift event between two consecutive snapshots. */
export interface DriftEvent {
  /** Starting commit. */
  fromCommit: string;
  /** Ending commit. */
  toCommit: string;
  /** Change in total nodes. */
  nodeDelta: number;
  /** Change in total edges. */
  edgeDelta: number;
  /** Change in total files. */
  fileDelta: number;
  /** Dimensions whose scores changed beyond threshold. */
  changedDimensions: string[];
  /** Timestamp of the 'to' commit. */
  timestamp: number;
}

// ──────────────────────────────────────────────────────────────────────
// INTRODUCTION
// ──────────────────────────────────────────────────────────────────────

/** A finding that first appeared at a specific commit. */
export interface Introduction {
  /** Finding identifier (e.g. severity:key). */
  finding: string;
  /** Commit where the finding first appeared. */
  commit: string;
  /** Author of that commit. */
  author: string;
  /** Timestamp of that commit. */
  timestamp: number;
  /** Category of the finding (e.g. 'critical', 'high'). */
  category: string;
}

// ──────────────────────────────────────────────────────────────────────
// RESOLUTION
// ──────────────────────────────────────────────────────────────────────

/** A finding that was resolved (no longer present) at a specific commit. */
export interface Resolution {
  /** Finding identifier. */
  finding: string;
  /** Commit where the finding was introduced. */
  introducedAt: string;
  /** Commit where the finding was resolved. */
  resolvedAt: string;
  /** Duration (ms) the finding existed across commits. */
  duration: number;
  /** Category of the finding. */
  category: string;
}

// ──────────────────────────────────────────────────────────────────────
// COMMIT INFO (for git history integration)
// ──────────────────────────────────────────────────────────────────────

/** Parsed commit metadata. */
export interface CommitInfo {
  /** Full SHA. */
  sha: string;
  /** Short SHA (7 chars). */
  shortSha: string;
  /** Author name. */
  author: string;
  /** Committer email. */
  email: string;
  /** Unix timestamp (ms). */
  timestamp: number;
  /** Commit message (first line). */
  message: string;
}

// ──────────────────────────────────────────────────────────────────────
// DIFF STATS
// ──────────────────────────────────────────────────────────────────────

/** Statistics about a single commit's diff. */
export interface DiffStats {
  /** Files changed. */
  filesChanged: number;
  /** Lines inserted. */
  insertions: number;
  /** Lines deleted. */
  deletions: number;
  /** Per-file breakdown. */
  files: DiffFile[];
}

/** Per-file diff info. */
export interface DiffFile {
  /** File path. */
  path: string;
  /** Lines added in this file. */
  additions: number;
  /** Lines removed in this file. */
  deletions: number;
  /** Whether the file was added, modified, or deleted. */
  status: 'added' | 'modified' | 'deleted' | 'renamed';
}
