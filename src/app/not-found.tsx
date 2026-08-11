"use client";

import { Home, RotateCcw } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-6">
        <div className="text-[120px] sm:text-[180px] font-black leading-none tracking-tighter bg-gradient-to-br from-foreground/80 to-foreground/20 bg-clip-text text-transparent select-none" aria-hidden="true">
          404
        </div>
        <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-foreground">
          Page not found
        </h1>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto" role="alert">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Please check the URL or return to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            Go Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 rounded-full border border-border text-foreground px-6 py-3 text-sm font-medium hover:bg-foreground/[0.05] transition-colors"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Reload Page
          </button>
        </div>
      </div>
    </main>
  );
}
