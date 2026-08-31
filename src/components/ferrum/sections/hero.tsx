"use client";

import { ArrowRight, Play } from "lucide-react";
import { Reveal } from "@/components/ferrum/scroll-reveal";
import { ShineButton, Magnetic, PulsingDot } from "@/components/ferrum/animated-components";

interface HeroProps {
  onGetStarted: () => void;
  onOpenPlayground: () => void;
}

export function Hero({ onGetStarted, onOpenPlayground }: HeroProps) {
  return (
    <header id="hero" className="relative overflow-hidden pt-32 pb-24 sm:pt-44 sm:pb-32">
      {/* ─── Subtle aurora background ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Primary aurora blobs — reduced opacity for subtlety */}
        <div className="ferrum-aurora ferrum-aurora-1 absolute top-[-10%] left-[20%] w-[700px] h-[400px] bg-purple-500/[0.04]" />
        <div className="ferrum-aurora ferrum-aurora-2 absolute top-[10%] right-[15%] w-[500px] h-[350px] bg-pink-500/[0.03]" />
        <div className="ferrum-aurora ferrum-aurora-3 absolute bottom-[-5%] left-[40%] w-[600px] h-[300px] bg-violet-500/[0.025]" />

        {/* ─── Animated grid pattern overlay ─── */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            animation: "ferrum-grid-drift 40s linear infinite",
          }}
        />

        {/* Floating particles — fewer, more subdued */}
        <div
          className="absolute top-[25%] left-[15%] w-1 h-1 rounded-full bg-purple-400/20"
          style={
            { "--px": "60px", "--py": "-120px", animation: "ferrum-particle-drift 8s ease-in-out infinite" } as React.CSSProperties
          }
        />
        <div
          className="absolute top-[50%] right-[20%] w-1 h-1 rounded-full bg-pink-400/15"
          style={
            { "--px": "-40px", "--py": "-100px", animation: "ferrum-particle-drift 10s ease-in-out 2s infinite" } as React.CSSProperties
          }
        />
        <div
          className="absolute bottom-[30%] left-[60%] w-0.5 h-0.5 rounded-full bg-orange-400/20"
          style={
            { "--px": "30px", "--py": "-80px", animation: "ferrum-particle-drift 12s ease-in-out 1s infinite" } as React.CSSProperties
          }
        />

        {/* Noise overlay */}
        <div className="absolute inset-0 ferrum-noise" />

        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_70%)]" />
      </div>

      {/* ─── Grid drift keyframes (injected once) ─── */}
      <style>{`
        @keyframes ferrum-grid-drift {
          0%   { background-position: 0 0; }
          100% { background-position: 64px 64px; }
        }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 text-center">
        {/* Badge */}
        <Reveal>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/[0.06] mb-8 backdrop-blur-sm">
            <PulsingDot color="bg-purple-500 dark:bg-purple-400" />
            <span className="text-xs font-medium text-purple-600/80 dark:text-purple-300/80 tracking-wide">
              Universal UI Engine
            </span>
          </div>
        </Reveal>

        {/* Headline — animated gradient */}
        <Reveal delay={0.1}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] max-w-5xl mx-auto">
            Build Interfaces That
            <br />
            <span className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[ferrum-gradient-shift_6s_ease-in-out_infinite]">
              Think, Move, and Adapt.
            </span>
          </h1>
        </Reveal>

        {/* Subheadline */}
        <Reveal delay={0.2}>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-8">
            Ferrum is a universal rendering engine for modern interfaces — combining motion,
            visual effects, design systems, and AI-powered UI generation into one developer
            platform.
          </p>
        </Reveal>

        {/* CTAs — with shine + magnetic effects */}
        <Reveal delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
            <Magnetic strength={0.15}>
              <ShineButton
                onClick={onGetStarted}
                shineColor="rgba(255, 255, 255, 0.2)"
                className="group flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-all shadow-2xl shadow-primary/10 active:scale-[0.98]"
              >
                Build with Ferrum
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </ShineButton>
            </Magnetic>
            <Magnetic strength={0.15}>
              <ShineButton
                onClick={onOpenPlayground}
                shineColor="rgba(168, 85, 247, 0.12)"
                className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground bg-foreground/[0.06] hover:bg-foreground/[0.08] transition-all border border-border active:scale-[0.98]"
              >
                <Play className="w-4 h-4" />
                Explore Playground
              </ShineButton>
            </Magnetic>
          </div>
        </Reveal>

        {/* Trust line */}
        <Reveal delay={0.4}>
          <p className="mt-10 text-xs text-muted-foreground/60">
            Open Source &middot; MIT License &middot; Zero Dependencies &middot; 8 Framework Adapters
          </p>
        </Reveal>
      </div>

      {/* ─── Horizontal glowing line divider ─── */}
      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 dark:via-purple-400/30 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-500/20 dark:via-pink-400/20 to-transparent blur-sm" />
      </div>

      {/* ─── Bottom fade to section ─── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </header>
  );
}