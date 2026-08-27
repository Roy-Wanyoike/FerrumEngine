"use client";

import { Reveal } from "@/components/ferrum/scroll-reveal";

export function Philosophy() {
  return (
    <section id="philosophy" className="relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[140px]" />
        <div className="ferrum-aurora ferrum-aurora-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/[0.03]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-28 sm:py-36 text-center scroll-fade-up">
        <Reveal>
          <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">Philosophy</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight max-w-3xl mx-auto">
            Engineering Beautiful Experiences
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-6">
            Modern web development shouldn&apos;t require stitching together multiple frameworks,
            animation libraries, and utility packages. FerrumEngine unifies the essential building
            blocks of frontend development into one cohesive platform.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-lg text-muted-foreground/50 max-w-2xl mx-auto leading-relaxed mt-4">
            By combining powerful motion, reusable components, intuitive utilities, flexible
            theming, and a developer-first experience, FerrumEngine empowers teams to build
            interfaces that are beautiful, fast, accessible, and production-ready.
          </p>
        </Reveal>
      </div>
    </section>
  );
}