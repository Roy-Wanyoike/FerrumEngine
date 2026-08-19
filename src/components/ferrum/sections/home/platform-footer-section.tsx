"use client";

import { GitBranch, Heart, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FerrumLogo } from "@/components/logo";

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 11 — FOOTER
   ═══════════════════════════════════════════════════════════════════════════ */

export function PlatformFooter() {
  const router = useRouter();

  const scrollToHash = useCallback((e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    router.push("/");
    setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }, [router]);

  const columns = [
    { title: "Platform", links: [
      { label: "Effects Gallery", href: "/effects" },
      { label: "Playground", href: "/playground" },
      { label: "Architecture", href: "/architecture" },
      { label: "Roadmap", href: "/#roadmap", hash: "#roadmap" },
    ]},
    { title: "Developers", links: [
      { label: "GitHub", href: "https://github.com/roy-wanyoike/FerrumEngine", external: true },
      { label: "Documentation", href: "/docs" },
      { label: "CSS Download", href: "/api/css?all=true&minified=true" },
      { label: "Contributing", href: "https://github.com/roy-wanyoike/FerrumEngine", external: true },
    ]},
    { title: "Resources", links: [
      { label: "Examples", href: "/#examples", hash: "#examples" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "Community", href: "/#community", hash: "#community" },
      { label: "Quick Start", href: "/#developer-journey", hash: "#developer-journey" },
    ]},
  ];

  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <FerrumLogo size={32} className="w-8 h-8" />
              <span className="text-lg font-bold text-foreground tracking-tight">
                Ferrum<span className="text-muted-foreground font-medium">Engine</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground/60 leading-relaxed max-w-xs">
              The universal UI platform. Motion, VFX, components, tokens, and compiler — unified.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a href="https://github.com/roy-wanyoike/FerrumEngine" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-muted-foreground/60 hover:text-foreground hover:bg-foreground/[0.06] border border-border/50 hover:border-border transition-all">
                <GitBranch className="w-4 h-4" />
                <span className="text-xs font-medium">GitHub</span>
                <ExternalLink className="w-3 h-3 opacity-40" />
              </a>
              <a href="https://github.com/roy-wanyoike/FerrumEngine/sponsor" target="_blank" rel="noopener noreferrer"
                aria-label="Sponsor FerrumEngine on GitHub"
                className="p-2 rounded-lg text-pink-400/50 hover:text-pink-400 hover:bg-pink-500/10 transition-all">
                <Heart className="w-4 h-4" />
              </a>
            </div>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={`${col.title} links`}>
              <h4 className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => {
                  if ('hash' in l && l.hash) {
                    return (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          onClick={(e) => scrollToHash(e, l.hash)}
                          className="text-sm text-muted-foreground/65 hover:text-foreground transition-colors"
                        >
                          {l.label}
                        </a>
                      </li>
                    );
                  }
                  return (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-muted-foreground/65 hover:text-foreground transition-colors"
                        {...((l as { external?: boolean }).external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <p className="text-xs text-muted-foreground/65">MIT License · Open Source</p>
            <span className="text-muted-foreground/60">|</span>
            <a href="https://github.com/roy-wanyoike/FerrumEngine" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted-foreground/65 hover:text-purple-400 transition-colors"
            >
              <GitBranch className="w-3 h-3" />
              github.com/roy-wanyoike/FerrumEngine
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/65">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-pink-400/60 fill-pink-400/60" />
            <span>by</span>
            <a href="https://github.com/roy-wanyoike" target="_blank" rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground/80 font-medium transition-colors">Roy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
