"use client";

import { useState, useRef, useEffect, useCallback, type MouseEvent } from "react";
import { ArrowRight, Play, ChevronDown, Zap, Shield, Code, Cpu, Sparkles, Monitor, Box, Globe } from "lucide-react";
import { Reveal } from "@/components/ferrum/scroll-reveal";
import { ShineButton, Magnetic, PulsingDot } from "@/components/ferrum/animated-components";

/* ═══════════════════════════════════════════════════════════════
   LIVE HERO DEMO — Interactive floating dashboard
   Every hover demonstrates Ferrum.
   ═══════════════════════════════════════════════════════════════ */
function LiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const mx = mousePos.x;
  const my = mousePos.y;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-w-2xl mx-auto rounded-2xl border border-border/50 bg-foreground/[0.02] overflow-hidden cursor-default"
      style={{
        background: `radial-gradient(600px circle at ${mx * 100}% ${my * 100}%, rgba(168,85,247,0.04), transparent 40%)`,
      }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Card 1: Glass morphing card */}
      <div
        className="absolute top-[10%] left-[6%] w-[52%] sm:w-[44%] p-3 sm:p-4 rounded-xl border border-purple-500/15 bg-purple-500/[0.04] backdrop-blur-sm transition-all duration-500 ease-out hover:border-purple-500/30 hover:bg-purple-500/[0.07]"
        style={{
          transform: `translate(${(mx - 0.5) * -8}px, ${(my - 0.5) * -6}px)`,
        }}
        onMouseEnter={() => setHoveredCard("glass")}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-md bg-purple-500/20 flex items-center justify-center">
            <Box className="w-3 h-3 text-purple-400" />
          </div>
          <span className="text-[10px] sm:text-xs font-medium text-foreground/60">Glass Component</span>
          {hoveredCard === "glass" && <PulsingDot color="bg-purple-500 dark:bg-purple-400" className="ml-auto" />}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-xl sm:text-2xl font-bold text-foreground tabular-nums">60</span>
          <span className="text-[10px] text-muted-foreground/60">fps</span>
          <span className="ml-auto text-[10px] text-emerald-400/60 font-medium">GPU</span>
        </div>
        <div className="mt-2 h-1 rounded-full bg-foreground/[0.06] overflow-hidden">
          <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-purple-500/60 to-pink-500/40 animate-[ferrum-shimmer-bar_2s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Card 2: Motion physics */}
      <div
        className="absolute top-[6%] right-[5%] w-[40%] sm:w-[36%] p-3 sm:p-4 rounded-xl border border-pink-500/15 bg-pink-500/[0.04] backdrop-blur-sm transition-all duration-500 ease-out delay-75 hover:border-pink-500/30 hover:bg-pink-500/[0.07]"
        style={{
          transform: `translate(${(mx - 0.5) * -12}px, ${(my - 0.5) * -10}px)`,
        }}
        onMouseEnter={() => setHoveredCard("motion")}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-md bg-pink-500/20 flex items-center justify-center">
            <Zap className="w-3 h-3 text-pink-400" />
          </div>
          <span className="text-[10px] sm:text-xs font-medium text-foreground/60">Motion Physics</span>
          {hoveredCard === "motion" && <PulsingDot color="bg-pink-500 dark:bg-pink-400" className="ml-auto" />}
        </div>
        <div className="space-y-1.5">
          {["Spring", "Physics", "Gesture"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-[9px] text-muted-foreground/60 w-10">{label}</span>
              <div className="flex-1 h-1 rounded-full bg-foreground/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-pink-400/40"
                  style={{
                    width: `${[88, 72, 65][i]}%`,
                    animation: `ferrum-shimmer-bar ${1.5 + i * 0.3}s ease-in-out infinite`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Card 3: Responsive layout */}
      <div
        className="absolute bottom-[12%] left-[4%] w-[44%] sm:w-[40%] p-3 sm:p-4 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] backdrop-blur-sm transition-all duration-500 ease-out delay-100 hover:border-emerald-500/30 hover:bg-emerald-500/[0.07]"
        style={{
          transform: `translate(${(mx - 0.5) * -6}px, ${(my - 0.5) * -14}px)`,
        }}
        onMouseEnter={() => setHoveredCard("layout")}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-md bg-emerald-500/20 flex items-center justify-center">
            <Monitor className="w-3 h-3 text-emerald-400" />
          </div>
          <span className="text-[10px] sm:text-xs font-medium text-foreground/60">Adaptive Layout</span>
          {hoveredCard === "layout" && <PulsingDot color="bg-emerald-500 dark:bg-emerald-400" className="ml-auto" />}
        </div>
        <div className="flex gap-1">
          {[
            { w: "w-6 h-4", label: "S" },
            { w: "w-8 h-4", label: "M" },
            { w: "w-10 h-4", label: "L" },
          ].map((s, i) => (
            <div key={s.label} className={`flex-1 flex flex-col items-center gap-1`}>
              <div className={`${s.w} rounded border border-foreground/[0.08] bg-foreground/[0.03] flex items-center justify-center transition-all duration-300 ${hoveredCard === "layout" ? "border-emerald-500/30 bg-emerald-500/[0.06]" : ""}`} style={{ animationDelay: `${i * 100}ms` }}>
                <Globe className="w-2 h-2 text-muted-foreground/50" />
              </div>
              <span className="text-[7px] text-muted-foreground/50">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card 4: Compiler pipeline */}
      <div
        className="absolute bottom-[6%] right-[4%] w-[48%] sm:w-[44%] p-3 sm:p-4 rounded-xl border border-amber-500/15 bg-amber-500/[0.04] backdrop-blur-sm transition-all duration-500 ease-out delay-150 hover:border-amber-500/30 hover:bg-amber-500/[0.07]"
        style={{
          transform: `translate(${(mx - 0.5) * -10}px, ${(my - 0.5) * -8}px)`,
        }}
        onMouseEnter={() => setHoveredCard("compiler")}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-md bg-amber-500/20 flex items-center justify-center">
            <Cpu className="w-3 h-3 text-amber-400" />
          </div>
          <span className="text-[10px] sm:text-xs font-medium text-foreground/60">Compiler Pipeline</span>
          {hoveredCard === "compiler" && <PulsingDot color="bg-amber-500 dark:bg-amber-400" className="ml-auto" />}
        </div>
        <div className="flex items-center gap-1">
          {["Parse", "Analyze", "Optimize", "Output"].map((step, i) => (
            <div key={step} className="flex items-center gap-1">
              <div
                className="px-1.5 py-0.5 rounded text-[8px] font-mono font-medium"
                style={{
                  color: `hsl(${270 + i * 25}, 70%, 65%)`,
                  backgroundColor: `hsl(${270 + i * 25}, 70%, 65%, 0.08)`,
                  animation: `ferrum-pipeline-pulse ${1.2 + i * 0.2}s ease-in-out ${i * 0.15}s infinite`,
                }}
              >
                {step}
              </div>
              {i < 3 && <ArrowRight className="w-2.5 h-2.5 text-muted-foreground/50" />}
            </div>
          ))}
        </div>
      </div>

      {/* Floating code snippet */}
      <div
        className="absolute top-[55%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60%] p-2.5 rounded-lg border border-border/30 bg-background/80 backdrop-blur-md transition-all duration-500 ease-out delay-50 z-10 hover:border-purple-500/20"
        style={{
          transform: `translate(calc(-50% + ${(mx - 0.5) * -15}px), calc(-50% + ${(my - 0.5) * -12}px))`,
        }}
      >
        <div className="flex items-center gap-1 mb-1.5">
          <div className="w-2 h-2 rounded-full bg-red-400/40" />
          <div className="w-2 h-2 rounded-full bg-yellow-400/40" />
          <div className="w-2 h-2 rounded-full bg-green-400/40" />
          <span className="ml-1.5 text-[8px] text-muted-foreground/60 font-mono">ferrum.config.ts</span>
        </div>
        <div className="font-mono text-[8px] sm:text-[9px] leading-relaxed text-muted-foreground/40">
          <div><span className="text-purple-400/50">.rc-float</span> {"{"}</div>
          <div className="pl-2"><span className="text-amber-400/40">animation</span>: spring <span className="text-pink-400/40">0.5s</span>;</div>
          <div className="pl-2"><span className="text-amber-400/40">transform</span>: <span className="text-emerald-400/40">translateY(-8px)</span>;</div>
          <div>{"}"}</div>
        </div>
      </div>

      {/* Interactive particles */}
      {[
        { top: "20%", left: "50%", size: 3, delay: 0, color: "bg-purple-400/30", dx: 20, dy: -30, dur: 7 },
        { top: "60%", left: "20%", size: 2, delay: 1.5, color: "bg-pink-400/20", dx: -15, dy: -25, dur: 9 },
        { top: "40%", left: "80%", size: 2.5, delay: 3, color: "bg-orange-400/20", dx: 10, dy: -35, dur: 8 },
        { top: "80%", left: "60%", size: 2, delay: 2, color: "bg-violet-400/25", dx: -20, dy: -20, dur: 10 },
      ].map((p, i) => (
        <div
          key={i}
          className={`absolute rounded-full ${p.color} pointer-events-none`}
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            ["--px" as string]: `${p.dx}px`,
            ["--py" as string]: `${p.dy}px`,
            animation: `ferrum-particle-drift ${p.dur}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* "LIVE DEMO" label */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-md bg-foreground/[0.04] border border-border/30">
        <PulsingDot color="bg-emerald-500 dark:bg-emerald-400" />
        <span className="text-[9px] font-medium text-muted-foreground/60 uppercase tracking-wider">Live Demo</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCROLL NARRATIVE — "Why Ferrum Exists"
   ═══════════════════════════════════════════════════════════════ */

const narrativeSteps = [
  { text: "Static websites became web applications.", era: "2010s" },
  { text: "Web applications became design systems.", era: "2020s" },
  { text: "AI is changing how interfaces are created.", era: "Now" },
  { text: "But rendering technology hasn't kept up.", era: "Problem" },
  { text: "Ferrum changes that.", era: "Solution", highlight: true },
];

function ScrollNarrative() {
  const [activeStep, setActiveStep] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        const rect = entry.boundingClientRect;
        const viewportHeight = window.innerHeight;
        const progress = Math.max(0, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height)));
        const stepIndex = Math.min(narrativeSteps.length - 1, Math.floor(progress * narrativeSteps.length * 1.4));
        setActiveStep(stepIndex);
      },
      { threshold: Array.from({ length: 20 }, (_, i) => i / 20) }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground/60 mb-8 text-center">
            The Web Has Changed
          </p>
        </Reveal>
        <div className="space-y-6">
          {narrativeSteps.map((step, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ease-out ${
                activeStep >= i
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="flex flex-col items-center shrink-0 pt-1">
                  <div
                    className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-500 ${
                      activeStep >= i
                        ? step.highlight
                          ? "bg-purple-500 border-purple-500 shadow-lg shadow-purple-500/40"
                          : "bg-foreground/60 border-foreground/60"
                        : "bg-transparent border-foreground/15"
                    }`}
                  />
                  {i < narrativeSteps.length - 1 && (
                    <div className={`w-px h-12 mt-2 transition-colors duration-500 ${activeStep > i ? "bg-foreground/10" : "bg-foreground/[0.04]"}`} />
                  )}
                </div>
                <div className="pb-6">
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className={`text-[10px] font-mono font-medium tracking-wider transition-colors duration-500 ${
                        activeStep >= i
                          ? step.highlight
                            ? "text-purple-400"
                            : "text-muted-foreground/60"
                          : "text-muted-foreground/50"
                      }`}
                    >
                      {step.era}
                    </span>
                  </div>
                  <p
                    className={`text-base sm:text-lg leading-relaxed transition-colors duration-500 ${
                      activeStep >= i
                        ? step.highlight
                          ? "text-foreground font-semibold text-lg sm:text-xl"
                          : "text-foreground/70"
                        : "text-foreground/40"
                    }`}
                  >
                    {step.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════════════════════ */

interface HeroProps {
  onGetStarted: () => void;
  onOpenPlayground: () => void;
}

const trustItems = [
  { icon: Globe, label: "Framework Agnostic" },
  { icon: Code, label: "TypeScript Native" },
  { icon: Shield, label: "MIT Licensed" },
  { icon: Zap, label: "Modern Browser APIs" },
  { icon: Sparkles, label: "AI-Ready Architecture" },
];

export function VisionHero({ onGetStarted, onOpenPlayground }: HeroProps) {
  const [badgeIndex, setBadgeIndex] = useState(0);

  const badges = [
    "Introducing the Universal UI Engine",
    "366+ Effects Available",
    "AI-Ready Architecture",
    "Powered by Native Browser APIs",
    "10 Subsystem Design Documents",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setBadgeIndex((i) => (i + 1) % badges.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [badges.length]);

  return (
    <>
      <header id="hero" className="relative overflow-hidden pt-24 pb-12 sm:pt-36 sm:pb-16 lg:pt-44 lg:pb-20">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="ferrum-aurora ferrum-aurora-1 absolute top-[-15%] left-[15%] w-[800px] h-[500px] bg-purple-500/[0.025]" />
          <div className="ferrum-aurora ferrum-aurora-2 absolute top-[5%] right-[10%] w-[600px] h-[400px] bg-pink-500/[0.02]" />
          <div className="ferrum-aurora ferrum-aurora-3 absolute bottom-[-10%] left-[35%] w-[700px] h-[350px] bg-violet-500/[0.015]" />

          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.025]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              animation: "ferrum-grid-drift 40s linear infinite",
            }}
          />

          <div className="absolute inset-0 ferrum-noise opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_70%)]" />
        </div>

        <style>{`
          @keyframes ferrum-grid-drift {
            0%   { background-position: 0 0; }
            100% { background-position: 64px 64px; }
          }
          @keyframes ferrum-shimmer-bar {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
          }
          @keyframes ferrum-pipeline-pulse {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }
          @keyframes fade-up {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <div className="relative max-w-6xl mx-auto px-6 sm:px-8">
          {/* Badge — rotating announcement */}
          <Reveal>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-purple-500/15 bg-purple-500/[0.04] mb-8 backdrop-blur-sm">
              <PulsingDot color="bg-purple-500 dark:bg-purple-400" />
              <span
                key={badgeIndex}
                className="text-xs font-medium text-purple-600/70 dark:text-purple-300/70 tracking-wide"
                style={{ animation: "fade-up 0.4s ease-out" }}
              >
                {badges[badgeIndex]}
              </span>
            </div>
          </Reveal>

          {/* Headline — "Build interfaces that think, move, and adapt." */}
          <Reveal delay={0.06}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] max-w-4xl">
              Build interfaces that
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[ferrum-gradient-shift_6s_ease-in-out_infinite]">
                think, move, and adapt.
              </span>
            </h1>
          </Reveal>

          {/* Description — transformation, not features */}
          <Reveal delay={0.12}>
            <p className="text-base sm:text-lg text-muted-foreground/80 max-w-2xl leading-relaxed mt-6">
              Ferrum is a platform for building modern user interfaces with intelligent motion,
              advanced visual effects, adaptive design systems, and framework-independent rendering.
              Create experiences that feel polished by default and remain flexible as your
              applications evolve.
            </p>
          </Reveal>

          {/* CTAs — "Start Building" + "Explore Playground" */}
          <Reveal delay={0.18}>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Magnetic strength={0.15}>
                <ShineButton
                  onClick={onGetStarted}
                  shineColor="rgba(255, 255, 255, 0.2)"
                  className="group flex items-center gap-2.5 px-7 py-3 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-all shadow-2xl shadow-primary/10 active:scale-[0.98]"
                >
                  Start Building
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </ShineButton>
              </Magnetic>
              <Magnetic strength={0.15}>
                <ShineButton
                  onClick={onOpenPlayground}
                  shineColor="rgba(168, 85, 247, 0.1)"
                  className="flex items-center gap-2.5 px-7 py-3 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground bg-foreground/[0.05] hover:bg-foreground/[0.07] transition-all border border-border active:scale-[0.98]"
                >
                  <Play className="w-4 h-4" />
                  Explore Playground
                </ShineButton>
              </Magnetic>
            </div>
          </Reveal>

          {/* Trust bar */}
          <Reveal delay={0.24}>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-8">
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-1.5 text-xs text-muted-foreground/50">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Live Demo — the first Ferrum demo */}
          <Reveal delay={0.3}>
            <div className="mt-12 sm:mt-16">
              <LiveDemo />
            </div>
          </Reveal>

          {/* Tagline — Ferrum's identity */}
          <Reveal delay={0.36}>
            <p className="text-center text-sm text-muted-foreground/50 mt-8 italic">
              Describe the experience. Ferrum handles the rendering.
            </p>
          </Reveal>
        </div>

        {/* Scroll indicator */}
        <Reveal delay={0.5}>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50">Scroll</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground/50 animate-bounce" />
          </div>
        </Reveal>

        {/* Bottom divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/15 dark:via-purple-400/15 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </header>

      {/* Scroll Narrative — "Why does Ferrum exist?" */}
      <ScrollNarrative />

      {/* Post-narrative divider */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="ferrum-divider-glow" />
      </div>
    </>
  );
}