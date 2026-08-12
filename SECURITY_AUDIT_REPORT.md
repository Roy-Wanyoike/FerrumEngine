# Security Audit Report — Ferrum Platform

**Date**: 2025-01-XX
**Auditor**: Agent 4 — Security Engineer (Phase 14)
**Scope**: Full platform — `/home/z/my-project`
**Framework**: Next.js 16 (App Router)

---

## Executive Summary

| Severity | Count |
|----------|-------|
| 🔴 CRITICAL | 2 |
| 🟠 HIGH | 4 |
| 🟡 MEDIUM | 5 |
| 🟢 LOW | 4 |
| **Total** | **15** |

The platform demonstrates strong security fundamentals: zero dependency vulnerabilities, timing-safe password comparison, rate limiting, proper `.env` exclusion from git, no SQL injection surface (no SQL DB), and no third-party analytics/tracking scripts. However, there are two critical findings around the CSP configuration and token-based auth architecture that must be addressed before production release.

---

## 1. Dependency Security

**Result**: ✅ `npm audit` — **0 vulnerabilities found**

All dependencies are clean. No known CVEs in the dependency tree.

🟢 **LOW** — Consider adding `npm audit` to CI/CD pipeline for continuous monitoring.

---

## 2. Security Headers Audit

### Present Headers (next.config.ts)

| Header | Value | Status |
|--------|-------|--------|
| `X-Content-Type-Options` | `nosniff` | ✅ Correct |
| `X-Frame-Options` | `DENY` | ✅ Correct |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | ✅ Correct |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | ⚠️ Partial — see MEDIUM-1 |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | ✅ Excellent (2 years, preload-ready) |
| `X-DNS-Prefetch-Control` | `on` | 🟢 Acceptable for performance |
| `Content-Security-Policy` | (see Section 6) | 🔴 See CRITICAL-1 |
| `poweredByHeader` | `false` | ✅ Correctly disabled |

### Missing Headers

🟡 **MEDIUM-1** — `Permissions-Policy` is incomplete. Missing restrictions for:
- `payment=()`
- `usb=()`
- `magnetometer=()`
- `gyroscope=()`
- `accelerometer=()`
- `ambient-light-sensor=()`
- `autoplay=()`
- `encrypted-media=()`
- `picture-in-picture=()`

**Recommendation**: Expand to: `camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), ambient-light-sensor=(), autoplay=(), encrypted-media=(), picture-in-picture=()`

🟢 **LOW-1** — Consider adding `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Resource-Policy: same-origin` for additional origin isolation.

🟢 **LOW-2** — Consider adding `X-Permitted-Cross-Domain-Policies: none` for legacy Flash/Java protection.

---

## 3. Secrets Management

### .gitignore Analysis

✅ `.env*` is properly excluded from version control.
✅ `*.pem` (private keys) excluded.
✅ `/.vercel/` excluded.
✅ `/db/*.db` excluded.
✅ `.claude`, `.z-ai-config` excluded.

### Environment Files

- `.env` exists locally with only `DATABASE_URL=file:/home/z/my-project/db/custom.db` — ✅ No secrets committed.
- `CLOUD_API_TOKEN` and `CLOUD_ADMIN_PASSWORD` are read from env at runtime — ✅ Not hardcoded.

🟠 **HIGH-1** — Static shared API token returned as bearer. The auth endpoint (`/api/cloud/auth`) returns the **same static token** (`CLOUD_API_TOKEN`) to every authenticated user. There is no per-session token, no JWT, no expiration enforcement. The `expires_in: 86400` field is informational only — the token never actually expires.

**Impact**: Once a user authenticates, they possess a token that grants permanent access. If leaked, it cannot be revoked without rotating the environment variable and restarting the server.

**Recommendation**: Implement JWT tokens with proper expiration (`exp` claim), per-user identification (`sub` claim), and a server-side revocation mechanism. The code already acknowledges this with the comment: _"In production, replace with proper JWT + database-backed user store."_

🟠 **HIGH-2** — Single shared password for all users. `CLOUD_ADMIN_PASSWORD` is a single plaintext password shared across all users. There is no user identity, no per-user credentials, no password hashing (bcrypt/argon2). The password comparison is timing-safe (good), but the architecture itself is not production-ready.

