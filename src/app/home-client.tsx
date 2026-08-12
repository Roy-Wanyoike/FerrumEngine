"use client";

import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect, useLayoutEffect, useMemo, Component, type ErrorInfo, type ReactNode } from "react";
import { AppProvider, useAppState } from "@/components/ferrum/app-context";
import { SITE_URL } from "@/lib/constants";
// eslint-disable-next-line import/order
import { VIEW_META, pathnameToView } from "@/lib/view-meta";

/* ════════════════════════════════════════════════════════════════
   CRITICAL SYNC IMPORTS — Minimal above-fold JS
   ════════════════════════════════════════════════════════════════ */
import type { ViewId } from "@/lib/types";

/* ════════════════════════════════════════════════════════════════
   DYNAMIC IMPORTS — Lazy-loaded chunks
   ════════════════════════════════════════════════════════════════ */

/* Effects (heaviest — 92K index + 424K data) — prefetch: most likely next navigation */
const EffectsView = dynamic(
  () => import(/* webpackPrefetch: true */ "@/components/ferrum/effects-view").then((m) => ({ default: m.EffectsView })),
  { ssr: false, loading: () => <ViewSkeleton /> }
);
const EffectDetailModal = dynamic(
  () => import("@/components/ferrum/effects-detail-modal").then((m) => ({ default: m.EffectDetailModal })),
  { ssr: false }
);
const PlaygroundV2 = dynamic(
  () => import(/* webpackPrefetch: true */ "@/components/ferrum/playground").then((m) => ({ default: m.PlaygroundV2 })),
  { ssr: false }
);
const CollectionDrawer = dynamic(
  () => import("@/components/ferrum/collection-drawer").then((m) => ({ default: m.CollectionDrawer })),
  { ssr: false }
);

/* Non-home views (only loaded when navigated to) */
const DocsView = dynamic(
  () => import(/* webpackPrefetch: true */ "@/components/ferrum/docs-view").then((m) => ({ default: m.DocsView })),
  { ssr: false }
);
const ArchitectureDeepDive = dynamic(
  () => import("@/components/ferrum/architecture-deep-dive").then((m) => ({ default: m.ArchitectureDeepDive })),
  { ssr: false }
);
const HallOfFame = dynamic(
  () => import("@/components/ferrum/sections/hall-of-fame").then((m) => ({ default: m.HallOfFame })),
  { ssr: false }
);
const FerrumStory = dynamic(
  () => import("@/components/ferrum/sections/ferrum-story").then((m) => ({ default: m.FerrumStory })),
  { ssr: false }
);
const Enterprise = dynamic(
  () => import("@/components/ferrum/sections/enterprise").then((m) => ({ default: m.Enterprise })),
  { ssr: false }
);
const PlatformArchitecture = dynamic(
  () => import("@/components/ferrum/sections/platform-architecture").then((m) => ({ default: m.PlatformArchitecture })),
  { ssr: false }
);
const LearningCenter = dynamic(
  () => import("@/components/ferrum/sections/learning-center").then((m) => ({ default: m.LearningCenter })),
  { ssr: false }
);
const ShowcaseGallery = dynamic(
  () => import("@/components/ferrum/sections/showcase-gallery").then((m) => ({ default: m.ShowcaseGallery })),
  { ssr: false }
);
const VisionManifesto = dynamic(
  () => import("@/components/ferrum/sections/vision-manifesto").then((m) => ({ default: m.VisionManifesto })),
  { ssr: false }
);
const EnterpriseComponentLibrary = dynamic(
  () => import("@/components/ferrum/sections/enterprise-components").then((m) => ({ default: m.EnterpriseComponentLibrary })),
  { ssr: false }
);
const BlogView = dynamic(
  () => import("@/components/ferrum/blog-view").then((m) => ({ default: m.BlogView })),
  { ssr: false }
);
const ChangelogView = dynamic(
  () => import("@/components/ferrum/changelog-view").then((m) => ({ default: m.ChangelogView })),
  { ssr: false }
);
const InteractiveDocsView = dynamic(
  () => import("@/components/ferrum/interactive-docs-view").then((m) => ({ default: m.InteractiveDocsView })),
  { ssr: false }
);

/* Nav is the heaviest sync import (~678 LOC with megamenu).
   Defer it via dynamic import — ssr:false avoids pulling Radix primitives
   into the server-rendered HTML, reducing initial JS by ~72KB gzip. */
