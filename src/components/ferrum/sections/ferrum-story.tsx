import { SectionHeader } from "./section-helpers";

interface Era {
  year: string;
  title: string;
  description: string;
  milestone?: string;
}

const timeline: Era[] = [
  {
    year: "1995",
    title: "Websites",
    description: "Static HTML pages. Tables for layout. Blink tags. The web was a collection of documents you could read on a screen. Design meant choosing a background color and a font. Interaction meant clicking a hyperlink.",
  },
  {
    year: "2005",
    title: "Web Applications",
    description: "Ajax changed everything. Gmail proved that a browser could feel like a desktop app. jQuery made DOM manipulation accessible to everyone. The web transitioned from documents to applications — but the tools were still primitive.",
    milestone: "jQuery, Ajax, Prototype.js",
  },
  {
    year: "2010",
    title: "The Framework Era Begins",
    description: "Backbone.js brought structure to client-side code. Angular emerged from Google. A small team at Facebook started experimenting with a new way of building UIs — one that would eventually become React. The idea of 'components' entered the mainstream.",
    milestone: "Backbone.js, AngularJS, early React",
  },
  {
    year: "2015",
    title: "Component Systems",
    description: "React's virtual DOM won the framework wars. Vue attracted developers who wanted simplicity. Web Components promised framework independence but never delivered on tooling. The component became the atomic unit of UI development, but every framework reinvented it differently.",
    milestone: "React 15, Vue 2, Web Components v1",
  },
  {
    year: "2018",
    title: "The Design System Movement",
    description: "Companies realized that having 47 button implementations across their codebase was a problem. Design systems emerged — not just component libraries, but shared languages between design and engineering. Tailwind CSS challenged the component orthodoxy with utility-first CSS.",
    milestone: "Tailwind CSS, Storybook, Design Tokens spec",
  },
  {
    year: "2020",
    title: "Motion Becomes Expected",
    description: "Users stopped tolerating jarring page loads. Framer Motion made React animations accessible. Lottie brought After Effects to the web. CSS got scroll-driven animations and view transitions. The expectation shifted from 'does it work?' to 'does it feel right?'",
    milestone: "Framer Motion, Lottie, CSS Scroll Animations",
  },
  {
    year: "2023",
    title: "AI-Generated UI",
    description: "Large language models could generate HTML and CSS. Vercel v0 proved that AI could produce real components. But the output was one-shot and unmodifiable — copy-paste artifacts that nobody understood and nobody could maintain. The gap between generation and engineering widened.",
    milestone: "GPT-4, v0, Bolt, Lovable",
  },
  {
    year: "2025",
    title: "The Integration Problem",
    description: "Teams now use 5-10 specialized tools: Tailwind for styling, Framer Motion for animation, Radix for components, Storybook for docs, Chromatic for visual testing, tokens-studio for design tokens. The integration glue has become the largest part of the codebase. There is no unified engine.",
    milestone: "FerrumEngine v1 — 542+ effects, 35 categories",
  },
  {
    year: "2026",
    title: "Ferrum — The Unified Engine",
    description: "Ferrum is the answer to the integration problem. Not another tool to integrate, but the engine that makes integration unnecessary. One rendering system. One token model. One animation model. One architecture. Every framework. Every device. Every interaction.",
    milestone: "Ferrum Platform, Architecture Book, Principles",
  },
  {
    year: "2030",
    title: "Intelligent Interfaces",
    description: "Interfaces that understand context. That adapt to the user, not the device. Where motion communicates state, accessibility is automatic, and AI assists every design decision. The web doesn't just display information — it responds to human intent.",
    milestone: "The future Ferrum is building toward.",
  },
];

export function FerrumStory() {
  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <SectionHeader
          label="Origin Story"
          title="Why Ferrum Exists"
          subtitle="Ferrum didn't start with a feature list. It started with a question: why, in 2025, do frontend developers still spend weeks building infrastructure that should already exist?"
          subtitleOpacity="60"
          maxWidth="none"
        />

        {/* Timeline */}
        <div className="mt-20 relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] sm:left-[23px] top-0 bottom-0 w-px bg-border/30" />

          <div className="space-y-12">
            {timeline.map((era, i) => {
              const isFerrum = era.year === "2026" || era.year === "2030";
              return (
                <div key={era.year} className="animate-in fade-in-0 slide-in-from-bottom-3" style={{ animationDelay: `${i * 0.04}s`, animationFillMode: "both" }}>
                  <div className="relative flex gap-6 sm:gap-8">
                    {/* Dot */}
                    <div className="shrink-0 relative z-10">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border ${
                        isFerrum
                          ? "bg-purple-500/15 border-purple-500/30"
                          : "bg-background border-border/50"
                      }`}>
                        <span className={`text-xs font-bold tabular-nums ${
                          isFerrum ? "text-purple-400" : "text-muted-foreground/40"
                        }`}>
                          {era.year}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-1 sm:pt-2 pb-4">
                      <h2 className={`text-xl sm:text-2xl font-bold mb-2 ${
                        isFerrum
                          ? "bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                          : "text-foreground"
                      }`}>
                        {era.title}
                      </h2>
                      <p className="text-sm text-muted-foreground/50 leading-relaxed">
                        {era.description}
                      </p>
                      {era.milestone && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {era.milestone.split(", ").map((m) => (
                            <span key={m} className="px-2 py-1 rounded-md bg-foreground/[0.03] border border-border/30 text-[11px] text-muted-foreground/40">
                              {m}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
