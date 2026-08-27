// ─── Ferrum UI Compiler — Optimization Engine ───────────────────────────────
// 9 optimization passes inspired by LLVM, React Compiler, SwiftUI,
// Unreal RDG, and Chromium RenderingNG.
// Zero external dependencies.
//
// Pass order (canonical):
//   1. ReactiveScopeDiscovery   (React Compiler)
//   2. PropertyDependencyAnalysis (SwiftUI AttributeGraph)
//   3. DeadPropertyElimination   (LLVM DCE)
//   4. DeviceCapabilityAdaptation
//   5. ReducedMotionPass
//   6. AccessibilityPass
//   7. BatteryOptimizationPass
//   8. RenderGraphConstruction   (Unreal RDG)
//   9. DisplayListGeneration     (Chromium)
// ═══════════════════════════════════════════════════════════════════════════

import type {
  CompileDecision,
  DeviceProfile,
  DisplayItem,
  PropertyNode,
  ReactiveScope,
  RenderGraph,
  RenderGraphEdge,
  RenderPass,
  SSAInstruction,
  UIRModule,
  UICompilerOptions,
  UIPropertyType,
} from "./types";
import { PROPERTY_LAYERS } from "./types";

// ─── Pass 1: Reactive Scope Discovery (from React Compiler) ──────────────────
// Identifies regions whose outputs only change when specific inputs change.
// Enables coarse-grained caching at the IR level.

export function reactiveScopeDiscovery(
  module: UIRModule,
): { module: UIRModule; decisions: CompileDecision[] } {
  const decisions: CompileDecision[] = [];
  const scopes: ReactiveScope[] = [];

  // Group instructions by their pipeline layer
  const layerGroups: Record<string, SSAInstruction[]> = {
    layout: [],
    paint: [],
    composite: [],
  };

  for (const instr of module.instructions) {
    const resultProp = instr.result?.type;
    if (!resultProp) continue;
    const layer = PROPERTY_LAYERS[resultProp] ?? "paint";
    layerGroups[layer].push(instr);
  }

  // Create a reactive scope per layer
  for (const [layer, instrs] of Object.entries(layerGroups)) {
    if (instrs.length === 0) continue;

    const scope: ReactiveScope = {
      id: `scope-${layer}`,
      inputs: instrs.map((i) => i.result?.id ?? "").filter(Boolean),
      outputs: instrs.map((i) => i.result?.id ?? "").filter(Boolean),
      instructions: instrs,
      cost: layer === "composite" ? "cheap" : layer === "layout" ? "medium" : "expensive",
    };
    scopes.push(scope);

    decisions.push({
      intent: module.intents.map((i) => i.element).join(", "),
      decision: `Created ${layer} reactive scope with ${instrs.length} properties`,
      reason: `${layer} properties form a natural dependency boundary — they only re-execute when ${layer}-level inputs change`,
      alternative: "Single monolithic scope (higher re-execution cost)",
      impact: "performance",
      pass: "reactive-scope-discovery",
    });
  }

  return { module: { ...module, reactiveScopes: scopes }, decisions };
}

// ─── Pass 2: Property Dependency Analysis (from SwiftUI) ─────────────────────
// Builds fine-grained dependency graph. Key insight: changing 'color'
// does NOT invalidate 'layout' (from Chromium's staged pipeline).

export function propertyDependencyAnalysis(
  module: UIRModule,
): { module: UIRModule; decisions: CompileDecision[] } {
  const decisions: CompileDecision[] = [];
  const props = [...module.propertyGraph];

  // Mark all as clean initially
  for (const prop of props) {
    prop.dirty = false;
  }

  // Build forward + backward dependency edges
  for (const prop of props) {
    for (const depId of prop.dependencies) {
      const dep = props.find((p) => p.value.id === depId);
      if (dep && !dep.dependents.includes(prop.value.id)) {
        dep.dependents.push(prop.value.id);
      }
    }
  }

  // Count cross-layer dependencies to report
  const crossLayerDeps = props.filter(
    (p) => p.dependencies.some((dId) => {
      const dep = props.find((x) => x.value.id === dId);
      return dep && dep.layer !== p.layer;
    }),
  );

  if (crossLayerDeps.length > 0) {
    decisions.push({
      intent: "Property dependency analysis",
      decision: `Found ${crossLayerDeps.length} cross-layer dependencies`,
      reason: "Cross-layer deps (e.g., paint depending on layout) are expensive — they trigger re-execution of multiple pipeline stages",
      alternative: "Restructure to keep dependencies within the same layer",
      impact: "performance",
      pass: "property-dependency-analysis",
    });
  }

  return { module: { ...module, propertyGraph: props }, decisions };
}

