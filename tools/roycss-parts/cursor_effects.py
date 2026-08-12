"""
RoyCSS Effects — Cursor effects.

Each tuple: (name, className, category, displayType, cssString)
cssString includes the class rule AND @keyframes (if animation-based).
Keyframe names follow camelCase of the className (e.g. rc-cursor-glow-dot -> rcCursorGlowDot).
"""

cursor_effects = [
    # 1 ── Cursor Glow Dot ─────────────────────────────────────────
    (
        "Cursor Glow Dot",
        "rc-cursor-glow-dot",
        "cursor",
        "box",
        (
            ".rc-cursor-glow-dot {\n"
            "  width: 12px;\n"
            "  height: 12px;\n"
            "  border-radius: 50%;\n"
            "  background: #7c3aed;\n"
            "  box-shadow: 0 0 8px #7c3aed, 0 0 20px rgba(124, 58, 237, 0.5), 0 0 40px rgba(124, 58, 237, 0.25);\n"
            "  animation: rcCursorGlowDot 2s ease-in-out infinite;\n"
            "}\n"
            "@keyframes rcCursorGlowDot {\n"
            "  0%, 100% {\n"
            "    transform: scale(1);\n"
            "    box-shadow: 0 0 8px #7c3aed, 0 0 20px rgba(124, 58, 237, 0.5), 0 0 40px rgba(124, 58, 237, 0.25);\n"
            "    opacity: 1;\n"
            "  }\n"
            "  50% {\n"
            "    transform: scale(1.35);\n"
            "    box-shadow: 0 0 14px #a78bfa, 0 0 35px rgba(167, 139, 250, 0.6), 0 0 60px rgba(124, 58, 237, 0.35);\n"
            "    opacity: 0.85;\n"
            "  }\n"
            "}"
        ),
    ),
    # 2 ── Cursor Trail ────────────────────────────────────────────
    (
        "Cursor Trail",
        "rc-cursor-trail",
        "cursor",
        "box",
        (
            ".rc-cursor-trail {\n"
            "  width: 10px;\n"
            "  height: 10px;\n"
            "  border-radius: 50%;\n"
            "  background: #6366f1;\n"
            "  position: relative;\n"
            "  animation: rcCursorTrail 1.6s ease-in-out infinite;\n"
            "}\n"
            ".rc-cursor-trail::before,\n"
            ".rc-cursor-trail::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  border-radius: 50%;\n"
            "  background: #a78bfa;\n"
            "}\n"
            ".rc-cursor-trail::before {\n"
            "  width: 8px;\n"
            "  height: 8px;\n"
            "  top: 4px;\n"
            "  left: 4px;\n"
            "  opacity: 0.6;\n"
            "  animation: rcCursorTrailBefore 1.6s ease-in-out infinite 0.15s;\n"
            "}\n"
            ".rc-cursor-trail::after {\n"
            "  width: 6px;\n"
            "  height: 6px;\n"
            "  top: 10px;\n"
            "  left: 10px;\n"
            "  opacity: 0.3;\n"
            "  animation: rcCursorTrailAfter 1.6s ease-in-out infinite 0.3s;\n"
            "}\n"
            "@keyframes rcCursorTrail {\n"
            "  0%, 100% { transform: translate(0, 0) scale(1); opacity: 1; }\n"
            "  25% { transform: translate(4px, -2px) scale(1); }\n"
            "  50% { transform: translate(8px, 2px) scale(0.95); opacity: 0.85; }\n"
            "  75% { transform: translate(4px, 6px) scale(1.05); }\n"
            "}\n"
            "@keyframes rcCursorTrailBefore {\n"
            "  0%, 100% { transform: translate(0, 0); opacity: 0.6; }\n"
            "  50% { transform: translate(6px, 3px); opacity: 0.25; }\n"
            "}\n"
            "@keyframes rcCursorTrailAfter {\n"
            "  0%, 100% { transform: translate(0, 0); opacity: 0.3; }\n"
            "  50% { transform: translate(10px, 5px); opacity: 0.1; }\n"
            "}"
        ),
    ),
    # 3 ── Cursor Blob ─────────────────────────────────────────────
    (
        "Cursor Blob",
        "rc-cursor-blob",
        "cursor",
        "box",
        (
            ".rc-cursor-blob {\n"
            "  width: 48px;\n"
            "  height: 48px;\n"
            "  background: linear-gradient(135deg, #7c3aed, #6366f1);\n"
            "  animation: rcCursorBlob 4s ease-in-out infinite;\n"
            "  filter: blur(1px);\n"
            "  opacity: 0.85;\n"
            "}\n"
            "@keyframes rcCursorBlob {\n"
            "  0%   { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: rotate(0deg) scale(1); }\n"
            "  25%  { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: rotate(90deg) scale(1.08); }\n"
            "  50%  { border-radius: 50% 60% 30% 40% / 30% 50% 70% 60%; transform: rotate(180deg) scale(0.95); }\n"
            "  75%  { border-radius: 40% 30% 60% 50% / 60% 40% 50% 70%; transform: rotate(270deg) scale(1.05); }\n"
            "  100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: rotate(360deg) scale(1); }\n"
            "}"
        ),
    ),
    # 4 ── Cursor Ring ─────────────────────────────────────────────
    (
        "Cursor Ring",
        "rc-cursor-ring",
        "cursor",
        "box",
        (
            ".rc-cursor-ring {\n"
            "  width: 32px;\n"
            "  height: 32px;\n"
            "  border-radius: 50%;\n"
            "  border: 2px solid #a78bfa;\n"
            "  background: transparent;\n"
            "  animation: rcCursorRing 2s ease-in-out infinite;\n"
            "}\n"
            "@keyframes rcCursorRing {\n"
            "  0%, 100% {\n"
            "    transform: scale(1);\n"
            "    border-color: #a78bfa;\n"
            "    box-shadow: 0 0 0 0 rgba(167, 139, 250, 0.4);\n"
            "  }\n"
            "  50% {\n"
            "    transform: scale(1.3);\n"
            "    border-color: #7c3aed;\n"
            "    box-shadow: 0 0 12px 4px rgba(124, 58, 237, 0.2);\n"
            "  }\n"
            "}"
        ),
    ),
    # 5 ── Cursor Ripple ───────────────────────────────────────────
    (
        "Cursor Ripple",
        "rc-cursor-ripple",
        "cursor",
        "box",
        (
            ".rc-cursor-ripple {\n"
            "  width: 20px;\n"
            "  height: 20px;\n"
            "  border-radius: 50%;\n"
            "  background: rgba(99, 102, 241, 0.25);\n"
            "  position: relative;\n"
            "  animation: rcCursorRippleCore 3s ease-out infinite;\n"
            "}\n"
            ".rc-cursor-ripple::before,\n"
            ".rc-cursor-ripple::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  top: 50%;\n"
            "  left: 50%;\n"
            "  width: 100%;\n"
            "  height: 100%;\n"
            "  border-radius: 50%;\n"
            "  border: 2px solid #6366f1;\n"
            "  transform: translate(-50%, -50%) scale(1);\n"
            "  opacity: 1;\n"
            "}\n"
            ".rc-cursor-ripple::before {\n"
            "  animation: rcCursorRippleExpand 2.4s ease-out infinite;\n"
            "}\n"
            ".rc-cursor-ripple::after {\n"
            "  animation: rcCursorRippleExpand 2.4s ease-out infinite 0.8s;\n"
            "}\n"
            "@keyframes rcCursorRippleCore {\n"
            "  0%, 100% { background: rgba(99, 102, 241, 0.25); }\n"
            "  50% { background: rgba(124, 58, 237, 0.35); }\n"
            "}\n"
            "@keyframes rcCursorRippleExpand {\n"
            "  0% {\n"
            "    transform: translate(-50%, -50%) scale(1);\n"
            "    opacity: 0.8;\n"
            "    border-color: #6366f1;\n"
            "  }\n"
            "  100% {\n"
            "    transform: translate(-50%, -50%) scale(3.5);\n"
            "    opacity: 0;\n"
            "    border-color: #a78bfa;\n"
            "  }\n"
            "}"
        ),
    ),
    # 6 ── Cursor Spotlight ────────────────────────────────────────
    (
        "Cursor Spotlight",
        "rc-cursor-spotlight",
        "cursor",
        "box",
        (
            ".rc-cursor-spotlight {\n"
            "  width: 80px;\n"
            "  height: 80px;\n"
            "  border-radius: 50%;\n"
            "  background: radial-gradient(circle, rgba(124, 58, 237, 0.45) 0%, rgba(99, 102, 241, 0.15) 45%, transparent 70%);\n"
            "  animation: rcCursorSpotlight 2.5s ease-in-out infinite;\n"
            "  filter: blur(2px);\n"
            "}\n"
            "@keyframes rcCursorSpotlight {\n"
            "  0%, 100% {\n"
            "    transform: scale(1) translate(0, 0);\n"
            "    background: radial-gradient(circle, rgba(124, 58, 237, 0.45) 0%, rgba(99, 102, 241, 0.15) 45%, transparent 70%);\n"
            "  }\n"
            "  33% {\n"
            "    transform: scale(1.15) translate(3px, -2px);\n"
            "    background: radial-gradient(circle, rgba(167, 139, 250, 0.5) 0%, rgba(124, 58, 237, 0.2) 45%, transparent 70%);\n"
            "  }\n"
            "  66% {\n"
            "    transform: scale(0.9) translate(-3px, 2px);\n"
            "    background: radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(0, 255, 136, 0.1) 45%, transparent 70%);\n"
            "  }\n"
            "}"
        ),
    ),
    # 7 ── Cursor Magnetic ─────────────────────────────────────────
    (
        "Cursor Magnetic",
        "rc-cursor-magnetic",
        "cursor",
        "box",
        (
            ".rc-cursor-magnetic {\n"
            "  width: 40px;\n"
            "  height: 40px;\n"
            "  border-radius: 50%;\n"
            "  background: linear-gradient(135deg, #7c3aed, #6366f1);\n"
            "  transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.35s ease;\n"
            "  box-shadow: 0 0 10px rgba(124, 58, 237, 0.3);\n"
            "  cursor: pointer;\n"
            "}\n"
            ".rc-cursor-magnetic:hover {\n"
            "  transform: scale(1.25) translate(4px, -3px);\n"
            "  box-shadow: 0 0 20px rgba(124, 58, 237, 0.6), 0 0 40px rgba(99, 102, 241, 0.3), 0 8px 24px rgba(0, 0, 0, 0.15);\n"
            "}"
        ),
    ),
    # 8 ── Cursor Crosshair ────────────────────────────────────────
    (
        "Cursor Crosshair",
        "rc-cursor-crosshair",
        "cursor",
        "box",
        (
            ".rc-cursor-crosshair {\n"
            "  width: 36px;\n"
            "  height: 36px;\n"
            "  position: relative;\n"
            "  background: transparent;\n"
            "}\n"
            ".rc-cursor-crosshair::before {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  top: 50%;\n"
            "  left: 0;\n"
            "  right: 0;\n"
            "  height: 2px;\n"
            "  background: linear-gradient(90deg, transparent 0%, #0ff 30%, #0ff 70%, transparent 100%);\n"
            "  transform: translateY(-50%) scaleX(0);\n"
            "  animation: rcCursorCrosshairH 2.5s ease-in-out infinite;\n"
            "  border-radius: 1px;\n"
            "  box-shadow: 0 0 6px rgba(0, 255, 255, 0.5);\n"
            "}\n"
            ".rc-cursor-crosshair::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  left: 50%;\n"
            "  top: 0;\n"
            "  bottom: 0;\n"
            "  width: 2px;\n"
            "  background: linear-gradient(180deg, transparent 0%, #0ff 30%, #0ff 70%, transparent 100%);\n"
            "  transform: translateX(-50%) scaleY(0);\n"
            "  animation: rcCursorCrosshairV 2.5s ease-in-out infinite;\n"
            "  border-radius: 1px;\n"
            "  box-shadow: 0 0 6px rgba(0, 255, 255, 0.5);\n"
            "}\n"
            "@keyframes rcCursorCrosshairH {\n"
            "  0%, 100% { transform: translateY(-50%) scaleX(0); }\n"
            "  30%, 70% { transform: translateY(-50%) scaleX(1); }\n"
            "  50% { transform: translateY(-50%) scaleX(1); }\n"
            "}\n"
            "@keyframes rcCursorCrosshairV {\n"
            "  0%, 100% { transform: translateX(-50%) scaleY(0); }\n"
            "  30%, 70% { transform: translateX(-50%) scaleY(1); }\n"
            "  50% { transform: translateX(-50%) scaleY(1); }\n"
            "}"
        ),
    ),
    # 9 ── Cursor Arrow Bounce ─────────────────────────────────────
    (
        "Cursor Arrow Bounce",
        "rc-cursor-arrow-bounce",
        "cursor",
        "box",
        (
            ".rc-cursor-arrow-bounce {\n"
            "  width: 24px;\n"
            "  height: 24px;\n"
            "  position: relative;\n"
            "  animation: rcCursorArrowBounce 1.2s ease-in-out infinite;\n"
            "}\n"
            ".rc-cursor-arrow-bounce::before {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  top: 6px;\n"
            "  left: 3px;\n"
            "  width: 14px;\n"
            "  height: 14px;\n"
            "  border-right: 3px solid #00ff88;\n"
            "  border-top: 3px solid #00ff88;\n"
            "  transform: rotate(-45deg);\n"
            "  filter: drop-shadow(0 0 4px rgba(0, 255, 136, 0.6));\n"
            "}\n"
            "@keyframes rcCursorArrowBounce {\n"
            "  0%, 100% { transform: translateY(0); }\n"
            "  40% { transform: translateY(-8px); }\n"
            "  60% { transform: translateY(-4px); }\n"
            "}"
        ),
    ),
    # 10 ── Cursor Pulse Ring ──────────────────────────────────────
    (
        "Cursor Pulse Ring",
        "rc-cursor-pulse-ring",
        "cursor",
        "box",
        (
            ".rc-cursor-pulse-ring {\n"
            "  width: 16px;\n"
            "  height: 16px;\n"
            "  border-radius: 50%;\n"
            "  background: #7c3aed;\n"
            "  position: relative;\n"
            "  box-shadow: 0 0 8px rgba(124, 58, 237, 0.6);\n"
            "}\n"
            ".rc-cursor-pulse-ring::before,\n"
            ".rc-cursor-pulse-ring::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  top: 50%;\n"
            "  left: 50%;\n"
            "  width: 16px;\n"
            "  height: 16px;\n"
            "  border-radius: 50%;\n"
            "  border: 2px solid #a78bfa;\n"
            "  transform: translate(-50%, -50%) scale(1);\n"
            "  opacity: 0;\n"
            "}\n"
            ".rc-cursor-pulse-ring::before {\n"
            "  animation: rcCursorPulseRingOut 2s ease-out infinite;\n"
            "}\n"
            ".rc-cursor-pulse-ring::after {\n"
            "  animation: rcCursorPulseRingOut 2s ease-out infinite 1s;\n"
            "}\n"
            "@keyframes rcCursorPulseRingOut {\n"
            "  0% {\n"
            "    transform: translate(-50%, -50%) scale(1);\n"
            "    opacity: 0.7;\n"
            "  }\n"
            "  100% {\n"
            "    transform: translate(-50%, -50%) scale(3);\n"
            "    opacity: 0;\n"
            "  }\n"
            "}"
        ),
    ),
    # 11 ── Cursor Gradient Trail ──────────────────────────────────
    (
        "Cursor Gradient Trail",
        "rc-cursor-gradient-trail",
        "cursor",
        "box",
        (
            ".rc-cursor-gradient-trail {\n"
            "  width: 60px;\n"
            "  height: 12px;\n"
            "  border-radius: 6px;\n"
            "  background: linear-gradient(90deg, transparent 0%, #7c3aed 20%, #6366f1 50%, #0ff 80%, transparent 100%);\n"
            "  background-size: 200% 100%;\n"
            "  animation: rcCursorGradientTrail 2s linear infinite;\n"
            "  filter: blur(1px);\n"
            "  opacity: 0.9;\n"
            "}\n"
            "@keyframes rcCursorGradientTrail {\n"
            "  0% { background-position: 100% 0; transform: translateX(-10px); }\n"
            "  100% { background-position: -100% 0; transform: translateX(10px); }\n"
            "}"
        ),
    ),
    # 12 ── Cursor Firefly ─────────────────────────────────────────
    (
        "Cursor Firefly",
        "rc-cursor-firefly",
        "cursor",
        "box",
        (
            ".rc-cursor-firefly {\n"
            "  width: 60px;\n"
            "  height: 60px;\n"
            "  position: relative;\n"
            "  background: transparent;\n"
            "}\n"
            ".rc-cursor-firefly::before {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  width: 5px;\n"
            "  height: 5px;\n"
            "  border-radius: 50%;\n"
            "  background: #a78bfa;\n"
            "  top: 12px;\n"
            "  left: 10px;\n"
            "  box-shadow:\n"
            "    18px 28px 0 2px rgba(0, 255, 255, 0.8),\n"
            "    38px 8px 0 1px rgba(124, 58, 237, 0.7),\n"
            "    8px 44px 0 2px rgba(0, 255, 136, 0.75),\n"
            "    32px 40px 0 1px rgba(99, 102, 241, 0.65),\n"
            "    48px 22px 0 2px rgba(167, 139, 250, 0.7);\n"
            "  animation: rcCursorFirefly1 3s ease-in-out infinite;\n"
            "}\n"
            ".rc-cursor-firefly::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  width: 4px;\n"
            "  height: 4px;\n"
            "  border-radius: 50%;\n"
            "  background: #0ff;\n"
            "  top: 28px;\n"
            "  left: 26px;\n"
            "  box-shadow:\n"
            "    -14px -16px 0 1px rgba(124, 58, 237, 0.7),\n"
            "    14px -8px 0 2px rgba(0, 255, 136, 0.6),\n"
            "    -8px 12px 0 1px rgba(167, 139, 250, 0.75),\n"
            "    16px 14px 0 2px rgba(99, 102, 241, 0.65);\n"
            "  animation: rcCursorFirefly2 4.2s ease-in-out infinite;\n"
            "}\n"
            "@keyframes rcCursorFirefly1 {\n"
            "  0%, 100% { transform: translate(0, 0); opacity: 1; }\n"
            "  20% { transform: translate(5px, -6px); opacity: 0.6; }\n"
            "  40% { transform: translate(-4px, 4px); opacity: 1; }\n"
            "  60% { transform: translate(7px, 3px); opacity: 0.5; }\n"
            "  80% { transform: translate(-3px, -5px); opacity: 0.9; }\n"
            "}\n"
            "@keyframes rcCursorFirefly2 {\n"
            "  0%, 100% { transform: translate(0, 0); opacity: 0.8; }\n"
            "  25% { transform: translate(-6px, 5px); opacity: 0.4; }\n"
            "  50% { transform: translate(4px, -3px); opacity: 1; }\n"
            "  75% { transform: translate(-5px, -6px); opacity: 0.55; }\n"
            "}"
        ),
    ),
]