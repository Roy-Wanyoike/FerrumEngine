// ─── Ferrum UI Compiler — UI Intermediate Representation Types ───────────
// Property-level SSA IR inspired by LLVM, React Compiler,
// SwiftUI AttributeGraph, Unreal RDG, and Chromium RenderingNG.
// Zero external dependencies.
//
// Architecture: Intent → UI-IR (SSA) → Optimization → Render Graph → Backend
// ═══════════════════════════════════════════════════════════════════════════

// ─── Source Location ─────────────────────────────────────────────────────────

export interface UILoc {
  file?: string;
  line?: number;
  col?: number;
}

// ─── UI Intent (Input) ───────────────────────────────────────────────────────
// What the developer writes — high-level, declarative.

export type UIIntentKind =
  | "component"
  | "element"
  | "layout"
  | "animation"
  | "interaction"
  | "material"
  | "composition";

export type MotionQuality = "minimal" | "standard" | "premium" | "cinematic";
export type MaterialType =
  | "flat"
  | "elevated"
  | "glass"
  | "neumorphic"
  | "metallic"
  | "holographic";
export type InteractionType =
  | "none"
  | "magnetic"
  | "spring"
  | "elastic"
  | "snap"
  | "drag";

export interface UIIntent {
  kind: UIIntentKind;
  element: string;
  motion?: MotionQuality;
  material?: MaterialType;
  interaction?: InteractionType;
  entrance?: string;
  props?: Record<string, string | number | boolean>;
  children?: UIIntent[];
  loc?: UILoc;
}

// ─── Performance Tier Model ──────────────────────────────────────────────────
// 3-tier system maps effect complexity to GPU capability.

export type PerfTier = 1 | 2 | 3;

export const TIER_DESCRIPTIONS: Record<
  PerfTier,
  { label: string; capabilities: string[] }
> = {
  1: {
    label: "GPU-Composited",
    capabilities: [
      "opacity",
      "transform",
      "transition",
      "will-change",
    ],
  },
  2: {
    label: "Paint Effects",
    capabilities: [
      "box-shadow",
      "filter",
      "backdrop-filter",
      "mix-blend-mode",
      "gradient",
      "clip-path",
    ],
  },
  3: {
    label: "GPU-Required",
    capabilities: [
      "webgl",
      "canvas-particles",
      "shader-effects",
      "3d-transforms",
      "complex-animations",
    ],
  },
};

// ─── UI-IR: The Universal Contract ───────────────────────────────────────────
// Inspired by LLVM IR (SSA form), SwiftUI AttributeGraph (property deps),
// and Chromium Display Items (flat paint ops).

/** SSA Value — every property assignment is single-definition. */
export interface SSAValue {
  id: string;
  type: UIPropertyType;
  def: SSAInstruction;
  uses: SSAInstruction[];
}

/** Fine-grained UI property types (like SwiftUI attributes). */
export type UIPropertyType =
  // Layout
  | "width"
  | "height"
  | "min-width"
  | "max-width"
  | "min-height"
  | "max-height"
  | "padding"
  | "margin"
  | "gap"
  | "flex-direction"
  | "flex-grow"
  | "flex-shrink"
  | "grid-template-columns"
  | "grid-template-rows"
  | "position"
  | "top"
  | "right"
  | "bottom"
  | "left"
  // Visual
  | "background"
  | "background-color"
  | "border-radius"
  | "border-width"
  | "border-color"
  | "box-shadow"
  | "opacity"
  | "backdrop-filter"
  | "filter"
  | "mix-blend-mode"
  // Typography
  | "font-size"
  | "font-weight"
  | "font-family"
  | "color"
  | "text-align"
  | "line-height"
  | "letter-spacing"
  // Transform (compositor-friendly)
  | "transform"
  | "translate-x"
  | "translate-y"
  | "translate-z"
  | "rotate"
  | "scale"
  | "scale-x"
  | "scale-y"
  | "skew"
  | "perspective"
  | "transform-origin"
  | "transform-style"
  | "will-change"
  // Animation
  | "animation"
  | "animation-name"
  | "animation-duration"
  | "animation-timing-function"
  | "animation-delay"
  | "animation-iteration-count"
  | "animation-fill-mode"
  | "animation-direction"
  | "transition"
  | "transition-property"
  | "transition-duration"
  | "transition-timing-function"
  // Interaction
  | "cursor"
  | "pointer-events"
  | "overflow"
  | "overflow-x"
  | "overflow-y"
  | "scroll-behavior"
  | "scroll-snap-type"
  // Accessibility
  | "aria-label"
  | "aria-hidden"
  | "role"
  | "tabindex"
  | "focus-visible"
  // Composite
  | "z-index"
  | "isolation"
  | "contain"
  | "content-visibility";

