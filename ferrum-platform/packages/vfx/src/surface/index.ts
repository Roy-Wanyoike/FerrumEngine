/* ===== Ferrum VFX — Surface Engine ===== */
/* Texture and finish effects using gradients and shadows */

export function generateSurfaceCSS(prefix: string = 'fr-'): string {
  const p = prefix;

  return `@layer ferrum.vfx {

  /* --- fx-surface-noise: SVG-like noise using multiple layered gradients --- */
  .${p}fx-surface-noise {
    --ferrum-noise-opacity: 0.04;
    --ferrum-noise-color: rgba(128, 128, 128, var(--ferrum-noise-opacity));
    background-image:
      radial-gradient(ellipse at 20% 50%, var(--ferrum-noise-color) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, var(--ferrum-noise-color) 0%, transparent 40%),
      radial-gradient(ellipse at 40% 80%, var(--ferrum-noise-color) 0%, transparent 45%),
      radial-gradient(ellipse at 60% 10%, var(--ferrum-noise-color) 0%, transparent 55%),
      radial-gradient(ellipse at 10% 90%, var(--ferrum-noise-color) 0%, transparent 35%),
      radial-gradient(ellipse at 90% 60%, var(--ferrum-noise-color) 0%, transparent 50%);
  }

  /* --- fx-surface-grain: subtle dot pattern using radial-gradient repeat --- */
  .${p}fx-surface-grain {
    --ferrum-grain-size: 3px;
    --ferrum-grain-color: rgba(0, 0, 0, 0.08);
    --ferrum-grain-bg: transparent;
    background-color: var(--ferrum-grain-bg);
    background-image:
      radial-gradient(circle, var(--ferrum-grain-color) var(--ferrum-grain-size), transparent var(--ferrum-grain-size));
    background-size: calc(var(--ferrum-grain-size) * 3) calc(var(--ferrum-grain-size) * 3);
  }

  /* --- fx-surface-brushed-metal: directional linear-gradient lines --- */
  .${p}fx-surface-brushed-metal {
    --ferrum-brush-color: rgba(255, 255, 255, 0.06);
    --ferrum-brush-direction: 90deg;
    background-image: repeating-linear-gradient(
      var(--ferrum-brush-direction),
      var(--ferrum-brush-color) 0px,
      transparent 1px,
      transparent 3px
    );
    background-size: 100% 100%;
  }

  /* --- fx-surface-emboss: inner shadow + highlight gradient --- */
  .${p}fx-surface-emboss {
    --ferrum-emboss-depth: 2px;
    --ferrum-emboss-color: rgba(0, 0, 0, 0.25);
    --ferrum-emboss-highlight: rgba(255, 255, 255, 0.3);
    box-shadow:
      inset 0 var(--ferrum-emboss-depth) var(--ferrum-emboss-depth) calc(var(--ferrum-emboss-depth) * -1) var(--ferrum-emboss-color),
      inset 0 calc(var(--ferrum-emboss-depth) * -1) var(--ferrum-emboss-depth) calc(var(--ferrum-emboss-depth) * -1) var(--ferrum-emboss-highlight);
    background: linear-gradient(180deg, var(--ferrum-emboss-highlight) 0%, transparent 40%, transparent 60%, var(--ferrum-emboss-color) 100%);
  }

  /* --- fx-surface-matte: no reflection, flat --- */
  .${p}fx-surface-matte {
    --ferrum-matte-bg: #2a2a2a;
    background: var(--ferrum-matte-bg);
    box-shadow: none;
    filter: contrast(1.05);
  }

  /* --- fx-surface-gloss: strong linear-gradient highlight --- */
  .${p}fx-surface-gloss {
    --ferrum-gloss-intensity: 0.5;
    --ferrum-gloss-color: rgba(255, 255, 255, var(--ferrum-gloss-intensity));
    background: linear-gradient(
      160deg,
      var(--ferrum-gloss-color) 0%,
      rgba(255, 255, 255, calc(var(--ferrum-gloss-intensity) * 0.3)) 20%,
      transparent 50%,
      rgba(0, 0, 0, 0.05) 100%
    );
  }

  /* --- fx-surface-satin: medium directional highlight --- */
  .${p}fx-surface-satin {
    --ferrum-satin-intensity: 0.2;
    --ferrum-satin-angle: 135deg;
    background: linear-gradient(
      var(--ferrum-satin-angle),
      rgba(255, 255, 255, calc(var(--ferrum-satin-intensity) * 1.5)) 0%,
      transparent 30%,
      transparent 70%,
      rgba(0, 0, 0, var(--ferrum-satin-intensity)) 100%
    );
  }

  /* --- fx-surface-velvet: dark with subtle depth gradient --- */
  .${p}fx-surface-velvet {
    --ferrum-velvet-base: #1a1a2e;
    --ferrum-velvet-depth: rgba(20, 20, 40, 0.8);
    background:
      radial-gradient(ellipse at 30% 30%, rgba(80, 60, 100, 0.15) 0%, transparent 60%),
      radial-gradient(ellipse at 70% 70%, rgba(30, 20, 50, 0.3) 0%, transparent 50%),
      linear-gradient(180deg, var(--ferrum-velvet-base) 0%, var(--ferrum-velvet-depth) 100%);
  }

  /* --- fx-surface-carbon: dark diagonal line pattern --- */
  .${p}fx-surface-carbon {
    --ferrum-carbon-line: rgba(255, 255, 255, 0.04);
    --ferrum-carbon-bg: #1a1a1a;
    --ferrum-carbon-gap: 4px;
    background-color: var(--ferrum-carbon-bg);
    background-image:
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent calc(var(--ferrum-carbon-gap) - 1px),
        var(--ferrum-carbon-line) calc(var(--ferrum-carbon-gap) - 1px),
        var(--ferrum-carbon-line) var(--ferrum-carbon-gap)
      ),
      repeating-linear-gradient(
        -45deg,
        transparent,
        transparent calc(var(--ferrum-carbon-gap) - 1px),
        var(--ferrum-carbon-line) calc(var(--ferrum-carbon-gap) - 1px),
        var(--ferrum-carbon-line) var(--ferrum-carbon-gap)
      );
  }

  /* --- fx-surface-dot-matrix: repeating radial-gradient dots grid --- */
  .${p}fx-surface-dot-matrix {
    --ferrum-dot-size: 2px;
    --ferrum-dot-gap: 8px;
    --ferrum-dot-color: rgba(0, 0, 0, 0.12);
    --ferrum-dot-bg: transparent;
    background-color: var(--ferrum-dot-bg);
    background-image:
      radial-gradient(circle, var(--ferrum-dot-color) var(--ferrum-dot-size), transparent var(--ferrum-dot-size));
    background-size: var(--ferrum-dot-gap) var(--ferrum-dot-gap);
    background-position: 0 0, calc(var(--ferrum-dot-gap) / 2) calc(var(--ferrum-dot-gap) / 2);
  }

  /* --- fx-surface-paper-texture: Paper texture with subtle warm-toned grain --- */
  .${p}fx-surface-paper-texture {
    --ferrum-paper-warmth: rgba(180, 160, 120, 0.06);
    --ferrum-paper-fiber: rgba(120, 100, 80, 0.04);
    --ferrum-paper-bg: #faf8f5;
    background-color: var(--ferrum-paper-bg);
    background-image:
      radial-gradient(ellipse at 15% 25%, var(--ferrum-paper-warmth) 0%, transparent 50%),
      radial-gradient(ellipse at 75% 65%, var(--ferrum-paper-warmth) 0%, transparent 40%),
      radial-gradient(ellipse at 45% 80%, var(--ferrum-paper-fiber) 0%, transparent 55%),
      radial-gradient(ellipse at 85% 15%, var(--ferrum-paper-fiber) 0%, transparent 45%),
      radial-gradient(ellipse at 30% 55%, rgba(160, 140, 100, 0.03) 0%, transparent 60%),
      radial-gradient(ellipse at 60% 40%, rgba(140, 120, 90, 0.03) 0%, transparent 50%),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 1px,
        rgba(160, 140, 110, 0.015) 1px,
        rgba(160, 140, 110, 0.015) 2px
      );
  }

  /* --- fx-surface-fabric-linen: Linen fabric with cross-hatch pattern --- */
  .${p}fx-surface-fabric-linen {
    --ferrum-linen-color: rgba(180, 170, 150, 0.08);
    --ferrum-linen-gap: 6px;
    --ferrum-linen-bg: #f5f0eb;
    background-color: var(--ferrum-linen-bg);
    background-image:
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent calc(var(--ferrum-linen-gap) - 1px),
        var(--ferrum-linen-color) calc(var(--ferrum-linen-gap) - 1px),
        var(--ferrum-linen-color) var(--ferrum-linen-gap)
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent calc(var(--ferrum-linen-gap) - 1px),
        var(--ferrum-linen-color) calc(var(--ferrum-linen-gap) - 1px),
        var(--ferrum-linen-color) var(--ferrum-linen-gap)
      ),
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent calc(var(--ferrum-linen-gap) * 2 - 1px),
        rgba(160, 150, 130, 0.04) calc(var(--ferrum-linen-gap) * 2 - 1px),
        rgba(160, 150, 130, 0.04) calc(var(--ferrum-linen-gap) * 2)
      ),
      repeating-linear-gradient(
        -45deg,
        transparent,
        transparent calc(var(--ferrum-linen-gap) * 2 - 1px),
        rgba(160, 150, 130, 0.04) calc(var(--ferrum-linen-gap) * 2 - 1px),
        rgba(160, 150, 130, 0.04) calc(var(--ferrum-linen-gap) * 2)
      );
  }

  /* --- fx-surface-fabric-silk: Silk with smooth directional sheen --- */
  @keyframes ${p}fx-surface-silk-sheen {
    0%, 100% { background-position: 0% 50%; }
    50%      { background-position: 100% 50%; }
  }
  .${p}fx-surface-fabric-silk {
    --ferrum-silk-color-1: rgba(200, 180, 220, 0.12);
    --ferrum-silk-color-2: rgba(220, 200, 240, 0.08);
    --ferrum-silk-angle: 120deg;
    --ferrum-silk-speed: 6s;
    background:
      linear-gradient(
        var(--ferrum-silk-angle),
        transparent 0%,
        var(--ferrum-silk-color-1) 20%,
        var(--ferrum-silk-color-2) 40%,
        transparent 50%,
        var(--ferrum-silk-color-1) 60%,
        var(--ferrum-silk-color-2) 80%,
        transparent 100%
      );
    background-size: 200% 200%;
    animation: ${p}fx-surface-silk-sheen var(--ferrum-silk-speed) ease-in-out infinite;
  }

  /* --- fx-surface-engrave: Engraved effect (inset shadow + highlight reversed from emboss) --- */
  .${p}fx-surface-engrave {
    --ferrum-engrave-depth: 2px;
    --ferrum-engrave-shadow: rgba(0, 0, 0, 0.35);
    --ferrum-engrave-highlight: rgba(255, 255, 255, 0.2);
    box-shadow:
      inset 0 calc(var(--ferrum-engrave-depth) * -1) var(--ferrum-engrave-depth) calc(var(--ferrum-engrave-depth) * -1) var(--ferrum-engrave-shadow),
      inset 0 var(--ferrum-engrave-depth) var(--ferrum-engrave-depth) calc(var(--ferrum-engrave-depth) * -1) var(--ferrum-engrave-highlight);
    background: linear-gradient(180deg, var(--ferrum-engrave-shadow) 0%, transparent 30%, transparent 70%, var(--ferrum-engrave-highlight) 100%);
  }

  /* --- fx-surface-etch: Etched glass effect with fine noise + blur --- */
  .${p}fx-surface-etch {
    --ferrum-etch-opacity: 0.03;
    --ferrum-etch-blur: 0.5px;
    background-color: rgba(255, 255, 255, 0.05);
    background-image:
      radial-gradient(circle at 10% 20%, rgba(200, 200, 220, var(--ferrum-etch-opacity)) 1px, transparent 1px),
      radial-gradient(circle at 30% 70%, rgba(200, 200, 220, var(--ferrum-etch-opacity)) 1px, transparent 1px),
      radial-gradient(circle at 50% 40%, rgba(200, 200, 220, var(--ferrum-etch-opacity)) 1px, transparent 1px),
      radial-gradient(circle at 70% 10%, rgba(200, 200, 220, var(--ferrum-etch-opacity)) 1px, transparent 1px),
      radial-gradient(circle at 90% 80%, rgba(200, 200, 220, var(--ferrum-etch-opacity)) 1px, transparent 1px),
      radial-gradient(circle at 20% 90%, rgba(200, 200, 220, var(--ferrum-etch-opacity)) 1px, transparent 1px),
      radial-gradient(circle at 80% 50%, rgba(200, 200, 220, var(--ferrum-etch-opacity)) 1px, transparent 1px),
      radial-gradient(circle at 60% 60%, rgba(200, 200, 220, var(--ferrum-etch-opacity)) 1px, transparent 1px);
    background-size: 5px 5px, 7px 7px, 4px 4px, 6px 6px, 5px 5px, 8px 8px, 6px 6px, 4px 4px;
    backdrop-filter: blur(var(--ferrum-etch-blur));
    -webkit-backdrop-filter: blur(var(--ferrum-etch-blur));
    box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.03);
  }

  /* --- fx-surface-concrete-rough: Rough concrete with larger speckles --- */
  .${p}fx-surface-concrete-rough {
    --ferrum-concrete-speckle: rgba(120, 115, 110, 0.1);
    --ferrum-concrete-speckle-dark: rgba(80, 75, 70, 0.08);
    --ferrum-concrete-bg: #b0aaa2;
    background-color: var(--ferrum-concrete-bg);
    background-image:
      radial-gradient(circle, var(--ferrum-concrete-speckle) 2px, transparent 2px),
      radial-gradient(circle, var(--ferrum-concrete-speckle-dark) 1.5px, transparent 1.5px),
      radial-gradient(circle, var(--ferrum-concrete-speckle) 1px, transparent 1px),
      radial-gradient(circle, var(--ferrum-concrete-speckle-dark) 2.5px, transparent 2.5px),
      radial-gradient(circle, rgba(140, 135, 128, 0.06) 3px, transparent 3px);
    background-size:
      11px 11px,
      17px 17px,
      7px 7px,
      23px 23px,
      31px 31px;
    background-position: 0 0, 5px 5px, 3px 3px, 8px 8px, 0 0;
  }

  /* --- fx-surface-holographic: Holographic rainbow surface using conic-gradient --- */
  @keyframes ${p}fx-surface-holographic-shift {
    0%   { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
  .${p}fx-surface-holographic {
    --ferrum-holo-intensity: 0.3;
    --ferrum-holo-speed: 4s;
    background: conic-gradient(
      from 0deg at 50% 50%,
      rgba(255, 0, 0, var(--ferrum-holo-intensity)),
      rgba(255, 165, 0, var(--ferrum-holo-intensity)),
      rgba(255, 255, 0, var(--ferrum-holo-intensity)),
      rgba(0, 255, 0, var(--ferrum-holo-intensity)),
      rgba(0, 200, 255, var(--ferrum-holo-intensity)),
      rgba(100, 0, 255, var(--ferrum-holo-intensity)),
      rgba(255, 0, 150, var(--ferrum-holo-intensity)),
      rgba(255, 0, 0, var(--ferrum-holo-intensity))
    );
    animation: ${p}fx-surface-holographic-shift var(--ferrum-holo-speed) linear infinite;
    mix-blend-mode: overlay;
  }

  /* --- fx-surface-mother-of-pearl: Iridescent mother-of-pearl with animated gradient --- */
  @keyframes ${p}fx-surface-mop-shift {
    0%   { background-position: 0% 0%; }
    25%  { background-position: 100% 0%; }
    50%  { background-position: 100% 100%; }
    75%  { background-position: 0% 100%; }
    100% { background-position: 0% 0%; }
  }
  .${p}fx-surface-mother-of-pearl {
    --ferrum-mop-c1: rgba(220, 200, 255, 0.2);
    --ferrum-mop-c2: rgba(200, 230, 255, 0.18);
    --ferrum-mop-c3: rgba(255, 220, 240, 0.15);
    --ferrum-mop-c4: rgba(200, 255, 230, 0.12);
    --ferrum-mop-speed: 10s;
    background:
      radial-gradient(ellipse at 30% 20%, var(--ferrum-mop-c1) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 40%, var(--ferrum-mop-c2) 0%, transparent 50%),
      radial-gradient(ellipse at 40% 70%, var(--ferrum-mop-c3) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 80%, var(--ferrum-mop-c4) 0%, transparent 50%),
      radial-gradient(ellipse at 20% 60%, var(--ferrum-mop-c2) 0%, transparent 50%),
      radial-gradient(ellipse at 60% 10%, var(--ferrum-mop-c4) 0%, transparent 50%);
    background-size: 200% 200%;
    animation: ${p}fx-surface-mop-shift var(--ferrum-mop-speed) ease-in-out infinite;
  }

  /* --- fx-surface-circuit-board: Circuit board pattern using linear-gradients --- */
  .${p}fx-surface-circuit-board {
    --ferrum-circuit-line: rgba(0, 200, 150, 0.12);
    --ferrum-circuit-node: rgba(0, 200, 150, 0.2);
    --ferrum-circuit-bg: #0a1a14;
    --ferrum-circuit-gap: 20px;
    background-color: var(--ferrum-circuit-bg);
    background-image:
      linear-gradient(var(--ferrum-circuit-line) 1px, transparent 1px),
      linear-gradient(90deg, var(--ferrum-circuit-line) 1px, transparent 1px),
      linear-gradient(var(--ferrum-circuit-line) 1px, transparent 1px),
      linear-gradient(90deg, var(--ferrum-circuit-line) 1px, transparent 1px),
      radial-gradient(circle, var(--ferrum-circuit-node) 2px, transparent 2px);
    background-size:
      var(--ferrum-circuit-gap) var(--ferrum-circuit-gap),
      var(--ferrum-circuit-gap) var(--ferrum-circuit-gap),
      calc(var(--ferrum-circuit-gap) * 3) calc(var(--ferrum-circuit-gap) * 3),
      calc(var(--ferrum-circuit-gap) * 3) calc(var(--ferrum-circuit-gap) * 3),
      var(--ferrum-circuit-gap) var(--ferrum-circuit-gap);
    background-position: 0 0, 0 0, 0 0, 0 0, 0 0;
  }

}`;
}