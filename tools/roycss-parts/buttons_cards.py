"""
RoyCSS Effects Part 5: Buttons & Cards
CSS effect tuples for hover-interactive buttons and modern card UI patterns.
"""

# ---------------------------------------------------------------------------
# CATEGORY 1: Button Effects  (displayType: "button")
# Each button ships with a base appearance (purple/blue theme) so it looks
# like a real clickable button out of the box.  The className is a unique
# BEM-style class used as the root selector for every rule in cssString.
# ---------------------------------------------------------------------------

button_effects = [
    # 1. Button Shine - light streak sweeps across on hover
    (
        "Button Shine",
        "btn-shine",
        "buttons",
        "button",
        """
.btn-shine {
    position: relative;
    overflow: hidden;
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    color: #fff;
    background: linear-gradient(135deg, #7c3aed, #6366f1);
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-shine::before {
    content: '';
    position: absolute;
    top: 0;
    left: -75%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
        120deg,
        transparent,
        rgba(255, 255, 255, 0.35),
        transparent
    );
    transform: skewX(-20deg);
    transition: none;
}
.btn-shine:hover::before {
    animation: btn-shine-sweep 0.6s ease forwards;
}
.btn-shine:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
}
@keyframes btn-shine-sweep {
    to { left: 125%; }
}
""",
    ),

    # 2. Button Ripple Click - expanding circle from click point (:active)
    (
        "Button Ripple Click",
        "btn-ripple",
        "buttons",
        "button",
        """
.btn-ripple {
    position: relative;
    overflow: hidden;
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    color: #fff;
    background: linear-gradient(135deg, #7c3aed, #6366f1);
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.btn-ripple::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.35);
    transform: translate(-50%, -50%);
    transition: width 0.5s ease, height 0.5s ease, opacity 0.5s ease;
    opacity: 0;
}
.btn-ripple:active::after {
    width: 300px;
    height: 300px;
    opacity: 1;
    transition: width 0s, height 0s, opacity 0s;
}
.btn-ripple:hover {
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
    transform: translateY(-1px);
}
""",
    ),

    # 3. Button Fill Left - background slides in from left
    (
        "Button Fill Left",
        "btn-fill-left",
        "buttons",
        "button",
        """
.btn-fill-left {
    position: relative;
    overflow: hidden;
    padding: 10px 24px;
    border: 2px solid #7c3aed;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    color: #7c3aed;
    background: transparent;
    cursor: pointer;
    z-index: 1;
    transition: color 0.3s ease, transform 0.2s ease;
}
.btn-fill-left::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #7c3aed, #6366f1);
    transform: translateX(-101%);
    transition: transform 0.3s ease;
    z-index: -1;
}
.btn-fill-left:hover::before {
    transform: translateX(0);
}
.btn-fill-left:hover {
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
}
""",
    ),

    # 4. Button Fill Right - background slides in from right
    (
        "Button Fill Right",
        "btn-fill-right",
        "buttons",
        "button",
        """
.btn-fill-right {
    position: relative;
    overflow: hidden;
    padding: 10px 24px;
    border: 2px solid #7c3aed;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    color: #7c3aed;
    background: transparent;
    cursor: pointer;
    z-index: 1;
    transition: color 0.3s ease, transform 0.2s ease;
}
.btn-fill-right::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #6366f1, #7c3aed);
    transform: translateX(101%);
    transition: transform 0.3s ease;
    z-index: -1;
}
.btn-fill-right:hover::before {
    transform: translateX(0);
}
.btn-fill-right:hover {
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
}
""",
    ),

    # 5. Button Fill Top - background slides down from top
    (
        "Button Fill Top",
        "btn-fill-top",
        "buttons",
        "button",
        """
.btn-fill-top {
    position: relative;
    overflow: hidden;
    padding: 10px 24px;
    border: 2px solid #7c3aed;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    color: #7c3aed;
    background: transparent;
    cursor: pointer;
    z-index: 1;
    transition: color 0.3s ease, transform 0.2s ease;
}
.btn-fill-top::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #7c3aed, #6366f1);
    transform: translateY(-101%);
    transition: transform 0.3s ease;
    z-index: -1;
}
.btn-fill-top:hover::before {
    transform: translateY(0);
}
.btn-fill-top:hover {
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
}
""",
    ),

    # 6. Button Fill Bottom - background slides up from bottom
    (
        "Button Fill Bottom",
        "btn-fill-bottom",
        "buttons",
        "button",
        """
.btn-fill-bottom {
    position: relative;
    overflow: hidden;
    padding: 10px 24px;
    border: 2px solid #7c3aed;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    color: #7c3aed;
    background: transparent;
    cursor: pointer;
    z-index: 1;
    transition: color 0.3s ease, transform 0.2s ease;
}
.btn-fill-bottom::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #6366f1, #7c3aed);
    transform: translateY(101%);
    transition: transform 0.3s ease;
    z-index: -1;
}
.btn-fill-bottom:hover::before {
    transform: translateY(0);
}
.btn-fill-bottom:hover {
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
}
""",
    ),

    # 7. Button Outline Draw - border draws itself on hover
    (
        "Button Outline Draw",
        "btn-outline-draw",
        "buttons",
        "button",
        """
.btn-outline-draw {
    position: relative;
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    color: #7c3aed;
    background: transparent;
    cursor: pointer;
    z-index: 1;
    transition: color 0.4s ease;
}
.btn-outline-draw::before,
.btn-outline-draw::after {
    content: '';
    position: absolute;
    border-radius: 8px;
    transition: transform 0.4s ease;
}
/* top + bottom lines */
.btn-outline-draw::before {
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    border-top: 2px solid #7c3aed;
    border-bottom: 2px solid #7c3aed;
    transform: scaleX(0);
    transition: transform 0.4s ease, border-color 0.3s ease;
}
/* left + right lines */
.btn-outline-draw::after {
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    border-left: 2px solid #7c3aed;
    border-right: 2px solid #7c3aed;
    transform: scaleY(0);
    transition: transform 0.4s ease 0.15s, border-color 0.3s ease 0.15s;
}
.btn-outline-draw:hover::before {
    transform: scaleX(1);
    border-color: #6366f1;
}
.btn-outline-draw:hover::after {
    transform: scaleY(1);
    border-color: #6366f1;
}
.btn-outline-draw:hover {
    color: #6366f1;
}
""",
    ),

    # 8. Button Glow Pulse - pulsing glow shadow on hover
    (
        "Button Glow Pulse",
        "btn-glow-pulse",
        "buttons",
        "button",
        """
.btn-glow-pulse {
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    color: #fff;
    background: linear-gradient(135deg, #7c3aed, #6366f1);
    cursor: pointer;
    box-shadow: 0 0 0 rgba(124, 58, 237, 0);
    transition: transform 0.2s ease;
}
.btn-glow-pulse:hover {
    animation: btn-glow-pulse-anim 1.2s ease-in-out infinite;
}
@keyframes btn-glow-pulse-anim {
    0%   { box-shadow: 0 0 5px rgba(124, 58, 237, 0.4), 0 0 10px rgba(99, 102, 241, 0.2); }
    50%  { box-shadow: 0 0 20px rgba(124, 58, 237, 0.7), 0 0 40px rgba(99, 102, 241, 0.4); }
    100% { box-shadow: 0 0 5px rgba(124, 58, 237, 0.4), 0 0 10px rgba(99, 102, 241, 0.2); }
}
""",
    ),

    # 9. Button Skew Fill - skewed background slides in on hover
    (
        "Button Skew Fill",
        "btn-skew-fill",
        "buttons",
        "button",
        """
.btn-skew-fill {
    position: relative;
    overflow: hidden;
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    color: #7c3aed;
    background: transparent;
    cursor: pointer;
    z-index: 1;
    transition: color 0.35s ease, transform 0.2s ease;
}
.btn-skew-fill::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 150%;
    height: 100%;
    background: linear-gradient(135deg, #7c3aed, #6366f1);
    transform: translateX(-110%) skewX(-15deg);
    transition: transform 0.45s ease;
    z-index: -1;
}
.btn-skew-fill:hover::before {
    transform: translateX(-20%) skewX(-15deg);
}
.btn-skew-fill:hover {
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
}
""",
    ),

    # 10. Button Slide Icon - content shifts left, icon appears on right
    (
        "Button Slide Icon",
        "btn-slide-icon",
        "buttons",
        "button",
        """
.btn-slide-icon {
    position: relative;
    overflow: hidden;
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    color: #fff;
    background: linear-gradient(135deg, #7c3aed, #6366f1);
    cursor: pointer;
    padding-right: 48px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-slide-icon::after {
    content: '\\2192';
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%) translateX(24px);
    opacity: 0;
    font-size: 16px;
    transition: transform 0.3s ease, opacity 0.3s ease;
    color: #fff;
}
.btn-slide-icon:hover::after {
    transform: translateY(-50%) translateX(0);
    opacity: 1;
}
.btn-slide-icon:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
}
""",
    ),

    # 11. Button Bounce - scale bounce on hover
    (
        "Button Bounce",
        "btn-bounce",
        "buttons",
        "button",
        """
.btn-bounce {
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    color: #fff;
    background: linear-gradient(135deg, #7c3aed, #6366f1);
    cursor: pointer;
    transition: box-shadow 0.2s ease;
}
.btn-bounce:hover {
    animation: btn-bounce-key 0.5s ease;
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
}
@keyframes btn-bounce-key {
    0%   { transform: scale(1); }
    30%  { transform: scale(1.05); }
    50%  { transform: scale(1.0); }
    70%  { transform: scale(1.08); }
    100% { transform: scale(1.06); }
}
""",
    ),

    # 12. Button Press - scale down on :active with spring back
    (
        "Button Press",
        "btn-press",
        "buttons",
        "button",
        """
.btn-press {
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    color: #fff;
    background: linear-gradient(135deg, #7c3aed, #6366f1);
    cursor: pointer;
    transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1),
                box-shadow 0.15s ease;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
}
.btn-press:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.45);
}
.btn-press:active {
    transform: scale(0.95) translateY(0);
    box-shadow: 0 1px 4px rgba(99, 102, 241, 0.2);
}
""",
    ),

    # 13. Button Border Sweep - border color sweeps around
    (
        "Button Border Sweep",
        "btn-border-sweep",
        "buttons",
        "button",
        """
.btn-border-sweep {
    position: relative;
    padding: 10px 24px;
    border: 2px solid #c4b5fd;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    color: #7c3aed;
    background: transparent;
    cursor: pointer;
    overflow: hidden;
    z-index: 1;
    transition: color 0.4s ease;
}
.btn-border-sweep::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -100%;
    width: 100%;
    height: calc(100% + 4px);
    background: linear-gradient(90deg, #7c3aed, #6366f1, #818cf8);
    z-index: -2;
    transition: left 0.5s ease;
}
.btn-border-sweep::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 0;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    background: transparent;
    border-radius: 6px;
    z-index: -1;
    transition: background 0.4s ease;
}
.btn-border-sweep:hover::before {
    left: 0;
}
.btn-border-sweep:hover::after {
    background: #fff;
}
.btn-border-sweep:hover {
    color: #7c3aed;
}
""",
    ),

    # 14. Button Neon Border - glowing neon border on hover
    (
        "Button Neon Border",
        "btn-neon-border",
        "buttons",
        "button",
        """
.btn-neon-border {
    padding: 10px 24px;
    border: 2px solid #7c3aed;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    color: #7c3aed;
    background: transparent;
    cursor: pointer;
    transition: color 0.3s ease,
                border-color 0.3s ease,
                box-shadow 0.3s ease,
                background 0.3s ease;
}
.btn-neon-border:hover {
    color: #fff;
    border-color: #a78bfa;
    background: rgba(124, 58, 237, 0.1);
    box-shadow:
        0 0 5px rgba(124, 58, 237, 0.5),
        0 0 15px rgba(124, 58, 237, 0.3),
        0 0 30px rgba(99, 102, 241, 0.2),
        inset 0 0 10px rgba(124, 58, 237, 0.15);
}
""",
    ),

    # 15. Button Gradient Shift - gradient background shifts on hover
    (
        "Button Gradient Shift",
        "btn-gradient-shift",
        "buttons",
        "button",
        """
.btn-gradient-shift {
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    color: #fff;
    background: linear-gradient(135deg, #7c3aed, #6366f1, #8b5cf6);
    background-size: 200% 200%;
    background-position: 0% 50%;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-gradient-shift:hover {
    background-position: 100% 50%;
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(99, 102, 241, 0.5);
}
""",
    ),

    # 16. Button Underline Center - underline grows from center outward
    (
        "Button Underline Center",
        "btn-underline-center",
        "buttons",
        "button",
        """
.btn-underline-center {
    position: relative;
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    color: #7c3aed;
    background: rgba(124, 58, 237, 0.06);
    cursor: pointer;
    transition: color 0.3s ease, background 0.3s ease;
}
.btn-underline-center::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #7c3aed, #6366f1);
    border-radius: 2px;
    transform: translateX(-50%);
    transition: width 0.3s ease;
}
.btn-underline-center:hover::after {
    width: 70%;
}
.btn-underline-center:hover {
    color: #6366f1;
    background: rgba(124, 58, 237, 0.1);
}
""",
    ),

    # 17. Button Shadow Lift - lifts up with expanding shadow on hover
    (
        "Button Shadow Lift",
        "btn-shadow-lift",
        "buttons",
        "button",
        """
.btn-shadow-lift {
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    color: #fff;
    background: linear-gradient(135deg, #7c3aed, #6366f1);
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(99, 102, 241, 0.2);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.btn-shadow-lift:hover {
    transform: translateY(-4px);
    box-shadow:
        0 4px 8px rgba(99, 102, 241, 0.25),
        0 8px 24px rgba(124, 58, 237, 0.25),
        0 16px 40px rgba(99, 102, 241, 0.15);
}
""",
    ),

    # 18. Button Ghost Fill - transparent bg fills with color on hover
    (
        "Button Ghost Fill",
        "btn-ghost-fill",
        "buttons",
        "button",
        """
.btn-ghost-fill {
    padding: 10px 24px;
    border: 2px solid #7c3aed;
    border-radius: 8px;
    font-weight: 600;
    font-size: 14px;
    color: #7c3aed;
    background: transparent;
    cursor: pointer;
    transition: background 0.3s ease, color 0.3s ease,
                border-color 0.3s ease, transform 0.2s ease,
                box-shadow 0.3s ease;
}
.btn-ghost-fill:hover {
    background: linear-gradient(135deg, #7c3aed, #6366f1);
    color: #fff;
    border-color: transparent;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
}
""",
    ),
]

