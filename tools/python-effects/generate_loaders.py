"""
FerrumEngine Python Effect Generator — Loading Effects

Generates 12 pure CSS loading indicators for the FerrumEngine ecosystem.
Includes spinners, progress bars, pulse dots, and skeleton loading effects.

Usage:
    python3 generate_loaders.py          # Output JSON array to stdout
    python3 generate_loaders.py > loaders.json
    from generate_loaders import generate_all
"""

import json
import sys


def _e(name, cls, css):
    return {"name": name, "className": cls, "category": "loading", "displayType": "loader", "css": css}


def generate_all():
    return [
        _e("Loader Ring Spin", "roycss-loader-ring-spin",
          ".roycss-loader-ring-spin {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  border: 3px solid #1e293b;\n  border-top-color: #10b981;\n  animation: roy-py-ring-spin 0.8s linear infinite;\n}\n"
          "@keyframes roy-py-ring-spin {\n  to { transform: rotate(360deg); }\n}"),

        _e("Loader Dual Ring", "roycss-loader-dual-ring",
          ".roycss-loader-dual-ring {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  border: 3px solid transparent;\n  border-top-color: #10b981;\n  border-bottom-color: #06b6d4;\n  animation: roy-py-dual-ring 1.2s linear infinite;\n}\n"
          "@keyframes roy-py-dual-ring {\n  to { transform: rotate(360deg); }\n}"),

        _e("Loader Bar Progress", "roycss-loader-bar-progress",
          ".roycss-loader-bar-progress {\n  width: 200px;\n  height: 4px;\n  background: #1e293b;\n  border-radius: 2px;\n  overflow: hidden;\n}\n"
          ".roycss-loader-bar-progress::after {\n  content: '';\n  display: block;\n  width: 40%;\n  height: 100%;\n  background: linear-gradient(90deg, #10b981, #06b6d4);\n  border-radius: 2px;\n  animation: roy-py-bar-slide 1.5s ease-in-out infinite;\n}\n"
          "@keyframes roy-py-bar-slide {\n  0% { transform: translateX(-100%); }\n  100% { transform: translateX(350%); }\n}"),

        _e("Loader Pulse Dots", "roycss-loader-pulse-dots",
          ".roycss-loader-pulse-dots {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n"
          ".roycss-loader-pulse-dots::before,\n.roycss-loader-pulse-dots::after {\n  content: '';\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background: #10b981;\n  animation: roy-py-dot-pulse 1.4s ease-in-out infinite;\n}\n"
          ".roycss-loader-pulse-dots::after {\n  animation-delay: 0.2s;\n}\n"
          "@keyframes roy-py-dot-pulse {\n  0%, 80%, 100% { transform: scale(0.4); opacity: 0.4; }\n  40% { transform: scale(1); opacity: 1; }\n}"),

        _e("Loader Three Dots", "roycss-loader-three-dots",
          ".roycss-loader-three-dots {\n  display: flex;\n  gap: 6px;\n  align-items: center;\n}\n"
          ".roycss-loader-three-dots span {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background: #10b981;\n  animation: roy-py-three-dot-bounce 1.4s ease-in-out infinite both;\n}\n"
          ".roycss-loader-three-dots span:nth-child(1) { animation-delay: -0.32s; }\n"
          ".roycss-loader-three-dots span:nth-child(2) { animation-delay: -0.16s; }\n"
          "@keyframes roy-py-three-dot-bounce {\n  0%, 80%, 100% { transform: scale(0); }\n  40% { transform: scale(1); }\n}"),

        _e("Loader Skeleton", "roycss-loader-skeleton",
          ".roycss-loader-skeleton {\n  background: linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%);\n  background-size: 200% 100%;\n  animation: roy-py-skeleton-shimmer 1.5s ease infinite;\n  border-radius: 4px;\n}\n"
          "@keyframes roy-py-skeleton-shimmer {\n  0% { background-position: 200% 0; }\n  100% { background-position: -200% 0; }\n}"),

        _e("Loader Spinner Dots", "roycss-loader-spinner-dots",
          ".roycss-loader-spinner-dots {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  position: relative;\n  animation: roy-py-spinner-dots-rotate 2s linear infinite;\n}\n"
          ".roycss-loader-spinner-dots::before,\n.roycss-loader-spinner-dots::after {\n  content: '';\n  position: absolute;\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: #10b981;\n}\n"
          ".roycss-loader-spinner-dots::before { top: 0; left: 50%; transform: translateX(-50%); }\n"
          ".roycss-loader-spinner-dots::after { bottom: 0; left: 50%; transform: translateX(-50%); background: #06b6d4; }\n"
          "@keyframes roy-py-spinner-dots-rotate {\n  to { transform: rotate(360deg); }\n}"),

        _e("Loader Square Spin", "roycss-loader-square-spin",
          ".roycss-loader-square-spin {\n  width: 30px;\n  height: 30px;\n  background: #10b981;\n  animation: roy-py-square-spin 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;\n}\n"
          "@keyframes roy-py-square-spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}"),

        _e("Loader Circle Bars", "roycss-loader-circle-bars",
          ".roycss-loader-circle-bars {\n  width: 40px;\n  height: 40px;\n  position: relative;\n}\n"
          ".roycss-loader-circle-bars::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  border-radius: 50%;\n  border: 3px solid transparent;\n  border-top-color: #10b981;\n  border-right-color: #06b6d4;\n  animation: roy-py-circle-bars 0.8s linear infinite;\n}\n"
          "@keyframes roy-py-circle-bars {\n  to { transform: rotate(360deg); }\n}"),

        _e("Loader Pulse Ring", "roycss-loader-pulse-ring",
          ".roycss-loader-pulse-ring {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  border: 2px solid #10b981;\n  animation: roy-py-pulse-ring 1.5s ease-out infinite;\n}\n"
          "@keyframes roy-py-pulse-ring {\n  0% { transform: scale(0.8); opacity: 1; }\n  100% { transform: scale(1.4); opacity: 0; }\n}"),

        _e("Loader Horizontal Bars", "roycss-loader-hbars",
          ".roycss-loader-hbars {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  width: 40px;\n}\n"
          ".roycss-loader-hbars span {\n  height: 4px;\n  border-radius: 2px;\n  background: #10b981;\n  animation: roy-py-hbar-stretch 1.2s ease-in-out infinite;\n}\n"
          ".roycss-loader-hbars span:nth-child(1) { animation-delay: 0s; }\n"
          ".roycss-loader-hbars span:nth-child(2) { animation-delay: 0.15s; }\n"
          ".roycss-loader-hbars span:nth-child(3) { animation-delay: 0.3s; }\n"
          ".roycss-loader-hbars span:nth-child(4) { animation-delay: 0.45s; }\n"
          "@keyframes roy-py-hbar-stretch {\n  0%, 100% { width: 100%; opacity: 0.5; }\n  50% { width: 40%; opacity: 1; }\n}"),

        _e("Loader Ellipsis", "roycss-loader-ellipsis",
          ".roycss-loader-ellipsis {\n  display: inline-flex;\n  gap: 4px;\n}\n"
          ".roycss-loader-ellipsis span {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #10b981;\n  animation: roy-py-ellipsis-bounce 1.4s ease-in-out infinite both;\n}\n"
          ".roycss-loader-ellipsis span:nth-child(1) { animation-delay: -0.32s; }\n"
          ".roycss-loader-ellipsis span:nth-child(2) { animation-delay: -0.16s; }\n"
          "@keyframes roy-py-ellipsis-bounce {\n  0%, 80%, 100% { transform: scale(0); }\n  40% { transform: scale(1); }\n}"),
    ]


if __name__ == "__main__":
    json.dump(generate_all(), sys.stdout, indent=2, ensure_ascii=False)
    print()
