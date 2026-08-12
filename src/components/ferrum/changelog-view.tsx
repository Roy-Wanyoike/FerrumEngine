"use client";

import {
  Rocket, Bug, Wrench, Sparkles, ArrowDown,
  XCircle, AlertTriangle, ShieldCheck, Calendar, Tag,
} from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "./sections/section-helpers";

/* ═══════════════════════════════════════════════════════════════
   CHANGELOG VIEW — Release history & updates
   ═══════════════════════════════════════════════════════════════ */

interface ChangelogChange {
  type: "added" | "fixed" | "changed" | "deprecated" | "removed" | "security";
  items: string[];
}

interface ChangelogEntry {
  version: string;
  date: string;
  type: "major" | "minor" | "patch";
  title: string;
  description: string;
  changes: ChangelogChange[];
}

const changelog: ChangelogEntry[] = [
  {
    version: "2.1.0",
    date: "2025-01-28",
    type: "minor",
    title: "Scroll-Driven Animations & Performance Dashboard",
    description: "Native scroll-driven animation support with progressive enhancement, and a new performance monitoring dashboard for analyzing animation frame rates.",
    changes: [
      {
        type: "added",
        items: [
          "Native CSS scroll-driven animation support with automatic fallback to Intersection Observer",
          "Performance Dashboard component for real-time FPS monitoring of animated elements",
          "`useFerrumScrollProgress()` hook for React adapters",
          "`@ferrum/astro` adapter with View Transitions API integration",
          "Visual effect builder (beta) with drag-and-drop keyframe editing",
        ],
      },
      {
        type: "changed",
        items: [
          "Compiler output is now 15% smaller on average due to improved CSS property deduplication",
          "Spring physics engine now uses RK4 integration for more accurate trajectories",
        ],
      },
      {
        type: "fixed",
        items: [
          "Fixed memory leak in effect cleanup when components unmount during animation",
          "Corrected `prefers-reduced-motion` behavior to fully disable transforms, not just transitions",
          "Resolved z-index stacking context issue with glass morphism effects in Safari",
        ],
      },
    ],
  },
  {
    version: "2.0.0",
    date: "2025-01-15",
    type: "major",
    title: "FerrumEngine 2.0 — The Complete Rewrite",
    description: "Ground-up rewrite of the runtime, new 9-pass compiler pipeline, 200+ new effects, and 9 framework adapters. The biggest release in FerrumEngine history.",
    changes: [
      {
        type: "added",
        items: [
          "Complete runtime rewrite with 9-pass compiler pipeline",
          "200+ new effects across 12 new categories (Parallax, Morph, Page Transitions, Stagger, etc.)",
          "Framework adapters: React, Vue 3, Svelte, Solid, Preact, Qwik, Astro, Angular, Vanilla JS",
          "Design token system with CSS custom property generation",
          "`ferrum init` CLI with project scaffolding and migration tools",
          "Automatic codemod for v1.x → v2.0 migration (95% automated)",
          "VFX engine with particle systems, noise-based effects, and blend modes",
        ],
      },
      {
        type: "changed",
        items: [
          "Effect class names follow new naming convention: `ferrum-{category}-{name}`",
          "Configuration file format changed from `.ferrumrc` to `ferrum.config.ts`",
          "Minimum Node.js version raised to 18.0",
        ],
      },
      {
        type: "removed",
        items: [
          "Dropped support for Internet Explorer 11",
          "Removed deprecated `ferrum.animate()` imperative API (use Web Animations API directly)",
          "Removed `ferrum-plugin-postcss` (functionality integrated into core compiler)",
        ],
      },
    ],
  },
  {
    version: "1.5.0",
    date: "2024-10-20",
    type: "minor",
    title: "Spring Physics & Gesture Library",
    description: " Introduced spring-based animation physics and a gesture recognition layer for drag, fling, and pinch interactions.",
    changes: [
      {
        type: "added",
        items: [
          "Spring physics engine with configurable mass, stiffness, and damping parameters",
          "Gesture recognition: drag, fling, pinch-to-zoom, and swipe detection",
          "`useSpring` and `useGesture` hooks for React adapter",
          "12 new spring-based entrance/exit effects",
          "Interactive playground presets for spring parameter tuning",
        ],
      },
      {
        type: "changed",
        items: [
          "Improved bezier curve fitting algorithm for spring-to-CSS conversion (3x faster)",
          "Reduced package size by 8% through CSS output optimization",
        ],
      },
      {
        type: "fixed",
        items: [
          "Fixed spring overshoot causing elements to briefly escape their bounding box",
          "Resolved gesture conflicts between horizontal swipe and vertical scroll",
        ],
      },
    ],
  },
  {
    version: "1.4.0",
    date: "2024-08-12",
    type: "minor",
    title: "Accessibility First",
    description: "Comprehensive accessibility improvements including full prefers-reduced-motion support, ARIA live regions for dynamic content, and screen reader announcements for state changes.",
    changes: [
      {
        type: "added",
        items: [
          "Full `prefers-reduced-motion` support: effects gracefully degrade to instant transitions",
          "ARIA live region utilities for animated content changes",
          "`useReducedMotion()` hook for conditional effect rendering",
          "High-contrast mode support for all effect categories",
          "Accessibility audit report and WCAG 2.2 AA compliance documentation",
        ],
      },
      {
        type: "changed",
        items: [
          "Default easing curves adjusted for reduced motion sensitivity",
          "Animation durations now capped at 1s by default (configurable)",
        ],
      },
      {
        type: "fixed",
        items: [
          "Fixed screen reader announcing animation class names as content",
          "Resolved focus management issues with modal entrance animations",
          "Corrected color contrast ratios for effect preview badges",
        ],
      },
    ],
  },
  {
    version: "1.3.0",
    date: "2024-06-05",
    type: "minor",
    title: "Compiler Pipeline v2 & Tree Shaking",
    description: "New multi-pass compiler with dead code elimination, effect composition analysis, and up to 60% smaller production bundles.",
    changes: [
      {
        type: "added",
        items: [
          "Multi-pass compiler pipeline with effect dependency graph analysis",
          "Dead code elimination: only emit CSS for effects actually used in your project",
          "Effect composition: combine multiple effects into a single optimized class",
          "`ferrum analyze` CLI command for bundle size estimation",
          "Source map support for compiled CSS output",
        ],
      },
      {
        type: "changed",
        items: [
          "Build performance improved by 4x through parallel CSS generation",
          "Watch mode now uses incremental compilation (only rebuilds changed effects)",
        ],
      },
      {
        type: "deprecated",
        items: [
          "`ferrum.bundle()` API deprecated in favor of automatic tree-shaking via the compiler",
        ],
      },
      {
        type: "fixed",
        items: [
          "Fixed compiler crash on effects with circular dependency references",
          "Resolved CSS specificity conflicts when composing multiple effects",
        ],
      },
    ],
  },
  {
    version: "1.2.0",
    date: "2024-03-18",
    type: "minor",
    title: "Interactive Effects & Hover System",
    description: "New hover, press, and toggle effect categories with automatic state management and smooth transition chaining.",
    changes: [
      {
        type: "added",
        items: [
          "48 new hover effects (scale, glow, tilt, border reveal, shadow lift)",
          "24 new press/active state effects",
          "Toggle effect system with enter/exit state pairs",
          "Automatic transition chaining: hover → active → hover-out sequence",
          "Vue 3 adapter with Composition API support",
        ],
      },
      {
        type: "changed",
        items: [
          "Hover effects now use `:hover` pseudo-class instead of JavaScript event listeners",
          "Improved touch device detection for hover effect fallback behavior",
        ],
      },
      {
        type: "fixed",
        items: [
          "Fixed hover effect flicker on rapid mouse enter/leave cycles",
          "Resolved toggle effect state desync in React StrictMode",
        ],
      },
    ],
  },
  {
    version: "1.1.0",
    date: "2024-01-10",
    type: "minor",
    title: "Design Tokens & Theming",
    description: "Integrated design token system with automatic CSS custom property generation and theme switching support.",
    changes: [
      {
        type: "added",
        items: [
          "Design token system: colors, spacing, typography, shadows, borders, radii",
          "Automatic CSS custom property generation from token definitions",
          "Theme switching with smooth token transitions",
          "Token CLI: `ferrum tokens export` for generating framework-specific token files",
          "30 new loading/shimmer/skeleton effects",
        ],
      },
      {
        type: "changed",
        items: [
          "Effect duration values can now reference design tokens",
          "Easing curves exported as reusable token values",
        ],
      },
      {
        type: "fixed",
        items: [
          "Fixed token inheritance in nested component trees",
          "Resolved theme transition flash on initial page load",
        ],
      },
    ],
  },
  {
    version: "1.0.0",
    date: "2023-10-01",
    type: "major",
    title: "FerrumEngine 1.0 — Initial Release",
    description: "The first stable release of FerrumEngine: 338 CSS motion effects, React and Vue adapters, and a zero-dependency runtime.",
    changes: [
      {
        type: "added",
        items: [
          "338 production-ready CSS motion effects across 23 categories",
          "React adapter with `useFerrumEffect` and `FerrumProvider`",
          "Vue 3 adapter with `v-ferrum` directive",
          "Zero runtime dependencies — pure CSS and Web Animations API",
          "Interactive playground with live preview and code export",
          "Comprehensive documentation with quickstart guides",
          "CLI tool for project initialization and effect management",
        ],
      },
      {
        type: "security",
        items: [
          "CSS output sanitization to prevent style injection via effect names",
          "Content Security Policy compatibility: no inline styles or eval()",
        ],
      },
    ],
  },
];