# ---------------------------------------------------------------------------
# CATEGORY 2: Card Effects  (displayType: "card")
# Each card has a realistic base style so it looks like a proper card
# component with background, padding, rounded corners, and border.
# ---------------------------------------------------------------------------

card_effects = [
    # 1. Card Lift - translateY(-8px) + shadow expansion
    (
        "Card Lift",
        "card-lift",
        "cards",
        "card",
        """
.card-lift {
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-lift:hover {
    transform: translateY(-8px);
    box-shadow:
        0 12px 24px rgba(0, 0, 0, 0.1),
        0 4px 8px rgba(0, 0, 0, 0.06);
}
""",
    ),

    # 2. Card Tilt 3D - perspective + rotate on hover
    (
        "Card Tilt 3D",
        "card-tilt-3d",
        "cards",
        "card",
        """
.card-tilt-3d {
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    transform-style: preserve-3d;
    perspective: 800px;
}
.card-tilt-3d:hover {
    transform: perspective(800px) rotateX(2deg) rotateY(-3deg) translateY(-4px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
}
""",
    ),

    # 3. Card Flip - 180deg Y-axis flip revealing back
    (
        "Card Flip",
        "card-flip",
        "cards",
        "card",
        """
.card-flip {
    perspective: 1000px;
    background: transparent;
    border-radius: 12px;
    padding: 0;
    border: none;
    box-shadow: none;
    min-height: 200px;
}
.card-flip .card-flip-inner {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 200px;
    transition: transform 0.6s ease;
    transform-style: preserve-3d;
}
.card-flip:hover .card-flip-inner {
    transform: rotateY(180deg);
}
.card-flip .card-flip-front,
.card-flip .card-flip-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 12px;
    padding: 24px;
    box-sizing: border-box;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}
.card-flip .card-flip-front {
    background: #fff;
}
.card-flip .card-flip-back {
    background: linear-gradient(135deg, #7c3aed, #6366f1);
    color: #fff;
    transform: rotateY(180deg);
}
""",
    ),

    # 4. Card Spotlight - radial gradient glow follows center on hover
    (
        "Card Spotlight",
        "card-spotlight",
        "cards",
        "card",
        """
.card-spotlight {
    position: relative;
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}
.card-spotlight::before {
    content: '';
    position: absolute;
    top: var(--spot-y, 50%);
    left: var(--spot-x, 50%);
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 1;
}
.card-spotlight:hover::before {
    opacity: 1;
}
.card-spotlight:hover {
    border-color: #c4b5fd;
    box-shadow: 0 8px 24px rgba(124, 58, 237, 0.1);
}
.card-spotlight > * {
    position: relative;
    z-index: 2;
}
""",
    ),

    # 5. Card Reveal - overlay slides up to reveal content on hover
    (
        "Card Reveal",
        "card-reveal",
        "cards",
        "card",
        """
.card-reveal {
    position: relative;
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: box-shadow 0.3s ease;
}
.card-reveal .card-reveal-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(124, 58, 237, 0.95) 0%, rgba(99, 102, 241, 0.85) 100%);
    color: #fff;
    padding: 24px;
    box-sizing: border-box;
    transform: translateY(101%);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
.card-reveal:hover .card-reveal-overlay {
    transform: translateY(0);
}
.card-reveal:hover {
    box-shadow: 0 8px 24px rgba(124, 58, 237, 0.15);
}
""",
    ),

    # 6. Card Border Glow - animated gradient border on hover
    (
        "Card Border Glow",
        "card-border-glow",
        "cards",
        "card",
        """
.card-border-glow {
    position: relative;
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    border: 2px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.3s ease;
    background-clip: padding-box;
}
.card-border-glow::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 14px;
    background: linear-gradient(135deg, #7c3aed, #6366f1, #818cf8, #a78bfa, #7c3aed);
    background-size: 300% 300%;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.4s ease;
    animation: card-border-glow-rotate 3s linear infinite;
}
.card-border-glow:hover::before {
    opacity: 1;
}
.card-border-glow:hover {
    border-color: transparent;
    box-shadow: 0 8px 24px rgba(124, 58, 237, 0.15);
}
@keyframes card-border-glow-rotate {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
""",
    ),

    # 7. Card Split - card splits open revealing content behind
    (
        "Card Split",
        "card-split",
        "cards",
        "card",
        """
.card-split {
    position: relative;
    background: transparent;
    border-radius: 12px;
    padding: 0;
    border: none;
    box-shadow: none;
    min-height: 200px;
}
.card-split .card-split-top,
.card-split .card-split-bottom {
    position: relative;
    width: 100%;
    background: #fff;
    border: 1px solid #e5e7eb;
    box-sizing: border-box;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
}
.card-split .card-split-top {
    border-radius: 12px 12px 0 0;
    padding: 24px 24px 12px;
    z-index: 2;
}
.card-split .card-split-bottom {
    border-radius: 0 0 12px 12px;
    padding: 12px 24px 24px;
    z-index: 2;
}
.card-split .card-split-hidden {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #7c3aed, #6366f1);
    border-radius: 12px;
    color: #fff;
    padding: 24px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
}
.card-split:hover .card-split-top {
    transform: translateY(-20px) rotateX(8deg);
    transform-origin: bottom center;
}
.card-split:hover .card-split-bottom {
    transform: translateY(20px) rotateX(-8deg);
    transform-origin: top center;
}
""",
    ),

    # 8. Card Fold Corner - top-right corner folds down on hover
    (
        "Card Fold Corner",
        "card-fold-corner",
        "cards",
        "card",
        """
.card-fold-corner {
    position: relative;
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    padding-top: 40px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    transition: box-shadow 0.3s ease;
}
.card-fold-corner::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 40px 40px 0;
    border-color: transparent #e5e7eb transparent transparent;
    border-top-right-radius: 12px;
    transition: border-width 0.4s ease, border-color 0.4s ease;
}
.card-fold-corner::after {
    content: '';
    position: absolute;
    top: 0;
    right: 40px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 40px 40px 0 0;
    border-color: #f3f0ff transparent transparent transparent;
    transition: right 0.4s ease, border-width 0.4s ease;
    z-index: 1;
}
.card-fold-corner:hover::before {
    border-width: 0 60px 60px 0;
    border-color: transparent #c4b5fd transparent transparent;
}
.card-fold-corner:hover::after {
    right: 60px;
    border-width: 60px 60px 0 0;
}
.card-fold-corner:hover {
    box-shadow: 0 8px 24px rgba(124, 58, 237, 0.12);
}
""",
    ),

    # 9. Card Slide Up - content slides up from bottom on hover
    (
        "Card Slide Up",
        "card-slide-up",
        "cards",
        "card",
        """
.card-slide-up {
    position: relative;
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: box-shadow 0.3s ease;
}
.card-slide-up .card-slide-up-content {
    transform: translateY(30px);
    opacity: 0;
    transition: transform 0.4s ease, opacity 0.4s ease;
}
.card-slide-up:hover .card-slide-up-content {
    transform: translateY(0);
    opacity: 1;
}
.card-slide-up:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}
""",
    ),

    # 10. Card Glass - becomes glassmorphic on hover
    (
        "Card Glass",
        "card-glass",
        "cards",
        "card",
        """
.card-glass {
    position: relative;
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    transition: background 0.4s ease, border-color 0.4s ease,
                box-shadow 0.4s ease, backdrop-filter 0.4s ease;
}
.card-glass::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2));
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
    z-index: 0;
}
.card-glass:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
}
.card-glass:hover::before {
    opacity: 1;
}
.card-glass > * {
    position: relative;
    z-index: 1;
}
""",
    ),

    # 11. Card Expand - expands slightly showing more content
    (
        "Card Expand",
        "card-expand",
        "cards",
        "card",
        """
.card-expand {
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    transition: transform 0.35s ease, box-shadow 0.35s ease;
}
.card-expand .card-expand-extra {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: max-height 0.4s ease, opacity 0.3s ease, margin 0.3s ease;
    margin-top: 0;
}
.card-expand:hover .card-expand-extra {
    max-height: 200px;
    opacity: 1;
    margin-top: 16px;
}
.card-expand:hover {
    transform: scale(1.02);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.1);
}
""",
    ),

    # 12. Card Skew Reveal - skewed overlay reveals on hover
    (
        "Card Skew Reveal",
        "card-skew-reveal",
        "cards",
        "card",
        """
.card-skew-reveal {
    position: relative;
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: box-shadow 0.3s ease;
}
.card-skew-reveal .card-skew-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.92), rgba(99, 102, 241, 0.88));
    color: #fff;
    padding: 24px;
    box-sizing: border-box;
    transform: translateX(-110%) skewX(-12deg);
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 12px;
}
.card-skew-reveal:hover .card-skew-overlay {
    transform: translateX(0) skewX(0);
}
.card-skew-reveal:hover {
    box-shadow: 0 8px 24px rgba(124, 58, 237, 0.15);
}
""",
    ),

    # 13. Card Holographic - rainbow gradient overlay on hover
    (
        "Card Holographic",
        "card-holographic",
        "cards",
        "card",
        """
.card-holographic {
    position: relative;
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.card-holographic::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
        125deg,
        rgba(255, 0, 128, 0.2),
        rgba(255, 165, 0, 0.2),
        rgba(255, 255, 0, 0.2),
        rgba(0, 200, 83, 0.2),
        rgba(0, 176, 255, 0.2),
        rgba(124, 58, 237, 0.2),
        rgba(255, 0, 128, 0.2)
    );
    background-size: 400% 400%;
    border-radius: 12px;
    opacity: 0;
    transition: opacity 0.4s ease;
    animation: card-holo-shift 4s ease infinite;
    pointer-events: none;
    z-index: 0;
    mix-blend-mode: overlay;
}
.card-holographic:hover::before {
    opacity: 1;
}
.card-holographic:hover {
    box-shadow: 0 8px 28px rgba(124, 58, 237, 0.18);
    transform: translateY(-4px);
}
.card-holographic > * {
    position: relative;
    z-index: 1;
}
@keyframes card-holo-shift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
""",
    ),

    # 14. Card Pulse Border - border pulses with color on hover
    (
        "Card Pulse Border",
        "card-pulse-border",
        "cards",
        "card",
        """
.card-pulse-border {
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    border: 2px solid #e5e7eb;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    transition: border-color 0.3s ease;
}
.card-pulse-border:hover {
    animation: card-pulse-border-anim 1.5s ease-in-out infinite;
}
@keyframes card-pulse-border-anim {
    0%   { border-color: #7c3aed; box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.3); }
    50%  { border-color: #a78bfa; box-shadow: 0 0 0 6px rgba(124, 58, 237, 0); }
    100% { border-color: #7c3aed; box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.3); }
}
""",
    ),
]