// Ferrum VFX — Cursor Effects

import type { CursorGlowOptions, VFXCleanup } from './types';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function createCursorGlow(
  container: HTMLElement,
  options?: CursorGlowOptions,
): VFXCleanup {
  if (prefersReducedMotion()) return () => {};

  const color = options?.color ?? 'rgba(120,119,198,0.4)';
  const size = options?.size ?? 300;
  const blur = options?.blur ?? 60;
  const opacity = options?.opacity ?? 0.5;

  const glow = document.createElement('div');
  glow.style.cssText =
    `position:fixed;width:${size}px;height:${size}px;border-radius:50%;` +
    `background:radial-gradient(circle,${color},transparent 70%);` +
    `filter:blur(${blur}px);opacity:${opacity};pointer-events:none;z-index:9999;` +
    `transform:translate(-50%,-50%);transition:opacity 0.3s;opacity:0;`;
  document.body.appendChild(glow);

  const prevPos = container.style.position;
  container.style.position = 'relative';

  function onMove(e: MouseEvent) {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
    glow.style.opacity = String(opacity);
  }
  function onLeave() {
    glow.style.opacity = '0';
  }

  container.addEventListener('mousemove', onMove);
  container.addEventListener('mouseleave', onLeave);

  return () => {
    container.removeEventListener('mousemove', onMove);
    container.removeEventListener('mouseleave', onLeave);
    glow.remove();
    container.style.position = prevPos;
  };
}

export function createMagneticEffect(
  element: HTMLElement,
  strength?: number,
): VFXCleanup {
  if (prefersReducedMotion()) return () => {};

  const s = strength ?? 0.3;
  let rafId: number | null = null;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const prevTransform = element.style.transform;
  const prevTransition = element.style.transition;
  element.style.transition = 'transform 0.2s cubic-bezier(0.23,1,0.32,1)';

  function onMove(e: MouseEvent) {
    const rect = element.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    targetX = (e.clientX - cx) * s;
    targetY = (e.clientY - cy) * s;

    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        currentX += (targetX - currentX) * 0.15;
        currentY += (targetY - currentY) * 0.15;
        element.style.transform = `translate(${currentX}px,${currentY}px)`;
        rafId = null;
      });
    }
  }

  function onLeave() {
    targetX = 0;
    targetY = 0;
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        currentX += (0 - currentX) * 0.15;
        currentY += (0 - currentY) * 0.15;
        element.style.transform = `translate(${currentX}px,${currentY}px)`;
        rafId = null;
      });
    }
  }

  element.addEventListener('mousemove', onMove);
  element.addEventListener('mouseleave', onLeave);

  return () => {
    element.removeEventListener('mousemove', onMove);
    element.removeEventListener('mouseleave', onLeave);
    if (rafId !== null) cancelAnimationFrame(rafId);
    element.style.transform = prevTransform;
    element.style.transition = prevTransition;
  };
}
