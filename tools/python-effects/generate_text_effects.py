"""
FerrumEngine Python Effect Generator — Text Effects

Generates 14 text-based CSS effects for the FerrumEngine ecosystem.
Includes text shadows, gradients on text, typing animation, glitch text,
text stroke/fill, marquee, and underline animations.

Usage:
    python3 generate_text_effects.py          # Output JSON array to stdout
    python3 generate_text_effects.py > text_effects.json
    from generate_text_effects import generate_all
"""

import json
import sys


def _effect(name: str, class_name: str, css: str) -> dict:
    return {
        "name": name,
        "className": class_name,
        "category": "text",
        "displayType": "text",
        "css": css,
    }


def generate_all() -> list[dict]:
    effects = []

    # 1. Neon Glow Text Shadow
    effects.append(_effect(
        "Text Neon Glow",
        "roycss-text-neon-glow",
        ".roycss-text-neon-glow {\n"
        "  color: #fff;\n"
        "  text-shadow:\n"
        "    0 0 7px #10b981,\n"
        "    0 0 10px #10b981,\n"
        "    0 0 21px #10b981,\n"
        "    0 0 42px #059669,\n"
        "    0 0 82px #059669;\n"
        "  font-weight: 700;\n"
        "}",
    ))

    # 2. Retro Long Shadow
    effects.append(_effect(
        "Text Retro Long Shadow",
        "roycss-text-retro-shadow",
        ".roycss-text-retro-shadow {\n"
        "  color: #fbbf24;\n"
        "  text-shadow:\n"
        "    1px 1px 0 #b45309,\n"
        "    2px 2px 0 #b45309,\n"
        "    3px 3px 0 #92400e,\n"
        "    4px 4px 0 #92400e,\n"
        "    5px 5px 0 #78350f,\n"
        "    6px 6px 0 #78350f,\n"
        "    7px 7px 0 #451a03;\n"
        "  font-weight: 800;\n"
        "}",
    ))

    # 3. Gradient Text — Emerald to Cyan
    effects.append(_effect(
        "Text Gradient Emerald Cyan",
        "roycss-text-gradient-emerald-cyan",
        ".roycss-text-gradient-emerald-cyan {\n"
        "  background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);\n"
        "  -webkit-background-clip: text;\n"
        "  background-clip: text;\n"
        "  -webkit-text-fill-color: transparent;\n"
        "  color: transparent;\n"
        "  font-weight: 700;\n"
        "}",
    ))

    # 4. Gradient Text — Sunset
    effects.append(_effect(
        "Text Gradient Sunset",
        "roycss-text-gradient-sunset",
        ".roycss-text-gradient-sunset {\n"
        "  background: linear-gradient(90deg, #f97316, #ec4899, #8b5cf6);\n"
        "  -webkit-background-clip: text;\n"
        "  background-clip: text;\n"
        "  -webkit-text-fill-color: transparent;\n"
        "  color: transparent;\n"
        "  font-weight: 700;\n"
        "}",
    ))

    # 5. Gradient Text — Rainbow Animated
    effects.append(_effect(
        "Text Gradient Rainbow",
        "roycss-text-gradient-rainbow",
        ".roycss-text-gradient-rainbow {\n"
        "  background: linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6, #ec4899);\n"
        "  background-size: 200% 100%;\n"
        "  -webkit-background-clip: text;\n"
        "  background-clip: text;\n"
        "  -webkit-text-fill-color: transparent;\n"
        "  color: transparent;\n"
        "  font-weight: 700;\n"
        "  animation: roy-py-rainbow-shift 3s linear infinite;\n"
        "}\n"
        "@keyframes roy-py-rainbow-shift {\n"
        "  0% { background-position: 0% 50%; }\n"
        "  100% { background-position: 200% 50%; }\n"
        "}",
    ))

    # 6. Typing Cursor Animation
    effects.append(_effect(
        "Text Typing Cursor",
        "roycss-text-typing-cursor",
        ".roycss-text-typing-cursor {\n"
        "  border-right: 3px solid #10b981;\n"
        "  overflow: hidden;\n"
        "  white-space: nowrap;\n"
        "  animation: roy-py-typing 3.5s steps(30, end), roy-py-blink-caret 0.75s step-end infinite;\n"
        "}\n"
        "@keyframes roy-py-typing {\n"
        "  from { width: 0; }\n"
        "  to { width: 100%; }\n"
        "}\n"
        "@keyframes roy-py-blink-caret {\n"
        "  from, to { border-color: transparent; }\n"
        "  50% { border-color: #10b981; }\n"
        "}",
    ))

    # 7. Glitch Text
    effects.append(_effect(
        "Text Glitch",
        "roycss-text-glitch",
        ".roycss-text-glitch {\n"
        "  position: relative;\n"
        "  color: #f0fdf4;\n"
        "  font-weight: 700;\n"
        "  animation: roy-py-glitch-skew 1s infinite linear alternate-reverse;\n"
        "}\n"
        "@keyframes roy-py-glitch-skew {\n"
        "  0% { transform: skew(0deg); }\n"
        "  20% { transform: skew(-2deg); }\n"
        "  40% { transform: skew(0.5deg); }\n"
        "  60% { transform: skew(1deg); }\n"
        "  80% { transform: skew(-0.5deg); }\n"
        "  100% { transform: skew(0deg); }\n"
        "}",
    ))

    # 8. Glitch Text with Clip-Path
    effects.append(_effect(
        "Text Glitch Clip",
        "roycss-text-glitch-clip",
        ".roycss-text-glitch-clip {\n"
        "  position: relative;\n"
        "  color: #f0fdf4;\n"
        "  font-weight: 700;\n"
        "  animation: roy-py-glitch-clip 2s infinite linear;\n"
        "}\n"
        "@keyframes roy-py-glitch-clip {\n"
        "  0% { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 0); }\n"
        "  20% { clip-path: inset(92% 0 1% 0); transform: translate(2px, 0); }\n"
        "  40% { clip-path: inset(43% 0 1% 0); transform: translate(-1px, 0); }\n"
        "  60% { clip-path: inset(25% 0 58% 0); transform: translate(1px, 0); }\n"
        "  80% { clip-path: inset(54% 0 7% 0); transform: translate(-2px, 0); }\n"
        "  100% { clip-path: inset(58% 0 43% 0); transform: translate(0, 0); }\n"
        "}",
    ))

    # 9. Text Stroke Outline
    effects.append(_effect(
        "Text Stroke Outline",
        "roycss-text-stroke-outline",
        ".roycss-text-stroke-outline {\n"
        "  color: transparent;\n"
        "  -webkit-text-stroke: 2px #10b981;\n"
        "  font-weight: 700;\n"
        "}",
    ))

    # 10. Text Stroke Filled
    effects.append(_effect(
        "Text Stroke Filled",
        "roycss-text-stroke-filled",
        ".roycss-text-stroke-filled {\n"
        "  color: #0f172a;\n"
        "  -webkit-text-stroke: 1px #10b981;\n"
        "  font-weight: 700;\n"
        "}",
    ))

    # 11. Text Stroke Gradient
    effects.append(_effect(
        "Text Stroke Gradient",
        "roycss-text-stroke-gradient",
        ".roycss-text-stroke-gradient {\n"
        "  color: transparent;\n"
        "  background: linear-gradient(135deg, #10b981, #06b6d4);\n"
        "  -webkit-background-clip: text;\n"
        "  background-clip: text;\n"
        "  -webkit-text-fill-color: transparent;\n"
        "  -webkit-text-stroke: 2px transparent;\n"
        "  font-weight: 800;\n"
        "}",
    ))

    # 12. Marquee Scrolling Text
    effects.append(_effect(
        "Text Marquee Scroll",
        "roycss-text-marquee",
        ".roycss-text-marquee {\n"
        "  overflow: hidden;\n"
        "  white-space: nowrap;\n"
        "  animation: roy-py-marquee 10s linear infinite;\n"
        "}\n"
        "@keyframes roy-py-marquee {\n"
        "  0% { transform: translateX(100%); }\n"
        "  100% { transform: translateX(-100%); }\n"
        "}",
    ))

    # 13. Underline Slide Animation
    effects.append(_effect(
        "Text Underline Slide",
        "roycss-text-underline-slide",
        ".roycss-text-underline-slide {\n"
        "  display: inline-block;\n"
        "  position: relative;\n"
        "  color: #f0fdf4;\n"
        "  font-weight: 600;\n"
        "}\n"
        ".roycss-text-underline-slide::after {\n"
        "  content: '';\n"
        "  position: absolute;\n"
        "  bottom: -2px;\n"
        "  left: 0;\n"
        "  width: 100%;\n"
        "  height: 2px;\n"
        "  background: linear-gradient(90deg, #10b981, #06b6d4);\n"
        "  transform: scaleX(0);\n"
        "  transform-origin: left;\n"
        "  transition: transform 0.4s ease;\n"
        "}\n"
        ".roycss-text-underline-slide:hover::after {\n"
        "  transform: scaleX(1);\n"
        "}",
    ))

    # 14. Underline Animated Gradient
    effects.append(_effect(
        "Text Underline Animated",
        "roycss-text-underline-animated",
        ".roycss-text-underline-animated {\n"
        "  display: inline-block;\n"
        "  position: relative;\n"
        "  color: #f0fdf4;\n"
        "  font-weight: 600;\n"
        "}\n"
        ".roycss-text-underline-animated::after {\n"
        "  content: '';\n"
        "  position: absolute;\n"
        "  bottom: -2px;\n"
        "  left: 0;\n"
        "  width: 100%;\n"
        "  height: 2px;\n"
        "  background: linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6);\n"
        "  background-size: 200% 100%;\n"
        "  animation: roy-py-underline-anim 2s linear infinite;\n"
        "}\n"
        "@keyframes roy-py-underline-anim {\n"
        "  0% { background-position: 0% 50%; }\n"
        "  100% { background-position: 200% 50%; }\n"
        "}",
    ))

    return effects


if __name__ == "__main__":
    json.dump(generate_all(), sys.stdout, indent=2, ensure_ascii=False)
    print()  # trailing newline
