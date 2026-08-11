// ============================================================
// RoyCSS v3.0 — Full effect data (includes CSS strings)
// Effects: 542 | Categories: 35
// Do not edit manually.
// ============================================================

import type { FerrumCSSEffect } from "./types";

// Re-exports removed — consumers import categories directly from ./ferrum-effects-index

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
  },
  {
    "name": "Bounce Rotate",
    "className": "roycss-bounce-rotate",
    "category": "attention",
    "displayType": "box",
    "css": ".roycss-bounce-rotate {\n  animation: roy-bounce-rotate 1.1s cubic-bezier(0.28, 1.42, 0.55, 1) both;\n}\n@keyframes roy-bounce-rotate {\n  0% {\n    opacity: 0;\n    transform: scale(0.3) rotate(-180deg);\n  }"
  },
  {
    "name": "Breathe",
    "className": "roycss-breathe",
    "category": "attention",
    "displayType": "box",
    "css": ".roycss-breathe {\n  animation: roy-breathe 4s ease-in-out infinite;\n}\n@keyframes roy-breathe {\n  0%, 100% { transform: scale(1); opacity: 0.85; }"
  },
  {
    "name": "Float",
    "className": "roycss-float",
    "category": "attention",
    "displayType": "box",
    "css": ".roycss-float {\n  animation: roy-float 3s ease-in-out infinite;\n}\n@keyframes roy-float {\n  0%, 100% {\n    transform: translateY(0);\n  }"
  },
  {
    "name": "Head Shake",
    "className": "roycss-head-shake",
    "category": "attention",
    "displayType": "box",
    "css": ".roycss-head-shake {\n  animation: roy-head-shake 1s ease-in-out;\n}\n@keyframes roy-head-shake {\n  0%, 100% { transform: translateX(0); }"
  },
  {
    "name": "Heartbeat",
    "className": "roycss-heartbeat",
    "category": "attention",
    "displayType": "box",
    "css": ".roycss-heartbeat {\n  animation: roy-heartbeat 1.5s ease-in-out infinite;\n}\n@keyframes roy-heartbeat {\n  0%, 100% { transform: scale(1); }"
  },
  {
    "name": "Jello",
    "className": "roycss-jello",
    "category": "attention",
    "displayType": "box",
    "css": ".roycss-jello {\n  animation: roy-jello 0.9s ease both;\n}\n@keyframes roy-jello {\n  0% { transform: scale3d(1, 1, 1); }"
  },
  {
    "name": "Jiggle",
    "className": "roycss-jiggle",
    "category": "attention",
    "displayType": "box",
    "css": ".roycss-jiggle {\n  animation: roy-jiggle 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;\n  transform-origin: center;\n}\n@keyframes roy-jiggle {\n  0%, 100% { transform: rotate(0deg); }"
  },
  {
    "name": "Pendulum",
    "className": "roycss-pendulum",
    "category": "attention",
    "displayType": "box",
    "css": ".roycss-pendulum {\n  animation: roy-pendulum 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;\n  transform-origin: top center;\n}\n@keyframes roy-pendulum {\n  0%   { transform: rotate(28deg); }"
  },
  {
    "name": "Pulse Glow",
    "className": "roycss-pulse-glow",
    "category": "attention",
    "displayType": "box",
    "css": ".roycss-pulse-glow {\n  animation: roy-pulse-glow 2s ease-in-out infinite;\n}\n@keyframes roy-pulse-glow {\n  0%, 100% {\n    box-shadow: 0 0 5px rgba(16, 185, 129, 0.3),\n                0 0 10px rgba(16, 185, 129, 0.1);\n  }"
  },
  {
    "name": "Pulse Soft",
    "className": "roycss-pulse-soft",
    "category": "attention",
    "displayType": "box",
    "css": ".roycss-pulse-soft {\n  animation: roy-pulse-soft 2.5s ease-in-out infinite;\n}\n@keyframes roy-pulse-soft {\n  0%, 100% { opacity: 1; }"
  },
  {
    "name": "Rubber Band",
    "className": "roycss-rubber-band",
    "category": "attention",
    "displayType": "box",
    "css": ".roycss-rubber-band {\n  animation: roy-rubber-band 1s ease infinite;\n}\n@keyframes roy-rubber-band {\n  0%, 100% { transform: scale3d(1, 1, 1); }"
  },
  {
    "name": "Shake",
    "className": "roycss-shake",
    "category": "attention",
    "displayType": "box",
    "css": ".roycss-shake {\n  animation: roy-shake 0.5s ease-in-out;\n}\n@keyframes roy-shake {\n  0%, 100% { transform: translateX(0); }"
  },
  {
    "name": "Stretch",
    "className": "roycss-stretch",
    "category": "attention",
    "displayType": "box",
    "css": ".roycss-stretch {\n  animation: roy-stretch 1.6s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;\n  transform-origin: center;\n}\n@keyframes roy-stretch {\n  0%, 100% { transform: scaleY(1) scaleX(1); }"
  },
  {
    "name": "Sway",
    "className": "roycss-sway",
    "category": "attention",
    "displayType": "box",
    "css": ".roycss-sway {\n  animation: roy-sway 4s ease-in-out infinite;\n  transform-origin: top center;\n}\n@keyframes roy-sway {\n  0%, 100% { transform: rotate(-4deg); }"
  },
  {
    "name": "Swing",
    "className": "roycss-swing",
    "category": "attention",
    "displayType": "box",
    "css": ".roycss-swing {\n  transform-origin: top center;\n  animation: roy-swing 1.2s ease-in-out infinite;\n}\n@keyframes roy-swing {\n  0%, 100% { transform: rotate(0deg); }"
  },
  {
    "name": "Tada",
    "className": "roycss-tada",
    "category": "attention",
    "displayType": "box",
    "css": ".roycss-tada {\n  animation: roy-tada 1s ease infinite;\n}\n@keyframes roy-tada {\n  0%, 100% { transform: scale(1) rotate(0); }"
  },
  {
    "name": "Vibrate",
    "className": "roycss-vibrate",
    "category": "attention",
    "displayType": "box",
    "css": ".roycss-vibrate {\n  animation: roy-vibrate 0.32s linear infinite;\n}\n@keyframes roy-vibrate {\n  0%   { transform: translate3d(0, 0, 0); }"
  },
  {
    "name": "Wiggle",
    "className": "roycss-wiggle",
    "category": "attention",
    "displayType": "box",
    "css": ".roycss-wiggle {\n  animation: roy-wiggle 0.8s ease-in-out infinite;\n}\n@keyframes roy-wiggle {\n  0%, 100% { transform: rotate(-3deg); }"
  },
  {
    "name": "Wobble",
    "className": "roycss-wobble",
    "category": "attention",
    "displayType": "box",
    "css": ".roycss-wobble {\n  animation: roy-wobble 1s ease-in-out infinite;\n}\n@keyframes roy-wobble {\n  0%, 100% { transform: translateX(0) rotate(0deg); }"
  },
  {
    "name": "Background Animated Gradient",
    "className": "roycss-bg-animated-gradient",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-animated-gradient {\n  background: linear-gradient(-45deg, #065f46, #10b981, #06b6d4, #8b5cf6);\n  background-size: 400% 400%;\n  animation: roy-gradient-shift 8s ease infinite;\n}\n@keyframes roy-gradient-shift {\n  0% { background-position: 0% 50%; }"
  },
  {
    "name": "Background Aurora",
    "className": "roycss-bg-aurora",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-aurora {\n  background: linear-gradient(135deg, #0f172a 0%, #0c1e2e 100%);\n  position: relative;\n  overflow: hidden;\n}"
  },
  {
    "name": "Background Checkerboard",
    "className": "roycss-bg-checkerboard",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-checkerboard {\n  background-color: #0f172a;\n  background-image:\n    linear-gradient(45deg, #10b981 25%, transparent 25%),\n    linear-gradient(-45deg, #10b981 25%, transparent 25%),\n    linear-gradient(45deg, transparent 75%, #10b981 75%),\n    linear-gradient(-45deg, transparent 75%, #10b981 75%);\n  background-size: 32px 32px;\n  background-position: 0 0, 0 16px, 16px -16px, -16px 0;\n}"
  },
  {
    "name": "Background Concentric",
    "className": "roycss-bg-concentric",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-concentric {\n  background: repeating-radial-gradient(\n    circle at center,\n    #10b981 0,\n    #10b981 8px,\n    #0f172a 8px,\n    #0f172a 16px\n  );\n}"
  },
  {
    "name": "Background Conic Gradient",
    "className": "roycss-bg-conic-gradient",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-conic-gradient {\n  background: conic-gradient(\n    from 0deg at 50% 50%,\n    #10b981,\n    #06b6d4,\n    #8b5cf6,\n    #ec4899,\n    #f59e0b,\n    #10b981\n  );\n  animation: roy-conic-hue 6s linear infinite;\n}\n@keyframes roy-conic-hue {\n  to { filter: hue-rotate(360deg); }"
  },
  {
    "name": "Background Diagonal Stripes",
    "className": "roycss-bg-diagonal-stripes",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-diagonal-stripes {\n  background-color: #0f172a;\n  background-image: repeating-linear-gradient(\n    -60deg,\n    #06b6d4 0,\n    #06b6d4 12px,\n    #0e7490 12px,\n    #0e7490 24px\n  );\n  background-size: 200% 200%;\n  animation: roy-diagonal-shift 6s linear infinite;\n}\n@keyframes roy-diagonal-shift {\n  from { background-position: 0 0; }"
  },
  {
    "name": "Background Dot Pattern",
    "className": "roycss-bg-dot-pattern",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-dot-pattern {\n  background-color: #0f172a;\n  background-image: radial-gradient(circle, #10b981 1px, transparent 1px);\n  background-size: 24px 24px;\n}"
  },
  {
    "name": "Background Gradient Pulse",
    "className": "roycss-bg-gradient-pulse",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-gradient-pulse {\n  background-color: #0f172a;\n  background-image:\n    radial-gradient(circle at 50% 50%, #10b981 0%, rgba(16, 185, 129, 0) 40%),\n    radial-gradient(circle at 30% 70%, #06b6d4 0%, rgba(6, 182, 212, 0) 40%),\n    radial-gradient(circle at 70% 30%, #8b5cf6 0%, rgba(139, 92, 246, 0) 40%);\n  animation: roy-gradient-pulse 4s ease-in-out infinite;\n}\n@keyframes roy-gradient-pulse {\n  0%, 100% { opacity: 0.7; }"
  },
  {
    "name": "Background Gradient Sweep",
    "className": "roycss-bg-gradient-sweep",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-gradient-sweep {\n  background: linear-gradient(\n    90deg,\n    #0f172a 0%,\n    #10b981 25%,\n    #06b6d4 50%,\n    #10b981 75%,\n    #0f172a 100%\n  );\n  background-size: 200% 100%;\n  animation: roy-gradient-sweep 4s linear infinite;\n}\n@keyframes roy-gradient-sweep {\n  from { background-position: 200% 0; }"
  },
  {
    "name": "Background Grid Lines",
    "className": "roycss-bg-grid-lines",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-grid-lines {\n  background-color: #0f172a;\n  background-image:\n    linear-gradient(rgba(16, 185, 129, 0.06) 1px, transparent 1px),\n    linear-gradient(90deg, rgba(16, 185, 129, 0.06) 1px, transparent 1px);\n  background-size: 48px 48px;\n}"
  },
  {
    "name": "Background Hexagon",
    "className": "roycss-bg-hexagon",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-hexagon {\n  background-color: #0f172a;\n  background-image: url(\"data:image/svg+xml,%3Csvg width='56' height='100' viewBox='0 0 56 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 0L56 16.18V50.5L28 66.68L0 50.5V16.18L28 0z' fill='none' stroke='%2310b981' stroke-width='1' opacity='0.5'/%3E%3Cpath d='M28 33.32L56 49.5V83.82L28 100L0 83.82V49.5L28 33.32z' fill='none' stroke='%2310b981' stroke-width='1' opacity='0.5'/%3E%3C/svg%3E\");\n  background-size: 56px 100px;\n}"
  },
  {
    "name": "Background Lava Lamp",
    "className": "roycss-bg-lava-lamp",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-lava-lamp {\n  background-color: #1a0b2e;\n  position: relative;\n  overflow: hidden;\n}"
  },
  {
    "name": "Background Mesh Gradient",
    "className": "roycss-bg-mesh-gradient",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-mesh-gradient {\n  background-color: #0f172a;\n  position: relative;\n  overflow: hidden;\n}"
  },
  {
    "name": "Background Noise",
    "className": "roycss-bg-noise",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-noise {\n  position: relative;\n  background-color: #0f172a;\n}"
  },
  {
    "name": "Background Plaid",
    "className": "roycss-bg-plaid",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-plaid {\n  background-color: #0f172a;\n  background-image:\n    repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(16, 185, 129, 0.4) 18px, rgba(16, 185, 129, 0.4) 20px),\n    repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(16, 185, 129, 0.4) 18px, rgba(16, 185, 129, 0.4) 20px),\n    repeating-linear-gradient(45deg, transparent, transparent 24px, rgba(6, 182, 212, 0.3) 24px, rgba(6, 182, 212, 0.3) 26px),\n    repeating-linear-gradient(-45deg, transparent, transparent 24px, rgba(6, 182, 212, 0.3) 24px, rgba(6, 182, 212, 0.3) 26px);\n}"
  },
  {
    "name": "Background Plasma",
    "className": "roycss-bg-plasma",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-plasma {\n  background-color: #0f172a;\n  background-image:\n    radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.4) 0%, transparent 40%),\n    radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.4) 0%, transparent 40%),\n    radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),\n    linear-gradient(135deg, #0f172a, #1a0b2e);\n  background-size: 150% 150%, 150% 150%, 200% 200%, 100% 100%;\n  animation: roy-plasma-flow 12s ease-in-out infinite;\n}\n@keyframes roy-plasma-flow {\n  0%, 100% { background-position: 0% 0%, 100% 100%, 50% 50%, 0 0; }"
  },
  {
    "name": "Background Radial Rays",
    "className": "roycss-bg-radial-rays",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-radial-rays {\n  background-color: #0f172a;\n  background-image: repeating-conic-gradient(\n    from 0deg at 50% 50%,\n    #10b981 0deg 4deg,\n    transparent 4deg 12deg\n  );\n}"
  },
  {
    "name": "Background Smoke",
    "className": "roycss-bg-smoke",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-smoke {\n  background-color: #0f172a;\n  position: relative;\n  overflow: hidden;\n}"
  },
  {
    "name": "Background Starfield",
    "className": "roycss-bg-starfield",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-starfield {\n  background-color: #050810;\n  background-image:\n    radial-gradient(2px 2px at 20px 30px, #ffffff, transparent),\n    radial-gradient(1px 1px at 40px 70px, #ffffff, transparent),\n    radial-gradient(1px 1px at 90px 40px, #ffffff, transparent),\n    radial-gradient(2px 2px at 130px 80px, #ffffff, transparent),\n    radial-gradient(1px 1px at 160px 30px, #ffffff, transparent),\n    radial-gradient(1px 1px at 50px 120px, #ffffff, transparent),\n    radial-gradient(2px 2px at 180px 100px, #ffffff, transparent),\n    radial-gradient(1px 1px at 220px 60px, #ffffff, transparent);\n  background-size: 250px 150px;\n  animation: roy-starfield-twinkle 3s ease-in-out infinite alternate;\n}\n@keyframes roy-starfield-twinkle {\n  from { opacity: 0.6; }"
  },
  {
    "name": "Background Stripes",
    "className": "roycss-bg-stripes",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-stripes {\n  background: repeating-linear-gradient(\n    45deg,\n    #10b981,\n    #10b981 10px,\n    #0f172a 10px,\n    #0f172a 20px\n  );\n}"
  },
  {
    "name": "Background Sunburst",
    "className": "roycss-bg-sunburst",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-sunburst {\n  background-color: #1a1205;\n  position: relative;\n  overflow: hidden;\n}"
  },
  {
    "name": "Background Sunset",
    "className": "roycss-bg-sunset",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-sunset {\n  background: linear-gradient(\n    180deg,\n    #0c1e2e 0%,\n    #5b2c6f 25%,\n    #c2185b 50%,\n    #f59e0b 75%,\n    #fde68a 100%\n  );\n  background-size: 100% 200%;\n  animation: roy-sunset-shift 8s ease-in-out infinite;\n}\n@keyframes roy-sunset-shift {\n  0%, 100% { background-position: 0% 0%; }"
  },
  {
    "name": "Background Triangles",
    "className": "roycss-bg-triangles",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-triangles {\n  background-color: #0f172a;\n  background-image:\n    linear-gradient(45deg, #10b981 25%, transparent 25%),\n    linear-gradient(-45deg, #06b6d4 25%, transparent 25%),\n    linear-gradient(45deg, transparent 75%, #06b6d4 75%),\n    linear-gradient(-45deg, transparent 75%, #10b981 75%);\n  background-size: 40px 40px;\n  background-position: 0 0, 0 20px, 20px -20px, -20px 0;\n}"
  },
  {
    "name": "Background Waves",
    "className": "roycss-bg-waves",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-waves {\n  background-color: #0c1e2e;\n  background-image: url(\"data:image/svg+xml,%3Csvg width='120' height='40' viewBox='0 0 120 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20 Q 30 0 60 20 T 120 20' stroke='%2310b981' stroke-width='1.5' fill='none' opacity='0.55'/%3E%3Cpath d='M0 30 Q 30 10 60 30 T 120 30' stroke='%2306b6d4' stroke-width='1.5' fill='none' opacity='0.45'/%3E%3C/svg%3E\");\n  background-size: 120px 40px;\n}"
  },
  {
    "name": "Background Zigzag",
    "className": "roycss-bg-zigzag",
    "category": "background",
    "displayType": "bg",
    "css": ".roycss-bg-zigzag {\n  background-color: #0f172a;\n  background-image:\n    linear-gradient(135deg, #10b981 25%, transparent 25%) -10px 0,\n    linear-gradient(225deg, #10b981 25%, transparent 25%) -10px 0,\n    linear-gradient(315deg, #10b981 25%, transparent 25%),\n    linear-gradient(45deg, #10b981 25%, transparent 25%);\n  background-size: 20px 20px;\n}"
  },
  {
    "name": "Mix Blend Difference",
    "className": "roycss-mix-blend-difference",
    "category": "blend-modes",
    "displayType": "box",
    "css": ".roycss-mix-blend-difference {\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  background: #0f172a;\n  position: relative;\n  overflow: hidden;\n  isolation: isolate;\n}"
  },
  {
    "name": "Mix Blend Exclusion",
    "className": "roycss-mix-blend-exclusion",
    "category": "blend-modes",
    "displayType": "box",
    "css": ".roycss-mix-blend-exclusion {\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  background:\n    conic-gradient(from 0deg, #f59e0b, #ec4899, #8b5cf6, #06b6d4, #f59e0b);\n  position: relative;\n  overflow: hidden;\n  isolation: isolate;\n}"
  },
  {
    "name": "Border Animated Dash",
    "className": "roycss-border-animated-dash",
    "category": "borders",
    "displayType": "box",
    "css": ".roycss-border-animated-dash {\n  width: 140px;\n  height: 80px;\n  background: #0f172a;\n  border: 3px dashed #10b981;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #d1fae5;\n  font-size: 12px;\n  font-weight: 600;\n  animation: roy-border-dash-glow 1.6s ease-in-out infinite;\n}\n@keyframes roy-border-dash-glow {\n  0%, 100% {\n    border-color: #10b981;\n    box-shadow: 0 0 5px rgba(16, 185, 129, 0.3);\n  }"
  },
  {
    "name": "Border Banner",
    "className": "roycss-border-banner",
    "category": "borders",
    "displayType": "box",
    "css": ".roycss-border-banner {\n  width: 140px;\n  height: 80px;\n  background: linear-gradient(135deg, #f59e0b, #ef4444);\n  clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 50%, 100% 100%, 0 100%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  font-size: 12px;\n  font-weight: 700;\n  padding-right: 16px;\n  box-sizing: border-box;\n}"
  },
  {
    "name": "Border Clip Path",
    "className": "roycss-border-clip-path",
    "category": "borders",
    "displayType": "box",
    "css": ".roycss-border-clip-path {\n  position: relative;\n  width: 140px;\n  height: 80px;\n  background: linear-gradient(135deg, #10b981, #06b6d4);\n  clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  font-size: 12px;\n  font-weight: 600;\n}"
  },
  {
    "name": "Border Corner Brackets",
    "className": "roycss-border-corner-brackets",
    "category": "borders",
    "displayType": "box",
    "css": ".roycss-border-corner-brackets {\n  position: relative;\n  width: 140px;\n  height: 80px;\n  background: #0f172a;\n  background-image:\n    linear-gradient(#06b6d4, #06b6d4),\n    linear-gradient(#06b6d4, #06b6d4),\n    linear-gradient(#06b6d4, #06b6d4),\n    linear-gradient(#06b6d4, #06b6d4),\n    linear-gradient(#06b6d4, #06b6d4),\n    linear-gradient(#06b6d4, #06b6d4),\n    linear-gradient(#06b6d4, #06b6d4),\n    linear-gradient(#06b6d4, #06b6d4);\n  background-position:\n    top left, top left,\n    top right, top right,\n    bottom left, bottom left,\n    bottom right, bottom right;\n  background-size:\n    22px 3px, 3px 22px,\n    22px 3px, 3px 22px,\n    22px 3px, 3px 22px,\n    22px 3px, 3px 22px;\n  background-repeat: no-repeat;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #67e8f9;\n  font-size: 12px;\n  font-weight: 600;\n}"
  },
  {
    "name": "Border Dashed Draw",
    "className": "roycss-border-dashed-draw",
    "category": "borders",
    "displayType": "box",
    "css": ".roycss-border-dashed-draw {\n  position: relative;\n  width: 140px;\n  height: 80px;\n  background: #0f172a;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #a78bfa;\n  font-size: 12px;\n  font-weight: 600;\n}"
  },
  {
    "name": "Border Double Glow",
    "className": "roycss-border-double-glow",
    "category": "borders",
    "displayType": "box",
    "css": ".roycss-border-double-glow {\n  position: relative;\n  width: 140px;\n  height: 80px;\n  background: #0f172a;\n  border: 1px solid #10b981;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #6ee7b7;\n  font-size: 12px;\n  font-weight: 600;\n  box-shadow: 0 0 12px rgba(16, 185, 129, 0.5), 0 0 24px rgba(16, 185, 129, 0.3), inset 0 0 12px rgba(16, 185, 129, 0.2);\n}"
  },
  {
    "name": "Border Frame",
    "className": "roycss-border-frame",
    "category": "borders",
    "displayType": "box",
    "css": ".roycss-border-frame {\n  position: relative;\n  width: 140px;\n  height: 80px;\n  background: #1e293b;\n  border: 3px double #f59e0b;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fde68a;\n  font-size: 12px;\n  font-weight: 600;\n  outline: 1px solid #f59e0b;\n  outline-offset: 4px;\n}"
  },
  {
    "name": "Border Gradient Animated",
    "className": "roycss-border-gradient-animated",
    "category": "borders",
    "displayType": "box",
    "css": ".roycss-border-gradient-animated {\n  position: relative;\n  width: 140px;\n  height: 80px;\n  background: #0f172a;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #e2e8f0;\n  font-size: 12px;\n  font-weight: 600;\n}"
  },
  {
    "name": "Border Inset Glow",
    "className": "roycss-border-inset-glow",
    "category": "borders",
    "displayType": "box",
    "css": ".roycss-border-inset-glow {\n  width: 140px;\n  height: 80px;\n  background: #0a0a0a;\n  border: 1px solid rgba(6, 182, 212, 0.5);\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #67e8f9;\n  font-size: 12px;\n  font-weight: 600;\n  box-shadow:\n    inset 0 0 22px rgba(6, 182, 212, 0.4),\n    inset 0 0 4px rgba(6, 182, 212, 0.7);\n}"
  },
  {
    "name": "Border Marching Ants",
    "className": "roycss-border-marching-ants",
    "category": "borders",
    "displayType": "box",
    "css": ".roycss-border-marching-ants {\n  width: 140px;\n  height: 80px;\n  background-color: #0f172a;\n  background-image:\n    repeating-linear-gradient(90deg, #f59e0b 0 6px, transparent 6px 12px),\n    repeating-linear-gradient(90deg, #f59e0b 0 6px, transparent 6px 12px),\n    repeating-linear-gradient(0deg, #f59e0b 0 6px, transparent 6px 12px),\n    repeating-linear-gradient(0deg, #f59e0b 0 6px, transparent 6px 12px);\n  background-position: 0 0, 0 100%, 0 0, 100% 0;\n  background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;\n  background-size: 12px 2px, 12px 2px, 2px 12px, 2px 12px;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fde68a;\n  font-size: 12px;\n  font-weight: 600;\n  animation: roy-border-march 0.7s linear infinite;\n}\n@keyframes roy-border-march {\n  to {\n    background-position: 12px 0, -12px 100%, 0 -12px, 100% 12px;\n  }"
  },
  {
    "name": "Border Neon Pulse",
    "className": "roycss-border-neon-pulse",
    "category": "borders",
    "displayType": "box",
    "css": ".roycss-border-neon-pulse {\n  width: 140px;\n  height: 80px;\n  background: #0a0a0a;\n  border: 2px solid #ec4899;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #f9a8d4;\n  font-size: 12px;\n  font-weight: 600;\n  animation: roy-border-neon 1.5s ease-in-out infinite;\n}\n@keyframes roy-border-neon {\n  0%, 100% {\n    border-color: #ec4899;\n    box-shadow: 0 0 5px #ec4899, inset 0 0 5px #ec4899;\n  }"
  },
  {
    "name": "Border Polaroid",
    "className": "roycss-border-polaroid",
    "category": "borders",
    "displayType": "box",
    "css": ".roycss-border-polaroid {\n  width: 140px;\n  height: 110px;\n  background: #fff;\n  padding: 8px 8px 30px;\n  box-sizing: border-box;\n  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transform: rotate(-4deg);\n}"
  },
  {
    "name": "Border Ribbon",
    "className": "roycss-border-ribbon",
    "category": "borders",
    "displayType": "box",
    "css": ".roycss-border-ribbon {\n  width: 140px;\n  height: 90px;\n  background: #ef4444;\n  clip-path: polygon(0 0, 100% 0, 100% 100%, 52% 78%, 0 100%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  font-size: 12px;\n  font-weight: 700;\n  padding-bottom: 14px;\n  box-sizing: border-box;\n}"
  },
  {
    "name": "Border Sticker",
    "className": "roycss-border-sticker",
    "category": "borders",
    "displayType": "box",
    "css": ".roycss-border-sticker {\n  width: 140px;\n  height: 80px;\n  background: linear-gradient(135deg, #10b981, #06b6d4);\n  border: 6px solid #fff;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #fff;\n  font-size: 12px;\n  font-weight: 700;\n  box-shadow: 0 5px 14px rgba(0, 0, 0, 0.3);\n  transform: rotate(-3deg);\n}"
  },
  {
    "name": "Border Torn Paper",
    "className": "roycss-border-torn-paper",
    "category": "borders",
    "displayType": "box",
    "css": ".roycss-border-torn-paper {\n  width: 140px;\n  height: 80px;\n  background: #f8fafc;\n  color: #1e293b;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  font-weight: 700;\n  clip-path: polygon(\n    0% 6%, 5% 0%, 12% 6%, 20% 1%, 28% 5%, 35% 0%, 42% 4%, 50% 1%, 58% 5%, 65% 0%, 72% 4%, 80% 1%, 88% 5%, 95% 0%, 100% 6%,\n    100% 94%, 95% 100%, 88% 94%, 80% 99%, 72% 95%, 65% 100%, 58% 96%, 50% 99%, 42% 95%, 35% 100%, 28% 96%, 20% 99%, 12% 95%, 5% 100%, 0% 94%\n  );\n  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));\n}"
  },
  {
    "name": "Button 3D Push",
    "className": "roycss-btn-3d-push",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-3d-push {\n  position: relative;\n  background: #84cc16;\n  color: #1a2e05;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 10px;\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 14px;\n  box-shadow: 0 5px 0 #65a30d, 0 7px 14px rgba(0, 0, 0, 0.25);\n  transition: transform 0.18s ease, box-shadow 0.18s ease;\n}"
  },
  {
    "name": "Button Arrow Slide",
    "className": "roycss-btn-arrow-slide",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-arrow-slide {\n  background: #f97316;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  transition: gap 0.3s ease, background 0.3s ease;\n}"
  },
  {
    "name": "Button Border Draw",
    "className": "roycss-btn-border-draw",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-border-draw {\n  position: relative;\n  background: transparent;\n  color: #10b981;\n  border: 2px solid transparent;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  z-index: 1;\n}"
  },
  {
    "name": "Button Border Glow",
    "className": "roycss-btn-border-glow",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-border-glow {\n  background: #1e293b;\n  color: #14b8a6;\n  border: 2px solid rgba(20, 184, 166, 0.35);\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transition: all 0.3s ease;\n}"
  },
  {
    "name": "Button Bounce",
    "className": "roycss-btn-bounce",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-bounce {\n  background: #f59e0b;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n}"
  },
  {
    "name": "Button Expand",
    "className": "roycss-btn-expand",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-expand {\n  background: #10b981;\n  color: #fff;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  letter-spacing: 0;\n  transition: all 0.4s ease;\n}"
  },
  {
    "name": "Button Fill Slide",
    "className": "roycss-btn-fill-slide",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-fill-slide {\n  position: relative;\n  overflow: hidden;\n  z-index: 1;\n  background: transparent;\n  color: #10b981;\n  border: 2px solid #10b981;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transition: color 0.4s ease;\n}"
  },
  {
    "name": "Button Flip",
    "className": "roycss-btn-flip",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-flip {\n  background: #ec4899;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transform-style: preserve-3d;\n  transition: transform 0.6s ease, background 0.3s ease;\n}"
  },
  {
    "name": "Button Glow",
    "className": "roycss-btn-glow",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-glow {\n  background: #10b981;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transition: all 0.3s ease;\n}"
  },
  {
    "name": "Button Gradient",
    "className": "roycss-btn-gradient",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-gradient {\n  background: linear-gradient(45deg, #10b981, #06b6d4, #8b5cf6, #ec4899, #10b981);\n  background-size: 300% 300%;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  animation: roy-btn-gradient 5s ease infinite;\n  transition: transform 0.3s ease;\n}\n@keyframes roy-btn-gradient {\n  0% { background-position: 0% 50%; }"
  },
  {
    "name": "Button Icon Slide",
    "className": "roycss-btn-icon-slide",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-icon-slide {\n  background: #d946ef;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  display: inline-flex;\n  align-items: center;\n  gap: 0;\n  transition: padding 0.3s ease, gap 0.3s ease;\n}"
  },
  {
    "name": "Button Lift",
    "className": "roycss-btn-lift",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-lift {\n  background: #14b8a6;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  box-shadow: 0 4px 10px rgba(20, 184, 166, 0.25);\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n}"
  },
  {
    "name": "Button Liquid",
    "className": "roycss-btn-liquid",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-liquid {\n  background: #06b6d4;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 30px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transition: border-radius 0.4s ease, background 0.4s ease;\n}"
  },
  {
    "name": "Button Morph",
    "className": "roycss-btn-morph",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-morph {\n  background: #8b5cf6;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transition: all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);\n}"
  },
  {
    "name": "Button Neon",
    "className": "roycss-btn-neon",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-neon {\n  background: #0a0a0a;\n  color: #06b6d4;\n  border: 2px solid #06b6d4;\n  padding: 10px 24px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 14px;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n  box-shadow: 0 0 5px #06b6d4, inset 0 0 5px rgba(6, 182, 212, 0.4);\n  text-shadow: 0 0 5px #06b6d4;\n  transition: all 0.3s ease;\n}"
  },
  {
    "name": "Button Outline Fill",
    "className": "roycss-btn-outline-fill",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-outline-fill {\n  position: relative;\n  background: transparent;\n  color: #f43f5e;\n  border: 2px solid #f43f5e;\n  padding: 10px 24px;\n  border-radius: 30px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  overflow: hidden;\n  z-index: 1;\n  transition: color 0.4s ease;\n}"
  },
  {
    "name": "Button Press",
    "className": "roycss-btn-press",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-press {\n  background: #8b5cf6;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  box-shadow: 0 6px 0 #6d28d9, 0 8px 14px rgba(0, 0, 0, 0.25);\n  transition: transform 0.1s ease, box-shadow 0.1s ease;\n}"
  },
  {
    "name": "Button Pulse",
    "className": "roycss-btn-pulse",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-pulse {\n  background: #ef4444;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transition: background 0.3s ease;\n}"
  },
  {
    "name": "Button Ripple",
    "className": "roycss-btn-ripple",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-ripple {\n  position: relative;\n  overflow: hidden;\n  background: #10b981;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n}"
  },
  {
    "name": "Button Rotate",
    "className": "roycss-btn-rotate",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-rotate {\n  background: #f59e0b;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transition: transform 0.3s ease, background 0.3s ease;\n}"
  },
  {
    "name": "Button Shadow Push",
    "className": "roycss-btn-shadow-push",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-shadow-push {\n  background: #ef4444;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 700;\n  font-size: 14px;\n  box-shadow: 5px 5px 0 #7f1d1d;\n  transition: transform 0.12s ease, box-shadow 0.12s ease;\n}"
  },
  {
    "name": "Button Shine Sweep",
    "className": "roycss-btn-shine-sweep",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-shine-sweep {\n  position: relative;\n  overflow: hidden;\n  background: #10b981;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n}"
  },
  {
    "name": "Button Skew",
    "className": "roycss-btn-skew",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-skew {\n  background: #ec4899;\n  color: #fff;\n  border: none;\n  padding: 10px 24px;\n  border-radius: 8px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transition: transform 0.3s ease, background 0.3s ease;\n}"
  },
  {
    "name": "Button Slide Bg",
    "className": "roycss-btn-slide-bg",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-slide-bg {\n  position: relative;\n  overflow: hidden;\n  background: #0f172a;\n  color: #f59e0b;\n  border: 2px solid #f59e0b;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  z-index: 1;\n  transition: color 0.4s ease;\n}"
  },
  {
    "name": "Button Sparkle",
    "className": "roycss-btn-sparkle",
    "category": "buttons",
    "displayType": "button",
    "css": ".roycss-btn-sparkle {\n  position: relative;\n  background: #1e293b;\n  color: #fde68a;\n  border: 1px solid #f59e0b;\n  padding: 10px 24px;\n  border-radius: 12px;\n  cursor: pointer;\n  font-weight: 600;\n  font-size: 14px;\n  transition: color 0.3s ease, box-shadow 0.3s ease;\n}"
  },
  {
    "name": "Card Flip",
    "className": "roycss-card-flip",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-flip {\n  perspective: 1000px;\n  width: 200px;\n  height: 120px;\n}"
  },
  {
    "name": "Card Flip Back",
    "className": "roycss-card-flip-back",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-flip-back {\n  transform: rotateY(180deg);\n}"
  },
  {
    "name": "Card Flip Inner",
    "className": "roycss-card-flip-inner",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-flip-inner {\n  transform: rotateY(180deg);\n}"
  },
  {
    "name": "Card Glassmorphism",
    "className": "roycss-card-glassmorphism",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-glassmorphism {\n  background: rgba(255, 255, 255, 0.08);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  border-radius: 16px;\n  padding: 24px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);\n  color: #f1f5f9;\n}"
  },
  {
    "name": "Card Gradient Border",
    "className": "roycss-card-gradient-border",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-gradient-border {\n  position: relative;\n  background: #0f172a;\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n}"
  },
  {
    "name": "Card Hover Border",
    "className": "roycss-card-hover-border",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-hover-border {\n  position: relative;\n  background: #1e293b;\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n}"
  },
  {
    "name": "Card Hover Color",
    "className": "roycss-card-hover-color",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-hover-color {\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  transition: background 0.5s ease, color 0.5s ease, border-color 0.5s ease;\n}"
  },
  {
    "name": "Card Hover Fade",
    "className": "roycss-card-hover-fade",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-hover-fade {\n  position: relative;\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  overflow: hidden;\n}"
  },
  {
    "name": "Card Hover Flip",
    "className": "roycss-card-hover-flip",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-hover-flip {\n  background: #1e293b;\n  border: 1px solid rgba(16, 185, 129, 0.3);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  transform-style: preserve-3d;\n  transition: transform 0.7s ease, background 0.4s ease, color 0.4s ease;\n}"
  },
  {
    "name": "Card Hover Glow",
    "className": "roycss-card-hover-glow",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-hover-glow {\n  background: #0f172a;\n  border: 1px solid rgba(16, 185, 129, 0.2);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  transition: box-shadow 0.4s ease, border-color 0.4s ease;\n}"
  },
  {
    "name": "Card Hover Lift",
    "className": "roycss-card-hover-lift",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-hover-lift {\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;\n}"
  },
  {
    "name": "Card Hover Press",
    "className": "roycss-card-hover-press",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-hover-press {\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  box-shadow: 0 12px 22px rgba(0, 0, 0, 0.3);\n  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;\n}"
  },
  {
    "name": "Card Hover Push",
    "className": "roycss-card-hover-push",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-hover-push {\n  position: relative;\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  transform-style: preserve-3d;\n  transition: transform 0.35s ease;\n}"
  },
  {
    "name": "Card Hover Reveal",
    "className": "roycss-card-hover-reveal",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-hover-reveal {\n  position: relative;\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  overflow: hidden;\n}"
  },
  {
    "name": "Card Hover Rotate",
    "className": "roycss-card-hover-rotate",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-hover-rotate {\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  perspective: 800px;\n  transform-style: preserve-3d;\n  transition: transform 0.4s ease, box-shadow 0.4s ease;\n}"
  },
  {
    "name": "Card Hover Skew",
    "className": "roycss-card-hover-skew",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-hover-skew {\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  transition: transform 0.35s ease, background 0.35s ease, color 0.35s ease;\n}"
  },
  {
    "name": "Card Hover Slide",
    "className": "roycss-card-hover-slide",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-hover-slide {\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;\n}"
  },
  {
    "name": "Card Hover Swing",
    "className": "roycss-card-hover-swing",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-hover-swing {\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  transform-origin: top center;\n  transition: transform 0.3s ease;\n}"
  },
  {
    "name": "Card Hover Tada",
    "className": "roycss-card-hover-tada",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-hover-tada {\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  transition: transform 0.3s ease;\n}"
  },
  {
    "name": "Card Hover Wobble",
    "className": "roycss-card-hover-wobble",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-hover-wobble {\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n  transition: transform 0.3s ease;\n}"
  },
  {
    "name": "Card Hover Zoom",
    "className": "roycss-card-hover-zoom",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-hover-zoom {\n  background: linear-gradient(135deg, #134e4a, #1e293b);\n  border: 1px solid rgba(20, 184, 166, 0.25);\n  border-radius: 16px;\n  padding: 24px;\n  color: #ccfbf1;\n  transition: transform 0.4s ease, box-shadow 0.4s ease;\n}"
  },
  {
    "name": "Card Neon",
    "className": "roycss-card-neon",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-neon {\n  background: #0f172a;\n  border: 1px solid rgba(16, 185, 129, 0.3);\n  border-radius: 16px;\n  padding: 24px;\n  color: #d1fae5;\n  animation: roy-card-neon 2s ease-in-out infinite alternate;\n}\n@keyframes roy-card-neon {\n  from {\n    box-shadow: 0 0 5px rgba(16, 185, 129, 0.1), inset 0 0 5px rgba(16, 185, 129, 0.05);\n  }"
  },
  {
    "name": "Card Shuffle",
    "className": "roycss-card-shuffle",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-shuffle {\n  position: relative;\n  width: 200px;\n  height: 220px;\n  perspective: 1000px;\n}"
  },
  {
    "name": "Card Spotlight",
    "className": "roycss-card-spotlight",
    "category": "cards",
    "displayType": "card",
    "css": ".roycss-card-spotlight {\n  position: relative;\n  overflow: hidden;\n  background: #1e293b;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 16px;\n  padding: 24px;\n  color: #e2e8f0;\n}"
  },
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
  },
  {
    "name": "Cursor Arrow Bounce",
    "className": "roycss-cursor-arrow-bounce",
    "category": "cursor",
    "displayType": "box",
    "css": ".roycss-cursor-arrow-bounce {\n  position: relative;\n  background: radial-gradient(circle at 50% 50%, #2a1a08, #0b1020);\n  overflow: hidden;\n}"
  },
  {
    "name": "Cursor Blob",
    "className": "roycss-cursor-blob",
    "category": "cursor",
    "displayType": "box",
    "css": ".roycss-cursor-blob {\n  position: relative;\n  background: radial-gradient(circle at 50% 50%, #111827, #0b1020);\n  overflow: hidden;\n}"
  },
  {
    "name": "Cursor Crosshair",
    "className": "roycss-cursor-crosshair",
    "category": "cursor",
    "displayType": "box",
    "css": ".roycss-cursor-crosshair {\n  position: relative;\n  background:\n    linear-gradient(0deg, transparent 49.5%, rgba(148, 163, 184, 0.08) 49.5% 50.5%, transparent 50.5%),\n    linear-gradient(90deg, transparent 49.5%, rgba(148, 163, 184, 0.08) 49.5% 50.5%, transparent 50.5%),\n    radial-gradient(circle at 50% 50%, #1a0f1f, #0b1020);\n  overflow: hidden;\n}"
  },
  {
    "name": "Cursor Firefly",
    "className": "roycss-cursor-firefly",
    "category": "cursor",
    "displayType": "box",
    "css": ".roycss-cursor-firefly {\n  position: relative;\n  background: linear-gradient(135deg, #0a0f1f, #1a0f2e);\n  overflow: hidden;\n}"
  },
  {
    "name": "Cursor Glow Dot",
    "className": "roycss-cursor-glow-dot",
    "category": "cursor",
    "displayType": "box",
    "css": ".roycss-cursor-glow-dot {\n  position: relative;\n  background: radial-gradient(circle at 50% 50%, #111827, #0b1020);\n  overflow: hidden;\n}"
  },
  {
    "name": "Cursor Gradient Trail",
    "className": "roycss-cursor-gradient-trail",
    "category": "cursor",
    "displayType": "box",
    "css": ".roycss-cursor-gradient-trail {\n  position: relative;\n  background: radial-gradient(circle at 50% 50%, #1a0f2e, #0b1020);\n  overflow: hidden;\n}"
  },
  {
    "name": "Cursor Magnetic",
    "className": "roycss-cursor-magnetic",
    "category": "cursor",
    "displayType": "box",
    "css": ".roycss-cursor-magnetic {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: linear-gradient(135deg, #0b1020, #111827);\n  border: 1px solid rgba(148, 163, 184, 0.25);\n  border-radius: 10px;\n  cursor: pointer;\n  transition:\n    transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),\n    border-color 0.3s ease,\n    box-shadow 0.3s ease;\n}"
  },
  {
    "name": "Cursor Pulse Ring",
    "className": "roycss-cursor-pulse-ring",
    "category": "cursor",
    "displayType": "box",
    "css": ".roycss-cursor-pulse-ring {\n  position: relative;\n  background: radial-gradient(circle at 50% 50%, #1f0f2e, #0b1020);\n  overflow: hidden;\n}"
  },
  {
    "name": "Cursor Ring",
    "className": "roycss-cursor-ring",
    "category": "cursor",
    "displayType": "box",
    "css": ".roycss-cursor-ring {\n  position: relative;\n  background: radial-gradient(circle at 50% 50%, #0c1426, #0b1020);\n  overflow: hidden;\n}"
  },
  {
    "name": "Cursor Ripple",
    "className": "roycss-cursor-ripple",
    "category": "cursor",
    "displayType": "box",
    "css": ".roycss-cursor-ripple {\n  position: relative;\n  background: radial-gradient(circle at 50% 50%, #0c2a1f, #0b1020);\n  overflow: hidden;\n}"
  },
  {
    "name": "Cursor Spotlight",
    "className": "roycss-cursor-spotlight",
    "category": "cursor",
    "displayType": "box",
    "css": ".roycss-cursor-spotlight {\n  position: relative;\n  background: linear-gradient(135deg, #0f172a, #1e1b4b);\n  overflow: hidden;\n}"
  },
  {
    "name": "Cursor Trail",
    "className": "roycss-cursor-trail",
    "category": "cursor",
    "displayType": "box",
    "css": ".roycss-cursor-trail {\n  position: relative;\n  background: radial-gradient(circle at 50% 50%, #1a0f2e, #0b1020);\n  overflow: hidden;\n}"
  },
  {
    "name": "Apple Bounce Settle",
    "className": "roycss-apple-bounce-settle",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-apple-bounce-settle {\n  animation: roy-apple-bounce-settle 1.2s cubic-bezier(0.28, 0.84, 0.42, 1) both;\n}\n@keyframes roy-apple-bounce-settle {\n  0% { transform: translateY(-120%); opacity: 0; }"
  },
  {
    "name": "Apple Elastic Scale",
    "className": "roycss-apple-elastic-scale",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-apple-elastic-scale {\n  animation: roy-apple-elastic 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;\n}\n@keyframes roy-apple-elastic {\n  0% { transform: scale(0); opacity: 0; }"
  },
  {
    "name": "Apple Flip Spring",
    "className": "roycss-apple-flip-spring",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-apple-flip-spring {\n  perspective: 1000px;\n  animation: roy-apple-flip-spring 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n  transform-style: preserve-3d;\n}\n@keyframes roy-apple-flip-spring {\n  0% { opacity: 0; transform: rotateY(-90deg) scale(0.85); }"
  },
  {
    "name": "Apple Frosted Vibrancy",
    "className": "roycss-apple-frosted-vibrancy",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-apple-frosted-vibrancy {\n  background: rgba(255, 255, 255, 0.55);\n  backdrop-filter: blur(30px) saturate(180%);\n  -webkit-backdrop-filter: blur(30px) saturate(180%);\n  border: 1px solid rgba(255, 255, 255, 0.4);\n  border-radius: 14px;\n  box-shadow:\n    0 1px 0 rgba(255, 255, 255, 0.6) inset,\n    0 10px 30px rgba(0, 0, 0, 0.15);\n  color: #1d1d1f;\n}"
  },
  {
    "name": "Apple Material Thick",
    "className": "roycss-apple-material-thick",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-apple-material-thick {\n  background: rgba(245, 245, 247, 0.75);\n  backdrop-filter: blur(40px) saturate(200%);\n  -webkit-backdrop-filter: blur(40px) saturate(200%);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 16px;\n  box-shadow:\n    0 1px 0 rgba(255, 255, 255, 0.5) inset,\n    0 20px 50px rgba(0, 0, 0, 0.2);\n  color: #1d1d1f;\n}"
  },
  {
    "name": "Apple Material Thin",
    "className": "roycss-apple-material-thin",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-apple-material-thin {\n  background: rgba(250, 250, 252, 0.5);\n  backdrop-filter: blur(12px) saturate(120%);\n  -webkit-backdrop-filter: blur(12px) saturate(120%);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: 12px;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);\n  color: #1d1d1f;\n}"
  },
  {
    "name": "Apple Sidebar Material",
    "className": "roycss-apple-sidebar-material",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-apple-sidebar-material {\n  background: linear-gradient(\n    180deg,\n    rgba(245, 245, 247, 0.7) 0%,\n    rgba(235, 235, 240, 0.6) 100%\n  );\n  backdrop-filter: blur(40px) saturate(150%);\n  -webkit-backdrop-filter: blur(40px) saturate(150%);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: 12px;\n  box-shadow:\n    inset 1px 0 0 rgba(255, 255, 255, 0.5),\n    0 6px 20px rgba(0, 0, 0, 0.1);\n  color: #1d1d1f;\n}"
  },
  {
    "name": "Apple Squish In",
    "className": "roycss-apple-squish-in",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-apple-squish-in {\n  animation: roy-apple-squish-in 0.7s cubic-bezier(0.32, 0.72, 0, 1) both;\n}\n@keyframes roy-apple-squish-in {\n  0% { opacity: 0; transform: translateY(60px) scale(0.8, 0.85); }"
  },
  {
    "name": "Apple Squish Out",
    "className": "roycss-apple-squish-out",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-apple-squish-out {\n  animation: roy-apple-squish-out 0.55s cubic-bezier(0.32, 0.72, 0, 1) both;\n}\n@keyframes roy-apple-squish-out {\n  0% { opacity: 1; transform: scale(1); }"
  },
  {
    "name": "Apple Ultra Thin",
    "className": "roycss-apple-ultra-thin",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-apple-ultra-thin {\n  background: rgba(255, 255, 255, 0.4);\n  backdrop-filter: blur(8px) saturate(110%);\n  -webkit-backdrop-filter: blur(8px) saturate(110%);\n  border: 1px solid rgba(255, 255, 255, 0.6);\n  border-radius: 10px;\n  box-shadow:\n    0 1px 0 rgba(255, 255, 255, 0.5) inset,\n    0 2px 8px rgba(0, 0, 0, 0.06);\n  color: #1d1d1f;\n}"
  },
  {
    "name": "Apple Vibrancy Dark",
    "className": "roycss-apple-vibrancy-dark",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-apple-vibrancy-dark {\n  background: rgba(30, 30, 32, 0.55);\n  backdrop-filter: blur(24px) saturate(180%) brightness(0.95);\n  -webkit-backdrop-filter: blur(24px) saturate(180%) brightness(0.95);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 14px;\n  box-shadow:\n    0 1px 0 rgba(255, 255, 255, 0.08) inset,\n    0 10px 30px rgba(0, 0, 0, 0.4);\n  color: #f5f5f7;\n}"
  },
  {
    "name": "Apple Vibrancy Light",
    "className": "roycss-apple-vibrancy-light",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-apple-vibrancy-light {\n  background: rgba(255, 255, 255, 0.6);\n  backdrop-filter: blur(20px) saturate(180%) brightness(1.05);\n  -webkit-backdrop-filter: blur(20px) saturate(180%) brightness(1.05);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: 14px;\n  box-shadow:\n    0 1px 0 rgba(255, 255, 255, 0.7) inset,\n    0 10px 30px rgba(0, 0, 0, 0.1);\n  color: #1d1d1f;\n}"
  },
  {
    "name": "Linear Aurora Glow",
    "className": "roycss-linear-aurora-glow",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-linear-aurora-glow {\n  position: relative;\n  background: #0a0a0b;\n  overflow: hidden;\n}"
  },
  {
    "name": "Linear Card Lift",
    "className": "roycss-linear-card-lift",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-linear-card-lift {\n  background: #18181b;\n  color: #fafafa;\n  border: 1px solid #27272a;\n  border-radius: 14px;\n  box-shadow: 0 0 0 0 rgba(94, 106, 210, 0);\n  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),\n              box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1),\n              border-color 0.35s ease;\n}"
  },
  {
    "name": "Linear Dark Surface",
    "className": "roycss-linear-dark-surface",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-linear-dark-surface {\n  background: linear-gradient(180deg, #18181b 0%, #0f0f10 100%);\n  color: #e4e4e7;\n  border: 1px solid #27272a;\n  border-radius: 12px;\n  box-shadow:\n    0 1px 0 rgba(255, 255, 255, 0.04) inset,\n    0 4px 16px rgba(0, 0, 0, 0.5);\n}"
  },
  {
    "name": "Linear Depth Shadow",
    "className": "roycss-linear-depth-shadow",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-linear-depth-shadow {\n  background: #18181b;\n  color: #fafafa;\n  border: 1px solid #27272a;\n  border-radius: 12px;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);\n  transition: box-shadow 0.4s ease, transform 0.4s ease;\n}"
  },
  {
    "name": "Linear Glow Border",
    "className": "roycss-linear-glow-border",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-linear-glow-border {\n  position: relative;\n  background: #111113;\n  color: #fafafa;\n  border-radius: 12px;\n  z-index: 0;\n}"
  },
  {
    "name": "Linear Gradient Mesh Bg",
    "className": "roycss-linear-gradient-mesh-bg",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-linear-gradient-mesh-bg {\n  background-color: #0a0a0b;\n  background-image:\n    radial-gradient(at 20% 20%, rgba(94, 106, 210, 0.35) 0px, transparent 50%),\n    radial-gradient(at 80% 10%, rgba(139, 92, 246, 0.3) 0px, transparent 50%),\n    radial-gradient(at 70% 80%, rgba(236, 72, 153, 0.25) 0px, transparent 50%),\n    radial-gradient(at 10% 90%, rgba(59, 130, 246, 0.25) 0px, transparent 50%);\n  background-size: 200% 200%;\n  animation: roy-mesh-drift 18s ease-in-out infinite;\n}\n@keyframes roy-mesh-drift {\n  0%, 100% { background-position: 0% 0%, 100% 0%, 100% 100%, 0% 100%; }"
  },
  {
    "name": "Linear Gradient Sweep",
    "className": "roycss-linear-gradient-sweep",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-linear-gradient-sweep {\n  position: relative;\n  background: #18181b;\n  color: #fafafa;\n  border: 1px solid #27272a;\n  border-radius: 8px;\n  overflow: hidden;\n  z-index: 0;\n}"
  },
  {
    "name": "Linear Icon Bounce",
    "className": "roycss-linear-icon-bounce",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-linear-icon-bounce {\n  background: #18181b;\n  color: #fafafa;\n  border: 1px solid #27272a;\n  border-radius: 8px;\n  transition: background-color 0.25s ease, border-color 0.25s ease;\n}"
  },
  {
    "name": "Linear Magnetic Pull",
    "className": "roycss-linear-magnetic-pull",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-linear-magnetic-pull {\n  background: #5e6ad2;\n  color: #fff;\n  border-radius: 8px;\n  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n  will-change: transform;\n}"
  },
  {
    "name": "Linear Noise Overlay",
    "className": "roycss-linear-noise-overlay",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-linear-noise-overlay {\n  position: relative;\n  background: #0a0a0b;\n  color: #e4e4e7;\n  border: 1px solid #1a1a1d;\n  border-radius: 10px;\n  overflow: hidden;\n}"
  },
  {
    "name": "Linear Shimmer Hover",
    "className": "roycss-linear-shimmer-hover",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-linear-shimmer-hover {\n  position: relative;\n  background: #0f0f10;\n  color: #e4e4e7;\n  overflow: hidden;\n  border: 1px solid #27272a;\n}"
  },
  {
    "name": "Linear Spotlight",
    "className": "roycss-linear-spotlight",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-linear-spotlight {\n  position: relative;\n  background: #0d0d0f;\n  color: #e4e4e7;\n  border: 1px solid #1f1f23;\n  border-radius: 12px;\n  overflow: hidden;\n}"
  },
  {
    "name": "Linear Text Glow",
    "className": "roycss-linear-text-glow",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-linear-text-glow {\n  color: #a1a1aa;\n  font-weight: 600;\n  letter-spacing: 0.02em;\n  transition: color 0.3s ease, text-shadow 0.3s ease;\n}"
  },
  {
    "name": "Material Container Transform",
    "className": "roycss-material-container-transform",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-material-container-transform {\n  animation: roy-mat-container 0.6s cubic-bezier(0.2, 0, 0, 1) both;\n  transform-origin: center;\n}\n@keyframes roy-mat-container {\n  0% { opacity: 0; transform: scaleX(0.2) scaleY(0.1); border-radius: 32px; }"
  },
  {
    "name": "Material Elevation 1",
    "className": "roycss-material-elevation-1",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-material-elevation-1 {\n  background: #FFFBFE;\n  color: #1C1B1F;\n  border-radius: 12px;\n  box-shadow:\n    0px 1px 2px rgba(0, 0, 0, 0.30),\n    0px 1px 3px 1px rgba(0, 0, 0, 0.15);\n}"
  },
  {
    "name": "Material Elevation 3",
    "className": "roycss-material-elevation-3",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-material-elevation-3 {\n  background: #FFFBFE;\n  color: #1C1B1F;\n  border-radius: 16px;\n  box-shadow:\n    0px 1px 3px rgba(0, 0, 0, 0.30),\n    0px 4px 8px 3px rgba(0, 0, 0, 0.15);\n}"
  },
  {
    "name": "Material Elevation 5",
    "className": "roycss-material-elevation-5",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-material-elevation-5 {\n  background: #FFFBFE;\n  color: #1C1B1F;\n  border-radius: 28px;\n  box-shadow:\n    0px 1px 3px rgba(0, 0, 0, 0.30),\n    0px 14px 28px 5px rgba(0, 0, 0, 0.25);\n}"
  },
  {
    "name": "Material Emphasized",
    "className": "roycss-material-emphasized",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-material-emphasized {\n  animation: roy-mat-emphasized 0.5s cubic-bezier(0.2, 0, 0, 1) both;\n}\n@keyframes roy-mat-emphasized {\n  0% { opacity: 0; transform: scale(0.85); }"
  },
  {
    "name": "Material Emphasized Decel",
    "className": "roycss-material-emphasized-decel",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-material-emphasized-decel {\n  animation: roy-mat-emph-decel 0.45s cubic-bezier(0.05, 0.7, 0.1, 1) both;\n}\n@keyframes roy-mat-emph-decel {\n  0% { opacity: 0; transform: translateY(24px) scale(0.92); }"
  },
  {
    "name": "Material Fab Scale",
    "className": "roycss-material-fab-scale",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-material-fab-scale {\n  animation: roy-mat-fab-scale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n  border-radius: 16px;\n  background: #6750A4;\n  color: #fff;\n}\n@keyframes roy-mat-fab-scale {\n  0% { opacity: 0; transform: scale(0) rotate(-45deg); }"
  },
  {
    "name": "Material Spring Down",
    "className": "roycss-material-spring-down",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-material-spring-down {\n  animation: roy-mat-spring-down 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n}\n@keyframes roy-mat-spring-down {\n  0% { opacity: 1; transform: translateY(0) scale(1); }"
  },
  {
    "name": "Material Spring Up",
    "className": "roycss-material-spring-up",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-material-spring-up {\n  animation: roy-mat-spring-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n}\n@keyframes roy-mat-spring-up {\n  0% { opacity: 0; transform: translateY(40px) scale(0.8); }"
  },
  {
    "name": "Material State Layer",
    "className": "roycss-material-state-layer",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-material-state-layer {\n  position: relative;\n  background: #6750A4;\n  color: #fff;\n}"
  },
  {
    "name": "Material State Layer Surface",
    "className": "roycss-material-state-layer-surface",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-material-state-layer-surface {\n  position: relative;\n  background: #1C1B1F;\n  color: #E6E1E5;\n  border-radius: 12px;\n  overflow: hidden;\n}"
  },
  {
    "name": "Material Surface Tint",
    "className": "roycss-material-surface-tint",
    "category": "design-presets",
    "displayType": "box",
    "css": ".roycss-material-surface-tint {\n  position: relative;\n  background: rgba(103, 80, 164, 0.08);\n  backdrop-filter: blur(20px) saturate(140%);\n  -webkit-backdrop-filter: blur(20px) saturate(140%);\n  border: 1px solid rgba(103, 80, 164, 0.15);\n  border-radius: 16px;\n  color: #1C1B1F;\n  box-shadow:\n    0 1px 2px rgba(0, 0, 0, 0.1),\n    0 4px 12px rgba(103, 80, 164, 0.08);\n}"
  },
  {
    "name": "Blur In",
    "className": "roycss-blur-in",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-blur-in {\n  animation: roy-blur-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n@keyframes roy-blur-in {\n  from {\n    opacity: 0;\n    filter: blur(24px);\n    transform: scale(1.05);\n  }"
  },
  {
    "name": "Blur In Up",
    "className": "roycss-blur-in-up",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-blur-in-up {\n  animation: roy-blur-in-up 0.85s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n@keyframes roy-blur-in-up {\n  from {\n    opacity: 0;\n    filter: blur(18px);\n    transform: translate3d(0, 40px, 0);\n  }"
  },
  {
    "name": "Bounce In",
    "className": "roycss-bounce-in",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-bounce-in {\n  animation: roy-bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;\n}\n@keyframes roy-bounce-in {\n  0% {\n    opacity: 0;\n    transform: scale(0.3);\n  }"
  },
  {
    "name": "Bounce In Down",
    "className": "roycss-bounce-in-down",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-bounce-in-down {\n  animation: roy-bounce-in-down 1s cubic-bezier(0.215, 0.61, 0.355, 1) both;\n}\n@keyframes roy-bounce-in-down {\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0);\n  }"
  },
  {
    "name": "Bounce In Left",
    "className": "roycss-bounce-in-left",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-bounce-in-left {\n  animation: roy-bounce-in-left 1s cubic-bezier(0.215, 0.61, 0.355, 1) both;\n}\n@keyframes roy-bounce-in-left {\n  0% {\n    opacity: 0;\n    transform: translate3d(-3000px, 0, 0);\n  }"
  },
  {
    "name": "Bounce In Right",
    "className": "roycss-bounce-in-right",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-bounce-in-right {\n  animation: roy-bounce-in-right 1s cubic-bezier(0.215, 0.61, 0.355, 1) both;\n}\n@keyframes roy-bounce-in-right {\n  0% {\n    opacity: 0;\n    transform: translate3d(3000px, 0, 0);\n  }"
  },
  {
    "name": "Bounce In Up",
    "className": "roycss-bounce-in-up",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-bounce-in-up {\n  animation: roy-bounce-in-up 1s cubic-bezier(0.215, 0.61, 0.355, 1) both;\n}\n@keyframes roy-bounce-in-up {\n  0% {\n    opacity: 0;\n    transform: translate3d(0, 3000px, 0);\n  }"
  },
  {
    "name": "Drop In",
    "className": "roycss-drop-in",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-drop-in {\n  animation: roy-drop-in 1s cubic-bezier(0.645, 0.045, 0.355, 1) both;\n  transform-origin: center bottom;\n}\n@keyframes roy-drop-in {\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -300px, 0) scaleY(0.6);\n  }"
  },
  {
    "name": "Fade In",
    "className": "roycss-fade-in",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-fade-in {\n  animation: roy-fade-in 0.6s ease-out both;\n}\n@keyframes roy-fade-in {\n  from { opacity: 0; }"
  },
  {
    "name": "Fade In Bl",
    "className": "roycss-fade-in-bl",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-fade-in-bl {\n  animation: roy-fade-in-bl 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n@keyframes roy-fade-in-bl {\n  from {\n    opacity: 0;\n    transform: translate3d(-28px, 28px, 0);\n  }"
  },
  {
    "name": "Fade In Br",
    "className": "roycss-fade-in-br",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-fade-in-br {\n  animation: roy-fade-in-br 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n@keyframes roy-fade-in-br {\n  from {\n    opacity: 0;\n    transform: translate3d(28px, 28px, 0);\n  }"
  },
  {
    "name": "Fade In Down",
    "className": "roycss-fade-in-down",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-fade-in-down {\n  animation: roy-fade-in-down 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n@keyframes roy-fade-in-down {\n  from {\n    opacity: 0;\n    transform: translate3d(0, -28px, 0);\n  }"
  },
  {
    "name": "Fade In Left",
    "className": "roycss-fade-in-left",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-fade-in-left {\n  animation: roy-fade-in-left 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n@keyframes roy-fade-in-left {\n  from {\n    opacity: 0;\n    transform: translate3d(-32px, 0, 0);\n  }"
  },
  {
    "name": "Fade In Right",
    "className": "roycss-fade-in-right",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-fade-in-right {\n  animation: roy-fade-in-right 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;\n}\n@keyframes roy-fade-in-right {\n  from {\n    opacity: 0;\n    transform: translate3d(32px, 0, 0);\n  }"
  },
  {
    "name": "Fade In Up",
    "className": "roycss-fade-in-up",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-fade-in-up {\n  animation: roy-fade-in-up 0.6s ease-out both;\n}\n@keyframes roy-fade-in-up {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }"
  },
  {
    "name": "Flip In X",
    "className": "roycss-flip-in-x",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-flip-in-x {\n  backface-visibility: visible;\n  animation: roy-flip-in-x 0.9s ease-in both;\n}\n@keyframes roy-flip-in-x {\n  from {\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    opacity: 0;\n  }"
  },
  {
    "name": "Flip In Y",
    "className": "roycss-flip-in-y",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-flip-in-y {\n  backface-visibility: visible;\n  animation: roy-flip-in-y 0.9s ease-in both;\n}\n@keyframes roy-flip-in-y {\n  from {\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    opacity: 0;\n  }"
  },
  {
    "name": "Jack In Box",
    "className": "roycss-jack-in-box",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-jack-in-box {\n  animation: roy-jack-in-box 1s ease both;\n}\n@keyframes roy-jack-in-box {\n  from {\n    opacity: 0;\n    transform: scale(0.1) rotate(30deg);\n    transform-origin: center bottom;\n  }"
  },
  {
    "name": "Light Speed In",
    "className": "roycss-light-speed-in",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-light-speed-in {\n  animation: roy-light-speed-in 0.9s ease-out both;\n}\n@keyframes roy-light-speed-in {\n  from {\n    transform: translate3d(-100%, 0, 0) skewX(-30deg);\n    opacity: 0;\n  }"
  },
  {
    "name": "Pop In",
    "className": "roycss-pop-in",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-pop-in {\n  animation: roy-pop-in 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28) both;\n}\n@keyframes roy-pop-in {\n  0% {\n    opacity: 0;\n    transform: scale3d(0, 0, 0);\n  }"
  },
  {
    "name": "Roll In",
    "className": "roycss-roll-in",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-roll-in {\n  animation: roy-roll-in 0.9s ease-out both;\n}\n@keyframes roy-roll-in {\n  from {\n    opacity: 0;\n    transform: translateX(-100%) rotate(-120deg);\n  }"
  },
  {
    "name": "Rotate Spin",
    "className": "roycss-rotate-spin",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-rotate-spin {\n  animation: roy-rotate-spin 2s linear infinite;\n}\n@keyframes roy-rotate-spin {\n  from {\n    transform: rotate(0deg);\n  }"
  },
  {
    "name": "Slide Diagonal",
    "className": "roycss-slide-diagonal",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-slide-diagonal {\n  animation: roy-slide-diagonal 3s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite alternate;\n}\n@keyframes roy-slide-diagonal {\n  0% {\n    transform: translate3d(-30px, 30px, 0) rotate(-3deg);\n  }"
  },
  {
    "name": "Slide In Bottom",
    "className": "roycss-slide-in-bottom",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-slide-in-bottom {\n  animation: roy-slide-in-bottom 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n}\n@keyframes roy-slide-in-bottom {\n  from {\n    transform: translate3d(0, 100%, 0);\n    visibility: visible;\n  }"
  },
  {
    "name": "Slide In Left",
    "className": "roycss-slide-in-left",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-slide-in-left {\n  animation: roy-slide-in-left 0.7s ease-out both;\n}\n@keyframes roy-slide-in-left {\n  from {\n    opacity: 0;\n    transform: translateX(-100%);\n  }"
  },
  {
    "name": "Slide In Right",
    "className": "roycss-slide-in-right",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-slide-in-right {\n  animation: roy-slide-in-right 0.7s ease-out both;\n}\n@keyframes roy-slide-in-right {\n  from {\n    opacity: 0;\n    transform: translateX(100%);\n  }"
  },
  {
    "name": "Slide In Top",
    "className": "roycss-slide-in-top",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-slide-in-top {\n  animation: roy-slide-in-top 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;\n}\n@keyframes roy-slide-in-top {\n  from {\n    transform: translate3d(0, -100%, 0);\n    visibility: visible;\n  }"
  },
  {
    "name": "Slide Rotate In",
    "className": "roycss-slide-rotate-in",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-slide-rotate-in {\n  animation: roy-slide-rotate-in 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n}\n@keyframes roy-slide-rotate-in {\n  0% {\n    opacity: 0;\n    transform: translate3d(60px, 0, 0) rotate(180deg);\n  }"
  },
  {
    "name": "Snap In",
    "className": "roycss-snap-in",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-snap-in {\n  animation: roy-snap-in 0.55s cubic-bezier(0.16, 1.32, 0.5, 1) both;\n  transform-origin: center;\n}\n@keyframes roy-snap-in {\n  0% {\n    opacity: 0;\n    transform: scale(1.6) translate3d(40px, -20px, 0);\n  }"
  },
  {
    "name": "Spring In",
    "className": "roycss-spring-in",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-spring-in {\n  animation: roy-spring-in 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;\n  transform-origin: center bottom;\n}\n@keyframes roy-spring-in {\n  0% {\n    opacity: 0;\n    transform: translate3d(0, 200px, 0) scale(0.5);\n  }"
  },
  {
    "name": "Swing In",
    "className": "roycss-swing-in",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-swing-in {\n  animation: roy-swing-in 1s cubic-bezier(0.215, 0.61, 0.355, 1) both;\n  transform-origin: top center;\n}\n@keyframes roy-swing-in {\n  0% {\n    opacity: 0;\n    transform: rotate3d(0, 0, 1, -90deg);\n  }"
  },
  {
    "name": "Zoom In",
    "className": "roycss-zoom-in",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-zoom-in {\n  animation: roy-zoom-in 0.6s ease-out both;\n}\n@keyframes roy-zoom-in {\n  from {\n    opacity: 0;\n    transform: scale(0);\n  }"
  },
  {
    "name": "Zoom In Down",
    "className": "roycss-zoom-in-down",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-zoom-in-down {\n  animation: roy-zoom-in-down 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;\n  transform-origin: center top;\n}\n@keyframes roy-zoom-in-down {\n  from {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n  }"
  },
  {
    "name": "Zoom In Left",
    "className": "roycss-zoom-in-left",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-zoom-in-left {\n  animation: roy-zoom-in-left 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;\n  transform-origin: left center;\n}\n@keyframes roy-zoom-in-left {\n  from {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n  }"
  },
  {
    "name": "Zoom In Right",
    "className": "roycss-zoom-in-right",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-zoom-in-right {\n  animation: roy-zoom-in-right 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;\n  transform-origin: right center;\n}\n@keyframes roy-zoom-in-right {\n  from {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n  }"
  },
  {
    "name": "Zoom In Up",
    "className": "roycss-zoom-in-up",
    "category": "entrance",
    "displayType": "box",
    "css": ".roycss-zoom-in-up {\n  animation: roy-zoom-in-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;\n  transform-origin: center bottom;\n}\n@keyframes roy-zoom-in-up {\n  from {\n    opacity: 0;\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n  }"
  },
  {
    "name": "Blur Out",
    "className": "roycss-blur-out",
    "category": "exit",
    "displayType": "box",
    "css": ".roycss-blur-out {\n  animation: roy-blur-out 0.8s cubic-bezier(0.55, 0, 0.68, 0.53) both;\n}\n@keyframes roy-blur-out {\n  from {\n    opacity: 1;\n    filter: blur(0px);\n    transform: scale(1);\n  }"
  },
  {
    "name": "Blur Out Down",
    "className": "roycss-blur-out-down",
    "category": "exit",
    "displayType": "box",
    "css": ".roycss-blur-out-down {\n  animation: roy-blur-out-down 0.85s cubic-bezier(0.55, 0, 0.68, 0.53) both;\n}\n@keyframes roy-blur-out-down {\n  from {\n    opacity: 1;\n    filter: blur(0px);\n    transform: translate3d(0, 0, 0);\n  }"
  },
  {
    "name": "Fade Out",
    "className": "roycss-fade-out",
    "category": "exit",
    "displayType": "box",
    "css": ".roycss-fade-out {\n  animation: roy-fade-out 0.6s ease-in both;\n}\n@keyframes roy-fade-out {\n  from { opacity: 1; }"
  },
  {
    "name": "Fade Out Down",
    "className": "roycss-fade-out-down",
    "category": "exit",
    "displayType": "box",
    "css": ".roycss-fade-out-down {\n  animation: roy-fade-out-down 0.7s ease-in both;\n}\n@keyframes roy-fade-out-down {\n  from {\n    opacity: 1;\n    transform: translateY(0);\n  }"
  },
  {
    "name": "Fade Out Left",
    "className": "roycss-fade-out-left",
    "category": "exit",
    "displayType": "box",
    "css": ".roycss-fade-out-left {\n  animation: roy-fade-out-left 0.7s cubic-bezier(0.55, 0, 0.68, 0.53) both;\n}\n@keyframes roy-fade-out-left {\n  from {\n    opacity: 1;\n    transform: translate3d(0, 0, 0);\n  }"
  },
  {
    "name": "Fade Out Right",
    "className": "roycss-fade-out-right",
    "category": "exit",
    "displayType": "box",
    "css": ".roycss-fade-out-right {\n  animation: roy-fade-out-right 0.7s cubic-bezier(0.55, 0, 0.68, 0.53) both;\n}\n@keyframes roy-fade-out-right {\n  from {\n    opacity: 1;\n    transform: translate3d(0, 0, 0);\n  }"
  },
  {
    "name": "Fade Out Up",
    "className": "roycss-fade-out-up",
    "category": "exit",
    "displayType": "box",
    "css": ".roycss-fade-out-up {\n  animation: roy-fade-out-up 0.7s cubic-bezier(0.55, 0, 0.68, 0.53) both;\n}\n@keyframes roy-fade-out-up {\n  from {\n    opacity: 1;\n    transform: translate3d(0, 0, 0);\n  }"
  },
  {
    "name": "Pop Out",
    "className": "roycss-pop-out",
    "category": "exit",
    "displayType": "box",
    "css": ".roycss-pop-out {\n  animation: roy-pop-out 0.5s cubic-bezier(0.32, -0.28, 0.82, 0.11) both;\n}\n@keyframes roy-pop-out {\n  0% {\n    opacity: 1;\n    transform: scale3d(1, 1, 1);\n  }"
  },
  {
    "name": "Roll Out",
    "className": "roycss-roll-out",
    "category": "exit",
    "displayType": "box",
    "css": ".roycss-roll-out {\n  animation: roy-roll-out 0.9s ease-in both;\n}\n@keyframes roy-roll-out {\n  from {\n    opacity: 1;\n    transform: translateX(0) rotate(0);\n  }"
  },
  {
    "name": "Rotate Out",
    "className": "roycss-rotate-out",
    "category": "exit",
    "displayType": "box",
    "css": ".roycss-rotate-out {\n  transform-origin: center;\n  animation: roy-rotate-out 0.8s ease-in both;\n}\n@keyframes roy-rotate-out {\n  from {\n    opacity: 1;\n    transform: rotate(0);\n  }"
  },
  {
    "name": "Slide Out Bottom",
    "className": "roycss-slide-out-bottom",
    "category": "exit",
    "displayType": "box",
    "css": ".roycss-slide-out-bottom {\n  animation: roy-slide-out-bottom 0.6s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;\n}\n@keyframes roy-slide-out-bottom {\n  from {\n    transform: translate3d(0, 0, 0);\n  }"
  },
  {
    "name": "Slide Out Left",
    "className": "roycss-slide-out-left",
    "category": "exit",
    "displayType": "box",
    "css": ".roycss-slide-out-left {\n  animation: roy-slide-out-left 0.6s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;\n}\n@keyframes roy-slide-out-left {\n  from {\n    transform: translate3d(0, 0, 0);\n  }"
  },
  {
    "name": "Slide Out Right",
    "className": "roycss-slide-out-right",
    "category": "exit",
    "displayType": "box",
    "css": ".roycss-slide-out-right {\n  animation: roy-slide-out-right 0.6s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;\n}\n@keyframes roy-slide-out-right {\n  from {\n    transform: translate3d(0, 0, 0);\n  }"
  },
  {
    "name": "Slide Out Top",
    "className": "roycss-slide-out-top",
    "category": "exit",
    "displayType": "box",
    "css": ".roycss-slide-out-top {\n  animation: roy-slide-out-top 0.6s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;\n}\n@keyframes roy-slide-out-top {\n  from {\n    transform: translate3d(0, 0, 0);\n  }"
  },
  {
    "name": "Zoom Out",
    "className": "roycss-zoom-out",
    "category": "exit",
    "displayType": "box",
    "css": ".roycss-zoom-out {\n  animation: roy-zoom-out 0.8s ease-in both;\n}\n@keyframes roy-zoom-out {\n  0% {\n    opacity: 1;\n    transform: scale(0);\n  }"
  },
  {
    "name": "Zoom Out Left",
    "className": "roycss-zoom-out-left",
    "category": "exit",
    "displayType": "box",
    "css": ".roycss-zoom-out-left {\n  animation: roy-zoom-out-left 0.65s cubic-bezier(0.55, 0, 0.68, 0.53) both;\n  transform-origin: left center;\n}\n@keyframes roy-zoom-out-left {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.7, 0.7, 0.7) translate3d(20px, 0, 0);\n  }"
  },
  {
    "name": "Zoom Out Up",
    "className": "roycss-zoom-out-up",
    "category": "exit",
    "displayType": "box",
    "css": ".roycss-zoom-out-up {\n  animation: roy-zoom-out-up 0.65s cubic-bezier(0.55, 0, 0.68, 0.53) both;\n  transform-origin: center bottom;\n}\n@keyframes roy-zoom-out-up {\n  40% {\n    opacity: 1;\n    transform: scale3d(0.7, 0.7, 0.7) translate3d(0, 20px, 0);\n  }"
  },
  {
    "name": "Filter Blur Focus",
    "className": "roycss-filter-blur-focus",
    "category": "filter",
    "displayType": "box",
    "css": ".roycss-filter-blur-focus {\n  background: linear-gradient(135deg, #f7797d 0%, #fbd786 50%, #c6ffdd 100%);\n  filter: blur(8px) saturate(1.2);\n  animation: roy-filter-blur-focus 3s ease-in-out infinite;\n}\n@keyframes roy-filter-blur-focus {\n  0%, 100% { filter: blur(8px) saturate(1.2); }"
  },
  {
    "name": "Filter Cinematic",
    "className": "roycss-filter-cinematic",
    "category": "filter",
    "displayType": "box",
    "css": ".roycss-filter-cinematic {\n  background: linear-gradient(135deg, #f12711 0%, #f5af19 40%, #2193b0 80%, #6dd5ed 100%);\n  filter: contrast(1.25) saturate(1.3) brightness(0.92) hue-rotate(-8deg) sepia(0.18);\n}"
  },
  {
    "name": "Filter Contrast",
    "className": "roycss-filter-contrast",
    "category": "filter",
    "displayType": "box",
    "css": ".roycss-filter-contrast {\n  background: linear-gradient(135deg, #bdc3c7 0%, #2c3e50 50%, #bdc3c7 100%);\n  filter: contrast(2.4) brightness(1.05);\n}"
  },
  {
    "name": "Filter Dramatic",
    "className": "roycss-filter-dramatic",
    "category": "filter",
    "displayType": "box",
    "css": ".roycss-filter-dramatic {\n  background: linear-gradient(135deg, #ee9ca7 0%, #ffdde1 30%, #ff758c 60%, #ff7e5f 100%);\n  filter: contrast(1.6) saturate(1.5) brightness(0.82);\n}"
  },
  {
    "name": "Filter Dreamy",
    "className": "roycss-filter-dreamy",
    "category": "filter",
    "displayType": "box",
    "css": ".roycss-filter-dreamy {\n  background: linear-gradient(135deg, #c471f5 0%, #fa71cd 40%, #89f7fe 100%);\n  filter: blur(1.2px) brightness(1.18) saturate(1.4) contrast(0.92);\n}"
  },
  {
    "name": "Filter Duotone",
    "className": "roycss-filter-duotone",
    "category": "filter",
    "displayType": "box",
    "css": ".roycss-filter-duotone {\n  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 50%, #fbc2eb 100%);\n  filter: grayscale(1) sepia(1) hue-rotate(180deg) saturate(3) contrast(1.3);\n}"
  },
  {
    "name": "Filter Emboss",
    "className": "roycss-filter-emboss",
    "category": "filter",
    "displayType": "box",
    "css": ".roycss-filter-emboss {\n  background: linear-gradient(135deg, #414d0b 0%, #727a17 50%, #d7e850 100%);\n  filter: grayscale(1) brightness(1.1) contrast(1.4)\n    drop-shadow(2px 2px 1px rgba(255,255,255,0.5))\n    drop-shadow(-2px -2px 1px rgba(0,0,0,0.6));\n}"
  },
  {
    "name": "Filter Glitch",
    "className": "roycss-filter-glitch",
    "category": "filter",
    "displayType": "box",
    "css": ".roycss-filter-glitch {\n  background: linear-gradient(135deg, #00f260 0%, #0575e6 50%, #f7971e 100%);\n  animation: roy-filter-glitch 1.2s steps(2, end) infinite;\n}\n@keyframes roy-filter-glitch {\n  0%   { filter: hue-rotate(0deg) saturate(1.5); }"
  },
  {
    "name": "Filter Grayscale Hover",
    "className": "roycss-filter-grayscale-hover",
    "category": "filter",
    "displayType": "box",
    "css": ".roycss-filter-grayscale-hover {\n  background: linear-gradient(135deg, #fc466b 0%, #3f5efb 50%, #fc466b 100%);\n  filter: grayscale(1) brightness(0.85);\n  transition: filter 0.5s ease;\n}"
  },
  {
    "name": "Filter Halftone",
    "className": "roycss-filter-halftone",
    "category": "filter",
    "displayType": "box",
    "css": ".roycss-filter-halftone {\n  background:\n    radial-gradient(circle, rgba(0,0,0,0.85) 1px, transparent 1.6px) 0 0 / 5px 5px,\n    linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #ffe66d 100%);\n  filter: contrast(1.4) saturate(1.3);\n}"
  },
  {
    "name": "Filter Hue Rotate",
    "className": "roycss-filter-hue-rotate",
    "category": "filter",
    "displayType": "box",
    "css": ".roycss-filter-hue-rotate {\n  background: linear-gradient(135deg, #ff006e 0%, #8338ec 50%, #3a86ff 100%);\n  animation: roy-filter-hue-rotate 4s linear infinite;\n}\n@keyframes roy-filter-hue-rotate {\n  0%   { filter: hue-rotate(0deg) saturate(1.5); }"
  },
  {
    "name": "Filter Invert",
    "className": "roycss-filter-invert",
    "category": "filter",
    "displayType": "box",
    "css": ".roycss-filter-invert {\n  background: linear-gradient(135deg, #ff6a00 0%, #ee0979 50%, #ff6a00 100%);\n  filter: invert(1) hue-rotate(180deg);\n}"
  },
  {
    "name": "Filter Saturate",
    "className": "roycss-filter-saturate",
    "category": "filter",
    "displayType": "box",
    "css": ".roycss-filter-saturate {\n  background: linear-gradient(135deg, #c94b4b 0%, #4b134f 50%, #c94b4b 100%);\n  filter: saturate(3.2) contrast(1.1);\n}"
  },
  {
    "name": "Filter Sepia",
    "className": "roycss-filter-sepia",
    "category": "filter",
    "displayType": "box",
    "css": ".roycss-filter-sepia {\n  background: linear-gradient(135deg, #00c9ff 0%, #92fe9d 50%, #fef9d7 100%);\n  filter: sepia(0.85) contrast(1.1) brightness(1.05);\n}"
  },
  {
    "name": "Filter Vintage",
    "className": "roycss-filter-vintage",
    "category": "filter",
    "displayType": "box",
    "css": ".roycss-filter-vintage {\n  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 40%, #ff9ff3 80%, #48dbfb 100%);\n  filter: sepia(0.55) saturate(0.8) contrast(0.9) brightness(0.95) hue-rotate(-10deg);\n}"
  },
  {
    "name": "Form Checkbox Custom",
    "className": "roycss-form-checkbox-custom",
    "category": "forms",
    "displayType": "box",
    "css": ".roycss-form-checkbox-custom {\n  position: relative;\n  width: 32px;\n  height: 32px;\n  background: transparent;\n  border: 2px solid #10b981;\n  border-radius: 7px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}"
  },
  {
    "name": "Form Error Shake",
    "className": "roycss-form-error-shake",
    "category": "forms",
    "displayType": "box",
    "css": ".roycss-form-error-shake {\n  position: relative;\n  width: 160px;\n  height: 40px;\n  padding: 0 14px;\n  background: rgba(239,68,68,0.08);\n  border: 1px solid #ef4444;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  font: 12px/1 system-ui, sans-serif;\n  color: #fca5a5;\n  animation: roy-form-error-shake 0.5s ease-in-out infinite;\n}\n@keyframes roy-form-error-shake {\n  0%, 100% { transform: translateX(0); }"
  },
  {
    "name": "Form Focus Glow",
    "className": "roycss-form-focus-glow",
    "category": "forms",
    "displayType": "box",
    "css": ".roycss-form-focus-glow {\n  position: relative;\n  width: 170px;\n  height: 40px;\n  padding: 0 14px;\n  background: rgba(255,255,255,0.04);\n  border: 1px solid rgba(255,255,255,0.18);\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  font: 12px/1 system-ui, sans-serif;\n  color: rgba(255,255,255,0.55);\n  transition: all 0.3s ease;\n}"
  },
  {
    "name": "Form Label Float",
    "className": "roycss-form-label-float",
    "category": "forms",
    "displayType": "box",
    "css": ".roycss-form-label-float {\n  position: relative;\n  width: 170px;\n  height: 48px;\n  background: rgba(255,255,255,0.04);\n  border: 1px solid rgba(255,255,255,0.18);\n  border-radius: 10px;\n  transition: all 0.3s ease;\n}"
  },
  {
    "name": "Form Placeholder Shimmer",
    "className": "roycss-form-placeholder-shimmer",
    "category": "forms",
    "displayType": "box",
    "css": ".roycss-form-placeholder-shimmer {\n  position: relative;\n  width: 180px;\n  height: 40px;\n  padding: 0 14px;\n  background: rgba(255,255,255,0.04);\n  border: 1px solid rgba(255,255,255,0.18);\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  font: 12px/1 system-ui, sans-serif;\n  overflow: hidden;\n}"
  },
  {
    "name": "Form Radio Custom",
    "className": "roycss-form-radio-custom",
    "category": "forms",
    "displayType": "box",
    "css": ".roycss-form-radio-custom {\n  position: relative;\n  width: 32px;\n  height: 32px;\n  background: transparent;\n  border: 2px solid #10b981;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}"
  },
  {
    "name": "Form Search Expand",
    "className": "roycss-form-search-expand",
    "category": "forms",
    "displayType": "box",
    "css": ".roycss-form-search-expand {\n  position: relative;\n  width: 56px;\n  height: 40px;\n  background: rgba(255,255,255,0.05);\n  border: 1px solid rgba(255,255,255,0.18);\n  border-radius: 20px;\n  display: flex;\n  align-items: center;\n  padding: 0 14px;\n  font: 12px/1 system-ui, sans-serif;\n  color: rgba(255,255,255,0.6);\n  overflow: hidden;\n  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1),\n              border-color 0.4s ease;\n}"
  },
  {
    "name": "Form Success Check",
    "className": "roycss-form-success-check",
    "category": "forms",
    "displayType": "box",
    "css": ".roycss-form-success-check {\n  position: relative;\n  width: 160px;\n  height: 40px;\n  padding: 0 14px 0 38px;\n  background: rgba(16,185,129,0.1);\n  border: 1px solid #10b981;\n  border-radius: 10px;\n  display: flex;\n  align-items: center;\n  font: 12px/1 system-ui, sans-serif;\n  color: #6ee7b7;\n}"
  },
  {
    "name": "Form Toggle Switch",
    "className": "roycss-form-toggle-switch",
    "category": "forms",
    "displayType": "box",
    "css": ".roycss-form-toggle-switch {\n  position: relative;\n  width: 54px;\n  height: 28px;\n  background: rgba(255,255,255,0.08);\n  border: 1px solid rgba(255,255,255,0.2);\n  border-radius: 14px;\n  transition: background 0.3s ease, border-color 0.3s ease;\n}"
  },
  {
    "name": "Form Underline Draw",
    "className": "roycss-form-underline-draw",
    "category": "forms",
    "displayType": "box",
    "css": ".roycss-form-underline-draw {\n  position: relative;\n  width: 180px;\n  height: 40px;\n  padding: 0 4px;\n  background: transparent;\n  border: none;\n  border-bottom: 2px solid rgba(255,255,255,0.18);\n  display: flex;\n  align-items: center;\n  font: 13px/1 system-ui, sans-serif;\n  color: rgba(255,255,255,0.7);\n}"
  },
  {
    "name": "Glass Acrylic",
    "className": "roycss-glass-acrylic",
    "category": "glass",
    "displayType": "box",
    "css": ".roycss-glass-acrylic {\n  background: rgba(245, 247, 250, 0.65);\n  backdrop-filter: blur(30px) saturate(140%);\n  -webkit-backdrop-filter: blur(30px) saturate(140%);\n  border: 1px solid rgba(255, 255, 255, 0.5);\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.2);\n}"
  },
  {
    "name": "Glass Border Glow",
    "className": "roycss-glass-border-glow",
    "category": "glass",
    "displayType": "box",
    "css": ".roycss-glass-border-glow {\n  position: relative;\n  background: rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(16px) saturate(160%);\n  -webkit-backdrop-filter: blur(16px) saturate(160%);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 16px;\n  animation: roy-glass-border-pulse 3s ease-in-out infinite alternate;\n}\n@keyframes roy-glass-border-pulse {\n  0%   { box-shadow: 0 0 0 1px rgba(0, 255, 200, 0.4), 0 0 16px rgba(0, 255, 200, 0.35), 0 8px 32px rgba(0, 0, 0, 0.12); }"
  },
  {
    "name": "Glass Claymorphism",
    "className": "roycss-glass-claymorphism",
    "category": "glass",
    "displayType": "box",
    "css": ".roycss-glass-claymorphism {\n  background: linear-gradient(145deg, #fef3f8, #fbcfe8);\n  border-radius: 28px;\n  border: 1px solid rgba(255, 255, 255, 0.6);\n  box-shadow:\n    8px 8px 16px rgba(190, 24, 93, 0.18),\n    -4px -4px 12px rgba(255, 255, 255, 0.9),\n    inset 2px 2px 4px rgba(255, 255, 255, 0.7),\n    inset -2px -2px 6px rgba(190, 24, 93, 0.12);\n}"
  },
  {
    "name": "Glass Depth Layer",
    "className": "roycss-glass-depth-layer",
    "category": "glass",
    "displayType": "box",
    "css": ".roycss-glass-depth-layer {\n  position: relative;\n  background: rgba(255, 255, 255, 0.18);\n  backdrop-filter: blur(28px) saturate(160%);\n  -webkit-backdrop-filter: blur(28px) saturate(160%);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 18px;\n  box-shadow:\n    0 1px 0 rgba(255, 255, 255, 0.5) inset,\n    0 -1px 0 rgba(0, 0, 0, 0.05) inset,\n    0 2px 4px rgba(0, 0, 0, 0.08),\n    0 8px 16px rgba(0, 0, 0, 0.12),\n    0 20px 40px rgba(0, 0, 0, 0.15);\n  color: #1d1d1f;\n}"
  },
  {
    "name": "Glass Frosted",
    "className": "roycss-glass-frosted",
    "category": "glass",
    "displayType": "box",
    "css": ".roycss-glass-frosted {\n  background: rgba(255, 255, 255, 0.12);\n  backdrop-filter: blur(20px) saturate(180%);\n  -webkit-backdrop-filter: blur(20px) saturate(180%);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.3);\n}"
  },
  {
    "name": "Glass Frosted Dark",
    "className": "roycss-glass-frosted-dark",
    "category": "glass",
    "displayType": "box",
    "css": ".roycss-glass-frosted-dark {\n  background: rgba(20, 20, 35, 0.55);\n  backdrop-filter: blur(20px) saturate(160%);\n  -webkit-backdrop-filter: blur(20px) saturate(160%);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);\n}"
  },
  {
    "name": "Glass Liquid",
    "className": "roycss-glass-liquid",
    "category": "glass",
    "displayType": "box",
    "css": ".roycss-glass-liquid {\n  background: rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(8px) brightness(1.1) contrast(1.05) hue-rotate(15deg);\n  -webkit-backdrop-filter: blur(8px) brightness(1.1) contrast(1.05) hue-rotate(15deg);\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-radius: 24px;\n  box-shadow: inset 0 2px 6px rgba(255, 255, 255, 0.4),\n              inset 0 -2px 6px rgba(0, 0, 0, 0.1),\n              0 10px 30px rgba(0, 0, 0, 0.15);\n  animation: roy-glass-liquid-refract 6s ease-in-out infinite alternate;\n}\n@keyframes roy-glass-liquid-refract {\n  0%   { backdrop-filter: blur(8px) brightness(1.1) contrast(1.05) hue-rotate(0deg); }"
  },
  {
    "name": "Glass Neumorphism",
    "className": "roycss-glass-neumorphism",
    "category": "glass",
    "displayType": "box",
    "css": ".roycss-glass-neumorphism {\n  background: #e0e5ec;\n  border-radius: 16px;\n  box-shadow: 8px 8px 16px #b8bcc2, -8px -8px 16px #ffffff;\n}"
  },
  {
    "name": "Glass Neumorphism Inset",
    "className": "roycss-glass-neumorphism-inset",
    "category": "glass",
    "displayType": "box",
    "css": ".roycss-glass-neumorphism-inset {\n  background: #e0e5ec;\n  border-radius: 16px;\n  box-shadow: inset 6px 6px 12px #b8bcc2, inset -6px -6px 12px #ffffff;\n}"
  },
  {
    "name": "Glass Noise Overlay",
    "className": "roycss-glass-noise-overlay",
    "category": "glass",
    "displayType": "box",
    "css": ".roycss-glass-noise-overlay {\n  position: relative;\n  background: rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(16px) saturate(160%);\n  -webkit-backdrop-filter: blur(16px) saturate(160%);\n  border: 1px solid rgba(255, 255, 255, 0.15);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);\n}"
  },
  {
    "name": "Glass Prism",
    "className": "roycss-glass-prism",
    "category": "glass",
    "displayType": "box",
    "css": ".roycss-glass-prism {\n  position: relative;\n  background: rgba(255, 255, 255, 0.15);\n  backdrop-filter: blur(24px) saturate(180%);\n  -webkit-backdrop-filter: blur(24px) saturate(180%);\n  border-radius: 16px;\n  color: #fff;\n}"
  },
  {
    "name": "Glass Reflection",
    "className": "roycss-glass-reflection",
    "category": "glass",
    "displayType": "box",
    "css": ".roycss-glass-reflection {\n  position: relative;\n  overflow: hidden;\n  background: rgba(255, 255, 255, 0.1);\n  backdrop-filter: blur(16px) saturate(160%);\n  -webkit-backdrop-filter: blur(16px) saturate(160%);\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.3);\n}"
  },
  {
    "name": "Glass Transparent Blur",
    "className": "roycss-glass-transparent-blur",
    "category": "glass",
    "displayType": "box",
    "css": ".roycss-glass-transparent-blur {\n  background: rgba(255, 255, 255, 0.05);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 10px;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);\n}"
  },
  {
    "name": "Glass Vibrant",
    "className": "roycss-glass-vibrant",
    "category": "glass",
    "displayType": "box",
    "css": ".roycss-glass-vibrant {\n  background: linear-gradient(135deg, rgba(168, 85, 247, 0.28), rgba(236, 72, 153, 0.28));\n  backdrop-filter: blur(16px) saturate(220%) brightness(1.1);\n  -webkit-backdrop-filter: blur(16px) saturate(220%) brightness(1.1);\n  border: 1px solid rgba(255, 255, 255, 0.25);\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(168, 85, 247, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.35);\n}"
  },
  {
    "name": "Hover Border Draw",
    "className": "roycss-hover-border-draw",
    "category": "hover",
    "displayType": "box",
    "css": ".roycss-hover-border-draw {\n  position: relative;\n  box-sizing: border-box;\n}"
  },
  {
    "name": "Hover Color Shift",
    "className": "roycss-hover-color-shift",
    "category": "hover",
    "displayType": "box",
    "css": ".roycss-hover-color-shift {\n  background: linear-gradient(135deg, #10b981, #059669);\n  transition: all 0.4s ease;\n  background-size: 200% 200%;\n  background-position: 0% 50%;\n}"
  },
  {
    "name": "Hover Depth",
    "className": "roycss-hover-depth",
    "category": "hover",
    "displayType": "box",
    "css": ".roycss-hover-depth {\n  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),\n              box-shadow 0.4s ease;\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08),\n              0 2px 4px rgba(0, 0, 0, 0.06);\n}"
  },
  {
    "name": "Hover Drop Shadow",
    "className": "roycss-hover-drop-shadow",
    "category": "hover",
    "displayType": "box",
    "css": ".roycss-hover-drop-shadow {\n  transition: filter 0.35s ease, transform 0.35s ease;\n}"
  },
  {
    "name": "Hover Flip",
    "className": "roycss-hover-flip",
    "category": "hover",
    "displayType": "box",
    "css": ".roycss-hover-flip {\n  transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1);\n  transform-style: preserve-3d;\n  perspective: 800px;\n}"
  },
  {
    "name": "Hover Glow Border",
    "className": "roycss-hover-glow-border",
    "category": "hover",
    "displayType": "box",
    "css": ".roycss-hover-glow-border {\n  border: 2px solid transparent;\n  background-clip: padding-box;\n  position: relative;\n  transition: all 0.3s ease;\n}"
  },
  {
    "name": "Hover Neon Flicker",
    "className": "roycss-hover-neon-flicker",
    "category": "hover",
    "displayType": "box",
    "css": ".roycss-hover-neon-flicker {\n  transition: box-shadow 0.2s ease;\n}"
  },
  {
    "name": "Hover Opacity",
    "className": "roycss-hover-opacity",
    "category": "hover",
    "displayType": "box",
    "css": ".roycss-hover-opacity {\n  transition: opacity 0.3s ease;\n}"
  },
  {
    "name": "Hover Press",
    "className": "roycss-hover-press",
    "category": "hover",
    "displayType": "box",
    "css": ".roycss-hover-press {\n  transition: transform 0.15s ease, box-shadow 0.15s ease;\n  box-shadow: 0 6px 0 #047857, 0 8px 14px rgba(0, 0, 0, 0.3);\n}"
  },
  {
    "name": "Hover Push Up",
    "className": "roycss-hover-push-up",
    "category": "hover",
    "displayType": "box",
    "css": ".roycss-hover-push-up {\n  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),\n              box-shadow 0.3s ease;\n}"
  },
  {
    "name": "Hover Rotate",
    "className": "roycss-hover-rotate",
    "category": "hover",
    "displayType": "box",
    "css": ".roycss-hover-rotate {\n  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);\n}"
  },
  {
    "name": "Hover Scale",
    "className": "roycss-hover-scale",
    "category": "hover",
    "displayType": "box",
    "css": ".roycss-hover-scale {\n  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),\n              box-shadow 0.3s ease;\n}"
  },
  {
    "name": "Hover Scale Down",
    "className": "roycss-hover-scale-down",
    "category": "hover",
    "displayType": "box",
    "css": ".roycss-hover-scale-down {\n  transition: transform 0.3s ease;\n}"
  },
  {
    "name": "Hover Shadow Grow",
    "className": "roycss-hover-shadow-grow",
    "category": "hover",
    "displayType": "box",
    "css": ".roycss-hover-shadow-grow {\n  transition: transform 0.3s ease,\n              box-shadow 0.3s ease;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);\n}"
  },
  {
    "name": "Hover Skew",
    "className": "roycss-hover-skew",
    "category": "hover",
    "displayType": "box",
    "css": ".roycss-hover-skew {\n  transition: transform 0.3s ease;\n}"
  },
  {
    "name": "Hover Tilt Rotate",
    "className": "roycss-hover-tilt-rotate",
    "category": "hover",
    "displayType": "box",
    "css": ".roycss-hover-tilt-rotate {\n  transition: transform 0.3s ease;\n  transform-style: preserve-3d;\n  perspective: 1000px;\n}"
  },
  {
    "name": "Hover Underline Slide",
    "className": "roycss-hover-underline-slide",
    "category": "hover",
    "displayType": "box",
    "css": ".roycss-hover-underline-slide {\n  position: relative;\n  display: inline-block;\n  text-decoration: none;\n}"
  },
  {
    "name": "Hover Fade Overlay",
    "className": "roycss-hover-fade-overlay",
    "category": "image-hover",
    "displayType": "image",
    "css": ".roycss-hover-fade-overlay {\n  position: relative;\n  isolation: isolate;\n}"
  },
  {
    "name": "Hover Grayscale To Color",
    "className": "roycss-hover-grayscale-to-color",
    "category": "image-hover",
    "displayType": "image",
    "css": ".roycss-hover-grayscale-to-color {\n  filter: grayscale(100%);\n  transition: filter 0.5s ease;\n}"
  },
  {
    "name": "Hover Hue Rotate",
    "className": "roycss-hover-hue-rotate",
    "category": "image-hover",
    "displayType": "image",
    "css": ".roycss-hover-hue-rotate {\n  transition: filter 0.3s ease;\n}"
  },
  {
    "name": "Hover Overlay Reveal",
    "className": "roycss-hover-overlay-reveal",
    "category": "image-hover",
    "displayType": "image",
    "css": ".roycss-hover-overlay-reveal {\n  position: relative;\n  overflow: hidden;\n  transition: color 0.3s ease;\n}"
  },
  {
    "name": "Hover Slide Overlay",
    "className": "roycss-hover-slide-overlay",
    "category": "image-hover",
    "displayType": "image",
    "css": ".roycss-hover-slide-overlay {\n  position: relative;\n  overflow: hidden;\n  transition: color 0.3s ease;\n}"
  },
  {
    "name": "Hover Slide Right",
    "className": "roycss-hover-slide-right",
    "category": "image-hover",
    "displayType": "image",
    "css": ".roycss-hover-slide-right {\n  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}"
  },
  {
    "name": "Hover Zoom Blur",
    "className": "roycss-hover-zoom-blur",
    "category": "image-hover",
    "displayType": "image",
    "css": ".roycss-hover-zoom-blur {\n  transition: transform 0.4s ease, filter 0.4s ease;\n}"
  },
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
  },
  {
    "name": "Mask Composite Reveal",
    "className": "roycss-mask-composite-reveal",
    "category": "mask",
    "displayType": "bg",
    "css": ".roycss-mask-composite-reveal {\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  background: linear-gradient(135deg, #1e293b, #334155);\n  position: relative;\n  overflow: hidden;\n  display: grid;\n  place-items: center;\n}"
  },
  {
    "name": "Mask Linear Wipe",
    "className": "roycss-mask-linear-wipe",
    "category": "mask",
    "displayType": "bg",
    "css": ".roycss-mask-linear-wipe {\n  width: 100%;\n  height: 100%;\n  min-height: 220px;\n  border-radius: 12px;\n  position: relative;\n  overflow: hidden;\n  background: linear-gradient(135deg, #f59e0b, #ef4444);\n}"
  },
  {
    "name": "Mask Radial Reveal",
    "className": "roycss-mask-radial-reveal",
    "category": "mask",
    "displayType": "bg",
    "css": ".roycss-mask-radial-reveal {\n  width: 100%;\n  height: 100%;\n  min-height: 220px;\n  border-radius: 12px;\n  background:\n    repeating-linear-gradient(45deg,\n      #ec4899 0 10px, #8b5cf6 10px 20px, #06b6d4 20px 30px),\n    #0f172a;\n  position: relative;\n  overflow: hidden;\n  display: grid;\n  place-items: center;\n}"
  },
  {
    "name": "Micro Accordion Expand",
    "className": "roycss-micro-accordion-expand",
    "category": "micro-interaction",
    "displayType": "box",
    "css": ".roycss-micro-accordion-expand {\n  position: relative;\n  width: 140px;\n  height: 90px;\n  background: #ffffff;\n  border-radius: 10px;\n  overflow: hidden;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}"
  },
  {
    "name": "Micro Badge Bounce",
    "className": "roycss-micro-badge-bounce",
    "category": "micro-interaction",
    "displayType": "box",
    "css": ".roycss-micro-badge-bounce {\n  position: relative;\n  width: 64px;\n  height: 64px;\n  background: #f1f5f9;\n  border-radius: 14px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);\n}"
  },
  {
    "name": "Micro Checkbox Check",
    "className": "roycss-micro-checkbox-check",
    "category": "micro-interaction",
    "displayType": "box",
    "css": ".roycss-micro-checkbox-check {\n  position: relative;\n  width: 38px;\n  height: 38px;\n  background: #ffffff;\n  border: 2px solid #10b981;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);\n}"
  },
  {
    "name": "Micro Dropdown Reveal",
    "className": "roycss-micro-dropdown-reveal",
    "category": "micro-interaction",
    "displayType": "box",
    "css": ".roycss-micro-dropdown-reveal {\n  position: relative;\n  width: 120px;\n  height: 90px;\n}"
  },
  {
    "name": "Micro Fab Expand",
    "className": "roycss-micro-fab-expand",
    "category": "micro-interaction",
    "displayType": "box",
    "css": ".roycss-micro-fab-expand {\n  position: relative;\n  width: 150px;\n  height: 90px;\n}"
  },
  {
    "name": "Micro Modal Scale",
    "className": "roycss-micro-modal-scale",
    "category": "micro-interaction",
    "displayType": "box",
    "css": ".roycss-micro-modal-scale {\n  position: relative;\n  width: 150px;\n  height: 90px;\n  overflow: hidden;\n  border-radius: 8px;\n  background: #f1f5f9;\n}"
  },
  {
    "name": "Micro Progress Fill",
    "className": "roycss-micro-progress-fill",
    "category": "micro-interaction",
    "displayType": "box",
    "css": ".roycss-micro-progress-fill {\n  position: relative;\n  width: 140px;\n  height: 14px;\n  background: #e2e8f0;\n  border-radius: 7px;\n  overflow: hidden;\n  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);\n}"
  },
  {
    "name": "Micro Radio Select",
    "className": "roycss-micro-radio-select",
    "category": "micro-interaction",
    "displayType": "box",
    "css": ".roycss-micro-radio-select {\n  position: relative;\n  width: 38px;\n  height: 38px;\n  background: #ffffff;\n  border: 2px solid #10b981;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.15);\n}"
  },
  {
    "name": "Micro Tab Indicator",
    "className": "roycss-micro-tab-indicator",
    "category": "micro-interaction",
    "displayType": "box",
    "css": ".roycss-micro-tab-indicator {\n  position: relative;\n  width: 150px;\n  height: 50px;\n}"
  },
  {
    "name": "Micro Toast Slide",
    "className": "roycss-micro-toast-slide",
    "category": "micro-interaction",
    "displayType": "box",
    "css": ".roycss-micro-toast-slide {\n  position: relative;\n  width: 150px;\n  height: 80px;\n  overflow: hidden;\n  border-radius: 8px;\n}"
  },
  {
    "name": "Micro Toggle Switch",
    "className": "roycss-micro-toggle-switch",
    "category": "micro-interaction",
    "displayType": "box",
    "css": ".roycss-micro-toggle-switch {\n  position: relative;\n  width: 56px;\n  height: 30px;\n  background: #cbd5e1;\n  border-radius: 15px;\n  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);\n  animation: roy-micro-toggle-bg 3s ease-in-out infinite;\n}\n@keyframes roy-micro-toggle-bg {\n  0%, 45%   { background: #cbd5e1; }"
  },
  {
    "name": "Micro Tooltip Appear",
    "className": "roycss-micro-tooltip-appear",
    "category": "micro-interaction",
    "displayType": "box",
    "css": ".roycss-micro-tooltip-appear {\n  position: relative;\n  width: 130px;\n  height: 70px;\n}"
  },
  {
    "name": "Ascii Rain",
    "className": "roycss-ascii-rain",
    "category": "misc",
    "displayType": "box",
    "css": ".roycss-ascii-rain {\n  width: 100%;\n  min-height: 240px;\n  background:\n    radial-gradient(ellipse at 50% 0%, #001a0a 0%, #000305 100%);\n  position: relative;\n  border-radius: 8px;\n  overflow: hidden;\n}"
  },
  {
    "name": "Blueprint",
    "className": "roycss-blueprint",
    "category": "misc",
    "displayType": "box",
    "css": ".roycss-blueprint {\n  width: 100%;\n  min-height: 240px;\n  background:\n    linear-gradient(0deg,\n      transparent 0 calc(100% - 1px), rgba(180,220,255,0.4) calc(100% - 1px) 100%),\n    linear-gradient(90deg,\n      transparent 0 calc(100% - 1px), rgba(180,220,255,0.4) calc(100% - 1px) 100%),\n    repeating-linear-gradient(0deg, transparent 0 19px, rgba(180,220,255,0.18) 19px 20px),\n    repeating-linear-gradient(90deg, transparent 0 19px, rgba(180,220,255,0.18) 19px 20px),\n    repeating-linear-gradient(0deg, transparent 0 99px, rgba(180,220,255,0.35) 99px 100px),\n    repeating-linear-gradient(90deg, transparent 0 99px, rgba(180,220,255,0.35) 99px 100px),\n    #0a3d7a;\n  background-size: 20px 20px, 20px 20px, 20px 20px, 20px 20px, 100px 100px, 100px 100px, 100% 100%;\n  position: relative;\n  border-radius: 4px;\n  overflow: hidden;\n  color: #cfe8ff;\n}"
  },
  {
    "name": "Bounce Out",
    "className": "roycss-bounce-out",
    "category": "misc",
    "displayType": "box",
    "css": ".roycss-bounce-out {\n  animation: roy-bounce-out 1s ease-in both;\n}\n@keyframes roy-bounce-out {\n  0% { transform: scale(1); opacity: 1; }"
  },
  {
    "name": "Double Conic Spinner",
    "className": "roycss-double-conic-spinner",
    "category": "misc",
    "displayType": "loader",
    "css": ".roycss-double-conic-spinner {\n  width: 100%;\n  height: 100%;\n  min-height: 220px;\n  border-radius: 12px;\n  background: #0f172a;\n  display: grid;\n  place-items: center;\n  position: relative;\n}"
  },
  {
    "name": "Drawer Slide",
    "className": "roycss-drawer-slide",
    "category": "misc",
    "displayType": "box",
    "css": ".roycss-drawer-slide {\n  perspective: 800px;\n  width: 80px;\n  height: 60px;\n  position: relative;\n  background: rgba(16, 185, 129, 0.08);\n  border: 2px solid rgba(16, 185, 129, 0.25);\n  border-radius: 6px;\n}"
  },
  {
    "name": "Film Grain",
    "className": "roycss-film-grain",
    "category": "misc",
    "displayType": "box",
    "css": ".roycss-film-grain {\n  width: 100%;\n  min-height: 240px;\n  background:\n    radial-gradient(ellipse 60% 50% at 30% 30%, #f4a261 0%, transparent 60%),\n    radial-gradient(ellipse 50% 40% at 70% 70%, #e76f51 0%, transparent 60%),\n    linear-gradient(135deg, #264653 0%, #2a9d8f 50%, #e9c46a 100%);\n  position: relative;\n  border-radius: 8px;\n  overflow: hidden;\n  filter: contrast(1.1) saturate(0.9);\n}"
  },
  {
    "name": "Fold",
    "className": "roycss-fold",
    "category": "misc",
    "displayType": "box",
    "css": ".roycss-fold {\n  perspective: 800px;\n  width: 80px;\n  height: 60px;\n  background: linear-gradient(135deg, #10b981, #06b6d4);\n  border-radius: 6px;\n  transition: transform 0.8s ease;\n  transform-origin: top center;\n}"
  },
  {
    "name": "Infinity Loop",
    "className": "roycss-infinity-loop",
    "category": "misc",
    "displayType": "box",
    "css": ".roycss-infinity-loop {\n  position: relative;\n  width: 220px;\n  height: 160px;\n}"
  },
  {
    "name": "Liquid Drop",
    "className": "roycss-liquid-drop",
    "category": "misc",
    "displayType": "box",
    "css": ".roycss-liquid-drop {\n  position: relative;\n  width: 180px;\n  height: 200px;\n  background: linear-gradient(180deg, #1d6a8c 0%, #0d3f56 100%);\n  overflow: hidden;\n  border-radius: 8px;\n}"
  },
  {
    "name": "Liquid Metal",
    "className": "roycss-liquid-metal",
    "category": "misc",
    "displayType": "box",
    "css": ".roycss-liquid-metal {\n  position: relative;\n  width: 200px;\n  height: 160px;\n  border-radius: 50% 50% 45% 55% / 60% 55% 45% 40%;\n  background:\n    radial-gradient(ellipse 60% 40% at 30% 25%, rgba(255,255,255,0.95), transparent 60%),\n    radial-gradient(ellipse 50% 35% at 70% 70%, rgba(120,130,145,0.6), transparent 65%),\n    linear-gradient(125deg,\n      #d6dbe2 0%,\n      #f4f6f9 12%,\n      #8a909a 26%,\n      #e9edf2 40%,\n      #5e6571 52%,\n      #c9ced6 66%,\n      #3e434c 78%,\n      #aab0ba 90%,\n      #6b7280 100%);\n  background-size: 200% 200%;\n  box-shadow:\n    inset -8px -10px 20px rgba(0,0,0,0.45),\n    inset 8px 10px 18px rgba(255,255,255,0.55),\n    0 14px 30px rgba(0,0,0,0.35);\n  filter: contrast(1.15) saturate(0.85);\n  animation: roy-b11-liquid-metal-flow 7s ease-in-out infinite;\n}\n@keyframes roy-b11-liquid-metal-flow {\n  0%, 100% { background-position: 0% 0%; border-radius: 50% 50% 45% 55% / 60% 55% 45% 40%; }"
  },
  {
    "name": "Misc Bubbles",
    "className": "roycss-misc-bubbles",
    "category": "misc",
    "displayType": "bg",
    "css": ".roycss-misc-bubbles {\n  background:\n    radial-gradient(circle at 20% 100%, rgba(255,255,255,0.7) 0 4px, transparent 5px) 0 0 / 60px 60px,\n    radial-gradient(circle at 50% 100%, rgba(255,255,255,0.5) 0 6px, transparent 7px) 0 0 / 80px 80px,\n    radial-gradient(circle at 80% 100%, rgba(255,255,255,0.6) 0 3px, transparent 4px) 0 0 / 50px 50px,\n    linear-gradient(180deg, #2193b0, #6dd5ed);\n  background-repeat: repeat;\n  animation: roy-misc-bubbles 4s linear infinite;\n}\n@keyframes roy-misc-bubbles {\n  from { background-position: 0 0, 0 0, 0 0, 0 0; }"
  },
  {
    "name": "Misc Confetti",
    "className": "roycss-misc-confetti",
    "category": "misc",
    "displayType": "bg",
    "css": ".roycss-misc-confetti {\n  background:\n    radial-gradient(circle at 15% 0%, #ff6b6b 0 3px, transparent 4px) 0 0 / 40px 40px,\n    radial-gradient(circle at 45% 0%, #feca57 0 3px, transparent 4px) 0 0 / 55px 55px,\n    radial-gradient(circle at 75% 0%, #48dbfb 0 3px, transparent 4px) 0 0 / 45px 45px,\n    radial-gradient(circle at 30% 0%, #1dd1a1 0 3px, transparent 4px) 0 0 / 60px 60px,\n    radial-gradient(circle at 90% 0%, #ff9ff3 0 3px, transparent 4px) 0 0 / 50px 50px,\n    linear-gradient(135deg, #1a1a2e, #16213e);\n  background-repeat: repeat;\n  animation: roy-misc-confetti 2.5s linear infinite;\n}\n@keyframes roy-misc-confetti {\n  from { background-position: 0 0, 0 0, 0 0, 0 0, 0 0, 0 0; }"
  },
  {
    "name": "Misc Fireflies",
    "className": "roycss-misc-fireflies",
    "category": "misc",
    "displayType": "bg",
    "css": ".roycss-misc-fireflies {\n  background:\n    radial-gradient(circle at 20% 30%, rgba(212,255,127,0.9) 0 2px, transparent 5px) 0 0 / 100px 100px,\n    radial-gradient(circle at 70% 60%, rgba(212,255,127,0.7) 0 2.5px, transparent 6px) 0 0 / 130px 130px,\n    radial-gradient(circle at 40% 80%, rgba(212,255,127,0.8) 0 1.5px, transparent 4px) 0 0 / 90px 90px,\n    linear-gradient(180deg, #0f0c29, #302b63, #24243e);\n  background-repeat: repeat;\n  animation: roy-misc-fireflies 5s ease-in-out infinite alternate;\n}\n@keyframes roy-misc-fireflies {\n  0%   { background-position: 0 0, 0 0, 0 0, 0 0; filter: brightness(0.6); }"
  },
  {
    "name": "Misc Fireworks",
    "className": "roycss-misc-fireworks",
    "category": "misc",
    "displayType": "bg",
    "css": ".roycss-misc-fireworks {\n  position: relative;\n  background: linear-gradient(180deg, #0a0a23, #1a1a4e);\n  overflow: hidden;\n}"
  },
  {
    "name": "Misc Hologram",
    "className": "roycss-misc-hologram",
    "category": "misc",
    "displayType": "bg",
    "css": ".roycss-misc-hologram {\n  position: relative;\n  width: 80px;\n  height: 80px;\n  background: linear-gradient(115deg,\n    #ff006e 0%, #8338ec 25%, #3a86ff 50%, #06ffa5 75%, #ffbe0b 100%);\n  background-size: 400% 100%;\n  border-radius: 16px;\n  border: 1px solid rgba(255,255,255,0.3);\n  box-shadow: 0 0 22px rgba(131,56,236,0.45);\n  animation: roy-misc-hologram 4s linear infinite;\n}\n@keyframes roy-misc-hologram {\n  0%   { background-position: 0% 0%; }"
  },
  {
    "name": "Misc Pulse Ring Expand",
    "className": "roycss-misc-pulse-ring-expand",
    "category": "misc",
    "displayType": "bg",
    "css": ".roycss-misc-pulse-ring-expand {\n  position: relative;\n  width: 80px;\n  height: 80px;\n  background: transparent;\n  border: none;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}"
  },
  {
    "name": "Misc Rain",
    "className": "roycss-misc-rain",
    "category": "misc",
    "displayType": "bg",
    "css": ".roycss-misc-rain {\n  background:\n    linear-gradient(105deg, transparent 0 48%, rgba(174,194,224,0.6) 48% 50%, transparent 50% 100%) 0 0 / 15px 30px,\n    linear-gradient(105deg, transparent 0 49%, rgba(174,194,224,0.35) 49% 50%, transparent 50% 100%) 0 0 / 25px 40px,\n    linear-gradient(180deg, #1a2a3a, #2c3e50);\n  background-repeat: repeat;\n  animation: roy-misc-rain 0.6s linear infinite;\n}\n@keyframes roy-misc-rain {\n  from { background-position: 0 0, 0 0, 0 0; }"
  },
  {
    "name": "Misc Ripple Click",
    "className": "roycss-misc-ripple-click",
    "category": "misc",
    "displayType": "bg",
    "css": ".roycss-misc-ripple-click {\n  position: relative;\n  width: 80px;\n  height: 80px;\n  background: rgba(16,185,129,0.1);\n  border: 1px solid rgba(16,185,129,0.3);\n  border-radius: 16px;\n  overflow: hidden;\n  cursor: pointer;\n}"
  },
  {
    "name": "Misc Scan Line",
    "className": "roycss-misc-scan-line",
    "category": "misc",
    "displayType": "bg",
    "css": ".roycss-misc-scan-line {\n  position: relative;\n  background:\n    repeating-linear-gradient(0deg, rgba(16,185,129,0.06) 0 2px, transparent 2px 4px),\n    linear-gradient(180deg, #0a1a14, #142822);\n  overflow: hidden;\n}"
  },
  {
    "name": "Misc Shimmer Overlay",
    "className": "roycss-misc-shimmer-overlay",
    "category": "misc",
    "displayType": "bg",
    "css": ".roycss-misc-shimmer-overlay {\n  position: relative;\n  width: 80px;\n  height: 80px;\n  background: linear-gradient(135deg, #10b981, #34d399);\n  border-radius: 16px;\n  overflow: hidden;\n}"
  },
  {
    "name": "Misc Snow",
    "className": "roycss-misc-snow",
    "category": "misc",
    "displayType": "bg",
    "css": ".roycss-misc-snow {\n  background:\n    radial-gradient(circle at 10% 0%, #fff 0 2px, transparent 3px) 0 0 / 30px 30px,\n    radial-gradient(circle at 60% 0%, #fff 0 1.5px, transparent 2px) 0 0 / 45px 45px,\n    radial-gradient(circle at 80% 0%, #fff 0 2.5px, transparent 3px) 0 0 / 35px 35px,\n    radial-gradient(circle at 30% 0%, rgba(255,255,255,0.7) 0 1px, transparent 2px) 0 0 / 25px 25px,\n    linear-gradient(180deg, #0f2027, #203a43, #2c5364);\n  background-repeat: repeat;\n  animation: roy-misc-snow 3s linear infinite;\n}\n@keyframes roy-misc-snow {\n  from { background-position: 0 0, 0 0, 0 0, 0 0, 0 0; }"
  },
  {
    "name": "Misc Sparkles",
    "className": "roycss-misc-sparkles",
    "category": "misc",
    "displayType": "bg",
    "css": ".roycss-misc-sparkles {\n  background:\n    radial-gradient(circle at 15% 25%, #fff 0 1px, transparent 2px) 0 0 / 50px 50px,\n    radial-gradient(circle at 65% 75%, #fff 0 1.5px, transparent 2.5px) 0 0 / 70px 70px,\n    radial-gradient(circle at 85% 15%, #fff 0 1px, transparent 2px) 0 0 / 40px 40px,\n    radial-gradient(circle at 35% 85%, #fff 0 2px, transparent 3px) 0 0 / 60px 60px,\n    linear-gradient(135deg, #0a0a23, #1a1a4e);\n  background-repeat: repeat;\n  animation: roy-misc-sparkles 1.8s ease-in-out infinite alternate;\n}\n@keyframes roy-misc-sparkles {\n  0%   { opacity: 0.4; filter: brightness(0.8); }"
  },
  {
    "name": "Misc Typewriter",
    "className": "roycss-misc-typewriter",
    "category": "misc",
    "displayType": "bg",
    "css": ".roycss-misc-typewriter {\n  display: inline-block;\n  font-family: 'Courier New', monospace;\n  font-weight: bold;\n  color: #10b981;\n  overflow: hidden;\n  white-space: nowrap;\n  border-right: 3px solid #10b981;\n  width: 0;\n  animation:\n    roy-misc-typewriter-type 2.5s steps(6) infinite,\n    roy-misc-typewriter-cursor 0.6s step-end infinite;\n}\n@keyframes roy-misc-typewriter-type {\n  0%, 90%, 100% { width: 0; }"
  },
  {
    "name": "Misc Vhs Effect",
    "className": "roycss-misc-vhs-effect",
    "category": "misc",
    "displayType": "bg",
    "css": ".roycss-misc-vhs-effect {\n  position: relative;\n  background:\n    repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0 2px, transparent 2px 4px),\n    linear-gradient(135deg, #2a0845, #6441a5);\n  overflow: hidden;\n}"
  },
  {
    "name": "Misc Wave",
    "className": "roycss-misc-wave",
    "category": "misc",
    "displayType": "bg",
    "css": ".roycss-misc-wave {\n  background:\n    linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.6) 50%, transparent 100%) 0 30% / 40px 4px repeat-x,\n    linear-gradient(90deg, transparent 0%, rgba(20,184,166,0.5) 50%, transparent 100%) 0 50% / 30px 3px repeat-x,\n    linear-gradient(90deg, transparent 0%, rgba(52,211,153,0.5) 50%, transparent 100%) 0 70% / 50px 4px repeat-x,\n    linear-gradient(180deg, #04293a, #063b52);\n  animation: roy-misc-wave 1.5s linear infinite;\n}\n@keyframes roy-misc-wave {\n  from { background-position: 0 30%, 0 50%, 0 70%, 0 0; }"
  },
  {
    "name": "Natural Drop",
    "className": "roycss-natural-drop",
    "category": "misc",
    "displayType": "box",
    "css": ".roycss-natural-drop {\n  animation: roy-natural-drop 1s cubic-bezier(0.45, 0, 0.55, 1) both;\n}\n@keyframes roy-natural-drop {\n  0% { transform: translateY(-200%) scaleY(0.9); opacity: 0; }"
  },
  {
    "name": "Pendulum Swing Spring",
    "className": "roycss-pendulum-swing-spring",
    "category": "misc",
    "displayType": "box",
    "css": ".roycss-pendulum-swing-spring {\n  transform-origin: top center;\n  animation: roy-pendulum-spring 1.6s cubic-bezier(0.4, 0, 0.6, 1) both;\n}\n@keyframes roy-pendulum-spring {\n  0% { transform: rotate(0deg); }"
  },
  {
    "name": "Pixel Art",
    "className": "roycss-pixel-art",
    "category": "misc",
    "displayType": "box",
    "css": ".roycss-pixel-art {\n  width: 100%;\n  min-height: 240px;\n  background:\n    conic-gradient(from 0deg at 50% 50%,\n      #ff004d 0deg 45deg,\n      #ffa300 45deg 90deg,\n      #ffec27 90deg 135deg,\n      #00e436 135deg 180deg,\n      #29adff 180deg 225deg,\n      #83769c 225deg 270deg,\n      #ff77a8 270deg 315deg,\n      #ff004d 315deg 360deg);\n  background-size: 32px 32px;\n  image-rendering: pixelated;\n  position: relative;\n  border-radius: 0;\n  filter: contrast(1.1) saturate(1.3);\n}"
  },
  {
    "name": "Rubber Snap Back",
    "className": "roycss-rubber-snap-back",
    "category": "misc",
    "displayType": "box",
    "css": ".roycss-rubber-snap-back {\n  animation: roy-rubber-snap 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) both;\n}\n@keyframes roy-rubber-snap {\n  0% { transform: scaleX(1); }"
  },
  {
    "name": "Scrollbar Gutter Stable",
    "className": "roycss-scrollbar-gutter-stable",
    "category": "misc",
    "displayType": "box",
    "css": ".roycss-scrollbar-gutter-stable {\n    padding-right: 22px;\n  }"
  },
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
  },
  {
    "name": "Deep Sea",
    "className": "roycss-deep-sea",
    "category": "nature",
    "displayType": "box",
    "css": ".roycss-deep-sea {\n  position: relative;\n  width: 220px;\n  height: 180px;\n  border-radius: 8px;\n  overflow: hidden;\n  background: linear-gradient(180deg, #1a5f7a 0%, #0d3f56 40%, #061f2e 80%, #02101a 100%);\n}"
  },
  {
    "name": "Frozen Ice",
    "className": "roycss-frozen-ice",
    "category": "nature",
    "displayType": "box",
    "css": ".roycss-frozen-ice {\n  position: relative;\n  width: 200px;\n  height: 160px;\n  border-radius: 14px;\n  overflow: hidden;\n  background:\n    radial-gradient(ellipse 50% 40% at 25% 20%, rgba(255,255,255,0.7), transparent 60%),\n    radial-gradient(ellipse 40% 30% at 75% 75%, rgba(150,210,255,0.5), transparent 60%),\n    linear-gradient(135deg, #d4ebf7 0%, #a8d4ec 35%, #6fa8c8 70%, #cfe8f5 100%);\n  box-shadow:\n    inset 8px 12px 25px rgba(255,255,255,0.6),\n    inset -8px -12px 25px rgba(40,90,140,0.4),\n    0 10px 30px rgba(80,140,180,0.4);\n  border: 1px solid rgba(255,255,255,0.7);\n  backdrop-filter: blur(2px);\n}"
  },
  {
    "name": "Gold Leaf",
    "className": "roycss-gold-leaf",
    "category": "nature",
    "displayType": "box",
    "css": ".roycss-gold-leaf {\n  position: relative;\n  width: 200px;\n  height: 160px;\n  border-radius: 8px;\n  background:\n    radial-gradient(ellipse 30% 25% at 20% 25%, #fff7d0, transparent 55%),\n    radial-gradient(ellipse 25% 20% at 75% 70%, #c8951c, transparent 60%),\n    radial-gradient(ellipse 20% 18% at 65% 30%, #ffe98a, transparent 55%),\n    radial-gradient(ellipse 28% 22% at 30% 75%, #b8821a, transparent 60%),\n    linear-gradient(115deg,\n      #b8821a 0%,\n      #fff3b0 12%,\n      #d4a017 28%,\n      #ffe98a 42%,\n      #a87614 58%,\n      #fff3b0 72%,\n      #c8951c 88%,\n      #8b5a0f 100%);\n  background-size: 220% 220%, 200% 200%, 200% 200%, 200% 200%, 200% 200%;\n  box-shadow:\n    inset 0 0 20px rgba(0,0,0,0.25),\n    inset 6px 8px 14px rgba(255,245,200,0.4),\n    0 8px 22px rgba(80,50,0,0.4);\n  filter: contrast(1.1) saturate(1.2);\n  animation: roy-b11-gold-leaf-shimmer 6s ease-in-out infinite;\n}\n@keyframes roy-b11-gold-leaf-shimmer {\n  0%, 100% { background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%; }"
  },
  {
    "name": "Heat Haze",
    "className": "roycss-heat-haze",
    "category": "nature",
    "displayType": "box",
    "css": ".roycss-heat-haze {\n  position: relative;\n  width: 220px;\n  height: 180px;\n  border-radius: 8px;\n  overflow: hidden;\n  background:\n    linear-gradient(180deg, #87ceeb 0%, #ffd89b 60%, #ff6b35 100%);\n}"
  },
  {
    "name": "Molten Lava",
    "className": "roycss-molten-lava",
    "category": "nature",
    "displayType": "box",
    "css": ".roycss-molten-lava {\n  position: relative;\n  width: 220px;\n  height: 160px;\n  border-radius: 14px;\n  overflow: hidden;\n  background: #1a0805;\n  box-shadow: 0 0 30px rgba(255,80,0,0.45), inset 0 0 40px rgba(0,0,0,0.5);\n}"
  },
  {
    "name": "Northern Lights",
    "className": "roycss-northern-lights",
    "category": "nature",
    "displayType": "box",
    "css": ".roycss-northern-lights {\n  position: relative;\n  width: 240px;\n  height: 180px;\n  border-radius: 10px;\n  overflow: hidden;\n  background: linear-gradient(180deg, #0a0f24 0%, #061226 60%, #02060f 100%);\n}"
  },
  {
    "name": "Oil Slick",
    "className": "roycss-oil-slick",
    "category": "nature",
    "displayType": "box",
    "css": ".roycss-oil-slick {\n  position: relative;\n  width: 220px;\n  height: 160px;\n  border-radius: 16px;\n  overflow: hidden;\n  background: radial-gradient(ellipse at 50% 60%, #0a0d12 0%, #02040a 100%);\n}"
  },
  {
    "name": "Painting Oil",
    "className": "roycss-painting-oil",
    "category": "nature",
    "displayType": "box",
    "css": ".roycss-painting-oil {\n  width: 100%;\n  min-height: 240px;\n  background:\n    repeating-linear-gradient(35deg,\n      #8b1a1a 0 20px, #c84040 20px 38px, #5a0808 38px 60px,\n      #d4604a 60px 80px, #6b1414 80px 102px),\n    repeating-linear-gradient(-25deg,\n      #2a4d8a 0 24px, #4a7bc8 24px 48px, #1a2d55 48px 72px),\n    linear-gradient(135deg, #c84040 0%, #2a4d8a 50%, #8b1a1a 100%);\n  background-blend-mode: overlay, overlay, normal;\n  filter: contrast(1.2) saturate(1.3);\n  position: relative;\n  border-radius: 8px;\n}"
  },
  {
    "name": "Pencil Sketch",
    "className": "roycss-pencil-sketch",
    "category": "nature",
    "displayType": "box",
    "css": ".roycss-pencil-sketch {\n  width: 100%;\n  min-height: 240px;\n  background:\n    repeating-linear-gradient(45deg,\n      transparent 0 2px,\n      rgba(40,40,40,0.35) 2px 2.4px,\n      transparent 2.4px 5px),\n    repeating-linear-gradient(-45deg,\n      transparent 0 2px,\n      rgba(40,40,40,0.25) 2px 2.4px,\n      transparent 2.4px 5px),\n    repeating-linear-gradient(90deg,\n      transparent 0 3px,\n      rgba(40,40,40,0.12) 3px 3.4px,\n      transparent 3.4px 7px),\n    linear-gradient(180deg, #f5f0e6 0%, #ebe5d5 100%);\n  background-blend-mode: multiply, multiply, multiply, normal;\n  position: relative;\n  border-radius: 8px;\n  overflow: hidden;\n}"
  },
  {
    "name": "Soap Bubble",
    "className": "roycss-soap-bubble",
    "category": "nature",
    "displayType": "box",
    "css": ".roycss-soap-bubble {\n  position: relative;\n  width: 180px;\n  height: 180px;\n  border-radius: 50%;\n  background:\n    radial-gradient(circle at 32% 28%, rgba(255,255,255,0.95), rgba(255,255,255,0.05) 18%, transparent 32%),\n    radial-gradient(circle at 70% 65%, rgba(255,0,200,0.35), transparent 40%),\n    radial-gradient(circle at 30% 75%, rgba(0,255,200,0.35), transparent 40%),\n    radial-gradient(circle at 75% 25%, rgba(255,220,0,0.3), transparent 40%),\n    conic-gradient(from 30deg,\n      rgba(255,80,180,0.35),\n      rgba(80,200,255,0.35),\n      rgba(180,255,120,0.35),\n      rgba(255,200,80,0.35),\n      rgba(180,80,255,0.35),\n      rgba(255,80,180,0.35));\n  box-shadow:\n    inset 0 0 40px rgba(255,255,255,0.25),\n    inset -20px -25px 50px rgba(80,0,120,0.25),\n    inset 15px 20px 40px rgba(0,180,255,0.25),\n    0 8px 30px rgba(0,0,0,0.2);\n  border: 1px solid rgba(255,255,255,0.4);\n  filter: saturate(1.2);\n  animation: roy-b11-soap-bubble-float 6s ease-in-out infinite;\n}\n@keyframes roy-b11-soap-bubble-float {\n  0%, 100% { transform: translateY(0) rotate(0deg); filter: saturate(1.2) hue-rotate(0deg); }"
  },
  {
    "name": "Stained Glass",
    "className": "roycss-stained-glass",
    "category": "nature",
    "displayType": "box",
    "css": ".roycss-stained-glass {\n  position: relative;\n  width: 200px;\n  height: 180px;\n  border-radius: 8px;\n  overflow: hidden;\n  background:\n    linear-gradient(115deg, #1a1a1a 0 8%, transparent 8% 9%, #1a1a1a 9% 17%, transparent 17% 18%, #1a1a1a 18% 26%, transparent 26% 27%, #1a1a1a 27% 35%, transparent 35% 36%, #1a1a1a 36% 44%, transparent 44% 45%, #1a1a1a 45% 53%, transparent 53% 54%, #1a1a1a 54% 62%, transparent 62% 63%, #1a1a1a 63% 71%, transparent 71% 72%, #1a1a1a 72% 80%, transparent 80% 81%, #1a1a1a 81% 89%, transparent 89% 90%, #1a1a1a 90% 100%),\n    linear-gradient(25deg, #1a1a1a 0 9%, transparent 9% 10%, #1a1a1a 10% 19%, transparent 19% 20%, #1a1a1a 20% 29%, transparent 29% 30%, #1a1a1a 30% 39%, transparent 39% 40%, #1a1a1a 40% 49%, transparent 49% 50%, #1a1a1a 50% 59%, transparent 59% 60%, #1a1a1a 60% 69%, transparent 69% 70%, #1a1a1a 70% 79%, transparent 79% 80%, #1a1a1a 80% 89%, transparent 89% 90%, #1a1a1a 90% 100%),\n    radial-gradient(circle at 20% 25%, #c8102e 0 22%, transparent 22%),\n    radial-gradient(circle at 75% 20%, #ffd700 0 18%, transparent 18%),\n    radial-gradient(circle at 30% 70%, #1e90ff 0 24%, transparent 24%),\n    radial-gradient(circle at 80% 75%, #9400d3 0 20%, transparent 20%),\n    radial-gradient(circle at 55% 45%, #ff8c00 0 18%, transparent 18%),\n    radial-gradient(circle at 50% 90%, #2ecc71 0 16%, transparent 16%),\n    linear-gradient(45deg, #4a0e6b, #8b1a3a, #1a4a8b, #6b8b1a);\n  background-blend-mode: normal, normal, screen, screen, screen, screen, screen, screen, normal;\n  filter: saturate(1.3) brightness(1.05);\n  box-shadow: 0 0 25px rgba(255,200,100,0.3), inset 0 0 0 2px #1a1a1a;\n}"
  },
  {
    "name": "Topographic",
    "className": "roycss-topographic",
    "category": "nature",
    "displayType": "box",
    "css": ".roycss-topographic {\n  width: 100%;\n  min-height: 240px;\n  background:\n    repeating-radial-gradient(circle at 30% 40%,\n      transparent 0,\n      transparent 14px,\n      rgba(120,80,30,0.5) 14px,\n      rgba(120,80,30,0.5) 15px),\n    repeating-radial-gradient(circle at 70% 60%,\n      transparent 0,\n      transparent 18px,\n      rgba(100,60,20,0.45) 18px,\n      rgba(100,60,20,0.45) 19px),\n    repeating-radial-gradient(circle at 50% 80%,\n      transparent 0,\n      transparent 12px,\n      rgba(80,40,10,0.4) 12px,\n      rgba(80,40,10,0.4) 13px),\n    radial-gradient(ellipse at 30% 40%, #f4e4c1 0%, #d4b888 50%, #8b6b3a 100%);\n  position: relative;\n  border-radius: 8px;\n  overflow: hidden;\n}"
  },
  {
    "name": "Velvet Fabric",
    "className": "roycss-velvet-fabric",
    "category": "nature",
    "displayType": "box",
    "css": ".roycss-velvet-fabric {\n  position: relative;\n  width: 200px;\n  height: 160px;\n  border-radius: 12px;\n  background:\n    radial-gradient(ellipse 70% 50% at 30% 30%, rgba(180,40,90,0.7), transparent 60%),\n    radial-gradient(ellipse 60% 50% at 75% 70%, rgba(60,0,30,0.85), transparent 65%),\n    linear-gradient(135deg, #7a0e3a 0%, #4a0520 50%, #6a0c30 100%);\n  box-shadow:\n    inset 0 0 30px rgba(0,0,0,0.6),\n    inset 8px 10px 18px rgba(255,120,170,0.25),\n    inset -8px -10px 18px rgba(0,0,0,0.5),\n    0 10px 25px rgba(40,0,15,0.5);\n}"
  },
  {
    "name": "Water Ripple",
    "className": "roycss-water-ripple",
    "category": "nature",
    "displayType": "box",
    "css": ".roycss-water-ripple {\n  position: relative;\n  width: 200px;\n  height: 200px;\n  border-radius: 50%;\n  background: radial-gradient(circle, #4fb3d9 0%, #1d6a8c 70%, #0d3f56 100%);\n  overflow: hidden;\n}"
  },
  {
    "name": "Watercolor",
    "className": "roycss-watercolor",
    "category": "nature",
    "displayType": "box",
    "css": ".roycss-watercolor {\n  width: 100%;\n  min-height: 240px;\n  background:\n    radial-gradient(ellipse 50% 40% at 25% 35%, rgba(255,150,180,0.7), transparent 60%),\n    radial-gradient(ellipse 45% 35% at 70% 30%, rgba(150,200,255,0.65), transparent 65%),\n    radial-gradient(ellipse 55% 40% at 60% 75%, rgba(255,220,120,0.6), transparent 60%),\n    radial-gradient(ellipse 35% 30% at 30% 80%, rgba(180,255,180,0.55), transparent 65%),\n    radial-gradient(ellipse 30% 25% at 85% 65%, rgba(220,150,255,0.55), transparent 65%),\n    linear-gradient(135deg, #faf6ee 0%, #f0e8d8 100%);\n  background-blend-mode: multiply, multiply, multiply, multiply, multiply, normal;\n  filter: blur(0.5px) contrast(0.95);\n  position: relative;\n  border-radius: 8px;\n  overflow: hidden;\n}"
  },
  {
    "name": "Nav Accordion",
    "className": "roycss-nav-accordion",
    "category": "navigation",
    "displayType": "box",
    "css": ".roycss-nav-accordion {\n  position: relative;\n  width: 180px;\n  height: 34px;\n  background: rgba(255,255,255,0.04);\n  border: 1px solid rgba(255,255,255,0.12);\n  border-radius: 8px;\n  font: 11px/1 system-ui, sans-serif;\n  color: rgba(255,255,255,0.8);\n  overflow: hidden;\n  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1),\n              border-color 0.3s ease;\n}"
  },
  {
    "name": "Nav Breadcrumb",
    "className": "roycss-nav-breadcrumb",
    "category": "navigation",
    "displayType": "box",
    "css": ".roycss-nav-breadcrumb {\n  position: relative;\n  width: 240px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font: 11px/1 system-ui, sans-serif;\n  letter-spacing: 0.05em;\n}"
  },
  {
    "name": "Nav Dropdown",
    "className": "roycss-nav-dropdown",
    "category": "navigation",
    "displayType": "box",
    "css": ".roycss-nav-dropdown {\n  position: relative;\n  width: 180px;\n  height: 34px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 14px;\n  background: rgba(255,255,255,0.04);\n  border: 1px solid rgba(255,255,255,0.12);\n  border-radius: 8px;\n  font: 11px/1 system-ui, sans-serif;\n  color: rgba(255,255,255,0.8);\n  overflow: hidden;\n  transition: height 0.35s cubic-bezier(0.4, 0, 0.2, 1),\n              border-color 0.3s ease;\n}"
  },
  {
    "name": "Nav Menu Fade",
    "className": "roycss-nav-menu-fade",
    "category": "navigation",
    "displayType": "box",
    "css": ".roycss-nav-menu-fade {\n  position: relative;\n  width: 220px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255,255,255,0.04);\n  border: 1px solid rgba(255,255,255,0.1);\n  border-radius: 10px;\n  font: 11px/1 system-ui, sans-serif;\n  color: rgba(255,255,255,0.7);\n  overflow: hidden;\n  letter-spacing: 0.15em;\n}"
  },
  {
    "name": "Nav Menu Scale",
    "className": "roycss-nav-menu-scale",
    "category": "navigation",
    "displayType": "box",
    "css": ".roycss-nav-menu-scale {\n  position: relative;\n  width: 220px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255,255,255,0.04);\n  border: 1px solid rgba(255,255,255,0.1);\n  border-radius: 10px;\n  font: 11px/1 system-ui, sans-serif;\n  color: rgba(255,255,255,0.7);\n  letter-spacing: 0.15em;\n  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n}"
  },
  {
    "name": "Nav Menu Slide",
    "className": "roycss-nav-menu-slide",
    "category": "navigation",
    "displayType": "box",
    "css": ".roycss-nav-menu-slide {\n  position: relative;\n  width: 220px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255,255,255,0.04);\n  border: 1px solid rgba(255,255,255,0.1);\n  border-radius: 10px;\n  font: 11px/1 system-ui, sans-serif;\n  color: rgba(255,255,255,0.7);\n  overflow: hidden;\n  letter-spacing: 0.15em;\n}"
  },
  {
    "name": "Nav Pagination",
    "className": "roycss-nav-pagination",
    "category": "navigation",
    "displayType": "box",
    "css": ".roycss-nav-pagination {\n  position: relative;\n  width: 200px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font: 11px/1 system-ui, sans-serif;\n  color: rgba(255,255,255,0.6);\n  letter-spacing: 0.3em;\n}"
  },
  {
    "name": "Nav Progress Indicator",
    "className": "roycss-nav-progress-indicator",
    "category": "navigation",
    "displayType": "box",
    "css": ".roycss-nav-progress-indicator {\n  position: relative;\n  width: 120px;\n  height: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n}"
  },
  {
    "name": "Nav Stepper",
    "className": "roycss-nav-stepper",
    "category": "navigation",
    "displayType": "box",
    "css": ".roycss-nav-stepper {\n  position: relative;\n  width: 220px;\n  height: 50px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}"
  },
  {
    "name": "Nav Tabs Underline",
    "className": "roycss-nav-tabs-underline",
    "category": "navigation",
    "displayType": "box",
    "css": ".roycss-nav-tabs-underline {\n  position: relative;\n  width: 200px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font: 11px/1 system-ui, sans-serif;\n  color: rgba(255,255,255,0.6);\n  letter-spacing: 0.12em;\n}"
  },
  {
    "name": "Offset Path Draw",
    "className": "roycss-offset-path-draw",
    "category": "offset-path",
    "displayType": "box",
    "css": ".roycss-offset-path-draw {\n  width: 220px;\n  height: 140px;\n  border-radius: 14px;\n  background: #0f172a;\n  position: relative;\n  overflow: hidden;\n}"
  },
  {
    "name": "Offset Path Orbit",
    "className": "roycss-offset-path-orbit",
    "category": "offset-path",
    "displayType": "box",
    "css": ".roycss-offset-path-orbit {\n  width: 180px;\n  height: 180px;\n  border-radius: 50%;\n  background: radial-gradient(circle, #1e293b 40%, #0f172a 41%);\n  position: relative;\n  display: grid;\n  place-items: center;\n}"
  },
  {
    "name": "Offset Path Wave",
    "className": "roycss-offset-path-wave",
    "category": "offset-path",
    "displayType": "box",
    "css": ".roycss-offset-path-wave {\n  width: 220px;\n  height: 120px;\n  border-radius: 14px;\n  background: linear-gradient(180deg, #0f172a, #1e293b);\n  position: relative;\n  overflow: hidden;\n}"
  },
  {
    "name": "Page Circle Reveal",
    "className": "roycss-page-circle-reveal",
    "category": "page-transition",
    "displayType": "box",
    "css": ".roycss-page-circle-reveal {\n  position: relative;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  overflow: hidden;\n}"
  },
  {
    "name": "Page Cube",
    "className": "roycss-page-cube",
    "category": "page-transition",
    "displayType": "box",
    "css": ".roycss-page-cube {\n  position: relative;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  overflow: hidden;\n  perspective: 700px;\n}"
  },
  {
    "name": "Page Curtain",
    "className": "roycss-page-curtain",
    "category": "page-transition",
    "displayType": "box",
    "css": ".roycss-page-curtain {\n  position: relative;\n  background: linear-gradient(135deg, #7c3aed, #db2777);\n  overflow: hidden;\n}"
  },
  {
    "name": "Page Dissolve",
    "className": "roycss-page-dissolve",
    "category": "page-transition",
    "displayType": "box",
    "css": ".roycss-page-dissolve {\n  position: relative;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  overflow: hidden;\n}"
  },
  {
    "name": "Page Fade",
    "className": "roycss-page-fade",
    "category": "page-transition",
    "displayType": "box",
    "css": ".roycss-page-fade {\n  position: relative;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  overflow: hidden;\n}"
  },
  {
    "name": "Page Flip",
    "className": "roycss-page-flip",
    "category": "page-transition",
    "displayType": "box",
    "css": ".roycss-page-flip {\n  position: relative;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  overflow: hidden;\n  perspective: 800px;\n}"
  },
  {
    "name": "Page Liquid",
    "className": "roycss-page-liquid",
    "category": "page-transition",
    "displayType": "box",
    "css": ".roycss-page-liquid {\n  position: relative;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  overflow: hidden;\n}"
  },
  {
    "name": "Page Mask Reveal",
    "className": "roycss-page-mask-reveal",
    "category": "page-transition",
    "displayType": "box",
    "css": ".roycss-page-mask-reveal {\n  position: relative;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  overflow: hidden;\n}"
  },
  {
    "name": "Page Shutter",
    "className": "roycss-page-shutter",
    "category": "page-transition",
    "displayType": "box",
    "css": ".roycss-page-shutter {\n  position: relative;\n  background: linear-gradient(135deg, #f59e0b, #ef4444);\n  overflow: hidden;\n}"
  },
  {
    "name": "Page Slide Left",
    "className": "roycss-page-slide-left",
    "category": "page-transition",
    "displayType": "box",
    "css": ".roycss-page-slide-left {\n  position: relative;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  overflow: hidden;\n}"
  },
  {
    "name": "Page Slide Up",
    "className": "roycss-page-slide-up",
    "category": "page-transition",
    "displayType": "box",
    "css": ".roycss-page-slide-up {\n  position: relative;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  overflow: hidden;\n}"
  },
  {
    "name": "Page Zoom",
    "className": "roycss-page-zoom",
    "category": "page-transition",
    "displayType": "box",
    "css": ".roycss-page-zoom {\n  position: relative;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n  overflow: hidden;\n}"
  },
  {
    "name": "Particles Bubbles",
    "className": "roycss-particles-bubbles",
    "category": "particles",
    "displayType": "bg",
    "css": ".roycss-particles-bubbles {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: linear-gradient(180deg, #0e7490 0%, #06b6d4 50%, #0891b2 100%);\n}"
  },
  {
    "name": "Particles Confetti Burst",
    "className": "roycss-particles-confetti-burst",
    "category": "particles",
    "displayType": "bg",
    "css": ".roycss-particles-confetti-burst {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: radial-gradient(circle at center, #1a1a3e 0%, #0f0f1e 100%);\n}"
  },
  {
    "name": "Particles Dust",
    "className": "roycss-particles-dust",
    "category": "particles",
    "displayType": "bg",
    "css": ".roycss-particles-dust {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: linear-gradient(135deg, #4a3520 0%, #6b4e2e 40%, #8b6b3a 70%, #5a3f25 100%);\n}"
  },
  {
    "name": "Particles Fire",
    "className": "roycss-particles-fire",
    "category": "particles",
    "displayType": "bg",
    "css": ".roycss-particles-fire {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: linear-gradient(180deg, #2d0a00 0%, #4a1500 40%, #1a0500 100%);\n}"
  },
  {
    "name": "Particles Fireflies",
    "className": "roycss-particles-fireflies",
    "category": "particles",
    "displayType": "bg",
    "css": ".roycss-particles-fireflies {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: linear-gradient(180deg, #0a1f0a 0%, #14281a 50%, #0a1f12 100%);\n}"
  },
  {
    "name": "Particles Floating Dots",
    "className": "roycss-particles-floating-dots",
    "category": "particles",
    "displayType": "bg",
    "css": ".roycss-particles-floating-dots {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);\n}"
  },
  {
    "name": "Particles Orbiting",
    "className": "roycss-particles-orbiting",
    "category": "particles",
    "displayType": "bg",
    "css": ".roycss-particles-orbiting {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: radial-gradient(circle at center, #1e1b4b 0%, #0f0a2e 60%, #050314 100%);\n}"
  },
  {
    "name": "Particles Rain",
    "className": "roycss-particles-rain",
    "category": "particles",
    "displayType": "bg",
    "css": ".roycss-particles-rain {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: linear-gradient(180deg, #1a2533 0%, #243447 50%, #161e2a 100%);\n}"
  },
  {
    "name": "Particles Smoke",
    "className": "roycss-particles-smoke",
    "category": "particles",
    "displayType": "bg",
    "css": ".roycss-particles-smoke {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 50%, #0f0f0f 100%);\n}"
  },
  {
    "name": "Particles Snow Fall",
    "className": "roycss-particles-snow-fall",
    "category": "particles",
    "displayType": "bg",
    "css": ".roycss-particles-snow-fall {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: linear-gradient(180deg, #1e2a4a 0%, #2c3e6b 50%, #1a2540 100%);\n}"
  },
  {
    "name": "Particles Sparks",
    "className": "roycss-particles-sparks",
    "category": "particles",
    "displayType": "bg",
    "css": ".roycss-particles-sparks {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: linear-gradient(180deg, #1a0a00 0%, #2d1100 50%, #1a0a00 100%);\n}"
  },
  {
    "name": "Particles Stars Twinkle",
    "className": "roycss-particles-stars-twinkle",
    "category": "particles",
    "displayType": "bg",
    "css": ".roycss-particles-stars-twinkle {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  padding: 0;\n  background: radial-gradient(ellipse at top, #1a1a4e 0%, #0a0a23 60%, #050511 100%);\n}"
  },
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
  },
  {
    "name": "Scroll Driven Blur",
    "className": "roycss-scroll-driven-blur",
    "category": "scroll",
    "displayType": "box",
    "css": ".roycss-scroll-driven-blur {\n    animation: roy-scroll-blur-fallback 2.6s ease-in-out infinite alternate;\n  }\n@keyframes roy-scroll-blur-fallback {\n    0% { filter: blur(12px); opacity: 0.4; transform: scale(1.05); }"
  },
  {
    "name": "Scroll Driven Color",
    "className": "roycss-scroll-driven-color",
    "category": "scroll",
    "displayType": "box",
    "css": ".roycss-scroll-driven-color {\n    animation: roy-scroll-color-fallback 4s ease-in-out infinite alternate;\n  }\n@keyframes roy-scroll-color-fallback {\n    0% { background: #5e6ad2; color: #fff; }"
  },
  {
    "name": "Scroll Driven Fade",
    "className": "roycss-scroll-driven-fade",
    "category": "scroll",
    "displayType": "box",
    "css": ".roycss-scroll-driven-fade {\n    animation: roy-scroll-fade-fallback 2s ease-in-out infinite alternate;\n  }\n@keyframes roy-scroll-fade-fallback {\n    0% { opacity: 0; }"
  },
  {
    "name": "Scroll Driven Progress Ring",
    "className": "roycss-scroll-driven-progress-ring",
    "category": "scroll",
    "displayType": "box",
    "css": ".roycss-scroll-driven-progress-ring {\n    animation: roy-scroll-ring-fallback 2s linear infinite alternate;\n  }\n@keyframes roy-scroll-ring-fallback {\n    0% {\n      background:\n        conic-gradient(#5e6ad2 0deg, #5e6ad2 0deg, #27272a 0deg, #27272a 360deg);\n    }"
  },
  {
    "name": "Scroll Driven Rotate",
    "className": "roycss-scroll-driven-rotate",
    "category": "scroll",
    "displayType": "box",
    "css": ".roycss-scroll-driven-rotate {\n    animation: roy-scroll-rotate-fallback 3s ease-in-out infinite alternate;\n  }\n@keyframes roy-scroll-rotate-fallback {\n    0% { transform: rotate(-45deg); }"
  },
  {
    "name": "Scroll Driven Scale",
    "className": "roycss-scroll-driven-scale",
    "category": "scroll",
    "displayType": "box",
    "css": ".roycss-scroll-driven-scale {\n    animation: roy-scroll-scale-fallback 2.4s ease-in-out infinite alternate;\n  }\n@keyframes roy-scroll-scale-fallback {\n    0% { transform: scale(0.6); opacity: 0.4; }"
  },
  {
    "name": "Scroll Driven Sticky",
    "className": "roycss-scroll-driven-sticky",
    "category": "scroll",
    "displayType": "box",
    "css": ".roycss-scroll-driven-sticky {\n    animation: roy-scroll-sticky-fallback 2s ease-in-out infinite alternate;\n  }\n@keyframes roy-scroll-sticky-fallback {\n    0% { box-shadow: 0 0 0 rgba(0, 0, 0, 0); border-color: #27272a; }"
  },
  {
    "name": "Scroll Driven Translate",
    "className": "roycss-scroll-driven-translate",
    "category": "scroll",
    "displayType": "box",
    "css": ".roycss-scroll-driven-translate {\n    animation: roy-scroll-translate-fallback 2.5s ease-in-out infinite alternate;\n  }\n@keyframes roy-scroll-translate-fallback {\n    0% { transform: translateX(-80px); opacity: 0.4; }"
  },
  {
    "name": "Scroll Fade Out",
    "className": "roycss-scroll-fade-out",
    "category": "scroll",
    "displayType": "box",
    "css": ".roycss-scroll-fade-out {\n  animation: roy-scroll-fade-out 2.6s ease-in-out infinite;\n  will-change: opacity, transform;\n}\n@keyframes roy-scroll-fade-out {\n  0%, 25% { opacity: 1; transform: translateY(0); }"
  },
  {
    "name": "Scroll Horizontal",
    "className": "roycss-scroll-horizontal",
    "category": "scroll",
    "displayType": "box",
    "css": ".roycss-scroll-horizontal {\n  position: relative;\n  width: 100%;\n  height: 6px;\n  background: rgba(148, 163, 184, 0.25);\n  border-radius: 999px;\n  overflow: hidden;\n}"
  },
  {
    "name": "Scroll Indicator",
    "className": "roycss-scroll-indicator",
    "category": "scroll",
    "displayType": "box",
    "css": ".roycss-scroll-indicator {\n  position: relative;\n  width: 28px;\n  height: 46px;\n  border: 2px solid rgba(16, 185, 129, 0.65);\n  border-radius: 14px;\n  background: transparent;\n}"
  },
  {
    "name": "Scroll Parallax Slow",
    "className": "roycss-scroll-parallax-slow",
    "category": "scroll",
    "displayType": "box",
    "css": ".roycss-scroll-parallax-slow {\n  position: relative;\n  overflow: hidden;\n  background: linear-gradient(135deg, #0f172a, #1e293b);\n}"
  },
  {
    "name": "Scroll Progress Bar",
    "className": "roycss-scroll-progress-bar",
    "category": "scroll",
    "displayType": "box",
    "css": ".roycss-scroll-progress-bar {\n  position: relative;\n  width: 100%;\n  height: 8px;\n  background: rgba(148, 163, 184, 0.25);\n  border-radius: 999px;\n  overflow: hidden;\n}"
  },
  {
    "name": "Scroll Reveal Left",
    "className": "roycss-scroll-reveal-left",
    "category": "scroll",
    "displayType": "box",
    "css": ".roycss-scroll-reveal-left {\n  animation: roy-scroll-reveal-left 2.6s ease-in-out infinite;\n  will-change: opacity, transform;\n}\n@keyframes roy-scroll-reveal-left {\n  0% { opacity: 0; transform: translateX(-60px); }"
  },
  {
    "name": "Scroll Reveal Right",
    "className": "roycss-scroll-reveal-right",
    "category": "scroll",
    "displayType": "box",
    "css": ".roycss-scroll-reveal-right {\n  animation: roy-scroll-reveal-right 2.6s ease-in-out infinite;\n  will-change: opacity, transform;\n}\n@keyframes roy-scroll-reveal-right {\n  0% { opacity: 0; transform: translateX(60px); }"
  },
  {
    "name": "Scroll Reveal Rotate",
    "className": "roycss-scroll-reveal-rotate",
    "category": "scroll",
    "displayType": "box",
    "css": ".roycss-scroll-reveal-rotate {\n  animation: roy-scroll-reveal-rotate 2.6s ease-in-out infinite;\n  will-change: opacity, transform;\n}\n@keyframes roy-scroll-reveal-rotate {\n  0% { opacity: 0; transform: rotate(-15deg) scale(0.85); }"
  },
  {
    "name": "Scroll Reveal Scale",
    "className": "roycss-scroll-reveal-scale",
    "category": "scroll",
    "displayType": "box",
    "css": ".roycss-scroll-reveal-scale {\n  animation: roy-scroll-reveal-scale 2.6s ease-in-out infinite;\n  will-change: opacity, transform;\n}\n@keyframes roy-scroll-reveal-scale {\n  0% { opacity: 0; transform: scale(0.6); }"
  },
  {
    "name": "Scroll Reveal Up",
    "className": "roycss-scroll-reveal-up",
    "category": "scroll",
    "displayType": "box",
    "css": ".roycss-scroll-reveal-up {\n  opacity: 0;\n  transform: translateY(40px);\n  transition: opacity 0.6s ease, transform 0.6s ease;\n  will-change: opacity, transform;\n}"
  },
  {
    "name": "Scroll Sticky Header",
    "className": "roycss-scroll-sticky-header",
    "category": "scroll",
    "displayType": "box",
    "css": ".roycss-scroll-sticky-header {\n  display: flex;\n  align-items: center;\n  height: 64px;\n  padding: 0 22px;\n  background: linear-gradient(90deg, #0f172a, #1e293b);\n  border: 1px solid rgba(148, 163, 184, 0.3);\n  border-radius: 10px;\n  color: #e2e8f0;\n  font-size: 18px;\n  font-weight: 700;\n  letter-spacing: 0.02em;\n  box-shadow: 0 6px 20px rgba(2, 6, 23, 0.4);\n  animation: roy-scroll-sticky-shrink 3.2s ease-in-out infinite;\n}\n@keyframes roy-scroll-sticky-shrink {\n  0%, 35% {\n    height: 64px;\n    font-size: 18px;\n    padding: 0 22px;\n    background: linear-gradient(90deg, #0f172a, #1e293b);\n    box-shadow: 0 6px 20px rgba(2, 6, 23, 0.4);\n  }"
  },
  {
    "name": "Scroll Timeline Spin",
    "className": "roycss-scroll-timeline-spin",
    "category": "scroll",
    "displayType": "box",
    "css": ".roycss-scroll-timeline-spin {\n    animation: roy-b10-sts-spin 3s linear infinite;\n  }\n@keyframes roy-b10-sts-spin {\n  from { transform: rotate(0deg); }"
  },
  {
    "name": "Scroll Zoom In",
    "className": "roycss-scroll-zoom-in",
    "category": "scroll",
    "displayType": "box",
    "css": ".roycss-scroll-zoom-in {\n  animation: roy-scroll-zoom-in 2.8s ease-in-out infinite;\n  will-change: opacity, transform;\n}\n@keyframes roy-scroll-zoom-in {\n  0% { opacity: 0.4; transform: scale(0.8); }"
  },
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
  },
  {
    "name": "SVG Displacement Wave",
    "className": "roycss-svg-displacement-wave",
    "category": "svg",
    "displayType": "icon",
    "css": ".roycss-svg-displacement-wave { filter: none; }"
  },
  {
    "name": "SVG Gooey Merge",
    "className": "roycss-svg-gooey-merge",
    "category": "svg",
    "displayType": "icon",
    "css": ".roycss-svg-gooey-merge { filter: none; }"
  },
  {
    "name": "SVG Turbulence Distort",
    "className": "roycss-svg-turbulence-distort",
    "category": "svg",
    "displayType": "icon",
    "css": ".roycss-svg-turbulence-distort { filter: none; }"
  },
  {
    "name": "Text 3D Cinema",
    "className": "roycss-text-3d-cinema",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-3d-cinema {\n  display: inline-block;\n  position: relative;\n  font: 900 72px/1 'Arial Black', sans-serif;\n  letter-spacing: 0.06em;\n  color: #fff7d0;\n  padding: 30px 40px;\n  background: linear-gradient(180deg, #1a0f00 0%, #000 100%);\n  border-radius: 10px;\n  text-shadow:\n    1px 1px 0 #8b6914,\n    2px 2px 0 #8b6914,\n    3px 3px 0 #75590f,\n    4px 4px 0 #75590f,\n    5px 5px 0 #5e470c,\n    6px 6px 0 #5e470c,\n    7px 7px 0 #473608,\n    8px 8px 0 #473608,\n    9px 9px 0 #2f2406,\n    10px 10px 0 #2f2406,\n    11px 11px 8px rgba(0,0,0,0.6),\n    14px 14px 20px rgba(0,0,0,0.8);\n  background-clip: border-box;\n  filter: drop-shadow(0 0 12px rgba(255,200,80,0.4));\n  animation: roy-b11-text-3d-cinema-light 4s ease-in-out infinite;\n}\n@keyframes roy-b11-text-3d-cinema-light {\n  0%, 100% { filter: drop-shadow(0 0 12px rgba(255,200,80,0.4)) brightness(1); }"
  },
  {
    "name": "Text 3D Shadow",
    "className": "roycss-text-3d-shadow",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-3d-shadow {\n  color: #f0fdf4;\n  text-shadow:\n    1px 1px 0 #065f46,\n    2px 2px 0 #047857,\n    3px 3px 0 #059669,\n    4px 4px 0 #10b981,\n    5px 5px 0 rgba(16, 185, 129, 0.4),\n    6px 6px 10px rgba(0, 0, 0, 0.3);\n  font-weight: 700;\n}"
  },
  {
    "name": "Text Blur Reveal",
    "className": "roycss-text-blur-reveal",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-blur-reveal {\n  color: #10b981;\n  font-weight: 700;\n  animation: roy-blur-reveal 4s ease-in-out infinite;\n}\n@keyframes roy-blur-reveal {\n  0%, 100% { filter: blur(8px); opacity: 0.4; }"
  },
  {
    "name": "Text Bounce Letters",
    "className": "roycss-text-bounce-letters",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-bounce-letters {\n  display: inline-flex;\n  font-weight: 700;\n  color: #06b6d4;\n}"
  },
  {
    "name": "Text Chrome",
    "className": "roycss-text-chrome",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-chrome {\n  background: linear-gradient(\n    180deg,\n    #fef3c7 0%,\n    #f8fafc 25%,\n    #94a3b8 50%,\n    #f8fafc 75%,\n    #cbd5e1 100%\n  );\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n  font-weight: 800;\n  letter-spacing: 1px;\n  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.4));\n}"
  },
  {
    "name": "Text Emboss",
    "className": "roycss-text-emboss",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-emboss {\n  display: inline-block;\n  font: 900 64px/1 'Georgia', serif;\n  letter-spacing: 0.05em;\n  color: #6e5a44;\n  padding: 24px 36px;\n  background:\n    radial-gradient(ellipse 60% 40% at 30% 30%, rgba(255,240,210,0.3), transparent 60%),\n    linear-gradient(135deg, #b8a586 0%, #8a7a5e 50%, #a8946c 100%);\n  border-radius: 8px;\n  box-shadow:\n    inset 4px 4px 8px rgba(255,250,230,0.4),\n    inset -4px -4px 8px rgba(40,30,15,0.4),\n    0 6px 20px rgba(40,30,15,0.4);\n  text-shadow:\n    1px 1px 1px rgba(255,245,220,0.7),\n    -1px -1px 1px rgba(30,20,10,0.8),\n    0 4px 6px rgba(30,20,10,0.4);\n  background-clip: border-box;\n}"
  },
  {
    "name": "Text Fire",
    "className": "roycss-text-fire",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-fire {\n  font-weight: 800;\n  color: #fde047;\n  text-shadow:\n    0 -2px 4px #fef08a,\n    0 -3px 6px #fde047,\n    0 -6px 10px #facc15,\n    0 -10px 16px #f59e0b,\n    0 -16px 24px #ea580c,\n    0 -22px 32px #dc2626;\n  animation: roy-fire-flicker 0.4s ease-in-out infinite alternate;\n}\n@keyframes roy-fire-flicker {\n  from { filter: brightness(1) hue-rotate(0deg); }"
  },
  {
    "name": "Text Fire Flame",
    "className": "roycss-text-fire-flame",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-fire-flame {\n  display: inline-block;\n  position: relative;\n  font: 900 80px/1 'Arial Black', sans-serif;\n  letter-spacing: 0.05em;\n  color: #fff;\n  padding: 30px 36px;\n  background: #0a0500;\n  border-radius: 8px;\n  text-shadow:\n    0 -2px 4px #fff,\n    0 -4px 8px #ffe055,\n    0 -8px 14px #ff8c00,\n    0 -14px 22px #ff3000,\n    0 -22px 32px #c81000,\n    0 2px 4px rgba(200,16,0,0.8);\n  animation: roy-b11-text-fire-flame 0.6s ease-in-out infinite alternate;\n  filter: drop-shadow(0 0 12px rgba(255,80,0,0.7));\n}\n@keyframes roy-b11-text-fire-flame {\n  0%   { text-shadow: 0 -2px 4px #fff, 0 -4px 8px #ffe055, 0 -8px 14px #ff8c00, 0 -14px 22px #ff3000, 0 -22px 32px #c81000, 0 2px 4px rgba(200,16,0,0.8); transform: translateY(0); }"
  },
  {
    "name": "Text Flip",
    "className": "roycss-text-flip",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-flip {\n  display: inline-block;\n  font-weight: 700;\n  color: #8b5cf6;\n  transform-style: preserve-3d;\n  perspective: 400px;\n  animation: roy-text-flip 3s ease-in-out infinite;\n}\n@keyframes roy-text-flip {\n  0%, 100% { transform: rotateX(0); }"
  },
  {
    "name": "Text Glitch",
    "className": "roycss-text-glitch",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-glitch {\n  position: relative;\n  font-weight: 700;\n}"
  },
  {
    "name": "Text Gradient",
    "className": "roycss-text-gradient",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-gradient {\n  background: linear-gradient(135deg, #10b981 0%, #14b8a6 40%, #06b6d4 70%, #8b5cf6 100%);\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n  font-weight: 700;\n}"
  },
  {
    "name": "Text Gradient Shift",
    "className": "roycss-text-gradient-shift",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-gradient-shift {\n  background: linear-gradient(45deg, #10b981, #06b6d4, #8b5cf6, #ec4899, #10b981);\n  background-size: 300% 300%;\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n  font-weight: 700;\n  animation: roy-text-grad-shift 6s ease infinite;\n}\n@keyframes roy-text-grad-shift {\n  0%, 100% { background-position: 0% 50%; }"
  },
  {
    "name": "Text Highlight Marker",
    "className": "roycss-text-highlight-marker",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-highlight-marker {\n  font-weight: 700;\n  color: #0f172a;\n  background: linear-gradient(180deg, transparent 50%, #fde047 50%);\n  padding: 0 4px;\n}"
  },
  {
    "name": "Text Holographic",
    "className": "roycss-text-holographic",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-holographic {\n  background: conic-gradient(\n    from 0deg,\n    #ff6ec7, #ffd93d, #6bcf7f, #4ecdc4, #a78bfa, #ff6ec7\n  );\n  background-size: 200% 200%;\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n  font-weight: 700;\n  filter: drop-shadow(0 0 6px rgba(255, 110, 199, 0.5));\n  animation: roy-holo-shift 5s linear infinite;\n}\n@keyframes roy-holo-shift {\n  from { background-position: 0% 0%; }"
  },
  {
    "name": "Text Mirror",
    "className": "roycss-text-mirror",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-mirror {\n  display: inline-flex;\n  font-weight: 700;\n  color: #8b5cf6;\n}"
  },
  {
    "name": "Text Neon Glow",
    "className": "roycss-text-neon-glow",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-neon-glow {\n  color: #10b981;\n  text-shadow:\n    0 0 7px rgba(16, 185, 129, 0.8),\n    0 0 10px rgba(16, 185, 129, 0.6),\n    0 0 21px rgba(16, 185, 129, 0.4),\n    0 0 42px rgba(16, 185, 129, 0.2),\n    0 0 82px rgba(16, 185, 129, 0.1);\n}"
  },
  {
    "name": "Text Neon Sign",
    "className": "roycss-text-neon-sign",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-neon-sign {\n  display: inline-block;\n  font: 900 72px/1 'Arial Black', sans-serif;\n  letter-spacing: 0.08em;\n  color: #fff;\n  text-shadow:\n    0 0 4px #fff,\n    0 0 10px #ff00de,\n    0 0 22px #ff00de,\n    0 0 40px #ff00de,\n    0 0 70px #ff00de,\n    0 0 100px #ff00de;\n  padding: 20px 30px;\n  background: radial-gradient(ellipse at 50% 50%, #1a0833 0%, #050010 100%);\n  border-radius: 12px;\n  animation: roy-b11-text-neon-flicker 4s linear infinite;\n}\n@keyframes roy-b11-text-neon-flicker {\n  0%, 18%, 22%, 25%, 53%, 57%, 100% {\n    opacity: 1;\n    text-shadow:\n      0 0 4px #fff,\n      0 0 10px #ff00de,\n      0 0 22px #ff00de,\n      0 0 40px #ff00de,\n      0 0 70px #ff00de,\n      0 0 100px #ff00de;\n  }"
  },
  {
    "name": "Text Outline Offset",
    "className": "roycss-text-outline-offset",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-outline-offset {\n  font-weight: 700;\n  color: #10b981;\n  -webkit-text-stroke: 2px rgba(16, 185, 129, 0.5);\n  text-shadow:\n    4px 4px 0 rgba(6, 182, 212, 0.5),\n    8px 8px 0 rgba(139, 92, 246, 0.4);\n}"
  },
  {
    "name": "Text Rainbow",
    "className": "roycss-text-rainbow",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-rainbow {\n  background: linear-gradient(\n    90deg,\n    #ef4444, #f59e0b, #eab308, #10b981, #06b6d4, #8b5cf6, #ec4899, #ef4444\n  );\n  background-size: 200% auto;\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n  font-weight: 700;\n  animation: roy-rainbow-flow 4s linear infinite;\n}\n@keyframes roy-rainbow-flow {\n  from { background-position: 0% center; }"
  },
  {
    "name": "Text Reflection",
    "className": "roycss-text-reflection",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-reflection {\n  position: relative;\n  display: inline-block;\n  font-weight: 700;\n  color: #06b6d4;\n}"
  },
  {
    "name": "Text Shadow Long",
    "className": "roycss-text-shadow-long",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-shadow-long {\n  color: #f0fdf4;\n  font-weight: 700;\n  text-shadow:\n    1px 1px 0 #10b981,\n    2px 2px 0 #0d9668,\n    3px 3px 0 #059669,\n    4px 4px 0 #047857,\n    5px 5px 0 #065f46,\n    6px 6px 0 #064e3b,\n    7px 7px 0 #053b30,\n    8px 8px 0 #042f24,\n    9px 9px 0 #03241c,\n    10px 10px 12px rgba(0, 0, 0, 0.4);\n}"
  },
  {
    "name": "Text Shadow Soft",
    "className": "roycss-text-shadow-soft",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-shadow-soft {\n  color: #f8fafc;\n  font-weight: 600;\n  text-shadow:\n    0 1px 2px rgba(0, 0, 0, 0.18),\n    0 4px 12px rgba(16, 185, 129, 0.25),\n    0 8px 24px rgba(16, 185, 129, 0.15);\n}"
  },
  {
    "name": "Text Shimmer",
    "className": "roycss-text-shimmer",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-shimmer {\n  background: linear-gradient(\n    110deg,\n    #475569 0%,\n    #475569 35%,\n    #f1f5f9 50%,\n    #475569 65%,\n    #475569 100%\n  );\n  background-size: 200% 100%;\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n  font-weight: 700;\n  animation: roy-shimmer-sweep 3s linear infinite;\n}\n@keyframes roy-shimmer-sweep {\n  from { background-position: 200% 0; }"
  },
  {
    "name": "Text Skew",
    "className": "roycss-text-skew",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-skew {\n  display: inline-block;\n  font-weight: 800;\n  font-style: italic;\n  color: #f8fafc;\n  background: linear-gradient(135deg, #10b981, #06b6d4);\n  padding: 4px 14px;\n  transform: skew(-10deg);\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.25);\n}"
  },
  {
    "name": "Text Stretch",
    "className": "roycss-text-stretch",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-stretch {\n  font-weight: 700;\n  color: #f59e0b;\n  animation: roy-text-stretch 3s ease-in-out infinite;\n}\n@keyframes roy-text-stretch {\n  0%, 100% { letter-spacing: 0px; }"
  },
  {
    "name": "Text Stroke",
    "className": "roycss-text-stroke",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-stroke {\n  -webkit-text-stroke: 2px currentColor;\n  color: transparent;\n  font-weight: 700;\n}"
  },
  {
    "name": "Text Typing Cursor",
    "className": "roycss-text-typing-cursor",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-typing-cursor {\n  border-right: 3px solid #10b981;\n  animation: roy-text-blink-cursor 1s step-end infinite;\n  padding-right: 4px;\n}\n@keyframes roy-text-blink-cursor {\n  0%, 100% { border-color: #10b981; }"
  },
  {
    "name": "Text Underline Draw",
    "className": "roycss-text-underline-draw",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-underline-draw {\n  position: relative;\n  display: inline-block;\n  font-weight: 700;\n  color: #10b981;\n}"
  },
  {
    "name": "Text Water",
    "className": "roycss-text-water",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-water {\n  display: inline-block;\n  position: relative;\n  font: 900 72px/1 'Arial Black', sans-serif;\n  letter-spacing: 0.08em;\n  color: transparent;\n  background:\n    linear-gradient(180deg,\n      rgba(255,255,255,0.9) 0%,\n      rgba(180,230,255,0.7) 30%,\n      rgba(80,180,230,0.6) 55%,\n      rgba(30,100,180,0.8) 80%,\n      rgba(10,40,90,0.9) 100%);\n  -webkit-background-clip: text;\n  background-clip: text;\n  padding: 18px 30px;\n  text-shadow:\n    0 1px 0 rgba(255,255,255,0.5),\n    0 -1px 0 rgba(0,30,60,0.6);\n  filter: drop-shadow(0 4px 6px rgba(0,80,140,0.5));\n  animation: roy-b11-text-water-ripple 3s ease-in-out infinite;\n}\n@keyframes roy-b11-text-water-ripple {\n  0%, 100% { filter: drop-shadow(0 4px 6px rgba(0,80,140,0.5)) hue-rotate(0deg); }"
  },
  {
    "name": "Text Wave",
    "className": "roycss-text-wave",
    "category": "text",
    "displayType": "text",
    "css": ".roycss-text-wave {\n  display: inline-flex;\n  font-weight: 700;\n  color: #10b981;\n}"
  },
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
  },
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
  },
  {
    "name": "Visual Aurora Border",
    "className": "roycss-visual-aurora-border",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-aurora-border {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  background: #0b1026;\n  border: none;\n  overflow: hidden;\n}"
  },
  {
    "name": "Visual Backdrop Blur Heavy",
    "className": "roycss-visual-backdrop-blur-heavy",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-backdrop-blur-heavy {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background:\n    radial-gradient(circle at 20% 30%, #ec4899 0%, transparent 40%),\n    radial-gradient(circle at 80% 70%, #06b6d4 0%, transparent 40%),\n    radial-gradient(circle at 50% 50%, #f59e0b 0%, transparent 50%),\n    linear-gradient(135deg, #8b5cf6, #10b981);\n  overflow: hidden;\n}"
  },
  {
    "name": "Visual Blend Mode Overlay",
    "className": "roycss-visual-blend-mode-overlay",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-blend-mode-overlay {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(135deg, #1e293b, #0f172a);\n  overflow: hidden;\n}"
  },
  {
    "name": "Visual Border Beam",
    "className": "roycss-visual-border-beam",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-border-beam {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  background: #0f172a;\n  border: none;\n  overflow: hidden;\n}"
  },
  {
    "name": "Visual Chrome",
    "className": "roycss-visual-chrome",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-chrome {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(\n    180deg,\n    #fefefe 0%,\n    #c8c8d0 10%,\n    #888890 20%,\n    #d8d8e0 30%,\n    #f8f8fc 45%,\n    #a0a0a8 55%,\n    #686870 65%,\n    #d0d0d8 75%,\n    #f0f0f5 85%,\n    #b0b0b8 95%,\n    #808088 100%\n  );\n  overflow: hidden;\n  box-shadow:\n    inset 0 2px 4px rgba(255, 255, 255, 0.7),\n    inset 0 -2px 4px rgba(0, 0, 0, 0.35);\n}"
  },
  {
    "name": "Visual Color Shift",
    "className": "roycss-visual-color-shift",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-color-shift {\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(135deg, #ec4899, #8b5cf6);\n  animation: roy-visual-color-shift 6s linear infinite;\n}\n@keyframes roy-visual-color-shift {\n  from { filter: hue-rotate(0deg); }"
  },
  {
    "name": "Visual Foil",
    "className": "roycss-visual-foil",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-foil {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background:\n    repeating-linear-gradient(\n      45deg,\n      rgba(255, 255, 255, 0.12) 0px,\n      rgba(255, 255, 255, 0.12) 2px,\n      transparent 2px,\n      transparent 5px\n    ),\n    repeating-linear-gradient(\n      -45deg,\n      rgba(0, 0, 0, 0.12) 0px,\n      rgba(0, 0, 0, 0.12) 2px,\n      transparent 2px,\n      transparent 5px\n    ),\n    linear-gradient(\n      135deg,\n      #f0f0f5 0%,\n      #c0c0d0 25%,\n      #f8f8ff 50%,\n      #b0b0c0 75%,\n      #e8e8f0 100%\n    );\n  background-size: 8px 8px, 8px 8px, 100% 100%;\n  overflow: hidden;\n  animation: roy-visual-foil-hue 6s ease-in-out infinite;\n  box-shadow:\n    inset 0 2px 6px rgba(255, 255, 255, 0.7),\n    inset 0 -2px 6px rgba(0, 0, 0, 0.25);\n}\n@keyframes roy-visual-foil-hue {\n  0%, 100% { filter: hue-rotate(0deg); }"
  },
  {
    "name": "Visual Frost Blur",
    "className": "roycss-visual-frost-blur",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-frost-blur {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background:\n    radial-gradient(circle at 30% 30%, #06b6d4 0%, transparent 50%),\n    radial-gradient(circle at 70% 70%, #ec4899 0%, transparent 50%),\n    linear-gradient(135deg, #8b5cf6, #f59e0b);\n  overflow: hidden;\n}"
  },
  {
    "name": "Visual Glass Reflection",
    "className": "roycss-visual-glass-reflection",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-glass-reflection {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background:\n    radial-gradient(circle at 30% 30%, #ec4899 0%, transparent 50%),\n    radial-gradient(circle at 70% 70%, #06b6d4 0%, transparent 50%),\n    linear-gradient(135deg, #8b5cf6, #f59e0b);\n  overflow: hidden;\n}"
  },
  {
    "name": "Visual Glitch Distort",
    "className": "roycss-visual-glitch-distort",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-glitch-distort {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(135deg, #ec4899, #8b5cf6, #06b6d4);\n  overflow: hidden;\n}"
  },
  {
    "name": "Visual Gradient Mesh",
    "className": "roycss-visual-gradient-mesh",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-gradient-mesh {\n  background:\n    radial-gradient(at 20% 20%, #ec4899 0px, transparent 50%),\n    radial-gradient(at 80% 0%,  #f59e0b 0px, transparent 50%),\n    radial-gradient(at 0% 50%,  #8b5cf6 0px, transparent 50%),\n    radial-gradient(at 80% 80%, #06b6d4 0px, transparent 50%),\n    radial-gradient(at 50% 100%, #22c55e 0px, transparent 50%),\n    #0f172a;\n  background-size: 200% 200%;\n  animation: roy-visual-gradient-mesh 10s ease-in-out infinite;\n}\n@keyframes roy-visual-gradient-mesh {\n  0%, 100% { background-position: 0% 0%; }"
  },
  {
    "name": "Visual Gradient Text Animated",
    "className": "roycss-visual-gradient-text-animated",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-gradient-text-animated {\n  background: linear-gradient(\n    90deg,\n    #ef4444,\n    #f59e0b,\n    #eab308,\n    #22c55e,\n    #06b6d4,\n    #3b82f6,\n    #8b5cf6,\n    #ec4899,\n    #ef4444\n  );\n  background-size: 200% auto;\n  -webkit-background-clip: text;\n  background-clip: text;\n  -webkit-text-fill-color: transparent;\n  color: transparent;\n  animation: roy-visual-gradient-text-animated 4s linear infinite;\n}\n@keyframes roy-visual-gradient-text-animated {\n  to { background-position: 200% center; }"
  },
  {
    "name": "Visual Holographic",
    "className": "roycss-visual-holographic",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-holographic {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(\n    115deg,\n    #ff0080 0%,\n    #ff8a00 14%,\n    #ffe600 28%,\n    #00ff96 42%,\n    #00d4ff 56%,\n    #6f00ff 70%,\n    #ff00d4 84%,\n    #ff0080 100%\n  );\n  background-size: 300% 300%;\n  overflow: hidden;\n  animation: roy-visual-holographic-shift 6s ease infinite;\n}\n@keyframes roy-visual-holographic-shift {\n  0%, 100% { background-position: 0% 50%; }"
  },
  {
    "name": "Visual Hue Rotate Loop",
    "className": "roycss-visual-hue-rotate-loop",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-hue-rotate-loop {\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: conic-gradient(\n    from 0deg,\n    #ef4444,\n    #f59e0b,\n    #eab308,\n    #22c55e,\n    #06b6d4,\n    #3b82f6,\n    #8b5cf6,\n    #ec4899,\n    #ef4444\n  );\n  animation: roy-visual-hue-rotate-loop 4s linear infinite;\n}\n@keyframes roy-visual-hue-rotate-loop {\n  from { filter: hue-rotate(0deg); }"
  },
  {
    "name": "Visual Image Distortion",
    "className": "roycss-visual-image-distortion",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-image-distortion {\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6, #06b6d4);\n  animation: roy-visual-image-distortion 2.4s ease-in-out infinite;\n}\n@keyframes roy-visual-image-distortion {\n  0%, 100% {\n    filter: blur(0px);\n    transform: skew(0deg, 0deg) scale(1);\n  }"
  },
  {
    "name": "Visual Inner Glow",
    "className": "roycss-visual-inner-glow",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-inner-glow {\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  background: #0f172a;\n  border: none;\n  animation: roy-visual-inner-glow 2.6s ease-in-out infinite;\n}\n@keyframes roy-visual-inner-glow {\n  0%, 100% {\n    box-shadow:\n      inset 0 0 20px rgba(16, 185, 129, 0.3),\n      inset 0 0 40px rgba(16, 185, 129, 0.1);\n  }"
  },
  {
    "name": "Visual Iridescent",
    "className": "roycss-visual-iridescent",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-iridescent {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: conic-gradient(\n    from 0deg at 50% 50%,\n    #ff0080,\n    #ff8a00,\n    #ffe600,\n    #00ff96,\n    #00d4ff,\n    #6f00ff,\n    #ff00d4,\n    #ff0080\n  );\n  animation: roy-visual-iridescent 8s linear infinite;\n  overflow: hidden;\n}\n@keyframes roy-visual-iridescent {\n  from { filter: hue-rotate(0deg); }"
  },
  {
    "name": "Visual Liquid Fill",
    "className": "roycss-visual-liquid-fill",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-liquid-fill {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  background: #0f172a;\n  border: none;\n  overflow: hidden;\n}"
  },
  {
    "name": "Visual Mask Fade",
    "className": "roycss-visual-mask-fade",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-mask-fade {\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(135deg, #ec4899, #8b5cf6, #06b6d4);\n  -webkit-mask: linear-gradient(180deg, transparent 0%, #000 50%, transparent 100%) no-repeat;\n  mask: linear-gradient(180deg, transparent 0%, #000 50%, transparent 100%) no-repeat;\n  -webkit-mask-size: 100% 200%;\n  mask-size: 100% 200%;\n  animation: roy-visual-mask-fade 3s ease-in-out infinite alternate;\n}\n@keyframes roy-visual-mask-fade {\n  from {\n    -webkit-mask-position: 0% 0%;\n    mask-position: 0% 0%;\n  }"
  },
  {
    "name": "Visual Metallic",
    "className": "roycss-visual-metallic",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-metallic {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background:\n    linear-gradient(\n      180deg,\n      #f5f5f5 0%,\n      #d0d0d8 14%,\n      #a0a0a8 28%,\n      #808088 42%,\n      #c0c0c8 58%,\n      #f0f0f5 74%,\n      #b0b0b8 88%,\n      #d0d0d8 100%\n    );\n  overflow: hidden;\n  box-shadow:\n    inset 0 2px 4px rgba(255, 255, 255, 0.7),\n    inset 0 -2px 4px rgba(0, 0, 0, 0.25);\n}"
  },
  {
    "name": "Visual Neon Pulse",
    "className": "roycss-visual-neon-pulse",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-neon-pulse {\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  background: #0a0a0f;\n  border: 2px solid #ec4899;\n  animation: roy-visual-neon-pulse 1.6s ease-in-out infinite;\n}\n@keyframes roy-visual-neon-pulse {\n  0%, 100% {\n    box-shadow:\n      0 0 6px #ec4899,\n      0 0 12px #ec4899,\n      0 0 24px #ec4899,\n      inset 0 0 8px #ec4899,\n      inset 0 0 16px rgba(236, 72, 153, 0.5);\n    border-color: #ec4899;\n  }"
  },
  {
    "name": "Visual Noise Overlay",
    "className": "roycss-visual-noise-overlay",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-noise-overlay {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(135deg, #1e293b, #0f172a);\n  overflow: hidden;\n}"
  },
  {
    "name": "Visual Pixelate",
    "className": "roycss-visual-pixelate",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-pixelate {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6, #06b6d4);\n  overflow: hidden;\n}"
  },
  {
    "name": "Visual Prism",
    "className": "roycss-visual-prism",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-prism {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0a0a0f 100%);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n}"
  },
  {
    "name": "Visual Saturation Pulse",
    "className": "roycss-visual-saturation-pulse",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-saturation-pulse {\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(135deg, #ec4899, #f59e0b, #06b6d4);\n  animation: roy-visual-saturation-pulse 2.4s ease-in-out infinite;\n}\n@keyframes roy-visual-saturation-pulse {\n  0%, 100% { filter: saturate(0); }"
  },
  {
    "name": "Visual Shadow Pulse",
    "className": "roycss-visual-shadow-pulse",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-shadow-pulse {\n  width: 140px;\n  height: 100px;\n  border-radius: 14px;\n  background: linear-gradient(135deg, #8b5cf6, #ec4899);\n  border: none;\n  animation: roy-visual-shadow-pulse 2s ease-in-out infinite;\n}\n@keyframes roy-visual-shadow-pulse {\n  0%, 100% {\n    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);\n    transform: scale(1);\n  }"
  },
  {
    "name": "Visual Shimmer Sweep",
    "className": "roycss-visual-shimmer-sweep",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-shimmer-sweep {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  border: none;\n  background: linear-gradient(135deg, #1e293b, #334155);\n  overflow: hidden;\n}"
  },
  {
    "name": "Visual Spotlight Follow",
    "className": "roycss-visual-spotlight-follow",
    "category": "visual-effects",
    "displayType": "bg",
    "css": ".roycss-visual-spotlight-follow {\n  position: relative;\n  width: 180px;\n  height: 120px;\n  border-radius: 14px;\n  background: #0a0a0f;\n  border: none;\n  overflow: hidden;\n}"
  },
];
