/* ===== Ferrum VFX — Main Entry ===== */
/* Visual Effects Engine for FerrumCSS */

import type { VFXConfig, VFXEngine } from './types';

import { generateLightingCSS } from './lighting';
import { generateGlassCSS } from './glass';
import { generateLiquidCSS } from './liquid';
import { generateAtmosphericCSS } from './atmospheric';
import { generateEnergyCSS } from './energy';
import { generateMaterialCSS } from './material';
import { generateSurfaceCSS } from './surface';
import { generateBorderCSS } from './border';
import { generateBackgroundCSS } from './background';
import { generateShadowCSS } from './shadow';
import { generateBlurCSS } from './blur';
import { generateDistortionCSS } from './distortion';
import { generateCursorCSS } from './cursor';
import { generateRevealCSS } from './reveal';
import { generateCompositionCSS } from './composition';

export type {
  VFXConfig,
  VFXEngine,
  VFXEffectDefinition,
  VFXEngineDefinition,
  VFXTokenSpec,
  VFXComposition,
  VFXOriginalEffect,
  VFXRenderingStrategy,
  VFXPerformanceTier,
  VFXBrowserSupport,
  VFXGpuOptimization,
  VFXFallback,
} from './types';

export { originalVFXEffects } from './innovations';

/**
 * Generate the complete Ferrum VFX stylesheet.
 * Includes all 14 VFX engines + composition: lighting, glass, liquid,
 * atmospheric, energy, material, surface, border, background, shadow,
 * blur, distortion, cursor, reveal, and composition.
 *
 * Supports selective engine inclusion via config.engines.
 */
/** All engine generators indexed by engine name */
const engineGenerators: Record<string, (prefix?: string) => string> = {
  lighting: (p) => generateLightingCSS(p),
  glass: (p) => generateGlassCSS(p),
  liquid: (p) => generateLiquidCSS(p),
  atmospheric: (p) => generateAtmosphericCSS(p),
  energy: (p) => generateEnergyCSS(p),
  material: (p) => generateMaterialCSS(p),
  surface: (p) => generateSurfaceCSS(p),
  border: (p) => generateBorderCSS(p),
  background: (p) => generateBackgroundCSS(p),
  shadow: (p) => generateShadowCSS(p),
  blur: (p) => generateBlurCSS(p),
  distortion: (p) => generateDistortionCSS(p),
  cursor: (p) => generateCursorCSS(p),
  reveal: (p) => generateRevealCSS(p),
  composition: (p) => generateCompositionCSS(p),
};

const ALL_ENGINES: VFXEngine[] = [
  'lighting', 'glass', 'liquid', 'atmospheric', 'energy',
  'material', 'surface', 'border', 'background', 'shadow',
  'blur', 'distortion', 'cursor', 'reveal', 'composition',
];

export function generateVFXCSS(config: VFXConfig = {}): string {
  const prefix = config.prefix;
  let engines = ALL_ENGINES;

  if (config.engines) {
    const include = new Set(config.engines);
    engines = engines.filter((e) => include.has(e));
  }
  if (config.excludeEngines) {
    const exclude = new Set(config.excludeEngines);
    engines = engines.filter((e) => !exclude.has(e));
  }

  return engines
    .map((engine) => engineGenerators[engine]?.(prefix) ?? '')
    .filter(Boolean)
    .join('\n\n');
}

/** Get the list of all available VFX engine names */
export function getVFXEngines(): VFXEngine[] {
  return [...ALL_ENGINES];
}

/** Generate CSS for a single engine by name */
export function generateEngineCSS(engine: VFXEngine, prefix?: string): string {
  return engineGenerators[engine]?.(prefix) ?? '';
}

// Re-export individual module generators for selective usage
export { generateLightingCSS } from './lighting';
export { generateGlassCSS } from './glass';
export { generateLiquidCSS } from './liquid';
export { generateAtmosphericCSS } from './atmospheric';
export { generateEnergyCSS } from './energy';
export { generateMaterialCSS } from './material';
export { generateSurfaceCSS } from './surface';
export { generateBorderCSS } from './border';
export { generateBackgroundCSS } from './background';
export { generateShadowCSS } from './shadow';
export { generateBlurCSS } from './blur';
export { generateDistortionCSS } from './distortion';
export { generateCursorCSS } from './cursor';
export { generateRevealCSS } from './reveal';
export { generateCompositionCSS } from './composition';