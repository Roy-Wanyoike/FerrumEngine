/**
 * Tests for the Flight Recorder module.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  startSession,
  recordEvent,
  endSession,
  analyzeSession,
  findErrorChain,
  reconstructNavigationPath,
  buildRenderTimeline,
  detectAnomalies,
  resetCounters,
} from '@/engine/flight-recorder';
import type { FlightSession, FlightEvent } from '@/engine/flight-recorder';

describe('Flight Recorder', () => {
  let session: FlightSession;

  beforeEach(() => {
    resetCounters();
    session = startSession({
      userAgent: 'test-agent',
      url: 'http://localhost:3000/',
      viewport: { width: 1280, height: 720 },
    });
  });

  it('should start a session with correct metadata', () => {
    expect(session.id).toMatch(/^fses_\d+$/);
    expect(session.events).toHaveLength(0);
    expect(session.startTime).toBeGreaterThan(0);
    expect(session.endTime).toBeUndefined();
    expect(session.metadata.userAgent).toBe('test-agent');
    expect(session.metadata.url).toBe('http://localhost:3000/');
    expect(session.metadata.viewport).toEqual({ width: 1280, height: 720 });
  });

  it('should record events with auto-generated IDs and timestamps', () => {
    recordEvent(session, { type: 'navigation', route: '/', data: {} });
    recordEvent(session, { type: 'render', component: 'App', data: { phase: 'start' } });

    expect(session.events).toHaveLength(2);
    expect(session.events[0]!.id).toMatch(/^fev_\d+$/);
    expect(session.events[0]!.timestamp).toBeGreaterThan(0);
    expect(session.events[0]!.type).toBe('navigation');
    expect(session.events[1]!.type).toBe('render');
    expect(session.events[1]!.component).toBe('App');
  });

  it('should end a session and set endTime', () => {
    endSession(session);
    expect(session.endTime).toBeDefined();
    expect(session.endTime!).toBeGreaterThanOrEqual(session.startTime);
  });

  it('should reconstruct navigation path from events', () => {
    recordEvent(session, { type: 'navigation', route: '/', data: {} });
    recordEvent(session, { type: 'navigation', route: '/dashboard', data: {} });
    recordEvent(session, { type: 'navigation', route: '/settings', data: {} });
    recordEvent(session, { type: 'render', component: 'Settings', data: {} }); // not a navigation

    const path = reconstructNavigationPath(session.events);
    expect(path).toEqual(['/', '/dashboard', '/settings']);
  });

  it('should trace error chain through events', () => {
    recordEvent(session, { type: 'navigation', route: '/', data: {} });
    recordEvent(session, { type: 'render', component: 'App', data: {} });
    recordEvent(session, { type: 'error', component: 'Dashboard', data: { message: 'Failed to load' } });
    recordEvent(session, { type: 'error', component: 'Sidebar', data: { message: 'Undefined prop' } });

    const chain = findErrorChain(session.events);
    expect(chain).toHaveLength(2);
    expect(chain[0]!.component).toBe('Dashboard');
    expect(chain[1]!.component).toBe('Sidebar');
  });

  it('should build render timeline from paired render events', () => {
    recordEvent(session, { type: 'render', component: 'App', data: { phase: 'start' } });
    recordEvent(session, { type: 'render', component: 'App', data: { phase: 'end' } });
    recordEvent(session, { type: 'render', component: 'Dashboard', data: { phase: 'start' } });
    recordEvent(session, { type: 'render', component: 'Dashboard', data: { phase: 'end' } });

    // Adjust timestamps to simulate duration
    session.events[1]!.timestamp = session.events[0]!.timestamp + 50;
    session.events[3]!.timestamp = session.events[2]!.timestamp + 200;

    const timeline = buildRenderTimeline(session.events);
    expect(timeline).toHaveLength(2);
    expect(timeline[0]!.component).toBe('App');
    expect(timeline[0]!.duration).toBe(50);
    expect(timeline[1]!.component).toBe('Dashboard');
    expect(timeline[1]!.duration).toBe(200);
  });

  it('should identify network-failure root cause when errors follow failed requests', () => {
    recordEvent(session, { type: 'navigation', route: '/', data: {} });
    recordEvent(session, { type: 'network', data: { url: '/api/user', method: 'GET', status: 500, duration: 120 } });
    recordEvent(session, { type: 'error', component: 'ProfilePage', data: { message: 'Cannot read properties of undefined' } });
    endSession(session);

    const analysis = analyzeSession(session);
    expect(analysis.errorChain).toHaveLength(1);
    expect(analysis.rootCause).toBeDefined();
    expect(analysis.rootCause!.type).toBe('network-failure');
    expect(analysis.rootCause!.evidence).toHaveLength(2);
  });

  it('should identify state-corruption root cause with rapid state changes', () => {
    const now = Date.now();
    recordEvent(session, { type: 'state-change', data: { source: 'formStore', property: 'name' } });
    session.events[0]!.timestamp = now;
    recordEvent(session, { type: 'state-change', data: { source: 'formStore', property: 'email' } });
    session.events[1]!.timestamp = now + 50;
    recordEvent(session, { type: 'state-change', data: { source: 'formStore', property: 'address' } });
    session.events[2]!.timestamp = now + 100;
    recordEvent(session, { type: 'error', component: 'Form', data: { message: 'Invalid state transition' } });
    session.events[3]!.timestamp = now + 200;
    endSession(session);

    const analysis = analyzeSession(session);
    expect(analysis.rootCause).toBeDefined();
    expect(analysis.rootCause!.type).toBe('state-corruption');
  });

  it('should produce no root cause for error-free sessions', () => {
    recordEvent(session, { type: 'navigation', route: '/', data: {} });
    recordEvent(session, { type: 'render', component: 'App', data: { phase: 'start' } });
    recordEvent(session, { type: 'render', component: 'App', data: { phase: 'end' } });
    endSession(session);

    const analysis = analyzeSession(session);
    expect(analysis.errorChain).toHaveLength(0);
    expect(analysis.rootCause).toBeUndefined();
  });

  it('should detect anomalies and convert them to Finding objects', () => {
    recordEvent(session, { type: 'error', component: 'App', data: { message: 'crash' } });
    recordEvent(session, { type: 'error', component: 'Sidebar', data: { message: 'also crash' } });
    recordEvent(session, { type: 'error', component: 'Footer', data: { message: 'three' } });
    recordEvent(session, { type: 'error', component: 'Nav', data: { message: 'four' } });

    const findings = detectAnomalies(session);
    expect(findings.length).toBeGreaterThanOrEqual(1);
    // 4 errors → critical severity
    const errorFinding = findings.find((f) => f.ruleId === 'flight-recorder:errors-detected');
    expect(errorFinding).toBeDefined();
    expect(errorFinding!.severity).toBe('critical');
  });

  it('should detect failed network requests as anomalies', () => {
    recordEvent(session, { type: 'network', data: { url: '/api/fail', method: 'GET', status: 404, duration: 50 } });
    recordEvent(session, { type: 'network', data: { url: '/api/ok', method: 'GET', status: 200, duration: 30 } });

    const findings = detectAnomalies(session);
    const netFinding = findings.find((f) => f.ruleId === 'flight-recorder:network-failures');
    expect(netFinding).toBeDefined();
    expect(netFinding!.severity).toBe('high');
  });

  it('should compute performance metrics correctly', () => {
    // Align session start with first event for deterministic metrics
    recordEvent(session, { type: 'navigation', route: '/', data: {} });
    session.startTime = session.events[0]!.timestamp;
    recordEvent(session, { type: 'render', component: 'App', data: { phase: 'start' } });
    session.events[1]!.timestamp = session.events[0]!.timestamp + 100;
    recordEvent(session, { type: 'render', component: 'App', data: { phase: 'end' } });
    session.events[2]!.timestamp = session.events[1]!.timestamp + 200;
    recordEvent(session, { type: 'network', data: { url: '/api/data', method: 'GET', duration: 150 } });
    session.endTime = session.events[3]!.timestamp + 50;

    const analysis = analyzeSession(session);
    expect(analysis.performanceMetrics.errorCount).toBe(0);
    expect(analysis.performanceMetrics.networkRequestCount).toBe(1);
    expect(analysis.performanceMetrics.timeToFirstRender).toBe(100);
    expect(analysis.performanceMetrics.longestRender).toBe(200);
    expect(analysis.performanceMetrics.totalDuration).toBeGreaterThanOrEqual(0);
  });
});
