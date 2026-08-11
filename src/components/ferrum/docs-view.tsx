"use client";

import {
  Search, Copy, Check, ChevronRight, Menu, ArrowLeft,
  Rocket, Layers, Puzzle, Sparkles, FileCode, Gauge, Shield,
  Terminal, Users, AlertTriangle, Info, Lightbulb, BookOpen, Palette,
} from "lucide-react";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/body-scroll-lock";
import { docSections, navGroups, type DocBlock } from "@/lib/docs-data";

/* ─── ICON MAP ─── */
const iconMap: Record<string, React.ElementType> = {
  Rocket, Layers, Puzzle, Sparkles, FileCode, Gauge, Shield, Terminal, Users, Palette,
};

/* ─── CODE BLOCK ─── */
function CodeBlock({ code, lang, caption }: { code: string; lang: string; caption?: string }) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => { return () => { if (timerRef.current) clearTimeout(timerRef.current); }; }, []);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      toast.success("Copied to clipboard");
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      toast.error("Failed to copy");
    });
  }, [code]);

  const langColor: Record<string, string> = {
    html: "text-orange-400/80",
    css: "text-blue-400/80",
    bash: "text-green-400/80",
    tsx: "text-cyan-400/80",
    typescript: "text-blue-400/80",
    vue: "text-emerald-400/80",
    svelte: "text-orange-400/80",
    text: "text-zinc-400/80",
  };

  return (
    <div className="my-6 rounded-2xl border border-border bg-foreground/[0.03] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/50 bg-foreground/[0.02]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
          </div>
          <span className={`text-[11px] font-mono font-medium ml-2 ${langColor[lang] || "text-zinc-400/60"}`}>
            {lang}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-2.5 rounded-md text-[11px] text-muted-foreground hover:text-foreground/70 hover:bg-foreground/[0.07] transition-all min-h-[44px]"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-[13px] leading-relaxed font-mono text-green-400/70 whitespace-pre">
          {code}
        </code>
      </pre>
      {caption && (
        <div className="px-4 py-2 border-t border-border/50 bg-foreground/[0.02]">
          <p className="text-[11px] text-muted-foreground/50">{caption}</p>
        </div>
      )}
    </div>
  );
}

