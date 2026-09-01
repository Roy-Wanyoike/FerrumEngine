/**
 * Ferrum Layout Engine — Sidebar layout utilities.
 * 
 * Generates class strings and CSS property objects for sidebar + content
 * two-panel layouts.
 */

import React from 'react';
import type { SidebarConfig } from './types';

/** Sidebar width presets (in pixels) */
export const SIDEBAR_WIDTHS: Record<string, number> = {
  sm: 220,
  md: 260,
  lg: 300,
  xl: 340,
};

/**
 * Generates a Tailwind-compatible class string for a sidebar layout wrapper.
 * 
 * @param config - Sidebar configuration (optional)
 * @returns Space-separated Tailwind CSS classes
 * 
 * @example
 * sidebarLayoutClass()                                    // => 'flex flex-row'
 * sidebarLayoutClass({ sidebarWidth: 260 })               // => 'flex flex-row'
 * sidebarLayoutClass({ collapsible: true })               // => 'flex flex-row'
 */
export function sidebarLayoutClass(config?: SidebarConfig): string {
  return 'flex flex-row';
}

/**
 * Generates CSS properties for the sidebar and content areas.
 * 
 * @param config - Sidebar configuration
 * @returns An object with `sidebar` and `content` CSSProperties
 * 
 * @example
 * sidebarStyle({ sidebarWidth: 260 })
 * // => {
 * //   sidebar: { width: '260px', flexShrink: 0, minWidth: '260px' },
 * //   content: { flex: 1, minWidth: 0 }
 * // }
 */
export function sidebarStyle(config: SidebarConfig): {
  sidebar: React.CSSProperties;
  content: React.CSSProperties;
} {
  let width: number = 260;

  if (config.sidebarWidth !== undefined) {
    if (typeof config.sidebarWidth === 'string' && config.sidebarWidth in SIDEBAR_WIDTHS) {
      width = SIDEBAR_WIDTHS[config.sidebarWidth]!;
    } else if (typeof config.sidebarWidth === 'number') {
      width = config.sidebarWidth;
    }
  }

  const contentStyle: Record<string, string | number> = {
    flex: 1,
    minWidth: '0',
  };

  if (config.contentMaxWidth !== undefined) {
    const mw = typeof config.contentMaxWidth === 'number'
      ? `${config.contentMaxWidth}px`
      : config.contentMaxWidth;
    contentStyle.maxWidth = mw;
  }

  return {
    sidebar: {
      width: `${width}px`,
      flexShrink: 0,
      minWidth: `${width}px`,
    } as React.CSSProperties,
    content: contentStyle as React.CSSProperties,
  };
}
