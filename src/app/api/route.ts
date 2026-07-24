import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: "FerrumEngine",
    version: "1.0.0",
    description: "848 production-ready CSS effects across 11 categories",
    effects: 848,
    categories: 11,
    endpoints: {
      css: "/api/css?effect=fade-in&format=css",
      all: "/api/css?format=all",
      category: "/api/css?category=hover&format=minified",
    },
  });
}