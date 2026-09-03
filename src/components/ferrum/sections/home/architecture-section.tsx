import { Layers, Workflow, Cpu, ChevronDown } from "lucide-react";

/* ──────────────────────────────────────
   SECTION 5 — ARCHITECTURE
   Linear-style clean system diagram
   ────────────────────────────────────── */

const archLayers = [
  { label: "AI Agent Gateway", desc: "Structured API · Scope permissions · Audit trail · Safe AI access", color: "text-cyan-400", borderColor: "border-cyan-500/20", bgColor: "bg-cyan-500/[0.06]" },
  { label: "Change Impact Engine", desc: "Risk classification · Breaking change detection · Affected path tracing", color: "text-purple-400", borderColor: "border-purple-500/20", bgColor: "bg-purple-500/[0.06]" },
  { label: "Reliability Scoring", desc: "7 dimensions · A-F grades · Trend tracking · Recommendations", color: "text-violet-400", borderColor: "border-violet-500/20", bgColor: "bg-violet-500/[0.06]" },
  { label: "7 Analyzers", desc: "Architecture · Performance · Security · Reliability · Testing · A11y · Deps", color: "text-pink-400", borderColor: "border-pink-500/20", bgColor: "bg-pink-500/[0.06]" },
  { label: "Application Graph", desc: "22 node types · 18 edge types · Query engine · Data flow", color: "text-rose-400", borderColor: "border-rose-500/20", bgColor: "bg-rose-500/[0.06]" },
  { label: "Flight Recorder", desc: "Runtime observability · Capture · Replay · Debug", color: "text-amber-400", borderColor: "border-amber-500/20", bgColor: "bg-amber-500/[0.06]" },
  { label: "Architecture Drift", desc: "Constraint enforcement · Divergence detection · Automatic alerts", color: "text-emerald-400", borderColor: "border-emerald-500/20", bgColor: "bg-emerald-500/[0.06]" },
];

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-500/[0.015] rounded-full blur-[160px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="animate-in fade-in-0 slide-in-from-bottom-3"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-purple-400 mb-4">Architecture</p></div>
            <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.05s", animationFillMode: "both" }}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                Built like an engine.<br /><span className="text-muted-foreground/50">An intelligence engine.</span>
              </h2>
            </div>
            <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
              <p className="text-lg text-muted-foreground/60 max-w-xl leading-relaxed mt-5">
                Every layer of Ferrum is designed for insight and composition. The Application Graph
                is the foundation. Analyzers run on the graph. Scoring aggregates their findings.
                Change Impact traces paths through it. The AI Gateway exposes it all safely.
              </p>
            </div>
            <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.15s", animationFillMode: "both" }}>
              <div className="mt-8 space-y-4">
                {[
                  { icon: Layers, title: "Graph-first design", desc: "Every feature builds on the Application Graph. Query anything." },
                  { icon: Workflow, title: "Unified analysis", desc: "7 analyzers in one pass. Findings correlate across dimensions." },
                  { icon: Cpu, title: "Safe AI access", desc: "Structured API with scope permissions. Audit every AI action." },
                ].map((item) => { const Icon = item.icon; return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/15 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground/60 leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ); })}
              </div>
            </div>
          </div>

          {/* Architecture diagram */}
          <div className="animate-in fade-in-0 slide-in-from-left-3" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
            <div className="relative">
              <div className="space-y-3">
                {archLayers.map((layer, i) => (
                  <div key={layer.label} className="group">
                    <div className={`flex items-center gap-4 p-4 rounded-xl border ${layer.borderColor} ${layer.bgColor} hover:scale-[1.02] transition-transform duration-300 cursor-default`}>
                      <span className="text-[10px] font-mono text-muted-foreground/60 w-6 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-sm font-semibold ${layer.color}`}>{layer.label}</h3>
                        <p className="text-[11px] text-muted-foreground/50 mt-0.5 truncate">{layer.desc}</p>
                      </div>
                      {i < archLayers.length - 1 && (
                        <ChevronDown className="w-4 h-4 text-muted-foreground/30 rotate-[-90deg] group-hover:text-muted-foreground/50 transition-colors" />
                      )}
                    </div>
                    {i < archLayers.length - 1 && (
                      <div className="flex justify-center py-1">
                        <div className="w-px h-3 bg-border/50" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/[0.02] via-transparent to-pink-500/[0.02] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
