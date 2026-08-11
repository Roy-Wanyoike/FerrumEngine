import {
  Brain, Wind, Zap, Shield, Boxes, Sparkles, Lock,
} from "lucide-react";
import { SectionHeader } from "./section-helpers";

interface Principle {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  example: string;
}

const principles: Principle[] = [
  {
    number: "01",
    title: "Intent over implementation",
    icon: Brain,
    description: "Developers describe what they want; Ferrum determines how to render it efficiently. The API should feel like expressing a design intent, not configuring a rendering pipeline. When you write rc-float, you're not setting CSS properties — you're declaring that this element should feel weightless.",
    example: "You write the 'what'. Ferrum figures out the 'how'.",
  },
  {
    number: "02",
    title: "Motion has meaning",
    icon: Wind,
    description: "Animation communicates state and purpose, not decoration. A sidebar slides because it's entering your workspace, not because someone thought it looked cool. Spring physics feel natural because they mirror how objects move in the real world. Every motion in Ferrum answers the question: what changed, and why should the user care?",
    example: "If removing the animation doesn't change the user's understanding, it shouldn't exist.",
  },
  {
    number: "03",
    title: "Performance is the default",
    icon: Zap,
    description: "Every feature should degrade gracefully and remain GPU-conscious. Ferrum effects use transform and opacity wherever possible, avoiding layout thrash. The compiler eliminates unused CSS. The runtime batches paint operations. You don't need to know about compositing layers — Ferrum handles it.",
    example: "A page with 50 animated elements should run at 60fps on a mid-range phone.",
  },
  {
    number: "04",
    title: "Accessibility is built in",
    icon: Shield,
    description: "Accessible behavior is automatic, not an afterthought. Animations respect prefers-reduced-motion. Color contrast passes WCAG AA by default. Keyboard navigation works without configuration. If a feature can't be made accessible, it doesn't ship.",
    example: "No separate 'a11y mode'. The default IS accessible.",
  },
  {
    number: "05",
    title: "Framework independence",
    icon: Boxes,
    description: "Ferrum should never be tied to a single frontend framework. The CSS layer works everywhere — React, Vue, Svelte, Angular, vanilla HTML. Adapters provide first-class integration when you want it, but the core engine is pure CSS. Frameworks come and go. Good interface engineering is eternal.",
    example: "Drop a <link> tag. It works. In any framework. In any stack.",
  },
  {
    number: "06",
    title: "AI is a collaborator",
    icon: Sparkles,
    description: "AI assists design and engineering but always produces understandable, editable output. When Ferrum AI generates a layout, you get standard CSS classes — not a black box. When it suggests a motion curve, it explains why. The developer remains in control. AI amplifies intent; it never replaces understanding.",
    example: "AI-generated code should look like something a senior engineer would write.",
  },
  {
    number: "07",
    title: "Open architecture",
    icon: Lock,
    description: "Every subsystem has documented interfaces that others can extend. The Plugin SDK provides 7 lifecycle hooks. The Token system accepts custom scales. The Compiler is pluggable. Ferrum is not a walled garden — it's a foundation that teams build on top of.",
    example: "If you need Ferrum to do something it doesn't, there's a documented way to add it.",
  },
];

export function FerrumPrinciples() {
  return (
    <section id="principles" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-500/[0.025] rounded-full blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <SectionHeader
          label="Philosophy"
          title="The Ferrum Principles"
          subtitle="React has principles. Apple has Human Interface Guidelines. Google has Material Design. Stripe has engineering principles. Ferrum needs its own philosophy — a lens through which every feature, API, and design decision is evaluated."
          size="sm"
          subtitleOpacity="60"
        />

        <div className="mt-16 space-y-4">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={p.number} className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: `${i * 0.04}s`, animationFillMode: "both" }}>
                <div className="group p-6 sm:p-8 rounded-2xl border border-border/40 bg-foreground/[0.01] hover:bg-foreground/[0.025] transition-all duration-300">
                  <div className="flex gap-6">
                    {/* Number + Icon */}
                    <div className="shrink-0 hidden sm:flex flex-col items-center gap-3 pt-1">
                      <span className="text-3xl font-extrabold text-muted-foreground/[0.08] tabular-nums">{p.number}</span>
                      <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] border border-border/40 flex items-center justify-center group-hover:border-purple-500/20 transition-colors">
                        <Icon className="w-5 h-5 text-muted-foreground/40 group-hover:text-purple-400 transition-colors" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="sm:hidden text-xl font-extrabold text-muted-foreground/[0.08]">{p.number}</span>
                        <h2 className="text-lg font-semibold text-foreground">{p.title}</h2>
                      </div>
                      <p className="text-sm text-muted-foreground/80 leading-relaxed mb-4">
                        {p.description}
                      </p>
                      <div className="inline-flex items-start gap-2 px-3 py-2 rounded-lg bg-purple-500/[0.03] border border-purple-500/10">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-400 shrink-0 pt-0.5">In practice</span>
                        <span className="text-xs text-muted-foreground/70 leading-relaxed">{p.example}</span>
                      </div>
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