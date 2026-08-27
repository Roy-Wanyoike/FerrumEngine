import React, { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

// --- Types ---

export interface AnimatedProps {
  /** The name of the Ferrum animation to apply */
  animation: string;
  /** The HTML element or component to render as */
  as?: ElementType;
  /** Child elements */
  children?: ReactNode;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Animation delay in milliseconds */
  delay?: number;
  /** CSS easing function */
  easing?: string;
  /** Number of iterations ('infinite' for loop) */
  iteration?: number | 'infinite';
  /** Additional CSS class names */
  className?: string;
  /** Whether to trigger animation when the element enters the viewport */
  triggerOnMount?: boolean;
  /** Callback when animation starts */
  onAnimationStart?: () => void;
  /** Callback when animation ends */
  onAnimationEnd?: () => void;
}

// --- Animation class map ---

const ANIMATION_PREFIX = 'ferrum-anim-';

function getAnimationClass(animationName: string): string {
  if (animationName.startsWith(ANIMATION_PREFIX)) {
    return animationName;
  }
  return `${ANIMATION_PREFIX}${animationName}`;
}

/**
 * Generic wrapper component that applies a Ferrum animation.
 *
 * @example
 * ```tsx
 * <Animated animation="fade-in" duration={500}>
 *   <p>Animated content</p>
 * </Animated>
 *
 * <Animated animation="slide-up" as="section" easing="ease-out">
 *   <h2>Sliding heading</h2>
 * </Animated>
 * ```
 */
export function Animated({
  animation,
  as: Component = 'div',
  children,
  duration,
  delay,
  easing,
  iteration,
  className,
  triggerOnMount = true,
  onAnimationStart,
  onAnimationEnd,
  ...rest
}: AnimatedProps & Record<string, unknown>) {
  const elementRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [hasAnimated, setHasAnimated] = useState(false);

  // Build the animation class and inline styles
  const animationClass = getAnimationClass(animation);

  const animationStyle: React.CSSProperties = {};
  if (duration !== undefined) {
    animationStyle.animationDuration = `${duration}ms`;
  }
  if (delay !== undefined) {
    animationStyle.animationDelay = `${delay}ms`;
  }
  if (easing !== undefined) {
    animationStyle.animationTimingFunction = easing;
  }
  if (iteration !== undefined) {
    animationStyle.animationIterationCount =
      iteration === 'infinite' ? 'infinite' : String(iteration);
  }

  // Handle reduced motion
  const shouldAnimate = !prefersReducedMotion && triggerOnMount;

  // Apply animation on mount
  useEffect(() => {
    if (prefersReducedMotion) {
      // Ensure element is visible with no animation
      const el = elementRef.current;
      if (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      }
      return;
    }

    if (triggerOnMount && !hasAnimated) {
      const el = elementRef.current;
      if (el) {
        // Small delay to ensure the class application triggers the animation
        const frame = requestAnimationFrame(() => {
          onAnimationStart?.();
        });
        return () => cancelAnimationFrame(frame);
      }
    }
  }, [triggerOnMount, hasAnimated, prefersReducedMotion, onAnimationStart]);

  const handleAnimationEnd = () => {
    setHasAnimated(true);
    onAnimationEnd?.();
  };

  const combinedClassName = [
    className,
    shouldAnimate ? animationClass : undefined,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component
      ref={elementRef}
      className={combinedClassName || undefined}
      style={{
        ...animationStyle,
        ...(prefersReducedMotion ? { opacity: 1, transform: 'none' } : {}),
      }}
      onAnimationEnd={shouldAnimate ? handleAnimationEnd : undefined}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Animated;