import type { AnimationDefinition } from "../types";

export const entranceAnimations: Record<string, AnimationDefinition> = {
  "fade-in": {
    name: "fade-in",
    className: "fr-fade-in",
    defaultDuration: "0.5s",
    defaultEasing: "ease",
    keyframes: `
@keyframes fr-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}`.trim(),
    css: `
.fr-fade-in {
  animation: fr-fade-in var(--fr-duration, 0.5s) var(--fr-easing, ease) var(--fr-delay, 0s) both;
}`.trim(),
  },

  "fade-up": {
    name: "fade-up",
    className: "fr-fade-up",
    defaultDuration: "0.5s",
    defaultEasing: "ease-out",
    keyframes: `
@keyframes fr-fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`.trim(),
    css: `
.fr-fade-up {
  animation: fr-fade-up var(--fr-duration, 0.5s) var(--fr-easing, ease-out) var(--fr-delay, 0s) both;
}`.trim(),
  },

  "fade-down": {
    name: "fade-down",
    className: "fr-fade-down",
    defaultDuration: "0.5s",
    defaultEasing: "ease-out",
    keyframes: `
@keyframes fr-fade-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`.trim(),
    css: `
.fr-fade-down {
  animation: fr-fade-down var(--fr-duration, 0.5s) var(--fr-easing, ease-out) var(--fr-delay, 0s) both;
}`.trim(),
  },

  "fade-left": {
    name: "fade-left",
    className: "fr-fade-left",
    defaultDuration: "0.5s",
    defaultEasing: "ease-out",
    keyframes: `
@keyframes fr-fade-left {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}`.trim(),
    css: `
.fr-fade-left {
  animation: fr-fade-left var(--fr-duration, 0.5s) var(--fr-easing, ease-out) var(--fr-delay, 0s) both;
}`.trim(),
  },

  "fade-right": {
    name: "fade-right",
    className: "fr-fade-right",
    defaultDuration: "0.5s",
    defaultEasing: "ease-out",
    keyframes: `
@keyframes fr-fade-right {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}`.trim(),
    css: `
.fr-fade-right {
  animation: fr-fade-right var(--fr-duration, 0.5s) var(--fr-easing, ease-out) var(--fr-delay, 0s) both;
}`.trim(),
  },

  "zoom-in": {
    name: "zoom-in",
    className: "fr-zoom-in",
    defaultDuration: "0.4s",
    defaultEasing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    keyframes: `
@keyframes fr-zoom-in {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}`.trim(),
    css: `
.fr-zoom-in {
  animation: fr-zoom-in var(--fr-duration, 0.4s) var(--fr-easing, cubic-bezier(0.34, 1.56, 0.64, 1)) var(--fr-delay, 0s) both;
}`.trim(),
  },

  "zoom-out": {
    name: "zoom-out",
    className: "fr-zoom-out",
    defaultDuration: "0.4s",
    defaultEasing: "ease-out",
    keyframes: `
@keyframes fr-zoom-out {
  from {
    opacity: 0;
    transform: scale(1.2);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}`.trim(),
    css: `
.fr-zoom-out {
  animation: fr-zoom-out var(--fr-duration, 0.4s) var(--fr-easing, ease-out) var(--fr-delay, 0s) both;
}`.trim(),
  },

  "slide-up": {
    name: "slide-up",
    className: "fr-slide-up",
    defaultDuration: "0.5s",
    defaultEasing: "cubic-bezier(0.16, 1, 0.3, 1)",
    keyframes: `
@keyframes fr-slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}`.trim(),
    css: `
.fr-slide-up {
  animation: fr-slide-up var(--fr-duration, 0.5s) var(--fr-easing, cubic-bezier(0.16, 1, 0.3, 1)) var(--fr-delay, 0s) both;
}`.trim(),
  },

  "slide-down": {
    name: "slide-down",
    className: "fr-slide-down",
    defaultDuration: "0.5s",
    defaultEasing: "cubic-bezier(0.16, 1, 0.3, 1)",
    keyframes: `
@keyframes fr-slide-down {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}`.trim(),
    css: `
.fr-slide-down {
  animation: fr-slide-down var(--fr-duration, 0.5s) var(--fr-easing, cubic-bezier(0.16, 1, 0.3, 1)) var(--fr-delay, 0s) both;
}`.trim(),
  },

  "bounce-in": {
    name: "bounce-in",
    className: "fr-bounce-in",
    defaultDuration: "0.6s",
    defaultEasing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    keyframes: `
@keyframes fr-bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}`.trim(),
    css: `
.fr-bounce-in {
  animation: fr-bounce-in var(--fr-duration, 0.6s) var(--fr-easing, cubic-bezier(0.34, 1.56, 0.64, 1)) var(--fr-delay, 0s) both;
}`.trim(),
  },
};