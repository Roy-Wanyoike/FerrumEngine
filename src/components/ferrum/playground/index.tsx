// Type-strict compliance: fixed noUncheckedIndexedAccess + noUnusedLocals
"use client"

import {
  Activity, Cpu,
} from "lucide-react";
import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { type FerrumEffectIndex } from "@/lib/ferrum-effects-index";
import { getEffectCSS, preloadCategory } from "@/lib/effects/lazy-loader";
import { type SidebarActivity, type ViewMode, type ExportFormat, type MotionConfig, type PhysicsConfig, type ThemeConfig,
  DEFAULT_MOTION, DEFAULT_PHYSICS, DEFAULT_THEME,
  type TEMPLATES,
  getComponentHTML, buildPreviewDoc, generateExportCode,
} from "../playground-v2-data";
import { CodePanel } from "./code-editor";
import { ControlsPanel } from "./controls-panel";
import { ActivityBar, ComponentSidebar } from "./effect-sidebar";
import { LivePreview } from "./preview-panel";
import { TopToolbar } from "./toolbar";

/* --- Resizable Divider --- */
function ResizeHandle({
  direction,
  onResize,
}: {
  direction: "horizontal" | "vertical";
  onResize: (delta: number) => void;
}) {
  const dragging = useRef(false);
  const startPos = useRef(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dragging.current = true;
      startPos.current = direction === "horizontal" ? e.clientX : e.clientY;

      const handleMouseMove = (ev: MouseEvent) => {
        if (!dragging.current) return;
        const current = direction === "horizontal" ? ev.clientX : ev.clientY;
        onResize(current - startPos.current);
        startPos.current = current;
      };

      const handleMouseUp = () => {
        dragging.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = direction === "horizontal" ? "col-resize" : "row-resize";
      document.body.style.userSelect = "none";
    },
    [direction, onResize]
  );

  return (
    <div
      onMouseDown={handleMouseDown}
      className={`shrink-0 flex items-center justify-center group z-10 ${
        direction === "horizontal"
          ? "w-1.5 cursor-col-resize hover:bg-foreground/[0.06] active:bg-foreground/[0.1] transition-colors"
          : "h-1.5 cursor-row-resize hover:bg-foreground/[0.06] active:bg-foreground/[0.1] transition-colors"
      }`}
    >
      <div className={`${
        direction === "horizontal"
          ? "w-0.5 h-6 rounded-full bg-foreground/[0.08] group-hover:bg-foreground/[0.15] group-active:bg-foreground/25 transition-colors"
          : "h-0.5 w-6 rounded-full bg-foreground/[0.08] group-hover:bg-foreground/[0.15] group-active:bg-foreground/25 transition-colors"
      }`} />
    </div>
  );
}

/* ============================================================= */
/*   MAIN COMPONENT - Playground 2.0                             */
/* ============================================================= */

