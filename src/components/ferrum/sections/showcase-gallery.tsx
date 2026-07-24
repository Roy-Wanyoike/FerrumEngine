"use client";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/ferrum/scroll-reveal";
import { AnimatedCard } from "@/components/ferrum/animated-components";
import { spotlightMap } from "@/lib/animation-colors";
import {
  Monitor, BarChart3, Heart, Gamepad2, Code, Smartphone,
  ShoppingBag, Landmark, GraduationCap, Globe,
  ExternalLink, Layers, Zap,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   SHOWCASE GALLERY
   Production-quality applications that prove Ferrum's capabilities
   ═══════════════════════════════════════════════════════════════ */

interface ShowcaseProject {
  title: string;
  category: string;
  description: string;
  techniques: string[];
  icon: React.ElementType;
  color: string;
  status: "live" | "coming-soon";
  url?: string;
}

const showcases: ShowcaseProject[] = [
  {
    title: "Glass OS Desktop",
    category: "Interface System",
    description: "A complete desktop environment where every panel, window, and widget moves with natural physics. Drag windows with weight, minimize with spring dynamics, and resize with smooth constraints. The entire interface feels like touching real glass — translucent, layered, and responsive.",
    techniques: ["Spring Physics", "Glass Morphism", "Depth Stacking", "Drag Inertia", "Window Z-Management", "Resize Constraints"],
    icon: Monitor,
    color: "purple",
    status: "coming-soon",
  },
  {
    title: "Real-Time Analytics",
    category: "Dashboard",
    description: "Charts that draw themselves with purpose — line charts trace their path as if an analyst is drawing them live. KPI cards count up from zero. Pie charts assemble from segments. Every data point tells its story through motion, making complex data immediately understandable.",
    techniques: ["Staggered Reveal", "Number Animation", "Path Drawing", "Data-Driven Motion", "Responsive Charts"],
    icon: BarChart3,
    color: "sky",
    status: "coming-soon",
  },
  {
    title: "Healthcare Workflow",
    category: "Enterprise App",
    description: "An animated Kanban board where patient cards flow between stages — intake, diagnosis, treatment, discharge. Cards have priority indicators that pulse gently. The board rearranges with satisfying physics when columns resize, making status changes immediately visible.",
    techniques: ["Kanban Physics", "Priority Indicators", "Status Transitions", "Column Resizing", "Accessible Status Colors"],
    icon: Heart,
    color: "emerald",
    status: "coming-soon",
  },
  {
    title: "RPG Game UI",
    category: "Game Interface",
    description: "Game interfaces demand the highest bar: health bars that drain with fluid animation, inventory items that physically slot into place, spell cooldowns that sweep like clockwork. This demo pushes CSS to its absolute limit, proving that browser-native effects can match native game UIs.",
    techniques: ["HP Bar Fluid Drain", "Inventory Slot Physics", "Cooldown Sweep", "Damage Flash", "Rarity Glow Effects"],
    icon: Gamepad2,
    color: "rose",
    status: "coming-soon",
  },
  {
    title: "Developer IDE",
    category: "Development Tool",
    description: "A code editor where every interaction is intentional. Files open with a smooth expand. The terminal slides up with weight. Autocomplete suggestions appear with staggered reveals. Error highlights pulse to draw attention without annoying, creating a focused, calm coding environment.",
    techniques: ["Panel Resizing", "Tab Stacking", "Terminal Slide", "Staggered Autocomplete", "Pulsing Errors"],
    icon: Code,
    color: "amber",
    status: "coming-soon",
  },
  {
    title: "E-Commerce Experience",
    category: "Consumer App",
    description: "Product cards that tilt toward the cursor. Add-to-cart animations that feel satisfying. Image galleries with smooth crossfade transitions. Price changes that animate. A shopping experience where every micro-interaction builds trust and delight.",
    techniques: ["Product Card Tilt", "Cart Animation", "Image Crossfade", "Price Morph", "Trust Indicators"],
    icon: ShoppingBag,
    color: "pink",
    status: "coming-soon",
  },
  {
    title: "Banking Dashboard",
    category: "Fintech",
    description: "Financial data rendered with precision. Transaction lists with smooth entry animations. Balance displays that count up. Chart transitions that make month-over-month comparisons intuitive. Dark mode that reduces eye strain during long sessions.",
    techniques: ["Count-Up Numbers", "List Entry Animation", "Chart Transitions", "Secure Feel", "Reduced Eye Strain"],
    icon: Landmark,
    color: "blue",
    status: "coming-soon",
  },
  {
    title: "Educational Platform",
    category: "EdTech",
    description: "Learning interfaces that guide attention. Progress indicators that feel rewarding. Quiz feedback that is immediate and clear. Lesson transitions that create a sense of forward momentum. An interface that makes learning feel like progress.",
    techniques: ["Progress Animation", "Quiz Feedback", "Lesson Transitions", "Attention Guidance", "Reward Motion"],
    icon: GraduationCap,
    color: "violet",
    status: "coming-soon",
  },
];

const categories = ["All", "Interface System", "Dashboard", "Enterprise App", "Game Interface", "Development Tool", "Consumer App", "Fintech", "EdTech"];

export function ShowcaseGallery() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Globe className="w-5 h-5 text-purple-400" />
            </div>
            <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70">Showcase Gallery</p>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight max-w-3xl">
            Built with Ferrum
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground/80 max-w-2xl leading-relaxed mt-5">
            Production-quality applications that prove what Ferrum can do. Each showcase
            demonstrates real-world usage patterns across different industries and interaction models.
          </p>
        </Reveal>

        {/* Categories */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span key={cat} className="px-3 py-1.5 rounded-lg border border-border/30 bg-foreground/[0.02] text-xs text-muted-foreground/60 hover:text-foreground hover:border-border/60 transition-colors cursor-default">
                {cat}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Showcase grid */}
        <StaggerContainer className="mt-12 grid md:grid-cols-2 gap-6" delay={0.1}>
          {showcases.map((project, i) => {
            const Icon = project.icon;
            const colors = spotlightMap[project.color as keyof typeof spotlightMap] || spotlightMap.purple;
            const isLive = project.status === "live";
            return (
              <StaggerItem key={project.title}>
                <AnimatedCard
                  spotlightColor={colors.spotlight}
                  glowColor={colors.glow}
                  className="border border-border/40 bg-foreground/[0.015] h-full"
                >
                  <div className="relative z-20 p-6 sm:p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-${project.color}-500/10 border border-${project.color}-500/20 flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 text-${project.color}-400`} />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-foreground">{project.title}</h3>
                          <p className="text-[11px] text-muted-foreground/60">{project.category}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                        isLive
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      }`}>
                        {isLive ? "Live Demo" : "Coming Soon"}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground/70 leading-relaxed mb-5">{project.description}</p>

                    {/* Techniques */}
                    <div className="mb-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40 mb-2">Techniques</p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techniques.slice(0, 4).map((t) => (
                          <span key={t} className="px-2 py-1 rounded-md bg-foreground/[0.03] border border-border/30 text-[11px] text-muted-foreground/60">
                            {t}
                          </span>
                        ))}
                        {project.techniques.length > 4 && (
                          <span className="px-2 py-1 rounded-md bg-foreground/[0.03] border border-border/30 text-[11px] text-muted-foreground/40">
                            +{project.techniques.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Visual placeholder */}
                    <div className="rounded-xl border border-border/30 bg-foreground/[0.015] p-8 flex items-center justify-center min-h-[140px]">
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-xl bg-foreground/[0.04] border border-border/40 flex items-center justify-center mx-auto mb-3">
                          <Layers className="w-6 h-6 text-muted-foreground/40" />
                        </div>
                        <p className="text-xs text-muted-foreground/40 max-w-[200px] mx-auto leading-relaxed">
                          Interactive preview — {project.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Submit CTA */}
        <Reveal delay={0.1}>
          <div className="mt-16 p-8 sm:p-10 rounded-2xl border border-purple-500/15 bg-purple-500/[0.03] text-center">
            <Zap className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-foreground mb-2">Built something with Ferrum?</h3>
            <p className="text-sm text-muted-foreground/70 max-w-lg mx-auto leading-relaxed mb-5">
              We want to feature your work. Submit your project and we will add it to the
              showcase gallery with full credit and a backlink to your repository.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background text-sm font-semibold hover:bg-foreground/90 transition-all">
              Submit Project
              <ExternalLink className="w-4 h-4" />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}