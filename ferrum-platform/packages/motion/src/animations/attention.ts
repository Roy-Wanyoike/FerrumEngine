import type { AnimationDefinition } from "../types";

export const attentionAnimations: Record<string, AnimationDefinition> = {
  pulse: {
    name: "pulse",
    className: "fr-pulse",
    defaultDuration: "2s",
    defaultEasing: "ease-in-out",
    keyframes: `
@keyframes fr-pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}`.trim(),
    css: `
.fr-pulse {
  animation: fr-pulse var(--fr-duration, 2s) var(--fr-easing, ease-in-out) var(--fr-delay, 0s) infinite;
}`.trim(),
  },

  bounce: {
    name: "bounce",
    className: "fr-bounce",
    defaultDuration: "1s",
    defaultEasing: "ease",
    keyframes: `
@keyframes fr-bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  40%, 43% {
    transform: translateY(-20px);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  }
  70% {
    transform: translateY(-10px);
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
  }
  90% {
    transform: translateY(-4px);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
}`.trim(),
    css: `
.fr-bounce {
  animation: fr-bounce var(--fr-duration, 1s) var(--fr-easing, ease) var(--fr-delay, 0s) infinite;
  transform-origin: center bottom;
}`.trim(),
  },

  shake: {
    name: "shake",
    className: "fr-shake",
    defaultDuration: "0.6s",
    defaultEasing: "ease-in-out",
    keyframes: `
@keyframes fr-shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-6px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(6px);
  }
}`.trim(),
    css: `
.fr-shake {
  animation: fr-shake var(--fr-duration, 0.6s) var(--fr-easing, ease-in-out) var(--fr-delay, 0s) both;
}`.trim(),
  },

  swing: {
    name: "swing",
    className: "fr-swing",
    defaultDuration: "1s",
    defaultEasing: "ease-in-out",
    keyframes: `
@keyframes fr-swing {
  20% {
    transform: rotate(15deg);
  }
  40% {
    transform: rotate(-10deg);
  }
  60% {
    transform: rotate(5deg);
  }
  80% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}`.trim(),
    css: `
.fr-swing {
  animation: fr-swing var(--fr-duration, 1s) var(--fr-easing, ease-in-out) var(--fr-delay, 0s) both;
  transform-origin: top center;
}`.trim(),
  },

  tada: {
    name: "tada",
    className: "fr-tada",
    defaultDuration: "1s",
    defaultEasing: "ease-in-out",
    keyframes: `
@keyframes fr-tada {
  0% {
    transform: scale(1) rotate(0deg);
  }
  10%, 20% {
    transform: scale(0.9) rotate(-3deg);
  }
  30%, 50%, 70%, 90% {
    transform: scale(1.1) rotate(3deg);
  }
  40%, 60%, 80% {
    transform: scale(1.1) rotate(-3deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}`.trim(),
    css: `
.fr-tada {
  animation: fr-tada var(--fr-duration, 1s) var(--fr-easing, ease-in-out) var(--fr-delay, 0s) both;
}`.trim(),
  },

  wobble: {
    name: "wobble",
    className: "fr-wobble",
    defaultDuration: "0.8s",
    defaultEasing: "ease-in-out",
    keyframes: `
@keyframes fr-wobble {
  0% {
    transform: translateX(0%) rotate(0deg);
  }
  15% {
    transform: translateX(-25%) rotate(-5deg);
  }
  30% {
    transform: translateX(20%) rotate(3deg);
  }
  45% {
    transform: translateX(-15%) rotate(-3deg);
  }
  60% {
    transform: translateX(10%) rotate(2deg);
  }
  75% {
    transform: translateX(-5%) rotate(-1deg);
  }
  100% {
    transform: translateX(0%) rotate(0deg);
  }
}`.trim(),
    css: `
.fr-wobble {
  animation: fr-wobble var(--fr-duration, 0.8s) var(--fr-easing, ease-in-out) var(--fr-delay, 0s) both;
}`.trim(),
  },

  heartbeat: {
    name: "heartbeat",
    className: "fr-heartbeat",
    defaultDuration: "1.3s",
    defaultEasing: "ease-in-out",
    keyframes: `
@keyframes fr-heartbeat {
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.15);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.15);
  }
  70% {
    transform: scale(1);
  }
}`.trim(),
    css: `
.fr-heartbeat {
  animation: fr-heartbeat var(--fr-duration, 1.3s) var(--fr-easing, ease-in-out) var(--fr-delay, 0s) infinite;
}`.trim(),
  },

  flash: {
    name: "flash",
    className: "fr-flash",
    defaultDuration: "1s",
    defaultEasing: "ease-in-out",
    keyframes: `
@keyframes fr-flash {
  0%, 50%, 100% {
    opacity: 1;
  }
  25%, 75% {
    opacity: 0;
  }
}`.trim(),
    css: `
.fr-flash {
  animation: fr-flash var(--fr-duration, 1s) var(--fr-easing, ease-in-out) var(--fr-delay, 0s) infinite;
}`.trim(),
  },
};