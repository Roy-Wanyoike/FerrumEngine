import { type NextRequest, NextResponse } from "next/server";
import { supabaseGetTeams, supabaseCreateTeam, supabaseGetTeamMemberCount, supabaseGetTeamProjectCount } from "@/lib/supabase-store";
import type { CreateTeamBody } from "@/lib/api-types";

export async function GET() {
  try {
    const teams = await supabaseGetTeams();
    const enriched = await Promise.all(
      teams.map(async (t) => ({
        ...t,
        memberCount: await supabaseGetTeamMemberCount(t.id),
        projectCount: await supabaseGetTeamProjectCount(t.id),
      }))
    );
    return NextResponse.json(enriched);
  } catch (error) {
    console.error("[API] /api/cloud/teams error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let body: CreateTeamBody;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    const name = body?.name?.trim();
    if (!name || typeof name !== "string" || name.length < 2 || name.length > 50) {
      return NextResponse.json({ error: "Name must be 2-50 characters" }, { status: 400 });
    }
    const team = await supabaseCreateTeam(name);
    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    console.error("[API] /api/cloud/teams error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
