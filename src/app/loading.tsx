export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Nav skeleton */}
      <div className="h-16 border-b border-border/50 flex items-center px-6">
        <div className="h-5 w-28 rounded bg-foreground/[0.06] animate-pulse" />
        <div className="ml-auto flex gap-3">
          <div className="h-8 w-20 rounded-full bg-foreground/[0.04] animate-pulse" />
          <div className="h-8 w-8 rounded-full bg-foreground/[0.04] animate-pulse" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="pt-24 pb-16 px-6 max-w-5xl mx-auto w-full">
        <div className="h-3 w-20 rounded bg-foreground/[0.04] animate-pulse mb-5" />
        <div className="h-12 sm:h-16 w-full max-w-3xl rounded-lg bg-foreground/[0.06] animate-pulse mb-4" />
        <div className="h-12 sm:h-16 w-3/4 rounded-lg bg-foreground/[0.04] animate-pulse mb-6" />
        <div className="h-5 w-full max-w-xl rounded bg-foreground/[0.03] animate-pulse mb-8" />
        <div className="flex gap-3">
          <div className="h-11 w-36 rounded-full bg-foreground/[0.06] animate-pulse" />
          <div className="h-11 w-36 rounded-full bg-foreground/[0.03] animate-pulse" />
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="px-6 max-w-7xl mx-auto w-full pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-foreground/[0.015] p-5">
              <div className="w-full h-24 rounded-lg bg-foreground/[0.03] animate-pulse mb-4" />
              <div className="w-3/4 h-3 rounded bg-foreground/[0.04] animate-pulse mb-2" />
              <div className="w-1/2 h-2.5 rounded bg-foreground/[0.02] animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
