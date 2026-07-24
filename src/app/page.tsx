"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import type { FerrumEffectIndex } from "@/components/ferrum/effects-view";

/* ════════════════════════════════════════════════════════════════
   DYNAMIC IMPORTS — Lazy-loaded chunks
   ════════════════════════════════════════════════════════════════ */

/* Effects (heaviest — 92K index + 424K data) */
const EffectsView = dynamic(
  () => import("@/components/ferrum/effects-view").then((m) => ({ default: m.EffectsView })),
  { ssr: false, loading: () => <ViewSkeleton /> }
);
const EffectDetailModal = dynamic(
  () => import("@/components/ferrum/effects-view").then((m) => ({ default: m.EffectDetailModal })),
  { ssr: false }
);
const PlaygroundPanel = dynamic(
  () => import("@/components/ferrum/effects-view").then((m) => ({ default: m.PlaygroundPanel })),
  { ssr: false }
);
const CollectionDrawer = dynamic(
  () => import("@/components/ferrum/effects-view").then((m) => ({ default: m.CollectionDrawer })),
  { ssr: false }
);
const InstallSection = dynamic(
  () => import("@/components/ferrum/effects-view").then((m) => ({ default: m.InstallSection })),
  { ssr: false }
);

/* Non-home views (only loaded when navigated to) */
const DocsView = dynamic(
  () => import("@/components/ferrum/docs-view").then((m) => ({ default: m.default })),
  { ssr: false }
);
const ArchitectureBook = dynamic(
  () => import("@/components/ferrum/sections/architecture-book").then((m) => ({ default: m.ArchitectureBook })),
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

/* Below-fold home sections (loaded after initial paint) */
const PlaygroundDemo = dynamic(
  () => import("@/components/ferrum/sections/playground-demo").then((m) => ({ default: m.PlaygroundDemo })),
  { ssr: false }
);
const WowShowcase = dynamic(
  () => import("@/components/ferrum/sections/wow-showcase").then((m) => ({ default: m.WowShowcase })),
  { ssr: false }
);
const StatsBar = dynamic(
  () => import("@/components/ferrum/sections/stats-bar").then((m) => ({ default: m.StatsBar })),
  { ssr: false }
);
const Comparison = dynamic(
  () => import("@/components/ferrum/sections/comparison").then((m) => ({ default: m.Comparison })),
  { ssr: false }
);
const DevExperience = dynamic(
  () => import("@/components/ferrum/sections/dev-experience").then((m) => ({ default: m.DevExperience })),
  { ssr: false }
);
const RoadmapSection = dynamic(
  () => import("@/components/ferrum/sections/roadmap-section").then((m) => ({ default: m.RoadmapSection })),
  { ssr: false }
);

/* ════════════════════════════════════════════════════════════════
   SYNCHRONOUS IMPORTS — Critical above-fold content only
   ════════════════════════════════════════════════════════════════ */
import { Nav, type ViewId } from "@/components/ferrum/nav";
import { ScrollProgress } from "@/components/ferrum/scroll-progress";
import { VisionHero } from "@/components/ferrum/sections/vision-hero";
import { WhyFerrum } from "@/components/ferrum/sections/why-ferrum";
import { MarqueeStrip } from "@/components/ferrum/sections/marquee-strip";
import { FerrumPrinciples } from "@/components/ferrum/sections/ferrum-principles";
import { PlatformLayers } from "@/components/ferrum/sections/platform-layers";
import { Footer } from "@/components/ferrum/sections/footer";

/* ════════════════════════════════════════════════════════════════
   SKELETON — Generic loading placeholder
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
   MAIN PAGE — State-based view router
   ════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [currentView, setCurrentView] = useState<ViewId>("home");

  // Effects state
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedEffect, setSelectedEffect] = useState<FerrumEffectIndex | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [playgroundOpen, setPlaygroundOpen] = useState(false);
  const [collection, setCollection] = useState<string[]>([]);
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const handleNavigate = useCallback((view: ViewId) => {
    if (view === "playground") {
      setPlaygroundOpen(true);
    } else {
      setCurrentView(view);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [currentView]);

  useEffect(() => {
    const titles: Record<string, string> = {
      home: "FerrumEngine — Build Interfaces That Feel Alive",
      principles: "The Ferrum Principles",
      architecture: "Architecture Book — FerrumEngine",
      "platform-architecture": "Platform Architecture — FerrumEngine",
      "hall-of-fame": "Hall of Fame — FerrumEngine",
      showcase: "Showcase Gallery — FerrumEngine",
      learning: "Learning Center — FerrumEngine",
      story: "Why Ferrum Exists",
      enterprise: "Ferrum Enterprise",
      "enterprise-components": "Enterprise Components — FerrumEngine",
      vision: "Vision & Manifesto — FerrumEngine",
      effects: "Effects Gallery — FerrumEngine",
      docs: "Documentation — FerrumEngine",
      playground: "Playground — FerrumEngine",
    };
    document.title = titles[currentView] || titles.home;
  }, [currentView]);

  useEffect(() => {
    let cancelled = false;
    requestAnimationFrame(() => {
      try {
        const s = localStorage.getItem("ferrum-collection");
        if (s && !cancelled) {
          const p = JSON.parse(s);
          if (Array.isArray(p)) setCollection(p);
        }
      } catch { /* */ }
      if (!cancelled) setHydrated(true);
    });
    return () => { cancelled = true; };
  }, []);

  const handleOpenCode = useCallback((e: FerrumEffectIndex) => { setSelectedEffect(e); setDetailOpen(true); }, []);
  const add = useCallback((cn: string) => {
    setCollection((p) => {
      if (p.includes(cn)) return p;
      const n = [...p, cn];
      try { localStorage.setItem("ferrum-collection", JSON.stringify(n)); } catch { /* */ }
      return n;
    });
  }, []);
  const remove = useCallback((cn: string) => {
    setCollection((p) => {
      const n = p.filter((c) => c !== cn);
      try { localStorage.setItem("ferrum-collection", JSON.stringify(n)); } catch { /* */ }
      return n;
    });
  }, []);
  const clearCollection = useCallback(() => {
    setCollection([]);
    try { localStorage.removeItem("ferrum-collection"); } catch { /* */ }
  }, []);
  const isIn = useCallback((cn: string) => collection.includes(cn), [collection]);

  // Docs view
  if (currentView === "docs") {
    return (
      <>
        <Nav currentView={currentView} onNavigate={handleNavigate} />
        <DocsView onBack={() => setCurrentView("home")} />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Nav currentView={currentView} onNavigate={handleNavigate} />

      {currentView === "home" && (
        <>
          <VisionHero
            onGetStarted={() => setCurrentView("effects")}
            onOpenPlayground={() => setPlaygroundOpen(true)}
          />
          <WhyFerrum />
          <MarqueeStrip />
          <PlaygroundDemo />
          <PlatformLayers />
          <FerrumPrinciples />
          <WowShowcase />
          <StatsBar />
          <Comparison />
          <InstallSection />
          <DevExperience />
          <RoadmapSection onOpenDocs={() => setCurrentView("docs")} />
          <Footer onOpenDocs={() => setCurrentView("docs")} currentView={currentView} onNavigateHome={() => setCurrentView("home")} onNavigateEffects={() => setCurrentView("effects")} />
        </>
      )}

      {currentView === "principles" && (
        <>
          <FerrumPrinciples />
          <Footer onOpenDocs={() => setCurrentView("docs")} currentView={currentView} onNavigateHome={() => setCurrentView("home")} onNavigateEffects={() => setCurrentView("effects")} />
        </>
      )}

      {currentView === "architecture" && <ArchitectureBook onNavigate={handleNavigate} />}
      {currentView === "platform-architecture" && <PlatformArchitecture />}
      {currentView === "hall-of-fame" && <HallOfFame />}
      {currentView === "showcase" && <ShowcaseGallery />}
      {currentView === "learning" && <LearningCenter />}
      {currentView === "story" && <FerrumStory />}
      {currentView === "enterprise" && <Enterprise />}
      {currentView === "enterprise-components" && <EnterpriseComponentLibrary />}
      {currentView === "vision" && <VisionManifesto />}

      {currentView === "effects" && (
        <EffectsView
          search={search} setSearch={setSearch}
          activeCategory={activeCategory} setActiveCategory={setActiveCategory}
          hydrated={hydrated}
          handleOpenCode={handleOpenCode}
          add={add} isIn={isIn}
          collection={collection}
          collectionOpen={collectionOpen} setCollectionOpen={setCollectionOpen}
          remove={remove} clear={clearCollection}
        />
      )}

      <EffectDetailModal
        key={selectedEffect?.className || "x"}
        effect={selectedEffect}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onAddCollection={add}
        isInCollection={selectedEffect ? isIn(selectedEffect.className) : false}
      />
      <PlaygroundPanel open={playgroundOpen} onClose={setPlaygroundOpen} />
      <CollectionDrawer
        open={collectionOpen}
        onClose={setCollectionOpen}
        collection={collection}
        onRemove={remove}
        onClear={clearCollection}
      />
      <ScrollProgress />
    </div>
  );
}