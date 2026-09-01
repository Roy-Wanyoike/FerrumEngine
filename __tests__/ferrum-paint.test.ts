import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  isPaintAPISupported,
  getWorkletURL,
  getAllWorkletURLs,
  generatePaintCSS,
  FERRUM_WORKLET_NAMES,
  WORKLET_MODULES,
  registerFerrumPaintWorklets,
  type FerrumWorkletName,
} from '@/lib/ferrum-paint';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/** Temporarily mock CSS.paintWorklet on window */
function mockPaintAPI() {
  const addModule = vi.fn().mockResolvedValue(undefined);
  const paintWorklet = { addModule };
  Object.defineProperty(window, 'CSS', {
    value: { paintWorklet },
    writable: true,
    configurable: true,
  });
  return { addModule };
}

function clearPaintAPIMock() {
  const css = (window as Record<string, unknown>).CSS as Record<string, unknown> | undefined;
  if (css) {
    delete (css as Record<string, unknown>).paintWorklet;
  }
}

/* ------------------------------------------------------------------ */
/*  Tests                                                              */
/* ------------------------------------------------------------------ */

describe('Ferrum Paint Worklets', () => {
  /* ---- FERRUM_WORKLET_NAMES ---- */
  describe('FERRUM_WORKLET_NAMES', () => {
    it('contains exactly 6 worklet names', () => {
      expect(FERRUM_WORKLET_NAMES).toHaveLength(6);
    });

    it('includes all expected worklets', () => {
      const expected = [
        'ferrum-glow',
        'ferrum-glass',
        'ferrum-ripple',
        'ferrum-noise',
        'ferrum-gradient-mesh',
        'ferrum-confetti',
      ];
      for (const name of expected) {
        expect(FERRUM_WORKLET_NAMES).toContain(name);
      }
    });
  });

  /* ---- WORKLET_MODULES ---- */
  describe('WORKLET_MODULES', () => {
    it('has an entry for every worklet name', () => {
      for (const name of FERRUM_WORKLET_NAMES) {
        expect(WORKLET_MODULES[name]).toBeDefined();
        expect(typeof WORKLET_MODULES[name]).toBe('string');
      }
    });

    it('maps each name to a .js file', () => {
      for (const name of FERRUM_WORKLET_NAMES) {
        expect(WORKLET_MODULES[name]).toMatch(/\.js$/);
      }
    });
  });

  /* ---- isPaintAPISupported ---- */
  describe('isPaintAPISupported', () => {
    afterEach(() => {
      clearPaintAPIMock();
    });

    it('returns false when CSS.paintWorklet is not present', () => {
      expect(isPaintAPISupported()).toBe(false);
    });

    it('returns true when CSS.paintWorklet is present', () => {
      mockPaintAPI();
      expect(isPaintAPISupported()).toBe(true);
    });
  });

  /* ---- getWorkletURL ---- */
  describe('getWorkletURL', () => {
    it('returns a URL starting with /worklets/', () => {
      for (const name of FERRUM_WORKLET_NAMES) {
        const url = getWorkletURL(name);
        expect(url).toMatch(/^\/worklets\//);
      }
    });

    it('includes the correct filename for each worklet', () => {
      for (const name of FERRUM_WORKLET_NAMES) {
        const url = getWorkletURL(name);
        expect(url).toBe(`/worklets/${WORKLET_MODULES[name]}`);
      }
    });
  });

  /* ---- getAllWorkletURLs ---- */
  describe('getAllWorkletURLs', () => {
    it('returns 6 URLs', () => {
      expect(getAllWorkletURLs()).toHaveLength(6);
    });

    it('each URL is unique', () => {
      const urls = getAllWorkletURLs();
      const unique = new Set(urls);
      expect(unique.size).toBe(urls.length);
    });
  });

  /* ---- generatePaintCSS ---- */
  describe('generatePaintCSS', () => {
    it('generates CSS with @supports guard and paint() function', () => {
      const css = generatePaintCSS('ferrum-glow');
      expect(css).toContain('@supports');
      expect(css).toContain('paint(ferrum-glow)');
      expect(css).toContain('paint(id)');
    });

    it('includes the fallback value outside @supports', () => {
      const css = generatePaintCSS('ferrum-noise', 'background', '#1a1a2e');
      expect(css).toContain('background: #1a1a2e');
    });

    it('uses custom property and fallback value when provided', () => {
      const css = generatePaintCSS('ferrum-ripple', 'border-image', 'none');
      expect(css).toContain('border-image: paint(ferrum-ripple)');
      expect(css).toContain('border-image: none');
      expect(css).toContain('@supports (border-image: paint(id))');
    });

    it('generates correct class name from worklet name', () => {
      const css = generatePaintCSS('ferrum-confetti');
      expect(css).toContain('.ferrum-confetti-element');
    });

    it('generates correct class for ferrum-gradient-mesh', () => {
      const css = generatePaintCSS('ferrum-gradient-mesh');
      expect(css).toContain('.ferrum-gradient-mesh-element');
    });

    it('defaults to transparent fallback', () => {
      const css = generatePaintCSS('ferrum-glass');
      expect(css).toContain('background: transparent');
    });
  });

  /* ---- registerFerrumPaintWorklets ---- */
  describe('registerFerrumPaintWorklets', () => {
    afterEach(() => {
      clearPaintAPIMock();
    });

    it('returns false when Paint API is not supported', async () => {
      const result = await registerFerrumPaintWorklets();
      expect(result).toBe(false);
    });

    it('calls addModule for each worklet when Paint API is supported', async () => {
      const { addModule } = mockPaintAPI();
      const result = await registerFerrumPaintWorklets();
      expect(result).toBe(true);
      expect(addModule).toHaveBeenCalledTimes(6);
    });

    it('passes correct URLs to addModule', async () => {
      const { addModule } = mockPaintAPI();
      await registerFerrumPaintWorklets();
      const urls = getAllWorkletURLs();
      for (const url of urls) {
        expect(addModule).toHaveBeenCalledWith(url);
      }
    });
  });
});
