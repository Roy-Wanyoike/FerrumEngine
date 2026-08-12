"""
RoyCSS Specialized Effects — Part 7
=====================================
Three categories of advanced CSS effects:
  1. clip_path_effects       — clip-path reveal animations
  2. skeleton_effects        — skeleton / placeholder loading patterns
  3. micro_interaction_effects — CSS-only micro-interaction components

Each tuple: (name, className, category, displayType, cssString)
"""

# ---------------------------------------------------------------------------
# 1. clip-path effects  (displayType: "box")
# ---------------------------------------------------------------------------
clip_path_effects = [
    (
        "Circle Reveal In",
        "rc-circle-reveal-in",
        "clip-path",
        "box",
        """
.rc-circle-reveal-in {
    animation: rcCircleRevealIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
@keyframes rcCircleRevealIn {
    0%   { clip-path: circle(0% at 50% 50%); }
    100% { clip-path: circle(75% at 50% 50%); }
}
""",
    ),
    (
        "Circle Reveal Out",
        "rc-circle-reveal-out",
        "clip-path",
        "box",
        """
.rc-circle-reveal-out {
    animation: rcCircleRevealOut 0.8s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;
}
@keyframes rcCircleRevealOut {
    0%   { clip-path: circle(75% at 50% 50%); }
    100% { clip-path: circle(0% at 50% 50%); }
}
""",
    ),
    (
        "Diamond Reveal",
        "rc-diamond-reveal",
        "clip-path",
        "box",
        """
.rc-diamond-reveal {
    animation: rcDiamondReveal 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
@keyframes rcDiamondReveal {
    0%   { clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%); }
    40%  { clip-path: polygon(50% 10%, 90% 50%, 50% 90%, 10% 50%); }
    100% { clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); }
}
""",
    ),
    (
        "Triangle Reveal",
        "rc-triangle-reveal",
        "clip-path",
        "box",
        """
.rc-triangle-reveal {
    animation: rcTriangleReveal 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
@keyframes rcTriangleReveal {
    0%   { clip-path: polygon(50% 50%, 50% 50%, 50% 50%); }
    50%  { clip-path: polygon(50% 15%, 85% 85%, 15% 85%); }
    100% { clip-path: polygon(50% 0%, 100% 100%, 0% 100%); }
}
""",
    ),
    (
        "Cross Reveal",
        "rc-cross-reveal",
        "clip-path",
        "box",
        """
.rc-cross-reveal {
    animation: rcCrossReveal 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
@keyframes rcCrossReveal {
    0%   { clip-path: polygon(
        40% 0%, 60% 0%, 60% 40%, 100% 40%, 100% 60%,
        60% 60%, 60% 100%, 40% 100%, 40% 60%, 0% 60%,
        0% 40%, 40% 40%
    ); opacity: 0; }
    50%  { clip-path: polygon(
        35% 0%, 65% 0%, 65% 35%, 100% 35%, 100% 65%,
        65% 65%, 65% 100%, 35% 100%, 35% 65%, 0% 65%,
        0% 35%, 35% 35%
    ); opacity: 1; }
    100% { clip-path: polygon(
        0% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%,
        100% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%,
        0% 0%, 0% 0%
    ); opacity: 1; }
}
""",
    ),
    (
        "Hexagon Reveal",
        "rc-hexagon-reveal",
        "clip-path",
        "box",
        """
.rc-hexagon-reveal {
    animation: rcHexagonReveal 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
@keyframes rcHexagonReveal {
    0%   { clip-path: polygon(50% 50%, 50% 50%, 50% 50%,
                              50% 50%, 50% 50%, 50% 50%); }
    60%  { clip-path: polygon(50% 15%, 93% 35%, 93% 65%,
                              50% 85%, 7% 65%, 7% 35%); }
    100% { clip-path: polygon(50% 0%, 100% 25%, 100% 75%,
                              50% 100%, 0% 75%, 0% 25%); }
}
""",
    ),
    (
        "Star Reveal",
        "rc-star-reveal",
        "clip-path",
        "box",
        """
.rc-star-reveal {
    animation: rcStarReveal 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
@keyframes rcStarReveal {
    0%   { clip-path: polygon(50% 50%, 50% 50%, 50% 50%,
                              50% 50%, 50% 50%, 50% 50%,
                              50% 50%, 50% 50%, 50% 50%); }
    50%  { clip-path: polygon(50% 20%, 61% 40%, 80% 40%, 65% 55%,
                              75% 75%, 55% 65%, 50% 85%, 45% 65%,
                              25% 75%, 35% 55%, 20% 40%, 39% 40%); }
    100% { clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%,
                              79% 91%, 50% 70%, 21% 91%, 32% 57%,
                              2% 35%, 39% 35%); }
}
""",
    ),
    (
        "Slide Left Reveal",
        "rc-slide-left-reveal",
        "clip-path",
        "box",
        """
.rc-slide-left-reveal {
    animation: rcSlideLeftReveal 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
@keyframes rcSlideLeftReveal {
    0%   { clip-path: inset(0 100% 0 0); }
    100% { clip-path: inset(0 0% 0 0); }
}
""",
    ),
    (
        "Slide Down Reveal",
        "rc-slide-down-reveal",
        "clip-path",
        "box",
        """
.rc-slide-down-reveal {
    animation: rcSlideDownReveal 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
@keyframes rcSlideDownReveal {
    0%   { clip-path: inset(100% 0 0 0); }
    100% { clip-path: inset(0% 0 0 0); }
}
""",
    ),
    (
        "Wipe Reveal",
        "rc-wipe-reveal",
        "clip-path",
        "box",
        """
.rc-wipe-reveal {
    animation: rcWipeReveal 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}
@keyframes rcWipeReveal {
    0%   { clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%); }
    50%  { clip-path: polygon(0% 0%, 60% 0%, 40% 100%, 0% 100%); }
    100% { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
}
""",
    ),
]

