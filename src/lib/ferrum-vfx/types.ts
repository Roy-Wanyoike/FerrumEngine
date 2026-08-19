// Ferrum VFX — Type Definitions

/** Configuration for DOM-based particle system */
export interface ParticleConfig {
  count?: number;
  size?: { min: number; max: number };
  color?: string;
  spread?: number;
  duration?: number;
  easing?: string;
}

/** Options for glass morphism effect */
export interface GlassOptions {
  blur?: number;
  opacity?: number;
  border?: string;
  shadow?: string;
  background?: string;
  saturate?: number;
}

/** Options for animated gradients */
export interface GradientOptions {
  angle?: number;
  duration?: number;
  easing?: string;
}

/** Configuration for mesh gradient background */
export interface MeshGradientConfig {
  colors?: string[];
  blobs?: number;
  size?: number;
  blur?: number;
  opacity?: number;
  animate?: boolean;
  speed?: number;
}

/** Options for cursor glow effect */
export interface CursorGlowOptions {
  color?: string;
  size?: number;
  blur?: number;
  opacity?: number;
}

/** Options for glitch text effect */
export interface GlitchOptions {
  intensity?: number;
  speed?: number;
  colors?: string[];
}

/** Options for text reveal animation */
export interface RevealOptions {
  delay?: number;
  stagger?: number;
  duration?: number;
  easing?: string;
}

/** Return type for particle controller */
export interface ParticleController {
  start: () => void;
  stop: () => void;
  destroy: () => void;
  getCount: () => number;
}

/** Cleanup function returned by all VFX utilities */
export type VFXCleanup = () => void;
