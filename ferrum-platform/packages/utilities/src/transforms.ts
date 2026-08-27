/**
 * Transform utility classes — Scale, Rotate, Translate
 */

export const transformsCSS = `
/* ===== Ferrum Transform Utilities ===== */

/* === Scale === */
.fr-scale-0 { transform: scale(0); }
.fr-scale-50 { transform: scale(0.5); }
.fr-scale-75 { transform: scale(0.75); }
.fr-scale-90 { transform: scale(0.9); }
.fr-scale-95 { transform: scale(0.95); }
.fr-scale-100 { transform: scale(1); }
.fr-scale-105 { transform: scale(1.05); }
.fr-scale-110 { transform: scale(1.1); }
.fr-scale-125 { transform: scale(1.25); }
.fr-scale-150 { transform: scale(1.5); }

/* Scale with negative value for flip */
.fr-scale-x-0 { transform: scaleX(0); }
.fr-scale-x-100 { transform: scaleX(1); }
.fr-scale-x-[-1] { transform: scaleX(-1); }

.fr-scale-y-0 { transform: scaleY(0); }
.fr-scale-y-100 { transform: scaleY(1); }
.fr-scale-y-[-1] { transform: scaleY(-1); }

/* === Rotate === */
.fr-rotate-0 { transform: rotate(0deg); }
.fr-rotate-1 { transform: rotate(1deg); }
.fr-rotate-2 { transform: rotate(2deg); }
.fr-rotate-3 { transform: rotate(3deg); }
.fr-rotate-6 { transform: rotate(6deg); }
.fr-rotate-12 { transform: rotate(12deg); }
.fr-rotate-45 { transform: rotate(45deg); }
.fr-rotate-90 { transform: rotate(90deg); }
.fr-rotate-180 { transform: rotate(180deg); }
.fr-rotate-270 { transform: rotate(270deg); }

/* Rotate X (3D) */
.fr-rotate-x-0 { transform: rotateX(0deg); }
.fr-rotate-x-6 { transform: rotateX(6deg); }
.fr-rotate-x-12 { transform: rotateX(12deg); }
.fr-rotate-x-45 { transform: rotateX(45deg); }
.fr-rotate-x-90 { transform: rotateX(90deg); }

/* Rotate Y (3D) */
.fr-rotate-y-0 { transform: rotateY(0deg); }
.fr-rotate-y-6 { transform: rotateY(6deg); }
.fr-rotate-y-12 { transform: rotateY(12deg); }
.fr-rotate-y-45 { transform: rotateY(45deg); }
.fr-rotate-y-90 { transform: rotateY(90deg); }

/* === Translate X === */
.fr-translate-x-full { transform: translateX(100%); }
.fr-translate-x-[-full] { transform: translateX(-100%); }
.fr-translate-x-half { transform: translateX(50%); }
.fr-translate-x-[-half] { transform: translateX(-50%); }
.fr-translate-x-px { transform: translateX(1px); }
.fr-translate-x-[-px] { transform: translateX(-1px); }
.fr-translate-x-1 { transform: translateX(0.25rem); }
.fr-translate-x-2 { transform: translateX(0.5rem); }
.fr-translate-x-4 { transform: translateX(1rem); }
.fr-translate-x-8 { transform: translateX(2rem); }
.fr-translate-x-[-1] { transform: translateX(-0.25rem); }
.fr-translate-x-[-2] { transform: translateX(-0.5rem); }
.fr-translate-x-[-4] { transform: translateX(-1rem); }
.fr-translate-x-[-8] { transform: translateX(-2rem); }

/* === Translate Y === */
.fr-translate-y-full { transform: translateY(100%); }
.fr-translate-y-[-full] { transform: translateY(-100%); }
.fr-translate-y-half { transform: translateY(50%); }
.fr-translate-y-[-half] { transform: translateY(-50%); }
.fr-translate-y-px { transform: translateY(1px); }
.fr-translate-y-[-px] { transform: translateY(-1px); }
.fr-translate-y-1 { transform: translateY(0.25rem); }
.fr-translate-y-2 { transform: translateY(0.5rem); }
.fr-translate-y-4 { transform: translateY(1rem); }
.fr-translate-y-8 { transform: translateY(2rem); }
.fr-translate-y-[-1] { transform: translateY(-0.25rem); }
.fr-translate-y-[-2] { transform: translateY(-0.5rem); }
.fr-translate-y-[-4] { transform: translateY(-1rem); }
.fr-translate-y-[-8] { transform: translateY(-2rem); }

/* === 3D Transforms === */
.fr-perspective-dramatic { perspective: 100px; }
.fr-perspective-near { perspective: 300px; }
.fr-perspective-normal { perspective: 500px; }
.fr-perspective-midrange { perspective: 800px; }
.fr-perspective-distant { perspective: 1200px; }

.fr-preserve-3d {
  transform-style: preserve-3d;
}

.fr-preserve-flat {
  transform-style: flat;
}

.fr-backface-hidden {
  backface-visibility: hidden;
}

.fr-backface-visible {
  backface-visibility: visible;
}

/* === Transform Origin === */
.fr-origin-center {
  transform-origin: center;
}

.fr-origin-top {
  transform-origin: top;
}

.fr-origin-bottom {
  transform-origin: bottom;
}

.fr-origin-left {
  transform-origin: left;
}

.fr-origin-right {
  transform-origin: right;
}

.fr-origin-top-left {
  transform-origin: top left;
}

.fr-origin-top-right {
  transform-origin: top right;
}

.fr-origin-bottom-left {
  transform-origin: bottom left;
}

.fr-origin-bottom-right {
  transform-origin: bottom right;
}
`.trim();