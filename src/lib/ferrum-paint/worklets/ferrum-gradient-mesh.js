/**
 * @fileoverview Ferrum Paint Worklet: ferrum-gradient-mesh
 * Multi-point gradient mesh with smooth interpolation.
 *
 * CSS Custom Properties:
 *   --ferrum-mesh-color-1   <color>  Default: '#a855f7' (purple)
 *   --ferrum-mesh-color-2   <color>  Default: '#3b82f6' (blue)
 *   --ferrum-mesh-color-3   <color>  Default: '#06b6d4' (cyan)
 *   --ferrum-mesh-color-4   <color>  Default: '#f43f5e' (pink)
 *   --ferrum-mesh-softness  <number> Default: 0.5  (0–1, blend softness)
 *
 * Colors are placed at the four corners:
 *   color-1 → top-left, color-2 → top-right,
 *   color-3 → bottom-left, color-4 → bottom-right
 *
 * Usage:
 *   .mesh-bg {
 *     background: paint(ferrum-gradient-mesh);
 *     --ferrum-mesh-color-1: #a855f7;
 *     --ferrum-mesh-color-2: #3b82f6;
 *     --ferrum-mesh-color-3: #06b6d4;
 *     --ferrum-mesh-color-4: #f43f5e;
 *     --ferrum-mesh-softness: 0.5;
 *   }
 */

/* global registerPaint */

class FerrumGradientMeshPainter {
  static get inputProperties() {
    return [
      '--ferrum-mesh-color-1',
      '--ferrum-mesh-color-2',
      '--ferrum-mesh-color-3',
      '--ferrum-mesh-color-4',
      '--ferrum-mesh-softness',
    ];
  }

  paint(ctx, size, props) {
    const c1 = parseColor(props.get('--ferrum-mesh-color-1').toString()) || [168, 85, 247];
    const c2 = parseColor(props.get('--ferrum-mesh-color-2').toString()) || [59, 130, 246];
    const c3 = parseColor(props.get('--ferrum-mesh-color-3').toString()) || [6, 182, 212];
    const c4 = parseColor(props.get('--ferrum-mesh-color-4').toString()) || [244, 63, 94];
    const softnessProp = parseFloat(props.get('--ferrum-mesh-softness').toString());
    const softness = isNaN(softnessProp) ? 0.5 : Math.max(0, Math.min(1, softnessProp));

    ctx.clearRect(0, 0, size.width, size.height);

    // Use a grid of circles at each corner, blended via softness
    const positions = [
      { x: 0, y: 0, color: c1 },
      { x: size.width, y: 0, color: c2 },
      { x: 0, y: size.height, color: c3 },
      { x: size.width, y: size.height, color: c4 },
    ];

    const baseRadius = Math.max(size.width, size.height) * (0.5 + softness * 1.0);

    for (const pos of positions) {
      const grad = ctx.createRadialGradient(
        pos.x, pos.y, 0,
        pos.x, pos.y, Math.max(1, baseRadius)
      );
      const [r, g, b] = pos.color;
      grad.addColorStop(0, `rgba(${r},${g},${b},0.85)`);
      grad.addColorStop(0.4, `rgba(${r},${g},${b},0.4)`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

      ctx.globalCompositeOperation = 'screen';
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size.width, size.height);
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
  }
}

/** Parse a CSS color string to [r, g, b]. Supports #hex and rgb()/rgba(). */
function parseColor(str) {
  if (!str || typeof str !== 'string') return null;
  str = str.trim();

  // #RGB or #RRGGBB
  const hexMatch = str.match(/^#([0-9a-f]{3,8})$/i);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16),
    ];
  }

  // rgb(r, g, b) or rgba(r, g, b, a)
  const rgbMatch = str.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    return [parseInt(rgbMatch[1], 10), parseInt(rgbMatch[2], 10), parseInt(rgbMatch[3], 10)];
  }

  return null;
}

registerPaint('ferrum-gradient-mesh', FerrumGradientMeshPainter);
