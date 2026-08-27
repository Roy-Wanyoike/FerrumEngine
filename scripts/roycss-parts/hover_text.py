"""
RoyCSS Effects Part 2 — Hover & Text effects.

Each tuple: (name, className, category, displayType, cssString)
cssString includes the class rule AND @keyframes (if animation-based).
Hover effects use transition + :hover; text effects use @keyframes animations.
"""

hover_effects = [
    # ── Original 16 ──────────────────────────────────────────────
    (
        "Glow",
        "rc-hover-glow",
        "hover",
        "box",
        (
            ".rc-hover-glow {\n"
            "  transition: box-shadow 0.3s ease;\n"
            "}\n"
            ".rc-hover-glow:hover {\n"
            "  box-shadow: 0 0 15px rgba(0, 255, 136, 0.6), 0 0 30px rgba(0, 255, 136, 0.3), 0 0 45px rgba(0, 255, 136, 0.15);\n"
            "}"
        ),
    ),
    (
        "Scale Up",
        "rc-hover-scale-up",
        "hover",
        "box",
        (
            ".rc-hover-scale-up {\n"
            "  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n"
            "}\n"
            ".rc-hover-scale-up:hover {\n"
            "  transform: scale(1.1);\n"
            "}"
        ),
    ),
    (
        "Scale Down",
        "rc-hover-scale-down",
        "hover",
        "box",
        (
            ".rc-hover-scale-down {\n"
            "  transition: transform 0.3s ease;\n"
            "}\n"
            ".rc-hover-scale-down:hover {\n"
            "  transform: scale(0.9);\n"
            "}"
        ),
    ),
    (
        "Rotate",
        "rc-hover-rotate",
        "hover",
        "box",
        (
            ".rc-hover-rotate {\n"
            "  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);\n"
            "}\n"
            ".rc-hover-rotate:hover {\n"
            "  transform: rotate(10deg);\n"
            "}"
        ),
    ),
    (
        "Skew",
        "rc-hover-skew",
        "hover",
        "box",
        (
            ".rc-hover-skew {\n"
            "  transition: transform 0.3s ease;\n"
            "}\n"
            ".rc-hover-skew:hover {\n"
            "  transform: skewX(-5deg);\n"
            "}"
        ),
    ),
    (
        "Border Glow",
        "rc-hover-border-glow",
        "hover",
        "box",
        (
            ".rc-hover-border-glow {\n"
            "  border: 2px solid transparent;\n"
            "  transition: border-color 0.3s ease, box-shadow 0.3s ease;\n"
            "}\n"
            ".rc-hover-border-glow:hover {\n"
            "  border-color: #0ff;\n"
            "  box-shadow: 0 0 12px rgba(0, 255, 255, 0.5), inset 0 0 12px rgba(0, 255, 255, 0.1);\n"
            "}"
        ),
    ),
    (
        "Shadow Lift",
        "rc-hover-shadow-lift",
        "hover",
        "box",
        (
            ".rc-hover-shadow-lift {\n"
            "  transition: transform 0.3s ease, box-shadow 0.3s ease;\n"
            "}\n"
            ".rc-hover-shadow-lift:hover {\n"
            "  transform: translateY(-5px);\n"
            "  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);\n"
            "}"
        ),
    ),
    (
        "Float",
        "rc-hover-float",
        "hover",
        "box",
        (
            ".rc-hover-float {\n"
            "  transition: transform 0.4s ease, box-shadow 0.4s ease;\n"
            "}\n"
            ".rc-hover-float:hover {\n"
            "  transform: translateY(-8px);\n"
            "  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.12);\n"
            "}"
        ),
    ),
    (
        "Tilt",
        "rc-hover-tilt",
        "hover",
        "box",
        (
            ".rc-hover-tilt {\n"
            "  transition: transform 0.3s ease;\n"
            "  transform-style: preserve-3d;\n"
            "}\n"
            ".rc-hover-tilt:hover {\n"
            "  transform: perspective(600px) rotateX(5deg) rotateY(-5deg);\n"
            "}"
        ),
    ),
    (
        "Ripple",
        "rc-hover-ripple",
        "hover",
        "box",
        (
            ".rc-hover-ripple {\n"
            "  position: relative;\n"
            "  overflow: hidden;\n"
            "}\n"
            ".rc-hover-ripple::before {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  top: 50%;\n"
            "  left: 50%;\n"
            "  width: 0;\n"
            "  height: 0;\n"
            "  border-radius: 50%;\n"
            "  background: rgba(255, 255, 255, 0.25);\n"
            "  transform: translate(-50%, -50%);\n"
            "  transition: width 0.6s ease, height 0.6s ease, opacity 0.6s ease;\n"
            "  z-index: 1;\n"
            "}\n"
            ".rc-hover-ripple:hover::before {\n"
            "  width: 300%;\n"
            "  height: 300%;\n"
            "  opacity: 0;\n"
            "}"
        ),
    ),
    (
        "Underline Grow",
        "rc-hover-underline-grow",
        "hover",
        "box",
        (
            ".rc-hover-underline-grow {\n"
            "  position: relative;\n"
            "}\n"
            ".rc-hover-underline-grow::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  bottom: 0;\n"
            "  left: 50%;\n"
            "  width: 0;\n"
            "  height: 2px;\n"
            "  background: linear-gradient(90deg, #667eea, #764ba2);\n"
            "  transition: width 0.35s ease, left 0.35s ease;\n"
            "}\n"
            ".rc-hover-underline-grow:hover::after {\n"
            "  width: 100%;\n"
            "  left: 0;\n"
            "}"
        ),
    ),
    (
        "Overlay Slide",
        "rc-hover-overlay-slide",
        "hover",
        "box",
        (
            ".rc-hover-overlay-slide {\n"
            "  position: relative;\n"
            "  overflow: hidden;\n"
            "}\n"
            ".rc-hover-overlay-slide::before {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  top: 0;\n"
            "  left: -100%;\n"
            "  width: 100%;\n"
            "  height: 100%;\n"
            "  background: rgba(0, 0, 0, 0.45);\n"
            "  transition: left 0.4s ease;\n"
            "  z-index: 1;\n"
            "}\n"
            ".rc-hover-overlay-slide:hover::before {\n"
            "  left: 0;\n"
            "}"
        ),
    ),
    (
        "Background Slide",
        "rc-hover-bg-slide",
        "hover",
        "box",
        (
            ".rc-hover-bg-slide {\n"
            "  position: relative;\n"
            "  overflow: hidden;\n"
            "  z-index: 1;\n"
            "}\n"
            ".rc-hover-bg-slide::before {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  bottom: 0;\n"
            "  left: 0;\n"
            "  width: 100%;\n"
            "  height: 0;\n"
            "  background: linear-gradient(to top, #667eea, #764ba2);\n"
            "  transition: height 0.4s ease;\n"
            "  z-index: -1;\n"
            "}\n"
            ".rc-hover-bg-slide:hover::before {\n"
            "  height: 100%;\n"
            "}"
        ),
    ),
    (
        "Shrink Border",
        "rc-hover-shrink-border",
        "hover",
        "box",
        (
            ".rc-hover-shrink-border {\n"
            "  box-shadow: 0 0 0 3px #667eea;\n"
            "  transition: box-shadow 0.3s ease, transform 0.3s ease;\n"
            "}\n"
            ".rc-hover-shrink-border:hover {\n"
            "  box-shadow: 0 0 0 1px #667eea;\n"
            "  transform: scale(1.02);\n"
            "}"
        ),
    ),
    (
        "Expand",
        "rc-hover-expand",
        "hover",
        "box",
        (
            ".rc-hover-expand {\n"
            "  transition: transform 0.3s ease, box-shadow 0.3s ease;\n"
            "}\n"
            ".rc-hover-expand:hover {\n"
            "  transform: scale(1.05);\n"
            "  box-shadow: 0 0 0 5px rgba(102, 126, 234, 0.25);\n"
            "}"
        ),
    ),
    (
        "Neon Pulse",
        "rc-hover-neon-pulse",
        "hover",
        "box",
        (
            ".rc-hover-neon-pulse {\n"
            "  border: 2px solid transparent;\n"
            "  transition: border-color 0.3s ease, box-shadow 0.3s ease, text-shadow 0.3s ease;\n"
            "}\n"
            ".rc-hover-neon-pulse:hover {\n"
            "  border-color: #0f0;\n"
            "  box-shadow: 0 0 8px #0f0, 0 0 20px #0f0, 0 0 40px #0f0, 0 0 80px rgba(0, 255, 0, 0.4);\n"
            "  text-shadow: 0 0 8px #0f0, 0 0 20px #0f0;\n"
            "}"
        ),
    ),

    # ── New 12 ───────────────────────────────────────────────────
    (
        "Hover Fill",
        "rc-hover-fill",
        "hover",
        "box",
        (
            ".rc-hover-fill {\n"
            "  position: relative;\n"
            "  overflow: hidden;\n"
            "  z-index: 1;\n"
            "  transition: color 0.35s ease;\n"
            "}\n"
            ".rc-hover-fill::before {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  top: 0;\n"
            "  left: 0;\n"
            "  width: 100%;\n"
            "  height: 100%;\n"
            "  background: #667eea;\n"
            "  transform: scaleX(0);\n"
            "  transform-origin: left;\n"
            "  transition: transform 0.4s cubic-bezier(0.65, 0, 0.35, 1);\n"
            "  z-index: -1;\n"
            "}\n"
            ".rc-hover-fill:hover::before {\n"
            "  transform: scaleX(1);\n"
            "}\n"
            ".rc-hover-fill:hover {\n"
            "  color: #fff;\n"
            "}"
        ),
    ),
    (
        "Hover Swipe",
        "rc-hover-swipe",
        "hover",
        "box",
        (
            ".rc-hover-swipe {\n"
            "  position: relative;\n"
            "  overflow: hidden;\n"
            "  z-index: 1;\n"
            "  transition: color 0.35s ease;\n"
            "}\n"
            ".rc-hover-swipe::before {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  top: 0;\n"
            "  left: -110%;\n"
            "  width: 100%;\n"
            "  height: 100%;\n"
            "  background: linear-gradient(135deg, #f093fb, #f5576c);\n"
            "  transform: skewX(-15deg);\n"
            "  transition: left 0.5s cubic-bezier(0.65, 0, 0.35, 1);\n"
            "  z-index: -1;\n"
            "}\n"
            ".rc-hover-swipe:hover::before {\n"
            "  left: 0;\n"
            "}\n"
            ".rc-hover-swipe:hover {\n"
            "  color: #fff;\n"
            "}"
        ),
    ),
    (
        "Hover Shadow",
        "rc-hover-shadow",
        "hover",
        "box",
        (
            ".rc-hover-shadow {\n"
            "  transition: box-shadow 0.4s ease;\n"
            "}\n"
            ".rc-hover-shadow:hover {\n"
            "  box-shadow:\n"
            "    0 1px 2px rgba(0, 0, 0, 0.07),\n"
            "    0 2px 4px rgba(0, 0, 0, 0.07),\n"
            "    0 4px 8px rgba(0, 0, 0, 0.07),\n"
            "    0 8px 16px rgba(0, 0, 0, 0.07),\n"
            "    0 16px 32px rgba(0, 0, 0, 0.07),\n"
            "    0 32px 64px rgba(0, 0, 0, 0.07);\n"
            "}"
        ),
    ),
    (
        "Hover Blur",
        "rc-hover-blur",
        "hover",
        "box",
        (
            ".rc-hover-blur {\n"
            "  transition: filter 0.3s ease;\n"
            "}\n"
            ".rc-hover-blur:hover {\n"
            "  filter: blur(2px) brightness(1.2) contrast(1.1);\n"
            "}"
        ),
    ),
    (
        "Hover Skew Reverse",
        "rc-hover-skew-reverse",
        "hover",
        "box",
        (
            ".rc-hover-skew-reverse {\n"
            "  transform: skewX(10deg);\n"
            "  transition: transform 0.35s ease;\n"
            "}\n"
            ".rc-hover-skew-reverse:hover {\n"
            "  transform: skewX(-10deg);\n"
            "}"
        ),
    ),
    (
        "Hover Flip",
        "rc-hover-flip",
        "hover",
        "box",
        (
            ".rc-hover-flip {\n"
            "  perspective: 800px;\n"
            "  transform-style: preserve-3d;\n"
            "  backface-visibility: hidden;\n"
            "  transition: transform 0.6s ease;\n"
            "}\n"
            ".rc-hover-flip:hover {\n"
            "  transform: rotateY(180deg);\n"
            "  background: linear-gradient(135deg, #667eea, #764ba2);\n"
            "  color: #fff;\n"
            "}"
        ),
    ),
    (
        "Hover Slide Right",
        "rc-hover-slide-right",
        "hover",
        "box",
        (
            ".rc-hover-slide-right {\n"
            "  transition: transform 0.3s ease, box-shadow 0.3s ease;\n"
            "}\n"
            ".rc-hover-slide-right:hover {\n"
            "  transform: translateX(8px);\n"
            "  box-shadow: -4px 2px 12px rgba(0, 0, 0, 0.18);\n"
            "}"
        ),
    ),
    (
        "Hover Slide Up",
        "rc-hover-slide-up",
        "hover",
        "box",
        (
            ".rc-hover-slide-up {\n"
            "  transition: transform 0.3s ease, box-shadow 0.3s ease;\n"
            "}\n"
            ".rc-hover-slide-up:hover {\n"
            "  transform: translateY(-4px);\n"
            "  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);\n"
            "}"
        ),
    ),
    (
        "Hover Morph",
        "rc-hover-morph",
        "hover",
        "box",
        (
            ".rc-hover-morph {\n"
            "  border-radius: 8px;\n"
            "  transition: border-radius 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.5s ease;\n"
            "}\n"
            ".rc-hover-morph:hover {\n"
            "  border-radius: 50%;\n"
            "  transform: scale(0.95);\n"
            "}"
        ),
    ),
    (
        "Hover Shake",
        "rc-hover-shake",
        "hover",
        "box",
        (
            ".rc-hover-shake:hover {\n"
            "  animation: rc-hover-shake-anim 0.5s ease;\n"
            "}\n"
            "@keyframes rc-hover-shake-anim {\n"
            "  0%, 100% { transform: translateX(0); }\n"
            "  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }\n"
            "  20%, 40%, 60%, 80% { transform: translateX(4px); }\n"
            "}"
        ),
    ),
    (
        "Hover Glow Text",
        "rc-hover-glow-text",
        "hover",
        "box",
        (
            ".rc-hover-glow-text {\n"
            "  transition: text-shadow 0.3s ease, color 0.3s ease;\n"
            "}\n"
            ".rc-hover-glow-text:hover {\n"
            "  text-shadow: 0 0 8px #0ff, 0 0 16px #0ff, 0 0 32px #0ff, 0 0 64px rgba(0, 255, 255, 0.4);\n"
            "  color: #fff;\n"
            "}"
        ),
    ),
    (
        "Hover 3D Lift",
        "rc-hover-3d-lift",
        "hover",
        "box",
        (
            ".rc-hover-3d-lift {\n"
            "  transition: transform 0.4s ease, box-shadow 0.4s ease;\n"
            "  transform-style: preserve-3d;\n"
            "}\n"
            ".rc-hover-3d-lift:hover {\n"
            "  transform: perspective(800px) rotateX(3deg) translateY(-8px);\n"
            "  box-shadow:\n"
            "    0 20px 40px rgba(0, 0, 0, 0.2),\n"
            "    0 0 12px rgba(102, 126, 234, 0.15);\n"
            "}"
        ),
    ),
]

