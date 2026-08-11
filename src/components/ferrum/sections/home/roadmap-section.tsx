/* ═══════════════════════════════════════════════════════════════
   SECTION 9 — ROADMAP — Server Component (CSS-only animations)
   ═══════════════════════════════════════════════════════════════ */

const roadmapItems = [
  { name: "Ferrum Tokens", status: "Stable" },
  { name: "Ferrum Core", status: "Stable" },
  { name: "Ferrum Motion", status: "Stable" },
  { name: "Framework Adapters (9)", status: "Stable" },
  { name: "Ferrum VFX", status: "Beta" },
  { name: "Ferrum Motion Engine", status: "Beta" },
  { name: "Ferrum Compiler", status: "Beta" },
  { name: "Ferrum Paint (Houdini)", status: "Beta" },
  { name: "Ferrum Layout", status: "Beta" },
  { name: "Ferrum A11y", status: "Beta" },
  { name: "Ferrum CLI", status: "Alpha" },
  { name: "Ferrum Plugin SDK", status: "Alpha" },
  { name: "Ferrum Studio", status: "Planned" },
  { name: "Ferrum AI", status: "Research" },
];

const roadmapStatusStyles: Record<string, string> = {
  Stable: "bg-green-500/10 text-green-400 border-green-500/20",
  Beta: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Alpha: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Research: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Planned: "bg-foreground/[0.06] text-muted-foreground/70 border-border",
};

/* CSS-only reveal — uses @starting-style + scroll-driven animation for browsers
   that support it, gracefully degrades to visible for others */
function SR({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <div
      className={`animate-in fade-in-0 slide-in-from-bottom-3 ${className}`}
      style={{ animationDelay: `${delay}s`, animationFillMode: "both" }}
    >
      {children}
    </div>
  );
}

export function RoadmapSection() {
  return (
    <section id="roadmap" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-1">
            <SR><p className="text-xs font-semibold uppercase tracking-[0.15em] text-purple-400 mb-4">Roadmap</p></SR>
            <SR delay={0.05}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">What&apos;s next.</h2>
            </SR>
            <SR delay={0.1}>
              <p className="text-sm text-muted-foreground/80 leading-relaxed mt-4">
                14 packages across 4 maturity tiers — from production-stable core
                to experimental AI research. Every subsystem is independently useful.
                Together, they form the most ambitious UI platform in the open-source ecosystem.
              </p>
            </SR>
            <SR delay={0.15}>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground/50">
                  <div className="w-2 h-2 rounded-full bg-green-400" /> Stable
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground/50">
                  <div className="w-2 h-2 rounded-full bg-blue-400" /> Beta
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground/50">
                  <div className="w-2 h-2 rounded-full bg-amber-400" /> Alpha
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground/50">
                  <div className="w-2 h-2 rounded-full bg-purple-400" /> Research
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground/50">
                  <div className="w-2 h-2 rounded-full bg-foreground/30 border border-border" /> Planned
                </div>
              </div>
            </SR>
          </div>
          <div className="lg:col-span-2">
            <SR delay={0.1}>
              <div className="grid sm:grid-cols-2 gap-3">
                {roadmapItems.map(({ name, status }) => (
                  <div key={name} className="flex items-center justify-between py-3 px-4 rounded-xl border border-border/50 bg-foreground/[0.01] hover:bg-foreground/[0.04] transition-all duration-300">
                    <span className="text-sm text-muted-foreground/80">{name}</span>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${roadmapStatusStyles[status] || roadmapStatusStyles.Planned}`}>
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </SR>
          </div>
        </div>
      </div>
    </section>
  );
}
