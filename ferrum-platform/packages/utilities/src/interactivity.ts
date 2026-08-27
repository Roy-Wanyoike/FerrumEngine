/**
 * Interactivity utility classes — Cursor, selection, pointer events, appearance, resize
 */

export const interactivityCSS = `
/* ===== Ferrum Interactivity Utilities ===== */

/* === Cursor === */
.fr-cursor-auto {
  cursor: auto;
}

.fr-cursor-default {
  cursor: default;
}

.fr-cursor-pointer {
  cursor: pointer;
}

.fr-cursor-wait {
  cursor: wait;
}

.fr-cursor-text {
  cursor: text;
}

.fr-cursor-move {
  cursor: move;
}

.fr-cursor-not-allowed {
  cursor: not-allowed;
}

.fr-cursor-grab {
  cursor: grab;
}

.fr-cursor-grabbing {
  cursor: grabbing;
}

.fr-cursor-zoom-in {
  cursor: zoom-in;
}

.fr-cursor-zoom-out {
  cursor: zoom-out;
}

/* === User Select === */
.fr-select-none {
  user-select: none;
  -webkit-user-select: none;
}

.fr-select-all {
  user-select: all;
  -webkit-user-select: all;
}

.fr-select-auto {
  user-select: auto;
  -webkit-user-select: auto;
}

.fr-select-text {
  user-select: text;
  -webkit-user-select: text;
}

/* === Pointer Events === */
.fr-pointer-events-none {
  pointer-events: none;
}

.fr-pointer-events-auto {
  pointer-events: auto;
}

/* === Appearance === */
.fr-appearance-none {
  appearance: none;
  -webkit-appearance: none;
}

/* === Resize === */
.fr-resize-none {
  resize: none;
}

.fr-resize-x {
  resize: horizontal;
}

.fr-resize-y {
  resize: vertical;
}

.fr-resize {
  resize: both;
}

/* === Touch Action === */
.fr-touch-none {
  touch-action: none;
}

.fr-touch-manipulation {
  touch-action: manipulation;
}

/* === Scroll Behavior === */
.fr-scroll-smooth {
  scroll-behavior: smooth;
}

/* === Overflow === */
.fr-overflow-auto {
  overflow: auto;
}

.fr-overflow-hidden {
  overflow: hidden;
}

.fr-overflow-visible {
  overflow: visible;
}

.fr-overflow-scroll {
  overflow: scroll;
}

.fr-overflow-x-auto {
  overflow-x: auto;
  overflow-y: hidden;
}

.fr-overflow-y-auto {
  overflow-x: hidden;
  overflow-y: auto;
}

/* === Snap Scroll === */
.fr-snap-start {
  scroll-snap-align: start;
}

.fr-snap-center {
  scroll-snap-align: center;
}

.fr-snap-end {
  scroll-snap-align: end;
}

.fr-snap-none {
  scroll-snap-align: none;
}

.fr-snap-x {
  scroll-snap-type: x mandatory;
}

.fr-snap-y {
  scroll-snap-type: y mandatory;
}

.fr-snap-both {
  scroll-snap-type: both mandatory;
}

.fr-snap-proximity-x {
  scroll-snap-type: x proximity;
}

.fr-snap-proximity-y {
  scroll-snap-type: y proximity;
}
`.trim();