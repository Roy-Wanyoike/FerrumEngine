"use client";

import { ChevronRight, BookOpen } from "lucide-react";
import { AnimatedCard } from "@/components/ferrum/animated-components";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ferrum/scroll-reveal";
import { docSections } from "@/lib/docs-data";

const roadmap = [
  { name: "Ferrum Tokens", status: "Stable" },
  { name: "Ferrum Core", status: "Stable" },
  { name: "Ferrum Motion", status: "Stable" },
  { name: "Ferrum Utilities", status: "Stable" },
  { name: "Framework Adapters", status: "Stable" },
  { name: "Ferrum VFX", status: "Beta" },
  { name: "Ferrum Motion Engine", status: "Beta" },
  { name: "Ferrum Semantic", status: "Beta" },
  { name: "Ferrum Modern CSS", status: "Beta" },
  { name: "Ferrum Paint", status: "Beta" },
  { name: "Ferrum Layout", status: "Beta" },
  { name: "Ferrum A11y", status: "Beta" },
  { name: "Ferrum Compiler", status: "Beta" },
  { name: "Ferrum CLI", status: "Alpha" },
  { name: "Ferrum Plugin SDK", status: "Alpha" },
  { name: "Ferrum Testing", status: "Alpha" },
  { name: "Ferrum Studio", status: "Planned" },
  { name: "Ferrum AI", status: "Research" },
];

const statusStyles: Record<string, string> = {
  Stable: "bg-green-500/10 text-green-400 border-green-500/20",
  Beta: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Alpha: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Research: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Planned: "bg-foreground/[0.06] text-muted-foreground/70 border-border",
};

interface RoadmapSectionProps {
  onOpenDocs: () => void;
}

export function RoadmapSection({ onOpenDocs }: RoadmapSectionProps) {
  return (
    <>
      {/* Inline Docs */}
      <section id="docs" className="relative">
        <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-28 sm:py-36">
          <Reveal>
            <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">Documentation</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">Everything You Need to Know</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-muted-foreground/80 max-w-2xl leading-relaxed mt-5">
              Comprehensive guides, API references, and examples to help you build with FerrumEngine.
            </p>
          </Reveal>
          <StaggerContainer className="mt-16 grid lg:grid-cols-2 gap-4" delay={0.1}>
            {docSections.slice(0, 6).map((section) => (
              <StaggerItem key={section.id}>
                <AnimatedCard spotlightColor="rgba(168, 85, 247, 0.04)" glowColor="rgba(168, 85, 247, 0.10)" className="border border-border bg-foreground/[0.02] w-full">
                  <button onClick={onOpenDocs} className="group text-left p-6 relative z-20 w-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground group-hover:text-foreground transition-colors">{section.title}</h3>
                        {section.label && <span className="text-[10px] text-purple-400/50 uppercase tracking-wider">{section.label}</span>}
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground/50 ml-auto group-hover:text-muted-foreground group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-muted-foreground/70 leading-relaxed line-clamp-2">
                      {section.content.find((b) => b.type === "paragraph")?.text?.slice(0, 180) || ""}
                    </p>
                  </button>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <Reveal delay={0.2}>
            <div className="mt-8 text-center">
              <button onClick={onOpenDocs} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground/[0.06] hover:bg-foreground/[0.08] text-foreground/60 hover:text-foreground text-sm font-medium transition-all border border-border">
                <BookOpen className="w-4 h-4" /> View Full Documentation
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="relative">
        <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-28 sm:py-36">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-1">
              <Reveal>
                <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">Roadmap</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Building the Future</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-sm text-muted-foreground/80 leading-relaxed mt-4">
                  18 packages across 4 maturity tiers — from production-stable core
                  to experimental AI research.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-2">
              <Reveal delay={0.1}>
                <div className="grid sm:grid-cols-2 gap-3">
                  {roadmap.map(({ name, status }) => (
                    <div key={name} className="flex items-center justify-between py-3 px-4 rounded-xl border border-border/50 bg-foreground/[0.01] hover:bg-foreground/[0.04] transition-all duration-300">
                      <span className="text-sm text-muted-foreground/80">{name}</span>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${statusStyles[status] || statusStyles.Planned}`}>
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}