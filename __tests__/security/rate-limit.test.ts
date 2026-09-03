import { describe, it, expect, vi } from "vitest";
import {
  RateLimiter,
  InMemoryRateLimitStore,
  type RateLimitStore,
  type RateLimitEntry,
} from "@/lib/rate-limit";

describe("RateLimiter — T-H05 Per-Session Rate Limiting", () => {
  describe("basic limiting", () => {
    it("should allow first request and set up window", () => {
      const limiter = new RateLimiter();
      const result = limiter.check("key-1", 10, 60_000);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(9);
      expect(result.resetAt).toBeGreaterThan(Date.now());
    });

    it("should count requests within the window", () => {
      const limiter = new RateLimiter();
      limiter.check("key-1", 10, 60_000);
      limiter.check("key-1", 10, 60_000);
      const result = limiter.check("key-1", 10, 60_000);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(7);
    });

    it("should block request when limit exceeded", () => {
      const limiter = new RateLimiter();
      for (let i = 0; i < 10; i++) {
        limiter.check("key-1", 10, 60_000);
      }
      const result = limiter.check("key-1", 10, 60_000);
      expect(result.allowed).toBe(false);
      expect(result.remaining).toBe(0);
    });

    it("should never return negative remaining", () => {
      const limiter = new RateLimiter();
      for (let i = 0; i < 20; i++) {
        limiter.check("key-1", 5, 60_000);
      }
      const result = limiter.check("key-1", 5, 60_000);
      expect(result.remaining).toBe(0);
      expect(result.remaining).toBeGreaterThanOrEqual(0);
    });
  });

  describe("window expiry", () => {
    it("should reset count after window expires", () => {
      const store = new InMemoryRateLimitStore();
      // Pre-populate with an expired entry
      store.set("key-1", { count: 10, resetAt: Date.now() - 1000 });
      const limiter = new RateLimiter(store);

      const result = limiter.check("key-1", 10, 60_000);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(9);
    });

    it("should respect custom window and limit values", () => {
      const limiter = new RateLimiter();
      // 3 requests / 1 second
      limiter.check("key-1", 3, 1_000);
      limiter.check("key-1", 3, 1_000);
      const third = limiter.check("key-1", 3, 1_000);
      expect(third.allowed).toBe(true);
      expect(third.remaining).toBe(0);

      const fourth = limiter.check("key-1", 3, 1_000);
      expect(fourth.allowed).toBe(false);
    });
  });

  describe("different keys", () => {
    it("should track different keys independently", () => {
      const store = new InMemoryRateLimitStore();
      const limiter = new RateLimiter(store);

      limiter.check("session:abc", 5, 60_000);
      limiter.check("session:abc", 5, 60_000);
      limiter.check("session:def", 5, 60_000);

      // session:abc has 2, session:def has 1
      const r1 = limiter.check("session:abc", 5, 60_000);
      expect(r1.remaining).toBe(2);

      const r2 = limiter.check("session:def", 5, 60_000);
      expect(r2.remaining).toBe(3);

      expect(store.size).toBe(2);
    });

    it("should use session token key format correctly", () => {
      const limiter = new RateLimiter();
      const result = limiter.check("session:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", 100, 60_000);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(99);
    });

    it("should use IP fallback key format correctly", () => {
      const limiter = new RateLimiter();
      const result = limiter.check("ip:192.168.1.1", 100, 60_000);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(99);
    });
  });

  describe("cleanup", () => {
    it("should remove expired entries and return the count", () => {
      const store = new InMemoryRateLimitStore();
      const limiter = new RateLimiter(store);

      // Expired entry
      store.set("expired-1", { count: 5, resetAt: Date.now() - 10_000 });
      // Still valid
      store.set("valid-1", { count: 3, resetAt: Date.now() + 60_000 });
      // Another expired
      store.set("expired-2", { count: 1, resetAt: Date.now() - 5_000 });

      expect(store.size).toBe(3);
      const removed = limiter.cleanup();
      expect(removed).toBe(2);
      expect(store.size).toBe(1);
    });

    it("should return 0 when nothing is expired", () => {
      const limiter = new RateLimiter();
      limiter.check("key-1", 5, 60_000);
      const removed = limiter.cleanup();
      expect(removed).toBe(0);
    });

    it("should handle empty store gracefully", () => {
      const limiter = new RateLimiter();
      const removed = limiter.cleanup();
      expect(removed).toBe(0);
    });
  });

  describe("pluggable store interface", () => {
    it("should work with a custom store implementation", () => {
      const data = new Map<string, RateLimitEntry>();
      const customStore: RateLimitStore = {
        get: (key: string) => data.get(key),
        set: (key: string, entry: RateLimitEntry) => { data.set(key, entry); },
        delete: (key: string) => { data.delete(key); },
        keys: () => data.keys(),
      };

      const limiter = new RateLimiter(customStore);

      for (let i = 0; i < 3; i++) {
        limiter.check("test", 3, 60_000);
      }
      const blocked = limiter.check("test", 3, 60_000);
      expect(blocked.allowed).toBe(false);
    });

    it("should call store methods correctly", () => {
      const getSpy = vi.fn(() => undefined);
      const setSpy = vi.fn();

      const spyStore: RateLimitStore = {
        get: getSpy,
        set: setSpy,
        delete: () => {},
        keys: () => [],
      };

      const limiter = new RateLimiter(spyStore);
      limiter.check("key-1", 10, 60_000);

      expect(getSpy).toHaveBeenCalledWith("key-1");
      expect(setSpy).toHaveBeenCalledWith("key-1", {
        count: 1,
        resetAt: expect.any(Number),
      });
    });
  });

  describe("edge cases", () => {
    it("should handle limit of 1 (single request per window)", () => {
      const limiter = new RateLimiter();
      const first = limiter.check("key", 1, 60_000);
      expect(first.allowed).toBe(true);
      expect(first.remaining).toBe(0);

      const second = limiter.check("key", 1, 60_000);
      expect(second.allowed).toBe(false);
    });

    it("should handle very large limits", () => {
      const limiter = new RateLimiter();
      const result = limiter.check("key", 1_000_000, 60_000);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(999_999);
    });

    it("should handle very short windows", () => {
      const limiter = new RateLimiter();
      const result = limiter.check("key", 10, 1);
      expect(result.allowed).toBe(true);
      expect(result.resetAt).toBeLessThanOrEqual(Date.now() + 10); // ~1ms
    });
  });
});
