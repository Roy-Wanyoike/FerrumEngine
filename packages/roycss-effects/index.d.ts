/**
 * @roycss/effects — RoyCSS Production-ready CSS effects library
 *
 * Main type entry point that re-exports all sub-module types.
 */

// Ferrum VFX
export {
  createParticles,
  applyGlass,
  createGlassCard,
  animateGradient,
  createMeshGradient,
  createCursorGlow,
  createMagneticEffect,
  createGlitchText,
  createTextReveal,
} from './src/ferrum-vfx/index';

export type {
  ParticleConfig,
  ParticleController,
  GlassOptions,
  GradientOptions,
  MeshGradientConfig,
  CursorGlowOptions,
  GlitchOptions,
  RevealOptions,
  VFXCleanup,
} from './src/ferrum-vfx/index';

// Ferrum Motion
export {
  spring,
  decay,
  timeline,
  stagger,
  chain,
  onScroll,
  inView,
} from './src/ferrum-motion/index';

export type {
  SpringController,
  SpringConfig,
  DecayController,
  DecayConfig,
  TimelineSequence,
  TimelineOptions,
  TimelineController,
  ScrollOptions,
  ScrollCallback,
  StaggerOptions,
} from './src/ferrum-motion/index';

// Ferrum Paint
export {
  registerFerrumPaintWorklets,
  isPaintAPISupported,
  getWorkletURL,
  getAllWorkletURLs,
  generatePaintCSS,
  FERRUM_WORKLET_NAMES,
  WORKLET_MODULES,
} from './src/ferrum-paint/index';

export type { FerrumWorkletName } from './src/ferrum-paint/index';

// Effects Data
export { effects } from './src/ferrum-effects-data';

// Effects Index
export {
  effects as effectsIndex,
  effectsIndex as effectsIndexArray,
  categories,
  categoryCounts,
} from './src/ferrum-effects-index';

export type { FerrumEffectIndex, Category } from './src/ferrum-effects-index';

// Effects Loader
export {
  getFullEffects,
  getEffectCss,
  getEffectsCss,
} from './src/ferrum-effects-loader';

// Lazy Loader
export {
  getEffectIndex,
  getCategories,
  loadCategoryEffects,
  getEffectCSS,
  preloadCategory,
  loadAllEffects,
  isCategoryLoaded,
  clearCache,
} from './src/effects/lazy-loader';

// RoyCSS Data
export { effects as roycssEffects, categories as roycssCategories } from './src/roycss-data';
export type { RoyCSSEffect, Category as RoyCSSCategory } from './src/roycss-data';

// RoyCSS Index
export {
  effects as roycssIndexEffects,
  categories as roycssIndexCategories,
  categoryCounts as roycssCategoryCounts,
  stats,
} from './src/roycss-index';
export type { RoyCSSEffectIndex, Category as RoyCSSIndexCategory, Stats } from './src/roycss-index';

// RoyCSS Loader
export {
  getFullEffects as getRoycssFullEffects,
  getEffectCss as getRoycssEffectCss,
  getEffectsCss as getRoycssEffectsCss,
} from './src/roycss-loader';

// Animation Colors
export { spotlightMap } from './src/animation-colors';

// Shared Types
export type { FerrumCSSEffect } from './src/types';
