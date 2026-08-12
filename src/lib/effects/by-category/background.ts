// Auto-generated — category: background | effects: 25
// Do not edit manually.

import type { FerrumCSSEffect } from "../../types";

export const effects: FerrumCSSEffect[] = [
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
  }
] as FerrumCSSEffect[];
