/**
 * FerrumEngine v2 — Git History Integration
 *
 * Provides functions for querying git history using child_process.execSync.
 * Zero external dependencies — only requires git to be available on the system.
 *
 * Used by the Time Machine analyzer to walk commit ranges, get diffs,
 * and perform blame/annotation queries.
 */

import { execSync } from 'child_process';
import type { CommitInfo, DiffStats, DiffFile } from './types';

// ──────────────────────────────────────────────────────────────────────
// COMMIT RANGE QUERIES
// ──────────────────────────────────────────────────────────────────────

/**
 * Get the list of commits in a range [from, to] (inclusive).
 *
 * @param repoPath - Absolute path to the git repository.
 * @param from    - Starting ref (SHA, tag, or relative ref like 'HEAD~10').
 * @param to      - Ending ref (SHA, tag, or 'HEAD').
 * @returns Array of CommitInfo in reverse chronological order (newest first).
 */
export function getCommitRange(repoPath: string, from: string, to: string): CommitInfo[] {
  const range = `${from}..${to}`;
  const cmd = `git log ${range} --format="%H|%h|%an|%ae|%ct|%s" --no-merges`;

  const output = runGit(cmd, repoPath);
  if (!output.trim()) return [];

  return output
    .trim()
    .split('\n')
    .filter((line) => line.length > 0)
    .map(parseCommitLine);
}

/**
 * Get a single commit's info.
 *
 * @param repoPath - Absolute path to the git repository.
 * @param ref     - Commit ref (SHA, tag, etc.).
 */
export function getCommitInfo(repoPath: string, ref: string): CommitInfo | null {
  const cmd = `git log -1 ${ref} --format="%H|%h|%an|%ae|%ct|%s"`;
  const output = runGit(cmd, repoPath);
  if (!output.trim()) return null;
  return parseCommitLine(output.trim());
}

/**
 * Get the total number of commits in a range.
 */
export function getCommitCount(repoPath: string, from: string, to: string): number {
  const cmd = `git rev-list --count ${from}..${to} --no-merges`;
  const output = runGit(cmd, repoPath);
  return parseInt(output.trim(), 10) || 0;
}

// ──────────────────────────────────────────────────────────────────────
// DIFF QUERIES
// ──────────────────────────────────────────────────────────────────────

/**
 * Get diff stats for a specific commit.
 *
 * @param repoPath - Absolute path to the git repository.
 * @param commit   - Commit SHA.
 * @returns DiffStats with per-file breakdown.
 */
export function getCommitDiff(repoPath: string, commit: string): DiffStats {
  // Get the short stat (total insertions/deletions/files)
  const statCmd = `git diff --shortstat ${commit}^..${commit}`;
  const statOutput = runGit(statCmd, repoPath);

  const stat = parseShortStat(statOutput);

  // Get per-file breakdown
  const filesCmd = `git diff --numstat ${commit}^..${commit}`;
  const filesOutput = runGit(filesCmd, repoPath);

  const files = parseNumStat(filesOutput, commit, repoPath);

  return {
    filesChanged: stat.filesChanged,
    insertions: stat.insertions,
    deletions: stat.deletions,
    files,
  };
}

/**
 * Get the list of files changed in a commit.
 */
export function getChangedFiles(repoPath: string, commit: string): string[] {
  const cmd = `git diff-tree --no-commit-id -r --name-only ${commit}`;
  const output = runGit(cmd, repoPath);
  return output.trim().split('\n').filter(Boolean);
}

// ──────────────────────────────────────────────────────────────────────
// BLAME / ANNOTATION QUERIES
// ──────────────────────────────────────────────────────────────────────

/**
 * Find when a file was last modified.
 *
 * @param repoPath  - Absolute path to the git repository.
 * @param filePath  - Relative file path from the repo root.
 * @returns CommitInfo of the last modification, or null if the file doesn't exist.
 */
export function findLastModification(repoPath: string, filePath: string): CommitInfo | null {
  const cmd = `git log -1 --format="%H|%h|%an|%ae|%ct|%s" -- ${filePath}`;
  const output = runGit(cmd, repoPath);
  if (!output.trim()) return null;
  return parseCommitLine(output.trim());
}

/**
 * Find who introduced a specific line/pattern in a file.
 *
 * Uses git blame to find the commit that last touched the line
 * matching the given pattern.
 *
 * @param repoPath  - Absolute path to the git repository.
 * @param pattern   - A regex pattern to search for in the file.
 * @param filePath  - Relative file path from the repo root.
 * @returns CommitInfo of the introducing commit, or null if not found.
 */
