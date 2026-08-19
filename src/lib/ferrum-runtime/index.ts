// Ferrum Runtime — Main Entry Point

import type { FerrumRuntimeOptions, ApplyOptions, EffectInstance } from './types';
import { instanceKey, addEffectClass, removeEffectClass, queryAll } from './utils';
import { detectReducedMotion, onReducedMotionChange } from './reduced-motion';
import { ViewportManager } from './observer';

export type { FerrumRuntimeOptions, ApplyOptions, EffectInstance } from './types';

export class FerrumRuntime {
  private viewportManager: ViewportManager;
  private reducedMotion: boolean;
  private respectReducedMotion: boolean;
  private instances: Map<string, EffectInstance> = new Map();
  private unsubMotion: (() => void) | null = null;

  constructor(options?: FerrumRuntimeOptions) {
    this.reducedMotion = detectReducedMotion();
    this.respectReducedMotion = options?.respectReducedMotion ?? true;

    this.viewportManager = new ViewportManager(
      { onEnter: (entry) => this.apply(entry.element, entry.effectClass) },
      { rootMargin: options?.rootMargin, threshold: options?.threshold }
    );

    this.unsubMotion = onReducedMotionChange((reduced) => {
      this.reducedMotion = reduced;
      this.handleReducedMotionChange();
    });
  }

  /** Apply an effect class to an element */
  apply(element: HTMLElement, effectClass: string, options?: ApplyOptions): void {
    if (this.respectReducedMotion && this.reducedMotion && !options?.forceApply) return;

    const trigger = options?.trigger ?? 'immediate';
    const key = instanceKey(element, effectClass);

    // Clean up previous instance if any
    const existing = this.instances.get(key);
    if (existing?.delayTimer) clearTimeout(existing.delayTimer);
    if (existing?.hoverEnterHandler) {
      element.removeEventListener('mouseenter', existing.hoverEnterHandler);
      element.removeEventListener('mouseleave', existing.hoverLeaveHandler!);
    }

    const applyNow = () => {
      addEffectClass(element, effectClass);
      const instance: EffectInstance = {
        element,
        effectClass,
        applied: true,
        trigger,
      };
      this.instances.set(key, instance);
    };

    if (trigger === 'immediate') {
      if (options?.delay && options.delay > 0) {
        const timer = setTimeout(applyNow, options.delay);
        this.instances.set(key, { element, effectClass, applied: false, trigger, delayTimer: timer });
      } else {
        applyNow();
      }
    } else if (trigger === 'hover') {
      const enterHandler = () => { addEffectClass(element, effectClass); };
      const leaveHandler = () => { removeEffectClass(element, effectClass); };
      element.addEventListener('mouseenter', enterHandler);
      element.addEventListener('mouseleave', leaveHandler);
      this.instances.set(key, {
        element, effectClass, applied: false, trigger,
        hoverEnterHandler: enterHandler, hoverLeaveHandler: leaveHandler,
      });
    } else if (trigger === 'viewport') {
      this.viewportManager.observe(element, { element, effectClass });
      this.instances.set(key, { element, effectClass, applied: false, trigger });
    }
  }

  /** Remove an effect from an element */
  remove(element: HTMLElement, effectClass: string): void {
    const key = instanceKey(element, effectClass);
    const instance = this.instances.get(key);
    if (!instance) return;

    if (instance.delayTimer) clearTimeout(instance.delayTimer);
    if (instance.hoverEnterHandler) {
      element.removeEventListener('mouseenter', instance.hoverEnterHandler);
      element.removeEventListener('mouseleave', instance.hoverLeaveHandler!);
    }
    if (instance.trigger === 'viewport') {
      this.viewportManager.unobserve(element);
    }

    removeEffectClass(element, effectClass);
    this.instances.delete(key);
  }

  /** Apply effects to all matching selectors */
  applyAll(selectors: Record<string, string>): void {
    for (const [selector, effectClass] of Object.entries(selectors)) {
      const elements = queryAll(selector);
      for (const el of elements) {
        this.apply(el, effectClass);
      }
    }
  }

  /** Initialize viewport-triggered effects for given selectors */
  initViewportEffects(selectors: string[]): void {
    for (const selector of selectors) {
      const elements = queryAll(selector);
      for (const el of elements) {
        const effectClass = el.getAttribute('data-ferrum-effect') ?? '';
        if (!effectClass) continue;
        this.apply(el, effectClass, { trigger: 'viewport' });
      }
    }
  }

  /** Cleanup all observers and instances */
  destroy(): void {
    for (const instance of this.instances.values()) {
      if (instance.delayTimer) clearTimeout(instance.delayTimer);
      if (instance.hoverEnterHandler) {
        instance.element.removeEventListener('mouseenter', instance.hoverEnterHandler);
        instance.element.removeEventListener('mouseleave', instance.hoverLeaveHandler!);
      }
      removeEffectClass(instance.element, instance.effectClass);
    }
    this.instances.clear();
    this.viewportManager.disconnect();
    this.unsubMotion?.();
    this.unsubMotion = null;
  }

  /** Detect reduced motion preference */
  detectReducedMotion(): boolean {
    return detectReducedMotion();
  }

  /** Get active (applied) effect count */
  getActiveCount(): number {
    let count = 0;
    for (const inst of this.instances.values()) {
      if (inst.applied) count++;
    }
    return count;
  }

  private handleReducedMotionChange(): void {
    if (!this.reducedMotion) return;
    // When reduced motion is enabled, remove all applied classes
    for (const instance of this.instances.values()) {
      if (instance.applied) {
        removeEffectClass(instance.element, instance.effectClass);
        instance.applied = false;
      }
    }
  }
}

/** Singleton factory */
let _instance: FerrumRuntime | null = null;

export function getRuntime(options?: FerrumRuntimeOptions): FerrumRuntime {
  if (!_instance) _instance = new FerrumRuntime(options);
  return _instance;
}
