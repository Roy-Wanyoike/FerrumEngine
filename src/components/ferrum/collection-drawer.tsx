"use client";

import {
  Copy, X, Trash2,
} from "lucide-react";
import { useRef, useEffect, memo, type ReactNode } from "react";
import { toast } from "sonner";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/body-scroll-lock";
import { effects as effectsIndex } from "@/lib/ferrum-effects-index";


/* ════════════════════════════════════════════════════════════════
   CSS-NATIVE PRIMITIVES (replacing Radix UI)
   ════════════════════════════════════════════════════════════════ */

/* ─── Drawer (replaces Radix Sheet) ─── */
function Drawer({ open, onClose, side, children, title }: { open: boolean; onClose: (o: boolean) => void; side: "left" | "right"; children: ReactNode; title: string }) {
  // Skip expensive subtree when closed — only render the slide-off wrapper
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const slideX = side === "right" ? "translateX(100%)" : "translateX(-100%)";
  const maxW = side === "right" ? "32rem" : "28rem";

  // Body scroll lock — isolated to depend only on `open`
  useEffect(() => {
    if (open) {
      lockBodyScroll();
      return () => unlockBodyScroll();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    previousFocusRef.current = document.activeElement as HTMLElement;
    const drawer = drawerRef.current;
    if (drawer) {
      const focusable = drawer.querySelectorAll<HTMLElement>(
        'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) focusable[0]?.focus();
      else drawer.focus();
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(false); return; }
      if (e.key !== "Tab" || !drawer) return;
      const focusable = drawer.querySelectorAll<HTMLElement>(
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
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  return (
    <>
      {open && <div className="fixed inset-0 z-50 bg-black/50" onClick={() => onClose(false)} aria-hidden="true" />}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={"fixed top-0 z-50 h-full bg-background border-border overflow-y-auto transition-transform duration-300 outline-none " + (side === "right" ? "right-0" : "left-0")}
        style={{ transform: open ? "translateX(0)" : slideX, maxWidth: maxW, width: "100%", padding: "1.5rem" }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-6">{title}</h2>
        {open ? children : null}
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════════
   COLLECTION DRAWER
   ════════════════════════════════════════════════════════════════ */
const CollectionDrawer = memo(function CollectionDrawer({ open, onClose, collection, onRemove, onClear }: {
  open: boolean; onClose: (o: boolean) => void; collection: string[]; onRemove: (cn: string) => void; onClear: () => void;
}) {
  const copyAll = () => {
    if (!collection.length) return;
    const text = collection.map((cn) => {
      const e = effectsIndex.find((x) => x.className === cn);
      return "<!-- " + (e?.name || cn) + " -->\n<div class=\"" + cn + "\"></div>";
    }).join("\n\n");
    navigator.clipboard.writeText(text).then(() => {
      toast.success("All effects copied!");
    }).catch(() => {
      toast.error("Failed to copy all effects");
    });
  };
  return (
    <Drawer open={open} onClose={onClose} side="left" title={"Saved Effects (" + collection.length + ")"}>
      <div className="space-y-3">
        {collection.length > 0 && (
          <div className="flex gap-2">
            <button onClick={copyAll} className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-foreground/[0.06] hover:bg-foreground/[0.1] text-xs font-medium transition-colors min-h-[44px]"><Copy className="w-3.5 h-3.5" />Copy All</button>
            <button onClick={onClear} className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive text-xs font-medium transition-colors min-h-[44px]"><Trash2 className="w-3.5 h-3.5" />Clear</button>
          </div>
        )}
        <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 200px)" }}>
          <div className="space-y-1">
            {collection.length === 0 && <p className="text-sm text-muted-foreground/65 text-center py-8">No saved effects yet. Click the heart icon on any effect to save it.</p>}
            {collection.map((cn) => {
              const e = effectsIndex.find((x) => x.className === cn);
              return (
                <div key={cn} className="flex items-center justify-between p-3 rounded-lg hover:bg-foreground/[0.03] group">
                  <div>
                    <div className="text-sm font-medium text-foreground">{e?.name || cn}</div>
                    <code className="text-[11px] font-mono text-muted-foreground/40">{cn}</code>
                  </div>
                  <button onClick={() => onRemove(cn)} className="p-2.5 rounded-lg text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 transition-all focus:opacity-100 min-w-[44px] min-h-[44px]" aria-label={`Remove ${e?.name || cn} from saved`}><X className="w-3.5 h-3.5" /></button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Drawer>
  );
});

export { CollectionDrawer };
