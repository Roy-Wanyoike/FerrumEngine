// Auto-generated — category: property | effects: 7
// Do not edit manually.

import type { FerrumCSSEffect } from "../../types";

export const effects: FerrumCSSEffect[] = [
  {
    "name": "Property Angle Rotate",
    "className": "roycss-property-angle-rotate",
    "category": "property",
    "displayType": "box",
    "css": ".roycss-property-angle-rotate {\n  width: 160px;\n  height: 160px;\n  border-radius: 50%;\n  background: conic-gradient(\n    from var(--roy-b10-par-angle),\n    #ec4899, #8b5cf6, #3b82f6, #10b981, #f59e0b, #ec4899\n  );\n  --roy-b10-par-angle: 0deg;\n  animation: roy-b10-par-spin 4s linear infinite;\n  position: relative;\n}\n@keyframes roy-b10-par-spin {\n  to { --roy-b10-par-angle: 360deg; }"
  },
  {
    "name": "Property Color Shift",
    "className": "roycss-property-color-shift",
    "category": "property",
    "displayType": "box",
    "css": ".roycss-property-color-shift {\n  width: 160px;\n  height: 160px;\n  border-radius: 18px;\n  background: hsl(from hsl(var(--roy-b10-pcs-hue) 90% 55%) h s l);\n  --roy-b10-pcs-hue: 0deg;\n  animation: roy-b10-pcs-cycle 5s linear infinite;\n  box-shadow: 0 12px 30px hsl(var(--roy-b10-pcs-hue) 90% 55% / 0.4);\n  display: grid;\n  place-items: center;\n  color: #fff;\n  font: 700 12px/1 system-ui, sans-serif;\n  letter-spacing: 0.2em;\n  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);\n}\n@keyframes roy-b10-pcs-cycle {\n  to { --roy-b10-pcs-hue: 360deg; }"
  },
  {
    "name": "Property Conic Loader",
    "className": "roycss-property-conic-loader",
    "category": "property",
    "displayType": "box",
    "css": ".roycss-property-conic-loader {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  background: conic-gradient(\n    from var(--roy-b10-pcl-angle),\n    transparent 0deg,\n    #06b6d4 60deg,\n    #6366f1 120deg,\n    transparent 180deg,\n    transparent 360deg\n  );\n  -webkit-mask: radial-gradient(circle, transparent 22px, #000 23px);\n          mask: radial-gradient(circle, transparent 22px, #000 23px);\n  --roy-b10-pcl-angle: 0deg;\n  animation: roy-b10-pcl-spin 1.2s linear infinite;\n}\n@keyframes roy-b10-pcl-spin {\n  to { --roy-b10-pcl-angle: 360deg; }"
  },
  {
    "name": "Property Gradient Flow",
    "className": "roycss-property-gradient-flow",
    "category": "property",
    "displayType": "box",
    "css": ".roycss-property-gradient-flow {\n  width: 200px;\n  height: 120px;\n  border-radius: 14px;\n  background: linear-gradient(\n    var(--roy-b10-pgf-angle),\n    #ec4899, #8b5cf6, #3b82f6, #06b6d4, #10b981, #f59e0b, #ec4899\n  );\n  background-size: 300% 300%;\n  display: grid;\n  place-items: center;\n  color: #fff;\n  font: 800 16px/1 system-ui, sans-serif;\n  letter-spacing: 0.2em;\n  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);\n  --roy-b10-pgf-angle: 0deg;\n  animation: roy-b10-pgf-spin 4s linear infinite;\n}\n@keyframes roy-b10-pgf-spin {\n  to { --roy-b10-pgf-angle: 360deg; }"
  },
  {
    "name": "Property Hue Cycle",
    "className": "roycss-property-hue-cycle",
    "category": "property",
    "displayType": "box",
    "css": ".roycss-property-hue-cycle {\n    background: linear-gradient(135deg, #ec4899, #8b5cf6, #06b6d4);\n    color: #0f172a;\n    animation: roy-b10-phc-fb 4s linear infinite;\n  }\n@keyframes roy-b10-phc-fb {\n    to { filter: hue-rotate(360deg); }"
  },
  {
    "name": "Property Progress Bar",
    "className": "roycss-property-progress-bar",
    "category": "property",
    "displayType": "box",
    "css": ".roycss-property-progress-bar {\n  width: 220px;\n  height: 36px;\n  border-radius: 18px;\n  background: #1e293b;\n  border: 1px solid #334155;\n  position: relative;\n  overflow: hidden;\n  --roy-b10-ppb-progress: 0;\n  animation: roy-b10-ppb-fill 3s ease-in-out infinite;\n}\n@keyframes roy-b10-ppb-fill {\n  0%   { --roy-b10-ppb-progress: 0; }"
  },
  {
    "name": "Property Shadow Breathe",
    "className": "roycss-property-shadow-breathe",
    "category": "property",
    "displayType": "box",
    "css": ".roycss-property-shadow-breathe {\n  width: 120px;\n  height: 120px;\n  border-radius: 24px;\n  background: linear-gradient(135deg, #0ea5e9, #6366f1);\n  display: grid;\n  place-items: center;\n  color: #fff;\n  font: 800 14px/1 system-ui, sans-serif;\n  letter-spacing: 0.15em;\n  --roy-b10-psb-blur: 0px;\n  --roy-b10-psb-spread: 0px;\n  box-shadow:\n    0 0 var(--roy-b10-psb-blur) var(--roy-b10-psb-spread) rgba(99, 102, 241, 0.7),\n    0 0 var(--roy-b10-psb-blur) var(--roy-b10-psb-spread) rgba(14, 165, 233, 0.5);\n  animation: roy-b10-psb-breathe 2.4s ease-in-out infinite;\n}\n@keyframes roy-b10-psb-breathe {\n  0%, 100% { --roy-b10-psb-blur: 0px;   --roy-b10-psb-spread: 0px; }"
  }
] as FerrumCSSEffect[];
