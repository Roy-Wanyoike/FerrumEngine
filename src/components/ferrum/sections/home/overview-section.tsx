import { Zap, Eye, Blocks, Terminal, Check, type LucideIcon } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — PLATFORM OVERVIEW
   Apple product-grid style — 4 pillars
   ═══════════════════════════════════════════════════════════════ */

type PillarColor = "violet" | "pink" | "cyan" | "amber";

type PillarStyle = { bg: string; border: string; text: string; iconBg: string };

const pillarColors: Record<PillarColor, PillarStyle> = {
  violet: { bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400", iconBg: "bg-violet-500/20" },
  pink: { bg: "bg-pink-500/10", border: "border-pink-500/20", text: "text-pink-400", iconBg: "bg-pink-500/20" },
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-400", iconBg: "bg-cyan-500/20" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400", iconBg: "bg-amber-500/20" },
};

interface Pillar {
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  color: PillarColor;
}

const pillars: Pillar[] = [
  {
    icon: Zap, title: "Motion Engine", tagline: "Physics-based animation that means something",
    description: "Spring dynamics, scroll-driven animations, gesture recognition, and timeline composition. Not just movement — motion with purpose. Every animation tells a story, guides attention, and reinforces interaction patterns.",
    features: ["Spring physics engine", "Scroll-driven animations", "Gesture recognition", "Timeline composition", "542+ ready-to-use effects", "Zero jank on mobile"],
    color: "violet",
  },
  {
    icon: Eye, title: "Visual Effects", tagline: "GPU-accelerated VFX for the web",
    description: "Glass morphism, liquid effects, atmospheric particles, distortion shaders, energy fields, and neon borders — all running at 60fps via Houdini Paint API worklets. No WebGL required. No canvas overhead. Pure CSS.",
    features: ["Glass & liquid morphism", "Atmospheric particles", "Distortion shaders", "Energy systems", "7 Paint API worklets", "Hardware accelerated"],
    color: "pink",
  },
  {
    icon: Blocks, title: "Component System", tagline: "Semantic primitives, accessible by default",
    description: "16 production-ready components designed around intent, not implementation. A hero section knows it's a hero. A pricing card knows it's a pricing card. Semantic HTML with ARIA built in, theme-aware, and composable.",
    features: ["16 semantic components", "ARIA-first design", "Theme-aware styling", "Composable patterns", "Framework adapters", "TypeScript native"],
    color: "cyan",
  },
  {
    icon: Terminal, title: "Compiler & Tokens", tagline: "Optimized output from a single source of truth",
    description: "A 9-pass compilation pipeline that parses, analyzes, tree-shakes, and optimizes your CSS. Design tokens flow from a single definition to CSS, SCSS, JSON, TypeScript, and Tailwind — automatically.",
    features: ["9-pass optimization", "Tree-shaking & DCE", "5 output formats", "Runtime theming", "Cross-platform tokens", "Dead code elimination"],
    color: "amber",
  },
];

export function PlatformOverviewSection() {
  return (
    <section id="platform" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-violet-500/[0.02] rounded-full blur-[160px]" />
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[300px] bg-cyan-500/[0.015] rounded-full blur-[120px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="animate-in fade-in-0 slide-in-from-bottom-3"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-purple-400 mb-4">Platform</p></div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.05s", animationFillMode: "both" }}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight max-w-3xl">
            Four pillars.<br /><span className="text-muted-foreground/50">One unified system.</span>
          </h2>
        </div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
          <p className="text-lg text-muted-foreground/60 max-w-2xl leading-relaxed mt-5">
            Ferrum isn&apos;t a collection of libraries. It&apos;s a platform where motion, effects,
            components, and optimization work together by design — not by integration. Import what
            you need. The coherence is built in.
          </p>
        </div>
        <div className="mt-16 grid md:grid-cols-2 gap-5">
          {pillars.map((p) => {
            const Icon = p.icon;
            const c = pillarColors[p.color];
            return (
              <div key={p.title} className="animate-in fade-in-0 slide-in-from-bottom-2">
                <div className="rounded-2xl border border-border/50 bg-foreground/[0.01] hover:border-border/80 transition-all duration-300 h-full">
                  <div className="relative z-20 p-6 sm:p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-2xl ${c.iconBg} ${c.border} border flex items-center justify-center`}><Icon className={`w-6 h-6 ${c.text}`} /></div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground">{p.title}</h3>
                        <p className={`text-xs ${c.text} font-medium`}>{p.tagline}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground/70 leading-relaxed mb-5">{p.description}</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {p.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-[11px] text-muted-foreground/50">
                          <Check className={`w-3 h-3 ${c.text} shrink-0 opacity-60`} />{f}
                        </div>
                      ))}
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
