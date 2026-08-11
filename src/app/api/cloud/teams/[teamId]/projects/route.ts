import { type NextRequest, NextResponse } from "next/server";
import { getCloudStore } from "@/lib/cloud-store";
import type { CreateProjectBody } from "@/lib/api-types";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ teamId: string }> }) {
  try {
    const { teamId } = await params;
    const store = getCloudStore();
    const projects = store.getProjects(teamId).map(p => ({
      ...p,
      tokenCount: store.getProjectTokenCount(p.id),
      componentCount: store.getProjectComponentCount(p.id),
    }));
    return NextResponse.json(projects);
  } catch (error) {
    console.error("[API] /api/cloud/teams/[teamId]/projects error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ teamId: string }> }) {
  try {
    const { teamId } = await params;
    let body: CreateProjectBody;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    const name = body?.name?.trim();
    const env = body?.environment ?? "dev";
    if (!name || typeof name !== "string" || name.length < 2 || name.length > 60) {
      return NextResponse.json({ error: "Name must be 2-60 characters" }, { status: 400 });
    }
    if (!["dev", "staging", "production"].includes(env)) {
      return NextResponse.json({ error: "Invalid environment" }, { status: 400 });
    }
    const store = getCloudStore();
    if (!store.getTeam(teamId)) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }
    const project = store.createProject(teamId, name, env);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("[API] /api/cloud/teams/[teamId]/projects error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