export function findIntroduction(repoPath: string, pattern: string, filePath: string): CommitInfo | null {
  // First, find the line number matching the pattern
  const grepCmd = `git grep -n -P "${pattern}" HEAD -- "${filePath}"`;
  let grepOutput: string;
  try {
    grepOutput = runGit(grepCmd, repoPath);
  } catch {
    // Pattern not found — try with basic regex
    const basicGrepCmd = `git grep -n "${pattern}" HEAD -- "${filePath}"`;
    try {
      grepOutput = runGit(basicGrepCmd, repoPath);
    } catch {
      return null;
    }
  }

  if (!grepOutput.trim()) return null;

  // Extract the line number from the first match
  // Format: filePath:lineNumber:content
  const firstMatch = grepOutput.trim().split('\n')[0];
  const parts = firstMatch.split(':');
  if (parts.length < 2) return null;
  const lineNumber = parseInt(parts[1], 10);
  if (isNaN(lineNumber)) return null;

  // Now blame that specific line
  const blameCmd = `git blame -L ${lineNumber},${lineNumber} --line-porcelain "${filePath}"`;
  const blameOutput = runGit(blameCmd, repoPath);

  return parseBlameOutput(blameOutput);
}

/**
 * Get the full blame for a file, returning a map of line numbers to commit SHAs.
 */
export function getFileBlame(repoPath: string, filePath: string): Map<number, string> {
  const cmd = `git blame --line-porcelain "${filePath}"`;
  const output = runGit(cmd, repoPath);
  const blame = new Map<number, string>();

  let currentSha = '';
  let lineNumber = 0;

  for (const line of output.split('\n')) {
    if (line.startsWith('commit ')) {
      // Wait — line-porcelain uses 'commit-sha' format differently
      // The SHA is on a line by itself after the header
      const sha = line.substring(7).trim();
      if (sha.length >= 7) currentSha = sha;
    } else if (line.match(/^\S+ \d+ \d+/)) {
      // Header line: sha origLine resultLine [numLines]
      const parts = line.split(' ');
      if (parts.length >= 3) {
        lineNumber = parseInt(parts[2], 10);
        if (!currentSha && parts[0].length >= 7) currentSha = parts[0];
      }
    } else if (line.startsWith('author ')) {
      // We have enough info — store and reset
      if (lineNumber > 0 && currentSha) {
        blame.set(lineNumber, currentSha);
      }
    }
  }

  return blame;
}

// ──────────────────────────────────────────────────────────────────────
// CHECKOUT / WORKTREE HELPERS
// ──────────────────────────────────────────────────────────────────────

/**
 * Checkout a specific commit (detached HEAD).
 *
 * WARNING: This mutates the working tree. Callers should restore
 * the original branch afterward.
 */
export function checkoutCommit(repoPath: string, commit: string): void {
  runGit(`git checkout ${commit}`, repoPath);
}

/**
 * Get the current HEAD SHA.
 */
export function getCurrentHead(repoPath: string): string {
  const output = runGit('git rev-parse HEAD', repoPath);
  return output.trim();
}

/**
 * Get the current branch name.
 */
export function getCurrentBranch(repoPath: string): string {
  const output = runGit('git rev-parse --abbrev-ref HEAD', repoPath);
  return output.trim();
}

/**
 * Resolve a ref (SHA, tag, HEAD~N) to a full SHA.
 */
export function resolveRef(repoPath: string, ref: string): string {
  const output = runGit(`git rev-parse ${ref}`, repoPath);
  return output.trim();
}

// ──────────────────────────────────────────────────────────────────────
// UTILITY
// ──────────────────────────────────────────────────────────────────────

/**
 * Check if a path is a valid git repository.
 */