/* ─── CALLOUT ─── */
function Callout({ variant, title, text }: { variant: "info" | "warning" | "tip"; title: string; text: string }) {
  const styles = {
    info: {
      border: "border-blue-500/20",
      bg: "bg-blue-500/[0.04]",
      icon: <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />,
      titleColor: "text-blue-300",
    },
    warning: {
      border: "border-amber-500/20",
      bg: "bg-amber-500/[0.04]",
      icon: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />,
      titleColor: "text-amber-300",
    },
    tip: {
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/[0.04]",
      icon: <Lightbulb className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />,
      titleColor: "text-emerald-300",
    },
  };
  const s = styles[variant];
  return (
    <div className={`my-6 flex gap-3 p-4 rounded-xl border ${s.border} ${s.bg}`}>
      {s.icon}
      <div>
        <p className={`text-sm font-semibold ${s.titleColor} mb-1`}>{title}</p>
        <p className="text-[13px] text-muted-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

/* ─── DATA TABLE ─── */
function DataTable({ headers, rows, caption }: { headers: string[]; rows: string[][]; caption?: string }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-foreground/[0.03]">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border/30 last:border-0 hover:bg-foreground/[0.02] transition-colors">
              {row.map((cell, j) => (
                <td key={j} className={`px-4 py-3 text-muted-foreground ${j === 0 ? "font-mono text-[12px] text-purple-300/70" : "text-[13px]"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {caption && (
        <div className="px-4 py-2.5 border-t border-border/50 bg-foreground/[0.02]">
          <p className="text-[11px] text-muted-foreground/40 italic">{caption}</p>
        </div>
      )}
    </div>
  );
}

/* ─── API BLOCK ─── */
function ApiBlock({ name, desc, params, returns }: { name: string; desc: string; params: { name: string; type: string; required?: boolean; default?: string; desc: string }[]; returns?: string }) {
  return (
    <div className="my-6 rounded-xl border border-border bg-foreground/[0.03] overflow-hidden">
      <div className="px-4 py-3 border-b border-border/50 bg-foreground/[0.02] flex items-center gap-2">
        <FileCode className="w-4 h-4 text-purple-400" />
        <code className="text-sm font-mono text-foreground/70">{name}</code>
      </div>
      <div className="p-4">
        <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">{desc}</p>
        {params.length > 0 && (
          <div className="space-y-3">
            {params.map((p) => (
              <div key={p.name} className="flex gap-3 items-start">
                <code className="text-[12px] font-mono text-emerald-400/70 shrink-0 mt-0.5 min-w-[140px]">{p.name}</code>
                <div className="flex-1">
                  <span className="text-[11px] font-mono text-muted-foreground/40 mr-2">({p.type})</span>
                  {p.required && <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-amber-500/30 text-amber-400/70 mr-2">required</Badge>}
                  {p.default && <span className="text-[11px] text-muted-foreground/40 mr-2">default: <code className="text-purple-300/60">{p.default}</code></span>}
                  <span className="text-[13px] text-muted-foreground">{p.desc}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {returns && (
          <div className="mt-4 pt-3 border-t border-border/50">
            <span className="text-[11px] text-muted-foreground/40">Returns: </span>
            <code className="text-[12px] font-mono text-blue-300/70">{returns}</code>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── CONTENT RENDERER ─── */
function DocContent({ blocks }: { blocks: DocBlock[] }) {
  return (
    <div>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="text-[14px] text-muted-foreground leading-[1.8] mb-6">
                {block.text}
              </p>
            );
          case "heading":
            if (block.level === 2) {
              return (
                <h2 key={i} className="text-2xl font-bold text-foreground tracking-tight mt-12 mb-4 first:mt-0">
                  {block.text}
                </h2>
              );
            }
            return (
              <h3 key={i} className="text-lg font-semibold text-foreground/80 mt-8 mb-3">
                {block.text}
              </h3>
            );
          case "code":
            return <CodeBlock key={i} code={block.code} lang={block.lang} caption={block.caption} />;
          case "callout":
            return <Callout key={i} variant={block.variant} title={block.title} text={block.text} />;
          case "list":
            const Tag = block.ordered ? "ol" : "ul";
            return (
              <Tag key={i} className={`my-4 space-y-2 ${block.ordered ? "list-decimal pl-5" : "list-disc pl-5"}`}>
                {block.items.map((item, j) => (
                  <li key={j} className="text-[13px] text-muted-foreground leading-relaxed pl-1">
                    {item}
                  </li>
                ))}
              </Tag>
            );
          case "table":
            return <DataTable key={i} headers={block.headers} rows={block.rows} caption={block.caption} />;
          case "api":
            return <ApiBlock key={i} name={block.name} desc={block.desc} params={block.params} returns={block.returns} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SIDEBAR
   ═══════════════════════════════════════════════════ */
function DocsSidebar({
  activeId,
  onSelect,
  onBack,
  searchQuery,
  onSearchChange,
  mobileOpen,
  onMobileClose,
}: {
  activeId: string;
  onSelect: (id: string) => void;
  onBack: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return navGroups;
    const q = searchQuery.toLowerCase();
    return navGroups
      .map((g) => ({
        ...g,
        items: g.items.filter((item) => item.title.toLowerCase().includes(q)),
      }))
      .filter((g) => g.items.length > 0);
  }, [searchQuery]);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Back button */}
      <div className="p-4 border-b border-border">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground/70 transition-colors w-full"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to site
        </button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search docs..."
            className="pl-9 h-8 text-[12px] bg-foreground/[0.04] border-border focus:border-purple-500/30 rounded-lg placeholder:text-muted-foreground/40"
          />
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          {filteredGroups.map((group) => (
            <div key={group.label} className="mb-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40 px-3 mb-2">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = activeId === item.id;
                  const section = docSections.find((s) => s.id === item.id);
                  const iconKey = section?.icon;
                  const Icon = (iconKey && iconMap[iconKey]) || BookOpen;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelect(item.id);
                        onMobileClose();
                      }}
                      aria-current={isActive ? "page" : undefined} className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-left text-[13px] transition-all ${
                        isActive
                          ? "bg-purple-500/10 text-foreground border border-purple-500/20"
                          : "text-muted-foreground hover:text-foreground/70 hover:bg-foreground/[0.04] border border-transparent"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-purple-400" : "text-muted-foreground/40"}`} />
                      <span className="truncate">{item.title}</span>
                      {isActive && <ChevronRight className="w-3 h-3 text-purple-400/50 ml-auto shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-[10px] text-muted-foreground/50">FerrumEngine v{process.env.NEXT_PUBLIC_VERSION || "1.0.0"}</p>
        <p className="text-[10px] text-muted-foreground/40 mt-0.5"><a href="https://github.com/roy-wanyoike/FerrumEngine/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground/60 transition-colors">MIT License</a></p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside aria-label="Documentation navigation" className="hidden lg:flex w-64 xl:w-72 flex-col border-r border-border bg-foreground/[0.02] h-screen sticky top-0 shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-[fadeIn_0.2s_ease-out]"
            onClick={onMobileClose}
            onKeyDown={(e) => { if (e.key === "Escape") onMobileClose(); }}
          />
        )}
        {mobileOpen && (
          <aside
            id="docs-sidebar" role="dialog" aria-modal="true" aria-label="Documentation navigation" className="fixed left-0 top-0 bottom-0 z-50 w-[280px] bg-background/95 backdrop-blur-sm border-r border-border lg:hidden animate-[slideInLeft_0.3s_cubic-bezier(0.22,1,0.36,1)]"
          >
            {sidebarContent}
          </aside>
        )}
    </>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN DOCS VIEW
   ═══════════════════════════════════════════════════ */
export function DocsView({ onBack }: { onBack: () => void }) {
  const [activeId, setActiveId] = useState("getting-started");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeSection = useMemo(
    () => docSections.find((s) => s.id === activeId) ?? docSections[0],
    [activeId]
  );

  const handleSelect = useCallback((id: string) => {
    setActiveId(id);
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  // Keyboard shortcut: Escape to go back
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
        onBack();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onBack]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileSidebarOpen) {
      lockBodyScroll();
      return () => unlockBodyScroll();
    }
  }, [mobileSidebarOpen]);

  // Update document title
  useEffect(() => {
    document.title = `${activeSection?.title ?? "Docs"} — FerrumEngine Docs`;
  }, [activeSection?.title]);

  const Icon = activeSection?.icon ? (iconMap[activeSection.icon] || BookOpen) : BookOpen;

  return (
    <div className="flex h-screen bg-background">
      <DocsSidebar
        activeId={activeId}
        onSelect={handleSelect}
        onBack={onBack}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile header */}
        <div className="lg:hidden shrink-0 sticky top-0 z-30 flex items-center gap-3 px-4 h-14 border-b border-border bg-background/80 backdrop-blur-xl">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            aria-label="Open docs menu"
            aria-expanded={mobileSidebarOpen}
            aria-controls="docs-sidebar"
            className="p-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] transition-all min-w-[44px] min-h-[44px]"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="w-4 h-4" />
            <span>Docs</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
            <span className="text-foreground/70">{activeSection?.title}</span>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex-1 min-h-0 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 sm:px-10 py-12 lg:py-16">
            {/* Section header */}
            <div
              key={activeId}
              className="animate-[fadeSlideUp_0.3s_ease-out]"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-purple-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">{activeSection?.title}</h1>
                    {activeSection?.label && (
                      <Badge variant="outline" className="text-[10px] px-2 py-0.5 border-purple-500/30 text-purple-400">
                        {activeSection.label}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Content blocks */}
              <DocContent blocks={activeSection?.content ?? []} />

              {/* Bottom navigation */}
              {(() => {
                const allIds = docSections.map((s) => s.id);
                const idx = allIds.indexOf(activeId);
                const prev = idx > 0 ? docSections[idx - 1] : null;
                const next = idx < allIds.length - 1 ? docSections[idx + 1] : null;
                return (
                  <div className="mt-16 pt-8 border-t border-border flex items-center justify-between gap-4">
                    {prev ? (
                      <button
                        onClick={() => handleSelect(prev.id)}
                        className="flex items-center gap-2 text-sm text-muted-foreground/70 hover:text-foreground/60 transition-colors group"
                      >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                        <div className="text-left">
                          <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">Previous</div>
                          <div>{prev.title}</div>
                        </div>
                      </button>
                    ) : <div />}
                    {next ? (
                      <button
                        onClick={() => handleSelect(next.id)}
                        className="flex items-center gap-2 text-sm text-muted-foreground/70 hover:text-foreground/60 transition-colors group ml-auto"
                      >
                        <div className="text-right">
                          <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">Next</div>
                          <div>{next.title}</div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ) : <div />}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}