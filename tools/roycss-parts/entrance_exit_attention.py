"""
RoyCSS Effects Part 1: Entrance, Exit, and Attention animations.
Each tuple: (name, className, category, displayType, cssString)
cssString includes BOTH the class rule AND the @keyframes rule.
All class names and keyframe names use the `rc-` prefix.
"""

# ─────────────────────────────────────────────
# CATEGORY 1: ENTRANCE EFFECTS  (displayType: "box")
# ─────────────────────────────────────────────

entrance_effects = [
    # ── Original 12 ──

    (
        "Fade In",
        "rc-fade-in",
        "entrance",
        "box",
        "" \
        ".rc-fade-in { animation: rc-fade-in 0.6s ease-out both; }\n"
        "@keyframes rc-fade-in {\n"
        "  from { opacity: 0; }\n"
        "  to   { opacity: 1; }\n"
        "}\n"
    ),

    (
        "Slide In Up",
        "rc-slide-in-up",
        "entrance",
        "box",
        "" \
        ".rc-slide-in-up { animation: rc-slide-in-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }\n"
        "@keyframes rc-slide-in-up {\n"
        "  from { transform: translateY(100%); opacity: 0; }\n"
        "  to   { transform: translateY(0);    opacity: 1; }\n"
        "}\n"
    ),

    (
        "Slide In Down",
        "rc-slide-in-down",
        "entrance",
        "box",
        "" \
        ".rc-slide-in-down { animation: rc-slide-in-down 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }\n"
        "@keyframes rc-slide-in-down {\n"
        "  from { transform: translateY(-100%); opacity: 0; }\n"
        "  to   { transform: translateY(0);    opacity: 1; }\n"
        "}\n"
    ),

    (
        "Slide In Left",
        "rc-slide-in-left",
        "entrance",
        "box",
        "" \
        ".rc-slide-in-left { animation: rc-slide-in-left 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }\n"
        "@keyframes rc-slide-in-left {\n"
        "  from { transform: translateX(-100%); opacity: 0; }\n"
        "  to   { transform: translateX(0);    opacity: 1; }\n"
        "}\n"
    ),

    (
        "Slide In Right",
        "rc-slide-in-right",
        "entrance",
        "box",
        "" \
        ".rc-slide-in-right { animation: rc-slide-in-right 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }\n"
        "@keyframes rc-slide-in-right {\n"
        "  from { transform: translateX(100%); opacity: 0; }\n"
        "  to   { transform: translateX(0);   opacity: 1; }\n"
        "}\n"
    ),

    (
        "Zoom In",
        "rc-zoom-in",
        "entrance",
        "box",
        "" \
        ".rc-zoom-in { animation: rc-zoom-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }\n"
        "@keyframes rc-zoom-in {\n"
        "  from { transform: scale(0);   opacity: 0; }\n"
        "  to   { transform: scale(1);   opacity: 1; }\n"
        "}\n"
    ),

    (
        "Bounce In",
        "rc-bounce-in",
        "entrance",
        "box",
        "" \
        ".rc-bounce-in { animation: rc-bounce-in 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) both; }\n"
        "@keyframes rc-bounce-in {\n"
        "  0%   { transform: scale(0.3); opacity: 0; }\n"
        "  50%  { transform: scale(1.05); }\n"
        "  70%  { transform: scale(0.95); }\n"
        "  100% { transform: scale(1);    opacity: 1; }\n"
        "}\n"
    ),

    (
        "Flip In X",
        "rc-flip-in-x",
        "entrance",
        "box",
        "" \
        ".rc-flip-in-x {\n"
        "  backface-visibility: hidden;\n"
        "  animation: rc-flip-in-x 0.6s ease-in both;\n"
        "}\n"
        "@keyframes rc-flip-in-x {\n"
        "  from { transform: perspective(400px) rotateX(90deg); opacity: 0; }\n"
        "  40%  { transform: perspective(400px) rotateX(-10deg); }\n"
        "  70%  { transform: perspective(400px) rotateX(10deg);  }\n"
        "  to   { transform: perspective(400px) rotateX(0deg);   opacity: 1; }\n"
        "}\n"
    ),

    (
        "Flip In Y",
        "rc-flip-in-y",
        "entrance",
        "box",
        "" \
        ".rc-flip-in-y {\n"
        "  backface-visibility: hidden;\n"
        "  animation: rc-flip-in-y 0.6s ease-in both;\n"
        "}\n"
        "@keyframes rc-flip-in-y {\n"
        "  from { transform: perspective(400px) rotateY(90deg); opacity: 0; }\n"
        "  40%  { transform: perspective(400px) rotateY(-10deg); }\n"
        "  70%  { transform: perspective(400px) rotateY(10deg);  }\n"
        "  to   { transform: perspective(400px) rotateY(0deg);   opacity: 1; }\n"
        "}\n"
    ),

    (
        "Fade In Up",
        "rc-fade-in-up",
        "entrance",
        "box",
        "" \
        ".rc-fade-in-up { animation: rc-fade-in-up 0.5s ease-out both; }\n"
        "@keyframes rc-fade-in-up {\n"
        "  from { transform: translateY(30px); opacity: 0; }\n"
        "  to   { transform: translateY(0);    opacity: 1; }\n"
        "}\n"
    ),

    (
        "Fade In Down",
        "rc-fade-in-down",
        "entrance",
        "box",
        "" \
        ".rc-fade-in-down { animation: rc-fade-in-down 0.5s ease-out both; }\n"
        "@keyframes rc-fade-in-down {\n"
        "  from { transform: translateY(-30px); opacity: 0; }\n"
        "  to   { transform: translateY(0);    opacity: 1; }\n"
        "}\n"
    ),

    (
        "Fade In Left",
        "rc-fade-in-left",
        "entrance",
        "box",
        "" \
        ".rc-fade-in-left { animation: rc-fade-in-left 0.5s ease-out both; }\n"
        "@keyframes rc-fade-in-left {\n"
        "  from { transform: translateX(-30px); opacity: 0; }\n"
        "  to   { transform: translateX(0);    opacity: 1; }\n"
        "}\n"
    ),

    # ── New 8 ──

    (
        "Roll In",
        "rc-roll-in",
        "entrance",
        "box",
        "" \
        ".rc-roll-in { animation: rc-roll-in 0.65s ease-out both; }\n"
        "@keyframes rc-roll-in {\n"
        "  from { transform: rotateX(90deg) translateZ(-100px); opacity: 0; }\n"
        "  to   { transform: rotateX(0deg)   translateZ(0);      opacity: 1; }\n"
        "}\n"
    ),

    (
        "Light Speed In",
        "rc-light-speed-in",
        "entrance",
        "box",
        "" \
        ".rc-light-speed-in { animation: rc-light-speed-in 0.6s ease-out both; }\n"
        "@keyframes rc-light-speed-in {\n"
        "  0%   { transform: translateX(100%) skewX(-30deg); opacity: 0; }\n"
        "  60%  { transform: skewX(20deg);                    opacity: 1; }\n"
        "  80%  { transform: skewX(-5deg); }\n"
        "  100% { transform: translateX(0) skewX(0deg);      opacity: 1; }\n"
        "}\n"
    ),

    (
        "Rotate In",
        "rc-rotate-in",
        "entrance",
        "box",
        "" \
        ".rc-rotate-in { animation: rc-rotate-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }\n"
        "@keyframes rc-rotate-in {\n"
        "  from { transform: rotate(-200deg) scale(0); opacity: 0; }\n"
        "  to   { transform: rotate(0deg)     scale(1); opacity: 1; }\n"
        "}\n"
    ),

    (
        "Rotate In Down Left",
        "rc-rotate-in-down-left",
        "entrance",
        "box",
        "" \
        ".rc-rotate-in-down-left {\n"
        "  transform-origin: left bottom;\n"
        "  animation: rc-rotate-in-down-left 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;\n"
        "}\n"
        "@keyframes rc-rotate-in-down-left {\n"
        "  from { transform: rotate(-45deg) translateY(-100%); opacity: 0; }\n"
        "  to   { transform: rotate(0deg)   translateY(0);      opacity: 1; }\n"
        "}\n"
    ),

    (
        "Rotate In Up Right",
        "rc-rotate-in-up-right",
        "entrance",
        "box",
        "" \
        ".rc-rotate-in-up-right {\n"
        "  transform-origin: right bottom;\n"
        "  animation: rc-rotate-in-up-right 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;\n"
        "}\n"
        "@keyframes rc-rotate-in-up-right {\n"
        "  from { transform: rotate(45deg) translateY(100%); opacity: 0; }\n"
        "  to   { transform: rotate(0deg)  translateY(0);     opacity: 1; }\n"
        "}\n"
    ),

    (
        "Fade In Scale",
        "rc-fade-in-scale",
        "entrance",
        "box",
        "" \
        ".rc-fade-in-scale { animation: rc-fade-in-scale 0.6s ease-out both; }\n"
        "@keyframes rc-fade-in-scale {\n"
        "  from { transform: scale(0.8); filter: blur(4px); opacity: 0; }\n"
        "  to   { transform: scale(1);   filter: blur(0);   opacity: 1; }\n"
        "}\n"
    ),

    (
        "Drop In",
        "rc-drop-in",
        "entrance",
        "box",
        "" \
        ".rc-drop-in { animation: rc-drop-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both; }\n"
        "@keyframes rc-drop-in {\n"
        "  0%   { transform: translateY(-300px); opacity: 0; }\n"
        "  60%  { transform: translateY(20px);   opacity: 1; }\n"
        "  80%  { transform: translateY(-10px); }\n"
        "  100% { transform: translateY(0);     opacity: 1; }\n"
        "}\n"
    ),

    (
        "Expand In",
        "rc-expand-in",
        "entrance",
        "box",
        "" \
        ".rc-expand-in { animation: rc-expand-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both; }\n"
        "@keyframes rc-expand-in {\n"
        "  from { transform: scaleX(0) scaleY(0); opacity: 0; }\n"
        "  to   { transform: scaleX(1) scaleY(1); opacity: 1; }\n"
        "}\n"
    ),
]


