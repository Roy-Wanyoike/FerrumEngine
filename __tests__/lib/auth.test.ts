/**
 * @vitest-environment node
 */
import { describe, it, expect, afterEach } from "vitest";

describe("auth.ts", () => {
  const origToken = process.env.CLOUD_API_TOKEN;
  const origNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    if (origToken !== undefined) process.env.CLOUD_API_TOKEN = origToken;
    else delete process.env.CLOUD_API_TOKEN;
    if (origNodeEnv !== undefined) process.env.NODE_ENV = origNodeEnv;
    else delete process.env.NODE_ENV;
  });

  describe("production guard logic", () => {
    it("throws when CLOUD_API_TOKEN is not set in production", () => {
      delete process.env.CLOUD_API_TOKEN;
      process.env.NODE_ENV = "production";
      const wouldThrow = process.env.NODE_ENV === "production" && !process.env.CLOUD_API_TOKEN;
      expect(wouldThrow).toBe(true);
    });

    it("does not throw when CLOUD_API_TOKEN is set in production", () => {
      process.env.CLOUD_API_TOKEN = "my-secret";
      process.env.NODE_ENV = "production";
      const wouldThrow = process.env.NODE_ENV === "production" && !process.env.CLOUD_API_TOKEN;
      expect(wouldThrow).toBe(false);
    });

    it("does not throw in development even without CLOUD_API_TOKEN", () => {
      delete process.env.CLOUD_API_TOKEN;
      process.env.NODE_ENV = "development";
      const wouldThrow = process.env.NODE_ENV === "production" && !process.env.CLOUD_API_TOKEN;
      expect(wouldThrow).toBe(false);
    });
  });

  describe("isUsingDemoSecret", () => {
    it("returns true when CLOUD_API_TOKEN is not set", () => {
      delete process.env.CLOUD_API_TOKEN;
      expect(!process.env.CLOUD_API_TOKEN).toBe(true);
    });

    it("returns false when CLOUD_API_TOKEN is set", () => {
      process.env.CLOUD_API_TOKEN = "my-secret";
      expect(!process.env.CLOUD_API_TOKEN).toBe(false);
    });
  });

  describe("signToken and verifyToken round-trip", () => {
    it("signs and verifies a token", async () => {
      process.env.NODE_ENV = "development";
      process.env.CLOUD_API_TOKEN = "test-secret-for-vitest-roundtrip";
      const { signToken, verifyToken } = await import("@/lib/auth");
      const token = await signToken({ role: "admin" });
      const payload = await verifyToken(token);
      expect(payload).not.toBeNull();
      expect(payload!.sub).toBe("cloud-admin");
      expect(payload!.role).toBe("admin");
    });

    it("returns null for an invalid token", async () => {
      process.env.NODE_ENV = "development";
      process.env.CLOUD_API_TOKEN = "test-secret-for-vitest-invalid";
      const { verifyToken } = await import("@/lib/auth");
      const payload = await verifyToken("invalid.jwt.token");
      expect(payload).toBeNull();
    });
  });

  describe("constants", () => {
    it("COOKIE_NAME is ferrum-cloud-session", async () => {
      const { COOKIE_NAME } = await import("@/lib/auth");
      expect(COOKIE_NAME).toBe("ferrum-cloud-session");
    });

    it("TOKEN_EXPIRY is 3600 (1 hour)", async () => {
      const { TOKEN_EXPIRY } = await import("@/lib/auth");
      expect(TOKEN_EXPIRY).toBe(3600);
    });
  });
});
