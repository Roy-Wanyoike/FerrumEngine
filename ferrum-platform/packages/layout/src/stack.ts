export function generateStackCSS(prefix: string): string {
  return `
@layer ferrum.layouts {
  ${prefix}stack {
    display: flex;
    flex-wrap: wrap;
    gap: var(--ferrum-stack-gap, 16px);
  }

  ${prefix}stack-vertical {
    flex-direction: column;
  }

  ${prefix}stack-horizontal {
    flex-direction: row;
  }

  ${prefix}stack-vertical > * {
    min-width: 0;
    min-height: 0;
  }

  ${prefix}stack-horizontal > * {
    min-width: 0;
    min-height: 0;
  }

  /* Gap sizes */
  ${prefix}stack-xs { gap: var(--ferrum-stack-xs, 4px); }
  ${prefix}stack-sm { gap: var(--ferrum-stack-sm, 8px); }
  ${prefix}stack-md { gap: var(--ferrum-stack-md, 16px); }
  ${prefix}stack-lg { gap: var(--ferrum-stack-lg, 24px); }
  ${prefix}stack-xl { gap: var(--ferrum-stack-xl, 32px); }
  ${prefix}stack-2xl { gap: var(--ferrum-stack-2xl, 48px); }

  /* Center alignment */
  ${prefix}stack-center {
    align-items: center;
    justify-content: center;
  }

  ${prefix}stack-center-x {
    justify-content: center;
  }

  ${prefix}stack-center-y {
    align-items: center;
  }

  /* Start / End alignment */
  ${prefix}stack-start {
    align-items: flex-start;
  }

  ${prefix}stack-end {
    align-items: flex-end;
  }

  ${prefix}stack-start-x {
    justify-content: flex-start;
  }

  ${prefix}stack-end-x {
    justify-content: flex-end;
  }

  /* Stretch */
  ${prefix}stack-stretch {
    align-items: stretch;
  }

  /* Between / Around */
  ${prefix}stack-between {
    justify-content: space-between;
  }

  ${prefix}stack-around {
    justify-content: space-around;
  }

  ${prefix}stack-evenly {
    justify-content: space-evenly;
  }

  /* Baseline */
  ${prefix}stack-baseline {
    align-items: baseline;
  }

  /* No wrap */
  ${prefix}stack-nowrap {
    flex-wrap: nowrap;
  }

  /* Fill child */
  ${prefix}stack > ${prefix}stack-fill {
    flex: 1 1 0%;
    min-width: 0;
    min-height: 0;
  }

  /* Reversed direction */
  ${prefix}stack-reverse-vertical {
    flex-direction: column-reverse;
  }

  ${prefix}stack-reverse-horizontal {
    flex-direction: row-reverse;
  }

  /* Divider support */
  ${prefix}stack-with-dividers > *:not(:last-child)::after {
    content: "";
    flex-shrink: 0;
  }

  ${prefix}stack-with-dividers-vertical > *:not(:last-child)::after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background: var(--ferrum-stack-divider, #e5e7eb);
    margin: 0;
  }

  ${prefix}stack-with-dividers-horizontal > *:not(:last-child)::after {
    content: "";
    display: inline-block;
    width: 1px;
    align-self: stretch;
    background: var(--ferrum-stack-divider, #e5e7eb);
    margin: 0;
  }

  /* Inline variant */
  ${prefix}stack-inline {
    display: inline-flex;
  }

  /* Responsive stacking: horizontal on desktop, vertical on mobile */
  @media (max-width: 640px) {
    ${prefix}stack-responsive {
      flex-direction: column !important;
    }
  }

  @media (min-width: 641px) {
    ${prefix}stack-responsive {
      flex-direction: row !important;
    }
  }
}
`;
}