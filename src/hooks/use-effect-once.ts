import { useEffect, useRef } from "react";

/** Run an effect exactly once, even in React StrictMode. */
export function useEffectOnce(fn: () => void | (() => void)) {
  const ran = useRef(false);
  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    return fn();
  }, [fn]);
}