# ─────────────────────────────────────────────
# CATEGORY 2: EXIT EFFECTS  (displayType: "box")
# ─────────────────────────────────────────────

exit_effects = [
    # ── Original 8 ──

    (
        "Fade Out",
        "rc-fade-out",
        "exit",
        "box",
        "" \
        ".rc-fade-out { animation: rc-fade-out 0.6s ease-in both; }\n"
        "@keyframes rc-fade-out {\n"
        "  from { opacity: 1; }\n"
        "  to   { opacity: 0; }\n"
        "}\n"
    ),

    (
        "Slide Out Up",
        "rc-slide-out-up",
        "exit",
        "box",
        "" \
        ".rc-slide-out-up { animation: rc-slide-out-up 0.5s cubic-bezier(0.55, 0, 1, 0.45) both; }\n"
        "@keyframes rc-slide-out-up {\n"
        "  from { transform: translateY(0);    opacity: 1; }\n"
        "  to   { transform: translateY(-100%); opacity: 0; }\n"
        "}\n"
    ),

    (
        "Slide Out Down",
        "rc-slide-out-down",
        "exit",
        "box",
        "" \
        ".rc-slide-out-down { animation: rc-slide-out-down 0.5s cubic-bezier(0.55, 0, 1, 0.45) both; }\n"
        "@keyframes rc-slide-out-down {\n"
        "  from { transform: translateY(0);    opacity: 1; }\n"
        "  to   { transform: translateY(100%); opacity: 0; }\n"
        "}\n"
    ),

    (
        "Slide Out Left",
        "rc-slide-out-left",
        "exit",
        "box",
        "" \
        ".rc-slide-out-left { animation: rc-slide-out-left 0.5s cubic-bezier(0.55, 0, 1, 0.45) both; }\n"
        "@keyframes rc-slide-out-left {\n"
        "  from { transform: translateX(0);    opacity: 1; }\n"
        "  to   { transform: translateX(-100%); opacity: 0; }\n"
        "}\n"
    ),

    (
        "Slide Out Right",
        "rc-slide-out-right",
        "exit",
        "box",
        "" \
        ".rc-slide-out-right { animation: rc-slide-out-right 0.5s cubic-bezier(0.55, 0, 1, 0.45) both; }\n"
        "@keyframes rc-slide-out-right {\n"
        "  from { transform: translateX(0);    opacity: 1; }\n"
        "  to   { transform: translateX(100%); opacity: 0; }\n"
        "}\n"
    ),

    (
        "Zoom Out",
        "rc-zoom-out",
        "exit",
        "box",
        "" \
        ".rc-zoom-out { animation: rc-zoom-out 0.5s cubic-bezier(0.55, 0, 1, 0.45) both; }\n"
        "@keyframes rc-zoom-out {\n"
        "  from { transform: scale(1);   opacity: 1; }\n"
        "  to   { transform: scale(0);   opacity: 0; }\n"
        "}\n"
    ),

    (
        "Flip Out X",
        "rc-flip-out-x",
        "exit",
        "box",
        "" \
        ".rc-flip-out-x {\n"
        "  backface-visibility: hidden;\n"
        "  animation: rc-flip-out-x 0.6s ease-in both;\n"
        "}\n"
        "@keyframes rc-flip-out-x {\n"
        "  from { transform: perspective(400px) rotateX(0deg);   opacity: 1; }\n"
        "  to   { transform: perspective(400px) rotateX(90deg);  opacity: 0; }\n"
        "}\n"
    ),

    (
        "Flip Out Y",
        "rc-flip-out-y",
        "exit",
        "box",
        "" \
        ".rc-flip-out-y {\n"
        "  backface-visibility: hidden;\n"
        "  animation: rc-flip-out-y 0.6s ease-in both;\n"
        "}\n"
        "@keyframes rc-flip-out-y {\n"
        "  from { transform: perspective(400px) rotateY(0deg);   opacity: 1; }\n"
        "  to   { transform: perspective(400px) rotateY(90deg);  opacity: 0; }\n"
        "}\n"
    ),

    # ── New 7 ──

    (
        "Light Speed Out",
        "rc-light-speed-out",
        "exit",
        "box",
        "" \
        ".rc-light-speed-out { animation: rc-light-speed-out 0.5s ease-in both; }\n"
        "@keyframes rc-light-speed-out {\n"
        "  0%   { transform: translateX(0) skewX(0deg);   opacity: 1; }\n"
        "  100% { transform: translateX(100%) skewX(30deg); opacity: 0; }\n"
        "}\n"
    ),

    (
        "Roll Out",
        "rc-roll-out",
        "exit",
        "box",
        "" \
        ".rc-roll-out { animation: rc-roll-out 0.65s ease-in both; }\n"
        "@keyframes rc-roll-out {\n"
        "  from { transform: rotateX(0deg)   translateZ(0);      opacity: 1; }\n"
        "  to   { transform: rotateX(90deg)  translateZ(-100px); opacity: 0; }\n"
        "}\n"
    ),

    (
        "Rotate Out",
        "rc-rotate-out",
        "exit",
        "box",
        "" \
        ".rc-rotate-out { animation: rc-rotate-out 0.7s ease-in both; }\n"
        "@keyframes rc-rotate-out {\n"
        "  from { transform: rotate(0deg)  scale(1); opacity: 1; }\n"
        "  to   { transform: rotate(200deg) scale(0); opacity: 0; }\n"
        "}\n"
    ),

    (
        "Fade Out Scale",
        "rc-fade-out-scale",
        "exit",
        "box",
        "" \
        ".rc-fade-out-scale { animation: rc-fade-out-scale 0.5s ease-in both; }\n"
        "@keyframes rc-fade-out-scale {\n"
        "  from { transform: scale(1);   filter: blur(0);   opacity: 1; }\n"
        "  to   { transform: scale(1.2); filter: blur(4px); opacity: 0; }\n"
        "}\n"
    ),

    (
        "Shrink Out",
        "rc-shrink-out",
        "exit",
        "box",
        "" \
        ".rc-shrink-out { animation: rc-shrink-out 0.5s ease-in both; }\n"
        "@keyframes rc-shrink-out {\n"
        "  from { transform: scale(1); opacity: 1; }\n"
        "  to   { transform: scale(0); opacity: 0; }\n"
        "}\n"
    ),

    (
        "Fold Out",
        "rc-fold-out",
        "exit",
        "box",
        "" \
        ".rc-fold-out {\n"
        "  transform-origin: left center;\n"
        "  animation: rc-fold-out 0.55s ease-in both;\n"
        "}\n"
        "@keyframes rc-fold-out {\n"
        "  from { transform: perspective(400px) rotateY(0deg);  opacity: 1; }\n"
        "  to   { transform: perspective(400px) rotateY(90deg); opacity: 0; }\n"
        "}\n"
    ),

    (
        "Fly Out Up",
        "rc-fly-out-up",
        "exit",
        "box",
        "" \
        ".rc-fly-out-up { animation: rc-fly-out-up 0.4s ease-in both; }\n"
        "@keyframes rc-fly-out-up {\n"
        "  from { transform: translateY(0);     opacity: 1; }\n"
        "  to   { transform: translateY(-200%); opacity: 0; }\n"
        "}\n"
    ),
]


