// Ferrum Runtime — Observer Managers

import type { ViewportEntry } from './types';

export interface ViewportCallbacks {
  onEnter: (entry: ViewportEntry) => void;
  onExit?: (entry: ViewportEntry) => void;
}

/** Manages viewport-triggered effects via IntersectionObserver */
export class ViewportManager {
  private observer: IntersectionObserver | null = null;
  private entries = new Map<Element, ViewportEntry>();
  private callbacks: ViewportCallbacks;
  private rootMargin: string;
  private threshold: number | number[];

  constructor(callbacks: ViewportCallbacks, options?: { rootMargin?: string; threshold?: number | number[] }) {
    this.callbacks = callbacks;
    this.rootMargin = options?.rootMargin ?? '0px 0px -50px 0px';
    this.threshold = options?.threshold ?? 0.1;
  }

  /** Start observing an element */
  observe(element: HTMLElement, vpEntry: ViewportEntry): void {
    if (!this.observer) {
      this.observer = new IntersectionObserver(this.handleIntersection, {
        rootMargin: this.rootMargin,
        threshold: this.threshold,
      });
    }
    this.entries.set(element, vpEntry);
    this.observer.observe(element);
  }

  /** Stop observing an element */
  unobserve(element: HTMLElement): void {
    this.entries.delete(element);
    this.observer?.unobserve(element);
  }

  /** Disconnect all observations and clean up */
  disconnect(): void {
    this.entries.clear();
    this.observer?.disconnect();
    this.observer = null;
  }

  /** Get count of tracked entries */
  get size(): number {
    return this.entries.size;
  }

  private handleIntersection = (observations: IntersectionObserverEntry[]): void => {
    for (const obs of observations) {
      const entry = this.entries.get(obs.target);
      if (!entry) continue;
      if (obs.isIntersecting) {
        this.callbacks.onEnter(entry);
      } else if (this.callbacks.onExit) {
        this.callbacks.onExit(entry);
      }
    }
  };
}

/** Create a ResizeObserver that invokes callback on resize */
export function createResizeObserver(
  callback: (entry: ResizeObserverEntry) => void
): ResizeObserver {
  return new ResizeObserver((entries) => {
    for (const e of entries) callback(e);
  });
}
