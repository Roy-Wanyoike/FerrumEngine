export function generateMasonryCSS(prefix: string): string {
  return `
@layer ferrum.layouts {
  ${prefix}masonry {
    column-count: var(--fr-masonry-columns, 3);
    column-gap: var(--ferrum-masonry-gap, 16px);
    width: 100%;
  }

  ${prefix}masonry-item {
    break-inside: avoid;
    margin-bottom: var(--ferrum-masonry-gap, 16px);
    display: block;
    animation: ferrum-masonry-in 0.4s ease both;
  }

  @keyframes ferrum-masonry-in {
    from {
      opacity: 0;
      transform: translateY(12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Responsive column counts */
  @media (max-width: 640px) {
    ${prefix}masonry {
      column-count: var(--fr-masonry-columns-sm, 1) !important;
    }
  }

  @media (min-width: 641px) and (max-width: 768px) {
    ${prefix}masonry {
      column-count: var(--fr-masonry-columns-md, 2) !important;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    ${prefix}masonry {
      column-count: var(--fr-masonry-columns-lg, 3) !important;
    }
  }

  @media (min-width: 1025px) and (max-width: 1280px) {
    ${prefix}masonry {
      column-count: var(--fr-masonry-columns-xl, 4) !important;
    }
  }

  @media (min-width: 1281px) {
    ${prefix}masonry {
      column-count: var(--fr-masonry-columns-2xl, 5) !important;
    }
  }

  /* Card variant */
  ${prefix}masonry-item--card {
    background: var(--ferrum-masonry-card-bg, #ffffff);
    border-radius: var(--ferrum-masonry-card-radius, 12px);
    overflow: hidden;
    box-shadow: var(--ferrum-masonry-card-shadow, 0 1px 3px rgba(0, 0, 0, 0.1));
    transition: box-shadow 0.2s ease, transform 0.2s ease;
  }

  ${prefix}masonry-item--card:hover {
    box-shadow: var(--ferrum-masonry-card-hover-shadow, 0 8px 25px rgba(0, 0, 0, 0.12));
    transform: translateY(-2px);
  }

  ${prefix}masonry-item-img {
    width: 100%;
    display: block;
    object-fit: cover;
  }

  ${prefix}masonry-item-body {
    padding: var(--ferrum-masonry-body-padding, 14px);
  }

  ${prefix}masonry-item-title {
    font-size: 15px;
    font-weight: 600;
    color: var(--ferrum-masonry-title-fg, #1e293b);
    line-height: 1.4;
    margin-bottom: 6px;
  }

  ${prefix}masonry-item-text {
    font-size: 13px;
    color: var(--ferrum-masonry-text-fg, #64748b);
    line-height: 1.5;
  }

  /* Staggered animation delay via nth-child */
  ${prefix}masonry-item:nth-child(1) { animation-delay: 0ms; }
  ${prefix}masonry-item:nth-child(2) { animation-delay: 50ms; }
  ${prefix}masonry-item:nth-child(3) { animation-delay: 100ms; }
  ${prefix}masonry-item:nth-child(4) { animation-delay: 150ms; }
  ${prefix}masonry-item:nth-child(5) { animation-delay: 200ms; }
  ${prefix}masonry-item:nth-child(6) { animation-delay: 250ms; }
  ${prefix}masonry-item:nth-child(7) { animation-delay: 300ms; }
  ${prefix}masonry-item:nth-child(8) { animation-delay: 350ms; }
  ${prefix}masonry-item:nth-child(9) { animation-delay: 400ms; }
  ${prefix}masonry-item:nth-child(10) { animation-delay: 450ms; }

  /* Single column mode */
  ${prefix}masonry--single {
    column-count: 1 !important;
  }

  ${prefix}masonry--compact {
    column-gap: var(--ferrum-masonry-compact-gap, 8px);
  }

  ${prefix}masonry--compact ${prefix}masonry-item {
    margin-bottom: var(--ferrum-masonry-compact-gap, 8px);
  }

  ${prefix}masonry--spacious {
    column-gap: var(--ferrum-masonry-spacious-gap, 24px);
  }

  ${prefix}masonry--spacious ${prefix}masonry-item {
    margin-bottom: var(--ferrum-masonry-spacious-gap, 24px);
  }
}
`;
}