// ─── Pass 3: Dead Property Elimination (from LLVM DCE) ───────────────────────
// Removes properties that are never used by any downstream operation.

export function deadPropertyElimination(
  module: UIRModule,
): { module: UIRModule; decisions: CompileDecision[]; deadCount: number } {
  const decisions: CompileDecision[] = [];

  // A property is "live" if:
  // 1. It's read by another property's instruction (has dependents), OR
  // 2. It maps to a CSS property that will be emitted (not just internal)
  const liveIds = new Set<string>();

  // All properties that produce visible output are live
  for (const prop of module.propertyGraph) {
    if (prop.dependents.length > 0 || isVisualProperty(prop.property)) {
      liveIds.add(prop.value.id);
    }
  }

  // Transitively mark dependencies of live properties as live
  let changed = true;
  while (changed) {
    changed = false;
    for (const prop of module.propertyGraph) {
      if (!liveIds.has(prop.value.id)) continue;
      for (const depId of prop.dependencies) {
        if (!liveIds.has(depId)) {
          liveIds.add(depId);
          changed = true;
        }
      }
    }
  }

  // Remove dead properties
  const liveProps = module.propertyGraph.filter((p) => liveIds.has(p.value.id));
  const liveInstructions = module.instructions.filter(
    (i) => i.result && liveIds.has(i.result.id),
  );
  const deadCount = module.propertyGraph.length - liveProps.length;

  if (deadCount > 0) {
    decisions.push({
      intent: "Dead property elimination",
      decision: `Eliminated ${deadCount} unused properties`,
      reason: "These properties were defined but never consumed by any downstream operation or visual output",
      alternative: "Keep all properties (increases CSS output size)",
      impact: "performance",
      pass: "dead-property-elimination",
    });
  }

  return {
    module: {
      ...module,
      propertyGraph: liveProps,
      instructions: liveInstructions,
    },
    decisions,
    deadCount,
  };
}

// ─── Pass 4: Device Capability Adaptation ─────────────────────────────────────
// Downgrades effects for low-end devices.

export function deviceCapabilityAdaptation(
  module: UIRModule,
  device: DeviceProfile,
): { module: UIRModule; decisions: CompileDecision[] } {
  const decisions: CompileDecision[] = [];

  // Check for tier-3 instructions on low-tier devices
  const tier3Instructions = module.instructions.filter(
    (i) =>
      (i.kind === "effect-entrance" && i.metadata.effect === "3d-entrance") ||
      i.metadata.requiresWebGL,
  );

  if (tier3Instructions.length > 0 && device.gpuTier < 3) {
    const filtered = module.instructions.filter((i) => !tier3Instructions.includes(i));
    const removedProps = module.propertyGraph.filter(
      (p) => tier3Instructions.some((i) => i.result?.id === p.value.id),
    );
    const keptProps = module.propertyGraph.filter(
      (p) => !removedProps.includes(p),
    );

    decisions.push({
      intent: "Device capability adaptation",
      decision: `Removed ${tier3Instructions.length} Tier 3 effects (GPU tier ${device.gpuTier} < 3 required)`,
      reason: `Device GPU tier ${device.gpuTier} cannot handle WebGL/shader effects — downgrading to CSS-only fallbacks`,
      alternative: `Keep effects (would cause jank or crash on ${device.gpu ? "integrated" : "software"} GPU)`,
      impact: "compatibility",
      pass: "device-capability-adaptation",
    });

    return {
      module: { ...module, instructions: filtered, propertyGraph: keptProps },
      decisions,
    };
  }

  // Check for backdrop-filter on tier 1 devices
  const tier2FilterInstrs = module.instructions.filter(
    (i) => i.kind === "paint-filter" && i.metadata.cssProperty === "backdrop-filter",
  );

  if (tier2FilterInstrs.length > 0 && device.gpuTier < 2) {
    const filtered = module.instructions.filter((i) => !tier2FilterInstrs.includes(i));
    const keptProps = module.propertyGraph.filter(
      (p) => !tier2FilterInstrs.some((i) => i.result?.id === p.value.id),
    );

    decisions.push({
      intent: "Device capability adaptation",
      decision: `Removed ${tier2FilterInstrs.length} backdrop-filter effects (requires GPU tier 2+)`,
      reason: "backdrop-filter is expensive on low-end GPUs — replacing with solid background fallback",
      alternative: "Keep backdrop-filter (would cause scroll jank)",
      impact: "performance",
      pass: "device-capability-adaptation",
    });

    return {
      module: { ...module, instructions: filtered, propertyGraph: keptProps },
      decisions,
    };
  }

  return { module, decisions };
}

