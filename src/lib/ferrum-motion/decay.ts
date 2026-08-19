// Ferrum Motion — Decay Animation

import type { DecayConfig, DecayController } from './types';
import { shouldReduceMotion } from './reduced-motion';

const DECAY_DEFAULTS = {
  deceleration: 0.998,
  bounceStiffness: 200,
  minVelocity: 0.5,
};

/** Create a decay-animated value (momentum-based) */
export function decay(value: number, config: DecayConfig): DecayController {
  const cfg = { ...DECAY_DEFAULTS, ...config };
  let current = value;
  let vel = config.velocity;
  let rafId: number | null = null;
  let running = false;
  let lastTime: number | null = null;

  function step(timestamp: number): void {
    if (!running) return;
    if (lastTime === null) lastTime = timestamp;
    const dt = Math.min((timestamp - lastTime) / 1000, 0.064);
    lastTime = timestamp;

    // Apply deceleration
    vel *= Math.pow(cfg.deceleration, dt * 60);
    current += vel * dt * 60;

    // Bounce off bounds
    if (cfg.min !== undefined && current < cfg.min) {
      current = cfg.min;
      vel = -vel * 0.5;
    }
    if (cfg.max !== undefined && current > cfg.max) {
      current = cfg.max;
      vel = -vel * 0.5;
    }

    if (Math.abs(vel) < cfg.minVelocity) {
      running = false;
      rafId = null;
      lastTime = null;
      return;
    }

    rafId = requestAnimationFrame(step);
  }

  function start(): void {
    if (running) return;
    if (shouldReduceMotion()) { vel = 0; return; }
    running = true;
    lastTime = null;
    rafId = requestAnimationFrame(step);
  }

  return {
    to(_target: number): void {
      // For decay, 'to' is not the primary API; we set velocity
      start();
    },
    set(v: number): void {
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
      running = false;
      current = v;
    },
    get(): number { return current; },
    stop(): void {
      running = false;
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
      lastTime = null;
    },
  };
}
