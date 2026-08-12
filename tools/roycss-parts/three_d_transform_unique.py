"""
RoyCSS Effects Part 4 — 3D, Transform & Unique
================================================
Each tuple: (name, className, category, displayType, cssString)
"""


# ---------------------------------------------------------------------------
# CATEGORY 1: 3D  (displayType: "box")  — 16 effects
# ---------------------------------------------------------------------------
effects_3d = [
    # --- Original 8 ---
    (
        "Flip",
        "roy-flip",
        "3d",
        "box",
        (
            "perspective: 800px;\n"
            "animation: royFlip 1.2s ease-in-out infinite;\n"
            "@keyframes royFlip {\n"
            "  0%   { transform: rotateY(0deg); }\n"
            "  100% { transform: rotateY(360deg); }\n"
            "}"
        ),
    ),
    (
        "Cube",
        "roy-cube",
        "3d",
        "box",
        (
            "perspective: 600px;\n"
            "animation: royCube 2.4s ease-in-out infinite;\n"
            "@keyframes royCube {\n"
            "  0%   { transform: rotateX(0deg)   rotateY(0deg); }\n"
            "  25%  { transform: rotateX(90deg)  rotateY(90deg); }\n"
            "  50%  { transform: rotateX(180deg) rotateY(180deg); }\n"
            "  75%  { transform: rotateX(270deg) rotateY(270deg); }\n"
            "  100% { transform: rotateX(360deg) rotateY(360deg); }\n"
            "}"
        ),
    ),
    (
        "Prism",
        "roy-prism",
        "3d",
        "box",
        (
            "perspective: 700px;\n"
            "animation: royPrism 3s linear infinite;\n"
            "@keyframes royPrism {\n"
            "  0%   { transform: rotateY(0deg)   rotateX(15deg); }\n"
            "  33%  { transform: rotateY(120deg) rotateX(-15deg); }\n"
            "  66%  { transform: rotateY(240deg) rotateX(15deg); }\n"
            "  100% { transform: rotateY(360deg) rotateX(-15deg); }\n"
            "}"
        ),
    ),
    (
        "Carousel",
        "roy-carousel",
        "3d",
        "box",
        (
            "perspective: 1000px;\n"
            "animation: royCarousel 4s ease-in-out infinite;\n"
            "@keyframes royCarousel {\n"
            "  0%   { transform: rotateY(0deg)   translateZ(60px); }\n"
            "  25%  { transform: rotateY(90deg)  translateZ(60px); }\n"
            "  50%  { transform: rotateY(180deg) translateZ(60px); }\n"
            "  75%  { transform: rotateY(270deg) translateZ(60px); }\n"
            "  100% { transform: rotateY(360deg) translateZ(60px); }\n"
            "}"
        ),
    ),
    (
        "Card Tilt",
        "roy-card-tilt",
        "3d",
        "box",
        (
            "perspective: 600px;\n"
            "animation: royCardTilt 2s ease-in-out infinite;\n"
            "@keyframes royCardTilt {\n"
            "  0%   { transform: rotateX(0deg)    rotateY(0deg); }\n"
            "  25%  { transform: rotateX(15deg)   rotateY(-10deg); }\n"
            "  50%  { transform: rotateX(0deg)    rotateY(0deg); }\n"
            "  75%  { transform: rotateX(-15deg)  rotateY(10deg); }\n"
            "  100% { transform: rotateX(0deg)    rotateY(0deg); }\n"
            "}"
        ),
    ),
    (
        "Perspective",
        "roy-perspective",
        "3d",
        "box",
        (
            "perspective: 500px;\n"
            "animation: royPerspective 2.5s ease-in-out infinite;\n"
            "@keyframes royPerspective {\n"
            "  0%   { transform: translateZ(0px); }\n"
            "  50%  { transform: translateZ(80px) rotateX(10deg); }\n"
            "  100% { transform: translateZ(0px); }\n"
            "}"
        ),
    ),
    (
        "Depth Float",
        "roy-depth-float",
        "3d",
        "box",
        (
            "perspective: 600px;\n"
            "animation: royDepthFloat 3s ease-in-out infinite;\n"
            "@keyframes royDepthFloat {\n"
            "  0%   { transform: translateZ(0px)   translateY(0px); }\n"
            "  50%  { transform: translateZ(50px)  translateY(-20px); }\n"
            "  100% { transform: translateZ(0px)   translateY(0px); }\n"
            "}"
        ),
    ),
    (
        "Rotate3D",
        "roy-rotate3d",
        "3d",
        "box",
        (
            "perspective: 800px;\n"
            "animation: royRotate3D 3s linear infinite;\n"
            "@keyframes royRotate3D {\n"
            "  0%   { transform: rotate3d(1, 1, 0, 0deg); }\n"
            "  100% { transform: rotate3d(1, 1, 0, 360deg); }\n"
            "}"
        ),
    ),

    # --- New 8 ---
    (
        "3D Book Open",
        "roy-book-open",
        "3d",
        "box",
        (
            "perspective: 800px;\n"
            "transform-style: preserve-3d;\n"
            "animation: royBookOpen 3s ease-in-out infinite;\n"
            "@keyframes royBookOpen {\n"
            "  0%   { transform: rotateY(0deg); }\n"
            "  15%  { transform: rotateY(0deg); }\n"
            "  50%  { transform: rotateY(-160deg); }\n"
            "  85%  { transform: rotateY(-160deg); }\n"
            "  100% { transform: rotateY(0deg); }\n"
            "}"
        ),
    ),
    (
        "3D Door Open",
        "roy-door-open",
        "3d",
        "box",
        (
            "perspective: 600px;\n"
            "transform-origin: left center;\n"
            "animation: royDoorOpen 2.8s ease-in-out infinite;\n"
            "@keyframes royDoorOpen {\n"
            "  0%   { transform: perspective(600px) rotateY(0deg); }\n"
            "  30%  { transform: perspective(600px) rotateY(-75deg); }\n"
            "  70%  { transform: perspective(600px) rotateY(-75deg); }\n"
            "  100% { transform: perspective(600px) rotateY(0deg); }\n"
            "}"
        ),
    ),
    (
        "3D Coin Flip",
        "roy-coin-flip",
        "3d",
        "box",
        (
            "perspective: 600px;\n"
            "animation: royCoinFlip 2s ease-in-out infinite;\n"
            "@keyframes royCoinFlip {\n"
            "  0%   { transform: rotateY(0deg)    scaleX(1); }\n"
            "  25%  { transform: rotateY(90deg)   scaleX(0.15); }\n"
            "  50%  { transform: rotateY(180deg)  scaleX(1); }\n"
            "  75%  { transform: rotateY(270deg)  scaleX(0.15); }\n"
            "  100% { transform: rotateY(360deg)  scaleX(1); }\n"
            "}"
        ),
    ),
    (
        "3D Swing",
        "roy-swing",
        "3d",
        "box",
        (
            "perspective: 500px;\n"
            "transform-origin: top center;\n"
            "animation: roySwing 2s ease-in-out infinite;\n"
            "@keyframes roySwing {\n"
            "  0%   { transform: rotateY(0deg); }\n"
            "  20%  { transform: rotateY(30deg); }\n"
            "  40%  { transform: rotateY(-25deg); }\n"
            "  60%  { transform: rotateY(15deg); }\n"
            "  80%  { transform: rotateY(-10deg); }\n"
            "  100% { transform: rotateY(0deg); }\n"
            "}"
        ),
    ),
    (
        "3D Helix",
        "roy-helix",
        "3d",
        "box",
        (
            "perspective: 800px;\n"
            "animation: royHelix 3s linear infinite;\n"
            "@keyframes royHelix {\n"
            "  0%   { transform: rotateY(0deg)   translateZ(0px)   translateY(0px); }\n"
            "  25%  { transform: rotateY(90deg)  translateZ(40px)  translateY(-30px); }\n"
            "  50%  { transform: rotateY(180deg) translateZ(0px)   translateY(0px); }\n"
            "  75%  { transform: rotateY(270deg) translateZ(-40px) translateY(-30px); }\n"
            "  100% { transform: rotateY(360deg) translateZ(0px)   translateY(0px); }\n"
            "}"
        ),
    ),
    (
        "3D Morphing Cube",
        "roy-morphing-cube",
        "3d",
        "box",
        (
            "perspective: 700px;\n"
            "animation: royMorphingCube 4s ease-in-out infinite;\n"
            "@keyframes royMorphingCube {\n"
            "  0%   { transform: rotateX(0deg)   rotateY(0deg)   scaleX(1)   scaleY(1); }\n"
            "  25%  { transform: rotateX(90deg)  rotateY(45deg)  scaleX(1.5) scaleY(0.7); }\n"
            "  50%  { transform: rotateX(180deg) rotateY(180deg) scaleX(0.6) scaleY(1.4); }\n"
            "  75%  { transform: rotateX(270deg) rotateY(270deg) scaleX(1.3) scaleY(0.8); }\n"
            "  100% { transform: rotateX(360deg) rotateY(360deg) scaleX(1)   scaleY(1); }\n"
            "}"
        ),
    ),
    (
        "3D Orbit",
        "roy-orbit",
        "3d",
        "box",
        (
            "perspective: 600px;\n"
            "animation: royOrbit 3s linear infinite;\n"
            "@keyframes royOrbit {\n"
            "  0%   { transform: rotate(0deg)   translateX(50px) rotate(0deg); }\n"
            "  100% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }\n"
            "}"
        ),
    ),
    (
        "3D Tumble",
        "roy-tumble",
        "3d",
        "box",
        (
            "perspective: 700px;\n"
            "animation: royTumble 2.5s ease-in-out infinite;\n"
            "@keyframes royTumble {\n"
            "  0%   { transform: rotate3d(1, 0, 0, 0deg)    rotate3d(0, 1, 0, 0deg); }\n"
            "  25%  { transform: rotate3d(1, 0, 0, 90deg)   rotate3d(0, 1, 0, 90deg); }\n"
            "  50%  { transform: rotate3d(1, 0, 0, 180deg)  rotate3d(0, 1, 0, 180deg); }\n"
            "  75%  { transform: rotate3d(1, 0, 0, 270deg)  rotate3d(0, 1, 0, 270deg); }\n"
            "  100% { transform: rotate3d(1, 0, 0, 360deg)  rotate3d(0, 1, 0, 360deg); }\n"
            "}"
        ),
    ),
]