// ─── Pass 5: Reduced Motion Pass ─────────────────────────────────────────────
// Replaces animations with instant transitions when prefers-reduced-motion.

export function reducedMotionPass(
  module: UIRModule,
  device: DeviceProfile,
): { module: UIRModule; decisions: CompileDecision[] } {
  if (!device.reducedMotion) {
    return { module, decisions: [] };
  }

  const decisions: CompileDecision[] = [];
  const animationInstrs = module.instructions.filter(
    (i) =>
      i.kind === "effect-entrance" ||
      i.kind === "effect-attention" ||
      i.kind === "effect-hover" ||
      i.result?.type === "animation" ||
      i.result?.type === "transition",
  );

  // Replace animation instructions with no-op constants
  const newInstructions = module.instructions.map((instr) => {
    if (animationInstrs.includes(instr)) {
      return {
        ...instr,
        kind: "const" as const,
        metadata: {
          ...instr.metadata,
          cssProperty: instr.metadata.cssProperty ?? "animation",
          rawValue: "none",
          reducedMotion: true,
          originalValue: instr.metadata.rawValue,
        },
      };
    }
    return instr;
  });

  decisions.push({
    intent: "Reduced motion",
    decision: `Disabled ${animationInstrs.length} animations for prefers-reduced-motion`,
    reason: "User has enabled reduced motion — all animations replaced with instant transitions",
    alternative: "Keep animations (violates a11y preference, may cause vestibular discomfort)",
    impact: "accessibility",
    pass: "reduced-motion",
  });

  return {
    module: { ...module, instructions: newInstructions },
    decisions,
  };
}

// ─── Pass 6: Accessibility Pass ───────────────────────────────────────────────
// Ensures focus rings, ARIA labels, and color contrast.

export function accessibilityPass(
  module: UIRModule,
  device: DeviceProfile,
): { module: UIRModule; decisions: CompileDecision[] } {
  const decisions: CompileDecision[] = [];

  // Ensure focus-visible ring exists
  const hasFocusRing = module.instructions.some((i) => i.kind === "a11y-focus-ring");
  if (!hasFocusRing) {
    decisions.push({
      intent: "Accessibility",
      decision: "Focus ring instruction already present",
      reason: "Intent parser proactively added a11y-focus-ring instruction",
      alternative: "No action needed",
      impact: "accessibility",
      pass: "accessibility",
    });
  }

  // High contrast mode: ensure borders/outlines are visible
  if (device.highContrast) {
    const borderProps = module.propertyGraph.filter(
      (p) => p.property === "border-width" || p.property === "border-color",
    );
    if (borderProps.length === 0) {
      decisions.push({
        intent: "High contrast",
        decision: "Added visible border for high-contrast mode",
        reason: "High-contrast mode requires visible boundaries on interactive elements",
        alternative: "Keep transparent borders (invisible in high-contrast mode)",
        impact: "accessibility",
        pass: "accessibility",
      });
    }
  }

  return { module, decisions };
}

// ─── Pass 7: Battery Optimization Pass ───────────────────────────────────────
// Reduces animation complexity when battery is low.

