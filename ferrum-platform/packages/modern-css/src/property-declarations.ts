// ─── @property Declarations ──────────────────────────────
// Type-safe CSS custom properties via @property (Houdini).
// Enables transitions, animations, and type checking on CSS variables.

/**
 * Generate @property declarations for all Ferrum design tokens.
 * This makes CSS variables animatable and type-checked.
 */
export function generatePropertyDeclarations(prefix = "fr"): string {
  const p = prefix;

  return `/* ═══════════════════════════════════════════════════
   FerrumCSS @property Declarations
   Type-safe CSS custom properties.
   Enables transitions/animations on CSS variables.
   Chrome 85+.
   ═══════════════════════════════════════════════════ */

/* ─── Color tokens ─── */
@property --${p}-color {
  syntax: '<color>';
  inherits: true;
  initial-value: #000000;
}

/* ─── Spacing ─── */
@property --${p}-spacing {
  syntax: '<length-percentage>';
  inherits: true;
  initial-value: 0px;
}

/* ─── Radius ─── */
@property --${p}-radius {
  syntax: '<length-percentage>';
  inherits: true;
  initial-value: 0px;
}

/* ─── Opacity (animatable) ─── */
@property --${p}-opacity {
  syntax: '<number>';
  inherits: false;
  initial-value: 1;
  range: 0 1;
}

/* ─── Scale (for hover/press effects) ─── */
@property --${p}-scale {
  syntax: '<number>';
  inherits: false;
  initial-value: 1;
  range: 0.5 2;
}

/* ─── Rotation ─── */
@property --${p}-rotate {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

/* ─── Duration ─── */
@property --${p}-duration {
  syntax: '<time>';
  inherits: false;
  initial-value: 0ms;
}

/* ─── Blur ─── */
@property --${p}-blur {
  syntax: '<length>';
  inherits: false;
  initial-value: 0px;
}

/* ─── Intensity (generic 0-2 range for glow, etc.) ─── */
@property --${p}-intensity {
  syntax: '<number>';
  inherits: false;
  initial-value: 0.5;
  range: 0 2;
}

/* ─── Position percentage (0-100) ─── */
@property --${p}-x {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 50%;
}
@property --${p}-y {
  syntax: '<percentage>';
  inherits: false;
  initial-value: 50%;
}

/* ─── Progress (0-1, for ripples, loaders) ─── */
@property --${p}-progress {
  syntax: '<number>';
  inherits: false;
  initial-value: 0;
  range: 0 1;
}

/* ─── Angle (for neon rotation, gradients) ─── */
@property --${p}-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

/* ─── Resolution-independent sizing ─── */
@property --${p}-size {
  syntax: '<length-percentage>';
  inherits: false;
  initial-value: 0px;
}

/* ─── Z-index ─── */
@property --${p}-z {
  syntax: '<integer>';
  inherits: false;
  initial-value: 0;
}

/* ─── Transition utility that animates CSS variables ─── */
@layer ferrum.utilities {
  .${p}-transition-color {
    transition: --${p}-color 0.3s ease;
  }
  .${p}-transition-opacity {
    transition: --${p}-opacity 0.2s ease;
  }
  .${p}-transition-scale {
    transition: --${p}-scale 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .${p}-transition-all-tokens {
    transition: --${p}-color 0.3s ease,
                --${p}-opacity 0.2s ease,
                --${p}-scale 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
                --${p}-rotate 0.3s ease,
                --${p}-blur 0.3s ease,
                --${p}-radius 0.2s ease;
  }
}`.trim();
}