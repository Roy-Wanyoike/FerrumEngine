/**
 * @fileoverview Ferrum Paint Worklet: ferrum-confetti
 * Confetti particle effect with deterministic pseudo-random placement.
 *
 * CSS Custom Properties:
 *   --ferrum-confetti-count   <number> Default: 30
 *   --ferrum-confetti-seed    <number> Default: 42
 *   --ferrum-confetti-colors  <string> Default: '#a855f7,#3b82f6,#06b6d4,#f43f5e,#f59e0b'
 *
 * Usage:
 *   .confetti-bg {
 *     background: paint(ferrum-confetti);
 *     --ferrum-confetti-count: 30;
 *     --ferrum-confetti-seed: 42;
 *     --ferrum-confetti-colors: '#a855f7,#3b82f6,#06b6d4,#f43f5e,#f59e0b';
 *   }
 */

/* global registerPaint */

class FerrumConfettiPainter {
  static get inputProperties() {
    return [
      '--ferrum-confetti-count',
      '--ferrum-confetti-seed',
      '--ferrum-confetti-colors',
    ];
  }

  paint(ctx, size, props) {
    const countProp = parseInt(props.get('--ferrum-confetti-count').toString(), 10);
    const seedProp = parseFloat(props.get('--ferrum-confetti-seed').toString());
    const colorsStr = props.get('--ferrum-confetti-colors').toString() ||
      '#a855f7,#3b82f6,#06b6d4,#f43f5e,#f59e0b';

    const count = isNaN(countProp) ? 30 : Math.max(1, Math.min(500, countProp));
    const seed = isNaN(seedProp) ? 42 : seedProp;
    const colors = colorsStr.split(',').map(c => c.trim()).filter(Boolean);

    if (colors.length === 0) return;

    ctx.clearRect(0, 0, size.width, size.height);

    // Seeded PRNG (mulberry32)
    let state = Math.imul(seed | 0, 0x5DEECE66D) | 0;
    function rand() {
      state |= 0;
      state = (state + 0x6D2B79F5) | 0;
      let t = Math.imul(state ^ (state >>> 15), 1 | state);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }

    for (let i = 0; i < count; i++) {
      const x = rand() * size.width;
      const y = rand() * size.height;
      const w = 4 + rand() * 10;
      const h = 3 + rand() * 8;
      const rotation = rand() * Math.PI * 2;
      const color = colors[Math.floor(rand() * colors.length)];
      const alpha = 0.5 + rand() * 0.5;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;

      // Alternate between rectangles and circles for variety
      if (rand() > 0.4) {
        ctx.fillRect(-w / 2, -h / 2, w, h);
      } else {
        ctx.beginPath();
        ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    ctx.globalAlpha = 1;
  }
}

registerPaint('ferrum-confetti', FerrumConfettiPainter);
