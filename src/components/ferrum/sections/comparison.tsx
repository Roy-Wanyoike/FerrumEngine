"use client";

import { useState } from "react";
import { Check, X, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Reveal } from "@/components/ferrum/scroll-reveal";

const tools = [
  { key: "ferrum", name: "Ferrum", highlight: true },
  { key: "tailwind", name: "Tailwind CSS", highlight: false },
  { key: "framer", name: "Framer Motion", highlight: false },
  { key: "gsap", name: "GSAP", highlight: false },
  { key: "mui", name: "Material UI", highlight: false },
  { key: "radix", name: "Radix UI", highlight: false },
];

const categories = [
  { name: "Styling & Utilities", ferrum: true, tailwind: true, framer: false, gsap: false, mui: true, radix: false },
  { name: "Motion & Animation", ferrum: true, tailwind: false, framer: true, gsap: true, mui: false, radix: false },
  { name: "VFX & Visual Effects", ferrum: true, tailwind: false, framer: false, gsap: false, mui: false, radix: false },
  { name: "848 CSS Effects", ferrum: true, tailwind: false, framer: false, gsap: false, mui: false, radix: false },
  { name: "Framework Adapters", ferrum: "soon" as const, tailwind: true, framer: true, gsap: false, mui: false, radix: true },
  { name: "Accessibility Suite", ferrum: "soon" as const, tailwind: false, framer: false, gsap: false, mui: true, radix: true },
  { name: "AI UI Generation", ferrum: "soon" as const, tailwind: false, framer: false, gsap: false, mui: false, radix: false },
  { name: "Visual Editor", ferrum: "soon" as const, tailwind: false, framer: true, gsap: false, mui: false, radix: false },
  { name: "Design Token System", ferrum: "soon" as const, tailwind: false, framer: false, gsap: false, mui: true, radix: false },
  { name: "CSS Compiler", ferrum: "soon" as const, tailwind: false, framer: false, gsap: false, mui: false, radix: false },
];

function CellValue({ value }: { value: boolean | "soon" }) {
  if (value === "soon") {
    return (
      <span className="inline-flex items-center justify-center" title="Coming Soon">
        <Sparkles className="w-3.5 h-3.5 text-amber-400/60" />
      </span>
    );
  }
  if (value) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10">
        <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={2.5} />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center">
      <X className="w-3.5 h-3.5 text-muted-foreground/40" strokeWidth={2} />
    </span>
  );
}

export function Comparison() {
  const [expanded, setExpanded] = useState(true);

  return (
    <section id="comparison" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 right-0 w-[600px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal>
          <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">Why Ferrum</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Not Another CSS Library.
            <br />
            <span className="text-muted-foreground/70">A New Category.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mt-5">
            Ferrum combines what previously required 5+ separate tools into one universal engine.
          </p>
        </Reveal>

        {/* Comparison Matrix */}
        <Reveal delay={0.15}>
          <div className="mt-16 rounded-2xl border border-border bg-foreground/[0.02] overflow-hidden scroll-fade-up">
            {expanded && (
            <div className="overflow-x-auto -mx-2 px-2 sm:mx-0 sm:px-0">
            {/* Header Row */}
            <div className="grid grid-cols-[180px_repeat(6,1fr)] border-b border-border min-w-[700px]">
              <div className="p-4 text-xs font-medium text-muted-foreground/50 uppercase tracking-wider flex items-center">
                Category
              </div>
              {tools.map((tool) => (
                <div
                  key={tool.key}
                  className={`p-4 text-center text-sm font-semibold border-l border-border ${
                    tool.highlight
                      ? "bg-purple-500/[0.08] text-purple-400"
                      : "text-muted-foreground"
                  }`}
                >
                  {tool.name}
                </div>
              ))}
            </div>

            {/* Category Rows */}
            {categories.map((cat, i) => (
              <div
                key={cat.name}
                className={`grid grid-cols-[180px_repeat(6,1fr)] min-w-[700px] ${
                  i < categories.length - 1 ? "border-b border-border/50" : ""
                }`}
              >
                <div className="p-3.5 text-sm text-muted-foreground flex items-center border-r border-border/50">
                  {cat.name}
                </div>
                {tools.map((tool) => {
                  const val = cat[tool.key as keyof typeof cat] as boolean | "soon";
                  return (
                    <div
                      key={tool.key}
                      className={`p-3.5 flex items-center justify-center border-l border-border/50 ${
                        tool.highlight ? "bg-purple-500/[0.03]" : ""
                      }`}
                    >
                      <CellValue value={val} />
                    </div>
                  );
                })}
              </div>
            ))}
            </div>
            )}
          </div>
        </Reveal>

        {/* Toggle for mobile */}
        <div className="mt-4 lg:hidden">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            {expanded ? "Collapse table" : "Expand table"}
          </button>
        </div>

        {/* Bold Statement */}
        <Reveal delay={0.2}>
          <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-purple-500/15 bg-purple-500/[0.04] text-center">
            <p className="text-lg sm:text-xl font-semibold text-foreground leading-relaxed">
              Ferrum is the only engine that provides UI rendering, motion physics, VFX,
              AI generation, and design tokens in a single unified platform.
            </p>
            <p className="text-sm text-muted-foreground/60 mt-3">
              Everything else requires stitching together multiple libraries, each with its own
              paradigm, dependency tree, and maintenance burden.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}