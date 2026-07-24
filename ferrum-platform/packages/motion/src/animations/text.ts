import type { AnimationDefinition } from "../types";

export const textAnimations: Record<string, AnimationDefinition> = {
  typewriter: {
    name: "typewriter",
    className: "fr-typewriter",
    defaultDuration: "3s",
    defaultEasing: "steps(20, end)",
    keyframes: `
@keyframes fr-typewriter {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes fr-blink-caret {
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: currentColor;
  }
}`.trim(),
    css: `
.fr-typewriter {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid currentColor;
  width: 0;
  animation:
    fr-typewriter var(--fr-duration, 3s) steps(20, end) var(--fr-delay, 0s) forwards,
    fr-blink-caret 0.75s step-end infinite;
}`.trim(),
  },

  wave: {
    name: "wave",
    className: "fr-wave",
    defaultDuration: "1s",
    defaultEasing: "ease-in-out",
    keyframes: `
@keyframes fr-wave {
  0%, 100% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-8px);
  }
  75% {
    transform: translateY(4px);
  }
}`.trim(),
    css: `
.fr-wave {
  display: inline-block;
  animation: fr-wave var(--fr-duration, 1s) var(--fr-easing, ease-in-out) var(--fr-delay, 0s) infinite;
}`.trim(),
  },

  scramble: {
    name: "scramble",
    className: "fr-scramble",
    defaultDuration: "0.1s",
    defaultEasing: "steps(2, end)",
    keyframes: `
@keyframes fr-scramble {
  0% {
    opacity: 1;
    filter: blur(0px);
    transform: skewX(0deg);
  }
  25% {
    filter: blur(1px);
    transform: skewX(-2deg);
  }
  50% {
    filter: blur(0px);
    transform: skewX(1deg);
  }
  75% {
    filter: blur(0.5px);
    transform: skewX(-0.5deg);
  }
  100% {
    opacity: 1;
    filter: blur(0px);
    transform: skewX(0deg);
  }
}`.trim(),
    css: `
.fr-scramble {
  animation: fr-scramble var(--fr-duration, 0.1s) var(--fr-easing, steps(2, end)) var(--fr-delay, 0s) 3 both;
}`.trim(),
  },

  "fade-up-stagger": {
    name: "fade-up-stagger",
    className: "fr-fade-up-stagger",
    defaultDuration: "0.5s",
    defaultEasing: "ease-out",
    keyframes: `
@keyframes fr-fade-up-stagger {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`.trim(),
    css: `
.fr-fade-up-stagger {
  opacity: 0;
  animation: fr-fade-up-stagger var(--fr-duration, 0.5s) var(--fr-easing, ease-out) var(--fr-delay, 0s) both;
}

.fr-fade-up-stagger:nth-child(1) { --fr-delay: 0s; }
.fr-fade-up-stagger:nth-child(2) { --fr-delay: 0.1s; }
.fr-fade-up-stagger:nth-child(3) { --fr-delay: 0.2s; }
.fr-fade-up-stagger:nth-child(4) { --fr-delay: 0.3s; }
.fr-fade-up-stagger:nth-child(5) { --fr-delay: 0.4s; }
.fr-fade-up-stagger:nth-child(6) { --fr-delay: 0.5s; }
.fr-fade-up-stagger:nth-child(7) { --fr-delay: 0.6s; }
.fr-fade-up-stagger:nth-child(8) { --fr-delay: 0.7s; }
.fr-fade-up-stagger:nth-child(9) { --fr-delay: 0.8s; }
.fr-fade-up-stagger:nth-child(10) { --fr-delay: 0.9s; }`.trim(),
  },

  "neon-flicker": {
    name: "neon-flicker",
    className: "fr-neon-flicker",
    defaultDuration: "1.5s",
    defaultEasing: "ease-in-out",
    keyframes: `
@keyframes fr-neon-flicker {
  0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
    opacity: 1;
    text-shadow:
      0 0 4px var(--ferrum-colors-primary-400, rgba(59, 130, 246, 0.6)),
      0 0 11px var(--ferrum-colors-primary-400, rgba(59, 130, 246, 0.4)),
      0 0 19px var(--ferrum-colors-primary-400, rgba(59, 130, 246, 0.3)),
      0 0 40px var(--ferrum-colors-primary-500, rgba(59, 130, 246, 0.2)),
      0 0 80px var(--ferrum-colors-primary-500, rgba(59, 130, 246, 0.15)),
      0 0 90px var(--ferrum-colors-primary-500, rgba(59, 130, 246, 0.1));
  }
  20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
    opacity: 0.6;
    text-shadow: none;
  }
}`.trim(),
    css: `
.fr-neon-flicker {
  animation: fr-neon-flicker var(--fr-duration, 1.5s) var(--fr-easing, ease-in-out) var(--fr-delay, 0s) infinite;
}`.trim(),
  },
};