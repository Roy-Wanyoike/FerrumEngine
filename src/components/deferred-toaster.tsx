"use client";

import dynamic from "next/dynamic";

/**
 * DeferredToaster — lazy-loads the Sonner <Toaster> component.
 *
 * The Toaster is non-critical for initial paint (toasts only appear after
 * user actions), so we defer it to reduce the initial JS bundle.
 * With ssr: false, neither Sonner nor its CJS polyfill dependencies
 * are included in the server-rendered HTML, cutting ~15KB JS from the
 * critical path.
 */
const Toaster = dynamic(
  () => import("sonner").then((mod) => ({ default: mod.Toaster })),
  { ssr: false },
);

export function DeferredToaster() {
  return <Toaster richColors position="bottom-right" />;
}
