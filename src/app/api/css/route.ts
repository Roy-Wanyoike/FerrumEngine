import { type NextRequest, NextResponse } from "next/server";
import { effects } from "@/lib/ferrum-effects-data";
import { categories } from "@/lib/ferrum-effects-index";

/**
 * GET /api/css
 *
 * Query params:
 *   ?effect=roycss-fade-in  → single effect CSS
 *   ?category=hover          → all effects in a category
 *   ?all=true                → full library CSS
 *   ?minified=true           → strip comments & whitespace
 *   ?format=json             → return JSON instead of text/css
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const effectName = searchParams.get("effect");
    const category = searchParams.get("category");
    const all = searchParams.get("all") === "true";
    const minified = searchParams.get("minified") === "true";
    const format = searchParams.get("format");

    // Determine allowed origin from request
    const origin = request.headers.get("origin");
    const allowedOrigins = [process.env.NEXT_PUBLIC_SITE_URL || "https://ferrumcss.space-z.ai", "http://localhost:3000"];
    const allowedOrigin: string = (origin && allowedOrigins.includes(origin)) ? origin : (allowedOrigins[0] ?? "https://ferrumcss.space-z.ai");

    let cssEffects = effects;

    // Filter by single effect
    if (effectName) {
      cssEffects = effects.filter(
        (e) => e.className === effectName || e.name.toLowerCase().replace(/\s+/g, "-") === effectName
      );
      if (cssEffects.length === 0) {
        return NextResponse.json(
          { error: "Effect not found" },
          { status: 404 }
        );
      }
    }
    // Filter by category
    else if (category) {
      const catExists = categories.some((c) => c.id === category);
      if (!catExists) {
        return NextResponse.json(
          { error: "Category not found" },
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
          single: "/api/css?effect=roycss-fade-in",
          category: "/api/css?category=hover",
          all: "/api/css?all=true",
          minified: "/api/css?all=true&minified=true",
          json: "/api/css?category=hover&format=json",
        },
        categories: (() => {
          const counts = new Map<string, number>();
          for (const e of effects) {
            counts.set(e.category, (counts.get(e.category) ?? 0) + 1);
          }
          return categories.map((c) => ({ id: c.id, name: c.name, count: counts.get(c.id) ?? 0 }));
        })(),
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
        if (nameMatch && nameMatch[1] && !seenKf.has(nameMatch[1])) {
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
      return NextResponse.json(
        {
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
        },
        { headers: { "Access-Control-Allow-Origin": allowedOrigin } }
      );
    }

    // Return as CSS — use long-term caching for full minified bundle (immutable content per version),
    // shorter cache for dynamic queries
    const isImmutableBundle = all && minified;
    const cacheControl = isImmutableBundle
      ? 'public, max-age=31536000, immutable'
      : 'public, max-age=3600, stale-while-revalidate=86400';

    return new NextResponse(cssOutput, {
      headers: {
        'Content-Type': 'text/css; charset=utf-8',
        'Cache-Control': cacheControl,
        'Access-Control-Allow-Origin': allowedOrigin,
      },
    });
  } catch (error) {
    console.error("[API] /api/css error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
