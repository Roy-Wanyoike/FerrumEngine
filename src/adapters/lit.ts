// Ferrum — Lit Adapter
// Lit-compatible directive and reactive spring controller.
// NOTE: Lit is not a project dependency; types are self-contained.

import { FerrumRuntime } from '@/lib/ferrum-runtime';
import { spring, type SpringConfig } from '@/lib/ferrum-motion';

let runtimeSingleton: FerrumRuntime | null = null;
function getRuntime(): FerrumRuntime {
  if (!runtimeSingleton) runtimeSingleton = new FerrumRuntime();
  return runtimeSingleton;
}

// ── Minimal Lit Directive Interface ─────────────────────────────

/** Simplified DirectiveResult interface (matches Lit's shape) */
export interface DirectiveResult {
 $litDirective$?: true;
 _$part?: unknown;
 _$setValue?: (value: unknown) => void;
 _$commitValue?: (value: unknown, _part: unknown) => void;
 _$update?: (part: unknown, _value: unknown) => void;
}

/** Simplified Part interface */
export interface Part {
 element: HTMLElement;
 commitDirective?: (result: DirectiveResult) => void;
 startNode?: Node;
 endNode?: Node;
 type?: number;
 value?: unknown;
}

/** Base directive class shape */
export class Directive {
  _$part?: Part;
  _$setValue(value: unknown): void {
    if (this._$part?.element) {
      const el = this._$part.element;
      if (typeof value === 'string' && value) {
        getRuntime().apply(el, value);
      }
    }
  }
  _update(value: unknown, _part?: Part): void {
    this._$setValue(value);
  }
  disconnected(): void {
    // Clean up when directive disconnects
  }
  reconnected(): void {
    // Re-apply on reconnection
  }
}

/** Directive factory helper (matches Lit's directive() shape) */
export function directive(Class: new () => Directive): (...args: unknown[]) => DirectiveResult {
 const factory = (...args: unknown[]): DirectiveResult => {
   const instance = new Class();
   return {
     $litDirective$: true,
     _$update(part: unknown, _value: unknown): void {
       if (part && typeof part === 'object' && 'element' in part) {
         instance._$part = part as Part;
       }
       instance._update(args[0], part as Part);
     },
   };
 };
 // Mark as directive factory
 return Object.assign(factory, { _$litDirective$: true });
}

/**
 * ferrumEffect — Lit directive that applies a Ferrum effect class.
 *
 * Usage:
 * ```html
 * <div ${ferrumEffect('f-btn-glow')}>Hello</div>
 * ```
 */
export const ferrumEffect = directive(class extends Directive {
  override _update(value: unknown, _part?: Part): void {
    const effectClass = String(value ?? '');
    if (this._$part?.element && effectClass) {
      getRuntime().apply(this._$part.element, effectClass);
    }
  }

  override disconnected(): void {
    if (this._$part?.element) {
      // Can't know which effect to remove, so no-op on disconnect
    }
  }
});

/**
 * ferrumSpring — Reactive spring controller for Lit.
 *
 * Usage:
 * ```ts
 * @customElement('my-element')
 * class MyElement extends LitElement {
 *   mySpring = ferrumSpring(this, 0, { stiffness: 200 });
 *   // this.mySpring.value → current value
 *   // this.mySpring.animate(1) → animate to target
 * }
 * ```
 */
export interface FerrumSpringController {
 value: number;
 animate: (target: number) => void;
  stop: () => void;
  hostConnected(): void;
  hostDisconnected(): void;
}

export function ferrumSpring(
  _host: object,
  initial: number,
  config: SpringConfig,
): FerrumSpringController {
  const ctrl = spring(initial, config);
  let polling = false;
  let rafId: number | null = null;
  let currentValue = initial;

  function poll(target: number): void {
    if (!polling) return;
    currentValue = ctrl.get();
    const diff = Math.abs(currentValue - target);
    if (diff > 0.01) {
      rafId = requestAnimationFrame(() => poll(target));
    } else {
      polling = false;
      rafId = null;
    }
  }

  return {
    get value(): number {
      return currentValue;
    },
    animate(target: number): void {
      ctrl.to(target);
      if (!polling) {
        polling = true;
        rafId = requestAnimationFrame(() => poll(target));
      }
    },
    stop(): void {
      ctrl.stop();
      polling = false;
      if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
    },
    hostConnected(): void {
      // Resume if needed
    },
    hostDisconnected(): void {
      this.stop();
    },
  };
}
