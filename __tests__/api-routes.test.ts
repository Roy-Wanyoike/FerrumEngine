// @vitest-environment node
// ⚠️ CRITICAL: Environment variables MUST be set before any imports
// that trigger Next.js module evaluation. CLOUD_API_TOKEN is checked
// at middleware module-load time (top-level side effect).
(process.env as Record<string, string>)["NODE_ENV"] = "production";
(process.env as Record<string, string>)["CLOUD_API_TOKEN"] = "ferrum-test-api-token-12345";
(process.env as Record<string, string>)["CLOUD_ADMIN_PASSWORD"] = "ferrum-admin";

/**
 * ════════════════════════════════════════════════════════════════
 * Integration tests for FerrumEngine API routes
 *
 * Uses Next.js's programmatic API to handle requests in-process
 * via an HTTP server, so no external server process is needed.
 *
 * Self-contained: automatically runs `next build` if the .next
 * directory is missing or stale, ensuring tests never skip.
 * ════════════════════════════════════════════════════════════════
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { createServer as createHttpServer, type Server, type IncomingMessage, type ServerResponse } from "node:http";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { parse } from "node:url";

const PORT = 3099;
const BASE = `http://127.0.0.1:${PORT}`;
let httpServer: Server | null = null;
let nextHandler: ((req: IncomingMessage, res: ServerResponse, parsedUrl: ReturnType<typeof parse>) => Promise<void>) | null = null;

beforeAll(async () => {
  // ─── Ensure production build exists ─────────────────────────
  // If .next/BUILD_ID is missing (e.g. fresh clone, vitest file
  // ordering), run a production build automatically so the 17
  // integration tests can always run — never silently skip.
  const buildIdPath = join(process.cwd(), ".next", "BUILD_ID");
  if (!existsSync(buildIdPath)) {
    const { execSync } = await import("node:child_process");
    console.log("[api-routes] No .next/BUILD_ID found — running next build...");
    execSync("npx next build", { stdio: "inherit", timeout: 120_000 });
  }

  // Dynamic import of Next.js
  const Next = await import("next");
  const next = (Next as any).default ?? Next;
  const app = next({
    dir: process.cwd(),
    dev: false,
  });

  const handler = app.getRequestHandler();
  await app.prepare();
  nextHandler = handler;

  // Start a lightweight HTTP server that proxies to Next.js handler
  httpServer = createHttpServer(async (req, res) => {
    if (!nextHandler) {
      res.writeHead(503);
      res.end("Not ready");
      return;
    }
    const parsedUrl = parse(req.url || "/", true);
    await nextHandler(req, res, parsedUrl);
  });

  await new Promise<void>((resolve, reject) => {
    httpServer!.listen(PORT, "127.0.0.1", () => resolve());
    httpServer!.on("error", reject);
  });
}, 180000);

afterAll(async () => {
  if (httpServer) {
    await new Promise<void>((resolve) => httpServer!.close(() => resolve()));
    httpServer = null;
  }
});

/**
 * Make an HTTP request to our test server.
 * Uses the native Node.js http module for full control.
 */
async function makeHttpRequest(
  method: string,
  pathWithQuery: string,
  body?: string,
  headers?: Record<string, string>
): Promise<{ status: number; headers: Record<string, string>; body: string }> {
  return new Promise((resolve, reject) => {
    const url = new URL(pathWithQuery, BASE);
    const options = {
      hostname: "127.0.0.1",
      port: PORT,
      path: url.pathname + url.search,
      method,
      headers: headers ?? {},
    };

    const lib = require("node:http");
    const req = lib.request(options, (res: any) => {
      let data = "";
      res.on("data", (chunk: Buffer) => { data += chunk.toString(); });
      res.on("end", () => {
        resolve({
          status: res.statusCode ?? 0,
          headers: res.headers,
          body: data,
        });
      });
    });

    req.on("error", reject);

    if (body) {
      req.write(body);
    }
    req.end();
  });
}

function json(data: any): string {
  return JSON.stringify(data);
}

/* ════════════════════════════════════════════════════════════════
   API — /api (Info endpoint)
   ════════════════════════════════════════════════════════════════ */

describe("API — /api (Info endpoint)", () => {
  it("should return FerrumEngine metadata", async () => {
    const res = await makeHttpRequest("GET", "/api");
    expect(res.status).toBe(200);
    const data = JSON.parse(res.body);
    expect(data.name).toBe("FerrumEngine");
    expect(data.effects).toBeGreaterThan(0);
    expect(data.categories).toBeGreaterThan(0);
    expect(data.endpoints).toBeDefined();
  });

  it("should return correct effect count (542)", async () => {
    const res = await makeHttpRequest("GET", "/api");
    const data = JSON.parse(res.body);
    expect(data.effects).toBe(542);
  });

  it("should return category list", async () => {
    const res = await makeHttpRequest("GET", "/api");
    const data = JSON.parse(res.body);
    expect(data.categoryList).toBeDefined();
    expect(Array.isArray(data.categoryList)).toBe(true);
    data.categoryList.forEach((cat: { id: string; name: string; count: number }) => {
      expect(cat.id).toBeTruthy();
      expect(cat.name).toBeTruthy();
      expect(cat.count).toBeGreaterThanOrEqual(0);
    });
  });
});

/* ════════════════════════════════════════════════════════════════
   API — /api/css (Effects CDN)
   ════════════════════════════════════════════════════════════════ */

