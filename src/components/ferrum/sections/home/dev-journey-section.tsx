import { Package, Settings, Braces, Rocket } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   SECTION 6 — DEVELOPER JOURNEY
   Stripe-style 4-step onboarding flow
   ═══════════════════════════════════════════════════════════════ */

const journeySteps = [
  {
    num: "01", icon: Package, title: "Install",
    desc: "One line. Zero config. Ferrum detects your framework and adapts automatically.",
    code: "npm install @ferrum-ui/core",
    highlight: "Install",
  },
  {
    num: "02", icon: Settings, title: "Configure",
    desc: "Declare your design tokens once. Ferrum generates CSS, SCSS, JSON, TypeScript, and Tailwind configs automatically.",
    code: 'ferrum init --tokens --framework react',
    highlight: "init",
  },
  {
    num: "03", icon: Braces, title: "Build",
    desc: "Apply effects with utility classes. Compose semantic components. Wire up motion with hooks. Everything just works together.",
    code: '<div class="roycss-float roycss-glass roycss-spring">\n  <Card />\n</div>',
    highlight: "roycss-",
  },
  {
    num: "04", icon: Rocket, title: "Ship",
    desc: "The compiler optimizes your output — tree-shaking unused effects, eliminating dead code, and minifying the result.",
    code: "ferrum build --optimize",
    highlight: "build",
  },
];

export function DeveloperJourneySection() {
  return (
    <section id="developer-journey" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/3 right-0 w-[500px] h-[400px] bg-emerald-500/[0.015] rounded-full blur-[140px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="animate-in fade-in-0 slide-in-from-bottom-3"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-purple-400 mb-4">Developer Journey</p></div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.05s", animationFillMode: "both" }}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight max-w-3xl">
            From zero to production<br /><span className="text-muted-foreground/50">in four steps.</span>
          </h2>
        </div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
          <p className="text-lg text-muted-foreground/60 max-w-2xl leading-relaxed mt-5">
            No week-long setup. No config wrestling. Install Ferrum, declare your tokens,
            build your interface, and ship optimized output. The platform handles the complexity
            so you can focus on what makes your product unique.
          </p>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {journeySteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="animate-in fade-in-0 slide-in-from-bottom-2" style={{ animationDelay: `${0.12 + idx * 0.06}s`, animationFillMode: "both" }}>
                <div className="group relative h-full rounded-2xl border border-border/50 bg-foreground/[0.015] hover:bg-foreground/[0.03] transition-all duration-300 p-6">
                  <div className="text-[10px] font-mono font-bold text-muted-foreground/30 mb-4">{step.num}</div>
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/15 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground/60 leading-relaxed mb-4">{step.desc}</p>
                  <div className="rounded-lg bg-foreground/[0.04] border border-border/30 p-3">
                    <pre className="text-[11px] font-mono text-muted-foreground/50 leading-relaxed whitespace-pre-wrap">
                      <code>{step.code}</code>
                    </pre>
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
