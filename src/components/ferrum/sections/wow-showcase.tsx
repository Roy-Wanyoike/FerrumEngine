"use client";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/ferrum/scroll-reveal";
import { AnimatedCard, Magnetic, ShineButton, BorderGlowCard } from "@/components/ferrum/animated-components";
import { Particles, BorderBeam, GradientOrb, TextReveal, NumberTicker, Shimmer } from "@/components/ferrum/wow-components";
import { spotlightMap } from "@/lib/animation-colors";
import { ArrowRight, Sparkles, Zap, Eye, Layers, MousePointer } from "lucide-react";

const wowDemos = [
  {
    title: "Particle Fields",
    description: "Lightweight floating particle systems with mouse-reactive spotlight and optional connection lines. Pure CSS animation with zero JS runtime overhead.",
    component: "particles" as const,
    icon: Sparkles,
    color: "purple",
  },
  {
    title: "Animated Border Beam",
    description: "A conic gradient that travels around the perimeter of any container. Creates a premium, high-tech feel with a single CSS animation.",
    component: "border-beam" as const,
    icon: Eye,
    color: "pink",
  },
  {
    title: "Gradient Orbs",
    description: "Floating, blurred gradient spheres that drift organically. Perfect for ambient backgrounds, hero sections, and visual depth.",
    component: "orbs" as const,
    icon: Layers,
    color: "amber",
  },
  {
    title: "Text Reveal",
    description: "Character-by-character scroll-triggered text animation. Each character slides up and fades in with configurable stagger timing.",
    component: "text-reveal" as const,
    icon: Zap,
    color: "emerald",
  },
  {
    title: "Number Ticker",
    description: "Intersection-observer-triggered counting animation with easeOutQuart easing. Numbers count up from zero when they enter the viewport.",
    component: "ticker" as const,
    icon: MousePointer,
    color: "sky",
  },
  {
    title: "Shimmer Loading",
    description: "Animated skeleton placeholders with a sliding highlight. Respects the design system's border radius and color tokens.",
    component: "shimmer" as const,
    icon: Layers,
    color: "rose",
  },
];

function ParticlesDemo() {
  return (
    <div className="relative h-48 rounded-xl overflow-hidden border border-border/50 bg-foreground/[0.015]">
      <Particles count={20} mouseInteraction className="absolute inset-0" />
    </div>
  );
}

function BorderBeamDemo() {
  return (
    <div className="relative p-6 h-48 flex items-center justify-center">
      <BorderBeam className="absolute inset-0" duration={6} />
      <div className="relative z-20 text-center">
        <div className="text-lg font-bold text-foreground mb-1">Premium Card</div>
        <p className="text-xs text-muted-foreground/40">Beam travels the border</p>
      </div>
    </div>
  );
}

function OrbsDemo() {
  return (
    <div className="relative h-48 rounded-xl overflow-hidden border border-border/50 bg-foreground/[0.015] flex items-center justify-center">
      <GradientOrb colors={["rgba(168,85,247,0.25)", "rgba(236,72,153,0.15)", "transparent"]} size={200} blur={60} className="top-[10%] left-[20%]" />
      <GradientOrb colors={["rgba(249,115,22,0.2)", "rgba(234,179,8,0.1)", "transparent"]} size={180} blur={50} className="bottom-[10%] right-[15%]" />
      <GradientOrb colors={["rgba(6,182,212,0.2)", "rgba(16,185,129,0.1)", "transparent"]} size={160} blur={55} className="top-[30%] right-[30%]" />
      <div className="relative z-10 text-xs text-muted-foreground/50 font-medium">3 floating gradient orbs</div>
    </div>
  );
}

function TextRevealDemo() {
  return (
    <div className="relative h-48 rounded-xl border border-border/50 bg-foreground/[0.015] flex items-center justify-center p-6">
      <TextReveal
        text="Interfaces that feel alive."
        className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent"
      />
    </div>
  );
}