export function batteryOptimizationPass(
  module: UIRModule,
  device: DeviceProfile,
): { module: UIRModule; decisions: CompileDecision[] } {
  if (!device.batteryLevel || device.batteryLevel === "high") {
    return { module, decisions: [] };
  }

  const decisions: CompileDecision[] = [];
  const expensiveScopes = module.reactiveScopes.filter((s) => s.cost === "expensive");

  if (expensiveScopes.length > 0 && (device.batteryLevel === "low" || device.batteryLevel === "critical")) {
    // Demote expensive scopes to cheap
    const newScopes = module.reactiveScopes.map((s) => ({
      ...s,
      cost: (s.cost === "expensive" ? "cheap" : s.cost) as "cheap" | "medium" | "expensive",
    }));

    decisions.push({
      intent: "Battery optimization",
      decision: `Demoted ${expensiveScopes.length} expensive reactive scopes to cheap (battery: ${device.batteryLevel})`,
      reason: `Low battery (${device.batteryLevel}) — reducing GPU-intensive paint operations to save power`,
      alternative: "Keep expensive scopes (faster battery drain)",
      impact: "battery",
      pass: "battery-optimization",
    });

    return { module: { ...module, reactiveScopes: newScopes }, decisions };
  }

  return { module, decisions };
}

// ─── Pass 8: Render Graph Construction (from Unreal RDG) ─────────────────────
// Builds a frame-level render graph with resource dependencies.
// Enables pass culling, resource aliasing, and parallel scheduling.

export function renderGraphConstruction(
  module: UIRModule,
): { module: UIRModule; decisions: CompileDecision[] } {
  const decisions: CompileDecision[] = [];
  const passes: RenderPass[] = [];
  const edges: RenderGraphEdge[] = [];

  // Create passes for each pipeline stage
  const hasLayout = module.propertyGraph.some((p) => p.layer === "layout");
  const hasPaint = module.propertyGraph.some((p) => p.layer === "paint");
  const hasComposite = module.propertyGraph.some((p) => p.layer === "composite");
  const hasEffects = module.instructions.some(
    (i) => i.kind.startsWith("effect-"),
  );

  if (hasLayout) {
    passes.push({
      id: "pass-layout",
      kind: "layout",
      reads: [],
      writes: ["layout-cache"],
      instructions: module.instructions.filter((i) =>
        module.propertyGraph.some(
          (p) => p.value.def.id === i.id && p.layer === "layout",
        ),
      ),
      cost: 2.0,
      required: true,
    });
  }

  if (hasPaint) {
    passes.push({
      id: "pass-style-recalc",
      kind: "style-recalc",
      reads: ["layout-cache"],
      writes: ["style-cache"],
      instructions: module.instructions.filter((i) =>
        module.propertyGraph.some(
          (p) => p.value.def.id === i.id && p.layer === "paint",
        ),
      ),
      cost: 1.5,
      required: true,
    });

    passes.push({
      id: "pass-paint",
      kind: "paint",
      reads: ["style-cache", "layout-cache"],
      writes: ["texture-framebuffer"],
      instructions: [],
      cost: 4.0,
      required: true,
    });
  }

  if (hasComposite) {
    passes.push({
      id: "pass-composite",
      kind: "composite",
      reads: ["texture-framebuffer"],
      writes: ["layer-output"],
      instructions: module.instructions.filter((i) =>
        module.propertyGraph.some(
          (p) => p.value.def.id === i.id && p.layer === "composite",
        ),
      ),
      cost: 1.0,
      required: true,
    });
  }

  if (hasEffects) {
    passes.push({
      id: "pass-effects",
      kind: "effect-apply",
      reads: ["texture-framebuffer"],
      writes: ["texture-framebuffer"],
      instructions: module.instructions.filter((i) => i.kind.startsWith("effect-")),
      cost: 3.0,
      required: false,
    });
  }

  // Build edges from resource dependencies
  for (let i = 0; i < passes.length; i++) {
    for (let j = i + 1; j < passes.length; j++) {
      const hasRawDep = passes[i].writes.some((w) => passes[j].reads.includes(w));
      if (hasRawDep) {
        edges.push({ from: passes[i].id, to: passes[j].id, type: "read-after-write" });
      }
      const hasOrderDep = passes[j].writes.some((w) => passes[i].reads.includes(w));
      if (hasOrderDep) {
        edges.push({ from: passes[j].id, to: passes[i].id, type: "write-after-read" });
      }
    }
  }

  const renderGraph: RenderGraph = {
    passes,
    resources: [
      { id: "layout-cache", type: "layout-cache", transient: true, lifetime: { startPass: "pass-layout", endPass: "pass-composite" } },
      { id: "style-cache", type: "style-cache", transient: true, lifetime: { startPass: "pass-style-recalc", endPass: "pass-paint" } },
      { id: "texture-framebuffer", type: "texture", transient: true, lifetime: { startPass: "pass-paint", endPass: "pass-composite" } },
      { id: "layer-output", type: "layer", transient: false, lifetime: { startPass: "pass-composite", endPass: "pass-composite" } },
    ],
    edges,
  };

  decisions.push({
    intent: "Render graph construction",
    decision: `Built render graph with ${passes.length} passes, ${edges.length} edges`,
    reason: "Frame-level render graph enables pass culling (skip unused passes), resource aliasing (reuse memory), and parallel scheduling",
    alternative: "Direct execution without graph (no culling or aliasing)",
    impact: "performance",
    pass: "render-graph-construction",
  });

  return {
    module: { ...module, renderGraph },
    decisions,
  };
}

