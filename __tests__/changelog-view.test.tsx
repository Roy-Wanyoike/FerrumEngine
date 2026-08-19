import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChangelogView } from "@/components/ferrum/changelog-view";

/* ════════════════════════════════════════════════════════════════
   ChangelogView — version entries, timeline layout, filters
   ════════════════════════════════════════════════════════════════ */

vi.mock("lucide-react", () => ({
  Rocket: () => <span data-testid="icon-rocket">Rocket</span>,
  Bug: () => <span data-testid="icon-bug">Bug</span>,
  Wrench: () => <span data-testid="icon-wrench">Wrench</span>,
  Sparkles: () => <span data-testid="icon-sparkles">Sparkles</span>,
  ArrowDown: () => <span data-testid="icon-arrow-down">ArrowDown</span>,
  XCircle: () => <span data-testid="icon-xcircle">XCircle</span>,
  AlertTriangle: () => <span data-testid="icon-alert-triangle">AlertTriangle</span>,
  ShieldCheck: () => <span data-testid="icon-shield-check">ShieldCheck</span>,
  Calendar: () => <span data-testid="icon-calendar">Calendar</span>,
  Tag: () => <span data-testid="icon-tag">Tag</span>,
}));

describe("ChangelogView", () => {
  it("renders without crashing", () => {
    render(<ChangelogView />);
    expect(screen.getByText("Release History")).toBeInTheDocument();
  });

  it("renders the page header label", () => {
    render(<ChangelogView />);
    expect(screen.getByText("Changelog")).toBeInTheDocument();
  });

  it("displays version entries", () => {
    render(<ChangelogView />);
    // "v2.1.0" appears multiple times (What's New + timeline). Use getAllByText.
    const versionTags = screen.getAllByText("v2.1.0");
    expect(versionTags.length).toBeGreaterThanOrEqual(2);
  });

  it("renders the What's New highlight section", () => {
    render(<ChangelogView />);
    expect(screen.getByText("What's New")).toBeInTheDocument();
  });

  it("renders change type filter buttons", () => {
    render(<ChangelogView />);
    // "Added" appears in both filter bar and change group labels. Check the filter is a button.
    const allAdded = screen.getAllByText("Added");
    const filterBtn = allAdded.find(el => el.tagName === "BUTTON");
    expect(filterBtn).toBeTruthy();
    // Other filter buttons — use getAllByText for ones that may appear elsewhere
    const deprecated = screen.getAllByText("Deprecated");
    expect(deprecated.length).toBeGreaterThanOrEqual(1);
    const security = screen.getAllByText("Security");
    expect(security.length).toBeGreaterThanOrEqual(1);
  });

  it("renders the timeline end message", () => {
    render(<ChangelogView />);
    expect(screen.getByText("Earlier releases available on GitHub")).toBeInTheDocument();
  });

  it("displays change item descriptions", () => {
    render(<ChangelogView />);
    // At least one specific change item from the latest version
    expect(screen.getByText(/Native CSS scroll-driven animation/)).toBeInTheDocument();
  });
});
