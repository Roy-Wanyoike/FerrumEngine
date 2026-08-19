// Ferrum — Svelte Adapter
// Svelte action + spring store for Ferrum Runtime + Motion
// NOTE: Svelte is not a project dependency; types are self-contained.

import { FerrumRuntime } from '@/lib/ferrum-runtime';
import { spring, type SpringConfig } from '@/lib/ferrum-motion';

let runtimeSingleton: FerrumRuntime | null = null;
function getRuntime(): FerrumRuntime {
  if (!runtimeSingleton) runtimeSingleton = new FerrumRuntime();
  return runtimeSingleton;
}

/** Minimal Svelte Writable<T> shape */
export interface SvelteWritable<T> {
  subscribe: (run: (value: T) => void) => () => void;
  set: (value: T) => void;
  update: (updater: (value: T) => T) => void;
}

/** Svelte action: apply a Ferrum effect class to an element.
 *  Usage: use:ferrumEffect={{ effect: 'f-btn-glow', trigger: 'viewport' }}
 */
export function ferrumEffect(
  node: HTMLElement,
  params: { effect: string; trigger?: 'mount' | 'viewport' | 'hover' },
): { update: (params: { effect: string; trigger?: 'mount' | 'viewport' | 'hover' }) => void; destroy: () => void } {
  const rt = getRuntime();
  const trigger = params.trigger ?? 'mount';
  let observer: IntersectionObserver | null = null;

  function applyEffect(): void {
    rt.apply(node, params.effect);
  }

  function removeEffect(): void {
    rt.remove(node, params.effect);
  }

  if (trigger === 'mount') {
    applyEffect();
  } else if (trigger === 'viewport') {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          applyEffect();
          observer?.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(node);
  } else if (trigger === 'hover') {
    const onEnter = (): void => applyEffect();
    const onLeave = (): void => removeEffect();
    node.addEventListener('mouseenter', onEnter);
    node.addEventListener('mouseleave', onLeave);
    // Store for cleanup
    (node as HTMLElement & { _ferrumHoverCleanup?: () => void })._ferrumHoverCleanup = () => {
      node.removeEventListener('mouseenter', onEnter);
      node.removeEventListener('mouseleave', onLeave);
    };
  }

  return {
    update(newParams: { effect: string; trigger?: 'mount' | 'viewport' | 'hover' }): void {
      removeEffect();
      observer?.disconnect();
      (node as HTMLElement & { _ferrumHoverCleanup?: () => void })._ferrumHoverCleanup?.();
      params = newParams;
      // Re-apply with new params (simplified: just re-run the trigger)
      if (newParams.trigger === 'mount') {
        applyEffect();
      }
    },
    destroy(): void {
      removeEffect();
      observer?.disconnect();
      (node as HTMLElement & { _ferrumHoverCleanup?: () => void })._ferrumHoverCleanup?.();
    },
  };
}

/** Svelte spring store: reactive spring-animated value.
 *  Usage:
 *    const { value, animate, stop } = ferrumSpring(0, { stiffness: 200 });
 *    $value; // reactive
 *    animate(1); // animate to target
 */
export function ferrumSpring(
  initial: number,
  config: SpringConfig,
): { value: SvelteWritable<number>; animate: (target: number) => void; stop: () => void } {
  const ctrl = spring(initial, config);
  let currentValue = initial;
  let polling = false;
  let rafId: number | null = null;

  const subscribers = new Set<(v: number) => void>();

  function notify(): void {
    for (const fn of subscribers) fn(currentValue);
  }

  function poll(): void {
    currentValue = ctrl.get();
    notify();
  }

  const value: SvelteWritable<number> = {
    subscribe(run: (v: number) => void): () => void {
      subscribers.add(run);
      run(currentValue);
      return () => { subscribers.delete(run); };
    },
    set(v: number): void {
      currentValue = v;
      ctrl.set(v);
      notify();
    },
    update(updater: (v: number) => number): void {
      const next = updater(currentValue);
      this.set(next);
    },
  };

  function animate(target: number): void {
    ctrl.to(target);
    if (!polling) {
      polling = true;
      function tick(): void {
        if (!polling) return;
        poll();
        const diff = Math.abs(ctrl.get() - target);
        if (diff > 0.01) {
          rafId = requestAnimationFrame(tick);
        } else {
          polling = false;
          rafId = null;
        }
      }
      rafId = requestAnimationFrame(tick);
    }
  }

  function stop(): void {
    ctrl.stop();
    polling = false;
    if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
  }

  return { value, animate, stop };
}
