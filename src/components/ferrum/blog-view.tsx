"use client";

import {
  Calendar, Clock, ArrowRight, Tag, Search, User,
  ChevronLeft, ChevronRight, ArrowLeft,
} from "lucide-react";
import { useState, useMemo } from "react";
import { SectionHeader } from "./sections/section-helpers";
import { blogPosts, type BlogPost } from "@/lib/blog-data";

/* ═══════════════════════════════════════════════════════════════
   BLOG VIEW — News, engineering posts, release announcements
   ═══════════════════════════════════════════════════════════════ */

const CATEGORIES = ["All", "Engineering", "Design", "Release", "Community"] as const;

type CategoryFilter = (typeof CATEGORIES)[number];

/* ── Helper: format date ── */
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ── Helper: render content blocks ── */
function renderContentBlock(block: string, idx: number) {
  // Code block
  if (block.startsWith("```")) {
    const lines = block.split("\n");
    const lang = lines[0]?.replace("```", "").trim() ?? "";
    const code = lines.slice(1, -1).join("\n");
    return (
      <div key={idx} className="my-6 rounded-xl border border-border/50 bg-foreground/[0.03] overflow-hidden">
        {lang && (
          <div className="px-4 py-2 border-b border-border/50 bg-foreground/[0.02]">
            <span className="text-xs font-mono text-muted-foreground/60">{lang}</span>
          </div>
        )}
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm font-mono text-foreground/80 leading-relaxed">{code}</code>
        </pre>
      </div>
    );
  }

  // Blockquote
  if (block.startsWith("> ")) {
    const quoteText = block.replace(/^> /gm, "").trim();
    return (
      <blockquote key={idx} className="my-6 pl-4 border-l-2 border-purple-500/50 italic text-muted-foreground/80">
        <p className="leading-relaxed whitespace-pre-line">{quoteText}</p>
      </blockquote>
    );
  }

  // Heading
  if (block.startsWith("### ")) {
    return (
      <h2 key={idx} className="mt-10 mb-4 text-2xl font-bold text-foreground">
        {block.replace("### ", "")}
      </h2>
    );
  }

  // Unordered list items
  if (block.startsWith("- **")) {
    const items = block.split("\n").filter((l) => l.startsWith("- "));
    return (
      <ul key={idx} className="my-4 space-y-2">
        {items.map((item, i) => {
          const match = item.match(/^- \*\*(.+?)\*\*:?(.*)/);
          return (
            <li key={i} className="flex gap-3 text-muted-foreground/80">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0" />
              <span>
                <strong className="text-foreground font-semibold">{match?.[1]}</strong>
                {match?.[2] && `: ${match[2]}`}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }

  // Regular paragraph
  return (
    <p key={idx} className="my-4 text-lg leading-relaxed text-muted-foreground/80">
      {block}
    </p>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BLOG VIEW COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export function BlogView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  /* ── Filtered posts ── */
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const featuredPost = filteredPosts.find((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured);

  /* ── Post detail navigation ── */
  const postIndex = selectedPost ? blogPosts.findIndex((p) => p.slug === selectedPost.slug) : -1;
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  /* ── Detail view ── */
  if (selectedPost) {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          {/* Back button */}
          <button
            onClick={() => setSelectedPost(null)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </button>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground/60">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>{selectedPost.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formatDate(selectedPost.date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{selectedPost.readTime}</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
              {selectedPost.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-8">
            {selectedPost.title}
          </h1>

          {/* Content */}
          <article className="animate-in fade-in-0 duration-500">
            {selectedPost.content.map(renderContentBlock)}
          </article>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-muted-foreground/60" />
              {selectedPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-foreground/[0.04] text-muted-foreground/70 border border-border/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Prev/Next navigation */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevPost ? (
              <button
                onClick={() => setSelectedPost(prevPost)}
                className="group flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-foreground/[0.015] hover:bg-foreground/[0.03] transition-colors text-left"
              >
                <ChevronLeft className="w-4 h-4 text-muted-foreground/50 group-hover:-translate-x-1 transition-transform" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground/65 mb-0.5">Previous</p>
                  <p className="text-sm font-medium text-foreground truncate">{prevPost.title}</p>
                </div>
              </button>
            ) : <div />}
            {nextPost ? (
              <button
                onClick={() => setSelectedPost(nextPost)}
                className="group flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-foreground/[0.015] hover:bg-foreground/[0.03] transition-colors text-left sm:text-right sm:flex-row-reverse"
              >
                <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:translate-x-1 transition-transform" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground/65 mb-0.5">Next</p>
                  <p className="text-sm font-medium text-foreground truncate">{nextPost.title}</p>
                </div>
              </button>
            ) : <div />}
          </div>
        </div>
      </div>
    );
  }

  /* ── Listing view ── */
  return (
    <div className="pt-20 pb-20 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="pt-12 pb-8">
          <SectionHeader
            label="Blog"
            title="Latest from the Lab"
            subtitle="Engineering deep-dives, release announcements, and design insights from the FerrumEngine team."
          />
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
            <input
              type="text"
              placeholder="Search posts..."
              aria-label="Search blog posts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-foreground/[0.03] border border-border/50 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
            />
          </div>
          {/* Category pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  activeCategory === cat
                    ? "bg-purple-500/15 text-purple-400 border-purple-500/30"
                    : "bg-foreground/[0.03] text-muted-foreground/60 border-border/50 hover:bg-foreground/[0.05] hover:text-foreground/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured post */}
        {featuredPost && (
          <button
            onClick={() => setSelectedPost(featuredPost)}
            className="group w-full mb-10 rounded-2xl border border-purple-500/20 overflow-hidden text-left transition-all hover:border-purple-500/40"
          >
            <div className="relative p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-purple-500/[0.07] via-transparent to-pink-500/[0.05]">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Featured
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-foreground/[0.05] text-muted-foreground/70 border border-border/50">
                  {featuredPost.category}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-3 group-hover:text-purple-300 transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-lg text-muted-foreground/70 max-w-3xl leading-relaxed mb-5">
                {featuredPost.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground/50">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>{featuredPost.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(featuredPost.date)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
              <ArrowRight className="absolute right-6 sm:right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400/40 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </div>
          </button>
        )}

        {/* Post grid */}
        {regularPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {regularPosts.map((post) => (
              <button
                key={post.slug}
                onClick={() => setSelectedPost(post)}
                className="group text-left rounded-2xl border border-border/50 bg-foreground/[0.015] p-5 hover:bg-foreground/[0.03] hover:border-border transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground/65">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground/60 leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground/65">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                </div>
                {/* Tags */}
                <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-foreground/[0.03] text-muted-foreground/60 border border-border/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground/65 text-lg">No posts found matching your criteria.</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="mt-3 text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}