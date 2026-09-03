/**
 * T-H05 — Per-Session Rate Limiting
 *
 * A rate limiter that uses an in-memory Map as the primary store but
 * accepts an optional `store` interface for swapping in Redis/Upstash.
 *
 * Usage:
 *   const limiter = new RateLimiter();
 *   const result = limiter.check("session-abc", 10, 60_000);
 *   // { allowed: true, remaining: 9, resetAt: 1740000000000 }
 */

export interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Pluggable store interface. The default in-memory implementation
 * uses a simple Map. Swap in a Redis-backed store for distributed
 * rate limiting in serverless/multi-instance deployments.
 */
export interface RateLimitStore {
  get(key: string): RateLimitEntry | undefined;
  set(key: string, entry: RateLimitEntry): void;
  delete(key: string): void;
  keys(): Iterable<string>;
}

/**
 * Default in-memory store using a Map.
 */
export class InMemoryRateLimitStore implements RateLimitStore {
  private map = new Map<string, RateLimitEntry>();

  get(key: string): RateLimitEntry | undefined {
    return this.map.get(key);
  }

  set(key: string, entry: RateLimitEntry): void {
    this.map.set(key, entry);
  }

  delete(key: string): void {
    this.map.delete(key);
  }

  keys(): Iterable<string> {
    return this.map.keys();
  }

  /** Exposed for testing / introspection. */
  get size(): number {
    return this.map.size;
  }
}

export class RateLimiter {
  private store: RateLimitStore;

  constructor(store?: RateLimitStore) {
    this.store = store ?? new InMemoryRateLimitStore();
  }

  /**
   * Check whether a request for `key` is within the rate limit.
   *
   * @param key      — Identifier (session token or IP)
   * @param limit    — Max requests allowed in the window
   * @param windowMs — Window duration in milliseconds
   * @returns RateLimitResult
   */
  check(key: string, limit: number, windowMs: number): RateLimitResult {
    const now = Date.now();
    const existing = this.store.get(key);

    if (!existing || now > existing.resetAt) {
      const resetAt = now + windowMs;
      this.store.set(key, { count: 1, resetAt });
      return { allowed: true, remaining: limit - 1, resetAt };
    }

    existing.count++;
    const allowed = existing.count <= limit;
    return {
      allowed,
      remaining: Math.max(0, limit - existing.count),
      resetAt: existing.resetAt,
    };
  }

  /**
   * Prune expired entries from the store to prevent memory leaks.
   * Returns the number of entries removed.
   */
  cleanup(): number {
    const now = Date.now();
    let removed = 0;
    for (const key of this.store.keys()) {
      const entry = this.store.get(key);
      if (entry && now > entry.resetAt) {
        this.store.delete(key);
        removed++;
      }
    }
    return removed;
  }
}
