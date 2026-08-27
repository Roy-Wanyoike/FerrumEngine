"use client";

import { useState } from "react";
import {
  Package, Sparkles, Layers, LayoutTemplate, Brain,
  Palette, Zap, Download, Star, Users, TrendingUp,
  Search, ArrowRight, ExternalLink, ChevronDown,
  Heart, ShieldCheck, Code2, Gamepad2, Building2,
  Stethoscope, LineChart, ShoppingBag,
} from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ferrum/scroll-reveal";
import { AnimatedCard } from "@/components/ferrum/animated-components";
import { spotlightMap } from "@/lib/animation-colors";

// ─── Data ─────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { icon: Layers, label: "Components", count: 1240, color: "purple", desc: "Cards, forms, modals, navigation, data tables, and more. Framework-agnostic building blocks with full type definitions." },
  { icon: Zap, label: "Motion Packs", count: 386, color: "blue", desc: "Curated effect bundles — entrance animations, hover interactions, scroll triggers, and loading sequences." },
  { icon: Palette, label: "Design Systems", count: 94, color: "emerald", desc: "Complete design systems with tokens, components, and guidelines for consistent UI across products." },
  { icon: LayoutTemplate, label: "Industry Templates", count: 218, color: "orange", desc: "Production-ready page templates for healthcare dashboards, fintech apps, AI tools, and more." },
  { icon: Brain, label: "AI Prompts", count: 156, color: "pink", desc: "Ferrum AI prompts for generating accessible forms, responsive layouts, and polished interfaces." },
  { icon: Sparkles, label: "Themes", count: 72, color: "yellow", desc: "Light, dark, and brand themes with automatic CSS variable generation and live preview switching." },
  { icon: Star, label: "Effects", count: 489, color: "cyan", desc: "The full Ferrum effect library — glass, neon, holographic, metallic, and 30+ categories." },
];

const VERTICALS = [
  { icon: Stethoscope, label: "Healthcare", color: "emerald", packages: 312, tagline: "WCAG AAA, HIPAA-ready, clinical workflows", featured: "Patient Dashboard Pro" },
  { icon: LineChart, label: "Finance", color: "blue", packages: 287, tagline: "Real-time data, precision formatting, regulatory compliance", featured: "Trade Execution Terminal" },
  { icon: Brain, label: "AI Dashboards", color: "purple", packages: 198, tagline: "Model monitoring, experiment tracking, inference metrics", featured: "ML Ops Command Center" },
  { icon: Gamepad2, label: "Gaming", color: "red", packages: 156, tagline: "60fps HUD overlays, WebGL integration, immersive UI", featured: "Game Analytics Suite" },
  { icon: Building2, label: "Enterprise", color: "orange", packages: 421, tagline: "RBAC patterns, data governance, white-label themes", featured: "Enterprise Admin Portal" },
];