/** SSA Instruction kinds — the "ops" of the IR. */
export type SSAInstructionKind =
  // Definitions
  | "const"
  | "resolve-token"
  | "resolve-theme"
  | "compute"
  | "phi"
  // Layout
  | "layout-flow"
  | "layout-grid"
  | "layout-flex"
  // Paint
  | "paint-fill"
  | "paint-border"
  | "paint-shadow"
  | "paint-text"
  | "paint-image"
  | "paint-filter"
  // Composite
  | "composite-layer"
  | "composite-transform"
  | "composite-clip"
  // Effects
  | "effect-entrance"
  | "effect-exit"
  | "effect-attention"
  | "effect-hover"
  | "effect-scroll"
  | "effect-cursor"
  // Accessibility
  | "a11y-reduce-motion"
  | "a11y-focus-ring"
  | "a11y-aria"
  // Control flow
  | "conditional"
  | "variant-select"
  | "state-select";

export interface SSAInstruction {
  id: string;
  kind: SSAInstructionKind;
  operands: SSAValue[];
  result?: SSAValue;
  metadata: Record<string, string | number | boolean>;
  loc?: UILoc;
}

// ─── Property Dependency Graph (from SwiftUI AttributeGraph) ────────────────
// Fine-grained: changing 'color' does NOT invalidate 'layout'.

export interface PropertyNode {
  property: UIPropertyType;
  value: SSAValue;
  dependencies: string[];
  dependents: string[];
  dirty: boolean;
  /** Chromium pipeline stage this property belongs to. */
  layer: "layout" | "paint" | "composite";
}

// ─── Reactive Scope (from React Compiler) ───────────────────────────────────
// A region of rendering work that only re-executes when its inputs change.

export interface ReactiveScope {
  id: string;
  inputs: string[];
  outputs: string[];
  instructions: SSAInstruction[];
  cost: "cheap" | "medium" | "expensive";
}

// ─── Render Graph (from Unreal RDG) ─────────────────────────────────────────
// Frame-level graph of rendering passes with resource dependencies.

export type RenderPassKind =
  | "layout"
  | "style-recalc"
  | "paint"
  | "composite"
  | "rasterize"
  | "effect-apply"
  | "layer-promote"
  | "effect-cleanup";

export interface RenderResource {
  id: string;
  type: "texture" | "buffer" | "layer" | "style-cache" | "layout-cache";
  /** Can be memory-aliased with other transient resources (from Unreal). */
  transient: boolean;
  lifetime: { startPass: string; endPass: string };
}

export interface RenderPass {
  id: string;
  kind: RenderPassKind;
  reads: string[];
  writes: string[];
  instructions: SSAInstruction[];
  /** Estimated execution cost in ms. */
  cost: number;
  /** Cannot be culled even if output is unused. */
  required: boolean;
}

export interface RenderGraphEdge {
  from: string;
  to: string;
  type: "read-after-write" | "write-after-read" | "order";
}

export interface RenderGraph {
  passes: RenderPass[];
  resources: RenderResource[];
  edges: RenderGraphEdge[];
}

// ─── Display List (from Chromium RenderingNG) ───────────────────────────────
// Flat, ordered list of atomic rendering operations.

export type DisplayItemKind =
  | "fill-rect"
  | "fill-rounded-rect"
  | "fill-text"
  | "draw-image"
  | "draw-border"
  | "draw-shadow"
  | "apply-transform"
  | "apply-filter"
  | "apply-clip"
  | "apply-opacity"
  | "begin-layer"
  | "end-layer"
  | "draw-effect"
  | "draw-cursor"
  | "set-scroll-offset";

export interface DisplayItem {
  kind: DisplayItemKind;
  bounds: { x: number; y: number; width: number; height: number };
  properties: Record<string, string | number>;
  layerId: string;
}

// ─── UI-IR Module (top-level, analogous to LLVM Module) ─────────────────────

export interface UIRModule {
  id: string;
  version: string;
  intents: UIIntent[];
  values: Map<string, SSAValue>;
  instructions: SSAInstruction[];
  propertyGraph: PropertyNode[];
  reactiveScopes: ReactiveScope[];
  renderGraph?: RenderGraph;
  displayList?: DisplayItem[];
  metadata: {
    source?: string;
    target?: RenderTarget;
    deviceProfile?: DeviceProfile;
    compileTime?: number;
  };
}

