"use client";

import { ChevronRight, Check, X } from "lucide-react";
import { LESSONS } from "./lessons-data";
import { CATEGORIES, DIFFICULTY_COLORS, groupLessonsByCategory, type InteractiveLesson } from "./types";

interface LessonSidebarProps {
  activeLessonId: string;
  completedLessons: Set<string>;
  sidebarOpen: boolean;
  expandedCategories: Set<string>;
  onSelectLesson: (lesson: InteractiveLesson) => void;
  onToggleCategory: (cat: string) => void;
  onCloseSidebar: () => void;
}

export function LessonSidebar({
  activeLessonId,
  completedLessons,
  sidebarOpen,
  expandedCategories,
  onSelectLesson,
  onToggleCategory,
  onCloseSidebar,
}: LessonSidebarProps) {
  const grouped = groupLessonsByCategory(LESSONS);

  return (
    <aside
      className={`
        lg:w-72 xl:w-80 shrink-0 border-r border-white/[0.06] overflow-hidden
        flex flex-col transition-all duration-300
        ${sidebarOpen ? "fixed inset-0 top-[58px] z-30 w-full bg-[#0a0a0a]" : "hidden lg:flex"}
      `}
    >
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        {/* Mobile close */}
        <button
          onClick={onCloseSidebar}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-white/[0.06] z-10"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5 text-zinc-400" />
        </button>

        <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Lessons</h2>

        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const lessons = grouped[cat] ?? [];
            const isExpanded = expandedCategories.has(cat);
            const catCompleted = lessons.every((l) => completedLessons.has(l.id));

            return (
              <div key={cat} className={sidebarOpen ? "mt-6 lg:mt-0" : ""}>
                <button
                  onClick={() => onToggleCategory(cat)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/[0.04] transition-colors text-left group"
                >
                  <ChevronRight
                    className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                  />
                  <span className="text-sm font-medium text-zinc-300 flex-1">{cat}</span>
                  {catCompleted && (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                  <span className="text-xs text-zinc-600">{lessons.length}</span>
                </button>

                {isExpanded && (
                  <div className="ml-4 mt-1 space-y-0.5">
                    {lessons.map((lesson) => {
                      const isActive = lesson.id === activeLessonId;
                      const isCompleted = completedLessons.has(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => onSelectLesson(lesson)}
                          className={`
                            w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all
                            ${isActive
                              ? "border"
                              : "hover:bg-white/[0.04]"
                            }
                          `}
                          style={isActive ? {
                            background: "rgba(168, 85, 247, 0.08)",
                            borderColor: "rgba(168, 85, 247, 0.3)",
                          } : {}}
                        >
                          <div
                            className={`
                              w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all
                              ${isCompleted
                                ? "border-emerald-500/50 bg-emerald-500/20"
                                : "border-zinc-700"
                              }
                            `}
                          >
                            {isCompleted ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <div className="w-1.5 h-1.5 rounded-sm bg-zinc-600" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className={`text-sm truncate ${isActive ? "text-white font-medium" : "text-zinc-400"}`}>
                              {lesson.title}
                            </div>
                          </div>

                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium shrink-0 ${DIFFICULTY_COLORS[lesson.difficulty]}`}>
                            {lesson.difficulty.slice(0, 1).toUpperCase() + lesson.difficulty.slice(1, 3)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
