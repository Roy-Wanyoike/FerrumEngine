export function generateDashboardCSS(prefix: string): string {
  return `
@layer ferrum.layouts {
  ${prefix}dashboard {
    display: grid;
    grid-template-areas:
      "sidebar header"
      "sidebar main";
    grid-template-columns: var(--ferrum-dashboard-sidebar-width, 260px) 1fr;
    grid-template-rows: var(--ferrum-dashboard-header-height, 64px) 1fr;
    min-height: 100vh;
    width: 100%;
  }

  ${prefix}dashboard-sidebar {
    grid-area: sidebar;
    display: flex;
    flex-direction: column;
    background: var(--ferrum-dashboard-sidebar-bg, #1a1a2e);
    color: var(--ferrum-dashboard-sidebar-fg, #e0e0e0);
    border-right: 1px solid var(--ferrum-dashboard-sidebar-border, rgba(255, 255, 255, 0.08));
    overflow-y: auto;
    z-index: 10;
    padding: var(--ferrum-dashboard-sidebar-padding, 16px);
    gap: var(--ferrum-dashboard-sidebar-gap, 4px);
    transition: width 0.3s ease, transform 0.3s ease;
  }

  ${prefix}dashboard-main {
    grid-area: main;
    display: flex;
    flex-direction: column;
    padding: var(--ferrum-dashboard-main-padding, 24px);
    overflow-y: auto;
    background: var(--ferrum-dashboard-main-bg, #f8f9fa);
    color: var(--ferrum-dashboard-main-fg, #1a1a2e);
  }

  ${prefix}dashboard-header {
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--ferrum-dashboard-header-padding-x, 24px);
    background: var(--ferrum-dashboard-header-bg, #ffffff);
    color: var(--ferrum-dashboard-header-fg, #1a1a2e);
    border-bottom: 1px solid var(--ferrum-dashboard-header-border, #e5e7eb);
    z-index: 5;
    gap: var(--ferrum-dashboard-header-gap, 16px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  }

  ${prefix}dashboard-sidebar-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 8px;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--ferrum-dashboard-brand-color, #ffffff);
    border-bottom: 1px solid var(--ferrum-dashboard-sidebar-border, rgba(255, 255, 255, 0.08));
    margin-bottom: 8px;
  }

  ${prefix}dashboard-sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    overflow-y: auto;
  }

  ${prefix}dashboard-sidebar-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: var(--ferrum-dashboard-nav-fg, rgba(255, 255, 255, 0.7));
    text-decoration: none;
    transition: background 0.15s ease, color 0.15s ease;
    cursor: pointer;
  }

  ${prefix}dashboard-sidebar-link:hover {
    background: rgba(255, 255, 255, 0.08);
    color: var(--ferrum-dashboard-nav-hover-fg, #ffffff);
  }

  ${prefix}dashboard-sidebar-link--active {
    background: var(--ferrum-dashboard-nav-active-bg, rgba(255, 255, 255, 0.12));
    color: var(--ferrum-dashboard-nav-active-fg, #ffffff);
  }

  ${prefix}dashboard-sidebar-section {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 16px;
  }

  ${prefix}dashboard-sidebar-section-title {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--ferrum-dashboard-section-fg, rgba(255, 255, 255, 0.4));
    padding: 0 12px;
    margin-bottom: 4px;
  }

  ${prefix}dashboard-header-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  ${prefix}dashboard-header-title {
    font-size: 20px;
    font-weight: 700;
    color: var(--ferrum-dashboard-header-fg, #1a1a2e);
    letter-spacing: -0.02em;
  }

  ${prefix}dashboard-main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--ferrum-dashboard-content-gap, 24px);
  }

  ${prefix}dashboard-footer {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 24px;
    font-size: 13px;
    color: var(--ferrum-dashboard-footer-fg, #9ca3af);
    border-top: 1px solid var(--ferrum-dashboard-footer-border, #e5e7eb);
  }

  /* Responsive: collapse sidebar on small screens */
  @media (max-width: 768px) {
    ${prefix}dashboard {
      grid-template-areas:
        "header"
        "main";
      grid-template-columns: 1fr;
      grid-template-rows: var(--ferrum-dashboard-header-height, 64px) 1fr;
    }

    ${prefix}dashboard-sidebar {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 0;
      width: var(--ferrum-dashboard-sidebar-width, 260px);
      transform: translateX(-100%);
      z-index: 50;
    }

    ${prefix}dashboard-sidebar--open {
      transform: translateX(0);
    }

    ${prefix}dashboard-overlay {
      display: block;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 40;
      backdrop-filter: blur(2px);
    }

    ${prefix}dashboard-main {
      grid-area: main;
    }
  }

  @media (min-width: 769px) {
    ${prefix}dashboard-overlay {
      display: none;
    }
  }
}
`;
}