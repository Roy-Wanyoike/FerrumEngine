// ─── Physics Motion ─────────────────────────────────
// Physics-simulated easing via cubic-bezier curves.

import type { MotionConfig } from '../types';

export function generatePhysicsCSS(config: MotionConfig = {}): string {
  const p = config.prefix ?? 'fr';

  return `/* ═════════════════════════════════════════════════════════
   FerrumCSS Physics Motion
   Physics-simulated easing via custom cubic-bezier curves.
   No JavaScript required — pure CSS.
   ═════════════════════════════════════════════════════════ */

@layer ferrum.motion-engine {
  /* ─── Spring ─── */
  .${p}-physics-spring {
    --ferrum-easing: cubic-bezier(0.34, 1.56, 0.64, 1);
    transition: transform var(--ferrum-duration, 300ms) var(--ferrum-easing);
  }
  .${p}-physics-spring-active {
    transform: scale(var(--ferrum-spring-scale, 1.05)) translateY(var(--ferrum-spring-translateY, -4px));
  }

  /* ─── Gravity ─── */
  .${p}-physics-gravity {
    --ferrum-easing: cubic-bezier(0.55, 0, 1, 0.45);
    transition: transform var(--ferrum-duration, 400ms) var(--ferrum-easing);
  }
  .${p}-physics-gravity-active {
    transform: translateY(var(--ferrum-gravity-distance, 60px));
  }

  /* ─── Elastic ─── */
  .${p}-physics-elastic {
    --ferrum-easing: cubic-bezier(0.68, -0.6, 0.32, 1.6);
    transition: transform var(--ferrum-duration, 500ms) var(--ferrum-easing);
  }
  .${p}-physics-elastic-active {
    transform: scale(var(--ferrum-elastic-scale, 1.1)) skewX(var(--ferrum-elastic-skew, -3deg));
  }

  /* ─── Magnetic ─── */
  .${p}-physics-magnetic {
    --ferrum-easing: cubic-bezier(0.46, 0, 0.18, 1.2);
    transition: transform var(--ferrum-duration, 300ms) var(--ferrum-easing);
  }

  /* ─── Friction ─── */
  .${p}-physics-friction {
    --ferrum-easing: cubic-bezier(0.7, 0, 0.84, 0);
    transition: transform var(--ferrum-duration, 400ms) var(--ferrum-easing);
  }

  /* ─── Liquid ─── */
  .${p}-physics-liquid {
    --ferrum-easing: cubic-bezier(0.45, 0.05, 0.55, 0.95);
    transition: transform var(--ferrum-duration, 400ms) var(--ferrum-easing);
  }

  /* ─── Bounce ─── */
  .${p}-physics-bounce {
    --ferrum-easing: cubic-bezier(0.34, 1.8, 0.64, 1);
    transition: transform var(--ferrum-duration, 500ms) var(--ferrum-easing);
  }
  .${p}-physics-bounce-active {
    transform: translateY(var(--ferrum-bounce-distance, -8px));
  }

  /* ─── Weight ─── */
  .${p}-physics-weight {
    --ferrum-easing: cubic-bezier(0.8, 0, 0.5, 0);
    transition: transform var(--ferrum-duration, 500ms) var(--ferrum-easing);
  }

  /* ─── Air ─── */
  .${p}-physics-air {
    --ferrum-easing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transition: transform var(--ferrum-duration, 300ms) var(--ferrum-easing);
  }
  .${p}-physics-air-active {
    transform: translateY(var(--ferrum-air-distance, -4px));
  }

  /* ─── Drift ─── */
  .${p}-physics-drift {
    --ferrum-easing: cubic-bezier(0.2, 0.8, 0.4, 1);
    transition: transform var(--ferrum-duration, 600ms) var(--ferrum-easing);
  }
  .${p}-physics-drift-active {
    transform: translateX(var(--ferrum-drift-distance, 20px));
  }

  /* ─── Snap ─── */
  .${p}-physics-snap {
    --ferrum-easing: cubic-bezier(0.15, 1, 0.3, 1);
    transition: transform var(--ferrum-duration, 200ms) var(--ferrum-easing);
  }
  .${p}-physics-snap-active {
    transform: scale(var(--ferrum-snap-scale, 1.02));
  }

  /* ─── Inertia ─── */
  .${p}-physics-inertia {
    --ferrum-easing: cubic-bezier(0.9, 0, 0.1, 1);
    transition: transform var(--ferrum-duration, 800ms) var(--ferrum-easing);
  }

  /* ─── Pendulum ─── */
  .${p}-physics-pendulum {
    --ferrum-easing: cubic-bezier(0.5, 0, 0.5, 1);
    transition: transform var(--ferrum-duration, 1000ms) var(--ferrum-easing);
  }
  .${p}-physics-pendulum-active {
    transform: rotate(var(--ferrum-pendulum-angle, 15deg));
    transform-origin: top center;
  }

  /* ─── Orbit ─── */
  .${p}-physics-orbit {
    --ferrum-easing: cubic-bezier(0.37, 0, 0.63, 1);
    transition: transform var(--ferrum-duration, 2s) var(--ferrum-easing);
  }
  .${p}-physics-orbit-active {
    transform: rotate(var(--ferrum-orbit-angle, 90deg));
    transform-origin: center;
  }

  /* ─── Float ─── */
  .${p}-physics-float {
    --ferrum-easing: cubic-bezier(0.25, 0.1, 0.25, 1);
    transition: transform var(--ferrum-duration, 3s) var(--ferrum-easing);
  }
  .${p}-physics-float-active {
    transform: translateY(var(--ferrum-float-distance, -6px));
  }

  /* ─── Levitate ─── */
  .${p}-physics-levitate {
    --ferrum-easing: cubic-bezier(0.3, 0, 0.7, 1);
    transition: transform var(--ferrum-duration, 2s) var(--ferrum-easing);
  }
  .${p}-physics-levitate-active {
    transform: translateY(var(--ferrum-levitate-distance, -10px)) scale(1.02);
  }

  @media (prefers-reduced-motion: reduce) {
    [class*="${p}-physics-"] {
      transition-timing-function: ease !important;
    }
  }
}`;
}