import {
  Monitor, BarChart3, Heart, Gamepad2, Code,
} from "lucide-react";
import { DemoIllustration } from "./illustrations";
import { SectionHeader, showcaseColorMap } from "./section-helpers";

interface Demo {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  description: string;
  techniques: string[];
  visual: string;
  illustration: "glass-os" | "ai-dashboard" | "healthcare-workflow" | "gaming-ui" | "developer-ide";
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
    illustration: "glass-os",
  },
  {
    title: "AI Dashboard",
    subtitle: "Intelligent Analytics",
    icon: BarChart3,
    color: "sky",
    description: "Charts don't just appear — they draw themselves with purpose. Line charts trace their path as if an analyst is drawing them live. Numbers count up from zero. Pie charts assemble from segments. Every data point tells its story.",
    techniques: ["Staggered Reveal", "Number Animation", "Path Drawing", "Data-Driven Motion", "Responsive Charts"],
    visual: "Dark analytics dashboard with multiple chart types. A line chart draws its path in real-time. KPI cards count up. A map pulses with data points. Sidebar filters animate smoothly.",
    illustration: "ai-dashboard",
  },
  {
    title: "Healthcare Workflow",
    subtitle: "Patient Journey System",
    icon: Heart,
    color: "emerald",
    description: "An animated Kanban board where patient cards flow between stages — intake, diagnosis, treatment, discharge. Cards have priority indicators that pulse gently. The board rearranges with satisfying physics when columns resize.",
    techniques: ["Kanban Physics", "Priority Indicators", "Status Transitions", "Column Resizing", "Accessible Status Colors"],
    visual: "Medical Kanban board with four columns. Patient cards have colored priority borders (red/yellow/green). Cards animate between columns. A patient detail panel slides in from the right with test results.",
    illustration: "healthcare-workflow",
  },
  {
    title: "Gaming UI",
    subtitle: "AAA-Quality Interface",
    icon: Gamepad2,
    color: "rose",
    description: "Game interfaces demand the highest bar: health bars that drain with fluid animation, inventory items that physically slot into place, spell cooldowns that sweep like clockwork. This demo pushes CSS to its absolute limit.",
    techniques: ["HP Bar Fluid Drain", "Inventory Slot Physics", "Cooldown Sweep", "Damage Flash", "Rarity Glow Effects"],
    visual: "Dark game HUD with a health/mana bar at the bottom. An inventory grid where items have rarity-colored borders. A minimap in the corner. Ability icons with radial cooldown sweep animations.",
    illustration: "gaming-ui",
  },
  {
    title: "Developer IDE",
    subtitle: "Code Environment",
    icon: Code,
    color: "amber",
    description: "A code editor where every interaction is intentional. Files open with a smooth expand. The terminal slides up with weight. Autocomplete suggestions appear with staggered reveals. Error highlights pulse to draw attention without annoying.",
    techniques: ["Panel Resizing", "Tab Stacking", "Terminal Slide", "Staggered Autocomplete", "Pulsing Errors"],
    visual: "Dark IDE layout with a file tree on the left, code editor in the center, and terminal at the bottom. Tabs have colored indicators. A command palette overlay with fuzzy search. Line numbers fade in.",
    illustration: "developer-ide",
  },
];

export function HallOfFame() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <SectionHeader
          label="Hall of Fame"
          title="Hall of Fame"
          subtitle="Planned flagship demos that define what Ferrum can achieve. These are the interfaces we&apos;re building toward — each one chosen to showcase a different dimension of the platform&apos;s capabilities."
          subtitleOpacity="60"
        />

        {/* Demos */}
        <div className="mt-16 space-y-8">
          {demos.map((demo, i) => {
            const Icon = demo.icon;
            return (
              <div key={demo.title} className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: `${i * 0.06}s`, animationFillMode: "both" }}>
                <div className="grid lg:grid-cols-5 gap-6">
                  {/* Visual illustration */}
                  <div className="lg:col-span-3">
                    <div className="border border-border/40 bg-foreground/[0.015] h-full min-h-[280px] overflow-hidden">
                      <DemoIllustration type={demo.illustration} />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="lg:col-span-2 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${showcaseColorMap[demo.color] || showcaseColorMap.purple}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{demo.title}</h3>
                        <p className="text-xs text-muted-foreground/60">{demo.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground/70 leading-relaxed mb-5">{demo.description}</p>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50 mb-2">Techniques</p>
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
