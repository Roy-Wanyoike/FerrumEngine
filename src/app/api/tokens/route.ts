import { NextResponse } from "next/server";
import tokens from "@/lib/ferrum-tokens/index.cjs";

export async function GET() {
  try {
    const t = tokens as Record<string, unknown>;
    return NextResponse.json({
      name: "@ferrum/tokens",
      version: "0.0.1",
      description: "Design tokens — the single source of truth for the Ferrum Platform",
      tokens: {
        colors: Object.keys(t.colors as Record<string, unknown>).length,
        spacing: Object.keys(t.spacing as Record<string, unknown>).length,
        fontSizes: Object.keys(t.fontSizes as Record<string, unknown>).length,
        fontWeights: Object.keys(t.fontWeights as Record<string, unknown>).length,
        shadows: Object.keys(t.shadows as Record<string, unknown>).length,
        radius: Object.keys(t.radius as Record<string, unknown>).length,
        durations: Object.keys(t.durations as Record<string, unknown>).length,
        easings: Object.keys(t.easings as Record<string, unknown>).length,
        breakpoints: Object.keys(t.breakpoints as Record<string, unknown>).length,
        zIndex: Object.keys(t.zIndex as Record<string, unknown>).length,
        opacity: Object.keys(t.opacity as Record<string, unknown>).length,
      },
      samples: {
        colors: t.colors,
        spacing: t.spacing,
        fontSizes: t.fontSizes,
      },
    }, {
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("[API] /api/tokens error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
