"use client";

import { Monitor, Smartphone, Tablet, Sparkles, Check, BookOpen } from "lucide-react";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { CodePlayground } from "./interactive-docs/code-playground";
import { ExplanationPanel } from "./interactive-docs/explanation-panel";
import { LessonSidebar } from "./interactive-docs/lesson-sidebar";
import { LESSONS } from "./interactive-docs/lessons-data";
import { DIFFICULTY_COLORS, CATEGORIES, type DeviceSize, type InteractiveLesson } from "./interactive-docs/types";

export function InteractiveDocsView() {
  const firstLesson = LESSONS[0]!;
  const [activeLessonId, setActiveLessonId] = useState(firstLesson.id);
  const [userCode, setUserCode] = useState(firstLesson.starterCode);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [deviceSize, setDeviceSize] = useState<DeviceSize>("desktop");
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(CATEGORIES)
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [splitPos, setSplitPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const dragStartPos = useRef(0);

  const activeLesson = useMemo(
    () => LESSONS.find((l) => l.id === activeLessonId) ?? LESSONS[0]!,
    [activeLessonId]
  );

  const completionPercent = Math.round(
    (completedLessons.size / LESSONS.length) * 100
  );

  /* ── Reset code to starter ── */
  const resetCode = useCallback(() => {
    setUserCode(activeLesson.starterCode);
    setShowSolution(false);
    setShowHint(false);
  }, [activeLesson]);

  /* ── Reveal solution ── */
  const revealSolution = useCallback(() => {
    setUserCode(activeLesson.solutionCode);
    setShowSolution(true);
  }, [activeLesson]);

  /* ── Mark lesson as completed ── */
  const markCompleted = useCallback((lessonId: string) => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) next.delete(lessonId);
      else next.add(lessonId);
      return next;
    });
  }, []);

  /* ── Switch lesson ── */
  const selectLesson = useCallback(
    (lesson: InteractiveLesson) => {
      setActiveLessonId(lesson.id);
      setUserCode(
        completedLessons.has(lesson.id) ? lesson.solutionCode : lesson.starterCode
      );
      setShowSolution(completedLessons.has(lesson.id));
      setShowHint(false);
      setSidebarOpen(false);
    },
    [completedLessons]
  );

  /* ── Toggle category ── */
  const toggleCategory = useCallback((cat: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }, []);

  /* ── Resizable split panel drag ── */
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      dragStartY.current = e.clientY;
      dragStartPos.current = splitPos;
    },
    [splitPos]
  );

  useEffect(() => {
    if (!isDragging || !containerRef.current) return;
    const containerH = containerRef.current.getBoundingClientRect().height;

    const handleMove = (e: MouseEvent) => {
      const delta = e.clientY - dragStartY.current;
      const pct = dragStartPos.current + (delta / containerH) * 100;
      setSplitPos(Math.min(80, Math.max(20, pct)));
    };
    const handleUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [isDragging]);

  /* ── Handle code change from playground ── */
  const handleCodeChange = useCallback((code: string) => {
    setUserCode(code);
    setShowSolution(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0a0a0a" }}>
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] backdrop-blur-xl" style={{ background: "rgba(10,10,10,0.85)" }}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
          {/* Progress bar */}
          <div className="h-0.5 w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${completionPercent}%`,
                background: "linear-gradient(90deg, #a855f7, #ec4899)",
              }}
            />
          </div>

          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              {/* Mobile sidebar toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-white/[0.06] transition-colors"
                aria-label="Toggle lesson sidebar"
              >
                <BookOpen className="w-5 h-5 text-zinc-400" />
              </button>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}>
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-semibold text-sm hidden sm:block">Interactive Docs</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 ml-4 px-2.5 py-1 rounded-full text-xs" style={{ background: "rgba(168,85,247,0.1)", color: "#c084fc" }}>
                {completedLessons.size}/{LESSONS.length} completed
              </div>
            </div>

            {/* Device size toggles */}
            <div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
              <button
                onClick={() => setDeviceSize("desktop")}
                className={`p-1.5 rounded-md transition-all ${deviceSize === "desktop" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                style={deviceSize === "desktop" ? { background: "rgba(168,85,247,0.2)" } : {}}
                aria-label="Desktop preview"
                title="Desktop (1024px)"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceSize("tablet")}
                className={`p-1.5 rounded-md transition-all ${deviceSize === "tablet" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                style={deviceSize === "tablet" ? { background: "rgba(168,85,247,0.2)" } : {}}
                aria-label="Tablet preview"
                title="Tablet (768px)"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceSize("mobile")}
                className={`p-1.5 rounded-md transition-all ${deviceSize === "mobile" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                style={deviceSize === "mobile" ? { background: "rgba(168,85,247,0.2)" } : {}}
                aria-label="Mobile preview"
                title="Mobile (375px)"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex max-w-[1600px] mx-auto w-full relative">
        {/* ── Sidebar (lesson browser) ── */}
        <LessonSidebar
          activeLessonId={activeLessonId}
          completedLessons={completedLessons}
          sidebarOpen={sidebarOpen}
          expandedCategories={expandedCategories}
          onSelectLesson={selectLesson}
          onToggleCategory={toggleCategory}
          onCloseSidebar={() => setSidebarOpen(false)}
        />

        {/* ── Main content area ── */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* ── Lesson title bar ── */}
          <div className="px-4 sm:px-6 py-3 border-b border-white/[0.06] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium shrink-0 ${DIFFICULTY_COLORS[activeLesson.difficulty]}`}>
                {activeLesson.difficulty.charAt(0).toUpperCase() + activeLesson.difficulty.slice(1)}
              </span>
              <h1 className="text-white font-semibold text-sm truncate">{activeLesson.title}</h1>
              <span className="text-zinc-600 text-xs hidden sm:block">— {activeLesson.description}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Mark complete toggle */}
              <button
                onClick={() => markCompleted(activeLessonId)}
                className={`p-1.5 rounded-lg border transition-all text-xs font-medium flex items-center gap-1.5 ${
                  completedLessons.has(activeLessonId)
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : "border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
                }`}
                aria-label={completedLessons.has(activeLessonId) ? "Mark incomplete" : "Mark complete"}
              >
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {completedLessons.has(activeLessonId) ? "Done" : "Complete"}
                </span>
              </button>
            </div>
          </div>

          {/* ── Split panels ── */}
          <div ref={containerRef} className="flex-1 flex flex-col relative overflow-hidden">
            {/* Explanation panel */}
            <div style={{ height: `${splitPos}%` }}>
              <ExplanationPanel
                lesson={activeLesson}
                showHint={showHint}
                onToggleHint={() => setShowHint(!showHint)}
              />
            </div>

            {/* ── Drag handle ── */}
            <div
              onMouseDown={handleMouseDown}
              className={`
                h-2 shrink-0 cursor-row-resize relative group z-10
                flex items-center justify-center
                ${isDragging ? "bg-purple-500/20" : "hover:bg-white/[0.04]"}
              `}
              role="separator"
              aria-orientation="horizontal"
              aria-label="Resize panels"
            >
              <div
                className={`
                  w-10 h-0.5 rounded-full transition-colors
                  ${isDragging ? "bg-purple-500" : "bg-zinc-700 group-hover:bg-zinc-500"}
                `}
              />
            </div>

            {/* ── Code + Preview panel ── */}
            <CodePlayground
              userCode={userCode}
              deviceSize={deviceSize}
              showSolution={showSolution}
              isDragging={isDragging}
              onCodeChange={handleCodeChange}
              onResetCode={resetCode}
              onRevealSolution={revealSolution}
            />
          </div>
        </main>
      </div>

      {/* ── Custom scrollbar styles ── */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
        /* Mobile sidebar scrollbar */
        aside .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
      `}</style>
    </div>
  );
}
