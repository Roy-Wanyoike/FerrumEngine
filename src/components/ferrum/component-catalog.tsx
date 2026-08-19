"use client";

import { useState, useMemo, useCallback } from "react";
import { useTheme } from "next-themes";
import { Search, Sun, Moon, Copy, Check } from "lucide-react";

/* ── UI Components ── */
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

/* ── Custom Ferrum Components ── */
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchButton } from "@/components/ferrum/global-search";

/* ═══════════════════════════════════════════════════════════════
   CODE BLOCK — Inline code snippet display
   ═══════════════════════════════════════════════════════════════ */

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, [code]);

  return (
    <div className="relative group">
      <pre className="bg-foreground/[0.03] border border-border rounded-lg p-4 text-xs leading-relaxed overflow-x-auto font-mono text-foreground/80">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-foreground/[0.06] hover:bg-foreground/[0.1] text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENT SECTION — Reusable wrapper for each catalog entry
   ═══════════════════════════════════════════════════════════════ */

interface CatalogItem {
  id: string;
  name: string;
  description: string;
  category: string;
  props?: string;
  code: string;
  render: () => React.ReactNode;
}

function ComponentSection({ item }: { item: CatalogItem }) {
  return (
    <section id={item.id} className="scroll-mt-24">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
        {item.props && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {item.props.split(", ").map((p) => (
              <code key={p} className="text-[11px] px-1.5 py-0.5 rounded bg-foreground/[0.04] text-muted-foreground/70 font-mono">{p}</code>
            ))}
          </div>
        )}
      </div>
      <div className="rounded-xl border border-border bg-card p-6 mb-4">
        {item.render()}
      </div>
      <CodeBlock code={item.code} />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CATALOG DATA
   ═══════════════════════════════════════════════════════════════ */

const CATEGORIES = [
  "All",
  "shadcn/ui",
  "Ferrum Custom",
];

function buildCatalog(): CatalogItem[] {
  return [
    /* ─── BUTTONS ─── */
    {
      id: "button-default",
      name: "Button — Default",
      description: "Primary action button with default styling.",
      category: "shadcn/ui",
      props: "variant, size, asChild, disabled, className",
      code: `<Button variant="default" size="default">Click me</Button>
<Button variant="default" size="sm">Small</Button>
<Button variant="default" size="lg">Large</Button>
<Button variant="default" size="icon"><Icon /></Button>`,
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="default" size="default">Click me</Button>
          <Button variant="default" size="sm">Small</Button>
          <Button variant="default" size="lg">Large</Button>
          <Button variant="default" size="icon" aria-label="Menu">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
          </Button>
        </div>
      ),
    },
    {
      id: "button-variants",
      name: "Button — All Variants",
      description: "Six visual variants: default, destructive, outline, secondary, ghost, link.",
      category: "shadcn/ui",
      props: "variant: default | destructive | outline | secondary | ghost | link",
      code: `<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`,
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      ),
    },
    {
      id: "button-disabled",
      name: "Button — Disabled State",
      description: "Buttons with the disabled attribute applied.",
      category: "shadcn/ui",
      props: "disabled",
      code: `<Button disabled>Disabled Default</Button>
<Button variant="outline" disabled>Disabled Outline</Button>`,
      render: () => (
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>Disabled Default</Button>
          <Button variant="outline" disabled>Disabled Outline</Button>
        </div>
      ),
    },

    /* ─── BADGE ─── */
    {
      id: "badge-variants",
      name: "Badge — All Variants",
      description: "Four badge variants for labels, tags, and status indicators.",
      category: "shadcn/ui",
      props: "variant: default | secondary | destructive | outline, asChild, className",
      code: `<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`,
      render: () => (
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      ),
    },

    /* ─── CARD ─── */
    {
      id: "card-composed",
      name: "Card — Composed",
      description: "Card with header, title, description, content, and footer subcomponents.",
      category: "shadcn/ui",
      props: "className (all subcomponents accept className)",
      code: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Short description text.</CardDescription>
  </CardHeader>
  <CardContent>Card body content goes here.</CardContent>
  <CardFooter>
    <Button size="sm">Action</Button>
  </CardFooter>
</Card>`,
      render: () => (
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Short description text for context.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Card body content goes here. Supports any React children.</p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>
      ),
    },

    /* ─── INPUT ─── */
    {
      id: "input-variants",
      name: "Input",
      description: "Standard text input with placeholder, disabled state, and type variants.",
      category: "shadcn/ui",
      props: "type, placeholder, disabled, value, onChange, className",
      code: `<Input placeholder="Enter text..." />
<Input type="email" placeholder="email@example.com" />
<Input type="password" placeholder="Password" />
<Input placeholder="Disabled input" disabled />`,
      render: () => (
        <div className="space-y-3 max-w-sm">
          <Input placeholder="Enter text..." />
          <Input type="email" placeholder="email@example.com" />
          <Input type="password" placeholder="Password" />
          <Input placeholder="Disabled input" disabled />
        </div>
      ),
    },

    /* ─── LABEL ─── */
    {
      id: "label",
      name: "Label",
      description: "Accessible label built on Radix UI Label primitive.",
      category: "shadcn/ui",
      props: "htmlFor, className, children",
      code: `<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" placeholder="you@example.com" />`,
      render: () => (
        <div className="max-w-sm space-y-2">
          <Label htmlFor="catalog-email">Email Address</Label>
          <Input id="catalog-email" type="email" placeholder="you@example.com" />
        </div>
      ),
    },

    /* ─── SELECT ─── */
    {
      id: "select",
      name: "Select",
      description: "Native select wrapper with controlled or uncontrolled usage.",
      category: "shadcn/ui",
      props: "value, onValueChange, defaultValue, aria-label, children (SelectItem)",
      code: `<Select defaultValue="react" aria-label="Framework" onValueChange={(v) => console.log(v)}>
  <SelectItem value="react">React</SelectItem>
  <SelectItem value="vue">Vue</SelectItem>
  <SelectItem value="svelte">Svelte</SelectItem>
</Select>`,
      render: () => (
        <div className="max-w-xs">
          <Select defaultValue="react" aria-label="Framework select demo">
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="vue">Vue</SelectItem>
            <SelectItem value="svelte">Svelte</SelectItem>
          </Select>
        </div>
      ),
    },

    /* ─── SLIDER ─── */
    {
      id: "slider",
      name: "Slider",
      description: "Range slider with min, max, step, and orientation support.",
      category: "shadcn/ui",
      props: "value, onValueChange, min, max, step, disabled, orientation, aria-label",
      code: `const [val, setVal] = useState([50]);
<Slider value={val} onValueChange={setVal} min={0} max={100} step={1} />`,
      render: () => {
        // We need a stateful demo for the slider
        return <SliderDemo />;
      },
    },

    /* ─── TOOLTIP ─── */
    {
      id: "tooltip",
      name: "Tooltip",
      description: "CSS-only tooltip with four placement sides: top, bottom, left, right.",
      category: "shadcn/ui",
      props: "side: top | bottom | left | right, className (TooltipContent), delayDuration (ignored)",
      code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent side="top">Tooltip text</TooltipContent>
  </Tooltip>
</TooltipProvider>`,
      render: () => (
        <TooltipProvider>
          <div className="flex flex-wrap gap-4">
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" size="sm">Top</Button>
              </TooltipTrigger>
              <TooltipContent side="top">Tooltip on top</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" size="sm">Bottom</Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" size="sm">Left</Button>
              </TooltipTrigger>
              <TooltipContent side="left">Tooltip on left</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline" size="sm">Right</Button>
              </TooltipTrigger>
              <TooltipContent side="right">Tooltip on right</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      ),
    },

    /* ─── SCROLL AREA ─── */
    {
      id: "scroll-area",
      name: "ScrollArea",
      description: "Lightweight scrollable container with native browser overflow.",
      category: "shadcn/ui",
      props: "className, aria-label, children",
      code: `<ScrollArea className="h-40 w-full rounded-md border" aria-label="Demo scroll area">
  <div className="p-4">
    <h4>Scrollable content</h4>
    {Array.from({ length: 20 }).map((_, i) => (
      <p key={i}>Item {i + 1}</p>
    ))}
  </div>
</ScrollArea>`,
      render: () => (
        <ScrollArea className="h-40 w-full max-w-sm rounded-md border border-border" aria-label="Demo scroll area">
          <div className="p-4 space-y-2">
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} className="text-sm text-muted-foreground">Item {i + 1} — scroll down for more</p>
            ))}
          </div>
        </ScrollArea>
      ),
    },

    /* ─── TABLE ─── */
    {
      id: "table",
      name: "Table",
      description: "Semantic HTML table with header, body, row, head, and cell subcomponents.",
      category: "shadcn/ui",
      props: "className (all subcomponents)",
      code: `<Table>
  <TableHeader>
    <TableRow><TableHead>Name</TableHead><TableHead>Status</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    <TableRow><TableCell>Item 1</TableCell><TableCell>Active</TableCell></TableRow>
    <TableRow><TableCell>Item 2</TableCell><TableCell>Inactive</TableCell></TableRow>
  </TableBody>
</Table>`,
      render: () => (
        <div className="max-w-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell>Ferrum Runtime</TableCell><TableCell><Badge variant="default">Active</Badge></TableCell><TableCell className="text-right">v0.1</TableCell></TableRow>
              <TableRow><TableCell>Ferrum Motion</TableCell><TableCell><Badge variant="secondary">Planned</Badge></TableCell><TableCell className="text-right">v0.2</TableCell></TableRow>
              <TableRow><TableCell>Ferrum VFX</TableCell><TableCell><Badge variant="outline">Research</Badge></TableCell><TableCell className="text-right">v0.3</TableCell></TableRow>
            </TableBody>
          </Table>
        </div>
      ),
    },

    /* ─── SKELETON ─── */
    {
      id: "skeleton",
      name: "Skeleton",
      description: "Loading placeholder with pulse animation.",
      category: "shadcn/ui",
      props: "className",
      code: `<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-8 w-full" />
<Skeleton className="h-12 w-12 rounded-full" />`,
      render: () => (
        <div className="space-y-3 max-w-sm">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full shrink-0" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-20 w-full" />
        </div>
      ),
    },

    /* ─── FERRUM CUSTOM: ThemeToggle ─── */
    {
      id: "theme-toggle",
      name: "ThemeToggle (Ferrum)",
      description: "Theme switcher with cycle and dropdown variants. Cycles light → dark → system.",
      category: "Ferrum Custom",
      props: "className, variant: cycle | dropdown",
      code: `<ThemeToggle />               {/* cycle variant (default) */}
<ThemeToggle variant="dropdown" /> {/* dropdown with 3 options */}
<ThemeToggle variant="cycle" className="w-full" />`,
      render: () => (
        <div className="flex flex-wrap items-center gap-4">
          <ThemeToggle />
          <ThemeToggle variant="dropdown" />
        </div>
      ),
    },

    /* ─── FERRUM CUSTOM: SearchButton ─── */
    {
      id: "search-button",
      name: "SearchButton (Ferrum)",
      description: "Command-palette trigger button shown in the navigation bar. Displays platform-aware keyboard shortcut.",
      category: "Ferrum Custom",
      props: "onClick: () => void",
      code: `<SearchButton onClick={() => setSearchOpen(true)} />`,
      render: () => (
        <SearchButton onClick={() => {}} />
      ),
    },

    /* ─── FERRUM CUSTOM: Nav preview ─── */
    {
      id: "nav-preview",
      name: "Nav (Ferrum)",
      description: "Full navigation bar with mega-menu, mobile drawer, theme toggle, and search button. This is the main app navigation component.",
      category: "Ferrum Custom",
      props: "currentView: ViewId, onNavigate: (view: ViewId) => void, onSearchOpen?: () => void",
      code: `import { Nav } from "@/components/ferrum/nav";

<Nav
  currentView="home"
  onNavigate={(view) => router.push(view === 'home' ? '/' : \`/\${view}\`)}
  onSearchOpen={() => setSearchOpen(true)}
/>`,
      render: () => (
        <div className="rounded-lg border border-border bg-foreground/[0.02] p-4 text-sm text-muted-foreground">
          <p>The Nav component is already rendered at the top of this page. It includes:</p>
          <ul className="mt-2 ml-4 list-disc space-y-1 text-xs">
            <li>Logo and branding</li>
            <li>Platform / Docs / More mega-menu dropdowns</li>
            <li>Mobile hamburger drawer</li>
            <li>ThemeToggle (cycle variant)</li>
            <li>SearchButton (Cmd+K trigger)</li>
            <li>Scroll-aware solid background</li>
          </ul>
        </div>
      ),
    },
  ];
}

/* ─── SLIDER DEMO (stateful) ─── */
function SliderDemo() {
  const [val, setVal] = useState([50]);
  return (
    <div className="max-w-xs space-y-2">
      <Slider value={val} onValueChange={setVal} min={0} max={100} step={1} aria-label="Demo slider" />
      <p className="text-xs text-muted-foreground">Value: {val[0]}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export function ComponentCatalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { theme, setTheme } = useTheme();

  const items = useMemo(() => buildCatalog(), []);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        search === "" ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [items, search, category]);

  const grouped = useMemo(() => {
    const groups: Record<string, CatalogItem[]> = {};
    for (const item of filtered) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category]!.push(item);
    }
    return groups;
  }, [filtered]);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* ── Header ── */}
        <div className="mb-10">
          <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground/50 mb-2">Developer Reference</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Component Catalog</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">
            Visual reference for every UI component in the FerrumEngine platform.
            Each component is shown with its variants, props, and a copyable code snippet.
          </p>
        </div>

        {/* ── Toolbar: search, category filter, theme toggle ── */}
        <div className="sticky top-16 z-30 -mx-6 sm:-mx-8 px-6 sm:px-8 py-4 bg-background/80 backdrop-blur-xl border-b border-border/50 mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
              <Input
                placeholder="Search components..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex rounded-lg border border-border overflow-hidden">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                      category === cat
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04] transition-colors"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground/50">
            {filtered.length} component{filtered.length !== 1 ? "s" : ""} shown
            {search && <span> matching &ldquo;{search}&rdquo;</span>}
          </p>
        </div>

        {/* ── Component sections ── */}
        <div className="space-y-16">
          {Object.entries(grouped).map(([cat, catItems]) => (
            <div key={cat}>
              <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground/60 mb-6">
                {cat}
              </h2>
              <div className="space-y-12">
                {catItems.map((item) => (
                  <ComponentSection key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No components match your search.</p>
              <button
                onClick={() => { setSearch(""); setCategory("All"); }}
                className="mt-3 text-sm text-foreground hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
