import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EffectsView } from "@/components/ferrum/effects-view";

/* ════════════════════════════════════════════════════════════════
   EffectsView — search, category filters, effects count
   ════════════════════════════════════════════════════════════════ */

vi.mock("lucide-react", () => ({
  Search: () => <span data-testid="icon-search">Search</span>,
  RotateCcw: () => <span data-testid="icon-rotate">RotateCcw</span>,
  Heart: () => <span data-testid="icon-heart">Heart</span>,
  Loader2: () => <span data-testid="icon-loader">Loader2</span>,
  Code: () => <span data-testid="icon-code">Code</span>,
}));

const mockSetSearch = vi.fn();
const mockSetActiveCategory = vi.fn();
const mockHandleOpenCode = vi.fn();
const mockAdd = vi.fn();
const mockIsIn = vi.fn(() => false);
const mockSetCollectionOpen = vi.fn();

const defaultProps = {
  search: "",
  setSearch: mockSetSearch,
  activeCategory: "all",
  setActiveCategory: mockSetActiveCategory,
  hydrated: true,
  handleOpenCode: mockHandleOpenCode,
  add: mockAdd,
  isIn: mockIsIn,
  collection: [],
  setCollectionOpen: mockSetCollectionOpen,
};

describe("EffectsView", () => {
  it("renders without crashing", () => {
    render(<EffectsView {...defaultProps} />);
    expect(screen.getByText("Motion")).toBeInTheDocument();
  });

  it("renders the search input", () => {
    render(<EffectsView {...defaultProps} />);
    expect(screen.getByLabelText("Search effects")).toBeInTheDocument();
  });

  it("renders category filter buttons", () => {
    render(<EffectsView {...defaultProps} />);
    // The "All" category pill is always rendered
    const allButtons = screen.getAllByRole("button", { name: /All/i });
    expect(allButtons.length).toBeGreaterThanOrEqual(1);
  });

  it("displays the effects count in the heading", () => {
    render(<EffectsView {...defaultProps} />);
    // The heading contains "X Effects. Y Categories."
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toMatch(/\d+ Effects/);
  });

  it("renders the Saved collection button", () => {
    render(<EffectsView {...defaultProps} />);
    expect(screen.getByLabelText("Saved effects")).toBeInTheDocument();
  });

  it("shows skeleton cards when not hydrated", () => {
    render(<EffectsView {...defaultProps} hydrated={false} />);
    // Should show loading skeletons instead of effects grid
    // The "Showing X of Y" text should not be present when not hydrated
    expect(screen.queryByText(/Showing/)).not.toBeInTheDocument();
  });

  it("shows the effects count footer when hydrated", () => {
    render(<EffectsView {...defaultProps} hydrated={true} />);
    expect(screen.getByText(/Showing \d+ of \d+ effects/)).toBeInTheDocument();
  });

  it("shows no results message when search has no matches", () => {
    render(<EffectsView {...defaultProps} search="zzznonexistentzzz" />);
    expect(screen.getByText("No effects found")).toBeInTheDocument();
  });
});
