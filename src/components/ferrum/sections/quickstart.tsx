"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ferrum/scroll-reveal";

const steps = [
  {
    num: 1,
    title: "Copy the CSS",
    desc: "Download the full effects stylesheet or grab individual effects from the gallery.",
    code: "# Download full library\ncurl -o ferrum.css https://your-site.com/api/css?format=all\n\n# Or use the API for specific categories\ncurl -o hover.css \"https://your-site.com/api/css?category=hover&format=minified\"",
    lang: "bash",
  },
  {
    num: 2,
    title: "Add to Your HTML",
    desc: "Link the stylesheet in your project and apply any effect class to an element.",
    code: "<head>\n  <link rel=\"stylesheet\" href=\"ferrum.css\" />\n</head>\n\n<body>\n  <div class=\"rc-fade-in\">Welcome</div>\n  <button class=\"rc-btn-glow\">Get Started</button>\n</body>",
    lang: "html",
  },
  {
    num: 3,
    title: "Customize with Tokens",
    desc: "Override CSS custom properties to match your brand and fine-tune animations.",
    code: ":root {\n  --rc-duration: 0.6s;\n  --rc-easing: cubic-bezier(0.16, 1, 0.3, 1);\n  --rc-color-primary: #a855f7;\n  --rc-color-secondary: #ec4899;\n}",
    lang: "css",
  },
  {
    num: 4,
    title: "Ship to Production",
    desc: "Pure CSS means zero runtime overhead. No JS initialization, no hydration, no build step required.",
    code: "# Only include the effects you use via the API\ncurl -o production.css \\\n  \"https://your-site.com/api/css?effects=fade-in,hover-lift,btn-glow\n  &format=minified\"\n\n# Output: single CSS file, ready to deploy",
    lang: "bash",
  },
];

function CodeBlock({ code, lang, onCopy, copied }: {
  code: string; lang: string; onCopy: () => void; copied: boolean;
}) {
  return (
    <div className="mt-4 rounded-xl overflow-hidden border border-border/50">
      <div className="flex items-center justify-between px-4 py-2 bg-foreground/[0.04] border-b border-border/50">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-muted-foreground/40" />
          <span className="text-[11px] font-mono text-muted-foreground/40 uppercase">{lang}</span>
        </div>
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 text-[11px] text-muted-foreground/40 hover:text-muted-foreground transition-colors px-2 py-1 rounded-md hover:bg-foreground/[0.06]"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 bg-foreground/[0.03] dark:bg-[#0c0c0e] overflow-x-auto">
        <code className="text-[12px] font-mono leading-relaxed text-foreground/70 whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}

export function QuickStart() {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedStep(idx);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <section id="quickstart" className="py-28 sm:py-36 relative overflow-hidden">
      <div className="ferrum-divider-glow absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-[400px] h-[300px] bg-emerald-500/[0.03] rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal>
          <p className="ferrum-section-label text-xs font-semibold uppercase tracking-[0.15em] text-purple-400/70 mb-4">Quick Start</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Five Minutes.
            <br />
            <span className="text-muted-foreground/70">Production Code.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mt-5">
            Go from install to a fully animated, accessible component with design tokens — in four steps.
          </p>
        </Reveal>

        <StaggerContainer className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6" delay={0.1}>
          {steps.map((step) => (
            <StaggerItem key={step.num}>
              <div className="relative p-6 rounded-2xl border border-border bg-foreground/[0.02] hover:bg-foreground/[0.03] transition-colors duration-300">
                {/* Step number */}
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-purple-500/[0.08] border border-purple-500/15 flex items-center justify-center">
                    <span className="text-xl font-bold text-purple-400/60">{step.num}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground/60 mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                <CodeBlock
                  code={step.code}
                  lang={step.lang}
                  onCopy={() => handleCopy(step.code, step.num)}
                  copied={copiedStep === step.num}
                />
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}