export function PlaygroundV2({ onBack }: { onBack: () => void }) {
  const [sidebarActivity, setSidebarActivity] = useState<SidebarActivity>("components");
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [codeFormat, setCodeFormat] = useState<ExportFormat>("react");
  const [copied, setCopied] = useState(false);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [customCode, setCustomCode] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [effectCategory, setEffectCategory] = useState("all");
  const [reducedMotion, setReducedMotion] = useState(false);

  const [selectedComponent, setSelectedComponent] = useState("card");
  const [selectedEffect, setSelectedEffect] = useState("");
  const [device, setDevice] = useState("desktop");
  const [customWidth, _setCustomWidth] = useState(800);

  const [motion, setMotion] = useState<MotionConfig>(DEFAULT_MOTION);
  const [physics, setPhysics] = useState<PhysicsConfig>(DEFAULT_PHYSICS);
  const [theme, setTheme] = useState<ThemeConfig>(DEFAULT_THEME);

  // Panel sizes
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [horizontalSplit, setHorizontalSplit] = useState(55);
  const [sidebarWidth, setSidebarWidth] = useState(272); // w-64 = 16rem = 256px, plus some padding
  const [controlsWidth, setControlsWidth] = useState(288); // w-72 = 18rem = 288px

  // Effects list
  const [effectsList, setEffectsList] = useState<FerrumEffectIndex[]>([]);

  // Load effects index on mount
  useEffect(() => {
    import("@/lib/ferrum-effects-index").then((mod) => {
      setEffectsList(mod.effects || []);
    });
  }, []);

  // Load effect CSS dynamically from category chunk when effect is selected
  const [effectCSS, setEffectCSS] = useState("");
  useEffect(() => {
    if (!selectedEffect) {
      setEffectCSS("");
      return;
    }
    // Find the category from the effects list (index data, no CSS)
    const idx = effectsList.find((e) => e.className === selectedEffect);
    const cat = idx?.category || "";
    getEffectCSS(cat, selectedEffect).then((css) => {
      setEffectCSS(css || "");
    }).catch(() => setEffectCSS(""));
  }, [selectedEffect, effectsList]);

  // Preload category CSS when user filters sidebar by category
  useEffect(() => {
    if (effectCategory && effectCategory !== "all") {
      preloadCategory(effectCategory);
    }
  }, [effectCategory]);

  // Derived: preview HTML
  const previewHTML = useMemo(() => {
    const compHTML = getComponentHTML(selectedComponent, theme, reducedMotion ? { ...motion, duration: 0, iterations: "1" } : motion);
    return buildPreviewDoc(compHTML, theme, motion, effectCSS, selectedEffect || undefined);
  }, [selectedComponent, theme, motion, effectCSS, selectedEffect, reducedMotion]);

  // Derived: export code
  const exportCode = useMemo(
    () => generateExportCode(codeFormat, selectedComponent, theme, motion, selectedEffect || undefined),
    [codeFormat, selectedComponent, theme, motion, selectedEffect]
  );

  // Use custom code if user has edited; reset when format/component changes
  const displayCode = customCode !== null ? customCode : exportCode;

  const handleCodeChange = useCallback((c: string) => {
    setCustomCode(c);
  }, []);

  // Reset custom edits when format or component changes
  useEffect(() => { setCustomCode(null); }, [codeFormat, selectedComponent, selectedEffect]);

  // Cleanup copied timer on unmount
  useEffect(() => { return () => { if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current); }; }, []);

  // Metrics
  // NOTE: DOMParser runs on every previewHTML change. Acceptable for current data sizes,
  // but could be debounced in the future if performance becomes an issue.
  const metrics = useMemo(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(previewHTML, "text/html");
    const domNodes = doc.querySelectorAll("*").length;
    const cssRules = (previewHTML.match(/\{[^}]*\}/g) || []).length;
    const animations = (previewHTML.match(/animation:/g) || []).length;
    const renderTime = Math.max(1, Math.round(domNodes * 0.05 + cssRules * 0.02));
    return { domNodes, cssRules, animations, renderTime };
  }, [previewHTML]);

  // Handlers
  const handleMotionChange = useCallback((m: Partial<MotionConfig>) => {
    setMotion((prev) => ({ ...prev, ...m }));
  }, []);
  const handlePhysicsChange = useCallback((p: Partial<PhysicsConfig>) => {
    setPhysics((prev) => ({ ...prev, ...p }));
  }, []);
  const handleThemeChange = useCallback((t: Partial<ThemeConfig>) => {
    setTheme((prev) => ({ ...prev, ...t }));
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(exportCode);
      setCopied(true);
      if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
      copiedTimerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn("[Ferrum] Clipboard write failed", e);
      toast.error("Failed to copy to clipboard");
    }
  }, [exportCode]);

  const handleExport = useCallback(() => {
    const blob = new Blob([exportCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ferrum-${selectedComponent}.${codeFormat === "html" ? "html" : codeFormat === "css" ? "css" : codeFormat === "react" ? "tsx" : codeFormat === "vue" ? "vue" : codeFormat === "svelte" ? "svelte" : codeFormat === "angular" ? "ts" : "js"}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [exportCode, selectedComponent, codeFormat]);

  const handleSelectTemplate = useCallback((tpl: typeof TEMPLATES[number]) => {
    setSelectedComponent(tpl.components[0] ?? "card");
    setSelectedEffect("");
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "1") { e.preventDefault(); setViewMode("split"); }
      if ((e.metaKey || e.ctrlKey) && e.key === "2") { e.preventDefault(); setViewMode("code"); }
      if ((e.metaKey || e.ctrlKey) && e.key === "3") { e.preventDefault(); setViewMode("preview"); }
      if ((e.metaKey || e.ctrlKey) && e.key === "b") { e.preventDefault(); setSidebarVisible((v) => !v); }
      if ((e.metaKey || e.ctrlKey) && e.key === "e") { e.preventDefault(); setControlsVisible((v) => !v); }
      if (e.key === "Escape") onBack();
      if ((e.metaKey || e.ctrlKey) && e.key === "c" && !window.getSelection()?.toString()) { e.preventDefault(); handleCopy(); }
      if ((e.metaKey || e.ctrlKey) && e.key === "s") { e.preventDefault(); handleExport(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onBack, handleCopy, handleExport]);

  return (
    <TooltipProvider>
      <div className="fixed inset-0 bg-background flex flex-col z-50" style={{ paddingTop: 0 }}>
        {/* Top Toolbar */}
        <TopToolbar
          onBack={onBack}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onExport={handleExport}
          copied={copied}
          onCopy={handleCopy}
        />

        {/* Main Content */}
        <div className="flex-1 flex min-h-0">
          {/* Activity Bar + Sidebar */}
          {sidebarVisible && (
            <>
              <ActivityBar active={sidebarActivity} onChange={setSidebarActivity} />
              <div style={{ width: sidebarWidth }} className="min-w-0 shrink-0">
              <ComponentSidebar
                activity={sidebarActivity}
                selectedComponent={selectedComponent}
                onSelectComponent={(id) => { setSelectedComponent(id); setSelectedEffect(""); }}
                selectedEffect={selectedEffect}
                onSelectEffect={setSelectedEffect}
                onSelectTemplate={handleSelectTemplate}
                effectsList={effectsList}
                search={search}
                setSearch={setSearch}
                effectCategory={effectCategory}
                setEffectCategory={setEffectCategory}
              />
              </div>
              <ResizeHandle direction="horizontal" onResize={(d) =>
                setSidebarWidth((prev) => Math.min(400, Math.max(180, prev + d)))
              } />
            </>
          )}

          {/* Center: Code + Preview */}
          <div className="flex-1 flex flex-col min-w-0">
            {viewMode === "split" && (
              <div className="flex-1 flex flex-col min-h-0">
                <div style={{ height: `${horizontalSplit}%` }} className="min-h-0">
                  <CodePanel
                    code={displayCode}
                    format={codeFormat}
                    onFormatChange={setCodeFormat}
                    onCodeChange={handleCodeChange}
                    onCopy={handleCopy}
                    copied={copied}
                  />
                </div>
                <ResizeHandle
                  direction="vertical"
                  onResize={(d) =>
                    setHorizontalSplit((prev) => Math.min(85, Math.max(15, prev + d * 0.3)))
                  }
                />
                <div style={{ height: `${100 - horizontalSplit}%` }} className="min-h-0">
                  <LivePreview html={previewHTML} device={device} customWidth={customWidth} onDeviceChange={setDevice} />
                </div>
              </div>
            )}

            {viewMode === "code" && (
              <div className="flex-1 min-h-0">
                <CodePanel
                  code={displayCode}
                  format={codeFormat}
                  onFormatChange={setCodeFormat}
                  onCodeChange={handleCodeChange}
                  onCopy={handleCopy}
                  copied={copied}
                />
              </div>
            )}

            {viewMode === "preview" && (
              <div className="flex-1 min-h-0">
                <LivePreview html={previewHTML} device={device} customWidth={customWidth} onDeviceChange={setDevice} />
              </div>
            )}
          </div>

          {/* Controls Panel */}
          {controlsVisible && (
            <>
              <ResizeHandle direction="horizontal" onResize={(d) =>
                setControlsWidth((prev) => Math.min(440, Math.max(220, prev + d)))
              } />
              <div style={{ width: controlsWidth }} className="min-w-0 shrink-0 overflow-hidden">
              <ControlsPanel
                motion={motion}
                onMotionChange={handleMotionChange}
                physics={physics}
                onPhysicsChange={handlePhysicsChange}
                theme={theme}
                onThemeChange={handleThemeChange}
                selectedComponent={selectedComponent}
                selectedEffect={selectedEffect}
                metrics={metrics}
                reducedMotion={reducedMotion}
                onToggleReducedMotion={() => setReducedMotion((v) => !v)}
              />
              </div>
            </>
          )}
        </div>

        {/* Bottom Status Bar */}
        <div className="h-7 bg-foreground/[0.02] border-t border-border flex items-center px-3 text-[10px] text-muted-foreground/60 shrink-0 gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
            <span>Ready</span>
          </div>
          <div className="flex items-center gap-1">
            <Cpu size={10} />
            <span>{metrics.domNodes} nodes</span>
          </div>
          <div className="flex items-center gap-1">
            <Activity size={10} />
            <span>{metrics.animations} animations</span>
          </div>
          <div className="flex-1" />
          <div>FerrumEngine Playground 2.0</div>
          <div>{effectsList.length}+ effects</div>
        </div>
      </div>
    </TooltipProvider>
  );
}