// ─── Ferrum UI Compiler — Platform Backends ───────────────────────────────
// Converts optimized UI-IR to target-specific rendering code.
// Backends: CSS, Canvas, Compositor, Decision.
// Zero external dependencies.
//
// Architecture: Each backend is a pure function UIRModule → output.
// Adding a new target (SVG, PDF, Native) = adding one new function.
// ═══════════════════════════════════════════════════════════════════════════

import type {
  CompileDecision,
  DisplayItem,
  PropertyNode,
  RenderGraph,
  SSAInstruction,
  UIRModule,
  UIPropertyType,
} from "./types";
import { PROP_TO_CSS, PROPERTY_LAYERS } from "./types";

// ─── CSS Backend ──────────────────────────────────────────────────────────────
// Converts UI-IR property graph to CSS declarations.

export function cssBackend(module: UIRModule): { css: string; decisions: CompileDecision[] } {
  const decisions: CompileDecision[] = [];
  const lines: string[] = [];
  const keyframes: Set<string> = new Set();

  // Group properties by pipeline layer for correct CSS ordering
  const layoutProps = module.propertyGraph.filter((p) => p.layer === "layout");
  const paintProps = module.propertyGraph.filter((p) => p.layer === "paint");
  const compositeProps = module.propertyGraph.filter((p) => p.layer === "composite");

  // Generate base styles
  const allProps = [...layoutProps, ...paintProps, ...compositeProps];
  const cssDecls = allProps
    .map(propToCSSDeclaration)
    .filter(Boolean);

  if (cssDecls.length > 0) {
    const element = module.intents[0]?.element ?? "div";
    lines.push(`.${element.toLowerCase()} {`);
    for (const decl of cssDecls) {
      lines.push(`  ${decl}`);
    }
    lines.push(`}`);
  }

  // Generate hover state if interaction instructions exist
  const hoverInstrs = module.instructions.filter(
    (i) => i.kind === "effect-hover" && !i.metadata.reducedMotion,
  );
  if (hoverInstrs.length > 0) {
    const element = module.intents[0]?.element ?? "div";
    lines.push(`\n.${element.toLowerCase()}:hover {`);
    for (const instr of hoverInstrs) {
      if (instr.metadata.transform) {
        lines.push(`  transform: ${instr.metadata.transform};`);
      }
      if (instr.metadata.shadow) {
        lines.push(`  box-shadow: ${instr.metadata.shadow};`);
      }
    }
    lines.push(`}`);
  }

  // Generate @keyframes for animation instructions
  const animInstrs = module.instructions.filter(
    (i) => (i.kind === "effect-entrance" || i.kind === "effect-attention") && i.metadata.animation,
  );
  for (const instr of animInstrs) {
    const name = instr.metadata.animation as string;
    if (!keyframes.has(name)) {
      keyframes.add(name);
      lines.push(generateKeyframe(name, instr));
    }
  }

  // Generate @media (prefers-reduced-motion) if a11y instructions exist
  const rmInstrs = module.instructions.filter((i) => i.kind === "a11y-reduce-motion");
  if (rmInstrs.length > 0) {
    lines.push(`\n@media (prefers-reduced-motion: reduce) {`);
    const element = module.intents[0]?.element ?? "div";
    lines.push(`  .${element.toLowerCase()} {`);
    lines.push(`    animation: none !important;`);
    lines.push(`    transition: none !important;`);
    lines.push(`  }`);
    lines.push(`}`);
  }

  // Generate compositor hints
  const willChangeProps = compositeProps.filter((p) => p.property === "will-change");
  if (willChangeProps.length > 0) {
    decisions.push({
      intent: module.intents[0]?.element ?? "unknown",
      decision: "Promoted to own compositor layer via will-change",
      reason: "Transform and opacity properties can be animated on the compositor thread (60fps) without triggering layout or paint",
      alternative: "No layer promotion (animations trigger full pipeline: layout → paint → composite)",
      impact: "performance",
      pass: "css-backend",
    });
  }

  const css = lines.join("\n");
  return {
    css,
    decisions,
  };
}

function propToCSSDeclaration(prop: PropertyNode): string | null {
  const instr = prop.value.def;
  const cssProp = instr.metadata.cssProperty as string | undefined;
  const rawValue = instr.metadata.rawValue as string | undefined;

  if (!cssProp || !rawValue) return null;
  if (rawValue === "none" && instr.metadata.reducedMotion) {
    return `${cssProp}: ${rawValue};`;
  }
  if (rawValue) {
    return `${cssProp}: ${rawValue};`;
  }
  return null;
}

