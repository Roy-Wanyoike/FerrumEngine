/**
 * Ferrum Layout Engine — Flexbox stack utilities.
 * 
 * Generates Tailwind-compatible class strings and CSS property objects
 * for flex-based stack layouts (HStack, VStack).
 */

import React from 'react';
import type { StackConfig, GapPreset, FlexDirection, AlignItems, JustifyContent } from './types';
import { GAP_PRESETS } from './grid';

/** Tailwind align-items class mapping */
const ALIGN_CLASSES: Record<AlignItems, string> = {
  'flex-start': 'items-start',
  'flex-end': 'items-end',
  center: 'items-center',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

/** Tailwind justify-content class mapping */
const JUSTIFY_CLASSES: Record<JustifyContent, string> = {
  'flex-start': 'justify-start',
  'flex-end': 'justify-end',
  center: 'justify-center',
  'space-between': 'justify-between',
  'space-around': 'justify-around',
  'space-evenly': 'justify-evenly',
};

/** Tailwind gap class mapping (re-exported from grid for convenience) */
const GAP_CLASSES: Record<GapPreset, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
};

/**
 * Generates a Tailwind-compatible class string for a flex stack layout.
 * 
 * @param config - Stack configuration
 * @returns Space-separated Tailwind CSS classes
 * 
 * @example
 * stackClass({ direction: 'row', gap: 'md', align: 'center' })
 * // => 'flex flex-row gap-4 items-center'
 * 
 * stackClass({ direction: 'column', gap: 'sm', wrap: true })
 * // => 'flex flex-col gap-2 flex-wrap'
 */
export function stackClass(config: StackConfig): string {
  const classes: string[] = ['flex'];

  // Direction
  let direction: FlexDirection = config.direction ?? 'row';
  if (config.reverse) {
    if (direction === 'row') direction = 'row-reverse';
    else if (direction === 'column') direction = 'column-reverse';
  }
  classes.push(`flex-${direction}`);

  // Gap
  if (config.gap !== undefined) {
    if (typeof config.gap === 'string' && config.gap in GAP_CLASSES) {
      classes.push(GAP_CLASSES[config.gap as GapPreset]);
    } else if (typeof config.gap === 'number') {
      classes.push(`gap-[${config.gap}px]`);
    }
  }

  // Alignment
  if (config.align) {
    classes.push(ALIGN_CLASSES[config.align]);
  }

  // Justification
  if (config.justify) {
    classes.push(JUSTIFY_CLASSES[config.justify]);
  }

  // Wrap
  if (config.wrap) {
    classes.push('flex-wrap');
  }

  return classes.join(' ');
}

/**
 * Preconfigured HStack (horizontal stack) settings object.
 * Use with `stackClass()` or as a reference config.
 */
export const HStack: StackConfig = {
  direction: 'row',
  align: 'center',
  gap: 'md',
};

/**
 * Preconfigured VStack (vertical stack) settings object.
 * Use with `stackClass()` or as a reference config.
 */
export const VStack: StackConfig = {
  direction: 'column',
  gap: 'md',
};

/**
 * Generates CSS properties for a flex stack layout.
 * Useful for dynamic values that can't be expressed as Tailwind classes.
 * 
 * @param config - Partial stack configuration
 * @returns React.CSSProperties object
 * 
 * @example
 * stackStyle({ direction: 'row', gap: 20 })
 * // => { display: 'flex', flexDirection: 'row', gap: '20px' }
 */
export function stackStyle(config: Partial<StackConfig>): React.CSSProperties {
  const style: Record<string, string> = {
    display: 'flex',
  };

  // Direction
  let direction: FlexDirection = config.direction ?? 'row';
  if (config.reverse) {
    if (direction === 'row') direction = 'row-reverse';
    else if (direction === 'column') direction = 'column-reverse';
  }
  style.flexDirection = direction;

  // Gap
  if (config.gap !== undefined) {
    if (typeof config.gap === 'string') {
      const px = GAP_PRESETS[config.gap as GapPreset];
      if (px !== undefined) {
        style.gap = `${px}px`;
      }
    } else {
      style.gap = `${config.gap}px`;
    }
  }

  // Alignment
  if (config.align) {
    style.alignItems = config.align;
  }

  // Justification
  if (config.justify) {
    style.justifyContent = config.justify;
  }

  // Wrap
  if (config.wrap) {
    style.flexWrap = 'wrap';
  }

  return style as React.CSSProperties;
}
