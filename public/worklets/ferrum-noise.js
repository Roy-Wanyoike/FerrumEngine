/**
 * @fileoverview Ferrum Paint Worklet: ferrum-noise
 * Procedural noise texture overlay for grain, texture, and organic surface effects.
 *
 * CSS Custom Properties:
 *   --ferrum-noise-scale   <number> Default: 0.5  (frequency scale; higher = finer grain)
 *   --ferrum-noise-opacity <number> Default: 0.05 (0–1)
 *   --ferrum-noise-seed    <number> Default: 0    (seed for variation)
 *
 * Usage:
 *   .grainy {
 *     background: paint(ferrum-noise);
 *     --ferrum-noise-scale: 0.5;
 *     --ferrum-noise-opacity: 0.05;
 *     --ferrum-noise-seed: 0;
 *   }
 */

/* global registerPaint */

class FerrumNoisePainter {
  static get inputProperties() {
    return [
      '--ferrum-noise-scale',
      '--ferrum-noise-opacity',
      '--ferrum-noise-seed',
    ];
  }

  paint(ctx, size, props) {
    const scaleProp = parseFloat(props.get('--ferrum-noise-scale').toString());
    const opacityProp = parseFloat(props.get('--ferrum-noise-opacity').toString());
    const seedProp = parseFloat(props.get('--ferrum-noise-seed').toString());

    const scale = isNaN(scaleProp) ? 0.5 : Math.max(0.01, scaleProp);
    const opacity = isNaN(opacityProp) ? 0.05 : Math.max(0, Math.min(1, opacityProp));
    const seed = isNaN(seedProp) ? 0 : seedProp;

    if (opacity <= 0) return;

    ctx.clearRect(0, 0, size.width, size.height);

    // Pixel-level noise for a realistic film-grain look.
    // We use ImageData for performance rather than thousands of fillRect calls.
    const w = Math.round(size.width);
    const h = Math.round(size.height);
    const imageData = ctx.createImageData(w, h);
    const data = imageData.data;

    const frequency = scale * 100;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const n = hashNoise(x * frequency * 0.01, y * frequency * 0.01, seed);
        const v = Math.round(n * 255);
        data[idx] = v;
        data[idx + 1] = v;
        data[idx + 2] = v;
        data[idx + 3] = Math.round(opacity * 255);
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }
}

/** Hash-based pseudo-random noise */
function hashNoise(x, y, seed) {
  const n = Math.sin(x * 127.1 + y * 311.7 + seed * 43758.5453) * 43758.5453;
  return n - Math.floor(n);
}

registerPaint('ferrum-noise', FerrumNoisePainter);
