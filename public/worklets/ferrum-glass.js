/**
 * @fileoverview Ferrum Paint Worklet: ferrum-glass
 * Frosted glass / glassmorphism noise texture.
 *
 * CSS Custom Properties:
 *   --ferrum-glass-blur    <number>  Default: 10  (pixel blur feel)
 *   --ferrum-glass-tint    <color>   Default: 'rgba(255,255,255,0.1)'
 *   --ferrum-glass-opacity <number>  Default: 0.3 (0–1)
 *
 * Usage:
 *   .glass-card {
 *     background: paint(ferrum-glass);
 *     --ferrum-glass-blur: 10;
 *     --ferrum-glass-tint: rgba(255,255,255,0.1);
 *     --ferrum-glass-opacity: 0.3;
 *   }
 */

/* global registerPaint */

class FerrumGlassPainter {
  static get inputProperties() {
    return [
      '--ferrum-glass-blur',
      '--ferrum-glass-tint',
      '--ferrum-glass-opacity',
    ];
  }

  paint(ctx, size, props) {
    const blurVal = parseFloat(props.get('--ferrum-glass-blur').toString());
    const blur = isNaN(blurVal) ? 10 : Math.max(1, blurVal);
    const tint = props.get('--ferrum-glass-tint').toString() || 'rgba(255,255,255,0.1)';
    const opacityVal = parseFloat(props.get('--ferrum-glass-opacity').toString());
    const opacity = isNaN(opacityVal) ? 0.3 : Math.max(0, Math.min(1, opacityVal));

    ctx.clearRect(0, 0, size.width, size.height);

    // Step size determines noise granularity (larger blur = larger noise blobs)
    const step = Math.max(2, Math.round(blur * 0.8));

    // Paint tint background
    ctx.globalAlpha = opacity;
    ctx.fillStyle = tint;
    ctx.fillRect(0, 0, size.width, size.height);

    // Paint subtle noise texture using small rectangles
    ctx.globalAlpha = opacity * 0.15;
    for (let x = 0; x < size.width; x += step) {
      for (let y = 0; y < size.height; y += step) {
        const v = simpleNoise(x * 0.01, y * 0.01);
        const brightness = Math.round(200 + v * 55);
        ctx.fillStyle = `rgba(${brightness},${brightness},${brightness},0.5)`;
        ctx.fillRect(x, y, step, step);
      }
    }

    // Top highlight
    const highlightGrad = ctx.createLinearGradient(0, 0, 0, size.height);
    highlightGrad.addColorStop(0, 'rgba(255,255,255,0.12)');
    highlightGrad.addColorStop(0.5, 'rgba(255,255,255,0.02)');
    highlightGrad.addColorStop(1, 'rgba(0,0,0,0.04)');
    ctx.globalAlpha = opacity;
    ctx.fillStyle = highlightGrad;
    ctx.fillRect(0, 0, size.width, size.height);

    ctx.globalAlpha = 1;
  }
}

/** Very simple hash-based noise for the worklet context */
function simpleNoise(x, y) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

registerPaint('ferrum-glass', FerrumGlassPainter);
