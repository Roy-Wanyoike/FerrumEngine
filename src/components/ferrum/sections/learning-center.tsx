// Type-strict compliance: fixed noUncheckedIndexedAccess
"use client";

import {
  BookOpen, Code, Palette, Zap, Eye, Shield, Brain,
  ChevronRight, Clock, GraduationCap, Lightbulb,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SectionHeader } from "./section-helpers";

/* ═══════════════════════════════════════════════════════════════
   LEARNING CENTER
   Teach interface engineering principles, not just APIs
   ═══════════════════════════════════════════════════════════════ */

interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  modules: LearningModule[];
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
}

interface LearningModule {
  title: string;
  duration: string;
  description: string;
  keyTakeaway: string;
}

const paths: LearningPath[] = [
  {
    id: "motion-fundamentals",
    title: "Motion Fundamentals",
    description: "Understand why motion matters in interfaces. Learn the physics behind spring dynamics, easing curves, and gesture-driven animation. Build an intuition for when animation improves UX versus when it distracts.",
    icon: Zap,
    duration: "4 hours",
    level: "Beginner",
    modules: [
      { title: "Why Motion Matters", duration: "30 min", description: "The psychology of animation in user interfaces. How motion communicates state, hierarchy, and causality. Research from Disney's 12 principles applied to UI.", keyTakeaway: "Animation is communication, not decoration." },
      { title: "Easing Curves Deep Dive", duration: "45 min", description: "Linear vs ease-in vs ease-out vs spring. When to use each. How to read a bezier curve. Building a mental model for motion timing.", keyTakeaway: "Match easing to physical metaphor — springs for weight, ease-out for arrivals." },
      { title: "CSS Transitions & Keyframes", duration: "40 min", description: "The browser's native animation engine. Performance implications of animating transform vs layout properties. The composite layer model.", keyTakeaway: "Only animate transform and opacity for 60fps." },
      { title: "Spring Physics", duration: "50 min", description: "Mass, stiffness, damping — the three parameters that define natural motion. How Ferrum's spring engine works under the hood.", keyTakeaway: "Springs feel natural because they mirror real-world physics." },
      { title: "Gesture-Driven Animation", duration: "45 min", description: "Connecting touch/mouse input to motion output. Drag, fling, and momentum. Building interactive elements that respond to physical input.", keyTakeaway: "The best animations respond to user intent, not timers." },
    ],
  },
  {
    id: "visual-effects",
    title: "Visual Effects Engineering",
    description: "Go beyond basic CSS effects. Learn glass morphism, atmospheric effects, distortion, and how to create effects that enhance usability without degrading performance.",
    icon: Eye,
    duration: "5 hours",
    level: "Intermediate",
    modules: [
      { title: "The VFX Stack", duration: "35 min", description: "Backdrop-filter, blend modes, clip-path, and mask-image — the CSS properties that power modern visual effects. Browser support and fallbacks.", keyTakeaway: "Layer multiple CSS effects for depth, not clutter." },
      { title: "Glass Morphism Done Right", duration: "40 min", description: "When to use frosted glass, when to avoid it. Contrast requirements, accessibility considerations, and performance cost of backdrop-blur.", keyTakeaway: "Glass morphism needs high-contrast content to remain accessible." },
      { title: "Atmospheric Effects", duration: "45 min", description: "Gradients, noise textures, aurora blobs, and ambient light. Creating depth without distraction. The Ferrum approach to atmospheric backgrounds.", keyTakeaway: "Atmosphere should guide attention, not compete for it." },
      { title: "GPU-Accelerated Particles", duration: "50 min", description: "Creating particle systems with CSS and Canvas. When to use each. The Paint API and Houdini worklets for browser-native particle effects.", keyTakeaway: "Use CSS particles for decoration, Canvas for interaction." },
      { title: "Performance Budget for Effects", duration: "35 min", description: "Setting and enforcing a performance budget. Measuring FPS, layout thrash, and paint time. Tools and techniques for profiling visual effects.", keyTakeaway: "If you can't measure it, you can't optimize it." },
    ],
  },
  {
    id: "design-systems",
    title: "Design System Architecture",
    description: "Build design systems that scale across teams and products. Learn token systems, component APIs, and how Ferrum's unified approach replaces the traditional patchwork of tools.",
    icon: Palette,
    duration: "6 hours",
    level: "Advanced",
    modules: [
      { title: "Design Tokens Deep Dive", duration: "50 min", description: "Semantic scales, alias chains, and output transforms. How Ferrum Tokens manages 16 scales across 5 output formats (CSS, SCSS, JSON, TS, Tailwind).", keyTakeaway: "Tokens are the single source of truth for every visual decision." },
      { title: "Component API Design", duration: "45 min", description: "What makes a good component API. The composition pattern vs the configuration pattern. Why Ferrum Components uses semantic HTML and ARIA by default.", keyTakeaway: "Good APIs are predictable, composable, and accessible." },
      { title: "Multi-Framework Design Systems", duration: "55 min", description: "The challenge of maintaining one design system across React, Vue, Svelte, Angular. Ferrum's CSS-first approach: one source of truth, framework adapters for integration.", keyTakeaway: "CSS is the universal language of design systems." },
      { title: "Theme Architecture", duration: "40 min", description: "Light/dark modes, brand themes, and runtime theming. How Ferrum's token system enables theme switching without JavaScript.", keyTakeaway: "Themes should be a CSS variable swap, not a code change." },
      { title: "Migration Strategy", duration: "45 min", description: "Moving from Tailwind + Radix + Framer to a unified Ferrum stack. Incremental adoption patterns. Measuring the ROI of consolidation.", keyTakeaway: "Migrate incrementally — replace one tool at a time." },
    ],
  },
  {
    id: "accessibility",
    title: "Accessible Interface Engineering",
    description: "Accessibility is not a feature — it is a constraint that makes every design decision better. Learn WCAG principles, motion sensitivity, and how Ferrum builds accessibility into every layer.",
    icon: Shield,
    duration: "3 hours",
    level: "Beginner",
    modules: [
      { title: "Accessibility as Architecture", duration: "30 min", description: "Why accessibility must be built into the platform, not bolted on. The cost of retrofitting vs designing for inclusion from the start.", keyTakeaway: "Accessible design is simply good design." },
      { title: "Motion & Accessibility", duration: "40 min", description: "prefers-reduced-motion, vestibular disorders, and photosensitive epilepsy. How to create impressive animations that respect user preferences.", keyTakeaway: "The best animations degrade gracefully." },
      { title: "Color & Contrast", duration: "35 min", description: "WCAG AA and AAA contrast requirements. How Ferrum's token system ensures contrast passes by default. Tools for auditing color accessibility.", keyTakeaway: "Contrast is non-negotiable. Design for 4.5:1 minimum." },
      { title: "Keyboard Navigation Patterns", duration: "40 min", description: "Focus management, tab order, roving tabindex, and keyboard shortcuts. How Ferrum components implement keyboard navigation without configuration.", keyTakeaway: "If you can't use it with a keyboard, it is not finished." },
    ],
  },
  {
    id: "ai-interface-engineering",
    title: "AI & Interface Engineering",
    description: "The future of UI is AI-assisted. Learn how Ferrum's AI layer works, how to generate UI from natural language, and the principles of responsible AI in design tools.",
    icon: Brain,
    duration: "4 hours",
    level: "Advanced",
    modules: [
      { title: "Intent-to-Render Pipeline", duration: "45 min", description: "How Ferrum AI translates natural language into rendered UI. The parsing, inference, and code generation pipeline. Why the output is always editable CSS.", keyTakeaway: "AI should amplify intent, not replace understanding." },
      { title: "AI-Assisted Design", duration: "40 min", description: "Using AI for design exploration, not final output. Generating variations, suggesting effects, and recommending patterns based on context.", keyTakeaway: "AI is a design partner, not a replacement for designers." },
      { title: "Responsible AI in UI", duration: "35 min", description: "Audit trails for AI-generated code. Quality gates, approval workflows, and the human-in-the-loop principle. Why Ferrum AI always produces understandable output.", keyTakeaway: "Developers must be able to understand and modify AI output." },
    ],
  },
];

