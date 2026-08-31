"use client";

import { LayoutGrid, Columns3, PanelLeft, Rows3, GripVertical, Columns, AlignVerticalSpaceAround, Layers, Maximize, Smartphone } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ferrum/scroll-reveal";
import { AnimatedCard } from "@/components/ferrum/animated-components";
import { spotlightMap } from "@/lib/animation-colors";

const layouts = [
  {
    name: "Dashboard",
    file: "dashboard",
    icon: LayoutGrid,
    desc: "CSS grid dashboard with sidebar, header, and main content areas. Supports multiple grid configurations and responsive breakpoints.",
    color: "blue",
    bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400",
    pill: "bg-blue-500/[0.06] border-blue-500/10 text-blue-400/50",
    classes: [".fr-dashboard", ".fr-dashboard__sidebar", ".fr-dashboard__header", ".fr-dashboard__main"],
  },
  {
    name: "Sidebar",
    file: "sidebar",
    icon: PanelLeft,
    desc: "Fixed/absolute sidebar navigation with collapsible state and hover interactions. Collapsed mini-mode with icon-only display.",
    color: "violet",
    bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400",
    pill: "bg-violet-500/[0.06] border-violet-500/10 text-violet-400/50",
    classes: [".fr-sidebar", ".fr-sidebar--collapsed", ".fr-sidebar__nav", ".fr-sidebar__link"],
  },
  {
    name: "Split Pane",
    file: "split",
    icon: Columns3,
    desc: "Split pane layout with horizontal/vertical orientation and resizable gutter. Supports min/max constraints on each pane.",
    color: "cyan",
    bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-400",
    pill: "bg-cyan-500/[0.06] border-cyan-500/10 text-cyan-400/50",
    classes: [".fr-split", ".fr-split--vertical", ".fr-split__pane", ".fr-split__gutter"],
  },
  {
    name: "Editor",
    file: "editor",
    icon: Rows3,
    desc: "Code editor layout with line numbers, content area, and optional minimap. Designed for IDE-like interfaces and code viewers.",
    color: "emerald",
    bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400",
    pill: "bg-emerald-500/[0.06] border-emerald-500/10 text-emerald-400/50",
    classes: [".fr-editor", ".fr-editor__lines", ".fr-editor__content", ".fr-editor__minimap"],
  },
  {
    name: "Kanban",
    file: "kanban",
    icon: GripVertical,
    desc: "Kanban board with horizontal scrolling columns and draggable cards. Supports multi-column layouts with auto-fit sizing.",
    color: "amber",
    bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400",
    pill: "bg-amber-500/[0.06] border-amber-500/10 text-amber-400/50",
    classes: [".fr-kanban", ".fr-kanban__column", ".fr-kanban__card", ".fr-kanban__header"],
  },
  {
    name: "Masonry",
    file: "masonry",
    icon: Layers,
    desc: "Masonry/waterfall layout using CSS columns with responsive breakpoints. Automatic gap control and break-inside management.",
    color: "pink",
    bg: "bg-pink-500/10", border: "border-pink-500/20", text: "text-pink-400",
    pill: "bg-pink-500/[0.06] border-pink-500/10 text-pink-400/50",
    classes: [".fr-masonry", ".fr-masonry--2col", ".fr-masonry--3col", ".fr-masonry__item"],
  },
  {
    name: "Grid System",
    file: "grid-layout",
    icon: Columns,
    desc: "Advanced CSS grid system with column, span, gap, and alignment utilities. Auto-fill and auto-fit responsive patterns.",
    color: "orange",
    bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-400",
    pill: "bg-orange-500/[0.06] border-orange-500/10 text-orange-400/50",
    classes: [".fr-grid", ".fr-grid--cols-2", ".fr-grid--span-2", ".fr-grid--gap-lg"],
  },
  {
    name: "Stack",
    file: "stack",
    icon: AlignVerticalSpaceAround,
    desc: "Stack layout for vertical and horizontal flex arrangement with consistent gaps. Supports nested stacks and alignment variants.",
    color: "sky",
    bg: "bg-sky-500/10", border: "border-sky-500/20", text: "text-sky-400",
    pill: "bg-sky-500/[0.06] border-sky-500/10 text-sky-400/50",
    classes: [".fr-stack", ".fr-stack--horizontal", ".fr-stack--center", ".fr-stack--gap-4"],
  },
  {
    name: "Overlay",
    file: "overlay",
    icon: Maximize,
    desc: "Full-screen overlay, modal, and drawer layout with backdrop blur and transitions. Supports top/bottom/left/right drawer variants.",
    color: "rose",
    bg: "bg-rose-500/10", border: "border-rose-500/20", text: "text-rose-400",
    pill: "bg-rose-500/[0.06] border-rose-500/10 text-rose-400/50",
    classes: [".fr-overlay", ".fr-modal", ".fr-drawer--right", ".fr-drawer--bottom"],
  },
  {
    name: "Responsive",
    file: "responsive",
    icon: Smartphone,
    desc: "Responsive container utilities, aspect ratios, viewport heights, and breakpoint visibility. Includes container query support.",
    color: "teal",
    bg: "bg-teal-500/10", border: "border-teal-500/20", text: "text-teal-400",
    pill: "bg-teal-500/[0.06] border-teal-500/10 text-teal-400/50",
    classes: [".fr-container", ".fr-aspect-video", ".fr-h-screen", ".fr-hidden-sm"],
  },
];

