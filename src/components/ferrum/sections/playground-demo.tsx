"use client";

import { useState, useMemo, useCallback, type CSSProperties } from "react";
import {
  Square,
  MousePointerClick,
  Maximize,
  LayoutDashboard,
  Navigation,
  Star,
  Monitor,
  Tablet,
  Smartphone,
  Copy,
  Check,
  Play,
  Code,
} from "lucide-react";
import { Reveal } from "@/components/ferrum/scroll-reveal";
import {
  Select,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const components = [
  { id: "card", label: "Card", icon: Square },
  { id: "button", label: "Button", icon: MousePointerClick },
  { id: "modal", label: "Modal", icon: Maximize },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "navigation", label: "Navigation", icon: Navigation },
  { id: "hero", label: "Hero", icon: Star },
];

const motions = ["None", "Spring", "Bounce", "Magnetic", "Elastic", "Smooth", "Physics"];
const effects = ["None", "Glass", "Liquid", "Neon", "Metal", "Blur", "Depth", "Glow"];
const codeTabs = ["HTML", "CSS", "React", "Vue", "Svelte", "Web Components"];

/* ═══════════════════════════════════════════════════════════════
   MOTION CSS MAP — for live preview styling
   ═══════════════════════════════════════════════════════════════ */

const motionTransitions: Record<string, string> = {
  None: "none",
  Spring: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  Bounce: "transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  Magnetic: "transform 0.25s cubic-bezier(0.33, 1, 0.68, 1)",
  Elastic: "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  Smooth: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  Physics: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
};

const motionHoverTransforms: Record<string, string> = {
  None: "none",
  Spring: "translateY(-4px) scale(1.02)",
  Bounce: "translateY(-8px) scale(1.05)",
  Magnetic: "translateY(-3px) scale(1.01) rotate(0.5deg)",
  Elastic: "scale(1.04)",
  Smooth: "translateY(-2px)",
  Physics: "translateY(-6px) rotateX(2deg)",
};

/* ═══════════════════════════════════════════════════════════════
   EFFECT CSS MAP — for live preview styling
   ═══════════════════════════════════════════════════════════════ */

function getEffectStyles(effect: string, depth: number): CSSProperties {
  const d = depth / 100;
  switch (effect) {
    case "Glass":
      return {
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: `blur(${16 + d * 12}px) saturate(${1 + d * 0.4})`,
        WebkitBackdropFilter: `blur(${16 + d * 12}px) saturate(${1 + d * 0.4})`,
        border: "1px solid rgba(255, 255, 255, 0.08)",
      };
    case "Liquid":
      return {
        background:
          "linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(236,72,153,0.12) 50%, rgba(249,115,22,0.1) 100%)",
        borderRadius: "24px",
        border: "1px solid rgba(168, 85, 247, 0.15)",
      };
    case "Neon":
      return {
        boxShadow: `
          0 0 5px rgba(168, 85, 247, ${0.3 + d * 0.4}),
          0 0 20px rgba(168, 85, 247, ${0.15 + d * 0.2}),
          0 0 40px rgba(168, 85, 247, ${0.05 + d * 0.1}),
          inset 0 0 10px rgba(168, 85, 247, 0.05)`,
        border: "1px solid rgba(168, 85, 247, 0.3)",
      };
    case "Metal":
      return {
        background: `linear-gradient(145deg, 
          rgba(255,255,255,${0.08 + d * 0.06}) 0%, 
          rgba(255,255,255,${0.02 + d * 0.02}) 50%, 
          rgba(255,255,255,${0.06 + d * 0.04}) 100%)`,
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: `inset 0 1px 0 rgba(255,255,255,${0.1 + d * 0.1}), 0 ${4 + d * 16}px ${8 + d * 24}px rgba(0,0,0,${0.2 + d * 0.15})`,
      };
    case "Blur":
      return {
        filter: `blur(${d * 2}px)`,
        opacity: 0.7 + d * 0.3,
      };
    case "Depth":
      return {
        boxShadow: `
          0 ${2 + d * 8}px ${4 + d * 16}px rgba(0,0,0,${0.08 + d * 0.12}),
          0 ${8 + d * 20}px ${16 + d * 40}px rgba(0,0,0,${0.04 + d * 0.08}),
          0 ${16 + d * 30}px ${32 + d * 60}px rgba(0,0,0,${0.02 + d * 0.04})`,
        transform: "translateZ(0)",
      };
    case "Glow":
      return {
        boxShadow: `
          0 0 ${10 + d * 20}px rgba(168, 85, 247, ${0.08 + d * 0.12}),
          0 0 ${30 + d * 40}px rgba(168, 85, 247, ${0.03 + d * 0.06})`,
        border: "1px solid rgba(168, 85, 247, 0.1)",
      };
    default:
      return {};
  }
}

