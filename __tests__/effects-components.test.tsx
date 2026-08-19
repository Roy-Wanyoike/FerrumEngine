import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { EffectPreview } from "@/components/ferrum/effect-preview";
import { EffectDetailModal } from "@/components/ferrum/effects-detail-modal";
import { CollectionDrawer } from "@/components/ferrum/collection-drawer";
import type { FerrumEffectIndex } from "@/lib/ferrum-effects-index";

/* ════════════════════════════════════════════════════════════════
   Effects Components — EffectPreview, EffectDetailModal, CollectionDrawer
   ════════════════════════════════════════════════════════════════ */

vi.mock("lucide-react", () => ({
  Sparkles: () => <span data-testid="icon-sparkles">Sparkles</span>,
  Heart: () => <span data-testid="icon-heart">Heart</span>,
  Copy: () => <span data-testid="icon-copy">Copy</span>,
  Check: () => <span data-testid="icon-check">Check</span>,
  X: () => <span data-testid="icon-x">X</span>,
  Trash2: () => <span data-testid="icon-trash">Trash2</span>,
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/lib/body-scroll-lock", () => ({
  lockBodyScroll: vi.fn(),
  unlockBodyScroll: vi.fn(),
}));

vi.mock("@/lib/effects/lazy-loader", () => ({
  getEffectCSS: vi.fn().mockResolvedValue(".test-effect { color: red; }"),
  preloadCategory: vi.fn(),
}));

vi.mock("@/components/ui/badge", () => ({
  Badge: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <span data-testid="badge" {...props}>{children}</span>
  ),
}));

/* ─── Shared test data ─── */

const mockEffect: FerrumEffectIndex = {
  className: "roycss-hover-glow-border",
  name: "Hover Glow Border",
  category: "hover",
  displayType: "box",
};

const mockTextEffect: FerrumEffectIndex = {
  className: "roycss-text-shimmer",
  name: "Text Shimmer",
  category: "text",
  displayType: "text",
};

const mockButtonEffect: FerrumEffectIndex = {
  className: "roycss-btn-pulse",
  name: "Button Pulse",
  category: "buttons",
  displayType: "button",
};

/* ════════════════════════════════════════════════════════════════
   EffectPreview Tests
   ════════════════════════════════════════════════════════════════ */

describe("EffectPreview", () => {
  it("renders a box effect correctly", () => {
    render(<EffectPreview effect={mockEffect} />);
    const box = document.querySelector(".w-12.h-12");
    expect(box).toBeInTheDocument();
    expect(box?.className).toContain("roycss-hover-glow-border");
  });

  it("renders a text effect correctly", () => {
    render(<EffectPreview effect={mockTextEffect} />);
    expect(screen.getByText("Ferrum")).toBeInTheDocument();
    expect(screen.getByText("Ferrum").className).toContain("roycss-text-shimmer");
  });

  it("renders a button effect with 'Hover me' text", () => {
    render(<EffectPreview effect={mockButtonEffect} />);
    expect(screen.getByText("Hover me")).toBeInTheDocument();
    expect(screen.getByText("Hover me").className).toContain("roycss-btn-pulse");
  });

  it("applies custom style prop to the inner element", () => {
    const { container } = render(<EffectPreview effect={mockEffect} style={{ opacity: 0.5 }} />);
    const box = container.querySelector(".roycss-hover-glow-border");
    expect(box).toHaveStyle({ opacity: 0.5 });
  });
});

/* ════════════════════════════════════════════════════════════════
   EffectDetailModal Tests
   ════════════════════════════════════════════════════════════════ */

