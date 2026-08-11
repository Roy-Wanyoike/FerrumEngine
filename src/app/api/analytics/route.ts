import { type NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter for analytics endpoint
const analyticsAttempts = new Map<string, { count: number; resetAt: number }>();
const ANALYTICS_WINDOW_MS = 60 * 1000; // 1 minute
const ANALYTICS_MAX_REQUESTS = 30; // per IP per minute

// Cleanup old entries every 5 minutes to prevent memory leak
const ANALYTICS_CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let analyticsLastCleanup = Date.now();

function cleanupAnalyticsEntries() {
  const now = Date.now();
  if (now - analyticsLastCleanup < ANALYTICS_CLEANUP_INTERVAL_MS) return;
  analyticsLastCleanup = now;
  for (const [key, entry] of analyticsAttempts) {
    if (now > entry.resetAt) analyticsAttempts.delete(key);
  }
}

function checkAnalyticsRateLimit(ip: string): boolean {
  cleanupAnalyticsEntries();
  const now = Date.now();
  const existing = analyticsAttempts.get(ip);
  if (!existing || now > existing.resetAt) {
    analyticsAttempts.set(ip, { count: 1, resetAt: now + ANALYTICS_WINDOW_MS });
    return true;
  }
  existing.count++;
  return existing.count <= ANALYTICS_MAX_REQUESTS;
}

const EXPECTED_FIELDS = ["name", "value", "rating", "id"];

export async function POST(request: NextRequest) {
  try {
    const clientIP = request.headers.get("x-real-ip") || "unknown";

    // Rate limiting
    if (!checkAnalyticsRateLimit(clientIP)) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    // Validate expected fields are present
    for (const field of EXPECTED_FIELDS) {
      if (!(field in body) || body[field] === undefined || body[field] === null) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate field types
    if (typeof body.name !== "string" || typeof body.id !== "string") {
      return NextResponse.json({ error: "Invalid field types" }, { status: 400 });
    }
    if (typeof body.value !== "number" || typeof body.rating !== "number") {
      return NextResponse.json({ error: "Invalid field types" }, { status: 400 });
    }

    // Analytics payload received (silently logged in dev via debug flag)
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[API] /api/analytics error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