function getEffectHoverStyles(effect: string, depth: number): CSSProperties {
  const d = depth / 100;
  switch (effect) {
    case "Glass":
      return {
        background: "rgba(255, 255, 255, 0.08)",
        boxShadow: `0 20px 40px -15px rgba(0,0,0,0.3), 0 0 30px -10px rgba(168, 85, 247, 0.1)`,
      };
    case "Neon":
      return {
        boxShadow: `
          0 0 10px rgba(168, 85, 247, ${0.4 + d * 0.4}),
          0 0 30px rgba(168, 85, 247, ${0.2 + d * 0.3}),
          0 0 60px rgba(168, 85, 247, ${0.1 + d * 0.15}),
          0 0 100px rgba(168, 85, 247, ${0.05 + d * 0.08}),
          inset 0 0 20px rgba(168, 85, 247, 0.08)`,
      };
    case "Glow":
      return {
        boxShadow: `
          0 0 ${20 + d * 30}px rgba(168, 85, 247, ${0.15 + d * 0.2}),
          0 0 ${50 + d * 50}px rgba(168, 85, 247, ${0.06 + d * 0.1}),
          0 0 ${80 + d * 60}px rgba(168, 85, 247, ${0.02 + d * 0.04})`,
      };
    case "Liquid":
      return {
        background:
          "linear-gradient(135deg, rgba(168,85,247,0.25) 0%, rgba(236,72,153,0.2) 50%, rgba(249,115,22,0.15) 100%)",
      };
    default:
      return {};
  }
}

/* ═══════════════════════════════════════════════════════════════
   CODE GENERATORS
   ═══════════════════════════════════════════════════════════════ */

function generateCode(
  tab: string,
  comp: string,
  motion: string,
  effect: string,
  depth: number,
  duration: number
): string {
  const m = motion.toLowerCase();
  const e = effect.toLowerCase();
  const d = depth;
  const dur = duration;

  switch (tab) {
    case "HTML":
      return generateHTML(comp, m, e, d, dur);
    case "CSS":
      return generateCSS(comp, motion, effect, depth, duration);
    case "React":
      return generateReact(comp, motion, effect, depth, duration);
    case "Vue":
      return generateVue(comp, motion, effect, depth, duration);
    case "Svelte":
      return generateSvelte(comp, motion, effect, depth, duration);
    case "Web Components":
      return generateWC(comp, motion, effect, depth, duration);
    default:
      return "";
  }
}

