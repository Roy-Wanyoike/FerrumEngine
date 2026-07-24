'use client';

import React, { useEffect, useState, type ReactNode } from 'react';

// --- Types ---

export interface FerrumCSSProps {
  /** URL of the Ferrum CSS file */
  href?: string;
  /** Whether to preload the CSS */
  preload?: boolean;
  /** Additional link attributes */
  media?: string;
  /** Cross-origin attribute */
  crossOrigin?: string;
  /** Callback when CSS has loaded */
  onLoad?: () => void;
  /** Callback when CSS fails to load */
  onError?: (error: string) => void;
  /** Children to render */
  children?: ReactNode;
}

const DEFAULT_CSS_URL = 'https://cdn.ferrum.dev/styles/ferrum.css';

/**
 * Client component that dynamically loads Ferrum CSS.
 *
 * Avoids flash of unstyled content by loading CSS on the client side
 * with optional preloading support.
 *
 * @example
 * ```tsx
 * // In your layout.tsx
 * import { FerrumCSS } from '@ferrum/next';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <FerrumCSS href="/styles/ferrum.css" />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function FerrumCSS({
  href = DEFAULT_CSS_URL,
  preload = false,
  media,
  crossOrigin,
  onLoad,
  onError,
  children,
}: FerrumCSSProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Check if the stylesheet is already loaded
    const existingLink = document.querySelector(
      `link[href="${href}"]`
    ) as HTMLLinkElement | null;

    if (existingLink) {
      // Already in the DOM — check if it's loaded
      if (existingLink.sheet) {
        setLoaded(true);
        onLoad?.();
      } else {
        existingLink.addEventListener('load', () => {
          setLoaded(true);
          onLoad?.();
        });
        existingLink.addEventListener('error', () => {
          const msg = `Failed to load Ferrum CSS from: ${href}`;
          setError(msg);
          onError?.(msg);
        });
      }
      return;
    }

    // Create preload link if requested
    if (preload) {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'style';
      preloadLink.href = href;
      if (crossOrigin) preloadLink.crossOrigin = crossOrigin;
      document.head.appendChild(preloadLink);
    }

    // Create the actual stylesheet link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    if (media) link.media = media;
    if (crossOrigin) link.crossOrigin = crossOrigin;

    link.addEventListener('load', () => {
      setLoaded(true);
      onLoad?.();
    });

    link.addEventListener('error', () => {
      const msg = `Failed to load Ferrum CSS from: ${href}`;
      setError(msg);
      onError?.(msg);
    });

    document.head.appendChild(link);

    return () => {
      // Don't remove on unmount — keep the CSS loaded
    };
  }, [href, preload, media, crossOrigin, onLoad, onError]);

  // Render children regardless (they'll render with the CSS once it loads)
  return (
    <>
      {children}
    </>
  );
}

export default FerrumCSS;