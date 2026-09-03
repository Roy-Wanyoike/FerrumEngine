// Ferrum VFX — Text Distortion Effects

import type { GlitchOptions, RevealOptions, VFXCleanup } from './types';

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function createGlitchText(
  element: HTMLElement,
  options?: GlitchOptions,
): VFXCleanup {
  if (prefersReducedMotion()) return () => {};

  const intensity = options?.intensity ?? 2;
  const speed = options?.speed ?? 100;
  const glitchColors = options?.colors ?? ['#ff0000', '#00ffff'];

  const prevTextShadow = element.style.textShadow;
  const prevPosition = element.style.position;
  element.style.position = 'relative';

  let intervalId: ReturnType<typeof setInterval>;

  function glitch() {
    const x1 = (Math.random() - 0.5) * intensity;
    const y1 = (Math.random() - 0.5) * intensity;
    const x2 = (Math.random() - 0.5) * intensity;
    const y2 = (Math.random() - 0.5) * intensity;
    element.style.textShadow =
      `${x1}px ${y1}px 0 ${glitchColors[0]!}, ${x2}px ${y2}px 0 ${glitchColors[1]!}`;
  }

  function reset() {
    element.style.textShadow = 'none';
  }

  // Glitch in bursts
  function burst() {
    glitch();
    setTimeout(reset, 50);
    setTimeout(glitch, 80);
    setTimeout(reset, 130);
    setTimeout(glitch, 160);
    setTimeout(reset, 200);
  }

  intervalId = setInterval(burst, speed * 4);

  return () => {
    clearInterval(intervalId);
    element.style.textShadow = prevTextShadow;
    element.style.position = prevPosition;
  };
}

export function createTextReveal(
  element: HTMLElement,
  options?: RevealOptions,
): VFXCleanup {
  if (prefersReducedMotion()) return () => {};

  const delay = options?.delay ?? 0;
  const stagger = options?.stagger ?? 30;
  const duration = options?.duration ?? 500;
  const easing = options?.easing ?? 'cubic-bezier(0.25,0.46,0.45,0.94)';

  const text = element.textContent ?? '';
  const prevHTML = element.innerHTML;

  const spans: HTMLSpanElement[] = [];
  let html = '';

  for (let i = 0; i < text.length; i++) {
    const ch = text[i] === ' ' ? '&nbsp;' : text[i];
    html += `<span style="display:inline-block;opacity:0;transform:translateY(100%);">${ch}</span>`;
  }
  element.innerHTML = html;

  const childSpans = element.querySelectorAll('span');
  childSpans.forEach((s, i) => {
    spans.push(s as HTMLSpanElement);
    setTimeout(() => {
      s.animate(
        [
          { opacity: 0, transform: 'translateY(100%)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        { duration, easing, fill: 'forwards' },
      );
    }, delay + i * stagger);
  });

  return () => {
    element.innerHTML = prevHTML;
  };
}
