// Ferrum — React Adapter
// Lightweight hooks and components for Ferrum Runtime + Motion

'use client';

import React, { useRef, useState, useEffect, useCallback, type RefObject, type ReactNode } from 'react';
import { FerrumRuntime } from '@/lib/ferrum-runtime';
import { spring, inView as motionInView, type SpringConfig } from '@/lib/ferrum-motion';

let runtimeSingleton: FerrumRuntime | null = null;
function getRuntime(): FerrumRuntime {
  if (!runtimeSingleton) runtimeSingleton = new FerrumRuntime();
  return runtimeSingleton;
}

/** React hook: apply a Ferrum effect class to an element */
export function useFerrumEffect(
  effectClass: string,
  options?: { trigger?: 'mount' | 'viewport' | 'hover' }
): { ref: RefObject<HTMLElement | null>; isApplied: boolean } {
  const ref = useRef<HTMLElement | null>(null);
  const [isApplied, setIsApplied] = useState(false);
  const rt = useRef(getRuntime());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const trigger = options?.trigger ?? 'mount';

    if (trigger === 'viewport') {
      const unsub = motionInView(el, (visible) => {
        if (visible) {
          rt.current.apply(el, effectClass);
          setIsApplied(true);
        }
      });
      return unsub;
    } else {
      rt.current.apply(el, effectClass, { trigger: trigger as 'immediate' | 'viewport' | 'hover' });
      if (trigger === 'mount') setIsApplied(true);
      return () => { rt.current.remove(el, effectClass); setIsApplied(false); };
    }
  }, [effectClass, options?.trigger]);

  return { ref, isApplied };
}

/** React hook: spring-animated value */
export function useFerrumSpring(config: SpringConfig): {
  value: number;
  set: (v: number) => void;
  animate: (target: number) => void;
} {
  const springRef = useRef(spring(0, config));
  const [value, setValue] = useState(0);

  useEffect(() => {
    const ctrl = springRef.current;
    // Poll the spring value via raf to update React state
    let active = true;
    let rafId: number | null = null;
    function poll(): void {
      if (!active) return;
      const v = ctrl.get();
      setValue(v);
      rafId = requestAnimationFrame(poll);
    }
    rafId = requestAnimationFrame(poll);
    return () => { active = false; if (rafId !== null) cancelAnimationFrame(rafId); };
  }, []);

  const set = useCallback((v: number) => {
    springRef.current.set(v);
    setValue(v);
  }, []);

  const animate = useCallback((target: number) => {
    springRef.current.to(target);
  }, []);

  return { value, set, animate };
}

/** React hook: detect if element is in viewport */
export function useInViewport(
  options?: { rootMargin?: string; threshold?: number }
): { ref: RefObject<HTMLElement | null>; inView: boolean } {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return motionInView(el, (visible) => setInView(visible), options);
  }, [options?.rootMargin, options?.threshold]);

  return { ref, inView };
}

/** React component: apply effect on mount */
export function FerrumEffect({
  effect,
  children,
  trigger = 'mount',
  as: Tag = 'div',
  ...props
}: {
  effect: string;
  children?: ReactNode;
  trigger?: 'mount' | 'viewport' | 'hover';
  as?: 'div' | 'span' | 'section' | 'article' | 'p';
} & Omit<React.HTMLAttributes<HTMLElement>, 'ref'>): React.ReactElement {
  const { ref } = useFerrumEffect(effect, { trigger });
  return React.createElement(Tag, { ref: ref as React.Ref<HTMLDivElement>, ...props }, children);
}