// ─── Device & Context Profiles ───────────────────────────────────────────────

export type RenderTarget =
  | "css"
  | "canvas"
  | "webgl"
  | "compositor"
  | "svg"
  | "native";

export interface DeviceProfile {
  gpu: boolean;
  gpuTier: PerfTier;
  gpuMemory?: number;
  screenSize: { width: number; height: number };
  pixelRatio: number;
  reducedMotion: boolean;
  highContrast: boolean;
  batteryLevel?: "high" | "medium" | "low" | "critical";
  connectionType?: "4g" | "3g" | "2g" | "slow-2g" | "offline";
  prefersColorScheme?: "light" | "dark";
  cpuCores?: number;
  memoryMB?: number;
}

/** Default device profile — modern desktop with GPU. */
export const DEFAULT_DEVICE_PROFILE: DeviceProfile = {
  gpu: true,
  gpuTier: 2,
  gpuMemory: 4096,
  screenSize: { width: 1920, height: 1080 },
  pixelRatio: 1,
  reducedMotion: false,
  highContrast: false,
  batteryLevel: "high",
  connectionType: "4g",
  prefersColorScheme: "dark",
  cpuCores: 8,
  memoryMB: 16384,
};

// ─── Compiler Options ────────────────────────────────────────────────────────

export interface UICompilerOptions {
  target?: RenderTarget;
  deviceProfile?: DeviceProfile;
  passes?: {
    reactiveScopeDiscovery?: boolean;
    propertyDependencyAnalysis?: boolean;
    deadPropertyElimination?: boolean;
    deviceAdaptation?: boolean;
    reducedMotion?: boolean;
    accessibility?: boolean;
    batteryOptimization?: boolean;
    renderGraphOptimization?: boolean;
    displayListGeneration?: boolean;
    cssOptimization?: boolean;
  };
  budgets?: {
    maxAnimationDuration?: number;
    maxLayoutCost?: number;
    maxPaintCost?: number;
    maxBundleSize?: number;
    maxLayerCount?: number;
  };
}

// ─── Compile Result ─────────────────────────────────────────────────────────

export interface UICompileResult {
  ir: UIRModule;
  css?: string;
  canvasCode?: string;
  webglCode?: string;
  displayList?: DisplayItem[];
  renderGraph?: RenderGraph;
  stats: UICompileStats;
  warnings: UICompileWarning[];
  errors: UICompileWarning[];
  decisions: CompileDecision[];
}

export interface UICompileStats {
  parseTime: number;
  irGenTime: number;
  optimizationTime: number;
  codegenTime: number;
  totalTime: number;
  inputIntents: number;
  irInstructions: number;
  irValues: number;
  reactiveScopes: number;
  renderPasses: number;
  displayItems: number;
  layers: number;
  deadProperties: number;
  cssBytes?: number;
  gpuDrawCalls?: number;
}

export interface UICompileWarning {
  message: string;
  intent?: string;
  loc?: UILoc;
  severity: "info" | "warn" | "error";
  pass?: string;
}

export interface CompileDecision {
  intent: string;
  decision: string;
  reason: string;
  alternative: string;
  impact: "performance" | "accessibility" | "battery" | "compatibility" | "visual";
  pass: string;
}

// ─── Property Layer Mapping ──────────────────────────────────────────────────
// Maps each UIPropertyType to its Chromium pipeline stage.

export const PROPERTY_LAYERS: Record<
  UIPropertyType,
  "layout" | "paint" | "composite"
