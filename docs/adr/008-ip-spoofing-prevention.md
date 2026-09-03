# ADR-008: IP Spoofing Prevention for Rate Limiting

## Status
Accepted

## Context

Rate limiting and security logging in FerrumEngine depend on accurate client IP addresses. When deployed behind a reverse proxy (Caddy, Nginx, Cloudflare), the client IP is forwarded via `X-Real-IP` or `X-Forwarded-For` headers. However, these headers can be spoofed by clients if the connection does not pass through a trusted proxy, allowing attackers to bypass IP-based rate limits by rotating spoofed IPs.

## Decision

We implement a **trusted proxy validation** approach in `src/lib/get-client-ip.ts`:

1. **TRUSTED_PROXY_IPS environment variable**: A comma-separated list of known proxy IPs. When set, proxy headers (`X-Real-IP`, `X-Forwarded-For`) are only honored when the direct connection originates from a listed proxy.

2. **Fallback behavior**: When `TRUSTED_PROXY_IPS` is not configured, the system preserves backward-compatible behavior (trusts proxy headers unconditionally) but emits a `console.warn` in development mode.

3. **Spoof rejection**: When `TRUSTED_PROXY_IPS` is set and the direct connection IP does not match any trusted proxy, all proxy headers are ignored and the function returns `"unknown"`, preventing IP spoofing.

## Consequences

### Positive
- **Production-safe**: Rate limits cannot be bypassed by spoofing `X-Forwarded-For` when properly configured.
- **Zero-friction dev experience**: No configuration needed for local development.
- **Transparent**: A clear warning in development guides operators to set the variable.

### Negative
- **Manual configuration required**: Operators must set `TRUSTED_PROXY_IPS` in production deployments.
- **No auto-discovery**: The list must be manually maintained when proxy infrastructure changes.

## Implementation

- `src/lib/get-client-ip.ts` — ClientIP extraction with trust validation
- `src/middleware.ts` — Uses `getClientIP()` for rate limit keying
- `__tests__/security/get-client-ip.test.ts` — 11 test cases covering trust/untrust scenarios
