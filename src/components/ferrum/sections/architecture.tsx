"use client";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/ferrum/scroll-reveal";
import { AnimatedCard } from "@/components/ferrum/animated-components";
import { spotlightMap } from "@/lib/animation-colors";
import {
  Layers, Cpu, Wrench, Sparkles, Monitor, Zap, Eye,
  Terminal, SquareTerminal, Palette, LayoutDashboard, Bot, Cloud,
} from "lucide-react";

const topNode = { name: "Ferrum Platform", icon: Layers, desc: "Universal UI Engine", color: "purple" as const };

const midLevel = [
  { name: "Core Runtime", icon: Cpu, desc: "Zero-dependency execution layer", color: "blue" as const },
  { name: "Developer Tools", icon: Wrench, desc: "CLI, compiler, docs, testing", color: "amber" as const },
  { name: "AI & Studio", icon: Sparkles, desc: "Visual editor + AI generation", color: "pink" as const },
];

const leafNodes: Record<string, { name: string; icon: React.ElementType; desc: string; color: string }[]> = {
  "Core Runtime": [
    { name: "Rendering Engine", icon: Monitor, desc: "Layout, paint, composite", color: "cyan" },
    { name: "Motion Engine", icon: Zap, desc: "18 physics/timeline modules", color: "violet" },
    { name: "VFX Engine", icon: Eye, desc: "14 visual effect categories", color: "rose" },
  ],
  "Developer Tools": [
    { name: "Compiler", icon: Terminal, desc: "9-pass optimization pipeline", color: "sky" },
    { name: "CLI", icon: SquareTerminal, desc: "5 build commands", color: "emerald" },
    { name: "Design Tokens", icon: Palette, desc: "16 semantic scales, 5 outputs", color: "orange" },
  ],
  "AI & Studio": [
    { name: "Ferrum Studio", icon: LayoutDashboard, desc: "Visual interface builder", color: "purple" },
    { name: "AI Generation", icon: Bot, desc: "Prompt to interface", color: "pink" },
    { name: "Cloud Deploy", icon: Cloud, desc: "One-click deployment", color: "blue" },
  ],
};

function NodeCard({ node, size = "sm", highlight = false }: {
  node: { name: string; icon: React.ElementType; desc: string; color: string };
  size?: "lg" | "sm";
  highlight?: boolean;
}) {
  const Icon = node.icon;
  const colorEntry = spotlightMap[node.color as keyof typeof spotlightMap];
  const defaults = spotlightMap.zinc!;

  if (size === "lg") {
    return (
      <AnimatedCard
        spotlightColor={colorEntry?.spotlight ?? defaults.spotlight}
        glowColor={colorEntry?.glow ?? defaults.glow}
        className={`inline-flex items-center gap-3 px-6 py-3.5 rounded-xl border ${
          highlight ? "border-purple-500/20 bg-purple-500/[0.08]" : "border-border bg-foreground/[0.02]"
        }`}
      >
        <div className={`w-10 h-10 rounded-xl ${highlight ? "bg-purple-500/15" : "bg-foreground/[0.06]"} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${highlight ? "text-purple-400" : "text-foreground/60"}`} />
        </div>
        <div>
          <div className={`text-sm font-semibold ${highlight ? "text-purple-300" : "text-foreground"}`}>{node.name}</div>
          <div className="text-[11px] text-muted-foreground/50">{node.desc}</div>
        </div>
      </AnimatedCard>
    );
  }

  return (
    <AnimatedCard
      spotlightColor={colorEntry?.spotlight ?? defaults.spotlight}
      glowColor={colorEntry?.glow ?? defaults.glow}
      className="p-4 border border-border/60 bg-foreground/[0.02] h-full"
    >
      <div className="flex items-center gap-3 relative z-20">
        <div className={`w-8 h-8 rounded-lg bg-foreground/[0.05] border border-border/50 flex items-center justify-center shrink-0`}>
          <Icon className="w-4 h-4 text-muted-foreground/60" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-semibold text-foreground/80 truncate">{node.name}</div>
          <div className="text-[10px] text-muted-foreground/70 truncate">{node.desc}</div>
        </div>
      </div>
    </AnimatedCard>
  );
}

function Connector() {
  return <div className="w-px h-6 bg-border/60 mx-auto" />;
}

export function Architecture() {
  return (
    <section id="architecture" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-blue-500/[0.03] rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal>
          <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">Architecture</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            One Engine.
            <br />
            <span className="text-muted-foreground/70">Every Layer.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mt-5">
            Ferrum is structured as a unified platform where each engine layer builds on top
            of the one below it — from low-level rendering primitives to high-level AI generation.
          </p>
        </Reveal>

        {/* Architecture Tree */}
        <Reveal delay={0.15}>
          <div className="mt-16 scroll-fade-scale">
            {/* Top Level */}
            <div className="flex justify-center">
              <NodeCard node={topNode} size="lg" highlight />
            </div>

            <Connector />

            {/* Connector lines to mid-level */}
            <div className="hidden lg:block relative h-6">
              <div className="absolute top-0 left-1/2 w-px h-3 bg-border/60" />
              <div className="absolute top-3 left-[16.6%] right-[16.6%] h-px bg-border/60" />
              <div className="absolute top-3 left-[16.6%] w-px h-3 bg-border/60" />
              <div className="absolute top-3 left-1/2 w-px h-3 bg-border/60" />
              <div className="absolute top-3 left-[83.3%] w-px h-3 bg-border/60" />
            </div>

            {/* Mid Level */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4" delay={0.05}>
              {midLevel.map((node) => (
                <StaggerItem key={node.name}>
                  <div className="flex flex-col items-center gap-4">
                    <NodeCard node={node} />
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Connector lines to leaf nodes */}
            <div className="hidden lg:block relative h-6">
              {[16.6, 50, 83.3].map((left) => (
                <div key={left}>
                  <div className="absolute top-0 w-px h-3 bg-border/40" style={{ left: `${left}%` }} />
                  <div
                    className="absolute top-3 h-px bg-border/40"
                    style={{ left: `${left - 3}%`, right: `${100 - left - 3}%` }}
                  />
                  <div className="absolute top-3 w-px h-3 bg-border/40" style={{ left: `${left - 3}%` }} />
                  <div className="absolute top-3 w-px h-3 bg-border/40" style={{ left: `${left}%` }} />
                  <div className="absolute top-3 w-px h-3 bg-border/40" style={{ left: `${left + 3}%` }} />
                </div>
              ))}
            </div>

            {/* Leaf Nodes */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4" delay={0.1}>
              {midLevel.map((mid) =>
                (leafNodes[mid.name] || []).map((leaf) => (
                  <StaggerItem key={leaf.name}>
                    <NodeCard node={leaf} />
                  </StaggerItem>
                ))
              )}
            </StaggerContainer>
          </div>
        </Reveal>
      </div>
    </section>
  );
}