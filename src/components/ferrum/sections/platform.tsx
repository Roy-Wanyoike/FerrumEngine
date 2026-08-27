"use client";

import { Blocks, LayoutGrid, Palette, Timer, Paintbrush, Puzzle, Shield, LayoutTemplate, Cpu, Terminal, Bot } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ferrum/scroll-reveal";
import { AnimatedCard } from "@/components/ferrum/animated-components";
import { spotlightMap } from "@/lib/animation-colors";

const workletNames = ["glow", "glass", "ripple", "neon-border", "noise", "gradient-mesh", "skeleton"];

const FALLBACK_SPOTLIGHT = {spotlight: 'rgba(161,161,170,0.04)', glow: 'rgba(161,161,170,0.10)'};
const sc = (k: string) => (spotlightMap as Record<string, {spotlight: string; glow: string}>)[k] ?? FALLBACK_SPOTLIGHT;

export function Platform() {
  return (
    <section id="platform" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="ferrum-aurora ferrum-aurora-1 absolute top-1/4 left-1/3 w-[500px] h-[300px] bg-purple-500/[0.04]" />
        <div className="ferrum-aurora ferrum-aurora-2 absolute bottom-1/4 right-1/4 w-[400px] h-[250px] bg-blue-500/[0.03]" />
      </div>
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal>
          <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">Platform</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">More Than Motion.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mt-5">
            20+ packages covering every layer of frontend development — from design tokens
            to visual effects, from layout generators to a CSS compiler.
          </p>
        </Reveal>

        <StaggerContainer className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4" delay={0.1}>
          {/* Components — spans 2 */}
          <StaggerItem className="md:col-span-2">
            <AnimatedCard spotlightColor={sc('blue').spotlight} glowColor={sc('blue').glow} className="border border-border bg-foreground/[0.02] h-full">
              <div className="p-6 sm:p-8 relative z-20">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5 ferrum-icon-bounce">
                  <Blocks className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">16 Production Components</h3>
                <p className="text-sm text-muted-foreground/70 mt-2 leading-relaxed">
                  Hero, modal, data-table, sidebar-nav, pricing-card, testimonial, analytics-panel,
                  dashboard-widget, and 8 more — from <span className="text-blue-400/60 font-mono text-xs">@ferrum/semantic</span>.
                </p>
              </div>
            </AnimatedCard>
          </StaggerItem>

          {/* VFX */}
          <StaggerItem>
            <AnimatedCard spotlightColor={sc('pink').spotlight} glowColor={sc('pink').glow} className="border border-border bg-foreground/[0.02] h-full">
              <div className="p-6 relative z-20">
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-5 ferrum-icon-bounce">
                  <LayoutTemplate className="w-5 h-5 text-pink-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">VFX Engine</h3>
                <p className="text-sm text-muted-foreground/70 mt-2 leading-relaxed">
                  14 visual effect modules: liquid, atmospheric, glass, energy, distortion,
                  lighting, shadows, and more.
                </p>
              </div>
            </AnimatedCard>
          </StaggerItem>

          {/* Layout */}
          <StaggerItem>
            <AnimatedCard spotlightColor={sc('emerald').spotlight} glowColor={sc('emerald').glow} className="border border-border bg-foreground/[0.02] h-full">
              <div className="p-6 relative z-20">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 ferrum-icon-bounce">
                  <LayoutGrid className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">10 Layout Generators</h3>
                <p className="text-sm text-muted-foreground/70 mt-2 leading-relaxed">
                  Dashboard, sidebar, split, editor, kanban, masonry, grid, stack, overlay,
                  responsive.
                </p>
              </div>
            </AnimatedCard>
          </StaggerItem>

          {/* Tokens */}
          <StaggerItem>
            <AnimatedCard spotlightColor={sc('amber').spotlight} glowColor={sc('amber').glow} className="border border-border bg-foreground/[0.02] h-full">
              <div className="p-6 relative z-20">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 ferrum-icon-bounce">
                  <Palette className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Design Tokens</h3>
                <p className="text-sm text-muted-foreground/70 mt-2 leading-relaxed">
                  16 semantic color scales, 5 output transforms: CSS, Tailwind, SCSS, JSON,
                  TypeScript types.
                </p>
              </div>
            </AnimatedCard>
          </StaggerItem>

          {/* Motion Engine */}
          <StaggerItem>
            <AnimatedCard spotlightColor={sc('violet').spotlight} glowColor={sc('violet').glow} className="border border-border bg-foreground/[0.02] h-full">
              <div className="p-6 relative z-20">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-5 ferrum-icon-bounce">
                  <Timer className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Motion Engine</h3>
                <p className="text-sm text-muted-foreground/70 mt-2 leading-relaxed">
                  18 sub-modules: physics, timeline, composition, depth, interaction, morph,
                  organic, glass, cursor, and more.
                </p>
              </div>
            </AnimatedCard>
          </StaggerItem>

          {/* Houdini — spans 2 */}
          <StaggerItem className="md:col-span-2">
            <AnimatedCard spotlightColor={sc('orange').spotlight} glowColor={sc('orange').glow} className="border border-border bg-foreground/[0.02] h-full">
              <div className="p-6 sm:p-8 relative z-20">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5 ferrum-icon-bounce">
                  <Paintbrush className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">7 Houdini Paint Worklets</h3>
                <p className="text-sm text-muted-foreground/70 mt-2 leading-relaxed">
                  CSS Paint API worklets with progressive enhancement fallbacks. Zero JavaScript
                  at runtime — pure GPU-painted effects via <span className="text-orange-400/60 font-mono text-xs">@ferrum/paint</span>.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {workletNames.map((w) => (
                    <span key={w} className="px-2.5 py-1 rounded-md bg-orange-500/[0.06] border border-orange-500/10 text-[11px] text-orange-400/50 font-mono">{w}</span>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </StaggerItem>

          {/* Plugin SDK */}
          <StaggerItem>
            <AnimatedCard spotlightColor={sc('cyan').spotlight} glowColor={sc('cyan').glow} className="border border-border bg-foreground/[0.02] h-full">
              <div className="p-6 relative z-20">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5 ferrum-icon-bounce">
                  <Puzzle className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Plugin SDK</h3>
                <p className="text-sm text-muted-foreground/70 mt-2 leading-relaxed">
                  Sandboxed environment, 7-phase hook lifecycle, type-safe loader and
                  validator. Zero external deps.
                </p>
              </div>
            </AnimatedCard>
          </StaggerItem>

          {/* A11y */}
          <StaggerItem>
            <AnimatedCard spotlightColor={sc('green').spotlight} glowColor={sc('green').glow} className="border border-border bg-foreground/[0.02] h-full">
              <div className="p-6 relative z-20">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-5 ferrum-icon-bounce">
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Accessibility Suite</h3>
                <p className="text-sm text-muted-foreground/70 mt-2 leading-relaxed">
                  WCAG contrast engine, ARIA validator (15 categories), focus management,
                  keyboard navigation, motion a11y.
                </p>
              </div>
            </AnimatedCard>
          </StaggerItem>

          {/* Modern CSS */}
          <StaggerItem>
            <AnimatedCard spotlightColor={sc('rose').spotlight} glowColor={sc('rose').glow} className="border border-border bg-foreground/[0.02] h-full">
              <div className="p-6 relative z-20">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-5 ferrum-icon-bounce">
                  <Cpu className="w-5 h-5 text-rose-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Modern CSS</h3>
                <p className="text-sm text-muted-foreground/70 mt-2 leading-relaxed">
                  Cascade layers, container queries, scroll-driven animations, anchor
                  positioning, view transitions, @scope, @property.
                </p>
              </div>
            </AnimatedCard>
          </StaggerItem>

          {/* Compiler */}
          <StaggerItem>
            <AnimatedCard spotlightColor={sc('sky').spotlight} glowColor={sc('sky').glow} className="border border-border bg-foreground/[0.02] h-full">
              <div className="p-6 relative z-20">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-5 ferrum-icon-bounce">
                  <Terminal className="w-5 h-5 text-sky-400" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Compiler (9 Passes)</h3>
                <p className="text-sm text-muted-foreground/70 mt-2 leading-relaxed">
                  AST parser, CSS analyzer, dead-code elimination, @layer merging, token
                  inlining, hex compression.
                </p>
              </div>
            </AnimatedCard>
          </StaggerItem>

          {/* AI — spans 3 */}
          <StaggerItem className="lg:col-span-3">
            <div className="group relative p-6 sm:p-8 rounded-2xl border border-dashed border-border bg-foreground/[0.01] hover:bg-foreground/[0.02] transition-all duration-300">
              <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                Coming Soon
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5">
                <Bot className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Ferrum AI Studio</h3>
              <p className="text-sm text-muted-foreground/50 mt-2 leading-relaxed max-w-xl">
                Describe the interface you want, and FerrumEngine generates responsive layouts,
                reusable components, and production-ready code.
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}