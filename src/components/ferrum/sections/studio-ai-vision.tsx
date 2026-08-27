"use client";

import { useState, useEffect } from "react";
import {
  MousePointer2, Timer, Palette, Smartphone, Sparkles, Download,
  MessageSquare, Camera, Layers, Zap,
} from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ferrum/scroll-reveal";
import { AnimatedCard } from "@/components/ferrum/animated-components";
import { spotlightMap } from "@/lib/animation-colors";

/* ─── Studio Features ─── */
const studioFeatures = [
  { icon: MousePointer2, title: "Drag & Drop", desc: "Place components on a canvas. Ferrum generates semantic, accessible markup automatically.", color: "blue" },
  { icon: Timer, title: "Animation Timeline", desc: "A keyframe-style timeline editor for choreographing complex multi-element motion sequences.", color: "violet" },
  { icon: Palette, title: "Token Management", desc: "Visual editor for design tokens — adjust colors, spacing, typography, and see changes propagate instantly.", color: "amber" },
  { icon: Smartphone, title: "Responsive Controls", desc: "Switch between breakpoints, test container queries, and preview adaptive layouts in real time.", color: "cyan" },
  { icon: Sparkles, title: "AI Generation", desc: "Describe what you want. Ferrum Studio generates the layout, components, motion, and theme.", color: "pink" },
  { icon: Download, title: "Export Production Code", desc: "Export to React, Vue, Svelte, Angular, or vanilla HTML/CSS — optimized and tree-shaken.", color: "emerald" },
];

/* ─── AI Demo ─── */
const userPrompt = "Create a healthcare dashboard with patient analytics, real-time alerts, and smooth card transitions.";

const aiOutput = [
  { type: "component", label: "Dashboard Layout", detail: "3-column responsive grid with sidebar navigation", icon: Layers },
  { type: "motion", label: "Card Transitions", detail: "Spring physics with staggered entrance", icon: Zap },
  { type: "theme", label: "Healthcare Theme", detail: "High-contrast, WCAG AA compliant palette", icon: Palette },
  { type: "a11y", label: "Accessibility", detail: "ARIA labels, keyboard nav, reduced-motion support", icon: Sparkles },
  { type: "responsive", label: "Adaptive Layout", detail: "Desktop 3-col → Tablet 2-col → Mobile 1-col", icon: Smartphone },
];

const formats = [
  { label: "Prompt → Interface", icon: MessageSquare },
  { label: "Screenshot → UI", icon: Camera },
  { label: "Figma → Ferrum", icon: Layers },
  { label: "Design System → App", icon: Sparkles },
];

function AIDemo() {
  const [visibleItems, setVisibleItems] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    if (visibleItems < aiOutput.length) {
      const timer = setTimeout(() => setVisibleItems((v) => v + 1), 400);
      return () => clearTimeout(timer);
    }
  }, [visibleItems, started]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 }
    );
    const el = document.getElementById("ai-demo-trigger");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="ai-demo-trigger" className="mt-16">
      <Reveal>
        <div className="rounded-2xl border border-border bg-foreground/[0.02] overflow-hidden">
          {/* Two-panel layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
            {/* Left: User prompt */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-foreground/[0.08] flex items-center justify-center">
                  <MessageSquare className="w-3.5 h-3.5 text-muted-foreground/50" />
                </div>
                <span className="text-xs font-medium text-muted-foreground/50">You</span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">{userPrompt}</p>
            </div>

            {/* Right: AI Output */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <span className="text-xs font-medium text-purple-400/60">Ferrum AI</span>
              </div>
              <div className="space-y-2.5">
                {aiOutput.slice(0, visibleItems).map((item, i) => {
                  const I = item.icon;
                  return (
                    <div
                      key={item.type}
                      className="flex items-start gap-3 p-3 rounded-xl bg-foreground/[0.03] border border-border/50 animate-[ferrum-fade-up_0.4s_ease-out_both]"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <I className="w-4 h-4 text-purple-400/60 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-foreground/80">{item.label}</div>
                        <div className="text-[11px] text-muted-foreground/50 mt-0.5">{item.detail}</div>
                      </div>
                    </div>
                  );
                })}
                {visibleItems < aiOutput.length && started && (
                  <div className="flex items-center gap-2 px-3 py-2">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                    <span className="text-[11px] text-muted-foreground/30">Generating...</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Format support row */}
          <div className="border-t border-border px-6 py-4 flex flex-wrap gap-3 justify-center bg-foreground/[0.01]">
            {formats.map((f) => {
              const I = f.icon;
              return (
                <span
                  key={f.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/50 bg-foreground/[0.02] text-[11px] text-muted-foreground/60"
                >
                  <I className="w-3 h-3" />
                  {f.label}
                </span>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export function StudioAIVision() {
  return (
    <section id="studio" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-pink-500/[0.03] rounded-full blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        {/* ─── Studio Section ─── */}
        <Reveal>
          <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">Ferrum Studio</p>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="flex items-start gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                Figma Meets Unreal Engine
                <br />
                <span className="text-muted-foreground/70">for Interfaces.</span>
              </h2>
            </div>
            <span className="mt-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-400 font-semibold uppercase tracking-wider shrink-0">
              Coming Soon
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mt-5">
            A visual interface builder that generates production-ready code — not prototypes,
            not mockups, but deployable components with motion, effects, and accessibility built in.
          </p>
        </Reveal>

        <StaggerContainer className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" delay={0.1}>
          {studioFeatures.map((f) => {
            const sm = (spotlightMap as Record<string, {spotlight: string; glow: string}>)[f.color] ?? {spotlight: 'rgba(161,161,170,0.04)', glow: 'rgba(161,161,170,0.10)'};
            return (
              <StaggerItem key={f.title}>
                <AnimatedCard spotlightColor={sm.spotlight} glowColor={sm.glow} className="border border-border bg-foreground/[0.02] h-full">
                  <div className="p-5 relative z-20">
                    <div className={`w-9 h-9 rounded-lg bg-foreground/[0.06] border border-border/50 flex items-center justify-center mb-4 ferrum-icon-bounce`}>
                      <f.icon className="w-4 h-4 text-muted-foreground/60" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                    <p className="text-xs text-muted-foreground/50 mt-1.5 leading-relaxed">{f.desc}</p>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* ─── AI Engine Section ─── */}
        <div className="mt-32">
          <Reveal>
            <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">AI Engine</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
              Describe It.
              <br />
              <span className="text-muted-foreground/70">Ferrum Builds It.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mt-5">
              From natural language to production interfaces — with motion, accessibility, and
              responsive behavior included.
            </p>
          </Reveal>

          <AIDemo />
        </div>
      </div>
    </section>
  );
}