function generateKeyframe(name: string, instr: SSAInstruction): string {
  const effect = instr.metadata.effect as string;

  if (effect === "fade") {
    return `
@keyframes ${name} {
  from { opacity: 0; }
  to { opacity: 1; }
}`;
  }

  if (effect === "3d-entrance") {
    return `
@keyframes ${name} {
  from {
    opacity: 0;
    transform: perspective(${instr.metadata.perspective ?? "1000px"}) rotateX(10deg) translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: perspective(${instr.metadata.perspective ?? "1000px"}) rotateX(0) translateY(0) scale(1);
  }
}`;
  }

  if (effect === "lift") {
    return `
@keyframes ${name} {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`;
  }

  if (effect === "shine") {
    return `
@keyframes ${name} {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}`;
  }

  if (effect === "gradient-shift") {
    return `
@keyframes ${name} {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`;
  }

  return `
@keyframes ${name} {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}`;
}

// ─── Canvas Backend ───────────────────────────────────────────────────────────
// Converts UI-IR to Canvas2D API calls.

export function canvasBackend(module: UIRModule): { canvasCode: string; decisions: CompileDecision[] } {
  const decisions: CompileDecision[] = [];
  const lines: string[] = [];
  const indent = "  ";

  lines.push(`// Auto-generated by Ferrum UI Compiler`);
  lines.push(`// Target: Canvas2D`);
  lines.push(`const ctx = canvas.getContext('2d');`);
  lines.push("");

  const props = new Map<string, string>();
  for (const prop of module.propertyGraph) {
    const cssProp = PROP_TO_CSS[prop.property];
    const rawVal = prop.value.def.metadata.rawValue as string | undefined;
    if (cssProp && rawVal) {
      props.set(cssProp, rawVal);
    }
  }

  // Background
  const bg = props.get("background") ?? props.get("background-color");
  if (bg) {
    lines.push(`${indent}ctx.fillStyle = '${bg}';`);
    lines.push(`${indent}ctx.fillRect(0, 0, canvas.width, canvas.height);`);
    lines.push("");
  }

  // Border radius + fill
  const borderRadius = props.get("border-radius");
  if (borderRadius) {
    lines.push(`${indent}// Rounded rectangle`);
    lines.push(`${indent}const r = ${borderRadius};`);
    lines.push(`${indent}ctx.beginPath();`);
    lines.push(`${indent}ctx.roundRect(0, 0, canvas.width, canvas.height, r);`);
    lines.push(`${indent}ctx.fill();`);
    lines.push("");
  }

  // Shadow
  const shadow = props.get("box-shadow");
  if (shadow) {
    lines.push(`${indent}ctx.shadowColor = '${extractShadowColor(shadow)}';`);
    lines.push(`${indent}ctx.shadowBlur = ${extractShadowBlur(shadow)};`);
    lines.push(`${indent}ctx.shadowOffsetX = ${extractShadowOffsetX(shadow)};`);
    lines.push(`${indent}ctx.shadowOffsetY = ${extractShadowOffsetY(shadow)};`);
    lines.push("");
  }

  // Opacity
  const opacity = props.get("opacity");
  if (opacity) {
    lines.push(`${indent}ctx.globalAlpha = ${opacity};`);
    lines.push("");
  }

  decisions.push({
    intent: module.intents[0]?.element ?? "unknown",
    decision: `Generated ${lines.length} lines of Canvas2D code`,
    reason: "Canvas backend provides pixel-level control for effects that CSS cannot express (custom shaders, complex clipping, particle systems)",
    alternative: "CSS backend (simpler but less expressive)",
    impact: "performance",
    pass: "canvas-backend",
  });

  return { canvasCode: lines.join("\n"), decisions };
}

// ─── Compositor Backend ───────────────────────────────────────────────────────
// Identifies which properties should be compositor-driven and generates hints.

