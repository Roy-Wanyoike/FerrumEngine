"""
RoyCSS Effects Part 10: Page Transitions, Accessibility, and Icon Animations

Three categories of CSS effect tuples:
  - page_transition_effects: Full-overlay page transition animations
  - accessibility_effects: Accessibility-focused motion effects respecting prefers-reduced-motion
  - icon_effects: Icon/SVG animation effects

Each tuple: (name, className, category, displayType, cssString)
"""

# ─── CATEGORY 1: Page Transitions (displayType: "box") ────────────────────────

page_transition_effects = [
    (
        "Fade Through",
        "rc-fade-through",
        "page-transition",
        "box",
        (
            ".rc-fade-through {\n"
            "  position: fixed;\n"
            "  inset: 0;\n"
            "  z-index: 9999;\n"
            "  background: #fff;\n"
            "  animation: rcFadeThrough 0.6s ease-in-out;\n"
            "  pointer-events: all;\n"
            "}\n"
            "\n"
            "@keyframes rcFadeThrough {\n"
            "  0% { opacity: 0; }\n"
            "  40% { opacity: 1; }\n"
            "  60% { opacity: 1; }\n"
            "  100% { opacity: 0; }\n"
            "}\n"
        ),
    ),
    (
        "Slide Over Left",
        "rc-slide-over-left",
        "page-transition",
        "box",
        (
            ".rc-slide-over-left {\n"
            "  position: fixed;\n"
            "  inset: 0;\n"
            "  z-index: 9999;\n"
            "  background: #fff;\n"
            "  transform: translateX(100%);\n"
            "  animation: rcSlideOverLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1);\n"
            "  pointer-events: all;\n"
            "}\n"
            "\n"
            "@keyframes rcSlideOverLeft {\n"
            "  0% { transform: translateX(100%); }\n"
            "  100% { transform: translateX(0); }\n"
            "}\n"
        ),
    ),
    (
        "Slide Over Right",
        "rc-slide-over-right",
        "page-transition",
        "box",
        (
            ".rc-slide-over-right {\n"
            "  position: fixed;\n"
            "  inset: 0;\n"
            "  z-index: 9999;\n"
            "  background: #fff;\n"
            "  transform: translateX(-100%);\n"
            "  animation: rcSlideOverRight 0.6s cubic-bezier(0.4, 0, 0.2, 1);\n"
            "  pointer-events: all;\n"
            "}\n"
            "\n"
            "@keyframes rcSlideOverRight {\n"
            "  0% { transform: translateX(-100%); }\n"
            "  100% { transform: translateX(0); }\n"
            "}\n"
        ),
    ),
    (
        "Slide Over Up",
        "rc-slide-over-up",
        "page-transition",
        "box",
        (
            ".rc-slide-over-up {\n"
            "  position: fixed;\n"
            "  inset: 0;\n"
            "  z-index: 9999;\n"
            "  background: #fff;\n"
            "  transform: translateY(100%);\n"
            "  animation: rcSlideOverUp 0.6s cubic-bezier(0.4, 0, 0.2, 1);\n"
            "  pointer-events: all;\n"
            "}\n"
            "\n"
            "@keyframes rcSlideOverUp {\n"
            "  0% { transform: translateY(100%); }\n"
            "  100% { transform: translateY(0); }\n"
            "}\n"
        ),
    ),
    (
        "Zoom Fade",
        "rc-zoom-fade",
        "page-transition",
        "box",
        (
            ".rc-zoom-fade {\n"
            "  position: fixed;\n"
            "  inset: 0;\n"
            "  z-index: 9999;\n"
            "  background: #fff;\n"
            "  opacity: 0;\n"
            "  transform: scale(0.92);\n"
            "  animation: rcZoomFade 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n"
            "  pointer-events: all;\n"
            "}\n"
            "\n"
            "@keyframes rcZoomFade {\n"
            "  0% { opacity: 0; transform: scale(0.92); }\n"
            "  100% { opacity: 1; transform: scale(1); }\n"
            "}\n"
        ),
    ),
    (
        "Flip Transition",
        "rc-flip-transition",
        "page-transition",
        "box",
        (
            ".rc-flip-transition {\n"
            "  position: fixed;\n"
            "  inset: 0;\n"
            "  z-index: 9999;\n"
            "  background: #fff;\n"
            "  transform: perspective(1200px) rotateY(-90deg);\n"
            "  transform-origin: left center;\n"
            "  animation: rcFlipTransition 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n"
            "  pointer-events: all;\n"
            "  backface-visibility: hidden;\n"
            "}\n"
            "\n"
            "@keyframes rcFlipTransition {\n"
            "  0% { transform: perspective(1200px) rotateY(-90deg); }\n"
            "  100% { transform: perspective(1200px) rotateY(0deg); }\n"
            "}\n"
        ),
    ),
    (
        "Dissolve",
        "rc-dissolve",
        "page-transition",
        "box",
        (
            ".rc-dissolve {\n"
            "  position: fixed;\n"
            "  inset: 0;\n"
            "  z-index: 9999;\n"
            "  background: #fff;\n"
            "  opacity: 0;\n"
            "  filter: blur(20px);\n"
            "  animation: rcDissolve 0.65s ease-out forwards;\n"
            "  pointer-events: all;\n"
            "}\n"
            "\n"
            "@keyframes rcDissolve {\n"
            "  0% { opacity: 0; filter: blur(20px); }\n"
            "  100% { opacity: 1; filter: blur(0px); }\n"
            "}\n"
        ),
    ),
    (
        "CurtaIn",
        "rc-curtain-in",
        "page-transition",
        "box",
        (
            ".rc-curtain-in {\n"
            "  position: fixed;\n"
            "  inset: 0;\n"
            "  z-index: 9999;\n"
            "  background: #fff;\n"
            "  pointer-events: all;\n"
            "}\n"
            "\n"
            ".rc-curtain-in::before,\n"
            ".rc-curtain-in::after {\n"
            "  content: '';\n"
            "  position: absolute;\n"
            "  top: 0;\n"
            "  bottom: 0;\n"
            "  width: 100%;\n"
            "  background: #fff;\n"
            "  animation: rcCurtainIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;\n"
            "}\n"
            "\n"
            ".rc-curtain-in::before {\n"
            "  left: 0;\n"
            "  clip-path: inset(0 50% 0 0);\n"
            "  animation-name: rcCurtainLeft;\n"
            "}\n"
            "\n"
            ".rc-curtain-in::after {\n"
            "  right: 0;\n"
            "  clip-path: inset(0 0 0 50%);\n"
            "  animation-name: rcCurtainRight;\n"
            "}\n"
            "\n"
            "@keyframes rcCurtainLeft {\n"
            "  0% { clip-path: inset(0 0 0 0); }\n"
            "  100% { clip-path: inset(0 50% 0 0); }\n"
            "}\n"
            "\n"
            "@keyframes rcCurtainRight {\n"
            "  0% { clip-path: inset(0 0 0 0); }\n"
            "  100% { clip-path: inset(0 0 0 50%); }\n"
            "}\n"
        ),
    ),
]


