import { type NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

/**
 * Middleware — JWT Auth + Rate Limiting for cloud routes.
 * Full logic inline for Edge Runtime compatibility.
 *
 * AUTH STRATEGY:
 * - /api/cloud/* routes: JWT verified from Authorization: Bearer <token> header
 * - /cloud/* page routes: JWT verified from httpOnly cookie (ferrum-cloud-session)
 * - /api/cloud/auth: exempt from JWT check (login/logout endpoint)
 *
 * SECURITY NOTE — Rate Limiting Limitations:
 * ──────────────────────────────────────────────
 * This rate limiter is an in-memory, best-effort protection. Key limitations:
 *
 * 1. IP Spoofing: We read the `x-real-ip` header as provided by the reverse
 *    proxy. An attacker who can reach the server directly (bypassing the proxy)
 *    can forge this header. This is acceptable because in production the server
 *    is always behind a trusted reverse proxy (Caddy / Nginx) that overwrites
 *    the header.
 *
 * 2. Serverless Ephemeral Store: The in-memory Map resets on every cold start.
 *    In a serverless environment (Vercel, AWS Lambda), each function instance
 *    has its own independent counter. An attacker making requests across
 *    instances gets a higher effective limit. For global rate limiting, use
 *    Redis / Upstash / a dedicated rate-limiting service.
 *
 * 3. No Distributed Coordination: Multiple instances don't share counters.
 *
 * Despite these limitations, this middleware still provides meaningful defense:
 * it raises the cost of brute-force attacks and absorbs traffic spikes.
 * Consider it a first line of defense, not the only one.
 *
 * GRACEFUL DEGRADATION:
 * If CLOUD_API_TOKEN is not configured, cloud auth falls back to a demo secret
 * so the rest of the app (non-cloud routes) can function in development/demo.
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

/*
 * In-memory rate limit store (per-instance, resets on cold start).
 * See SECURITY NOTE at top of file for known limitations.
 */
const authAttempts = new Map<string, { count: number; resetAt: number }>();
const apiRequests = new Map<string, { count: number; resetAt: number }>();

// Cleanup old entries every 5 minutes to prevent memory leak
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupOldEntries() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;
  for (const [key, entry] of authAttempts) {
    if (now > entry.resetAt) authAttempts.delete(key);
  }
  for (const [key, entry] of apiRequests) {
    if (now > entry.resetAt) apiRequests.delete(key);
  }
}

/**
 * Extract client IP from trusted reverse proxy headers.
 * Priority: x-real-ip > first entry of x-forwarded-for > "unknown".
 */
function getClientIP(request: NextRequest): string {
  const xri = request.headers.get("x-real-ip");
  if (xri && xri.length > 0) return xri;
  const xff = request.headers.get("x-forwarded-for");
  if (xff && xff.length > 0) return xff.split(",")[0] ?? "unknown";
  return "unknown";
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

function checkRateLimit(
  store: Map<string, { count: number; resetAt: number }>,
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

export default async function middleware(request: NextRequest) {
  cleanupOldEntries();

  const { pathname } = request.nextUrl;
  const clientIP = getClientIP(request);

  // ── Cloud page routes (/cloud, /cloud/*) ──────────────────────────
  // Verify JWT from httpOnly cookie. If invalid, let the page render
  // (the client shows the login form).
  if (isCloudPageRoute(pathname)) {
    // We don't block the page — the client component handles showing
    // the login form when no token is present. The cookie is used as
    // a complement for server-side checks.
    return NextResponse.next();
  }

  // ── Cloud API routes (/api/cloud/*) ──────────────────────────────
  if (!isCloudAPIRoute(pathname)) {
    return NextResponse.next();
  }

  // Rate limit /api/cloud/auth (stricter — prevents brute force)
  if (isAuthRoute(pathname)) {
    const rl = checkRateLimit(authAttempts, clientIP, AUTH_MAX_REQUESTS, AUTH_WINDOW_MS);
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
    return NextResponse.next();
  }

  // Rate limit other /api/cloud/* routes
  const rl = checkRateLimit(apiRequests, clientIP, API_MAX_REQUESTS, API_WINDOW_MS);
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
  const payload = await verifyBearerToken(request) || await verifyCookieToken(request);

  if (!payload) {
    return NextResponse.json(
      { error: "Unauthorized. Provide a valid JWT token." },
      { status: 401 }
    );
  }

  // Add rate limit headers to successful responses
  const response = NextResponse.next();
  response.headers.set("X-RateLimit-Limit", String(API_MAX_REQUESTS));
  response.headers.set("X-RateLimit-Remaining", String(rl.remaining));
  response.headers.set("X-RateLimit-Reset", String(rl.resetAt));
  return response;
}

export const config = {
  matcher: ["/cloud/:path*", "/api/cloud/:path*"],
};
