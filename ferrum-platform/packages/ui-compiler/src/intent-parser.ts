// ─── Ferrum UI Compiler — Intent Parser ──────────────────────────────────────
// Converts high-level UIIntent into UIRModule with SSA-form instructions.
// Zero external dependencies.
//
// This is the "Frontend" of the compiler — analogous to Clang for LLVM.
// ═══════════════════════════════════════════════════════════════════════════

import type {
  DeviceProfile,
  InteractionType,
  MaterialType,
  MotionQuality,
  PerfTier,
  PropertyNode,
  ReactiveScope,
  SSAInstruction,
  SSAInstructionKind,
  SSAValue,
  UILoc,
  UIIntent,
  UIPropertyType,
  UIRModule,
} from "./types";
import { DEFAULT_DEVICE_PROFILE, MOTION_TIER_MAP, PROPERTY_LAYERS, PROP_TO_CSS } from "./types";

// ─── ID Generation ───────────────────────────────────────────────────────────

let _valueCounter = 0;
let _instrCounter = 0;

function resetCounters(): void {
  _valueCounter = 0;
  _instrCounter = 0;
}

function nextValueId(): string {
  return `%v${_valueCounter++}`;
}

function nextInstrId(): string {
  return `%i${_instrCounter++}`;
}

// ─── SSA Instruction Factory ─────────────────────────────────────────────────

function makeInstruction(
  kind: SSAInstructionKind,
  operands: SSAValue[],
  metadata: Record<string, string | number | boolean> = {},
  resultType?: UIPropertyType,
  loc?: UILoc,
): { instr: SSAInstruction; value?: SSAValue } {
  const instr: SSAInstruction = {
    id: nextInstrId(),
    kind,
    operands,
    metadata,
    loc,
  };

  let value: SSAValue | undefined;
  if (resultType) {
    value = {
      id: nextValueId(),
      type: resultType,
      def: instr,
      uses: [],
    };
    instr.result = value;
  }

  return { instr, value };
}

// ─── Motion Quality Resolution ────────────────────────────────────────────────
// Maps "premium" → actual SSA instructions based on device capability.

interface MotionRecipe {
  instructions: SSAInstruction[];
  properties: PropertyNode[];
  requiredTier: PerfTier;
}

