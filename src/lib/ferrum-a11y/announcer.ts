/**
 * Ferrum A11y — Live-region announcer.
 *
 * Creates visually-hidden live regions that screen readers automatically
 * read aloud.  Every announcer element is automatically cleaned up after
 * a configurable timeout.
 *
 * @module ferrum-a11y/announcer
 */

import type { A11yAnnouncementConfig } from './types';

/** Default timeout (ms) before an announcer element is removed from the DOM. */
const DEFAULT_TIMEOUT = 5000;

/** Suffix appended to each announcer's id for uniqueness. */
let announcerCounter = 0;

/**
 * Announce a message to assistive technology via a temporary live region.
 *
 * Creates a visually-hidden `div` with `aria-live` set to the requested
 * politeness level, injects the message, and schedules removal after
 * `config.timeout` ms (default 5000).
 *
 * @example
 * ```ts
 * announce({ message: '3 results found', priority: 'polite' });
 * ```
 */
export function announce(config: A11yAnnouncementConfig): void {
  if (typeof document === 'undefined') return;

  const id = `ferrum-announcer-${++announcerCounter}`;
  const el = document.createElement('div');
  el.id = id;
  el.setAttribute('aria-live', config.priority);
  el.setAttribute('aria-atomic', 'true');
  el.setAttribute('role', 'status');

  // Visually hidden but still in the accessibility tree.
  Object.assign(el.style, {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
  });

  // Delay text insertion so that screen readers detect the node change.
  document.body.appendChild(el);
  requestAnimationFrame(() => {
    el.textContent = config.message;
  });

  const timeout = config.timeout ?? DEFAULT_TIMEOUT;
  setTimeout(() => {
    el.remove();
  }, timeout);
}

/** Shortcut: announce with `priority: 'assertive'`. */
export function assertiveAnnounce(message: string): void {
  announce({ message, priority: 'assertive' });
}

/** Shortcut: announce with `priority: 'polite'`. */
export function politeAnnounce(message: string): void {
  announce({ message, priority: 'polite' });
}

/**
 * Remove all currently-mounted announcer elements from the DOM.
 */
export function clearAnnouncers(): void {
  if (typeof document === 'undefined') return;
  document
    .querySelectorAll('[id^="ferrum-announcer-"]')
    .forEach((el) => el.remove());
}
