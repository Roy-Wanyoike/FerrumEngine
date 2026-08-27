<template>
  <div
    v-if="prefersReducedMotion"
    style="animation: none !important; transition: none !important;"
    data-ferrum-reduced-motion
  >
    <slot name="fallback">
      <slot />
    </slot>
  </div>
  <slot v-else />
</template>

<script setup lang="ts">
import { useReducedMotion } from '../composables/useReducedMotion';

const prefersReducedMotion = useReducedMotion();
</script>