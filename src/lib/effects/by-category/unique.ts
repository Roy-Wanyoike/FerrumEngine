// Auto-generated — category: unique | effects: 7
// Do not edit manually.

import type { FerrumCSSEffect } from "../../types";

export const effects: FerrumCSSEffect[] = [
  {
    "name": "Fortune Teller",
    "className": "roycss-fortune-teller",
    "category": "unique",
    "displayType": "box",
    "css": ".roycss-fortune-teller {\n  position: relative;\n  width: 200px;\n  height: 200px;\n  background: transparent;\n}"
  },
  {
    "name": "Kaleidoscope",
    "className": "roycss-kaleidoscope",
    "category": "unique",
    "displayType": "box",
    "css": ".roycss-kaleidoscope {\n  position: relative;\n  width: 200px;\n  height: 200px;\n  border-radius: 50%;\n  overflow: hidden;\n  background: #000;\n  box-shadow: 0 0 0 6px #8b6914, 0 12px 30px rgba(0,0,0,0.5);\n}"
  },
  {
    "name": "Morph Blob",
    "className": "roycss-morph-blob",
    "category": "unique",
    "displayType": "box",
    "css": ".roycss-morph-blob {\n  position: relative;\n  width: 180px;\n  height: 180px;\n  background:\n    radial-gradient(circle at 30% 30%, #ff6ec4, #7873f5 70%);\n  box-shadow: 0 12px 40px rgba(120,80,255,0.5);\n  animation: roy-b11-morph-blob 8s ease-in-out infinite;\n}\n@keyframes roy-b11-morph-blob {\n  0%, 100% {\n    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;\n    transform: rotate(0deg) scale(1);\n    background: radial-gradient(circle at 30% 30%, #ff6ec4, #7873f5 70%);\n  }"
  },
  {
    "name": "Origami Fold",
    "className": "roycss-origami-fold",
    "category": "unique",
    "displayType": "box",
    "css": ".roycss-origami-fold {\n  position: relative;\n  width: 200px;\n  height: 180px;\n  background: #fafafa;\n  clip-path: polygon(\n    50% 0%, 100% 35%, 75% 100%, 25% 100%, 0% 35%);\n}"
  },
  {
    "name": "Paper Flip",
    "className": "roycss-paper-flip",
    "category": "unique",
    "displayType": "box",
    "css": ".roycss-paper-flip {\n  position: relative;\n  width: 180px;\n  height: 220px;\n  perspective: 1200px;\n  background: transparent;\n}"
  },
  {
    "name": "Roulette Spin",
    "className": "roycss-roulette-spin",
    "category": "unique",
    "displayType": "box",
    "css": ".roycss-roulette-spin {\n  position: relative;\n  width: 200px;\n  height: 200px;\n  border-radius: 50%;\n  background:\n    repeating-conic-gradient(from 0deg,\n      #c8102e 0deg 15deg,\n      #1a1a1a 15deg 30deg,\n      #c8102e 30deg 45deg,\n      #1a1a1a 45deg 60deg,\n      #c8102e 60deg 75deg,\n      #1a1a1a 75deg 90deg,\n      #c8102e 90deg 105deg,\n      #1a1a1a 105deg 120deg,\n      #c8102e 120deg 135deg,\n      #1a1a1a 135deg 150deg,\n      #c8102e 150deg 165deg,\n      #1a1a1a 165deg 180deg,\n      #c8102e 180deg 195deg,\n      #1a1a1a 195deg 210deg,\n      #c8102e 210deg 225deg,\n      #1a1a1a 225deg 240deg,\n      #c8102e 240deg 255deg,\n      #1a1a1a 255deg 270deg,\n      #c8102e 270deg 285deg,\n      #1a1a1a 285deg 300deg,\n      #c8102e 300deg 315deg,\n      #1a1a1a 315deg 330deg,\n      #c8102e 330deg 345deg,\n      #1a1a1a 345deg 360deg);\n  border: 8px solid #8b6914;\n  box-shadow: 0 0 0 4px #f4d03f, 0 12px 30px rgba(0,0,0,0.5);\n  animation: roy-b11-roulette-spin 4s cubic-bezier(0.2, 0.6, 0.3, 1) infinite;\n}\n@keyframes roy-b11-roulette-spin {\n  0%   { transform: rotate(0deg); }"
  },
  {
    "name": "Slot Machine",
    "className": "roycss-slot-machine",
    "category": "unique",
    "displayType": "box",
    "css": ".roycss-slot-machine {\n  position: relative;\n  width: 200px;\n  height: 160px;\n  background: linear-gradient(180deg, #b8860b 0%, #8b6914 50%, #5a3d0a 100%);\n  border-radius: 12px;\n  padding: 12px 16px;\n  box-shadow: 0 10px 25px rgba(0,0,0,0.4), inset 0 2px 6px rgba(255,220,100,0.4);\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  justify-content: center;\n}"
  }
] as FerrumCSSEffect[];
