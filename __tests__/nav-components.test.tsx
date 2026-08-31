import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DesktopMegaTrigger, MegaMenuPanel } from "@/components/ferrum/nav-mega-menu";
import { MobileNav } from "@/components/ferrum/nav-mobile";
import type { MegaMenuGroup } from "@/lib/types";

/* ════════════════════════════════════════════════════════════════
   Nav Components — MegaMenuPanel, DesktopMegaTrigger, MobileNav
   ════════════════════════════════════════════════════════════════ */

vi.mock("@/hooks/use-focus-trap", () => ({
  useFocusTrap: vi.fn(),
}));

vi.mock("@/lib/icon-resolver", () => ({
  resolveIcon: () => () => <span data-testid="icon-resolved">Icon</span>,
}));

vi.mock("@/components/ferrum/animated-components", () => ({
  PulsingDot: () => <span data-testid="pulsing-dot">PulsingDot</span>,
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark", setTheme: vi.fn() }),
}));

vi.mock("@/lib/body-scroll-lock", () => ({
  lockBodyScroll: vi.fn(),
  unlockBodyScroll: vi.fn(),
}));

vi.mock("lucide-react", () => ({
  ChevronDown: (props: { className?: string }) => <span data-testid="icon-chevron-down" className={props?.className}>ChevronDown</span>,
  ArrowRight: () => <span data-testid="icon-arrow-right">ArrowRight</span>,
  Github: () => <span data-testid="icon-github">Github</span>,
  Blocks: () => <span data-testid="icon-blocks">Blocks</span>,
  Play: () => <span data-testid="icon-play">Play</span>,
  Trophy: () => <span data-testid="icon-trophy">Trophy</span>,
  BookOpen: () => <span data-testid="icon-book-open">BookOpen</span>,
  Users: () => <span data-testid="icon-users">Users</span>,
  DollarSign: () => <span data-testid="icon-dollar-sign">DollarSign</span>,
  Ellipsis: () => <span data-testid="icon-ellipsis">Ellipsis</span>,
  PulsingDot: () => <span data-testid="pulsing-dot">PulsingDot</span>,
  Sun: () => <span data-testid="icon-sun">Sun</span>,
  Moon: () => <span data-testid="icon-moon">Moon</span>,
  Monitor: () => <span data-testid="icon-monitor">Monitor</span>,
  Check: () => <span data-testid="icon-check">Check</span>,
}));

/* ─── Shared test data ─── */
const mockGroups: MegaMenuGroup[] = [
  {
    heading: "Test Group",
    items: [
      { icon: "Play", label: "Item One", description: "First item", view: "playground" as const },
      { icon: "BookOpen", label: "Item Two", description: "Second item", view: "docs" as const },
      { icon: "Layers", label: "External Link", description: "External", href: "https://example.com" },
    ],
  },
];

/* ════════════════════════════════════════════════════════════════
   MegaMenuPanel Tests
   ════════════════════════════════════════════════════════════════ */

