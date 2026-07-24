import type { AnimationDefinition } from "../types";

export const exitAnimations: Record<string, AnimationDefinition> = {
  "fade-out": {
    name: "fade-out",
    className: "fr-fade-out",
    defaultDuration: "0.4s",
    defaultEasing: "ease-in",
    keyframes: `
@keyframes fr-fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}`.trim(),
    css: `
.fr-fade-out {
  animation: fr-fade-out var(--fr-duration, 0.4s) var(--fr-easing, ease-in) var(--fr-delay, 0s) both;
}`.trim(),
  },

  "fade-up-out": {
    name: "fade-up-out",
    className: "fr-fade-up-out",
    defaultDuration: "0.4s",
    defaultEasing: "ease-in",
    keyframes: `
@keyframes fr-fade-up-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}`.trim(),
    css: `
.fr-fade-up-out {
  animation: fr-fade-up-out var(--fr-duration, 0.4s) var(--fr-easing, ease-in) var(--fr-delay, 0s) both;
}`.trim(),
  },

  "fade-down-out": {
    name: "fade-down-out",
    className: "fr-fade-down-out",
    defaultDuration: "0.4s",
    defaultEasing: "ease-in",
    keyframes: `
@keyframes fr-fade-down-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
}`.trim(),
    css: `
.fr-fade-down-out {
  animation: fr-fade-down-out var(--fr-duration, 0.4s) var(--fr-easing, ease-in) var(--fr-delay, 0s) both;
}`.trim(),
  },

  "zoom-out": {
    name: "zoom-out",
    className: "fr-zoom-out",
    defaultDuration: "0.3s",
    defaultEasing: "ease-in",
    keyframes: `
@keyframes fr-zoom-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
}`.trim(),
    css: `
.fr-zoom-out {
  animation: fr-zoom-out var(--fr-duration, 0.3s) var(--fr-easing, ease-in) var(--fr-delay, 0s) both;
}`.trim(),
  },

  "slide-away": {
    name: "slide-away",
    className: "fr-slide-away",
    defaultDuration: "0.5s",
    defaultEasing: "cubic-bezier(0.4, 0, 1, 1)",
    keyframes: `
@keyframes fr-slide-away {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}`.trim(),
    css: `
.fr-slide-away {
  animation: fr-slide-away var(--fr-duration, 0.5s) var(--fr-easing, cubic-bezier(0.4, 0, 1, 1)) var(--fr-delay, 0s) both;
}`.trim(),
  },

  "collapse": {
    name: "collapse",
    className: "fr-collapse",
    defaultDuration: "0.3s",
    defaultEasing: "ease-in",
    keyframes: `
@keyframes fr-collapse {
  from {
    opacity: 1;
    max-height: 500px;
  }
  to {
    opacity: 0;
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 0;
    margin-bottom: 0;
  }
}`.trim(),
    css: `
.fr-collapse {
  overflow: hidden;
  animation: fr-collapse var(--fr-duration, 0.3s) var(--fr-easing, ease-in) var(--fr-delay, 0s) both;
}`.trim(),
  },
};