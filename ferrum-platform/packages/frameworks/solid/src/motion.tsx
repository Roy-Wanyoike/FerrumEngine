// ─── Motion Utilities for Solid.js ────────────────────────

import { useReducedMotion } from './context';

/**
 * Get the fr- class names for a motion type.
 */
export function getMotionClasses(type: string): string[] {
  const map: Record<string, string[]> = {
    'fade-in': ['fr-fade-in'],
    'fade-up': ['fr-fade-up'],
    'fade-down': ['fr-fade-down'],
    'slide-up': ['fr-slide-up'],
    'slide-down': ['fr-slide-down'],
    'zoom-in': ['fr-zoom-in'],
    'pulse': ['fr-pulse'],
    'bounce': ['fr-bounce'],
    'shake': ['fr-shake'],
    'spin': ['fr-spin'],
  };
  return map[type] ?? [];
}

/**
 * MotionDiv component — applies fr- motion classes.
 */
export interface MotionDivProps {
  motion?: string;
  class?: string;
  style?: Record<string, string>;
  children?: any;
}

export function MotionDiv(props: MotionDivProps) {
  const reduced = useReducedMotion();
  const classes = props.motion ? getMotionClasses(props.motion) : [];
  const className = [props.class, ...classes].filter(Boolean).join(' ');

  return (
    <div
      class={className}
      style={{
        ...(props.style ?? {}),
        ...(reduced ? { animation: 'none' } : {}),
      }}
    >
      {props.children}
    </div>
  );
}