function resolveMotionQuality(
  motion: MotionQuality,
  device: DeviceProfile,
  element: string,
  loc?: UILoc,
): MotionRecipe {
  const instructions: SSAInstruction[] = [];
  const properties: PropertyNode[] = [];
  const requiredTiers = MOTION_TIER_MAP[motion];

  // Every motion quality gets a base transition
  const { instr: baseTrans, value: transVal } = makeInstruction(
    "const",
    [],
    { cssProperty: "transition", rawValue: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)" },
    "transition",
    loc,
  );
  instructions.push(baseTrans);
  if (transVal) {
    properties.push(makePropertyNode("transition", transVal, []));
  }

  // Tier 1: GPU-composited transforms (opacity, transform)
  if (requiredTiers.includes(1)) {
    // will-change for GPU promotion
    const { instr: wc, value: wcVal } = makeInstruction(
      "composite-transform",
      [],
      { cssProperty: "will-change", rawValue: "transform, opacity" },
      "will-change",
      loc,
    );
    instructions.push(wc);
    if (wcVal) {
      properties.push(makePropertyNode("will-change", wcVal, []));
    }

    if (motion === "minimal") {
      // Only opacity transitions
      const { instr, value } = makeInstruction(
        "effect-entrance",
        [],
        { effect: "fade", duration: "0.3s", easing: "ease-out" },
        "opacity",
        loc,
      );
      instructions.push(instr);
      if (value) properties.push(makePropertyNode("opacity", value, []));
    } else {
      // Standard+ gets transform hover effects
      const { instr, value } = makeInstruction(
        "effect-hover",
        [],
        {
          effect: "lift",
          transform: "translateY(-4px)",
          shadow: "0 12px 24px -8px rgba(0,0,0,0.15)",
          duration: "0.3s",
        },
        "transform",
        loc,
      );
      instructions.push(instr);
      if (value) properties.push(makePropertyNode("transform", value, []));
    }
  }

  // Tier 2: Paint effects (shadow, filter, backdrop-filter, blend-mode)
  if (requiredTiers.includes(2) && device.gpuTier >= 2) {
    if (motion === "premium" && device.gpuTier >= 2) {
      // Enhanced shadow
      const { instr: shadow, value: shadowVal } = makeInstruction(
        "paint-shadow",
        [],
        {
          cssProperty: "box-shadow",
          rawValue: "0 8px 32px -8px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.05)",
        },
        "box-shadow",
        loc,
      );
      instructions.push(shadow);
      if (shadowVal) properties.push(makePropertyNode("box-shadow", shadowVal, []));
    }
  }

  // Tier 3: GPU-required effects (3D, particles, complex shaders)
  if (requiredTiers.includes(3) && device.gpuTier >= 3) {
    const { instr, value } = makeInstruction(
      "effect-entrance",
      [],
      {
        effect: "3d-entrance",
        animation: `ferrum-${element.toLowerCase()}-enter`,
        duration: "0.8s",
        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        perspective: "1000px",
      },
      "transform",
      loc,
    );
    instructions.push(instr);
    if (value) properties.push(makePropertyNode("transform", value, []));
  }

  // If device can't handle required tier, downgrade
  if (!requiredTiers.some((t) => t <= device.gpuTier)) {
    const downgradeTier = Math.min(...requiredTiers);
    // Remove tier 2/3 instructions, keep only tier 1
    const filtered = instructions.filter((i) => {
      const meta = i.metadata;
      if (meta.cssProperty === "backdrop-filter") return false;
      if (meta.effect === "3d-entrance") return false;
      return true;
    });
    instructions.length = 0;
    instructions.push(...filtered);
  }

  return { instructions, properties, requiredTier: requiredTiers[requiredTiers.length - 1] };
}

// ─── Material Resolution ─────────────────────────────────────────────────────

