export function generateSidebarCSS(prefix: string): string {
  return `
@layer ferrum.layouts {
  ${prefix}sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: var(--ferrum-sidebar-width, 260px);
    display: flex;
    flex-direction: column;
    background: var(--ferrum-sidebar-bg, #0f172a);
    color: var(--ferrum-sidebar-fg, #e2e8f0);
    border-right: 1px solid var(--ferrum-sidebar-border, rgba(255, 255, 255, 0.06));
    z-index: var(--ferrum-sidebar-z, 40);
    overflow: hidden;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
  }

  ${prefix}sidebar--right {
    left: auto;
    right: 0;
    border-right: none;
    border-left: 1px solid var(--ferrum-sidebar-border, rgba(255, 255, 255, 0.06));
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  }

  ${prefix}sidebar--absolute {
    position: absolute;
  }

  ${prefix}sidebar-collapsed {
    width: var(--ferrum-sidebar-collapsed-width, 64px);
  }

  ${prefix}sidebar-collapsed ${prefix}sidebar-item-label,
  ${prefix}sidebar-collapsed ${prefix}sidebar-group-label {
    opacity: 0;
    width: 0;
    overflow: hidden;
    white-space: nowrap;
  }

  ${prefix}sidebar-collapsed ${prefix}sidebar-item {
    justify-content: center;
    padding-left: 0;
    padding-right: 0;
  }

  ${prefix}sidebar-collapsed ${prefix}sidebar-brand-label {
    opacity: 0;
    width: 0;
    overflow: hidden;
  }

  ${prefix}sidebar-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    min-height: 64px;
    border-bottom: 1px solid var(--ferrum-sidebar-border, rgba(255, 255, 255, 0.06));
    flex-shrink: 0;
  }

  ${prefix}sidebar-brand-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--ferrum-sidebar-brand-icon-bg, rgba(255, 255, 255, 0.1));
    flex-shrink: 0;
  }

  ${prefix}sidebar-brand-label {
    font-size: 16px;
    font-weight: 700;
    color: var(--ferrum-sidebar-brand-fg, #ffffff);
    white-space: nowrap;
    transition: opacity 0.2s ease, width 0.2s ease;
  }

  ${prefix}sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 12px 8px;
  }

  ${prefix}sidebar-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin-top: 8px;
  }

  ${prefix}sidebar-group-label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ferrum-sidebar-group-fg, rgba(255, 255, 255, 0.35));
    padding: 8px 12px 4px;
    white-space: nowrap;
    transition: opacity 0.2s ease, width 0.2s ease;
  }

  ${prefix}sidebar-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 9px 12px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: var(--ferrum-sidebar-item-fg, rgba(255, 255, 255, 0.65));
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
    position: relative;
  }

  ${prefix}sidebar-item:hover {
    background: var(--ferrum-sidebar-item-hover-bg, rgba(255, 255, 255, 0.08));
    color: var(--ferrum-sidebar-item-hover-fg, #ffffff);
    transform: translateX(2px);
  }

  ${prefix}sidebar-item:active {
    transform: translateX(1px);
  }

  ${prefix}sidebar-item--active {
    background: var(--ferrum-sidebar-item-active-bg, rgba(99, 102, 241, 0.15));
    color: var(--ferrum-sidebar-item-active-fg, #818cf8);
  }

  ${prefix}sidebar-item--active::before {
    content: "";
    position: absolute;
    left: -8px;
    top: 50%;
    transform: translateY(-50%);
    width: 3px;
    height: 20px;
    border-radius: 0 3px 3px 0;
    background: var(--ferrum-sidebar-item-active-indicator, #818cf8);
  }

  ${prefix}sidebar-item-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  ${prefix}sidebar-item-label {
    flex: 1;
    transition: opacity 0.2s ease, width 0.2s ease;
  }

  ${prefix}sidebar-item-badge {
    font-size: 11px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 9999px;
    background: var(--ferrum-sidebar-badge-bg, #ef4444);
    color: var(--ferrum-sidebar-badge-fg, #ffffff);
    line-height: 1.4;
  }

  ${prefix}sidebar-footer {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 12px 8px;
    border-top: 1px solid var(--ferrum-sidebar-border, rgba(255, 255, 255, 0.06));
    flex-shrink: 0;
  }

  ${prefix}sidebar-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--ferrum-sidebar-toggle-bg, rgba(255, 255, 255, 0.08));
    color: var(--ferrum-sidebar-toggle-fg, rgba(255, 255, 255, 0.7));
    cursor: pointer;
    border: none;
    transition: background 0.15s ease;
    margin: 8px auto;
  }

  ${prefix}sidebar-toggle:hover {
    background: var(--ferrum-sidebar-toggle-hover-bg, rgba(255, 255, 255, 0.15));
  }

  /* Mobile overlay sidebar */
  @media (max-width: 768px) {
    ${prefix}sidebar {
      transform: translateX(-100%);
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    ${prefix}sidebar--right {
      transform: translateX(100%);
    }

    ${prefix}sidebar--open {
      transform: translateX(0);
    }
  }
}
`;
}