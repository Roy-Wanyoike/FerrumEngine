// ─── Worklet Registry ──────────────────────────────────────────────────

import type { PaintWorkletDescriptor } from "../types";

export { glowDescriptor } from "./glow";
export { glassDescriptor } from "./glass";
export { rippleDescriptor } from "./ripple";
export { neonBorderDescriptor } from "./neon-border";
export { noiseDescriptor } from "./noise";
export { gradientMeshDescriptor } from "./gradient-mesh";
export { skeletonDescriptor } from "./skeleton";

import { glowDescriptor } from "./glow";
import { glassDescriptor } from "./glass";
import { rippleDescriptor } from "./ripple";
import { neonBorderDescriptor } from "./neon-border";
import { noiseDescriptor } from "./noise";
import { gradientMeshDescriptor } from "./gradient-mesh";
import { skeletonDescriptor } from "./skeleton";

/** All built-in worklet descriptors, keyed by name. */
export const workletRegistry: Record<string, PaintWorkletDescriptor> = {
  "ferrum-glow": glowDescriptor,
  "ferrum-glass": glassDescriptor,
  "ferrum-ripple": rippleDescriptor,
  "ferrum-neon-border": neonBorderDescriptor,
  "ferrum-noise": noiseDescriptor,
  "ferrum-gradient-mesh": gradientMeshDescriptor,
  "ferrum-skeleton": skeletonDescriptor,
};

/** Ordered list of all built-in worklet names. */
export const builtinWorkletNames = Object.keys(workletRegistry);

/** Ordered array of all descriptors. */
export const allDescriptors = builtinWorkletNames.map(
  (name) => workletRegistry[name],
);

/**
 * Register all worklets via `CSS.paintWorklet.addModule()`.
 * Uses inline Blob URLs so no external .js files are needed at runtime.
 * Only runs if the Paint API is available.
 */
export function registerAllWorklets(): void {
  const cssGlobal = globalThis as any;
  if (typeof cssGlobal.CSS === "undefined" || !("paintWorklet" in cssGlobal.CSS)) {
    console.warn(
      "[Ferrum] CSS Paint API is not supported in this browser. " +
        "Falling back to CSS-only effects.",
    );
    return;
  }

  for (const descriptor of allDescriptors) {
    try {
      const blob = new Blob([descriptor.workletCode], {
        type: "application/javascript",
      });
      const url = URL.createObjectURL(blob);
      cssGlobal.CSS.paintWorklet.addModule(url);
      // Revoke after a tick to free memory — the worklet has been parsed
      setTimeout(() => URL.revokeObjectURL(url), 0);
    } catch (err) {
      console.warn(`[Ferrum] Failed to register worklet "${descriptor.name}":`, err);
    }
  }
}

/**
 * Generate CSS for all worklets using `paint()` with fallback backgrounds.
 * Outputs a complete stylesheet ready for injection or file output.
 *
 * @param prefix - CSS class prefix. Default: `"fr"`
 */
export function generatePaintCSS(_prefix = "fr"): string {
  const sections: string[] = [
    `/* ═══════════════════════════════════════════════════════════════`,
    `   FerrumCSS Paint API — Houdini Paint Worklets`,
    `   Progressive-enhancement: CSS fallbacks → paint() enhancement`,
    `   ═══════════════════════════════════════════════════════════════ */`,
    ``,
    `@layer ferrum.paint {`,
  ];

  for (const desc of allDescriptors) {
    const cls = desc.cssClass; // e.g. ".fr-glow"

    sections.push(``);
    sections.push(`/* ${desc.name} */`);

    // Extract variable defaults from fallbackCSS for the paint-enhanced version
    sections.push(desc.fallbackCSS.replace(
      new RegExp(`\\${cls}\\s*\\{`, "g"),
      `${cls} {`,
    ));

    // Paint API enhanced version
    sections.push(``);
    sections.push(`@supports (background: paint(id)) {`);
    sections.push(`  ${cls} {`);

    // Add default variable declarations
    for (const prop of desc.inputProperties) {
      const varName = prop;
      // Extract default from fallbackCSS if present
      const defaultMatch = desc.fallbackCSS.match(
        new RegExp(`${varName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*:\\s*([^;]+)`),
      );
      const defaultVal = defaultMatch ? defaultMatch[1].trim() : "";
      if (defaultVal) {
        sections.push(`    ${varName}: ${defaultVal};`);
      }
    }

    // Determine if this is a border or background worklet
    if (desc.name === "ferrum-neon-border") {
      sections.push(`    border-image: paint(${desc.name}) 1;`);
      sections.push(`    border-style: solid;`);
      sections.push(`    border-color: transparent;`);
    } else if (desc.name === "ferrum-ripple") {
      sections.push(`    position: absolute;`);
      sections.push(`    inset: 0;`);
      sections.push(`    pointer-events: none;`);
      sections.push(`    background: paint(${desc.name});`);
    } else {
      sections.push(`    background: paint(${desc.name});`);
    }

    sections.push(`  }`);
    sections.push(`}`);
  }

  sections.push(``);
  sections.push(`}`);

  // Progressive enhancement note
  sections.push(``);
  sections.push(`/* Progressive enhancement — paint() only renders when supported */`);
  sections.push(`/* Fallback styles above are active in non-Houdini browsers */`);

  return sections.join("\n");
}