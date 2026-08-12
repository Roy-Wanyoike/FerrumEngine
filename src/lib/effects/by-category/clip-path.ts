// Auto-generated — category: clip-path | effects: 2
// Do not edit manually.

import type { FerrumCSSEffect } from "../../types";

export const effects: FerrumCSSEffect[] = [
  {
    "name": "Clip Path Hexagon",
    "className": "roycss-clip-path-hexagon",
    "category": "clip-path",
    "displayType": "box",
    "css": ".roycss-clip-path-hexagon {\n  width: 160px;\n  height: 160px;\n  background:\n    conic-gradient(from 30deg, #f59e0b, #ef4444, #ec4899, #8b5cf6, #f59e0b);\n  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);\n  display: grid;\n  place-items: center;\n  animation: roy-b10-cph-spin 6s linear infinite;\n}\n@keyframes roy-b10-cph-spin {\n  to { transform: rotate(360deg); }"
  },
  {
    "name": "Clip Path Star",
    "className": "roycss-clip-path-star",
    "category": "clip-path",
    "displayType": "box",
    "css": ".roycss-clip-path-star {\n  width: 170px;\n  height: 170px;\n  background: linear-gradient(135deg, #fbbf24, #f59e0b 40%, #b45309);\n  clip-path: polygon(\n    50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%,\n    50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%\n  );\n  display: grid;\n  place-items: center;\n  animation: roy-b10-cps-twinkle 1.8s ease-in-out infinite;\n}\n@keyframes roy-b10-cps-twinkle {\n  0%, 100% { filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.5)); transform: scale(1); }"
  }
] as FerrumCSSEffect[];
