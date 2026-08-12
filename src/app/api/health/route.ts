import { promises as fs } from "node:fs";
import * as path from "node:path";
import { NextResponse } from "next/server";
import { getCloudStore } from "@/lib/cloud-store";
import { getPersistStats } from "@/lib/persist";

/**
 * GET /api/health
 *
 * Returns service health status for uptime monitoring.
 * Used by load balancers, monitoring tools, and deployment checks.
 *
 * Response shape:
 *   {
 *     status: "ok" | "degraded" | "down",
 *     timestamp: ISO string,
 *     version: string,
 *     uptime: number (seconds),
 *     services: { ... }
 *   }
 *
 * Status codes:
 *   200 — all systems operational
 *   503 — one or more services degraded
 */

const START_TIME = Date.now();
const VERSION = "0.0.1";

export async function GET() {
  const now = Date.now();
  const uptimeSeconds = Math.floor((now - START_TIME) / 1000);

  // Check cloud store (in-memory, always available)
  let cloudStoreOk = true;
  let cloudStoreError: string | null = null;
  let teamCount = 0;
  try {
    const store = getCloudStore();
    teamCount = store.getTeams().length;
  } catch (e) {
    cloudStoreOk = false;
    cloudStoreError = e instanceof Error ? e.message : "Unknown error";
  }

  // Check persistence layer (DB file)
  const persistStats = getPersistStats();
  let dbFileExists = false;
  let dbFileSizeBytes = 0;
  try {
    const dbPath = path.join(process.cwd(), "db", "cloud-store.json");
    const stat = await fs.stat(dbPath);
    dbFileExists = true;
    dbFileSizeBytes = stat.size;
  } catch {
    dbFileExists = false;
  }

  // Check memory usage (Node.js process)
  const memUsage = process.memoryUsage();
  const memUsedMB = Math.round(memUsage.rss / 1024 / 1024);
  const memWarning = memUsedMB > 500; // >500MB = warning

  const services = {
    cloudStore: {
      status: cloudStoreOk ? "ok" : "down",
      error: cloudStoreError,
      teamCount,
    },
    persistence: {
      status: dbFileExists ? "ok" : "warning",
      fileExists: dbFileExists,
      fileSizeBytes: dbFileSizeBytes,
      lastLoadedAt: persistStats.lastLoadedAt,
      lastSavedAt: persistStats.lastSavedAt,
      writeCount: persistStats.writeCount,
      loadCount: persistStats.loadCount,
      lastError: persistStats.lastError,
    },
    memory: {
      status: memWarning ? "warning" : "ok",
      usedMB: memUsedMB,
      thresholdMB: 500,
    },
  };

  const allOk = cloudStoreOk && !memWarning;
  const status = allOk ? "ok" : "degraded";

  return NextResponse.json(
    {
      status,
      timestamp: new Date().toISOString(),
      version: VERSION,
      uptime: uptimeSeconds,
      environment: process.env.NODE_ENV || "development",
      services,
    },
    {
      status: allOk ? 200 : 503,
      headers: {
        // Health checks are short-lived; cache for 10s to avoid thundering herd from monitors
        "Cache-Control": "public, max-age=10, stale-while-revalidate=30",
      },
    }
  );
}
