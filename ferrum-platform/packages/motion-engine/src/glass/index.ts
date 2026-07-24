// ─── Glass Motion ────────────────────────────────────
// Motion for glassmorphic elements.

import type { MotionConfig } from '../types';

export function generateGlassMotionCSS(config: MotionConfig = {}): string {
  const p = config.prefix ?? 'fr';

  return `/* ═══════════════════════════════════════════════════
   FerrumCSS Glass Motion
   Motion effects for glassmorphic interfaces.
   ═══════════════════════════════════════════════════ */

@layer ferrum.motion-engine {
  /* ─── Frost ─── */
  @keyframes ${p}-glass-frost {
    from { backdrop-filter: blur(0px) saturate(100%); }
    to   { backdrop-filter: blur(20px) saturate(180%); }
  }
  .${p}-glass-frost {
    backdrop-filter: blur(0px) saturate(100%);
    transition: backdrop-filter 500ms ease;
  }
  .${p}-glass-frost-active,
  .${p}-glass-frost:hover,
  .${p}-glass-frost:focus-within {
    backdrop-filter: blur(20px) saturate(180%);
  }

  /* ─── Shine ─── */
  @keyframes ${p}-glass-shine {
    from { background-position: -100% 0; }
    to   { background-position: 200% 0; }
  }
  .${p}-glass-shine {
    background-image: linear-gradient(
      105deg,
      transparent 30%,
      rgba(255,255,255,0.15) 45%,
      transparent 55%,
      transparent 70%
    );
    background-size: 200% 100%;
    background-clip: padding-box;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${p}-glass-shine 3s linear infinite;
  }

  /* ─── Wave ─── */
  @keyframes ${p}-glass-wave {
    0%, 100% { transform: skewX(0deg); }
    50%      { transform: skewX(2deg); }
  }
  .${p}-glass-wave {
    animation: ${p}-glass-wave 4s ease-in-out infinite;
  }

  /* ─── Refraction ─── */
  @keyframes ${p}-glass-refraction {
    from { filter: hue-rotate(0deg); }
    to   { filter: hue-rotate(60deg); }
  }
  .${p}-glass-refraction {
    transition: filter 1.5s ease;
  }
  .${p}-glass-refraction:hover {
    filter: hue-rotate(60deg);
  }

  /* ─── Focus ─── */
  .${p}-glass-focus {
    backdrop-filter: blur(0px);
    border-color: rgba(255,255,255,0.1);
    transition: backdrop-filter 300ms ease, border-color 300ms ease;
  }
  .${p}-glass-focus:focus-within {
    backdrop-filter: blur(30px) saturate(180%);
    border-color: rgba(255,255,255,0.3);
  }

  /* ─── Prism (rainbow refraction) ─── */
  @keyframes ${p}-glass-prism {
    from { filter: hue-rotate(0deg); }
    to   { filter: hue-rotate(360deg); }
  }
  .${p}-glass-prism {
    background: linear-gradient(
      135deg,
      #ff6b6b, #feca57, #48bb78, #4ade80, #38bdf8,
      #818cf8, #a78bfa, #c084fc, #e879f9, #f472b6
    );
    background-size: 400% 100%;
    -webkit-background-clip: padding-box;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${p}-glass-prism 6s linear infinite;
  }

  /* ─── Liquid ─── */
  @keyframes ${p}-glass-liquid {
    0%, 100% { border-radius: 10%; }
    30%  { border-radius: 40% 30% 60% 40%; }
    60%  { border-radius: 50% 30% 60% 40%; }
    100% { border-radius: 40% 60% 40% 60%; }
  }
  .${p}-glass-liquid {
    transition: border-radius 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
    border-radius: 10%;
  }
  .${p}-glass-liquid:hover {
    border-radius: 50% 30% 60% 40%;
  }

  @media (prefers-reduced-motion: reduce) {
    .${p}-glass-frost-active,
    .${p}-glass-frost:hover,
    .${p}-glass-frost:focus-within,
    .${p}-glass-shine,
    .${p}-glass-wave,
    .${p}-glass-refraction:hover,
    .${p}-glass-focus:focus-within,
    .${p}-glass-prism,
    .${p}-glass-liquid:hover {
      animation: none !important;
      backdrop-filter: none !important;
      border-radius: 10% !important;
    }
  }
}`;
}