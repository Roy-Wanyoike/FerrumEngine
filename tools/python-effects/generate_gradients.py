"""
FerrumEngine Python Effect Generator — Gradients

Generates 16 gradient-based CSS effects for the FerrumEngine ecosystem.
Includes linear, radial, conic, mesh gradient compositions, and animated
gradient backgrounds using @keyframes.

Usage:
    python3 generate_gradients.py          # Output JSON array to stdout
    python3 generate_gradients.py > gradients.json
    from generate_gradients import generate_all
"""

import json
import sys


def _effect(name: str, class_name: str, css: str) -> dict:
    return {
        "name": name,
        "className": class_name,
        "category": "gradient",
        "displayType": "bg",
        "css": css,
    }


def generate_all() -> list[dict]:
    effects = []

    # 1. Sunset Linear Gradient
    effects.append(_effect(
        "Gradient Sunset Linear",
        "roycss-gradient-sunset-linear",
        ".roycss-gradient-sunset-linear {\n"
        "  background: linear-gradient(135deg, #f97316 0%, #ec4899 50%, #8b5cf6 100%);\n"
        "}",
    ))

    # 2. Ocean Linear Gradient
    effects.append(_effect(
        "Gradient Ocean Linear",
        "roycss-gradient-ocean-linear",
        ".roycss-gradient-ocean-linear {\n"
        "  background: linear-gradient(180deg, #0ea5e9 0%, #06b6d4 30%, #10b981 70%, #059669 100%);\n"
        "}",
    ))

    # 3. Midnight Linear Gradient
    effects.append(_effect(
        "Gradient Midnight Linear",
        "roycss-gradient-midnight-linear",
        ".roycss-gradient-midnight-linear {\n"
        "  background: linear-gradient(160deg, #0f172a 0%, #1e1b4b 40%, #312e81 70%, #1e1b4b 100%);\n"
        "}",
    ))

    # 4. Warm Ember Linear Gradient
    effects.append(_effect(
        "Gradient Warm Ember Linear",
        "roycss-gradient-warm-ember-linear",
        ".roycss-gradient-warm-ember-linear {\n"
        "  background: linear-gradient(to right, #7c2d12, #c2410c, #ea580c, #f97316, #fbbf24);\n"
        "}",
    ))

    # 5. Radial Center Glow
    effects.append(_effect(
        "Gradient Radial Center Glow",
        "roycss-gradient-radial-center-glow",
        ".roycss-gradient-radial-center-glow {\n"
        "  background: radial-gradient(circle at 50% 50%, #10b981 0%, #064e3b 50%, #0f172a 100%);\n"
        "}",
    ))

    # 6. Radial Off-Center Spotlight
    effects.append(_effect(
        "Gradient Radial Off-Center Spotlight",
        "roycss-gradient-radial-off-center",
        ".roycss-gradient-radial-off-center {\n"
        "  background: radial-gradient(ellipse at 20% 80%, #fbbf24 0%, rgba(251, 191, 36, 0.3) 40%, #0f172a 70%);\n"
        "}",
    ))

    # 7. Radial Multi-Stop Bloom
    effects.append(_effect(
        "Gradient Radial Multi-Stop Bloom",
        "roycss-gradient-radial-bloom",
        ".roycss-gradient-radial-bloom {\n"
        "  background: radial-gradient(circle at 50% 0%, #ec4899 0%, #8b5cf6 25%, #3b82f6 50%, #0ea5e9 75%, #0f172a 100%);\n"
        "}",
    ))

    # 8. Conic Rainbow Wheel
    effects.append(_effect(
        "Gradient Conic Rainbow",
        "roycss-gradient-conic-rainbow",
        ".roycss-gradient-conic-rainbow {\n"
        "  background: conic-gradient(from 0deg, #ef4444, #f97316, #eab308, #22c55e, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #ef4444);\n"
        "}",
    ))

    # 9. Conic Pastel Pie
    effects.append(_effect(
        "Gradient Conic Pastel",
        "roycss-gradient-conic-pastel",
        ".roycss-gradient-conic-pastel {\n"
        "  background: conic-gradient(from 45deg, #fda4af, #fdba74, #fde047, #86efac, #67e8f9, #a5b4fc, #d8b4fe, #fda4af);\n"
        "}",
    ))

    # 10. Mesh Gradient — Aurora
    effects.append(_effect(
        "Gradient Mesh Aurora",
        "roycss-gradient-mesh-aurora",
        ".roycss-gradient-mesh-aurora {\n"
        "  background-color: #0f172a;\n"
        "  background-image:\n"
        "    radial-gradient(at 20% 30%, rgba(16, 185, 129, 0.5) 0%, transparent 50%),\n"
        "    radial-gradient(at 80% 20%, rgba(139, 92, 246, 0.5) 0%, transparent 50%),\n"
        "    radial-gradient(at 50% 80%, rgba(6, 182, 212, 0.4) 0%, transparent 50%),\n"
        "    radial-gradient(at 10% 90%, rgba(236, 72, 153, 0.3) 0%, transparent 40%);\n"
        "}",
    ))

    # 11. Mesh Gradient — Sunset Haze
    effects.append(_effect(
        "Gradient Mesh Sunset Haze",
        "roycss-gradient-mesh-sunset",
        ".roycss-gradient-mesh-sunset {\n"
        "  background-color: #1c1917;\n"
        "  background-image:\n"
        "    radial-gradient(at 10% 40%, rgba(249, 115, 22, 0.6) 0%, transparent 50%),\n"
        "    radial-gradient(at 90% 30%, rgba(236, 72, 153, 0.5) 0%, transparent 50%),\n"
        "    radial-gradient(at 40% 90%, rgba(251, 191, 36, 0.4) 0%, transparent 45%),\n"
        "    radial-gradient(at 70% 70%, rgba(220, 38, 38, 0.3) 0%, transparent 40%);\n"
        "}",
    ))

    # 12. Mesh Gradient — Ocean Depths
    effects.append(_effect(
        "Gradient Mesh Ocean",
        "roycss-gradient-mesh-ocean",
        ".roycss-gradient-mesh-ocean {\n"
        "  background-color: #0c1222;\n"
        "  background-image:\n"
        "    radial-gradient(at 30% 20%, rgba(14, 165, 233, 0.6) 0%, transparent 50%),\n"
        "    radial-gradient(at 70% 60%, rgba(6, 182, 212, 0.5) 0%, transparent 45%),\n"
        "    radial-gradient(at 20% 80%, rgba(16, 185, 129, 0.4) 0%, transparent 50%),\n"
        "    radial-gradient(at 85% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 40%);\n"
        "}",
    ))

    # 13. Animated Shifting Gradient
    effects.append(_effect(
        "Gradient Animated Shift",
        "roycss-gradient-animated-shift",
        ".roycss-gradient-animated-shift {\n"
        "  background: linear-gradient(-45deg, #10b981, #06b6d4, #8b5cf6, #ec4899);\n"
        "  background-size: 400% 400%;\n"
        "  animation: roy-py-gradient-shift 6s ease infinite;\n"
        "}\n"
        "@keyframes roy-py-gradient-shift {\n"
        "  0% { background-position: 0% 50%; }\n"
        "  50% { background-position: 100% 50%; }\n"
        "  100% { background-position: 0% 50%; }\n"
        "}",
    ))

    # 14. Animated Gradient Rotation (via hue-rotate)
    effects.append(_effect(
        "Gradient Animated Hue Rotate",
        "roycss-gradient-animated-hue",
        ".roycss-gradient-animated-hue {\n"
        "  background: conic-gradient(from 0deg at 50% 50%, #10b981, #06b6d4, #8b5cf6, #ec4899, #f59e0b, #10b981);\n"
        "  animation: roy-py-hue-rotate 6s linear infinite;\n"
        "}\n"
        "@keyframes roy-py-hue-rotate {\n"
        "  to { filter: hue-rotate(360deg); }\n"
        "}",
    ))

    # 15. Animated Gradient Pulse
    effects.append(_effect(
        "Gradient Animated Pulse",
        "roycss-gradient-animated-pulse",
        ".roycss-gradient-animated-pulse {\n"
        "  background: radial-gradient(circle at 50% 50%, #10b981 0%, #0f172a 70%);\n"
        "  background-size: 100% 100%;\n"
        "  animation: roy-py-gradient-pulse 3s ease-in-out infinite;\n"
        "}\n"
        "@keyframes roy-py-gradient-pulse {\n"
        "  0%, 100% { background-size: 100% 100%; opacity: 1; }\n"
        "  50% { background-size: 150% 150%; opacity: 0.85; }\n"
        "}",
    ))

    # 16. Animated Gradient Sweep
    effects.append(_effect(
        "Gradient Animated Sweep",
        "roycss-gradient-animated-sweep",
        ".roycss-gradient-animated-sweep {\n"
        "  background: linear-gradient(90deg, #0f172a 0%, #10b981 25%, #06b6d4 50%, #10b981 75%, #0f172a 100%);\n"
        "  background-size: 200% 100%;\n"
        "  animation: roy-py-gradient-sweep 3s linear infinite;\n"
        "}\n"
        "@keyframes roy-py-gradient-sweep {\n"
        "  from { background-position: 200% 0; }\n"
        "  to { background-position: -200% 0; }\n"
        "}",
    ))

    return effects


if __name__ == "__main__":
    json.dump(generate_all(), sys.stdout, indent=2, ensure_ascii=False)
    print()  # trailing newline
