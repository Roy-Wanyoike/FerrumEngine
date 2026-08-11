"use client";

import dynamic from "next/dynamic";

/*
 * Tiny client boundary that lazy-loads the CloudDashboard client component.
 * The dashboard is auth-gated and entirely interactive, so it doesn't need
 * SSR. This keeps the cloud page's initial JS minimal.
 */
const CloudDashboard = dynamic(
  () => import("./cloud-dashboard-client"),
  { ssr: false },
);

export function CloudLoader() {
  return <CloudDashboard />;
}
