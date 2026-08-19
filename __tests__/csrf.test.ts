// @vitest-environment node
import { describe, it, expect } from "vitest";
import { validateCsrfToken, generateCsrfToken, requireCsrf, CSRF_COOKIE_NAME, CSRF_HEADER_NAME, CSRF_COOKIE_MAX_AGE } from "@/lib/csrf";
import { type NextRequest } from "next/server";

/**
 * Helper to create a minimal NextRequest-like object for testing.
 * We only need cookies and headers, which are the only fields
 * accessed by the CSRF validation functions.
 */
function createMockRequest(opts: {
  cookies?: Record<string, string>;
  headers?: Record<string, string>;
}): NextRequest {
  return {
    cookies: {
      get: (name: string) => {
        const val = opts.cookies?.[name];
        return val ? { name, value: val } : undefined;
      },
    },
    headers: {
      get: (name: string) => opts.headers?.[name] ?? null,
    },
  } as unknown as NextRequest;
}

describe("CSRF Protection", () => {
  describe("generateCsrfToken", () => {
    it("should return a 64-character hex string", async () => {
      const token = await generateCsrfToken();
      expect(token).toHaveLength(64);
      expect(token).toMatch(/^[0-9a-f]{64}$/);
    });

    it("should generate unique tokens", async () => {
      const tokens = new Set(await Promise.all(Array.from({ length: 100 }, () => generateCsrfToken())));
      expect(tokens.size).toBe(100);
    });
  });

  describe("validateCsrfToken", () => {
    it("should pass when Authorization: Bearer header is present (CORS-protected)", () => {
      const req = createMockRequest({
        headers: { authorization: "Bearer some-jwt-token" },
      });
      const result = validateCsrfToken(req);
      expect(result.valid).toBe(true);
    });

    it("should pass when CSRF cookie matches header (double-submit)", async () => {
      const token = await generateCsrfToken();
      const req = createMockRequest({
        cookies: { [CSRF_COOKIE_NAME]: token },
        headers: { [CSRF_HEADER_NAME]: token },
      });
      const result = validateCsrfToken(req);
      expect(result.valid).toBe(true);
    });

    it("should reject when CSRF cookie is missing", () => {
      const req = createMockRequest({
        headers: { [CSRF_HEADER_NAME]: "some-token" },
      });
      const result = validateCsrfToken(req);
      expect(result.valid).toBe(false);
      if (!result.valid) {
        expect(result.error).toContain("missing");
      }
    });

    it("should reject when CSRF header is missing", async () => {
      const token = await generateCsrfToken();
      const req = createMockRequest({
        cookies: { [CSRF_COOKIE_NAME]: token },
      });
      const result = validateCsrfToken(req);
      expect(result.valid).toBe(false);
      if (!result.valid) {
        expect(result.error).toContain("missing");
      }
    });

    it("should reject when CSRF cookie and header don't match", () => {
      const req = createMockRequest({
        cookies: { [CSRF_COOKIE_NAME]: "token-a" },
        headers: { [CSRF_HEADER_NAME]: "token-b" },
      });
      const result = validateCsrfToken(req);
      expect(result.valid).toBe(false);
      if (!result.valid) {
        expect(result.error).toContain("mismatch");
      }
    });

    it("should reject when both cookie and header are missing", () => {
      const req = createMockRequest({});
      const result = validateCsrfToken(req);
      expect(result.valid).toBe(false);
    });

    it("should reject when header is empty string", async () => {
      const token = await generateCsrfToken();
      const req = createMockRequest({
        cookies: { [CSRF_COOKIE_NAME]: token },
        headers: { [CSRF_HEADER_NAME]: "" },
      });
      const result = validateCsrfToken(req);
      expect(result.valid).toBe(false);
      if (!result.valid) {
        expect(result.error).toContain("missing");
      }
    });

    it("should not bypass CSRF with 'Bearer' in non-authorization header", async () => {
      const token = await generateCsrfToken();
      const req = createMockRequest({
        cookies: { [CSRF_COOKIE_NAME]: token },
        headers: {
          [CSRF_HEADER_NAME]: "wrong-token",
          "x-custom": "Bearer something",
        },
      });
      const result = validateCsrfToken(req);
      expect(result.valid).toBe(false);
    });
  });

  describe("requireCsrf", () => {
    it("should return null when CSRF is valid", async () => {
      const token = await generateCsrfToken();
      const req = createMockRequest({
        cookies: { [CSRF_COOKIE_NAME]: token },
        headers: { [CSRF_HEADER_NAME]: token },
      });
      const result = requireCsrf(req);
      expect(result).toBeNull();
    });

    it("should return a 403 response when CSRF is invalid", () => {
      const req = createMockRequest({});
      const result = requireCsrf(req);
      expect(result).not.toBeNull();
      expect(result!.status).toBe(403);
    });

    it("should return null for Bearer-authenticated requests", () => {
      const req = createMockRequest({
        headers: { authorization: "Bearer jwt-token" },
      });
      const result = requireCsrf(req);
      expect(result).toBeNull();
    });
  });

  describe("Constants", () => {
    it("should export correct cookie name", () => {
      expect(CSRF_COOKIE_NAME).toBe("ferrum-csrf-token");
    });

    it("should export correct header name", () => {
      expect(CSRF_HEADER_NAME).toBe("x-csrf-token");
    });

    it("should have 24-hour max age", () => {
      expect(CSRF_COOKIE_MAX_AGE).toBe(86400);
    });
  });
});
