// Type-strict compliance: fixed noUncheckedIndexedAccess
"use client";

import {
  Cpu, Zap, Eye, Terminal, Palette, Bot, Cloud, Monitor,
  ArrowRight, Layers, Shield, Blocks,
  Sparkles, Wrench, Check,
} from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "./section-helpers";

/* ═══════════════════════════════════════════════════════════════
   PLATFORM ARCHITECTURE PAGE
   Shows the entire ecosystem with diagrams & relationships
   ═══════════════════════════════════════════════════════════════ */

interface ArchNode {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  description: string;
  status: "stable" | "beta" | "soon";
  connections: string[];
}

const nodes: ArchNode[] = [
  { id: "runtime", name: "Ferrum Runtime", icon: Cpu, color: "cyan", description: "Zero-dependency execution layer. Framework-agnostic core with hot-swap and tree-shaking.", status: "stable", connections: ["motion", "physics", "vfx", "components", "tokens", "compiler"] },
  { id: "motion", name: "Ferrum Motion", icon: Zap, color: "violet", description: "Spring physics engine, timeline composition, gesture recognition, and scroll-driven animations.", status: "stable", connections: ["runtime", "physics"] },
  { id: "physics", name: "Ferrum Physics", icon: Sparkles, color: "rose", description: "Realistic forces, collision detection, constraint solver, and rigid/soft body dynamics.", status: "stable", connections: ["motion", "vfx"] },
  { id: "vfx", name: "Ferrum VFX", icon: Eye, color: "pink", description: "Visual effects engine with glass morphism, atmospheric effects, distortion shaders, and particle systems.", status: "stable", connections: ["runtime", "physics", "components"] },
  { id: "components", name: "Ferrum Components", icon: Blocks, color: "blue", description: "16 semantic UI primitives. Accessible by default, theme-aware, and composable.", status: "stable", connections: ["runtime", "vfx", "tokens"] },
  { id: "tokens", name: "Ferrum Tokens", icon: Palette, color: "amber", description: "Unified design token system with 16 semantic scales and 5 output transforms.", status: "stable", connections: ["components", "compiler"] },
  { id: "compiler", name: "Ferrum Compiler", icon: Terminal, color: "sky", description: "9-pass optimization pipeline: parse, analyze, tree-shake, dead-code eliminate, optimize output.", status: "beta", connections: ["runtime", "tokens", "ai"] },
  { id: "ai", name: "Ferrum AI", icon: Bot, color: "purple", description: "Intent-to-render intelligence. Natural language to UI, effect recommendation, code generation.", status: "soon", connections: ["compiler", "studio"] },
  { id: "studio", name: "Ferrum Studio", icon: Monitor, color: "pink", description: "Visual interface builder with drag-and-drop canvas, live preview, and export to code.", status: "soon", connections: ["ai", "cloud"] },
  { id: "cloud", name: "Ferrum Cloud", icon: Cloud, color: "sky", description: "One-click deploy, edge CDN distribution, analytics dashboard, and team collaboration.", status: "soon", connections: ["studio"] },
];