const Nav = dynamic(
  () => import("@/components/ferrum/nav").then((m) => ({ default: m.Nav })),
  { ssr: false, loading: () => <NavSkeleton /> }
);
const ScrollProgress = dynamic(
  () => import("@/components/ferrum/scroll-progress").then((m) => ({ default: m.ScrollProgress })),
  { ssr: false }
);

/* Homepage sections — lazy loaded directly from source files (not barrel).
   Each section gets its own chunk for independent code-splitting. */
const HeroSection = dynamic(
  () => import("@/components/ferrum/sections/home/hero-section").then(m => ({ default: m.HeroSection })),
  { ssr: false }
);
const ProblemSection = dynamic(
  () => import("@/components/ferrum/sections/home/problem-section").then(m => ({ default: m.ProblemSection })),
  { ssr: false }
);
const PlatformMarquee = dynamic(
  () => import("@/components/ferrum/sections/home/marquee-section").then(m => ({ default: m.PlatformMarquee })),
  { ssr: false }
);
const PlaygroundSection = dynamic(
  () => import("@/components/ferrum/sections/home/playground-section").then(m => ({ default: m.PlaygroundSection })),
  { ssr: false }
);
const PlatformOverviewSection = dynamic(
  () => import("@/components/ferrum/sections/home/overview-section").then(m => ({ default: m.PlatformOverviewSection })),
  { ssr: false }
);
const ArchitectureSection = dynamic(
  () => import("@/components/ferrum/sections/home/architecture-section").then(m => ({ default: m.ArchitectureSection })),
  { ssr: false }
);
const DeveloperJourneySection = dynamic(
  () => import("@/components/ferrum/sections/home/dev-journey-section").then(m => ({ default: m.DeveloperJourneySection })),
  { ssr: false }
);
const LiveExamplesSection = dynamic(
  () => import("@/components/ferrum/sections/home/live-examples-section").then(m => ({ default: m.LiveExamplesSection })),
  { ssr: false }
);
const EnterpriseSection = dynamic(
  () => import("@/components/ferrum/sections/home/enterprise-section").then(m => ({ default: m.EnterpriseSection })),
  { ssr: false }
);
const PlatformRoadmapSection = dynamic(
  () => import("@/components/ferrum/sections/home/roadmap-section").then(m => ({ default: m.RoadmapSection })),
  { ssr: false }
);
const CommunitySection = dynamic(
  () => import("@/components/ferrum/sections/home/community-section").then(m => ({ default: m.CommunitySection })),
  { ssr: false }
);
const PlatformFooter = dynamic(
  () => import("@/components/ferrum/sections/home/platform-footer-section").then(m => ({ default: m.PlatformFooter })),
  { ssr: false }
);
const FerrumPrinciples = dynamic(
  () => import("@/components/ferrum/sections/ferrum-principles").then((m) => ({ default: m.FerrumPrinciples })),
  { ssr: false }
);
const Footer = dynamic(
  () => import("@/components/ferrum/sections/footer").then((m) => ({ default: m.Footer })),
  { ssr: false }
);

/* ════════════════════════════════════════════════════════════════
   NAV SKELETON — Lightweight placeholder matching nav dimensions
   ════════════════════════════════════════════════════════════════ */
function NavSkeleton() {
  return (
    <nav className="sticky top-0 z-50 h-16 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-full flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-foreground/[0.04] animate-pulse" />
          <div className="h-5 w-28 rounded bg-foreground/[0.04] animate-pulse" />
        </div>
        <div className="hidden md:flex items-center gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-3.5 w-14 rounded bg-foreground/[0.03] animate-pulse" />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-foreground/[0.04] animate-pulse" />
          <div className="h-8 w-8 rounded-lg bg-foreground/[0.04] animate-pulse" />
        </div>
      </div>
    </nav>
  );
}

/* ════════════════════════════════════════════════════════════════
   ERROR BOUNDARY — Catches render errors in view components
   ════════════════════════════════════════════════════════════════ */
class ViewErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error("ViewError:", error, info); }
  render() { return this.state.hasError ? <div className="p-20 text-center text-muted-foreground" role="alert">Something went wrong. Try refreshing.</div> : this.props.children; }
}

/* ════════════════════════════════════════════════════════════════
   VIEW SKELETON — Generic loading placeholder
   ════════════════════════════════════════════════════════════════ */
