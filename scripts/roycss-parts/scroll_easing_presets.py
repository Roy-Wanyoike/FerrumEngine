"""RoyCSS Part 9: Scroll animations, easing demonstrations, and design presets."""

# ============================================================
# CATEGORY: SCROLL (displayType: "box")
# Scroll-triggered entrance animations optimized for reveal-on-scroll.
# ~0.6-0.8s with ease-out timing.
# ============================================================

scroll_effects = [
    ("Scroll Fade Up", "rc-scroll-fade-up", "scroll", "box", """\
.rc-scroll-fade-up {
  animation: rc-scroll-fade-up 0.7s ease-out both;
}
@keyframes rc-scroll-fade-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}"""),

    ("Scroll Fade Left", "rc-scroll-fade-left", "scroll", "box", """\
.rc-scroll-fade-left {
  animation: rc-scroll-fade-left 0.7s ease-out both;
}
@keyframes rc-scroll-fade-left {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}"""),

    ("Scroll Fade Right", "rc-scroll-fade-right", "scroll", "box", """\
.rc-scroll-fade-right {
  animation: rc-scroll-fade-right 0.7s ease-out both;
}
@keyframes rc-scroll-fade-right {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}"""),

    ("Scroll Zoom In", "rc-scroll-zoom-in", "scroll", "box", """\
.rc-scroll-zoom-in {
  animation: rc-scroll-zoom-in 0.6s ease-out both;
}
@keyframes rc-scroll-zoom-in {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}"""),

    ("Scroll Slide In Stagger", "rc-scroll-slide-stagger", "scroll", "box", """\
.rc-scroll-slide-stagger {
  animation: rc-scroll-slide-stagger 0.8s ease-out both;
  animation-delay: 0.1s;
}
@keyframes rc-scroll-slide-stagger {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  60% {
    opacity: 0.8;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}"""),

    ("Scroll Flip In", "rc-scroll-flip-in", "scroll", "box", """\
.rc-scroll-flip-in {
  animation: rc-scroll-flip-in 0.7s ease-out both;
  backface-visibility: visible;
}
@keyframes rc-scroll-flip-in {
  from {
    opacity: 0;
    transform: perspective(400px) rotateY(90deg);
  }
  to {
    opacity: 1;
    transform: perspective(400px) rotateY(0deg);
  }
}"""),

    ("Scroll Rotate In", "rc-scroll-rotate-in", "scroll", "box", """\
.rc-scroll-rotate-in {
  animation: rc-scroll-rotate-in 0.8s ease-out both;
}
@keyframes rc-scroll-rotate-in {
  from {
    opacity: 0;
    transform: rotate(-200deg) scale(0.6);
  }
  to {
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }
}"""),

    ("Scroll Scale Bounce", "rc-scroll-scale-bounce", "scroll", "box", """\
.rc-scroll-scale-bounce {
  animation: rc-scroll-scale-bounce 0.8s ease-out both;
}
@keyframes rc-scroll-scale-bounce {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.95);
  }
  100% {
    transform: scale(1);
  }
}"""),

    ("Scroll Blur Clear", "rc-scroll-blur-clear", "scroll", "box", """\
.rc-scroll-blur-clear {
  animation: rc-scroll-blur-clear 0.7s ease-out both;
}
@keyframes rc-scroll-blur-clear {
  from {
    opacity: 0;
    filter: blur(10px);
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    filter: blur(0px);
    transform: scale(1);
  }
}"""),

    ("Scroll Clip Reveal", "rc-scroll-clip-reveal", "scroll", "box", """\
.rc-scroll-clip-reveal {
  animation: rc-scroll-clip-reveal 0.7s ease-out both;
}
@keyframes rc-scroll-clip-reveal {
  from {
    opacity: 0;
    clip-path: circle(0% at 50% 50%);
  }
  to {
    opacity: 1;
    clip-path: circle(75% at 50% 50%);
  }
}"""),
]

# ============================================================
# CATEGORY: EASING (displayType: "box")
# Same animation (opacity + translateX 0->60px) with different
# timing functions so users can visually compare curves.
# ============================================================

