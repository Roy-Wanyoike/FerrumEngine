// Ferrum VFX — Animated Gradient Utilities

import type { GradientOptions, MeshGradientConfig, VFXCleanup } from './types';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function animateGradient(
  element: HTMLElement,
  colors: string[],
  options?: GradientOptions,
): VFXCleanup {
  const duration = options?.duration ?? 4000;
  const angle = options?.angle ?? 135;
  const easing = options?.easing ?? 'linear';

  if (prefersReducedMotion() || colors.length < 2) {
    element.style.background = `linear-gradient(${angle}deg, ${colors.join(', ')})`;
    return () => { element.style.background = ''; };
  }

  // Set initial gradient immediately
  element.style.background = `linear-gradient(${angle}deg, ${colors.join(', ')})`;
  element.style.backgroundSize = '200% 200%';

  let active = true;
  let frameId: number;
  let start: number | null = null;

  function step(ts: number) {
    if (!active) return;
    if (start === null) start = ts;
    const elapsed = ts - start;
    const t = (elapsed % duration) / duration;
    const offset = Math.floor(t * colors.length);
    const rotated = [...colors.slice(offset), ...colors.slice(0, offset)];
    element.style.background = `linear-gradient(${angle}deg, ${rotated.join(', ')})`;
    element.style.backgroundSize = '200% 200%';
    element.style.transition = `background ${duration / colors.length}ms ${easing}`;
    frameId = requestAnimationFrame(step);
  }

  const prevBg = element.style.background;
  frameId = requestAnimationFrame(step);

  return () => {
    active = false;
    cancelAnimationFrame(frameId);
    element.style.background = prevBg;
    element.style.backgroundSize = '';
    element.style.transition = '';
  };
}

export function createMeshGradient(
  container: HTMLElement,
  config?: MeshGradientConfig,
): VFXCleanup {
  const colors = config?.colors ?? ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];
  const blobCount = config?.blobs ?? 5;
  const blobSize = config?.size ?? 300;
  const blur = config?.blur ?? 80;
  const opacity = config?.opacity ?? 0.5;
  const shouldAnimate = config?.animate !== false;
  const speed = config?.speed ?? 0.002;

  const wrapper = document.createElement('div');
  wrapper.style.cssText = `position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;`;
  container.style.position = 'relative';
  container.prepend(wrapper);

  const blobs: HTMLDivElement[] = [];
  const blobData: Array<{ x: number; y: number; vx: number; vy: number }> = [];

  for (let i = 0; i < blobCount; i++) {
    const blob = document.createElement('div');
    const color = colors[i % colors.length]!;
    blob.style.cssText =
      `position:absolute;width:${blobSize}px;height:${blobSize}px;border-radius:50%;` +
      `background:${color};filter:blur(${blur}px);opacity:${opacity};` +
      `transform:translate(-50%,-50%);will-change:transform;`;
    wrapper.appendChild(blob);
    blobs.push(blob);
    blobData.push({
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * speed * 1000,
      vy: (Math.random() - 0.5) * speed * 1000,
    });
  }

  if (prefersReducedMotion() || !shouldAnimate) return () => wrapper.remove();

  let rafId: number;
  let active = true;

  function tick() {
    if (!active) return;
    for (let i = 0; i < blobs.length; i++) {
      const d = blobData[i]!;
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0 || d.x > 100) d.vx *= -1;
      if (d.y < 0 || d.y > 100) d.vy *= -1;
      blobs[i]!.style.left = `${d.x}%`;
      blobs[i]!.style.top = `${d.y}%`;
    }
    rafId = requestAnimationFrame(tick);
  }

  rafId = requestAnimationFrame(tick);

  return () => {
    active = false;
    cancelAnimationFrame(rafId);
    wrapper.remove();
  };
}
