import { type NextRequest, NextResponse } from "next/server";
import { supabaseGetTeam, supabaseUpdateTeam, supabaseDeleteTeam, supabaseGetTeamMemberCount, supabaseGetTeamProjectCount } from "@/lib/supabase-store";
import type { UpdateTeamBody } from "@/lib/api-types";
import { requireCsrf } from "@/lib/csrf";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ teamId: string }> }) {
  try {
    const { teamId } = await params;
    const team = await supabaseGetTeam(teamId);
    if (!team) return NextResponse.json({ error: "Team not found" }, { status: 404 });
    const [memberCount, projectCount] = await Promise.all([
      supabaseGetTeamMemberCount(team.id),
      supabaseGetTeamProjectCount(team.id),
    ]);
    return NextResponse.json({ ...team, memberCount, projectCount });
  } catch (error) {
    console.error("[API] /api/cloud/teams/[teamId] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ teamId: string }> }) {
  try {
    // CSRF protection for mutation
    const csrfFail = requireCsrf(req);
    if (csrfFail) return csrfFail;

    const { teamId } = await params;
    let body: UpdateTeamBody;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    const rawName = body?.name;
    if (rawName !== undefined) {
      const name = typeof rawName === "string" ? rawName.trim() : "";
      if (name.length < 2 || name.length > 50) {
        return NextResponse.json({ error: "Name must be 2-50 characters" }, { status: 400 });
      }
    }
    const team = await supabaseUpdateTeam(teamId, body);
    if (!team) return NextResponse.json({ error: "Team not found" }, { status: 404 });
    return NextResponse.json(team);
  } catch (error) {
    console.error("[API] /api/cloud/teams/[teamId] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ teamId: string }> }) {
  try {
    // CSRF protection for mutation
    const csrfFail = requireCsrf(req);
    if (csrfFail) return csrfFail;

    const { teamId } = await params;
    const ok = await supabaseDeleteTeam(teamId);
    if (!ok) return NextResponse.json({ error: "Team not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API] /api/cloud/teams/[teamId] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
