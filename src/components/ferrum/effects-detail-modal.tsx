"use client";

import {
  Heart,
  Copy,
  Check,
} from "lucide-react";
import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { EffectPreview } from "@/components/ferrum/effect-preview";
import { Badge } from "@/components/ui/badge";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/body-scroll-lock";
import type { FerrumEffectIndex } from "@/lib/ferrum-effects-index";


/* ════════════════════════════════════════════════════════════════
   CSS-NATIVE PRIMITIVES (replacing Radix UI)
   ════════════════════════════════════════════════════════════════ */

/* ─── Modal (replaces Radix Dialog) ─── */
function Modal({ open, onClose, children, className }: { open: boolean; onClose: () => void; children: React.ReactNode; className?: string }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Body scroll lock — isolated to depend only on `open`
  useEffect(() => {
    if (open) {
      lockBodyScroll();
      return () => unlockBodyScroll();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    // Store the previously focused element
    previousFocusRef.current = document.activeElement as HTMLElement;
    // Focus the dialog
    const dialog = dialogRef.current;
    if (dialog) {
      // Focus first focusable element inside dialog
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) {
        focusable[0]?.focus();
      } else {
        dialog.focus();
      }
    }
    // Focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
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
      // Return focus to trigger
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose} role="presentation">
      <div className="fixed inset-0 bg-black/50" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        className={"relative z-10 bg-background rounded-2xl border border-border p-6 shadow-2xl max-w-2xl max-h-[85vh] overflow-y-auto outline-none " + (className || "")}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

/* ─── Tabs (replaces Radix Tabs) ─── */
function FerrumTabs({ value, onValueChange, children, className }: { value: string; onValueChange: (v: string) => void; children: React.ReactNode; className?: string }) {
  const tabListRef = useRef<HTMLDivElement>(null);
  const tabValues = React.Children.toArray(children).map((child) => {
    if (React.isValidElement(child) && (child.type as typeof TabTrigger) === TabTrigger) {
      return (child.props as { value: string }).value;
    }
    return null;
  }).filter(Boolean) as string[];

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const idx = tabValues.indexOf(value);
    if (idx === -1) return;
    let newIdx = idx;
    if (e.key === "ArrowRight") { newIdx = (idx + 1) % tabValues.length; e.preventDefault(); }
    else if (e.key === "ArrowLeft") { newIdx = (idx - 1 + tabValues.length) % tabValues.length; e.preventDefault(); }
    else if (e.key === "Home") { newIdx = 0; e.preventDefault(); }
    else if (e.key === "End") { newIdx = tabValues.length - 1; e.preventDefault(); }
    else return;
    onValueChange(tabValues[newIdx]!);
    const tabs = tabListRef.current?.querySelectorAll<HTMLElement>("[role=\"tab\"]");
    tabs?.[newIdx]?.focus();
  }, [value, tabValues, onValueChange]);

  return <div ref={tabListRef} role="tablist" onKeyDown={handleKeyDown} className={"flex items-center gap-1 bg-foreground/[0.04] rounded-lg p-1 " + (className || "")}>{children}</div>;
}
function TabTrigger({ value, active, onValueChange, children }: { value: string; active: string; onValueChange: (v: string) => void; children: React.ReactNode }) {
  const isActive = active === value;
  return (
    <button
      id={`tab-${value}`}
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      onClick={() => onValueChange(value)}
      className={"px-3 py-1.5 rounded-md text-xs font-medium transition-all " + (isActive ? "bg-foreground text-background" : "text-muted-foreground/60 hover:text-foreground")}
    >
      {children}
    </button>
  );
}
function TabContent({ value, active, children }: { value: string; active: string; children: React.ReactNode }) {
  if (value !== active) return null;
  return <div role="tabpanel" aria-labelledby={`tab-${value}`}>{children}</div>;
}

/* ════════════════════════════════════════════════════════════════
   EFFECT DETAIL MODAL
   ════════════════════════════════════════════════════════════════ */
/* ─── Category-based lazy loading (replaces full-data dynamic import) ─── */
import { getEffectCSS } from "@/lib/effects/lazy-loader";

