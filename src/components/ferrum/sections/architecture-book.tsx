"use client";

import { useState } from "react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ferrum/scroll-reveal";
import {
  Cpu, Zap, Eye, Terminal, Palette, Sparkles,
  Monitor, Cloud, ArrowRight, ChevronRight, Boxes,
} from "lucide-react";

interface Subsystem {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  tagline: string;

  purpose: string;
  problemSolved: string;

  architecture: string;
  dataFlow: { from: string; to: string; via: string }[];
  algorithms: string[];
  futureRoadmap: string[];
}

const subsystems: Subsystem[] = [
  {
    id: "core",
    name: "Ferrum Core",
    icon: Cpu,
    color: "purple",
    tagline: "The zero-dependency foundation",
    purpose: "Ferrum Core provides the primitive abstractions that every other subsystem depends on — CSS class generation, effect registration, token resolution, and the plugin lifecycle. It is the smallest possible surface area that enables the entire platform.",
    problemSolved: "Without Core, every package would need its own class naming, token resolution, and plugin system. Core ensures that @ferrum/motion and @ferrum/tokens speak the same language without importing each other.",
    architecture: "Core is structured as three internal modules: Registry (class name → CSS rule mapping), Resolver (token expansion and fallback chains), and Lifecycle (plugin mount/unmount/transform hooks). These modules communicate through a shared event bus with zero cross-imports.",
    dataFlow: [
      { from: "Developer writes rc-float", to: "Registry", via: "Class name lookup" },
      { from: "Registry", to: "Resolver", via: "Token expansion request" },
      { from: "Resolver", to: "CSS Output", via: "Expanded, optimized CSS string" },
    ],
    algorithms: ["CSS Selector Deduplication", "Token Fallback Chains", "Plugin Priority Resolution", "Class Name Collision Avoidance"],
    futureRoadmap: ["Atomic CSS output mode", "CSS-in-JS adapter for runtime injection", "Tree-shaking metadata for bundlers"],
  },
  {
    id: "motion",
    name: "Ferrum Motion",
    icon: Zap,
    color: "violet",
    tagline: "Physics-aware animation engine",
    purpose: "Ferrum Motion translates interaction intents into fluid, performant animations. It provides 18 sub-modules covering physics simulation, timeline composition, gesture-driven animation, and adaptive motion that responds to user preferences.",
    problemSolved: "CSS transitions are stateless. Framer Motion adds 45KB. GSAP is GPL. Ferrum Motion provides spring physics, gesture linking, and orchestration in pure CSS where possible, with a 0KB JS runtime for simple cases.",
    architecture: "The Motion system operates in three stages: Intent Capture (what triggered the animation), Motion Planning (what curve/duration/physics model to use), and Frame Execution (GPU-composited transforms). Each stage can be overridden or extended via the Plugin SDK.",
    dataFlow: [
      { from: "User Interaction", to: "Motion Graph", via: "Intent classification" },
      { from: "Motion Graph", to: "Physics Solver", via: "Spring/gravity parameters" },
      { from: "Physics Solver", to: "Timing Engine", via: "Per-frame delta values" },
      { from: "Timing Engine", to: "Animation Frames", via: "requestAnimationFrame or CSS" },
    ],
    algorithms: ["Spring Dynamics (stiffness/damping/mass)", "Gesture Velocity Prediction", "Orchestration DAG (Directed Acyclic Graph)", "Reduced Motion Fallback Generator"],
    futureRoadmap: ["Scroll-driven animation primitives", "View Transition API integration", "Shared element transitions", "Motion presets marketplace"],
  },
  {
    id: "physics",
    name: "Ferrum Physics",
    icon: Sparkles,
    color: "rose",
    tagline: "Real-world dynamics for interfaces",
    purpose: "Physics provides realistic motion models — spring dynamics, gravity, collision detection, and constraint systems — that make interfaces feel tangible. A card doesn't just 'animate in'; it falls into place with weight.",
    problemSolved: "CSS ease-in-out feels artificial for anything beyond simple fades. Ferrum Physics gives elements mass, velocity, and constraints, so interfaces respond to interaction the way physical objects respond to force.",
    architecture: "The Physics engine is a lightweight simulation loop that runs independently of the render loop. It maintains a state vector for each animated element and integrates forward using Verlet integration for stability.",
    dataFlow: [
      { from: "Element State", to: "Force Accumulator", via: "Applied forces (spring, gravity, drag)" },
      { from: "Force Accumulator", to: "Integrator", via: "Net force vector" },
      { from: "Integrator", to: "Constraint Solver", via: "New position/velocity" },
      { from: "Constraint Solver", to: "Renderer", via: "Final constrained position" },
    ],
    algorithms: ["Verlet Integration", "Spring-Damper System", "AABB Collision Detection", "Constraint Projection"],
    futureRoadmap: ["Rigid body dynamics", "Cloth simulation presets", "Fluid dynamics for backgrounds", "Audio-reactive physics"],
  },
  {
    id: "rendering",
    name: "Ferrum Rendering",
    icon: Monitor,
    color: "cyan",
    tagline: "GPU-optimized paint pipeline",
    purpose: "The Rendering subsystem manages how effects are painted to the screen. It handles layer promotion, composite ordering, and paint optimization to ensure 60fps animation even with hundreds of active effects.",
    problemSolved: "A page with 50 animated elements can easily drop to 15fps if each triggers layout or paint. Rendering ensures all animations use transform/opacity (compositor-only properties) and batches paint operations.",
    architecture: "Rendering operates at three levels: CSS (declarative effects via classes), Paint API (GPU-painted worklets for complex effects), and Canvas (fallback for effects that can't be achieved with CSS). The compiler determines which level each effect uses.",
    dataFlow: [
      { from: "Effect Declaration", to: "Compiler", via: "Effect registration" },
      { from: "Compiler", to: "Render Target", via: "CSS / Paint API / Canvas decision" },
      { from: "Render Target", to: "GPU Optimizer", via: "Layer promotion analysis" },
      { from: "GPU Optimizer", to: "Browser", via: "Composited frames" },
    ],
    algorithms: ["Layer Promotion Heuristics", "Will-Change Injection Strategy", "Containment Layout Optimization", "Paint Worklet Scheduling"],
    futureRoadmap: ["WebGPU compute shaders", "OffscreenCanvas worker rendering", "Render profiling dashboard"],
  },
  {
    id: "tokens",
    name: "Ferrum Tokens",
    icon: Palette,
    color: "amber",
    tagline: "Design decisions as data",
    purpose: "Tokens transform design decisions into a structured, queryable system. A button's color isn't '#6366f1' — it's 'var(--rc-accent)'. This abstraction enables theming, dark mode, brand customization, and design governance without touching component code.",
    problemSolved: "Hard-coded colors in CSS create unmaintainable themes. Ferrum Tokens provides 16 semantic color scales, spacing scales, type scales, and shadow scales that can be output as CSS, Tailwind, SCSS, JSON, or TypeScript.",
    architecture: "Tokens follow a three-tier model: Primitive (raw values like '500' or '14px'), Semantic (contextual meanings like 'accent' or 'danger'), and Component (specific uses like 'button-bg' or 'input-border'). Each tier references the one above it.",
    dataFlow: [
      { from: "Brand Definition", to: "Primitive Tokens", via: "Color/spacing/type values" },
      { from: "Primitive Tokens", to: "Semantic Tokens", via: "Meaning assignment (accent, danger, muted)" },
      { from: "Semantic Tokens", to: "Component Tokens", via: "Component-specific mapping" },
      { from: "Component Tokens", to: "CSS Variables", via: "Output transform" },
    ],
    algorithms: ["Contrast Ratio Calculator (WCAG AA/AAA)", "Color Scale Generation (OKLCH)", "Token Inheritance Resolution", "Multi-format Output Compilation"],
    futureRoadmap: ["Palette suggestion engine", "Figma plugin sync", "Token governance audit logs", "Brand compliance reports"],
  },
  {
    id: "compiler",
    name: "Ferrum Compiler",
    icon: Terminal,
    color: "sky",
    tagline: "9-pass optimization pipeline",
    purpose: "The Compiler transforms developer-written intent into optimized CSS. It eliminates dead code, inlines tokens, merges cascade layers, compresses hex values, and generates framework-specific output — all in a deterministic 9-pass pipeline.",
    problemSolved: "Unoptimized CSS is the #1 cause of large bundle sizes and slow render times. The Compiler ensures that Ferrum's 848+ effects produce the smallest possible output by only shipping what you actually use.",
    architecture: "The pipeline runs sequentially: (1) Parse → (2) Analyze → (3) Dead Code Elimination → (4) Token Inlining → (5) @Layer Merging → (6) Hex Compression → (7) Selector Minification → (8) Output Generation → (9) Validation.",
    dataFlow: [
      { from: "Source CSS", to: "AST Parser", via: "Tokenized CSS stream" },
      { from: "AST Parser", to: "Analysis Passes", via: "Abstract syntax tree" },
      { from: "Analysis Passes", to: "Output Generator", via: "Optimized AST" },
      { from: "Output Generator", to: "Framework Bundle", via: "CSS / Tailwind / SCSS / JSON" },
    ],
    algorithms: ["CSS AST Parsing", "Dead Code Elimination (Reachability Graph)", "Hex Color Compression", "Selector Specificity Normalization"],
    futureRoadmap: ["Incremental compilation", "Watch mode with HMR", "Visual compilation report", "Custom pass plugins"],
  },
  {
    id: "runtime",
    name: "Ferrum Runtime",
    icon: Boxes,
    color: "emerald",
    tagline: "Zero-dependency execution layer",
    purpose: "Runtime is the browser-side layer that bridges intent declarations with actual DOM updates. It handles effect initialization, state observation, and dynamic class application — all without requiring React, Vue, or any framework.",
    problemSolved: "Most animation libraries require a framework. Ferrum Runtime provides a framework-agnostic way to apply effects, observe state changes, and manage animations that works identically in vanilla HTML and in any component framework.",
    architecture: "Runtime is structured as a minimal observer pattern: Effects register themselves, the observer watches for DOM changes, and the executor applies CSS classes. This keeps the runtime under 2KB gzipped.",
    dataFlow: [
      { from: "Component", to: "Intent", via: "Declarative class or API call" },
      { from: "Intent", to: "Compiler", via: "Runtime compilation (if needed)" },
      { from: "Compiler", to: "Renderer", via: "Optimized CSS application" },
    ],
    algorithms: ["Mutation Observer Batching", "CSS Class Diffing", "Effect State Machine", "Lazy Effect Loading"],
    futureRoadmap: ["Service Worker caching", "Web Worker offloading", "Streaming CSS injection", "Effect preloading"],
  },
  {
    id: "ai",
    name: "Ferrum AI",
    icon: Sparkles,
    color: "pink",
    tagline: "Intent-to-render intelligence",
    purpose: "Ferrum AI is the intelligence layer that understands developer intent and translates it into Ferrum configurations. It doesn't generate black-box code — it produces standard Ferrum classes and tokens that any developer can read, understand, and modify.",
    problemSolved: "Current AI code generation produces one-shot, unmodifiable code. Ferrum AI generates structured output that follows Ferrum's architecture — so AI-assisted code is indistinguishable from hand-written Ferrum code.",
    architecture: "AI operates through a structured pipeline: Intent Parsing → Context Analysis → Architecture Mapping → Code Generation → Validation. Each stage can be independently audited and overridden.",
    dataFlow: [
      { from: "Developer Prompt", to: "Intent Parser", via: "Natural language input" },
      { from: "Intent Parser", to: "Architecture Mapper", via: "Structured intent graph" },
      { from: "Architecture Mapper", to: "Code Generator", via: "Ferrum API calls" },
      { from: "Code Generator", to: "Validator", via: "Generated Ferrum code" },
    ],
    algorithms: ["Intent Classification", "Context-Aware Suggestion", "Architecture-Constrained Generation", "Output Validation (Lint + A11y + Performance)"],
    futureRoadmap: ["Explain mode (why this code)", "Generate Variants", "Accessibility auto-fix", "Performance regression detection"],
  },
  {
    id: "studio",
    name: "Ferrum Studio",
    icon: Monitor,
    color: "purple",
    tagline: "Visual interface builder",
    purpose: "Studio is the visual environment where developers design, prototype, and export production-ready interfaces. Every change in Studio produces real Ferrum code — not screenshots, not Figma frames, but deployable CSS and components.",
    problemSolved: "The gap between design and implementation is where most time is wasted. Studio eliminates it by making the design tool and the code output identical. What you see is what ships.",
    architecture: "Studio uses a real-time preview engine that mirrors the actual CSS output. Changes to the visual canvas generate Ferrum class applications; changes to the code panel update the visual canvas. There is no 'export' step — it's always in sync.",
    dataFlow: [
      { from: "Visual Canvas", to: "Ferrum Renderer", via: "Class application events" },
      { from: "Code Panel", to: "Ferrum Renderer", via: "Code AST changes" },
      { from: "Ferrum Renderer", to: "Preview", via: "Live CSS application" },
      { from: "AI Assistant", to: "Both Panels", via: "Suggested modifications" },
    ],
    algorithms: ["Bidirectional Sync (Canvas ↔ Code)", "Live CSS Hot-Reload", "Component Instance Tree", "Design Token Live Preview"],
    futureRoadmap: ["Collaborative editing", "Version history with diff", "Component library browser", "One-click deployment"],
  },
  {
    id: "cloud",
    name: "Ferrum Cloud",
    icon: Cloud,
    color: "blue",
    tagline: "One-click deployment and analytics",
    purpose: "Cloud completes the Ferrum platform by providing deployment, analytics, and collaboration infrastructure. Upload a Ferrum project, get a production URL. Track render performance. Share component libraries across teams.",
    problemSolved: "Getting a Ferrum project from localhost to production shouldn't require a DevOps engineer. Cloud handles building, optimizing, deploying, and monitoring — so developers can focus on interfaces.",
    architecture: "Cloud is structured as three services: Build (compiles and optimizes), Deploy (CDN distribution with edge caching), and Observe (real-time performance analytics and a11y monitoring).",
    dataFlow: [
      { from: "Developer Push", to: "Build Service", via: "Git integration or API" },
      { from: "Build Service", to: "Deploy Service", via: "Optimized static assets" },
      { from: "Deploy Service", to: "CDN Edge", via: "Global distribution" },
      { from: "CDN Edge", to: "Observe Service", via: "Real User Metrics" },
    ],
    algorithms: ["Incremental Build Caching", "Asset Fingerprinting", "Core Web Vitals Collection", "Accessibility Audit Pipeline"],
    futureRoadmap: ["Team workspaces", "Design token versioning", "Custom domain support", "SLA guarantees for enterprise"],
  },
];

