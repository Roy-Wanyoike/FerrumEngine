import * as fs from "node:fs";
import * as path from "node:path";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

/* ════════════════════════════════════════════════════════════════
   Tests for file-based persistence layer (Phase 10)

   These tests exercise the load/save lifecycle of CloudStore:
     1. Fresh state (no DB file) → seeds data + writes file
     2. Existing DB file → loads from disk
     3. Corrupt DB file → falls back to seed data
     4. Mutation → triggers debounced write
     5. Atomic rename → no torn writes
   ════════════════════════════════════════════════════════════════ */

const DB_DIR = path.join(process.cwd(), "db");
const DB_FILE = path.join(DB_DIR, "cloud-store.json");

function wipeDb() {
  try { fs.unlinkSync(DB_FILE); } catch { /* ignore */ }
  try { fs.unlinkSync(DB_FILE + ".tmp"); } catch { /* ignore */ }
}

describe("Persistence layer — loadSnapshot / saveSnapshot", () => {
  beforeEach(() => wipeDb());
  afterEach(() => wipeDb());

  it("should return null when no DB file exists (triggers seed fallback)", async () => {
    const { loadSnapshot } = await import("@/lib/persist");
    expect(loadSnapshot()).toBeNull();
  });

  it("should round-trip a snapshot through disk", async () => {
    const { saveSnapshot, loadSnapshot, flushToDisk } = await import("@/lib/persist");
    const data = { teams: [{ id: "t1", name: "Acme" }], version: 1, savedAt: "2026-01-01T00:00:00.000Z" };
    saveSnapshot(data);
    await flushToDisk();
    const loaded = loadSnapshot<typeof data>();
    expect(loaded).not.toBeNull();
    expect(loaded!.teams).toBeDefined();
    expect(loaded!.teams[0]?.name).toBe("Acme");
    expect(loaded!.version).toBe(1);
  });

  it("should handle corrupt JSON gracefully (return null, fall back to seed)", async () => {
    // Write garbage to the DB file
    fs.mkdirSync(DB_DIR, { recursive: true });
    fs.writeFileSync(DB_FILE, "{not valid json", "utf8");
    const { loadSnapshot } = await import("@/lib/persist");
    expect(loadSnapshot()).toBeNull();
  });

  it("should write atomically (no .tmp file left behind after success)", async () => {
    const { saveSnapshot, flushToDisk } = await import("@/lib/persist");
    saveSnapshot({ foo: "bar" });
    await flushToDisk();
    expect(fs.existsSync(DB_FILE)).toBe(true);
    expect(fs.existsSync(DB_FILE + ".tmp")).toBe(false);
  });

  it("should debounce multiple rapid writes into one disk write", async () => {
    const { saveSnapshot, flushToDisk, getPersistStats } = await import("@/lib/persist");
    const before = getPersistStats().writeCount;
    // Fire 5 writes in rapid succession
    for (let i = 0; i < 5; i++) {
      saveSnapshot({ count: i });
    }
    await flushToDisk(); // collapses the queue
    const after = getPersistStats().writeCount;
    // Should be at most +1 disk write, not +5
    expect(after - before).toBe(1);
  });
});

describe("CloudStore — persistence integration", () => {
  beforeEach(() => wipeDb());
  afterEach(() => wipeDb());

  it("should seed + persist on first access", async () => {
    const { __resetCloudStoreForTests, getCloudStore } = await import("@/lib/cloud-store");
    const { flushToDisk } = await import("@/lib/persist");
    __resetCloudStoreForTests();

    // First access: no DB file → seeds + queues a write
    expect(fs.existsSync(DB_FILE)).toBe(false);
    const store = getCloudStore();
    expect(store.getTeams().length).toBeGreaterThan(0);

    // Force the debounced write to complete
    await flushToDisk();
    expect(fs.existsSync(DB_FILE)).toBe(true);

    // File should contain valid JSON with seed data
    const raw = fs.readFileSync(DB_FILE, "utf8");
    const parsed = JSON.parse(raw);
    expect(parsed.teams.length).toBeGreaterThan(0);
    expect(parsed.tokenList.length).toBeGreaterThan(0);
  });

  it("should reload from disk on subsequent access (data survives restart)", async () => {
    const { __resetCloudStoreForTests, getCloudStore } = await import("@/lib/cloud-store");
    const { flushToDisk } = await import("@/lib/persist");

    // Session 1: create a custom team + persist
    __resetCloudStoreForTests();
    wipeDb();
    const store1 = getCloudStore();
    const created = store1.createTeam("Persisted Team XYZ");
    await flushToDisk();

    // Session 2: simulate restart — reset singleton only (keep file), force reload from disk
    __resetCloudStoreForTests(false);
    const store2 = getCloudStore();
    const reloaded = store2.getTeam(created.id);
    expect(reloaded).toBeDefined();
    expect(reloaded!.name).toBe("Persisted Team XYZ");
  });

  it("should fall back to seed data when DB file is corrupt", async () => {
    const { __resetCloudStoreForTests, getCloudStore } = await import("@/lib/cloud-store");
    __resetCloudStoreForTests();

    // Write corrupt JSON
    fs.mkdirSync(DB_DIR, { recursive: true });
    fs.writeFileSync(DB_FILE, "{ broken", "utf8");

    // Should NOT throw — should fall back to seed
    const store = getCloudStore();
    expect(store.getTeams().length).toBeGreaterThan(0);
  });
});
