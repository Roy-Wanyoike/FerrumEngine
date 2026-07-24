/* ===== Ferrum VFX — Shadow Engine ===== */
/* Advanced shadow systems using box-shadow and custom properties */

export function generateShadowCSS(prefix: string = 'fr-'): string {
  const p = prefix;

  return `@layer ferrum.vfx {

  /* --- fx-shadow-contact: close-proximity shadow (translateY(2px)) --- */
  .${p}fx-shadow-contact {
    --ferrum-contact-color: rgba(0, 0, 0, 0.3);
    box-shadow: 0 2px 2px -1px var(--ferrum-contact-color);
    transform: translateY(2px);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .${p}fx-shadow-contact:hover {
    transform: translateY(0);
    box-shadow: 0 0 0 0 var(--ferrum-contact-color);
  }

  /* --- fx-shadow-ambient: very soft, wide-spread shadow --- */
  .${p}fx-shadow-ambient {
    --ferrum-ambient-color: rgba(0, 0, 0, 0.12);
    --ferrum-ambient-spread: 30px;
    box-shadow:
      0 0 var(--ferrum-ambient-spread) 10px var(--ferrum-ambient-color);
  }

  /* --- fx-shadow-colored: shadow with tinted color --- */
  .${p}fx-shadow-colored {
    --ferrum-shadow-tint: rgba(99, 102, 241, 0.35);
    box-shadow:
      0 4px 14px var(--ferrum-shadow-tint),
      0 2px 6px rgba(99, 102, 241, 0.15);
  }

  /* --- fx-shadow-multi: 3-layer shadow for realism --- */
  .${p}fx-shadow-multi {
    --ferrum-multi-color: rgba(0, 0, 0, 0.1);
    box-shadow:
      0 1px 2px var(--ferrum-multi-color),
      0 4px 8px rgba(0, 0, 0, 0.08),
      0 12px 24px rgba(0, 0, 0, 0.06);
  }

  /* --- fx-shadow-long: exaggerated offset shadow --- */
  .${p}fx-shadow-long {
    --ferrum-long-offset-x: 12px;
    --ferrum-long-offset-y: 12px;
    --ferrum-long-blur: 0px;
    --ferrum-long-color: rgba(0, 0, 0, 0.25);
    box-shadow:
      var(--ferrum-long-offset-x) var(--ferrum-long-offset-y) var(--ferrum-long-blur) var(--ferrum-long-color);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }
  .${p}fx-shadow-long:hover {
    transform: translate(calc(var(--ferrum-long-offset-x) * 0.3), calc(var(--ferrum-long-offset-y) * 0.3));
    box-shadow:
      calc(var(--ferrum-long-offset-x) * 0.7) calc(var(--ferrum-long-offset-y) * 0.7) calc(var(--ferrum-long-blur) + 4px) var(--ferrum-long-color);
  }

  /* --- fx-shadow-float: large blur shadow (floating effect) --- */
  .${p}fx-shadow-float {
    --ferrum-float-color: rgba(0, 0, 0, 0.15);
    --ferrum-float-blur: 40px;
    box-shadow:
      0 20px var(--ferrum-float-blur) -10px var(--ferrum-float-color);
    transition: transform 0.4s ease, box-shadow 0.4s ease;
  }
  .${p}fx-shadow-float:hover {
    transform: translateY(-6px);
    box-shadow:
      0 30px calc(var(--ferrum-float-blur) + 20px) -10px var(--ferrum-float-color);
  }

  /* --- fx-shadow-glow: colored shadow with large spread --- */
  .${p}fx-shadow-glow {
    --ferrum-glow-color: rgba(99, 102, 241, 0.4);
    --ferrum-glow-spread: 20px;
    box-shadow:
      0 0 var(--ferrum-glow-spread) 5px var(--ferrum-glow-color);
    transition: box-shadow 0.3s ease;
  }
  .${p}fx-shadow-glow:hover {
    box-shadow:
      0 0 calc(var(--ferrum-glow-spread) + 10px) 10px var(--ferrum-glow-color);
  }

  /* --- fx-shadow-inner: inset box-shadow --- */
  .${p}fx-shadow-inner {
    --ferrum-inner-color: rgba(0, 0, 0, 0.25);
    --ferrum-inner-spread: 4px;
    box-shadow:
      inset 0 2px var(--ferrum-inner-spread) var(--ferrum-inner-color),
      inset 0 0 var(--ferrum-inner-spread) rgba(0, 0, 0, 0.08);
  }

  /* --- fx-shadow-neon: colored glow shadow --- */
  .${p}fx-shadow-neon {
    --ferrum-neon-shadow-color: #0ff;
    --ferrum-neon-shadow-intensity: 1;
    box-shadow:
      0 0 calc(5px * var(--ferrum-neon-shadow-intensity)) var(--ferrum-neon-shadow-color),
      0 0 calc(15px * var(--ferrum-neon-shadow-intensity)) var(--ferrum-neon-shadow-color),
      0 0 calc(30px * var(--ferrum-neon-shadow-intensity)) rgba(0, 255, 255, 0.3),
      inset 0 0 calc(10px * var(--ferrum-neon-shadow-intensity)) rgba(0, 255, 255, 0.05);
    transition: box-shadow 0.3s ease;
  }
  .${p}fx-shadow-neon:hover {
    --ferrum-neon-shadow-intensity: 1.3;
  }

  /* --- fx-shadow-dynamic: shadow that changes on hover/scroll via CSS variable --- */
  .${p}fx-shadow-dynamic {
    --ferrum-dynamic-x: 0px;
    --ferrum-dynamic-y: 4px;
    --ferrum-dynamic-blur: 12px;
    --ferrum-dynamic-color: rgba(0, 0, 0, 0.15);
    box-shadow:
      var(--ferrum-dynamic-x) var(--ferrum-dynamic-y) var(--ferrum-dynamic-blur) var(--ferrum-dynamic-color);
    transition: box-shadow 0.3s ease;
  }
  .${p}fx-shadow-dynamic:hover {
    --ferrum-dynamic-x: 0px;
    --ferrum-dynamic-y: 8px;
    --ferrum-dynamic-blur: 24px;
    --ferrum-dynamic-color: rgba(0, 0, 0, 0.2);
  }

  /* --- fx-shadow-soft: Very soft wide shadow (large blur, small spread) --- */
  .${p}fx-shadow-soft {
    --ferrum-soft-color: rgba(0, 0, 0, 0.08);
    --ferrum-soft-blur: 60px;
    --ferrum-soft-spread: -5px;
    box-shadow:
      0 calc(var(--ferrum-soft-blur) * 0.2) var(--ferrum-soft-blur) var(--ferrum-soft-spread) var(--ferrum-soft-color);
    transition: box-shadow 0.4s ease;
  }
  .${p}fx-shadow-soft:hover {
    --ferrum-soft-color: rgba(0, 0, 0, 0.12);
    box-shadow:
      0 calc(var(--ferrum-soft-blur) * 0.25) calc(var(--ferrum-soft-blur) + 20px) calc(var(--ferrum-soft-spread) - 2px) var(--ferrum-soft-color);
  }

  /* --- fx-shadow-premium: Premium multi-layer shadow with slight color tint (like Stripe/Vercel cards) --- */
  .${p}fx-shadow-premium {
    --ferrum-premium-tint: rgba(99, 102, 241, 0.06);
    --ferrum-premium-dark: rgba(0, 0, 0, 0.05);
    box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.03),
      0 2px 4px rgba(0, 0, 0, 0.03),
      0 6px 12px rgba(0, 0, 0, 0.04),
      0 16px 32px rgba(0, 0, 0, 0.05),
      0 24px 48px var(--ferrum-premium-tint);
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }
  .${p}fx-shadow-premium:hover {
    transform: translateY(-2px);
    box-shadow:
      0 0 0 1px rgba(0, 0, 0, 0.03),
      0 4px 8px rgba(0, 0, 0, 0.04),
      0 10px 20px rgba(0, 0, 0, 0.05),
      0 20px 40px rgba(0, 0, 0, 0.06),
      0 32px 60px var(--ferrum-premium-tint);
  }

  /* --- fx-shadow-brutal: Brutalist offset shadow (no blur, solid color offset) --- */
  .${p}fx-shadow-brutal {
    --ferrum-brutal-offset: 6px;
    --ferrum-brutal-color: #1a1a1a;
    box-shadow:
      var(--ferrum-brutal-offset) var(--ferrum-brutal-offset) 0 0 var(--ferrum-brutal-color);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .${p}fx-shadow-brutal:hover {
    transform: translate(2px, 2px);
    box-shadow:
      calc(var(--ferrum-brutal-offset) - 2px) calc(var(--ferrum-brutal-offset) - 2px) 0 0 var(--ferrum-brutal-color);
  }

  /* --- fx-shadow-neon-soft: Soft neon glow (larger spread, lower opacity) --- */
  .${p}fx-shadow-neon-soft {
    --ferrum-neon-soft-color: rgba(99, 102, 241, 0.2);
    --ferrum-neon-soft-spread: 15px;
    --ferrum-neon-soft-blur: 30px;
    box-shadow:
      0 0 var(--ferrum-neon-soft-blur) var(--ferrum-neon-soft-spread) var(--ferrum-neon-soft-color),
      0 0 calc(var(--ferrum-neon-soft-blur) * 0.5) calc(var(--ferrum-neon-soft-spread) * 0.5) rgba(99, 102, 241, 0.1);
    transition: box-shadow 0.3s ease;
  }
  .${p}fx-shadow-neon-soft:hover {
    box-shadow:
      0 0 calc(var(--ferrum-neon-soft-blur) + 10px) calc(var(--ferrum-neon-soft-spread) + 5px) var(--ferrum-neon-soft-color),
      0 0 calc(var(--ferrum-neon-soft-blur) * 0.7) calc(var(--ferrum-neon-soft-spread) * 0.7) rgba(99, 102, 241, 0.15);
  }

  /* --- fx-shadow-elevated: High elevation shadow (very large Y offset + blur) --- */
  .${p}fx-shadow-elevated {
    --ferrum-elevated-y: 40px;
    --ferrum-elevated-blur: 60px;
    --ferrum-elevated-color: rgba(0, 0, 0, 0.2);
    box-shadow:
      0 var(--ferrum-elevated-y) var(--ferrum-elevated-blur) -15px var(--ferrum-elevated-color);
    transition: box-shadow 0.4s ease, transform 0.4s ease;
  }
  .${p}fx-shadow-elevated:hover {
    transform: translateY(-4px);
    box-shadow:
      0 calc(var(--ferrum-elevated-y) + 10px) calc(var(--ferrum-elevated-blur) + 20px) -15px var(--ferrum-elevated-color);
  }

  /* --- fx-shadow-inset-glow: Inset glow (inset box-shadow with color) --- */
  .${p}fx-shadow-inset-glow {
    --ferrum-inset-glow-color: rgba(99, 102, 241, 0.15);
    --ferrum-inset-glow-spread: 8px;
    box-shadow:
      inset 0 0 var(--ferrum-inset-glow-spread) 2px var(--ferrum-inset-glow-color),
      inset 0 0 calc(var(--ferrum-inset-glow-spread) * 2) 4px rgba(99, 102, 241, 0.05);
    transition: box-shadow 0.3s ease;
  }
  .${p}fx-shadow-inset-glow:hover {
    box-shadow:
      inset 0 0 calc(var(--ferrum-inset-glow-spread) + 4px) 3px var(--ferrum-inset-glow-color),
      inset 0 0 calc(var(--ferrum-inset-glow-spread) * 2.5) 6px rgba(99, 102, 241, 0.08);
  }

  /* --- fx-shadow-outline: Outline-style shadow (0 offset, moderate spread, no blur) --- */
  .${p}fx-shadow-outline {
    --ferrum-outline-color: rgba(0, 0, 0, 0.15);
    --ferrum-outline-spread: 3px;
    box-shadow:
      0 0 0 var(--ferrum-outline-spread) var(--ferrum-outline-color);
    transition: box-shadow 0.2s ease;
  }
  .${p}fx-shadow-outline:hover {
    box-shadow:
      0 0 0 calc(var(--ferrum-outline-spread) + 1px) var(--ferrum-outline-color);
  }

  /* --- fx-shadow-layered: 5-layer progressive shadow for extreme depth --- */
  .${p}fx-shadow-layered {
    --ferrum-layered-color: rgba(0, 0, 0, 0.07);
    box-shadow:
      0 1px 2px var(--ferrum-layered-color),
      0 3px 6px rgba(0, 0, 0, 0.06),
      0 8px 16px rgba(0, 0, 0, 0.05),
      0 16px 32px rgba(0, 0, 0, 0.04),
      0 32px 64px rgba(0, 0, 0, 0.03);
    transition: box-shadow 0.4s ease, transform 0.4s ease;
  }
  .${p}fx-shadow-layered:hover {
    transform: translateY(-3px);
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.08),
      0 6px 12px rgba(0, 0, 0, 0.07),
      0 12px 24px rgba(0, 0, 0, 0.06),
      0 24px 48px rgba(0, 0, 0, 0.05),
      0 40px 80px rgba(0, 0, 0, 0.04);
  }

}`;
}