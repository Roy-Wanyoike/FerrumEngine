/**
 * Reference-counted body scroll lock.
 *
 * Multiple callers (nav mobile menu, modal, drawer) can lock/unlock
 * independently. The body overflow is only re-enabled when the *last*
 * lock is released, preventing race conditions where one component's
 * cleanup re-enables scrolling while another overlay is still open.
 */

let lockCount = 0;

/** Lock body scrolling (increment reference count). */
export function lockBodyScroll(): void {
  lockCount++;
  if (lockCount === 1) {
    document.body.style.overflow = "hidden";
  }
}

/** Unlock body scrolling (decrement reference count). */
export function unlockBodyScroll(): void {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = "";
  }
}
