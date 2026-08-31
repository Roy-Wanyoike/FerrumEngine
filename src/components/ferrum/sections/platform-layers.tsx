"use client";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/ferrum/scroll-reveal";
import { AnimatedCard } from "@/components/ferrum/animated-components";
import {
  Cpu, Zap, Eye, Terminal, Palette,
  Bot, Cloud, Blocks, Paintbrush, LayoutGrid,
  Sparkles, Shield, Wrench, Monitor,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   FERRUM PLATFORM — 10 Core Subsystems
   ═══════════════════════════════════════════════════════════════ */

interface PlatformModule {
  name: string;
  slug: string;
  icon: React.ElementType;
  color: string;
  tagline: string;
  features: string[];
  status?: "stable" | "beta" | "soon";
}

const modules: PlatformModule[] = [
  {
    name: "Ferrum Runtime",
    slug: "runtime",
    icon: Cpu,
    color: "cyan",
    tagline: "Zero-dependency execution layer",
    features: ["Framework-agnostic core", "CSS-first progressive enhancement", "Hot-swap capability", "Tree-shakeable bundles"],
    status: "stable",
  },
  {
    name: "Ferrum Motion",
    slug: "motion",
    icon: Zap,
    color: "violet",
    tagline: "Spring physics & gesture-driven animation",
    features: ["Spring dynamics engine", "Timeline composition", "Gesture recognition", "Scroll-driven animations"],
    status: "stable",
  },
  {
    name: "Ferrum Physics",
    slug: "physics",
    icon: Sparkles,
    color: "rose",
    tagline: "Realistic forces & collision systems",
    features: ["Gravity simulation", "Collision detection", "Constraint solver", "Rigid/soft body dynamics"],
    status: "stable",
  },
  {
    name: "Ferrum VFX",
    slug: "vfx",
    icon: Eye,
    color: "pink",
    tagline: "Visual effects & GPU-accelerated particles",
    features: ["Glass & liquid morphism", "Atmospheric effects", "Distortion shaders", "Energy & particle systems"],
    status: "stable",
  },
  {
    name: "Ferrum Components",
    slug: "components",
    icon: Blocks,
    color: "blue",
    tagline: "Production-ready semantic UI primitives",
    features: ["16 semantic components", "Accessible by default", "Theme-aware styling", "Composable patterns"],
    status: "stable",
  },
  {
    name: "Ferrum Tokens",
    slug: "tokens",
    icon: Palette,
    color: "amber",
    tagline: "Unified design token system",
    features: ["16 semantic scales", "5 output transforms (CSS/SCSS/JSON/TS/Tailwind)", "Runtime theming", "Cross-platform consistency"],
    status: "stable",
  },
  {
    name: "Ferrum Compiler",
    slug: "compiler",
    icon: Terminal,
    color: "sky",
    tagline: "9-pass optimization pipeline",
    features: ["Parse & analyze", "Tree-shaking", "Dead code elimination", "CSS output optimization"],
    status: "beta",
  },
  {
    name: "Ferrum AI",
    slug: "ai",
    icon: Bot,
    color: "purple",
    tagline: "Intent-to-render intelligence layer",
    features: ["Natural language to UI", "Effect recommendation", "Code generation", "Design system inference"],
    status: "soon",
  },
  {
    name: "Ferrum Studio",
    slug: "studio",
    icon: Monitor,
    color: "pink",
    tagline: "Visual interface builder with live preview",
    features: ["Drag-and-drop canvas", "Live component preview", "Theme editor", "Export to code"],
    status: "soon",
  },
  {
    name: "Ferrum Cloud",
    slug: "cloud",
    icon: Cloud,
    color: "sky",
    tagline: "Deploy & host Ferrum applications",
    features: ["One-click deploy", "Edge CDN distribution", "Analytics dashboard", "Team collaboration"],
    status: "soon",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string; spotlight: string }> = {
  cyan:    { bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-400", glow: "shadow-cyan-500/20", spotlight: "rgba(6,182,212,0.06)" },
  violet:  { bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400", glow: "shadow-violet-500/20", spotlight: "rgba(139,92,246,0.06)" },
  rose:    { bg: "bg-rose-500/10", border: "border-rose-500/20", text: "text-rose-400", glow: "shadow-rose-500/20", spotlight: "rgba(244,63,94,0.06)" },
  pink:    { bg: "bg-pink-500/10", border: "border-pink-500/20", text: "text-pink-400", glow: "shadow-pink-500/20", spotlight: "rgba(236,72,153,0.06)" },
  blue:    { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400", glow: "shadow-blue-500/20", spotlight: "rgba(59,130,246,0.06)" },
  amber:   { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", glow: "shadow-amber-500/20", spotlight: "rgba(245,158,11,0.06)" },
  sky:     { bg: "bg-sky-500/10", border: "border-sky-500/20", text: "text-sky-400", glow: "shadow-sky-500/20", spotlight: "rgba(14,165,233,0.06)" },
  purple:  { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400", glow: "shadow-purple-500/20", spotlight: "rgba(168,85,247,0.06)" },
};

const statusStyles: Record<string, { label: string; className: string }> = {
  stable: { label: "Stable", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  beta:   { label: "Beta", className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  soon:   { label: "Coming Soon", className: "bg-foreground/[0.04] text-muted-foreground/60 border-border" },
};

function ModuleCard({ mod }: { mod: PlatformModule }) {
  const Icon = mod.icon;
  const colors = colorMap[mod.color] ?? colorMap['cyan']!;
  const status = statusStyles[mod.status ?? 'stable']!;

  return (
    <StaggerItem>
      <AnimatedCard
        spotlightColor={colors.spotlight}
        glowColor={colors.spotlight.replace("0.06", "0.15")}
        className={`border border-border/40 bg-foreground/[0.015] h-full ${mod.status === "soon" ? "opacity-60" : ""}`}
      >
        <div className="relative z-20 p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={`w-10 h-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${colors.text}`} />
            </div>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${status.className}`}>
              {status.label}
            </span>
          </div>

          {/* Name & tagline */}
          <h3 className="text-sm font-semibold text-foreground mb-1">{mod.name}</h3>
          <p className="text-xs text-muted-foreground/70 leading-relaxed mb-4">{mod.tagline}</p>

          {/* Feature list */}
          <ul className="space-y-1.5">
            {mod.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-[11px] text-muted-foreground/60">
                <span className={`w-1 h-1 rounded-full ${colors.bg} shrink-0`} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </AnimatedCard>
    </StaggerItem>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PLATFORM TREE — Visual hierarchy
   ═══════════════════════════════════════════════════════════════ */

function PlatformTree() {
  return (
    <Reveal delay={0.2}>
      <div className="mt-16 max-w-2xl mx-auto">
        <div className="relative p-6 sm:p-8 rounded-2xl border border-border/40 bg-foreground/[0.01]">
          {/* Tree structure */}
          <div className="font-mono text-xs sm:text-sm leading-loose">
            <div className="text-foreground/80 font-semibold text-sm sm:text-base mb-2">Ferrum Platform</div>
            {modules.map((mod, i) => {
              const Icon = mod.icon;
              const colors = colorMap[mod.color] ?? colorMap['cyan']!;
              const isLast = i === modules.length - 1;
              return (
                <div key={mod.slug} className="flex items-center gap-2">
                  <span className="text-muted-foreground/50 select-none">{isLast ? "└──" : "├──"}</span>
                  <Icon className={`w-3.5 h-3.5 ${colors.text} shrink-0`} />
                  <span className="text-foreground/80 hover:text-foreground transition-colors cursor-default">{mod.name}</span>
                  {mod.status === "soon" && (
                    <span className="text-[9px] text-muted-foreground/45 ml-1">soon</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Subtle glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/[0.02] via-transparent to-pink-500/[0.02] pointer-events-none" />
        </div>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════════════════
   EXPORTED SECTION
   ═══════════════════════════════════════════════════════════════ */

export function PlatformLayers() {
  return (
    <section id="platform-layers" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-violet-500/[0.02] rounded-full blur-[160px]" />
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[300px] bg-cyan-500/[0.015] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section header */}
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">Platform</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            10 subsystems.
            <br />
            <span className="text-muted-foreground/50">One unified platform.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground/60 max-w-2xl leading-relaxed mt-5">
            Ferrum is structured as a modular platform where each subsystem is independently
            useful but exponentially more powerful together. Import what you need — the
            integration is handled by the platform.
          </p>
        </Reveal>

        {/* Module grid */}
        <div className="mt-14">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4" delay={0.15}>
            {modules.map((mod) => (
              <ModuleCard key={mod.slug} mod={mod} />
            ))}
          </StaggerContainer>
        </div>

        {/* Platform tree visualization */}
        <PlatformTree />

        {/* Bottom stats */}
        <Reveal delay={0.3}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground/55">
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" />MIT Licensed</span>
            <span className="flex items-center gap-1.5"><Wrench className="w-3.5 h-3.5" />8 Framework Adapters</span>
            <span className="flex items-center gap-1.5"><Paintbrush className="w-3.5 h-3.5" />7 Paint API Worklets</span>
            <span className="flex items-center gap-1.5"><LayoutGrid className="w-3.5 h-3.5" />16 Semantic Components</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}