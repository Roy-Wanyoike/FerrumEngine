import { type NextRequest, NextResponse } from "next/server";
import { getCloudStore } from "@/lib/cloud-store";
import type { UpdateTeamBody } from "@/lib/api-types";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ teamId: string }> }) {
  try {
    const { teamId } = await params;
    const store = getCloudStore();
    const team = store.getTeam(teamId);
    if (!team) return NextResponse.json({ error: "Team not found" }, { status: 404 });
    return NextResponse.json({
      ...team,
      memberCount: store.getTeamMemberCount(team.id),
      projectCount: store.getTeamProjectCount(team.id),
    });
  } catch (error) {
    console.error("[API] /api/cloud/teams/[teamId] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ teamId: string }> }) {
  try {
    const { teamId } = await params;
    let body: UpdateTeamBody;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    const store = getCloudStore();
    const team = store.updateTeam(teamId, body);
    if (!team) return NextResponse.json({ error: "Team not found" }, { status: 404 });
    return NextResponse.json(team);
  } catch (error) {
    console.error("[API] /api/cloud/teams/[teamId] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ teamId: string }> }) {
  try {
    const { teamId } = await params;
    const store = getCloudStore();
    const ok = store.deleteTeam(teamId);
    if (!ok) return NextResponse.json({ error: "Team not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[API] /api/cloud/teams/[teamId] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
