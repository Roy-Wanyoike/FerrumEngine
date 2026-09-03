/**
 * JWT Authentication utilities for Ferrum Cloud.
 *
 * Uses the `jose` library for Edge Runtime / Node.js compatibility.
 *
 * - HS256 signing with a shared secret
 * - 1-hour token expiry
 * - Demo mode when CLOUD_ADMIN_PASSWORD is not configured
 * - Secret falls back to "ferrum-demo-secret" when CLOUD_API_TOKEN is not set
 */

import { SignJWT, jwtVerify, type JWTPayload } from "jose";

// ── Constants ────────────────────────────────────────────────────────────

const JWT_ALGORITHM = "HS256";
const TOKEN_EXPIRY_SECONDS = 60 * 60; // 1 hour
const COOKIE_NAME = "ferrum-cloud-session";

const DEMO_SECRET = "ferrum-demo-secret";

/**
 * Returns true when running with the insecure demo secret.
 * In production, this should NEVER be true — it means anyone who
 * reads this source code can forge valid JWTs.
 */
export function isUsingDemoSecret(): boolean {
  return !process.env.CLOUD_API_TOKEN;
}

/**
 * Production guard: throws if the demo secret would be used in production.
 * Call this at app startup (middleware init, API route init, etc.)
 * to prevent accidental deployment with the hardcoded fallback.
 */
export function enforceProductionSecret(): void {
  if (process.env.NODE_ENV === 'production' && !process.env.CLOUD_API_TOKEN) {
    throw new Error(
      'SECURITY: CLOUD_API_TOKEN must be set in production. ' +
      'Refusing to start with the demo JWT secret.'
    );
  }
}

// ── Environment helpers ──────────────────────────────────────────────────

/**
 * Returns the signing secret (as Uint8Array) for JWT operations.
 * Falls back to DEMO_SECRET when CLOUD_API_TOKEN is not set.
 */
export function getJWTSecret(): Uint8Array {
  enforceProductionSecret();
  const secret = process.env.CLOUD_API_TOKEN || DEMO_SECRET;
  return new TextEncoder().encode(secret);
}

/** True when no admin password is configured (demo / development mode). */
export function isDemoMode(): boolean {
  return !process.env.CLOUD_ADMIN_PASSWORD;
}

// ── Token creation ────────────────────────────────────────────────────────

/**
 * Sign a new JWT with the configured secret.
 *
 * @param payload — optional extra claims (merged into the token)
 * @returns the encoded JWT string
 */
export async function signToken(payload?: Record<string, unknown>): Promise<string> {
  const secret = getJWTSecret();
  const now = Date.now();

  return new SignJWT({
    sub: "cloud-admin",
    ...payload,
  })
    .setProtectedHeader({ alg: JWT_ALGORITHM })
    .setIssuedAt(Math.floor(now / 1000))
    .setExpirationTime(Math.floor(now / 1000) + TOKEN_EXPIRY_SECONDS)
    .sign(secret);
}

// ── Token verification ────────────────────────────────────────────────────

/** Result of a successful JWT verification. */
export interface VerifiedToken extends JWTPayload {
  sub: string;
}

/**
 * Verify a JWT string and return its payload if valid.
 *
 * @param token — the raw JWT string
 * @returns the verified payload, or `null` if invalid / expired
 */
export async function verifyToken(
  token: string
): Promise<VerifiedToken | null> {
  try {
    const secret = getJWTSecret();
    const { payload } = await jwtVerify(token, secret, {
      algorithms: [JWT_ALGORITHM],
    });
    return payload as VerifiedToken;
  } catch {
    return null;
  }
}

// ── Cookie helpers ────────────────────────────────────────────────────────

/** Export the cookie name used for the httpOnly session cookie. */
export { COOKIE_NAME };

/** Token expiry in seconds (for the response body). */
export const TOKEN_EXPIRY = TOKEN_EXPIRY_SECONDS;
