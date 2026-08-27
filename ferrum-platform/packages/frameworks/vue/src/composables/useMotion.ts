import { ref, onMounted, onUnmounted, type Ref } from 'vue';

// --- Types ---

export interface UseMotionOptions {
  duration?: number;
  delay?: number;
  easing?: string;
  iteration?: number | 'infinite';
  triggerOnMount?: boolean;
}

export interface UseMotionReturn {
  elementRef: Ref<HTMLElement | null>;
  isAnimating: Ref<boolean>;
  replay: () => void;
  stop: () => void;
}

// --- Animation class map ---

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
 * Composable that applies Ferrum animations to an element.
 *
 * @example
 * ```vue
 * <script setup>
 * const { elementRef, isAnimating, replay } = useMotion('fade-in', { duration: 500 });
 * </script>
 * <template>
 *   <div ref="elementRef">Animated content</div>
 * </template>
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

  const elementRef = ref<HTMLElement | null>(null) as Ref<HTMLElement | null>;
  const isAnimating = ref(false);
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let prefersReducedMotion = false;

  const applyAnimation = () => {
    const el = elementRef.value;
    if (!el) return;

    if (prefersReducedMotion) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      return;
    }

    const className = ANIMATION_MAP[animationName] || animationName;

    // Remove existing animation classes
    for (const cls of Object.values(ANIMATION_MAP)) {
      el.classList.remove(cls);
    }
    el.classList.remove(animationName);

    // Clear inline animation styles
    el.style.animationDuration = '';
    el.style.animationDelay = '';
    el.style.animationTimingFunction = '';
    el.style.animationIterationCount = '';

    // Force reflow
    void el.offsetWidth;

    // Apply animation
    el.classList.add(className);

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

    isAnimating.value = true;

    if (iteration === 'infinite') return;

    const totalDuration = (duration ?? 250) + (delay ?? 0);
    const iterationCount = (iteration ?? 1);

    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      isAnimating.value = false;
    }, totalDuration * iterationCount + 50);
  };

  const stop = () => {
    const el = elementRef.value;
    if (!el) return;

    for (const cls of Object.values(ANIMATION_MAP)) {
      el.classList.remove(cls);
    }
    el.classList.remove(animationName);

    el.style.animationDuration = '';
    el.style.animationDelay = '';
    el.style.animationTimingFunction = '';
    el.style.animationIterationCount = '';

    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    isAnimating.value = false;
  };

  const replay = () => {
    stop();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        applyAnimation();
      });
    });
  };

  onMounted(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion = mql.matches;

    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mql.addEventListener('change', handler);

    if (triggerOnMount) {
      applyAnimation();
    }
  });

  onUnmounted(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });

  return { elementRef, isAnimating, replay, stop };
}