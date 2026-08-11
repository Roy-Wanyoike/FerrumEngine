import {
  ArrowRight, MousePointer, Eye, CircleDot, Braces, Sparkles,
  MousePointerClick, Layers, LayoutDashboard, Box, Lightbulb,
  Star, ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   SECTION 7 — LIVE EXAMPLES
   Grid of effect categories with previews
   ═══════════════════════════════════════════════════════════════ */

const exampleCategories = [
  { name: "Entrance Animations", count: 68, icon: ArrowRight, desc: "Draw attention the moment elements appear. Slide, fade, scale, and rotate into view." },
  { name: "Hover Effects", count: 88, icon: MousePointer, desc: "Transform static elements into interactive moments. Magnetic pulls, spotlight tracking, 3D tilts." },
  { name: "Glass & Morphism", count: 44, icon: Eye, desc: "Frosted surfaces, liquid distortion, and translucent layers. All GPU-accelerated via Paint API." },
  { name: "Loading States", count: 36, icon: CircleDot, desc: "Skeleton screens, shimmer effects, pulse indicators, and progress animations that feel intentional." },
  { name: "Text Effects", count: 52, icon: Braces, desc: "Gradient shifts, character reveals, typewriter effects, and kinetic typography for headlines." },
  { name: "Background Effects", count: 49, icon: Sparkles, desc: "Aurora gradients, particle fields, mesh backgrounds, and atmospheric noise patterns." },
  { name: "Micro-interactions", count: 58, icon: MousePointerClick, desc: "Button ripples, toggle morphs, checkbox fills, and feedback that acknowledges every action." },
  { name: "Scroll Animations", count: 47, icon: Layers, desc: "Scroll-driven reveals, parallax layers, sticky transforms, and progress-based animations." },
  { name: "Layout Transitions", count: 29, icon: LayoutDashboard, desc: "Grid morphing, list reordering, container queries, and responsive layout animations." },
  { name: "3D Transforms", count: 27, icon: Box, desc: "Perspective shifts, card flips, depth rotations, and 3D spatial arrangements." },
  { name: "Neon & Glow", count: 22, icon: Lightbulb, desc: "Neon borders, glow shadows, light trails, and luminous accent effects." },
  { name: "Attention & Status", count: 22, icon: Star, desc: "Pulse indicators, shake alerts, bounce notifications, and status change animations." },
];

export function LiveExamplesSection() {
  return (
    <section id="examples" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[400px] bg-pink-500/[0.015] rounded-full blur-[140px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <div className="animate-in fade-in-0 slide-in-from-bottom-3"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-purple-400 mb-4">Live Examples</p></div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.05s", animationFillMode: "both" }}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            542+ effects.<br /><span className="text-muted-foreground/50">Every one production-ready.</span>
          </h2>
        </div>
        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
          <p className="text-lg text-muted-foreground/60 max-w-2xl leading-relaxed mt-5">
            Every effect is GPU-accelerated, accessible, and framework-independent. Browse by
            category, preview live, copy the code, and ship. No configuration. No setup. Just
            add the class.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {exampleCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div className="animate-in fade-in-0 slide-in-from-bottom-2" key={cat.name}>
                <Link href="/effects"
                  className="group w-full text-left rounded-2xl border border-border/50 bg-foreground/[0.015] hover:bg-foreground/[0.03] transition-all duration-300 p-5 h-full block">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/15 flex items-center justify-center group-hover:bg-purple-500/15 transition-colors">
                      <Icon className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground/40 tabular-nums">{cat.count} effects</span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1.5 group-hover:text-foreground transition-colors">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground/60 leading-relaxed line-clamp-2">{cat.desc}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-purple-400/60 group-hover:text-purple-400 transition-colors">
                    Explore <ArrowUpRight className="w-3 h-3" />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
          <div className="mt-12 text-center">
            <Link href="/effects"
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl text-sm font-medium text-foreground/70 hover:text-foreground bg-foreground/[0.05] hover:bg-foreground/[0.07] transition-all border border-border active:scale-[0.98]">
              View All 542+ Effects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