function DataFlowDiagram({ flow, color }: { flow: Subsystem["dataFlow"]; color: string }) {
  const colorClasses: Record<string, string> = {
    purple: "border-purple-500/30 text-purple-400",
    violet: "border-violet-500/30 text-violet-400",
    rose: "border-rose-500/30 text-rose-400",
    cyan: "border-cyan-500/30 text-cyan-400",
    amber: "border-amber-500/30 text-amber-400",
    sky: "border-sky-500/30 text-sky-400",
    emerald: "border-emerald-500/30 text-emerald-400",
    pink: "border-pink-500/30 text-pink-400",
    blue: "border-blue-500/30 text-blue-400",
  };
  const cls = colorClasses[color] || colorClasses.purple;

  return (
    <div className="space-y-2 mt-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50 mb-3">Data Flow</p>
      {flow.map((step, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className={`shrink-0 px-3 py-1.5 rounded-lg border ${cls} text-xs font-medium bg-foreground/[0.02] min-w-[140px] text-center`}>
            {step.from}
          </div>
          <div className="flex flex-col items-center gap-0.5 shrink-0">
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40" />
            <span className="text-[9px] text-muted-foreground/40 max-w-[100px] text-center leading-tight">{step.via}</span>
          </div>
          <div className={`shrink-0 px-3 py-1.5 rounded-lg border ${cls} text-xs font-medium bg-foreground/[0.02] min-w-[140px] text-center`}>
            {step.to}
          </div>
        </div>
      ))}
    </div>
  );
}

