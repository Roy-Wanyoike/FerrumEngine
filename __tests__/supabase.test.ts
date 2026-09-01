import { describe, it, expect, vi, beforeAll, afterAll, afterEach } from "vitest";
/* ════════════════════════════════════════════════════════════════
   Tests for Supabase integration (T-F06)
   ════════════════════════════════════════════════════════════════ */

describe("isSupabaseConfigured() — env not set", () => {
  it("should return false when NEXT_PUBLIC_SUPABASE_URL is not set", async () => {
    // Ensure no Supabase URL is leaking in from the environment
    const original = process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;

    vi.resetModules();
    const mod = await import("@/lib/supabase");

    expect(mod.isSupabaseConfigured()).toBe(false);

    // Restore
    if (original !== undefined) process.env.NEXT_PUBLIC_SUPABASE_URL = original;
  });
});

describe("isSupabaseConfigured() — env set", () => {
  it("should return true when NEXT_PUBLIC_SUPABASE_URL is set to a valid URL", async () => {
    const original = process.env.NEXT_PUBLIC_SUPABASE_URL;
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";

    vi.resetModules();
    const mod = await import("@/lib/supabase");

    expect(mod.isSupabaseConfigured()).toBe(true);

    // Restore
    if (original !== undefined) process.env.NEXT_PUBLIC_SUPABASE_URL = original;
    else delete process.env.NEXT_PUBLIC_SUPABASE_URL;
  });
});

describe("getSupabaseClient()", () => {
  const mockClient = {
    from: vi.fn().mockReturnThis(),
    auth: { getUser: vi.fn(), signInWithPassword: vi.fn(), signOut: vi.fn() },
    realtime: { connect: vi.fn(), disconnect: vi.fn() },
  };

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return a client instance", async () => {
    vi.doMock("@supabase/supabase-js", () => ({
      createClient: vi.fn(() => mockClient),
    }));

    vi.resetModules();
    const mod = await import("@/lib/supabase");

    const client = mod.getSupabaseClient();
    expect(client).toBeDefined();
    expect(client).toHaveProperty("from");
    expect(client).toHaveProperty("auth");
    expect(typeof client.from).toBe("function");
    expect(typeof client.auth).toBe("object");

    vi.doUnmock("@supabase/supabase-js");
  });
});

describe("supabase-store — graceful fallback when not configured", () => {
  const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  beforeAll(() => {
    // Ensure Supabase is NOT configured for these tests
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    vi.resetModules();
  });

  afterAll(() => {
    if (originalUrl !== undefined) process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
  });

  it("supabaseGetTeams() should fall back to in-memory store and return an array", async () => {
    const { supabaseGetTeams } = await import("@/lib/supabase-store");
    const teams = await supabaseGetTeams();
    expect(Array.isArray(teams)).toBe(true);
  });

  it("supabaseGetProjects() should fall back to in-memory store", async () => {
    const { supabaseGetProjects } = await import("@/lib/supabase-store");
    const projects = await supabaseGetProjects("any-team-id");
    expect(Array.isArray(projects)).toBe(true);
  });

  it("supabaseGetTokens() should fall back to in-memory store", async () => {
    const { supabaseGetTokens } = await import("@/lib/supabase-store");
    const tokens = await supabaseGetTokens("any-project-id");
    expect(Array.isArray(tokens)).toBe(true);
  });

  it("supabaseGetComponents() should fall back to in-memory store", async () => {
    const { supabaseGetComponents } = await import("@/lib/supabase-store");
    const components = await supabaseGetComponents("any-project-id");
    expect(Array.isArray(components)).toBe(true);
  });

  it("supabaseGetAuditLogs() should fall back to in-memory store", async () => {
    const { supabaseGetAuditLogs } = await import("@/lib/supabase-store");
    const logs = await supabaseGetAuditLogs();
    expect(Array.isArray(logs)).toBe(true);
  });
});