function resolveMaterial(
  material: MaterialType,
  device: DeviceProfile,
  loc?: UILoc,
): { instructions: SSAInstruction[]; properties: PropertyNode[] } {
  const instructions: SSAInstruction[] = [];
  const properties: PropertyNode[] = [];

  switch (material) {
    case "flat": {
      const { instr, value } = makeInstruction(
        "paint-fill",
        [],
        { cssProperty: "background", rawValue: "var(--f-bg)" },
        "background",
        loc,
      );
      instructions.push(instr);
      if (value) properties.push(makePropertyNode("background", value, []));
      break;
    }

    case "elevated": {
      const { instr: bg, value: bgVal } = makeInstruction(
        "paint-fill",
        [],
        { cssProperty: "background", rawValue: "var(--f-card)" },
        "background",
        loc,
      );
      instructions.push(bg);
      if (bgVal) properties.push(makePropertyNode("background", bgVal, []));

      const { instr: br, value: brVal } = makeInstruction(
        "const",
        [],
        { cssProperty: "border-radius", rawValue: "12px" },
        "border-radius",
        loc,
      );
      instructions.push(br);
      if (brVal) properties.push(makePropertyNode("border-radius", brVal, []));

      const { instr: sh, value: shVal } = makeInstruction(
        "paint-shadow",
        [],
        { cssProperty: "box-shadow", rawValue: "0 4px 16px -4px rgba(0,0,0,0.1)" },
        "box-shadow",
        loc,
      );
      instructions.push(sh);
      if (shVal) properties.push(makePropertyNode("box-shadow", shVal, []));
      break;
    }

    case "glass": {
      const { instr: bg, value: bgVal } = makeInstruction(
        "paint-fill",
        [],
        { cssProperty: "background", rawValue: "rgba(255,255,255,0.05)" },
        "background",
        loc,
      );
      instructions.push(bg);
      if (bgVal) properties.push(makePropertyNode("background", bgVal, []));

      // Backdrop blur requires GPU tier 2+
      if (device.gpuTier >= 2) {
        const { instr: bf, value: bfVal } = makeInstruction(
          "paint-filter",
          [],
          { cssProperty: "backdrop-filter", rawValue: "blur(20px) saturate(1.8)" },
          "backdrop-filter",
          loc,
        );
        instructions.push(bf);
        if (bfVal) properties.push(makePropertyNode("backdrop-filter", bfVal, []));
      }

      const { instr: br, value: brVal } = makeInstruction(
        "paint-border",
        [],
        {
          cssProperty: "border",
          rawValue: "1px solid rgba(255,255,255,0.1)",
        },
        "border-width",
        loc,
      );
      instructions.push(br);
      if (brVal) properties.push(makePropertyNode("border-width", brVal, []));

      const { instr: rd, value: rdVal } = makeInstruction(
        "const",
        [],
        { cssProperty: "border-radius", rawValue: "16px" },
        "border-radius",
        loc,
      );
      instructions.push(rd);
      if (rdVal) properties.push(makePropertyNode("border-radius", rdVal, []));
      break;
    }

    case "neumorphic": {
      const { instr: bg, value: bgVal } = makeInstruction(
        "paint-fill",
        [],
        { cssProperty: "background", rawValue: "var(--f-bg)" },
        "background",
        loc,
      );
      instructions.push(bg);
      if (bgVal) properties.push(makePropertyNode("background", bgVal, []));

      const { instr: sh, value: shVal } = makeInstruction(
        "paint-shadow",
        [],
        {
          cssProperty: "box-shadow",
          rawValue:
            "8px 8px 16px rgba(0,0,0,0.08), -8px -8px 16px rgba(255,255,255,0.05)",
        },
        "box-shadow",
        loc,
      );
      instructions.push(sh);
      if (shVal) properties.push(makePropertyNode("box-shadow", shVal, []));

      const { instr: rd, value: rdVal } = makeInstruction(
        "const",
        [],
        { cssProperty: "border-radius", rawValue: "12px" },
        "border-radius",
        loc,
      );
      instructions.push(rd);
      if (rdVal) properties.push(makePropertyNode("border-radius", rdVal, []));
      break;
    }

    case "metallic": {
      const { instr: bg, value: bgVal } = makeInstruction(
        "paint-fill",
        [],
        {
          cssProperty: "background",
          rawValue: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        },
        "background",
        loc,
      );
      instructions.push(bg);
      if (bgVal) properties.push(makePropertyNode("background", bgVal, []));

      const { instr: sh, value: shVal } = makeInstruction(
        "paint-shadow",
        [],
        {
          cssProperty: "box-shadow",
          rawValue: "0 4px 20px rgba(102,126,234,0.3)",
        },
        "box-shadow",
        loc,
      );
      instructions.push(sh);
      if (shVal) properties.push(makePropertyNode("box-shadow", shVal, []));

      if (device.gpuTier >= 2) {
        const { instr: anim, value: animVal } = makeInstruction(
          "effect-attention",
          [],
          {
            effect: "shine",
            animation: "ferrum-metallic-shine",
            duration: "3s",
            iteration: "infinite",
          },
          "animation",
          loc,
        );
        instructions.push(anim);
        if (animVal) properties.push(makePropertyNode("animation", animVal, []));
      }
      break;
    }

    case "holographic": {
      const { instr: bg, value: bgVal } = makeInstruction(
        "paint-fill",
        [],
        {
          cssProperty: "background",
          rawValue:
            "linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff)",
        },
        "background",
        loc,
      );
      instructions.push(bg);
      if (bgVal) properties.push(makePropertyNode("background", bgVal, []));

      const { instr: bm, value: bmVal } = makeInstruction(
        "const",
        [],
        { cssProperty: "mix-blend-mode", rawValue: "normal" },
        "mix-blend-mode",
        loc,
      );
      instructions.push(bm);
      if (bmVal) properties.push(makePropertyNode("mix-blend-mode", bmVal, []));

      if (device.gpuTier >= 2) {
        const { instr: anim, value: animVal } = makeInstruction(
          "effect-attention",
          [],
          {
            effect: "gradient-shift",
            animation: "ferrum-holographic-shift",
            duration: "6s",
            iteration: "infinite",
            backgroundSize: "400% 400%",
          },
          "animation",
          loc,
        );
        instructions.push(anim);
        if (animVal) properties.push(makePropertyNode("animation", animVal, []));
      }
      break;
    }
  }

  return { instructions, properties };
}

