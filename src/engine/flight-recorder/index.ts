/**
 * FerrumEngine v2 — Flight Recorder
 *
 * Runtime observability that reconstructs frontend execution paths for
 * failure root cause analysis. Inspired by aircraft flight recorders,
 * this module captures a time-ordered stream of runtime events and
 * provides analysis tools to reconstruct what happened during a session.
 */

import type { Finding, FerrumId } from '../core/types';

// ──────────────────────────────────────────────────────────────────────
// FLIGHT RECORDER TYPES
// ──────────────────────────────────────────────────────────────────────

/** A single event captured during a flight session. */
export interface FlightEvent {
  /** Unique event ID. */
  id: string;
  /** Unix timestamp (ms). */
  timestamp: number;
  /** Event category. */
  type:
    | 'navigation'
    | 'render'
    | 'error'
    | 'interaction'
    | 'network'
    | 'state-change'
    | 'lifecycle';
  /** Component that produced this event (if applicable). */
  component?: string;
  /** Route associated with this event (if applicable). */
  route?: string;
  /** Arbitrary payload data. */
  data: Record<string, unknown>;
}

/** A recorded session capturing all events from page load to page unload. */
export interface FlightSession {
  /** Unique session ID. */
  id: string;
  /** Session start timestamp (ms). */
  startTime: number;
  /** Session end timestamp (ms), set when the session is ended. */
  endTime?: number;
  /** All recorded events in chronological order. */
  events: FlightEvent[];
  /** Browser / environment metadata. */
  metadata: {
    userAgent: string;
    url: string;
    viewport: { width: number; height: number };
  };
}

/** Analysis result for a flight session. */
export interface FlightAnalysis {
  /** The session that was analyzed. */
  session: FlightSession;
  /** Chain of error events in the order they occurred. */
  errorChain: FlightEvent[];
  /** Ordered list of navigation routes visited. */
  navigationPath: string[];
  /** Timeline of component render durations. */
  renderTimeline: Array<{
    component: string;
    start: number;
    end: number;
    duration: number;
  }>;
  /** Network requests captured during the session. */
  networkRequests: Array<{
    url: string;
    method: string;
    status?: number;
    duration: number;
  }>;
  /** State mutations captured during the session. */
  stateChanges: Array<{
    source: string;
    property: string;
    timestamp: number;
  }>;
  /** Aggregated performance metrics. */
  performanceMetrics: {
    totalDuration: number;
    timeToFirstRender: number;
    longestRender: number;
    errorCount: number;
    networkRequestCount: number;
  };
  /** Detected root cause if errors were found. */
  rootCause?: {
    type:
      | 'error-boundary'
      | 'network-failure'
      | 'state-corruption'
      | 'render-loop'
      | 'missing-data'
      | 'race-condition';
    description: string;
    evidence: FlightEvent[];
    suggestion: string;
  };
}

// ──────────────────────────────────────────────────────────────────────
// ID GENERATION
// ──────────────────────────────────────────────────────────────────────

let _eventCounter = 0;
let _sessionCounter = 0;

function newEventId(): string {
  return `fev_${++_eventCounter}`;
}

function newSessionId(): string {
  return `fses_${++_sessionCounter}`;
}

/** Reset counters (useful for testing). */
export function resetCounters(): void {
  _eventCounter = 0;
  _sessionCounter = 0;
}

// ──────────────────────────────────────────────────────────────────────
// SESSION LIFECYCLE
// ──────────────────────────────────────────────────────────────────────

/** Metadata provided when starting a session. */
export interface SessionMetadata {
  userAgent?: string;
  url?: string;
  viewport?: { width: number; height: number };
}

/** Start a new flight recording session. */
export function startSession(metadata: SessionMetadata = {}): FlightSession {
  return {
    id: newSessionId(),
    startTime: Date.now(),
    events: [],
    metadata: {
      userAgent: metadata.userAgent ?? 'unknown',
      url: metadata.url ?? '',
      viewport: metadata.viewport ?? { width: 0, height: 0 },
    },
  };
}

/** Record a single event into the session. */
export function recordEvent(
  session: FlightSession,
  event: Omit<FlightEvent, 'id' | 'timestamp'>,
): void {
  const flightEvent: FlightEvent = {
    ...event,
    id: newEventId(),
    timestamp: Date.now(),
  };
  session.events.push(flightEvent);
}

/** End a flight recording session. */
export function endSession(session: FlightSession): void {
  session.endTime = Date.now();
}

// ──────────────────────────────────────────────────────────────────────
// ANALYSIS FUNCTIONS
// ──────────────────────────────────────────────────────────────────────

/** Trace errors back through the event stream to build an error chain. */
export function findErrorChain(events: FlightEvent[]): FlightEvent[] {
  return events.filter((e) => e.type === 'error');
}

/** Extract the navigation route sequence from events. */
export function reconstructNavigationPath(events: FlightEvent[]): string[] {
  const routes: string[] = [];
  for (const event of events) {
    if (event.type === 'navigation' && event.route) {
      routes.push(event.route);
    }
  }
  return routes;
}