# ═══════════════════════════════════════════════════════════════════
#  TEXT EFFECTS  (displayType: "text")
# ═══════════════════════════════════════════════════════════════════

text_effects = [
    # ── Original 10 ─────────────────────────────────────────────
    (
        "Gradient",
        "rc-text-gradient",
        "text",
        "text",
        (
            ".rc-text-gradient {\n"
            "  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);\n"
            "  -webkit-background-clip: text;\n"
            "  -webkit-text-fill-color: transparent;\n"
            "  background-clip: text;\n"
            "}"
        ),
    ),
    (
        "Shadow Pop",
        "rc-text-shadow-pop",
        "text",
        "text",
        (
            ".rc-text-shadow-pop {\n"
            "  animation: rc-text-shadow-pop-anim 0.5s ease both;\n"
            "}\n"
            "@keyframes rc-text-shadow-pop-anim {\n"
            "  0% {\n"
            "    text-shadow: 0 0 0 rgba(0, 0, 0, 0.3);\n"
            "    transform: scale(1);\n"
            "  }\n"
            "  50% {\n"
            "    text-shadow: 4px 4px 0 rgba(102, 126, 234, 0.4);\n"
            "    transform: scale(1.06);\n"
            "  }\n"
            "  100% {\n"
            "    text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.2);\n"
            "    transform: scale(1);\n"
            "  }\n"
            "}"
        ),
    ),
    (
        "Stroke",
        "rc-text-stroke",
        "text",
        "text",
        (
            ".rc-text-stroke {\n"
            "  -webkit-text-stroke: 2px #667eea;\n"
            "  -webkit-text-fill-color: transparent;\n"
            "}"
        ),
    ),
    (
        "Glow",
        "rc-text-glow",
        "text",
        "text",
        (
            ".rc-text-glow {\n"
            "  animation: rc-text-glow-anim 2s ease-in-out infinite alternate;\n"
            "}\n"
            "@keyframes rc-text-glow-anim {\n"
            "  0% { text-shadow: 0 0 5px #667eea, 0 0 10px #667eea; }\n"
            "  100% { text-shadow: 0 0 10px #667eea, 0 0 20px #667eea, 0 0 40px #764ba2; }\n"
            "}"
        ),
    ),
    (
        "Typewriter",
        "rc-text-typewriter",
        "text",
        "text",
        (
            ".rc-text-typewriter {\n"
            "  overflow: hidden;\n"
            "  white-space: nowrap;\n"
            "  border-right: 2px solid #667eea;\n"
            "  width: 0;\n"
            "  animation:\n"
            "    rc-text-typewriter-type 3s steps(24) forwards,\n"
            "    rc-text-typewriter-cursor 0.75s step-end infinite;\n"
            "}\n"
            "@keyframes rc-text-typewriter-type {\n"
            "  0% { width: 0; }\n"
            "  100% { width: 100%; }\n"
            "}\n"
            "@keyframes rc-text-typewriter-cursor {\n"
            "  0%, 100% { border-color: #667eea; }\n"
            "  50% { border-color: transparent; }\n"
            "}"
        ),
    ),
    (
        "Wave",
        "rc-text-wave",
        "text",
        "text",
        (
            ".rc-text-wave span {\n"
            "  display: inline-block;\n"
            "  animation: rc-text-wave-anim 1.4s ease-in-out infinite;\n"
            "}\n"
            ".rc-text-wave span:nth-child(2)  { animation-delay: 0.1s; }\n"
            ".rc-text-wave span:nth-child(3)  { animation-delay: 0.2s; }\n"
            ".rc-text-wave span:nth-child(4)  { animation-delay: 0.3s; }\n"
            ".rc-text-wave span:nth-child(5)  { animation-delay: 0.4s; }\n"
            ".rc-text-wave span:nth-child(6)  { animation-delay: 0.5s; }\n"
            ".rc-text-wave span:nth-child(7)  { animation-delay: 0.6s; }\n"
            ".rc-text-wave span:nth-child(8)  { animation-delay: 0.7s; }\n"
            ".rc-text-wave span:nth-child(9)  { animation-delay: 0.8s; }\n"
            ".rc-text-wave span:nth-child(10) { animation-delay: 0.9s; }\n"
            ".rc-text-wave span:nth-child(11) { animation-delay: 1.0s; }\n"
            ".rc-text-wave span:nth-child(12) { animation-delay: 1.1s; }\n"
            "@keyframes rc-text-wave-anim {\n"
            "  0%, 100% { transform: translateY(0); }\n"
            "  50% { transform: translateY(-10px); }\n"
            "}"
        ),
    ),
    (
        "Blur In",
        "rc-text-blur-in",
        "text",
        "text",
        (
            ".rc-text-blur-in {\n"
            "  animation: rc-text-blur-in-anim 1.2s ease forwards;\n"
            "}\n"
            "@keyframes rc-text-blur-in-anim {\n"
            "  0% { filter: blur(12px); opacity: 0; }\n"
            "  100% { filter: blur(0); opacity: 1; }\n"
            "}"
        ),
    ),
    (
        "Highlight",
        "rc-text-highlight",
        "text",
        "text",
        (
            ".rc-text-highlight {\n"
            "  background: linear-gradient(to right, rgba(102, 126, 234, 0.3) 50%, transparent 50%);\n"
            "  background-size: 200% 100%;\n"
            "  background-position: 100% 0;\n"
            "  display: inline;\n"
            "  animation: rc-text-highlight-anim 1.5s ease forwards;\n"
            "}\n"
            "@keyframes rc-text-highlight-anim {\n"
            "  0% { background-position: 100% 0; }\n"
            "  100% { background-position: 0 0; }\n"
            "}"
        ),
    ),
    (
        "Underline Slide",
        "rc-text-underline-slide",
        "text",
        "text",
        (
            ".rc-text-underline-slide {\n"
            "  position: relative;\n"
            "  display: inline-block;\n"
            "}\n"
            ".rc-text-underline-slide::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  bottom: -2px;\n"
            "  left: 0;\n"
            "  width: 100%;\n"
            "  height: 2px;\n"
            "  background: #667eea;\n"
            "  transform: scaleX(0);\n"
            "  transform-origin: right;\n"
            "  animation: rc-text-underline-slide-anim 0.8s ease forwards 0.3s;\n"
            "}\n"
            "@keyframes rc-text-underline-slide-anim {\n"
            "  0% { transform: scaleX(0); transform-origin: right; }\n"
            "  100% { transform: scaleX(1); transform-origin: left; }\n"
            "}"
        ),
    ),
    (
        "Blink",
        "rc-text-blink",
        "text",
        "text",
        (
            ".rc-text-blink {\n"
            "  animation: rc-text-blink-anim 1s step-end infinite;\n"
            "}\n"
            "@keyframes rc-text-blink-anim {\n"
            "  0%, 100% { opacity: 1; }\n"
            "  50% { opacity: 0; }\n"
            "}"
        ),
    ),

    # ── New 8 ───────────────────────────────────────────────────
    (
        "Text Scramble",
        "rc-text-scramble",
        "text",
        "text",
        (
            ".rc-text-scramble span {\n"
            "  display: inline-block;\n"
            "  opacity: 0;\n"
            "  animation: rc-text-scramble-anim 0.35s ease forwards;\n"
            "}\n"
            ".rc-text-scramble span:nth-child(1)  { animation-delay: 0.04s; }\n"
            ".rc-text-scramble span:nth-child(2)  { animation-delay: 0.08s; }\n"
            ".rc-text-scramble span:nth-child(3)  { animation-delay: 0.12s; }\n"
            ".rc-text-scramble span:nth-child(4)  { animation-delay: 0.16s; }\n"
            ".rc-text-scramble span:nth-child(5)  { animation-delay: 0.20s; }\n"
            ".rc-text-scramble span:nth-child(6)  { animation-delay: 0.24s; }\n"
            ".rc-text-scramble span:nth-child(7)  { animation-delay: 0.28s; }\n"
            ".rc-text-scramble span:nth-child(8)  { animation-delay: 0.32s; }\n"
            ".rc-text-scramble span:nth-child(9)  { animation-delay: 0.36s; }\n"
            ".rc-text-scramble span:nth-child(10) { animation-delay: 0.40s; }\n"
            ".rc-text-scramble span:nth-child(11) { animation-delay: 0.44s; }\n"
            ".rc-text-scramble span:nth-child(12) { animation-delay: 0.48s; }\n"
            ".rc-text-scramble span:nth-child(13) { animation-delay: 0.52s; }\n"
            ".rc-text-scramble span:nth-child(14) { animation-delay: 0.56s; }\n"
            ".rc-text-scramble span:nth-child(15) { animation-delay: 0.60s; }\n"
            ".rc-text-scramble span:nth-child(16) { animation-delay: 0.64s; }\n"
            "@keyframes rc-text-scramble-anim {\n"
            "  0%   { opacity: 0; transform: translateY(-8px); }\n"
            "  25%  { opacity: 0.6; transform: translateY(2px); }\n"
            "  50%  { opacity: 0.2; transform: translateY(-4px); }\n"
            "  75%  { opacity: 0.8; transform: translateY(1px); }\n"
            "  100% { opacity: 1; transform: translateY(0); }\n"
            "}"
        ),
    ),
    (
        "Text 3D",
        "rc-text-3d",
        "text",
        "text",
        (
            ".rc-text-3d {\n"
            "  color: #444;\n"
            "  text-shadow:\n"
            "    1px 1px 0 #e0e0e0,\n"
            "    2px 2px 0 #d0d0d0,\n"
            "    3px 3px 0 #c0c0c0,\n"
            "    4px 4px 0 #b0b0b0,\n"
            "    5px 5px 0 #a0a0a0,\n"
            "    6px 6px 0 #909090,\n"
            "    7px 7px 5px rgba(0, 0, 0, 0.25);\n"
            "}"
        ),
    ),
    (
        "Text Neon Flicker",
        "rc-text-neon-flicker",
        "text",
        "text",
        (
            ".rc-text-neon-flicker {\n"
            "  color: #fff;\n"
            "  animation: rc-text-neon-flicker-anim 4s infinite alternate;\n"
            "}\n"
            "@keyframes rc-text-neon-flicker-anim {\n"
            "  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {\n"
            "    text-shadow:\n"
            "      0 0 4px #ff0,\n"
            "      0 0 11px #ff0,\n"
            "      0 0 19px #ff0,\n"
            "      0 0 40px #ff00de,\n"
            "      0 0 80px #ff00de;\n"
            "  }\n"
            "  20%, 24%, 55% {\n"
            "    text-shadow: none;\n"
            "  }\n"
            "}"
        ),
    ),
    (
        "Text Rainbow",
        "rc-text-rainbow",
        "text",
        "text",
        (
            ".rc-text-rainbow {\n"
            "  background: linear-gradient(\n"
            "    90deg,\n"
            "    #ff0000, #ff8800, #ffff00,\n"
            "    #00ff00, #0088ff, #8800ff,\n"
            "    #ff0088, #ff0000\n"
            "  );\n"
            "  background-size: 200% auto;\n"
            "  -webkit-background-clip: text;\n"
            "  -webkit-text-fill-color: transparent;\n"
            "  background-clip: text;\n"
            "  animation: rc-text-rainbow-anim 3s linear infinite;\n"
            "}\n"
            "@keyframes rc-text-rainbow-anim {\n"
            "  0%   { background-position: 0% center; }\n"
            "  100% { background-position: 200% center; }\n"
            "}"
        ),
    ),
    (
        "Text Slide Up",
        "rc-text-slide-up",
        "text",
        "text",
        (
            ".rc-text-slide-up span {\n"
            "  display: inline-block;\n"
            "  opacity: 0;\n"
            "  transform: translateY(100%);\n"
            "  animation: rc-text-slide-up-anim 0.5s ease forwards;\n"
            "}\n"
            ".rc-text-slide-up span:nth-child(1)  { animation-delay: 0.05s; }\n"
            ".rc-text-slide-up span:nth-child(2)  { animation-delay: 0.10s; }\n"
            ".rc-text-slide-up span:nth-child(3)  { animation-delay: 0.15s; }\n"
            ".rc-text-slide-up span:nth-child(4)  { animation-delay: 0.20s; }\n"
            ".rc-text-slide-up span:nth-child(5)  { animation-delay: 0.25s; }\n"
            ".rc-text-slide-up span:nth-child(6)  { animation-delay: 0.30s; }\n"
            ".rc-text-slide-up span:nth-child(7)  { animation-delay: 0.35s; }\n"
            ".rc-text-slide-up span:nth-child(8)  { animation-delay: 0.40s; }\n"
            ".rc-text-slide-up span:nth-child(9)  { animation-delay: 0.45s; }\n"
            ".rc-text-slide-up span:nth-child(10) { animation-delay: 0.50s; }\n"
            ".rc-text-slide-up span:nth-child(11) { animation-delay: 0.55s; }\n"
            ".rc-text-slide-up span:nth-child(12) { animation-delay: 0.60s; }\n"
            "@keyframes rc-text-slide-up-anim {\n"
            "  0% {\n"
            "    opacity: 0;\n"
            "    transform: translateY(100%);\n"
            "  }\n"
            "  100% {\n"
            "    opacity: 1;\n"
            "    transform: translateY(0);\n"
            "  }\n"
            "}"
        ),
    ),
    (
        "Text Glitch",
        "rc-text-glitch",
        "text",
        "text",
        (
            ".rc-text-glitch {\n"
            "  position: relative;\n"
            "  display: inline-block;\n"
            "}\n"
            ".rc-text-glitch::before,\n"
            ".rc-text-glitch::after {\n"
            "  content: attr(data-text);\n"
            "  position: absolute;\n"
            "  top: 0;\n"
            "  left: 0;\n"
            "  width: 100%;\n"
            "  height: 100%;\n"
            "  pointer-events: none;\n"
            "}\n"
            ".rc-text-glitch::before {\n"
            "  color: #ff0;\n"
            "  animation: rc-text-glitch-1 2s infinite linear alternate-reverse;\n"
            "}\n"
            ".rc-text-glitch::after {\n"
            "  color: #0ff;\n"
            "  animation: rc-text-glitch-2 2s infinite linear alternate-reverse;\n"
            "}\n"
            "@keyframes rc-text-glitch-1 {\n"
            "  0%   { clip-path: inset(20% 0 60% 0); transform: translate(-3px, 0); }\n"
            "  20%  { clip-path: inset(60% 0 10% 0); transform: translate(3px, 0); }\n"
            "  40%  { clip-path: inset(40% 0 30% 0); transform: translate(-2px, 0); }\n"
            "  60%  { clip-path: inset(70% 0 5% 0);  transform: translate(2px, 0); }\n"
            "  80%  { clip-path: inset(10% 0 70% 0); transform: translate(-3px, 0); }\n"
            "  100% { clip-path: inset(50% 0 20% 0); transform: translate(3px, 0); }\n"
            "}\n"
            "@keyframes rc-text-glitch-2 {\n"
            "  0%   { clip-path: inset(70% 0 10% 0); transform: translate(3px, 0); }\n"
            "  20%  { clip-path: inset(10% 0 70% 0); transform: translate(-3px, 0); }\n"
            "  40%  { clip-path: inset(50% 0 20% 0); transform: translate(2px, 0); }\n"
            "  60%  { clip-path: inset(20% 0 60% 0); transform: translate(-2px, 0); }\n"
            "  80%  { clip-path: inset(60% 0 10% 0); transform: translate(3px, 0); }\n"
            "  100% { clip-path: inset(30% 0 40% 0); transform: translate(-3px, 0); }\n"
            "}"
        ),
    ),
    (
        "Text Reveal",
        "rc-text-reveal",
        "text",
        "text",
        (
            ".rc-text-reveal {\n"
            "  overflow: hidden;\n"
            "  display: inline-block;\n"
            "}\n"
            ".rc-text-reveal span {\n"
            "  display: inline-block;\n"
            "  transform: translateY(110%);\n"
            "  animation: rc-text-reveal-anim 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;\n"
            "}\n"
            ".rc-text-reveal span:nth-child(1)  { animation-delay: 0.05s; }\n"
            ".rc-text-reveal span:nth-child(2)  { animation-delay: 0.10s; }\n"
            ".rc-text-reveal span:nth-child(3)  { animation-delay: 0.15s; }\n"
            ".rc-text-reveal span:nth-child(4)  { animation-delay: 0.20s; }\n"
            ".rc-text-reveal span:nth-child(5)  { animation-delay: 0.25s; }\n"
            ".rc-text-reveal span:nth-child(6)  { animation-delay: 0.30s; }\n"
            ".rc-text-reveal span:nth-child(7)  { animation-delay: 0.35s; }\n"
            ".rc-text-reveal span:nth-child(8)  { animation-delay: 0.40s; }\n"
            ".rc-text-reveal span:nth-child(9)  { animation-delay: 0.45s; }\n"
            ".rc-text-reveal span:nth-child(10) { animation-delay: 0.50s; }\n"
            "@keyframes rc-text-reveal-anim {\n"
            "  0% {\n"
            "    transform: translateY(110%);\n"
            "  }\n"
            "  100% {\n"
            "    transform: translateY(0);\n"
            "  }\n"
            "}"
        ),
    ),
    (
        "Text Bounce",
        "rc-text-bounce",
        "text",
        "text",
        (
            ".rc-text-bounce span {\n"
            "  display: inline-block;\n"
            "  animation: rc-text-bounce-anim 0.6s ease;\n"
            "  animation-fill-mode: both;\n"
            "}\n"
            ".rc-text-bounce span:nth-child(1)  { animation-delay: 0.00s; }\n"
            ".rc-text-bounce span:nth-child(2)  { animation-delay: 0.06s; }\n"
            ".rc-text-bounce span:nth-child(3)  { animation-delay: 0.12s; }\n"
            ".rc-text-bounce span:nth-child(4)  { animation-delay: 0.18s; }\n"
            ".rc-text-bounce span:nth-child(5)  { animation-delay: 0.24s; }\n"
            ".rc-text-bounce span:nth-child(6)  { animation-delay: 0.30s; }\n"
            ".rc-text-bounce span:nth-child(7)  { animation-delay: 0.36s; }\n"
            ".rc-text-bounce span:nth-child(8)  { animation-delay: 0.42s; }\n"
            ".rc-text-bounce span:nth-child(9)  { animation-delay: 0.48s; }\n"
            ".rc-text-bounce span:nth-child(10) { animation-delay: 0.54s; }\n"
            ".rc-text-bounce span:nth-child(11) { animation-delay: 0.60s; }\n"
            ".rc-text-bounce span:nth-child(12) { animation-delay: 0.66s; }\n"
            "@keyframes rc-text-bounce-anim {\n"
            "  0%   { transform: translateY(0); }\n"
            "  25%  { transform: translateY(-16px); }\n"
            "  50%  { transform: translateY(0); }\n"
            "  70%  { transform: translateY(-6px); }\n"
            "  100% { transform: translateY(0); }\n"
            "}"
        ),
    ),
]