# ─── CATEGORY 2: Accessibility (displayType: "box") ───────────────────────────

accessibility_effects = [
    (
        "Focus Visible Ring",
        "rc-focus-visible-ring",
        "accessibility",
        "box",
        (
            ".rc-focus-visible-ring:focus-visible {\n"
            "  outline: 3px solid #2563eb;\n"
            "  outline-offset: 2px;\n"
            "  border-radius: 4px;\n"
            "  transition: outline-color 0.15s ease;\n"
            "}\n"
            "\n"
            ".rc-focus-visible-ring:focus:not(:focus-visible) {\n"
            "  outline: none;\n"
            "}\n"
            "\n"
            "@media (prefers-reduced-motion: reduce) {\n"
            "  .rc-focus-visible-ring:focus-visible {\n"
            "    transition: none;\n"
            "  }\n"
            "}\n"
        ),
    ),
    (
        "Skip Link",
        "rc-skip-link",
        "accessibility",
        "box",
        (
            ".rc-skip-link {\n"
            "  position: absolute;\n"
            "  left: -9999px;\n"
            "  top: auto;\n"
            "  width: 1px;\n"
            "  height: 1px;\n"
            "  overflow: hidden;\n"
            "  z-index: 99999;\n"
            "  background: #1d4ed8;\n"
            "  color: #fff;\n"
            "  padding: 8px 16px;\n"
            "  font-size: 1rem;\n"
            "  font-weight: 600;\n"
            "  border-radius: 0 0 8px 0;\n"
            "  text-decoration: none;\n"
            "  transition: none;\n"
            "}\n"
            "\n"
            ".rc-skip-link:focus {\n"
            "  left: 0;\n"
            "  top: 0;\n"
            "  width: auto;\n"
            "  height: auto;\n"
            "  overflow: auto;\n"
            "  padding: 12px 24px;\n"
            "}\n"
            "\n"
            "@media (prefers-reduced-motion: reduce) {\n"
            "  .rc-skip-link {\n"
            "    transition: none;\n"
            "  }\n"
            "}\n"
        ),
    ),
    (
        "Reduced Motion Fade",
        "rc-reduced-motion-fade",
        "accessibility",
        "box",
        (
            ".rc-reduced-motion-fade {\n"
            "  opacity: 0;\n"
            "  animation: rcRmFade 0.5s ease forwards;\n"
            "}\n"
            "\n"
            "@keyframes rcRmFade {\n"
            "  0% { opacity: 0; }\n"
            "  100% { opacity: 1; }\n"
            "}\n"
            "\n"
            "@media (prefers-reduced-motion: reduce) {\n"
            "  .rc-reduced-motion-fade {\n"
            "    animation: none;\n"
            "    opacity: 1;\n"
            "  }\n"
            "}\n"
        ),
    ),
    (
        "Reduced Motion Slide",
        "rc-reduced-motion-slide",
        "accessibility",
        "box",
        (
            ".rc-reduced-motion-slide {\n"
            "  transform: translateY(20px);\n"
            "  opacity: 0;\n"
            "  animation: rcRmSlide 0.5s ease forwards;\n"
            "}\n"
            "\n"
            "@keyframes rcRmSlide {\n"
            "  0% { transform: translateY(20px); opacity: 0; }\n"
            "  100% { transform: translateY(0); opacity: 1; }\n"
            "}\n"
            "\n"
            "@media (prefers-reduced-motion: reduce) {\n"
            "  .rc-reduced-motion-slide {\n"
            "    animation: none;\n"
            "    transform: none;\n"
            "    opacity: 1;\n"
            "  }\n"
            "}\n"
        ),
    ),
    (
        "High Contrast Border",
        "rc-high-contrast-border",
        "accessibility",
        "box",
        (
            ".rc-high-contrast-border {\n"
            "  border: 3px solid #000;\n"
            "  min-height: 1px;\n"
            "  min-width: 1px;\n"
            "}\n"
            "\n"
            "@media (prefers-contrast: high) {\n"
            "  .rc-high-contrast-border {\n"
            "    border-width: 4px;\n"
            "    border-color: #fff;\n"
            "    outline: 3px solid #000;\n"
            "    outline-offset: -1px;\n"
            "  }\n"
            "}\n"
            "\n"
            "@media (prefers-reduced-motion: reduce) {\n"
            "  .rc-high-contrast-border {\n"
            "    transition: none;\n"
            "  }\n"
            "}\n"
        ),
    ),
    (
        "Screen Reader Only",
        "rc-sr-only",
        "accessibility",
        "box",
        (
            ".rc-sr-only {\n"
            "  position: absolute;\n"
            "  width: 1px;\n"
            "  height: 1px;\n"
            "  padding: 0;\n"
            "  margin: -1px;\n"
            "  overflow: hidden;\n"
            "  clip: rect(0, 0, 0, 0);\n"
            "  white-space: nowrap;\n"
            "  border: 0;\n"
            "}\n"
            "\n"
            ".rc-sr-only.focusable:focus {\n"
            "  position: static;\n"
            "  width: auto;\n"
            "  height: auto;\n"
            "  padding: inherit;\n"
            "  margin: inherit;\n"
            "  overflow: visible;\n"
            "  clip: auto;\n"
            "  white-space: normal;\n"
            "}\n"
        ),
    ),
    (
        "Motion Safe Bounce",
        "rc-motion-safe-bounce",
        "accessibility",
        "box",
        (
            ".rc-motion-safe-bounce {\n"
            "  animation: rcMsBounce 0.6s ease;\n"
            "}\n"
            "\n"
            "@keyframes rcMsBounce {\n"
            "  0%, 100% { transform: translateY(0); }\n"
            "  30% { transform: translateY(-15px); }\n"
            "  50% { transform: translateY(-8px); }\n"
            "  70% { transform: translateY(-3px); }\n"
            "}\n"
            "\n"
            "@media (prefers-reduced-motion: reduce) {\n"
            "  .rc-motion-safe-bounce {\n"
            "    animation: none;\n"
            "    transform: none;\n"
            "  }\n"
            "}\n"
        ),
    ),
    (
        "Motion Safe Pulse",
        "rc-motion-safe-pulse",
        "accessibility",
        "box",
        (
            ".rc-motion-safe-pulse {\n"
            "  animation: rcMsPulse 1s ease-in-out 2;\n"
            "}\n"
            "\n"
            "@keyframes rcMsPulse {\n"
            "  0%, 100% { transform: scale(1); }\n"
            "  50% { transform: scale(1.08); }\n"
            "}\n"
            "\n"
            "@media (prefers-reduced-motion: reduce) {\n"
            "  .rc-motion-safe-pulse {\n"
            "    animation: none;\n"
            "    transform: none;\n"
            "}\n"
            "}\n"
        ),
    ),
]


