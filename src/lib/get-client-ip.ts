/**
 * T-H04 — IP Spoofing Prevention
 *
 * Extracts client IP from request headers, but only trusts proxy headers
 * (x-real-ip, x-forwarded-for) when the direct connection comes from a
 * known reverse proxy.
 *
 * ENV: TRUSTED_PROXY_IPS (comma-separated, optional)
 *   - If set, proxy headers are only honored when req.ip / remoteAddress
 *     matches a listed proxy IP.
 *   - If not set (default), current behavior is preserved but a
 *     console.warn is emitted in development mode.
 */

export interface ClientIPRequest {
  headers: {
    get(name: string): string | null;
  };
  /** NextRequest doesn't expose req.ip, so callers pass the remote address. */
  ip?: string;
}

/**
 * Parse TRUSTED_PROXY_IPS into a Set (cached across calls).
 */
let _trustedProxySet: Set<string> | null | undefined;

function getTrustedProxyIPs(): Set<string> | null {
  if (_trustedProxySet !== undefined) return _trustedProxySet;

  const raw = process.env.TRUSTED_PROXY_IPS;
  if (!raw || raw.trim() === "") {
    _trustedProxySet = null;
    return null;
  }

  _trustedProxySet = new Set(
    raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  );
  return _trustedProxySet;
}

/**
 * Determine whether the direct connection IP belongs to a trusted proxy.
 */
function isFromTrustedProxy(remoteAddr: string | undefined): boolean {
  const trusted = getTrustedProxyIPs();
  if (trusted === null) return true; // no config → trust all (legacy behavior)
  if (!remoteAddr) return false;
  return trusted.has(remoteAddr);
}

/**
 * Extract the client IP address from the request.
 *
 * Priority when behind a trusted proxy:
 *   1. x-real-ip header
 *   2. First entry in x-forwarded-for
 *   3. Fall back to "unknown"
 *
 * When NOT behind a trusted proxy (TRUSTED_PROXY_IPS configured
 * but direct IP doesn't match), proxy headers are ignored and
 * "unknown" is returned to prevent spoofing.
 */
export function getClientIP(request: ClientIPRequest): string {
  const trusted = getTrustedProxyIPs();

  // No TRUSTED_PROXY_IPS configured → legacy behavior with dev warning
  if (trusted === null) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[security] TRUSTED_PROXY_IPS is not set. IP headers (x-real-ip, x-forwarded-for) " +
          "are trusted unconditionally. Set TRUSTED_PROXY_IPS in production to prevent IP spoofing."
      );
    }

    return extractIPFromHeaders(request);
  }

  // TRUSTED_PROXY_IPS is configured — verify the direct connection
  if (!isFromTrustedProxy(request.ip)) {
    // Direct connection not from a trusted proxy; ignore proxy headers
    return "unknown";
  }

  return extractIPFromHeaders(request);
}

/**
 * Pure extraction from headers (no trust check).
 */
function extractIPFromHeaders(request: ClientIPRequest): string {
  const xri = request.headers.get("x-real-ip");
  if (xri && xri.length > 0) return xri.trim();

  const xff = request.headers.get("x-forwarded-for");
  if (xff && xff.length > 0) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }

  return "unknown";
}

/**
 * Reset the cached trusted proxy set (for testing).
 */
export function _resetTrustedProxyCache(): void {
  _trustedProxySet = undefined;
}
