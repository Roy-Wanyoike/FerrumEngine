export function generateGridLayoutCSS(prefix: string): string {
  return `
@layer ferrum.layouts {
  ${prefix}grid {
    display: grid;
    gap: var(--ferrum-grid-gap, 16px);
    width: 100%;
  }

  /* Column definitions: 1-12 */
  ${prefix}grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
  ${prefix}grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  ${prefix}grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  ${prefix}grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  ${prefix}grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
  ${prefix}grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
  ${prefix}grid-cols-7 { grid-template-columns: repeat(7, minmax(0, 1fr)); }
  ${prefix}grid-cols-8 { grid-template-columns: repeat(8, minmax(0, 1fr)); }
  ${prefix}grid-cols-9 { grid-template-columns: repeat(9, minmax(0, 1fr)); }
  ${prefix}grid-cols-10 { grid-template-columns: repeat(10, minmax(0, 1fr)); }
  ${prefix}grid-cols-11 { grid-template-columns: repeat(11, minmax(0, 1fr)); }
  ${prefix}grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }

  /* Span utilities: 1-12 */
  ${prefix}grid-span-1 { grid-column: span 1 / span 1; }
  ${prefix}grid-span-2 { grid-column: span 2 / span 2; }
  ${prefix}grid-span-3 { grid-column: span 3 / span 3; }
  ${prefix}grid-span-4 { grid-column: span 4 / span 4; }
  ${prefix}grid-span-5 { grid-column: span 5 / span 5; }
  ${prefix}grid-span-6 { grid-column: span 6 / span 6; }
  ${prefix}grid-span-7 { grid-column: span 7 / span 7; }
  ${prefix}grid-span-8 { grid-column: span 8 / span 8; }
  ${prefix}grid-span-9 { grid-column: span 9 / span 9; }
  ${prefix}grid-span-10 { grid-column: span 10 / span 10; }
  ${prefix}grid-span-11 { grid-column: span 11 / span 11; }
  ${prefix}grid-span-12 { grid-column: span 12 / span 12; }

  /* Row span utilities */
  ${prefix}grid-row-span-1 { grid-row: span 1 / span 1; }
  ${prefix}grid-row-span-2 { grid-row: span 2 / span 2; }
  ${prefix}grid-row-span-3 { grid-row: span 3 / span 3; }
  ${prefix}grid-row-span-4 { grid-row: span 4 / span 4; }
  ${prefix}grid-row-span-5 { grid-row: span 5 / span 5; }
  ${prefix}grid-row-span-6 { grid-row: span 6 / span 6; }

  /* Auto-fill and auto-fit variants */
  ${prefix}grid-auto-fill {
    grid-template-columns: repeat(auto-fill, minmax(var(--ferrum-grid-min-col-width, 250px), 1fr));
  }

  ${prefix}grid-auto-fit {
    grid-template-columns: repeat(auto-fit, minmax(var(--ferrum-grid-min-col-width, 250px), 1fr));
  }

  ${prefix}grid-auto-fill-sm {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  ${prefix}grid-auto-fill-md {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  ${prefix}grid-auto-fill-lg {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }

  /* Gap utilities */
  ${prefix}grid-gap-0 { gap: 0; }
  ${prefix}grid-gap-1 { gap: 4px; }
  ${prefix}grid-gap-2 { gap: 8px; }
  ${prefix}grid-gap-3 { gap: 12px; }
  ${prefix}grid-gap-4 { gap: 16px; }
  ${prefix}grid-gap-5 { gap: 20px; }
  ${prefix}grid-gap-6 { gap: 24px; }
  ${prefix}grid-gap-8 { gap: 32px; }
  ${prefix}grid-gap-10 { gap: 40px; }
  ${prefix}grid-gap-12 { gap: 48px; }

  /* Column gap only */
  ${prefix}grid-col-gap-0 { column-gap: 0; }
  ${prefix}grid-col-gap-2 { column-gap: 8px; }
  ${prefix}grid-col-gap-4 { column-gap: 16px; }
  ${prefix}grid-col-gap-6 { column-gap: 24px; }
  ${prefix}grid-col-gap-8 { column-gap: 32px; }

  /* Row gap only */
  ${prefix}grid-row-gap-0 { row-gap: 0; }
  ${prefix}grid-row-gap-2 { row-gap: 8px; }
  ${prefix}grid-row-gap-4 { row-gap: 16px; }
  ${prefix}grid-row-gap-6 { row-gap: 24px; }
  ${prefix}grid-row-gap-8 { row-gap: 32px; }

  /* Alignment */
  ${prefix}grid-items-start { align-items: start; }
  ${prefix}grid-items-center { align-items: center; }
  ${prefix}grid-items-end { align-items: end; }
  ${prefix}grid-items-stretch { align-items: stretch; }

  ${prefix}grid-justify-start { justify-items: start; }
  ${prefix}grid-justify-center { justify-items: center; }
  ${prefix}grid-justify-end { justify-items: end; }
  ${prefix}grid-justify-stretch { justify-items: stretch; }

  /* Placement utilities */
  ${prefix}grid-place-center { place-items: center; }
  ${prefix}grid-place-start { place-items: start; }
  ${prefix}grid-place-end { place-items: end; }
  ${prefix}grid-place-stretch { place-items: stretch; }

  /* Responsive column overrides */
  @media (max-width: 640px) {
    ${prefix}grid-cols-sm-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
    ${prefix}grid-cols-sm-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media (min-width: 641px) {
    ${prefix}grid-cols-md-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
    ${prefix}grid-cols-md-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    ${prefix}grid-cols-md-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    ${prefix}grid-cols-md-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  }

  @media (min-width: 1024px) {
    ${prefix}grid-cols-lg-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
    ${prefix}grid-cols-lg-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    ${prefix}grid-cols-lg-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    ${prefix}grid-cols-lg-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    ${prefix}grid-cols-lg-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
    ${prefix}grid-cols-lg-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
  }

  @media (min-width: 1280px) {
    ${prefix}grid-cols-xl-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
    ${prefix}grid-cols-xl-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    ${prefix}grid-cols-xl-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    ${prefix}grid-cols-xl-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    ${prefix}grid-cols-xl-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
    ${prefix}grid-cols-xl-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
    ${prefix}grid-cols-xl-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
  }
}
`;
}