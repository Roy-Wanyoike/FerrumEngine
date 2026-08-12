import { timingSafeEqual } from "crypto";
import { type NextRequest, NextResponse } from "next/server";

/**
 * POST /api/cloud/auth
 *
 * ⚠️  DEMO-ONLY AUTHENTICATION — NOT PRODUCTION-READY
 * ───────────────────────────────────────────────────────
 * This endpoint authenticates users and returns a static shared token.
 * It is designed for development/demo purposes and has critical limitations:
 *
 * 1. Static shared token: Every authenticated user receives the same token.
 *    There is no per-user identity, no token revocation, and no way to
 *    distinguish between users after authentication.
 *
 * 2. No token expiration: The `expires_in: 86400` field is informational only.
 *    The token itself never expires. The middleware in src/middleware.ts does
 *    not check token age.
 *
 * 3. Shared secret auth: A single ADMIN_PASSWORD protects all access.
 *    This is suitable for a single-admin demo, not for multi-user systems.
 *
 * TODO (PRODUCTION): Replace with proper JWT authentication:
 *   - Issue short-lived JWTs signed with an asymmetric key pair (RS256)
 *   - Include user identity, roles, and `exp` claim in the JWT payload
 *   - Validate JWTs in middleware using `jose` or `jsonwebtoken`
 *   - Implement token refresh / rotation
 *   - Store password hashes in a database (bcrypt/argon2), never plaintext
 *   - Add audit logging for authentication events
 */
export async function POST(req: NextRequest) {
  // NOTE: Returns static API token as bearer. Token never actually expires —
  // expires_in is informational only. Production should use JWT with exp claim.
  // Check config before parsing body — separate config errors from JSON errors
  const ADMIN_PASSWORD = (() => {
    const pw = process.env.CLOUD_ADMIN_PASSWORD;
    if (!pw) return null;
    return pw;
  })();
  if (!ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Authentication service is not properly configured" },
      { status: 500 }
    );
  }
  const API_TOKEN = process.env.CLOUD_API_TOKEN;
  if (!API_TOKEN) {
    return NextResponse.json(
      { error: "Authentication service is not properly configured" },
      { status: 500 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const password = body?.password;

  if (!password || typeof password !== "string") {
    return NextResponse.json(
      { error: "Password is required" },
      { status: 400 }
    );
  }

  // Timing-safe password comparison
  if (
    password.length !== ADMIN_PASSWORD.length ||
    !timingSafeEqual(Buffer.from(password), Buffer.from(ADMIN_PASSWORD))
  ) {
    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    // TODO(PRODUCTION): Replace static token with signed JWT containing
    // user identity, roles, and expiration. See header comment for details.
    token: API_TOKEN,
    message: "Authenticated successfully",
    // TODO(PRODUCTION): This value is informational only. The middleware does
    // not enforce expiration. JWT should encode a real `exp` claim instead.
    expires_in: 86400,
  });
}
