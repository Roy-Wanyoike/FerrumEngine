<template>
  <component
    :is="tag"
    ref="elRef"
    :class="composedClass"
    :style="composedStyle"
    @animationend="onAnimationEnd"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useReducedMotion } from '../composables/useReducedMotion';

// --- Props ---

const props = withDefaults(
  defineProps<{
    /** The name of the Ferrum animation */
    animation: string;
    /** The HTML tag to render (default: 'div') */
    tag?: string;
    /** Duration in milliseconds */
    duration?: number;
    /** Delay in milliseconds */
    delay?: number;
    /** CSS easing function */
    easing?: string;
    /** Number of iterations ('infinite' for loop) */
    iteration?: number | 'infinite';
    /** Additional CSS classes */
    class?: string;
  }>(),
  {
    tag: 'div',
    duration: undefined,
    delay: undefined,
    easing: undefined,
    iteration: undefined,
    class: '',
  }
);

// --- Emits ---

const emit = defineEmits<{
  (e: 'animation-start'): void;
  (e: 'animation-end'): void;
}>();

// --- State ---

const elRef = ref<HTMLElement | null>(null);
const prefersReducedMotion = useReducedMotion();
const hasAnimated = ref(false);

// --- Animation class mapping ---

const ANIMATION_PREFIX = 'ferrum-anim-';

function getAnimationClass(name: string): string {
  if (name.startsWith(ANIMATION_PREFIX)) return name;
  return `${ANIMATION_PREFIX}${name}`;
}

const animationClass = computed(() => getAnimationClass(props.animation));

// --- Computed styles ---

const composedStyle = computed(() => {
  const style: Record<string, string> = {};

  if (prefersReducedMotion.value) {
    style.opacity = '1';
    style.transform = 'none';
    style.animation = 'none';
    style.transition = 'none';
    return style;
  }

  if (props.duration !== undefined) {
    style.animationDuration = `${props.duration}ms`;
  }
  if (props.delay !== undefined) {
    style.animationDelay = `${props.delay}ms`;
  }
  if (props.easing !== undefined) {
    style.animationTimingFunction = props.easing;
  }
  if (props.iteration !== undefined) {
    style.animationIterationCount =
      props.iteration === 'infinite' ? 'infinite' : String(props.iteration);
  }

  return style;
});

const composedClass = computed(() => {
  if (prefersReducedMotion.value) return props.class || undefined;
  return [props.class, animationClass.value].filter(Boolean).join(' ') || undefined;
});

// --- Lifecycle ---

function onAnimationEnd() {
  hasAnimated.value = true;
  emit('animation-end');
}

onMounted(() => {
  if (!prefersReducedMotion.value) {
    emit('animation-start');
  }
});

// Re-trigger animation when the animation name changes
watch(
  () => props.animation,
  () => {
    hasAnimated.value = false;
    const el = elRef.value;
    if (el && !prefersReducedMotion.value) {
      // Force reflow to restart
      void el.offsetWidth;
      emit('animation-start');
    }
  }
);
</script>