easing_effects = [
    ("Ease Linear", "rc-ease-linear", "easing", "box", """\
.rc-ease-linear {
  animation: rc-ease-linear-move 1s linear both;
}
@keyframes rc-ease-linear-move {
  from { opacity: 0; transform: translateX(0); }
  to { opacity: 1; transform: translateX(60px); }
}"""),

    ("Ease In Quad", "rc-ease-in-quad", "easing", "box", """\
.rc-ease-in-quad {
  animation: rc-ease-in-quad-move 1s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}
@keyframes rc-ease-in-quad-move {
  from { opacity: 0; transform: translateX(0); }
  to { opacity: 1; transform: translateX(60px); }
}"""),

    ("Ease Out Quad", "rc-ease-out-quad", "easing", "box", """\
.rc-ease-out-quad {
  animation: rc-ease-out-quad-move 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}
@keyframes rc-ease-out-quad-move {
  from { opacity: 0; transform: translateX(0); }
  to { opacity: 1; transform: translateX(60px); }
}"""),

    ("Ease In Out Quad", "rc-ease-in-out-quad", "easing", "box", """\
.rc-ease-in-out-quad {
  animation: rc-ease-in-out-quad-move 1s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
}
@keyframes rc-ease-in-out-quad-move {
  from { opacity: 0; transform: translateX(0); }
  to { opacity: 1; transform: translateX(60px); }
}"""),

    ("Ease In Cubic", "rc-ease-in-cubic", "easing", "box", """\
.rc-ease-in-cubic {
  animation: rc-ease-in-cubic-move 1s cubic-bezier(0.55, 0.055, 0.675, 0.19) both;
}
@keyframes rc-ease-in-cubic-move {
  from { opacity: 0; transform: translateX(0); }
  to { opacity: 1; transform: translateX(60px); }
}"""),

    ("Ease Out Cubic", "rc-ease-out-cubic", "easing", "box", """\
.rc-ease-out-cubic {
  animation: rc-ease-out-cubic-move 1s cubic-bezier(0.215, 0.61, 0.355, 1) both;
}
@keyframes rc-ease-out-cubic-move {
  from { opacity: 0; transform: translateX(0); }
  to { opacity: 1; transform: translateX(60px); }
}"""),

    ("Ease In Out Cubic", "rc-ease-in-out-cubic", "easing", "box", """\
.rc-ease-in-out-cubic {
  animation: rc-ease-in-out-cubic-move 1s cubic-bezier(0.645, 0.045, 0.355, 1) both;
}
@keyframes rc-ease-in-out-cubic-move {
  from { opacity: 0; transform: translateX(0); }
  to { opacity: 1; transform: translateX(60px); }
}"""),

    ("Ease In Back", "rc-ease-in-back", "easing", "box", """\
.rc-ease-in-back {
  animation: rc-ease-in-back-move 1s cubic-bezier(0.6, -0.28, 0.735, 0.045) both;
}
@keyframes rc-ease-in-back-move {
  from { opacity: 0; transform: translateX(0); }
  to { opacity: 1; transform: translateX(60px); }
}"""),

    ("Ease Out Back", "rc-ease-out-back", "easing", "box", """\
.rc-ease-out-back {
  animation: rc-ease-out-back-move 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
}
@keyframes rc-ease-out-back-move {
  from { opacity: 0; transform: translateX(0); }
  to { opacity: 1; transform: translateX(60px); }
}"""),

    ("Ease In Out Back", "rc-ease-in-out-back", "easing", "box", """\
.rc-ease-in-out-back {
  animation: rc-ease-in-out-back-move 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) both;
}
@keyframes rc-ease-in-out-back-move {
  from { opacity: 0; transform: translateX(0); }
  to { opacity: 1; transform: translateX(60px); }
}"""),

    ("Elastic Out", "rc-ease-elastic-out", "easing", "box", """\
.rc-ease-elastic-out {
  animation: rc-ease-elastic-out-move 1s ease-out both;
}
@keyframes rc-ease-elastic-out-move {
  0% {
    opacity: 0;
    transform: translateX(0) scaleX(1);
  }
  40% {
    opacity: 1;
    transform: translateX(60px) scaleX(1.1);
  }
  55% {
    transform: translateX(60px) scaleX(0.95);
  }
  70% {
    transform: translateX(60px) scaleX(1.02);
  }
  85% {
    transform: translateX(60px) scaleX(0.99);
  }
  100% {
    opacity: 1;
    transform: translateX(60px) scaleX(1);
  }
}"""),

    ("Bounce Out", "rc-ease-bounce-out", "easing", "box", """\
.rc-ease-bounce-out {
  animation: rc-ease-bounce-out-move 1s ease-out both;
}
@keyframes rc-ease-bounce-out-move {
  0% {
    opacity: 0;
    transform: translateX(0) translateY(0);
  }
  20% {
    opacity: 1;
    transform: translateX(60px) translateY(0);
  }
  40% {
    transform: translateX(60px) translateY(-20px);
  }
  55% {
    transform: translateX(60px) translateY(0);
  }
  68% {
    transform: translateX(60px) translateY(-10px);
  }
  78% {
    transform: translateX(60px) translateY(0);
  }
  88% {
    transform: translateX(60px) translateY(-4px);
  }
  100% {
    opacity: 1;
    transform: translateX(60px) translateY(0);
  }
}"""),
]

