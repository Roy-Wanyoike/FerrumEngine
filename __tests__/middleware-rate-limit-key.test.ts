/**
 * Tests for the middleware's rate-limit key derivation logic (T-H05).
 *
 * Key hierarchy: Bearer token > httpOnly session cookie > client IP.
 */

import { describe, it, expect } from "vitest";

const COOKIE_NAME = "ferrum-cloud-session";

function getRateLimitKey(
  authHeader: string | null,
  cookieValue: string | null,
  clientIP: string
): string {
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (token) return `session:${token.slice(0, 32)}`;
  if (cookieValue) return `session:${cookieValue.slice(0, 32)}`;
  return `ip:${clientIP}`;
}

describe("Middleware rate-limit key derivation (T-H05)", () => {
  it("should use Bearer token as key when present", () => {
    const key = getRateLimitKey(
      "Bearer abcdef1234567890abcdef1234567890",
      "cookie-value",
      "1.2.3.4"
    );
    expect(key).toBe("session:abcdef1234567890abcdef1234567890");
    expect(key).not.toContain("ip:");
  });

  it("should fall back to httpOnly cookie when no Bearer token", () => {
    const key = getRateLimitKey(null, "zyxwvutsrqponmlkzyxwvutsrqponmlk", "1.2.3.4");
    expect(key).toBe("session:zyxwvutsrqponmlkzyxwvutsrqponmlk");
  });

  it("should fall back to IP when no token or cookie", () => {
    const key = getRateLimitKey(null, null, "10.0.0.50");
    expect(key).toBe("ip:10.0.0.50");
  });

  it("should truncate long tokens to 32 chars", () => {
    const longToken = "a".repeat(100);
    const key = getRateLimitKey(`Bearer ${longToken}`, null, "1.2.3.4");
    expect(key).toBe(`session:${"a".repeat(32)}`);
    expect(key.length).toBe("session:".length + 32);
  });

  it("should handle empty Bearer token (no value after Bearer)", () => {
    const key = getRateLimitKey("Bearer ", "cookie-val", "1.2.3.4");
    expect(key).toBe("session:cookie-val");
  });

  it("should ignore non-Bearer auth headers", () => {
    const key = getRateLimitKey("Basic dXNlcjpwYXNz", null, "1.2.3.4");
    expect(key).toBe("ip:1.2.3.4");
  });

  it("should handle Bearer keyword with no space", () => {
    const key = getRateLimitKey("Bearertoken123", null, "1.2.3.4");
    expect(key).toBe("ip:1.2.3.4");
  });
});
