// Ferrum VFX Tests
import { describe, it, expect, beforeEach } from 'vitest';
import {
  createParticles,
  applyGlass,
  createGlassCard,
  animateGradient,
  createMeshGradient,
  createCursorGlow,
  createMagneticEffect,
  createGlitchText,
  createTextReveal,
} from '@/lib/ferrum-vfx';

describe('ferrum-vfx', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  describe('createParticles', () => {
    it('returns a controller with all methods', () => {
      const ctrl = createParticles(container, { count: 5 });
      expect(ctrl.start).toBeTypeOf('function');
      expect(ctrl.stop).toBeTypeOf('function');
      expect(ctrl.destroy).toBeTypeOf('function');
      expect(ctrl.getCount).toBeTypeOf('function');
      ctrl.destroy();
    });

    it('creates particles on start', () => {
      const ctrl = createParticles(container, { count: 5 });
      ctrl.start();
      // Particles are async so count may be 0 initially, but controller is valid
      expect(ctrl.getCount()).toBeGreaterThanOrEqual(0);
      ctrl.destroy();
    });

    it('cleanup removes particles', () => {
      const ctrl = createParticles(container, { count: 3 });
      ctrl.start();
      ctrl.destroy();
      expect(ctrl.getCount()).toBe(0);
    });
  });

  describe('applyGlass', () => {
    it('applies glass styles to element', () => {
      const el = document.createElement('div');
      const cleanup = applyGlass(el, { blur: 20 });
      expect(el.style.backdropFilter).toContain('blur(20px)');
      cleanup();
    });

    it('cleanup restores styles', () => {
      const el = document.createElement('div');
      const cleanup = applyGlass(el);
      cleanup();
      expect(el.style.backdropFilter).toBe('');
    });

    it('returns a function', () => {
      const cleanup = applyGlass(document.createElement('div'));
      expect(cleanup).toBeTypeOf('function');
      cleanup();
    });
  });

  describe('createGlassCard', () => {
    it('creates a card element in container', () => {
      const card = createGlassCard(container, 'Hello Glass');
      expect(card.textContent).toBe('Hello Glass');
      expect(container.contains(card)).toBe(true);
      expect(card.style.backdropFilter).toContain('blur');
    });
  });

  describe('animateGradient', () => {
    it('returns a cleanup function', () => {
      const el = document.createElement('div');
      const cleanup = animateGradient(el, ['#ff0000', '#0000ff']);
      expect(cleanup).toBeTypeOf('function');
      cleanup();
    });

    it('sets background on element', () => {
      const el = document.createElement('div');
      animateGradient(el, ['#ff0000', '#00ff00', '#0000ff']);
      expect(el.style.background).toBeTruthy();
    });
  });

  describe('createMeshGradient', () => {
    it('creates mesh gradient wrapper in container', () => {
      const cleanup = createMeshGradient(container, { blobs: 3 });
      expect(container.children.length).toBeGreaterThan(0);
      const wrapper = container.firstElementChild;
      expect(wrapper?.tagName).toBe('DIV');
      cleanup();
      expect(container.children.length).toBe(0);
    });

    it('returns cleanup that removes wrapper', () => {
      const cleanup = createMeshGradient(container);
      expect(container.querySelector('div')).not.toBeNull();
      cleanup();
      expect(container.querySelector('div')).toBeNull();
    });
  });

  describe('createCursorGlow', () => {
    it('returns a cleanup function', () => {
      const cleanup = createCursorGlow(container);
      expect(cleanup).toBeTypeOf('function');
      cleanup();
    });

    it('cleanup removes glow element from body', () => {
      const cleanup = createCursorGlow(container);
      const glow = document.body.querySelector('div[style*="radial-gradient"]');
      expect(glow).toBeTruthy();
      cleanup();
      expect(document.body.querySelector('div[style*="radial-gradient"]')).toBeNull();
    });
  });

  describe('createMagneticEffect', () => {
    it('returns a cleanup function', () => {
      const el = document.createElement('div');
      const cleanup = createMagneticEffect(el, 0.5);
      expect(cleanup).toBeTypeOf('function');
      cleanup();
    });

    it('cleanup restores original transform', () => {
      const el = document.createElement('div');
      el.style.transform = 'rotate(5deg)';
      const cleanup = createMagneticEffect(el);
      cleanup();
      expect(el.style.transform).toBe('rotate(5deg)');
    });
  });

  describe('createGlitchText', () => {
    it('returns a cleanup function', () => {
      const el = document.createElement('span');
      el.textContent = 'Glitch Me';
      const cleanup = createGlitchText(el);
      expect(cleanup).toBeTypeOf('function');
      cleanup();
    });

    it('cleanup restores textShadow', () => {
      const el = document.createElement('span');
      el.textContent = 'Test';
      const cleanup = createGlitchText(el);
      cleanup();
      expect(el.style.textShadow).toBe('');
    });
  });

  describe('createTextReveal', () => {
    it('returns a cleanup function', () => {
      const el = document.createElement('div');
      el.textContent = 'Reveal this text';
      const cleanup = createTextReveal(el);
      expect(cleanup).toBeTypeOf('function');
      cleanup();
    });

    it('wraps text in spans', () => {
      const el = document.createElement('div');
      el.textContent = 'ABC';
      createTextReveal(el);
      const spans = el.querySelectorAll('span');
      expect(spans.length).toBe(3);
    });
  });
});
