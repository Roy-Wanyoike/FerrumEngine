import { Zap, Eye, Blocks, Terminal, Check, type LucideIcon } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — PLATFORM OVERVIEW
   Apple product-grid style — 4 pillars
   ═══════════════════════════════════════════════════════════════ */

type PillarColor = "violet" | "pink" | "cyan" | "amber";

type PillarStyle = { bg: string; border: string; text: string; iconBg: string };

const pillarColors: Record<PillarColor, PillarStyle> = {
  violet: { bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400", iconBg: "bg-violet-500/20" },
  pink: { bg: "bg-pink-500/10", border: "border-pink-500/20", text: "text-pink-400", iconBg: "bg-pink-500/20" },
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-400", iconBg: "bg-cyan-500/20" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", iconBg: "bg-amber-500/20" },
};

interface Pillar {
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  color: PillarColor;
}

const pillars: Pillar[] = [
  {
    icon: Zap, title: "Application Graph", tagline: "Map your entire frontend as a queryable graph",
    description: "22 node types and 18 edge types capture every component, route, dependency, and relationship. Query the graph to understand impact, find orphans, and trace data flows. The foundation for all other analyzers.",
    features: ["22 node types", "18 edge types", "Query language", "Dependency tracing", "Orphan detection", "Data flow analysis"],
    color: "violet",
  },
  {
    icon: Eye, title: "7 Analyzers", tagline: "One pass, seven dimensions of insight",
    description: "Architecture, performance, security, reliability, testing, accessibility, and dependency analysis — all running in a single unified pass. Each analyzer produces structured, actionable findings that feed into reliability scoring.",
    features: ["Architecture analyzer", "Performance profiler", "Security scanner", "Reliability assessor", "Testing analyzer", "Accessibility audit", "Dependency checker"],
    color: "pink",
  },
  {
    icon: Blocks, title: "Reliability Scoring", tagline: "A-F grades across 7 dimensions",
    description: "Score your frontend's reliability across architecture, performance, security, testing, accessibility, dependencies, and code quality. Get an overall grade and per-dimension breakdown. Track scores over time to measure improvement.",
    features: ["7 scoring dimensions", "A-F grade scale", "Per-dimension breakdown", "Trend tracking", "Configurable weights", "Actionable recommendations"],
    color: "cyan",
  },
  {
    icon: Terminal, title: "Change Impact & AI Gateway", tagline: "Predict breakage. Enable AI safely.",
    description: "Classify every change by risk level — breaking, degraded, or safe. The AI Agent Gateway exposes structured APIs with scope permissions so AI tools can analyze and improve codebases without unrestricted access.",
    features: ["Risk classification", "Breaking change detection", "Structured API", "Scope permissions", "Audit trail", "Safe AI integration"],
    color: "amber",
  },
];

export function PlatformOverviewSection() {
  return (
    <section id="platform" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-violet-500/[0.02] rounded-full blur-[160px]" />
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[300px] bg-cyan-500/[0.015] rounded-full blur-[120px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="animate-in fade-in-0 slide-in-from-bottom-3"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-purple-400 mb-4">Platform</p></div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.05s", animationFillMode: "both" }}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight max-w-3xl">
            Four pillars.<br /><span className="text-muted-foreground/50">One intelligence engine.</span>
          </h2>
        </div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
          <p className="text-lg text-muted-foreground/60 max-w-2xl leading-relaxed mt-5">
            Ferrum isn&apos;t a collection of linters. It&apos;s an intelligence engine where graph analysis,
            reliability scoring, change impact, and AI gateway work together by design — not by
            integration. Run one command. Get the full picture.
          </p>
        </div>
        <div className="mt-16 grid md:grid-cols-2 gap-5">
          {pillars.map((p) => {
            const Icon = p.icon;
            const c = pillarColors[p.color];
            return (
              <div key={p.title} className="animate-in fade-in-0 slide-in-from-bottom-2">
                <div className="rounded-2xl border border-border/50 bg-foreground/[0.01] hover:border-border/80 transition-all duration-300 h-full">
                  <div className="relative z-20 p-6 sm:p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-2xl ${c.iconBg} ${c.border} border flex items-center justify-center`}><Icon className={`w-6 h-6 ${c.text}`} /></div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
                        <p className={`text-xs ${c.text} font-medium`}>{p.tagline}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground/70 leading-relaxed mb-5">{p.description}</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {p.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-[11px] text-muted-foreground/50">
                          <Check className={`w-3 h-3 ${c.text} shrink-0 opacity-60`} />{f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
