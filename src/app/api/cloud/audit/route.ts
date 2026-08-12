import { type NextRequest, NextResponse } from "next/server";
import { getCloudStore } from "@/lib/cloud-store";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const teamId = searchParams.get("teamId") || undefined;
    const limit = Math.min(Math.max(1, parseInt(searchParams.get("limit") || "20", 10) || 20), 50);
    const store = getCloudStore();
    const logs = store.getAuditLogs(teamId, limit);
    return NextResponse.json(logs);
  } catch (error) {
    console.error("[API] /api/cloud/audit error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}