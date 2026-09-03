// Auto-generated — category: loading | effects: 25
// Do not edit manually.

import type { FerrumCSSEffect } from "../../types";

export const effects: FerrumCSSEffect[] = [
  {
    "name": "Loader Bars",
    "className": "roycss-loader-bars",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-bars {\n  display: flex;\n  gap: 3px;\n  align-items: flex-end;\n  height: 32px;\n}"
  },
  {
    "name": "Loader Bouncing Grid",
    "className": "roycss-loader-bouncing-grid",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-bouncing-grid {\n  width: 42px;\n  height: 42px;\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  grid-template-rows: 1fr 1fr 1fr;\n  gap: 3px;\n}"
  },
  {
    "name": "Loader Chasing Dots",
    "className": "roycss-loader-chasing-dots",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-chasing-dots {\n  width: 40px;\n  height: 40px;\n  position: relative;\n  animation: roy-chasing-rotate 2s infinite linear;\n}\n@keyframes roy-chasing-rotate {\n  100% { transform: rotate(360deg); }"
  },
  {
    "name": "Loader Circle Fade",
    "className": "roycss-loader-circle-fade",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-circle-fade {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: transparent;\n  box-shadow:\n    0 -20px 0 0 #10b981,\n    14px -14px 0 0 rgba(16, 185, 129, 0.85),\n    20px 0 0 0 rgba(16, 185, 129, 0.65),\n    14px 14px 0 0 rgba(16, 185, 129, 0.45),\n    0 20px 0 0 rgba(16, 185, 129, 0.3),\n    -14px 14px 0 0 rgba(16, 185, 129, 0.45),\n    -20px 0 0 0 rgba(16, 185, 129, 0.65),\n    -14px -14px 0 0 rgba(16, 185, 129, 0.85);\n  animation: roy-circle-fade-spin 2s linear infinite;\n}\n@keyframes roy-circle-fade-spin {\n  to { transform: rotate(360deg); }"
  },
  {
    "name": "Loader Circle Notch",
    "className": "roycss-loader-circle-notch",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-circle-notch {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  border: 4px solid #10b981;\n  border-top-color: transparent;\n  border-left-color: transparent;\n  animation: roy-circle-notch 0.9s linear infinite;\n}\n@keyframes roy-circle-notch {\n  0% { transform: rotate(0deg); }"
  },
  {
    "name": "Loader Clock",
    "className": "roycss-loader-clock",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-clock {\n  position: relative;\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  border: 3px solid #10b981;\n  background: transparent;\n}"
  },
  {
    "name": "Loader Cube",
    "className": "roycss-loader-cube",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-cube {\n  width: 40px;\n  height: 40px;\n  position: relative;\n  transform-style: preserve-3d;\n  animation: roy-loader-cube-rotate 4s linear infinite;\n}\n@keyframes roy-loader-cube-rotate {\n  0% { transform: perspective(400px) rotateX(0deg) rotateY(0deg); }"
  },
  {
    "name": "Loader Dots",
    "className": "roycss-loader-dots",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-dots {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n}"
  },
  {
    "name": "Loader Dual Ring",
    "className": "roycss-loader-dual-ring",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-dual-ring {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  border: 4px solid rgba(16, 185, 129, 0.15);\n  border-top-color: #10b981;\n  border-bottom-color: #06b6d4;\n  animation: roy-dual-ring-spin 1.2s linear infinite;\n}\n@keyframes roy-dual-ring-spin {\n  to { transform: rotate(360deg); }"
  },
  {
    "name": "Loader Fading Dots",
    "className": "roycss-loader-fading-dots",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-fading-dots {\n  width: 80px;\n  text-align: center;\n}"
  },
  {
    "name": "Loader Folding Cube",
    "className": "roycss-loader-folding-cube",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-folding-cube {\n  width: 40px;\n  height: 40px;\n  position: relative;\n  transform: rotateZ(45deg);\n}"
  },
  {
    "name": "Loader Grid",
    "className": "roycss-loader-grid",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-grid {\n  width: 40px;\n  height: 40px;\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n  grid-template-rows: 1fr 1fr 1fr;\n  gap: 4px;\n}"
  },
  {
    "name": "Loader Indeterminate",
    "className": "roycss-loader-indeterminate",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-indeterminate {\n  width: 200px;\n  height: 4px;\n  background-color: rgba(16, 185, 129, 0.15);\n  border-radius: 2px;\n  position: relative;\n  overflow: hidden;\n}"
  },
  {
    "name": "Loader Line Scale",
    "className": "roycss-loader-line-scale",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-line-scale {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n  height: 40px;\n}"
  },
  {
    "name": "Loader Orbit",
    "className": "roycss-loader-orbit",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-orbit {\n  width: 40px;\n  height: 40px;\n  position: relative;\n}"
  },
  {
    "name": "Loader Pacman",
    "className": "roycss-loader-pacman",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-pacman {\n  position: relative;\n  width: 60px;\n  height: 40px;\n}"
  },
  {
    "name": "Loader Progress Bar",
    "className": "roycss-loader-progress-bar",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-progress-bar {\n  width: 200px;\n  height: 8px;\n  background-color: rgba(16, 185, 129, 0.15);\n  border-radius: 4px;\n  position: relative;\n  overflow: hidden;\n}"
  },
  {
    "name": "Loader Pulse Ring",
    "className": "roycss-loader-pulse-ring",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-pulse-ring {\n  width: 40px;\n  height: 40px;\n  position: relative;\n}"
  },
  {
    "name": "Loader Ripple",
    "className": "roycss-loader-ripple",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-ripple {\n  position: relative;\n  width: 64px;\n  height: 64px;\n}"
  },
  {
    "name": "Loader Skeleton",
    "className": "roycss-loader-skeleton",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-skeleton {\n  width: 200px;\n  height: 12px;\n  background-color: rgba(255, 255, 255, 0.06);\n  border-radius: 4px;\n  position: relative;\n  overflow: hidden;\n}"
  },
  {
    "name": "Loader Spinner",
    "className": "roycss-loader-spinner",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-spinner {\n  width: 40px;\n  height: 40px;\n  border: 3px solid rgba(16, 185, 129, 0.2);\n  border-top-color: #10b981;\n  border-radius: 50%;\n  animation: roy-spin 0.8s linear infinite;\n}\n@keyframes roy-spin {\n  to { transform: rotate(360deg); }"
  },
  {
    "name": "Loader Square Spin",
    "className": "roycss-loader-square-spin",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-square-spin {\n  width: 40px;\n  height: 40px;\n  background-color: #10b981;\n  border-radius: 4px;\n  animation: roy-square-spin 3s ease-in-out infinite;\n}\n@keyframes roy-square-spin {\n  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }"
  },
  {
    "name": "Loader Three Bounce",
    "className": "roycss-loader-three-bounce",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-three-bounce {\n  width: 80px;\n  text-align: center;\n}"
  },
  {
    "name": "Loader Typing",
    "className": "roycss-loader-typing",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-typing {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n  background-color: rgba(16, 185, 129, 0.1);\n  padding: 8px 12px;\n  border-radius: 16px;\n}"
  },
  {
    "name": "Loader Whale",
    "className": "roycss-loader-whale",
    "category": "loading",
    "displayType": "loader",
    "css": ".roycss-loader-whale {\n  width: 50px;\n  height: 40px;\n  position: relative;\n}"
  }
] as FerrumCSSEffect[];
