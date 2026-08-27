"use client";

import { Layers, Search, Anchor, RefreshCw, Scroll, Palette, ArrowDownUp, Braces } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ferrum/scroll-reveal";
import { AnimatedCard } from "@/components/ferrum/animated-components";
import { spotlightMap } from "@/lib/animation-colors";

const features = [
  {
    name: "Cascade Layers",
    file: "cascade-layers",
    icon: Layers,
    desc: "Manage specificity conflicts with @layer ordering. Define reset, base, utilities, components, and overrides layers with explicit precedence — no more !important hacks.",
    color: "violet",
    bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400",
    pill: "bg-violet-500/[0.06] border-violet-500/10 text-violet-400/50",
    snippet: "@layer ferrum.reset, ferrum.base, ferrum.utilities, ferrum.components, ferrum.overrides;",
  },
  {
    name: "Container Queries",
    file: "container-queries",
    icon: Search,
    desc: "Components that respond to their own container size, not the viewport. Build truly reusable components with intrinsic responsive behavior.",
    color: "blue",
    bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400",
    pill: "bg-blue-500/[0.06] border-blue-500/10 text-blue-400/50",
    snippet: ".fr-card { container-type: inline-size; }\n@container (min-width: 400px) { ... }",
  },
  {
    name: "Scroll-Driven Animations",
    file: "scroll-driven",
    icon: Scroll,
    desc: "Animations linked to scroll progress without JavaScript. Parallax, progress bars, and reveal effects driven entirely by the scroll timeline.",
    color: "emerald",
    bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400",
    pill: "bg-emerald-500/[0.06] border-emerald-500/10 text-emerald-400/50",
    snippet: "animation-timeline: scroll();\nanimation-range: entry 0% entry 100%;",
  },
  {
    name: "Anchor Positioning",
    file: "anchor-positioning",
    icon: Anchor,
    desc: "Position tooltips, popovers, and dropdowns relative to anchor elements — pure CSS, no JS measurement. Supports fallback positions and multiple anchors.",
    color: "amber",
    bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400",
    pill: "bg-amber-500/[0.06] border-amber-500/10 text-amber-400/50",
    snippet: "anchor-name: --tooltip-anchor;\nposition-anchor: --tooltip-anchor;\nposition-area: top;",
  },
  {
    name: "View Transitions",
    file: "view-transitions",
    icon: RefreshCw,
    desc: "Native page and element transitions with the View Transitions API. SPA-style transitions between full pages with cross-fade and morph effects.",
    color: "pink",
    bg: "bg-pink-500/10", border: "border-pink-500/20", text: "text-pink-400",
    pill: "bg-pink-500/[0.06] border-pink-500/10 text-pink-400/50",
    snippet: "view-transition-name: hero-image;\n::view-transition-old() { animation: fade-out 0.3s; }",
  },
  {
    name: "@scope",
    file: "scope",
    icon: Braces,
    desc: "Scoped styles that don't leak beyond their container. Style components in isolation without BEM naming or CSS modules — the browser handles containment.",
    color: "cyan",
    bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-400",
    pill: "bg-cyan-500/[0.06] border-cyan-500/10 text-cyan-400/50",
    snippet: "@scope (.fr-card) {\n  .title { color: var(--ferrum-fg); }\n}",
  },
  {
    name: "@property",
    file: "property-declarations",
    icon: Palette,
    desc: "Register custom CSS properties with types, initial values, and inheritance. Enables smooth transitions on custom properties and type-safe token usage.",
    color: "orange",
    bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-400",
    pill: "bg-orange-500/[0.06] border-orange-500/10 text-orange-400/50",
    snippet: "@property --ferrum-primary {\n  syntax: '<color>';\n  inherits: true;\n  initial-value: #8b5cf6;\n}",
  },
  {
    name: "Scroll Snap",
    file: "scroll-snap",
    icon: ArrowDownUp,
    desc: "CSS scroll snapping for carousels, galleries, and full-page sections. Mandatory and proximity snap modes with alignment control.",
    color: "rose",
    bg: "bg-rose-500/10", border: "border-rose-500/20", text: "text-rose-400",
    pill: "bg-rose-500/[0.06] border-rose-500/10 text-rose-400/50",
    snippet: "scroll-snap-type: x mandatory;\nscroll-snap-align: start;\nscroll-padding: 1rem;",
  },
  {
    name: "Color Mix",
    file: "color-mix",
    icon: Palette,
    desc: "Dynamic color manipulation at the CSS level. Mix, adjust opacity, and create color variants without pre-generating every shade in your token system.",
    color: "teal",
    bg: "bg-teal-500/10", border: "border-teal-500/20", text: "text-teal-400",
    pill: "bg-teal-500/[0.06] border-teal-500/10 text-teal-400/50",
    snippet: "background: color-mix(in srgb, var(--ferrum-primary) 80%, white);\ncolor: color-mix(in oklch, var(--ferrum-fg), transparent 30%);",
  },
];

export function ModernCSS() {
  return (
    <section id="modern-css" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-rose-500/[0.03] rounded-full blur-[140px]" />
        <div className="ferrum-aurora ferrum-aurora-1 absolute top-1/4 left-0 w-[400px] h-[250px] bg-rose-500/[0.04]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal>
          <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">Modern CSS</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            The Future of CSS.{" "}
            <span className="inline-flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-400/10 text-amber-400/80 border border-amber-400/15">Coming Soon</span>
            <br />
            <span className="text-muted-foreground/70">Shipped Today.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mt-5">
            9 modern CSS feature generators — cascade layers, container queries, scroll-driven animations,
            anchor positioning, view transitions, @scope, @property, scroll snap, and color-mix.
            Each with progressive enhancement and fallback strategies.
          </p>
        </Reveal>

        <StaggerContainer className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4" delay={0.1}>
          {features.map((f, i) => {
            const sc = (spotlightMap as Record<string, {spotlight: string; glow: string}>)[f.color] ?? {spotlight: 'rgba(161,161,170,0.04)', glow: 'rgba(161,161,170,0.10)'};
            return (
            <StaggerItem key={f.name} className={i >= 6 ? "" : ""}>
              <AnimatedCard spotlightColor={sc.spotlight} glowColor={sc.glow} className={`border ${f.border} bg-foreground/[0.02] h-full`}>
                <div className="p-6 relative z-20 flex flex-col">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/30 to-purple-500/5" />
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg ${f.bg} border ${f.border} flex items-center justify-center shrink-0 ferrum-icon-bounce`}>
                      <f.icon className={`w-4 h-4 ${f.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-sm font-semibold ${f.text}`}>{f.name}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground/50 mt-1.5 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                  <div className="mt-auto pt-4">
                    <pre className={`px-3 py-2 rounded-lg ${f.bg} border ${f.border} text-[10px] font-mono ${f.text} leading-relaxed overflow-x-auto whitespace-pre`}>
                      {f.snippet}
                    </pre>
                  </div>
                </div>
              </AnimatedCard>
            </StaggerItem>
            );
          })}
        </StaggerContainer>

        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <code className="text-xs text-muted-foreground/40 font-mono bg-foreground/[0.03] px-4 py-2 rounded-lg border border-border">
              import &#123; generateModernCSS, generateCascadeLayerCSS &#125; from &apos;@ferrum/modern-css&apos;
            </code>
          </div>
        </Reveal>
      </div>
    </section>
  );
}