# ---------------------------------------------------------------------------
# 2. skeleton effects  (displayType: "loader")
# ---------------------------------------------------------------------------
skeleton_effects = [
    (
        "Skeleton Pulse",
        "rc-skeleton-pulse",
        "skeleton",
        "loader",
        """
.rc-skeleton-pulse {
    background-color: #e0e0e0;
    animation: rcSkeletonPulse 1.5s ease-in-out infinite;
    border-radius: 4px;
}
@keyframes rcSkeletonPulse {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.4; }
}
""",
    ),
    (
        "Skeleton Shimmer",
        "rc-skeleton-shimmer",
        "skeleton",
        "loader",
        """
.rc-skeleton-shimmer {
    background-color: #e0e0e0;
    background-image: linear-gradient(
        90deg,
        #e0e0e0 0%,
        #f0f0f0 20%,
        #f8f8f8 50%,
        #f0f0f0 80%,
        #e0e0e0 100%
    );
    background-size: 200% 100%;
    animation: rcSkeletonShimmer 1.8s ease-in-out infinite;
    border-radius: 4px;
}
@keyframes rcSkeletonShimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}
""",
    ),
    (
        "Skeleton Wave",
        "rc-skeleton-wave",
        "skeleton",
        "loader",
        """
.rc-skeleton-wave {
    background-color: #e0e0e0;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
}
.rc-skeleton-wave::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.3) 25%,
        rgba(255, 255, 255, 0.6) 50%,
        rgba(255, 255, 255, 0.3) 75%,
        transparent 100%
    );
    animation: rcSkeletonWave 2s ease-in-out infinite;
}
@keyframes rcSkeletonWave {
    0%   { left: -100%; }
    100% { left: 100%; }
}
""",
    ),
    (
        "Skeleton Text",
        "rc-skeleton-text",
        "skeleton",
        "loader",
        """
.rc-skeleton-text {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.rc-skeleton-text::before,
.rc-skeleton-text::after {
    content: '';
    display: block;
    background-color: #e0e0e0;
    border-radius: 4px;
    height: 14px;
    background-image: linear-gradient(
        90deg,
        #e0e0e0 0%,
        #f5f5f5 50%,
        #e0e0e0 100%
    );
    background-size: 200% 100%;
    animation: rcSkeletonText 1.6s ease-in-out infinite;
}
.rc-skeleton-text::before { width: 100%; }
.rc-skeleton-text::after  { width: 65%; animation-delay: 0.15s; }
.rc-skeleton-text > * {
    background-color: #e0e0e0;
    border-radius: 4px;
    height: 14px;
    background-image: linear-gradient(
        90deg,
        #e0e0e0 0%,
        #f5f5f5 50%,
        #e0e0e0 100%
    );
    background-size: 200% 100%;
    animation: rcSkeletonText 1.6s ease-in-out infinite;
}
@keyframes rcSkeletonText {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}
""",
    ),
    (
        "Skeleton Card",
        "rc-skeleton-card",
        "skeleton",
        "loader",
        """
.rc-skeleton-card {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    border: 1px solid #e8e8e8;
}
.rc-skeleton-card-header {
    display: flex;
    align-items: center;
    gap: 12px;
}
.rc-skeleton-card-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: #e0e0e0;
    background-image: linear-gradient(
        90deg, #e0e0e0 0%, #f5f5f5 50%, #e0e0e0 100%
    );
    background-size: 200% 100%;
    animation: rcSkeletonCard 1.6s ease-in-out infinite;
    flex-shrink: 0;
}
.rc-skeleton-card-lines {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.rc-skeleton-card-line {
    height: 12px;
    border-radius: 4px;
    background-color: #e0e0e0;
    background-image: linear-gradient(
        90deg, #e0e0e0 0%, #f5f5f5 50%, #e0e0e0 100%
    );
    background-size: 200% 100%;
    animation: rcSkeletonCard 1.6s ease-in-out infinite;
}
.rc-skeleton-card-body {
    height: 80px;
    border-radius: 4px;
    background-color: #e0e0e0;
    background-image: linear-gradient(
        90deg, #e0e0e0 0%, #f5f5f5 50%, #e0e0e0 100%
    );
    background-size: 200% 100%;
    animation: rcSkeletonCard 1.6s ease-in-out infinite;
    animation-delay: 0.1s;
}
@keyframes rcSkeletonCard {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}
""",
    ),
    (
        "Skeleton Circle",
        "rc-skeleton-circle",
        "skeleton",
        "loader",
        """
.rc-skeleton-circle {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: #e0e0e0;
    position: relative;
    overflow: hidden;
}
.rc-skeleton-circle::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.4) 50%,
        transparent 100%
    );
    animation: rcSkeletonCircle 1.5s ease-in-out infinite;
}
@keyframes rcSkeletonCircle {
    0%   { left: -100%; }
    100% { left: 100%; }
}
""",
    ),
    (
        "Skeleton Grid",
        "rc-skeleton-grid",
        "skeleton",
        "loader",
        """
.rc-skeleton-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}
.rc-skeleton-grid-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.rc-skeleton-grid-img {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 6px;
    background-color: #e0e0e0;
    background-image: linear-gradient(
        90deg, #e0e0e0 0%, #f0f0f0 40%, #f8f8f8 50%, #f0f0f0 60%, #e0e0e0 100%
    );
    background-size: 200% 100%;
    animation: rcSkeletonGrid 1.8s ease-in-out infinite;
}
.rc-skeleton-grid-line {
    height: 12px;
    border-radius: 4px;
    background-color: #e0e0e0;
    background-image: linear-gradient(
        90deg, #e0e0e0 0%, #f0f0f0 40%, #f8f8f8 50%, #f0f0f0 60%, #e0e0e0 100%
    );
    background-size: 200% 100%;
    animation: rcSkeletonGrid 1.8s ease-in-out infinite;
}
.rc-skeleton-grid-item:nth-child(2) .rc-skeleton-grid-img,
.rc-skeleton-grid-item:nth-child(2) .rc-skeleton-grid-line { animation-delay: 0.15s; }
.rc-skeleton-grid-item:nth-child(3) .rc-skeleton-grid-img,
.rc-skeleton-grid-item:nth-child(3) .rc-skeleton-grid-line { animation-delay: 0.3s; }
.rc-skeleton-grid-item:nth-child(4) .rc-skeleton-grid-img,
.rc-skeleton-grid-item:nth-child(4) .rc-skeleton-grid-line { animation-delay: 0.1s; }
.rc-skeleton-grid-item:nth-child(5) .rc-skeleton-grid-img,
.rc-skeleton-grid-item:nth-child(5) .rc-skeleton-grid-line { animation-delay: 0.25s; }
.rc-skeleton-grid-item:nth-child(6) .rc-skeleton-grid-img,
.rc-skeleton-grid-item:nth-child(6) .rc-skeleton-grid-line { animation-delay: 0.4s; }
@keyframes rcSkeletonGrid {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}
""",
    ),
    (
        "Skeleton Gradient",
        "rc-skeleton-gradient",
        "skeleton",
        "loader",
        """
.rc-skeleton-gradient {
    background: linear-gradient(135deg, #d0d0d0 0%, #e8e8e8 50%, #d0d0d0 100%);
    background-size: 200% 200%;
    animation: rcSkeletonGradient 2s ease-in-out infinite;
    border-radius: 4px;
}
@keyframes rcSkeletonGradient {
    0%, 100% { background-position: 0% 50%; }
    50%      { background-position: 100% 50%; }
}
""",
    ),
    (
        "Skeleton Blink",
        "rc-skeleton-blink",
        "skeleton",
        "loader",
        """
.rc-skeleton-blink {
    background-color: #e0e0e0;
    animation: rcSkeletonBlink 1s step-end infinite;
    border-radius: 4px;
}
@keyframes rcSkeletonBlink {
    0%, 100% { opacity: 1; }
    50%      { opacity: 0.2; }
}
""",
    ),
    (
        "Skeleton Fade",
        "rc-skeleton-fade",
        "skeleton",
        "loader",
        """
.rc-skeleton-fade {
    background-color: #e0e0e0;
    animation: rcSkeletonFade 2s ease-in-out infinite;
    border-radius: 4px;
}
@keyframes rcSkeletonFade {
    0%, 100% { opacity: 1; background-color: #e0e0e0; }
    50%      { opacity: 0.3; background-color: #d0d0d0; }
}
""",
    ),
]

