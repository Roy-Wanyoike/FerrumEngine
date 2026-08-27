/* ===== Ferrum VFX — Reveal Engine ===== */
/* Content reveal animations using clip-path, transforms, and masking */

export function generateRevealCSS(prefix: string = 'fr-'): string {
  const p = prefix;

  return `@layer ferrum.vfx {

  /* --- fx-reveal-curtain: clip-path: inset(0 100% 0 0) → inset(0 0% 0 0) --- */
  @keyframes ${p}fx-reveal-curtain {
    0%   { clip-path: inset(0 100% 0 0); }
    100% { clip-path: inset(0 0% 0 0); }
  }
  .${p}fx-reveal-curtain {
    --ferrum-curtain-duration: 0.8s;
    --ferrum-curtain-ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    clip-path: inset(0 100% 0 0);
    animation: ${p}fx-reveal-curtain var(--ferrum-curtain-duration) var(--ferrum-curtain-ease) forwards;
  }

  /* --- fx-reveal-spotlight: radial-gradient mask from center --- */
  @keyframes ${p}fx-reveal-spotlight {
    0%   { -webkit-mask-size: 0% 0%; mask-size: 0% 0%; }
    100% { -webkit-mask-size: 200% 200%; mask-size: 200% 200%; }
  }
  .${p}fx-reveal-spotlight {
    --ferrum-spotlight-reveal-duration: 1s;
    -webkit-mask-image: radial-gradient(circle, black 30%, transparent 70%);
    mask-image: radial-gradient(circle, black 30%, transparent 70%);
    -webkit-mask-size: 0% 0%;
    mask-size: 0% 0%;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: center center;
    mask-position: center center;
    animation: ${p}fx-reveal-spotlight var(--ferrum-spotlight-reveal-duration) ease-out forwards;
  }

  /* --- fx-reveal-ink: scale(0) + border-radius + opacity --- */
  @keyframes ${p}fx-reveal-ink {
    0%   {
      transform: scale(0);
      border-radius: 50%;
      opacity: 0;
    }
    60%  {
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
      opacity: 1;
    }
    100% {
      transform: scale(1);
      border-radius: inherit;
      opacity: 1;
    }
  }
  .${p}fx-reveal-ink {
    --ferrum-ink-duration: 0.8s;
    transform: scale(0);
    border-radius: 50%;
    opacity: 0;
    animation: ${p}fx-reveal-ink var(--ferrum-ink-duration) cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  /* --- fx-reveal-type: typewriter-like width animation --- */
  @keyframes ${p}fx-reveal-type {
    0%   { max-width: 0; opacity: 1; }
    100% { max-width: 100%; opacity: 1; }
  }
  .${p}fx-reveal-type {
    --ferrum-type-duration: 2s;
    --ferrum-type-steps: 30;
    max-width: 0;
    overflow: hidden;
    white-space: nowrap;
    animation: ${p}fx-reveal-type var(--ferrum-type-duration) steps(var(--ferrum-type-steps)) forwards;
  }

  /* --- fx-reveal-gradient: background-size slide reveal --- */
  @keyframes ${p}fx-reveal-gradient-slide {
    0%   { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .${p}fx-reveal-gradient {
    --ferrum-gradient-color: #6366f1;
    --ferrum-gradient-duration: 1s;
    background: linear-gradient(90deg, var(--ferrum-gradient-color) 50%, transparent 50%) left / 200% 100% no-repeat;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${p}fx-reveal-gradient-slide var(--ferrum-gradient-duration) ease-out forwards;
  }

  /* --- fx-reveal-morph: clip-path: circle() → polygon(50%) --- */
  @keyframes ${p}fx-reveal-morph {
    0%   { clip-path: circle(0% at 50% 50%); }
    100% { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
  }
  .${p}fx-reveal-morph {
    --ferrum-morph-duration: 0.8s;
    clip-path: circle(0% at 50% 50%);
    animation: ${p}fx-reveal-morph var(--ferrum-morph-duration) cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  /* --- fx-reveal-slide-up: translateY(100%)→0 with clip --- */
  @keyframes ${p}fx-reveal-slide-up {
    0%   {
      transform: translateY(100%);
      clip-path: inset(100% 0 0 0);
    }
    100% {
      transform: translateY(0);
      clip-path: inset(0 0 0 0);
    }
  }
  .${p}fx-reveal-slide-up {
    --ferrum-slide-up-duration: 0.7s;
    transform: translateY(100%);
    clip-path: inset(100% 0 0 0);
    animation: ${p}fx-reveal-slide-up var(--ferrum-slide-up-duration) cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  /* --- fx-reveal-wave: clip-path with wave shape --- */
  @keyframes ${p}fx-reveal-wave {
    0%   {
      clip-path: polygon(
        0% 100%, 5% 100%, 5% 95%, 10% 95%, 10% 100%, 15% 100%, 15% 90%,
        20% 90%, 20% 100%, 25% 100%, 25% 85%, 30% 85%, 30% 100%, 35% 100%,
        35% 80%, 40% 80%, 40% 100%, 45% 100%, 45% 75%, 50% 75%, 50% 100%,
        55% 100%, 55% 70%, 60% 70%, 60% 100%, 65% 100%, 65% 65%, 70% 65%,
        70% 100%, 75% 100%, 75% 60%, 80% 60%, 80% 100%, 85% 100%, 85% 55%,
        90% 55%, 90% 100%, 95% 100%, 95% 50%, 100% 50%, 100% 100%, 100% 100%,
        0% 100%
      );
    }
    100% {
      clip-path: polygon(
        0% 0%, 5% 0%, 5% 5%, 10% 5%, 10% 0%, 15% 0%, 15% 10%,
        20% 10%, 20% 0%, 25% 0%, 25% 15%, 30% 15%, 30% 0%, 35% 0%,
        35% 20%, 40% 20%, 40% 0%, 45% 0%, 45% 25%, 50% 25%, 50% 0%,
        55% 0%, 55% 30%, 60% 30%, 60% 0%, 65% 0%, 65% 35%, 70% 35%,
        70% 0%, 75% 0%, 75% 40%, 80% 40%, 80% 0%, 85% 0%, 85% 45%,
        90% 45%, 90% 0%, 95% 0%, 95% 50%, 100% 50%, 100% 0%, 100% 0%,
        0% 0%
      );
    }
  }
  .${p}fx-reveal-wave {
    --ferrum-wave-duration: 1.2s;
    clip-path: inset(100% 0 0 0);
    animation: ${p}fx-reveal-wave var(--ferrum-wave-duration) steps(1) forwards;
  }

  /* --- fx-reveal-liquid: border-radius morph + scale --- */
  @keyframes ${p}fx-reveal-liquid {
    0% {
      transform: scale(0.3);
      border-radius: 50%;
      opacity: 0;
    }
    30% {
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
      opacity: 0.7;
    }
    60% {
      border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
      opacity: 1;
    }
    100% {
      transform: scale(1);
      border-radius: inherit;
      opacity: 1;
    }
  }
  .${p}fx-reveal-liquid {
    --ferrum-liquid-reveal-duration: 1s;
    transform: scale(0.3);
    border-radius: 50%;
    opacity: 0;
    animation: ${p}fx-reveal-liquid var(--ferrum-liquid-reveal-duration) cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  /* --- fx-reveal-mask-fade: reveal using mask-image with gradient fade --- */
  @keyframes ${p}fx-reveal-mask-fade {
    0%   { -webkit-mask-position: 0% 50%; mask-position: 0% 50%; }
    100% { -webkit-mask-position: 100% 50%; mask-position: 100% 50%; }
  }
  .${p}fx-reveal-mask-fade {
    --ferrum-mask-fade-duration: 1s;
    --ferrum-mask-fade-direction: to right;
    -webkit-mask-image: linear-gradient(var(--ferrum-mask-fade-direction), transparent 0%, black 40%, black 60%, transparent 100%);
    mask-image: linear-gradient(var(--ferrum-mask-fade-direction), transparent 0%, black 40%, black 60%, transparent 100%);
    -webkit-mask-size: 200% 100%;
    mask-size: 200% 100%;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-position: 0% 50%;
    mask-position: 0% 50%;
    animation: ${p}fx-reveal-mask-fade var(--ferrum-mask-fade-duration) ease-out forwards;
  }

  /* --- fx-reveal-diagonal: diagonal wipe reveal using clip-path polygon --- */
  @keyframes ${p}fx-reveal-diagonal {
    0%   { clip-path: polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%); }
    100% { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
  }
  .${p}fx-reveal-diagonal {
    --ferrum-diagonal-duration: 0.8s;
    clip-path: polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%);
    animation: ${p}fx-reveal-diagonal var(--ferrum-diagonal-duration) cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  /* --- fx-reveal-blur: reveals from blurred to clear --- */
  @keyframes ${p}fx-reveal-blur {
    0%   { filter: blur(20px); opacity: 0; transform: scale(1.05); }
    100% { filter: blur(0px); opacity: 1; transform: scale(1); }
  }
  .${p}fx-reveal-blur {
    --ferrum-blur-reveal-amount: 20px;
    --ferrum-blur-reveal-duration: 0.8s;
    filter: blur(var(--ferrum-blur-reveal-amount));
    opacity: 0;
    transform: scale(1.05);
    animation: ${p}fx-reveal-blur var(--ferrum-blur-reveal-duration) cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  /* --- fx-reveal-scale: scale from 0.8 to 1 with opacity --- */
  @keyframes ${p}fx-reveal-scale {
    0%   { transform: scale(0.8); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  .${p}fx-reveal-scale {
    --ferrum-scale-reveal-duration: 0.6s;
    --ferrum-scale-reveal-from: 0.8;
    transform: scale(var(--ferrum-scale-reveal-from));
    opacity: 0;
    animation: ${p}fx-reveal-scale var(--ferrum-scale-reveal-duration) cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  /* --- fx-reveal-rotate: rotate in from -5deg + opacity --- */
  @keyframes ${p}fx-reveal-rotate {
    0%   { transform: rotate(-5deg) scale(0.95); opacity: 0; }
    100% { transform: rotate(0deg) scale(1); opacity: 1; }
  }
  .${p}fx-reveal-rotate {
    --ferrum-rotate-reveal-duration: 0.7s;
    --ferrum-rotate-reveal-from: -5deg;
    transform: rotate(var(--ferrum-rotate-reveal-from)) scale(0.95);
    opacity: 0;
    animation: ${p}fx-reveal-rotate var(--ferrum-rotate-reveal-duration) cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  /* --- fx-reveal-flip: 3D flip reveal using rotateY + perspective --- */
  @keyframes ${p}fx-reveal-flip {
    0%   { transform: perspective(800px) rotateY(-90deg); opacity: 0; }
    40%  { opacity: 1; }
    100% { transform: perspective(800px) rotateY(0deg); opacity: 1; }
  }
  .${p}fx-reveal-flip {
    --ferrum-flip-reveal-duration: 0.8s;
    --ferrum-flip-perspective: 800px;
    transform: perspective(var(--ferrum-flip-perspective)) rotateY(-90deg);
    opacity: 0;
    transform-style: preserve-3d;
    animation: ${p}fx-reveal-flip var(--ferrum-flip-reveal-duration) cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

}`;
}