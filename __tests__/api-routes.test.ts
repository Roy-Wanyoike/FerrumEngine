import { describe, it, expect, beforeAll } from "vitest";

/* ════════════════════════════════════════════════════════════════
   Integration tests for FerrumEngine API routes
   Run against a live server — requires `next start` running on port 3000
   ════════════════════════════════════════════════════════════════ */

const BASE = "http://localhost:3000";
let serverAvailable = false;

beforeAll(async () => {
  try {
    const res = await fetch(`${BASE}/api`, { signal: AbortSignal.timeout(3000) });
    serverAvailable = res.ok;
  } catch {
    serverAvailable = false;
  }
});

describe.skipIf(!serverAvailable)("API — /api (Info endpoint)", () => {
  it("should return FerrumEngine metadata", async () => {
    const res = await fetch(`${BASE}/api`);
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data.name).toBe("FerrumEngine");
    expect(data.effects).toBeGreaterThan(0);
    expect(data.categories).toBeGreaterThan(0);
    expect(data.endpoints).toBeDefined();
  });

  it("should return correct effect count (542)", async () => {
    const res = await fetch(`${BASE}/api`);
    const data = await res.json();
    expect(data.effects).toBe(542);
  });

  it("should return category list", async () => {
    const res = await fetch(`${BASE}/api`);
    const data = await res.json();
    expect(data.categoryList).toBeDefined();
    expect(Array.isArray(data.categoryList)).toBe(true);
    data.categoryList.forEach((cat: { id: string; name: string; count: number }) => {
      expect(cat.id).toBeTruthy();
      expect(cat.name).toBeTruthy();
      expect(cat.count).toBeGreaterThanOrEqual(0);
    });
  });
});

describe.skipIf(!serverAvailable)("API — /api/css (Effects CDN)", () => {
  it("should return usage help when no params given", async () => {
    const res = await fetch(`${BASE}/api/css`);
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data.message).toContain("specify");
    expect(data.totalEffects).toBe(542);
  });

  it("should return a single effect by name", async () => {
    const res = await fetch(`${BASE}/api/css?effect=rc-fade-in&format=json`);
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data.count).toBeGreaterThanOrEqual(1);
    expect(data.effects[0].css).toContain("rc-fade-in");
  });

  it("should return 404 for nonexistent effect", async () => {
    const res = await fetch(`${BASE}/api/css?effect=nonexistent-effect-xyz`);
    expect(res.status).toBe(404);
  });

  it("should return effects by category", async () => {
    const res = await fetch(`${BASE}/api/css?category=hover&format=json`);
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data.count).toBeGreaterThan(0);
  });

  it("should return all effects CSS when all=true", async () => {
    const res = await fetch(`${BASE}/api/css?all=true`);
    expect(res.ok).toBe(true);
    expect(res.headers.get("content-type")).toContain("text/css");
  });

  it("should return minified CSS when minified=true", async () => {
    const res = await fetch(`${BASE}/api/css?all=true&minified=true`);
    expect(res.ok).toBe(true);
    const css = await res.text();
    // Minified CSS should have no comments
    expect(css).not.toContain("/*");
  });
});

describe.skipIf(!serverAvailable)("API — /api/tokens (Design Tokens)", () => {
  it("should return token metadata", async () => {
    const res = await fetch(`${BASE}/api/tokens`);
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data.name).toBe("@ferrum/tokens");
    expect(data.tokens.colors).toBeGreaterThan(0);
    expect(data.tokens.spacing).toBeGreaterThan(0);
    expect(data.samples.colors).toBeDefined();
  });
});

describe.skipIf(!serverAvailable)("API — /api/cloud/auth (Authentication)", () => {
  it("should reject requests without password", async () => {
    const res = await fetch(`${BASE}/api/cloud/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    expect(res.status).toBe(400);
  });

  it("should reject wrong password", async () => {
    const res = await fetch(`${BASE}/api/cloud/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "wrong-password" }),
    });
    expect(res.status).toBe(401);
  });

  it("should accept correct password and return token", async () => {
    const res = await fetch(`${BASE}/api/cloud/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "ferrum-admin" }),
    });
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data.token).toBeTruthy();
  });
});

describe.skipIf(!serverAvailable)("API — /api/health (Health Check)", () => {
  it("should return 200 OK with health status", async () => {
    const res = await fetch(`${BASE}/api/health`);
    expect(res.ok).toBe(true);
    const data = await res.json();
    expect(data.status).toMatch(/^(ok|degraded)$/);
    expect(data.timestamp).toBeTruthy();
    expect(data.version).toBeTruthy();
    expect(typeof data.uptime).toBe("number");
    expect(data.services).toBeDefined();
    expect(data.services.cloudStore.status).toBe("ok");
  });

  it("should include memory usage information", async () => {
    const res = await fetch(`${BASE}/api/health`);
    const data = await res.json();
    expect(data.services.memory).toBeDefined();
    expect(typeof data.services.memory.usedMB).toBe("number");
    expect(data.services.memory.usedMB).toBeGreaterThan(0);
  });
});

describe.skipIf(!serverAvailable)("API — /api/cloud/* (Protected Routes)", () => {
  it("should reject unauthenticated requests with 401", async () => {
    const res = await fetch(`${BASE}/api/cloud/teams`);
    expect(res.status).toBe(401);
  });

  it("should accept authenticated requests", async () => {
    // First get token
    const authRes = await fetch(`${BASE}/api/cloud/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: "ferrum-admin" }),
    });
    const { token } = await authRes.json();

    // Use token to access protected route
    const res = await fetch(`${BASE}/api/cloud/teams`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.ok).toBe(true);
    const teams = await res.json();
    expect(Array.isArray(teams)).toBe(true);
  });
});
