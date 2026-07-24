import { useCallback, useEffect, useRef, useState } from 'react';

// --- Types ---

export interface UseMotionOptions {
  /** Animation duration in milliseconds */
  duration?: number;
  /** Animation delay in milliseconds */
  delay?: number;
  /** CSS easing function */
  easing?: string;
  /** Number of iterations (Infinity for infinite loop) */
  iteration?: number | 'infinite';
  /** Whether to trigger the animation on mount */
  triggerOnMount?: boolean;
}

export interface UseMotionReturn {
  /** Ref to attach to the animated element */
  ref: React.RefObject<HTMLElement | null>;
  /** Whether the animation is currently playing */
  isAnimating: boolean;
  /** Function to replay the animation */
  replay: () => void;
  /** Function to stop the animation */
  stop: () => void;
}

// --- Motion class names from @ferrum/motion ---

const ANIMATION_MAP: Record<string, string> = {
  'fade-in': 'ferrum-anim-fade-in',
  'fade-out': 'ferrum-anim-fade-out',
  'slide-up': 'ferrum-anim-slide-up',
  'slide-down': 'ferrum-anim-slide-down',
  'slide-left': 'ferrum-anim-slide-left',
  'slide-right': 'ferrum-anim-slide-right',
  'scale-up': 'ferrum-anim-scale-up',
  'scale-down': 'ferrum-anim-scale-down',
  'bounce': 'ferrum-anim-bounce',
  'pulse': 'ferrum-anim-pulse',
  'shake': 'ferrum-anim-shake',
  'spin': 'ferrum-anim-spin',
  'fade-in-up': 'ferrum-anim-fade-in-up',
  'fade-in-down': 'ferrum-anim-fade-in-down',
  'fade-in-left': 'ferrum-anim-fade-in-left',
  'fade-in-right': 'ferrum-anim-fade-in-right',
  'zoom-in': 'ferrum-anim-zoom-in',
  'zoom-out': 'ferrum-anim-zoom-out',
  'flip': 'ferrum-anim-flip',
  'rotate': 'ferrum-anim-rotate',
  'swing': 'ferrum-anim-swing',
  'rubber-band': 'ferrum-anim-rubber-band',
  'jello': 'ferrum-anim-jello',
  'heart-beat': 'ferrum-anim-heart-beat',
  'wobble': 'ferrum-anim-wobble',
};

/**
 * Hook to apply Ferrum animations to an element.
 *
 * @param animationName - The name of the animation from the motion package
 * @param options - Configuration options for the animation
 * @returns An object containing a ref, animation state, and control functions
 *
 * @example
 * ```tsx
 * const { ref, isAnimating, replay } = useMotion('fade-in', { duration: 500 });
 * return <div ref={ref}>Animated content</div>;
 * ```
 */
export function useMotion(
  animationName: string,
  options: UseMotionOptions = {}
): UseMotionReturn {
  const {
    duration,
    delay,
    easing,
    iteration,
    triggerOnMount = true,
  } = options;

  const ref = useRef<HTMLElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const reducedMotion = useReducedMotionRef();
  const animationFrameRef = useRef<number | null>(null);

  const applyAnimation = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion preference
    if (reducedMotion.current) {
      // Make the element visible immediately without animation
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    // Get the class name
    const className = ANIMATION_MAP[animationName] || animationName;

    // Remove any existing animation classes
    el.classList.remove(...Object.values(ANIMATION_MAP));
    el.classList.remove(animationName);

    // Clear any existing inline animation styles to reset
    el.style.animationDuration = '';
    el.style.animationDelay = '';
    el.style.animationTimingFunction = '';
    el.style.animationIterationCount = '';

    // Force reflow to restart animation
    void el.offsetWidth;

    // Apply animation class
    el.classList.add(className);

    // Apply inline styles for customization
    if (duration !== undefined) {
      el.style.animationDuration = `${duration}ms`;
    }
    if (delay !== undefined) {
      el.style.animationDelay = `${delay}ms`;
    }
    if (easing !== undefined) {
      el.style.animationTimingFunction = easing;
    }
    if (iteration !== undefined) {
      el.style.animationIterationCount = iteration === 'infinite' ? 'infinite' : String(iteration);
    }

    setIsAnimating(true);

    // Determine the animation end state
    const iterationCount = iteration === 'infinite' ? Infinity : (iteration ?? 1);
    const totalDuration = (duration ?? 250) + (delay ?? 0);

    // For infinite animations, we just stay in animating state
    if (iteration === 'infinite') {
      return;
    }

    // Set a timeout to mark animation as complete
    if (animationFrameRef.current) {
      clearTimeout(animationFrameRef.current);
    }
    animationFrameRef.current = window.setTimeout(() => {
      setIsAnimating(false);
    }, totalDuration * iterationCount + 50);
  }, [animationName, duration, delay, easing, iteration, reducedMotion]);

  const stop = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    // Remove all animation classes
    el.classList.remove(...Object.values(ANIMATION_MAP));
    el.classList.remove(animationName);

    // Clear inline animation styles
    el.style.animationDuration = '';
    el.style.animationDelay = '';
    el.style.animationTimingFunction = '';
    el.style.animationIterationCount = '';

    if (animationFrameRef.current) {
      clearTimeout(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    setIsAnimating(false);
  }, [animationName]);

  const replay = useCallback(() => {
    stop();
    // Use requestAnimationFrame to ensure the browser has time to process the stop
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        applyAnimation();
      });
    });
  }, [stop, applyAnimation]);

  // Trigger on mount if requested
  useEffect(() => {
    if (triggerOnMount) {
      applyAnimation();
    }

    return () => {
      if (animationFrameRef.current) {
        clearTimeout(animationFrameRef.current);
      }
    };
  }, [triggerOnMount, applyAnimation]);

  return { ref, isAnimating, replay, stop };
}

// --- Internal: reduced motion ref ---

function useReducedMotionRef() {
  const ref = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    ref.current = mql.matches;

    const handler = (e: MediaQueryListEvent) => {
      ref.current = e.matches;
    };

    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return ref;
}