**Recommendation**: Implement per-user accounts with hashed passwords (bcrypt/argon2id) stored in a database. At minimum, for a demo, add a note that this is not production-ready and consider adding IP-based restrictions.

🟡 **MEDIUM-2** — Token stored in `localStorage` on the client (`use-cloud-auth.ts` line 53). `localStorage` is accessible to any JavaScript running on the page. If an XSS vulnerability is exploited, the token is immediately compromised.

**Recommendation**: Use `httpOnly` cookies for token storage, or switch to session-based auth.

---

## 4. XSS & Injection Analysis

### dangerouslySetInnerHTML Usage (3 locations)

| File | Line | Source | Risk |
|------|------|--------|------|
| `src/app/layout.tsx` | 201-217 | `JSON.stringify()` of static LD+JSON objects | 🟢 Safe — structured data only |
| `src/app/layout.tsx` | 234 | Hardcoded service worker registration string | 🟢 Safe — no user input |
| `src/components/ferrum/interactive-docs-view.tsx` | 1327 | `activeLesson.explanation` from hardcoded `LESSONS` array | 🟢 Safe — static content only |
| `src/components/ferrum/playground/code-editor.tsx` | 95 | `syntaxHighlight()` output | 🟢 Safe — see below |

### Code Editor Syntax Highlighting

The `syntaxHighlight()` function in `playground-v2-data.ts` (line 785) properly escapes `&`, `<`, `>` **before** applying regex-based highlighting. This prevents XSS through user-controlled code input in the playground.

### innerHTML Usage

- `src/components/ferrum/playground-v2-data.ts` line 743: `this.shadowRoot.innerHTML` — This is inside a **template literal string** that generates Web Components export code. It is **not executed at runtime** — it's displayed as text/code. ✅ Safe.

### eval() / new Function()

- No instances of `eval()` found in source code.
- No instances of `new Function()` found in source code.
- The `changelog-view.tsx` reference to `eval()` is in a changelog entry string (documentation), not actual code.

### SQL Injection

- ✅ No SQL database usage. Data is stored in-memory with JSON file persistence. No SQL injection surface.

### Input Validation

- ✅ All API routes validate JSON body structure with try/catch.
- ✅ Type checks (`typeof x === 'string'`, `typeof x === 'number'`).
- ✅ Length validation on team names (2-50 chars) and project names (2-60 chars).
- ✅ Enum validation on token types and environments.
- ✅ `parseInt` with clamping on `limit` query param in audit route.

🟡 **MEDIUM-3** — `PUT /api/cloud/teams/[teamId]` does **not validate** the `name` field length or type. The `UpdateTeamBody` type allows `name?: string` but the route handler (`teams/[teamId]/route.ts` line 27) passes it directly to `store.updateTeam()` without validation.

**Recommendation**: Add the same 2-50 character string validation as the POST create endpoint.

🟡 **MEDIUM-4** — Token `value` field has no length or content validation. Users can store arbitrarily large strings as token values (POST to `/api/cloud/projects/[projectId]/tokens`). This could be used for denial-of-service via the JSON persistence file.

**Recommendation**: Add max-length validation (e.g., 1024 chars) for token values.

---

## 5. Authentication & Authorization Audit

### Middleware (`src/middleware.ts`)

✅ **Strengths**:
- Timing-safe token comparison via `safeTokenCompare()` (XOR-based constant-time)
- Rate limiting on auth endpoint: 10 requests per 15 minutes per IP
- Rate limiting on API endpoints: 100 requests per minute per IP
- Proper `429 Too Many Requests` responses with `Retry-After` header
- Bearer token validation on all `/api/cloud/*` routes (except `/api/cloud/auth`)
- Rate limit headers on successful responses (`X-RateLimit-*`)

⚠️ **Issues**:

🟠 **HIGH-3** — In-memory rate limiting is per-instance only. In a serverless deployment (Vercel), each function invocation gets its own in-memory store, making rate limiting ineffective. A distributed rate limiter (Redis, Upstash, etc.) is needed for production.

