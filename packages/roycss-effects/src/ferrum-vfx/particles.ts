// Ferrum VFX — Lightweight DOM Particle System

import type { ParticleConfig, ParticleController } from './types';

const DEFAULTS = {
  count: 30,
  size: { min: 3, max: 8 },
  color: 'rgba(255,255,255,0.7)',
  spread: 200,
  duration: 2000,
  easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
};

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function createParticleEl(
  container: HTMLElement,
  config: Required<ParticleConfig>,
): HTMLDivElement {
  const el = document.createElement('div');
  const size = randomBetween(config.size.min, config.size.max);
  const x = randomBetween(-config.spread / 2, config.spread / 2);
  const y = randomBetween(-config.spread / 2, config.spread / 2);
  const angle = randomBetween(0, 360);
  const dist = randomBetween(30, config.spread);

  Object.assign(el.style, {
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    backgroundColor: config.color,
    left: '50%',
    top: '50%',
    transform: `translate(${x}px, ${y}px)`,
    pointerEvents: 'none',
    opacity: '0',
  });

  container.style.position = 'relative';
  container.appendChild(el);

  // Trigger animation
  el.animate(
    [
      { opacity: 0, transform: `translate(${x}px, ${y}px) scale(0)` },
      { opacity: 1, transform: `translate(${x}px, ${y}px) scale(1)`, offset: 0.2 },
      {
        opacity: 0,
        transform: `translate(${x + Math.cos(angle) * dist}px, ${y + Math.sin(angle) * dist}px) scale(0)`,
      },
    ],
    { duration: config.duration, easing: config.easing, fill: 'forwards' },
  );

  return el;
}

export function createParticles(
  container: HTMLElement,
  config?: ParticleConfig,
): ParticleController {
  const resolved: Required<ParticleConfig> = {
    count: config?.count ?? DEFAULTS.count,
    size: config?.size ?? DEFAULTS.size,
    color: config?.color ?? DEFAULTS.color,
    spread: config?.spread ?? DEFAULTS.spread,
    duration: config?.duration ?? DEFAULTS.duration,
    easing: config?.easing ?? DEFAULTS.easing,
  };

  const particles: HTMLDivElement[] = [];
  let running = false;
  let rafId: number | null = null;
  let destroyed = false;

  function spawn() {
    if (destroyed || !running) return;
    for (let i = 0; i < resolved.count; i++) {
      const el = createParticleEl(container, resolved);
      particles.push(el);
      el.addEventListener('finish', () => {
        el.remove();
        const idx = particles.indexOf(el);
        if (idx > -1) particles.splice(idx, 1);
        if (running && !destroyed) {
          const next = createParticleEl(container, resolved);
          particles.push(next);
          next.addEventListener('finish', () => {
            next.remove();
            const ni = particles.indexOf(next);
            if (ni > -1) particles.splice(ni, 1);
          });
        }
      });
    }
  }

  return {
    start() {
      if (prefersReducedMotion()) return;
      running = true;
      spawn();
    },
    stop() {
      running = false;
      if (rafId !== null) cancelAnimationFrame(rafId);
    },
    destroy() {
      destroyed = true;
      running = false;
      if (rafId !== null) cancelAnimationFrame(rafId);
      for (const p of particles) p.remove();
      particles.length = 0;
    },
    getCount() {
      return particles.length;
    },
  };
}