const TRENDING = [
  { name: "@ferrum/healthcare-dashboard", author: "MayoDesign", downloads: "12.4K", stars: 4.9, vertical: "Healthcare", desc: "Complete patient dashboard with vital signs, medication tracking, and appointment management. WCAG AAA compliant." },
  { name: "@ferrum/trade-terminal", author: "FinMotion", downloads: "9.8K", stars: 4.8, vertical: "Finance", desc: "Real-time trading interface with streaming candlestick charts, order book, and portfolio analytics." },
  { name: "@ferrum/ai-ops-center", author: "MLCraft", downloads: "8.2K", stars: 4.9, vertical: "AI", desc: "Model monitoring dashboard with loss curves, confusion matrices, and A/B experiment comparison." },
  { name: "@ferrum/game-hud", author: "PixelForge", downloads: "6.7K", stars: 4.7, vertical: "Gaming", desc: "60fps gaming HUD overlay with WebGL canvas integration, minimap, and inventory system." },
  { name: "@ferrum/premium-cards", author: "RoyCSS", downloads: "15.1K", stars: 4.9, vertical: "General", desc: "48 glass, holographic, metallic, and neumorphic card variants with spring physics." },
  { name: "@ferrum/dark-mode-pro", author: "ThemeLab", downloads: "11.3K", stars: 4.8, vertical: "General", desc: "Enterprise dark theme with automatic color variable generation and 12 brand presets." },
];

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; iconBg: string; iconBorder: string; iconText: string; tagBg: string; tagText: string; tagBorder: string }> = {
  purple: { bg: "bg-purple-500/5", border: "border-purple-500/15", text: "text-purple-400", iconBg: "bg-purple-500/10", iconBorder: "border-purple-500/20", iconText: "text-purple-400", tagBg: "bg-purple-500/10", tagText: "text-purple-300", tagBorder: "border-purple-500/20" },
  blue: { bg: "bg-blue-500/5", border: "border-blue-500/15", text: "text-blue-400", iconBg: "bg-blue-500/10", iconBorder: "border-blue-500/20", iconText: "text-blue-400", tagBg: "bg-blue-500/10", tagText: "text-blue-300", tagBorder: "border-blue-500/20" },
  emerald: { bg: "bg-emerald-500/5", border: "border-emerald-500/15", text: "text-emerald-400", iconBg: "bg-emerald-500/10", iconBorder: "border-emerald-500/20", iconText: "text-emerald-400", tagBg: "bg-emerald-500/10", tagText: "text-emerald-300", tagBorder: "border-emerald-500/20" },
  orange: { bg: "bg-orange-500/5", border: "border-orange-500/15", text: "text-orange-400", iconBg: "bg-orange-500/10", iconBorder: "border-orange-500/20", iconText: "text-orange-400", tagBg: "bg-orange-500/10", tagText: "text-orange-300", tagBorder: "border-orange-500/20" },
  pink: { bg: "bg-pink-500/5", border: "border-pink-500/15", text: "text-pink-400", iconBg: "bg-pink-500/10", iconBorder: "border-pink-500/20", iconText: "text-pink-400", tagBg: "bg-pink-500/10", tagText: "text-pink-300", tagBorder: "border-pink-500/20" },
  yellow: { bg: "bg-yellow-500/5", border: "border-yellow-500/15", text: "text-yellow-400", iconBg: "bg-yellow-500/10", iconBorder: "border-yellow-500/20", iconText: "text-yellow-400", tagBg: "bg-yellow-500/10", tagText: "text-yellow-300", tagBorder: "border-yellow-500/20" },
  cyan: { bg: "bg-cyan-500/5", border: "border-cyan-500/15", text: "text-cyan-400", iconBg: "bg-cyan-500/10", iconBorder: "border-cyan-500/20", iconText: "text-cyan-400", tagBg: "bg-cyan-500/10", tagText: "text-cyan-300", tagBorder: "border-cyan-500/20" },
  red: { bg: "bg-red-500/5", border: "border-red-500/15", text: "text-red-400", iconBg: "bg-red-500/10", iconBorder: "border-red-500/20", iconText: "text-red-400", tagBg: "bg-red-500/10", tagText: "text-red-300", tagBorder: "border-red-500/20" },
};

// ─── Component ──────────────────────────────────────────────────────────────