# ---------------------------------------------------------------------------
# CATEGORY 2: transform  (displayType: "box")  — 16 effects
# ---------------------------------------------------------------------------
transform_effects = [
    # --- Original 8 ---
    (
        "Morph Circle",
        "roy-morph-circle",
        "transform",
        "box",
        (
            "animation: royMorphCircle 2s ease-in-out infinite;\n"
            "@keyframes royMorphCircle {\n"
            "  0%, 100% { border-radius: 0; }\n"
            "  50%      { border-radius: 50%; }\n"
            "}"
        ),
    ),
    (
        "Morph Diamond",
        "roy-morph-diamond",
        "transform",
        "box",
        (
            "animation: royMorphDiamond 2.5s ease-in-out infinite;\n"
            "@keyframes royMorphDiamond {\n"
            "  0%, 100% { transform: rotate(0deg)   scale(1, 1); }\n"
            "  50%      { transform: rotate(45deg)  scale(0.85, 0.85); }\n"
            "}"
        ),
    ),
    (
        "Rotate 90",
        "roy-rotate90",
        "transform",
        "box",
        (
            "animation: royRotate90 2s ease-in-out infinite;\n"
            "@keyframes royRotate90 {\n"
            "  0%, 100% { transform: rotate(0deg); }\n"
            "  50%      { transform: rotate(90deg); }\n"
            "}"
        ),
    ),
    (
        "Rotate 180",
        "roy-rotate180",
        "transform",
        "box",
        (
            "animation: royRotate180 2s ease-in-out infinite;\n"
            "@keyframes royRotate180 {\n"
            "  0%, 100% { transform: rotate(0deg); }\n"
            "  50%      { transform: rotate(180deg); }\n"
            "}"
        ),
    ),
    (
        "Rotate 360",
        "roy-rotate360",
        "transform",
        "box",
        (
            "animation: royRotate360 2s linear infinite;\n"
            "@keyframes royRotate360 {\n"
            "  0%   { transform: rotate(0deg); }\n"
            "  100% { transform: rotate(360deg); }\n"
            "}"
        ),
    ),
    (
        "Skew X",
        "roy-skew-x",
        "transform",
        "box",
        (
            "animation: roySkewX 2s ease-in-out infinite;\n"
            "@keyframes roySkewX {\n"
            "  0%, 100% { transform: skewX(0deg); }\n"
            "  25%      { transform: skewX(20deg); }\n"
            "  75%      { transform: skewX(-20deg); }\n"
            "}"
        ),
    ),
    (
        "Skew Y",
        "roy-skew-y",
        "transform",
        "box",
        (
            "animation: roySkewY 2s ease-in-out infinite;\n"
            "@keyframes roySkewY {\n"
            "  0%, 100% { transform: skewY(0deg); }\n"
            "  25%      { transform: skewY(15deg); }\n"
            "  75%      { transform: skewY(-15deg); }\n"
            "}"
        ),
    ),
    (
        "Scale Rotate",
        "roy-scale-rotate",
        "transform",
        "box",
        (
            "animation: royScaleRotate 2s ease-in-out infinite;\n"
            "@keyframes royScaleRotate {\n"
            "  0%, 100% { transform: scale(1)    rotate(0deg); }\n"
            "  50%      { transform: scale(1.2)  rotate(180deg); }\n"
            "}"
        ),
    ),

    # --- New 8 ---
    (
        "Transform Accordion",
        "roy-accordion",
        "transform",
        "box",
        (
            "animation: royAccordion 2.5s ease-in-out infinite;\n"
            "@keyframes royAccordion {\n"
            "  0%, 100% { transform: scaleY(1); }\n"
            "  20%      { transform: scaleY(0.05); }\n"
            "  40%      { transform: scaleY(1.05); }\n"
            "  60%      { transform: scaleY(0.95); }\n"
            "  80%      { transform: scaleY(1.02); }\n"
            "}"
        ),
    ),
    (
        "Transform Fan",
        "roy-fan",
        "transform",
        "box",
        (
            "transform-origin: bottom center;\n"
            "animation: royFan 2.5s ease-in-out infinite;\n"
            "@keyframes royFan {\n"
            "  0%   { transform: rotate(0deg); }\n"
            "  25%  { transform: rotate(-40deg); }\n"
            "  50%  { transform: rotate(40deg); }\n"
            "  75%  { transform: rotate(-20deg); }\n"
            "  100% { transform: rotate(0deg); }\n"
            "}"
        ),
    ),
    (
        "Transform Stretch",
        "roy-stretch",
        "transform",
        "box",
        (
            "animation: royStretch 2s ease-in-out infinite;\n"
            "@keyframes royStretch {\n"
            "  0%, 100% { transform: scaleX(1)    scaleY(1); }\n"
            "  30%      { transform: scaleX(1.6)  scaleY(0.75); }\n"
            "  60%      { transform: scaleX(0.9)  scaleY(1.1); }\n"
            "}"
        ),
    ),
    (
        "Transform Compress",
        "roy-compress",
        "transform",
        "box",
        (
            "animation: royCompress 2s ease-in-out infinite;\n"
            "@keyframes royCompress {\n"
            "  0%, 100% { transform: scaleY(1); }\n"
            "  15%      { transform: scaleY(0.4); }\n"
            "  30%      { transform: scaleY(1.15); }\n"
            "  45%      { transform: scaleY(0.85); }\n"
            "  60%      { transform: scaleY(1.05); }\n"
            "  75%      { transform: scaleY(0.97); }\n"
            "}"
        ),
    ),
    (
        "Transform Wobble",
        "roy-wobble",
        "transform",
        "box",
        (
            "animation: royWobble 1.5s ease-in-out infinite;\n"
            "@keyframes royWobble {\n"
            "  0%   { transform: translateX(0)     rotate(0deg); }\n"
            "  15%  { transform: translateX(-12px)  rotate(-5deg); }\n"
            "  30%  { transform: translateX(10px)   rotate(3deg); }\n"
            "  45%  { transform: translateX(-8px)   rotate(-3deg); }\n"
            "  60%  { transform: translateX(6px)    rotate(2deg); }\n"
            "  75%  { transform: translateX(-3px)   rotate(-1deg); }\n"
            "  100% { transform: translateX(0)      rotate(0deg); }\n"
            "}"
        ),
    ),
    (
        "Transform Twist",
        "roy-twist",
        "transform",
        "box",
        (
            "animation: royTwist 2s ease-in-out infinite;\n"
            "@keyframes royTwist {\n"
            "  0%, 100% { transform: rotateZ(0deg)   scaleX(1); }\n"
            "  25%      { transform: rotateZ(10deg)  scaleX(0.7); }\n"
            "  50%      { transform: rotateZ(0deg)   scaleX(1.1); }\n"
            "  75%      { transform: rotateZ(-10deg) scaleX(0.7); }\n"
            "}"
        ),
    ),
    (
        "Transform Fold",
        "roy-fold",
        "transform",
        "box",
        (
            "perspective: 500px;\n"
            "transform-origin: top center;\n"
            "animation: royFold 3s ease-in-out infinite;\n"
            "@keyframes royFold {\n"
            "  0%, 100% { transform: rotateX(0deg); }\n"
            "  40%      { transform: rotateX(-120deg); }\n"
            "  60%      { transform: rotateX(-120deg); }\n"
            "}"
        ),
    ),
    (
        "Transform Unfold",
        "roy-unfold",
        "transform",
        "box",
        (
            "perspective: 500px;\n"
            "transform-origin: top center;\n"
            "animation: royUnfold 3s ease-in-out infinite;\n"
            "@keyframes royUnfold {\n"
            "  0%   { transform: rotateX(-120deg); }\n"
            "  40%  { transform: rotateX(-120deg); }\n"
            "  100% { transform: rotateX(0deg); }\n"
            "}"
        ),
    ),
]