/** Build a render timeline from render events. Pairs render-start / render-end events. */
export function buildRenderTimeline(
  events: FlightEvent[],
): FlightAnalysis['renderTimeline'] {
  const renderEvents = events.filter((e) => e.type === 'render');
  const starts = new Map<string, FlightEvent>();
  const timeline: FlightAnalysis['renderTimeline'] = [];

  for (const evt of renderEvents) {
    const phase = evt.data.phase as string | undefined;
    const component = evt.component ?? 'unknown';

    if (phase === 'start') {
      starts.set(component, evt);
    } else if (phase === 'end') {
      const start = starts.get(component);
      if (start) {
        const startTs = start.timestamp;
        const endTs = evt.timestamp;
        timeline.push({
          component,
          start: startTs,
          end: endTs,
          duration: endTs - startTs,
        });
        starts.delete(component);
      }
    }
  }

  return timeline;
}

/** Full analysis of a flight session. */
export function analyzeSession(session: FlightSession): FlightAnalysis {
  const { events } = session;
  const errorChain = findErrorChain(events);
  const navigationPath = reconstructNavigationPath(events);
  const renderTimeline = buildRenderTimeline(events);

  // Extract network requests
  const networkRequests = events
    .filter((e) => e.type === 'network')
    .map((e) => ({
      url: (e.data.url as string) ?? '',
      method: (e.data.method as string) ?? 'GET',
      status: e.data.status as number | undefined,
      duration: (e.data.duration as number) ?? 0,
    }));

  // Extract state changes
  const stateChanges = events
    .filter((e) => e.type === 'state-change')
    .map((e) => ({
      source: (e.data.source as string) ?? '',
      property: (e.data.property as string) ?? '',
      timestamp: e.timestamp,
    }));

  // Performance metrics
  const sessionEnd = session.endTime ?? events[events.length - 1]?.timestamp ?? session.startTime;
  const totalDuration = sessionEnd - session.startTime;
  const firstRender = renderTimeline.length > 0 ? renderTimeline[0]!.start - session.startTime : 0;
  const longestRender = renderTimeline.reduce(
    (max, r) => (r.duration > max ? r.duration : max),
    0,
  );

  const performanceMetrics = {
    totalDuration,
    timeToFirstRender: firstRender,
    longestRender,
    errorCount: errorChain.length,
    networkRequestCount: networkRequests.length,
  };

  // Root cause analysis
  const rootCause = determineRootCause(events, errorChain, networkRequests, renderTimeline);

  return {
    session,
    errorChain,
    navigationPath,
    renderTimeline,
    networkRequests,
    stateChanges,
    performanceMetrics,
    rootCause,
  };
}

/** Detect anomalies in a session and convert them to engine Finding objects. */
export function detectAnomalies(session: FlightSession): Finding[] {
  const findings: Finding[] = [];
  const analysis = analyzeSession(session);
  const { errorChain, networkRequests, renderTimeline, performanceMetrics } = analysis;

  // Detect errors
  if (errorChain.length > 0) {
    findings.push({
      id: `fr_error_${session.id}` as FerrumId,
      category: 'reliability',
      severity: errorChain.length > 3 ? 'critical' : 'high',
      title: `${errorChain.length} error(s) detected during session`,
      description: `Session ${session.id} recorded ${errorChain.length} error(s) between routes ${analysis.navigationPath.join(' → ')}.`,
      evidence: errorChain.map((e) => ({
        description: `Error at ${e.component ?? 'unknown'}: ${e.data.message ?? JSON.stringify(e.data)}`,
      })),
      affectedNodes: [],
      suggestion: 'Review error chain for root cause and add error boundaries around affected components.',
      ruleId: 'flight-recorder:errors-detected',
    });
  }

  // Detect failed network requests
  const failedRequests = networkRequests.filter(
    (r) => r.status !== undefined && r.status >= 400,
  );
  if (failedRequests.length > 0) {
    findings.push({
      id: `fr_net_fail_${session.id}` as FerrumId,
      category: 'reliability',
      severity: 'high',
      title: `${failedRequests.length} failed network request(s)`,
      description: `Network requests to ${failedRequests.map((r) => r.url).join(', ')} returned error status codes.`,
      evidence: failedRequests.map((r) => ({
        description: `${r.method} ${r.url} → ${r.status} (${r.duration}ms)`,
      })),
      affectedNodes: [],
      suggestion: 'Check API endpoint availability and add retry logic with exponential backoff.',
      ruleId: 'flight-recorder:network-failures',
    });
  }

  // Detect slow renders
  const SLOW_RENDER_THRESHOLD_MS = 1000;
  const slowRenders = renderTimeline.filter((r) => r.duration > SLOW_RENDER_THRESHOLD_MS);
  if (slowRenders.length > 0) {
    findings.push({
      id: `fr_slow_render_${session.id}` as FerrumId,
      category: 'performance',
      severity: 'medium',
      title: `${slowRenders.length} slow render(s) detected`,
      description: `Components ${slowRenders.map((r) => `${r.component} (${r.duration}ms)`).join(', ')} exceeded the ${SLOW_RENDER_THRESHOLD_MS}ms render threshold.`,
      evidence: slowRenders.map((r) => ({
        description: `${r.component}: ${r.duration}ms`,
      })),
      affectedNodes: [],
      suggestion: 'Optimize component rendering with memoization, lazy loading, or virtualization.',
      ruleId: 'flight-recorder:slow-renders',
    });
  }

  // Detect render loops
  if (performanceMetrics.longestRender > 10000) {
    findings.push({
      id: `fr_render_loop_${session.id}` as FerrumId,
      category: 'reliability',
      severity: 'critical',
      title: 'Possible render loop detected',
      description: `A component rendered for ${performanceMetrics.longestRender}ms, which may indicate an infinite re-render loop.`,
      evidence: [{ description: `Longest render: ${performanceMetrics.longestRender}ms` }],
      affectedNodes: [],
      suggestion: 'Check for state updates in useEffect without proper dependency arrays or missing memoization.',
      ruleId: 'flight-recorder:render-loop',
    });
  }

  return findings;
}

