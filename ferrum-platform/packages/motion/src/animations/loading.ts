import type { AnimationDefinition } from "../types";

export const loadingAnimations: Record<string, AnimationDefinition> = {
  spin: {
    name: "spin",
    className: "fr-spin",
    defaultDuration: "1s",
    defaultEasing: "linear",
    keyframes: `
@keyframes fr-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}`.trim(),
    css: `
.fr-spin {
  animation: fr-spin var(--fr-duration, 1s) var(--fr-easing, linear) var(--fr-delay, 0s) infinite;
}`.trim(),
  },

  "bounce-dots": {
    name: "bounce-dots",
    className: "fr-bounce-dots",
    defaultDuration: "1.4s",
    defaultEasing: "ease-in-out",
    keyframes: `
@keyframes fr-bounce-dots {
  0%, 80%, 100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}`.trim(),
    css: `
.fr-bounce-dots {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.fr-bounce-dots::before,
.fr-bounce-dots::after {
  content: "";
  display: block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: currentColor;
  animation: fr-bounce-dots var(--fr-duration, 1.4s) var(--fr-easing, ease-in-out) var(--fr-delay, 0s) infinite both;
}

.fr-bounce-dots::before {
  animation-delay: -0.32s;
}

.fr-bounce-dots::after {
  animation-delay: 0.32s;
}

.fr-bounce-dots {
  animation: fr-bounce-dots var(--fr-duration, 1.4s) var(--fr-easing, ease-in-out) var(--fr-delay, 0s) infinite both;
  animation-delay: 0s;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: currentColor;
}`.trim(),
  },

  "pulse-bar": {
    name: "pulse-bar",
    className: "fr-pulse-bar",
    defaultDuration: "1.2s",
    defaultEasing: "ease-in-out",
    keyframes: `
@keyframes fr-pulse-bar {
  0% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
  40% {
    transform: scaleY(0.4);
  }
  100% {
    transform: scaleY(0.4);
  }
}`.trim(),
    css: `
.fr-pulse-bar {
  display: inline-flex;
  align-items: flex-end;
  gap: 3px;
  height: 20px;
}

.fr-pulse-bar::before,
.fr-pulse-bar::after {
  content: "";
  display: block;
  width: 4px;
  height: 100%;
  border-radius: 2px;
  background-color: currentColor;
  transform-origin: bottom;
  animation: fr-pulse-bar var(--fr-duration, 1.2s) var(--fr-easing, ease-in-out) var(--fr-delay, 0s) infinite;
}

.fr-pulse-bar::before {
  animation-delay: -0.4s;
}

.fr-pulse-bar::after {
  animation-delay: 0.4s;
}

.fr-pulse-bar {
  background-color: currentColor;
  width: 4px;
  border-radius: 2px;
  transform-origin: bottom;
  animation: fr-pulse-bar var(--fr-duration, 1.2s) var(--fr-easing, ease-in-out) var(--fr-delay, 0s) infinite;
}`.trim(),
  },

  "skeleton-shimmer": {
    name: "skeleton-shimmer",
    className: "fr-skeleton-shimmer",
    defaultDuration: "1.5s",
    defaultEasing: "ease-in-out",
    keyframes: `
@keyframes fr-skeleton-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}`.trim(),
    css: `
.fr-skeleton-shimmer {
  background: linear-gradient(
    90deg,
    var(--ferrum-colors-muted, #f1f5f9) 25%,
    var(--ferrum-colors-muted-foreground, #e2e8f0) 37%,
    var(--ferrum-colors-muted, #f1f5f9) 63%
  );
  background-size: 200% 100%;
  animation: fr-skeleton-shimmer var(--fr-duration, 1.5s) var(--fr-easing, ease-in-out) var(--fr-delay, 0s) infinite;
  border-radius: var(--ferrum-radii-default, 0.375rem);
}`.trim(),
  },

  "progress-indeterminate": {
    name: "progress-indeterminate",
    className: "fr-progress-indeterminate",
    defaultDuration: "1.4s",
    defaultEasing: "ease-in-out",
    keyframes: `
@keyframes fr-progress-indeterminate {
  0% {
    transform: translateX(-100%) scaleX(0.3);
  }
  30% {
    transform: translateX(0%) scaleX(0.5);
  }
  60% {
    transform: translateX(50%) scaleX(0.7);
  }
  80% {
    transform: translateX(100%) scaleX(0.4);
  }
  100% {
    transform: translateX(150%) scaleX(0.3);
  }
}`.trim(),
    css: `
.fr-progress-indeterminate {
  position: relative;
  overflow: hidden;
  background-color: var(--ferrum-colors-muted, #f1f5f9);
  border-radius: 9999px;
  height: 4px;
  width: 100%;
}

.fr-progress-indeterminate::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--ferrum-colors-primary-500, #3b82f6);
  border-radius: 9999px;
  transform-origin: left center;
  animation: fr-progress-indeterminate var(--fr-duration, 1.4s) var(--fr-easing, ease-in-out) var(--fr-delay, 0s) infinite;
}`.trim(),
  },
};