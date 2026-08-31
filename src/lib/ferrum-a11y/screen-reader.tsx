/**
 * Ferrum A11y — React components for screen-reader accessibility.
 *
 * Provides `ScreenReaderOnly` (visually-hidden content) and `LiveRegion`
 * (reactive ARIA live-region) components.
 *
 * @module ferrum-a11y/screen-reader
 */

'use client';

import React from 'react';
import type { ScreenReaderOnlyProps } from './types';

/**
 * Visually hidden content that is still accessible to screen readers.
 *
 * Uses the classic `.sr-only` CSS pattern (clip-based).
 *
 * @example
 * ```tsx
 * <ScreenReaderOnly>Description of an icon</ScreenReaderOnly>
 * ```
 */
export const ScreenReaderOnly: React.FC<ScreenReaderOnlyProps> = ({
  children,
  className = '',
  as: Tag = 'span',
}) => {
  const srStyles: React.CSSProperties = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: 0,
  };

  return (
    <Tag className={`sr-only ${className}`.trim()} style={srStyles}>
      {children}
    </Tag>
  );
};

ScreenReaderOnly.displayName = 'ScreenReaderOnly';

/** Props for the {@link LiveRegion} component. */
export interface LiveRegionProps {
  /** The content announced by the live region. */
  children?: React.ReactNode;
  /** Politeness level. Defaults to `'polite'`. */
  politeness?: 'polite' | 'assertive';
  /** Optional additional CSS class. */
  className?: string;
}

/**
 * An ARIA live region that announces content changes to screen readers.
 *
 * @example
 * ```tsx
 * <LiveRegion politeness="assertive">{errorMessage}</LiveRegion>
 * ```
 */
export const LiveRegion: React.FC<LiveRegionProps> = ({
  children,
  politeness = 'polite',
  className = '',
}) => {
  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className={className || undefined}
    >
      {children}
    </div>
  );
};

LiveRegion.displayName = 'LiveRegion';
