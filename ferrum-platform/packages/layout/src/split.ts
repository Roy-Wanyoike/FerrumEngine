export function generateSplitCSS(prefix: string): string {
  return `
@layer ferrum.layouts {
  ${prefix}split {
    display: flex;
    flex: 1;
    overflow: hidden;
    position: relative;
  }

  ${prefix}split-horizontal {
    flex-direction: row;
    height: 100%;
  }

  ${prefix}split-vertical {
    flex-direction: column;
    width: 100%;
  }

  ${prefix}split-panel {
    overflow: auto;
    min-width: 0;
    min-height: 0;
    position: relative;
  }

  ${prefix}split-horizontal > ${prefix}split-panel:first-child {
    width: var(--fr-split-ratio, 50%);
  }

  ${prefix}split-horizontal > ${prefix}split-panel:last-child {
    flex: 1;
    min-width: 60px;
  }

  ${prefix}split-vertical > ${prefix}split-panel:first-child {
    height: var(--fr-split-ratio, 50%);
  }

  ${prefix}split-vertical > ${prefix}split-panel:last-child {
    flex: 1;
    min-height: 60px;
  }

  ${prefix}split-gutter {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    background: var(--ferrum-split-gutter-bg, #e5e7eb);
    transition: background 0.15s ease;
    position: relative;
  }

  ${prefix}split-gutter:hover {
    background: var(--ferrum-split-gutter-hover-bg, #d1d5db);
  }

  ${prefix}split-gutter--active {
    background: var(--ferrum-split-gutter-active-bg, #818cf8);
  }

  ${prefix}split-horizontal > ${prefix}split-gutter {
    width: var(--ferrum-split-gutter-size, 6px);
    cursor: col-resize;
    flex-direction: column;
  }

  ${prefix}split-vertical > ${prefix}split-gutter {
    height: var(--ferrum-split-gutter-size, 6px);
    cursor: row-resize;
    flex-direction: row;
  }

  ${prefix}split-gutter-handle {
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.4;
    transition: opacity 0.15s ease;
    pointer-events: none;
  }

  ${prefix}split-gutter:hover ${prefix}split-gutter-handle {
    opacity: 0.8;
  }

  ${prefix}split-horizontal > ${prefix}split-gutter ${prefix}split-gutter-handle {
    width: 2px;
    height: 24px;
    border-radius: 1px;
    background: var(--ferrum-split-handle-color, #9ca3af);
  }

  ${prefix}split-vertical > ${prefix}split-gutter ${prefix}split-gutter-handle {
    height: 2px;
    width: 24px;
    border-radius: 1px;
    background: var(--ferrum-split-handle-color, #9ca3af);
  }

  /* 3+ panel support */
  ${prefix}split-horizontal > ${prefix}split-panel {
    flex: 1 1 0%;
    min-width: 60px;
  }

  ${prefix}split-vertical > ${prefix}split-panel {
    flex: 1 1 0%;
    min-height: 60px;
  }

  /* Initial size overrides via data attributes */
  ${prefix}split-panel[data-split-size="25"] {
    flex: 0 0 25% !important;
  }

  ${prefix}split-panel[data-split-size="33"] {
    flex: 0 0 33.333% !important;
  }

  ${prefix}split-panel[data-split-size="50"] {
    flex: 0 0 50% !important;
  }

  ${prefix}split-panel[data-split-size="66"] {
    flex: 0 0 66.666% !important;
  }

  ${prefix}split-panel[data-split-size="75"] {
    flex: 0 0 75% !important;
  }

  /* Collapsible panel */
  ${prefix}split-panel--collapsed {
    flex: 0 0 0% !important;
    overflow: hidden !important;
    min-width: 0 !important;
    min-height: 0 !important;
    padding: 0 !important;
    opacity: 0;
    transition: flex 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.2s ease,
                min-width 0.3s ease;
  }

  ${prefix}split-panel:not(${prefix}split-panel--collapsed) {
    transition: flex 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Mobile: stack vertically */
  @media (max-width: 768px) {
    ${prefix}split-horizontal {
      flex-direction: column;
    }

    ${prefix}split-horizontal > ${prefix}split-panel {
      flex: 1 1 auto !important;
      min-width: 0;
      width: 100% !important;
    }

    ${prefix}split-horizontal > ${prefix}split-gutter {
      width: 100%;
      height: var(--ferrum-split-gutter-size, 6px);
      cursor: row-resize;
      flex-direction: row;
    }
  }
}
`;
}