// ─── Main Index ─────────────────────────────────────────────────────

export type {
  PaintWorkletDescriptor,
  PaintRegistrationOptions,
  PaintRegistration,
} from "./types";

export {
  workletRegistry,
  builtinWorkletNames,
  allDescriptors,
  registerAllWorklets,
  generatePaintCSS,
  glowDescriptor,
  glassDescriptor,
  rippleDescriptor,
  neonBorderDescriptor,
  noiseDescriptor,
  gradientMeshDescriptor,
  skeletonDescriptor,
} from "./worklets";

import type { PaintRegistrationOptions, PaintRegistration } from "./types";
import { registerAllWorklets, generatePaintCSS, builtinWorkletNames, workletRegistry } from "./worklets";

/**
 * Register the entire paint system: activates all worklets and returns
 * the CSS + registration JS for deployment.
 *
 * @example
 * ```ts
 * import { registerPaintSystem } from '@ferrum/paint';
 * const { css } = registerPaintSystem();
 * // Inject css into a <style> tag, then call the returned activate function
 * ```
 */
export function registerPaintSystem(
  options: PaintRegistrationOptions = {},
): PaintRegistration & { activate: () => void } {
  const prefix = options.prefix ?? "fr";
  const baseURL = options.workletBaseURL ?? "/_ferrum-worklets/";
  const normalizedBase = baseURL.endsWith("/") ? baseURL : `${baseURL}/`;

  // Generate registration JS that loads worklet .js files from a server
  const registrationLines: string[] = [
    `// FerrumCSS Paint API — Auto-generated registration`,
    `// Add this to your app entry point (after DOM ready):`,
    ``,
    `if ('paintWorklet' in CSS) {`,
  ];

  for (const name of builtinWorkletNames) {
    const slug = name.replace("ferrum-", "");
    registrationLines.push(
      `  CSS.paintWorklet.addModule('${normalizedBase}${slug}.js');`,
    );
  }

  registrationLines.push(`} else {`);
  registrationLines.push(`  console.warn(`);
  registrationLines.push(
    `    '[Ferrum] CSS Paint API is not supported in this browser. ' +`,
  );
  registrationLines.push(
    `    'Falling back to CSS-only effects.'`,
  );
  registrationLines.push(`  );`);
  registrationLines.push(`}`);

  return {
    registrationJS: registrationLines.join("\n"),
    css: generatePaintCSS(prefix),
    activate: registerAllWorklets,
  };
}

/**
 * Generate individual worklet .js files as a map of filename → source.
 * Use this to write worklet files to your public directory or CDN.
 *
 * @example
 * ```ts
 * import { generateWorkletFiles } from '@ferrum/paint';
 * import { writeFileSync, mkdirSync } from 'fs';
 *
 * const files = generateWorkletFiles();
 * mkdirSync('public/_ferrum-worklets', { recursive: true });
 * for (const [name, source] of Object.entries(files)) {
 *   writeFileSync(`public/_ferrum-worklets/${name}`, source);
 * }
 * ```
 */
export function generateWorkletFiles(
  names?: string[],
): Record<string, string> {
  const targets = names ?? builtinWorkletNames;
  const files: Record<string, string> = {};

  for (const name of targets) {
    const descriptor = workletRegistry[name];
    if (descriptor) {
      const slug = name.replace("ferrum-", "");
      files[`${slug}.js`] = descriptor.workletCode.trim();
    }
  }

  return files;
}