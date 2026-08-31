"use client";

import { Paintbrush, Eye, Droplets, Sparkles, ScanLine, Mountain, Loader2 } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ferrum/scroll-reveal";
import { AnimatedCard } from "@/components/ferrum/animated-components";
import { spotlightMap } from "@/lib/animation-colors";

const worklets = [
  {
    name: "ferrum-glow",
    label: "Glow",
    icon: Sparkles,
    desc: "Dynamic radial glow effects with configurable radius, color, and intensity. GPU-painted background with progressive CSS fallback.",
    color: "amber",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-400",
    pill: "bg-amber-500/[0.06] border-amber-500/10 text-amber-400/50",
    props: ["--ferrum-glow-color", "--ferrum-glow-radius", "--ferrum-glow-intensity"],
  },
  {
    name: "ferrum-glass",
    label: "Glass",
    icon: Eye,
    desc: "Frosted glass and glassmorphism effects with blur, tint, and noise texture layers. No backdrop-filter needed at the paint level.",
    color: "cyan",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    text: "text-cyan-400",
    pill: "bg-cyan-500/[0.06] border-cyan-500/10 text-cyan-400/50",
    props: ["--ferrum-glass-blur", "--ferrum-glass-tint", "--ferrum-glass-opacity"],
  },
  {
    name: "ferrum-ripple",
    label: "Ripple",
    icon: Droplets,
    desc: "Material-design ripple effect painted entirely on the GPU. Position-aware with configurable duration and color — zero layout thrash.",
    color: "blue",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-400",
    pill: "bg-blue-500/[0.06] border-blue-500/10 text-blue-400/50",
    props: ["--ferrum-ripple-color", "--ferrum-ripple-duration", "--ferrum-ripple-x", "--ferrum-ripple-y"],
  },
  {
    name: "ferrum-neon-border",
    label: "Neon Border",
    icon: ScanLine,
    desc: "Animated neon glow borders rendered via border-image paint(). Configurable glow intensity, color spread, and animation speed.",
    color: "pink",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    text: "text-pink-400",
    pill: "bg-pink-500/[0.06] border-pink-500/10 text-pink-400/50",
    props: ["--ferrum-neon-color", "--ferrum-neon-width", "--ferrum-neon-spread"],
  },
  {
    name: "ferrum-noise",
    label: "Noise",
    icon: Mountain,
    desc: "Procedural noise texture overlay for grain, texture, and organic surface effects. Adjustable frequency and opacity.",
    color: "emerald",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
    pill: "bg-emerald-500/[0.06] border-emerald-500/10 text-emerald-400/50",
    props: ["--ferrum-noise-frequency", "--ferrum-noise-opacity", "--ferrum-noise-seed"],
  },
  {
    name: "ferrum-gradient-mesh",
    label: "Gradient Mesh",
    icon: Paintbrush,
    desc: "Multi-point gradient mesh with smooth interpolation. Define control points and colors for complex, fluid gradient compositions.",
    color: "violet",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    text: "text-violet-400",
    pill: "bg-violet-500/[0.06] border-violet-500/10 text-violet-400/50",
    props: ["--ferrum-mesh-points", "--ferrum-mesh-colors", "--ferrum-mesh-blur"],
  },
  {
    name: "ferrum-skeleton",
    label: "Skeleton",
    icon: Loader2,
    desc: "Smart skeleton loading placeholders with animated shimmer. Adapts to element dimensions automatically via the Paint API.",
    color: "orange",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    text: "text-orange-400",
    pill: "bg-orange-500/[0.06] border-orange-500/10 text-orange-400/50",
    props: ["--ferrum-skeleton-color", "--ferrum-skeleton-speed", "--ferrum-skeleton-direction"],
  },
];

