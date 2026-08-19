// Ferrum Runtime — Type Definitions

export interface FerrumRuntimeOptions {
  /** Default root margin for viewport observers (CSS margin syntax) */
  rootMargin?: string;
  /** Intersection threshold(s) for viewport trigger */
  threshold?: number | number[];
  /** Whether to respect prefers-reduced-motion globally */
  respectReducedMotion?: boolean;
}

export interface ApplyOptions {
  /** Delay before applying the class (ms) */
  delay?: number;
  /** Trigger mode */
  trigger?: 'immediate' | 'viewport' | 'hover';
  /** Whether to skip reduced-motion check for this specific apply */
  forceApply?: boolean;
}

export interface EffectInstance {
  element: HTMLElement;
  effectClass: string;
  applied: boolean;
  trigger: 'immediate' | 'viewport' | 'hover';
  delayTimer?: ReturnType<typeof setTimeout>;
  hoverEnterHandler?: () => void;
  hoverLeaveHandler?: () => void;
}

export interface ViewportEntry {
  element: HTMLElement;
  effectClass: string;
  observer?: IntersectionObserver;
}

export type ReducedMotionHandler = (reduced: boolean) => void;