export function Layouts() {
  return (
    <section id="layouts" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-emerald-500/[0.03] rounded-full blur-[140px]" />
        <div className="ferrum-aurora ferrum-aurora-3 absolute bottom-0 left-1/4 w-[400px] h-[250px] bg-emerald-500/[0.04]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal>
          <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">Layout Generators</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            10 Layout Systems.{" "}
            <span className="inline-flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-amber-400/10 text-amber-400/80 border border-amber-400/15">Coming Soon</span>
            <br />
            <span className="text-muted-foreground/70">Pure CSS. Zero Dependencies.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mt-5">
            From dashboards to masonry grids, from split panes to kanban boards — every layout generates
            production-ready CSS with the <code className="text-emerald-400/50 font-mono text-sm">fr-</code> prefix.
            Tree-shakeable: import only the layouts you use.
          </p>
        </Reveal>

        <StaggerContainer className="mt-16 grid md:grid-cols-2 gap-4" delay={0.1}>
          {layouts.map((l) => {
            const sc = (spotlightMap as Record<string, {spotlight: string; glow: string}>)[l.color] ?? {spotlight: 'rgba(161,161,170,0.04)', glow: 'rgba(161,161,170,0.10)'};
            return (
            <StaggerItem key={l.name}>
              <AnimatedCard spotlightColor={sc.spotlight} glowColor={sc.glow} className={`border ${l.border} bg-foreground/[0.02] h-full`}>
                <div className="p-6 relative z-20">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/30 to-purple-500/5" />
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${l.bg} border ${l.border} flex items-center justify-center shrink-0 ferrum-icon-bounce`}>
                      <l.icon className={`w-5 h-5 ${l.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-base font-semibold ${l.text}`}>{l.name}</h3>
                        <code className="text-[10px] text-muted-foreground/60 font-mono">{l.file}.ts</code>
                      </div>
                      <p className="text-sm text-muted-foreground/50 mt-1.5 leading-relaxed">{l.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {l.classes.map((c) => (
                          <code key={c} className={`px-2 py-0.5 rounded-md border ${l.pill} text-[10px] font-mono`}>{c}</code>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </StaggerItem>
            );
          })}
        </StaggerContainer>

        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <code className="text-xs text-muted-foreground/70 font-mono bg-foreground/[0.03] px-4 py-2 rounded-lg border border-border">
              import &#123; generateLayoutCSS, generateDashboardCSS &#125; from &apos;@ferrum/layout&apos;
            </code>
          </div>
        </Reveal>
      </div>
    </section>
  );
}