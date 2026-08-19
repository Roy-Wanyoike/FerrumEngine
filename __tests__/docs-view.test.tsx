import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DocsView } from "@/components/ferrum/docs-view";

/* ════════════════════════════════════════════════════════════════
   DocsView — section headings, code blocks, sidebar navigation
   ════════════════════════════════════════════════════════════════ */

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

vi.mock("@/lib/body-scroll-lock", () => ({
  lockBodyScroll: vi.fn(),
  unlockBodyScroll: vi.fn(),
}));

vi.mock("lucide-react", () => ({
  Search: () => <span data-testid="icon-search">Search</span>,
  Copy: () => <span data-testid="icon-copy">Copy</span>,
  Check: () => <span data-testid="icon-check">Check</span>,
  ChevronRight: () => <span data-testid="icon-chevron-right">ChevronRight</span>,
  Menu: () => <span data-testid="icon-menu">Menu</span>,
  ArrowLeft: () => <span data-testid="icon-arrow-left">ArrowLeft</span>,
  Rocket: () => <span data-testid="icon-rocket">Rocket</span>,
  Layers: () => <span data-testid="icon-layers">Layers</span>,
  Puzzle: () => <span data-testid="icon-puzzle">Puzzle</span>,
  Sparkles: () => <span data-testid="icon-sparkles">Sparkles</span>,
  FileCode: () => <span data-testid="icon-file-code">FileCode</span>,
  Gauge: () => <span data-testid="icon-gauge">Gauge</span>,
  Shield: () => <span data-testid="icon-shield">Shield</span>,
  Terminal: () => <span data-testid="icon-terminal">Terminal</span>,
  Users: () => <span data-testid="icon-users">Users</span>,
  AlertTriangle: () => <span data-testid="icon-alert-triangle">AlertTriangle</span>,
  Info: () => <span data-testid="icon-info">Info</span>,
  Lightbulb: () => <span data-testid="icon-lightbulb">Lightbulb</span>,
  BookOpen: () => <span data-testid="icon-book-open">BookOpen</span>,
  Palette: () => <span data-testid="icon-palette">Palette</span>,
}));

const mockOnBack = vi.fn();

describe("DocsView", () => {
  it("renders without crashing", () => {
    render(<DocsView onBack={mockOnBack} />);
    // The sidebar should be present (desktop) or mobile header should be present
    const sidebar = document.querySelector('[aria-label="Documentation navigation"]');
    expect(sidebar || screen.getByText("Latest from the Lab") || screen.getByText("Getting Started")).toBeTruthy();
  });

  it("renders the active section heading", () => {
    render(<DocsView onBack={mockOnBack} />);
    // Default section is "getting-started" — the h1 title should be present
    const h1 = document.querySelector("h1");
    expect(h1).toBeInTheDocument();
    expect(h1?.textContent).toBe("Getting Started");
  });

  it("renders sidebar navigation items", () => {
    render(<DocsView onBack={mockOnBack} />);
    // Sidebar should show navigation group labels
    expect(screen.getByText("Introduction")).toBeInTheDocument();
  });

  it("renders code blocks with Copy button", () => {
    render(<DocsView onBack={mockOnBack} />);
    // The getting-started section has code blocks with a Copy button
    const copyButtons = screen.getAllByText("Copy");
    expect(copyButtons.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the search input in sidebar", () => {
    render(<DocsView onBack={mockOnBack} />);
    expect(screen.getByPlaceholderText("Search docs...")).toBeInTheDocument();
  });

  it("renders the Back to site button", () => {
    render(<DocsView onBack={mockOnBack} />);
    expect(screen.getByText("Back to site")).toBeInTheDocument();
  });

  it("renders bottom navigation for next/prev", () => {
    render(<DocsView onBack={mockOnBack} />);
    // Default section is first (getting-started), so there should be a Next button
    expect(screen.getByText("Next")).toBeInTheDocument();
  });
});
