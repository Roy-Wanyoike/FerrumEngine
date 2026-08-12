// Auto-generated — category: transform | effects: 9
// Do not edit manually.

import type { FerrumCSSEffect } from "../../types";

export const effects: FerrumCSSEffect[] = [
  {
    "name": "Flip X",
    "className": "roycss-flip-x",
    "category": "transform",
    "displayType": "box",
    "css": ".roycss-flip-x {\n  perspective: 800px;\n  transition: transform 0.6s ease;\n  transform-style: preserve-3d;\n  background: linear-gradient(135deg, #10b981, #06b6d4);\n  border-radius: 12px;\n}"
  },
  {
    "name": "Flip Y",
    "className": "roycss-flip-y",
    "category": "transform",
    "displayType": "box",
    "css": ".roycss-flip-y {\n  perspective: 800px;\n  transition: transform 0.6s ease;\n  transform-style: preserve-3d;\n  background: linear-gradient(135deg, #06b6d4, #8b5cf6);\n  border-radius: 12px;\n}"
  },
  {
    "name": "Rotate X",
    "className": "roycss-rotate-x",
    "category": "transform",
    "displayType": "box",
    "css": ".roycss-rotate-x {\n  width: 60px;\n  height: 60px;\n  background: linear-gradient(135deg, #10b981, #06b6d4);\n  border-radius: 8px;\n  transform-style: preserve-3d;\n  animation: roy-rotate-x 3s linear infinite;\n}\n@keyframes roy-rotate-x {\n  0% { transform: perspective(800px) rotateX(0deg); }"
  },
  {
    "name": "Rotate Y",
    "className": "roycss-rotate-y",
    "category": "transform",
    "displayType": "box",
    "css": ".roycss-rotate-y {\n  width: 60px;\n  height: 60px;\n  background: linear-gradient(135deg, #ec4899, #8b5cf6);\n  border-radius: 8px;\n  transform-style: preserve-3d;\n  animation: roy-rotate-y 3s linear infinite;\n}\n@keyframes roy-rotate-y {\n  0% { transform: perspective(800px) rotateY(0deg); }"
  },
  {
    "name": "Scale Compress",
    "className": "roycss-scale-compress",
    "category": "transform",
    "displayType": "box",
    "css": ".roycss-scale-compress {\n  animation: roy-scale-compress 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n  transform-origin: center;\n}\n@keyframes roy-scale-compress {\n  0% {\n    opacity: 0;\n    transform: scaleY(0.2) scaleX(1.4);\n  }"
  },
  {
    "name": "Scale Expand",
    "className": "roycss-scale-expand",
    "category": "transform",
    "displayType": "box",
    "css": ".roycss-scale-expand {\n  animation: roy-scale-expand 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;\n  transform-origin: center;\n}\n@keyframes roy-scale-expand {\n  0% {\n    opacity: 0;\n    transform: scaleX(0.2) scaleY(0.6);\n  }"
  },
  {
    "name": "Scale Grow",
    "className": "roycss-scale-grow",
    "category": "transform",
    "displayType": "box",
    "css": ".roycss-scale-grow {\n  animation: roy-scale-grow 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n}\n@keyframes roy-scale-grow {\n  0% {\n    opacity: 0;\n    transform: scale(0);\n  }"
  },
  {
    "name": "Scale Shrink",
    "className": "roycss-scale-shrink",
    "category": "transform",
    "displayType": "box",
    "css": ".roycss-scale-shrink {\n  animation: roy-scale-shrink 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n}\n@keyframes roy-scale-shrink {\n  0% {\n    opacity: 0;\n    transform: scale(1.8);\n  }"
  },
  {
    "name": "Transform Origin Spin",
    "className": "roycss-transform-origin-spin",
    "category": "transform",
    "displayType": "box",
    "css": ".roycss-transform-origin-spin {\n  width: 60px;\n  height: 60px;\n  background: linear-gradient(135deg, #10b981, #06b6d4);\n  border-radius: 8px;\n  transform-origin: 0% 0%;\n  animation: roy-origin-spin 2s linear infinite;\n}\n@keyframes roy-origin-spin {\n  0% { transform: rotate(0deg); }"
  }
] as FerrumCSSEffect[];
