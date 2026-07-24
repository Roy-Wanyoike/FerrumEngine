"use client";

import { Reveal, StaggerContainer, StaggerItem } from "@/components/ferrum/scroll-reveal";
import { AnimatedCard } from "@/components/ferrum/animated-components";
import { spotlightMap } from "@/lib/animation-colors";
import {
  Monitor, BarChart3, Heart, Gamepad2, Code,
} from "lucide-react";

interface Demo {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  description: string;
  techniques: string[];
  visual: string;
}

const demos: Demo[] = [
  {
    title: "Glass OS",
    subtitle: "Operating System Interface",
    icon: Monitor,
    color: "purple",
    description: "A complete desktop environment where every panel, window, and widget moves with natural physics. Drag a window and it has weight. Minimize and it collapses with spring dynamics. The entire interface feels like touching real glass.",
    techniques: ["Spring Physics", "Glass Morphism", "Depth Stacking", "Drag Inertia", "Window Z-Management"],
    visual: "A translucent desktop with floating glass panels, each with subtle frosted borders. Windows cast soft colored shadows that shift as they move. A dock at the bottom with magnification on hover.",
  },
  {
    title: "AI Dashboard",
    subtitle: "Intelligent Analytics",
    icon: BarChart3,
    color: "sky",
    description: "Charts don't just appear — they draw themselves with purpose. Line charts trace their path as if an analyst is drawing them live. Numbers count up from zero. Pie charts assemble from segments. Every data point tells its story.",
    techniques: ["Staggered Reveal", "Number Animation", "Path Drawing", "Data-Driven Motion", "Responsive Charts"],
    visual: "Dark analytics dashboard with multiple chart types. A line chart draws its path in real-time. KPI cards count up. A map pulses with data points. Sidebar filters animate smoothly.",
  },
  {
    title: "Healthcare Workflow",
    subtitle: "Patient Journey System",
    icon: Heart,
    color: "emerald",
    description: "An animated Kanban board where patient cards flow between stages — intake, diagnosis, treatment, discharge. Cards have priority indicators that pulse gently. The board rearranges with satisfying physics when columns resize.",
    techniques: ["Kanban Physics", "Priority Indicators", "Status Transitions", "Column Resizing", "Accessible Status Colors"],
    visual: "Medical Kanban board with four columns. Patient cards have colored priority borders (red/yellow/green). Cards animate between columns. A patient detail panel slides in from the right with test results.",
  },
  {
    title: "Gaming UI",
    subtitle: "AAA-Quality Interface",
    icon: Gamepad2,
    color: "rose",
    description: "Game interfaces demand the highest bar: health bars that drain with fluid animation, inventory items that physically slot into place, spell cooldowns that sweep like clockwork. This demo pushes CSS to its absolute limit.",
    techniques: ["HP Bar Fluid Drain", "Inventory Slot Physics", "Cooldown Sweep", "Damage Flash", "Rarity Glow Effects"],
    visual: "Dark game HUD with a health/mana bar at the bottom. An inventory grid where items have rarity-colored borders. A minimap in the corner. Ability icons with radial cooldown sweep animations.",
  },
  {
    title: "Developer IDE",
    subtitle: "Code Environment",
    icon: Code,
    color: "amber",
    description: "A code editor where every interaction is intentional. Files open with a smooth expand. The terminal slides up with weight. Autocomplete suggestions appear with staggered reveals. Error highlights pulse to draw attention without annoying.",
    techniques: ["Panel Resizing", "Tab Stacking", "Terminal Slide", "Staggered Autocomplete", "Pulsing Errors"],
    visual: "Dark IDE layout with a file tree on the left, code editor in the center, and terminal at the bottom. Tabs have colored indicators. A command palette overlay with fuzzy search. Line numbers fade in.",
  },
];

export function HallOfFame() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <Reveal>
          <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">Showcase</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight max-w-3xl">
            Hall of Fame
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground/60 max-w-2xl leading-relaxed mt-5">
            Every successful platform has one unforgettable demo. These five showcases represent
            the ceiling of what's possible with Ferrum — the interfaces that make developers stop
            and say &quot;I didn't know CSS could do that.&quot;
          </p>
        </Reveal>

        {/* Demos */}
        <div className="mt-16 space-y-8">
          {demos.map((demo, i) => {
            const Icon = demo.icon;
            const colors = spotlightMap[demo.color as keyof typeof spotlightMap] || spotlightMap.purple;
            return (
              <Reveal key={demo.title} delay={i * 0.06}>
                <div className="grid lg:grid-cols-5 gap-6">
                  {/* Visual placeholder */}
                  <div className="lg:col-span-3">
                    <AnimatedCard
                      spotlightColor={colors.spotlight}
                      glowColor={colors.glow}
                      className="border border-border/40 bg-foreground/[0.015] h-full min-h-[280px] flex items-center justify-center overflow-hidden"
                    >
                      <div className="relative z-20 text-center p-8">
                        <div className="w-16 h-16 rounded-2xl bg-foreground/[0.04] border border-border/40 flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-8 h-8 text-muted-foreground/40" />
                        </div>
                        <p className="text-sm text-muted-foreground/55 max-w-md mx-auto leading-relaxed">{demo.visual}</p>
                        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground/[0.03] border border-border/30">
                          <span className="text-xs text-muted-foreground/40">Coming Soon</span>
                        </div>
                      </div>
                    </AnimatedCard>
                  </div>

                  {/* Description */}
                  <div className="lg:col-span-2 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-${demo.color}-500/10 border border-${demo.color}-500/20 flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 text-${demo.color}-400`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{demo.title}</h3>
                        <p className="text-xs text-muted-foreground/60">{demo.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground/70 leading-relaxed mb-5">{demo.description}</p>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50 mb-2">Techniques Used</p>
                      <div className="flex flex-wrap gap-1.5">
                        {demo.techniques.map((t) => (
                          <span key={t} className="px-2 py-1 rounded-md bg-foreground/[0.03] border border-border/30 text-[11px] text-muted-foreground/60">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}