function ViewSkeleton() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-12 pb-8 animate-pulse">
        <div className="h-3 w-16 rounded bg-foreground/[0.04] mb-4" />
        <div className="h-10 w-80 rounded bg-foreground/[0.04] mb-4" />
        <div className="h-5 w-96 max-w-full rounded bg-foreground/[0.03]" />
      </div>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border bg-foreground/[0.015] p-4">
              <div className="w-full h-24 rounded-lg bg-foreground/[0.03] mb-3" />
              <div className="w-3/4 h-3 rounded bg-foreground/[0.03] mb-2" />
              <div className="w-1/2 h-2.5 rounded bg-foreground/[0.02]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   VIEW ROUTER — inner component that uses context
   ════════════════════════════════════════════════════════════════ */

function ViewRouter() {
  const pathname = usePathname();
  const router = useRouter();
  const currentView = useMemo(() => pathnameToView(pathname), [pathname]);
  const isNotFound = currentView === null;
  const app = useAppState();

  const navigate = useCallback((view: ViewId) => {
    router.push(view === "home" ? "/" : `/${view}`);
  }, [router]);

  // Scroll to top on route change — useLayoutEffect fires before browser paint
  // to prevent visible scroll-position flash between views
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  // Announce route change to screen readers and move focus
  useEffect(() => {
    if (!currentView) return;
    const mainEl = document.getElementById("main-content");
    if (mainEl) {
      mainEl.focus();
    }
  }, [currentView]);

  // Update document.title and meta tags for SEO + social sharing
  // useLayoutEffect fires synchronously before browser paint, ensuring the
  // correct title is set before Next.js's internal metadata system can
  // override it with the layout-level default title.
  useLayoutEffect(() => {
    if (!currentView) return;
    const meta = VIEW_META[currentView] ?? VIEW_META.home;
    if (!meta) return;

    document.title = meta.title;

    const setMeta = (attr: string, value: string) => {
      let el = document.querySelector(`meta[${attr}]`) as HTMLMetaElement | null;
      if (el) {
        el.setAttribute("content", value);
      } else {
        el = document.createElement("meta");
        const match = attr.match(/^(name|property|http-equiv)=["'](.*?)["']$/);
        if (match && match[1] && match[2]) el.setAttribute(match[1], match[2]);
        el.setAttribute("content", value);
        document.head.appendChild(el);
      }
    };

    setMeta("name='description'", meta.description);
    setMeta("property='og:title'", meta.title);
    setMeta("property='og:description'", meta.description);
    setMeta("property='og:url'", `${SITE_URL}${pathname === "/" ? "" : pathname}`);
    setMeta("property='og:type'", "website");
    setMeta("name='twitter:title'", meta.title);
    setMeta("name='twitter:description'", meta.description);

    // Update canonical link for the current view
    let canonicalEl = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (canonicalEl) {
      canonicalEl.setAttribute("href", `${SITE_URL}${pathname === "/" ? "" : pathname}`);
    } else {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      canonicalEl.setAttribute("href", `${SITE_URL}${pathname === "/" ? "" : pathname}`);
      document.head.appendChild(canonicalEl);
    }
  }, [currentView, pathname]);

  // Full-screen views — early returns (no nav/footer/scroll)
  if (currentView === "docs") {
    return (
      <ViewErrorBoundary>
        <Nav currentView={currentView} onNavigate={navigate} />
        <Suspense fallback={<ViewSkeleton />}>
          <DocsView onBack={() => navigate("home")} />
        </Suspense>
      </ViewErrorBoundary>
    );
  }

  if (currentView === "interactive-docs") {
    return (
      <ViewErrorBoundary>
        <Nav currentView={currentView} onNavigate={navigate} />
        <Suspense fallback={<ViewSkeleton />}>
          <InteractiveDocsView />
        </Suspense>
      </ViewErrorBoundary>
    );
  }

  if (currentView === "playground") {
    return (
      <ViewErrorBoundary>
        <Suspense fallback={<ViewSkeleton />}>
          <PlaygroundV2 onBack={() => navigate("home")} />
        </Suspense>
      </ViewErrorBoundary>
    );
  }

  if (currentView === "architecture") {
    return (
      <ViewErrorBoundary>
        <Suspense fallback={<ViewSkeleton />}>
          <ArchitectureDeepDive onBack={() => navigate("home")} />
        </Suspense>
      </ViewErrorBoundary>
    );
  }

  // Not found
  if (isNotFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center px-6">
          <div className="text-[120px] sm:text-[180px] font-black leading-none tracking-tighter bg-gradient-to-br from-foreground/80 to-foreground/20 bg-clip-text text-transparent select-none" aria-hidden="true">
            404
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-foreground">
            Page not found
          </h1>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto" role="alert">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => navigate("home")}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  // Standard views with nav, footer, scroll progress
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ViewErrorBoundary>
        <Nav currentView={currentView} onNavigate={navigate} />
      </ViewErrorBoundary>
      <main id="main-content" tabIndex={-1}>
      <ViewErrorBoundary>

      {currentView === "home" && (
        <Suspense fallback={<ViewSkeleton />}>
          <HeroSection />
          <ProblemSection />
          <PlatformMarquee />
          <PlaygroundSection />
          <PlatformOverviewSection />
          <ArchitectureSection />
          <DeveloperJourneySection />
          <LiveExamplesSection />
          <EnterpriseSection />
          <PlatformRoadmapSection />
          <CommunitySection />
          <PlatformFooter />
        </Suspense>
      )}

      {currentView === "principles" && (
        <Suspense fallback={<ViewSkeleton />}>
          <FerrumPrinciples />
          <Footer />
        </Suspense>
      )}

      {currentView === "platform-architecture" && (
        <Suspense fallback={<ViewSkeleton />}><PlatformArchitecture /><Footer /></Suspense>
      )}
      {currentView === "hall-of-fame" && (
        <Suspense fallback={<ViewSkeleton />}><HallOfFame /><Footer /></Suspense>
      )}
      {currentView === "showcase" && (
        <Suspense fallback={<ViewSkeleton />}><ShowcaseGallery /><Footer /></Suspense>
      )}
      {currentView === "learning" && (
        <Suspense fallback={<ViewSkeleton />}><LearningCenter /><Footer /></Suspense>
      )}
      {currentView === "story" && (
        <Suspense fallback={<ViewSkeleton />}><FerrumStory /><Footer /></Suspense>
      )}
      {currentView === "enterprise" && (
        <Suspense fallback={<ViewSkeleton />}><Enterprise /><Footer /></Suspense>
      )}
      {currentView === "enterprise-components" && (
        <Suspense fallback={<ViewSkeleton />}><EnterpriseComponentLibrary /><Footer /></Suspense>
      )}
      {currentView === "vision" && (
        <Suspense fallback={<ViewSkeleton />}><VisionManifesto /><Footer /></Suspense>
      )}

      {currentView === "community" && (
        <Suspense fallback={<ViewSkeleton />}><CommunitySection /><Footer /></Suspense>
      )}

      {currentView === "blog" && (
        <Suspense fallback={<ViewSkeleton />}><BlogView /><Footer /></Suspense>
      )}

      {currentView === "changelog" && (
        <Suspense fallback={<ViewSkeleton />}><ChangelogView /><Footer /></Suspense>
      )}

      {currentView === "effects" && (
        <Suspense fallback={<ViewSkeleton />}>
          <EffectsView
            search={app.search}
            setSearch={app.setSearch}
            activeCategory={app.activeCategory}
            setActiveCategory={app.setActiveCategory}
            hydrated={app.hydrated}
            handleOpenCode={app.openDetail}
            add={app.addToCollection}
            isIn={app.isInCollection}
            collection={app.collection}
            setCollectionOpen={app.setCollectionOpen}
          />
        </Suspense>
      )}

      {currentView === "effects" && (
      <>
      <Suspense fallback={null}>
        <EffectDetailModal
          key={app.selectedEffect?.className || "x"}
          effect={app.selectedEffect}
          open={app.detailOpen}
          onClose={app.closeDetail}
          onAddCollection={app.addToCollection}
          isInCollection={app.selectedEffect ? app.isInCollection(app.selectedEffect.className) : false}
        />
      </Suspense>

      <Suspense fallback={null}>
        <CollectionDrawer
          open={app.collectionOpen}
          onClose={app.setCollectionOpen}
          collection={app.collection}
          onRemove={app.removeFromCollection}
          onClear={app.clearCollection}
        />
      </Suspense>
      </>
      )}
      </ViewErrorBoundary>
      <ViewErrorBoundary>
        <ScrollProgress />
      </ViewErrorBoundary>
      </main>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PUBLIC COMPONENT — wraps router in AppProvider
   ════════════════════════════════════════════════════════════════ */

export function HomeClient() {
  return (
    <AppProvider>
      <ViewRouter />
    </AppProvider>
  );
}