describe("MegaMenuPanel", () => {
  const defaultProps = {
    groups: mockGroups,
    menuId: "test-menu",
    onNavigate: vi.fn(),
    onClose: vi.fn(),
    onPanelEnter: vi.fn(),
    onPanelLeave: vi.fn(),
  };

  it("renders group headings", () => {
    render(<MegaMenuPanel {...defaultProps} />);
    expect(screen.getByText("Test Group")).toBeInTheDocument();
  });

  it("renders menu items", () => {
    render(<MegaMenuPanel {...defaultProps} />);
    expect(screen.getByText("Item One")).toBeInTheDocument();
    expect(screen.getByText("Item Two")).toBeInTheDocument();
  });

  it("renders the menu role", () => {
    render(<MegaMenuPanel {...defaultProps} />);
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("renders descriptions for items", () => {
    render(<MegaMenuPanel {...defaultProps} />);
    expect(screen.getByText("First item")).toBeInTheDocument();
    expect(screen.getByText("Second item")).toBeInTheDocument();
  });

  it("renders external links as anchor tags", () => {
    render(<MegaMenuPanel {...defaultProps} />);
    const link = screen.getByText("External Link").closest("a");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("calls onNavigate and onClose when a view item is clicked", () => {
    const onNavigate = vi.fn();
    const onClose = vi.fn();
    render(<MegaMenuPanel {...defaultProps} onNavigate={onNavigate} onClose={onClose} />);
    fireEvent.click(screen.getByText("Item One"));
    expect(onNavigate).toHaveBeenCalledWith("playground");
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onPanelEnter on mouse enter", () => {
    const onPanelEnter = vi.fn();
    render(<MegaMenuPanel {...defaultProps} onPanelEnter={onPanelEnter} />);
    fireEvent.mouseEnter(screen.getByRole("menu"));
    expect(onPanelEnter).toHaveBeenCalledWith("test-menu");
  });

  it("calls onPanelLeave on mouse leave", () => {
    const onPanelLeave = vi.fn();
    render(<MegaMenuPanel {...defaultProps} onPanelLeave={onPanelLeave} />);
    fireEvent.mouseLeave(screen.getByRole("menu"));
    expect(onPanelLeave).toHaveBeenCalled();
  });
});

/* ════════════════════════════════════════════════════════════════
   DesktopMegaTrigger Tests
   ════════════════════════════════════════════════════════════════ */

describe("DesktopMegaTrigger", () => {
  const defaultProps = {
    label: "Platform",
    menuId: "platform",
    groups: mockGroups,
    activeMenu: null as string | null,
    onNavigate: vi.fn(),
    onMenuEnter: vi.fn(),
    onMenuLeave: vi.fn(),
    onToggle: vi.fn(),
    allMenuIds: ['platform', 'docs', 'more'],
  };

  it("renders the trigger button with the label", () => {
    render(<DesktopMegaTrigger {...defaultProps} />);
    expect(screen.getByText("Platform")).toBeInTheDocument();
  });

  it("has aria-expanded=false when not active", () => {
    render(<DesktopMegaTrigger {...defaultProps} />);
    const btn = screen.getByText("Platform");
    expect(btn).toHaveAttribute("aria-expanded", "false");
  });

  it("has aria-haspopup=true", () => {
    render(<DesktopMegaTrigger {...defaultProps} />);
    const btn = screen.getByText("Platform");
    expect(btn).toHaveAttribute("aria-haspopup", "true");
  });

  it("opens the panel on click", () => {
    const onToggle = vi.fn();
    render(<DesktopMegaTrigger {...defaultProps} onToggle={onToggle} />);
    fireEvent.click(screen.getByText("Platform"));
    expect(onToggle).toHaveBeenCalledWith("platform");
  });

  it("shows the panel when activeMenu matches", () => {
    render(<DesktopMegaTrigger {...defaultProps} activeMenu="platform" />);
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("calls onMenuEnter on mouse enter", () => {
    const onMenuEnter = vi.fn();
    render(<DesktopMegaTrigger {...defaultProps} onMenuEnter={onMenuEnter} />);
    const wrapper = screen.getByText("Platform").closest("div");
    expect(wrapper).not.toBeNull();
    fireEvent.mouseEnter(wrapper!);
    expect(onMenuEnter).toHaveBeenCalledWith("platform");
  });

  it("calls onMenuLeave on mouse leave", () => {
    const onMenuLeave = vi.fn();
    render(<DesktopMegaTrigger {...defaultProps} onMenuLeave={onMenuLeave} />);
    const wrapper = screen.getByText("Platform").closest("div");
    expect(wrapper).not.toBeNull();
    fireEvent.mouseLeave(wrapper!);
    expect(onMenuLeave).toHaveBeenCalled();
  });
});

/* ════════════════════════════════════════════════════════════════
   MobileNav Tests
   ════════════════════════════════════════════════════════════════ */

describe("MobileNav", () => {
  const defaultProps = {
    open: true,
    onClose: vi.fn(),
    currentView: "home" as const,
    onNavigate: vi.fn(),
  };

  it("renders nothing when open is false", () => {
    render(<MobileNav {...defaultProps} open={false} />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("renders the mobile navigation when open", () => {
    render(<MobileNav {...defaultProps} />);
    expect(screen.getByRole("navigation", { name: "Mobile navigation" })).toBeInTheDocument();
  });

  it("renders the main nav items", () => {
    render(<MobileNav {...defaultProps} />);
    expect(screen.getByText("Platform")).toBeInTheDocument();
    expect(screen.getByText("Playground")).toBeInTheDocument();
    expect(screen.getByText("Showcase")).toBeInTheDocument();
    expect(screen.getByText("Docs")).toBeInTheDocument();
    expect(screen.getByText("Community")).toBeInTheDocument();
    expect(screen.getByText("More")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
  });

  it("renders the Browse Effects button", () => {
    render(<MobileNav {...defaultProps} />);
    expect(screen.getByText("Browse Effects")).toBeInTheDocument();
  });

  it("calls onNavigate when Playground is clicked", () => {
    const onNavigate = vi.fn();
    render(<MobileNav {...defaultProps} onNavigate={onNavigate} />);
    fireEvent.click(screen.getByText("Playground"));
    expect(onNavigate).toHaveBeenCalledWith("playground");
  });

  it("expands a mega menu section when clicked", () => {
    render(<MobileNav {...defaultProps} />);
    fireEvent.click(screen.getByText("Platform"));
    // The group heading from platformMenu should appear
    expect(screen.getByText("Core Engines")).toBeInTheDocument();
  });

  it("collapses the same mega menu when clicked again", () => {
    render(<MobileNav {...defaultProps} />);
    fireEvent.click(screen.getByText("Platform"));
    expect(screen.getByText("Core Engines")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Platform"));
    expect(screen.queryByText("Core Engines")).not.toBeInTheDocument();
  });

  it("renders the GitHub link in the bottom actions", () => {
    render(<MobileNav {...defaultProps} />);
    const githubLink = screen.getByText("GitHub").closest("a");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", "https://github.com/roy-wanyoike/FerrumEngine");
  });

  it("calls onClose on Escape key", () => {
    const onClose = vi.fn();
    render(<MobileNav {...defaultProps} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("highlights the active view", () => {
    render(<MobileNav {...defaultProps} currentView="playground" />);
    const btn = screen.getByText("Playground").closest("button");
    expect(btn?.className).toContain("text-foreground");
  });

  it("calls onNavigate when a mega menu item is clicked", () => {
    const onNavigate = vi.fn();
    render(<MobileNav {...defaultProps} onNavigate={onNavigate} />);
    // Expand platform menu
    fireEvent.click(screen.getByText("Platform"));
    // Click "Effects Gallery" which has view: "effects"
    fireEvent.click(screen.getByText("Effects Gallery"));
    expect(onNavigate).toHaveBeenCalledWith("effects");
  });
});