export function MarketplaceSection() {
  const [activeVertical, setActiveVertical] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section id="marketplace" className="py-28 sm:py-36 relative overflow-hidden border-t border-border">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* ── Header ──────────────────────────────────── */}
        <Reveal>
          <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-3">
            Ecosystem
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            The App Store for Interfaces
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mt-5">
            Publish, discover, and install interface intelligence — motion packs, design systems, industry templates, AI prompts, themes, and effects. Built by creators, optimized by the Ferrum Compiler.
          </p>
        </Reveal>

        {/* ── Marketplace Stats Bar ──────────────────── */}
        <Reveal delay={0.15}>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "2,650+", label: "Packages", icon: Package, color: "purple" },
              { value: "840+", label: "Creators", icon: Users, color: "blue" },
              { value: "1.2M+", label: "Installs", icon: Download, color: "emerald" },
              { value: "98.7%", label: "Quality Score", icon: ShieldCheck, color: "orange" },
            ].map((stat) => {
              const c = COLOR_MAP[stat.color] ?? { bg: '', border: 'border-border', text: 'text-foreground', iconBg: 'bg-foreground/[0.05]', iconBorder: 'border-border', iconText: 'text-foreground', tagBg: 'bg-foreground/[0.05]', tagText: 'text-foreground', tagBorder: 'border-border' };
              return (
                <div key={stat.label} className={`flex items-center gap-4 p-4 rounded-2xl border ${c.bg} ${c.border}`}>
                  <div className={`w-10 h-10 rounded-xl ${c.iconBg} ${c.iconBorder} flex items-center justify-center flex-shrink-0`}>
                    <stat.icon className={`w-5 h-5 ${c.iconText}`} />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* ── Search Bar ────────────────────────────── */}
        <Reveal delay={0.2}>
          <div className="mt-12 relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 2,650+ packages — components, motion packs, templates..."
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-foreground/[0.02] border border-border text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-foreground/[0.04] border border-border text-[10px] text-muted-foreground/60 font-mono">
                /
              </kbd>
            </div>
          </div>
        </Reveal>

        {/* ── Category Grid ─────────────────────────── */}
        <Reveal delay={0.1}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-16 mb-6">
            Browse by Category
          </h3>
        </Reveal>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3" delay={0.06}>
          {CATEGORIES.filter((cat) =>
            !searchQuery || cat.label.toLowerCase().includes(searchQuery.toLowerCase()) || cat.desc.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((cat) => {
            const c = COLOR_MAP[cat.color] ?? { bg: '', border: 'border-border', text: 'text-foreground', iconBg: 'bg-foreground/[0.05]', iconBorder: 'border-border', iconText: 'text-foreground', tagBg: 'bg-foreground/[0.05]', tagText: 'text-foreground', tagBorder: 'border-border' };
            return (
              <StaggerItem key={cat.label}>
                <AnimatedCard
                  spotlightColor={spotlightMap[cat.color as keyof typeof spotlightMap]?.spotlight}
                  glowColor={spotlightMap[cat.color as keyof typeof spotlightMap]?.glow}
                  className={`border ${c.border} ${c.bg} h-full cursor-pointer group`}
                >
                  <div className="p-5 relative z-20">
                    <div className="flex items-start justify-between">
                      <div className={`w-9 h-9 rounded-lg ${c.iconBg} ${c.iconBorder} flex items-center justify-center ferrum-icon-bounce`}>
                        <cat.icon className={`w-4 h-4 ${c.iconText}`} />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground/40">{cat.count}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground mt-3 group-hover:text-foreground/90">{cat.label}</h4>
                    <p className="text-xs text-muted-foreground/60 mt-1.5 leading-relaxed line-clamp-2">{cat.desc}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground/50 group-hover:text-muted-foreground/70 transition-colors">
                      <span>Browse</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* ── Industry Verticals ─────────────────────── */}
        <Reveal delay={0.1}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-20 mb-6">
            Industry Verticals
          </h3>
        </Reveal>
        <StaggerContainer className="space-y-3" delay={0.05}>
          {VERTICALS.filter((v) =>
            !activeVertical || activeVertical === v.label
          ).map((v) => {
            const c = COLOR_MAP[v.color] ?? { bg: '', border: 'border-border', text: 'text-foreground', iconBg: 'bg-foreground/[0.05]', iconBorder: 'border-border', iconText: 'text-foreground', tagBg: 'bg-foreground/[0.05]', tagText: 'text-foreground', tagBorder: 'border-border' };
            const isExpanded = activeVertical === v.label;
            return (
              <StaggerItem key={v.label}>
                <AnimatedCard
                  spotlightColor={spotlightMap[v.color as keyof typeof spotlightMap]?.spotlight}
                  glowColor={spotlightMap[v.color as keyof typeof spotlightMap]?.glow}
                  className={`border ${c.border} ${c.bg} overflow-hidden transition-all duration-300 ${isExpanded ? "ring-1 ring-purple-500/20" : ""}`}
                >
                  <button
                    onClick={() => setActiveVertical(isExpanded ? null : v.label)}
                    className="p-5 sm:p-6 relative z-20 w-full text-left cursor-pointer flex items-center gap-5 group"
                  >
                    <div className={`w-11 h-11 rounded-xl ${c.iconBg} ${c.iconBorder} flex items-center justify-center flex-shrink-0 ferrum-icon-bounce`}>
                      <v.icon className={`w-5 h-5 ${c.iconText}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h4 className="text-base font-semibold text-foreground">{v.label}</h4>
                        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${c.tagBg} ${c.tagText} ${c.tagBorder}`}>
                          {v.packages} packages
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground/60 mt-1">{v.tagline}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground/40 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""} flex-shrink-0`} />
                  </button>
                  {isExpanded && (
                    <div className="px-5 sm:px-6 pb-5 relative z-20 border-t border-border/50 pt-4">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-4 h-4 text-muted-foreground/50" />
                        <span className="text-sm font-medium text-foreground/80">Featured: {v.featured}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {["Components", "Motion", "Templates", "Themes", "Effects"].map((tag) => (
                          <span key={tag} className="text-[10px] font-medium text-muted-foreground/50 px-2 py-1 rounded-md bg-foreground/[0.03] border border-border/50">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </AnimatedCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* ── Trending Packages ──────────────────────── */}
        <Reveal delay={0.1}>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-20 mb-2">
            Trending This Week
          </h3>
          <p className="text-sm text-muted-foreground/50 mb-6">Most installed packages across all categories</p>
        </Reveal>
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" delay={0.05}>
          {TRENDING.filter((pkg) =>
            !searchQuery || pkg.name.includes(searchQuery) || pkg.desc.toLowerCase().includes(searchQuery.toLowerCase()) || pkg.vertical.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((pkg) => {
            const c = COLOR_MAP[pkg.vertical] ?? COLOR_MAP['purple'] ?? { bg: '', border: 'border-border', text: 'text-foreground', iconBg: 'bg-foreground/[0.05]', iconBorder: 'border-border', iconText: 'text-foreground', tagBg: 'bg-foreground/[0.05]', tagText: 'text-foreground', tagBorder: 'border-border' };
            return (
              <StaggerItem key={pkg.name}>
                <AnimatedCard
                  spotlightColor={spotlightMap[pkg.vertical as keyof typeof spotlightMap]?.spotlight}
                  glowColor={spotlightMap[pkg.vertical as keyof typeof spotlightMap]?.glow}
                  className={`border ${c.border} ${c.bg} h-full cursor-pointer group`}
                >
                  <div className="p-5 relative z-20 flex flex-col h-full">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <Code2 className="w-4 h-4 text-muted-foreground/40 flex-shrink-0" />
                        <span className="text-xs font-mono text-muted-foreground/50 truncate">{pkg.name}</span>
                      </div>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border flex-shrink-0 ${c.tagBg} ${c.tagText} ${c.tagBorder}`}>
                        {pkg.vertical}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/80 font-medium mt-3 group-hover:text-foreground">{pkg.name.split("/").pop()?.replace(/-/g, " ")}</p>
                    <p className="text-xs text-muted-foreground/50 mt-1.5 leading-relaxed line-clamp-2 flex-1">{pkg.desc}</p>
                    <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground/50">
                          <Star className="w-3 h-3 text-yellow-400/80 fill-yellow-400/80" />
                          {pkg.stars}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground/50">
                          <Download className="w-3 h-3" />
                          {pkg.downloads}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-purple-400/70 group-hover:text-purple-400 transition-colors">
                        Install
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* ── Creator CTA ────────────────────────────── */}
        <Reveal delay={0.15}>
          <div className="mt-20 rounded-2xl border border-purple-500/15 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <ShoppingBag className="w-10 h-10 text-purple-400/70 mx-auto mb-4" />
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Start Publishing
              </h3>
              <p className="text-sm text-muted-foreground max-w-lg mx-auto mt-3 leading-relaxed">
                Create your first .fer package in minutes. The marketplace supports 7 asset categories, 5 industry verticals, and a tiered 80-90% revenue share. Every package is automatically optimized by the Ferrum UI Compiler for the user&apos;s device.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-foreground bg-foreground/[0.08] hover:bg-foreground/[0.12] transition-all">
                  <Package className="w-4 h-4" />
                  Create Package
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground border border-border hover:border-border/80 transition-all">
                  Read the Guide
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground/40">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" />3-Gate Quality</span>
                <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5" />80-90% Revenue</span>
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />Creator Profiles</span>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}