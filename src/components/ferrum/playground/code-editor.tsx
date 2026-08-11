"use client";

import { Code, Copy, Check } from "lucide-react";
import { useState, useMemo } from "react";
import {
  type ExportFormat,
  EXPORT_FORMATS, syntaxHighlight,
} from "../playground-v2-data";

/* ─── Code Panel ─── */
export function CodePanel({
  code,
  format,
  onFormatChange,
  onCodeChange,
  onCopy,
  copied,
}: {
  code: string;
  format: ExportFormat;
  onFormatChange: (f: ExportFormat) => void;
  onCodeChange: (c: string) => void;
  onCopy: () => void;
  copied: boolean;
}) {
  const [editMode, setEditMode] = useState(false);
  const lines = code.split("\n");
  const highlighted = useMemo(() => syntaxHighlight(code, format), [code, format]);

  return (
    <div className="flex flex-col h-full bg-foreground/[0.005]">
      {/* Code tabs */}
      <div className="flex items-center border-b border-border px-2 h-10 shrink-0 gap-0.5">
        <div className="flex gap-0.5 flex-1 overflow-x-auto">
          {EXPORT_FORMATS.map((f) => (
            <button
              key={f.id}
              onClick={() => onFormatChange(f.id)}
              className={`text-[11px] px-2.5 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                format === f.id
                  ? "bg-foreground/[0.08] text-foreground font-medium"
                  : "text-muted-foreground/50 hover:text-foreground/70 hover:bg-foreground/[0.04]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        {/* Edit/Formatted toggle */}
        <button
          onClick={() => setEditMode((v) => !v)}
          title={editMode ? "Switch to formatted view" : "Switch to editable mode"}
          className={`mx-1 flex items-center gap-1 text-[11px] px-2 py-1.5 rounded-md transition-colors shrink-0 ${
            editMode
              ? "bg-foreground/[0.08] text-foreground"
              : "text-muted-foreground/50 hover:text-foreground/70 hover:bg-foreground/[0.04]"
          }`}
        >
          <Code size={12} />
          {editMode ? "Edit" : "View"}
        </button>
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 text-[11px] text-muted-foreground/50 hover:text-foreground/70 transition-colors px-2 py-1.5 rounded-md hover:bg-foreground/[0.04] shrink-0"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      {/* Code display */}
      {editMode ? (
        <div className="flex-1 relative min-h-0">
          <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col items-end pr-3 pt-3 text-[11px] text-muted-foreground/25 select-none pointer-events-none overflow-hidden font-mono z-10">
            {lines.map((_, i) => (
              <div key={i} className="leading-6">{i + 1}</div>
            ))}
          </div>
          <textarea
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            spellCheck={false}
            className="w-full h-full pl-12 pr-4 pt-3 pb-3 font-mono text-[12px] leading-6 bg-transparent text-foreground/80 resize-none focus:outline-none whitespace-pre-wrap break-all"
          />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="relative p-4 font-mono text-[12px] leading-6">
            <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col items-end pr-3 pt-4 text-[11px] text-muted-foreground/25 select-none pointer-events-none">
              {lines.map((_, i) => (
                <div key={i} className="leading-6">{i + 1}</div>
              ))}
            </div>
            <pre
              className="pl-12 whitespace-pre-wrap break-all text-muted-foreground/75"
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
