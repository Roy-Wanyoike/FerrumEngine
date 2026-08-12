// Auto-generated — category: specialized | effects: 21
// Do not edit manually.

import type { FerrumCSSEffect } from "../../types";

export const effects: FerrumCSSEffect[] = [
  {
    "name": "Anchor Tooltip",
    "className": "roycss-anchor-tooltip",
    "category": "specialized",
    "displayType": "box",
    "css": ".roycss-anchor-tooltip {\n  position: relative;\n  width: 220px;\n  height: 140px;\n  border-radius: 14px;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  display: grid;\n  place-items: center;\n  anchor-name: --roy-at-host;\n}"
  },
  {
    "name": "Auto Height Expand",
    "className": "roycss-auto-height-expand",
    "category": "specialized",
    "displayType": "box",
    "css": ".roycss-auto-height-expand {\n  interpolate-size: allow-keywords;\n  width: 220px;\n  border-radius: 14px;\n  background: #0f172a;\n  padding: 12px 14px;\n  color: #e2e8f0;\n  font: 500 12px/1.4 system-ui, sans-serif;\n  overflow: hidden;\n}"
  },
  {
    "name": "Backdrop Multi Filter",
    "className": "roycss-backdrop-multi-filter",
    "category": "specialized",
    "displayType": "box",
    "css": ".roycss-backdrop-multi-filter {\n  width: 100%;\n  height: 100%;\n  min-height: 220px;\n  border-radius: 12px;\n  position: relative;\n  overflow: hidden;\n  background:\n    radial-gradient(circle at 20% 20%, #f43f5e, transparent 40%),\n    radial-gradient(circle at 80% 30%, #22d3ee, transparent 40%),\n    radial-gradient(circle at 50% 80%, #a855f7, transparent 45%),\n    repeating-linear-gradient(45deg,\n      rgba(255, 255, 255, 0.05) 0 8px,\n      transparent 8px 16px),\n    #0f172a;\n  display: grid;\n  place-items: center;\n}"
  },
  {
    "name": "Balanced Text",
    "className": "roycss-balanced-text",
    "category": "specialized",
    "displayType": "box",
    "css": ".roycss-balanced-text {\n  width: 240px;\n  padding: 16px 18px;\n  border-radius: 12px;\n  background: #fef3c7;\n  color: #78350f;\n  font: 600 14px/1.45 Georgia, serif;\n}"
  },
  {
    "name": "Blink",
    "className": "roycss-blink",
    "category": "specialized",
    "displayType": "box",
    "css": ".roycss-blink {\n  animation: roy-blink 1.4s steps(2, start) infinite;\n}\n@keyframes roy-blink {\n  0%, 49% { opacity: 1; }"
  },
  {
    "name": "Book Open",
    "className": "roycss-book-open",
    "category": "specialized",
    "displayType": "box",
    "css": ".roycss-book-open {\n  perspective: 1000px;\n  width: 80px;\n  height: 60px;\n  position: relative;\n  transform-style: preserve-3d;\n  background: transparent;\n}"
  },
  {
    "name": "Conic Gradient Clock",
    "className": "roycss-conic-gradient-clock",
    "category": "specialized",
    "displayType": "box",
    "css": ".roycss-conic-gradient-clock {\n  width: 100%;\n  height: 100%;\n  min-height: 220px;\n  border-radius: 12px;\n  display: grid;\n  place-items: center;\n  background: #0f172a;\n  position: relative;\n}"
  },
  {
    "name": "Depth Shadow",
    "className": "roycss-depth-shadow",
    "category": "specialized",
    "displayType": "box",
    "css": ".roycss-depth-shadow {\n  box-shadow:\n    1px 1px 0 #065f46,\n    2px 2px 0 #059669,\n    3px 3px 0 #047857,\n    4px 4px 0 #10b981,\n    5px 5px 0 rgba(16, 185, 129, 0.6),\n    6px 6px 0 rgba(16, 185, 129, 0.4),\n    7px 7px 0 rgba(16, 185, 129, 0.2),\n    8px 8px 20px rgba(0, 0, 0, 0.15);\n  transition: all 0.3s ease;\n}"
  },
  {
    "name": "Dissolve",
    "className": "roycss-dissolve",
    "category": "specialized",
    "displayType": "box",
    "css": ".roycss-dissolve {\n  animation: roy-dissolve 1s cubic-bezier(0.55, 0, 0.45, 1) both;\n}\n@keyframes roy-dissolve {\n  0% {\n    opacity: 1;\n    filter: blur(0px);\n    transform: scale(1);\n  }"
  },
  {
    "name": "Door Open",
    "className": "roycss-door-open",
    "category": "specialized",
    "displayType": "box",
    "css": ".roycss-door-open {\n  perspective: 800px;\n  width: 60px;\n  height: 80px;\n  position: relative;\n  background: rgba(16, 185, 129, 0.1);\n  border: 2px solid rgba(16, 185, 129, 0.3);\n  border-radius: 4px;\n}"
  },
  {
    "name": "Flash",
    "className": "roycss-flash",
    "category": "specialized",
    "displayType": "box",
    "css": ".roycss-flash {\n  animation: roy-flash 1.2s ease-in-out infinite;\n}\n@keyframes roy-flash {\n  0%, 50%, 100% { opacity: 1; }"
  },
  {
    "name": "Has Parent Highlight",
    "className": "roycss-has-parent-highlight",
    "category": "specialized",
    "displayType": "box",
    "css": ".roycss-has-parent-highlight {\n  width: 220px;\n  padding: 18px;\n  border-radius: 14px;\n  background: #1e293b;\n  border: 2px solid #334155;\n  transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;\n}"
  },
  {
    "name": "Interpolate Size Accordion",
    "className": "roycss-interpolate-size-accordion",
    "category": "specialized",
    "displayType": "box",
    "css": ".roycss-interpolate-size-accordion {\n  interpolate-size: allow-keywords;\n  width: 220px;\n  border-radius: 14px;\n  background: linear-gradient(135deg, #f97316, #ef4444);\n  overflow: hidden;\n  display: grid;\n  place-items: center;\n}"
  },
  {
    "name": "Light Dark Auto",
    "className": "roycss-light-dark-auto",
    "category": "specialized",
    "displayType": "box",
    "css": ".roycss-light-dark-auto {\n    background: #0f172a;\n    color: #f1f5f9;\n    border-color: #334155;\n  }"
  },
  {
    "name": "Neon Sign",
    "className": "roycss-neon-sign",
    "category": "specialized",
    "displayType": "box",
    "css": ".roycss-neon-sign {\n  position: relative;\n  width: 200px;\n  height: 160px;\n  border-radius: 12px;\n  background: radial-gradient(ellipse at 50% 50%, #1a0833 0%, #050010 100%);\n  display: grid;\n  place-items: center;\n  overflow: hidden;\n}"
  },
  {
    "name": "Prism Rainbow",
    "className": "roycss-prism-rainbow",
    "category": "specialized",
    "displayType": "box",
    "css": ".roycss-prism-rainbow {\n  position: relative;\n  width: 220px;\n  height: 160px;\n  background: #0a0a14;\n  overflow: hidden;\n  border-radius: 8px;\n}"
  },
  {
    "name": "Relative Color Hover",
    "className": "roycss-relative-color-hover",
    "category": "specialized",
    "displayType": "box",
    "css": ".roycss-relative-color-hover { color: #022c22; }"
  },
  {
    "name": "Relative Color Tint",
    "className": "roycss-relative-color-tint",
    "category": "specialized",
    "displayType": "box",
    "css": ".roycss-relative-color-tint {\n    background:\n      radial-gradient(circle at 30% 30%, rgba(165, 180, 252, 0.6), transparent 50%),\n      radial-gradient(circle at 70% 70%, rgba(67, 56, 202, 0.7), transparent 55%),\n      linear-gradient(135deg, #6366f1, #1e1b4b);\n  }"
  },
  {
    "name": "Spiral Galaxy",
    "className": "roycss-spiral-galaxy",
    "category": "specialized",
    "displayType": "box",
    "css": ".roycss-spiral-galaxy {\n  position: relative;\n  width: 220px;\n  height: 220px;\n  border-radius: 50%;\n  overflow: hidden;\n  background: radial-gradient(circle at 50% 50%, #1a0033 0%, #050010 70%, #000 100%);\n  box-shadow: 0 0 40px rgba(120,80,255,0.4);\n}"
  },
  {
    "name": "Vhs Glitch",
    "className": "roycss-vhs-glitch",
    "category": "specialized",
    "displayType": "box",
    "css": ".roycss-vhs-glitch {\n  width: 100%;\n  min-height: 240px;\n  background:\n    linear-gradient(180deg, #1a0033 0%, #4a0080 50%, #001a4a 100%);\n  position: relative;\n  border-radius: 8px;\n  overflow: hidden;\n  filter: contrast(1.2) saturate(1.3);\n}"
  },
  {
    "name": "Vintage Tv",
    "className": "roycss-vintage-tv",
    "category": "specialized",
    "displayType": "box",
    "css": ".roycss-vintage-tv {\n  width: 100%;\n  min-height: 240px;\n  background:\n    radial-gradient(ellipse 90% 70% at 50% 50%, #1a3a5c 0%, #0a1a2c 70%, #000 100%);\n  position: relative;\n  border-radius: 24px;\n  overflow: hidden;\n  box-shadow:\n    inset 0 0 60px rgba(0,0,0,0.8),\n    inset 0 0 120px rgba(80,140,200,0.3);\n}"
  }
] as FerrumCSSEffect[];
