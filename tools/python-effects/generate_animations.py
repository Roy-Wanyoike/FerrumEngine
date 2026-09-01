"""
FerrumEngine Python Effect Generator — Animations

Generates 16 animation-based CSS effects for the FerrumEngine ecosystem.
Includes bounce, pulse, shake, spin, fade, slide effects, and complex
multi-step keyframe animations using CSS custom properties for customization.

Usage:
    python3 generate_animations.py          # Output JSON array to stdout
    python3 generate_animations.py > animations.json
    from generate_animations import generate_all
"""

import json
import sys


def _e(name, cls, css):
    return {"name": name, "className": cls, "category": "animation", "displayType": "box", "css": css}


def generate_all():
    return [
        _e("Animation Bounce", "roycss-anim-bounce",
          ".roycss-anim-bounce {\n"
          "  --roy-bounce-height: -20px;\n"
          "  animation: roy-py-bounce 0.6s ease infinite alternate;\n"
          "}\n"
          "@keyframes roy-py-bounce {\n"
          "  from { transform: translateY(0); }\n"
          "  to { transform: translateY(var(--roy-bounce-height, -20px)); }\n"
          "}"),

        _e("Animation Pulse", "roycss-anim-pulse",
          ".roycss-anim-pulse {\n"
          "  --roy-pulse-scale: 1.05;\n"
          "  animation: roy-py-pulse 2s ease-in-out infinite;\n"
          "}\n"
          "@keyframes roy-py-pulse {\n"
          "  0%, 100% { transform: scale(1); }\n"
          "  50% { transform: scale(var(--roy-pulse-scale, 1.05)); }\n"
          "}"),

        _e("Animation Shake", "roycss-anim-shake",
          ".roycss-anim-shake {\n"
          "  --roy-shake-distance: 5px;\n"
          "  animation: roy-py-shake 0.5s ease-in-out infinite;\n"
          "}\n"
          "@keyframes roy-py-shake {\n"
          "  0%, 100% { transform: translateX(0); }\n"
          "  25% { transform: translateX(calc(-1 * var(--roy-shake-distance, 5px))); }\n"
          "  75% { transform: translateX(var(--roy-shake-distance, 5px)); }\n"
          "}"),

        _e("Animation Spin", "roycss-anim-spin",
          ".roycss-anim-spin {\n"
          "  animation: roy-py-spin 1s linear infinite;\n"
          "}\n"
          "@keyframes roy-py-spin {\n"
          "  to { transform: rotate(360deg); }\n"
          "}"),

        _e("Animation Fade In", "roycss-anim-fade-in",
          ".roycss-anim-fade-in {\n"
          "  animation: roy-py-fade-in 1s ease forwards;\n"
          "}\n"
          "@keyframes roy-py-fade-in {\n"
          "  from { opacity: 0; }\n"
          "  to { opacity: 1; }\n"
          "}"),

        _e("Animation Fade Out", "roycss-anim-fade-out",
          ".roycss-anim-fade-out {\n"
          "  animation: roy-py-fade-out 1s ease forwards;\n"
          "}\n"
          "@keyframes roy-py-fade-out {\n"
          "  from { opacity: 1; }\n"
          "  to { opacity: 0; }\n"
          "}"),

        _e("Animation Slide Up", "roycss-anim-slide-up",
          ".roycss-anim-slide-up {\n"
          "  --roy-slide-distance: 40px;\n"
          "  animation: roy-py-slide-up 0.6s ease-out forwards;\n"
          "}\n"
          "@keyframes roy-py-slide-up {\n"
          "  from { transform: translateY(var(--roy-slide-distance, 40px)); opacity: 0; }\n"
          "  to { transform: translateY(0); opacity: 1; }\n"
          "}"),

        _e("Animation Slide Down", "roycss-anim-slide-down",
          ".roycss-anim-slide-down {\n"
          "  --roy-slide-distance: 40px;\n"
          "  animation: roy-py-slide-down 0.6s ease-out forwards;\n"
          "}\n"
          "@keyframes roy-py-slide-down {\n"
          "  from { transform: translateY(calc(-1 * var(--roy-slide-distance, 40px))); opacity: 0; }\n"
          "  to { transform: translateY(0); opacity: 1; }\n"
          "}"),

        _e("Animation Slide Left", "roycss-anim-slide-left",
          ".roycss-anim-slide-left {\n"
          "  --roy-slide-distance: 40px;\n"
          "  animation: roy-py-slide-left 0.6s ease-out forwards;\n"
          "}\n"
          "@keyframes roy-py-slide-left {\n"
          "  from { transform: translateX(calc(-1 * var(--roy-slide-distance, 40px))); opacity: 0; }\n"
          "  to { transform: translateX(0); opacity: 1; }\n"
          "}"),

        _e("Animation Slide Right", "roycss-anim-slide-right",
          ".roycss-anim-slide-right {\n"
          "  --roy-slide-distance: 40px;\n"
          "  animation: roy-py-slide-right 0.6s ease-out forwards;\n"
          "}\n"
          "@keyframes roy-py-slide-right {\n"
          "  from { transform: translateX(var(--roy-slide-distance, 40px)); opacity: 0; }\n"
          "  to { transform: translateX(0); opacity: 1; }\n"
          "}"),

        _e("Animation Wiggle", "roycss-anim-wiggle",
          ".roycss-anim-wiggle {\n"
          "  --roy-wiggle-deg: 3deg;\n"
          "  animation: roy-py-wiggle 0.8s ease-in-out infinite;\n"
          "}\n"
          "@keyframes roy-py-wiggle {\n"
          "  0%, 100% { transform: rotate(0deg); }\n"
          "  15% { transform: rotate(var(--roy-wiggle-deg, 3deg)); }\n"
          "  30% { transform: rotate(calc(-1 * var(--roy-wiggle-deg, 3deg))); }\n"
          "  45% { transform: rotate(var(--roy-wiggle-deg, 3deg)); }\n"
          "  60% { transform: rotate(calc(-1 * var(--roy-wiggle-deg, 3deg))); }\n"
          "  75% { transform: rotate(0deg); }\n"
          "}"),

        _e("Animation Heartbeat", "roycss-anim-heartbeat",
          ".roycss-anim-heartbeat {\n"
          "  animation: roy-py-heartbeat 1.5s ease-in-out infinite;\n"
          "}\n"
          "@keyframes roy-py-heartbeat {\n"
          "  0%, 100% { transform: scale(1); }\n"
          "  14% { transform: scale(1.15); }\n"
          "  28% { transform: scale(1); }\n"
          "  42% { transform: scale(1.15); }\n"
          "  70% { transform: scale(1); }\n"
          "}"),

        _e("Animation Float", "roycss-anim-float",
          ".roycss-anim-float {\n"
          "  --roy-float-distance: 10px;\n"
          "  animation: roy-py-float 3s ease-in-out infinite;\n"
          "}\n"
          "@keyframes roy-py-float {\n"
          "  0%, 100% { transform: translateY(0); }\n"
          "  50% { transform: translateY(calc(-1 * var(--roy-float-distance, 10px))); }\n"
          "}"),

        _e("Animation Rubber Band", "roycss-anim-rubber-band",
          ".roycss-anim-rubber-band {\n"
          "  animation: roy-py-rubber-band 1s ease infinite;\n"
          "}\n"
          "@keyframes roy-py-rubber-band {\n"
          "  0%, 100% { transform: scaleX(1) scaleY(1); }\n"
          "  30% { transform: scaleX(1.25) scaleY(0.75); }\n"
          "  40% { transform: scaleX(0.75) scaleY(1.25); }\n"
          "  50% { transform: scaleX(1.15) scaleY(0.85); }\n"
          "  65% { transform: scaleX(0.95) scaleY(1.05); }\n"
          "  75% { transform: scaleX(1.05) scaleY(0.95); }\n"
          "}"),

        _e("Animation Jello", "roycss-anim-jello",
          ".roycss-anim-jello {\n"
          "  animation: roy-py-jello 1.5s ease infinite;\n"
          "  transform-origin: center;\n"
          "}\n"
          "@keyframes roy-py-jello {\n"
          "  0%, 100% { transform: skewX(0deg) skewY(0deg); }\n"
          "  15% { transform: skewX(-8deg) skewY(-8deg); }\n"
          "  30% { transform: skewX(5deg) skewY(5deg); }\n"
          "  45% { transform: skewX(-3deg) skewY(-3deg); }\n"
          "  60% { transform: skewX(2deg) skewY(2deg); }\n"
          "  75% { transform: skewX(-1deg) skewY(-1deg); }\n"
          "}"),

        _e("Animation Flip In", "roycss-anim-flip-in",
          ".roycss-anim-flip-in {\n"
          "  animation: roy-py-flip-in 0.8s ease forwards;\n"
          "  backface-visibility: visible;\n"
          "}\n"
          "@keyframes roy-py-flip-in {\n"
          "  from { transform: perspective(400px) rotateY(90deg); opacity: 0; }\n"
          "  40% { transform: perspective(400px) rotateY(-10deg); }\n"
          "  70% { transform: perspective(400px) rotateY(10deg); }\n"
          "  to { transform: perspective(400px) rotateY(0deg); opacity: 1; }\n"
          "}"),
    ]


if __name__ == "__main__":
    json.dump(generate_all(), sys.stdout, indent=2, ensure_ascii=False)
    print()  # trailing newline
