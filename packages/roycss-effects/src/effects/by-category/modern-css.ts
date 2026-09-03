// Auto-generated — category: modern-css | effects: 7
// Do not edit manually.

import type { FerrumCSSEffect } from "../../types";

export const effects: FerrumCSSEffect[] = [
  {
    "name": "Color Mix Gradient",
    "className": "roycss-color-mix-gradient",
    "category": "modern-css",
    "displayType": "box",
    "css": ".roycss-color-mix-gradient {\n    background: linear-gradient(135deg, #f43f5e, #7e2d8b, #06b6d4);\n  }"
  },
  {
    "name": "Color Mix Mesh",
    "className": "roycss-color-mix-mesh",
    "category": "modern-css",
    "displayType": "box",
    "css": ".roycss-color-mix-mesh {\n    background:\n      radial-gradient(circle at 15% 25%, #f43f5e, transparent 40%),\n      radial-gradient(circle at 85% 15%, #06b6d4, transparent 40%),\n      radial-gradient(circle at 75% 80%, #8b5cf6, transparent 45%),\n      linear-gradient(135deg, #0f172a, #1e293b);\n  }"
  },
  {
    "name": "Container Query Card",
    "className": "roycss-container-query-card",
    "category": "modern-css",
    "displayType": "box",
    "css": ".roycss-container-query-card {\n    grid-template-columns: 1fr 1fr;\n  }"
  },
  {
    "name": "Starting Style Drop In",
    "className": "roycss-starting-style-drop-in",
    "category": "modern-css",
    "displayType": "box",
    "css": ".roycss-starting-style-drop-in {\n  position: relative;\n  width: 240px;\n  height: 140px;\n  border-radius: 14px;\n  background: linear-gradient(135deg, #1e293b, #0f172a);\n  overflow: hidden;\n  display: grid;\n  place-items: center;\n}"
  },
  {
    "name": "Starting Style Fade",
    "className": "roycss-starting-style-fade",
    "category": "modern-css",
    "displayType": "box",
    "css": ".roycss-starting-style-fade {\n    opacity: 0;\n    transform: translateY(24px) scale(0.9);\n  }"
  },
  {
    "name": "View Timeline Reveal",
    "className": "roycss-view-timeline-reveal",
    "category": "modern-css",
    "displayType": "box",
    "css": ".roycss-view-timeline-reveal {\n    animation: roy-b10-vtl-reveal 0.8s ease both;\n  }\n@keyframes roy-b10-vtl-reveal {\n  from { opacity: 0; transform: translateY(60px) scale(0.8); }"
  },
  {
    "name": "View Transition Snapshot",
    "className": "roycss-view-transition-snapshot",
    "category": "modern-css",
    "displayType": "box",
    "css": ".roycss-view-transition-snapshot {\n  width: 200px;\n  height: 120px;\n  border-radius: 16px;\n  background: linear-gradient(135deg, #0ea5e9, #6366f1);\n  display: grid;\n  place-items: center;\n  color: #fff;\n  font: 700 14px/1 system-ui, sans-serif;\n  view-transition-name: roy-vt-card;\n  animation: roy-b10-vt-morph 4s ease-in-out infinite;\n}\n@keyframes roy-b10-vt-morph {\n  0%, 35%   { border-radius: 16px; background: linear-gradient(135deg, #0ea5e9, #6366f1); }"
  }
] as FerrumCSSEffect[];
