/* ===== Ferrum VFX — Blur Engine ===== */
/* Blur effects using filter: blur(), backdrop-filter, and transitions */

export function generateBlurCSS(prefix: string = 'fr-'): string {
  const p = prefix;

  return `@layer ferrum.vfx {

  /* --- fx-blur-motion: blur increases during animation (via transition) --- */
  @keyframes ${p}fx-blur-motion-in {
    0%   { filter: blur(0px); transform: translateX(0); }
    50%  { filter: blur(8px); transform: translateX(40px); }
    100% { filter: blur(0px); transform: translateX(80px); }
  }
  .${p}fx-blur-motion {
    --ferrum-motion-blur-amount: 8px;
    animation: ${p}fx-blur-motion-in 2s ease-in-out infinite;
  }

  /* --- fx-blur-radial: backdrop-filter with radial gradient mask --- */
  .${p}fx-blur-radial {
    --ferrum-radial-blur: 20px;
    --ferrum-radial-size: 60%;
    -webkit-mask-image: radial-gradient(circle, black 0%, black var(--ferrum-radial-size), transparent 100%);
    mask-image: radial-gradient(circle, black 0%, black var(--ferrum-radial-size), transparent 100%);
    backdrop-filter: blur(var(--ferrum-radial-blur));
    -webkit-backdrop-filter: blur(var(--ferrum-radial-blur));
  }

  /* --- fx-blur-directional: blur with directional gradient reveal --- */
  .${p}fx-blur-directional {
    --ferrum-dir-blur: 12px;
    --ferrum-dir-angle: to right;
    filter: blur(var(--ferrum-dir-blur));
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 30%, black 100%);
    mask-image: linear-gradient(to right, transparent 0%, black 30%, black 100%);
    transition: filter 0.4s ease;
  }
  .${p}fx-blur-directional:hover {
    filter: blur(0px);
    -webkit-mask-image: linear-gradient(to right, black 0%, black 100%);
    mask-image: linear-gradient(to right, black 0%, black 100%);
  }

  /* --- fx-blur-focus: blur(0) on focused element, blur(4px) on siblings --- */
  .${p}fx-blur-focus-group .${p}fx-blur-focus {
    --ferrum-focus-blur: 4px;
    filter: blur(var(--ferrum-focus-blur));
    transition: filter 0.3s ease;
  }
  .${p}fx-blur-focus-group .${p}fx-blur-focus:focus-within,
  .${p}fx-blur-focus:focus {
    filter: blur(0px);
    z-index: 1;
    position: relative;
  }
  .${p}fx-blur-focus-group:hover .${p}fx-blur-focus:not(:hover):not(:focus):not(:focus-within) {
    filter: blur(var(--ferrum-focus-blur));
  }
  .${p}fx-blur-focus-group:hover .${p}fx-blur-focus:hover {
    filter: blur(0px);
    z-index: 1;
    position: relative;
  }

  /* --- fx-blur-frost: backdrop-filter: blur(20px) saturate(180%) --- */
  .${p}fx-blur-frost {
    --ferrum-frost-blur: 20px;
    --ferrum-frost-saturate: 180%;
    --ferrum-frost-bg: rgba(255, 255, 255, 0.05);
    --ferrum-frost-border: rgba(255, 255, 255, 0.1);
    background: var(--ferrum-frost-bg);
    border: 1px solid var(--ferrum-frost-border);
    backdrop-filter: blur(var(--ferrum-frost-blur)) saturate(var(--ferrum-frost-saturate));
    -webkit-backdrop-filter: blur(var(--ferrum-frost-blur)) saturate(var(--ferrum-frost-saturate));
  }

  /* --- fx-blur-progressive: animated blur from 0→20px --- */
  @keyframes ${p}fx-blur-progressive {
    0%   { filter: blur(0px); opacity: 1; }
    100% { filter: blur(20px); opacity: 0.5; }
  }
  .${p}fx-blur-progressive {
    --ferrum-prog-duration: 3s;
    animation: ${p}fx-blur-progressive var(--ferrum-prog-duration) ease-in forwards;
  }

  /* --- fx-blur-background: filter: blur() on background element --- */
  .${p}fx-blur-background {
    position: relative;
  }
  .${p}fx-blur-background > *:first-child {
    --ferrum-bg-blur: 16px;
    position: absolute;
    inset: 0;
    filter: blur(var(--ferrum-bg-blur));
    z-index: -1;
    transform: scale(1.05);
  }
  .${p}fx-blur-background > *:nth-child(2) {
    position: relative;
    z-index: 1;
  }

  /* --- fx-blur-layer: multiple elements at different blur levels --- */
  .${p}fx-blur-layer {
    --ferrum-layer-blur-1: 0px;
    --ferrum-layer-blur-2: 4px;
    --ferrum-layer-blur-3: 10px;
  }
  .${p}fx-blur-layer > *:nth-child(1) {
    filter: blur(var(--ferrum-layer-blur-1));
    z-index: 3;
    position: relative;
  }
  .${p}fx-blur-layer > *:nth-child(2) {
    filter: blur(var(--ferrum-layer-blur-2));
    z-index: 2;
    position: absolute;
    inset: 0;
  }
  .${p}fx-blur-layer > *:nth-child(3) {
    filter: blur(var(--ferrum-layer-blur-3));
    z-index: 1;
    position: absolute;
    inset: 0;
  }

  /* --- fx-blur-zoom: zoom blur effect using radial gradient mask + scale --- */
  @keyframes ${p}fx-blur-zoom {
    0%   { filter: blur(0px); transform: scale(1); }
    50%  { filter: blur(6px); transform: scale(1.08); }
    100% { filter: blur(0px); transform: scale(1); }
  }
  .${p}fx-blur-zoom {
    --ferrum-zoom-blur: 6px;
    --ferrum-zoom-scale: 1.08;
    --ferrum-zoom-duration: 3s;
    -webkit-mask-image: radial-gradient(circle, black 30%, transparent 80%);
    mask-image: radial-gradient(circle, black 30%, transparent 80%);
    animation: ${p}fx-blur-zoom var(--ferrum-zoom-duration) ease-in-out infinite;
    transform-origin: center center;
  }

  /* --- fx-blur-lens: lens blur with circular gradient mask --- */
  .${p}fx-blur-lens {
    --ferrum-lens-blur: 16px;
    --ferrum-lens-size: 50%;
    -webkit-mask-image: radial-gradient(circle, transparent 0%, transparent calc(var(--ferrum-lens-size) - 15%), black calc(var(--ferrum-lens-size) - 5%), black 100%);
    mask-image: radial-gradient(circle, transparent 0%, transparent calc(var(--ferrum-lens-size) - 15%), black calc(var(--ferrum-lens-size) - 5%), black 100%);
    filter: blur(var(--ferrum-lens-blur));
    transition: filter 0.4s ease;
  }
  .${p}fx-blur-lens:hover {
    filter: blur(0px);
  }

  /* --- fx-blur-dynamic: dynamic blur controlled by CSS variable (for JS integration) --- */
  .${p}fx-blur-dynamic {
    --ferrum-dynamic-blur: 0px;
    filter: blur(var(--ferrum-dynamic-blur));
    transition: filter 0.2s ease;
    will-change: filter;
  }

  /* --- fx-blur-tilt-shift: tilt-shift miniature effect using linear-gradient mask --- */
  .${p}fx-blur-tilt-shift {
    --ferrum-tilt-blur: 10px;
    --ferrum-tilt-sharp: 40%;
    -webkit-mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      black var(--ferrum-tilt-sharp),
      black calc(100% - var(--ferrum-tilt-sharp)),
      transparent 100%
    );
    mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      black var(--ferrum-tilt-sharp),
      black calc(100% - var(--ferrum-tilt-sharp)),
      transparent 100%
    );
    filter: blur(var(--ferrum-tilt-blur));
  }

  /* --- fx-blur-glass-morph: glassmorphism blur with tinted background --- */
  .${p}fx-blur-glass-morph {
    --ferrum-glass-blur: 24px;
    --ferrum-glass-saturate: 200%;
    --ferrum-glass-bg: rgba(255, 255, 255, 0.08);
    --ferrum-glass-border: rgba(255, 255, 255, 0.18);
    --ferrum-glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    background: var(--ferrum-glass-bg);
    border: 1px solid var(--ferrum-glass-border);
    border-radius: 16px;
    box-shadow: var(--ferrum-glass-shadow);
    backdrop-filter: blur(var(--ferrum-glass-blur)) saturate(var(--ferrum-glass-saturate));
    -webkit-backdrop-filter: blur(var(--ferrum-glass-blur)) saturate(var(--ferrum-glass-saturate));
  }

  /* --- fx-blur-reveal: blur that clears on hover (starts blurred, hover = clear) --- */
  .${p}fx-blur-reveal {
    --ferrum-reveal-blur: 12px;
    filter: blur(var(--ferrum-reveal-blur));
    opacity: 0.7;
    transition: filter 0.5s ease, opacity 0.5s ease;
  }
  .${p}fx-blur-reveal:hover {
    filter: blur(0px);
    opacity: 1;
  }

}`;
}