/**
 * @fileoverview Ferrum Paint Worklet: ferrum-ripple
 * Material-design ripple effect painted entirely on the GPU.
 *
 * CSS Custom Properties:
 *   --ferrum-ripple-x        <number> Default: 0.5  (0–1, horizontal origin)
 *   --ferrum-ripple-y        <number> Default: 0.5  (0–1, vertical origin)
 *   --ferrum-ripple-color    <color>  Default: 'rgba(255,255,255,0.3)'
 *   --ferrum-ripple-progress <number> Default: 0    (0–1, animation progress)
 *   --ferrum-ripple-size     <number> Default: 1.0  (multiplier for max radius)
 *
 * Usage:
 *   .ripple {
 *     background: paint(ferrum-ripple);
 *     --ferrum-ripple-x: 0.5;
 *     --ferrum-ripple-y: 0.5;
 *     --ferrum-ripple-color: rgba(255,255,255,0.3);
 *     --ferrum-ripple-progress: 0;
 *     --ferrum-ripple-size: 1.0;
 *   }
 */

/* global registerPaint */

class FerrumRipplePainter {
  static get inputProperties() {
    return [
      '--ferrum-ripple-x',
      '--ferrum-ripple-y',
      '--ferrum-ripple-color',
      '--ferrum-ripple-progress',
      '--ferrum-ripple-size',
    ];
  }

  paint(ctx, size, props) {
    const xProp = parseFloat(props.get('--ferrum-ripple-x').toString());
    const yProp = parseFloat(props.get('--ferrum-ripple-y').toString());
    const color = props.get('--ferrum-ripple-color').toString() || 'rgba(255,255,255,0.3)';
    const progressProp = parseFloat(props.get('--ferrum-ripple-progress').toString());
    const sizeProp = parseFloat(props.get('--ferrum-ripple-size').toString());

    const originX = (isNaN(xProp) ? 0.5 : Math.max(0, Math.min(1, xProp))) * size.width;
    const originY = (isNaN(yProp) ? 0.5 : Math.max(0, Math.min(1, yProp))) * size.height;
    const progress = isNaN(progressProp) ? 0 : Math.max(0, Math.min(1, progressProp));
    const sizeMul = isNaN(sizeProp) ? 1 : Math.max(0.1, sizeProp);

    if (progress <= 0) return;

    ctx.clearRect(0, 0, size.width, size.height);

    // Calculate max radius to cover the entire element from origin
    const dx = Math.max(originX, size.width - originX);
    const dy = Math.max(originY, size.height - originY);
    const maxRadius = Math.max(1, Math.sqrt(dx * dx + dy * dy) * sizeMul);
    const currentRadius = Math.max(0.01, maxRadius * progress);

    // Easing: ease-out cubic
    const easedProgress = 1 - Math.pow(1 - progress, 3);

    // Opacity fades out as ripple expands
    const alpha = 1 - easedProgress * 0.7;

    // Draw ripple ring
    const strokeWidth = Math.max(1, size.width * 0.04);

    ctx.beginPath();
    ctx.arc(originX, originY, currentRadius, 0, Math.PI * 2);
    ctx.closePath();

    // Fill with fading color
    ctx.globalAlpha = alpha * 0.4;
    ctx.fillStyle = color;
    ctx.fill();

    // Stroke the ring
    ctx.lineWidth = strokeWidth * (1 - easedProgress * 0.5);
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.stroke();

    ctx.globalAlpha = 1;
  }
}

registerPaint('ferrum-ripple', FerrumRipplePainter);
