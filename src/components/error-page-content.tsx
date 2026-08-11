"use client";

import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export function ErrorPageContent({
  error,
  reset,
  showDigest,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  showDigest: boolean;
}) {
  useEffect(() => {
    console.error("[Ferrum] Unhandled error:", error);
  }, [error]);

  return (
    <div className="text-center px-6 max-w-lg">
      <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
        <AlertTriangle className="w-8 h-8 text-destructive" aria-hidden="true" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">
        Something went wrong
      </h1>
      <p className="mt-3 text-muted-foreground" role="alert">
        An unexpected error occurred while loading this page. This has been
        logged for investigation. Please try reloading or return to the homepage.
      </p>
      {showDigest && error.digest && (
        <p className="mt-2 text-xs text-muted-foreground/60 font-mono">
          Error ID: {error.digest}
        </p>
      )}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          Reload
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-border text-foreground px-6 py-3 text-sm font-medium hover:bg-foreground/[0.05] transition-colors"
        >
          <Home className="w-4 h-4" aria-hidden="true" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