function SubsystemDetail({ system }: { system: Subsystem }) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50 mb-2">
          {system.name} &middot; {system.id}
        </p>
        <h3 className="text-2xl sm:text-3xl font-bold text-foreground">{system.tagline}</h3>
      </div>

      {/* Purpose */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/40 mb-2">Purpose</h4>
        <p className="text-sm text-muted-foreground/60 leading-relaxed">{system.purpose}</p>
      </div>

      {/* Problem Solved */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/40 mb-2">Problem Solved</h4>
        <p className="text-sm text-muted-foreground/60 leading-relaxed">{system.problemSolved}</p>
      </div>

      {/* Architecture */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/40 mb-2">Architecture</h4>
        <p className="text-sm text-muted-foreground/60 leading-relaxed">{system.architecture}</p>
      </div>

      {/* Data Flow Diagram */}
      <DataFlowDiagram flow={system.dataFlow} color={system.color} />

      {/* Algorithms */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/40 mb-3">Key Algorithms</h4>
        <div className="flex flex-wrap gap-2">
          {system.algorithms.map((algo) => (
            <span key={algo} className="px-3 py-1.5 rounded-lg border border-border/40 bg-foreground/[0.02] text-xs text-muted-foreground/50">
              {algo}
            </span>
          ))}
        </div>
      </div>

      {/* Future Roadmap */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/40 mb-3">Future Roadmap</h4>
        <div className="space-y-2">
          {system.futureRoadmap.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground/50">
              <ChevronRight className="w-3 h-3 text-purple-400/40" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ArchitectureBook({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [active, setActive] = useState<string | null>(null);

  const activeSystem = subsystems.find((s) => s.id === active);

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <Reveal>
          <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">Architecture Book</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight max-w-3xl">
            Design Documents
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground/60 max-w-2xl leading-relaxed mt-5">
            Every major subsystem gets its own design document. This is the intellectual property of the
            Ferrum platform — the architecture that makes the whole system greater than any single feature.
          </p>
        </Reveal>

        {/* Subsystem Grid or Detail View */}
        {activeSystem ? (
          <Reveal>
            <div className="mt-12">
              <button
                onClick={() => setActive(null)}
                className="flex items-center gap-2 text-sm text-muted-foreground/50 hover:text-foreground transition-colors mb-8"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                All Subsystems
              </button>
              <SubsystemDetail system={activeSystem} />
            </div>
          </Reveal>
        ) : (
          <StaggerContainer className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4" delay={0.1}>
            {subsystems.map((sys) => {
              const Icon = sys.icon;
              return (
                <StaggerItem key={sys.id}>
                  <button
                    onClick={() => setActive(sys.id)}
                    className="group w-full text-left p-6 rounded-2xl border border-border/40 bg-foreground/[0.01] hover:bg-foreground/[0.025] transition-all duration-300 h-full"
                  >
                    <div className="w-10 h-10 rounded-xl bg-foreground/[0.04] border border-border/40 flex items-center justify-center mb-4 group-hover:border-purple-500/20 transition-colors">
                      <Icon className="w-5 h-5 text-muted-foreground/50 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-1">{sys.name}</h3>
                    <p className="text-xs text-muted-foreground/40 mb-3">{sys.tagline}</p>
                    <p className="text-xs text-muted-foreground/50 leading-relaxed line-clamp-3">
                      {sys.purpose}
                    </p>
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-purple-400/50 group-hover:text-purple-400 transition-colors">
                      Read design document
                      <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </div>
    </div>
  );
}