function getEffectCSSBlock(effect: string, depth: number): string {
  const d = depth / 100;
  switch (effect) {
    case "Glass":
      return `  /* Effect: Glass */
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(${16 + d * 12}px) saturate(${(1 + d * 0.4).toFixed(1)});
  border: 1px solid rgba(255, 255, 255, 0.08);`;
    case "Liquid":
      return `  /* Effect: Liquid */
  background: linear-gradient(
    135deg,
    rgba(168, 85, 247, 0.15) 0%,
    rgba(236, 72, 153, 0.12) 50%,
    rgba(249, 115, 22, 0.1) 100%
  );
  border-radius: 24px;
  border: 1px solid rgba(168, 85, 247, 0.15);`;
    case "Neon":
      return `  /* Effect: Neon */
  box-shadow:
    0 0 5px rgba(168, 85, 247, ${(0.3 + d * 0.4).toFixed(2)}),
    0 0 20px rgba(168, 85, 247, ${(0.15 + d * 0.2).toFixed(2)}),
    0 0 40px rgba(168, 85, 247, ${(0.05 + d * 0.1).toFixed(2)}),
    inset 0 0 10px rgba(168, 85, 247, 0.05);
  border: 1px solid rgba(168, 85, 247, 0.3);`;
    case "Metal":
      return `  /* Effect: Metal */
  background: linear-gradient(145deg,
    rgba(255,255,255,${(0.08 + d * 0.06).toFixed(2)}) 0%,
    rgba(255,255,255,${(0.02 + d * 0.02).toFixed(2)}) 50%,
    rgba(255,255,255,${(0.06 + d * 0.04).toFixed(2)}) 100%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,${(0.1 + d * 0.1).toFixed(2)}),
    0 ${Math.round(4 + d * 16)}px ${Math.round(8 + d * 24)}px rgba(0,0,0,${(0.2 + d * 0.15).toFixed(2)});`;
    case "Blur":
      return `  /* Effect: Blur */
  filter: blur(${(d * 2).toFixed(1)}px);
  opacity: ${(0.7 + d * 0.3).toFixed(2)};`;
    case "Depth":
      return `  /* Effect: Depth */
  box-shadow:
    0 ${Math.round(2 + d * 8)}px ${Math.round(4 + d * 16)}px rgba(0,0,0,${(0.08 + d * 0.12).toFixed(2)}),
    0 ${Math.round(8 + d * 20)}px ${Math.round(16 + d * 40)}px rgba(0,0,0,${(0.04 + d * 0.08).toFixed(2)}),
    0 ${Math.round(16 + d * 30)}px ${Math.round(32 + d * 60)}px rgba(0,0,0,${(0.02 + d * 0.04).toFixed(2)});
  transform: translateZ(0);`;
    case "Glow":
      return `  /* Effect: Glow */
  box-shadow:
    0 0 ${Math.round(10 + d * 20)}px rgba(168, 85, 247, ${(0.08 + d * 0.12).toFixed(2)}),
    0 0 ${Math.round(30 + d * 40)}px rgba(168, 85, 247, ${(0.03 + d * 0.06).toFixed(2)});
  border: 1px solid rgba(168, 85, 247, 0.1);`;
    default:
      return "  /* No effect */";
  }
}

function getMotionHoverCSS(motion: string): string {
  switch (motion) {
    case "Spring":
      return "  transform: translateY(-4px) scale(1.02);\n  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);";
    case "Bounce":
      return "  transform: translateY(-8px) scale(1.05);";
    case "Magnetic":
      return "  transform: translateY(-3px) scale(1.01) rotate(0.5deg);";
    case "Elastic":
      return "  transform: scale(1.04);";
    case "Smooth":
      return "  transform: translateY(-2px);";
    case "Physics":
      return "  transform: translateY(-6px) rotateX(2deg);";
    default:
      return "  /* No hover motion */";
  }
}

