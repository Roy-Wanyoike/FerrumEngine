"""
RoyCSS Effects — Border effects.

Each tuple: (name, className, category, displayType, cssString)
cssString includes the class rule AND @keyframes (if animation-based).
All effects use category="borders" and displayType="box".
"""

border_effects = [
    # ── 1. Animated Dash ──────────────────────────────────────────
    (
        "Animated Dash",
        "rc-border-animated-dash",
        "borders",
        "box",
        (
            ".rc-border-animated-dash {\n"
            "  position: relative;\n"
            "  border: 3px dashed #7c3aed;\n"
            "  background: conic-gradient(from 0deg, transparent 0%, #7c3aed 100%) border-box;\n"
            "  border-image: repeating-linear-gradient(\n"
            "    45deg,\n"
            "    #7c3aed,\n"
            "    #7c3aed 8px,\n"
            "    transparent 8px,\n"
            "    transparent 16px\n"
            "  ) 8;\n"
            "  animation: rcBorderAnimatedDash 1.2s linear infinite;\n"
            "}\n"
            "@keyframes rcBorderAnimatedDash {\n"
            "  to {\n"
            "    border-image-source: repeating-linear-gradient(\n"
            "      45deg,\n"
            "      #a78bfa,\n"
            "      #a78bfa 8px,\n"
            "      transparent 8px,\n"
            "      transparent 16px\n"
            "    );\n"
            "  }\n"
            "}"
        ),
    ),
    # ── 2. Marching Ants ──────────────────────────────────────────
    (
        "Marching Ants",
        "rc-border-marching-ants",
        "borders",
        "box",
        (
            ".rc-border-marching-ants {\n"
            "  position: relative;\n"
            "  background: #0d0d0d;\n"
            "  outline: 1px solid transparent;\n"
            "}\n"
            ".rc-border-marching-ants::before {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  inset: -4px;\n"
            "  border-radius: inherit;\n"
            "  background: repeating-linear-gradient(\n"
            "    90deg,\n"
            "    #0ff 0px,\n"
            "    #0ff 6px,\n"
            "    transparent 6px,\n"
            "    transparent 12px\n"
            "  );\n"
            "  -webkit-mask:\n"
            "    linear-gradient(#fff 0 0) content-box,\n"
            "    linear-gradient(#fff 0 0);\n"
            "  mask:\n"
            "    linear-gradient(#fff 0 0) content-box,\n"
            "    linear-gradient(#fff 0 0);\n"
            "  -webkit-mask-composite: xor;\n"
            "  mask-composite: exclude;\n"
            "  padding: 2px;\n"
            "  animation: rcBorderMarchingAnts 0.6s linear infinite;\n"
            "}\n"
            "@keyframes rcBorderMarchingAnts {\n"
            "  to {\n"
            "    background-position: 12px 0;\n"
            "  }\n"
            "}"
        ),
    ),
    # ── 3. Corner Brackets ────────────────────────────────────────
    (
        "Corner Brackets",
        "rc-border-corner-brackets",
        "borders",
        "box",
        (
            ".rc-border-corner-brackets {\n"
            "  position: relative;\n"
            "  border: none;\n"
            "}\n"
            ".rc-border-corner-brackets::before,\n"
            ".rc-border-corner-brackets::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  width: 24px;\n"
            "  height: 24px;\n"
            "  border-color: #00ff88;\n"
            "  border-style: solid;\n"
            "  transition: all 0.3s ease;\n"
            "}\n"
            ".rc-border-corner-brackets::before {\n"
            "  top: -2px;\n"
            "  left: -2px;\n"
            "  border-width: 3px 0 0 3px;\n"
            "}\n"
            ".rc-border-corner-brackets::after {\n"
            "  bottom: -2px;\n"
            "  right: -2px;\n"
            "  border-width: 0 3px 3px 0;\n"
            "}\n"
            ".rc-border-corner-brackets .rc-corner-tr,\n"
            ".rc-border-corner-brackets .rc-corner-bl {\n"
            "  position: absolute;\n"
            "  width: 24px;\n"
            "  height: 24px;\n"
            "  border-color: #00ff88;\n"
            "  border-style: solid;\n"
            "  pointer-events: none;\n"
            "  transition: all 0.3s ease;\n"
            "}\n"
            ".rc-border-corner-brackets .rc-corner-tr {\n"
            "  top: -2px;\n"
            "  right: -2px;\n"
            "  border-width: 3px 3px 0 0;\n"
            "}\n"
            ".rc-border-corner-brackets .rc-corner-bl {\n"
            "  bottom: -2px;\n"
            "  left: -2px;\n"
            "  border-width: 0 0 3px 3px;\n"
            "}\n"
            "@keyframes rcBorderCornerBrackets {\n"
            "  0%, 100% { width: 24px; height: 24px; }\n"
            "  50% { width: 32px; height: 32px; }\n"
            "}"
        ),
    ),
    # ── 4. Clip-Path Border ───────────────────────────────────────
    (
        "Clip-Path Border",
        "rc-border-clip-path",
        "borders",
        "box",
        (
            ".rc-border-clip-path {\n"
            "  position: relative;\n"
            "  background: #6366f1;\n"
            "  padding: 3px;\n"
            "  border-radius: 12px;\n"
            "  clip-path: polygon(\n"
            "    0% 4%, 4% 0%, calc(100% - 4%) 0%, 100% 4%,\n"
            "    100% calc(100% - 4%), calc(100% - 4%) 100%, 4% 100%, 0% calc(100% - 4%)\n"
            "  );\n"
            "}\n"
            ".rc-border-clip-path > * {\n"
            "  background: #0d0d0d;\n"
            "  border-radius: 9px;\n"
            "  clip-path: polygon(\n"
            "    0% 4%, 4% 0%, calc(100% - 4%) 0%, 100% 4%,\n"
            "    100% calc(100% - 4%), calc(100% - 4%) 100%, 4% 100%, 0% calc(100% - 4%)\n"
            "  );\n"
            "  padding: 16px 24px;\n"
            "}\n"
            "@keyframes rcBorderClipPath {\n"
            "  0%, 100% {\n"
            "    clip-path: polygon(\n"
            "      0% 4%, 4% 0%, calc(100% - 4%) 0%, 100% 4%,\n"
            "      100% calc(100% - 4%), calc(100% - 4%) 100%, 4% 100%, 0% calc(100% - 4%)\n"
            "    );\n"
            "  }\n"
            "  50% {\n"
            "    clip-path: polygon(\n"
            "      0% 8%, 8% 0%, calc(100% - 8%) 0%, 100% 8%,\n"
            "      100% calc(100% - 8%), calc(100% - 8%) 100%, 8% 100%, 0% calc(100% - 8%)\n"
            "    );\n"
            "  }\n"
            "}"
        ),
    ),
    # ── 5. Animated Gradient Border ───────────────────────────────
    (
        "Animated Gradient Border",
        "rc-border-gradient-animated",
        "borders",
        "box",
        (
            ".rc-border-gradient-animated {\n"
            "  position: relative;\n"
            "  z-index: 0;\n"
            "  border: none;\n"
            "  border-radius: 12px;\n"
            "  overflow: hidden;\n"
            "}\n"
            ".rc-border-gradient-animated::before {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  inset: -50%;\n"
            "  background: conic-gradient(\n"
            "    from 0deg,\n"
            "    #7c3aed,\n"
            "    #0ff,\n"
            "    #00ff88,\n"
            "    #f59e0b,\n"
            "    #6366f1,\n"
            "    #7c3aed\n"
            "  );\n"
            "  animation: rcBorderGradientAnimated 3s linear infinite;\n"
            "  z-index: -2;\n"
            "}\n"
            ".rc-border-gradient-animated::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  inset: 3px;\n"
            "  background: #0d0d0d;\n"
            "  border-radius: 9px;\n"
            "  z-index: -1;\n"
            "}\n"
            "@keyframes rcBorderGradientAnimated {\n"
            "  to {\n"
            "    transform: rotate(360deg);\n"
            "  }\n"
            "}"
        ),
    ),
    # ── 6. Neon Pulse Border ──────────────────────────────────────
    (
        "Neon Pulse Border",
        "rc-border-neon-pulse",
        "borders",
        "box",
        (
            ".rc-border-neon-pulse {\n"
            "  position: relative;\n"
            "  border: 2px solid #7c3aed;\n"
            "  border-radius: 8px;\n"
            "  animation: rcBorderNeonPulse 2s ease-in-out infinite;\n"
            "}\n"
            "@keyframes rcBorderNeonPulse {\n"
            "  0%, 100% {\n"
            "    border-color: #7c3aed;\n"
            "    box-shadow:\n"
            "      0 0 5px rgba(124, 58, 237, 0.5),\n"
            "      0 0 10px rgba(124, 58, 237, 0.3),\n"
            "      inset 0 0 5px rgba(124, 58, 237, 0.1);\n"
            "  }\n"
            "  50% {\n"
            "    border-color: #a78bfa;\n"
            "    box-shadow:\n"
            "      0 0 15px rgba(167, 139, 250, 0.8),\n"
            "      0 0 30px rgba(167, 139, 250, 0.4),\n"
            "      0 0 60px rgba(167, 139, 250, 0.2),\n"
            "      inset 0 0 15px rgba(167, 139, 250, 0.15);\n"
            "  }\n"
            "}"
        ),
    ),
    # ── 7. Torn Paper ─────────────────────────────────────────────
    (
        "Torn Paper",
        "rc-border-torn-paper",
        "borders",
        "box",
        (
            ".rc-border-torn-paper {\n"
            "  position: relative;\n"
            "  background: #1a1a2e;\n"
            "  padding: 32px 24px;\n"
            "  clip-path: polygon(\n"
            "    0% 2%, 3% 0%, 7% 3%, 12% 1%, 16% 4%, 20% 0%, 25% 3%,\n"
            "    30% 1%, 34% 2%, 38% 0%, 43% 3%, 48% 1%, 52% 4%, 57% 0%,\n"
            "    62% 2%, 66% 1%, 70% 3%, 75% 0%, 80% 4%, 84% 1%, 88% 3%,\n"
            "    93% 0%, 97% 2%, 100% 1%,\n"
            "    100% 98%, 97% 100%, 93% 97%, 88% 99%, 84% 96%, 80% 100%,\n"
            "    75% 98%, 70% 100%, 66% 97%, 62% 99%, 57% 96%, 52% 100%,\n"
            "    48% 97%, 43% 99%, 38% 96%, 34% 98%, 30% 100%, 25% 97%,\n"
            "    20% 99%, 16% 96%, 12% 100%, 7% 97%, 3% 99%, 0% 98%\n"
            "  );\n"
            "  filter: drop-shadow(0 0 8px rgba(124, 58, 237, 0.3));\n"
            "}\n"
            "@keyframes rcBorderTornPaper {\n"
            "  0%, 100% {\n"
            "    clip-path: polygon(\n"
            "      0% 2%, 3% 0%, 7% 3%, 12% 1%, 16% 4%, 20% 0%, 25% 3%,\n"
            "      30% 1%, 34% 2%, 38% 0%, 43% 3%, 48% 1%, 52% 4%, 57% 0%,\n"
            "      62% 2%, 66% 1%, 70% 3%, 75% 0%, 80% 4%, 84% 1%, 88% 3%,\n"
            "      93% 0%, 97% 2%, 100% 1%,\n"
            "      100% 98%, 97% 100%, 93% 97%, 88% 99%, 84% 96%, 80% 100%,\n"
            "      75% 98%, 70% 100%, 66% 97%, 62% 99%, 57% 96%, 52% 100%,\n"
            "      48% 97%, 43% 99%, 38% 96%, 34% 98%, 30% 100%, 25% 97%,\n"
            "      20% 99%, 16% 96%, 12% 100%, 7% 97%, 3% 99%, 0% 98%\n"
            "    );\n"
            "  }\n"
            "  50% {\n"
            "    clip-path: polygon(\n"
            "      0% 3%, 4% 1%, 8% 0%, 13% 3%, 17% 1%, 22% 4%, 26% 0%,\n"
            "      31% 2%, 35% 0%, 39% 3%, 44% 1%, 49% 0%, 53% 3%, 58% 1%,\n"
            "      63% 0%, 67% 3%, 72% 1%, 76% 0%, 81% 3%, 85% 1%, 89% 0%,\n"
            "      94% 3%, 98% 1%, 100% 0%,\n"
            "      100% 97%, 98% 100%, 94% 98%, 89% 100%, 85% 97%, 81% 100%,\n"
            "      76% 98%, 72% 100%, 67% 97%, 63% 100%, 58% 98%, 53% 100%,\n"
            "      49% 97%, 44% 100%, 39% 98%, 35% 100%, 31% 97%, 26% 100%,\n"
            "      22% 98%, 17% 100%, 13% 97%, 8% 100%, 4% 98%, 0% 100%\n"
            "    );\n"
            "  }\n"
            "}"
        ),
    ),
    # ── 8. Sticker Border ─────────────────────────────────────────
    (
        "Sticker Border",
        "rc-border-sticker",
        "borders",
        "box",
        (
            ".rc-border-sticker {\n"
            "  position: relative;\n"
            "  border: 2px dashed rgba(255, 255, 255, 0.5);\n"
            "  border-radius: 8px;\n"
            "  background: #0d0d0d;\n"
            "  box-shadow:\n"
            "    inset 0 0 0 4px #0d0d0d,\n"
            "    inset 0 0 0 6px rgba(255, 255, 255, 0.15);\n"
            "}\n"
            "@keyframes rcBorderSticker {\n"
            "  0%, 100% {\n"
            "    border-color: rgba(255, 255, 255, 0.5);\n"
            "  }\n"
            "  50% {\n"
            "    border-color: rgba(255, 255, 255, 0.25);\n"
            "  }\n"
            "}"
        ),
    ),
    # ── 9. Ribbon Banner ──────────────────────────────────────────
    (
        "Ribbon Banner",
        "rc-border-ribbon",
        "borders",
        "box",
        (
            ".rc-border-ribbon {\n"
            "  position: relative;\n"
            "  background: linear-gradient(135deg, #7c3aed 0%, #6366f1 100%);\n"
            "  padding: 16px 32px;\n"
            "  box-shadow:\n"
            "    0 4px 6px rgba(124, 58, 237, 0.3),\n"
            "    0 1px 3px rgba(0, 0, 0, 0.2);\n"
            "}\n"
            ".rc-border-ribbon::before,\n"
            ".rc-border-ribbon::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  bottom: -12px;\n"
            "  width: 0;\n"
            "  height: 0;\n"
            "}\n"
            ".rc-border-ribbon::before {\n"
            "  left: 0;\n"
            "  border-left: 16px solid #4c1d95;\n"
            "  border-top: 12px solid transparent;\n"
            "  border-bottom: 12px solid transparent;\n"
            "}\n"
            ".rc-border-ribbon::after {\n"
            "  right: 0;\n"
            "  border-right: 16px solid #4c1d95;\n"
            "  border-top: 12px solid transparent;\n"
            "  border-bottom: 12px solid transparent;\n"
            "}\n"
            "@keyframes rcBorderRibbon {\n"
            "  0%, 100% { box-shadow: 0 4px 6px rgba(124, 58, 237, 0.3); }\n"
            "  50% { box-shadow: 0 6px 16px rgba(124, 58, 237, 0.5); }\n"
            "}"
        ),
    ),
    # ── 10. Pennant Banner ────────────────────────────────────────
    (
        "Pennant Banner",
        "rc-border-pennant",
        "borders",
        "box",
        (
            ".rc-border-pennant {\n"
            "  position: relative;\n"
            "  background: linear-gradient(180deg, #f59e0b 0%, #d97706 100%);\n"
            "  padding: 16px 32px 40px;\n"
            "  border-top-left-radius: 4px;\n"
            "  border-top-right-radius: 4px;\n"
            "  box-shadow: 0 4px 8px rgba(245, 158, 11, 0.3);\n"
            "}\n"
            ".rc-border-pennant::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  bottom: 0;\n"
            "  left: 0;\n"
            "  right: 0;\n"
            "  height: 24px;\n"
            "  background:\n"
            "    linear-gradient(135deg, #d97706 25%, transparent 25%) -24px 0,\n"
            "    linear-gradient(225deg, #d97706 25%, transparent 25%) -24px 0,\n"
            "    linear-gradient(315deg, #d97706 25%, transparent 25%),\n"
            "    linear-gradient(45deg, #d97706 25%, transparent 25%);\n"
            "  background-size: 48px 24px;\n"
            "  background-color: #b45309;\n"
            "}\n"
            "@keyframes rcBorderPennant {\n"
            "  0%, 100% {\n"
            "    box-shadow: 0 4px 8px rgba(245, 158, 11, 0.3);\n"
            "  }\n"
            "  50% {\n"
            "    box-shadow: 0 6px 20px rgba(245, 158, 11, 0.5);\n"
            "  }\n"
            "}"
        ),
    ),
    # ── 11. Decorative Frame ──────────────────────────────────────
    (
        "Decorative Frame",
        "rc-border-decorative-frame",
        "borders",
        "box",
        (
            ".rc-border-decorative-frame {\n"
            "  position: relative;\n"
            "  border: 2px solid #6366f1;\n"
            "  outline: 1px solid rgba(99, 102, 241, 0.4);\n"
            "  outline-offset: 5px;\n"
            "  padding: 24px 32px;\n"
            "}\n"
            ".rc-border-decorative-frame::before,\n"
            ".rc-border-decorative-frame::after {\n"
            "  content: '\\2726';\n"
            "  position: absolute;\n"
            "  color: #a78bfa;\n"
            "  font-size: 14px;\n"
            "  line-height: 1;\n"
            "}\n"
            ".rc-border-decorative-frame::before {\n"
            "  top: -2px;\n"
            "  left: 50%;\n"
            "  transform: translate(-50%, -50%);\n"
            "  background: #0d0d0d;\n"
            "  padding: 0 6px;\n"
            "}\n"
            ".rc-border-decorative-frame::after {\n"
            "  bottom: -2px;\n"
            "  left: 50%;\n"
            "  transform: translate(-50%, 50%);\n"
            "  background: #0d0d0d;\n"
            "  padding: 0 6px;\n"
            "}\n"
            ".rc-border-decorative-frame .rc-ornament-tl,\n"
            ".rc-border-decorative-frame .rc-ornament-tr,\n"
            ".rc-border-decorative-frame .rc-ornament-bl,\n"
            ".rc-border-decorative-frame .rc-ornament-br {\n"
            "  position: absolute;\n"
            "  width: 20px;\n"
            "  height: 20px;\n"
            "  border-color: #a78bfa;\n"
            "  border-style: solid;\n"
            "  pointer-events: none;\n"
            "}\n"
            ".rc-border-decorative-frame .rc-ornament-tl {\n"
            "  top: 8px; left: 8px;\n"
            "  border-width: 2px 0 0 2px;\n"
            "}\n"
            ".rc-border-decorative-frame .rc-ornament-tr {\n"
            "  top: 8px; right: 8px;\n"
            "  border-width: 2px 2px 0 0;\n"
            "}\n"
            ".rc-border-decorative-frame .rc-ornament-bl {\n"
            "  bottom: 8px; left: 8px;\n"
            "  border-width: 0 0 2px 2px;\n"
            "}\n"
            ".rc-border-decorative-frame .rc-ornament-br {\n"
            "  bottom: 8px; right: 8px;\n"
            "  border-width: 0 2px 2px 0;\n"
            "}\n"
            "@keyframes rcBorderDecorativeFrame {\n"
            "  0%, 100% { outline-color: rgba(99, 102, 241, 0.4); }\n"
            "  50% { outline-color: rgba(167, 139, 250, 0.6); }\n"
            "}"
        ),
    ),
    # ── 12. Polaroid Frame ────────────────────────────────────────
    (
        "Polaroid Frame",
        "rc-border-polaroid",
        "borders",
        "box",
        (
            ".rc-border-polaroid {\n"
            "  position: relative;\n"
            "  background: #ffffff;\n"
            "  padding: 16px 16px 56px;\n"
            "  border-radius: 2px;\n"
            "  box-shadow:\n"
            "    0 2px 8px rgba(0, 0, 0, 0.15),\n"
            "    0 4px 16px rgba(0, 0, 0, 0.1);\n"
            "  color: #1a1a2e;\n"
            "  transform: rotate(-1deg);\n"
            "  transition: transform 0.3s ease, box-shadow 0.3s ease;\n"
            "}\n"
            ".rc-border-polaroid::after {\n"
            "  content: attr(data-caption);\n"
            "  position: absolute;\n"
            "  bottom: 12px;\n"
            "  left: 16px;\n"
            "  right: 16px;\n"
            "  font-family: 'Comic Sans MS', 'Chalkboard SE', cursive;\n"
            "  font-size: 14px;\n"
            "  color: #4a4a6a;\n"
            "  text-align: center;\n"
            "}\n"
            "@keyframes rcBorderPolaroid {\n"
            "  0%, 100% { transform: rotate(-1deg); }\n"
            "  50% { transform: rotate(1deg); }\n"
            "}"
        ),
    ),
    # ── 13. Double Glow Ring ──────────────────────────────────────
    (
        "Double Glow Ring",
        "rc-border-double-glow",
        "borders",
        "box",
        (
            ".rc-border-double-glow {\n"
            "  position: relative;\n"
            "  border: 2px solid #0ff;\n"
            "  border-radius: 50%;\n"
            "  outline: 2px solid rgba(0, 255, 255, 0.3);\n"
            "  outline-offset: 8px;\n"
            "  animation: rcBorderDoubleGlow 2.5s ease-in-out infinite;\n"
            "}\n"
            "@keyframes rcBorderDoubleGlow {\n"
            "  0%, 100% {\n"
            "    border-color: #0ff;\n"
            "    outline-color: rgba(0, 255, 255, 0.3);\n"
            "    box-shadow:\n"
            "      0 0 8px rgba(0, 255, 255, 0.4),\n"
            "      0 0 20px rgba(0, 255, 255, 0.2);\n"
            "  }\n"
            "  33% {\n"
            "    border-color: #00ff88;\n"
            "    outline-color: rgba(0, 255, 136, 0.3);\n"
            "    box-shadow:\n"
            "      0 0 8px rgba(0, 255, 136, 0.4),\n"
            "      0 0 20px rgba(0, 255, 136, 0.2);\n"
            "  }\n"
            "  66% {\n"
            "    border-color: #7c3aed;\n"
            "    outline-color: rgba(124, 58, 237, 0.3);\n"
            "    box-shadow:\n"
            "      0 0 8px rgba(124, 58, 237, 0.4),\n"
            "      0 0 20px rgba(124, 58, 237, 0.2);\n"
            "  }\n"
            "}"
        ),
    ),
    # ── 14. Dashed Draw ───────────────────────────────────────────
    (
        "Dashed Draw",
        "rc-border-dashed-draw",
        "borders",
        "box",
        (
            ".rc-border-dashed-draw {\n"
            "  position: relative;\n"
            "  border: 2px dashed transparent;\n"
            "  background:\n"
            "    linear-gradient(#0d0d0d, #0d0d0d) padding-box,\n"
            "    linear-gradient(90deg, #00ff88, #0ff, #7c3aed) border-box;\n"
            "  border-radius: 8px;\n"
            "  background-size: 100% 100%, 200% 100%;\n"
            "  animation: rcBorderDashedDraw 2s ease-in-out infinite;\n"
            "}\n"
            "@keyframes rcBorderDashedDraw {\n"
            "  0% {\n"
            "    background-position: 0 0, 0% 0;\n"
            "  }\n"
            "  100% {\n"
            "    background-position: 0 0, 200% 0;\n"
            "  }\n"
            "}"
        ),
    ),
    # ── 15. Inset Glow ────────────────────────────────────────────
    (
        "Inset Glow",
        "rc-border-inset-glow",
        "borders",
        "box",
        (
            ".rc-border-inset-glow {\n"
            "  position: relative;\n"
            "  border: 1px solid rgba(124, 58, 237, 0.3);\n"
            "  border-radius: 8px;\n"
            "  box-shadow:\n"
            "    inset 0 0 15px rgba(124, 58, 237, 0.15),\n"
            "    inset 0 0 30px rgba(99, 102, 241, 0.08);\n"
            "  animation: rcBorderInsetGlow 3s ease-in-out infinite;\n"
            "}\n"
            "@keyframes rcBorderInsetGlow {\n"
            "  0%, 100% {\n"
            "    border-color: rgba(124, 58, 237, 0.3);\n"
            "    box-shadow:\n"
            "      inset 0 0 15px rgba(124, 58, 237, 0.15),\n"
            "      inset 0 0 30px rgba(99, 102, 241, 0.08);\n"
            "  }\n"
            "  50% {\n"
            "    border-color: rgba(167, 139, 250, 0.5);\n"
            "    box-shadow:\n"
            "      inset 0 0 25px rgba(167, 139, 250, 0.25),\n"
            "      inset 0 0 50px rgba(124, 58, 237, 0.12),\n"
            "      0 0 15px rgba(124, 58, 237, 0.1);\n"
            "  }\n"
            "}"
        ),
    ),
]