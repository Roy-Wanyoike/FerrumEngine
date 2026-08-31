/**
 * @fileoverview Ferrum Paint Worklet: ferrum-glow
 * Configurable radial glow effect painted on the GPU.
 *
 * CSS Custom Properties:
 *   --ferrum-glow-color     <color>   Default: '#a855f7'
 *   --ferrum-glow-radius   <number>  Default: 0.5  (0–1, fraction of element size)
 *   --ferrum-glow-intensity <number> Default: 0.6  (0–1)
 *
 * Usage:
 *   .glow-box {
 *     background: paint(ferrum-glow);
 *     --ferrum-glow-color: #a855f7;
 *     --ferrum-glow-radius: 0.5;
 *     --ferrum-glow-intensity: 0.6;
 *   }
 */

/* global registerPaint */

class FerrumGlowPainter {
  static get inputProperties() {
    return [
      '--ferrum-glow-color',
      '--ferrum-glow-radius',
      '--ferrum-glow-intensity',
    ];
  }

  paint(ctx, size, props) {
    const color = props.get('--ferrum-glow-color').toString() || '#a855f7';
    const radiusProp = parseFloat(props.get('--ferrum-glow-radius').toString());
    const intensityProp = parseFloat(props.get('--ferrum-glow-intensity').toString());
    const radius = isNaN(radiusProp) ? 0.5 : Math.max(0, Math.min(1, radiusProp));
    const intensity = isNaN(intensityProp) ? 0.6 : Math.max(0, Math.min(1, intensityProp));

    const cx = size.width / 2;
    const cy = size.height / 2;
    const maxDim = Math.max(size.width, size.height);
    const glowRadius = Math.max(1, maxDim * radius);

    // Parse color for rgba manipulation
    ctx.fillStyle = 'transparent';
    ctx.clearRect(0, 0, size.width, size.height);

    // Outer soft glow
    const outerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
    outerGrad.addColorStop(0, color);
    outerGrad.addColorStop(0.4, color + alphaHex(intensity * 0.6));
    outerGrad.addColorStop(1, color + '00');

    ctx.globalAlpha = intensity;
    ctx.fillStyle = outerGrad;
    ctx.fillRect(0, 0, size.width, size.height);

    // Inner bright core
    const innerRadius = Math.max(1, glowRadius * 0.3);
    const innerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, innerRadius);
    innerGrad.addColorStop(0, '#ffffff');
    innerGrad.addColorStop(0.3, color);
    innerGrad.addColorStop(1, color + '00');

    ctx.globalAlpha = intensity * 0.5;
    ctx.fillStyle = innerGrad;
    ctx.fillRect(0, 0, size.width, size.height);

    ctx.globalAlpha = 1;
  }
}

/** Convert a 0–1 alpha value to a 2-char hex string */
function alphaHex(a) {
  const v = Math.round(Math.max(0, Math.min(1, a)) * 255);
  return v.toString(16).padStart(2, '0');
}

registerPaint('ferrum-glow', FerrumGlowPainter);
