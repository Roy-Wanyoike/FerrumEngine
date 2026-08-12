"use client";

import { Lightbulb } from "lucide-react";
import type { InteractiveLesson } from "./types";

interface ExplanationPanelProps {
  lesson: InteractiveLesson;
  showHint: boolean;
  onToggleHint: () => void;
}

export function ExplanationPanel({
  lesson,
  showHint,
  onToggleHint,
}: ExplanationPanelProps) {
  return (
    <div className="overflow-y-auto custom-scrollbar" style={{ height: "100%" }}>
      <div className="max-w-2xl px-4 sm:px-6 py-5">
        {/* Concepts pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {lesson.concepts.map((c) => (
            <span
              key={c}
              className="text-[11px] px-2 py-0.5 rounded-full font-medium"
              style={{
                background: "rgba(168, 85, 247, 0.1)",
                color: "#c084fc",
                border: "1px solid rgba(168, 85, 247, 0.2)",
              }}
            >
              {c}
            </span>
          ))}
        </div>

        {/* Explanation HTML */}
        <div
          className="prose-sm [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mb-2 [&_p]:text-zinc-300 [&_p]:mb-3 [&_p]:text-sm [&_code]:bg-zinc-800 [&_code]:text-emerald-400 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_ul]:space-y-1 [&_ul]:text-zinc-400 [&_ul]:text-sm [&_li]:pl-1 [&_div]:rounded-lg [&_div]:mb-3 [&_div]:p-3 [&_strong]:text-white"
          dangerouslySetInnerHTML={{ __html: lesson.explanation }}
        />

        {/* Hint toggle */}
        <button
          onClick={onToggleHint}
          className="flex items-center gap-2 mt-4 px-3 py-2 rounded-lg text-sm transition-all"
          style={{
            background: showHint ? "rgba(250, 204, 21, 0.1)" : "rgba(255,255,255,0.03)",
            border: showHint ? "1px solid rgba(250, 204, 21, 0.3)" : "1px solid rgba(255,255,255,0.06)",
            color: showHint ? "#facc15" : "#94a3b8",
          }}
        >
          <Lightbulb className="w-4 h-4" />
          {showHint ? "Hide Hint" : "Show Hint"}
        </button>

        {showHint && (
          <div
            className="mt-2 px-4 py-3 rounded-lg text-sm"
            style={{
              background: "rgba(250, 204, 21, 0.06)",
              border: "1px solid rgba(250, 204, 21, 0.15)",
              color: "#fde68a",
            }}
          >
            {lesson.hint}
          </div>
        )}
      </div>
    </div>
  );
}
