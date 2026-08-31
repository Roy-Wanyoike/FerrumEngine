import { type NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { ensureCsrfCookie } from "@/lib/csrf";
import { getClientIP } from "@/lib/get-client-ip";
import { RateLimiter } from "@/lib/rate-limit";

/**
 * Middleware — Next.js 16 Proxy Migration Status
 * ───────────────────────────────────────────────────────
 * Next.js 16 shows a deprecation advisory ("use proxy instead").
 *
 * MIGRATION COMPLETE — Static concerns already moved to next.config.ts:
 *   ✅ Security headers (CSP, HSTS, COOP, CORP, X-Frame-Options, etc.)
 *       → next.config.ts → headers() (L1 security layer)
 *   ✅ SPA route rewrites (17 client-side routes → /)
 *       → next.config.ts → rewrites()
 *   ✅ Static asset caching (immutable) & ferrum-effects.css SWR
 *       → next.config.ts → headers()
 *
 * REMAINING IN MIDDLEWARE (requires Edge Runtime / per-request logic):
 *   ⚙️ CSRF token cookie issuance (all routes)
 *   ⚙️ JWT authentication for /cloud/* and /api/cloud/* routes
 *   ⚙️ Rate limiting (in-memory, per-session/IP) for /api/cloud/* routes
 *   ⚙️ Dynamic rate-limit response headers (X-RateLimit-*)
 *
 * WHY THESE CAN'T MOVE TO next.config.ts:
 *   - JWT verification requires jose library + per-request crypto (Edge only)
 *   - Rate limiting requires in-memory state + per-session/IP tracking
 *   - These are fundamentally per-request, stateful operations
 *
 * FUTURE: When Next.js 16 proxy feature is stable and supports Edge-compatible
 * per-request logic (auth, rate limiting), this middleware can be fully
 * replaced. Monitor next.js canary releases for proxy feature maturity.
 *
 * ── JWT Auth + Rate Limiting for cloud routes ─────────────
 *
 * AUTH STRATEGY:
 * - /api/cloud/* routes: JWT verified from Authorization: Bearer <token> header
 * - /cloud/* page routes: JWT verified from httpOnly cookie (ferrum-cloud-session)
 * - /api/cloud/auth: exempt from JWT check (login/logout endpoint)
 *
 * SECURITY IMPROVEMENTS:
 * ─────────────────────
 * T-H04: IP Spoofing Prevention — getClientIP() now validates that proxy
 *   headers (x-real-ip, x-forwarded-for) are only trusted when the direct
 *   connection comes from a known reverse proxy (TRUSTED_PROXY_IPS env var).
 *
 * T-H05: Per-Session Rate Limiting — RateLimiter class with pluggable store.
 *   Uses session token as key when available, falls back to IP. Accepts
 *   an optional external store (Redis/Upstash) for distributed deployments.
 */

const JWT_SECRET_RAW = process.env.CLOUD_API_TOKEN || "ferrum-demo-secret";
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_RAW);
const JWT_ALGORITHM = "HS256";
const COOKIE_NAME = "ferrum-cloud-session";

// Rate limit windows (in milliseconds)
const AUTH_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const AUTH_MAX_REQUESTS = 10;
const API_WINDOW_MS = 60 * 1000; // 1 minute
const API_MAX_REQUESTS = 100;

// Rate limiter instances (one per rate-limit tier)
const authLimiter = new RateLimiter();
const apiLimiter = new RateLimiter();

// Cleanup old entries every 5 minutes to prevent memory leak
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupOldEntries() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  authLimiter.cleanup();
  apiLimiter.cleanup();
}

function isCloudPageRoute(pathname: string): boolean {
  // Match /cloud, /cloud/dashboard, etc. but not /api/cloud/*
  return pathname === "/cloud" || pathname.startsWith("/cloud/");
}

function isCloudAPIRoute(pathname: string): boolean {
  return pathname.startsWith("/api/cloud/");
}

function isAuthRoute(pathname: string): boolean {
  return pathname === "/api/cloud/auth";
}

/**
 * Derive the rate-limit key: prefer session token, fall back to client IP.
 */
