"use client";

import { Play, Copy, Check, RotateCcw, Code2, Eye } from "lucide-react";
import { useState, useRef, useCallback, useMemo } from "react";
import { DEVICE_WIDTHS, type DeviceSize } from "./types";

interface CodePlaygroundProps {
  userCode: string;
  deviceSize: DeviceSize;
  showSolution: boolean;
  isDragging: boolean;
  onCodeChange: (code: string) => void;
  onResetCode: () => void;
  onRevealSolution: () => void;
}

export function CodePlayground({
  userCode,
  deviceSize,
  showSolution,
  isDragging,
  onCodeChange,
  onResetCode,
  onRevealSolution,
}: CodePlaygroundProps) {
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const codeRef = useRef<HTMLTextAreaElement>(null);

  /* ── Run code into iframe ── */
  const runCode = useCallback(() => {
    if (!iframeRef.current) return;
    iframeRef.current.srcdoc = userCode;
  }, [userCode]);

  const iframeSrcDoc = useMemo(() => userCode, [userCode]);

  /* ── Copy code ── */
  const copyCode = useCallback(async () => {
    await navigator.clipboard.writeText(userCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [userCode]);

  /* ── Tab key in textarea inserts spaces ── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const ta = codeRef.current;
        if (!ta) return;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const val = ta.value;
        onCodeChange(val.substring(0, start) + "  " + val.substring(end));
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + 2;
        });
      }
    },
    [onCodeChange]
  );

  return (
    <div className="flex-1 overflow-hidden flex flex-col" style={{ minHeight: "20%" }}>
      {/* Controls toolbar */}
      <div className="flex items-center gap-1.5 px-4 py-2 border-t border-white/[0.06] shrink-0">
        <button
          onClick={runCode}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all"
          style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)" }}
        >
          <Play className="w-3 h-3" />
          Run
        </button>
        <button
          onClick={onResetCode}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:bg-white/[0.04]"
          style={{ borderColor: "rgba(255,255,255,0.1)", color: "#94a3b8" }}
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
        <button
          onClick={onRevealSolution}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
            showSolution ? "" : "hover:bg-white/[0.04]"
          }`}
          style={{
            borderColor: showSolution ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.1)",
            background: showSolution ? "rgba(168,85,247,0.1)" : "transparent",
            color: showSolution ? "#c084fc" : "#94a3b8",
          }}
        >
          <Eye className="w-3 h-3" />
          {showSolution ? "Showing Solution" : "Show Solution"}
        </button>
        <div className="flex-1" />
        <button
          onClick={copyCode}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:bg-white/[0.04]"
          style={{ borderColor: "rgba(255,255,255,0.1)", color: "#94a3b8" }}
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code editor + Preview split */}
      <div className="flex-1 flex min-h-0">
        {/* Code editor */}
        <div className="flex-1 flex flex-col min-w-0 border-r border-white/[0.06]">
          <div
            className="flex items-center gap-2 px-3 py-1.5 shrink-0"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <Code2 className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-[11px] text-zinc-500 font-medium">HTML & CSS</span>
          </div>
          <textarea
            ref={codeRef}
            value={userCode}
            onChange={(e) => {
              onCodeChange(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            className="flex-1 w-full resize-none p-4 text-sm leading-relaxed outline-none custom-scrollbar"
            style={{
              background: "#1a1a2e",
              color: "#e2e8f0",
              fontFamily: "'Fira Code', 'JetBrains Mono', 'SF Mono', 'Cascadia Code', Consolas, monospace",
              tabSize: 2,
            }}
          />
        </div>

        {/* Preview iframe */}
        <div className="flex-1 flex flex-col min-w-0">
          <div
            className="flex items-center gap-2 px-3 py-1.5 shrink-0"
            style={{ background: "rgba(255,255,255,0.02)" }}
          >
            <Eye className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-[11px] text-zinc-500 font-medium">Preview</span>
            <span className="text-[10px] text-zinc-600 ml-auto">{DEVICE_WIDTHS[deviceSize]}px</span>
          </div>
          <div className="flex-1 flex items-center justify-center p-4 overflow-hidden" style={{ background: "#111118" }}>
            <div
              className="relative rounded-lg overflow-hidden transition-all duration-300"
              style={{
                width: `${Math.min(DEVICE_WIDTHS[deviceSize], 1024)}px`,
                height: "100%",
                maxWidth: "100%",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <iframe
                ref={iframeRef}
                srcDoc={iframeSrcDoc}
                title="Live preview"
                sandbox="allow-scripts"
                className="w-full h-full bg-white"
                style={{ pointerEvents: isDragging ? "none" : "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
