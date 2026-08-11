import { NextResponse } from "next/server";
import { effects, categories } from "@/lib/ferrum-effects-index";

export async function GET() {
  try {
    return NextResponse.json({
      name: "FerrumEngine",
      version: "1.0.0",
      description: `${effects.length} production-ready CSS effects across ${categories.length} categories`,
      effects: effects.length,
      categories: categories.length,
      categoryList: categories.map((c) => ({ id: c.id, name: c.name, count: effects.filter((e) => e.category === c.id).length })),
      endpoints: {
        css: "/api/css?effect=rc-fade-up&format=css",
        all: "/api/css?all=true",
        category: "/api/css?category=hover&minified=true",
        json: "/api/css?category=hover&format=json",
      },
    });
  } catch (error) {
    console.error("[API] /api error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