const colorStyles: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/25", text: "text-cyan-400", dot: "bg-cyan-400" },
  violet: { bg: "bg-violet-500/10", border: "border-violet-500/25", text: "text-violet-400", dot: "bg-violet-400" },
  rose: { bg: "bg-rose-500/10", border: "border-rose-500/25", text: "text-rose-400", dot: "bg-rose-400" },
  pink: { bg: "bg-pink-500/10", border: "border-pink-500/25", text: "text-pink-400", dot: "bg-pink-400" },
  blue: { bg: "bg-blue-500/10", border: "border-blue-500/25", text: "text-blue-400", dot: "bg-blue-400" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/25", text: "text-amber-400", dot: "bg-amber-400" },
  sky: { bg: "bg-sky-500/10", border: "border-sky-500/25", text: "text-sky-400", dot: "bg-sky-400" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/25", text: "text-purple-400", dot: "bg-purple-400" },
};

const statusBadge: Record<string, { label: string; cls: string }> = {
  stable: { label: "Stable", cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  beta: { label: "Beta", cls: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  soon: { label: "Planned", cls: "bg-foreground/[0.06] text-muted-foreground/60 border-border" },
};

/* ─── Dependency Diagram ─── */
function DependencyDiagram({ selectedNode, onSelectNode }: { selectedNode: string | null; onSelectNode: (id: string | null) => void }) {
  const selected = nodes.find((n) => n.id === selectedNode);
  const connectedIds = selected ? new Set([selected.id, ...selected.connections]) : null;

  return (
    <div className="space-y-2">
      {nodes.map((node) => {
        const Icon = node.icon;
        const cs = colorStyles[node.color] ?? colorStyles.cyan!;
        const isHighlighted = !connectedIds || connectedIds.has(node.id);
        const isSelected = node.id === selectedNode;
        const st = statusBadge[node.status] ?? statusBadge.stable!;
        return (
          <button
            key={node.id}
            onClick={() => onSelectNode(isSelected ? null : node.id)}
            className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 ${
              isSelected
                ? `${cs.bg} ${cs.border} border`
                : isHighlighted
                  ? "border-border/50 bg-foreground/[0.02] hover:bg-foreground/[0.04]"
                  : "border-border/30 bg-foreground/[0.01] opacity-40"
            }`}
          >
            <div className={`w-8 h-8 rounded-lg ${cs.bg} border ${cs.border} flex items-center justify-center shrink-0`}>
              <Icon className={`w-4 h-4 ${cs.text}`} />
            </div>
            <span className={`text-sm font-medium flex-1 ${isSelected ? "text-foreground" : "text-muted-foreground/70"}`}>{node.name}</span>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${st.cls}`}>{st.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Data Flow Visualization ─── */
function DataFlowDiagram() {
  const steps = [
    { label: "Developer writes intent", icon: Wrench, desc: "roycss-float, roycss-glow, spring()" },
    { label: "Runtime resolves", icon: Cpu, desc: "Framework adapter + CSS generation" },
    { label: "Compiler optimizes", icon: Terminal, desc: "Tree-shake, dead-code elimination" },
    { label: "Tokens apply theme", icon: Palette, desc: "Semantic scales → CSS custom props" },
    { label: "Browser renders", icon: Monitor, desc: "GPU-accelerated, 60fps output" },
  ];

  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
      <div className="mt-16 p-6 sm:p-8 rounded-2xl border border-border/40 bg-foreground/[0.01]">
        <h2 className="text-lg font-bold text-foreground mb-2">Data Flow Pipeline</h2>
        <p className="text-sm text-muted-foreground/70 mb-8">From developer intent to pixel-perfect output in five stages.</p>
        <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.label} className="flex items-center gap-3 sm:gap-0 sm:flex-1">
                <div className="flex-1 p-4 rounded-xl bg-foreground/[0.02] border border-border/40 hover:border-purple-500/20 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground/50">0{i + 1}</span>
                  </div>
                  <p className="text-xs font-semibold text-foreground/80 mb-1">{step.label}</p>
                  <p className="text-[11px] text-muted-foreground/60 leading-relaxed">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-muted-foreground/40 shrink-0 hidden sm:block mx-1" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Integration Matrix ─── */
function IntegrationMatrix() {
  const frameworks = [
    { name: "React", status: "stable" },
    { name: "Vue", status: "stable" },
    { name: "Svelte", status: "stable" },
    { name: "Angular", status: "stable" },
    { name: "Next.js", status: "stable" },
    { name: "Nuxt", status: "stable" },
    { name: "Astro", status: "stable" },
    { name: "Vanilla", status: "stable" },
    { name: "Solid", status: "beta" },
  ];

  const stCls: Record<string, string> = {
    stable: "bg-emerald-500/10 text-emerald-400",
    beta: "bg-amber-500/10 text-amber-400",
  };

  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.15s", animationFillMode: "both" }}>
      <div className="mt-8 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
        {frameworks.map((fw) => (
          <div key={fw.name} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border/40 bg-foreground/[0.015] hover:bg-foreground/[0.03] transition-colors">
            <span className="text-xs font-medium text-foreground/80">{fw.name}</span>
            <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${stCls[fw.status] ?? ""}`}>{fw.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── EXPORTED PAGE ─── */
export function PlatformArchitecture() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const selected = nodes.find((n) => n.id === selectedNode);

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <SectionHeader
          label="Architecture"
          title="Platform Architecture"
          subtitle="Ferrum is not a single library. It is an integrated platform of 10 subsystems, each independently useful but exponentially more powerful together. Click any subsystem to explore its connections."
        />

        {/* Interactive Architecture Diagram */}
        <div className="mt-16 grid lg:grid-cols-5 gap-8">
          {/* Node list */}
          <div className="lg:col-span-2">
            <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
              <h2 className="text-sm font-semibold text-foreground mb-4">Subsystem Dependencies</h2>
              <p className="text-xs text-muted-foreground/60 mb-4">Click a subsystem to highlight its connections.</p>
              <DependencyDiagram selectedNode={selectedNode} onSelectNode={setSelectedNode} />
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-3">
            <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.15s", animationFillMode: "both" }}>
              {selected ? (
                <div className="border border-border/40 bg-foreground/[0.015] h-full rounded-2xl">
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl ${colorStyles[selected.color]?.bg} border ${colorStyles[selected.color]?.border} flex items-center justify-center`}>
                        {(() => { const I = selected.icon; return <I className={`w-6 h-6 ${colorStyles[selected.color]?.text}`} />; })()}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">{selected.name}</h2>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusBadge[selected.status]?.cls ?? ""}`}>
                            {statusBadge[selected.status]?.label ?? selected.status}
                          </span>
                          <span className="text-xs text-muted-foreground/60">{selected.connections.length} connections</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground/70 leading-relaxed mb-8">{selected.description}</p>

                    <h4 className="text-xs font-semibold text-foreground/80 uppercase tracking-wider mb-3">Connected Subsystems</h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.connections.map((connId) => {
                        const conn = nodes.find((n) => n.id === connId);
                        if (!conn) return null;
                        const ConnIcon = conn.icon;
                        const cs = colorStyles[conn.color] ?? colorStyles.cyan!;
                        return (
                          <button
                            key={connId}
                            onClick={() => setSelectedNode(connId)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${cs.border} ${cs.bg} hover:opacity-80 transition-opacity`}
                          >
                            <ConnIcon className={`w-3.5 h-3.5 ${cs.text}`} />
                            <span className="text-xs font-medium text-foreground/80">{conn.name}</span>
                            <ArrowRight className="w-3 h-3 text-muted-foreground/40" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full min-h-[300px] rounded-2xl border border-border/40 bg-foreground/[0.01] flex items-center justify-center">
                  <div className="text-center">
                    <Layers className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground/50">Select a subsystem to explore</p>
                    <p className="text-xs text-muted-foreground/50 mt-1">Click any item from the list</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Data Flow */}
        <DataFlowDiagram />

        {/* Framework Adapters */}
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
          <div className="mt-16">
            <h2 className="text-lg font-bold text-foreground mb-2">Framework Adapters</h2>
            <p className="text-sm text-muted-foreground/70 mb-6">First-class integration with 9 framework adapters.</p>
            <IntegrationMatrix />
          </div>
        </div>

        {/* Design Principles */}
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
          <div className="mt-16 p-6 sm:p-8 rounded-2xl border border-purple-500/15 bg-purple-500/[0.03]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground mb-2">Design Philosophy</h2>
                <p className="text-sm text-muted-foreground/70 leading-relaxed mb-4">
                  Every subsystem in Ferrum follows three core principles: CSS-first rendering
                  (no JS required for basic effects), progressive enhancement (works without
                  JavaScript, better with it), and framework independence (the CSS layer works
                  everywhere, adapters add first-class integration).
                </p>
                <div className="flex flex-wrap gap-2">
                  {["CSS-First", "Progressive Enhancement", "Framework Independent", "Tree-Shakeable", "Accessible by Default", "GPU-Accelerated"].map((p) => (
                    <span key={p} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-foreground/[0.04] border border-border/40 text-xs text-muted-foreground/70">
                      <Check className="w-3 h-3 text-purple-400" />
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
