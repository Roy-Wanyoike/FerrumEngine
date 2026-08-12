"use client";

import {
  Rocket, Bug, Wrench, Sparkles, ArrowDown,
  XCircle, AlertTriangle, ShieldCheck, Calendar, Tag,
} from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "./sections/section-helpers";
import { changelog, type ChangelogEntry, type ChangelogChange } from "@/lib/changelog-data";

/* ═══════════════════════════════════════════════════════════════
   CHANGELOG VIEW — Release history & updates
   ═══════════════════════════════════════════════════════════════ */

type ChangeType = ChangelogChange["type"];

const CHANGE_TYPE_CONFIG: Record<ChangeType, { label: string; icon: React.ElementType; color: string }> = {
  added: { label: "Added", icon: Sparkles, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  fixed: { label: "Fixed", icon: Bug, color: "text-rose-400 bg-rose-500/10 border-rose-500/20" },
  changed: { label: "Changed", icon: Wrench, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  deprecated: { label: "Deprecated", icon: AlertTriangle, color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
  removed: { label: "Removed", icon: XCircle, color: "text-red-400 bg-red-500/10 border-red-500/20" },
  security: { label: "Security", icon: ShieldCheck, color: "text-sky-400 bg-sky-500/10 border-sky-500/20" },
};

const VERSION_TYPE_CONFIG: Record<ChangelogEntry["type"], { label: string; color: string; dotColor: string }> = {
  major: { label: "Major", color: "bg-orange-500/15 text-orange-400 border-orange-500/30", dotColor: "bg-orange-400" },
  minor: { label: "Minor", color: "bg-purple-500/15 text-purple-400 border-purple-500/30", dotColor: "bg-purple-400" },
  patch: { label: "Patch", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", dotColor: "bg-emerald-400" },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ═══════════════════════════════════════════════════════════════
   CHANGELOG VIEW COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export function ChangelogView() {
  const [activeFilter, setActiveFilter] = useState<ChangeType | "all">("all");

  const filteredChangelog = changelog.map((entry) => {
    if (activeFilter === "all") return entry;
    const filteredChanges = entry.changes
      .map((change) => (change.type === activeFilter ? change : { type: change.type, items: [] }))
      .filter((c) => c.items.length > 0);
    return { ...entry, changes: filteredChanges };
  }).filter((entry) => entry.changes.length > 0);

  const latestEntry = changelog[0];
  if (!latestEntry) return null;
  const latestConfig = VERSION_TYPE_CONFIG[latestEntry.type];
  const latestAddedCount = latestEntry.changes.find((c) => c.type === "added")?.items.length ?? 0;
  const latestFixedCount = latestEntry.changes.find((c) => c.type === "fixed")?.items.length ?? 0;

  const changeTypes: (ChangeType | "all")[] = ["all", "added", "fixed", "changed", "deprecated", "removed", "security"];

  return (
    <div className="pt-20 pb-20 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="pt-12 pb-8">
          <SectionHeader
            label="Changelog"
            title="Release History"
            subtitle="Every improvement, fix, and new feature across all versions of FerrumEngine."
          />
        </div>

        {/* What's New — Latest release highlight */}
        <div className="mb-12 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/[0.06] via-transparent to-pink-500/[0.04] p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Rocket className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-foreground">What&apos;s New</h2>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${latestConfig.color}`}>
              v{latestEntry.version}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{latestEntry.title}</h3>
          <p className="text-muted-foreground/70 leading-relaxed mb-4">{latestEntry.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground/50">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(latestEntry.date)}</span>
            </div>
            {latestAddedCount > 0 && (
              <div className="flex items-center gap-1.5 text-emerald-400/70">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{latestAddedCount} new features</span>
              </div>
            )}
            {latestFixedCount > 0 && (
              <div className="flex items-center gap-1.5 text-rose-400/70">
                <Bug className="w-3.5 h-3.5" />
                <span>{latestFixedCount} fixes</span>
              </div>
            )}
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 mb-10 flex-wrap">
          <Tag className="w-4 h-4 text-muted-foreground/40" />
          {changeTypes.map((type) => {
            if (type === "all") {
              return (
                <button
                  key="all"
                  onClick={() => setActiveFilter("all")}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border ${
                    activeFilter === "all"
                      ? "bg-foreground/10 text-foreground border-foreground/20"
                      : "bg-foreground/[0.03] text-muted-foreground/60 border-border/50 hover:bg-foreground/[0.05]"
                  }`}
                >
                  All
                </button>
              );
            }
            const config = CHANGE_TYPE_CONFIG[type];
            const Icon = config.icon;
            return (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  activeFilter === type
                    ? config.color
                    : "bg-foreground/[0.03] text-muted-foreground/60 border-border/50 hover:bg-foreground/[0.05]"
                }`}
              >
                <Icon className="w-3 h-3" />
                {config.label}
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border/50" />

          <div className="space-y-8">
            {filteredChangelog.map((entry) => {
              const vConfig = VERSION_TYPE_CONFIG[entry.type];
              return (
                <div key={entry.version} className="relative pl-10">
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-2 w-[31px] h-[31px] rounded-full border-2 ${vConfig.color} flex items-center justify-center bg-background`}>
                    <div className={`w-2.5 h-2.5 rounded-full ${vConfig.dotColor}`} />
                  </div>

                  {/* Content card */}
                  <div className="rounded-2xl border border-border/50 bg-foreground/[0.015] p-5 sm:p-6 hover:bg-foreground/[0.025] transition-colors">
                    {/* Version + date header */}
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${vConfig.color}`}>
                        v{entry.version}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium border ${vConfig.color}`}>
                        {vConfig.label}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground/40">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(entry.date)}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-2">{entry.title}</h3>
                    <p className="text-sm text-muted-foreground/60 leading-relaxed mb-5">{entry.description}</p>

                    {/* Change groups */}
                    <div className="space-y-4">
                      {entry.changes.map((change) => {
                        const cConfig = CHANGE_TYPE_CONFIG[change.type];
                        const CIcon = cConfig.icon;
                        return (
                          <div key={change.type}>
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-6 h-6 rounded-md flex items-center justify-center border ${cConfig.color}`}>
                                <CIcon className="w-3.5 h-3.5" />
                              </div>
                              <span className={`text-xs font-semibold ${cConfig.color.split(" ")[0]}`}>
                                {cConfig.label}
                              </span>
                              <span className="text-xs text-muted-foreground/30">({change.items.length})</span>
                            </div>
                            <ul className="space-y-1.5 ml-8">
                              {change.items.map((item, i) => (
                                <li key={i} className="text-sm text-muted-foreground/70 leading-relaxed">
                                  <span className="text-muted-foreground/30 mr-2">•</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* End of timeline */}
          <div className="relative pl-10 pt-4">
            <div className="absolute left-0 top-0 w-[31px] h-[31px] rounded-full border-2 border-border bg-background flex items-center justify-center">
              <ArrowDown className="w-3.5 h-3.5 text-muted-foreground/30" />
            </div>
            <p className="text-sm text-muted-foreground/30 italic">Earlier releases available on GitHub</p>
          </div>
        </div>
      </div>
    </div>
  );
}