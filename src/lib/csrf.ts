/**
 * CSRF Protection — Double-Submit Cookie Pattern
 *
 * Security model:
 * ─────────────────
 * The server issues a non-httpOnly cookie (`ferrum-csrf-token`) on page loads.
 * The client reads this cookie via JS and sends its value as the
 * `X-CSRF-Token` header on every mutation request (POST/PUT/DELETE).
 *
 * Server-side validation compares the cookie value with the header value
 * using timing-safe comparison. A mismatch (or missing token) returns 403.
 *
 * WHY THIS WORKS:
 * 1. Cross-origin attackers CANNOT read the cookie (SameSite=Lax + no CORS)
 * 2. Cross-origin attackers CANNOT set custom headers (CORS preflight blocks)
 * 3. Same-origin XSS can bypass this — but XSS is a different threat class
 *    mitigated by CSP (Content-Security-Policy) already configured in
 *    next.config.ts.
 *
 * BEARER BYPASS:
 * Requests with an `Authorization: Bearer` header skip CSRF validation.
 * These requests are already protected by CORS (custom headers trigger
 * preflight, and no Access-Control-Allow-Origin is configured).
 * This allows server-to-server and programmatic API clients to work
 * without managing CSRF tokens.
 *
 * IMPLEMENTATION NOTES:
 * - Uses Web Crypto API (Edge Runtime compatible)
 * - Timing-safe comparison via manual XOR loop (prevents timing attacks)
 * - Token length: 64 hex chars (32 bytes of entropy)
 * - Cookie TTL: 24 hours
 */

import { type NextRequest, NextResponse } from "next/server";

// ── Constants ────────────────────────────────────────────────────────

export const CSRF_COOKIE_NAME = "ferrum-csrf-token";
export const CSRF_HEADER_NAME = "x-csrf-token";
export const CSRF_COOKIE_MAX_AGE = 86400; // 24 hours in seconds

// ── Token generation (Web Crypto API — Edge compatible) ──────────────

/**
 * Generate a cryptographically secure CSRF token.
 * Returns a 64-character hex string (32 bytes of entropy).
 * Uses Web Crypto API for Edge Runtime compatibility.
 */
export async function generateCsrfToken(): Promise<string> {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// ── Timing-safe comparison (Edge compatible) ─────────────────────────

/**
 * Constant-time string comparison.
 * Iterates over all characters regardless of early mismatches,
 * preventing timing side-channel attacks.
 *
 * Edge Runtime compatible — no Node.js `crypto.timingSafeEqual` dependency.
 */
function timingSafeStringEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

// ── Validation ────────────────────────────────────────────────────────

/**
 * Validate CSRF token using the double-submit cookie pattern.
 *
 * Rules:
 * 1. If `Authorization: Bearer <token>` header is present → PASS
 *    (CORS preflight protects these requests from cross-origin attacks)
 * 2. Otherwise → compare CSRF cookie value with X-CSRF-Token header value
 *    using timing-safe comparison.
 *
 * @returns `{ valid: true }` or `{ valid: false, error: "..." }`
 */
export function validateCsrfToken(
  request: NextRequest
): { valid: true } | { valid: false; error: string } {
  // Bearer-authenticated requests are protected by CORS — skip CSRF
  const authHeader = request.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ") === true) {
    return { valid: true };
  }

  const cookieToken = request.cookies.get(CSRF_COOKIE_NAME)?.value;
  const headerToken = request.headers.get(CSRF_HEADER_NAME);

  // Both cookie and header must be present
  if (!cookieToken || !headerToken) {
    return {
      valid: false,
      error: "CSRF token missing. Refresh the page and try again.",
    };
  }

  // Timing-safe comparison to prevent timing side-channel attacks
  if (!timingSafeStringEqual(cookieToken, headerToken)) {
    return {
      valid: false,
      error: "CSRF token mismatch. Refresh the page and try again.",
    };
  }

  return { valid: true };
}

// ── Response helpers ──────────────────────────────────────────────────

/**
 * Returns a 403 Forbidden response for CSRF validation failures.
 */
export function csrfErrorResponse(): NextResponse {
  return NextResponse.json(
    { error: "CSRF validation failed. Refresh the page and try again." },
    { status: 403 }
  );
}

/**
 * Validates CSRF and returns an error response if invalid.
 * Returns `null` if valid — caller should proceed with the handler.
 *
 * Usage:
 * ```ts
 * const csrfFail = requireCsrf(request);
 * if (csrfFail) return csrfFail;
 * // ... proceed with handler
 * ```
 */
export function requireCsrf(request: NextRequest): NextResponse | null {
  const result = validateCsrfToken(request);
  if (!result.valid) {
    return csrfErrorResponse();
  }
  return null;
}

/**
 * Ensures the CSRF cookie is set on a response if not already present
 * in the request. Call this in middleware or route handlers to issue
 * the CSRF cookie.
 */
export async function ensureCsrfCookie(
  request: NextRequest,
  response: NextResponse
): Promise<void> {
  if (!request.cookies.get(CSRF_COOKIE_NAME)?.value) {
    const token = await generateCsrfToken();
    response.cookies.set(CSRF_COOKIE_NAME, token, {
      httpOnly: false, // Must be readable by JavaScript
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: CSRF_COOKIE_MAX_AGE,
    });
  }
}

// ── Client-side helper ────────────────────────────────────────────────

/**
 * Read the CSRF token from the `ferrum-csrf-token` cookie.
 * For use in client-side code (browser only).
 *
 * @returns The CSRF token string, or `null` if not found.
 */
export function getCsrfTokenFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    /(?:^|;\s*)ferrum-csrf-token=([^;]*)/
  );
  return match ? decodeURIComponent(match[1]!) : null;
}
