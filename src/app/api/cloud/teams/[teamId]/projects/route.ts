import { type NextRequest, NextResponse } from "next/server";
import { supabaseGetTeam, supabaseGetProjects, supabaseCreateProject, supabaseGetProjectTokenCount, supabaseGetProjectComponentCount } from "@/lib/supabase-store";
import type { CreateProjectBody } from "@/lib/api-types";
import { requireCsrf } from "@/lib/csrf";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ teamId: string }> }) {
  try {
    const { teamId } = await params;
    const projects = await supabaseGetProjects(teamId);
    const enriched = await Promise.all(
      projects.map(async (p) => ({
        ...p,
        tokenCount: await supabaseGetProjectTokenCount(p.id),
        componentCount: await supabaseGetProjectComponentCount(p.id),
      }))
    );
    return NextResponse.json(enriched);
  } catch (error) {
    console.error("[API] /api/cloud/teams/[teamId]/projects error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ teamId: string }> }) {
  try {
    // CSRF protection for mutation
    const csrfFail = requireCsrf(req);
    if (csrfFail) return csrfFail;

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
    const team = await supabaseGetTeam(teamId);
    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }
    const project = await supabaseCreateProject(teamId, name, env);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("[API] /api/cloud/teams/[teamId]/projects error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
