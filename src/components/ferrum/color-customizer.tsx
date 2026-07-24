"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Palette, X, Check, RotateCcw } from "lucide-react";

/* ═══════════════════════════════════════════════════════════════
   COLOR CUSTOMIZER — Pick a color, rewrite CSS live
   Key feature: users customize the accent color for effects
   ═══════════════════════════════════════════════════════════════ */

const presetColors = [
  "#a855f7", "#7c3aed", "#6d28d9", "#ec4899", "#db2777", "#be185d",
  "#f97316", "#ea580c", "#dc2626", "#ef4444", "#f59e0b", "#eab308",
  "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6",
  "#6366f1", "#8b5cf6", "#d946ef", "#f43f5e", "#84cc16", "#a3e635",
];

const STORAGE_KEY = "ferrum-custom-color";
const CSS_VAR = "--ferrum-accent";

function isValidHex(hex: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);
}

function normalizeHex(hex: string): string {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return `#${h}`;
}

function hexToHsl(hex: string): string {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

/* ─── Hook ─── */

export function useCustomColor() {
  const [color, setColorState] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && isValidHex(stored)) {
        setColorState(normalizeHex(stored));
        document.documentElement.style.setProperty(CSS_VAR, stored);
      }
    } catch { /* */ }
  }, []);

  const setColor = useCallback((hex: string) => {
    if (!isValidHex(hex)) return;
    const normalized = normalizeHex(hex);
    setColorState(normalized);
    document.documentElement.style.setProperty(CSS_VAR, normalized);
    try { localStorage.setItem(STORAGE_KEY, normalized); } catch { /* */ }
  }, []);

  const resetColor = useCallback(() => {
    setColorState(null);
    document.documentElement.style.removeProperty(CSS_VAR);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* */ }
  }, []);

  return { color, setColor, resetColor };
}

/* ─── Component ─── */

export function ColorCustomizer() {
  const [open, setOpen] = useState(false);
  const [hexInput, setHexInput] = useState("");
  const { color, setColor, resetColor } = useCustomColor();
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  // Focus hex input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const handleHexSubmit = useCallback(() => {
    if (isValidHex(hexInput)) {
      setColor(hexInput);
    }
  }, [hexInput, setColor]);

  const activeColor = color || "#a855f7";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="relative flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.04] transition-colors"
        title="Customize accent color"
      >
        <Palette className="w-4 h-4" />
        {color && (
          <span
            className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background"
            style={{ backgroundColor: color }}
          />
        )}
        <span className="sr-only">Customize color</span>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-border bg-background/95 backdrop-blur-2xl shadow-xl shadow-background/30 overflow-hidden z-[60] p-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-foreground">Accent Color</span>
            <div className="flex items-center gap-1">
              {color && (
                <button
                  onClick={resetColor}
                  className="p-1 rounded-md text-muted-foreground/50 hover:text-foreground hover:bg-foreground/[0.04] transition-colors"
                  title="Reset to default"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-md text-muted-foreground/50 hover:text-foreground hover:bg-foreground/[0.04] transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Active color preview */}
          <div className="flex items-center gap-3 mb-4 p-2.5 rounded-lg bg-foreground/[0.03] border border-border/50">
            <div
              className="w-8 h-8 rounded-lg border border-border/50 shadow-inner transition-colors duration-300"
              style={{ backgroundColor: activeColor }}
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-mono font-medium text-foreground">{activeColor.toUpperCase()}</div>
              <div className="text-[10px] text-muted-foreground/60">hsl({hexToHsl(activeColor)})</div>
            </div>
            {color && (
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
          </div>

          {/* Preset palette */}
          <div className="grid grid-cols-8 gap-1.5 mb-4">
            {presetColors.map((c) => (
              <button
                key={c}
                onClick={() => { setColor(c); setHexInput(c); }}
                className={`w-6 h-6 rounded-md border transition-all duration-200 hover:scale-110 ${
                  color === c
                    ? "border-foreground/40 ring-2 ring-foreground/20 scale-110"
                    : "border-border/50 hover:border-foreground/20"
                }`}
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
          </div>

          {/* Hex input */}
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground/40 font-mono">#</span>
              <input
                ref={inputRef}
                type="text"
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleHexSubmit(); }}
                placeholder="a855f7"
                maxLength={7}
                className="w-full pl-7 pr-2 py-1.5 rounded-lg bg-foreground/[0.04] border border-border/50 text-xs font-mono text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-colors"
              />
            </div>
            <button
              onClick={handleHexSubmit}
              disabled={!isValidHex(hexInput)}
              className="px-3 py-1.5 rounded-lg bg-foreground/[0.06] hover:bg-foreground/[0.08] text-xs font-medium text-foreground/70 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-all border border-border/50"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}