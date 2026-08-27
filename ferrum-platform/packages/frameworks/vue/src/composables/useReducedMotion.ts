import { ref, onMounted, onUnmounted, type Ref } from 'vue';

/**
 * Composable that returns whether the user prefers reduced motion.
 *
 * SSR-safe: defaults to `false` on the server.
 *
 * @example
 * ```vue
 * <script setup>
 * const prefersReducedMotion = useReducedMotion();
 * </script>
 * <template>
 *   <div :style="prefersReducedMotion ? { animation: 'none' } : {}">
 *     Content
 *   </div>
 * </template>
 * ```
 */
export function useReducedMotion(): Ref<boolean> {
  const prefersReducedMotion = ref(false);

  let mql: MediaQueryList | null = null;

  onMounted(() => {
    if (typeof window === 'undefined') return;

    mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.value = mql.matches;

    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.value = e.matches;
    };

    mql.addEventListener('change', handler);
  });

  onUnmounted(() => {
    if (mql) {
      mql.removeEventListener('change', () => {});
    }
  });

  return prefersReducedMotion;
}