# ============================================================
# CATEGORY: DESIGN PRESETS (displayType: "preset")
# CSS style presets that transform a card/element's appearance.
# These are NOT animations — they are static style presets.
# ============================================================

design_preset_effects = [
    ("Glassmorphism", "rc-preset-glassmorphism", "design-presets", "preset", """\
.rc-preset-glassmorphism {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}"""),

    ("Neumorphism", "rc-preset-neumorphism", "design-presets", "preset", """\
.rc-preset-neumorphism {
  background: #e0e5ec;
  border-radius: 16px;
  border: none;
  box-shadow:
    8px 8px 16px #a3b1c6,
    -8px -8px 16px #ffffff;
}"""),

    ("Claymorphism", "rc-preset-claymorphism", "design-presets", "preset", """\
.rc-preset-claymorphism {
  background: #f08080;
  border-radius: 32px;
  border: none;
  box-shadow:
    inset -6px -6px 12px rgba(0, 0, 0, 0.15),
    inset 6px 6px 12px rgba(255, 255, 255, 0.35),
    8px 8px 20px rgba(0, 0, 0, 0.2);
}"""),

    ("Brutalism", "rc-preset-brutalism", "design-presets", "preset", """\
.rc-preset-brutalism {
  background: #ffff00;
  border: 4px solid #000000;
  border-radius: 0;
  box-shadow: 8px 8px 0 #000000;
  font-weight: 900;
  text-transform: uppercase;
}"""),

    ("Retro/Pixel", "rc-preset-retro-pixel", "design-presets", "preset", """\
.rc-preset-retro-pixel {
  background: #2c2c54;
  border: none;
  border-radius: 0;
  color: #ffdd59;
  font-family: 'Courier New', Courier, monospace;
  box-shadow:
    4px 0 0 0 #2c2c54, -4px 0 0 0 #2c2c54,
    0 4px 0 0 #2c2c54, 0 -4px 0 0 #2c2c54,
    4px 4px 0 0 #2c2c54, -4px 4px 0 0 #2c2c54,
    4px -4px 0 0 #2c2c54, -4px -4px 0 0 #2c2c54;
  outline: 4px solid #ffdd59;
}"""),

    ("Cyberpunk", "rc-preset-cyberpunk", "design-presets", "preset", """\
.rc-preset-cyberpunk {
  background: #0a0a12;
  border: 2px solid #00f0ff;
  border-radius: 4px;
  box-shadow:
    0 0 8px rgba(0, 240, 255, 0.4),
    0 0 20px rgba(0, 240, 255, 0.15),
    inset 0 0 12px rgba(0, 240, 255, 0.05);
  color: #00f0ff;
}"""),

    ("Minimalism", "rc-preset-minimalism", "design-presets", "preset", """\
.rc-preset-minimalism {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  color: #374151;
}"""),

    ("Elevation", "rc-preset-elevation", "design-presets", "preset", """\
.rc-preset-elevation {
  background: #ffffff;
  border: none;
  border-radius: 12px;
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.05),
    0 12px 24px rgba(0, 0, 0, 0.04),
    0 20px 40px rgba(0, 0, 0, 0.03);
}"""),

    ("Gradient Border", "rc-preset-gradient-border", "design-presets", "preset", """\
.rc-preset-gradient-border {
  position: relative;
  background: #ffffff;
  border-radius: 12px;
  border: none;
}
.rc-preset-gradient-border::before {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  z-index: -1;
}"""),

    ("Dark Glass", "rc-preset-dark-glass", "design-presets", "preset", """\
.rc-preset-dark-glass {
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  color: #f3f4f6;
}"""),

    ("Soft UI", "rc-preset-soft-ui", "design-presets", "preset", """\
.rc-preset-soft-ui {
  --soft-bg: #e8ecf1;
  --soft-shadow-dark: #c8ccd2;
  --soft-shadow-light: #ffffff;
  background: var(--soft-bg);
  border: none;
  border-radius: 20px;
  box-shadow:
    6px 6px 14px var(--soft-shadow-dark),
    -6px -6px 14px var(--soft-shadow-light),
    inset 2px 2px 4px rgba(255, 255, 255, 0.6),
    inset -2px -2px 4px rgba(0, 0, 0, 0.04);
}"""),

    ("Neobrutalism", "rc-preset-neobrutalism", "design-presets", "preset", """\
.rc-preset-neobrutalism {
  background: #fef3c7;
  border: 3px solid #1e293b;
  border-radius: 8px;
  box-shadow: 6px 6px 0 #1e293b;
  color: #1e293b;
  font-weight: 700;
}"""),
]