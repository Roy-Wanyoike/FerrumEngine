"use client";

import {
  Cpu, Terminal, Zap, Atom, Sparkles, Blocks, Palette,
  Monitor, Bot, Cloud, Store,
  ArrowLeft, ChevronRight, Layers, Menu, X,
  type LucideIcon,
} from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";
import {
  ARCHITECTURE_SUBSYSTEMS,
  type ArchSubsystem,
} from "@/components/ferrum/architecture-data";
import { useFocusTrap } from "@/hooks/use-focus-trap";


/* ═══════════════════════════════════════════════════════════════
   CONSTANTS
   ═══════════════════════════════════════════════════════════════ */

const ICON_MAP: Record<string, LucideIcon> = {
  Cpu, Terminal, Zap, Atom, Sparkles, Blocks, Palette, Monitor, Bot, Cloud, Store,
};

type ColorStyle = { bg: string; border: string; text: string; dot: string; fill: string; fillLight: string };
type StatusStyle = { label: string; cls: string; dotCls: string };

const COLOR_STYLES: Record<string, ColorStyle> = {
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/25", text: "text-emerald-400", dot: "bg-emerald-400", fill: "rgba(16,185,129,0.12)", fillLight: "rgba(16,185,129,0.05)" },
  sky:     { bg: "bg-sky-500/10",     border: "border-sky-500/25",     text: "text-sky-400",     dot: "bg-sky-400",     fill: "rgba(14,165,233,0.12)", fillLight: "rgba(14,165,233,0.05)" },
  violet:  { bg: "bg-violet-500/10",  border: "border-violet-500/25",  text: "text-violet-400",  dot: "bg-violet-400",  fill: "rgba(139,92,246,0.12)", fillLight: "rgba(139,92,246,0.05)" },
  rose:    { bg: "bg-rose-500/10",    border: "border-rose-500/25",    text: "text-rose-400",    dot: "bg-rose-400",    fill: "rgba(244,63,94,0.12)",  fillLight: "rgba(244,63,94,0.05)" },
  pink:    { bg: "bg-pink-500/10",    border: "border-pink-500/25",    text: "text-pink-400",    dot: "bg-pink-400",    fill: "rgba(236,72,153,0.12)", fillLight: "rgba(236,72,153,0.05)" },
  blue:    { bg: "bg-blue-500/10",    border: "border-blue-500/25",    text: "text-blue-400",    dot: "bg-blue-400",    fill: "rgba(59,130,246,0.12)", fillLight: "rgba(59,130,246,0.05)" },
  amber:   { bg: "bg-amber-500/10",   border: "border-amber-500/25",   text: "text-amber-400",   dot: "bg-amber-400",   fill: "rgba(245,158,11,0.12)", fillLight: "rgba(245,158,11,0.05)" },
  purple:  { bg: "bg-purple-500/10",  border: "border-purple-500/25",  text: "text-purple-400",  dot: "bg-purple-400",  fill: "rgba(168,85,247,0.12)", fillLight: "rgba(168,85,247,0.05)" },
  orange:  { bg: "bg-orange-500/10",  border: "border-orange-500/25",  text: "text-orange-400",  dot: "bg-orange-400",  fill: "rgba(249,115,22,0.12)", fillLight: "rgba(249,115,22,0.05)" },
};

