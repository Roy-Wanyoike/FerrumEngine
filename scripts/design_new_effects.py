#!/usr/bin/env python3
"""
Generate NEW modern/future CSS effects for FerrumEngine.
These leverage cutting-edge CSS features: @starting-style, @property,
scroll-driven animations, container queries, color-mix(), light-dark(),
backdrop-filter, anchor positioning, view transitions, interpolate-size,
has() selector, transition-behavior: allow-discrete, and more.
"""

NEW_EFFECTS = [
    # ═══ CORE ANIMATIONS (using @starting-style, @property) ═══
    {
        "name": "Entrance Curtain",
        "className": "rc-entrance-curtain",
        "category": "core-animations",
        "displayType": "box",
        "css": """@property --rc-entrance-curtain-y {
  syntax: '<length>';
  inherits: false;
  initial-value: 100%;
}
.rc-entrance-curtain {
  animation: rc-entrance-curtain 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  --rc-entrance-curtain-y: 100%;
  clip-path: inset(0 0 var(--rc-entrance-curtain-y) 0);
}
@keyframes rc-entrance-curtain {
  to { --rc-entrance-curtain-y: 0%; }
}"""
    },
    {
        "name": "Entrance Scale Blur",
        "className": "rc-entrance-scale-blur",
        "category": "core-animations",
        "displayType": "box",
        "css": """.rc-entrance-scale-blur {
  animation: rc-entrance-scale-blur 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes rc-entrance-scale-blur {
  from { opacity: 0; transform: scale(0.92); filter: blur(8px); }
  to { opacity: 1; transform: scale(1); filter: blur(0px); }
}"""
    },
    {
        "name": "Entrance Slide Blur",
        "className": "rc-entrance-slide-blur",
        "category": "core-animations",
        "displayType": "box",
        "css": """.rc-entrance-slide-blur {
  animation: rc-entrance-slide-blur 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes rc-entrance-slide-blur {
  from { opacity: 0; transform: translateY(30px); filter: blur(6px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0px); }
}"""
    },
    {
        "name": "Exit Fade Scale",
        "className": "rc-exit-fade-scale",
        "category": "core-animations",
        "displayType": "box",
        "css": """.rc-exit-fade-scale {
  animation: rc-exit-fade-scale 0.4s cubic-bezier(0.55, 0, 1, 0.45) both;
}
@keyframes rc-exit-fade-scale {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.85); }
}"""
    },
    {
        "name": "Exit Slide Down",
        "className": "rc-exit-slide-down",
        "category": "core-animations",
        "displayType": "box",
        "css": """.rc-exit-slide-down {
  animation: rc-exit-slide-down 0.35s cubic-bezier(0.55, 0, 1, 0.45) both;
}
@keyframes rc-exit-slide-down {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(20px); }
}"""
    },
    {
        "name": "Stagger Fade Up",
        "className": "rc-stagger-fade-up",
        "category": "core-animations",
        "displayType": "box",
        "css": """.rc-stagger-fade-up > * {
  opacity: 0;
  animation: rc-stagger-fade-up-child 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.rc-stagger-fade-up > *:nth-child(1) { animation-delay: 0ms; }
.rc-stagger-fade-up > *:nth-child(2) { animation-delay: 60ms; }
.rc-stagger-fade-up > *:nth-child(3) { animation-delay: 120ms; }
.rc-stagger-fade-up > *:nth-child(4) { animation-delay: 180ms; }
.rc-stagger-fade-up > *:nth-child(5) { animation-delay: 240ms; }
.rc-stagger-fade-up > *:nth-child(6) { animation-delay: 300ms; }
.rc-stagger-fade-up > *:nth-child(n+7) { animation-delay: 360ms; }
@keyframes rc-stagger-fade-up-child {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}"""
    },
    {
        "name": "Stagger Scale In",
        "className": "rc-stagger-scale-in",
        "category": "core-animations",
        "displayType": "box",
        "css": """.rc-stagger-scale-in > * {
  opacity: 0;
  animation: rc-stagger-scale-in-child 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.rc-stagger-scale-in > *:nth-child(1) { animation-delay: 0ms; }
.rc-stagger-scale-in > *:nth-child(2) { animation-delay: 50ms; }
.rc-stagger-scale-in > *:nth-child(3) { animation-delay: 100ms; }
.rc-stagger-scale-in > *:nth-child(4) { animation-delay: 150ms; }
.rc-stagger-scale-in > *:nth-child(5) { animation-delay: 200ms; }
.rc-stagger-scale-in > *:nth-child(n+6) { animation-delay: 250ms; }
@keyframes rc-stagger-scale-in-child {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}"""
    },

    # ═══ HOVER (modern interactions, has(), transition-behavior) ═══
    {
        "name": "Hover Underline Grow",
        "className": "rc-hover-underline-grow",
        "category": "hover",
        "displayType": "text",
        "css": """.rc-hover-underline-grow {
  position: relative;
  text-decoration: none;
  background-image: linear-gradient(currentColor, currentColor);
  background-size: 0% 2px;
  background-position: left bottom;
  background-repeat: no-repeat;
  transition: background-size 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.rc-hover-underline-grow:hover {
  background-size: 100% 2px;
}"""
    },
    {
        "name": "Hover Image Zoom",
        "className": "rc-hover-image-zoom",
        "category": "hover",
        "displayType": "box",
        "css": """.rc-hover-image-zoom {
  overflow: hidden;
}
.rc-hover-image-zoom img,
.rc-hover-image-zoom > * {
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}
.rc-hover-image-zoom:hover img,
.rc-hover-image-zoom:hover > * {
  transform: scale(1.08);
}"""
    },
    {
        "name": "Hover Border Gradient",
        "className": "rc-hover-border-gradient",
        "category": "hover",
        "displayType": "box",
        "css": """@property --rc-hbg-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
.rc-hover-border-gradient {
  --rc-hbg-angle: 0deg;
  border: 2px solid transparent;
  background-image: linear-gradient(var(--rc-hbg-angle), #a855f7, #ec4899, #3b82f6, #a855f7);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-size: 300% 300%;
  transition: --rc-hbg-angle 0s;
}
.rc-hover-border-gradient:hover {
  animation: rc-hbg-rotate 2s linear infinite;
}
@keyframes rc-hbg-rotate {
  to { --rc-hbg-angle: 360deg; }
}"""
    },
    {
        "name": "Hover Arrow Move",
        "className": "rc-hover-arrow-move",
        "category": "hover",
        "displayType": "box",
        "css": """.rc-hover-arrow-move {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
}
.rc-hover-arrow-move .rc-arrow {
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  display: inline-block;
}
.rc-hover-arrow-move:hover .rc-arrow {
  transform: translateX(4px);
}"""
    },
    {
        "name": "Hover Skew Reverse",
        "className": "rc-hover-skew-reverse",
        "category": "hover",
        "displayType": "box",
        "css": """.rc-hover-skew-reverse {
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
  transform-origin: bottom left;
}
.rc-hover-skew-reverse:hover {
  transform: skewX(-6deg) scale(1.02);
  box-shadow: 4px 4px 0 rgba(168, 85, 247, 0.3);
}"""
    },
    {
        "name": "Hover Overlay Slide",
        "className": "rc-hover-overlay-slide",
        "category": "hover",
        "displayType": "box",
        "css": """.rc-hover-overlay-slide {
  position: relative;
  overflow: hidden;
}
.rc-hover-overlay-slide::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.15));
  transform: translateY(100%);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}
.rc-hover-overlay-slide:hover::after {
  transform: translateY(0);
}"""
    },
    {
        "name": "Hover Morph",
        "className": "rc-hover-morph",
        "category": "hover",
        "displayType": "box",
        "css": """.rc-hover-morph {
  transition: border-radius 0.4s cubic-bezier(0.22, 1, 0.36, 1), transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease;
  border-radius: 12px;
}
.rc-hover-morph:hover {
  border-radius: 24px 8px 24px 8px;
  transform: scale(1.03);
}"""
    },
    {
        "name": "Hover Shadow Lift",
        "className": "rc-hover-shadow-lift",
        "category": "hover",
        "displayType": "box",
        "css": """.rc-hover-shadow-lift {
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.rc-hover-shadow-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15), 0 4px 8px -4px rgba(0, 0, 0, 0.1);
}"""
    },
    {
        "name": "Hover 3D Lift",
        "className": "rc-hover-3d-lift",
        "category": "hover",
        "displayType": "box",
        "css": """.rc-hover-3d-lift {
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
  transform-style: preserve-3d;
  perspective: 800px;
}
.rc-hover-3d-lift:hover {
  transform: perspective(800px) rotateX(2deg) rotateY(-2deg) translateY(-6px);
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.2);
}"""
    },

    # ═══ TEXT (modern text effects) ═══
    {
        "name": "Text Gradient Animate",
        "className": "rc-text-gradient-animate",
        "category": "text",
        "displayType": "text",
        "css": """@property --rc-tga-pos {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 0%;
}
.rc-text-gradient-animate {
  background: linear-gradient(90deg, #a855f7, #ec4899, #3b82f6, #10b981, #a855f7);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: rc-tga-move 4s ease infinite;
}
@keyframes rc-tga-move {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}"""
    },
    {
        "name": "Text Clip Reveal",
        "className": "rc-text-clip-reveal",
        "category": "text",
        "displayType": "text",
        "css": """.rc-text-clip-reveal {
  animation: rc-text-clip-reveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
  clip-path: inset(0 100% 0 0);
}
@keyframes rc-text-clip-reveal {
  to { clip-path: inset(0 0% 0 0); }
}"""
    },
    {
        "name": "Text Shadow Glow Pulse",
        "className": "rc-text-shadow-glow-pulse",
        "category": "text",
        "displayType": "text",
        "css": """.rc-text-shadow-glow-pulse {
  animation: rc-text-shadow-glow-pulse 2s ease-in-out infinite;
}
@keyframes rc-text-shadow-glow-pulse {
  0%, 100% { text-shadow: 0 0 8px rgba(168, 85, 247, 0.4), 0 0 20px rgba(168, 85, 247, 0.1); }
  50% { text-shadow: 0 0 16px rgba(168, 85, 247, 0.7), 0 0 40px rgba(168, 85, 247, 0.2); }
}"""
    },
    {
        "name": "Text Slide Up",
        "className": "rc-text-slide-up",
        "category": "text",
        "displayType": "text",
        "css": """.rc-text-slide-up {
  animation: rc-text-slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
  overflow: hidden;
  display: inline-block;
}
.rc-text-slide-up > span {
  display: inline-block;
  animation: rc-text-slide-up-inner 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes rc-text-slide-up-inner {
  from { transform: translateY(110%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}"""
    },
    {
        "name": "Text Scramble",
        "className": "rc-text-scramble",
        "category": "text",
        "displayType": "text",
        "css": """.rc-text-scramble {
  animation: rc-text-scramble 0.5s steps(8, end) both;
  font-variant-numeric: tabular-nums;
}
@keyframes rc-text-scramble {
  0% { opacity: 0; filter: blur(4px); }
  100% { opacity: 1; filter: blur(0); }
}"""
    },
    {
        "name": "Text Typewriter",
        "className": "rc-text-typewriter",
        "category": "text",
        "displayType": "text",
        "css": """.rc-text-typewriter {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid currentColor;
  width: 0;
  animation: rc-text-typewriter-type 2s steps(20, end) forwards, rc-text-typewriter-blink 0.6s step-end infinite;
}
@keyframes rc-text-typewriter-type {
  from { width: 0; }
  to { width: 100%; }
}
@keyframes rc-text-typewriter-blink {
  50% { border-color: transparent; }
}"""
    },
    {
        "name": "Text Neon Flicker",
        "className": "rc-text-neon-flicker",
        "category": "text",
        "displayType": "text",
        "css": """.rc-text-neon-flicker {
  animation: rc-text-neon-flicker 3s infinite;
}
@keyframes rc-text-neon-flicker {
  0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% { opacity: 1; text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #a855f7, 0 0 80px #a855f7; }
  20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 0.6; text-shadow: none; }
}"""
    },
    {
        "name": "Text Reveal",
        "className": "rc-text-reveal",
        "category": "text",
        "displayType": "text",
        "css": """.rc-text-reveal {
  animation: rc-text-reveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes rc-text-reveal {
  from { opacity: 0; letter-spacing: 0.3em; filter: blur(4px); }
  to { opacity: 1; letter-spacing: normal; filter: blur(0); }
}"""
    },

    # ═══ BACKGROUNDS (modern patterns, mesh, noise) ═══
    {
        "name": "BG Gradient Shift",
        "className": "rc-bg-gradient-shift",
        "category": "backgrounds",
        "displayType": "box",
        "css": """@property --rc-bgs-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
.rc-bg-gradient-shift {
  --rc-bgs-angle: 0deg;
  background: linear-gradient(var(--rc-bgs-angle), #1e1b4b, #312e81, #4c1d95, #581c87);
  background-size: 300% 300%;
  animation: rc-bgs-rotate 8s ease infinite;
}
@keyframes rc-bgs-rotate {
  0% { --rc-bgs-angle: 0deg; background-position: 0% 50%; }
  50% { --rc-bgs-angle: 180deg; background-position: 100% 50%; }
  100% { --rc-bgs-angle: 360deg; background-position: 0% 50%; }
}"""
    },
    {
        "name": "BG Mesh Gradient",
        "className": "rc-bg-mesh-gradient",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-bg-mesh-gradient {
  background:
    radial-gradient(at 20% 20%, rgba(168, 85, 247, 0.4) 0%, transparent 50%),
    radial-gradient(at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
    radial-gradient(at 50% 80%, rgba(236, 72, 153, 0.35) 0%, transparent 50%),
    radial-gradient(at 80% 80%, rgba(16, 185, 129, 0.2) 0%, transparent 50%),
    linear-gradient(135deg, #0f0a1a, #1a0f2e);
  animation: rc-bg-mesh-shift 12s ease-in-out infinite alternate;
}
@keyframes rc-bg-mesh-shift {
  0% { background-size: 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%; }
  100% { background-size: 150% 150%, 120% 120%, 140% 140%, 130% 130%, 100% 100%; }
}"""
    },
    {
        "name": "BG Dots Grid",
        "className": "rc-bg-dots-grid",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-bg-dots-grid {
  background-image: radial-gradient(circle, rgba(168, 85, 247, 0.3) 1px, transparent 1px);
  background-size: 24px 24px;
}"""
    },
    {
        "name": "BG Radial Pulse",
        "className": "rc-bg-radial-pulse",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-bg-radial-pulse {
  background: radial-gradient(circle at center, rgba(168, 85, 247, 0.4), transparent 70%);
  animation: rc-bg-radial-pulse 3s ease-in-out infinite;
}
@keyframes rc-bg-radial-pulse {
  0%, 100% { background-size: 100% 100%; opacity: 0.6; }
  50% { background-size: 150% 150%; opacity: 1; }
}"""
    },
    {
        "name": "BG Lines",
        "className": "rc-bg-lines",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-bg-lines {
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(168, 85, 247, 0.08) 40px),
    repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(168, 85, 247, 0.08) 40px);
  background-size: 40px 40px;
}"""
    },
    {
        "name": "BG Circuit",
        "className": "rc-bg-circuit",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-bg-circuit {
  background:
    linear-gradient(rgba(168, 85, 247, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(168, 85, 247, 0.12) 1px, transparent 1px),
    linear-gradient(rgba(168, 85, 247, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(168, 85, 247, 0.06) 1px, transparent 1px);
  background-size: 80px 80px, 80px 80px, 16px 16px, 16px 16px;
}"""
    },
    {
        "name": "BG Noise Texture",
        "className": "rc-bg-noise-texture",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-bg-noise-texture {
  position: relative;
}
.rc-bg-noise-texture::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  pointer-events: none;
}"""
    },
    {
        "name": "BG Striped",
        "className": "rc-bg-striped",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-bg-striped {
  background: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 10px,
    rgba(168, 85, 247, 0.06) 10px,
    rgba(168, 85, 247, 0.06) 20px
  );
}"""
    },
    {
        "name": "BG Liquid",
        "className": "rc-bg-liquid",
        "category": "backgrounds",
        "displayType": "box",
        "css": """.rc-bg-liquid {
  background:
    radial-gradient(at 10% 90%, rgba(168, 85, 247, 0.5) 0%, transparent 50%),
    radial-gradient(at 90% 10%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
    radial-gradient(at 50% 50%, rgba(236, 72, 153, 0.3) 0%, transparent 60%);
  animation: rc-bg-liquid-move 10s ease-in-out infinite alternate;
}
@keyframes rc-bg-liquid-move {
  0% { background-position: 0% 100%, 100% 0%, 50% 50%; background-size: 120% 120%; }
  100% { background-position: 100% 0%, 0% 100%, 30% 70%; background-size: 140% 140%; }
}"""
    },

    # ═══ 3D & TRANSFORMS ═══
    {
        "name": "3D Card Tilt",
        "className": "rc-3d-card-tilt",
        "category": "3d-transforms",
        "displayType": "box",
        "css": """.rc-3d-card-tilt {
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s ease;
  transform-style: preserve-3d;
  transform: perspective(800px) rotateX(0deg) rotateY(0deg);
}
.rc-3d-card-tilt:hover {
  transform: perspective(800px) rotateX(-5deg) rotateY(5deg) translateZ(20px);
  box-shadow: -8px 8px 20px rgba(0, 0, 0, 0.2);
}"""
    },
    {
        "name": "3D Flip X",
        "className": "rc-3d-flip-x",
        "category": "3d-transforms",
        "displayType": "box",
        "css": """.rc-3d-flip-x {
  animation: rc-3d-flip-x 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
@keyframes rc-3d-flip-x {
  from { transform: perspective(800px) rotateX(90deg); opacity: 0; }
  to { transform: perspective(800px) rotateX(0deg); opacity: 1; }
}"""
    },
    {
        "name": "3D Flip Y",
        "className": "rc-3d-flip-y",
        "category": "3d-transforms",
        "displayType": "box",
        "css": """.rc-3d-flip-y {
  animation: rc-3d-flip-y 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
@keyframes rc-3d-flip-y {
  from { transform: perspective(800px) rotateY(-90deg); opacity: 0; }
  to { transform: perspective(800px) rotateY(0deg); opacity: 1; }
}"""
    },
    {
        "name": "Rotate In",
        "className": "rc-rotate-in",
        "category": "3d-transforms",
        "displayType": "box",
        "css": """.rc-rotate-in {
  animation: rc-rotate-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes rc-rotate-in {
  from { transform: rotate(-200deg) scale(0); opacity: 0; }
  to { transform: rotate(0deg) scale(1); opacity: 1; }
}"""
    },

    # ═══ BUTTONS & CARDS (modern button/card interactions) ═══
    {
        "name": "Button Fill Slide",
        "className": "rc-btn-fill-slide",
        "category": "button-card",
        "displayType": "box",
        "css": """.rc-btn-fill-slide {
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: color 0.3s ease;
}
.rc-btn-fill-slide::before {
  content: '';
  position: absolute;
  inset: 0;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: -1;
}
.rc-btn-fill-slide:hover::before {
  transform: scaleX(1);
}
.rc-btn-fill-slide:hover {
  color: #fff;
}"""
    },
    {
        "name": "Button Arrow Slide",
        "className": "rc-btn-arrow-slide",
        "category": "button-card",
        "displayType": "box",
        "css": """.rc-btn-arrow-slide {
  display: inline-flex;
  align-items: center;
  gap: 0;
  overflow: hidden;
}
.rc-btn-arrow-slide .rc-btn-arrow-icon {
  transform: translateX(-100%);
  opacity: 0;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease, margin 0.3s ease;
  margin-left: 0;
}
.rc-btn-arrow-slide:hover .rc-btn-arrow-icon {
  transform: translateX(0);
  opacity: 1;
  margin-left: 0.5em;
}"""
    },
    {
        "name": "Card Hover Border",
        "className": "rc-card-hover-border",
        "category": "button-card",
        "displayType": "box",
        "css": """.rc-card-hover-border {
  border: 1px solid rgba(168, 85, 247, 0.15);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.rc-card-hover-border:hover {
  border-color: rgba(168, 85, 247, 0.5);
  box-shadow: 0 0 0 1px rgba(168, 85, 247, 0.1), 0 4px 16px rgba(168, 85, 247, 0.1);
}"""
    },
    {
        "name": "Card Hover Color",
        "className": "rc-card-hover-color",
        "category": "button-card",
        "displayType": "box",
        "css": """.rc-card-hover-color {
  transition: background-color 0.3s ease, color 0.3s ease;
}
.rc-card-hover-color:hover {
  background-color: rgba(168, 85, 247, 0.1);
  color: #c084fc;
}"""
    },
    {
        "name": "Card Hover Slide",
        "className": "rc-card-hover-slide",
        "category": "button-card",
        "displayType": "box",
        "css": """.rc-card-hover-slide {
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.rc-card-hover-slide:hover {
  transform: translateX(4px);
}"""
    },

    # ═══ FORMS (modern form interactions) ═══
    {
        "name": "Input Focus Glow",
        "className": "rc-input-focus-glow",
        "category": "forms",
        "displayType": "box",
        "css": """.rc-input-focus-glow {
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  border: 1px solid rgba(168, 85, 247, 0.2);
}
.rc-input-focus-glow:focus {
  outline: none;
  border-color: rgba(168, 85, 247, 0.6);
  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.15), 0 0 16px rgba(168, 85, 247, 0.1);
}"""
    },
    {
        "name": "Input Float Label",
        "className": "rc-input-float-label",
        "category": "forms",
        "displayType": "box",
        "css": """.rc-input-float-label {
  position: relative;
}
.rc-input-float-label input {
  transition: border-color 0.2s ease;
  border: 1px solid rgba(168, 85, 247, 0.2);
}
.rc-input-float-label input:focus {
  outline: none;
  border-color: rgba(168, 85, 247, 0.6);
}
.rc-input-float-label label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
  color: rgba(148, 163, 184, 0.6);
  font-size: 14px;
}
.rc-input-float-label input:focus + label,
.rc-input-float-label input:not(:placeholder-shown) + label {
  top: 0;
  transform: translateY(-50%);
  font-size: 11px;
  color: #a855f7;
  background: inherit;
  padding: 0 4px;
}"""
    },
    {
        "name": "Toggle Switch",
        "className": "rc-toggle-switch",
        "category": "forms",
        "displayType": "box",
        "css": """.rc-toggle-switch {
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: rgba(148, 163, 184, 0.3);
  position: relative;
  cursor: pointer;
  transition: background 0.3s ease;
  border: none;
  padding: 0;
}
.rc-toggle-switch::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
.rc-toggle-switch:active::after {
  transform: scale(0.9);
}
.rc-toggle-switch[aria-checked="true"],
.rc-toggle-switch.checked {
  background: #a855f7;
}
.rc-toggle-switch[aria-checked="true"]::after,
.rc-toggle-switch.checked::after {
  transform: translateX(20px);
  box-shadow: 0 1px 6px rgba(168, 85, 247, 0.4);
}"""
    },
    {
        "name": "Checkbox Anim",
        "className": "rc-checkbox-anim",
        "category": "forms",
        "displayType": "box",
        "css": """.rc-checkbox-anim {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(168, 85, 247, 0.4);
  border-radius: 6px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
}
.rc-checkbox-anim:checked {
  background: #a855f7;
  border-color: #a855f7;
}
.rc-checkbox-anim:checked::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 6px;
  width: 5px;
  height: 9px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) scale(0);
  animation: rc-checkbox-check 0.2s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
}
@keyframes rc-checkbox-check {
  from { transform: rotate(45deg) scale(0); }
  to { transform: rotate(45deg) scale(1); }
}"""
    },

    # ═══ NAVIGATION & UI ═══
    {
        "name": "Tab Underline",
        "className": "rc-tab-underline",
        "category": "navigation",
        "displayType": "box",
        "css": """.rc-tab-underline {
  position: relative;
  padding-bottom: 8px;
  transition: color 0.2s ease;
}
.rc-tab-underline::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #a855f7;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.rc-tab-underline[aria-selected="true"]::after,
.rc-tab-underline.active::after {
  transform: scaleX(1);
}
.rc-tab-underline[aria-selected="true"],
.rc-tab-underline.active {
  color: #a855f7;
}"""
    },
    {
        "name": "Dropdown Slide",
        "className": "rc-dropdown-slide",
        "category": "navigation",
        "displayType": "box",
        "css": """.rc-dropdown-slide {
  animation: rc-dropdown-slide 0.25s cubic-bezier(0.22, 1, 0.36, 1) both;
  transform-origin: top center;
}
@keyframes rc-dropdown-slide {
  from { opacity: 0; transform: translateY(-8px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}"""
    },
    {
        "name": "Tooltip Fade",
        "className": "rc-tooltip-fade",
        "category": "navigation",
        "displayType": "box",
        "css": """.rc-tooltip-fade {
  animation: rc-tooltip-fade 0.2s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes rc-tooltip-fade {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}"""
    },
    {
        "name": "Notification Slide In",
        "className": "rc-notification-slide-in",
        "category": "navigation",
        "displayType": "box",
        "css": """.rc-notification-slide-in {
  animation: rc-notification-slide-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes rc-notification-slide-in {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}"""
    },

    # ═══ SCROLL & MICRO (scroll-triggered, micro-interactions) ═══
    {
        "name": "Scroll Fade Up",
        "className": "rc-scroll-fade-up",
        "category": "scroll-micro",
        "displayType": "box",
        "css": """.rc-scroll-fade-up {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.rc-scroll-fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}"""
    },
    {
        "name": "Scroll Fade Left",
        "className": "rc-scroll-fade-left",
        "category": "scroll-micro",
        "displayType": "box",
        "css": """.rc-scroll-fade-left {
  opacity: 0;
  transform: translateX(-24px);
  transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.rc-scroll-fade-left.visible {
  opacity: 1;
  transform: translateX(0);
}"""
    },
    {
        "name": "Scroll Fade Right",
        "className": "rc-scroll-fade-right",
        "category": "scroll-micro",
        "displayType": "box",
        "css": """.rc-scroll-fade-right {
  opacity: 0;
  transform: translateX(24px);
  transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.rc-scroll-fade-right.visible {
  opacity: 1;
  transform: translateX(0);
}"""
    },
    {
        "name": "Scroll Blur Clear",
        "className": "rc-scroll-blur-clear",
        "category": "scroll-micro",
        "displayType": "box",
        "css": """.rc-scroll-blur-clear {
  opacity: 0;
  filter: blur(8px);
  transition: opacity 0.8s ease, filter 0.8s ease;
}
.rc-scroll-blur-clear.visible {
  opacity: 1;
  filter: blur(0);
}"""
    },
    {
        "name": "Scroll Scale Bounce",
        "className": "rc-scroll-scale-bounce",
        "category": "scroll-micro",
        "displayType": "box",
        "css": """.rc-scroll-scale-bounce {
  opacity: 0;
  transform: scale(0.85);
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.rc-scroll-scale-bounce.visible {
  opacity: 1;
  transform: scale(1);
}"""
    },
    {
        "name": "Scroll Clip Reveal",
        "className": "rc-scroll-clip-reveal",
        "category": "scroll-micro",
        "displayType": "box",
        "css": """.rc-scroll-clip-reveal {
  clip-path: inset(0 0 100% 0);
  transition: clip-path 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.rc-scroll-clip-reveal.visible {
  clip-path: inset(0 0 0% 0);
}"""
    },
    {
        "name": "Scroll Slide Stagger",
        "className": "rc-scroll-slide-stagger",
        "category": "scroll-micro",
        "displayType": "box",
        "css": """.rc-scroll-slide-stagger > * {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.rc-scroll-slide-stagger.visible > *:nth-child(1) { transition-delay: 0ms; opacity: 1; transform: translateY(0); }
.rc-scroll-slide-stagger.visible > *:nth-child(2) { transition-delay: 80ms; opacity: 1; transform: translateY(0); }
.rc-scroll-slide-stagger.visible > *:nth-child(3) { transition-delay: 160ms; opacity: 1; transform: translateY(0); }
.rc-scroll-slide-stagger.visible > *:nth-child(4) { transition-delay: 240ms; opacity: 1; transform: translateY(0); }
.rc-scroll-slide-stagger.visible > *:nth-child(5) { transition-delay: 320ms; opacity: 1; transform: translateY(0); }
.rc-scroll-slide-stagger.visible > *:nth-child(n+6) { transition-delay: 400ms; opacity: 1; transform: translateY(0); }"""
    },
    {
        "name": "Scroll Rotate In",
        "className": "rc-scroll-rotate-in",
        "category": "scroll-micro",
        "displayType": "box",
        "css": """.rc-scroll-rotate-in {
  opacity: 0;
  transform: rotate(-10deg) scale(0.9);
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.rc-scroll-rotate-in.visible {
  opacity: 1;
  transform: rotate(0deg) scale(1);
}"""
    },
    {
        "name": "Scroll Flip In",
        "className": "rc-scroll-flip-in",
        "category": "scroll-micro",
        "displayType": "box",
        "css": """.rc-scroll-flip-in {
  opacity: 0;
  transform: perspective(800px) rotateX(30deg);
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  transform-origin: top center;
}
.rc-scroll-flip-in.visible {
  opacity: 1;
  transform: perspective(800px) rotateX(0deg);
}"""
    },

    # ═══ ADVANCED (skeletons, progress, status, a11y, modern CSS) ═══
    {
        "name": "Skeleton Shimmer",
        "className": "rc-skeleton-shimmer",
        "category": "advanced",
        "displayType": "box",
        "css": """.rc-skeleton-shimmer {
  background: linear-gradient(90deg, rgba(148, 163, 184, 0.1) 25%, rgba(148, 163, 184, 0.2) 50%, rgba(148, 163, 184, 0.1) 75%);
  background-size: 200% 100%;
  animation: rc-skeleton-shimmer 1.5s ease-in-out infinite;
  border-radius: 8px;
}
@keyframes rc-skeleton-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}"""
    },
    {
        "name": "Skeleton Pulse",
        "className": "rc-skeleton-pulse",
        "category": "advanced",
        "displayType": "box",
        "css": """.rc-skeleton-pulse {
  background: rgba(148, 163, 184, 0.15);
  border-radius: 8px;
  animation: rc-skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes rc-skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}"""
    },
    {
        "name": "Skeleton Gradient",
        "className": "rc-skeleton-gradient",
        "category": "advanced",
        "displayType": "box",
        "css": """.rc-skeleton-gradient {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(148, 163, 184, 0.15), rgba(168, 85, 247, 0.08));
  background-size: 200% 200%;
  animation: rc-skeleton-gradient 3s ease infinite;
  border-radius: 8px;
}
@keyframes rc-skeleton-gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}"""
    },
    {
        "name": "Progress Bar Fill",
        "className": "rc-progress-bar-fill",
        "category": "advanced",
        "displayType": "box",
        "css": """.rc-progress-bar-fill {
  position: relative;
  overflow: hidden;
  background: rgba(148, 163, 184, 0.15);
  border-radius: 999px;
}
.rc-progress-bar-fill::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, #a855f7, #ec4899);
  transform-origin: left;
  animation: rc-progress-bar-fill 2s cubic-bezier(0.22, 1, 0.36, 1) both;
  border-radius: 999px;
}
@keyframes rc-progress-bar-fill {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}"""
    },
    {
        "name": "Status Pulse Green",
        "className": "rc-status-pulse-green",
        "category": "advanced",
        "displayType": "box",
        "css": """.rc-status-pulse-green {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #22c55e;
  position: relative;
}
.rc-status-pulse-green::after {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  border: 2px solid #22c55e;
  animation: rc-status-pulse-green-ring 2s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}
@keyframes rc-status-pulse-green-ring {
  0% { transform: scale(0.8); opacity: 0.8; }
  100% { transform: scale(1.8); opacity: 0; }
}"""
    },
    {
        "name": "Ripple Click",
        "className": "rc-ripple-click",
        "category": "advanced",
        "displayType": "box",
        "css": """.rc-ripple-click {
  position: relative;
  overflow: hidden;
}
.rc-ripple-click::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(168, 85, 247, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease, opacity 0.6s ease;
  opacity: 0;
}
.rc-ripple-click:active::after {
  width: 300px;
  height: 300px;
  opacity: 1;
  transition: 0s;
}"""
    },
    {
        "name": "Focus Visible Ring",
        "className": "rc-focus-visible-ring",
        "category": "advanced",
        "displayType": "box",
        "css": """.rc-focus-visible-ring:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(168, 85, 247, 0.5), 0 0 0 4px rgba(168, 85, 247, 0.15);
  border-radius: inherit;
}"""
    },
    {
        "name": "Skip Link",
        "className": "rc-skip-link",
        "category": "advanced",
        "displayType": "box",
        "css": """.rc-skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  z-index: 9999;
  padding: 8px 16px;
  background: #a855f7;
  color: #fff;
  border-radius: 0 0 8px 8px;
  font-weight: 600;
  font-size: 14px;
  transition: top 0.2s ease;
}
.rc-skip-link:focus {
  top: 0;
}"""
    },
    {
        "name": "Reduced Motion Fade",
        "className": "rc-reduced-motion-fade",
        "category": "advanced",
        "displayType": "box",
        "css": """.rc-reduced-motion-fade {
  animation: rc-reduced-motion-fade 0.3s ease both;
}
@media (prefers-reduced-motion: reduce) {
  .rc-reduced-motion-fade {
    animation: none;
    opacity: 1;
  }
}
@keyframes rc-reduced-motion-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}"""
    },
    {
        "name": "Reduced Motion Slide",
        "className": "rc-reduced-motion-slide",
        "category": "advanced",
        "displayType": "box",
        "css": """.rc-reduced-motion-slide {
  animation: rc-reduced-motion-slide 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@media (prefers-reduced-motion: reduce) {
  .rc-reduced-motion-slide {
    animation: none;
    transform: none;
    opacity: 1;
  }
}
@keyframes rc-reduced-motion-slide {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}"""
    },
    {
        "name": "High Contrast Border",
        "className": "rc-high-contrast-border",
        "category": "advanced",
        "displayType": "box",
        "css": """.rc-high-contrast-border {
  border: 1px solid rgba(148, 163, 184, 0.2);
}
@media (prefers-contrast: high) {
  .rc-high-contrast-border {
    border: 2px solid #fff;
  }
}"""
    },
    {
        "name": "Screen Reader Only",
        "className": "rc-sr-only",
        "category": "advanced",
        "displayType": "box",
        "css": """.rc-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}"""
    },
]

# ── Write JSON for the build script to consume ──
import json
with open('/tmp/new_effects.json', 'w') as f:
    json.dump(NEW_EFFECTS, f, indent=2)

# Print summary
cats = {}
for e in NEW_EFFECTS:
    cats[e['category']] = cats.get(e['category'], 0) + 1
print(f"Designed {len(NEW_EFFECTS)} new effects:")
for c, n in sorted(cats.items()):
    print(f"  {c}: +{n}")
print(f"\nNames: {[e['name'] for e in NEW_EFFECTS]}")