function generateHTML(comp: string, m: string, e: string, d: number, dur: number): string {
  const classBase = "ferrum";
  const motionAttr = m !== "none" ? `\n  data-motion="${m}"` : "";
  const effectAttr = e !== "none" ? `\n  data-effect="${e}"` : "";
  const depthAttr = `\n  data-depth="${d}"`;
  const durationAttr = `\n  data-duration="${dur}"`;

  switch (comp) {
    case "card":
      return `<div class="${classBase}-card"${motionAttr}${effectAttr}${depthAttr}${durationAttr}>
  <h3>Premium Interface</h3>
  <p>Built with Ferrum Engine</p>
  <button class="${classBase}-btn">Get Started</button>
</div>`;
    case "button":
      return `<button class="${classBase}-button"${motionAttr}${effectAttr}${depthAttr}${durationAttr}>
  <span>Get Started</span>
  <svg><!-- Arrow icon --></svg>
</button>`;
    case "modal":
      return `<div class="${classBase}-overlay"${motionAttr}${durationAttr}>
  <div class="${classBase}-modal"${effectAttr}${depthAttr}>
    <div class="${classBase}-modal-header">
      <h3>Confirm Action</h3>
      <button class="${classBase}-close">&times;</button>
    </div>
    <p>Are you sure you want to proceed?</p>
    <div class="${classBase}-modal-actions">
      <button>Cancel</button>
      <button>Confirm</button>
    </div>
  </div>
</div>`;
    case "dashboard":
      return `<div class="${classBase}-dashboard"${motionAttr}${effectAttr}${depthAttr}${durationAttr}>
  <div class="${classBase}-stat">
    <span class="label">Revenue</span>
    <span class="value">$12,400</span>
    <span class="change">+24%</span>
  </div>
  <div class="${classBase}-stat">
    <span class="label">Users</span>
    <span class="value">1,842</span>
    <span class="change">+12%</span>
  </div>
  <div class="${classBase}-chart">
    <!-- Mini chart visualization -->
  </div>
</div>`;
    case "navigation":
      return `<nav class="${classBase}-nav"${motionAttr}${effectAttr}${depthAttr}${durationAttr}>
  <a class="${classBase}-logo" href="/">Ferrum</a>
  <div class="${classBase}-nav-links">
    <a href="/docs">Docs</a>
    <a href="/components">Components</a>
    <a href="/playground">Playground</a>
  </div>
  <button class="${classBase}-cta">Get Started</button>
</nav>`;
    case "hero":
      return `<section class="${classBase}-hero"${motionAttr}${effectAttr}${depthAttr}${durationAttr}>
  <span class="badge">v2.0 Now Available</span>
  <h1>Build Interfaces<br/>That Feel Alive</h1>
  <p>Motion, effects, and depth — crafted for<br/>modern web experiences.</p>
  <div class="actions">
    <button>Get Started</button>
    <button variant="ghost">Documentation</button>
  </div>
</section>`;
    default:
      return `<div class="${classBase}">...</div>`;
  }
}

function generateCSS(comp: string, motion: string, effect: string, depth: number, _duration: number): string {
  const className = `.ferrum-${comp}`;
  const motionBlock = motion === "None"
    ? "  /* Motion: None */"
    : `  /* Motion: ${motion} */
  transition: ${motionTransitions[motion]};`;
  const effectBlock = getEffectCSSBlock(effect, depth);
  const hoverBlock = getMotionHoverCSS(motion);

  const baseCSS = `${className} {
${motionBlock}

${effectBlock}

  /* Depth: ${depth} */
  border-radius: 1rem;
  padding: 1.5rem;
}

${className}:hover {
${hoverBlock}
}`;

  return baseCSS;
}

function generateReact(comp: string, _motion: string, effect: string, _depth: number, duration: number): string {
  const effectVal = effect.toLowerCase();
  const effectClass = `rc-${effectVal}`;

  switch (comp) {
    case "card":
      return `import './ferrum.css';

export function MyCard() {
  return (
    <div
      className="${effectClass} p-6 rounded-2xl bg-card border border-border"
      style={{ animationDuration: '${duration}s' }}
    >
      <h3>Premium Interface</h3>
      <p>Built with Ferrum Engine</p>
    </div>
  );
}`;
    case "button":
      return `import './ferrum.css';

export function MyButton() {
  return (
    <button
      className="${effectClass} px-6 py-3 rounded-xl font-semibold"
      style={{ animationDuration: '${duration}s' }}
    >
      Get Started
    </button>
  );
}`;
    case "modal":
      return `import './ferrum.css';

export function Modal({ open }: { open: boolean }) {
  if (!open) return null;
  return (
    <div className="${effectClass} fixed inset-0 z-50 flex items-center justify-center">
      <div className="p-8 rounded-2xl bg-card border border-border shadow-2xl">
        <h3>Confirm Action</h3>
        <p>Are you sure you want to proceed?</p>
      </div>
    </div>
  );
}`;
    case "dashboard":
      return `import './ferrum.css';

export function Dashboard() {
  return (
    <div
      className="${effectClass} grid grid-cols-3 gap-4 p-6"
      style={{ animationDuration: '${duration}s' }}
    >
      <Stat label="Revenue" value="$12,400" />
      <Stat label="Users" value="1,842" />
      <Stat label="Conversion" value="3.2%" />
    </div>
  );
}`;
    case "navigation":
      return `import './ferrum.css';

export function Navigation() {
  return (
    <nav className="${effectClass} flex items-center gap-6 p-4 border-b">
      <a href="/docs">Docs</a>
      <a href="/components">Components</a>
      <a href="/playground">Playground</a>
      <button className="ml-auto px-4 py-2 rounded-lg bg-primary text-white">
        Get Started
      </button>
    </nav>
  );
}`;
    case "hero":
      return `import './ferrum.css';

export function Hero() {
  return (
    <section
      className="${effectClass} flex flex-col items-center text-center py-24"
      style={{ animationDuration: '${duration}s' }}
    >
      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-4">
        v2.0 Now Available
      </span>
      <h1 className="text-5xl font-bold">Build Interfaces That Feel Alive</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Motion, effects, and depth — crafted for modern web.
      </p>
    </section>
  );
}`;
    default:
      return `import './ferrum.css';

export function MyComponent() {
  return (
    <div className="${effectClass}" style={{ animationDuration: '${duration}s' }}>
      <h3>Premium Interface</h3>
    </div>
  );
}`;
  }
}