# ---------------------------------------------------------------------------
# CATEGORY 3: unique  (displayType: varies)  — 24 effects
# ---------------------------------------------------------------------------
unique_effects = [
    # --- Original 12 ---
    (
        "Liquid Fill",
        "roy-liquid-fill",
        "unique",
        "box",
        (
            "background: linear-gradient(to top, #00d2ff 0%, #00d2ff var(--fill, 50%), transparent var(--fill, 50%));\n"
            "animation: royLiquidFill 3s ease-in-out infinite;\n"
            "@keyframes royLiquidFill {\n"
            "  0%, 100% { --fill: 20%; }\n"
            "  50%      { --fill: 80%; }\n"
            "}"
        ),
    ),
    (
        "Smoke",
        "roy-smoke",
        "unique",
        "box",
        (
            "animation: roySmoke 3s ease-out infinite;\n"
            "filter: blur(2px);\n"
            "@keyframes roySmoke {\n"
            "  0%   { opacity: 0.7; transform: translateY(0)     scale(1);   filter: blur(2px); }\n"
            "  100% { opacity: 0;   transform: translateY(-60px) scale(2.5); filter: blur(10px); }\n"
            "}"
        ),
    ),
    (
        "Electric",
        "roy-electric",
        "unique",
        "box",
        (
            "animation: royElectric 0.15s linear infinite;\n"
            "box-shadow:\n"
            "  0 0 5px  #00e5ff,\n"
            "  0 0 10px #00e5ff,\n"
            "  0 0 20px #00b8d4,\n"
            "  0 0 40px #00b8d4;\n"
            "@keyframes royElectric {\n"
            "  0%, 100% { box-shadow: 0 0 5px #00e5ff, 0 0 10px #00e5ff, 0 0 20px #00b8d4; }\n"
            "  50%      { box-shadow: 0 0 10px #76ff03, 0 0 25px #76ff03, 0 0 50px #64dd17; }\n"
            "}"
        ),
    ),
    (
        "Holographic",
        "roy-holographic",
        "unique",
        "box",
        (
            "background: linear-gradient(\n"
            "  135deg,\n"
            "  #ff0080 0%, #ff8c00 16%, #40e0d0 33%,\n"
            "  #7b68ee 50%, #ff0080 66%, #ff8c00 83%,\n"
            "  #40e0d0 100%\n"
            ");\n"
            "background-size: 400% 400%;\n"
            "animation: royHolographic 4s ease-in-out infinite;\n"
            "@keyframes royHolographic {\n"
            "  0%   { background-position: 0% 50%; }\n"
            "  50%  { background-position: 100% 50%; }\n"
            "  100% { background-position: 0% 50%; }\n"
            "}"
        ),
    ),
    (
        "Breathing",
        "roy-breathing",
        "unique",
        "box",
        (
            "animation: royBreathing 4s ease-in-out infinite;\n"
            "@keyframes royBreathing {\n"
            "  0%, 100% { transform: scale(1);    opacity: 0.6; }\n"
            "  50%      { transform: scale(1.08); opacity: 1; }\n"
            "}"
        ),
    ),
    (
        "Paper Unfold",
        "roy-paper-unfold",
        "unique",
        "box",
        (
            "perspective: 600px;\n"
            "transform-origin: top left;\n"
            "animation: royPaperUnfold 3s ease-in-out infinite;\n"
            "@keyframes royPaperUnfold {\n"
            "  0%   { transform: rotateY(-180deg); opacity: 0.5; }\n"
            "  50%  { transform: rotateY(0deg);    opacity: 1; }\n"
            "  100% { transform: rotateY(-180deg); opacity: 0.5; }\n"
            "}"
        ),
    ),
    (
        "Ripple Spread",
        "roy-ripple-spread",
        "unique",
        "box",
        (
            "animation: royRippleSpread 2s ease-out infinite;\n"
            "@keyframes royRippleSpread {\n"
            "  0%   { box-shadow: 0 0 0 0 rgba(0, 150, 255, 0.5); }\n"
            "  100% { box-shadow: 0 0 0 30px rgba(0, 150, 255, 0); }\n"
            "}"
        ),
    ),
    (
        "Confetti Burst",
        "roy-confetti-burst",
        "unique",
        "box",
        (
            "animation: royConfettiBurst 1.5s ease-out infinite;\n"
            "@keyframes royConfettiBurst {\n"
            "  0%   { transform: scale(0) rotate(0deg);   opacity: 1; }\n"
            "  60%  { transform: scale(1.2) rotate(200deg); opacity: 1; }\n"
            "  100% { transform: scale(1) rotate(360deg); opacity: 0.6; }\n"
            "}"
        ),
    ),
    (
        "Magnetic Pull",
        "roy-magnetic-pull",
        "unique",
        "box",
        (
            "animation: royMagneticPull 2.5s ease-in-out infinite;\n"
            "filter: drop-shadow(0 0 8px rgba(100, 100, 255, 0.6));\n"
            "@keyframes royMagneticPull {\n"
            "  0%, 100% { transform: translateX(0)    translateY(0);   filter: drop-shadow(0 0 8px rgba(100, 100, 255, 0.6)); }\n"
            "  30%      { transform: translateX(15px) translateY(5px); filter: drop-shadow(0 0 15px rgba(100, 100, 255, 0.9)); }\n"
            "  60%      { transform: translateX(-5px) translateY(-2px); }\n"
            "}"
        ),
    ),
    (
        "Glass Shatter",
        "roy-glass-shatter",
        "unique",
        "box",
        (
            "animation: royGlassShatter 2s ease-in-out infinite;\n"
            "@keyframes royGlassShatter {\n"
            "  0%   { clip-path: inset(0 0 0 0); opacity: 1; }\n"
            "  10%  { clip-path: polygon(0 0, 60% 0, 40% 40%, 0 50%); opacity: 1; }\n"
            "  30%  { clip-path: polygon(60% 0, 100% 0, 100% 50%, 40% 40%); opacity: 0.9; transform: translate(10px, -5px); }\n"
            "  50%  { clip-path: polygon(0 50%, 40% 40%, 60% 100%, 0 100%); opacity: 0.9; transform: translate(-8px, 5px); }\n"
            "  70%  { clip-path: polygon(40% 40%, 100% 50%, 100% 100%, 60% 100%); opacity: 0.9; transform: translate(6px, 8px); }\n"
            "  80%  { clip-path: inset(0 0 0 0); opacity: 1; transform: none; }\n"
            "  100% { clip-path: inset(0 0 0 0); opacity: 1; transform: none; }\n"
            "}"
        ),
    ),
    (
        "Neon Outline",
        "roy-neon-outline",
        "unique",
        "box",
        (
            "animation: royNeonOutline 1.5s ease-in-out infinite alternate;\n"
            "@keyframes royNeonOutline {\n"
            "  0% {\n"
            "    box-shadow:\n"
            "      0 0 5px  #ff00de,\n"
            "      0 0 10px #ff00de,\n"
            "      inset 0 0 5px #ff00de;\n"
            "  }\n"
            "  100% {\n"
            "    box-shadow:\n"
            "      0 0 15px #ff00de,\n"
            "      0 0 30px #ff00de,\n"
            "      0 0 50px #ff00de,\n"
            "      inset 0 0 10px #ff00de;\n"
            "  }\n"
            "}"
        ),
    ),
    (
        "Gradient Border Spin",
        "roy-gradient-border-spin",
        "unique",
        "box",
        (
            "border: 3px solid transparent;\n"
            "background-image: linear-gradient(#1a1a2e, #1a1a2e),\n"
            "  linear-gradient(135deg, #f093fb, #f5576c, #4facfe, #00f2fe);\n"
            "background-origin: border-box;\n"
            "background-clip: padding-box, border-box;\n"
            "background-size: 100% 100%, 300% 300%;\n"
            "animation: royGradBorderSpin 3s linear infinite;\n"
            "@keyframes royGradBorderSpin {\n"
            "  0%   { background-position: 0 0, 0% 50%; }\n"
            "  100% { background-position: 0 0, 100% 50%; }\n"
            "}"
        ),
    ),

    # --- New 12 ---
    (
        "Unique Aurora Text",
        "roy-aurora-text",
        "unique",
        "text",
        (
            "background: linear-gradient(\n"
            "  90deg,\n"
            "  #00c9ff, #92fe9d, #f7ff00, #ff6b6b, #c471f5, #00c9ff\n"
            ");\n"
            "background-size: 400% 100%;\n"
            "-webkit-background-clip: text;\n"
            "background-clip: text;\n"
            "-webkit-text-fill-color: transparent;\n"
            "animation: royAuroraText 5s linear infinite;\n"
            "@keyframes royAuroraText {\n"
            "  0%   { background-position: 0% 50%; }\n"
            "  100% { background-position: 400% 50%; }\n"
            "}"
        ),
    ),
    (
        "Unique Fire",
        "roy-fire",
        "unique",
        "box",
        (
            "background: linear-gradient(\n"
            "  to top,\n"
            "  #ff4500 0%, #ff6a00 25%, #ffa500 50%, #ffdd00 75%, transparent 100%\n"
            ");\n"
            "background-size: 100% 250%;\n"
            "animation: royFire 1.5s ease-in-out infinite;\n"
            "filter: blur(1px) brightness(1.1);\n"
            "box-shadow: 0 0 20px 5px rgba(255, 69, 0, 0.4), 0 0 60px 10px rgba(255, 106, 0, 0.2);\n"
            "@keyframes royFire {\n"
            "  0%, 100% { background-position: 0% 100%; }\n"
            "  50%      { background-position: 0% 0%; }\n"
            "}"
        ),
    ),
    (
        "Unique Ice",
        "roy-ice",
        "unique",
        "box",
        (
            "background: linear-gradient(\n"
            "  135deg,\n"
            "  rgba(174, 214, 241, 0.4) 0%,\n"
            "  rgba(224, 247, 250, 0.3) 30%,\n"
            "  rgba(179, 229, 252, 0.5) 60%,\n"
            "  rgba(200, 230, 251, 0.3) 100%\n"
            ");\n"
            "backdrop-filter: blur(8px) saturate(1.8);\n"
            "-webkit-backdrop-filter: blur(8px) saturate(1.8);\n"
            "border: 1px solid rgba(255, 255, 255, 0.35);\n"
            "box-shadow:\n"
            "  0 0 15px rgba(174, 214, 241, 0.3),\n"
            "  inset 0 0 30px rgba(255, 255, 255, 0.15);\n"
            "animation: royIce 3s ease-in-out infinite;\n"
            "@keyframes royIce {\n"
            "  0%, 100% { box-shadow: 0 0 15px rgba(174, 214, 241, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.15); }\n"
            "  50%      { box-shadow: 0 0 25px rgba(174, 214, 241, 0.6), inset 0 0 40px rgba(255, 255, 255, 0.3); }\n"
            "}"
        ),
    ),
    (
        "Unique Sand",
        "roy-sand",
        "unique",
        "box",
        (
            "background: #d4a76a;\n"
            "border-radius: 4px;\n"
            "animation: roySand 2.5s ease-out infinite;\n"
            "@keyframes roySand {\n"
            "  0%   {\n"
            "    box-shadow:\n"
            "      0 0 0 0 rgba(212, 167, 106, 0.8),\n"
            "      0 0 0 0 rgba(194, 148, 90, 0.6),\n"
            "      0 0 0 0 rgba(222, 184, 135, 0.4);\n"
            "    opacity: 1;\n"
            "  }\n"
            "  100% {\n"
            "    box-shadow:\n"
            "      30px -15px 8px -5px rgba(212, 167, 106, 0),\n"
            "      -25px -20px 6px -4px rgba(194, 148, 90, 0),\n"
            "      10px -30px 10px -3px rgba(222, 184, 135, 0),\n"
            "      -15px 10px 5px -6px rgba(210, 180, 140, 0),\n"
            "      20px 5px 7px -5px rgba(188, 143, 93, 0);\n"
            "    opacity: 0.3;\n"
            "  }\n"
            "}"
        ),
    ),
    (
        "Unique Water Drop",
        "roy-water-drop",
        "unique",
        "box",
        (
            "border-radius: 50%;\n"
            "animation: royWaterDrop 2s ease-out infinite;\n"
            "@keyframes royWaterDrop {\n"
            "  0%   {\n"
            "    box-shadow: 0 0 0 0 rgba(0, 150, 255, 0.5);\n"
            "    transform: scale(1);\n"
            "  }\n"
            "  50%  {\n"
            "    box-shadow:\n"
            "      0 0 0 15px rgba(0, 150, 255, 0.2),\n"
            "      0 0 0 30px rgba(0, 150, 255, 0.1);\n"
            "    transform: scale(0.95);\n"
            "  }\n"
            "  100% {\n"
            "    box-shadow:\n"
            "      0 0 0 30px rgba(0, 150, 255, 0),\n"
            "      0 0 0 60px rgba(0, 150, 255, 0);\n"
            "    transform: scale(1);\n"
            "  }\n"
            "}"
        ),
    ),
    (
        "Unique Glitch Morph",
        "roy-glitch-morph",
        "unique",
        "box",
        (
            "animation: royGlitchMorph 3s step-end infinite;\n"
            "position: relative;\n"
            "@keyframes royGlitchMorph {\n"
            "  0%, 100% {\n"
            "    transform: skewX(0deg) scale(1, 1);\n"
            "    border-radius: 0;\n"
            "    box-shadow: none;\n"
            "  }\n"
            "  10% {\n"
            "    transform: skewX(5deg) scale(1.02, 0.98);\n"
            "    border-radius: 10% 0 10% 0;\n"
            "    box-shadow: -3px 0 #ff0040, 3px 0 #00ffff;\n"
            "  }\n"
            "  20% {\n"
            "    transform: skewX(-3deg) scale(0.98, 1.02);\n"
            "    border-radius: 0 15% 0 15%;\n"
            "    box-shadow: 3px 0 #ff0040, -3px 0 #00ffff;\n"
            "  }\n"
            "  30% {\n"
            "    transform: skewX(0deg) scale(1.05, 0.95);\n"
            "    border-radius: 25% 10% 25% 10%;\n"
            "    box-shadow: 0;\n"
            "  }\n"
            "  40% {\n"
            "    transform: skewX(8deg) scale(0.95, 1.05);\n"
            "    border-radius: 10% 25% 10% 25%;\n"
            "    box-shadow: -5px 0 #ff0040, 5px 0 #00ffff;\n"
            "  }\n"
            "  50% {\n"
            "    transform: skewX(0deg) scale(1, 1);\n"
            "    border-radius: 0;\n"
            "    box-shadow: none;\n"
            "  }\n"
            "}"
        ),
    ),
    (
        "Unique Pixelate",
        "roy-pixelate",
        "unique",
        "box",
        (
            "background-color: #1a1a2e;\n"
            "animation: royPixelate 3s steps(8) infinite;\n"
            "image-rendering: pixelated;\n"
            "@keyframes royPixelate {\n"
            "  0%   { box-shadow: 10px 0 0 0 #e94560, 20px 0 0 0 #0f3460, 0 10px 0 0 #16213e, 10px 10px 0 0 #e94560, 20px 10px 0 0 #0f3460; }\n"
            "  12%  { box-shadow: 0 0 0 0 #e94560, 10px 0 0 0 #16213e, 20px 0 0 0 #e94560, 0 10px 0 0 #0f3460, 10px 10px 0 0 #e94560, 20px 10px 0 0 #16213e; }\n"
            "  25%  { box-shadow: 0 0 0 0 #0f3460, 10px 0 0 0 #e94560, 20px 0 0 0 #16213e, 0 10px 0 0 #e94560, 10px 10px 0 0 #0f3460, 20px 10px 0 0 #e94560; }\n"
            "  37%  { box-shadow: 0 0 0 0 #16213e, 10px 0 0 0 #0f3460, 20px 0 0 0 #e94560, 0 10px 0 0 #16213e, 10px 10px 0 0 #e94560, 20px 10px 0 0 #0f3460; }\n"
            "  50%  { box-shadow: 10px 0 0 0 #e94560, 20px 0 0 0 #0f3460, 0 10px 0 0 #16213e, 10px 10px 0 0 #e94560, 20px 10px 0 0 #0f3460; }\n"
            "  62%  { box-shadow: 0 0 0 0 #e94560, 10px 0 0 0 #16213e, 20px 0 0 0 #e94560, 0 10px 0 0 #0f3460, 10px 10px 0 0 #e94560, 20px 10px 0 0 #16213e; }\n"
            "  75%  { box-shadow: 0 0 0 0 #0f3460, 10px 0 0 0 #e94560, 20px 0 0 0 #16213e, 0 10px 0 0 #e94560, 10px 10px 0 0 #0f3460, 20px 10px 0 0 #e94560; }\n"
            "  87%  { box-shadow: 0 0 0 0 #16213e, 10px 0 0 0 #0f3460, 20px 0 0 0 #e94560, 0 10px 0 0 #16213e, 10px 10px 0 0 #e94560, 20px 10px 0 0 #0f3460; }\n"
            "  100% { box-shadow: 10px 0 0 0 #e94560, 20px 0 0 0 #0f3460, 0 10px 0 0 #16213e, 10px 10px 0 0 #e94560, 20px 10px 0 0 #0f3460; }\n"
            "}"
        ),
    ),
    (
        "Unique Cyber Grid",
        "roy-cyber-grid",
        "unique",
        "bg",
        (
            "background-color: #0a0a1a;\n"
            "background-image:\n"
            "  linear-gradient(rgba(0, 255, 255, 0.12) 1px, transparent 1px),\n"
            "  linear-gradient(90deg, rgba(0, 255, 255, 0.12) 1px, transparent 1px),\n"
            "  linear-gradient(rgba(255, 0, 255, 0.06) 1px, transparent 1px),\n"
            "  linear-gradient(90deg, rgba(255, 0, 255, 0.06) 1px, transparent 1px);\n"
            "background-size: 40px 40px, 40px 40px, 10px 10px, 10px 10px;\n"
            "animation: royCyberGrid 4s linear infinite;\n"
            "@keyframes royCyberGrid {\n"
            "  0%   { background-position: 0 0, 0 0, 0 0, 0 0; }\n"
            "  100% { background-position: 40px 40px, 40px 40px, 10px 10px, 10px 10px; }\n"
            "}"
        ),
    ),
    (
        "Unique Morphing Blob",
        "roy-morphing-blob",
        "unique",
        "box",
        (
            "animation: royMorphingBlob 8s ease-in-out infinite;\n"
            "@keyframes royMorphingBlob {\n"
            "  0%   { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }\n"
            "  25%  { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }\n"
            "  50%  { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; }\n"
            "  75%  { border-radius: 60% 30% 60% 50% / 70% 40% 50% 60%; }\n"
            "  100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }\n"
            "}"
        ),
    ),
    (
        "Unique Text Shadow Stack",
        "roy-text-shadow-stack",
        "unique",
        "text",
        (
            "color: #ffffff;\n"
            "animation: royTextShadowStack 3s ease-in-out infinite;\n"
            "@keyframes royTextShadowStack {\n"
            "  0%, 100% {\n"
            "    text-shadow:\n"
            "      0 1px 0 #cccccc,\n"
            "      0 2px 0 #bbbbbb,\n"
            "      0 3px 0 #aaaaaa,\n"
            "      0 4px 0 #999999,\n"
            "      0 5px 8px rgba(0, 0, 0, 0.4);\n"
            "  }\n"
            "  50% {\n"
            "    text-shadow:\n"
            "      0 -1px 0 #cccccc,\n"
            "      0 -2px 0 #bbbbbb,\n"
            "      0 -3px 0 #aaaaaa,\n"
            "      0 -4px 0 #999999,\n"
            "      0 -5px 8px rgba(0, 0, 0, 0.4);\n"
            "  }\n"
            "}"
        ),
    ),
    (
        "Unique Prism Refraction",
        "roy-prism-refraction",
        "unique",
        "box",
        (
            "background: linear-gradient(\n"
            "  120deg,\n"
            "  rgba(255, 0, 0, 0.6) 0%,\n"
            "  rgba(255, 127, 0, 0.6) 17%,\n"
            "  rgba(255, 255, 0, 0.6) 33%,\n"
            "  rgba(0, 255, 0, 0.6) 50%,\n"
            "  rgba(0, 0, 255, 0.6) 67%,\n"
            "  rgba(75, 0, 130, 0.6) 83%,\n"
            "  rgba(148, 0, 211, 0.6) 100%\n"
            ");\n"
            "background-size: 300% 300%;\n"
            "animation: royPrismRefraction 4s ease-in-out infinite;\n"
            "box-shadow: 0 0 30px rgba(255, 255, 255, 0.15);\n"
            "@keyframes royPrismRefraction {\n"
            "  0%, 100% { background-position: 0% 50%; }\n"
            "  50%      { background-position: 100% 50%; }\n"
            "}"
        ),
    ),
    (
        "Unique Typing Cursor",
        "roy-typing-cursor",
        "unique",
        "text",
        (
            "border-right: 3px solid currentColor;\n"
            "padding-right: 4px;\n"
            "animation: royTypingCursor 1s step-end infinite;\n"
            "@keyframes royTypingCursor {\n"
            "  0%, 100% { border-color: currentColor; }\n"
            "  50%      { border-color: transparent; }\n"
            "}"
        ),
    ),
]