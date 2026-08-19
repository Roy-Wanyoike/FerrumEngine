import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Nav } from "@/components/ferrum/nav";

/* ════════════════════════════════════════════════════════════════
   Nav — verify logo, theme toggle, mobile menu, nav buttons, active
   ════════════════════════════════════════════════════════════════ */

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark", setTheme: vi.fn() }),
}));

vi.mock("@/hooks/use-focus-trap", () => ({
  useFocusTrap: vi.fn(),
}));

vi.mock("@/lib/body-scroll-lock", () => ({
  lockBodyScroll: vi.fn(),
  unlockBodyScroll: vi.fn(),
}));

vi.mock("@/lib/icon-resolver", () => ({
  resolveIcon: () => () => <span data-testid="icon-resolved">Icon</span>,
}));

vi.mock("lucide-react", () => ({
  Menu: () => <span data-testid="icon-menu">Menu</span>,
  X: () => <span data-testid="icon-x">X</span>,
  ArrowRight: () => <span data-testid="icon-arrow-right">ArrowRight</span>,
  Github: () => <span data-testid="icon-github">Github</span>,
  ChevronDown: () => <span data-testid="icon-chevron-down">ChevronDown</span>,
  Sun: () => <span data-testid="icon-sun">Sun</span>,
  Moon: () => <span data-testid="icon-moon">Moon</span>,
  Monitor: () => <span data-testid="icon-monitor">Monitor</span>,
  Check: () => <span data-testid="icon-check">Check</span>,
  Palette: () => <span data-testid="icon-palette">Palette</span>,
  RotateCcw: () => <span data-testid="icon-rotate-ccw">RotateCcw</span>,
  ArrowLeft: () => <span data-testid="icon-arrow-left">ArrowLeft</span>,
  Search: () => <span data-testid="icon-search">Search</span>,
  BookOpen: () => <span data-testid="icon-book-open">BookOpen</span>,
  Blocks: () => <span data-testid="icon-blocks">Blocks</span>,
  Play: () => <span data-testid="icon-play">Play</span>,
  Trophy: () => <span data-testid="icon-trophy">Trophy</span>,
  Users: () => <span data-testid="icon-users">Users</span>,
  Ellipsis: () => <span data-testid="icon-ellipsis">Ellipsis</span>,
  DollarSign: () => <span data-testid="icon-dollar-sign">DollarSign</span>,
  Rocket: () => <span data-testid="icon-rocket">Rocket</span>,
  Layers: () => <span data-testid="icon-layers">Layers</span>,
  Puzzle: () => <span data-testid="icon-puzzle">Puzzle</span>,
  Sparkles: () => <span data-testid="icon-sparkles">Sparkles</span>,
  FileCode: () => <span data-testid="icon-file-code">FileCode</span>,
  Gauge: () => <span data-testid="icon-gauge">Gauge</span>,
  Shield: () => <span data-testid="icon-shield">Shield</span>,
  Terminal: () => <span data-testid="icon-terminal">Terminal</span>,
  PulsingDot: () => <span data-testid="icon-pulsing-dot">PulsingDot</span>,
  Info: () => <span data-testid="icon-info">Info</span>,
  AlertTriangle: () => <span data-testid="icon-alert-triangle">AlertTriangle</span>,
  Lightbulb: () => <span data-testid="icon-lightbulb">Lightbulb</span>,
  Tag: () => <span data-testid="icon-tag">Tag</span>,
  Layout: () => <span data-testid="icon-layout">Layout</span>,
  Command: () => <span data-testid="icon-command">Command</span>,
  FileText: () => <span data-testid="icon-file-text">FileText</span>,
  Newspaper: () => <span data-testid="icon-newspaper">Newspaper</span>,
  Clock: () => <span data-testid="icon-clock">Clock</span>,
}));

const mockOnNavigate = vi.fn();

describe("Nav", () => {
  it("renders without crashing", () => {
    render(<Nav currentView="home" onNavigate={mockOnNavigate} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders the FerrumEngine logo", () => {
    render(<Nav currentView="home" onNavigate={mockOnNavigate} />);
    expect(screen.getByText("Ferrum")).toBeInTheDocument();
    expect(screen.getByText("Engine")).toBeInTheDocument();
  });

  it("renders the logo button with correct aria-label", () => {
    render(<Nav currentView="home" onNavigate={mockOnNavigate} />);
    expect(screen.getByLabelText("FerrumEngine home")).toBeInTheDocument();
  });

  it("renders the theme toggle", () => {
    render(<Nav currentView="home" onNavigate={mockOnNavigate} />);
    expect(screen.getByTitle("Toggle theme")).toBeInTheDocument();
  });

  it("renders the mobile menu button", () => {
    render(<Nav currentView="home" onNavigate={mockOnNavigate} />);
    // The hamburger button is visible at all sizes; on lg:hidden it shows menu toggle
    expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
  });

  it("renders Playground nav button", () => {
    render(<Nav currentView="home" onNavigate={mockOnNavigate} />);
    expect(screen.getByText("Playground")).toBeInTheDocument();
  });

  it("renders Browse Effects button", () => {
    render(<Nav currentView="home" onNavigate={mockOnNavigate} />);
    expect(screen.getByText("Browse Effects")).toBeInTheDocument();
  });

  it("renders Platform, Docs, and More mega menu triggers", () => {
    render(<Nav currentView="home" onNavigate={mockOnNavigate} />);
    expect(screen.getByText("Platform")).toBeInTheDocument();
    expect(screen.getByText("Docs")).toBeInTheDocument();
    expect(screen.getByText("More")).toBeInTheDocument();
  });

  it("highlights the active view", () => {
    render(<Nav currentView="playground" onNavigate={mockOnNavigate} />);
    const playgroundBtn = screen.getByText("Playground").closest("button");
    expect(playgroundBtn).toHaveAttribute("aria-current", "page");
  });

  it("does not highlight a non-active view", () => {
    render(<Nav currentView="home" onNavigate={mockOnNavigate} />);
    const playgroundBtn = screen.getByText("Playground").closest("button");
    expect(playgroundBtn).not.toHaveAttribute("aria-current");
  });
});