# ─────────────────────────────────────────────
# CATEGORY 3: ATTENTION EFFECTS  (displayType: "box")
# ─────────────────────────────────────────────

attention_effects = [
    # ── Original 9 ──

    (
        "Bounce",
        "rc-bounce",
        "attention",
        "box",
        "" \
        ".rc-bounce { animation: rc-bounce 1s ease infinite; }\n"
        "@keyframes rc-bounce {\n"
        "  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }\n"
        "  40%  { transform: translateY(-20px); }\n"
        "  60%  { transform: translateY(-10px); }\n"
        "}\n"
    ),

    (
        "Pulse",
        "rc-pulse",
        "attention",
        "box",
        "" \
        ".rc-pulse { animation: rc-pulse 1.2s ease-in-out infinite; }\n"
        "@keyframes rc-pulse {\n"
        "  0%   { transform: scale(1); }\n"
        "  50%  { transform: scale(1.05); }\n"
        "  100% { transform: scale(1); }\n"
        "}\n"
    ),

    (
        "Shake",
        "rc-shake",
        "attention",
        "box",
        "" \
        ".rc-shake { animation: rc-shake 0.6s ease-in-out infinite; }\n"
        "@keyframes rc-shake {\n"
        "  0%, 100% { transform: translateX(0); }\n"
        "  10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }\n"
        "  20%, 40%, 60%, 80%     { transform: translateX(6px); }\n"
        "}\n"
    ),

    (
        "Swing",
        "rc-swing",
        "attention",
        "box",
        "" \
        ".rc-swing {\n"
        "  transform-origin: top center;\n"
        "  animation: rc-swing 1s ease-in-out infinite;\n"
        "}\n"
        "@keyframes rc-swing {\n"
        "  20%  { transform: rotate(15deg); }\n"
        "  40%  { transform: rotate(-10deg); }\n"
        "  60%  { transform: rotate(5deg); }\n"
        "  80%  { transform: rotate(-5deg); }\n"
        "  100% { transform: rotate(0deg); }\n"
        "}\n"
    ),

    (
        "Tada",
        "rc-tada",
        "attention",
        "box",
        "" \
        ".rc-tada { animation: rc-tada 1s ease-in-out infinite; }\n"
        "@keyframes rc-tada {\n"
        "  0%   { transform: scale(1) rotate(0deg); }\n"
        "  10%, 20% { transform: scale(0.9) rotate(-3deg); }\n"
        "  30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }\n"
        "  40%, 60%, 80%     { transform: scale(1.1) rotate(-3deg); }\n"
        "  100% { transform: scale(1) rotate(0deg); }\n"
        "}\n"
    ),

    (
        "Wobble",
        "rc-wobble",
        "attention",
        "box",
        "" \
        ".rc-wobble { animation: rc-wobble 0.8s ease-in-out infinite; }\n"
        "@keyframes rc-wobble {\n"
        "  0%   { transform: translateX(0) rotate(0deg); }\n"
        "  15%  { transform: translateX(-15px) rotate(-5deg); }\n"
        "  30%  { transform: translateX(12px)  rotate(3deg); }\n"
        "  45%  { transform: translateX(-8px)  rotate(-3deg); }\n"
        "  60%  { transform: translateX(5px)   rotate(2deg); }\n"
        "  75%  { transform: translateX(-3px)  rotate(-1deg); }\n"
        "  100% { transform: translateX(0)    rotate(0deg); }\n"
        "}\n"
    ),

    (
        "Heartbeat",
        "rc-heartbeat",
        "attention",
        "box",
        "" \
        ".rc-heartbeat { animation: rc-heartbeat 1.3s ease-in-out infinite; }\n"
        "@keyframes rc-heartbeat {\n"
        "  0%   { transform: scale(1); }\n"
        "  14%  { transform: scale(1.15); }\n"
        "  28%  { transform: scale(1); }\n"
        "  42%  { transform: scale(1.15); }\n"
        "  70%  { transform: scale(1); }\n"
        "}\n"
    ),

    (
        "Shake X",
        "rc-shake-x",
        "attention",
        "box",
        "" \
        ".rc-shake-x { animation: rc-shake-x 0.5s ease-in-out infinite; }\n"
        "@keyframes rc-shake-x {\n"
        "  0%, 100% { transform: translateX(0); }\n"
        "  10%, 50%, 90% { transform: translateX(-8px); }\n"
        "  30%, 70%     { transform: translateX(8px); }\n"
        "}\n"
    ),

    (
        "Shake Y",
        "rc-shake-y",
        "attention",
        "box",
        "" \
        ".rc-shake-y { animation: rc-shake-y 0.5s ease-in-out infinite; }\n"
        "@keyframes rc-shake-y {\n"
        "  0%, 100% { transform: translateY(0); }\n"
        "  10%, 50%, 90% { transform: translateY(-8px); }\n"
        "  30%, 70%     { transform: translateY(8px); }\n"
        "}\n"
    ),

    # ── New 8 ──

    (
        "Jelly",
        "rc-jelly",
        "attention",
        "box",
        "" \
        ".rc-jelly { animation: rc-jelly 0.9s ease-in-out infinite; }\n"
        "@keyframes rc-jelly {\n"
        "  0%   { transform: scale(1, 1); }\n"
        "  25%  { transform: scale(1.25, 0.75); }\n"
        "  50%  { transform: scale(0.9, 1.1); }\n"
        "  75%  { transform: scale(1.05, 0.95); }\n"
        "  100% { transform: scale(1, 1); }\n"
        "}\n"
    ),

    (
        "Rubber Band",
        "rc-rubber-band",
        "attention",
        "box",
        "" \
        ".rc-rubber-band { animation: rc-rubber-band 1s ease-in-out infinite; }\n"
        "@keyframes rc-rubber-band {\n"
        "  0%   { transform: scaleX(1); }\n"
        "  20%  { transform: scaleX(1.25) scaleY(0.75); }\n"
        "  40%  { transform: scaleX(0.75) scaleY(1.25); }\n"
        "  60%  { transform: scaleX(1.15) scaleY(0.85); }\n"
        "  80%  { transform: scaleX(0.95) scaleY(1.05); }\n"
        "  100% { transform: scaleX(1)    scaleY(1); }\n"
        "}\n"
    ),

    (
        "Pulse Glow",
        "rc-pulse-glow",
        "attention",
        "box",
        "" \
        ".rc-pulse-glow { animation: rc-pulse-glow 1.5s ease-in-out infinite; }\n"
        "@keyframes rc-pulse-glow {\n"
        "  0%, 100% {\n"
        "    box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.5);\n"
        "  }\n"
        "  50% {\n"
        "    box-shadow: 0 0 20px 10px rgba(147, 51, 234, 0.2);\n"
        "  }\n"
        "}\n"
    ),

    (
        "Wiggle",
        "rc-wiggle",
        "attention",
        "box",
        "" \
        ".rc-wiggle { animation: rc-wiggle 0.4s ease-in-out infinite; }\n"
        "@keyframes rc-wiggle {\n"
        "  0%, 100% { transform: rotate(0deg); }\n"
        "  25%      { transform: rotate(5deg); }\n"
        "  75%      { transform: rotate(-5deg); }\n"
        "}\n"
    ),

    (
        "Jello",
        "rc-jello",
        "attention",
        "box",
        "" \
        ".rc-jello { animation: rc-jello 1s ease-in-out infinite; }\n"
        "@keyframes rc-jello {\n"
        "  0%, 100% { transform: skewX(0deg)    skewY(0deg); }\n"
        "  15%      { transform: skewX(-12deg)   skewY(-12deg); }\n"
        "  30%      { transform: skewX(8deg)     skewY(8deg); }\n"
        "  45%      { transform: skewX(-5deg)    skewY(-5deg); }\n"
        "  60%      { transform: skewX(3deg)     skewY(3deg); }\n"
        "  75%      { transform: skewX(-1deg)    skewY(-1deg); }\n"
        "}\n"
    ),

    (
        "Sonar",
        "rc-sonar",
        "attention",
        "box",
        "" \
        ".rc-sonar { animation: rc-sonar 1.6s ease-out infinite; }\n"
        "@keyframes rc-sonar {\n"
        "  0%   {\n"
        "    transform: scale(1);\n"
        "    opacity: 0.8;\n"
        "    box-shadow: 0 0 0 0 rgba(100, 100, 255, 0.6);\n"
        "  }\n"
        "  70%  {\n"
        "    transform: scale(1.1);\n"
        "    opacity: 0;\n"
        "    box-shadow: 0 0 0 20px rgba(100, 100, 255, 0);\n"
        "  }\n"
        "  100% {\n"
        "    transform: scale(1);\n"
        "    opacity: 0;\n"
        "    box-shadow: 0 0 0 0 rgba(100, 100, 255, 0);\n"
        "  }\n"
        "}\n"
    ),

    (
        "Flash",
        "rc-flash",
        "attention",
        "box",
        "" \
        ".rc-flash { animation: rc-flash 1.2s ease-in-out infinite; }\n"
        "@keyframes rc-flash {\n"
        "  0%, 100% { opacity: 1; }\n"
        "  25%      { opacity: 0; }\n"
        "  50%      { opacity: 1; }\n"
        "  75%      { opacity: 0; }\n"
        "}\n"
    ),

    (
        "Strobe",
        "rc-strobe",
        "attention",
        "box",
        "" \
        ".rc-strobe { animation: rc-strobe 0.6s step-end infinite; }\n"
        "@keyframes rc-strobe {\n"
        "  0%, 100% { opacity: 1; }\n"
        "  25%      { opacity: 0; }\n"
        "  50%      { opacity: 1; }\n"
        "  75%      { opacity: 0; }\n"
        "}\n"
    ),
]