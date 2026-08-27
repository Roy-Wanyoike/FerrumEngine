/**
 * Effects utility classes — Shadows and Opacity
 */

export const effectsCSS = `
/* ===== Ferrum Effects Utilities ===== */

/* === Box Shadows === */
.fr-shadow-sm {
  box-shadow: var(--ferrum-elevation-1, 0 1px 2px 0 rgba(0, 0, 0, 0.05));
}

.fr-shadow {
  box-shadow: var(--ferrum-elevation-2, 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1));
}

.fr-shadow-md {
  box-shadow: var(--ferrum-elevation-3, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1));
}

.fr-shadow-lg {
  box-shadow: var(--ferrum-elevation-4, 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1));
}

.fr-shadow-xl {
  box-shadow: var(--ferrum-elevation-5, 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1));
}

.fr-shadow-2xl {
  box-shadow: var(--ferrum-elevation-6, 0 25px 50px -12px rgba(0, 0, 0, 0.25));
}

.fr-shadow-inner {
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
}

.fr-shadow-none {
  box-shadow: none;
}

/* === Opacity === */
.fr-opacity-0 { opacity: 0; }
.fr-opacity-5 { opacity: 0.05; }
.fr-opacity-10 { opacity: 0.1; }
.fr-opacity-15 { opacity: 0.15; }
.fr-opacity-20 { opacity: 0.2; }
.fr-opacity-25 { opacity: 0.25; }
.fr-opacity-30 { opacity: 0.3; }
.fr-opacity-35 { opacity: 0.35; }
.fr-opacity-40 { opacity: 0.4; }
.fr-opacity-45 { opacity: 0.45; }
.fr-opacity-50 { opacity: 0.5; }
.fr-opacity-55 { opacity: 0.55; }
.fr-opacity-60 { opacity: 0.6; }
.fr-opacity-65 { opacity: 0.65; }
.fr-opacity-70 { opacity: 0.7; }
.fr-opacity-75 { opacity: 0.75; }
.fr-opacity-80 { opacity: 0.8; }
.fr-opacity-85 { opacity: 0.85; }
.fr-opacity-90 { opacity: 0.9; }
.fr-opacity-95 { opacity: 0.95; }
.fr-opacity-100 { opacity: 1; }
`.trim();