describe("EffectDetailModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps = {
    effect: mockEffect,
    open: true,
    onClose: vi.fn(),
    onAddCollection: vi.fn(),
    isInCollection: false,
  };

  it("renders nothing when effect is null", () => {
    render(<EffectDetailModal {...defaultProps} effect={null} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders nothing when open is false", () => {
    render(<EffectDetailModal {...defaultProps} open={false} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders the modal with the effect name", async () => {
    render(<EffectDetailModal {...defaultProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Hover Glow Border")).toBeInTheDocument();
  });

  it("renders the effect class name as code", async () => {
    render(<EffectDetailModal {...defaultProps} />);
    expect(screen.getByText("roycss-hover-glow-border")).toBeInTheDocument();
  });

  it("renders the Save button when not in collection", async () => {
    render(<EffectDetailModal {...defaultProps} isInCollection={false} />);
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("renders 'Saved' when already in collection", async () => {
    render(<EffectDetailModal {...defaultProps} isInCollection={true} />);
    expect(screen.getByText("Saved")).toBeInTheDocument();
  });

  it("calls onAddCollection when Save is clicked", async () => {
    const onAddCollection = vi.fn();
    render(<EffectDetailModal {...defaultProps} onAddCollection={onAddCollection} />);
    fireEvent.click(screen.getByText("Save"));
    expect(onAddCollection).toHaveBeenCalledWith("roycss-hover-glow-border");
  });

  it("renders tab buttons: CSS, Usage, React, Vue", async () => {
    render(<EffectDetailModal {...defaultProps} />);
    expect(screen.getByRole("tab", { name: "CSS" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Usage" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "React" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Vue" })).toBeInTheDocument();
  });

  it("switches tabs on click", async () => {
    render(<EffectDetailModal {...defaultProps} />);
    // CSS tab is active by default — the CSS tabpanel should be visible
    expect(screen.getByRole("tabpanel", { name: "CSS" })).toBeInTheDocument();
    // Click React tab
    fireEvent.click(screen.getByRole("tab", { name: "React" }));
    expect(screen.getByRole("tabpanel", { name: "React" })).toBeInTheDocument();
    expect(screen.queryByRole("tabpanel", { name: "CSS" })).not.toBeInTheDocument();
  });

  it("renders the Copy button", async () => {
    render(<EffectDetailModal {...defaultProps} />);
    // There are multiple elements with text "Copy" (icon mock + button text)
    const copyButtons = screen.getAllByText("Copy");
    expect(copyButtons.length).toBeGreaterThanOrEqual(2);
  });

  it("closes on Escape key", async () => {
    const onClose = vi.fn();
    render(<EffectDetailModal {...defaultProps} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("closes on clicking the backdrop", async () => {
    const onClose = vi.fn();
    render(<EffectDetailModal {...defaultProps} onClose={onClose} />);
    // Click the outer wrapper (role="presentation")
    const backdrop = screen.getByRole("presentation");
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it("renders the category badge", async () => {
    render(<EffectDetailModal {...defaultProps} />);
    expect(screen.getByTestId("badge")).toHaveTextContent("hover");
  });
});

/* ════════════════════════════════════════════════════════════════
   CollectionDrawer Tests
   ════════════════════════════════════════════════════════════════ */

describe("CollectionDrawer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps = {
    open: true,
    onClose: vi.fn(),
    collection: [] as string[],
    onRemove: vi.fn(),
    onClear: vi.fn(),
  };

  it("renders the drawer when open", () => {
    render(<CollectionDrawer {...defaultProps} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders the empty state message when collection is empty", () => {
    render(<CollectionDrawer {...defaultProps} collection={[]} />);
    expect(screen.getByText(/No saved effects yet/)).toBeInTheDocument();
  });

  it("renders saved effects by name", () => {
    render(<CollectionDrawer {...defaultProps} collection={["roycss-hover-glow-border", "roycss-text-shimmer"]} />);
    expect(screen.getByText("Hover Glow Border")).toBeInTheDocument();
    expect(screen.getByText("Text Shimmer")).toBeInTheDocument();
  });

  it("renders class names as code elements", () => {
    render(<CollectionDrawer {...defaultProps} collection={["roycss-hover-glow-border"]} />);
    expect(screen.getByText("roycss-hover-glow-border").closest("code")).toBeInTheDocument();
  });

  it("renders Copy All and Clear buttons when collection has items", () => {
    render(<CollectionDrawer {...defaultProps} collection={["roycss-hover-glow-border"]} />);
    expect(screen.getByText("Copy All")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  it("does not render Copy All/Clear when collection is empty", () => {
    render(<CollectionDrawer {...defaultProps} collection={[]} />);
    expect(screen.queryByText("Copy All")).not.toBeInTheDocument();
    expect(screen.queryByText("Clear")).not.toBeInTheDocument();
  });

  it("calls onRemove when a remove button is clicked", () => {
    const onRemove = vi.fn();
    render(<CollectionDrawer {...defaultProps} collection={["roycss-hover-glow-border"]} onRemove={onRemove} />);
    fireEvent.click(screen.getByLabelText("Remove Hover Glow Border from saved"));
    expect(onRemove).toHaveBeenCalledWith("roycss-hover-glow-border");
  });

  it("calls onClear when Clear is clicked", () => {
    const onClear = vi.fn();
    render(<CollectionDrawer {...defaultProps} collection={["roycss-hover-glow-border"]} onClear={onClear} />);
    fireEvent.click(screen.getByText("Clear"));
    expect(onClear).toHaveBeenCalled();
  });

  it("calls onClose on Escape key", () => {
    const onClose = vi.fn();
    render(<CollectionDrawer {...defaultProps} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledWith(false);
  });

  it("calls onClose when backdrop is clicked", () => {
    const onClose = vi.fn();
    render(<CollectionDrawer {...defaultProps} onClose={onClose} />);
    const backdrop = document.querySelector("[aria-hidden='true']");
    expect(backdrop).not.toBeNull();
    fireEvent.click(backdrop!);
    expect(onClose).toHaveBeenCalledWith(false);
  });

  it("renders the title with collection count", () => {
    render(<CollectionDrawer {...defaultProps} collection={["roycss-hover-glow-border", "roycss-text-shimmer"]} />);
    expect(screen.getByText("Saved Effects (2)")).toBeInTheDocument();
  });
});
