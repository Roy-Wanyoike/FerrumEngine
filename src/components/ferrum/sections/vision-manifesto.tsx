"use client";

import { Reveal } from "@/components/ferrum/scroll-reveal";
import { AnimatedCard } from "@/components/ferrum/animated-components";
import {
  Zap, Eye, Layers, Code, Brain, Shield, Globe,
  ArrowRight, Cpu, Sparkles, Terminal,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   VISION & MANIFESTO
   Where UI engineering is heading and how Ferrum fits
   ═══════════════════════════════════════════════════════════════ */

interface ManifestoSection {
  heading: string;
  content: string;
  icon: React.ElementType;
}

const manifesto: ManifestoSection[] = [
  {
    heading: "The era of static UI is over",
    content: "For a decade, web interfaces were mostly static: render once, update on interaction. CSS provided decoration. JavaScript provided logic. The boundary between them was sharp. But modern interfaces demand more — they need to breathe, respond, and adapt. A dashboard that counts up its numbers communicates progress. A sidebar that slides with weight communicates hierarchy. A button that ripples on click communicates acknowledgment. These are not embellishments; they are information.",
    icon: Zap,
  },
  {
    heading: "Current tools were designed for a simpler web",
    content: "Tailwind CSS handles styling. Framer Motion handles animation. Radix UI handles components. Storybook handles documentation. Each tool is excellent at its job, but together they form a patchwork with overlapping responsibilities, conflicting mental models, and version synchronization problems. A team using all four spends more time managing the glue between tools than building actual product features. The 30-40% infrastructure tax is real and unsustainable.",
    icon: Layers,
  },
  {
    heading: "AI is changing the rendering layer",
    content: "When AI generates UI, it does not think in React hooks or Vue composables. It thinks in visual intent: 'a card that floats on hover' or 'a button that feels heavy when pressed'. The rendering layer needs to understand intent, not just implementation. Ferrum's CSS-first architecture is designed for this future — every effect is a declarative class that describes what should happen, and the runtime determines how to make it happen efficiently. AI can generate rc-float. It cannot generate a 50-line Framer Motion configuration.",
    icon: Brain,
  },
  {
    heading: "Performance is not optional",
    content: "Every animation frame that misses 16ms creates jank. Every layout thrash wastes battery. Every unoptimized blur kills mobile performance. The current approach of 'add animation, profile later' results in apps that are beautiful on a developer's MacBook but painful on a user's mid-range Android phone. Ferrum makes performance the default by constraining effects to GPU-composited properties (transform, opacity), using the Paint API for complex effects, and eliminating unused CSS through the compiler pipeline.",
    icon: Cpu,
  },
  {
    heading: "Accessibility is a design constraint, not a feature",
    content: "The industry treats accessibility as a checkbox: add ARIA labels, check contrast ratios, call it done. But true accessibility means designing for diverse needs from the start. Animations that respect prefers-reduced-motion. Color systems that guarantee WCAG AA contrast. Components that work with keyboard navigation without configuration. In Ferrum, accessibility is not a mode — it is the default. If a feature cannot be made accessible, it does not ship.",
    icon: Shield,
  },
  {
    heading: "Ferrum is the rendering layer for the AI era",
    content: "Ferrum is not another CSS library. It is a rendering platform designed for the next decade of interface engineering. The 10 subsystems — Runtime, Motion, Physics, VFX, Components, Tokens, Compiler, AI, Studio, and Cloud — form an integrated stack where each subsystem enhances the others. Import what you need; the integration is handled by the platform. The AI subsystem can generate, the Compiler can optimize, and the Runtime can render — all from the same declarative foundation.",
    icon: Eye,
  },
];

const milestones = [
  { year: "1995", event: "CSS is born. Static styling for static pages." },
  { year: "2005", event: "AJAX and Web 2.0. Pages become applications." },
  { year: "2013", event: "React changes everything. Components over templates." },
  { year: "2016", event: "CSS Grid and Custom Properties. Layout becomes declarative." },
  { year: "2020", event: "Tailwind CSS popularizes utility-first. Speed over abstraction." },
  { year: "2023", event: "AI code assistants. Natural language meets UI generation." },
  { year: "2025", event: "Ferrum. The first intent-to-render platform for the web." },
];

export function VisionManifesto() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70">Vision & Manifesto</p>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight max-w-4xl">
            Where UI Engineering
            <br />
            <span className="text-muted-foreground/60">Is Heading</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground/80 max-w-2xl leading-relaxed mt-5">
            A technical philosophy explaining the trajectory of interface engineering
            and why Ferrum exists at this particular moment in time.
          </p>
        </Reveal>

        {/* Timeline */}
        <Reveal delay={0.15}>
          <div className="mt-16 p-6 sm:p-8 rounded-2xl border border-border/40 bg-foreground/[0.01]">
            <h3 className="text-sm font-semibold text-foreground mb-6">The Trajectory</h3>
            <div className="relative">
              <div className="absolute left-[39px] top-0 bottom-0 w-px bg-border/40" />
              <div className="space-y-6">
                {milestones.map((m, i) => (
                  <div key={m.year} className="flex items-start gap-4 relative">
                    <div className={`w-3 h-3 rounded-full border-2 shrink-0 mt-1 z-10 ${
                      i === milestones.length - 1
                        ? "bg-purple-500 border-purple-500 shadow-lg shadow-purple-500/40"
                        : "bg-background border-foreground/30"
                    }`} />
                    <div>
                      <span className="text-xs font-mono font-medium text-muted-foreground/50">{m.year}</span>
                      <p className={`text-sm mt-0.5 ${i === milestones.length - 1 ? "text-foreground font-semibold" : "text-foreground/70"}`}>{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Manifesto sections */}
        <div className="mt-16 space-y-6">
          {manifesto.map((section, i) => {
            const Icon = section.icon;
            return (
              <Reveal key={section.heading} delay={i * 0.04}>
                <div className="group p-6 sm:p-8 rounded-2xl border border-border/40 bg-foreground/[0.01] hover:bg-foreground/[0.025] transition-all duration-300">
                  <div className="flex gap-5">
                    <div className="shrink-0 hidden sm:flex flex-col items-center gap-3 pt-1">
                      <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] border border-border/40 flex items-center justify-center group-hover:border-purple-500/20 transition-colors">
                        <Icon className="w-5 h-5 text-muted-foreground/50 group-hover:text-purple-400 transition-colors" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground mb-3">{section.heading}</h3>
                      <p className="text-sm text-muted-foreground/70 leading-relaxed">{section.content}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Closing statement */}
        <Reveal delay={0.1}>
          <div className="mt-16 p-8 sm:p-10 rounded-2xl border border-purple-500/15 bg-purple-500/[0.04]">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-4">
                The future of UI is not more tools.
                <br />
                <span className="text-purple-400">It is one platform.</span>
              </h3>
              <p className="text-sm text-muted-foreground/70 leading-relaxed mb-6">
                Ferrum unifies the rendering layer — motion, VFX, components, tokens, and intelligence
                — into a single coherent platform. Describe the experience. Ferrum handles the rendering.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground/50">
                <span className="flex items-center gap-1.5"><Code className="w-3.5 h-3.5" />Open Source</span>
                <span className="text-muted-foreground/40">·</span>
                <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" />MIT Licensed</span>
                <span className="text-muted-foreground/40">·</span>
                <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" />Framework Independent</span>
                <span className="text-muted-foreground/40">·</span>
                <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" />Accessible by Default</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}