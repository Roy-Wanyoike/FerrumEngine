import { type NextRequest, NextResponse } from "next/server";
import { supabaseUpdateToken } from "@/lib/supabase-store";
import { requireCsrf } from "@/lib/csrf";

const VALID_UPDATE_FIELDS = ["name", "value", "namespace"] as const;

type ValidUpdateBody = {
  name?: unknown;
  value?: unknown;
  namespace?: unknown;
};

export async function PUT(req: NextRequest, { params }: { params: Promise<{ tokenId: string }> }) {
  try {
    // CSRF protection for mutation
    const csrfFail = requireCsrf(req);
    if (csrfFail) return csrfFail;

    const { tokenId } = await params;
    let body: ValidUpdateBody;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    // Validate that body contains only expected string fields with length limits
    const validFields: Record<string, string> = {};
    for (const field of VALID_UPDATE_FIELDS) {
      const val = body[field];
      if (val !== undefined) {
        if (typeof val !== "string") {
          return NextResponse.json({ error: `Field "${field}" must be a string` }, { status: 400 });
        }
        if (val.length > (field === "value" ? 1024 : 100)) {
          return NextResponse.json({ error: `Field "${field}" exceeds maximum length` }, { status: 400 });
        }
        validFields[field] = val;
      }
    }

    if (Object.keys(validFields).length === 0) {
      return NextResponse.json({ error: "No valid fields to update. Accepted fields: name, value, namespace" }, { status: 400 });
    }

    const token = await supabaseUpdateToken(tokenId, validFields);
    if (!token) return NextResponse.json({ error: "Token not found" }, { status: 404 });
    return NextResponse.json(token);
  } catch (error) {
    console.error("[API] /api/cloud/tokens/[tokenId] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
