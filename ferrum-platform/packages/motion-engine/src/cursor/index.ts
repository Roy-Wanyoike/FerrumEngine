// ─── Cursor Motion Pack ─────────────────────────────────
// CSS-driven cursor effects. Set --ferrum-cursor-x / --ferrum-cursor-y via JS.

import type { MotionConfig } from '../types';

export function generateCursorCSS(config: MotionConfig = {}): string {
  const p = config.prefix ?? 'fr';

  return `/* ═══════════════════════════════════════════════════
   FerrumCSS Cursor Motion Pack
   CSS-driven cursor effects. Set --ferrum-cursor-x/y via JS.
   ═══════════════════════════════════════════════════ */

@layer ferrum.motion-engine {
  /* ─── Glow ─── */
  .${p}-cursor-glow {
    transition: box-shadow 300ms ease;
  }
  .${p}-cursor-glow:hover {
    box-shadow:
      0 0 30px 10px var(--ferrum-cursor-glow-color, rgba(99, 102, 241, 0.25)),
      0 0 60px 20px var(--ferrum-cursor-glow-color, rgba(99, 102, 241, 0.1));
  }

  /* ─── Spotlight ─── */
  .${p}-cursor-spotlight {
    --ferrum-spotlight-x: 50%;
    --ferrum-spotlight-y: 50%;
    transition: background 200ms ease;
    background: radial-gradient(
      circle at var(--ferrum-spotlight-x) var(--ferrum-spotlight-y),
      rgba(255, 255, 255, 0.08) 0%,
      transparent 50%
    );
  }
  .${p}-cursor-spotlight:hover {
    --ferrum-spotlight-x: var(--ferrum-cursor-x, 50%);
    --ferrum-spotlight-y: var(--ferrum-cursor-y, 50%);
    background: radial-gradient(
      circle at var(--ferrum-spotlight-x) var(--ferrum-spotlight-y),
      rgba(255, 255, 255, 0.15) 0%,
      transparent 50%
    );
  }

  /* ─── Expand ─── */
  .${p}-cursor-expand {
    transition: transform 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .${p}-cursor-expand:hover {
    transform: scale(1.08);
  }

  /* ─── Tilt ─── */
  .${p}-cursor-tilt {
    transition: transform 200ms ease-out;
    transform-style: preserve-3d;
    perspective: 600px;
  }
  .${p}-cursor-tilt:hover {
    transform:
      rotateX(calc((var(--ferrum-cursor-y, 0.5) - 0.5) * -8deg))
      rotateY(calc((var(--ferrum-cursor-x, 0.5) - 0.5) * 8deg));
  }

  /* ─── Magnetic ─── */
  .${p}-cursor-magnetic {
    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .${p}-cursor-magnetic:hover {
    transform: translate(
      calc((var(--ferrum-mag-strength, 0.3) * (var(--ferrum-cursor-x, 0.5) - 0.5) * 100%),
      calc((var(--ferrum-mag-strength, 0.3) * (var(--ferrum-cursor-y, 0.5) - 0.5) * 100%)
    );
  }

  /* ─── Parallax (opposite to cursor) ─── */
  .${p}-cursor-parallax {
    transition: transform 300ms ease-out;
    --ferrum-parallax-depth: 15px;
  }
  .${p}-cursor-parallax:hover {
    transform: translate(
      calc((var(--ferrum-cursor-x, 0.5) - 0.5) * var(--ferrum-parallax-depth, -15px)),
      calc((var(--ferrum-cursor-y, 0.5) - 0.5) * var(--ferrum-parallax-depth, -15px))
    );
  }

  /* ─── Trail (opacity fade) ─── */
  .${p}-cursor-trail {
    transition: opacity 500ms ease, transform 500ms ease;
  }
  .${p}-cursor-trail:hover {
    opacity: 0.6;
    transform: translate(
      calc((var(--ferrum-cursor-x, 0.5) - 0.5) * -10px),
      calc((var(--ferrum-cursor-y, 0.5) - 0.5) * -10px)
    );
  }

  /* ─── Ripple (click origin) ─── */
  .${p}-cursor-ripple {
    position: relative;
    overflow: hidden;
  }
  .${p}-cursor-ripple::after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    top: calc(var(--ferrum-cursor-y, 0.5) * 100% - 100px);
    left: calc(var(--ferrum-cursor-x, 0.5) * 100% - 100px);
    transform: scale(0);
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.3), transparent 70%);
    opacity: 0;
    pointer-events: none;
  }
  .${p}-cursor-ripple:active::after {
    transform: scale(1);
    opacity: 1;
    transition: transform 600ms cubic-bezier(0, 0, 0.2, 1), opacity 600ms ease;
  }

  /* ─── Gravity (attraction pull) ─── */
  .${p}-cursor-gravity {
    transition: transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .${p}-cursor-gravity:hover {
    transform: translate(
      calc((var(--ferrum-cursor-x, 0.5) - 0.5) * 30px),
      calc((var(--ferrum-cursor-y, 0.5) - 0.5) * 30px)
    );
  }

  @media (prefers-reduced-motion: reduce) {
    .${p}-cursor-glow:hover,
    .${p}-cursor-expand:hover,
    .${p}-cursor-tilt:hover,
    .${p}-cursor-magnetic:hover,
    .${p}-cursor-parallax:hover,
    .${p}-cursor-trail:hover,
    .${p}-cursor-gravity:hover {
      transform: none !important;
      box-shadow: none !important;
    }
  }
}`;
}