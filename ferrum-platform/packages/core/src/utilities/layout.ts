/**
 * Layout utility classes — Flexbox, Grid, Display
 */

export const layoutCSS = `
/* ===== Ferrum Layout Utilities ===== */

/* === Display === */
.fr-hidden {
  display: none;
}

.fr-block {
  display: block;
}

.fr-inline-block {
  display: inline-block;
}

.fr-inline-flex {
  display: inline-flex;
}

/* === Flexbox === */
.fr-flex {
  display: flex;
}

.fr-flex-col {
  display: flex;
  flex-direction: column;
}

.fr-flex-row {
  display: flex;
  flex-direction: row;
}

.fr-flex-wrap {
  flex-wrap: wrap;
}

.fr-items-center {
  align-items: center;
}

.fr-items-start {
  align-items: flex-start;
}

.fr-items-end {
  align-items: flex-end;
}

.fr-items-stretch {
  align-items: stretch;
}

.fr-items-baseline {
  align-items: baseline;
}

.fr-justify-center {
  justify-content: center;
}

.fr-justify-between {
  justify-content: space-between;
}

.fr-justify-start {
  justify-content: flex-start;
}

.fr-justify-end {
  justify-content: flex-end;
}

.fr-justify-around {
  justify-content: space-around;
}

.fr-justify-evenly {
  justify-content: space-evenly;
}

/* === Flex Gap === */
.fr-gap-1 { gap: var(--ferrum-spacing-1, 0.25rem); }
.fr-gap-2 { gap: var(--ferrum-spacing-2, 0.5rem); }
.fr-gap-3 { gap: var(--ferrum-spacing-3, 0.75rem); }
.fr-gap-4 { gap: var(--ferrum-spacing-4, 1rem); }
.fr-gap-5 { gap: var(--ferrum-spacing-5, 1.25rem); }
.fr-gap-6 { gap: var(--ferrum-spacing-6, 1.5rem); }
.fr-gap-7 { gap: var(--ferrum-spacing-7, 1.75rem); }
.fr-gap-8 { gap: var(--ferrum-spacing-8, 2rem); }
.fr-gap-9 { gap: var(--ferrum-spacing-9, 2.25rem); }
.fr-gap-10 { gap: var(--ferrum-spacing-10, 2.5rem); }
.fr-gap-11 { gap: var(--ferrum-spacing-11, 2.75rem); }
.fr-gap-12 { gap: var(--ferrum-spacing-12, 3rem); }

/* === Grid === */
.fr-grid {
  display: grid;
}

.fr-grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.fr-grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.fr-grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.fr-grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.fr-grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
.fr-grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
.fr-grid-cols-7 { grid-template-columns: repeat(7, minmax(0, 1fr)); }
.fr-grid-cols-8 { grid-template-columns: repeat(8, minmax(0, 1fr)); }
.fr-grid-cols-9 { grid-template-columns: repeat(9, minmax(0, 1fr)); }
.fr-grid-cols-10 { grid-template-columns: repeat(10, minmax(0, 1fr)); }
.fr-grid-cols-11 { grid-template-columns: repeat(11, minmax(0, 1fr)); }
.fr-grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }

/* === Grid Column Span === */
.fr-col-span-1 { grid-column: span 1 / span 1; }
.fr-col-span-2 { grid-column: span 2 / span 2; }
.fr-col-span-3 { grid-column: span 3 / span 3; }
.fr-col-span-4 { grid-column: span 4 / span 4; }
.fr-col-span-5 { grid-column: span 5 / span 5; }
.fr-col-span-6 { grid-column: span 6 / span 6; }
.fr-col-span-7 { grid-column: span 7 / span 7; }
.fr-col-span-8 { grid-column: span 8 / span 8; }
.fr-col-span-9 { grid-column: span 9 / span 9; }
.fr-col-span-10 { grid-column: span 10 / span 10; }
.fr-col-span-11 { grid-column: span 11 / span 11; }
.fr-col-span-12 { grid-column: span 12 / span 12; }
`.trim();