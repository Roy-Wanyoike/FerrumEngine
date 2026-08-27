import React, { type ReactNode } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export interface ReducedMotionProps {
  /** Content to render normally when animations are enabled */
  children: ReactNode;
  /** Optional fallback content when reduced motion is preferred (defaults to children without animation) */
  fallback?: ReactNode;
}

/**
 * Conditionally disables animations for users who prefer reduced motion.
 *
 * When the user has `prefers-reduced-motion: reduce` enabled, this component
 * renders a static wrapper with animations disabled. Otherwise, children
 * are rendered as-is.
 *
 * @example
 * ```tsx
 * <ReducedMotion>
 *   <MotionDiv animation="bounce">Bouncing text</MotionDiv>
 * </ReducedMotion>
 * ```
 */
export function ReducedMotion({ children, fallback }: ReducedMotionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    if (fallback !== undefined) {
      return <>{fallback}</>;
    }

    // Render children wrapped in a static container that disables animations
    return (
      <div
        style={{
          animation: 'none !important',
          transition: 'none !important',
        }}
        data-ferrum-reduced-motion
      >
        {children}
      </div>
    );
  }

  return <>{children}</>;
}

export default ReducedMotion;