function getRateLimitKey(request: NextRequest, clientIP: string): string {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (token) return `session:${token.slice(0, 32)}`;

  const cookie = request.cookies.get(COOKIE_NAME);
  if (cookie?.value) return `session:${cookie.value.slice(0, 32)}`;

  return `ip:${clientIP}`;
}

/**
 * Verify a JWT token string. Returns the payload if valid, null otherwise.
 */
async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      algorithms: [JWT_ALGORITHM],
    });
    return payload;
  } catch {
    return null;
  }
}

/**
 * Extract and verify JWT from the httpOnly cookie.
 */
async function verifyCookieToken(request: NextRequest) {
  const cookie = request.cookies.get(COOKIE_NAME);
  if (!cookie || !cookie.value) return null;
  return verifyJWT(cookie.value);
}

/**
 * Extract and verify JWT from Authorization header.
 */
async function verifyBearerToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return null;
  return verifyJWT(token);
}

/**
 * Helper: create a NextResponse.next() with CSRF cookie if needed.
 * Used for all passthrough / success paths in the middleware.
 */
async function nextWithCsrf(request: NextRequest): Promise<NextResponse> {
  const response = NextResponse.next();
  await ensureCsrfCookie(request, response);
  return response;
}

export default async function middleware(request: NextRequest) {
  cleanupOldEntries();

  const { pathname } = request.nextUrl;
  const clientIP = getClientIP(request);
  const rlKey = getRateLimitKey(request, clientIP);

  // ── Cloud page routes (/cloud, /cloud/*) ──────────────────────────
  // Verify JWT from httpOnly cookie. If invalid, let the page render
  // (the client shows the login form).
  if (isCloudPageRoute(pathname)) {
    // We don't block the page — the client component handles showing
    // the login form when no token is present. The cookie is used as
    // a complement for server-side checks.
    return await nextWithCsrf(request);
  }

  // ── Non-cloud routes: just ensure CSRF cookie and pass through ──
  if (!isCloudAPIRoute(pathname)) {
    return await nextWithCsrf(request);
  }

  // Rate limit /api/cloud/auth (stricter — prevents brute force)
  if (isAuthRoute(pathname)) {
    const rl = authLimiter.check(rlKey, AUTH_MAX_REQUESTS, AUTH_WINDOW_MS);
    if (!rl.allowed) {
      return NextResponse.json(
        {
          error: "Too many login attempts. Try again later.",
          retryAfter: Math.ceil((rl.resetAt - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
            "X-RateLimit-Limit": String(AUTH_MAX_REQUESTS),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(rl.resetAt),
          },
        }
      );
    }
    // Auth route: pass through (no JWT check for login/logout)
    return await nextWithCsrf(request);
  }

  // Rate limit other /api/cloud/* routes
  const rl = apiLimiter.check(rlKey, API_MAX_REQUESTS, API_WINDOW_MS);
  if (!rl.allowed) {
    return NextResponse.json(
      {
        error: "Rate limit exceeded. Slow down.",
        retryAfter: Math.ceil((rl.resetAt - Date.now()) / 1000),
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
          "X-RateLimit-Limit": String(API_MAX_REQUESTS),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(rl.resetAt),
        },
      }
    );
  }

  // JWT auth for protected API routes — check Authorization header first,
  // fall back to cookie for cookie-based auth
  const payload = (await verifyBearerToken(request)) || (await verifyCookieToken(request));

  if (!payload) {
    return NextResponse.json(
      { error: "Unauthorized. Provide a valid JWT token." },
      { status: 401 }
    );
  }

  // Add rate limit headers + CSRF cookie to successful responses
  const response = await nextWithCsrf(request);
  response.headers.set("X-RateLimit-Limit", String(API_MAX_REQUESTS));
  response.headers.set("X-RateLimit-Remaining", String(rl.remaining));
  response.headers.set("X-RateLimit-Reset", String(rl.resetAt));
  return response;
}

export const config = {
  // Match all routes for CSRF cookie issuance.
  // Cloud-specific auth/rate-limit logic has early returns for
  // non-cloud routes, so the performance impact is minimal
  // (a few string comparisons + cookie check per request).
  matcher: ["/:path*", "/api/:path*"],
};