function generateVue(_comp: string, _motion: string, effect: string, _depth: number, duration: number): string {
  const effectVal = effect.toLowerCase();
  const effectClass = `rc-${effectVal}`;

  return `<script setup lang="ts">
import './ferrum.css';
</script>

<template>
  <div
    :class="'${effectClass} p-6 rounded-2xl'"
    :style="{ animationDuration: '${duration}s' }"
  >
    <h3>Premium Interface</h3>
    <p>Built with Ferrum Engine</p>
  </div>
</template>`;
}

function generateSvelte(_comp: string, _motion: string, effect: string, _depth: number, duration: number): string {
  const effectVal = effect.toLowerCase();
  const effectClass = `rc-${effectVal}`;

  return `<script lang="ts">
  import './ferrum.css';
</script>

<div
  class="${effectClass} p-6 rounded-2xl"
  style="animation-duration: ${duration}s"
>
  <h3>Premium Interface</h3>
  <p>Built with Ferrum Engine</p>
</div>`;
}

function generateWC(_comp: string, _motion: string, effect: string, _depth: number, duration: number): string {
  const effectVal = effect.toLowerCase();
  const effectClass = `rc-${effectVal}`;

  return `<!-- Include FerrumEngine CSS -->
<link rel="stylesheet" href="ferrum.css" />

<div
  class="${effectClass} p-6 rounded-2xl"
  style="animation-duration: ${duration}s"
>
  <h3>Premium Interface</h3>
  <p>Built with Ferrum Engine</p>
</div>`;
}