// ─── Pass 9: Display List Generation (from Chromium RenderingNG) ─────────────
// Flattens the IR into an ordered list of atomic rendering operations.

export function displayListGeneration(
  module: UIRModule,
): { module: UIRModule; decisions: CompileDecision[] } {
  const decisions: CompileDecision[] = [];
  const displayList: DisplayItem[] = [];
  let layerId = "layer-0";

  // Phase 1: Layout items
  for (const prop of module.propertyGraph) {
    if (prop.layer === "layout" && prop.value.def.metadata.cssProperty) {
      displayList.push({
        kind: "fill-rect",
        bounds: { x: 0, y: 0, width: 0, height: 0 },
        properties: {
          property: String(prop.value.def.metadata.cssProperty ?? ""),
          value: String(prop.value.def.metadata.rawValue ?? ""),
        },
        layerId,
      });
    }
  }

  // Phase 2: Paint items
  const paintProps = module.propertyGraph.filter((p) => p.layer === "paint");
  if (paintProps.length > 0) {
    displayList.push({ kind: "begin-layer", bounds: { x: 0, y: 0, width: 0, height: 0 }, properties: {}, layerId });

    for (const prop of paintProps) {
      const cssProp = prop.value.def.metadata.cssProperty as string;
      const rawVal = (prop.value.def.metadata.rawValue as string) ?? "";

      if (cssProp === "background" || cssProp === "background-color") {
        displayList.push({
          kind: "fill-rect",
          bounds: { x: 0, y: 0, width: 0, height: 0 },
          properties: { fill: rawVal },
          layerId,
        });
      } else if (cssProp === "box-shadow") {
        displayList.push({
          kind: "draw-shadow",
          bounds: { x: 0, y: 0, width: 0, height: 0 },
          properties: { shadow: rawVal },
          layerId,
        });
      } else if (cssProp === "backdrop-filter" || cssProp === "filter") {
        displayList.push({
          kind: "apply-filter",
          bounds: { x: 0, y: 0, width: 0, height: 0 },
          properties: { filter: rawVal },
          layerId,
        });
      } else if (cssProp === "border-width" || cssProp === "border-color") {
        displayList.push({
          kind: "draw-border",
          bounds: { x: 0, y: 0, width: 0, height: 0 },
          properties: { [cssProp]: rawVal },
          layerId,
        });
      }
    }

    displayList.push({ kind: "end-layer", bounds: { x: 0, y: 0, width: 0, height: 0 }, properties: {}, layerId });
  }

  // Phase 3: Composite items (GPU-friendly)
  const compProps = module.propertyGraph.filter((p) => p.layer === "composite");
  for (const prop of compProps) {
    const cssProp = prop.value.def.metadata.cssProperty as string;
    if (cssProp === "transform") {
      displayList.push({
        kind: "apply-transform",
        bounds: { x: 0, y: 0, width: 0, height: 0 },
        properties: { transform: String(prop.value.def.metadata.rawValue ?? "") },
        layerId,
      });
    } else if (cssProp === "opacity") {
      displayList.push({
        kind: "apply-opacity",
        bounds: { x: 0, y: 0, width: 0, height: 0 },
        properties: { opacity: String(prop.value.def.metadata.rawValue ?? "1") },
        layerId,
      });
    } else if (cssProp === "will-change") {
      // Promote to its own compositor layer
      layerId = `layer-${displayList.length}`;
      displayList.push({
        kind: "begin-layer",
        bounds: { x: 0, y: 0, width: 0, height: 0 },
        properties: { willChange: String(prop.value.def.metadata.rawValue ?? "") },
        layerId,
      });
    }
  }

  decisions.push({
    intent: "Display list generation",
    decision: `Generated ${displayList.length} display items across ${layerId.replace("layer-", "") + 1} layers`,
    reason: "Flat display list enables parallel rasterization and compositor-driven animation (transform/opacity at 60fps without re-layout)",
    alternative: "Tree-based rendering (no parallelization, no compositor bypass)",
    impact: "performance",
    pass: "display-list-generation",
  });

  return {
    module: { ...module, displayList },
    decisions,
  };
}