describe("API — /api/css (Effects CDN)", () => {
  it("should return usage help when no params given", async () => {
    const res = await makeHttpRequest("GET", "/api/css");
    expect(res.status).toBe(200);
    const data = JSON.parse(res.body);
    expect(data.message).toContain("specify");
    expect(data.totalEffects).toBe(542);
  });

  it("should return a single effect by name", async () => {
    const res = await makeHttpRequest("GET", "/api/css?effect=roycss-fade-in&format=json");
    expect(res.status).toBe(200);
    const data = JSON.parse(res.body);
    expect(data.count).toBeGreaterThanOrEqual(1);
    expect(data.effects[0].css).toContain("roycss-fade-in");
  });

  it("should return 404 for nonexistent effect", async () => {
    const res = await makeHttpRequest("GET", "/api/css?effect=nonexistent-effect-xyz");
    expect(res.status).toBe(404);
  });

  it("should return effects by category", async () => {
    const res = await makeHttpRequest("GET", "/api/css?category=hover&format=json");
    expect(res.status).toBe(200);
    const data = JSON.parse(res.body);
    expect(data.count).toBeGreaterThan(0);
  });

  it("should return all effects CSS when all=true", async () => {
    const res = await makeHttpRequest("GET", "/api/css?all=true");
    expect(res.status).toBe(200);
    const contentType = res.headers["content-type"] ?? "";
    expect(contentType).toContain("text/css");
  });

  it("should return minified CSS when minified=true", async () => {
    const res = await makeHttpRequest("GET", "/api/css?all=true&minified=true");
    expect(res.status).toBe(200);
    // Minified CSS should have no comments
    expect(res.body).not.toContain("/*");
  });
});

/* ════════════════════════════════════════════════════════════════
   API — /api/tokens (Design Tokens)
   ════════════════════════════════════════════════════════════════ */

describe("API — /api/tokens (Design Tokens)", () => {
  it("should return token metadata", async () => {
    const res = await makeHttpRequest("GET", "/api/tokens");
    expect(res.status).toBe(200);
    const data = JSON.parse(res.body);
    expect(data.name).toBe("@ferrum/tokens");
    expect(data.tokens.colors).toBeGreaterThan(0);
    expect(data.tokens.spacing).toBeGreaterThan(0);
    expect(data.samples.colors).toBeDefined();
  });
});

/* ════════════════════════════════════════════════════════════════
   API — /api/cloud/auth (Authentication)
   ════════════════════════════════════════════════════════════════ */

describe("API — /api/cloud/auth (Authentication)", () => {
  it("should reject requests without password", async () => {
    const res = await makeHttpRequest("POST", "/api/cloud/auth", json({}), {
      "Content-Type": "application/json",
    });
    expect(res.status).toBe(400);
  });

  it("should reject wrong password", async () => {
    const res = await makeHttpRequest("POST", "/api/cloud/auth", json({ password: "wrong-password" }), {
      "Content-Type": "application/json",
    });
    expect(res.status).toBe(401);
  });

  it("should accept correct password and return token", async () => {
    const res = await makeHttpRequest("POST", "/api/cloud/auth", json({ password: "ferrum-admin" }), {
      "Content-Type": "application/json",
    });
    expect(res.status).toBe(200);
    const data = JSON.parse(res.body);
    expect(data.token).toBeTruthy();
  });
});

/* ════════════════════════════════════════════════════════════════
   API — /api/health (Health Check)
   ════════════════════════════════════════════════════════════════ */

describe("API — /api/health (Health Check)", () => {
  it("should return 200 OK with health status", async () => {
    const res = await makeHttpRequest("GET", "/api/health");
    expect(res.status).toBe(200);
    const data = JSON.parse(res.body);
    expect(data.status).toMatch(/^(ok|degraded)$/);
    expect(data.timestamp).toBeTruthy();
    expect(data.version).toBeTruthy();
    expect(typeof data.uptime).toBe("number");
    expect(data.services).toBeDefined();
    expect(data.services.cloudStore.status).toBe("ok");
  });

  it("should include memory usage information", async () => {
    const res = await makeHttpRequest("GET", "/api/health");
    const data = JSON.parse(res.body);
    expect(data.services.memory).toBeDefined();
    expect(typeof data.services.memory.usedMB).toBe("number");
    expect(data.services.memory.usedMB).toBeGreaterThan(0);
  });
});

/* ════════════════════════════════════════════════════════════════
   API — /api/cloud/* (Protected Routes)
   ════════════════════════════════════════════════════════════════ */

describe("API — /api/cloud/* (Protected Routes)", () => {
  it("should reject unauthenticated requests with 401", async () => {
    const res = await makeHttpRequest("GET", "/api/cloud/teams");
    expect(res.status).toBe(401);
  });

  it("should accept authenticated requests", async () => {
    // First get token
    const authRes = await makeHttpRequest("POST", "/api/cloud/auth", json({ password: "ferrum-admin" }), {
      "Content-Type": "application/json",
    });
    const { token } = JSON.parse(authRes.body);

    // Use token to access protected route
    const res = await makeHttpRequest("GET", "/api/cloud/teams", undefined, {
      Authorization: `Bearer ${token}`,
    });
    expect(res.status).toBe(200);
    const teams = JSON.parse(res.body);
    expect(Array.isArray(teams)).toBe(true);
  });
});
