"use client";

import {
  ArrowLeft, Play, Code, Eye, SplitSquareHorizontal,
  Copy, Check, Download, Keyboard,
  FileCode, ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import {
  type ViewMode,
  EXPORT_FORMATS,
} from "../playground-v2-data";

/* ── Top Toolbar ── */
export function TopToolbar({
  onBack,
  viewMode,
  onViewModeChange,
  onExport,
  copied,
  onCopy,
}: {
  onBack: () => void;
  viewMode: ViewMode;
  onViewModeChange: (m: ViewMode) => void;
  onExport: () => void;
  copied: boolean;
  onCopy: () => void;
}) {
  const [exportOpen, setExportOpen] = useState(false);
  const [exportMenuIndex, setExportMenuIndex] = useState(-1);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const shortcutsRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  // Focus trap for shortcuts dialog
  useEffect(() => {
    if (!shortcutsOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const dialog = shortcutsRef.current;
    if (dialog) {
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) focusable[0]!.focus();
      else dialog.focus();
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); setShortcutsOpen(false); return; }
      if (e.key !== "Tab" || !dialog) return;
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [shortcutsOpen]);

  // Close export dropdown on Escape
  useEffect(() => {
    if (!exportOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setExportOpen(false); }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [exportOpen]);

  // Close export dropdown on click outside
  useEffect(() => {
    if (!exportOpen) return;
    const handler = (e: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setExportOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [exportOpen]);

  return (
    <>
      <div className="h-12 bg-foreground/[0.02] border-b border-border flex items-center px-3 gap-2 shrink-0">
        {/* Back */}
        <button
          onClick={onBack}
          title="Back to Home"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.06] transition-colors"
        >
          <ArrowLeft size={16} />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2.5 ml-1">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Play size={10} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-foreground/90">Playground</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-400 font-medium">v2.0</span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* View mode toggles */}
        <div className="flex items-center bg-foreground/[0.04] rounded-lg p-0.5">
          {([
            { id: "split" as ViewMode, icon: SplitSquareHorizontal, label: "Split" },
            { id: "code" as ViewMode, icon: Code, label: "Code" },
            { id: "preview" as ViewMode, icon: Eye, label: "Preview" },
          ]).map((mode) => {
            const Icon = mode.icon;
            const active = viewMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => onViewModeChange(mode.id)}
                title={`${mode.label} View`}
                className={`h-7 px-2.5 rounded-md flex items-center gap-1.5 text-[11px] transition-colors ${
                  active
                    ? "bg-foreground/[0.08] text-foreground font-medium shadow-sm"
                    : "text-muted-foreground/50 hover:text-foreground/70"
                }`}
              >
                <Icon size={13} />
                <span className="hidden sm:inline">{mode.label}</span>
              </button>
            );
          })}
        </div>

        <div className="w-px h-5 bg-border mx-1" />

        {/* Copy */}
        <button
          onClick={onCopy}
          title="Copy Code"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.06] transition-colors"
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
        </button>

        {/* Export */}
        <div className="relative">
          <button
            onClick={() => { setExportMenuIndex(-1); setExportOpen(!exportOpen); }}
            aria-expanded={exportOpen}
            aria-haspopup="menu"
            className="h-8 px-3 rounded-lg flex items-center gap-1.5 text-[11px] bg-foreground/[0.06] text-foreground/80 hover:bg-foreground/[0.1] transition-colors font-medium"
          >
            <Download size={13} />
            Export
            <ChevronDown size={11} />
          </button>
          {exportOpen && (
            <div ref={exportRef} role="menu" className="absolute right-0 top-full mt-1.5 w-52 bg-background border border-border rounded-xl shadow-xl py-1.5 z-50"
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") { e.preventDefault(); setExportMenuIndex(i => (i + 1) % EXPORT_FORMATS.length); }
                else if (e.key === "ArrowUp") { e.preventDefault(); setExportMenuIndex(i => (i - 1 + EXPORT_FORMATS.length) % EXPORT_FORMATS.length); }
                else if (e.key === "Enter" && exportMenuIndex >= 0) { e.preventDefault(); onExport(); setExportOpen(false); setExportMenuIndex(-1); }
              }}
            >
              {EXPORT_FORMATS.map((f, idx) => (
                <button
                  key={f.id}
                  role="menuitem"
                  ref={el => { if (el && idx === exportMenuIndex) el.focus(); }}
                  onClick={() => { onExport(); setExportOpen(false); setExportMenuIndex(-1); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-[11px] text-foreground/70 hover:bg-foreground/[0.04] hover:text-foreground transition-colors text-left"
                >
                  <FileCode size={14} className="text-muted-foreground/60" />
                  {f.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Shortcuts */}
        <button
          onClick={() => setShortcutsOpen(!shortcutsOpen)}
          title="Keyboard Shortcuts"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/50 hover:text-foreground/70 hover:bg-foreground/[0.06] transition-colors"
        >
          <Keyboard size={14} />
        </button>
      </div>

      {/* Shortcuts overlay */}
      {shortcutsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShortcutsOpen(false)} role="presentation">
          <div ref={shortcutsRef} role="dialog" aria-modal="true" aria-label="Keyboard Shortcuts" tabIndex={-1} className="bg-background border border-border rounded-2xl shadow-2xl p-6 w-80 outline-none" onClick={(e) => e.stopPropagation()}>
            <div className="text-sm font-semibold text-foreground mb-4" id="shortcuts-title">Keyboard Shortcuts</div>
            <div className="space-y-2">
              {[
                { keys: "⌘ 1 / 2 / 3", desc: "Switch view mode" },
                { keys: "⌘ B", desc: "Toggle sidebar" },
                { keys: "⌘ E", desc: "Toggle controls" },
                { keys: "⌘ C", desc: "Copy code" },
                { keys: "⌘ S", desc: "Export current format" },
                { keys: "Esc", desc: "Back to home" },
              ].map((s) => (
                <div key={s.desc} className="flex items-center justify-between py-1.5">
                  <span className="text-xs text-muted-foreground/60">{s.desc}</span>
                  <kbd className="text-[10px] font-mono bg-foreground/[0.06] text-foreground/60 px-2 py-0.5 rounded border border-border">
                    {s.keys}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
