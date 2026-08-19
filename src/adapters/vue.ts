// Ferrum — Vue Adapter
// Lightweight composables for Ferrum Runtime + Motion
// NOTE: Vue is not a project dependency; types are self-contained.

import { FerrumRuntime } from '@/lib/ferrum-runtime';
import { spring, type SpringConfig } from '@/lib/ferrum-motion';

/** Minimal reactive ref type (matches Vue 3 Ref<T> shape) */
export interface VueRef<T> {
  value: T;
}

let runtimeSingleton: FerrumRuntime | null = null;
function getRuntime(): FerrumRuntime {
  if (!runtimeSingleton) runtimeSingleton = new FerrumRuntime();
  return runtimeSingleton;
}

/**
 * Vue composable: apply a Ferrum effect to an element.
 * Usage: const { ref, isApplied, mount, unmount } = useFerrumEffect('f-btn-glow');
 *   onMounted(() => mount());
 *   onUnmounted(() => unmount());
 */
export function useFerrumEffect(effectClass: string): {
  ref: VueRef<HTMLElement | null>;
  isApplied: VueRef<boolean>;
  mount: () => void;
  unmount: () => void;
} {
  const elRef: VueRef<HTMLElement | null> = { value: null };
  const isApplied: VueRef<boolean> = { value: false };
  const rt = getRuntime();

  function mount(): void {
    const el = elRef.value;
    if (!el) return;
    rt.apply(el, effectClass);
    isApplied.value = true;
  }

  function unmount(): void {
    const el = elRef.value;
    if (!el) return;
    rt.remove(el, effectClass);
    isApplied.value = false;
  }

  return { ref: elRef, isApplied, mount, unmount };
}

/**
 * Vue composable: spring-animated value.
 * Usage: const { value, animate, stop } = useFerrumSpring({ stiffness: 200 });
 */
export function useFerrumSpring(config: SpringConfig): {
  value: VueRef<number>;
  animate: (target: number) => void;
  stop: () => void;
} {
  const ctrl = spring(0, config);
  const value: VueRef<number> = { value: 0 };
  let polling = false;

  return {
    value,
    animate(target: number): void {
      ctrl.to(target);
      if (!polling) {
        polling = true;
        const poll = (): void => {
          value.value = ctrl.get();
          if (Math.abs(ctrl.get() - target) > 0.01) {
            requestAnimationFrame(poll);
          } else {
            polling = false;
          }
        };
        requestAnimationFrame(poll);
      }
    },
    stop(): void {
      ctrl.stop();
      polling = false;
    },
  };
}
