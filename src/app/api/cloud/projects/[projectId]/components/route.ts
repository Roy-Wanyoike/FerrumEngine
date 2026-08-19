import { type NextRequest, NextResponse } from "next/server";
import { supabaseGetComponents } from "@/lib/supabase-store";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ projectId: string }> }) {
  try {
    const { projectId } = await params;
    const components = await supabaseGetComponents(projectId);
    return NextResponse.json(components);
  } catch (error) {
    console.error("[API] /api/cloud/projects/[projectId]/components error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
