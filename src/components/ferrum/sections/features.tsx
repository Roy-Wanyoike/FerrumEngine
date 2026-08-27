"use client";

import { Puzzle, Zap, Gauge, Shield, MonitorSmartphone, Cpu, Wand2, Timer } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ferrum/scroll-reveal";
import { AnimatedCard } from "@/components/ferrum/animated-components";

const features = [
  { icon: Puzzle, title: "Unified Platform", desc: "Motion, VFX, components, utilities, and theming in one cohesive engine.", color: "purple" },
  { icon: Zap, title: "Zero Dependencies", desc: "Pure CSS with no runtime dependencies. Ship less, do more.", color: "amber" },
  { icon: Gauge, title: "GPU Accelerated", desc: "All motion uses transform and opacity for 60fps rendering.", color: "emerald" },
  { icon: Shield, title: "Accessibility First", desc: "WCAG contrast engine, ARIA validator, reduced-motion support.", color: "green" },
  { icon: MonitorSmartphone, title: "Framework Agnostic", desc: "React, Vue, Svelte, Angular, Solid, Astro, Lit — 8 adapters.", color: "cyan" },
  { icon: Cpu, title: "Tree Shakeable", desc: "Import only what you need. Modular architecture.", color: "blue" },
  { icon: Wand2, title: "VFX Engine", desc: "14 visual effect categories — liquid, glass, energy, distortion, lighting.", color: "pink" },
  { icon: Timer, title: "Motion Engine", desc: "Physics, timeline, depth, interaction, morph, organic animation.", color: "violet" },
  { icon: Cpu, title: "Plugin SDK", desc: "Sandboxed extensions with 7-phase hook lifecycle.", color: "orange" },
];

const colorMap: Record<string, { iconBg: string; iconBorder: string; iconText: string; spotlight: string; glow: string }> = {
  purple: { iconBg: "bg-purple-500/10", iconBorder: "border-purple-500/20", iconText: "text-purple-400", spotlight: "rgba(168, 85, 247, 0.06)", glow: "rgba(168, 85, 247, 0.15)" },
  amber: { iconBg: "bg-amber-500/10", iconBorder: "border-amber-500/20", iconText: "text-amber-400", spotlight: "rgba(245, 158, 11, 0.06)", glow: "rgba(245, 158, 11, 0.15)" },
  emerald: { iconBg: "bg-emerald-500/10", iconBorder: "border-emerald-500/20", iconText: "text-emerald-400", spotlight: "rgba(16, 185, 129, 0.06)", glow: "rgba(16, 185, 129, 0.15)" },
  green: { iconBg: "bg-green-500/10", iconBorder: "border-green-500/20", iconText: "text-green-400", spotlight: "rgba(34, 197, 94, 0.06)", glow: "rgba(34, 197, 94, 0.15)" },
  cyan: { iconBg: "bg-cyan-500/10", iconBorder: "border-cyan-500/20", iconText: "text-cyan-400", spotlight: "rgba(6, 182, 212, 0.06)", glow: "rgba(6, 182, 212, 0.15)" },
  blue: { iconBg: "bg-blue-500/10", iconBorder: "border-blue-500/20", iconText: "text-blue-400", spotlight: "rgba(59, 130, 246, 0.06)", glow: "rgba(59, 130, 246, 0.15)" },
  pink: { iconBg: "bg-pink-500/10", iconBorder: "border-pink-500/20", iconText: "text-pink-400", spotlight: "rgba(236, 72, 153, 0.06)", glow: "rgba(236, 72, 153, 0.15)" },
  violet: { iconBg: "bg-violet-500/10", iconBorder: "border-violet-500/20", iconText: "text-violet-400", spotlight: "rgba(139, 92, 246, 0.06)", glow: "rgba(139, 92, 246, 0.15)" },
  orange: { iconBg: "bg-orange-500/10", iconBorder: "border-orange-500/20", iconText: "text-orange-400", spotlight: "rgba(249, 115, 22, 0.06)", glow: "rgba(249, 115, 22, 0.15)" },
};

const pills = [
  "Animations", "VFX Engine", "Motion Engine", "Components", "Utilities",
  "Dark Mode", "Glassmorphism", "Responsive", "Themes", "CSS Variables",
  "RTL Support", "Accessibility", "GPU Motion", "Tree Shaking", "CLI Tools",
  "Houdini Paint API", "Cascade Layers", "Scroll-Driven", "View Transitions",
  "Anchor Positioning", "Container Queries", "Layout Generators",
  "Plugin SDK", "Design Tokens", "Testing",
];

export function Features() {
  return (
    <section id="features" className="py-28 sm:py-36 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal>
          <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">Features</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Everything You Need.
            <br />
            <span className="text-muted-foreground/70">Nothing You Don&apos;t.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mt-5">
            Powerful utilities, reusable components, advanced motion, VFX, theming,
            and developer tools — eliminating the need to combine multiple libraries.
          </p>
        </Reveal>

        <StaggerContainer className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 scroll-stagger" delay={0.15}>
          {features.map(({ icon: I, title, desc, color }) => {
            const c = colorMap[color] ?? { iconBg: 'bg-foreground/[0.06]', iconBorder: 'border-border', iconText: 'text-foreground/60', spotlight: 'rgba(161,161,170,0.04)', glow: 'rgba(161,161,170,0.10)' };
            return (
              <StaggerItem key={title}>
                <AnimatedCard
                  spotlightColor={c.spotlight}
                  glowColor={c.glow}
                  className="h-full border border-border bg-foreground/[0.02] hover:bg-foreground/[0.03] transition-colors duration-300"
                >
                  <div className="p-6">
                    <div className={`w-10 h-10 rounded-xl ${c.iconBg} border ${c.iconBorder} flex items-center justify-center mb-5 ferrum-icon-bounce`}>
                      <I className={`w-5 h-5 ${c.iconText}`} />
                    </div>
                    <h3 className="text-base font-semibold text-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground/70 mt-2 leading-relaxed">{desc}</p>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <Reveal delay={0.2}>
          <div className="mt-10">
            <div className="flex flex-wrap gap-2">
              {pills.map((f, i) => (
                <span
                  key={f}
                  className="px-3 py-1.5 rounded-lg border border-border bg-foreground/[0.02] text-xs text-muted-foreground hover:text-foreground/60 hover:bg-foreground/[0.05] hover:border-border transition-all duration-300 cursor-default"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}