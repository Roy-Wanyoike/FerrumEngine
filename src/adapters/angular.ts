// Ferrum — Angular Adapter
// Angular-compatible service class and directive factory pattern.
// NOTE: Angular is not a project dependency; types are self-contained.

import { FerrumRuntime } from '@/lib/ferrum-runtime';

let runtimeSingleton: FerrumRuntime | null = null;
function getRuntime(): FerrumRuntime {
  if (!runtimeSingleton) runtimeSingleton = new FerrumRuntime();
  return runtimeSingleton;
}

/**
 * FerrumEffectService — Angular injectable service.
 *
 * Usage in Angular:
 * ```ts
 * @Injectable({ providedIn: 'root' })
 * class MyService extends FerrumEffectService {}
 * ```
 */
export class FerrumEffectService {
  private rt: FerrumRuntime;
  private tracked = new WeakMap<HTMLElement, Set<string>>();

  constructor() {
    this.rt = getRuntime();
  }

  /** Apply a Ferrum effect class to an element */
  apply(element: HTMLElement, effectClass: string): void {
    const tracked = this.tracked.get(element) ?? new Set();
    if (!tracked.has(effectClass)) {
      tracked.add(effectClass);
      this.tracked.set(element, tracked);
    }
    this.rt.apply(element, effectClass);
  }

  /** Remove a Ferrum effect class from an element */
  remove(element: HTMLElement, effectClass: string): void {
    const tracked = this.tracked.get(element);
    if (tracked) {
      tracked.delete(effectClass);
      if (tracked.size === 0) this.tracked.delete(element);
    }
    this.rt.remove(element, effectClass);
  }

  /** Check if an effect is currently applied */
  hasEffect(element: HTMLElement, effectClass: string): boolean {
    return this.tracked.get(element)?.has(effectClass) ?? false;
  }

  /** Remove all effects from all tracked elements */
  destroy(): void {
    // WeakMap doesn't support iteration, but the runtime cleanup handles it
    this.tracked = new WeakMap();
  }
}

/**
 * Directive factory for creating Angular structural-like directives.
 *
 * Usage:
 * ```ts
 * const FerrumEffectDirective = createFerrumEffectDirective();
 * // In template: <div appFerrumEffect="f-btn-glow">
 * ```
 */
export function createFerrumEffectDirective(): {
  /** Called when directive is bound to element */
  init: (element: HTMLElement, effectClass: string, trigger?: 'mount' | 'viewport' | 'hover') => void;
  /** Called when bound value changes */
  update: (element: HTMLElement, effectClass: string) => void;
  /** Called when directive is destroyed */
  destroy: (element: HTMLElement, effectClass: string) => void;
} {
  const service = new FerrumEffectService();
  const observers = new WeakMap<HTMLElement, IntersectionObserver>();

  return {
    init(element: HTMLElement, effectClass: string, trigger: 'mount' | 'viewport' | 'hover' = 'mount'): void {
      if (trigger === 'mount') {
        service.apply(element, effectClass);
      } else if (trigger === 'viewport') {
        const obs = new IntersectionObserver(
          (entries) => {
            if (entries[0]?.isIntersecting) {
              service.apply(element, effectClass);
              obs.disconnect();
            }
          },
          { threshold: 0.1 },
        );
        obs.observe(element);
        observers.set(element, obs);
      } else if (trigger === 'hover') {
        const onEnter = () => service.apply(element, effectClass);
        const onLeave = () => service.remove(element, effectClass);
        element.addEventListener('mouseenter', onEnter);
        element.addEventListener('mouseleave', onLeave);
      }
    },
    update(element: HTMLElement, effectClass: string): void {
      service.apply(element, effectClass);
    },
    destroy(element: HTMLElement, effectClass: string): void {
      service.remove(element, effectClass);
      const obs = observers.get(element);
      if (obs) { obs.disconnect(); observers.delete(element); }
    },
  };
}
