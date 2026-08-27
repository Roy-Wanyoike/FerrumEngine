"use client";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/ferrum/scroll-reveal";
import { AlertTriangle, Clock, Puzzle, Gauge, Shield, Cpu, ArrowRight } from "lucide-react";

interface Problem {
  icon: React.ElementType;
  title: string;
  description: string;
}

const problems: Problem[] = [
  {
    icon: Clock,
    title: "Weeks of rebuild",
    description: "Every new project starts with the same work: motion systems, responsive layouts, accessible components, theme management. Teams spend 30-40% of their time on undifferentiated infrastructure that should already exist.",
  },
  {
    icon: Puzzle,
    title: "The integration nightmare",
    description: "Framer Motion for animation. Tailwind for styling. Radix for components. Storybook for docs. Each has its own API, its own mental model, its own version conflicts. The glue code becomes the biggest part of your codebase.",
  },
  {
    icon: Gauge,
    title: "Performance is an afterthought",
    description: "Animations jank on mobile. CSS bundles bloat to 200KB+. GPU layers stack uncontrollably. Accessibility gets bolted on during QA. Nobody optimizes the rendering pipeline because it's nobody's job.",
  },
  {
    icon: Shield,
    title: "No shared philosophy",
    description: "React teams write hooks. Vue teams use composables. Svelte teams write runes. There's no universal language for interface engineering. Every framework reinvents the wheel with different names.",
  },
  {
    icon: Cpu,
    title: "AI changes everything",
    description: "Generated UI needs runtime intelligence. A static CSS class can't adapt to context. The future requires an engine that understands intent, not just implementation — and that engine doesn't exist yet.",
  },
  {
    icon: AlertTriangle,
    title: "The 366-effect problem",
    description: "Ferrum already ships 366 CSS effects, 11 categories, and 20+ packages. Without a coherent architecture, it's just a large collection. Size without structure is noise, not a platform.",
  },
];

export function WhyFerrum() {
  return (
    <section id="why-ferrum" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 right-0 w-[600px] h-[400px] bg-pink-500/[0.02] rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal>
          <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">The Problem</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight max-w-3xl">
            The web moved forward.
            <br />
            <span className="text-muted-foreground/50">Our tools didn't.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground/60 max-w-2xl leading-relaxed mt-6">
            Modern interfaces demand motion that means something, layouts that respond to context,
            and accessibility that ships by default. Today's frontend toolchain was designed for
            a simpler era.
          </p>
        </Reveal>

        <StaggerContainer className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4" delay={0.1}>
          {problems.map((problem) => {
            const Icon = problem.icon;
            return (
              <StaggerItem key={problem.title}>
                <div className="group p-6 rounded-2xl border border-border/50 bg-foreground/[0.015] hover:bg-foreground/[0.03] transition-all duration-300 h-full">
                  <div className="w-10 h-10 rounded-xl bg-foreground/[0.05] border border-border/50 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-muted-foreground/50 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">{problem.title}</h3>
                  <p className="text-sm text-muted-foreground/70 leading-relaxed">{problem.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Transition to solution */}
        <Reveal delay={0.15}>
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-purple-500/15 bg-purple-500/[0.03]">
              <ArrowRight className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-foreground/70">
                Ferrum is the answer to every one of these problems.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}