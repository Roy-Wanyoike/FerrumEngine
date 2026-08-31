import { describe, it, expect, vi, beforeEach } from "vitest";
import { getClientIP, _resetTrustedProxyCache } from "@/lib/get-client-ip";
import type { ClientIPRequest } from "@/lib/get-client-ip";

function mockRequest(opts: {
  headers?: Record<string, string>;
  ip?: string;
}): ClientIPRequest {
  return {
    headers: {
      get: (name: string) => opts.headers?.[name] ?? null,
    },
    ip: opts.ip,
  };
}

function setNodeEnv(value: string | undefined) {
  // @ts-expect-error -- NODE_ENV is read-only by default; intentionally overridden for tests
  process.env.NODE_ENV = value;
}

beforeEach(() => {
  _resetTrustedProxyCache();
  delete process.env.TRUSTED_PROXY_IPS;
  setNodeEnv(undefined);
});

describe("getClientIP — T-H04 IP Spoofing Prevention", () => {
  describe("no TRUSTED_PROXY_IPS set (legacy mode)", () => {
    it("should return x-real-ip when present", () => {
      const req = mockRequest({
        headers: { "x-real-ip": "1.2.3.4" },
      });
      expect(getClientIP(req)).toBe("1.2.3.4");
    });

    it("should return first entry of x-forwarded-for when x-real-ip missing", () => {
      const req = mockRequest({
        headers: { "x-forwarded-for": "10.0.0.1, 172.16.0.1" },
      });
      expect(getClientIP(req)).toBe("10.0.0.1");
    });

    it("should return 'unknown' when no proxy headers are present", () => {
      const req = mockRequest({});
      expect(getClientIP(req)).toBe("unknown");
    });

    it("should emit console.warn in dev mode when TRUSTED_PROXY_IPS not set", () => {
      setNodeEnv("development");
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const req = mockRequest({ headers: { "x-real-ip": "1.2.3.4" } });
      getClientIP(req);

      expect(warnSpy).toHaveBeenCalledOnce();
      expect(warnSpy.mock.calls[0]![0]).toContain("TRUSTED_PROXY_IPS");
      warnSpy.mockRestore();
      setNodeEnv(undefined);
    });

    it("should not emit console.warn in production when TRUSTED_PROXY_IPS not set", () => {
      setNodeEnv("production");
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const req = mockRequest({ headers: { "x-real-ip": "1.2.3.4" } });
      getClientIP(req);

      expect(warnSpy).not.toHaveBeenCalled();
      warnSpy.mockRestore();
      setNodeEnv(undefined);
    });
  });

  describe("TRUSTED_PROXY_IPS configured", () => {
    it("should trust proxy headers when direct IP matches a trusted proxy", () => {
      process.env.TRUSTED_PROXY_IPS = "10.0.0.1, 10.0.0.2";
      _resetTrustedProxyCache();

      const req = mockRequest({
        ip: "10.0.0.1",
        headers: { "x-real-ip": "203.0.113.50" },
      });
      expect(getClientIP(req)).toBe("203.0.113.50");
    });

    it("should reject proxy headers when direct IP is NOT a trusted proxy", () => {
      process.env.TRUSTED_PROXY_IPS = "10.0.0.1, 10.0.0.2";
      _resetTrustedProxyCache();

      const req = mockRequest({
        ip: "192.168.1.100",
        headers: { "x-real-ip": "spoofed-ip" },
      });
      expect(getClientIP(req)).toBe("unknown");
    });

    it("should return 'unknown' when direct IP is undefined and proxy IPs are set", () => {
      process.env.TRUSTED_PROXY_IPS = "10.0.0.1";
      _resetTrustedProxyCache();

      const req = mockRequest({
        headers: { "x-real-ip": "203.0.113.50" },
      });
      expect(getClientIP(req)).toBe("unknown");
    });

    it("should handle multiple x-forwarded-for entries from trusted proxy", () => {
      process.env.TRUSTED_PROXY_IPS = "10.0.0.1";
      _resetTrustedProxyCache();

      const req = mockRequest({
        ip: "10.0.0.1",
        headers: { "x-forwarded-for": "client-ip, proxy1, proxy2" },
      });
      expect(getClientIP(req)).toBe("client-ip");
    });

    it("should handle localhost as a trusted proxy IP", () => {
      process.env.TRUSTED_PROXY_IPS = "::1, 127.0.0.1";
      _resetTrustedProxyCache();

      const req = mockRequest({
        ip: "::1",
        headers: { "x-real-ip": "192.168.1.50" },
      });
      expect(getClientIP(req)).toBe("192.168.1.50");
    });

    it("should handle IPv6 addresses in TRUSTED_PROXY_IPS", () => {
      process.env.TRUSTED_PROXY_IPS = "::ffff:10.0.0.1, 2001:db8::1";
      _resetTrustedProxyCache();

      const req = mockRequest({
        ip: "2001:db8::1",
        headers: { "x-real-ip": "203.0.113.50" },
      });
      expect(getClientIP(req)).toBe("203.0.113.50");
    });

    it("should return 'unknown' when x-forwarded-for has empty string", () => {
      process.env.TRUSTED_PROXY_IPS = "10.0.0.1";
      _resetTrustedProxyCache();

      const req = mockRequest({
        ip: "10.0.0.1",
        headers: { "x-forwarded-for": "" },
      });
      expect(getClientIP(req)).toBe("unknown");
    });

    it("should treat empty TRUSTED_PROXY_IPS as not configured (legacy mode)", () => {
      process.env.TRUSTED_PROXY_IPS = "  ";
      _resetTrustedProxyCache();

      const req = mockRequest({
        headers: { "x-real-ip": "1.2.3.4" },
      });
      expect(getClientIP(req)).toBe("1.2.3.4");
    });

    it("should prefer x-real-ip over x-forwarded-for from trusted proxy", () => {
      process.env.TRUSTED_PROXY_IPS = "10.0.0.1";
      _resetTrustedProxyCache();

      const req = mockRequest({
        ip: "10.0.0.1",
        headers: {
          "x-real-ip": "1.2.3.4",
          "x-forwarded-for": "5.6.7.8",
        },
      });
      expect(getClientIP(req)).toBe("1.2.3.4");
    });

    it("should trim whitespace from x-forwarded-for first entry", () => {
      process.env.TRUSTED_PROXY_IPS = "10.0.0.1";
      _resetTrustedProxyCache();

      const req = mockRequest({
        ip: "10.0.0.1",
        headers: { "x-forwarded-for": "  10.0.0.50  , 10.0.0.1" },
      });
      expect(getClientIP(req)).toBe("10.0.0.50");
    });
  });
});
