"use client";

import { GitBranch, Heart, ExternalLink } from "lucide-react";

interface FooterProps {
  onOpenDocs: () => void;
  onNavigateHome?: () => void;
  onNavigateEffects?: () => void;
  currentView?: string;
}

export function Footer({ onOpenDocs, onNavigateHome, onNavigateEffects, currentView = "home" }: FooterProps) {
  const scrollTo = (href: string) => {
    if (currentView !== "home" && onNavigateHome) {
      onNavigateHome();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.querySelector(href);
          if (el) {
            const navH = 80;
            const y = el.getBoundingClientRect().top + window.scrollY - navH;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        });
      });
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      const navH = 80;
      const y = el.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const columns = [
    { title: "Product", links: [
      { label: "Effects Gallery", action: "effects" as const },
      { label: "Playground", href: "#playground-section" },
      { label: "Documentation", action: "docs" as const },
      { label: "Comparison", href: "#comparison" },
      { label: "Roadmap", href: "#roadmap" },
    ]},
    { title: "Developers", links: [
      { label: "Documentation", action: "docs" as const },
      { label: "GitHub Repo", href: "https://github.com/roy-wanyoike/FerrumEngine" },
      { label: "Architecture", href: "#platform-layers" },
      { label: "CSS Download", href: "/api/css?format=all" },
    ]},
    { title: "Resources", links: [
      { label: "Examples", href: "#playground-section" },
      { label: "Principles", href: "#principles" },
      { label: "Roadmap", href: "#roadmap" },
      { label: "Quick Start", action: "docs" as const },
    ]},
  ];

  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo + Author */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="FerrumEngine" className="w-8 h-8" />
              <span className="text-lg font-bold text-foreground tracking-tight">
                Ferrum<span className="text-muted-foreground font-medium">Engine</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground/60 leading-relaxed max-w-xs">
              A complete frontend platform — motion, VFX, components, utilities, tokens,
              and 8 framework adapters.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a href="https://github.com/roy-wanyoike/FerrumEngine" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.06] border border-border/50 hover:border-border transition-all">
                <GitBranch className="w-4 h-4" />
                <span className="text-xs font-medium">GitHub</span>
                <ExternalLink className="w-3 h-3 opacity-40" />
              </a>
              <a href="https://github.com/roy-wanyoike/FerrumEngine/sponsor" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-pink-400/50 hover:text-pink-400 hover:bg-pink-500/10 transition-all">
                <Heart className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {"action" in l && l.action === "docs" ? (
                      <button onClick={onOpenDocs} className="text-sm text-muted-foreground/50 hover:text-foreground transition-colors">{l.label}</button>
                    ) : "action" in l && l.action === "effects" ? (
                      <button onClick={onNavigateEffects} className="text-sm text-muted-foreground/50 hover:text-foreground transition-colors">{l.label}</button>
                    ) : "href" in l && l.href.startsWith("#") ? (
                      <button onClick={() => scrollTo(l.href)} className="text-sm text-muted-foreground/50 hover:text-foreground transition-colors">{l.label}</button>
                    ) : (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground/50 hover:text-foreground transition-colors">{l.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <p className="text-xs text-muted-foreground/50">MIT License · Open Source</p>
            <span className="text-muted-foreground/40">|</span>
            <a
              href="https://github.com/roy-wanyoike/FerrumEngine"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground/50 hover:text-purple-400 transition-colors"
            >
              <GitBranch className="w-3 h-3" />
              github.com/roy-wanyoike/FerrumEngine
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/50">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-pink-400/60 fill-pink-400/60" />
            <span>by</span>
            <a
              href="https://github.com/roy-wanyoike"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground/80 font-medium transition-colors"
            >
              Roy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}