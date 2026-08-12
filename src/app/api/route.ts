import { NextResponse } from "next/server";
import { effects, categories } from "@/lib/ferrum-effects-index";

/* Pre-compute static response data (effects/categories don't change at runtime) */
const CATEGORY_LIST = categories.map((c) => ({
  id: c.id,
  name: c.name,
  count: effects.filter((e) => e.category === c.id).length,
}));

const API_ROOT_RESPONSE = {
  name: "FerrumEngine",
  version: "1.0.0",
  description: `${effects.length} production-ready CSS effects across ${categories.length} categories`,
  effects: effects.length,
  categories: categories.length,
  categoryList: CATEGORY_LIST,
  endpoints: {
    css: "/api/css?effect=roycss-fade-in&format=css",
    all: "/api/css?all=true",
    category: "/api/css?category=hover&minified=true",
    json: "/api/css?category=hover&format=json",
  },
};

export async function GET() {
  try {
    return NextResponse.json(API_ROOT_RESPONSE, {
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("[API] /api error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