// ──────────────────────────────────────────────────────────────────────
// ROOT CAUSE ANALYSIS (internal)
// ──────────────────────────────────────────────────────────────────────

function determineRootCause(
  events: FlightEvent[],
  errorChain: FlightEvent[],
  networkRequests: FlightAnalysis['networkRequests'],
  renderTimeline: FlightAnalysis['renderTimeline'],
): FlightAnalysis['rootCause'] {
  if (errorChain.length === 0) return undefined;

  const firstError = errorChain[0]!;

  // Check for network failures preceding the first error
  const precedingNetwork = events.filter(
    (e) =>
      e.type === 'network' &&
      e.timestamp <= firstError.timestamp &&
      (e.data.status as number | undefined) !== undefined &&
      (e.data.status as number) >= 400,
  );

  if (precedingNetwork.length > 0) {
    const failedReq = precedingNetwork[precedingNetwork.length - 1]!;
    return {
      type: 'network-failure',
      description: `A failed network request to ${failedReq.data.url} preceded the first error. The API failure likely caused downstream errors.`,
      evidence: [failedReq, firstError],
      suggestion: 'Add error handling and fallback UI for when this API endpoint is unavailable. Consider implementing a retry mechanism.',
    };
  }

  // Check for state corruption: rapid state changes before error
  const precedingStateChanges = events.filter(
    (e) =>
      e.type === 'state-change' &&
      e.timestamp <= firstError.timestamp &&
      firstError.timestamp - e.timestamp < 500,
  );

  if (precedingStateChanges.length >= 3) {
    return {
      type: 'state-corruption',
      description: `Rapid state changes (${precedingStateChanges.length} in <500ms) preceded the error, suggesting state corruption or an invalid state transition.`,
      evidence: [firstError, ...precedingStateChanges.slice(-3)],
      suggestion: 'Add state validation and use state machines for complex state transitions to prevent invalid states.',
    };
  }

  // Check for render loops
  const precedingRenders = renderTimeline.filter(
    (r) => r.start <= firstError.timestamp,
  );
  if (precedingRenders.length > 10) {
    return {
      type: 'render-loop',
      description: `The component rendered ${precedingRenders.length} times before the error, suggesting a render loop that eventually caused a crash.`,
      evidence: [firstError, ...events.filter((e) => e.type === 'render' && e.timestamp <= firstError.timestamp).slice(-5)],
      suggestion: 'Check for state updates inside render functions or effects that trigger re-renders without proper dependencies.',
    };
  }

  // Check for missing data errors
  const errorMsg = (firstError.data.message as string) ?? '';
  if (
    errorMsg.toLowerCase().includes('undefined') ||
    errorMsg.toLowerCase().includes('null') ||
    errorMsg.toLowerCase().includes('cannot read')
  ) {
    return {
      type: 'missing-data',
      description: `The error message suggests an attempt to access missing or null data: "${errorMsg}"`,
      evidence: [firstError],
      suggestion: 'Add null checks and optional chaining. Ensure data is loaded before rendering components that depend on it.',
    };
  }

  // Check for race conditions: interleaved network and state changes
  const interleaved = events.filter(
    (e) =>
      (e.type === 'network' || e.type === 'state-change') &&
      e.timestamp <= firstError.timestamp,
  );
  let lastType = '';
  let switches = 0;
  for (const evt of interleaved) {
    if (evt.type !== lastType) {
      switches++;
      lastType = evt.type;
    }
  }
  if (switches > 6) {
    return {
      type: 'race-condition',
      description: `High alternation between network and state-change events (${switches} switches) suggests a race condition.`,
      evidence: [firstError, ...interleaved.slice(-5)],
      suggestion: 'Use loading states, abort controllers, and proper async sequencing to prevent race conditions.',
    };
  }

  // Default: error boundary catch
  return {
    type: 'error-boundary',
    description: `An unhandled error occurred in ${firstError.component ?? 'an unknown component'}: ${firstError.data.message ?? JSON.stringify(firstError.data)}`,
    evidence: [firstError],
    suggestion: 'Wrap the affected component in an error boundary and add proper error handling for the specific error type.',
  };
}