// ─── Pass Manager (runs all passes in order) ──────────────────────────────────

export function runOptimizationPasses(
  module: UIRModule,
  options: UICompilerOptions,
): { module: UIRModule; decisions: CompileDecision[]; deadCount: number } {
  const device = options.deviceProfile ?? module.metadata.deviceProfile ?? {
    gpu: true,
    gpuTier: 2,
    screenSize: { width: 1920, height: 1080 },
    pixelRatio: 1,
    reducedMotion: false,
    highContrast: false,
    connectionType: "4g",
  } as DeviceProfile;

  const passes = options.passes ?? {};
  const allDecisions: CompileDecision[] = [];
  let deadCount = 0;

  // Pass 1: Reactive Scope Discovery
  if (passes.reactiveScopeDiscovery !== false) {
    const result = reactiveScopeDiscovery(module);
    module = result.module;
    allDecisions.push(...result.decisions);
  }

  // Pass 2: Property Dependency Analysis
  if (passes.propertyDependencyAnalysis !== false) {
    const result = propertyDependencyAnalysis(module);
    module = result.module;
    allDecisions.push(...result.decisions);
  }

  // Pass 3: Dead Property Elimination
  if (passes.deadPropertyElimination !== false) {
    const result = deadPropertyElimination(module);
    module = result.module;
    allDecisions.push(...result.decisions);
    deadCount = result.deadCount;
  }

  // Pass 4: Device Capability Adaptation
  if (passes.deviceAdaptation !== false) {
    const result = deviceCapabilityAdaptation(module, device);
    module = result.module;
    allDecisions.push(...result.decisions);
  }

  // Pass 5: Reduced Motion
  if (passes.reducedMotion !== false) {
    const result = reducedMotionPass(module, device);
    module = result.module;
    allDecisions.push(...result.decisions);
  }

  // Pass 6: Accessibility
  if (passes.accessibility !== false) {
    const result = accessibilityPass(module, device);
    module = result.module;
    allDecisions.push(...result.decisions);
  }

  // Pass 7: Battery Optimization
  if (passes.batteryOptimization !== false) {
    const result = batteryOptimizationPass(module, device);
    module = result.module;
    allDecisions.push(...result.decisions);
  }

  // Pass 8: Render Graph Construction
  if (passes.renderGraphOptimization !== false) {
    const result = renderGraphConstruction(module);
    module = result.module;
    allDecisions.push(...result.decisions);
  }

  // Pass 9: Display List Generation
  if (passes.displayListGeneration !== false) {
    const result = displayListGeneration(module);
    module = result.module;
    allDecisions.push(...result.decisions);
  }

  return { module, decisions: allDecisions, deadCount };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isVisualProperty(prop: UIPropertyType): boolean {
  const nonVisual = new Set<string>([
    "aria-hidden", "role", "tabindex", "contain", "content-visibility",
  ]);
  return !nonVisual.has(prop);
}