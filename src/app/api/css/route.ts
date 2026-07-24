import { NextRequest, NextResponse } from "next/server";
import { effects, categories } from "@/lib/ferrum-effects-data";

/**
 * GET /api/css
 *
 * Query params:
 *   ?effect=rc-fade-in       → single effect CSS
 *   ?category=hover          → all effects in a category
 *   ?all=true                → full library CSS
 *   ?minified=true           → strip comments & whitespace
 *   ?format=json             → return JSON instead of text/css
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const effectName = searchParams.get("effect");
  const category = searchParams.get("category");
  const all = searchParams.get("all") === "true";
  const minified = searchParams.get("minified") === "true";
  const format = searchParams.get("format");

  let cssEffects = effects;

  // Filter by single effect
  if (effectName) {
    cssEffects = effects.filter(
      (e) => e.className === effectName || e.name.toLowerCase().replace(/\s+/g, "-") === effectName
    );
    if (cssEffects.length === 0) {
      return NextResponse.json(
        { error: `Effect "${effectName}" not found. Available: ${effects.map((e) => e.className).join(", ")}` },
        { status: 404 }
      );
    }
  }
  // Filter by category
  else if (category) {
    const catExists = categories.some((c) => c.id === category);
    if (!catExists) {
      return NextResponse.json(
        { error: `Category "${category}" not found. Available: ${categories.map((c) => c.id).join(", ")}` },
        { status: 404 }
      );
    }
    cssEffects = effects.filter((e) => e.category === category);
  }
  // All effects
  else if (!all) {
    return NextResponse.json({
      message: "FerrumEngine API — specify ?effect=, ?category=, or ?all=true",
      endpoints: {
        single: "/api/css?effect=fr-fade-in",
        category: "/api/css?category=hover",
        all: "/api/css?all=true",
        minified: "/api/css?all=true&minified=true",
        json: "/api/css?category=hover&format=json",
      },
      categories: categories.map((c) => ({ id: c.id, name: c.name, count: effects.filter((e) => e.category === c.id).length })),
      totalEffects: effects.length,
    });
  }

  // Collect unique keyframes
  const seenKf = new Set<string>();
  const keyframes: string[] = [];
  const classRules: string[] = [];

  for (const effect of cssEffects) {
    const kfMatches = effect.css.match(/@keyframes[\s\S]*?(?=@keyframes|$)/g) || [];
    for (const kf of kfMatches) {
      const nameMatch = kf.match(/@keyframes\s+([\w-]+)/);
      if (nameMatch && !seenKf.has(nameMatch[1])) {
        seenKf.add(nameMatch[1]);
        keyframes.push(kf.trim());
      }
    }
    // Extract class rules (remove keyframes)
    const rules = effect.css.replace(/@keyframes[\s\S]*?(?=@keyframes|$)/g, "").trim();
    if (rules) classRules.push(rules);
  }

  let cssOutput = "";
  if (keyframes.length > 0) {
    cssOutput += "/* FerrumEngine — Keyframes */\n" + keyframes.join("\n\n") + "\n\n";
  }
  cssOutput += "/* FerrumEngine — Effect Classes */\n" + classRules.join("\n\n");

  // Minify
  if (minified) {
    cssOutput = cssOutput
      .replace(/\/\*[\s\S]*?\*\//g, "") // strip comments
      .replace(/\s+/g, " ")             // collapse whitespace
      .replace(/\s*([{}:;,])\s*/g, "$1") // remove spaces around punctuation
      .replace(/;}/g, "}")               // remove trailing semicolons
      .trim();
  }

  // Return JSON format
  if (format === "json") {
    return NextResponse.json({
      effects: cssEffects.map((e) => ({
        name: e.name,
        className: e.className,
        category: e.category,
        displayType: e.displayType,
        css: e.css,
      })),
      css: cssOutput,
      count: cssEffects.length,
      sizeBytes: new TextEncoder().encode(cssOutput).length,
      categories: [...new Set(cssEffects.map((e) => e.category))],
    });
  }

  // Return as CSS
  return new NextResponse(cssOutput, {
    headers: {
      "Content-Type": "text/css; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}