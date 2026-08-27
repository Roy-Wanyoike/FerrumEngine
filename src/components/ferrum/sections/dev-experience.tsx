"use client";

import { BookOpen, Terminal, GitBranch, Globe, Wrench, FileText, Rocket, Settings } from "lucide-react";
import { AnimatedCard } from "@/components/ferrum/animated-components";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ferrum/scroll-reveal";

const capabilities = [
  { icon: Wrench, title: "Intuitive API", desc: "Predictable, consistent class names and patterns" },
  { icon: FileText, title: "TypeScript Native", desc: "Full type definitions for every component" },
  { icon: Rocket, title: "Zero Config", desc: "Works out of the box with any framework" },
  { icon: Settings, title: "Fully Customizable", desc: "Design tokens for complete visual control" },
];

const tools = [
  { icon: BookOpen, label: "Interactive Docs" },
  { icon: Terminal, label: "CLI (5 Commands)" },
  { icon: GitBranch, label: "Version Control" },
  { icon: Globe, label: "CDN Ready" },
];

export function DevExperience() {
  return (
    <section id="developer-experience" className="relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-pink-500/[0.03] rounded-full blur-[120px]" />
        <div className="ferrum-aurora ferrum-aurora-2 absolute top-1/3 right-1/4 w-[400px] h-[250px] bg-pink-500/[0.04]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-28 sm:py-36">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center scroll-fade-up">
          <div>
            <Reveal>
              <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">Developer Experience</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                Designed Around Developers
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg text-muted-foreground/80 max-w-xl leading-relaxed mt-6">
                Spend less time configuring tools and more time building. FerrumEngine delivers
                an intuitive API, comprehensive documentation, interactive examples, and a
                workflow optimized for productivity.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {tools.map(({ icon: I, label }) => (
                  <div key={label} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-foreground/[0.02] hover:bg-foreground/[0.04] hover:border-border transition-all duration-300">
                    <I className="w-4 h-4 text-purple-400/60" />
                    <span className="text-sm text-muted-foreground/80">{label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <StaggerContainer className="grid grid-cols-2 gap-4" delay={0.1}>
            {capabilities.map(({ icon: I, title, desc }) => (
              <StaggerItem key={title}>
                <AnimatedCard spotlightColor="rgba(168, 85, 247, 0.05)" glowColor="rgba(168, 85, 247, 0.12)" className="border border-border bg-foreground/[0.02] h-full">
                  <div className="p-5 relative z-20">
                    <I className="w-5 h-5 text-purple-400/70 mb-3" />
                    <h4 className="text-sm font-semibold text-foreground">{title}</h4>
                    <p className="text-xs text-muted-foreground/70 mt-1.5 leading-relaxed">{desc}</p>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}