/* ── Change type config ── */
type ChangeType = ChangelogChange["type"];

const CHANGE_TYPE_CONFIG: Record<ChangeType, { label: string; icon: React.ElementType; color: string }> = {
  added: { label: "Added", icon: Sparkles, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  fixed: { label: "Fixed", icon: Bug, color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
  changed: { label: "Changed", icon: Wrench, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  deprecated: { label: "Deprecated", icon: AlertTriangle, color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
  removed: { label: "Removed", icon: XCircle, color: "text-red-400 bg-red-500/10 border-red-500/20" },
  security: { label: "Security", icon: ShieldCheck, color: "text-sky-400 bg-sky-500/10 border-sky-500/20" },
};

const VERSION_TYPE_CONFIG: Record<ChangelogEntry["type"], { label: string; color: string; dotColor: string }> = {
  major: { label: "Major", color: "bg-orange-500/15 text-orange-400 border-orange-500/30", dotColor: "bg-orange-400" },
  minor: { label: "Minor", color: "bg-purple-500/15 text-purple-400 border-purple-500/30", dotColor: "bg-purple-400" },
  patch: { label: "Patch", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", dotColor: "bg-emerald-400" },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ═══════════════════════════════════════════════════════════════
   CHANGELOG VIEW COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export function ChangelogView() {
  const [activeFilter, setActiveFilter] = useState<ChangeType | "all">("all");

  const filteredChangelog = changelog.map((entry) => {
    if (activeFilter === "all") return entry;
    const filteredChanges = entry.changes
      .map((change) => (change.type === activeFilter ? change : { type: change.type, items: [] }))
      .filter((c) => c.items.length > 0);
    return { ...entry, changes: filteredChanges };
  }).filter((entry) => entry.changes.length > 0);

  const latestEntry = changelog[0];
  if (!latestEntry) return null;
  const latestConfig = VERSION_TYPE_CONFIG[latestEntry.type];
  const latestAddedCount = latestEntry.changes.find((c) => c.type === "added")?.items.length ?? 0;
  const latestFixedCount = latestEntry.changes.find((c) => c.type === "fixed")?.items.length ?? 0;

  const changeTypes: (ChangeType | "all")[] = ["all", "added", "fixed", "changed", "deprecated", "removed", "security"];

  return (
    <div className="pt-20 pb-20 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="pt-12 pb-8">
          <SectionHeader
            label="Changelog"
            title="Release History"
            subtitle="Every improvement, fix, and new feature across all versions of FerrumEngine."
          />
        </div>

        {/* What's New — Latest release highlight */}
        <div className="mb-12 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/[0.06] via-transparent to-pink-500/[0.04] p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Rocket className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-foreground">What&apos;s New</h2>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${latestConfig.color}`}>
              v{latestEntry.version}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{latestEntry.title}</h3>
          <p className="text-muted-foreground/70 leading-relaxed mb-4">{latestEntry.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground/50">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(latestEntry.date)}</span>
            </div>
            {latestAddedCount > 0 && (
              <div className="flex items-center gap-1.5 text-emerald-400/70">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{latestAddedCount} new features</span>
              </div>
            )}
            {latestFixedCount > 0 && (
              <div className="flex items-center gap-1.5 text-rose-400/70">
                <Bug className="w-3.5 h-3.5" />
                <span>{latestFixedCount} fixes</span>
              </div>
            )}
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 mb-10 flex-wrap">
          <Tag className="w-4 h-4 text-muted-foreground/40" />
          {changeTypes.map((type) => {
            if (type === "all") {
              return (
                <button
                  key="all"
                  onClick={() => setActiveFilter("all")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border ${
                    activeFilter === "all"
                      ? "bg-foreground/10 text-foreground border-foreground/20"
                      : "bg-foreground/[0.03] text-muted-foreground/60 border-border/50 hover:bg-foreground/[0.05]"
                  }`}
                >
                  All
                </button>
              );
            }
            const config = CHANGE_TYPE_CONFIG[type];
            const Icon = config.icon;
            return (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  activeFilter === type
                    ? config.color
                    : "bg-foreground/[0.03] text-muted-foreground/60 border-border/50 hover:bg-foreground/[0.05]"
                }`}
              >
                <Icon className="w-3 h-3" />
                {config.label}
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border/50" />

          <div className="space-y-8">
            {filteredChangelog.map((entry) => {
              const vConfig = VERSION_TYPE_CONFIG[entry.type];
              return (
                <div key={entry.version} className="relative pl-10">
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-2 w-[31px] h-[31px] rounded-full border-2 ${vConfig.color} flex items-center justify-center bg-background`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${vConfig.dotColor}`} />
                  </div>

                  {/* Content card */}
                  <div className="rounded-2xl border border-border/50 bg-foreground/[0.015] p-5 sm:p-6 hover:bg-foreground/[0.025] transition-colors">
                    {/* Version + date header */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${vConfig.color}`}>
                        v{entry.version}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${vConfig.color}`}>
                        {vConfig.label}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground/40">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(entry.date)}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-2">{entry.title}</h3>
                    <p className="text-sm text-muted-foreground/60 leading-relaxed mb-5">{entry.description}</p>

                    {/* Change groups */}
                    <div className="space-y-4">
                      {entry.changes.map((change) => {
                        const cConfig = CHANGE_TYPE_CONFIG[change.type];
                        const CIcon = cConfig.icon;
                        return (
                          <div key={change.type}>
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-6 h-6 rounded-md flex items-center justify-center border ${cConfig.color}`}>
                                <CIcon className="w-3.5 h-3.5" />
                              </div>
                              <span className={`text-xs font-semibold ${cConfig.color.split(" ")[0]}`}>
                                {cConfig.label}
                              </span>
                              <span className="text-xs text-muted-foreground/30">({change.items.length})</span>
                            </div>
                            <ul className="space-y-1.5 ml-8">
                              {change.items.map((item, i) => (
                                <li key={i} className="text-sm text-muted-foreground/70 leading-relaxed">
                                  <span className="text-muted-foreground/30 mr-2">•</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* End of timeline */}
          <div className="relative pl-10 pt-4">
            <div className="absolute left-0 top-0 w-[31px] h-[31px] rounded-full border-2 border-border bg-background flex items-center justify-center">
              <ArrowDown className="w-3.5 h-3.5 text-muted-foreground/30" />
            </div>
            <p className="text-sm text-muted-foreground/30 italic">Earlier releases available on GitHub</p>
          </div>
        </div>
      </div>
    </div>
  );
}