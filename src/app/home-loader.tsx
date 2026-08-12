"use client";

import dynamic from "next/dynamic";

/*
 * Tiny client boundary that lazy-loads the heavy HomeClient SPA shell.
 * This file stays in the initial bundle (~1KB), but the actual HomeClient
 * (with its router, view-meta, app-context, and all dynamic view imports)
 * is moved to a separate chunk loaded after hydration.
 */
const HomeClient = dynamic(
  () => import("./home-client").then((m) => ({ default: m.HomeClient })),
  { ssr: false },
);

export function HomeLoader() {
  return <HomeClient />;
}