/* ═══════════════════════════════════════════════════════════════
   LIVE PREVIEW COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function PreviewCard({ effect, motion, depth }: { effect: string; motion: string; depth: number }) {
  const [hovered, setHovered] = useState(false);
  const baseStyle: CSSProperties = {
    borderRadius: "1rem",
    padding: "1.5rem",
    transition: motionTransitions[motion],
    transform: hovered ? motionHoverTransforms[motion] : "none",
    ...getEffectStyles(effect, depth),
    ...(hovered ? getEffectHoverStyles(effect, depth) : {}),
  };

  return (
    <div
      style={baseStyle}
      className="bg-foreground/[0.03] cursor-pointer w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="w-10 h-10 rounded-lg bg-purple-500/20 mb-3 flex items-center justify-center">
        <Star className="w-5 h-5 text-purple-400" />
      </div>
      <h3 className="text-sm font-semibold text-foreground/90">Premium Interface</h3>
      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
        Built with Ferrum Engine for next-gen web experiences.
      </p>
      <div className="flex gap-2 mt-4">
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400/80 border border-purple-500/20">
          Motion
        </span>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400/80 border border-pink-500/20">
          Effects
        </span>
      </div>
    </div>
  );
}

function PreviewButton({ effect, motion, depth }: { effect: string; motion: string; depth: number }) {
  const [hovered, setHovered] = useState(false);
  const baseStyle: CSSProperties = {
    borderRadius: "0.75rem",
    padding: "0.75rem 1.5rem",
    transition: motionTransitions[motion],
    transform: hovered ? motionHoverTransforms[motion] : "none",
    ...getEffectStyles(effect, depth),
    ...(hovered ? getEffectHoverStyles(effect, depth) : {}),
  };

  return (
    <div className="flex items-center justify-center w-full py-6">
      <div
        style={baseStyle}
        className="bg-foreground/[0.03] cursor-pointer inline-flex items-center gap-2"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Play className="w-4 h-4 text-purple-400" />
        <span className="text-sm font-medium text-foreground/90">Get Started</span>
        <Code className="w-3.5 h-3.5 text-muted-foreground/60" />
      </div>
    </div>
  );
}

function PreviewModal({ effect, motion, depth }: { effect: string; motion: string; depth: number }) {
  const [hovered, setHovered] = useState(false);
  const baseStyle: CSSProperties = {
    borderRadius: "1rem",
    padding: "0",
    transition: motionTransitions[motion],
    transform: hovered ? motionHoverTransforms[motion] : "none",
    overflow: "hidden",
    ...getEffectStyles(effect, depth),
    ...(hovered ? getEffectHoverStyles(effect, depth) : {}),
  };

  return (
    <div
      className="w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Backdrop */}
      <div className="relative bg-black/20 rounded-xl p-4">
        {/* Modal */}
        <div style={baseStyle} className="bg-card/90">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
            <h3 className="text-sm font-semibold text-foreground/90">Confirm Action</h3>
            <div className="w-6 h-6 rounded-md bg-foreground/[0.06] flex items-center justify-center text-muted-foreground text-xs">&times;</div>
          </div>
          {/* Body */}
          <div className="px-4 py-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Are you sure you want to proceed? This action cannot be undone.
            </p>
          </div>
          {/* Footer */}
          <div className="flex justify-end gap-2 px-4 py-3 border-t border-border/50">
            <div className="px-3 py-1.5 rounded-lg bg-foreground/[0.04] text-xs text-muted-foreground">Cancel</div>
            <div className="px-3 py-1.5 rounded-lg bg-purple-600/80 text-xs text-white">Confirm</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewDashboard({ effect, motion, depth }: { effect: string; motion: string; depth: number }) {
  const [hovered, setHovered] = useState(false);
  const baseStyle: CSSProperties = {
    borderRadius: "1rem",
    transition: motionTransitions[motion],
    transform: hovered ? motionHoverTransforms[motion] : "none",
    ...getEffectStyles(effect, depth),
    ...(hovered ? getEffectHoverStyles(effect, depth) : {}),
  };

  const stats = [
    { label: "Revenue", value: "$12,400", change: "+24%", up: true },
    { label: "Users", value: "1,842", change: "+12%", up: true },
    { label: "Bounce", value: "2.4%", change: "-8%", up: false },
  ];

  return (
    <div
      style={baseStyle}
      className="bg-foreground/[0.03] cursor-pointer w-full p-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="grid grid-cols-3 gap-2 mb-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-foreground/[0.04] rounded-lg p-2.5">
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
            <p className="text-sm font-semibold text-foreground/90 mt-0.5">{s.value}</p>
            <p className={`text-[10px] mt-0.5 ${s.up ? "text-emerald-400/80" : "text-rose-400/80"}`}>
              {s.change}
            </p>
          </div>
        ))}
      </div>
      {/* Mini chart placeholder */}
      <div className="bg-foreground/[0.04] rounded-lg p-3 h-24 flex items-end gap-1">
        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-purple-500/30"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function PreviewNavigation({ effect, motion, depth }: { effect: string; motion: string; depth: number }) {
  const [hovered, setHovered] = useState(false);
  const baseStyle: CSSProperties = {
    borderRadius: "0.75rem",
    transition: motionTransitions[motion],
    transform: hovered ? motionHoverTransforms[motion] : "none",
    ...getEffectStyles(effect, depth),
    ...(hovered ? getEffectHoverStyles(effect, depth) : {}),
  };

  const links = ["Docs", "Components", "Playground"];

  return (
    <div
      style={baseStyle}
      className="bg-foreground/[0.03] cursor-pointer w-full px-4 py-2.5 flex items-center justify-between"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="text-sm font-bold text-foreground/90">Ferrum</span>
      <div className="flex gap-3">
        {links.map((l) => (
          <span key={l} className="text-[11px] text-muted-foreground hover:text-foreground/70 transition-colors">
            {l}
          </span>
        ))}
      </div>
      <div className="px-3 py-1 rounded-lg bg-purple-600/80 text-[11px] text-white font-medium">
        Start
      </div>
    </div>
  );
}

