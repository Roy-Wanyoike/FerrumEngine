// Auto-generated — category: 3d | effects: 10
// Do not edit manually.

import type { FerrumCSSEffect } from "../../types";

export const effects: FerrumCSSEffect[] = [
  {
    "name": "3D Book",
    "className": "roycss-3d-book",
    "category": "3d",
    "displayType": "box",
    "css": ".roycss-3d-book {\n  perspective: 800px;\n  width: 60px;\n  height: 80px;\n  position: relative;\n  transform-style: preserve-3d;\n  transform: rotateY(-25deg);\n  transition: transform 0.6s ease;\n}"
  },
  {
    "name": "3D Gallery",
    "className": "roycss-3d-gallery",
    "category": "3d",
    "displayType": "box",
    "css": ".roycss-3d-gallery {\n  perspective: 1000px;\n  width: 80px;\n  height: 60px;\n  position: relative;\n  transform-style: preserve-3d;\n  animation: roy-3d-gallery-rotate 8s linear infinite;\n}\n@keyframes roy-3d-gallery-rotate {\n  0% { transform: rotateY(0deg); }"
  },
  {
    "name": "3D Poster",
    "className": "roycss-3d-poster",
    "category": "3d",
    "displayType": "box",
    "css": ".roycss-3d-poster {\n  perspective: 1000px;\n  width: 80px;\n  height: 100px;\n  background:\n    linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent),\n    linear-gradient(135deg, #8b5cf6, #ec4899);\n  border-radius: 6px;\n  box-shadow:\n    0 10px 30px rgba(139, 92, 246, 0.4),\n    0 0 0 1px rgba(255, 255, 255, 0.1);\n  transform: perspective(1000px) rotateY(-15deg) rotateX(5deg);\n  transition: transform 0.5s ease;\n}"
  },
  {
    "name": "Accordion 3D",
    "className": "roycss-accordion-3d",
    "category": "3d",
    "displayType": "box",
    "css": ".roycss-accordion-3d {\n  perspective: 800px;\n  width: 80px;\n  height: 60px;\n  position: relative;\n  transform-style: preserve-3d;\n}"
  },
  {
    "name": "Cube Face",
    "className": "roycss-cube-face",
    "category": "3d",
    "displayType": "box",
    "css": ".roycss-cube-face {\n  position: absolute;\n  width: 60px;\n  height: 60px;\n  border: 2px solid rgba(16, 185, 129, 0.5);\n  background: rgba(16, 185, 129, 0.08);\n  border-radius: 4px;\n}"
  },
  {
    "name": "Cube Rotate",
    "className": "roycss-cube-rotate",
    "category": "3d",
    "displayType": "box",
    "css": ".roycss-cube-rotate {\n  width: 60px;\n  height: 60px;\n  transform-style: preserve-3d;\n  animation: roy-cube-rotate 6s linear infinite;\n}\n@keyframes roy-cube-rotate {\n  0% { transform: rotateX(0deg) rotateY(0deg); }"
  },
  {
    "name": "Perspective Tilt",
    "className": "roycss-perspective-tilt",
    "category": "3d",
    "displayType": "box",
    "css": ".roycss-perspective-tilt {\n  transform-style: preserve-3d;\n  transform: perspective(800px) rotateX(5deg) rotateY(-5deg);\n  transition: transform 0.4s ease;\n  box-shadow: 8px 8px 20px rgba(0, 0, 0, 0.2);\n}"
  },
  {
    "name": "Rotate 3D",
    "className": "roycss-rotate-3d",
    "category": "3d",
    "displayType": "box",
    "css": ".roycss-rotate-3d {\n  transform-style: preserve-3d;\n  background: linear-gradient(135deg, #10b981, #8b5cf6);\n  border-radius: 12px;\n  animation: roy-rotate-3d 4s linear infinite;\n}\n@keyframes roy-rotate-3d {\n  0% { transform: perspective(800px) rotate3d(1, 1, 1, 0deg); }"
  },
  {
    "name": "Scale 3D",
    "className": "roycss-scale-3d",
    "category": "3d",
    "displayType": "box",
    "css": ".roycss-scale-3d {\n  width: 60px;\n  height: 60px;\n  background: linear-gradient(135deg, #10b981, #065f46);\n  border-radius: 8px;\n  transform-style: preserve-3d;\n  transition: transform 0.5s ease;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\n}"
  },
  {
    "name": "Skew 3D",
    "className": "roycss-skew-3d",
    "category": "3d",
    "displayType": "box",
    "css": ".roycss-skew-3d {\n  width: 60px;\n  height: 60px;\n  background: linear-gradient(135deg, #06b6d4, #8b5cf6);\n  border-radius: 8px;\n  transform: perspective(800px) skew(-15deg, 5deg);\n  transition: transform 0.5s ease;\n  box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.3);\n}"
  }
] as FerrumCSSEffect[];