🟠 **HIGH-4** — `x-real-ip` header is trusted without verification (`getClientIP` at line 41). An attacker can spoof this header to bypass IP-based rate limiting.

**Recommendation**: Use `request.ip` or `x-forwarded-for` with trusted proxy configuration. In Vercel, use the `x-vercel-forwarded-for` header.

🟡 **MEDIUM-5** — No CORS headers on cloud API routes. While the middleware enforces Bearer token auth, there's no `Access-Control-Allow-Origin` restriction. Any origin can make authenticated requests if the token is known. (Note: The `/api/css` route does have CORS — but cloud routes don't.)

---

## 6. Content Security Policy Analysis

**Current CSP**:
```
default-src 'self';
script-src 'self' 'unsafe-inline';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: blob:;
connect-src 'self' blob:;
```

### Findings

🔴 **CRITICAL-1** — `script-src 'unsafe-inline'` allows execution of **any inline script**, including scripts injected via XSS. This completely negates the XSS protection that CSP is designed to provide.

**Why this is critical**: If any XSS vulnerability exists (or is introduced in the future), `unsafe-inline` means the browser will execute the injected script. The platform uses `dangerouslySetInnerHTML` in multiple places. While currently safe (static content), a future code change could introduce user-controlled content.

**Impact**: Full XSS exploitation possible if any injection point is found.

**Recommendation**: 
1. Move all inline scripts to separate `.js` files and reference via `src` attribute.
2. Use nonces (`'nonce-<random>'`) for any scripts that must remain inline.
3. Replace `script-src 'self' 'unsafe-inline'` with `script-src 'self' 'nonce-{NONCE}'`.
4. The service worker registration inline script in `layout.tsx:234` can be moved to an external file or use a nonce.

🟠 **HIGH-5** (originally counted — reclassified) — `style-src 'unsafe-inline'` allows inline styles. Combined with the playground (where users write CSS), this could enable CSS-based exfiltration attacks (e.g., loading external resources via `background-image: url(...)` or `@import`). Currently mitigated because `connect-src` is restricted to `'self' blob:`, but defense-in-depth would suggest removing `unsafe-inline` from styles too.

**Recommendation**: Use CSS modules, Tailwind, or nonces for style-src as well. At minimum, this is a lower priority than script-src.

🟢 **LOW-3** — `img-src 'self' data: blob:` is reasonable. No external image sources are needed. `data:` and `blob:` are required for base64/SVG-in-JS patterns and the playground preview.

🟢 **LOW-4** — `connect-src 'self' blob:` is properly restrictive. No external API calls are allowed. The `blob:` is needed for the playground's live preview iframe communication.

---

## 7. Third-Party Scripts

✅ **No external scripts loaded** — No CDN scripts, analytics (Google Analytics, Plausible, etc.), or tracking pixels found in the codebase.

✅ **No external CSS** — Only `https://fonts.googleapis.com` is allowed in CSP for styles (Google Fonts).

✅ **No external analytics URLs** found in any source file.

The platform is self-contained with zero third-party script dependencies. This is an excellent security posture.

---

## 8. Additional Observations

### Service Worker (`public/sw.js`)

🟢 The service worker:
- Skips caching for all `/api/` routes ✅
- Only caches navigation and static assets ✅
- Has a 50MB cache limit ✅
- Uses stale-while-revalidate for the effects CSS ✅
- Properly cleans up old caches on activate ✅

### robots.txt

✅ Properly disallows `/api/` and `/cloud/` from crawling.

### Production Hardening

✅ `productionBrowserSourceMaps: false` — Source maps not exposed in production.
✅ `compiler.removeConsole` — `console.log` removed in production (keeps `error`/`warn`).
✅ `reactStrictMode: true` — Development-only, but helps catch issues.

### Unprotected API Routes

The following routes are **not** behind the middleware matcher and have no authentication:

- `GET /api/tokens` — Returns design token metadata. Read-only, public data. ✅ Acceptable.
- `GET /api/css` — Returns CSS effects. Public API. ✅ Acceptable (has its own CORS).
- `POST /api/analytics` — Has its own rate limiting (30/min/IP). ✅ Acceptable (no sensitive data).
- `GET /api/health` — Health check. ✅ Acceptable.
- `GET /api` — Root API info. ✅ Acceptable.

