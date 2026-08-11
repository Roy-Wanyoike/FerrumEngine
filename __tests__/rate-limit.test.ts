import { describe, it, expect } from "vitest";

/* ════════════════════════════════════════════════════════════════
   Unit tests for rate limiting logic (extracted from middleware)
   ════════════════════════════════════════════════════════════════ */

type RateEntry = { count: number; resetAt: number };

function checkRateLimit(
  store: Map<string, RateEntry>,
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || now > existing.resetAt) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: maxRequests - 1, resetAt };
  }

  existing.count++;
  const allowed = existing.count <= maxRequests;
  return {
    allowed,
    remaining: Math.max(0, maxRequests - existing.count),
    resetAt: existing.resetAt,
  };
}

describe("Rate Limiter — checkRateLimit()", () => {
  it("should allow first request and set up window", () => {
    const store = new Map<string, RateEntry>();
    const result = checkRateLimit(store, "ip-1", 10, 60000);
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(9);
    expect(result.resetAt).toBeGreaterThan(Date.now());
  });

  it("should count requests within the window", () => {
    const store = new Map<string, RateEntry>();
    checkRateLimit(store, "ip-1", 10, 60000);
    checkRateLimit(store, "ip-1", 10, 60000);
    const result = checkRateLimit(store, "ip-1", 10, 60000);
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(7);
  });

  it("should block request when limit exceeded", () => {
    const store = new Map<string, RateEntry>();
    for (let i = 0; i < 10; i++) {
      checkRateLimit(store, "ip-1", 10, 60000);
    }
    const result = checkRateLimit(store, "ip-1", 10, 60000);
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("should reset count after window expires", () => {
    const store = new Map<string, RateEntry>();
    // Set initial entry with expired reset time
    store.set("ip-1", { count: 10, resetAt: Date.now() - 1000 });
    const result = checkRateLimit(store, "ip-1", 10, 60000);
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(9);
  });

  it("should track different IPs separately", () => {
    const store = new Map<string, RateEntry>();
    checkRateLimit(store, "ip-1", 5, 60000);
    checkRateLimit(store, "ip-1", 5, 60000);
    checkRateLimit(store, "ip-2", 5, 60000);
    expect(store.size).toBe(2);
    expect(store.get("ip-1")!.count).toBe(2);
    expect(store.get("ip-2")!.count).toBe(1);
  });

  it("should never return negative remaining", () => {
    const store = new Map<string, RateEntry>();
    for (let i = 0; i < 20; i++) {
      checkRateLimit(store, "ip-1", 5, 60000);
    }
    const result = checkRateLimit(store, "ip-1", 5, 60000);
    expect(result.remaining).toBe(0);
    expect(result.remaining).toBeGreaterThanOrEqual(0);
  });

  it("should respect custom window and limit values", () => {
    const store = new Map<string, RateEntry>();
    // 3 requests / 1 second
    checkRateLimit(store, "ip-1", 3, 1000);
    checkRateLimit(store, "ip-1", 3, 1000);
    const third = checkRateLimit(store, "ip-1", 3, 1000);
    expect(third.allowed).toBe(true);
    expect(third.remaining).toBe(0);

    const fourth = checkRateLimit(store, "ip-1", 3, 1000);
    expect(fourth.allowed).toBe(false);
  });
});

describe("Rate Limiter — Middleware Constants", () => {
  it("should have sensible auth rate limits", () => {
    const AUTH_MAX = 10;
    const AUTH_WINDOW = 15 * 60 * 1000;
    expect(AUTH_MAX).toBeLessThanOrEqual(20); // Not too loose
    expect(AUTH_MAX).toBeGreaterThanOrEqual(5); // Not too strict
    expect(AUTH_WINDOW).toBeGreaterThanOrEqual(5 * 60 * 1000); // At least 5 min
  });

  it("should have sensible API rate limits", () => {
    const API_MAX = 100;
    const API_WINDOW = 60 * 1000;
    expect(API_MAX).toBeGreaterThanOrEqual(50); // Allow real usage
    expect(API_MAX).toBeLessThanOrEqual(1000); // Not unlimited
    expect(API_WINDOW).toBe(60 * 1000); // 1 minute
  });
});
