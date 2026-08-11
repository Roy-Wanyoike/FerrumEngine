import { timingSafeEqual } from "crypto";
import { type NextRequest, NextResponse } from "next/server";

/**
 * POST /api/cloud/auth
 *
 * Authenticates a user and returns a bearer token.
 * In production, replace with proper JWT + database-backed user store.
 * Currently uses a shared secret for demo purposes.
 */
export async function POST(req: NextRequest) {
  // NOTE: Returns static API token as bearer. Token never actually expires — expires_in is informational only. Production should use JWT.
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
    token: API_TOKEN,
    message: "Authenticated successfully",
    expires_in: 86400,
  });
}
