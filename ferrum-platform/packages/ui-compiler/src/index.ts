// ─── Ferrum UI Compiler — Public API ───────────────────────────────────
// "LLVM for UI rendering" — converts high-level UI intent into
// optimized rendering behavior across CSS, Canvas, WebGL, and GPU.
// Zero external dependencies.
// ═══════════════════════════════════════════════════════════════════════════

// ─── Types ───────────────────────────────────────────────────────────────────

export type {
  // Intent (input)
  UIIntent,
  UIIntentKind,
  MotionQuality,
  MaterialType,
  InteractionType,
  // IR (intermediate)
  SSAValue,
  SSAInstruction,
  SSAInstructionKind,
  UIPropertyType,
  PropertyNode,
  ReactiveScope,
  // Render Graph
  RenderPass,
  RenderPassKind,
  RenderResource,
  RenderGraph,
  RenderGraphEdge,
  // Display List
  DisplayItem,
  DisplayItemKind,
  // Module
  UIRModule,
  // Device & Context
  DeviceProfile,
  PerfTier,
  RenderTarget,
  // Options
  UICompilerOptions,
  // Result
  UICompileResult,
  UICompileStats,
  UICompileWarning,
  CompileDecision,
} from "./types";

export {
  DEFAULT_DEVICE_PROFILE,
  TIER_DESCRIPTIONS,
  MOTION_TIER_MAP,
  PROPERTY_LAYERS,
  PROP_TO_CSS,
} from "./types";

// ─── Compiler Pipeline ───────────────────────────────────────────────────────

export { compile, compileTree } from "./ui-compiler";

// ─── Intent Parser ───────────────────────────────────────────────────────────

export { parseIntent, parseIntentTree } from "./intent-parser";

// ─── Optimizer ───────────────────────────────────────────────────────────────

export {
  runOptimizationPasses,
  reactiveScopeDiscovery,
  propertyDependencyAnalysis,
  deadPropertyElimination,
  deviceCapabilityAdaptation,
  reducedMotionPass,
  accessibilityPass,
  batteryOptimizationPass,
  renderGraphConstruction,
  displayListGeneration,
} from "./optimizer";

// ─── Backends ────────────────────────────────────────────────────────────────

export {
  cssBackend,
  canvasBackend,
  compositorBackend,
  renderGraphBackend,
} from "./backends";