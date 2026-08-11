import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Footer } from "@/components/ferrum/sections/footer";

/* ════════════════════════════════════════════════════════════════
   Footer — verify links, navigation, and sponsor button
   ════════════════════════════════════════════════════════════════ */

// Mock next/navigation before importing the component
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock lucide-react to avoid SVG rendering issues in tests
vi.mock("lucide-react", () => ({
  GitBranch: () => <span data-testid="icon-git">GitBranch</span>,
  Heart: () => <span data-testid="icon-heart">Heart</span>,
  ExternalLink: () => <span data-testid="icon-external">ExternalLink</span>,
}));

describe("Footer", () => {
  it("renders the FerrumEngine logo text", () => {
    render(<Footer />);
    expect(screen.getByText("Ferrum")).toBeInTheDocument();
    expect(screen.getByText("Engine")).toBeInTheDocument();
  });

  it("renders the MIT License text", () => {
    render(<Footer />);
    expect(screen.getByText("MIT License · Open Source")).toBeInTheDocument();
  });

  it("renders the sponsor button", () => {
    render(<Footer />);
    expect(screen.getAllByText("Sponsor").length).toBeGreaterThanOrEqual(1);
  });

  it("renders the Built with ♥ by Roy text", () => {
    render(<Footer />);
    expect(screen.getByText("Built with")).toBeInTheDocument();
    expect(screen.getByText("Roy")).toBeInTheDocument();
  });

  it("renders column headings", () => {
    render(<Footer />);
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Developers")).toBeInTheDocument();
    expect(screen.getByText("Resources")).toBeInTheDocument();
  });

  it("has a link to GitHub", () => {
    render(<Footer />);
    const githubLinks = screen.getAllByText("GitHub");
    expect(githubLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("renders effect gallery link", () => {
    render(<Footer />);
    expect(screen.getByText("Effects Gallery")).toBeInTheDocument();
  });

  it("renders documentation link", () => {
    render(<Footer />);
    const docLinks = screen.getAllByText("Documentation");
    expect(docLinks.length).toBeGreaterThanOrEqual(1);
  });
});