export function PaintAPI() {
  return (
    <section id="paint-api" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[300px] bg-orange-500/[0.03] rounded-full blur-[140px]" />
        <div className="ferrum-aurora ferrum-aurora-1 absolute top-0 right-1/4 w-[400px] h-[250px] bg-orange-500/[0.04]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal>
          <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">Houdini Paint API</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            GPU-Painted Effects.{" "}
            <span className="inline-flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-400/10 text-amber-400/80 border border-amber-400/15">Coming Soon</span>
            <br />
            <span className="text-muted-foreground/70">Zero JavaScript at Runtime.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mt-5">
            7 CSS Paint API worklets registered via inline Blob URLs — no external files, no JS runtime cost.
            Each worklet ships with progressive enhancement fallbacks so effects degrade gracefully in non-Houdini browsers.
          </p>
        </Reveal>

        {/* How it works */}
        <Reveal delay={0.15}>
          <div className="mt-12 p-5 rounded-2xl border border-border bg-foreground/[0.02]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                <Paintbrush className="w-4 h-4 text-orange-400" />
              </div>
              <h3 className="text-sm font-semibold text-foreground/70">How It Works</h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div className="p-3 rounded-xl bg-foreground/[0.03] border border-border/50">
                <div className="text-xs font-mono text-orange-400/70 mb-1">1. Register</div>
                <p className="text-muted-foreground/50 text-xs leading-relaxed">Worklet code is inlined as a Blob URL and registered with <code className="text-orange-400/50">CSS.paintWorklet.addModule()</code></p>
              </div>
              <div className="p-3 rounded-xl bg-foreground/[0.03] border border-border/50">
                <div className="text-xs font-mono text-orange-400/70 mb-1">2. Enhance</div>
                <p className="text-muted-foreground/50 text-xs leading-relaxed">CSS uses <code className="text-orange-400/50">paint(ferrum-*)</code> inside <code className="text-orange-400/50">@supports</code> blocks for progressive enhancement</p>
              </div>
              <div className="p-3 rounded-xl bg-foreground/[0.03] border border-border/50">
                <div className="text-xs font-mono text-orange-400/70 mb-1">3. Fallback</div>
                <p className="text-muted-foreground/50 text-xs leading-relaxed">CSS-only fallback styles render in browsers without Houdini support — no broken layouts</p>
              </div>
            </div>
          </div>
        </Reveal>

        <StaggerContainer className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4" delay={0.1}>
          {worklets.map((w, i) => {
            const sc = (spotlightMap as Record<string, {spotlight: string; glow: string}>)[w.color] ?? {spotlight: 'rgba(161,161,170,0.04)', glow: 'rgba(161,161,170,0.10)'};
            return (
            <StaggerItem key={w.name} className={i === 6 ? "md:col-span-2 lg:col-span-1" : ""}>
              <AnimatedCard spotlightColor={sc.spotlight} glowColor={sc.glow} className={`border ${w.border} bg-foreground/[0.02] h-full`}>
                <div className="p-6 relative z-20">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/30 to-purple-500/5" />
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${w.bg} border ${w.border} flex items-center justify-center shrink-0 ferrum-icon-bounce`}>
                      <w.icon className={`w-5 h-5 ${w.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-base font-semibold ${w.text}`}>{w.label}</h3>
                        <code className="text-[10px] text-muted-foreground/60 font-mono">{w.name}</code>
                      </div>
                      <p className="text-sm text-muted-foreground/50 mt-1.5 leading-relaxed">{w.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {w.props.map((p) => (
                          <code key={p} className={`px-2 py-0.5 rounded-md border ${w.pill} text-[10px] font-mono`}>{p}</code>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </StaggerItem>
            );
          })}
        </StaggerContainer>

        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <code className="text-xs text-muted-foreground/70 font-mono bg-foreground/[0.03] px-4 py-2 rounded-lg border border-border">
              import &#123; registerAllWorklets, generatePaintCSS &#125; from &apos;@ferrum/paint&apos;
            </code>
          </div>
        </Reveal>
      </div>
    </section>
  );
}