// ─── Interaction Resolution ──────────────────────────────────────────────────

function resolveInteraction(
  interaction: InteractionType,
  loc?: UILoc,
): { instructions: SSAInstruction[]; properties: PropertyNode[] } {
  const instructions: SSAInstruction[] = [];
  const properties: PropertyNode[] = [];

  switch (interaction) {
    case "none": {
      const { instr, value } = makeInstruction(
        "const",
        [],
        { cssProperty: "cursor", rawValue: "default" },
        "cursor",
        loc,
      );
      instructions.push(instr);
      if (value) properties.push(makePropertyNode("cursor", value, []));
      break;
    }

    case "magnetic": {
      const { instr: cur, value: curVal } = makeInstruction(
        "const",
        [],
        { cssProperty: "cursor", rawValue: "none" },
        "cursor",
        loc,
      );
      instructions.push(cur);
      if (curVal) properties.push(makePropertyNode("cursor", curVal, []));

      const { instr: tr, value: trVal } = makeInstruction(
        "composite-transform",
        [],
        {
          cssProperty: "transition",
          rawValue: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        },
        "transition",
        loc,
      );
      instructions.push(tr);
      if (trVal) properties.push(makePropertyNode("transition", trVal, []));

      // Note: magnetic effect requires JS runtime for mouse tracking
      // The IR declares the intent; the backend generates CSS + JS
      const { instr: ef, value: efVal } = makeInstruction(
        "effect-hover",
        [],
        { effect: "magnetic", requiresJS: true, jsHook: "onMouseMove" },
        "transform",
        loc,
      );
      instructions.push(ef);
      if (efVal) properties.push(makePropertyNode("transform", efVal, []));
      break;
    }

    case "spring": {
      const { instr, value } = makeInstruction(
        "const",
        [],
        {
          cssProperty: "transition",
          rawValue: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        },
        "transition",
        loc,
      );
      instructions.push(instr);
      if (value) properties.push(makePropertyNode("transition", value, []));
      break;
    }

    case "elastic": {
      const { instr, value } = makeInstruction(
        "const",
        [],
        {
          cssProperty: "transition",
          rawValue: "all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        },
        "transition",
        loc,
      );
      instructions.push(instr);
      if (value) properties.push(makePropertyNode("transition", value, []));
      break;
    }

    case "snap": {
      const { instr, value } = makeInstruction(
        "const",
        [],
        {
          cssProperty: "transition",
          rawValue: "all 0.15s steps(4, end)",
        },
        "transition",
        loc,
      );
      instructions.push(instr);
      if (value) properties.push(makePropertyNode("transition", value, []));
      break;
    }

    case "drag": {
      const { instr: cur, value: curVal } = makeInstruction(
        "const",
        [],
        { cssProperty: "cursor", rawValue: "grab" },
        "cursor",
        loc,
      );
      instructions.push(cur);
      if (curVal) properties.push(makePropertyNode("cursor", curVal, []));

      const { instr: sel, value: selVal } = makeInstruction(
        "const",
        [],
        { cssProperty: "user-select", rawValue: "none" },
        "pointer-events",
        loc,
      );
      instructions.push(sel);
      if (selVal) properties.push(makePropertyNode("pointer-events", selVal, []));

      const { instr: ef, value: efVal } = makeInstruction(
        "effect-hover",
        [],
        { effect: "drag", requiresJS: true, jsHook: "onDragStart" },
        "transform",
        loc,
      );
      instructions.push(ef);
      if (efVal) properties.push(makePropertyNode("transform", efVal, []));
      break;
    }
  }

  return { instructions, properties };
}

// ─── Property Node Helper ────────────────────────────────────────────────────

function makePropertyNode(
  property: UIPropertyType,
  value: SSAValue,
  dependencies: string[],
): PropertyNode {
  return {
    property,
    value,
    dependencies,
    dependents: [],
    dirty: true,
    layer: PROPERTY_LAYERS[property] ?? "paint",
  };
}

// ─── Main Parse Function ─────────────────────────────────────────────────────

export function parseIntent(
  intent: UIIntent,
  device?: DeviceProfile,
): UIRModule {
  resetCounters();

  const dev = device ?? DEFAULT_DEVICE_PROFILE;
  const allInstructions: SSAInstruction[] = [];
  const allProperties: PropertyNode[] = [];
  const allScopes: ReactiveScope[] = [];

  // 1. Resolve material (visual appearance)
  if (intent.material) {
    const materialResult = resolveMaterial(intent.material, dev, intent.loc);
    allInstructions.push(...materialResult.instructions);
    allProperties.push(...materialResult.properties);
  }

  // 2. Resolve motion quality (animation + interaction complexity)
  if (intent.motion) {
    const motionResult = resolveMotionQuality(intent.motion, dev, intent.element, intent.loc);
    allInstructions.push(...motionResult.instructions);
    allProperties.push(...motionResult.properties);
  }

  // 3. Resolve interaction type
  if (intent.interaction) {
    const interactionResult = resolveInteraction(intent.interaction, intent.loc);
    allInstructions.push(...interactionResult.instructions);
    allProperties.push(...interactionResult.properties);
  }

  // 4. Resolve entrance animation
  if (intent.entrance) {
    const { instr, value } = makeInstruction(
      "effect-entrance",
      [],
      {
        effect: intent.entrance,
        animation: `ferrum-${intent.element.toLowerCase()}-${intent.entrance}`,
        duration: "0.6s",
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        fillMode: "both",
      },
      "animation",
      intent.loc,
    );
    allInstructions.push(instr);
    if (value) allProperties.push(makePropertyNode("animation", value, []));
  }

  // 5. Build reactive scopes — one per major concern (from React Compiler)
  const materialScope = createReactiveScope("material", allProperties.filter((p) => p.layer === "paint"), "cheap");
  const motionScope = createReactiveScope("motion", allProperties.filter((p) => p.layer === "composite"), "medium");
  const layoutScope = createReactiveScope("layout", allProperties.filter((p) => p.layer === "layout"), "cheap");
  allScopes.push(materialScope, motionScope, layoutScope);

  // 6. Build dependency edges between properties
  buildPropertyDependencies(allProperties);

  // 7. Add accessibility instructions (always)
  const a11yResult = addAccessibilityInstructions(allProperties, dev, intent.loc);
  allInstructions.push(...a11yResult.instructions);
  allProperties.push(...a11yResult.properties);

  // Build value map
  const values = new Map<string, SSAValue>();
  for (const prop of allProperties) {
    values.set(prop.value.id, prop.value);
  }

  return {
    id: `uir-${Date.now()}`,
    version: "0.1.0",
    intents: [intent],
    values,
    instructions: allInstructions,
    propertyGraph: allProperties,
    reactiveScopes: allScopes,
    metadata: {
      source: intent.loc?.file,
      deviceProfile: dev,
    },
  };
}

export function parseIntentTree(
  intents: UIIntent[],
  device?: DeviceProfile,
): UIRModule {
  resetCounters();

  const dev = device ?? DEFAULT_DEVICE_PROFILE;
  const allInstructions: SSAInstruction[] = [];
  const allProperties: PropertyNode[] = [];
  const allScopes: ReactiveScope[] = [];

  for (const intent of intents) {
    const module = parseIntent(intent, dev);
    allInstructions.push(...module.instructions);
    allProperties.push(...module.propertyGraph);
    allScopes.push(...module.reactiveScopes);
    module.values.forEach((v, k) => {
      if (!allProperties.some((p) => p.value.id === k)) {
        // Merge values (avoid ID collisions by checking)
      }
    });
  }

  const values = new Map<string, SSAValue>();
  for (const prop of allProperties) {
    values.set(prop.value.id, prop.value);
  }

  return {
    id: `uir-tree-${Date.now()}`,
    version: "0.1.0",
    intents,
    values,
    instructions: allInstructions,
    propertyGraph: allProperties,
    reactiveScopes: allScopes,
    metadata: {
      deviceProfile: dev,
    },
  };
}

// ─── Accessibility Instructions ───────────────────────────────────────────────

function addAccessibilityInstructions(
  existingProps: PropertyNode[],
  device: DeviceProfile,
  loc?: UILoc,
): { instructions: SSAInstruction[]; properties: PropertyNode[] } {
  const instructions: SSAInstruction[] = [];
  const properties: PropertyNode[] = [];

  // Focus ring (always)
  const { instr: focus, value: focusVal } = makeInstruction(
    "a11y-focus-ring",
    [],
    {
      cssProperty: "focus-visible",
      rawValue: "outline: 2px solid var(--f-accent); outline-offset: 2px;",
    },
    "focus-visible",
    loc,
  );
  instructions.push(focus);
  if (focusVal) properties.push(makePropertyNode("focus-visible", focusVal, []));

  // Reduced motion fallback
  if (device.reducedMotion) {
    const { instr: rm, value: rmVal } = makeInstruction(
      "a11y-reduce-motion",
      [],
      {
        effect: "reduce-motion",
        override: "transition: none; animation: none;",
      },
      "transition",
      loc,
    );
    instructions.push(rm);
    if (rmVal) properties.push(makePropertyNode("transition", rmVal, []));
  }

  return { instructions, properties };
}

// ─── Reactive Scope Builder ──────────────────────────────────────────────────

function createReactiveScope(
  name: string,
  properties: PropertyNode[],
  cost: "cheap" | "medium" | "expensive",
): ReactiveScope {
  return {
    id: `scope-${name}`,
    inputs: properties.map((p) => p.value.id),
    outputs: properties.map((p) => p.value.id),
    instructions: properties.map((p) => p.value.def),
    cost,
  };
}

// ─── Property Dependency Builder ──────────────────────────────────────────────

function buildPropertyDependencies(properties: PropertyNode[]): void {
  // Layout properties can depend on each other
  const layoutProps = properties.filter((p) => p.layer === "layout");
  for (let i = 1; i < layoutProps.length; i++) {
    layoutProps[i].dependencies.push(layoutProps[i - 1].value.id);
    layoutProps[i - 1].dependents.push(layoutProps[i].value.id);
  }

  // Paint properties may depend on layout
  const paintProps = properties.filter((p) => p.layer === "paint");
  for (const paint of paintProps) {
    // Background depends on width/height (for sizing)
    for (const layout of layoutProps) {
      if (layout.property === "width" || layout.property === "height") {
        paint.dependencies.push(layout.value.id);
        layout.dependents.push(paint.value.id);
      }
    }
  }

  // Composite properties are independent (GPU-composited)
  // This is the key insight from Chromium: transform/opacity don't
  // trigger layout or paint recalculation.
}