/**
 * Analytics Event Type System
 * ─────────────────────────────
 * Central type definitions for all observability events dispatched
 * by the FerrumCSS platform (web vitals, errors, user interactions).
 */

// ── Web Vital events ─────────────────────────────────────────
export type WebVitalName =
  | 'CLS'
  | 'FCP'
  | 'FID'
  | 'INP'
  | 'LCP'
  | 'TTFB'
  | 'TBT';

export type WebVitalRating = 'good' | 'needs-improvement' | 'poor';

export interface WebVitalEvent {
  type: 'web-vital';
  name: WebVitalName;
  value: number;
  rating: WebVitalRating;
  delta: number;
  id: string;
  url: string;
  timestamp: number;
}

// ── Error events ─────────────────────────────────────────────
export type ErrorSource = 'boundary' | 'global' | 'api' | 'unhandled';

export interface ErrorEvent {
  type: 'error';
  source: ErrorSource;
  message: string;
  stack?: string;
  digest?: string;
  componentStack?: string;
  url: string;
  timestamp: number;
}

// ── User interaction events ──────────────────────────────────
export type InteractionName =
  | 'effect_copy'
  | 'effect_preview'
  | 'playground_use'
  | 'theme_toggle'
  | 'nav_click'
  | 'collection_add'
  | 'collection_remove'
  | 'cloud_login'
  | 'cloud_project_create';

export interface InteractionEvent {
  type: 'interaction';
  name: InteractionName;
  url: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

// ── Union type for all analytics events ──────────────────────
export type AnalyticsEvent = WebVitalEvent | ErrorEvent | InteractionEvent;

// ── Dispatch helper ──────────────────────────────────────────
const ANALYTICS_ENDPOINT = '/api/analytics';

/**
 * Send an analytics event via `navigator.sendBeacon` (production)
 * or `console.debug` (development). Never throws.
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.debug('[Analytics]', event.type, event);
    return;
  }

  if (navigator.sendBeacon) {
    navigator.sendBeacon(ANALYTICS_ENDPOINT, JSON.stringify(event));
  }
}