# ─── CATEGORY 3: Icon Animations (displayType: "icon") ───────────────────────

icon_effects = [
    (
        "Icon Spin",
        "rc-icon-spin",
        "icons",
        "icon",
        (
            ".rc-icon-spin {\n"
            "  animation: rcIconSpin 1s linear infinite;\n"
            "}\n"
            "\n"
            "@keyframes rcIconSpin {\n"
            "  0% { transform: rotate(0deg); }\n"
            "  100% { transform: rotate(360deg); }\n"
            "}\n"
        ),
    ),
    (
        "Icon Bounce",
        "rc-icon-bounce",
        "icons",
        "icon",
        (
            ".rc-icon-bounce {\n"
            "  animation: rcIconBounce 0.8s ease infinite;\n"
            "}\n"
            "\n"
            "@keyframes rcIconBounce {\n"
            "  0%, 100% { transform: translateY(0); }\n"
            "  20% { transform: translateY(-30%); }\n"
            "  40% { transform: translateY(0); }\n"
            "  55% { transform: translateY(-15%); }\n"
            "  70% { transform: translateY(0); }\n"
            "  82% { transform: translateY(-6%); }\n"
            "}\n"
        ),
    ),
    (
        "Icon Pulse",
        "rc-icon-pulse",
        "icons",
        "icon",
        (
            ".rc-icon-pulse {\n"
            "  animation: rcIconPulse 1s ease-in-out infinite;\n"
            "}\n"
            "\n"
            "@keyframes rcIconPulse {\n"
            "  0%, 100% { transform: scale(1); }\n"
            "  50% { transform: scale(1.2); }\n"
            "}\n"
        ),
    ),
    (
        "Icon Shake",
        "rc-icon-shake",
        "icons",
        "icon",
        (
            ".rc-icon-shake {\n"
            "  animation: rcIconShake 0.6s ease-in-out;\n"
            "}\n"
            "\n"
            "@keyframes rcIconShake {\n"
            "  0%, 100% { transform: translateX(0); }\n"
            "  15% { transform: translateX(-25%); }\n"
            "  30% { transform: translateX(20%); }\n"
            "  45% { transform: translateX(-15%); }\n"
            "  60% { transform: translateX(10%); }\n"
            "  75% { transform: translateX(-5%); }\n"
            "}\n"
        ),
    ),
    (
        "Icon Flip",
        "rc-icon-flip",
        "icons",
        "icon",
        (
            ".rc-icon-flip {\n"
            "  animation: rcIconFlip 0.6s ease-in-out;\n"
            "  backface-visibility: hidden;\n"
            "}\n"
            "\n"
            "@keyframes rcIconFlip {\n"
            "  0% { transform: perspective(400px) rotateY(0); }\n"
            "  100% { transform: perspective(400px) rotateY(360deg); }\n"
            "}\n"
        ),
    ),
    (
        "Icon Swing",
        "rc-icon-swing",
        "icons",
        "icon",
        (
            ".rc-icon-swing {\n"
            "  animation: rcIconSwing 0.8s ease-in-out;\n"
            "  transform-origin: top center;\n"
            "}\n"
            "\n"
            "@keyframes rcIconSwing {\n"
            "  0% { transform: rotate(0deg); }\n"
            "  20% { transform: rotate(15deg); }\n"
            "  40% { transform: rotate(-10deg); }\n"
            "  60% { transform: rotate(5deg); }\n"
            "  80% { transform: rotate(-2deg); }\n"
            "  100% { transform: rotate(0deg); }\n"
            "}\n"
        ),
    ),
    (
        "Icon Tada",
        "rc-icon-tada",
        "icons",
        "icon",
        (
            ".rc-icon-tada {\n"
            "  animation: rcIconTada 1s ease;\n"
            "}\n"
            "\n"
            "@keyframes rcIconTada {\n"
            "  0% { transform: scale(1) rotate(0deg); }\n"
            "  10%, 20% { transform: scale(0.9) rotate(-3deg); }\n"
            "  30%, 50%, 70%, 90% { transform: scale(1.15) rotate(3deg); }\n"
            "  40%, 60%, 80% { transform: scale(1.15) rotate(-3deg); }\n"
            "  100% { transform: scale(1) rotate(0deg); }\n"
            "}\n"
        ),
    ),
    (
        "Icon Wobble",
        "rc-icon-wobble",
        "icons",
        "icon",
        (
            ".rc-icon-wobble {\n"
            "  animation: rcIconWobble 0.8s ease;\n"
            "}\n"
            "\n"
            "@keyframes rcIconWobble {\n"
            "  0% { transform: translateX(0) rotate(0deg); }\n"
            "  15% { transform: translateX(-25%) rotate(-5deg); }\n"
            "  30% { transform: translateX(20%) rotate(3deg); }\n"
            "  45% { transform: translateX(-15%) rotate(-3deg); }\n"
            "  60% { transform: translateX(10%) rotate(2deg); }\n"
            "  75% { transform: translateX(-5%) rotate(-1deg); }\n"
            "  100% { transform: translateX(0) rotate(0deg); }\n"
            "}\n"
        ),
    ),
    (
        "Icon Fade In",
        "rc-icon-fade-in",
        "icons",
        "icon",
        (
            ".rc-icon-fade-in {\n"
            "  animation: rcIconFadeIn 0.5s ease forwards;\n"
            "}\n"
            "\n"
            "@keyframes rcIconFadeIn {\n"
            "  0% { opacity: 0; }\n"
            "  100% { opacity: 1; }\n"
            "}\n"
        ),
    ),
    (
        "Icon Drop In",
        "rc-icon-drop-in",
        "icons",
        "icon",
        (
            ".rc-icon-drop-in {\n"
            "  animation: rcIconDropIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;\n"
            "}\n"
            "\n"
            "@keyframes rcIconDropIn {\n"
            "  0% { opacity: 0; transform: translateY(-40px); }\n"
            "  60% { opacity: 1; transform: translateY(5px); }\n"
            "  80% { transform: translateY(-3px); }\n"
            "  100% { opacity: 1; transform: translateY(0); }\n"
            "}\n"
        ),
    ),
    (
        "Icon Rubber Band",
        "rc-icon-rubber-band",
        "icons",
        "icon",
        (
            ".rc-icon-rubber-band {\n"
            "  animation: rcIconRubberBand 0.8s ease;\n"
            "}\n"
            "\n"
            "@keyframes rcIconRubberBand {\n"
            "  0% { transform: scaleX(1) scaleY(1); }\n"
            "  30% { transform: scaleX(1.25) scaleY(0.75); }\n"
            "  40% { transform: scaleX(0.75) scaleY(1.25); }\n"
            "  50% { transform: scaleX(1.15) scaleY(0.85); }\n"
            "  65% { transform: scaleX(0.95) scaleY(1.05); }\n"
            "  75% { transform: scaleX(1.05) scaleY(0.95); }\n"
            "  100% { transform: scaleX(1) scaleY(1); }\n"
            "}\n"
        ),
    ),
    (
        "Icon Beat",
        "rc-icon-beat",
        "icons",
        "icon",
        (
            ".rc-icon-beat {\n"
            "  animation: rcIconBeat 1s ease-in-out infinite;\n"
            "}\n"
            "\n"
            "@keyframes rcIconBeat {\n"
            "  0%, 100% { transform: scale(1); }\n"
            "  14% { transform: scale(1.2); }\n"
            "  28% { transform: scale(1); }\n"
            "  42% { transform: scale(1.2); }\n"
            "  70% { transform: scale(1); }\n"
            "}\n"
        ),
    ),
]