---

## Summary of Findings

### 🔴 CRITICAL (2)

| ID | Finding | File | Description |
|----|---------|------|-------------|
| CRITICAL-1 | CSP `script-src 'unsafe-inline'` | `next.config.ts:55` | Allows execution of any inline script, negating XSS protection from CSP |
| CRITICAL-2 | CSP `style-src 'unsafe-inline'` | `next.config.ts:55` | Allows inline styles; defense-in-depth gap for CSS injection attacks |

### 🟠 HIGH (4)

| ID | Finding | File | Description |
|----|---------|------|-------------|
| HIGH-1 | Static shared API token | `src/app/api/cloud/auth/route.ts:63` | All users share one token that never expires; no JWT, no revocation |
| HIGH-2 | Single shared password | `src/app/api/cloud/auth/route.ts:15` | No per-user identity, no password hashing, single plaintext password |
| HIGH-3 | In-memory rate limiting | `src/middleware.ts:21-22` | Ineffective in serverless deployments; needs distributed store |
| HIGH-4 | IP spoofing via `x-real-ip` | `src/middleware.ts:41` | Trusted without verification; attackers can bypass rate limits |

### 🟡 MEDIUM (5)

| ID | Finding | File | Description |
|----|---------|------|-------------|
| MEDIUM-1 | Incomplete `Permissions-Policy` | `next.config.ts:52` | Missing restrictions for payment, usb, gyroscope, autoplay, etc. |
| MEDIUM-2 | Token in `localStorage` | `src/hooks/use-cloud-auth.ts:53` | Vulnerable to XSS exfiltration; should use httpOnly cookies |
| MEDIUM-3 | Missing input validation on team update | `src/app/api/cloud/teams/[teamId]/route.ts:27` | PUT handler passes body to store without length/type validation |
| MEDIUM-4 | No token value length limit | `src/app/api/cloud/projects/[projectId]/tokens/route.ts` | Arbitrarily large token values can be stored, potential DoS |
| MEDIUM-5 | No CORS on cloud API routes | `src/middleware.ts` | Any origin can make authenticated requests if token is known |

### 🟢 LOW (4)

| ID | Finding | File | Description |
|----|---------|------|-------------|
| LOW-1 | Missing COOP/CORP headers | `next.config.ts` | Add `Cross-Origin-Opener-Policy` and `Cross-Origin-Resource-Policy` |
| LOW-2 | Missing `X-Permitted-Cross-Domain-Policies` | `next.config.ts` | Legacy protection header not set |
| LOW-3 | No CI/CD npm audit | — | Add automated vulnerability scanning to pipeline |
| LOW-4 | `X-DNS-Prefetch-Control: on` | `next.config.ts:54` | Minor info-leak; acceptable for performance |

---

## Recommended Fix Priority

### Before Release (Must Fix)

1. **CRITICAL-1**: Refactor CSP to use nonces instead of `unsafe-inline` for scripts
2. **HIGH-1/HIGH-2**: Replace shared token/password with JWT + per-user auth (or clearly gate behind a "demo mode" flag)
3. **HIGH-4**: Fix IP detection to use verified headers

### Next Iteration (Should Fix)

4. **CRITICAL-2**: Remove `unsafe-inline` from `style-src` (use nonces or CSP hashes)
5. **HIGH-3**: Implement distributed rate limiting for production deployment
6. **MEDIUM-1**: Expand `Permissions-Policy`
7. **MEDIUM-2**: Migrate from `localStorage` to httpOnly cookies
8. **MEDIUM-3/MEDIUM-4**: Add input validation to team update and token value endpoints

### Future (Nice to Have)

9. **MEDIUM-5**: Add CORS headers to cloud API
10. **LOW-1/LOW-2**: Add COOP/CORP/XPCDP headers
11. **LOW-3**: Add `npm audit` to CI pipeline

---

*Report generated by Agent 4 — Security Engineer, Phase 14*