export function isGitRepo(repoPath: string): boolean {
  try {
    runGit('git rev-parse --git-dir', repoPath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get the repository root directory.
 */
export function getRepoRoot(repoPath: string): string {
  const output = runGit('git rev-parse --show-toplevel', repoPath);
  return output.trim();
}

// ──────────────────────────────────────────────────────────────────────
// INTERNAL HELPERS
// ──────────────────────────────────────────────────────────────────────

/** Execute a git command and return stdout. Throws on non-zero exit. */
function runGit(command: string, cwd: string): string {
  return execSync(command, {
    cwd,
    encoding: 'utf-8',
    maxBuffer: 10 * 1024 * 1024, // 10MB
    stdio: ['pipe', 'pipe', 'pipe'],
  });
}

/**
 * Parse a commit line from git log --format="%H|%h|%an|%ae|%ct|%s"
 */
function parseCommitLine(line: string): CommitInfo {
  const parts = line.split('|');
  return {
    sha: parts[0] ?? '',
    shortSha: parts[1] ?? '',
    author: parts[2] ?? '',
    email: parts[3] ?? '',
    timestamp: parseInt(parts[4] ?? '0', 10) * 1000, // git uses seconds, we store ms
    message: parts.slice(5).join('|'), // message may contain '|'
  };
}

/**
 * Parse output of `git diff --shortstat`.
 *
 * Format: " X files changed, Y insertions(+), Z deletions(-)"
 * (varies depending on content — some parts may be omitted)
 */
function parseShortStat(output: string): { filesChanged: number; insertions: number; deletions: number } {
  const result = { filesChanged: 0, insertions: 0, deletions: 0 };

  if (!output.trim()) return result;

  const filesMatch = output.match(/(\d+)\s+files?\s+changed/);
  if (filesMatch) result.filesChanged = parseInt(filesMatch[1], 10);

  const insertionsMatch = output.match(/(\d+)\s+insertions?\(\+\)/);
  if (insertionsMatch) result.insertions = parseInt(insertionsMatch[1], 10);

  const deletionsMatch = output.match(/(\d+)\s+deletions?\(-\)/);
  if (deletionsMatch) result.deletions = parseInt(deletionsMatch[1], 10);

  return result;
}

/**
 * Parse output of `git diff --numstat`.
 *
 * Format per line: "additions  deletions  filepath"
 * Binary files show as "-  -  filepath"
 */
function parseNumStat(output: string, commit: string, repoPath: string): DiffFile[] {
  if (!output.trim()) return [];

  return output
    .trim()
    .split('\n')
    .filter((line) => line.length > 0)
    .map((line) => {
      const parts = line.split('\t');
      const additions = parts[0] === '-' ? 0 : parseInt(parts[0] ?? '0', 10);
      const deletions = parts[1] === '-' ? 0 : parseInt(parts[1] ?? '0', 10);
      const path = parts[2] ?? '';

      // Determine status
      let status: DiffFile['status'] = 'modified';
      try {
        const statusCmd = `git diff-tree --no-commit-id -r ${commit}^..${commit} -- "${path}"`;
        const statusOutput = runGit(statusCmd, repoPath);
        const firstChar = statusOutput.trim()[0];
        if (firstChar === 'A') status = 'added';
        else if (firstChar === 'D') status = 'deleted';
        else if (firstChar === 'R') status = 'renamed';
      } catch {
        // Default to modified
      }

      return { path, additions, deletions, status };
    });
}

/**
 * Parse porcelain blame output to extract commit info.
 */
function parseBlameOutput(output: string): CommitInfo | null {
  if (!output.trim()) return null;

  let sha = '';
  let author = '';
  let email = '';
  let time = 0;
  let message = '';

  for (const line of output.split('\n')) {
    if (line.startsWith('commit ')) {
      // Wait — actually in --line-porcelain, the SHA is on a line that starts with the short sha
      // Let's look at the header line format
      const val = line.substring(7).trim();
      if (val.length >= 7) sha = val;
    } else if (line.startsWith('author ')) {
      author = line.substring(7);
    } else if (line.startsWith('author-mail ')) {
      email = line.substring(12).replace(/[<>]/g, '');
    } else if (line.startsWith('author-time ')) {
      time = parseInt(line.substring(12), 10) * 1000;
    } else if (line.startsWith('summary ')) {
      message = line.substring(8);
    }
  }

  // If we only got the short SHA from porcelain, resolve it
  // Actually --line-porcelain gives full SHA on the first field of each block
  // Let's re-examine: the first line of each block in --line-porcelain is:
  //   <sha> <origLine> <resultLine> [<numLines>]
  // followed by metadata lines

  // Re-parse more carefully
  const lines = output.split('\n');
  for (const line of lines) {
    // The header line: sha origLine resultLine [numLines]
    const headerMatch = line.match(/^([0-9a-f]{40})\s+(\d+)\s+(\d+)/);
    if (headerMatch) {
      sha = headerMatch[1];
      break;
    }
    // Sometimes git gives short SHA in the header
    const shortHeaderMatch = line.match(/^([0-9a-f]{7,40})\s+(\d+)\s+(\d+)/);
    if (shortHeaderMatch && !sha) {
      sha = shortHeaderMatch[1];
    }
  }

  if (!sha) return null;

  return {
    sha,
    shortSha: sha.substring(0, 7),
    author,
    email,
    timestamp: time,
    message,
  };
}
