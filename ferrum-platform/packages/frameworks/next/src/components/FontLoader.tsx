'use client';

import React, { useEffect, useState, type ReactNode } from 'react';

// --- Types ---

export interface FontLoaderProps {
  /** Custom font URL (defaults to Inter from Google Fonts) */
  fontUrl?: string;
  /** Font family name */
  fontFamily?: string;
  /** Font weight(s) to load */
  fontWeight?: number | string;
  /** Font style */
  fontStyle?: string;
  /** CSS class name to apply to the wrapper */
  className?: string;
  /** Children to render */
  children?: ReactNode;
}

const DEFAULT_FONT_URL = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
const DEFAULT_FONT_FAMILY = 'Inter, ui-sans-serif, system-ui, sans-serif';

/**
 * Client component that loads the Ferrum font (Inter) and applies it.
 *
 * Uses dynamic injection to avoid SSR hydration mismatches with Google Fonts.
 *
 * @example
 * ```tsx
 * import { FontLoader, ferrumFontClass } from '@ferrum/next';
 *
 * export default function Layout({ children }) {
 *   return (
 *     <html className={ferrumFontClass}>
 *       <body>
 *         <FontLoader>
 *           {children}
 *         </FontLoader>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function FontLoader({
  fontUrl = DEFAULT_FONT_URL,
  fontFamily = DEFAULT_FONT_FAMILY,
  fontWeight,
  fontStyle,
  className,
  children,
}: FontLoaderProps) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Check if this font is already loaded
    const existingLink = document.querySelector(
      `link[href*="fonts.googleapis.com"][href*="Inter"]`
    );

    if (existingLink) {
      setLoaded(true);
      return;
    }

    // Build the URL with weight parameter if specified
    let url = fontUrl;
    if (fontWeight !== undefined) {
      const weights = Array.isArray(fontWeight) ? fontWeight : [fontWeight];
      // Remove existing weight params and add new ones
      url = url.replace(/wght@[^&]+/, `wght@${weights.join(';')}`);
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;

    link.addEventListener('load', () => setLoaded(true));
    link.addEventListener('error', () => {
      console.warn(`[Ferrum] Failed to load font from: ${url}`);
      // Still set loaded to true to avoid blocking rendering
      setLoaded(true);
    });

    document.head.appendChild(link);
  }, [fontUrl, fontWeight]);

  const style: React.CSSProperties = {
    fontFamily,
    ...(fontStyle ? { fontStyle } : {}),
  };

  return (
    <div
      className={className}
      style={style}
      data-ferrum-font-loader
    >
      {children}
    </div>
  );
}

// --- Exported CSS class for direct use ---

/**
 * CSS class string to apply the Ferrum font to any element.
 * Usage: `<html className={ferrumFontClass}>`
 */
export const ferrumFontClass = 'font-ferrum';

/**
 * CSS-in-JS style object for the Ferrum font.
 * Usage: `style={{ ...ferrumFontStyle }}`
 */
export const ferrumFontStyle: React.CSSProperties = {
  fontFamily: DEFAULT_FONT_FAMILY,
};

/**
 * Variable containing the font configuration for use with next/font.
 *
 * @example
 * ```tsx
 * // If you prefer next/font/google, you can import Inter directly:
 * import { Inter } from 'next/font/google';
 * const inter = Inter({ subsets: ['latin'], variable: '--font-ferrum' });
 * ```
 */
export const ferrumFontConfig = {
  family: 'Inter',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-ferrum',
  display: 'swap' as const,
  weight: ['400', '500', '600', '700', '800'],
};

export default FontLoader;