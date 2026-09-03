/**
 * Ferrum Layout Engine — Container utilities.
 * 
 * Generates Tailwind-compatible class strings and CSS property objects
 * for centered, max-width container layouts.
 */

import React from 'react';
import type { ContainerConfig } from './types';

/** Container max-width presets (in pixels) */
export const CONTAINER_MAX_WIDTHS: Record<string, number | string> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1400,
  full: '100%',
};

/** Tailwind max-width class mapping for container presets */
const MAX_WIDTH_CLASSES: Record<string, string> = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-[1400px]',
  full: 'max-w-full',
};

/** Tailwind padding class mapping for common values */
const PADDING_CLASSES: Record<number, string> = {
  0: 'px-0',
  4: 'px-1',
  8: 'px-2',
  12: 'px-3',
  16: 'px-4',
  20: 'px-5',
  24: 'px-6',
  32: 'px-8',
  48: 'px-12',
  64: 'px-16',
};

/**
 * Generates a Tailwind-compatible class string for a container.
 * 
 * @param config - Container configuration (optional, uses sensible defaults)
 * @returns Space-separated Tailwind CSS classes
 * 
 * @example
 * containerClass()                              // => 'mx-auto px-4'
 * containerClass({ maxWidth: 'lg', centered: true })
 * // => 'mx-auto px-4 max-w-screen-lg'
 * containerClass({ maxWidth: 1200, padding: 24, centered: false })
 * // => 'px-6 max-w-[1200px]'
 */
export function containerClass(config?: ContainerConfig): string {
  const classes: string[] = [];
  const { maxWidth, padding, centered } = { maxWidth: undefined, padding: 16, centered: true, ...config };

  // Centered
  if (centered) {
    classes.push('mx-auto');
  }

  // Padding (horizontal)
  if (padding !== undefined) {
    const pClass = PADDING_CLASSES[padding];
    if (pClass) {
      classes.push(pClass);
    } else {
      classes.push(`px-[${padding}px]`);
    }
  }

  // Max width
  if (maxWidth !== undefined) {
    if (typeof maxWidth === 'string' && maxWidth in MAX_WIDTH_CLASSES) {
      classes.push(MAX_WIDTH_CLASSES[maxWidth]);
    } else if (typeof maxWidth === 'number') {
      const mwClass = MAX_WIDTH_CLASSES[String(maxWidth)];
      if (mwClass) {
        classes.push(mwClass);
      } else {
        classes.push(`max-w-[${maxWidth}px]`);
      }
    }
  }

  return classes.join(' ');
}

/**
 * Generates CSS properties for a container layout.
 * 
 * @param config - Container configuration (optional)
 * @returns React.CSSProperties object
 * 
 * @example
 * containerStyle({ maxWidth: 'lg', padding: 24, centered: true })
 * // => { maxWidth: '1024px', paddingLeft: '24px', paddingRight: '24px', marginLeft: 'auto', marginRight: 'auto' }
 */
export function containerStyle(config?: ContainerConfig): React.CSSProperties {
  const style: Record<string, string> = {};
  const { maxWidth, padding, centered } = { maxWidth: undefined, padding: 16, centered: true, ...config };

  if (centered) {
    style.marginLeft = 'auto';
    style.marginRight = 'auto';
  }

  if (padding !== undefined) {
    style.paddingLeft = `${padding}px`;
    style.paddingRight = `${padding}px`;
  }

  if (maxWidth !== undefined) {
    if (typeof maxWidth === 'string') {
      const preset = CONTAINER_MAX_WIDTHS[maxWidth];
      if (preset !== undefined) {
        style.maxWidth = typeof preset === 'string' ? preset : `${preset}px`;
      } else {
        style.maxWidth = maxWidth;
      }
    } else {
      style.maxWidth = `${maxWidth}px`;
    }
  }

  return style as React.CSSProperties;
}
