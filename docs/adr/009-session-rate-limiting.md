# ADR-009: Per-Session Rate Limiting with Pluggable Store

## Status
Accepted

## Context

The original rate limiter used IP-only keys, which means:

- All users behind a NAT share one rate limit bucket.
- An attacker with multiple IP addresses (botnet, VPN rotation) gets separate buckets.
- No way to rate limit authenticated sessions independently of IP.

We needed a rate limiter that:

1. Prioritizes session identity (JWT token) over IP address.
2. Supports a pluggable store backend for distributed deployments.
3. Provides automatic cleanup to prevent memory leaks.

## Decision

We implement a **token-bucket-style rate limiter** with a pluggable `RateLimitStore` interface:

1. **Key hierarchy**: The rate limit key is derived by checking (in order): Authorization Bearer token, httpOnly session cookie, then fallback to client IP. This ensures authenticated users are rate-limited per-session regardless of IP.

2. **Pluggable store**: The `RateLimitStore` interface (`get`, `set`, `delete`, `keys`) allows swapping the default `InMemoryRateLimitStore` for Redis/Upstash in multi-instance deployments.

3. **Automatic cleanup**: A periodic cleanup (every 5 minutes) prunes expired entries. The `cleanup()` method is also callable manually.

4. **Per-tier limits**: Separate `RateLimiter` instances for auth routes (10 req/15min) and API routes (100 req/min).

## Consequences

### Positive
- **Fair rate limiting**: Authenticated users are limited per-session, not per-IP.
- **Scalable**: Pluggable store enables Redis/Upstash for serverless/multi-instance.
- **Memory-safe**: Automatic cleanup prevents unbounded growth.

### Negative
- **In-memory default**: Single-instance only without external store. Must configure Redis for multi-instance.
- **No distributed coordination**: In-memory store does not share state across instances.

## Implementation

- `src/lib/rate-limit.ts` — RateLimiter class with pluggable store
- `src/middleware.ts` — Session-aware rate limit key derivation
- `__tests__/security/rate-limit.test.ts` — 12 test cases
