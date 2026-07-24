export function generateOverlayCSS(prefix: string): string {
  return `
@layer ferrum.layouts {
  /* Full-screen overlay */
  ${prefix}overlay {
    position: fixed;
    inset: 0;
    z-index: var(--ferrum-overlay-z, 50);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--ferrum-overlay-backdrop, rgba(0, 0, 0, 0.5));
    backdrop-filter: var(--ferrum-overlay-blur, blur(4px));
    -webkit-backdrop-filter: var(--ferrum-overlay-blur, blur(4px));
    padding: var(--ferrum-overlay-padding, 16px);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.25s ease, visibility 0.25s ease;
  }

  ${prefix}overlay--open {
    opacity: 1;
    visibility: visible;
  }

  ${prefix}overlay--no-blur {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  ${prefix}overlay--dark {
    background: var(--ferrum-overlay-backdrop-dark, rgba(0, 0, 0, 0.75));
  }

  ${prefix}overlay--light {
    background: var(--ferrum-overlay-backdrop-light, rgba(255, 255, 255, 0.7));
  }

  /* Centered content panel */
  ${prefix}overlay-content {
    position: relative;
    background: var(--ferrum-overlay-content-bg, #ffffff);
    border-radius: var(--ferrum-overlay-content-radius, 16px);
    box-shadow: var(--ferrum-overlay-content-shadow, 0 25px 50px -12px rgba(0, 0, 0, 0.25));
    max-width: var(--ferrum-overlay-content-max-width, 480px);
    width: 100%;
    max-height: var(--ferrum-overlay-content-max-height, 85vh);
    overflow-y: auto;
    transform: scale(0.95) translateY(10px);
    transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }

  ${prefix}overlay--open > ${prefix}overlay-content {
    transform: scale(1) translateY(0);
  }

  ${prefix}overlay-content--sm {
    max-width: 360px;
  }

  ${prefix}overlay-content--md {
    max-width: 480px;
  }

  ${prefix}overlay-content--lg {
    max-width: 640px;
  }

  ${prefix}overlay-content--xl {
    max-width: 800px;
  }

  ${prefix}overlay-content--full {
    max-width: calc(100vw - 32px);
    max-height: calc(100vh - 32px);
    border-radius: 8px;
  }

  /* Close button */
  ${prefix}overlay-close {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--ferrum-overlay-close-bg, rgba(0, 0, 0, 0.05));
    color: var(--ferrum-overlay-close-fg, #64748b);
    border: none;
    cursor: pointer;
    z-index: 1;
    transition: background 0.15s ease, color 0.15s ease;
  }

  ${prefix}overlay-close:hover {
    background: var(--ferrum-overlay-close-hover-bg, rgba(0, 0, 0, 0.1));
    color: var(--ferrum-overlay-close-hover-fg, #1e293b);
  }

  /* Header, body, footer sections */
  ${prefix}overlay-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px 0;
    gap: 16px;
  }

  ${prefix}overlay-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--ferrum-overlay-title-fg, #0f172a);
    letter-spacing: -0.02em;
  }

  ${prefix}overlay-body {
    padding: 16px 24px;
    color: var(--ferrum-overlay-body-fg, #475569);
    font-size: 14px;
    line-height: 1.6;
    overflow-y: auto;
  }

  ${prefix}overlay-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding: 16px 24px 20px;
    border-top: 1px solid var(--ferrum-overlay-footer-border, #e2e8f0);
  }

  /* Drawer variants */
  ${prefix}overlay-drawer-left,
  ${prefix}overlay-drawer-right {
    position: fixed;
    inset: 0;
    z-index: var(--ferrum-overlay-z, 50);
    display: flex;
    background: var(--ferrum-overlay-backdrop, rgba(0, 0, 0, 0.5));
    backdrop-filter: var(--ferrum-overlay-blur, blur(4px));
    -webkit-backdrop-filter: var(--ferrum-overlay-blur, blur(4px));
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
  }

  ${prefix}overlay-drawer-left--open,
  ${prefix}overlay-drawer-right--open {
    opacity: 1;
    visibility: visible;
  }

  ${prefix}overlay-drawer-left {
    justify-content: flex-start;
  }

  ${prefix}overlay-drawer-right {
    justify-content: flex-end;
  }

  ${prefix}overlay-drawer-panel {
    display: flex;
    flex-direction: column;
    background: var(--ferrum-overlay-drawer-bg, #ffffff);
    height: 100%;
    max-width: var(--ferrum-overlay-drawer-width, 400px);
    width: 100%;
    box-shadow: var(--ferrum-overlay-drawer-shadow, 8px 0 30px rgba(0, 0, 0, 0.12));
    overflow-y: auto;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  ${prefix}overlay-drawer-left ${prefix}overlay-drawer-panel {
    transform: translateX(-100%);
    border-right: 1px solid var(--ferrum-overlay-drawer-border, #e2e8f0);
  }

  ${prefix}overlay-drawer-left--open ${prefix}overlay-drawer-panel {
    transform: translateX(0);
  }

  ${prefix}overlay-drawer-right ${prefix}overlay-drawer-panel {
    transform: translateX(100%);
    border-left: 1px solid var(--ferrum-overlay-drawer-border, #e2e8f0);
    box-shadow: -8px 0 30px rgba(0, 0, 0, 0.12);
  }

  ${prefix}overlay-drawer-right--open ${prefix}overlay-drawer-panel {
    transform: translateX(0);
  }

  ${prefix}overlay-drawer-panel--sm { max-width: 300px; }
  ${prefix}overlay-drawer-panel--md { max-width: 400px; }
  ${prefix}overlay-drawer-panel--lg { max-width: 560px; }
  ${prefix}overlay-drawer-panel--xl { max-width: 720px; }

  /* Click-away area for drawers */
  ${prefix}overlay-drawer-left::after,
  ${prefix}overlay-drawer-right::after {
    content: "";
    flex: 1;
  }

  /* Z-index hierarchy */
  ${prefix}overlay--z-10 { z-index: 10; }
  ${prefix}overlay--z-20 { z-index: 20; }
  ${prefix}overlay--z-30 { z-index: 30; }
  ${prefix}overlay--z-40 { z-index: 40; }
  ${prefix}overlay--z-50 { z-index: 50; }
  ${prefix}overlay--z-60 { z-index: 60; }

  /* Mobile: full-screen drawers */
  @media (max-width: 640px) {
    ${prefix}overlay-drawer-panel {
      max-width: 100% !important;
    }

    ${prefix}overlay-content {
      max-width: calc(100vw - 16px);
      max-height: calc(100vh - 16px);
      border-radius: 12px;
    }
  }
}
`;
}