function EffectDetailModal({ effect, open, onClose, onAddCollection, isInCollection }: {
  effect: FerrumEffectIndex | null; open: boolean; onClose: () => void; onAddCollection: (cn: string) => void; isInCollection: boolean;
}) {
  const [tab, setTab] = useState("css");
  const [copied, setCopied] = useState(false);
  const [css, setCss] = useState<string | null>(null);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open || !effect) { setCss(null); return; }
    let cancelled = false;
    const className = effect?.className;
    if (!className) return;
    getEffectCSS(effect.category, className).then((css) => {
      if (cancelled) return;
      setCss(css || "/* CSS not found */");
    }).catch(() => {
      if (!cancelled) setCss("/* Error loading CSS */");
    });
    return () => { cancelled = true; };
  }, [open, effect]);

  useEffect(() => { return () => { if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current); }; }, []);
  const copy = (text: string) => { navigator.clipboard.writeText(text).then(() => { setCopied(true); toast.success("Copied!"); if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current); copiedTimerRef.current = setTimeout(() => setCopied(false), 2000); }).catch(() => { toast.error("Failed to copy"); }); };

  // Memoized code strings — hooks called unconditionally before the null guard;
  // effect?.className provides a safe fallback when effect is null.
  const effectClassName = effect?.className || "";

  const cssUsage = useMemo(() => "<div class=\"" + effectClassName + "\">\n  <!-- Your content -->\n</div>", [effectClassName]);

  const reactCode = useMemo(() => "import '@/styles/ferrum.css';\n\nexport default function Component() {\n  return (\n    <div className=\"" + effectClassName + "\">\n      {/* Your content */}\n    </div>\n  );\n}", [effectClassName]);

  const vueCode = useMemo(() => "<template>\n  <div class=\"" + effectClassName + "\">\n    <!-- Your content -->\n  </div>\n</template>\n\n<style>\n@import '@/styles/ferrum.css';\n</style>", [effectClassName]);

  const handleCopyTab = useCallback(() => {
    if (tab === "css") copy(css || "");
    else if (tab === "usage") copy(cssUsage);
    else if (tab === "react") copy(reactCode);
    else copy(vueCode);
  }, [tab, css, cssUsage, reactCode, vueCode]);

  if (!effect) return null;

  return (
    <Modal open={open} onClose={onClose} className="max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">{effect.name}</h2>
        <button onClick={() => onAddCollection(effect.className)} className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-foreground/[0.04] hover:bg-foreground/[0.08] text-xs transition-colors min-h-[44px]">
          <Heart className={"w-3.5 h-3.5 " + (isInCollection ? "text-pink-500" : "")} fill={isInCollection ? "currentColor" : "none"} />
          {isInCollection ? "Saved" : "Save"}
        </button>
      </div>
      <div className="mb-4">
        <EffectPreview effect={effect} />
      </div>
      <div className="flex items-center gap-2 mb-3">
        <code className="text-xs font-mono text-muted-foreground/50 bg-foreground/[0.04] px-2.5 py-1 rounded">{effect.className}</code>
        <Badge variant="secondary" className="text-[10px]">{effect.category}</Badge>
      </div>
      <div className="flex items-center justify-between mb-3">
        <FerrumTabs value={tab} onValueChange={setTab}>
          <TabTrigger value="css" active={tab} onValueChange={setTab}>CSS</TabTrigger>
          <TabTrigger value="usage" active={tab} onValueChange={setTab}>Usage</TabTrigger>
          <TabTrigger value="react" active={tab} onValueChange={setTab}>React</TabTrigger>
          <TabTrigger value="vue" active={tab} onValueChange={setTab}>Vue</TabTrigger>
        </FerrumTabs>
        <button onClick={handleCopyTab} className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-foreground/[0.04] hover:bg-foreground/[0.08] text-xs transition-colors min-h-[44px]">
          {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <TabContent value="css" active={tab}><pre className="text-xs font-mono text-muted-foreground/70 bg-foreground/[0.03] p-4 rounded-xl overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">{css || "Loading..."}</pre></TabContent>
      <TabContent value="usage" active={tab}><pre className="text-xs font-mono text-muted-foreground/70 bg-foreground/[0.03] p-4 rounded-xl overflow-x-auto">{cssUsage}</pre></TabContent>
      <TabContent value="react" active={tab}><pre className="text-xs font-mono text-muted-foreground/70 bg-foreground/[0.03] p-4 rounded-xl overflow-x-auto">{reactCode}</pre></TabContent>
      <TabContent value="vue" active={tab}><pre className="text-xs font-mono text-muted-foreground/70 bg-foreground/[0.03] p-4 rounded-xl overflow-x-auto">{vueCode}</pre></TabContent>
    </Modal>
  );
}

export { EffectDetailModal };
export type { FerrumEffectIndex };