const STATUS_STYLES: Record<string, StatusStyle> = {
  stable:  { label: "Stable",  cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", dotCls: "bg-emerald-400" },
  beta:    { label: "Beta",    cls: "bg-amber-500/10 text-amber-400 border-amber-500/20", dotCls: "bg-amber-400" },
  planned: { label: "Planned", cls: "bg-foreground/[0.06] text-muted-foreground/60 border-border/60", dotCls: "bg-muted-foreground/40" },
};

const COLOR_RGB: Record<string, string> = {
  emerald: "rgb(16,185,129)",
  sky:     "rgb(14,165,233)",
  violet:  "rgb(139,92,246)",
  rose:    "rgb(244,63,94)",
  pink:    "rgb(236,72,153)",
  blue:    "rgb(59,130,246)",
  amber:   "rgb(245,158,11)",
  purple:  "rgb(168,85,247)",
  orange:  "rgb(249,115,22)",
};

const DEFAULT_COLOR: ColorStyle = { bg: "bg-emerald-500/10", border: "border-emerald-500/25", text: "text-emerald-400", dot: "bg-emerald-400", fill: "rgba(16,185,129,0.12)", fillLight: "rgba(16,185,129,0.05)" };

function getColor(color: string): ColorStyle {
  return COLOR_STYLES[color] || DEFAULT_COLOR;
}
function getStatus(status: string): StatusStyle | undefined {
  return STATUS_STYLES[status];
}

const TABS = [
  { key: "purpose",          label: "Purpose" },
  { key: "problem",          label: "Problem" },
  { key: "internalArchitecture", label: "Architecture" },
  { key: "renderingFlow",    label: "Rendering" },
  { key: "dataFlow",         label: "Data Flow" },
  { key: "algorithms",       label: "Algorithms" },
  { key: "performance",      label: "Performance" },
  { key: "accessibility",    label: "A11y" },
  { key: "browserIntegration", label: "Browser" },
  { key: "futureRoadmap",    label: "Roadmap" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

/* ═══════════════════════════════════════════════════════════════
   SVG DIAGRAM RENDERER
   ═══════════════════════════════════════════════════════════════ */

function SubsystemDiagram({ diagram, color }: { diagram: ArchSubsystem["diagram"]; color: string }) {
  const cs = getColor(color);
  const nodes = diagram.nodes;
  const edges = diagram.edges;

  const nodePositions = useMemo(() => {
    const map: Record<string, { cx: number; cy: number; w: number; h: number }> = {};
    for (const n of nodes) {
      const nw = (n.w || 12) * 8;
      const nh = (n.h || 6) * 4;
      map[n.id] = {
        cx: n.x * 8 + nw / 2,
        cy: n.y * 4 + nh / 2,
        w: nw,
        h: nh,
      };
    }
    return map;
  }, [nodes]);

  const variantFills: Record<string, string> = {
    primary: cs.fill,
    accent: cs.fillLight,
    default: "oklch(100% 0 0 / 0.03)",
    muted: "transparent",
  };

  const variantStrokes: Record<string, string> = {
    primary: cs.text.replace("text-", "").replace("400", "500/40"),
    accent: cs.text.replace("text-", "").replace("400", "500/25"),
    default: "oklch(100% 0 0 / 0.08)",
    muted: "oklch(100% 0 0 / 0.05)",
  };

  return (
    <div className="rounded-2xl border border-border/30 bg-foreground/[0.008] p-4 sm:p-6 overflow-x-auto">
      <svg
        viewBox="0 0 800 400"
        className="w-full min-w-[500px] h-auto"
        style={{ maxHeight: 420 }}
        fill="none"
      >
        <defs>
          <marker
            id="arch-arrow"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto-start-reverse"
          >
            <polygon points="0 0, 8 3, 0 6" className="fill-muted-foreground/40" />
          </marker>
          <marker
            id="arch-arrow-muted"
            markerWidth="8"
            markerHeight="6"
            refX="7"
            refY="3"
            orient="auto-start-reverse"
          >
            <polygon points="0 0, 8 3, 0 6" className="fill-muted-foreground/25" />
          </marker>
        </defs>

        {/* Grid dots background */}
        {Array.from({ length: 21 }).map((_, xi) =>
          Array.from({ length: 11 }).map((_, yi) => (
            <circle
              key={`${xi}-${yi}`}
              cx={xi * 40}
              cy={yi * 40}
              r={0.6}
              className="fill-foreground/[0.06]"
            />
          ))
        )}

        {/* Edges */}
        {edges.map((edge, i) => {
          const from = nodePositions[edge.from];
          const to = nodePositions[edge.to];
          if (!from || !to) return null;
          const isDashed = edge.style === "dashed";
          const midX = (from.cx + to.cx) / 2;
          const midY = (from.cy + to.cy) / 2;
          return (
            <g key={`edge-${i}`}>
              <line
                x1={from.cx}
                y1={from.cy}
                x2={to.cx}
                y2={to.cy}
                stroke={isDashed ? "oklch(100% 0 0 / 0.1)" : "oklch(100% 0 0 / 0.15)"}
                strokeWidth={1}
                strokeDasharray={isDashed ? "4 3" : undefined}
                markerEnd={isDashed ? "url(#arch-arrow-muted)" : "url(#arch-arrow)"}
              />
              {edge.label && (
                <text
                  x={midX}
                  y={midY - 7}
                  textAnchor="middle"
                  className="fill-muted-foreground/40"
                  fontSize={8.5}
                  fontFamily="ui-monospace, monospace"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const pos = nodePositions[node.id];
          if (!pos) return null;
          const nw = (node.w || 12) * 8;
          const nh = (node.h || 6) * 4;
          const nx = node.x * 8;
          const ny = node.y * 4;
          const isMuted = node.variant === "muted";
          return (
            <g key={node.id}>
              <rect
                x={nx}
                y={ny}
                width={nw}
                height={nh}
                rx={6}
                fill={variantFills[node.variant || "default"] || variantFills.default}
                stroke={variantStrokes[node.variant || "default"] || variantStrokes.default}
                strokeWidth={1}
                strokeDasharray={isMuted ? "3 2" : undefined}
              />
              <text
                x={nx + nw / 2}
                y={ny + nh / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                className={node.variant === "primary" ? "fill-foreground/90" : node.variant === "accent" ? "fill-foreground/80" : "fill-foreground/60"}
                fontSize={10}
                fontWeight={node.variant === "primary" ? 600 : 500}
                fontFamily={isMuted ? "ui-monospace, monospace" : "ui-sans-serif, system-ui, sans-serif"}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SIDEBAR ITEM
   ═══════════════════════════════════════════════════════════════ */

function SidebarItem({
  system,
  isActive,
  onClick,
}: {
  system: ArchSubsystem;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = ICON_MAP[system.iconName];
  const cs = getColor(system.color);

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-3 rounded-xl transition-all duration-200 group ${
        isActive
          ? `${cs.bg} border ${cs.border}`
          : "border border-transparent hover:bg-foreground/[0.025]"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
            isActive
              ? `${cs.bg} border ${cs.border}`
              : "bg-foreground/[0.03] border border-border/30 group-hover:border-border/50"
          }`}
        >
          {Icon && <Icon className={`w-4 h-4 ${isActive ? cs.text : "text-muted-foreground/50 group-hover:text-muted-foreground/70"} transition-colors`} />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-sm font-medium truncate ${isActive ? "text-foreground" : "text-muted-foreground/70 group-hover:text-foreground/90"} transition-colors`}>
              {system.name}
            </span>
          </div>
          <p className={`text-[11px] leading-snug line-clamp-2 ${isActive ? "text-muted-foreground/60" : "text-muted-foreground/60"} transition-colors`}>
            {system.tagline}
          </p>
        </div>
      </div>
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TAB CONTENT RENDERERS
   ═══════════════════════════════════════════════════════════════ */

function TabContent({ tabKey, system }: { tabKey: TabKey; system: ArchSubsystem }) {
  const cs = getColor(system.color);

  if (tabKey === "futureRoadmap") {
    return (
      <div className="space-y-3">
        {system.futureRoadmap.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <ChevronRight className={`w-4 h-4 ${cs.text} mt-0.5 shrink-0 opacity-60`} />
            <span className="text-sm text-muted-foreground/70 leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    );
  }

  if (tabKey === "internalArchitecture") {
    return (
      <div className="space-y-6">
        <SubsystemDiagram diagram={system.diagram} color={system.color} />
        <div className="text-sm text-muted-foreground/70 leading-relaxed max-w-4xl space-y-4">
          {system.internalArchitecture.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    );
  }

  const content = system[tabKey] as string;
  if (!content) return null;

  return (
    <div className="text-sm text-muted-foreground/70 leading-relaxed max-w-4xl space-y-4">
      {content.split("\n\n").map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

interface ArchitectureDeepDiveProps {
  onBack: () => void;
}

export function ArchitectureDeepDive({ onBack }: ArchitectureDeepDiveProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("purpose");
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabScrollRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const active = useMemo(
    () => ARCHITECTURE_SUBSYSTEMS.find((s) => s.id === activeId) || null,
    [activeId]
  );

  const cs = active ? getColor(active.color) : null;
  const st = active ? getStatus(active.status) : null;

  // Save previous focus on mount
  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    return () => {
      previousFocusRef.current?.focus();
    };
  }, []);

  // Reset tab when switching subsystems
  useEffect(() => {
    setActiveTab("purpose");
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [activeId]);

  // Scroll active tab into view
  useEffect(() => {
    if (tabScrollRef.current) {
      const tabEl = tabScrollRef.current.querySelector(`[data-tab="${activeTab}"]`);
      tabEl?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeTab]);

  // Focus trap + Escape
  useFocusTrap(overlayRef, true, {
    onEscape: () => {
      if (mobileSidebar) {
        setMobileSidebar(false);
      } else {
        previousFocusRef.current?.focus();
        onBack();
      }
    },
  });

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-background flex flex-col overflow-hidden"
      tabIndex={-1}
      autoFocus
    >
      {/* ─── Top Bar ─── */}
      <div className="h-12 shrink-0 border-b border-border/40 flex items-center px-4 gap-3 bg-background/95 backdrop-blur-sm z-20">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-muted-foreground/60 hover:text-foreground transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Architecture</span>
        </button>

        <div className="w-px h-5 bg-border/40 hidden sm:block" />

        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setMobileSidebar(!mobileSidebar)}
          className="sm:hidden flex items-center justify-center w-7 h-7 rounded-lg hover:bg-foreground/[0.04] transition-colors"
        >
          {mobileSidebar ? <X className="w-4 h-4 text-muted-foreground/60" /> : <Menu className="w-4 h-4 text-muted-foreground/60" />}
        </button>

        {/* Subsystem name */}
        {active && (
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-semibold text-foreground truncate">{active.name}</span>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${st?.cls}`}>
              {st?.label}
            </span>
          </div>
        )}
      </div>

      {/* ─── Main Layout ─── */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile sidebar overlay */}
        {mobileSidebar && (
          <div
            className="sm:hidden fixed inset-0 z-30 bg-black/40"
            onClick={() => setMobileSidebar(false)}
          />
        )}

        {/* ─── Sidebar ─── */}
        <aside
          className={`
            shrink-0 border-r border-border/40 bg-background overflow-y-auto
            w-[280px]
            ${mobileSidebar ? "sm:hidden fixed inset-y-0 left-0 z-40 w-[280px] pt-12" : "hidden sm:flex"}
            flex-col
          `}
        >
          <div className="p-4 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60 mb-3 px-1">
              Subsystems
            </p>
            <div className="space-y-1.5">
              {ARCHITECTURE_SUBSYSTEMS.map((sys) => (
                <SidebarItem
                  key={sys.id}
                  system={sys}
                  isActive={activeId === sys.id}
                  onClick={() => {
                    setActiveId(sys.id);
                    setMobileSidebar(false);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-border/30">
            <p className="text-[10px] text-muted-foreground/60 font-mono">
              Ferrum Architecture v2.0
            </p>
            <p className="text-[10px] text-muted-foreground/50 mt-0.5">
              10 subsystems &middot; 10 sections each
            </p>
          </div>
        </aside>

        {/* ─── Content Area ─── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {active ? (
            <>
              {/* Subsystem header */}
              <div className="shrink-0 px-6 sm:px-8 pt-6 pb-5 border-b border-border/30">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${st?.cls}`}>
                    {st?.label}
                  </span>
                  <span className="text-[11px] text-muted-foreground/60 font-mono">{active.id}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  {active.name}
                </h1>
                <p className="text-base text-muted-foreground/60 mt-1">{active.tagline}</p>
                <p className="text-sm text-muted-foreground/50 leading-relaxed mt-3 max-w-3xl">
                  {active.overview}
                </p>
              </div>

              {/* Tab bar */}
              <div className="shrink-0 border-b border-border/30 bg-background/80 backdrop-blur-sm z-10">
                <div
                  ref={tabScrollRef}
                  className="flex overflow-x-auto no-scrollbar"
                >
                  {TABS.map((tab) => (
                    <button
                      key={tab.key}
                      data-tab={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`
                        shrink-0 px-4 py-2.5 text-xs font-medium transition-all duration-200 relative
                        ${activeTab === tab.key
                          ? `text-foreground`
                          : "text-muted-foreground/45 hover:text-muted-foreground/70"
                        }
                      `}
                    >
                      {tab.label}
                      {activeTab === tab.key && cs && (
                        <span
                          className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                          style={{
                            backgroundColor: COLOR_RGB[active.color] || "rgb(148,163,184)",
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab content */}
              <div ref={contentRef} className="flex-1 overflow-y-auto p-6 sm:p-8">
                <TabContent tabKey={activeTab} system={active} />
              </div>
            </>
          ) : (
            /* ─── Empty state ─── */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-sm px-6">
                <div className="w-16 h-16 rounded-2xl bg-foreground/[0.03] border border-border/30 flex items-center justify-center mx-auto mb-5">
                  <Layers className="w-7 h-7 text-muted-foreground/25" />
                </div>
                <h3 className="text-lg font-semibold text-foreground/80 mb-2">
                  Select a subsystem
                </h3>
                <p className="text-sm text-muted-foreground/45 leading-relaxed">
                  Choose a subsystem from the sidebar to explore its internal architecture, algorithms, performance characteristics, and browser integration details.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}