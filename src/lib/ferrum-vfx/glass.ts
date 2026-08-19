// Ferrum VFX — Glass Morphism Utilities

import type { GlassOptions, VFXCleanup } from './types';

const GLASS_DEFAULTS: Required<GlassOptions> = {
  blur: 16,
  opacity: 0.15,
  border: '1px solid rgba(255,255,255,0.18)',
  shadow: '0 8px 32px rgba(0,0,0,0.1)',
  background: 'rgba(255,255,255,0.15)',
  saturate: 180,
};

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function applyGlass(element: HTMLElement, options?: GlassOptions): VFXCleanup {
  const o = { ...GLASS_DEFAULTS, ...options };

  const prev: Record<string, string> = {};
  const propKeys = [
    'backdropFilter', 'webkitBackdropFilter', 'background',
    'border', 'boxShadow', 'opacity',
  ] as const;

  if (prefersReducedMotion()) {
    // Static fallback: solid background, no blur
    element.style.background = o.background.replace(/[\d.]+\)/, '0.85)');
    element.style.border = o.border;
    element.style.boxShadow = o.shadow;
    return () => {
      element.style.background = '';
      element.style.border = '';
      element.style.boxShadow = '';
    };
  }

  for (const key of propKeys) {
    prev[key] = (element.style as unknown as Record<string, string>)[key] ?? '';
  }

  element.style.backdropFilter = `blur(${o.blur}px) saturate(${o.saturate}%)`;
  (element.style as unknown as Record<string, string>).webkitBackdropFilter =
    `blur(${o.blur}px) saturate(${o.saturate}%)`;
  element.style.background = o.background;
  element.style.border = o.border;
  element.style.boxShadow = o.shadow;

  return () => {
    const s = element.style as unknown as Record<string, string>;
    for (const key of propKeys) {
      s[key] = prev[key] || '';
    }
  };
}

export function createGlassCard(
  container: HTMLElement,
  content: string,
  options?: GlassOptions,
): HTMLElement {
  const card = document.createElement('div');
  card.textContent = content;
  card.style.padding = '1.5rem';
  card.style.borderRadius = '1rem';
  card.style.color = 'inherit';
  container.appendChild(card);
  applyGlass(card, options);
  return card;
}