const levelStyles: Record<string, string> = {
  Beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Intermediate: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Advanced: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

export function LearningCenter() {
  const [expandedPath, setExpandedPath] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <SectionHeader
          label="Roadmap"
          title="Learn Interface Engineering"
          subtitle="Not just APIs — principles. These learning paths teach the engineering behind beautiful, performant, and accessible user interfaces."
          icon={GraduationCap}
        />

        {/* Philosophy banner */}
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.15s", animationFillMode: "both" }}>
          <div className="mt-10 p-6 rounded-2xl border border-purple-500/15 bg-purple-500/[0.03] flex items-start gap-4">
            <Lightbulb className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Ferrum teaches principles, not syntax</p>
              <p className="text-xs text-muted-foreground/70 leading-relaxed">
                Every module explains why, not just how. Understanding the physics behind spring animation,
                the accessibility reasoning behind contrast ratios, and the architecture behind design tokens
                makes you a better engineer — with or without Ferrum.
              </p>
            </div>
          </div>
        </div>

        {/* Learning paths grid */}
        <div className="mt-14 space-y-6">
          {paths.map((path, i) => {
            const Icon = path.icon;
            const isExpanded = expandedPath === path.id;
            return (
              <div key={path.id} className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: `${i * 0.05}s`, animationFillMode: "both" }}>
                <div className="rounded-2xl border border-border/40 bg-foreground/[0.015] overflow-hidden transition-all duration-300">
                  {/* Path header */}
                  <button
                    onClick={() => setExpandedPath(isExpanded ? null : path.id)}
                    aria-expanded={isExpanded}
                    aria-controls={`learning-content-${path.id}`}
                    className="w-full text-left p-6 sm:p-8 hover:bg-foreground/[0.02] transition-colors"
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-lg sm:text-xl font-bold text-foreground">{path.title}</h3>
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${levelStyles[path.level]}`}>{path.level}</span>
                        </div>
                        <p className="text-sm text-muted-foreground/70 leading-relaxed mb-3">{path.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground/50">
                          <span className="flex items-center gap-1.5"><BookOpen className="w-3 h-3" />{path.modules.length} modules</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{path.duration}</span>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 text-muted-foreground/60 shrink-0 mt-1 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} />
                    </div>
                  </button>

                  {/* Expanded modules */}
                  {isExpanded && (
                    <div id={`learning-content-${path.id}`} className="border-t border-border/40 px-6 sm:px-8 pb-6 sm:pb-8 pt-4">
                      <div className="space-y-3">
                        {path.modules.map((mod, j) => (
                          <div key={mod.title} className="p-4 rounded-xl border border-border/30 bg-foreground/[0.01] hover:bg-foreground/[0.03] transition-colors">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[10px] font-mono text-muted-foreground/60">{String(j + 1).padStart(2, "0")}</span>
                                  <h4 className="text-sm font-semibold text-foreground">{mod.title}</h4>
                                  <span className="text-[10px] text-muted-foreground/60 flex items-center gap-1"><Clock className="w-2.5 h-2.5" />{mod.duration}</span>
                                </div>
                                <p className="text-xs text-muted-foreground/60 leading-relaxed mb-2">{mod.description}</p>
                                <div className="inline-flex items-start gap-2 px-3 py-1.5 rounded-lg bg-purple-500/[0.04] border border-purple-500/10">
                                  <Lightbulb className="w-3 h-3 text-purple-400/60 shrink-0 mt-0.5" />
                                  <span className="text-[11px] text-muted-foreground/60 leading-relaxed">{mod.keyTakeaway}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
          <div className="mt-16 text-center">
            <Link href="/effects" className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-purple-500/15 bg-purple-500/[0.03] hover:bg-purple-500/[0.06] hover:border-purple-500/25 transition-all">
              <Code className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-foreground/70">
                Explore the effects gallery to see all 542 effects in action.
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