function PreviewHero({ effect, motion, depth }: { effect: string; motion: string; depth: number }) {
  const [hovered, setHovered] = useState(false);
  const baseStyle: CSSProperties = {
    borderRadius: "1rem",
    transition: motionTransitions[motion],
    transform: hovered ? motionHoverTransforms[motion] : "none",
    ...getEffectStyles(effect, depth),
    ...(hovered ? getEffectHoverStyles(effect, depth) : {}),
  };

  return (
    <div
      style={baseStyle}
      className="bg-foreground/[0.03] cursor-pointer w-full p-5 text-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400/80 border border-purple-500/20 inline-block mb-3">
        v2.0 Now Available
      </span>
      <h3 className="text-lg font-bold text-foreground/90 leading-tight">
        Build Interfaces
        <br />
        That Feel Alive
      </h3>
      <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
        Motion, effects, and depth — crafted for
        <br />
        modern web experiences.
      </p>
      <div className="flex justify-center gap-2 mt-4">
        <div className="px-3 py-1.5 rounded-lg bg-purple-600/80 text-[11px] text-white font-medium">
          Get Started
        </div>
        <div className="px-3 py-1.5 rounded-lg bg-foreground/[0.06] text-[11px] text-muted-foreground font-medium">
          Docs
        </div>
      </div>
    </div>
  );
}

const previewMap: Record<string, React.ComponentType<{ effect: string; motion: string; depth: string | number }>> = {
  card: PreviewCard as React.ComponentType<{ effect: string; motion: string; depth: string | number }>,
  button: PreviewButton as React.ComponentType<{ effect: string; motion: string; depth: string | number }>,
  modal: PreviewModal as React.ComponentType<{ effect: string; motion: string; depth: string | number }>,
  dashboard: PreviewDashboard as React.ComponentType<{ effect: string; motion: string; depth: string | number }>,
  navigation: PreviewNavigation as React.ComponentType<{ effect: string; motion: string; depth: string | number }>,
  hero: PreviewHero as React.ComponentType<{ effect: string; motion: string; depth: string | number }>,
};

/* ═══════════════════════════════════════════════════════════════
   VIEWPORT SIZES
   ═══════════════════════════════════════════════════════════════ */

