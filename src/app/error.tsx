"use client";

import { ErrorPageContent } from "@/components/error-page-content";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <ErrorPageContent error={error} reset={reset} showDigest />
    </main>
  );
}
