/**
 * FerrumEngine v2 — Software Time Machine
 *
 * Temporal querying over git history. Track regressions, improvements,
 * drift, finding introductions, and resolutions across time.
 *
 * Usage:
 *   import { analyzeTimeRange, findRegressions } from '@/engine/time-machine';
 *
 *   const result = await analyzeTimeRange('/path/to/repo', {
 *     timeRange: { from: 'HEAD~10', to: 'HEAD' },
 *     dimensions: ['security', 'performance'],
 *     threshold: 5,
 *   });
 *
 *   console.log(`Found ${result.regressions.length} regressions`);
 *   console.log(`Found ${result.improvements.length} improvements`);
 */

// Types
export type {
  GraphStats,
  TimeSnapshot,
  TemporalQuery,
  TemporalResult,
  Regression,
  Improvement,
  DriftEvent,
  Introduction,
  Resolution,
  CommitInfo,
  DiffStats,
  DiffFile,
} from './types';

// History (git integration)
export {
  getCommitRange,
  getCommitInfo,
  getCommitCount,
  getCommitDiff,
  getChangedFiles,
  findLastModification,
  findIntroduction,
  getFileBlame,
  checkoutCommit,
  getCurrentHead,
  getCurrentBranch,
  resolveRef,
  isGitRepo,
  getRepoRoot,
} from './history';

// Analyzer (temporal analysis engine)
export {
  captureSnapshot,
  analyzeTimeRange,
  findRegressions,
  findImprovements,
  findIntroductions,
  findResolutions,
  trackDriftOverTime,
  answerTemporalQuestion,
} from './analyzer';
