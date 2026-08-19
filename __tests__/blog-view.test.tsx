import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BlogView } from "@/components/ferrum/blog-view";

/* ════════════════════════════════════════════════════════════════
   BlogView — posts, search, category filters
   ════════════════════════════════════════════════════════════════ */

vi.mock("lucide-react", () => ({
  Calendar: () => <span data-testid="icon-calendar">Calendar</span>,
  Clock: () => <span data-testid="icon-clock">Clock</span>,
  ArrowRight: () => <span data-testid="icon-arrow-right">ArrowRight</span>,
  Tag: () => <span data-testid="icon-tag">Tag</span>,
  Search: () => <span data-testid="icon-search">Search</span>,
  User: () => <span data-testid="icon-user">User</span>,
  ChevronLeft: () => <span data-testid="icon-chevron-left">ChevronLeft</span>,
  ChevronRight: () => <span data-testid="icon-chevron-right">ChevronRight</span>,
  ArrowLeft: () => <span data-testid="icon-arrow-left">ArrowLeft</span>,
}));

describe("BlogView", () => {
  it("renders without crashing", () => {
    render(<BlogView />);
    expect(screen.getByText("Latest from the Lab")).toBeInTheDocument();
  });

  it("renders blog post titles", () => {
    render(<BlogView />);
    // At least the featured post title should be visible
    expect(screen.getByText("Announcing FerrumEngine 2.0")).toBeInTheDocument();
  });

  it("renders the search input", () => {
    render(<BlogView />);
    expect(screen.getByLabelText("Search blog posts")).toBeInTheDocument();
  });

  it("renders category filter buttons", () => {
    render(<BlogView />);
    // Use getAllByText since "Engineering" appears in both filter and post cards
    const allEngineering = screen.getAllByText("Engineering");
    expect(allEngineering.length).toBeGreaterThanOrEqual(2);
    // Verify the filter button exists (it's a button)
    const filterBtn = allEngineering.find(el => el.tagName === "BUTTON");
    expect(filterBtn).toBeTruthy();
    // Other category filters — use getAllByText for ones that might conflict
    const allRelease = screen.getAllByText("Release");
    expect(allRelease.length).toBeGreaterThanOrEqual(1);
    const communityButtons = screen.getAllByText("Community");
    expect(communityButtons.length).toBeGreaterThanOrEqual(1);
  });

  it("displays a Featured badge on the featured post", () => {
    render(<BlogView />);
    expect(screen.getByText("Featured")).toBeInTheDocument();
  });

  it("renders regular blog post cards", () => {
    render(<BlogView />);
    // Post title is "Framework Agnostic by Design" (not "Framework Adapters")
    expect(screen.getByText("Framework Agnostic by Design")).toBeInTheDocument();
  });

  it("renders post read time", () => {
    render(<BlogView />);
    // Featured post has read time
    expect(screen.getByText("8 min read")).toBeInTheDocument();
  });
});
