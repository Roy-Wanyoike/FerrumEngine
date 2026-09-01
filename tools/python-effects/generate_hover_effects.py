"""
FerrumEngine Python Effect Generator — Hover Effects

Generates 13 hover-based CSS effects for the FerrumEngine ecosystem.
Each effect includes a base state and a :hover state transition.
Covers scale, rotate, shadow, color shift, and border animations.

Usage:
    python3 generate_hover_effects.py          # Output JSON array to stdout
    python3 generate_hover_effects.py > hover_effects.json
    from generate_hover_effects import generate_all
"""

import json
import sys


def _e(name, cls, css):
    return {"name": name, "className": cls, "category": "hover", "displayType": "box", "css": css}


def generate_all():
    return [
        _e("Hover Scale Up", "roycss-hover-scale-up",
          ".roycss-hover-scale-up {\n  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n"
          ".roycss-hover-scale-up:hover {\n  transform: scale(1.08);\n}"),

        _e("Hover Scale Down", "roycss-hover-scale-down",
          ".roycss-hover-scale-down {\n  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n"
          ".roycss-hover-scale-down:hover {\n  transform: scale(0.95);\n}"),

        _e("Hover Rotate", "roycss-hover-rotate",
          ".roycss-hover-rotate {\n  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);\n}\n"
          ".roycss-hover-rotate:hover {\n  transform: rotate(5deg);\n}"),

        _e("Hover Shadow Lift", "roycss-hover-shadow-lift",
          ".roycss-hover-shadow-lift {\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);\n}\n"
          ".roycss-hover-shadow-lift:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);\n}"),

        _e("Hover Glow Shadow", "roycss-hover-glow-shadow",
          ".roycss-hover-glow-shadow {\n  transition: box-shadow 0.3s ease;\n}\n"
          ".roycss-hover-glow-shadow:hover {\n  box-shadow: 0 0 15px rgba(16, 185, 129, 0.5), 0 0 30px rgba(16, 185, 129, 0.2);\n}"),

        _e("Hover Color Shift", "roycss-hover-color-shift",
          ".roycss-hover-color-shift {\n  background: linear-gradient(135deg, #10b981, #059669);\n  transition: background 0.4s ease;\n}\n"
          ".roycss-hover-color-shift:hover {\n  background: linear-gradient(135deg, #06b6d4, #3b82f6);\n}"),

        _e("Hover Border Color", "roycss-hover-border-color",
          ".roycss-hover-border-color {\n  border: 2px solid #334155;\n  transition: border-color 0.3s ease;\n}\n"
          ".roycss-hover-border-color:hover {\n  border-color: #10b981;\n}"),

        _e("Hover Border Expand", "roycss-hover-border-expand",
          ".roycss-hover-border-expand {\n  border: 1px solid #334155;\n  transition: border-width 0.3s ease, border-color 0.3s ease;\n}\n"
          ".roycss-hover-border-expand:hover {\n  border-width: 3px;\n  border-color: #10b981;\n}"),

        _e("Hover Underline Draw", "roycss-hover-underline-draw",
          ".roycss-hover-underline-draw {\n  position: relative;\n  display: inline-block;\n}\n"
          ".roycss-hover-underline-draw::after {\n  content: '';\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 0;\n  height: 2px;\n  background: #10b981;\n  transition: width 0.3s ease;\n}\n"
          ".roycss-hover-underline-draw:hover::after {\n  width: 100%;\n}"),

        _e("Hover Background Slide", "roycss-hover-bg-slide",
          ".roycss-hover-bg-slide {\n  position: relative;\n  overflow: hidden;\n  z-index: 1;\n}\n"
          ".roycss-hover-bg-slide::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n  background: #10b981;\n  z-index: -1;\n  transition: left 0.3s ease;\n}\n"
          ".roycss-hover-bg-slide:hover::before {\n  left: 0;\n}"),

        _e("Hover Invert", "roycss-hover-invert",
          ".roycss-hover-invert {\n  transition: filter 0.3s ease;\n}\n"
          ".roycss-hover-invert:hover {\n  filter: invert(1);\n}"),

        _e("Hover Blur Out", "roycss-hover-blur-out",
          ".roycss-hover-blur-out {\n  transition: filter 0.3s ease;\n}\n"
          ".roycss-hover-blur-out:hover {\n  filter: blur(3px);\n}"),

        _e("Hover 3D Tilt", "roycss-hover-3d-tilt",
          ".roycss-hover-3d-tilt {\n  transition: transform 0.4s ease;\n  transform-style: preserve-3d;\n  perspective: 800px;\n}\n"
          ".roycss-hover-3d-tilt:hover {\n  transform: rotateY(8deg) rotateX(3deg);\n}"),
    ]


if __name__ == "__main__":
    json.dump(generate_all(), sys.stdout, indent=2, ensure_ascii=False)
    print()
