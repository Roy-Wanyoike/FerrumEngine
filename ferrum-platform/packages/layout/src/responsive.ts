export function generateResponsiveCSS(prefix: string): string {
  return `
@layer ferrum.layouts {
  /* Container */
  ${prefix}container {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: var(--ferrum-container-px, 16px);
    padding-right: var(--ferrum-container-px, 16px);
  }

  ${prefix}container-sm {
    max-width: var(--ferrum-container-sm, 640px);
  }

  ${prefix}container-md {
    max-width: var(--ferrum-container-md, 768px);
  }

  ${prefix}container-lg {
    max-width: var(--ferrum-container-lg, 1024px);
  }

  ${prefix}container-xl {
    max-width: var(--ferrum-container-xl, 1280px);
  }

  ${prefix}container-2xl {
    max-width: var(--ferrum-container-2xl, 1536px);
  }

  ${prefix}container-full {
    max-width: 100%;
    padding-left: 0;
    padding-right: 0;
  }

  /* Container with responsive padding */
  ${prefix}container-fluid {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: clamp(16px, 4vw, 48px);
    padding-right: clamp(16px, 4vw, 48px);
  }

  /* Aspect ratio containers */
  ${prefix}aspect-ratio {
    position: relative;
    width: 100%;
  }

  ${prefix}aspect-ratio > * {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${prefix}aspect-ratio-1x1 { aspect-ratio: 1 / 1; }
  ${prefix}aspect-ratio-16x9 { aspect-ratio: 16 / 9; }
  ${prefix}aspect-ratio-9x16 { aspect-ratio: 9 / 16; }
  ${prefix}aspect-ratio-4x3 { aspect-ratio: 4 / 3; }
  ${prefix}aspect-ratio-3x4 { aspect-ratio: 3 / 4; }
  ${prefix}aspect-ratio-21x9 { aspect-ratio: 21 / 9; }
  ${prefix}aspect-ratio-3x2 { aspect-ratio: 3 / 2; }
  ${prefix}aspect-ratio-2x3 { aspect-ratio: 2 / 3; }

  /* Viewport height sections */
  ${prefix}viewport-height {
    min-height: 100vh;
    min-height: 100dvh;
  }

  ${prefix}viewport-height--safe {
    min-height: 100vh;
    min-height: 100dvh;
    padding-top: env(safe-area-inset-top, 0px);
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }

  ${prefix}viewport-width {
    min-width: 100vw;
  }

  /* Hide / Show at breakpoints */
  ${prefix}hidden { display: none !important; }

  @media (max-width: 639px) {
    ${prefix}hidden-sm { display: none !important; }
    ${prefix}show-sm { display: initial !important; }
  }

  @media (min-width: 640px) and (max-width: 767px) {
    ${prefix}hidden-sm-only { display: none !important; }
  }

  @media (min-width: 640px) {
    ${prefix}show-sm { display: none !important; }
    ${prefix}hidden-md { display: none !important; }
    ${prefix}show-md { display: initial !important; }
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    ${prefix}hidden-md-only { display: none !important; }
  }

  @media (min-width: 768px) {
    ${prefix}show-md { display: none !important; }
    ${prefix}hidden-lg { display: none !important; }
    ${prefix}show-lg { display: initial !important; }
  }

  @media (min-width: 1024px) and (max-width: 1279px) {
    ${prefix}hidden-lg-only { display: none !important; }
  }

  @media (min-width: 1024px) {
    ${prefix}show-lg { display: none !important; }
    ${prefix}hidden-xl { display: none !important; }
    ${prefix}show-xl { display: initial !important; }
  }

  @media (min-width: 1280px) {
    ${prefix}show-xl { display: none !important; }
  }

  /* Responsive padding */
  ${prefix}px-responsive {
    padding-left: clamp(16px, 4vw, 48px);
    padding-right: clamp(16px, 4vw, 48px);
  }

  ${prefix}py-responsive {
    padding-top: clamp(32px, 6vw, 96px);
    padding-bottom: clamp(32px, 6vw, 96px);
  }

  ${prefix}p-responsive {
    padding: clamp(32px, 6vw, 96px) clamp(16px, 4vw, 48px);
  }

  /* Responsive text sizing */
  ${prefix}text-responsive-sm {
    font-size: clamp(0.875rem, 1.5vw, 1rem);
  }

  ${prefix}text-responsive-base {
    font-size: clamp(1rem, 2vw, 1.125rem);
  }

  ${prefix}text-responsive-lg {
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  }

  ${prefix}text-responsive-xl {
    font-size: clamp(1.5rem, 3vw, 2.25rem);
  }

  ${prefix}text-responsive-2xl {
    font-size: clamp(2rem, 5vw, 3.75rem);
  }

  ${prefix}text-responsive-3xl {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
  }

  /* Responsive grid columns */
  ${prefix}responsive-cols {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--ferrum-responsive-grid-gap, 16px);
  }

  @media (min-width: 640px) {
    ${prefix}responsive-cols { grid-template-columns: repeat(2, 1fr); }
  }

  @media (min-width: 1024px) {
    ${prefix}responsive-cols { grid-template-columns: repeat(3, 1fr); }
  }

  @media (min-width: 1280px) {
    ${prefix}responsive-cols { grid-template-columns: repeat(4, 1fr); }
  }
}
`;
}