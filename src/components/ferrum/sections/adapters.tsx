"use client";

import { Atom, Layers, Globe, Zap, Shield, Cpu, Rocket, FileCode } from "lucide-react";
import { AnimatedCard } from "@/components/ferrum/animated-components";
import { spotlightMap } from "@/lib/animation-colors";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ferrum/scroll-reveal";

const adapters = [
  { name: "React", icon: Atom, desc: "Context-based theme provider, declarative motion components, and reactive hooks.", exports: ["FerrumProvider", "Animated", "MotionDiv", "useMotion", "useTokens"], color: "cyan", bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-400", pill: "bg-cyan-500/[0.06] border-cyan-500/10 text-cyan-400/50", gradient: "from-cyan-500/30 to-cyan-500/5" },
  { name: "Vue 3", icon: Layers, desc: "Standard Vue plugin with provide/inject and SFC animation components.", exports: ["createFerrum()", "FAnimated", "useMotion", "useTokens"], color: "emerald", bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", pill: "bg-emerald-500/[0.06] border-emerald-500/10 text-emerald-400/50", gradient: "from-emerald-500/30 to-emerald-500/5" },
  { name: "Next.js", icon: Globe, desc: "App Router CSS injection, font loading, and server-component support.", exports: ["FerrumCSS", "FontLoader", "FerrumProvider", "useTokens"], color: "zinc", bg: "bg-foreground/[0.06]", border: "border-border", text: "text-foreground/60", pill: "bg-foreground/[0.05] border-border text-muted-foreground", gradient: "from-foreground/20 to-foreground/5" },
  { name: "Svelte", icon: Zap, desc: "Context API with actions pattern, reactive stores, and motion utilities.", exports: ["ferrumProvider", "useFerrumTheme", "useMotion", "useReducedMotion"], color: "orange", bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-400", pill: "bg-orange-500/[0.06] border-orange-500/10 text-orange-400/50", gradient: "from-orange-500/30 to-orange-500/5" },
  { name: "Angular", icon: Shield, desc: "DI for tokens, injectable theme service, directives, and template pipes.", exports: ["FerrumThemeService", "FerrumMotionDirective", "FerrumTokenPipe"], color: "red", bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-400", pill: "bg-red-500/[0.06] border-red-500/10 text-red-400/50", gradient: "from-red-500/30 to-red-500/5" },
  { name: "SolidJS", icon: Cpu, desc: "Fine-grained reactivity with context provider and reactive hooks.", exports: ["FerrumProvider", "MotionDiv", "useFerrumTokens", "useReducedMotion"], color: "blue", bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400", pill: "bg-blue-500/[0.06] border-blue-500/10 text-blue-400/50", gradient: "from-blue-500/30 to-blue-500/5" },
  { name: "Astro", icon: Rocket, desc: "Zero-JS integration that injects tokens and theme script at build time.", exports: ["ferrumIntegration()", "injectTokenStyles", "ferrumLayoutHtml"], color: "purple", bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400", pill: "bg-purple-500/[0.06] border-purple-500/10 text-purple-400/50", gradient: "from-purple-500/30 to-purple-500/5" },
  { name: "Lit", icon: FileCode, desc: "TypeScript class mixins for theming, animation, and a11y in web components.", exports: ["FerrumElement", "FerrumThemeMixin", "FerrumMotionMixin", "ferrumMotion"], color: "sky", bg: "bg-sky-500/10", border: "border-sky-500/20", text: "text-sky-400", pill: "bg-sky-500/[0.06] border-sky-500/10 text-sky-400/50", gradient: "from-sky-500/30 to-sky-500/5" },
];

export function Adapters() {
  return (
    <section id="adapters" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-cyan-500/[0.03] rounded-full blur-[140px]" />
        <div className="ferrum-aurora ferrum-aurora-1 absolute top-0 left-1/3 w-[400px] h-[250px] bg-cyan-500/[0.04]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal>
          <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">Framework Adapters</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            First-Class Support.
            <br />
            <span className="text-muted-foreground/70">Every Framework.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mt-5">
            Dedicated adapters with idiomatic APIs, reactive integrations, and full
            design-token support — so you never have to fight the framework.
          </p>
        </Reveal>

        <StaggerContainer className="mt-16 grid lg:grid-cols-2 gap-4" delay={0.1}>
          {adapters.map((a) => (
            <StaggerItem key={a.name}>
              <AnimatedCard spotlightColor={spotlightMap[a.color]?.spotlight || "rgba(161,161,170,0.04)"} glowColor={spotlightMap[a.color]?.glow || "rgba(161,161,170,0.10)"} className={`border ${a.border} bg-foreground/[0.02] h-full`}>
                <div className="p-6 relative z-20">
                  {/* Accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${a.gradient || "from-foreground/20 to-foreground/5"}`} />
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${a.bg} border ${a.border} flex items-center justify-center shrink-0 ferrum-icon-bounce`}>
                      <a.icon className={`w-5 h-5 ${a.text}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-lg font-semibold ${a.text}`}>{a.name}</h3>
                      <p className="text-sm text-muted-foreground/70 mt-1 leading-relaxed">{a.desc}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {a.exports.map((e) => (
                          <code key={e} className={`px-2 py-0.5 rounded-md border ${a.pill} text-[10px] font-mono`}>{e}</code>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}