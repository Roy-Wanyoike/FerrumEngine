import { type NextRequest, NextResponse } from "next/server";
import { getCloudStore } from "@/lib/cloud-store";
import type { CreateTokenBody } from "@/lib/api-types";
import type { TokenType } from "@/lib/types";

const VALID_TOKEN_TYPES: TokenType[] = ["color", "spacing", "typography", "shadow", "motion", "border", "radius"];

export async function GET(_req: NextRequest, { params }: { params: Promise<{ projectId: string }> }) {
  try {
    const { projectId } = await params;
    const store = getCloudStore();
    const tokens = store.getTokens(projectId);
    return NextResponse.json(tokens);
  } catch (error) {
    console.error("[API] /api/cloud/projects/[projectId]/tokens error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ projectId: string }> }) {
  try {
    const { projectId } = await params;
    let body: CreateTokenBody;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    const name = body?.name?.trim();
    const value = body?.value?.trim();
    const type = body?.type;
    const namespace = body?.namespace?.trim() || "global";

    if (!name || typeof name !== "string" || name.length > 100) {
      return NextResponse.json({ error: "Token name is required (max 100 chars)" }, { status: 400 });
    }
    if (!value || typeof value !== "string" || value.length > 1024) {
      return NextResponse.json({ error: "Token value is required (max 1024 chars)" }, { status: 400 });
    }
    if (!type || !VALID_TOKEN_TYPES.includes(type)) {
      return NextResponse.json({ error: `Invalid type. Must be one of: ${VALID_TOKEN_TYPES.join(", ")}` }, { status: 400 });
    }

    const store = getCloudStore();
    if (!store.getProject(projectId)) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    const token = store.createToken(projectId, { name, value, type, namespace });
    return NextResponse.json(token, { status: 201 });
  } catch (error) {
    console.error("[API] /api/cloud/projects/[projectId]/tokens error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
