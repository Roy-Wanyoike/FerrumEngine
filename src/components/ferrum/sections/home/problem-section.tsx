import { ArrowRight, Timer, Puzzle, Gauge, Shield, Cpu, AlertTriangle } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — THE PROBLEM
   Stripe-style problem statement — "Why now?"
   ═══════════════════════════════════════════════════════════════ */

const problems = [
  { icon: Timer, title: "Flying blind in production", description: "Frontends ship without visibility. No reliability scores, no impact analysis, no understanding of what breaks when you change a component. Teams discover regressions in production — after users do." },
  { icon: Puzzle, title: "Fragmented tooling", description: "ESLint for code quality. Lighthouse for performance. npm audit for security. axe for accessibility. Each runs in isolation, produces different output formats, and can't correlate findings across dimensions." },
  { icon: Gauge, title: "No reliability measure", description: "Teams say 'it feels stable' or 'we haven't had bugs lately'. There's no objective, reproducible score that says your frontend is a B+ on reliability — and tells you exactly what to fix to get to A." },
  { icon: Shield, title: "Change impact is guesswork", description: "Who knows what breaks when you refactor this utility? Without an application graph, impact analysis is tribal knowledge and hope. PR reviews catch syntax errors, not architectural regressions." },
  { icon: Cpu, title: "AI tools need guardrails", description: "AI coding agents can modify codebases at scale, but they lack scoped access and structured APIs. Without an intelligence layer, AI changes are uncontrolled — fast but dangerous." },
  { icon: AlertTriangle, title: "Architecture drift accumulates", description: "Codebases slowly diverge from intended architecture. Components bypass abstraction layers. Dependencies form cycles. Nobody notices until the refactor costs 10x what it should." },
];

export function ProblemSection() {
  return (
    <section id="problem" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 right-0 w-[600px] h-[400px] bg-pink-500/[0.02] rounded-full blur-[140px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="animate-in fade-in-0 slide-in-from-bottom-3">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-purple-400 mb-4">The Problem</p>
        </div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.05s", animationFillMode: "both" }}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight max-w-3xl">
            The web moved forward.<br /><span className="text-muted-foreground/50">Our intelligence didn&apos;t.</span>
          </h2>
        </div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
          <p className="text-lg text-muted-foreground/60 max-w-2xl leading-relaxed mt-6">
            Modern frontends are complex graphs of components, routes, and dependencies — yet teams
            manage them with linters and hope. There&apos;s no reliability score, no impact analysis,
            no way to predict what breaks. The gap between what we ship and what we understand
            is growing — and it&apos;s growing fast.
          </p>
        </div>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="animate-in fade-in-0 slide-in-from-bottom-2">
                <div className="group p-6 rounded-2xl border border-border/50 bg-foreground/[0.015] hover:bg-foreground/[0.03] transition-all duration-300 h-full">
                  <div className="w-10 h-10 rounded-xl bg-foreground/[0.05] border border-border/50 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-muted-foreground/50 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground/70 leading-relaxed">{p.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.15s", animationFillMode: "both" }}>
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-purple-500/15 bg-purple-500/[0.03]">
              <ArrowRight className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-foreground/70">Ferrum is the answer to every one of these problems.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
