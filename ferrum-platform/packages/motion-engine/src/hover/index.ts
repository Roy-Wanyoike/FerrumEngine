// ─── Premium Hover Pack ──────────────────────────────────
// Premium hover interactions inspired by Stripe, Linear, Apple, Vercel.

import type { MotionConfig } from '../types';

export function generateHoverCSS(config: MotionConfig = {}): string {
  const p = config.prefix ?? 'fr';

  return `/* ═══════════════════════════════════════════════════
   FerrumCSS Premium Hover Pack
   Next-generation hover interactions for premium interfaces.
   ═══════════════════════════════════════════════════ */

@layer ferrum.motion-engine {
  /* ─── Lift ─── */
  .${p}-hover-lift-soft {
    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 200ms ease;
  }
  .${p}-hover-lift-soft:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .${p}-hover-lift-hard {
    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 300ms ease;
  }
  .${p}-hover-lift-hard:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  }

  /* ─── Glow ─── */
  .${p}-hover-glow-soft {
    transition: box-shadow 300ms ease;
  }
  .${p}-hover-glow-soft:hover {
    box-shadow:
      0 0 12px var(--ferrum-glow-color, rgba(99, 102, 241, 0.3)),
      0 0 24px var(--ferrum-glow-color, rgba(99, 102, 241, 0.15));
  }

  .${p}-hover-glow-neon {
    transition: box-shadow 300ms ease, filter 300ms ease;
  }
  .${p}-hover-glow-neon:hover {
    box-shadow:
      0 0 4px var(--ferrum-neon-color, #6366f1),
      0 0 12px var(--ferrum-neon-color, #6366f1),
      0 0 24px var(--ferrum-neon-color, #6366f1),
      0 0 48px var(--ferrum-neon-color, #6366f1);
    filter: brightness(1.1);
  }

  /* ─── Scale ─── */
  .${p}-hover-scale {
    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }
  .${p}-hover-scale:hover {
    transform: scale(1.03);
  }

  /* ─── 3D Tilt ─── */
  .${p}-hover-tilt {
    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
    transform-style: preserve-3d;
    perspective: 800px;
  }
  .${p}-hover-tilt:hover {
    transform: rotateX(5deg) rotateY(5deg) translateZ(10px);
  }

  /* ─── Ripple ─── */
  .${p}-hover-ripple {
    position: relative;
    overflow: hidden;
  }
  .${p}-hover-ripple::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(circle at var(--ferrum-ripple-x, 50%) var(--ferrum-ripple-y, 50%), rgba(255,255,255,0.3) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 300ms ease;
  }
  .${p}-hover-ripple:hover::after { opacity: 1; }

  /* ─── Gradient Flow ─── */
  .${p}-hover-gradient-flow {
    background-size: 200% 100%;
    transition: background-position 300ms ease;
  }
  .${p}-hover-gradient-flow:hover {
    background-position: 100% 0;
  }

  /* ─── Depth ─── */
  .${p}-hover-depth {
    transition: transform 300ms ease, box-shadow 300ms ease;
    transform-style: preserve-3d;
  }
  .${p}-hover-depth:hover {
    transform: translateZ(20px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.12);
  }

  /* ─── Glass ─── */
  .${p}-hover-glass {
    transition: background 300ms ease, backdrop-filter 300ms ease;
    backdrop-filter: blur(0px);
    background: rgba(255,255,255,0.05);
  }
  .${p}-hover-glass:hover {
    backdrop-filter: blur(20px);
    background: rgba(255,255,255,0.1);
  }

  /* ─── Magnetic ─── */
  .${p}-hover-magnetic {
    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .${p}-hover-magnetic:hover {
    transform: translate(
      calc((var(--ferrum-mx, 0.5) - 0.5) * 20px),
      calc((var(--ferrum-my, 0.5) - 0.5) * 20px)
    );
  }

  /* ─── Spotlight ─── */
  .${p}-hover-spotlight {
    --ferrum-spotlight-x: 50%;
    --ferrum-spotlight-y: 50%;
    transition: background 300ms ease;
    background: radial-gradient(circle at var(--ferrum-spotlight-x) var(--ferrum-spotlight-y), rgba(255,255,255,0.06) 0%, transparent 60%);
  }
  .${p}-hover-spotlight:hover {
    --ferrum-spotlight-x: var(--ferrum-cursor-x, 50%);
    --ferrum-spotlight-y: var(--ferrum-cursor-y, 50%);
    background: radial-gradient(circle at var(--ferrum-spotlight-x) var(--ferrum-spotlight-y), rgba(255,255,255,0.12) 0%, transparent 60%);
  }

  /* ─── Energy ─── */
  .${p}-hover-energy {
    transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 300ms ease, filter 300ms ease;
  }
  .${p}-hover-energy:hover {
    transform: scale(1.04);
    box-shadow: 0 0 20px var(--ferrum-energy-color, rgba(99, 102, 241, 0.4));
    filter: brightness(1.1) saturate(1.1);
  }

  /* ─── Shift ─── */
  .${p}-hover-shift {
    transition: filter 300ms ease;
  }
  .${p}-hover-shift:hover {
    filter: hue-rotate(30deg) saturate(1.2);
  }

  /* ─── Liquid ─── */
  .${p}-hover-liquid {
    transition: border-radius 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
    border-radius: 10%;
  }
  .${p}-hover-liquid:hover {
    border-radius: 50% 30% 70% 40%;
  }
}`;
}