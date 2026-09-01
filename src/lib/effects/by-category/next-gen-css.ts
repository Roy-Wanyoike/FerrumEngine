// Next-Gen CSS Effects — 25 cutting-edge CSS feature demos
// Category: next-gen-css

import type { FerrumCSSEffect } from "../../types";

export const effects: FerrumCSSEffect[] = [
  // ── @property (CSS Houdini) ──────────────────────────────────
  {
    name: "Houdini Animated Gradient",
    className: "roycss-ng-houdini-gradient",
    category: "next-gen-css",
    displayType: "box",
    css: "@property --ng-grad-angle {\n  syntax: '<angle>';\n  initial-value: 0deg;\n  inherits: false;\n}\n.roycss-ng-houdini-gradient {\n  --ng-grad-angle: 0deg;\n  background: conic-gradient(from var(--ng-grad-angle), #f43f5e, #7e2d8b, #06b6d4, #f43f5e);\n  border-radius: 16px;\n  animation: roy-ng-grad-spin 3s linear infinite;\n}\n@keyframes roy-ng-grad-spin {\n  to { --ng-grad-angle: 360deg; }\n}"
  },
  {
    name: "Houdini Hue Cycle",
    className: "roycss-ng-houdini-hue",
    category: "next-gen-css",
    displayType: "box",
    css: "@property --ng-hue {\n  syntax: '<number>';\n  initial-value: 0;\n  inherits: false;\n}\n.roycss-ng-houdini-hue {\n  --ng-hue: 0;\n  background: hsl(var(--ng-hue), 80%, 55%);\n  border-radius: 16px;\n  animation: roy-ng-hue-cycle 4s linear infinite;\n}\n@keyframes roy-ng-hue-cycle {\n  to { --ng-hue: 360; }\n}"
  },
  {
    name: "Houdini Border Rainbow",
    className: "roycss-ng-border-rainbow",
    category: "next-gen-css",
    displayType: "box",
    css: "@property --ng-border-angle {\n  syntax: '<angle>';\n  initial-value: 0deg;\n  inherits: false;\n}\n.roycss-ng-border-rainbow {\n  --ng-border-angle: 0deg;\n  border: 3px solid transparent;\n  background: linear-gradient(#0f172a, #1e293b) padding-box, conic-gradient(from var(--ng-border-angle), #f43f5e, #f59e0b, #10b981, #06b6d4, #8b5cf6, #f43f5e) border-box;\n  border-radius: 16px;\n  animation: roy-ng-border-spin 3s linear infinite;\n}\n@keyframes roy-ng-border-spin {\n  to { --ng-border-angle: 360deg; }\n}"
  },
  {
    name: "Houdini Progress Ring",
    className: "roycss-ng-progress-ring",
    category: "next-gen-css",
    displayType: "box",
    css: "@property --ng-pct {\n  syntax: '<percentage>';\n  initial-value: 0%;\n  inherits: false;\n}\n.roycss-ng-progress-ring {\n  --ng-pct: 0%;\n  background: conic-gradient(#06b6d4 var(--ng-pct), #1e293b var(--ng-pct));\n  border-radius: 50%;\n  animation: roy-ng-progress 2s ease-in-out infinite alternate;\n}\n@keyframes roy-ng-progress {\n  to { --ng-pct: 75%; }\n}"
  },
  {
    name: "Houdini Glow Pulse",
    className: "roycss-ng-glow-pulse",
    category: "next-gen-css",
    displayType: "box",
    css: "@property --ng-glow {\n  syntax: '<length>';\n  initial-value: 0px;\n  inherits: false;\n}\n.roycss-ng-glow-pulse {\n  --ng-glow: 0px;\n  background: #0f172a;\n  border-radius: 16px;\n  box-shadow: 0 0 var(--ng-glow) rgba(6,182,212,0.6);\n  animation: roy-ng-glow 2s ease-in-out infinite alternate;\n}\n@keyframes roy-ng-glow {\n  to { --ng-glow: 40px; }\n}"
  },
  {
    name: "Houdini Gradient Morph",
    className: "roycss-ng-gradient-morph",
    category: "next-gen-css",
    displayType: "box",
    css: "@property --ng-mc1 {\n  syntax: '<color>';\n  initial-value: #f43f5e;\n  inherits: false;\n}\n@property --ng-mc2 {\n  syntax: '<color>';\n  initial-value: #06b6d4;\n  inherits: false;\n}\n.roycss-ng-gradient-morph {\n  --ng-mc1: #f43f5e;\n  --ng-mc2: #06b6d4;\n  background: linear-gradient(135deg, var(--ng-mc1), var(--ng-mc2));\n  border-radius: 16px;\n  animation: roy-ng-morph 4s ease-in-out infinite alternate;\n}\n@keyframes roy-ng-morph {\n  0% { --ng-mc1: #f43f5e; --ng-mc2: #06b6d4; }\n  50% { --ng-mc1: #8b5cf6; --ng-mc2: #f59e0b; }\n  100% { --ng-mc1: #10b981; --ng-mc2: #ec4899; }\n}"
  },

  // ── Scroll-Driven Animations ────────────────────────────────
  {
    name: "Scroll Scale Reveal",
    className: "roycss-ng-scroll-scale",
    category: "next-gen-css",
    displayType: "box",
    css: ".roycss-ng-scroll-scale {\n  background: linear-gradient(135deg, #7e2d8b, #06b6d4);\n  border-radius: 16px;\n  animation: roy-ng-scroll-scale-in linear both;\n  animation-timeline: scroll();\n  animation-range: entry 0% entry 100%;\n}\n@keyframes roy-ng-scroll-scale-in {\n  from { opacity: 0; transform: scale(0.8); }\n  to { opacity: 1; transform: scale(1); }\n}"
  },
  {
    name: "Scroll Opacity Fade",
    className: "roycss-ng-scroll-fade",
    category: "next-gen-css",
    displayType: "box",
    css: ".roycss-ng-scroll-fade {\n  background: linear-gradient(135deg, #1e293b, #0f172a);\n  border-radius: 16px;\n  animation: roy-ng-scroll-fade-in linear both;\n  animation-timeline: scroll();\n  animation-range: entry 0% entry 80%;\n}\n@keyframes roy-ng-scroll-fade-in {\n  from { opacity: 0; transform: translateY(30px); }\n  to { opacity: 1; transform: translateY(0); }\n}"
  },
  {
    name: "Scroll Rotate In",
    className: "roycss-ng-scroll-rotate",
    category: "next-gen-css",
    displayType: "box",
    css: ".roycss-ng-scroll-rotate {\n  background: linear-gradient(135deg, #7e2d8b, #06b6d4);\n  border-radius: 16px;\n  animation: roy-ng-scroll-rot-in linear both;\n  animation-timeline: scroll();\n  animation-range: entry 0% entry 100%;\n}\n@keyframes roy-ng-scroll-rot-in {\n  from { opacity: 0; transform: rotate(-15deg) scale(0.9); }\n  to { opacity: 1; transform: rotate(0deg) scale(1); }\n}"
  },

  // ── View Transitions API ────────────────────────────────────
  {
    name: "View Transition Morph Shape",
    className: "roycss-ng-vt-morph",
    category: "next-gen-css",
    displayType: "box",
    css: ".roycss-ng-vt-morph {\n  view-transition-name: roy-ng-morph;\n  background: linear-gradient(135deg, #0ea5e9, #6366f1);\n  border-radius: 16px;\n  display: grid;\n  place-items: center;\n  color: #fff;\n  animation: roy-ng-vt-shape 4s ease-in-out infinite;\n}\n@keyframes roy-ng-vt-shape {\n  0%, 100% { border-radius: 16px; transform: scale(1); }\n  25% { border-radius: 50% 16px 50% 16px; transform: scale(1.05); }\n  50% { border-radius: 50%; transform: scale(0.95); }\n  75% { border-radius: 16px 50% 16px 50%; transform: scale(1.02); }\n}"
  },
  {
    name: "View Transition Color Swap",
    className: "roycss-ng-vt-swap",
    category: "next-gen-css",
    displayType: "box",
    css: ".roycss-ng-vt-swap {\n  view-transition-name: roy-ng-color-swap;\n  border-radius: 16px;\n  display: grid;\n  place-items: center;\n  color: #fff;\n  animation: roy-ng-vt-swap 6s ease-in-out infinite;\n}\n@keyframes roy-ng-vt-swap {\n  0%, 20% { background: linear-gradient(135deg, #f43f5e, #ec4899); }\n  25%, 45% { background: linear-gradient(135deg, #06b6d4, #0ea5e9); }\n  50%, 70% { background: linear-gradient(135deg, #8b5cf6, #6366f1); }\n  75%, 95% { background: linear-gradient(135deg, #10b981, #059669); }\n}"
  },

  // ── CSS Anchor Positioning ──────────────────────────────────
  {
    name: "Anchor Tooltip",
    className: "roycss-ng-anchor-tooltip",
    category: "next-gen-css",
    displayType: "box",
    css: ".roycss-ng-anchor-tooltip {\n  anchor-name: --ng-tip;\n  background: linear-gradient(135deg, #1e293b, #0f172a);\n  border-radius: 12px;\n  position: relative;\n  display: grid;\n  place-items: center;\n  color: #06b6d4;\n}\n.roycss-ng-anchor-tooltip::after {\n  content: 'Tooltip';\n  position: absolute;\n  bottom: anchor(top);\n  left: anchor(center);\n  translate: -50% 8px;\n  background: #06b6d4;\n  color: #0f172a;\n  padding: 4px 10px;\n  border-radius: 6px;\n  white-space: nowrap;\n}"
  },
  {
    name: "Anchor Callout",
    className: "roycss-ng-anchor-callout",
    category: "next-gen-css",
    displayType: "box",
    css: ".roycss-ng-anchor-callout {\n  anchor-name: --ng-callout;\n  background: linear-gradient(135deg, #7e2d8b, #4c1d95);\n  border-radius: 16px;\n  position: relative;\n  display: grid;\n  place-items: center;\n  color: #e2e8f0;\n}\n.roycss-ng-anchor-callout::before {\n  content: '';\n  position: absolute;\n  top: anchor(bottom);\n  left: anchor(center);\n  translate: -50% -6px;\n  border-left: 8px solid transparent;\n  border-right: 8px solid transparent;\n  border-bottom: 8px solid #f59e0b;\n}\n.roycss-ng-anchor-callout::after {\n  content: 'Callout';\n  position: absolute;\n  top: anchor(bottom);\n  left: anchor(center);\n  translate: -50% 6px;\n  background: #f59e0b;\n  color: #0f172a;\n  padding: 6px 14px;\n  border-radius: 8px;\n  white-space: nowrap;\n}"
  },

  // ── CSS Nesting ─────────────────────────────────────────────
  {
    name: "Nesting Hover Card",
    className: "roycss-ng-nesting-card",
    category: "next-gen-css",
    displayType: "box",
    css: ".roycss-ng-nesting-card {\n  background: #1e293b;\n  border-radius: 16px;\n  border: 2px solid #334155;\n  position: relative;\n  overflow: hidden;\n  display: grid;\n  place-items: center;\n  color: #94a3b8;\n  transition: border-color 0.3s, box-shadow 0.3s;\n  &:hover {\n    border-color: #06b6d4;\n    box-shadow: 0 0 20px rgba(6,182,212,0.2);\n  }\n  &::before {\n    content: '';\n    position: absolute;\n    inset: 0;\n    background: linear-gradient(135deg, rgba(6,182,212,0.1), rgba(99,102,241,0.1));\n    opacity: 0;\n    border-radius: inherit;\n    transition: opacity 0.3s;\n  }\n  &:hover::before {\n    opacity: 1;\n  }\n}"
  },
  {
    name: "Nesting Interactive Button",
    className: "roycss-ng-nesting-btn",
    category: "next-gen-css",
    displayType: "box",
    css: ".roycss-ng-nesting-btn {\n  background: linear-gradient(135deg, #06b6d4, #0ea5e9);\n  border-radius: 12px;\n  position: relative;\n  overflow: hidden;\n  display: grid;\n  place-items: center;\n  color: #fff;\n  transition: transform 0.2s, box-shadow 0.2s;\n  &:hover {\n    transform: translateY(-2px);\n    box-shadow: 0 8px 25px rgba(6,182,212,0.4);\n  }\n  &:active {\n    transform: translateY(0);\n  }\n  &::after {\n    content: '';\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    height: 3px;\n    background: #fff;\n    transform: scaleX(0);\n    transform-origin: left;\n    transition: transform 0.3s ease;\n  }\n  &:hover::after {\n    transform: scaleX(1);\n  }\n}"
  },

  // ── :has() Selector ─────────────────────────────────────────
  {
    name: "Has Focus Glow",
    className: "roycss-ng-has-focus",
    category: "next-gen-css",
    displayType: "box",
    css: ".roycss-ng-has-focus {\n  background: #1e293b;\n  border-radius: 16px;\n  border: 2px solid #334155;\n  display: grid;\n  place-items: center;\n  color: #94a3b8;\n  transition: border-color 0.3s, box-shadow 0.3s;\n}\n.roycss-ng-has-focus:has(:focus-visible) {\n  border-color: #8b5cf6;\n  box-shadow: 0 0 0 4px rgba(139,92,246,0.2);\n  color: #c4b5fd;\n}"
  },
  {
    name: "Has Checked Toggle",
    className: "roycss-ng-has-checked",
    category: "next-gen-css",
    displayType: "box",
    css: ".roycss-ng-has-checked {\n  background: linear-gradient(135deg, #1e293b, #0f172a);\n  border-radius: 16px;\n  border: 2px solid #334155;\n  display: grid;\n  place-items: center;\n  color: #94a3b8;\n  position: relative;\n  transition: border-color 0.3s, color 0.3s;\n}\n.roycss-ng-has-checked:has(:checked) {\n  border-color: #10b981;\n  color: #6ee7b7;\n  background: linear-gradient(135deg, #0f172a, #064e3b);\n}"
  },
  {
    name: "Has Empty State",
    className: "roycss-ng-has-empty",
    category: "next-gen-css",
    displayType: "box",
    css: ".roycss-ng-has-empty {\n  background: #1e293b;\n  border-radius: 16px;\  border: 2px dashed #475569;\n  display: grid;\n  place-items: center;\n  transition: border-color 0.3s, background 0.3s;\n}\n.roycss-ng-has-empty:has(:not(:empty)) {\n  border-style: solid;\n  border-color: #06b6d4;\n  background: linear-gradient(135deg, #1e293b, #0f172a);\n}"
  },

  // ── Container Queries ───────────────────────────────────────
  {
    name: "Container Query Stack",
    className: "roycss-ng-cq-stack",
    category: "next-gen-css",
    displayType: "box",
    css: ".roycss-ng-cq-stack {\n  container-type: inline-size;\n  background: #0f172a;\n  border-radius: 16px;\n  padding: 16px;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n@container (min-width: 200px) {\n  .roycss-ng-cq-stack {\n    flex-direction: row;\n    align-items: center;\n  }\n}"
  },
  {
    name: "Container Query Adaptive",
    className: "roycss-ng-cq-adaptive",
    category: "next-gen-css",
    displayType: "box",
    css: ".roycss-ng-cq-adaptive {\n  container-type: inline-size;\n  background: linear-gradient(135deg, #1e293b, #334155);\n  border-radius: 16px;\n  padding: 12px;\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 8px;\n}\n@container (min-width: 180px) {\n  .roycss-ng-cq-adaptive {\n    grid-template-columns: 1fr 1fr;\n    background: linear-gradient(135deg, #1e293b, #06b6d4);\n  }\n}\n@container (min-width: 280px) {\n  .roycss-ng-cq-adaptive {\n    grid-template-columns: 1fr 1fr 1fr;\n    background: linear-gradient(135deg, #06b6d4, #8b5cf6);\n  }\n}"
  },

  // ── color-mix() ─────────────────────────────────────────────
  {
    name: "Color Mix Blend",
    className: "roycss-ng-color-mix-blend",
    category: "next-gen-css",
    displayType: "box",
    css: ".roycss-ng-color-mix-blend {\n  background: radial-gradient(circle at 30% 40%, color-mix(in srgb, #f43f5e 70%, #06b6d4) 0%, transparent 50%), radial-gradient(circle at 70% 60%, color-mix(in srgb, #06b6d4 70%, #f43f5e) 0%, transparent 50%), linear-gradient(135deg, #0f172a, #1e293b);\n  border-radius: 16px;\n}"
  },
  {
    name: "Color Mix Opacity",
    className: "roycss-ng-color-mix-opacity",
    category: "next-gen-css",
    displayType: "box",
    css: ".roycss-ng-color-mix-opacity {\n  background: linear-gradient(135deg, color-mix(in srgb, #06b6d4 90%, white), color-mix(in srgb, #06b6d4 40%, black));\n  border-radius: 16px;\n  box-shadow: 0 4px 30px color-mix(in srgb, #06b6d4 30%, transparent);\n  border: 1px solid color-mix(in srgb, #06b6d4 40%, white);\n}"
  },

  // ── Advanced Gradients ──────────────────────────────────────
  {
    name: "Conic Gradient Pie",
    className: "roycss-ng-conic-pie",
    category: "next-gen-css",
    displayType: "box",
    css: ".roycss-ng-conic-pie {\n  background: conic-gradient(#f43f5e 0deg 90deg, #f59e0b 90deg 180deg, #10b981 180deg 270deg, #06b6d4 270deg 360deg);\n  border-radius: 50%;\n  position: relative;\n}\n.roycss-ng-conic-pie::after {\n  content: '';\n  position: absolute;\n  inset: 25%;\n  border-radius: 50%;\n  background: #0f172a;\n}"
  },
  {
    name: "Repeating Gradient Motion",
    className: "roycss-ng-repeating-motion",
    category: "next-gen-css",
    displayType: "box",
    css: ".roycss-ng-repeating-motion {\n  background: repeating-linear-gradient(45deg, transparent 0px, transparent 8px, rgba(6,182,212,0.15) 8px, rgba(6,182,212,0.15) 16px), linear-gradient(135deg, #0f172a, #1e293b);\n  border-radius: 16px;\n  animation: roy-ng-repeat-shift 1s linear infinite;\n}\n@keyframes roy-ng-repeat-shift {\n  from { background-position: 0 0, 0 0; }\n  to { background-position: 22.6px 0, 0 0; }\n}"
  },

  // ── text-wrap & transition-behavior ──────────────────────────
  {
    name: "Text Wrap Balance",
    className: "roycss-ng-text-balance",
    category: "next-gen-css",
    displayType: "box",
    css: ".roycss-ng-text-balance {\n  background: linear-gradient(135deg, #1e293b, #0f172a);\n  border-radius: 16px;\n  padding: 16px;\n  color: #e2e8f0;\n  text-wrap: balance;\n  max-width: 240px;\n}"
  },
  {
    name: "Discrete Transition",
    className: "roycss-ng-discrete-transition",
    category: "next-gen-css",
    displayType: "box",
    css: ".roycss-ng-discrete-transition {\n  background: #1e293b;\n  border-radius: 16px;\n  border: 2px solid #334155;\n  display: grid;\n  place-items: center;\n  color: #94a3b8;\n  overflow: hidden;\n  transition: border-radius 0.5s, background 0.5s, overflow 0.5s, border-color 0.5s;\n  transition-behavior: allow-discrete;\n}\n.roycss-ng-discrete-transition:hover {\n  border-radius: 50%;\n  background: linear-gradient(135deg, #8b5cf6, #06b6d4);\n  border-color: transparent;\n  overflow: hidden;\n  color: #fff;\n}"
  },
] as FerrumCSSEffect[];