function TickerDemo() {
  return (
    <div className="relative h-48 rounded-xl border border-border/50 bg-foreground/[0.015] flex items-center justify-center p-6">
      <div className="grid grid-cols-2 gap-6 text-center">
        <div>
          <div className="text-3xl font-bold text-foreground">
            <NumberTicker value={866} suffix="+" />
          </div>
          <div className="text-xs text-muted-foreground/40 mt-1">Effects</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-foreground">
            <NumberTicker value={11} />
          </div>
          <div className="text-xs text-muted-foreground/40 mt-1">Categories</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-foreground">
            <NumberTicker value={20} suffix="+" />
          </div>
          <div className="text-xs text-muted-foreground/40 mt-1">Packages</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-foreground">
            <NumberTicker value={8} />
          </div>
          <div className="text-xs text-muted-foreground/40 mt-1">Adapters</div>
        </div>
      </div>
    </div>
  );
}

function ShimmerDemo() {
  return (
    <div className="relative h-48 rounded-xl border border-border/50 bg-foreground/[0.015] p-6 flex flex-col justify-center gap-3">
      <Shimmer width="60%" height="14px" rounded="md" />
      <Shimmer width="100%" height="10px" rounded="md" />
      <Shimmer width="80%" height="10px" rounded="md" />
      <div className="flex gap-3 mt-2">
        <Shimmer width="80px" height="32px" rounded="lg" />
        <Shimmer width="80px" height="32px" rounded="lg" />
      </div>
      <Shimmer width="100%" height="60px" rounded="lg" className="mt-1" />
    </div>
  );
}

const demoComponents: Record<string, () => React.JSX.Element> = {
  particles: ParticlesDemo,
  "border-beam": BorderBeamDemo,
  orbs: OrbsDemo,
  "text-reveal": TextRevealDemo,
  ticker: TickerDemo,
  shimmer: ShimmerDemo,
};

export function WowShowcase() {
  return (
    <section id="wow" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />

      {/* Background orbs */}
      <GradientOrb
        colors={["rgba(168,85,247,0.06)", "rgba(236,72,153,0.03)", "transparent"]}
        size={500}
        blur={140}
        className="absolute top-0 left-1/4"
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal>
          <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">Effect Components</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight max-w-3xl">
            Not just CSS classes.
            <br />
            <span className="text-muted-foreground/50">Interactive effect components.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground/60 max-w-2xl leading-relaxed mt-5">
            Beyond utility classes, Ferrum provides composable React components for particles,
            animated borders, gradient orbs, text reveals, number tickers, and shimmer loading
            states — the building blocks for interfaces that feel alive.
          </p>
        </Reveal>

        <StaggerContainer className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-5" delay={0.1}>
          {wowDemos.map((demo) => {
            const Icon = demo.icon;
            const DemoComponent = demoComponents[demo.component];
            const colors = spotlightMap[demo.color as keyof typeof spotlightMap] || spotlightMap.purple;
            return (
              <StaggerItem key={demo.title}>
                <AnimatedCard
                  spotlightColor={colors.spotlight}
                  glowColor={colors.glow}
                  className="border border-border/40 bg-foreground/[0.015] h-full overflow-hidden"
                >
                  <div className="relative z-20">
                    {/* Demo visual */}
                    <div className="p-4 pb-0">
                      {DemoComponent && <DemoComponent />}
                    </div>
                    {/* Info */}
                    <div className="p-4 pt-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-7 h-7 rounded-lg bg-${demo.color}-500/10 border border-${demo.color}-500/20 flex items-center justify-center`}>
                          <Icon className={`w-3.5 h-3.5 text-${demo.color}-400`} />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground">{demo.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground/40 leading-relaxed">{demo.description}</p>
                    </div>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* CTA */}
        <Reveal delay={0.15}>
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground/50">
              All components are framework-independent. Use them with React, Vue, Svelte, or vanilla HTML.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}