# ---------------------------------------------------------------------------
# 3. micro-interaction effects  (displayType: "box")
# ---------------------------------------------------------------------------
micro_interaction_effects = [
    (
        "Toggle Switch",
        "rc-toggle-switch",
        "micro-interaction",
        "box",
        """
.rc-toggle-switch {
    position: relative;
    width: 52px;
    height: 28px;
    appearance: none;
    -webkit-appearance: none;
    background-color: #ccc;
    border-radius: 28px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    outline: none;
    border: none;
}
.rc-toggle-switch::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 22px;
    height: 22px;
    background-color: #fff;
    border-radius: 50%;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.3s ease;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
.rc-toggle-switch:checked {
    background-color: #4caf50;
}
.rc-toggle-switch:checked::before {
    transform: translateX(24px);
    box-shadow: 0 1px 5px rgba(0,0,0,0.25);
}
.rc-toggle-switch:focus-visible {
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.3);
}
""",
    ),
    (
        "Checkbox Anim",
        "rc-checkbox-anim",
        "micro-interaction",
        "box",
        """
.rc-checkbox-anim {
    position: relative;
    width: 22px;
    height: 22px;
    appearance: none;
    -webkit-appearance: none;
    background-color: #fff;
    border: 2px solid #bbb;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease, border-color 0.2s ease;
    outline: none;
}
.rc-checkbox-anim:checked {
    background-color: #2196f3;
    border-color: #2196f3;
    animation: rcCheckboxPop 0.3s ease;
}
.rc-checkbox-anim::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 6px;
    width: 6px;
    height: 10px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg) scale(0);
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
}
.rc-checkbox-anim:checked::before {
    transform: rotate(45deg) scale(1);
}
.rc-checkbox-anim:focus-visible {
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.3);
}
@keyframes rcCheckboxPop {
    0%   { transform: scale(1); }
    50%  { transform: scale(1.15); }
    100% { transform: scale(1); }
}
""",
    ),
    (
        "Radio Pulse",
        "rc-radio-pulse",
        "micro-interaction",
        "box",
        """
.rc-radio-pulse {
    position: relative;
    width: 22px;
    height: 22px;
    appearance: none;
    -webkit-appearance: none;
    background-color: #fff;
    border: 2px solid #bbb;
    border-radius: 50%;
    cursor: pointer;
    transition: border-color 0.2s ease;
    outline: none;
}
.rc-radio-pulse::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    background-color: #2196f3;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.rc-radio-pulse:checked {
    border-color: #2196f3;
    animation: rcRadioPulseRing 0.4s ease;
}
.rc-radio-pulse:checked::after {
    transform: translate(-50%, -50%) scale(1);
}
.rc-radio-pulse:focus-visible {
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.3);
}
@keyframes rcRadioPulseRing {
    0%   { box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.4); }
    70%  { box-shadow: 0 0 0 8px rgba(33, 150, 243, 0); }
    100% { box-shadow: 0 0 0 0 rgba(33, 150, 243, 0); }
}
""",
    ),
    (
        "Input Focus Glow",
        "rc-input-focus-glow",
        "micro-interaction",
        "box",
        """
.rc-input-focus-glow {
    padding: 10px 14px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    background-color: #fff;
}
.rc-input-focus-glow:focus {
    border-color: #7c4dff;
    box-shadow: 0 0 0 3px rgba(124, 77, 255, 0.2),
                0 0 12px rgba(124, 77, 255, 0.15);
}
.rc-input-focus-glow::placeholder {
    color: #aaa;
    transition: color 0.3s ease;
}
.rc-input-focus-glow:focus::placeholder {
    color: #ccc;
}
""",
    ),
    (
        "Input Float Label",
        "rc-input-float-label",
        "micro-interaction",
        "box",
        """
.rc-input-float-label-wrapper {
    position: relative;
}
.rc-input-float-label {
    padding: 18px 14px 6px 14px;
    border: 2px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    background-color: transparent;
    width: 100%;
    box-sizing: border-box;
}
.rc-input-float-label::placeholder {
    color: transparent;
}
.rc-input-float-label-label {
    position: absolute;
    top: 50%;
    left: 14px;
    transform: translateY(-50%);
    font-size: 14px;
    color: #999;
    pointer-events: none;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    background-color: #fff;
    padding: 0 4px;
}
.rc-input-float-label:focus ~ .rc-input-float-label-label,
.rc-input-float-label:not(:placeholder-shown) ~ .rc-input-float-label-label {
    top: 0;
    font-size: 11px;
    color: #7c4dff;
    transform: translateY(-50%);
}
.rc-input-float-label:focus {
    border-color: #7c4dff;
    box-shadow: 0 0 0 3px rgba(124, 77, 255, 0.15);
}
""",
    ),
    (
        "Tooltip Fade",
        "rc-tooltip-fade",
        "micro-interaction",
        "box",
        """
.rc-tooltip-fade-wrapper {
    position: relative;
    display: inline-block;
}
.rc-tooltip-fade {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    background-color: #333;
    color: #fff;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 13px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
    pointer-events: none;
    z-index: 10;
}
.rc-tooltip-fade::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: #333;
}
.rc-tooltip-fade-wrapper:hover .rc-tooltip-fade {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
}
""",
    ),
    (
        "Accordion Slide",
        "rc-accordion-slide",
        "micro-interaction",
        "box",
        """
.rc-accordion-slide {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.3s ease,
                padding 0.3s ease;
    padding: 0 16px;
}
.rc-accordion-trigger:checked ~ .rc-accordion-slide,
.rc-accordion-slide.rc-open {
    max-height: 500px;
    opacity: 1;
    padding: 16px;
}
.rc-accordion-trigger {
    display: none;
}
.rc-accordion-trigger-label {
    display: block;
    padding: 14px 16px;
    cursor: pointer;
    font-weight: 600;
    background-color: #f5f5f5;
    border-radius: 8px;
    transition: background-color 0.2s ease;
    user-select: none;
}
.rc-accordion-trigger-label:hover {
    background-color: #eee;
}
.rc-accordion-trigger:checked ~ .rc-accordion-trigger-label {
    border-radius: 8px 8px 0 0;
    background-color: #e8e8e8;
}
.rc-accordion-trigger-label::after {
    content: '+';
    float: right;
    font-size: 18px;
    line-height: 1;
    transition: transform 0.3s ease;
}
.rc-accordion-trigger:checked ~ .rc-accordion-trigger-label::after {
    content: '\\2212';
    transform: rotate(180deg);
}
""",
    ),
    (
        "Tab Underline",
        "rc-tab-underline",
        "micro-interaction",
        "box",
        """
.rc-tab-underline-group {
    position: relative;
    display: flex;
    gap: 0;
    border-bottom: 2px solid #e0e0e0;
}
.rc-tab-underline {
    padding: 10px 20px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: #777;
    background: none;
    border: none;
    outline: none;
    position: relative;
    transition: color 0.3s ease;
}
.rc-tab-underline::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: #2196f3;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.rc-tab-underline:hover {
    color: #333;
}
.rc-tab-underline:hover::after {
    width: 100%;
    left: 0;
}
.rc-tab-underline.rc-active,
.rc-tab-underline:active {
    color: #2196f3;
}
.rc-tab-underline.rc-active::after,
.rc-tab-underline:active::after {
    width: 100%;
    left: 0;
}
""",
    ),
    (
        "Dropdown Slide",
        "rc-dropdown-slide",
        "micro-interaction",
        "box",
        """
.rc-dropdown-slide-wrapper {
    position: relative;
    display: inline-block;
}
.rc-dropdown-slide {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    min-width: 180px;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    padding: 6px 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition: opacity 0.25s ease,
                transform 0.25s cubic-bezier(0.4, 0, 0.2, 1),
                visibility 0.25s;
    z-index: 20;
}
.rc-dropdown-slide-wrapper:focus-within .rc-dropdown-slide,
.rc-dropdown-slide-wrapper:hover .rc-dropdown-slide {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}
.rc-dropdown-slide-item {
    display: block;
    width: 100%;
    padding: 8px 16px;
    border: none;
    background: none;
    text-align: left;
    font-size: 14px;
    cursor: pointer;
    color: #333;
    transition: background-color 0.15s ease;
}
.rc-dropdown-slide-item:hover {
    background-color: #f0f4ff;
}
.rc-dropdown-slide-item:first-child {
    border-radius: 8px 8px 0 0;
}
.rc-dropdown-slide-item:last-child {
    border-radius: 0 0 8px 8px;
}
""",
    ),
    (
        "Notification Slide In",
        "rc-notification-slide-in",
        "micro-interaction",
        "box",
        """
.rc-notification-slide-in {
    position: relative;
    padding: 14px 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
    border-left: 4px solid #4caf50;
    animation: rcNotificationSlideIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    max-width: 360px;
}
@keyframes rcNotificationSlideIn {
    0% {
        opacity: 0;
        transform: translateX(100%);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}
.rc-notification-slide-in.rc-exit {
    animation: rcNotificationSlideOut 0.4s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;
}
@keyframes rcNotificationSlideOut {
    0% {
        opacity: 1;
        transform: translateX(0);
    }
    100% {
        opacity: 0;
        transform: translateX(100%);
    }
}
""",
    ),
    (
        "Progress Bar Fill",
        "rc-progress-bar-fill",
        "micro-interaction",
        "box",
        """
.rc-progress-bar-fill-track {
    width: 100%;
    height: 10px;
    background-color: #e8e8e8;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
}
.rc-progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #4caf50, #66bb6a);
    border-radius: 10px;
    width: 0%;
    transition: width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    position: relative;
    overflow: hidden;
}
.rc-progress-bar-fill::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.3) 50%,
        transparent 100%
    );
    background-size: 200% 100%;
    animation: rcProgressStripe 1s linear infinite;
}
.rc-progress-bar-fill.rc-animated {
    width: 75%;
}
@keyframes rcProgressStripe {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}
""",
    ),
    (
        "Ripple Click",
        "rc-ripple-click",
        "micro-interaction",
        "box",
        """
.rc-ripple-click {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
}
.rc-ripple-click::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.35);
    transform: translate(-50%, -50%) scale(0);
    transition: width 0.6s ease, height 0.6s ease, opacity 0.6s ease;
    opacity: 0;
    pointer-events: none;
}
.rc-ripple-click:active::after {
    width: 300px;
    height: 300px;
    opacity: 1;
    transition: width 0s, height 0s, opacity 0s;
}
.rc-ripple-click:not(:active)::after {
    transition: width 0.6s ease, height 0.6s ease, opacity 0.6s ease;
}
""",
    ),
]