const viewportSizes: Record<string, string> = {
  desktop: "max-w-md",
  tablet: "max-w-xs",
  mobile: "max-w-[280px]",
};

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export function PlaygroundDemo() {
  const [activeComponent, setActiveComponent] = useState("card");
  const [motion, setMotion] = useState("Spring");
  const [effect, setEffect] = useState("Glass");
  const [depth, setDepth] = useState(50);
  const [duration, setDuration] = useState(300);
  const [codeTab, setCodeTab] = useState("React");
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [copied, setCopied] = useState(false);

  const generatedCode = useMemo(
    () => generateCode(codeTab, activeComponent, motion, effect, depth, duration),
    [codeTab, activeComponent, motion, effect, depth, duration]
  );

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [generatedCode]);

  const ActivePreview = previewMap[activeComponent];

  return (
    <section id="playground-section" className="relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-28 sm:py-36">
        {/* ─── Header ─── */}
        <Reveal>
          <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">
            Playground
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Build. Preview. Ship.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mt-5">
            Select a component, customize its motion and effects, then copy production-ready
            code for any framework.
          </p>
        </Reveal>

        {/* ─── Playground Container ─── */}
        <Reveal delay={0.15}>
          <div className="mt-12 bg-foreground/[0.02] border border-border rounded-2xl overflow-hidden">
            {/* ─── Component Selector Tabs ─── */}
            <div className="border-b border-border px-2">
              <div className="flex overflow-x-auto gap-1 py-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                {components.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveComponent(id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all shrink-0 ${
                      activeComponent === id
                        ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        : "text-muted-foreground hover:text-foreground/80 hover:bg-foreground/[0.04]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* ─── 3-Panel Layout ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_1fr] min-h-[520px]">
              {/* ═══ Controls Panel ═══ */}
              <div className="border-b lg:border-b-0 lg:border-r border-border p-5 space-y-6">
                {/* Motion */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Motion
                  </label>
                  <Select value={motion} onValueChange={setMotion} aria-label="Motion">
                    {motions.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                {/* Effect */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Effect
                  </label>
                  <Select value={effect} onValueChange={setEffect} aria-label="Effect">
                    {effects.map((e) => (
                      <SelectItem key={e} value={e}>
                        {e}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                {/* Depth */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Depth
                    </label>
                    <span className="text-xs text-muted-foreground/60 tabular-nums">{depth}</span>
                  </div>
                  <Slider
                    value={[depth]}
                    onValueChange={([v]) => setDepth(v ?? 0)}
                    min={0}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                {/* Duration */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Duration
                    </label>
                    <span className="text-xs text-muted-foreground/60 tabular-nums">{duration}ms</span>
                  </div>
                  <Slider
                    value={[duration]}
                    onValueChange={([v]) => setDuration(v ?? 100)}
                    min={100}
                    max={1000}
                    step={50}
                    className="w-full"
                  />
                </div>
              </div>

              {/* ═══ Live Preview Panel ═══ */}
              <div className="border-b lg:border-b-0 lg:border-r border-border flex flex-col">
                <div className="px-4 py-3 border-b border-border/60 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
                  </div>
                  <span className="text-[11px] text-muted-foreground/50 ml-2">Preview</span>
                </div>

                {/* Preview area */}
                <div className="flex-1 flex items-center justify-center p-8 bg-[repeating-conic-gradient(rgba(255,255,255,0.02)_0%_25%,transparent_0%_50%)] dark:bg-[repeating-conic-gradient(rgba(255,255,255,0.015)_0%_25%,transparent_0%_50%)] bg-[length:16px_16px]">
                  <div className={`${viewportSizes[viewport]} w-full transition-all duration-300`}>
                    {ActivePreview && (
                      <ActivePreview
                        effect={effect}
                        motion={motion}
                        depth={depth}
                      />
                    )}
                  </div>
                </div>

                {/* Viewport toggle */}
                <div className="px-4 py-2.5 border-t border-border/60 flex items-center justify-center gap-1">
                  {(
                    [
                      { key: "desktop", icon: Monitor, label: "Desktop" },
                      { key: "tablet", icon: Tablet, label: "Tablet" },
                      { key: "mobile", icon: Smartphone, label: "Mobile" },
                    ] as const
                  ).map(({ key, icon: VpIcon, label }) => (
                    <button
                      key={key}
                      onClick={() => setViewport(key)}
                      title={label}
                      className={`p-2 rounded-lg transition-all ${
                        viewport === key
                          ? "bg-foreground/[0.08] text-foreground/90"
                          : "text-muted-foreground/50 hover:text-muted-foreground hover:bg-foreground/[0.04]"
                      }`}
                    >
                      <VpIcon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>

              {/* ═══ Code Panel ═══ */}
              <div className="flex flex-col min-h-0">
                {/* Code tabs + copy */}
                <div className="px-4 py-2.5 border-b border-border/60 flex items-center justify-between shrink-0">
                  <div className="flex overflow-x-auto gap-0.5" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    {codeTabs.map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setCodeTab(tab)}
                        className={`px-3 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-all ${
                          codeTab === tab
                            ? "bg-foreground/[0.08] text-foreground/90"
                            : "text-muted-foreground/50 hover:text-muted-foreground hover:bg-foreground/[0.04]"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleCopy}
                    className="ml-2 p-1.5 rounded-md text-muted-foreground/60 hover:text-foreground/80 hover:bg-foreground/[0.06] transition-all shrink-0"
                    title={copied ? "Copied!" : "Copy code"}
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Code block */}
                <div className="flex-1 min-h-0 overflow-hidden bg-muted">
                  <ScrollArea className="h-full">
                    <pre className="p-5 text-[12px] leading-[1.7] font-mono text-muted-foreground/80 overflow-x-auto whitespace-pre">
                      <code>{generatedCode}</code>
                    </pre>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}