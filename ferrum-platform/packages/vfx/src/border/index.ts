/* ===== Ferrum VFX — Border Engine ===== */
/* Innovative border effects using box-shadow, border-image, and animations */

export function generateBorderCSS(prefix: string = 'fr-'): string {
  const p = prefix;

  return `@layer ferrum.vfx {

  /* --- fx-border-glow: box-shadow as border glow --- */
  .${p}fx-border-glow {
    --ferrum-border-glow-color: rgba(99, 102, 241, 0.6);
    --ferrum-border-glow-spread: 4px;
    border: 1px solid transparent;
    box-shadow:
      0 0 var(--ferrum-border-glow-spread) var(--ferrum-border-glow-color),
      inset 0 0 var(--ferrum-border-glow-spread) rgba(99, 102, 241, 0.1);
  }

  /* --- fx-border-neon: multi-layer colored box-shadow --- */
  .${p}fx-border-neon {
    --ferrum-neon-color: #0ff;
    --ferrum-neon-intensity: 1;
    border: 1px solid var(--ferrum-neon-color);
    box-shadow:
      0 0 calc(4px * var(--ferrum-neon-intensity)) var(--ferrum-neon-color),
      0 0 calc(11px * var(--ferrum-neon-intensity)) var(--ferrum-neon-color),
      0 0 calc(22px * var(--ferrum-neon-intensity)) rgba(0, 255, 255, 0.4),
      inset 0 0 calc(8px * var(--ferrum-neon-intensity)) rgba(0, 255, 255, 0.1);
  }

  /* --- fx-border-gradient: border-image with linear-gradient --- */
  .${p}fx-border-gradient {
    --ferrum-border-grad-1: #6366f1;
    --ferrum-border-grad-2: #ec4899;
    --ferrum-border-grad-3: #f59e0b;
    --ferrum-border-width: 2px;
    border: var(--ferrum-border-width) solid transparent;
    border-image: linear-gradient(135deg, var(--ferrum-border-grad-1), var(--ferrum-border-grad-2), var(--ferrum-border-grad-3)) 1;
  }

  /* --- fx-border-animated: rotating conic-gradient as border --- */
  @keyframes ${p}fx-border-rotate {
    to { --ferrum-border-angle: 360deg; }
  }
  @property --ferrum-border-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }
  .${p}fx-border-animated {
    --ferrum-border-angle: 0deg;
    --ferrum-border-anim-color-1: #6366f1;
    --ferrum-border-anim-color-2: #ec4899;
    --ferrum-border-anim-color-3: #06b6d4;
    border: 2px solid transparent;
    background:
      linear-gradient(var(--ferrum-border-angle), var(--ferrum-border-anim-color-1), var(--ferrum-border-anim-color-2), var(--ferrum-border-anim-color-3), var(--ferrum-border-anim-color-1)) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: ${p}fx-border-rotate 3s linear infinite;
  }

  /* --- fx-border-trace: pseudo-element with width animation tracing the border --- */
  @keyframes ${p}fx-border-trace {
    0%   { clip-path: inset(0 100% 0 0); }
    25%  { clip-path: inset(0 0 0 0); }
    50%  { clip-path: inset(0 0 100% 0); }
    75%  { clip-path: inset(100% 0 0 0); }
    100% { clip-path: inset(0 100% 0 0); }
  }
  .${p}fx-border-trace {
    position: relative;
    border: 2px solid var(--ferrum-border-trace-color, #6366f1);
    overflow: hidden;
  }
  .${p}fx-border-trace::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: var(--ferrum-border-trace-color, #6366f1);
    clip-path: inset(0 100% 0 0);
    animation: ${p}fx-border-trace 4s linear infinite;
    z-index: -1;
    opacity: 0.4;
  }

  /* --- fx-border-energy: pulsing border with color shift --- */
  @keyframes ${p}fx-border-energy {
    0%, 100% {
      box-shadow:
        0 0 5px var(--ferrum-energy-color-1, #6366f1),
        0 0 15px var(--ferrum-energy-color-1, #6366f1);
      border-color: var(--ferrum-energy-color-1, #6366f1);
    }
    50% {
      box-shadow:
        0 0 10px var(--ferrum-energy-color-2, #ec4899),
        0 0 30px var(--ferrum-energy-color-2, #ec4899);
      border-color: var(--ferrum-energy-color-2, #ec4899);
    }
  }
  .${p}fx-border-energy {
    --ferrum-energy-color-1: #6366f1;
    --ferrum-energy-color-2: #ec4899;
    border: 2px solid var(--ferrum-energy-color-1);
    animation: ${p}fx-border-energy 2s ease-in-out infinite;
  }

  /* --- fx-border-aurora: animated hue-rotate on border --- */
  @keyframes ${p}fx-border-aurora {
    0%   { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
  .${p}fx-border-aurora {
    --ferrum-aurora-base: #6366f1;
    border: 2px solid var(--ferrum-aurora-base);
    box-shadow:
      0 0 8px var(--ferrum-aurora-base),
      0 0 20px rgba(99, 102, 241, 0.3);
    animation: ${p}fx-border-aurora 4s linear infinite;
  }

  /* --- fx-border-pixel: stepped border (image-rendering: pixelated border) --- */
  .${p}fx-border-pixel {
    --ferrum-pixel-size: 4px;
    --ferrum-pixel-color: #6366f1;
    border: var(--ferrum-pixel-size) solid var(--ferrum-pixel-color);
    image-rendering: pixelated;
    outline: var(--ferrum-pixel-size) solid var(--ferrum-pixel-color);
    outline-offset: calc(var(--ferrum-pixel-size) * -1);
  }

  /* --- fx-border-liquid: animated border-radius + border-color --- */
  @keyframes ${p}fx-border-liquid {
    0%   {
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
      border-color: var(--ferrum-liquid-color-1, #6366f1);
    }
    25%  {
      border-radius: 58% 42% 32% 68% / 63% 28% 72% 37%;
      border-color: var(--ferrum-liquid-color-2, #06b6d4);
    }
    50%  {
      border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
      border-color: var(--ferrum-liquid-color-3, #ec4899);
    }
    75%  {
      border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
      border-color: var(--ferrum-liquid-color-2, #06b6d4);
    }
    100% {
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
      border-color: var(--ferrum-liquid-color-1, #6366f1);
    }
  }
  .${p}fx-border-liquid {
    --ferrum-liquid-color-1: #6366f1;
    --ferrum-liquid-color-2: #06b6d4;
    --ferrum-liquid-color-3: #ec4899;
    border: 2px solid var(--ferrum-liquid-color-1);
    animation: ${p}fx-border-liquid 6s ease-in-out infinite;
  }

  /* --- fx-border-glass: semi-transparent border with backdrop-filter hint --- */
  .${p}fx-border-glass {
    --ferrum-glass-border-color: rgba(255, 255, 255, 0.15);
    --ferrum-glass-border-width: 1px;
    border: var(--ferrum-glass-border-width) solid var(--ferrum-glass-border-color);
    backdrop-filter: blur(8px) saturate(120%);
    -webkit-backdrop-filter: blur(8px) saturate(120%);
    box-shadow:
      inset 0 0 0 var(--ferrum-glass-border-width) rgba(255, 255, 255, 0.05),
      0 1px 2px rgba(0, 0, 0, 0.1);
  }

  /* --- fx-border-magnetic: Border that appears attracted to one side (asymmetric via border-width) --- */
  .${p}fx-border-magnetic {
    --ferrum-magnetic-color: #6366f1;
    --ferrum-magnetic-side: bottom;
    --ferrum-magnetic-strength: 4px;
    border: 1px solid rgba(99, 102, 241, 0.2);
    border-bottom: var(--ferrum-magnetic-strength) solid var(--ferrum-magnetic-color);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
    transition: border-width 0.3s ease, box-shadow 0.3s ease;
  }
  .${p}fx-border-magnetic:hover {
    border-bottom-width: calc(var(--ferrum-magnetic-strength) + 2px);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3);
  }

  /* --- fx-border-dashed-glow: Glowing dashed border with animation --- */
  @keyframes ${p}fx-border-dashed-glow-pulse {
    0%, 100% { box-shadow: 0 0 4px var(--ferrum-dashed-glow-color, #6366f1); }
    50%      { box-shadow: 0 0 12px var(--ferrum-dashed-glow-color, #6366f1), 0 0 24px rgba(99, 102, 241, 0.2); }
  }
  .${p}fx-border-dashed-glow {
    --ferrum-dashed-glow-color: rgba(99, 102, 241, 0.6);
    --ferrum-dashed-glow-gap: 8px;
    border: 2px dashed var(--ferrum-dashed-glow-color);
    animation: ${p}fx-border-dashed-glow-pulse 2s ease-in-out infinite;
  }

  /* --- fx-border-dotted-pulse: Pulsing dotted border --- */
  @keyframes ${p}fx-border-dotted-pulse-anim {
    0%, 100% { border-color: var(--ferrum-dotted-pulse-color, #6366f1); border-width: 3px; }
    50%      { border-color: var(--ferrum-dotted-pulse-color-alt, #ec4899); border-width: 4px; }
  }
  .${p}fx-border-dotted-pulse {
    --ferrum-dotted-pulse-color: #6366f1;
    --ferrum-dotted-pulse-color-alt: #ec4899;
    border: 3px dotted var(--ferrum-dotted-pulse-color);
    animation: ${p}fx-border-dotted-pulse-anim 1.5s ease-in-out infinite;
    transition: box-shadow 0.3s ease;
  }
  .${p}fx-border-dotted-pulse:hover {
    box-shadow: 0 0 10px var(--ferrum-dotted-pulse-color);
  }

  /* --- fx-border-double-glow: Double border with inner glow --- */
  .${p}fx-border-double-glow {
    --ferrum-double-glow-color: rgba(99, 102, 241, 0.7);
    --ferrum-double-glow-inner: rgba(99, 102, 241, 0.15);
    --ferrum-double-glow-width: 4px;
    border: var(--ferrum-double-glow-width) double var(--ferrum-double-glow-color);
    box-shadow:
      inset 0 0 8px var(--ferrum-double-glow-inner),
      0 0 8px rgba(99, 102, 241, 0.15);
    transition: box-shadow 0.3s ease;
  }
  .${p}fx-border-double-glow:hover {
    box-shadow:
      inset 0 0 14px var(--ferrum-double-glow-inner),
      0 0 14px rgba(99, 102, 241, 0.25);
  }

  /* --- fx-border-shimmer: Shimmer highlight traveling along border using background-size animation --- */
  @keyframes ${p}fx-border-shimmer-move {
    0%   { background-position: 0% 0%; }
    100% { background-position: 300% 0%; }
  }
  .${p}fx-border-shimmer {
    --ferrum-shimmer-color-1: #6366f1;
    --ferrum-shimmer-color-2: #ec4899;
    --ferrum-shimmer-color-3: #06b6d4;
    --ferrum-shimmer-speed: 3s;
    border: 2px solid transparent;
    background:
      linear-gradient(#fff, #fff) padding-box,
      linear-gradient(90deg, var(--ferrum-shimmer-color-1), var(--ferrum-shimmer-color-2), var(--ferrum-shimmer-color-3), var(--ferrum-shimmer-color-1)) border-box;
    background-size: 100% 100%, 300% 100%;
    animation: ${p}fx-border-shimmer-move var(--ferrum-shimmer-speed) linear infinite;
  }

  /* --- fx-border-dissolve: Border that dissolves/fades at corners using mask --- */
  .${p}fx-border-dissolve {
    --ferrum-dissolve-color: #6366f1;
    --ferrum-dissolve-width: 2px;
    border: var(--ferrum-dissolve-width) solid var(--ferrum-dissolve-color);
    -webkit-mask:
      linear-gradient(#fff, #fff) center/80% 80% no-repeat,
      radial-gradient(circle at 0% 0%, transparent 20%, #fff 40%),
      radial-gradient(circle at 100% 0%, transparent 20%, #fff 40%),
      radial-gradient(circle at 0% 100%, transparent 20%, #fff 40%),
      radial-gradient(circle at 100% 100%, transparent 20%, #fff 40%);
    mask:
      linear-gradient(#fff, #fff) center/80% 80% no-repeat,
      radial-gradient(circle at 0% 0%, transparent 20%, #fff 40%),
      radial-gradient(circle at 100% 0%, transparent 20%, #fff 40%),
      radial-gradient(circle at 0% 100%, transparent 20%, #fff 40%),
      radial-gradient(circle at 100% 100%, transparent 20%, #fff 40%);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    box-shadow: 0 0 6px rgba(99, 102, 241, 0.15);
  }

  /* --- fx-border-digital-dashed: Digital/tech styled dashed border with sharp corners --- */
  .${p}fx-border-digital-dashed {
    --ferrum-digital-color: #00ff88;
    --ferrum-digital-width: 2px;
    border: var(--ferrum-digital-width) dashed var(--ferrum-digital-color);
    border-radius: 0;
    box-shadow:
      0 0 4px var(--ferrum-digital-color),
      inset 0 0 4px rgba(0, 255, 136, 0.1);
    image-rendering: crisp-edges;
  }

  /* --- fx-border-gradient-conic: Rotating conic-gradient border (different from the linear animated one) --- */
  @keyframes ${p}fx-border-conic-spin {
    to { --ferrum-conic-border-angle: 360deg; }
  }
  @property --ferrum-conic-border-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }
  .${p}fx-border-gradient-conic {
    --ferrum-conic-border-angle: 0deg;
    --ferrum-conic-c1: #6366f1;
    --ferrum-conic-c2: #ec4899;
    --ferrum-conic-c3: #06b6d4;
    --ferrum-conic-c4: #f59e0b;
    --ferrum-conic-speed: 4s;
    border: 3px solid transparent;
    background:
      conic-gradient(
        from var(--ferrum-conic-border-angle) at 50% 50%,
        var(--ferrum-conic-c1),
        var(--ferrum-conic-c2),
        var(--ferrum-conic-c3),
        var(--ferrum-conic-c4),
        var(--ferrum-conic-c1)
      ) border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: ${p}fx-border-conic-spin var(--ferrum-conic-speed) linear infinite;
  }

}`;
}