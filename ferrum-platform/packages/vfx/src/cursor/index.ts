/* ===== Ferrum VFX — Cursor Effects Engine ===== */
/* CSS-driven cursor effects. JS must set --ferrum-cursor-x and --ferrum-cursor-y */

export function generateCursorCSS(prefix: string = 'fr-'): string {
  const p = prefix;

  return `@layer ferrum.vfx {

  /* --- fx-cursor-glow: radial-gradient at cursor position --- */
  .${p}fx-cursor-glow {
    --ferrum-cursor-x: 50%;
    --ferrum-cursor-y: 50%;
    --ferrum-cursor-glow-color: rgba(99, 102, 241, 0.15);
    --ferrum-cursor-glow-size: 300px;
    position: relative;
    overflow: hidden;
  }
  .${p}fx-cursor-glow::before {
    content: '';
    position: absolute;
    width: var(--ferrum-cursor-glow-size);
    height: var(--ferrum-cursor-glow-size);
    left: var(--ferrum-cursor-x);
    top: var(--ferrum-cursor-y);
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, var(--ferrum-cursor-glow-color) 0%, transparent 70%);
    pointer-events: none;
    z-index: 1;
    transition: left 0.15s ease-out, top 0.15s ease-out;
  }

  /* --- fx-cursor-spotlight: cone of light from cursor --- */
  .${p}fx-cursor-spotlight {
    --ferrum-cursor-x: 50%;
    --ferrum-cursor-y: 50%;
    --ferrum-spotlight-color: rgba(255, 255, 255, 0.06);
    --ferrum-spotlight-size: 400px;
    position: relative;
    overflow: hidden;
    background: #111;
  }
  .${p}fx-cursor-spotlight::before {
    content: '';
    position: absolute;
    width: var(--ferrum-spotlight-size);
    height: var(--ferrum-spotlight-size);
    left: var(--ferrum-cursor-x);
    top: var(--ferrum-cursor-y);
    transform: translate(-50%, -50%);
    background: radial-gradient(ellipse 50% 70% at 50% 50%, var(--ferrum-spotlight-color) 0%, transparent 100%);
    pointer-events: none;
    z-index: 1;
    transition: left 0.1s ease-out, top 0.1s ease-out;
  }
  .${p}fx-cursor-spotlight::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse 60% 80% at var(--ferrum-cursor-x) var(--ferrum-cursor-y),
      transparent 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
    pointer-events: none;
    transition: background 0.1s ease-out;
  }

  /* --- fx-cursor-ripple: expanding circle from cursor click point --- */
  @keyframes ${p}fx-cursor-ripple-expand {
    0%   { width: 0; height: 0; opacity: 0.6; }
    100% { width: var(--ferrum-ripple-max-size, 200px); height: var(--ferrum-ripple-max-size, 200px); opacity: 0; }
  }
  .${p}fx-cursor-ripple {
    --ferrum-cursor-x: 50%;
    --ferrum-cursor-y: 50%;
    --ferrum-ripple-color: rgba(99, 102, 241, 0.3);
    --ferrum-ripple-max-size: 200px;
    --ferrum-ripple-duration: 0.8s;
    position: relative;
    overflow: hidden;
  }
  .${p}fx-cursor-ripple::before {
    content: '';
    position: absolute;
    left: var(--ferrum-cursor-x);
    top: var(--ferrum-cursor-y);
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 2px solid var(--ferrum-ripple-color);
    animation: ${p}fx-cursor-ripple-expand var(--ferrum-ripple-duration) ease-out infinite;
    pointer-events: none;
    z-index: 1;
  }
  .${p}fx-cursor-ripple::after {
    content: '';
    position: absolute;
    left: var(--ferrum-cursor-x);
    top: var(--ferrum-cursor-y);
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 2px solid var(--ferrum-ripple-color);
    animation: ${p}fx-cursor-ripple-expand var(--ferrum-ripple-duration) ease-out infinite;
    animation-delay: calc(var(--ferrum-ripple-duration) * -0.5);
    pointer-events: none;
    z-index: 1;
  }

  /* --- fx-cursor-trail: opacity fade on cursor path --- */
  .${p}fx-cursor-trail {
    --ferrum-cursor-x: 50%;
    --ferrum-cursor-y: 50%;
    --ferrum-trail-color: rgba(99, 102, 241, 0.2);
    --ferrum-trail-size: 12px;
    position: relative;
    overflow: hidden;
  }
  .${p}fx-cursor-trail::before {
    content: '';
    position: absolute;
    width: var(--ferrum-trail-size);
    height: var(--ferrum-trail-size);
    left: var(--ferrum-cursor-x);
    top: var(--ferrum-cursor-y);
    transform: translate(-50%, -50%);
    background: var(--ferrum-trail-color);
    border-radius: 50%;
    filter: blur(4px);
    pointer-events: none;
    z-index: 1;
    transition:
      left 0.5s ease-out,
      top 0.5s ease-out,
      opacity 0.5s ease-out;
    opacity: 0.8;
  }
  .${p}fx-cursor-trail::after {
    content: '';
    position: absolute;
    width: calc(var(--ferrum-trail-size) * 2);
    height: calc(var(--ferrum-trail-size) * 2);
    left: var(--ferrum-cursor-x);
    top: var(--ferrum-cursor-y);
    transform: translate(-50%, -50%);
    background: var(--ferrum-trail-color);
    border-radius: 50%;
    filter: blur(8px);
    pointer-events: none;
    z-index: 1;
    transition:
      left 0.8s ease-out,
      top 0.8s ease-out,
      opacity 0.8s ease-out;
    opacity: 0.3;
  }

  /* --- fx-cursor-magnetic: elements move toward cursor --- */
  .${p}fx-cursor-magnetic {
    --ferrum-cursor-x: 50%;
    --ferrum-cursor-y: 50%;
    --ferrum-magnetic-strength: 20px;
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    transform:
      translate(
        calc((var(--ferrum-cursor-x) - 50%) * var(--ferrum-magnetic-strength) / 100),
        calc((var(--ferrum-cursor-y) - 50%) * var(--ferrum-magnetic-strength) / 100)
      );
  }

  /* --- fx-cursor-parallax: elements shift opposite to cursor --- */
  .${p}fx-cursor-parallax {
    --ferrum-cursor-x: 50%;
    --ferrum-cursor-y: 50%;
    --ferrum-parallax-strength: 30px;
    transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    transform:
      translate(
        calc((50% - var(--ferrum-cursor-x)) * var(--ferrum-parallax-strength) / 100),
        calc((50% - var(--ferrum-cursor-y)) * var(--ferrum-parallax-strength) / 100)
      );
  }

  /* --- fx-cursor-gravity: elements attracted to cursor with spring --- */
  .${p}fx-cursor-gravity {
    --ferrum-cursor-x: 50%;
    --ferrum-cursor-y: 50%;
    --ferrum-gravity-strength: 15px;
    transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    transform:
      translate(
        calc((var(--ferrum-cursor-x) - 50%) * var(--ferrum-gravity-strength) / 100),
        calc((var(--ferrum-cursor-y) - 50%) * var(--ferrum-gravity-strength) / 100)
      );
    filter: blur(0px);
  }
  .${p}fx-cursor-gravity:hover {
    --ferrum-gravity-strength: 25px;
  }

  /* --- fx-cursor-particle: particle effect at cursor position (multiple small radial-gradients) --- */
  @keyframes ${p}fx-cursor-particle-float {
    0%   { opacity: 0.8; transform: translate(0, 0) scale(1); }
    100% { opacity: 0; transform: translate(var(--ferrum-particle-dx, 20px), var(--ferrum-particle-dy, -30px)) scale(0); }
  }
  .${p}fx-cursor-particle {
    --ferrum-cursor-x: 50%;
    --ferrum-cursor-y: 50%;
    --ferrum-particle-color: rgba(99, 102, 241, 0.6);
    --ferrum-particle-size: 6px;
    --ferrum-particle-duration: 1.2s;
    position: relative;
    overflow: hidden;
  }
  .${p}fx-cursor-particle::before {
    content: '';
    position: absolute;
    left: var(--ferrum-cursor-x);
    top: var(--ferrum-cursor-y);
    width: var(--ferrum-particle-size);
    height: var(--ferrum-particle-size);
    border-radius: 50%;
    background: radial-gradient(circle, var(--ferrum-particle-color) 0%, transparent 100%);
    --ferrum-particle-dx: 15px;
    --ferrum-particle-dy: -25px;
    animation: ${p}fx-cursor-particle-float var(--ferrum-particle-duration) ease-out infinite;
    pointer-events: none;
    z-index: 1;
    transition: left 0.1s ease-out, top 0.1s ease-out;
  }
  .${p}fx-cursor-particle::after {
    content: '';
    position: absolute;
    left: var(--ferrum-cursor-x);
    top: var(--ferrum-cursor-y);
    width: calc(var(--ferrum-particle-size) * 0.7);
    height: calc(var(--ferrum-particle-size) * 0.7);
    border-radius: 50%;
    background: radial-gradient(circle, var(--ferrum-particle-color) 0%, transparent 100%);
    --ferrum-particle-dx: -20px;
    --ferrum-particle-dy: -15px;
    animation: ${p}fx-cursor-particle-float var(--ferrum-particle-duration) ease-out infinite;
    animation-delay: calc(var(--ferrum-particle-duration) * -0.4);
    pointer-events: none;
    z-index: 1;
    transition: left 0.1s ease-out, top 0.1s ease-out;
  }

  /* --- fx-cursor-distortion: area around cursor gets slight blur/distortion --- */
  .${p}fx-cursor-distortion {
    --ferrum-cursor-x: 50%;
    --ferrum-cursor-y: 50%;
    --ferrum-cursor-distort-blur: 1px;
    --ferrum-cursor-distort-size: 200px;
    position: relative;
    overflow: hidden;
  }
  .${p}fx-cursor-distortion::before {
    content: '';
    position: absolute;
    width: var(--ferrum-cursor-distort-size);
    height: var(--ferrum-cursor-distort-size);
    left: var(--ferrum-cursor-x);
    top: var(--ferrum-cursor-y);
    transform: translate(-50%, -50%);
    backdrop-filter: blur(var(--ferrum-cursor-distort-blur));
    -webkit-backdrop-filter: blur(var(--ferrum-cursor-distort-blur));
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
    transition: left 0.15s ease-out, top 0.15s ease-out;
  }

  /* --- fx-cursor-orbit: elements orbit around cursor position using translate + rotate --- */
  @keyframes ${p}fx-cursor-orbit {
    0%   { transform: translate(-50%, -50%) rotate(0deg) translateX(var(--ferrum-orbit-radius, 40px)) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg) translateX(var(--ferrum-orbit-radius, 40px)) rotate(-360deg); }
  }
  .${p}fx-cursor-orbit {
    --ferrum-cursor-x: 50%;
    --ferrum-cursor-y: 50%;
    --ferrum-orbit-radius: 40px;
    --ferrum-orbit-duration: 3s;
    --ferrum-orbit-size: 8px;
    --ferrum-orbit-color: rgba(99, 102, 241, 0.5);
    position: relative;
    overflow: hidden;
  }
  .${p}fx-cursor-orbit::before {
    content: '';
    position: absolute;
    left: var(--ferrum-cursor-x);
    top: var(--ferrum-cursor-y);
    width: var(--ferrum-orbit-size);
    height: var(--ferrum-orbit-size);
    border-radius: 50%;
    background: var(--ferrum-orbit-color);
    animation: ${p}fx-cursor-orbit var(--ferrum-orbit-duration) linear infinite;
    pointer-events: none;
    z-index: 1;
    transition: left 0.2s ease-out, top 0.2s ease-out;
  }
  .${p}fx-cursor-orbit::after {
    content: '';
    position: absolute;
    left: var(--ferrum-cursor-x);
    top: var(--ferrum-cursor-y);
    width: calc(var(--ferrum-orbit-size) * 0.6);
    height: calc(var(--ferrum-orbit-size) * 0.6);
    border-radius: 50%;
    background: var(--ferrum-orbit-color);
    animation: ${p}fx-cursor-orbit var(--ferrum-orbit-duration) linear infinite;
    animation-delay: calc(var(--ferrum-orbit-duration) * -0.5);
    pointer-events: none;
    z-index: 1;
    transition: left 0.2s ease-out, top 0.2s ease-out;
  }

  /* --- fx-cursor-repel: elements push AWAY from cursor (opposite of magnetic) --- */
  .${p}fx-cursor-repel {
    --ferrum-cursor-x: 50%;
    --ferrum-cursor-y: 50%;
    --ferrum-repel-strength: 20px;
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    transform:
      translate(
        calc((50% - var(--ferrum-cursor-x)) * var(--ferrum-repel-strength) / 100 * 2),
        calc((50% - var(--ferrum-cursor-y)) * var(--ferrum-repel-strength) / 100 * 2)
      );
  }

  /* --- fx-cursor-spotlight-text: text reveal via spotlight following cursor --- */
  .${p}fx-cursor-spotlight-text {
    --ferrum-cursor-x: 50%;
    --ferrum-cursor-y: 50%;
    --ferrum-spotlight-text-color: rgba(99, 102, 241, 1);
    --ferrum-spotlight-text-size: 150px;
    --ferrum-spotlight-text-muted: rgba(99, 102, 241, 0.15);
    color: var(--ferrum-spotlight-text-muted);
    position: relative;
    overflow: hidden;
    -webkit-background-clip: text;
    background-clip: text;
  }
  .${p}fx-cursor-spotlight-text::before {
    content: '';
    position: absolute;
    width: var(--ferrum-spotlight-text-size);
    height: var(--ferrum-spotlight-text-size);
    left: var(--ferrum-cursor-x);
    top: var(--ferrum-cursor-y);
    transform: translate(-50%, -50%);
    background: radial-gradient(circle, var(--ferrum-spotlight-text-color) 0%, transparent 60%);
    -webkit-background-clip: text;
    background-clip: text;
    pointer-events: none;
    z-index: 1;
    transition: left 0.1s ease-out, top 0.1s ease-out;
    mix-blend-mode: normal;
  }

  /* --- fx-cursor-pressure: element scales down when cursor is near (pressure simulation) --- */
  .${p}fx-cursor-pressure {
    --ferrum-cursor-x: 50%;
    --ferrum-cursor-y: 50%;
    --ferrum-pressure-strength: 0.92;
    --ferrum-pressure-range: 150px;
    transition: transform 0.2s cubic-bezier(0.23, 1, 0.32, 1), filter 0.2s ease;
    transform: scale(1);
    filter: blur(0px);
  }
  .${p}fx-cursor-pressure:hover {
    transform: scale(var(--ferrum-pressure-strength));
    filter: blur(1px);
  }

}`;
}