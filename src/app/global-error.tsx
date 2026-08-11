"use client";

import { ErrorPageContent } from "@/components/error-page-content";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <main className="min-h-screen flex items-center justify-center">
          <ErrorPageContent error={error} reset={reset} showDigest={false} />
        </main>
      </body>
    </html>
  );
}