> = {
  // Layout
  width: "layout",
  height: "layout",
  "min-width": "layout",
  "max-width": "layout",
  "min-height": "layout",
  "max-height": "layout",
  padding: "layout",
  margin: "layout",
  gap: "layout",
  "flex-direction": "layout",
  "flex-grow": "layout",
  "flex-shrink": "layout",
  "grid-template-columns": "layout",
  "grid-template-rows": "layout",
  position: "layout",
  top: "layout",
  right: "layout",
  bottom: "layout",
  left: "layout",
  // Visual (paint)
  background: "paint",
  "background-color": "paint",
  "border-radius": "paint",
  "border-width": "paint",
  "border-color": "paint",
  "box-shadow": "paint",
  opacity: "composite",
  "backdrop-filter": "paint",
  filter: "paint",
  "mix-blend-mode": "composite",
  // Typography (paint)
  "font-size": "paint",
  "font-weight": "paint",
  "font-family": "paint",
  color: "paint",
  "text-align": "layout",
  "line-height": "layout",
  "letter-spacing": "layout",
  // Transform (composite — GPU-friendly)
  transform: "composite",
  "translate-x": "composite",
  "translate-y": "composite",
  "translate-z": "composite",
  rotate: "composite",
  scale: "composite",
  "scale-x": "composite",
  "scale-y": "composite",
  skew: "composite",
  perspective: "composite",
  "transform-origin": "composite",
  "transform-style": "composite",
  "will-change": "composite",
  // Animation (composite)
  animation: "composite",
  "animation-name": "composite",
  "animation-duration": "composite",
  "animation-timing-function": "composite",
  "animation-delay": "composite",
  "animation-iteration-count": "composite",
  "animation-fill-mode": "composite",
  "animation-direction": "composite",
  transition: "composite",
  "transition-property": "composite",
  "transition-duration": "composite",
  "transition-timing-function": "composite",
  // Interaction
  cursor: "paint",
  "pointer-events": "composite",
  overflow: "composite",
  "overflow-x": "composite",
  "overflow-y": "composite",
  "scroll-behavior": "composite",
  "scroll-snap-type": "composite",
  // Accessibility
  "aria-label": "paint",
  "aria-hidden": "composite",
  role: "composite",
  tabindex: "composite",
  "focus-visible": "paint",
  // Composite
  "z-index": "composite",
  isolation: "composite",
  contain: "composite",
  "content-visibility": "composite",
};

// ─── Motion Quality → Perf Tier Mapping ─────────────────────────────────────

export const MOTION_TIER_MAP: Record<MotionQuality, PerfTier[]> = {
  minimal: [1],
  standard: [1, 2],
  premium: [1, 2, 3],
  cinematic: [3],
};

// ─── CSS Property Name Mapping ──────────────────────────────────────────────

export const PROP_TO_CSS: Record<UIPropertyType, string> = {
  width: "width",
  height: "height",
  "min-width": "min-width",
  "max-width": "max-width",
  "min-height": "min-height",
  "max-height": "max-height",
  padding: "padding",
  margin: "margin",
  gap: "gap",
  "flex-direction": "flex-direction",
  "flex-grow": "flex-grow",
  "flex-shrink": "flex-shrink",
  "grid-template-columns": "grid-template-columns",
  "grid-template-rows": "grid-template-rows",
  position: "position",
  top: "top",
  right: "right",
  bottom: "bottom",
  left: "left",
  background: "background",
  "background-color": "background-color",
  "border-radius": "border-radius",
  "border-width": "border-width",
  "border-color": "border-color",
  "box-shadow": "box-shadow",
  opacity: "opacity",
  "backdrop-filter": "backdrop-filter",
  filter: "filter",
  "mix-blend-mode": "mix-blend-mode",
  "font-size": "font-size",
  "font-weight": "font-weight",
  "font-family": "font-family",
  color: "color",
  "text-align": "text-align",
  "line-height": "line-height",
  "letter-spacing": "letter-spacing",
  transform: "transform",
  "translate-x": "--f-translate-x",
  "translate-y": "--f-translate-y",
  "translate-z": "--f-translate-z",
  rotate: "--f-rotate",
  scale: "--f-scale",
  "scale-x": "--f-scale-x",
  "scale-y": "--f-scale-y",
  skew: "--f-skew",
  perspective: "perspective",
  "transform-origin": "transform-origin",
  "transform-style": "transform-style",
  "will-change": "will-change",
  animation: "animation",
  "animation-name": "animation-name",
  "animation-duration": "animation-duration",
  "animation-timing-function": "animation-timing-function",
  "animation-delay": "animation-delay",
  "animation-iteration-count": "animation-iteration-count",
  "animation-fill-mode": "animation-fill-mode",
  "animation-direction": "animation-direction",
  transition: "transition",
  "transition-property": "transition-property",
  "transition-duration": "transition-duration",
  "transition-timing-function": "transition-timing-function",
  cursor: "cursor",
  "pointer-events": "pointer-events",
  overflow: "overflow",
  "overflow-x": "overflow-x",
  "overflow-y": "overflow-y",
  "scroll-behavior": "scroll-behavior",
  "scroll-snap-type": "scroll-snap-type",
  "aria-label": "aria-label",
  "aria-hidden": "aria-hidden",
  role: "role",
  tabindex: "tabindex",
  "focus-visible": "focus-visible",
  "z-index": "z-index",
  isolation: "isolation",
  contain: "contain",
  "content-visibility": "content-visibility",
};