/**
 * File-based JSON persistence for the in-memory CloudStore.
 *
 * Design goals:
 *   - Survive server restarts (writes go to disk)
 *   - Non-blocking: writes are debounced + async (request handlers don't wait for fs)
 *   - Atomic: writes go to a temp file then renamed (no torn writes on crash)
 *   - Tolerant: if the file is corrupt or missing, fall back to seed data
 *
 * Path: /home/z/my-project/db/cloud-store.json (gitignored)
 *
 * Public API:
 *   loadSnapshot(): CloudSnapshot | null
 *   saveSnapshot(snapshot: CloudSnapshot): void   (debounced, fire-and-forget)
 *   flushSync(): void                              (force write, used in tests / shutdown)
 *
 * The snapshot is a plain JSON-serializable object — see CloudStore.serialize().
 */

import { promises as fs, existsSync, readFileSync, mkdirSync, writeFileSync, renameSync } from "node:fs";
import * as path from "node:path";

const DB_DIR = path.join(process.cwd(), "db");
export const DB_FILE = path.join(DB_DIR, "cloud-store.json");
const TMP_FILE = path.join(DB_DIR, "cloud-store.json.tmp");

export interface PersistStats {
  lastLoadedAt: string | null;
  lastSavedAt: string | null;
  writeCount: number;
  loadCount: number;
  lastError: string | null;
  filePath: string;
}

const stats: PersistStats = {
  lastLoadedAt: null,
  lastSavedAt: null,
  writeCount: 0,
  loadCount: 0,
  lastError: null,
  filePath: DB_FILE,
};

export function getPersistStats(): PersistStats {
  return { ...stats };
}

// Debounce: collapse rapid successive writes into a single disk write.
// 200ms is short enough that a user sees their change persisted within a
// single API request lifecycle, but long enough to coalesce bursts.
const DEBOUNCE_MS = 200;
let pendingWrite: NodeJS.Timeout | null = null;
let pendingSnapshot: unknown = null;

/**
 * Read the persisted snapshot from disk.
 * Returns null if the file is missing, unreadable, or corrupt (triggers seed fallback).
 */
export function loadSnapshot<T>(): T | null {
  try {
    // Synchronous read — only called once at store init.
    if (!existsSync(DB_FILE)) {
      return null;
    }
    const raw = readFileSync(DB_FILE, "utf8");
    const parsed = JSON.parse(raw);
    stats.lastLoadedAt = new Date().toISOString();
    stats.loadCount++;
    return parsed as T;
  } catch (e) {
    stats.lastError = e instanceof Error ? e.message : String(e);
    // Don't throw — caller falls back to seed data.
    return null;
  }
}

/**
 * Queue a snapshot to be written to disk (debounced, non-blocking).
 * Safe to call from request handlers — the actual fs.write happens on next tick.
 */
export function saveSnapshot(snapshot: unknown): void {
  pendingSnapshot = snapshot;
  if (pendingWrite) clearTimeout(pendingWrite);
  pendingWrite = setTimeout(() => {
    void flushToDisk();
  }, DEBOUNCE_MS);
}

/**
 * Force immediate write to disk. Used by tests and graceful shutdown.
 */
export async function flushToDisk(): Promise<void> {
  if (pendingWrite) {
    clearTimeout(pendingWrite);
    pendingWrite = null;
  }
  if (pendingSnapshot === null) return;

  const snapshot = pendingSnapshot;
  pendingSnapshot = null;

  try {
    await fs.mkdir(DB_DIR, { recursive: true });
    // Write to temp file first, then rename — atomic on POSIX.
    await fs.writeFile(TMP_FILE, JSON.stringify(snapshot, null, 2), "utf8");
    await fs.rename(TMP_FILE, DB_FILE);
    stats.lastSavedAt = new Date().toISOString();
    stats.writeCount++;
    stats.lastError = null;
  } catch (e) {
    stats.lastError = e instanceof Error ? e.message : String(e);
    // Don't rethrow — persistence failures shouldn't crash the API.
    // The in-memory store is still authoritative; we just lose durability.
  }
}

/**
 * Synchronous flush for graceful shutdown handlers (process.on('SIGTERM')).
 */
export function flushSync(): void {
  if (pendingSnapshot === null) return;
  try {
    mkdirSync(DB_DIR, { recursive: true });
    writeFileSync(TMP_FILE, JSON.stringify(pendingSnapshot, null, 2), "utf8");
    renameSync(TMP_FILE, DB_FILE);
    stats.lastSavedAt = new Date().toISOString();
    stats.writeCount++;
    pendingSnapshot = null;
    if (pendingWrite) {
      clearTimeout(pendingWrite);
      pendingWrite = null;
    }
  } catch (e) {
    stats.lastError = e instanceof Error ? e.message : String(e);
  }
}

// Register graceful shutdown handler ONCE so pending writes don't get lost.
let shutdownRegistered = false;
export function registerShutdownHook(): void {
  if (shutdownRegistered) return;
  shutdownRegistered = true;
  // In Next.js dev/prod these signals do fire; in serverless they won't,
  // but the debounce ensures writes happen within ~200ms anyway.
  for (const sig of ["SIGTERM", "SIGINT"] as const) {
    process.once(sig, () => {
      flushSync();
    });
  }
}
