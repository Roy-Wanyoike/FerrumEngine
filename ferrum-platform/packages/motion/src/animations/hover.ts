import type { AnimationDefinition } from "../types";

export const hoverAnimations: Record<string, AnimationDefinition> = {
  lift: {
    name: "lift",
    className: "fr-lift",
    defaultDuration: "0.25s",
    defaultEasing: "ease-out",
    keyframes: "",
    css: `
.fr-lift {
  transition: transform var(--fr-duration, 0.25s) var(--fr-easing, ease-out), box-shadow var(--fr-duration, 0.25s) var(--fr-easing, ease-out);
}

.fr-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--ferrum-elevation-4, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1));
}`.trim(),
  },

  glow: {
    name: "glow",
    className: "fr-glow",
    defaultDuration: "0.3s",
    defaultEasing: "ease-out",
    keyframes: "",
    css: `
.fr-glow {
  transition: box-shadow var(--fr-duration, 0.3s) var(--fr-easing, ease-out);
}

.fr-glow:hover {
  box-shadow: 0 0 15px 3px var(--ferrum-colors-primary-400, rgba(59, 130, 246, 0.4)),
              0 0 25px 5px var(--ferrum-colors-primary-300, rgba(59, 130, 246, 0.15));
}`.trim(),
  },

  scale: {
    name: "scale",
    className: "fr-scale",
    defaultDuration: "0.2s",
    defaultEasing: "ease-out",
    keyframes: "",
    css: `
.fr-scale {
  transition: transform var(--fr-duration, 0.2s) var(--fr-easing, ease-out);
}

.fr-scale:hover {
  transform: scale(1.05);
}`.trim(),
  },

  "shadow-grow": {
    name: "shadow-grow",
    className: "fr-shadow-grow",
    defaultDuration: "0.3s",
    defaultEasing: "ease-out",
    keyframes: "",
    css: `
.fr-shadow-grow {
  box-shadow: var(--ferrum-elevation-1, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
  transition: box-shadow var(--fr-duration, 0.3s) var(--fr-easing, ease-out);
}

.fr-shadow-grow:hover {
  box-shadow: var(--ferrum-elevation-6, 0 25px 50px -12px rgba(0, 0, 0, 0.25));
}`.trim(),
  },

  "underline-slide": {
    name: "underline-slide",
    className: "fr-underline-slide",
    defaultDuration: "0.3s",
    defaultEasing: "ease-out",
    keyframes: "",
    css: `
.fr-underline-slide {
  position: relative;
  text-decoration: none;
}

.fr-underline-slide::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: currentColor;
  transition: width var(--fr-duration, 0.3s) var(--fr-easing, ease-out);
}

.fr-underline-slide:hover::after {
  width: 100%;
}`.trim(),
  },

  "border-draw": {
    name: "border-draw",
    className: "fr-border-draw",
    defaultDuration: "0.4s",
    defaultEasing: "ease-out",
    keyframes: `
@keyframes fr-border-draw {
  from {
    background-size: 0% 2px, 2px 0%, 0% 2px, 2px 0%;
  }
  to {
    background-size: 100% 2px, 2px 100%, 100% 2px, 2px 100%;
  }
}`.trim(),
    css: `
.fr-border-draw {
  position: relative;
  border: 2px solid transparent;
  background-image: linear-gradient(var(--ferrum-colors-primary-500, #3b82f6), var(--ferrum-colors-primary-500, #3b82f6)),
                    linear-gradient(var(--ferrum-colors-primary-500, #3b82f6), var(--ferrum-colors-primary-500, #3b82f6)),
                    linear-gradient(var(--ferrum-colors-primary-500, #3b82f6), var(--ferrum-colors-primary-500, #3b82f6)),
                    linear-gradient(var(--ferrum-colors-primary-500, #3b82f6), var(--ferrum-colors-primary-500, #3b82f6));
  background-origin: border-box;
  background-size: 0% 2px, 2px 0%, 0% 2px, 2px 0%;
  background-position: 0 0, 100% 0, 100% 100%, 0 100%;
  background-repeat: no-repeat;
  transition: background-size var(--fr-duration, 0.4s) var(--fr-easing, ease-out);
}

.fr-border-draw:hover {
  background-size: 100% 2px, 2px 100%, 100% 2px, 2px 100%;
}`.trim(),
  },

  "color-shift": {
    name: "color-shift",
    className: "fr-color-shift",
    defaultDuration: "0.3s",
    defaultEasing: "ease-out",
    keyframes: "",
    css: `
.fr-color-shift {
  transition: color var(--fr-duration, 0.3s) var(--fr-easing, ease-out),
              background-color var(--fr-duration, 0.3s) var(--fr-easing, ease-out);
}

.fr-color-shift:hover {
  color: var(--ferrum-colors-primary-foreground, #ffffff);
  background-color: var(--ferrum-colors-primary-500, #3b82f6);
}`.trim(),
  },

  rotate: {
    name: "rotate",
    className: "fr-rotate",
    defaultDuration: "0.4s",
    defaultEasing: "ease-out",
    keyframes: "",
    css: `
.fr-rotate {
  transition: transform var(--fr-duration, 0.4s) var(--fr-easing, ease-out);
}

.fr-rotate:hover {
  transform: rotate(15deg);
}`.trim(),
  },
};