export function compositorBackend(module: UIRModule): { decisions: CompileDecision[] } {
  const decisions: CompileDecision[] = [];

  const compositeProps = module.propertyGraph.filter((p) => p.layer === "composite");
  const compositorFriendly = compositeProps.filter((p) =>
    ["transform", "opacity", "will-change", "translate-x", "translate-y", "scale", "rotate"].includes(p.property),
  );

  const nonCompositorFriendly = compositeProps.filter((p) =>
    !["transform", "opacity", "will-change", "translate-x", "translate-y", "scale", "rotate"].includes(p.property),
  );

  if (compositorFriendly.length > 0) {
    decisions.push({
      intent: module.intents[0]?.element ?? "unknown",
      decision: `${compositorFriendly.length} properties marked for compositor thread (${compositorFriendly.map((p) => p.property).join(", ")})`,
      reason: "These properties can be animated at 60fps on the compositor thread without triggering layout or paint — the holy grail of CSS performance (from Chromium's compositor-driven animation model)",
      alternative: "Animate on main thread (triggers layout → paint → composite for every frame)",
      impact: "performance",
      pass: "compositor-backend",
    });
  }

  if (nonCompositorFriendly.length > 0) {
    decisions.push({
      intent: module.intents[0]?.element ?? "unknown",
      decision: `${nonCompositorFriendly.length} composite-layer properties NOT compositor-friendly: ${nonCompositorFriendly.map((p) => p.property).join(", ")}`,
      reason: "These properties (like mix-blend-mode, filter) require paint recalculation even though they're in the composite layer — they cannot bypass the main thread",
      alternative: "Force compositor promotion (may cause visual artifacts)",
      impact: "performance",
      pass: "compositor-backend",
    });
  }

  // Layer promotion analysis
  const hasTransform = compositeProps.some((p) => p.property === "transform");
  const hasWillChange = compositeProps.some((p) => p.property === "will-change");
  const hasOpacity = compositeProps.some((p) => p.property === "opacity");

  if (hasTransform && !hasWillChange) {
    decisions.push({
      intent: "Layer promotion",
      decision: "Consider adding will-change: transform for explicit layer promotion",
      reason: "The element has transform animations but no explicit will-change — the browser may or may not promote it depending on heuristics. Explicit promotion is more reliable.",
      alternative: "Rely on browser's implicit promotion heuristics (may fail on some browsers)",
      impact: "performance",
      pass: "compositor-backend",
    });
  }

  return { decisions };
}

// ─── Render Graph Backend ─────────────────────────────────────────────────────
// Outputs the render graph as a human-readable DOT-style format.

export function renderGraphBackend(module: UIRModule): { graph: string; decisions: CompileDecision[] } {
  const decisions: CompileDecision[] = [];
  const rg = module.renderGraph;

  if (!rg) {
    return { graph: "", decisions };
  }

  const lines: string[] = [];
  lines.push("digraph RenderGraph {");
  lines.push("  rankdir=LR;");
  lines.push("  node [shape=box, style=filled, fillcolor=#1a1a2e, fontcolor=white, color=#6366f1];");

  for (const pass of rg.passes) {
    const costColor = pass.cost > 3 ? "#ef4444" : pass.cost > 2 ? "#f59e0b" : "#22c55e";
    lines.push(`  "${pass.id}" [label="${pass.kind}\\ncost: ${pass.cost}ms" fillcolor=${costColor}22];`);
  }

  for (const edge of rg.edges) {
    const style = edge.type === "read-after-write" ? "[color=#6366f1]" : "[color=#a855f7, style=dashed]";
    lines.push(`  "${edge.from}" -> "${edge.to}" ${style};`);
  }

  lines.push("}");

  decisions.push({
    intent: "Render graph visualization",
    decision: `Render graph has ${rg.passes.length} passes, ${rg.edges.length} edges, ${rg.resources.length} resources`,
    reason: "Render graph enables frame-level optimization: pass culling (skip unused), resource aliasing (reuse GPU memory), and parallel scheduling (independent passes on separate threads)",
    alternative: "Direct sequential execution (no optimization opportunities)",
    impact: "performance",
    pass: "render-graph-backend",
  });

  return { graph: lines.join("\n"), decisions };
}

// ─── Shadow Parsing Helpers ───────────────────────────────────────────────────

function extractShadowColor(shadow: string): string {
  const match = shadow.match(/rgba?\([^)]+\)/);
  return match ? match[0] : "rgba(0,0,0,0.1)";
}

function extractShadowBlur(shadow: string): number {
  const match = shadow.match(/(\d+)px/);
  return match ? parseInt(match[1], 10) : 10;
}

function extractShadowOffsetX(shadow: string): number {
  const parts = shadow.split(" ");
  if (parts.length >= 1) {
    const val = parseFloat(parts[0]);
    return isNaN(val) ? 0 : val;
  }
  return 0;
}

function extractShadowOffsetY(shadow: string): number {
  const parts = shadow.split(" ");
  if (parts.length >= 2) {
    const val = parseFloat(parts[1]);
    return isNaN(val) ? 4 : val;
  }
  return 4;
}