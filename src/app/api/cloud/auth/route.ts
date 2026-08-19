import { timingSafeEqual } from "crypto";
import { type NextRequest, NextResponse } from "next/server";
import { signToken, isDemoMode, COOKIE_NAME, TOKEN_EXPIRY } from "@/lib/auth";
import { requireCsrf } from "@/lib/csrf";

/**
 * POST /api/cloud/auth — Login
 *
 * Accepts a password in the request body. If CLOUD_ADMIN_PASSWORD is set,
 * the password must match (timing-safe comparison). If not set (demo mode),
 * any non-empty password is accepted.
 *
 * On success: returns a JWT in the response body AND sets an httpOnly cookie
 * so the middleware can protect /cloud/* page routes.
 *
 * DELETE /api/cloud/auth — Logout
 *
 * Clears the httpOnly session cookie.
 */
export async function POST(req: NextRequest) {
  // CSRF protection — login endpoint has no auth, so CSRF is critical
  const csrfFail = requireCsrf(req);
  if (csrfFail) return csrfFail;

  const ADMIN_PASSWORD = (() => {
    const pw = process.env.CLOUD_ADMIN_PASSWORD;
    if (!pw) return null;
    return pw;
  })();
  const demo = isDemoMode();

  // In non-demo mode, both env vars are required
  if (!demo && !ADMIN_PASSWORD) {
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

  // In non-demo mode, perform timing-safe password comparison
  if (!demo) {
    if (
      password.length !== ADMIN_PASSWORD!.length ||
      !timingSafeEqual(Buffer.from(password), Buffer.from(ADMIN_PASSWORD!))
    ) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }
  }

  // Issue JWT
  const token = await signToken();

  // Build response with httpOnly cookie
  const response = NextResponse.json({
    token,
    message: "Authenticated successfully",
    expires_in: TOKEN_EXPIRY,
    demo: demo,
  });

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TOKEN_EXPIRY,
  });

  return response;
}

/**
 * DELETE /api/cloud/auth — Logout
 *
 * Clears the httpOnly session cookie.
 */
export async function DELETE(req: NextRequest) {
  // CSRF protection — logout is a state-changing operation
  const csrfFail = requireCsrf(req);
  if (csrfFail) return csrfFail;

  const response = NextResponse.json({
    message: "Logged out successfully",
  });

  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
