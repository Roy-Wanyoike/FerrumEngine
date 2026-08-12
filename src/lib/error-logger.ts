/**
 * Error Boundary Logging Utility
 * ─────────────────────────────────
 * Provides structured logging for React error boundaries and
 * unhandled errors. Dispatches to /api/analytics in production.
 */

import { trackEvent, type ErrorEvent, type ErrorSource } from './analytics-types';

/**
 * Log a client-side error from an error boundary or global handler.
 * Safely extracts context and dispatches the event.
 */
export function logClientError(
  error: Error & { digest?: string },
  source: ErrorSource,
  componentStack?: string,
): void {
  const event: ErrorEvent = {
    type: 'error',
    source,
    message: error.message ?? String(error),
    stack: error.stack ?? undefined,
    digest: error.digest,
    componentStack,
    url: typeof window !== 'undefined' ? window.location.href : '',
    timestamp: Date.now(),
  };

  // Always log locally for debugging
  // eslint-disable-next-line no-console
  console.error(`[${source}]`, event.message, event.digest ? `(digest: ${event.digest})` : '');

  // Dispatch to analytics endpoint
  trackEvent(event);
}

/**
 * Creates a safe error handler for use in React error boundaries.
 * Returns a function that can be called with the error and info.
 */
export function createErrorBoundaryHandler(source: ErrorSource = 'boundary') {
  return (error: Error & { digest?: string }, info: { componentStack: string }) => {
    logClientError(error, source, info.componentStack);
  };
}
