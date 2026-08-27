"use client";

import { FileCode, BarChart3, Zap, Minimize2, Merge, ArrowDownNarrowWide, Layers, Film, Variable } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ferrum/scroll-reveal";
import { AnimatedCard } from "@/components/ferrum/animated-components";
import { spotlightMap } from "@/lib/animation-colors";

const passes = [
  {
    num: 1,
    name: "Dead CSS Elimination",
    fn: "eliminateDeadCSS",
    desc: "Removes rules whose selectors are never used in your HTML/templates. Compares analyzed usage data against all selectors in the AST.",
    icon: FileCode,
    color: "red",
    bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-400",
  },
  {
    num: 2,
    name: "Remove Empty Rules",
    fn: "removeEmptyRules",
    desc: "Strips rules and at-rules that contain no declarations after other optimization passes have run. Reduces file size and simplifies output.",
    icon: Minimize2,
    color: "orange",
    bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-400",
  },
  {
    num: 3,
    name: "Deduplicate Declarations",
    fn: "removeDuplicateDeclarations",
    desc: "Within each rule, removes duplicate property declarations keeping only the last occurrence — matching CSS cascade behavior.",
    icon: Layers,
    bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400",
    color: "amber",
  },
  {
    num: 4,
    name: "Merge Duplicate Selectors",
    fn: "mergeDuplicateSelectors",
    desc: "Finds rules with identical selectors and merges their declarations into a single rule. Handles specificity-aware merging across layers and blocks.",
    icon: Merge,
    color: "emerald",
    bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400",
  },
  {
    num: 5,
    name: "Specificity Flattening",
    fn: "flattenSpecificity",
    desc: "Optional pass that flattens complex selector chains into single-class selectors. Useful for utility-first output where specificity uniformity matters.",
    icon: ArrowDownNarrowWide,
    color: "teal",
    bg: "bg-teal-500/10", border: "border-teal-500/20", text: "text-teal-400",
  },
  {
    num: 6,
    name: "Value Compression",
    fn: "compressValues",
    desc: "Compresses CSS values: shortens color names (white to #fff), removes unnecessary units (0px to 0), and optimizes shorthand properties.",
    icon: BarChart3,
    color: "blue",
    bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400",
  },
  {
    num: 7,
    name: "@layer Ordering",
    fn: "orderLayers",
    desc: "Ensures all @layer blocks follow the correct cascade order (reset, base, utilities, components, overrides) and merges fragmented layer blocks.",
    icon: Layers,
    color: "violet",
    bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400",
  },
  {
    num: 8,
    name: "Keyframe Deduplication",
    fn: "deduplicateKeyframes",
    desc: "Detects and merges identical @keyframes blocks even when they have different names. Updates all animation references to point to the canonical keyframe.",
    icon: Film,
    color: "pink",
    bg: "bg-pink-500/10", border: "border-pink-500/20", text: "text-pink-400",
  },
  {
    num: 9,
    name: "Custom Property Inlining",
    fn: "inlineCustomProperties",
    desc: "Resolves and inlines CSS custom properties (--var references) with their computed token values. Eliminates runtime variable resolution for static values.",
    icon: Variable,
    color: "cyan",
    bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-400",
  },
];

export function CompilerSection() {
  return (
    <section id="compiler" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[300px] bg-sky-500/[0.03] rounded-full blur-[140px]" />
        <div className="ferrum-aurora ferrum-aurora-2 absolute bottom-1/4 right-0 w-[400px] h-[250px] bg-sky-500/[0.04]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal>
          <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">Compiler</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            4-Phase Pipeline.
            <br />
            <span className="text-muted-foreground/70">9 Optimization Passes.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mt-5">
            A zero-dependency CSS compiler with AST parsing, usage analysis, multi-pass optimization,
            and CSS generation. Supports incremental compilation with source-hash caching, source maps,
            token resolution, and theme merging from presets.
          </p>
        </Reveal>

        {/* Pipeline overview */}
        <Reveal delay={0.15}>
          <div className="mt-12 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            {[
              { label: "Parse", sub: "AST", color: "text-blue-400" },
              { label: "Analyze", sub: "Usage + Tokens", color: "text-violet-400" },
              { label: "Optimize", sub: "9 Passes", color: "text-amber-400" },
              { label: "Generate", sub: "CSS Output", color: "text-emerald-400" },
            ].map((phase, i) => (
              <div key={phase.label} className="flex items-center gap-2 sm:gap-4">
                <AnimatedCard spotlightColor="rgba(59, 130, 246, 0.04)" glowColor="rgba(59, 130, 246, 0.10)" className="border border-border bg-foreground/[0.02] min-w-[100px]">
                  <div className="px-4 py-2.5 text-center relative z-20">
                    <div className={`text-sm font-semibold ${phase.color}`}>{phase.label}</div>
                    <div className="text-[10px] text-muted-foreground/40 mt-0.5">{phase.sub}</div>
                  </div>
                </AnimatedCard>
                {i < 3 && <Zap className="w-4 h-4 text-muted-foreground/20 shrink-0 hidden sm:block" />}
              </div>
            ))}
          </div>
        </Reveal>

        {/* 9 Passes */}
        <StaggerContainer className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4" delay={0.1}>
          {passes.map((p) => (
            <StaggerItem key={p.num}>
              <AnimatedCard {...(() => { const s = (spotlightMap as Record<string, {spotlight: string; glow: string}>)[p.color] ?? {spotlight: "rgba(161,161,170,0.04)", glow: "rgba(161,161,170,0.10)"}; return {spotlightColor: s.spotlight, glowColor: s.glow}; })()} className={`border ${p.border} bg-foreground/[0.02] h-full`}>
                <div className="p-5 relative z-20">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/30 to-purple-500/5" />
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-foreground/[0.05] border border-border shrink-0">
                      <span className={`text-xs font-bold ${p.text}`}>{p.num}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm font-semibold ${p.text}`}>{p.name}</h3>
                      <code className="text-[10px] text-muted-foreground/30 font-mono">{p.fn}()</code>
                      <p className="text-xs text-muted-foreground/50 mt-1.5 leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Stats / features */}
        <Reveal delay={0.2}>
          <div className="mt-12 grid sm:grid-cols-4 gap-3">
            {[
              { v: "0", l: "External Deps" },
              { v: "AST", l: "Parser (Custom)" },
              { v: "Incremental", l: "Caching" },
              { v: "Multi-file", l: "Compilation" },
            ].map((s) => (
              <div key={s.l} className="p-4 rounded-xl border border-border/50 bg-foreground/[0.01] text-center">
                <div className="text-lg font-bold text-foreground/80">{s.v}</div>
                <div className="text-[10px] text-muted-foreground/40 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-8 text-center">
            <code className="text-xs text-muted-foreground/40 font-mono bg-foreground/[0.03] px-4 py-2 rounded-lg border border-border">
              import &#123; compile, compileMultiple, clearCache &#125; from &apos;@ferrum/compiler&apos;
            </code>
          </div>
        </Reveal>
      </div>
    </section>
  );
}