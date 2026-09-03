/* ═══════════════════════════════════════════════════════════════
   VIEW META — per-view SEO title and description
   Used by the SPA router to update document.title and meta tags.
   ═══════════════════════════════════════════════════════════════ */

import type { ViewId } from "@/lib/types";

export const VIEW_META: Record<string, { title: string; description: string }> = {
  home: {
    title: "FerrumEngine — Frontend Intelligence & Reliability Engine",
    description: "FerrumEngine: Application Graph, 7 Analyzers, Reliability Scoring, Change Impact Analysis, AI Agent Gateway. Engineer reliable frontends.",
  },
  principles: {
    title: "Design Principles — FerrumEngine",
    description: "The seven core principles behind FerrumEngine: Intent over implementation, Motion has meaning, Performance First, and Universal Compatibility.",
  },
  architecture: {
    title: "Architecture Deep Dive — FerrumEngine",
    description: "Inside FerrumEngine's 9-pass compiler pipeline, zero-dependency runtime, and layered architecture for motion, VFX, and design tokens.",
  },
  "platform-architecture": {
    title: "Platform Architecture — FerrumEngine",
    description: "Explore FerrumEngine's full platform: core engines, build system, intelligence layer, and ecosystem of 20+ packages working as one unified system.",
  },
  "hall-of-fame": {
    title: "Hall of Fame — FerrumEngine",
    description: "Planned flagship demos showcasing the full power of the FerrumEngine effects platform.",
  },
  showcase: {
    title: "Showcase Gallery — FerrumEngine",
    description: "Real-world projects and demos built with FerrumEngine's Intelligence Engine. See what developers ship with Application Graph and 7 Analyzers.",
  },
  learning: {
    title: "Learning Center — FerrumEngine",
    description: "Master interface engineering: animation principles, GPU acceleration, performance optimization, and framework-agnostic CSS techniques.",
  },
  story: {
    title: "Why Ferrum Exists — FerrumEngine",
    description: "The story behind FerrumEngine: why the web needs a unified UI platform that replaces the fragmented toolchain with one coherent engine.",
  },
  enterprise: {
    title: "Ferrum Enterprise — Teams at Scale",
    description: "Enterprise roadmap for FerrumEngine: planned capabilities for SOC 2 compliance, team governance, design system management, and advanced analytics for large organizations.",
  },
  "enterprise-components": {
    title: "Enterprise Components — FerrumEngine",
    description: "Production-ready enterprise UI components with ARIA accessibility, theme-awareness, and framework adapters built on a zero-dependency core.",
  },
  vision: {
    title: "Vision & Manifesto — FerrumEngine",
    description: "The FerrumEngine manifesto: our vision for intelligent, unified web UI where motion, accessibility, and AI-generated interfaces converge.",
  },
  community: {
    title: "Community — FerrumEngine",
    description: "Join the FerrumEngine open-source community: contribute on GitHub, discuss ideas, and help build the universal UI platform.",
  },
  effects: {
    title: "Intelligence Engine — 7 Analyzers — FerrumEngine",
    description: "Explore FerrumEngine's 7 analyzers: architecture, performance, security, reliability, testing, accessibility, and dependencies. Application Graph with 22 node types and 18 edge types.",
  },
  docs: {
    title: "Documentation — FerrumEngine",
    description: "FerrumEngine docs: installation, quickstart guides, API reference, 9 framework adapters, CLI usage, and design token configuration.",
  },
  playground: {
    title: "Intelligence Playground — FerrumEngine",
    description: "Interactive playground: explore Application Graph, run analyzers, view reliability scores, and inspect change impact analysis in real time.",
  },
  blog: {
    title: "Blog — FerrumEngine",
    description: "Latest news, engineering deep-dives, and release announcements from the FerrumEngine team.",
  },
  changelog: {
    title: "Changelog — FerrumEngine",
    description: "FerrumEngine release history: new features, bug fixes, and improvements across all versions.",
  },
  "interactive-docs": {
    title: "Interactive Docs — Learn by Doing — FerrumEngine",
    description: "Hands-on interactive lessons for FerrumEngine effects. Edit code, see live results, and master CSS motion.",
  },
  "component-catalog": {
    title: "Component Catalog — FerrumEngine",
    description: "Visual catalog of all UI components: Button, Badge, Card, Input, Select, Slider, Tooltip, Table, and more. With props documentation and code snippets.",
  },
};

/* ═══════════════════════════════════════════════════════════════
   URL → ViewId mapping
   ═══════════════════════════════════════════════════════════════ */

export const VALID_VIEWS: ViewId[] = [
  "home", "principles", "architecture", "platform-architecture",
  "hall-of-fame", "showcase", "learning", "community", "story",
  "enterprise", "enterprise-components", "vision",
  "effects", "docs", "playground", "blog", "changelog",
  "interactive-docs", "component-catalog",
];

export function pathnameToView(pathname: string): ViewId | null {
  const segment = pathname.replace(/^\//, "").replace(/\/+$/, "");
  if (segment === "" || segment === "home") return "home";
  if (VALID_VIEWS.includes(segment as ViewId)) return segment as ViewId;
  return null;
}
