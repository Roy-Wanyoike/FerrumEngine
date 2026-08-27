/* ===== Ferrum VFX — Type System ===== */

// ─── Engine Identifiers ───────────────────────────────────────────
export type VFXEngine =
  | 'lighting'
  | 'glass'
  | 'liquid'
  | 'atmospheric'
  | 'energy'
  | 'material'
  | 'surface'
  | 'border'
  | 'background'
  | 'shadow'
  | 'blur'
  | 'distortion'
  | 'cursor'
  | 'reveal'
  | 'composition';

export type VFXEngineSet = Set<VFXEngine> | readonly VFXEngine[];

// ─── Rendering Strategy ──────────────────────────────────────────
export type VFXRenderingStrategy =
  | 'pure-css'
  | 'svg-filter'
  | 'houdini-paint'
  | 'backdrop-filter'
  | 'clip-path'
  | 'mask'
  | 'box-shadow'
  | 'filter'
  | 'gradient'
  | 'transform'
  | 'hybrid-css-js'
  | 'canvas'
  | 'webgl';

// ─── Performance Tier ────────────────────────────────────────────
export type VFXPerformanceTier = 'minimal' | 'balanced' | 'premium' | 'ultra';

// ─── Accessibility Level ─────────────────────────────────────────
export type VFXA11yLevel = 'safe' | 'caution' | 'reduced-motion-fallback' | 'decorative-only';

// ─── Effect Definition ───────────────────────────────────────────
export interface VFXEffectDefinition {
  /** Unique effect name (kebab-case) */
  name: string;
  /** Human-readable label */
  label: string;
  /** Engine this effect belongs to */
  engine: VFXEngine;
  /** Description of what the effect does */
  description: string;
  /** CSS class name generated (without prefix) */
  className: string;
  /** Primary rendering strategy */
  strategy: VFXRenderingStrategy;
  /** Secondary/auxiliary rendering strategies used */
  auxiliaryStrategies?: VFXRenderingStrategy[];
  /** Performance impact: 0 (none) to 3 (heavy GPU) */
  performanceCost: 0 | 1 | 2 | 3;
  /** Whether the effect respects prefers-reduced-motion */
  reducedMotionSafe: boolean;
  /** Accessibility notes */
  a11yNotes?: string;
  /** Required CSS custom properties */
  requiredTokens: string[];
  /** Optional CSS custom properties for customization */
  optionalTokens: string[];
  /** Browser support notes */
  browserSupport: {
    chrome: string;
    firefox: string;
    safari: string;
    edge: string;
  };
  /** Whether the effect is animated */
  animated: boolean;
  /** GPU-accelerated properties used */
  gpuProperties?: string[];
  /** Use cases */
  useCases: string[];
  /** Related effects */
  relatedEffects?: string[];
  /** Category within the engine */
  category?: string;
}

// ─── Engine Registry ─────────────────────────────────────────────
export interface VFXEngineDefinition {
  engine: VFXEngine;
  label: string;
  description: string;
  effectCount: number;
  generatorFunction: string;
  cssLayer: string;
}

// ─── Design Token Architecture ────────────────────────────────────
export interface VFXTokenSpec {
  /** CSS custom property name (with --ferrum- prefix) */
  name: string;
  /** Type of value */
  type: 'color' | 'length' | 'angle' | 'percentage' | 'number' | 'time' | 'easing' | 'url' | 'custom';
  /** Default value */
  defaultValue: string;
  /** Description */
  description: string;
  /** Which engines use this token */
  usedBy: VFXEngine[];
  /** Theme-aware? Responds to light/dark mode */
  themeAware: boolean;
  /** Animatable via @property? */
  animatable: boolean;
  /** Syntax for @property registration */
  propertySyntax?: string;
}

// ─── Configuration ───────────────────────────────────────────────
export interface VFXConfig {
  /** Class name prefix (default: 'fr-') */
  prefix?: string;
  /** CSS variable prefix (default: '--ferrum-') */
  varPrefix?: string;
  /** Minify output (remove comments and whitespace) */
  minify?: boolean;
  /** Only include specific engines */
  engines?: VFXEngineSet;
  /** Exclude specific engines */
  excludeEngines?: VFXEngineSet;
  /** Performance tier filter */
  performanceTier?: VFXPerformanceTier;
  /** Include accessibility fallbacks */
  includeA11y?: boolean;
  /** Custom theme tokens to merge */
  themeTokens?: Record<string, string>;
  /** Whether to include @property declarations for animatable tokens */
  includePropertyDeclarations?: boolean;
  /** Whether to include prefers-reduced-motion media queries */
  includeReducedMotion?: boolean;
  /** CSS layer name (default: 'ferrum.vfx') */
  layerName?: string;
}

// ─── Composition Types ───────────────────────────────────────────
export interface VFXComposition {
  /** Composition name */
  name: string;
  /** Description */
  description: string;
  /** Effects being composed */
  effects: Array<{
    engine: VFXEngine;
    effect: string;
  }>;
  /** CSS class name (without prefix) */
  className: string;
  /** Conflict resolution strategy */
  conflictResolution?: 'cascade' | 'override' | 'merge' | 'isolate';
}

// ─── Original Effect Proposal ────────────────────────────────────
export interface VFXOriginalEffect {
  /** Effect name */
  name: string;
  /** Category/domain inspiration */
  category: string;
  /** Detailed description */
  description: string;
  /** Use cases */
  useCases: string[];
  /** Implementation strategy */
  strategy: VFXRenderingStrategy;
  /** Performance impact */
  performanceCost: 0 | 1 | 2 | 3;
  /** Accessibility considerations */
  a11yNotes: string;
  /** Recommended design tokens */
  recommendedTokens: string[];
  /** Is this a hybrid (CSS + minimal JS) effect? */
  requiresJS?: boolean;
  /** JS description if hybrid */
  jsRequirement?: string;
}

// ─── Browser Compatibility Matrix ────────────────────────────────
export interface VFXBrowserSupport {
  chrome: { version: string; notes: string };
  firefox: { version: string; notes: string };
  safari: { version: string; notes: string };
  edge: { version: string; notes: string };
  mobileChrome: { version: string; notes: string };
  mobileSafari: { version: string; notes: string };
}

// ─── Rendering Pipeline ──────────────────────────────────────────
export interface VFXRenderingPipeline {
  /** Pipeline stage name */
  stage: string;
  /** CSS properties applied at this stage */
  properties: string[];
  /** GPU layer promotion */
  promotesLayer: boolean;
  /** Compositing mode */
  compositeMode?: string;
  /** Will-change hint */
  willChange?: string;
}

// ─── GPU Optimization Info ───────────────────────────────────────
export interface VFXGpuOptimization {
  /** Properties that trigger GPU compositing */
  compositingTriggers: string[];
  /** Properties that cause layout thrashing (avoid) */
  layoutTriggers: string[];
  /** Properties safe for animation */
  animationSafe: string[];
  /** Contain hint recommendations */
  containHint?: 'layout' | 'paint' | 'size' | 'style' | 'inline-size' | 'strict';
}

// ─── Fallback System ─────────────────────────────────────────────
export interface VFXFallback {
  /** Effect this fallback is for */
  effect: string;
  /** @supports query */
  supportsQuery: string;
  /** Fallback CSS class */
  fallbackClass: string;
  /** Fallback description */
  description: string;
}