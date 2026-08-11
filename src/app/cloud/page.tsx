import { CloudLoader } from "./cloud-loader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ferrum Cloud — Dashboard",
  description: "Ferrum Cloud dashboard for team collaboration, design token management, and project organization.",
  robots: { index: false, follow: false },
};

/*
 * Server Component — thin wrapper that lazy-loads the CloudDashboard.
 * CloudLoader is a tiny client boundary (~1KB) that uses ssr:false
 * to defer the full dashboard JS until after hydration.
 */
export default function CloudPage() {
  return <CloudLoader />;
}
