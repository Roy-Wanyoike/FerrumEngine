export function generateEditorCSS(prefix: string): string {
  return `
@layer ferrum.layouts {
  ${prefix}editor {
    display: grid;
    grid-template-columns: var(--ferrum-editor-lines-width, 56px) 1fr var(--ferrum-editor-minimap-width, 80px);
    grid-template-rows: 1fr;
    height: 100%;
    width: 100%;
    font-family: var(--ferrum-editor-font, "JetBrains Mono", "Fira Code", "Cascadia Code", monospace);
    font-size: var(--ferrum-editor-font-size, 14px);
    line-height: var(--ferrum-editor-line-height, 1.6);
    background: var(--ferrum-editor-bg, #1e1e2e);
    color: var(--ferrum-editor-fg, #cdd6f4);
    overflow: hidden;
    position: relative;
  }

  ${prefix}editor--no-minimap {
    grid-template-columns: var(--ferrum-editor-lines-width, 56px) 1fr;
  }

  ${prefix}editor--no-lines {
    grid-template-columns: 1fr var(--ferrum-editor-minimap-width, 80px);
  }

  ${prefix}editor--no-lines${prefix}editor--no-minimap {
    grid-template-columns: 1fr;
  }

  ${prefix}editor-lines {
    grid-column: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: var(--ferrum-editor-padding-y, 16px) var(--ferrum-editor-lines-padding-right, 12px);
    background: var(--ferrum-editor-lines-bg, #181825);
    color: var(--ferrum-editor-lines-fg, #585b70);
    font-size: var(--ferrum-editor-lines-font-size, 13px);
    line-height: inherit;
    user-select: none;
    overflow: hidden;
    border-right: 1px solid var(--ferrum-editor-lines-border, #313244);
  }

  ${prefix}editor-line-number {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 8px;
    min-height: calc(1em * var(--ferrum-editor-line-height, 1.6));
    width: 100%;
  }

  ${prefix}editor-line-number--active {
    color: var(--ferrum-editor-line-active-fg, #cdd6f4);
  }

  ${prefix}editor-content {
    grid-column: 2;
    overflow: auto;
    padding: var(--ferrum-editor-padding-y, 16px) var(--ferrum-editor-padding-x, 16px);
    white-space: pre;
    tab-size: var(--ferrum-editor-tab-size, 2);
    -moz-tab-size: var(--ferrum-editor-tab-size, 2);
    caret-color: var(--ferrum-editor-caret, #f5e0dc);
    outline: none;
    position: relative;
  }

  ${prefix}editor-content:empty::before {
    content: var(--ferrum-editor-placeholder, "Start typing...");
    color: var(--ferrum-editor-placeholder-fg, #585b70);
    pointer-events: none;
  }

  ${prefix}editor-minimap {
    grid-column: 3;
    background: var(--ferrum-editor-minimap-bg, #181825);
    overflow: hidden;
    position: relative;
    border-left: 1px solid var(--ferrum-editor-minimap-border, #313244);
    opacity: 0.7;
    transition: opacity 0.2s ease;
  }

  ${prefix}editor-minimap:hover {
    opacity: 1;
  }

  ${prefix}editor-minimap-content {
    transform: scaleX(0.6) scaleY(0.6);
    transform-origin: top left;
    pointer-events: none;
    width: calc(100% / 0.6);
    font-size: inherit;
    line-height: inherit;
    white-space: pre;
    color: var(--ferrum-editor-minimap-fg, #585b70);
  }

  ${prefix}editor-minimap-viewport {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: var(--ferrum-editor-minimap-viewport-bg, rgba(99, 102, 241, 0.12));
    border: 1px solid var(--ferrum-editor-minimap-viewport-border, rgba(99, 102, 241, 0.3));
    border-radius: 2px;
    pointer-events: none;
    transition: top 0.1s ease;
  }

  /* Active line highlight */
  ${prefix}editor-content::selection {
    background: var(--ferrum-editor-selection-bg, rgba(99, 102, 241, 0.3));
  }

  /* Breadcrumbs bar */
  ${prefix}editor-breadcrumbs {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 16px;
    font-size: 12px;
    color: var(--ferrum-editor-breadcrumbs-fg, #6c7086);
    background: var(--ferrum-editor-breadcrumbs-bg, #181825);
    border-bottom: 1px solid var(--ferrum-editor-breadcrumbs-border, #313244);
    overflow-x: auto;
    white-space: nowrap;
  }

  ${prefix}editor-breadcrumb {
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 4px;
    transition: color 0.15s ease, background 0.15s ease;
  }

  ${prefix}editor-breadcrumb:hover {
    color: var(--ferrum-editor-breadcrumb-hover-fg, #cdd6f4);
    background: rgba(255, 255, 255, 0.05);
  }

  ${prefix}editor-breadcrumb-separator {
    color: var(--ferrum-editor-breadcrumb-sep-fg, #45475a);
    font-size: 10px;
  }

  /* Tab bar */
  ${prefix}editor-tabs {
    display: flex;
    align-items: stretch;
    background: var(--ferrum-editor-tabs-bg, #181825);
    border-bottom: 1px solid var(--ferrum-editor-tabs-border, #313244);
    overflow-x: auto;
    overflow-y: hidden;
  }

  ${prefix}editor-tab {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    font-size: 13px;
    color: var(--ferrum-editor-tab-fg, #6c7086);
    cursor: pointer;
    border-right: 1px solid var(--ferrum-editor-tabs-border, #313244);
    white-space: nowrap;
    transition: background 0.15s ease, color 0.15s ease;
    position: relative;
  }

  ${prefix}editor-tab:hover {
    color: var(--ferrum-editor-tab-hover-fg, #cdd6f4);
    background: var(--ferrum-editor-tab-hover-bg, #1e1e2e);
  }

  ${prefix}editor-tab--active {
    color: var(--ferrum-editor-tab-active-fg, #cdd6f4);
    background: var(--ferrum-editor-tab-active-bg, #1e1e2e);
  }

  ${prefix}editor-tab--active::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--ferrum-editor-tab-indicator, #818cf8);
  }

  ${prefix}editor-tab-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    font-size: 12px;
    opacity: 0;
    transition: opacity 0.15s ease, background 0.15s ease;
  }

  ${prefix}editor-tab:hover ${prefix}editor-tab-close {
    opacity: 0.6;
  }

  ${prefix}editor-tab-close:hover {
    background: rgba(255, 255, 255, 0.1);
    opacity: 1 !important;
  }

  /* Status bar */
  ${prefix}editor-status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    height: var(--ferrum-editor-status-height, 24px);
    font-size: 12px;
    color: var(--ferrum-editor-status-fg, #6c7086);
    background: var(--ferrum-editor-status-bg, #181825);
    border-top: 1px solid var(--ferrum-editor-status-border, #313244);
  }

  ${prefix}editor-status-left,
  ${prefix}editor-status-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  /* Responsive */
  @media (max-width: 768px) {
    ${prefix}editor {
      grid-template-columns: var(--ferrum-editor-lines-width, 40px) 1fr;
    }

    ${prefix}editor-minimap {
      display: none;
    }

    ${prefix}editor-tab {
      padding: 8px 12px;
      font-size: 12px;
    }
  }
}
`;
}