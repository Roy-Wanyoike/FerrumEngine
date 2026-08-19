// Ferrum Runtime — Class Manipulation Utilities

/** Generate a stable instance key for an element + class pair */
export function instanceKey(element: HTMLElement, effectClass: string): string {
  const id = element.getAttribute('data-ferrum-id') ??
    `f${Math.random().toString(36).slice(2, 9)}`;
  if (!element.getAttribute('data-ferrum-id')) {
    element.setAttribute('data-ferrum-id', id);
  }
  return `${id}:${effectClass}`;
}

/** Add effect class to element if not already present */
export function addEffectClass(element: HTMLElement, effectClass: string): boolean {
  if (element.classList.contains(effectClass)) return false;
  element.classList.add(effectClass);
  return true;
}

/** Remove effect class from element */
export function removeEffectClass(element: HTMLElement, effectClass: string): boolean {
  if (!element.classList.contains(effectClass)) return false;
  element.classList.remove(effectClass);
  return true;
}

/** Check if element has the effect class */
export function hasEffectClass(element: HTMLElement, effectClass: string): boolean {
  return element.classList.contains(effectClass);
}

/** Toggle effect class on element */
export function toggleEffectClass(element: HTMLElement, effectClass: string, force?: boolean): boolean {
  return element.classList.toggle(effectClass, force);
}

/** Parse a CSS selector string into valid selectors, filtering empty ones */
export function parseSelectors(selectors: Record<string, string>): Array<[string, string]> {
  return Object.entries(selectors).filter(
    ([sel, _cls]) => typeof sel === 'string' && sel.trim().length > 0
  );
}

/** Query all elements matching a selector */
export function queryAll(selector: string): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(selector));
}
