import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { TopToolbar } from "@/components/ferrum/playground/toolbar";
import { ControlsPanel } from "@/components/ferrum/playground/controls-panel";
import { LivePreview } from "@/components/ferrum/playground/preview-panel";
import { ActivityBar, ComponentSidebar } from "@/components/ferrum/playground/effect-sidebar";
import { DEFAULT_MOTION, DEFAULT_PHYSICS, DEFAULT_THEME } from "@/components/ferrum/playground-v2-data";
import type { Metrics } from "@/components/ferrum/playground/types";

/* ════════════════════════════════════════════════════════════════
   Playground Components — Toolbar, ControlsPanel, Preview, Sidebar
   ════════════════════════════════════════════════════════════════ */

// hoisted mock refs
const mockOnBack = vi.fn();
const mockOnExport = vi.fn();
const mockOnCopy = vi.fn();
const mockOnMotionChange = vi.fn();
const mockOnPhysicsChange = vi.fn();
const mockOnThemeChange = vi.fn();
const mockOnToggleReducedMotion = vi.fn();
const mockOnDeviceChange = vi.fn();

vi.mock("lucide-react", () => ({
  ArrowLeft: () => <span data-testid="icon-arrow-left">ArrowLeft</span>,
  Play: () => <span data-testid="icon-play">Play</span>,
  Code: () => <span data-testid="icon-code">Code</span>,
  Eye: () => <span data-testid="icon-eye">Eye</span>,
  SplitSquareHorizontal: () => <span data-testid="icon-split">SplitSquareHorizontal</span>,
  Copy: () => <span data-testid="icon-copy">Copy</span>,
  Check: () => <span data-testid="icon-check">Check</span>,
  Download: () => <span data-testid="icon-download">Download</span>,
  Keyboard: () => <span data-testid="icon-keyboard">Keyboard</span>,
  FileCode: () => <span data-testid="icon-file-code">FileCode</span>,
  ChevronDown: () => <span data-testid="icon-chevron-down">ChevronDown</span>,
  ChevronRight: () => <span data-testid="icon-chevron-right">ChevronRight</span>,
  RotateCcw: () => <span data-testid="icon-rotate-ccw">RotateCcw</span>,
  Bot: () => <span data-testid="icon-bot">Bot</span>,
  Waves: () => <span data-testid="icon-waves">Waves</span>,
  Orbit: () => <span data-testid="icon-orbit">Orbit</span>,
  Palette: () => <span data-testid="icon-palette">Palette</span>,
  Accessibility: () => <span data-testid="icon-accessibility">Accessibility</span>,
  Gauge: () => <span data-testid="icon-gauge">Gauge</span>,
  Activity: () => <span data-testid="icon-activity">Activity</span>,
  Box: () => <span data-testid="icon-box">Box</span>,
  Clock: () => <span data-testid="icon-clock">Clock</span>,
  Search: () => <span data-testid="icon-search">Search</span>,
  Sparkles: () => <span data-testid="icon-sparkles">Sparkles</span>,
  Component: () => <span data-testid="icon-component">Component</span>,
  LayoutTemplate: () => <span data-testid="icon-layout-template">LayoutTemplate</span>,
  Cpu: () => <span data-testid="icon-cpu">Cpu</span>,
}));

vi.mock("@/lib/icon-resolver", () => ({
  resolveIcon: () => () => <span data-testid="icon-resolved">Icon</span>,
}));

/* ════════════════════════════════════════════════════════════════
   TopToolbar Tests
   ════════════════════════════════════════════════════════════════ */

describe("TopToolbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps = {
    onBack: mockOnBack,
    viewMode: "split" as const,
    onViewModeChange: vi.fn(),
    onExport: mockOnExport,
    copied: false,
    onCopy: mockOnCopy,
  };

  it("renders without crashing", () => {
    render(<TopToolbar {...defaultProps} />);
    expect(screen.getByText("Playground")).toBeInTheDocument();
  });

  it("renders the version badge", () => {
    render(<TopToolbar {...defaultProps} />);
    expect(screen.getByText("v2.0")).toBeInTheDocument();
  });

  it("renders view mode buttons: Split, Code, Preview", () => {
    render(<TopToolbar {...defaultProps} />);
    expect(screen.getByTitle("Split View")).toBeInTheDocument();
    expect(screen.getByTitle("Code View")).toBeInTheDocument();
    expect(screen.getByTitle("Preview View")).toBeInTheDocument();
  });

  it("calls onBack when the back button is clicked", () => {
    render(<TopToolbar {...defaultProps} />);
    fireEvent.click(screen.getByTitle("Back to Home"));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it("calls onCopy when the copy button is clicked", () => {
    render(<TopToolbar {...defaultProps} />);
    fireEvent.click(screen.getByTitle("Copy Code"));
    expect(mockOnCopy).toHaveBeenCalledTimes(1);
  });

  it("shows the Check icon when copied is true", () => {
    render(<TopToolbar {...defaultProps} copied={true} />);
    // The copy button should now show the Check icon
    expect(screen.getByTestId("icon-check")).toBeInTheDocument();
  });

  it("opens the export dropdown when the Export button is clicked", () => {
    render(<TopToolbar {...defaultProps} />);
    fireEvent.click(screen.getByText("Export"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("closes the export dropdown on clicking an export option", () => {
    render(<TopToolbar {...defaultProps} />);
    fireEvent.click(screen.getByText("Export"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    // Click the first menuitem
    const items = screen.getAllByRole("menuitem");
    fireEvent.click(items[0]!);
    expect(mockOnExport).toHaveBeenCalled();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("opens the keyboard shortcuts dialog", () => {
    render(<TopToolbar {...defaultProps} />);
    fireEvent.click(screen.getByTitle("Keyboard Shortcuts"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Keyboard Shortcuts")).toBeInTheDocument();
  });

  it("closes the keyboard shortcuts dialog on Escape", () => {
    render(<TopToolbar {...defaultProps} />);
    fireEvent.click(screen.getByTitle("Keyboard Shortcuts"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders keyboard shortcut items in the dialog", () => {
    render(<TopToolbar {...defaultProps} />);
    fireEvent.click(screen.getByTitle("Keyboard Shortcuts"));
    expect(screen.getByText("Switch view mode")).toBeInTheDocument();
    expect(screen.getByText("Toggle sidebar")).toBeInTheDocument();
    expect(screen.getByText("Back to home")).toBeInTheDocument();
  });

  it("calls onViewModeChange when a view mode button is clicked", () => {
    const onViewModeChange = vi.fn();
    render(<TopToolbar {...defaultProps} onViewModeChange={onViewModeChange} />);
    fireEvent.click(screen.getByTitle("Code View"));
    expect(onViewModeChange).toHaveBeenCalledWith("code");
    fireEvent.click(screen.getByTitle("Preview View"));
    expect(onViewModeChange).toHaveBeenCalledWith("preview");
  });
});

/* ════════════════════════════════════════════════════════════════
   ControlsPanel Tests
   ════════════════════════════════════════════════════════════════ */

describe("ControlsPanel", () => {
  const mockMetrics: Metrics = { domNodes: 42, cssRules: 15, animations: 3, renderTime: 5 };

  const defaultProps = {
    motion: DEFAULT_MOTION,
    onMotionChange: mockOnMotionChange,
    physics: DEFAULT_PHYSICS,
    onPhysicsChange: mockOnPhysicsChange,
    theme: DEFAULT_THEME,
    onThemeChange: mockOnThemeChange,
    selectedComponent: "card",
    selectedEffect: "",
    metrics: mockMetrics,
    reducedMotion: false,
    onToggleReducedMotion: mockOnToggleReducedMotion,
  };

  it("renders without crashing", () => {
    render(<ControlsPanel {...defaultProps} />);
    expect(screen.getByText("Properties")).toBeInTheDocument();
  });

  it("renders the component info bar", () => {
    render(<ControlsPanel {...defaultProps} />);
    expect(screen.getByText(/Component:/)).toBeInTheDocument();
    expect(screen.getByText("card")).toBeInTheDocument();
  });

  it("renders the Motion section by default (expanded)", () => {
    render(<ControlsPanel {...defaultProps} />);
    // Motion section is expanded by default, so Duration label should be visible
    expect(screen.getByText("Duration")).toBeInTheDocument();
  });

  it("renders all collapsible section buttons", () => {
    render(<ControlsPanel {...defaultProps} />);
    expect(screen.getByText("Motion")).toBeInTheDocument();
    expect(screen.getByText("Physics")).toBeInTheDocument();
    expect(screen.getByText("Theme")).toBeInTheDocument();
    // Accessibility text appears as both icon mock text and button label
    const allAccessibility = screen.getAllByText("Accessibility");
    expect(allAccessibility.length).toBeGreaterThanOrEqual(2);
    // Performance icon is Gauge, so only the button label matches
    expect(screen.getByText("Performance")).toBeInTheDocument();
    expect(screen.getByText("AI Assistant")).toBeInTheDocument();
  });

  it("toggles a section open on click", () => {
    render(<ControlsPanel {...defaultProps} />);
    // Physics is collapsed by default
    const physicsBtn = screen.getByText("Physics");
    fireEvent.click(physicsBtn);
    // After clicking, the Tension label should appear
    expect(screen.getByText("Tension")).toBeInTheDocument();
  });

  it("renders the reduced motion toggle switch", () => {
    render(<ControlsPanel {...defaultProps} />);
    // Expand Accessibility section — there are multiple elements with that text (icon + button label)
    // Use the last one which is the section button
    const accessibilityButtons = screen.getAllByText("Accessibility");
    fireEvent.click(accessibilityButtons[accessibilityButtons.length - 1]!);
    const switchEl = screen.getByRole("switch", { name: "Toggle reduced motion" });
    expect(switchEl).toBeInTheDocument();
    expect(switchEl).toHaveAttribute("aria-checked", "false");
  });

  it("toggles reduced motion switch", () => {
    render(<ControlsPanel {...defaultProps} />);
    const accessibilityButtons = screen.getAllByText("Accessibility");
    fireEvent.click(accessibilityButtons[accessibilityButtons.length - 1]!);
    const switchEl = screen.getByRole("switch", { name: "Toggle reduced motion" });
    fireEvent.click(switchEl);
    expect(mockOnToggleReducedMotion).toHaveBeenCalledTimes(1);
  });

  it("renders performance metrics", () => {
    render(<ControlsPanel {...defaultProps} />);
    fireEvent.click(screen.getByText("Performance"));
    expect(screen.getByText("DOM Nodes")).toBeInTheDocument();
    expect(screen.getByText("CSS Rules")).toBeInTheDocument();
    expect(screen.getByText("Animations")).toBeInTheDocument();
    expect(screen.getByText("Render Time")).toBeInTheDocument();
  });

  it("renders the AI Assistant section with disabled input", () => {
    render(<ControlsPanel {...defaultProps} />);
    fireEvent.click(screen.getByText("AI Assistant"));
    expect(screen.getByText("Ferrum AI")).toBeInTheDocument();
    const aiInput = screen.getByPlaceholderText("Describe a component...");
    expect(aiInput).toBeDisabled();
    expect(screen.getByText("Coming in v2.1")).toBeInTheDocument();
  });

  it("renders the Reset to Default button in Theme section", () => {
    render(<ControlsPanel {...defaultProps} />);
    fireEvent.click(screen.getByText("Theme"));
    expect(screen.getByText("Reset to Default")).toBeInTheDocument();
  });

  it("renders the primary color picker in Theme section", () => {
    render(<ControlsPanel {...defaultProps} />);
    fireEvent.click(screen.getByText("Theme"));
    expect(screen.getByLabelText("Primary color picker")).toBeInTheDocument();
    expect(screen.getByLabelText("Primary color hex value")).toBeInTheDocument();
  });
});

/* ════════════════════════════════════════════════════════════════
   LivePreview Tests
   ════════════════════════════════════════════════════════════════ */

describe("LivePreview", () => {
  const defaultProps = {
    html: "<html><body><h1>Hello</h1></body></html>",
    device: "desktop",
    customWidth: 800,
    onDeviceChange: mockOnDeviceChange,
  };

  it("renders without crashing", () => {
    render(<LivePreview {...defaultProps} />);
    expect(screen.getByText("Preview")).toBeInTheDocument();
  });

  it("renders the preview iframe with correct title", () => {
    render(<LivePreview {...defaultProps} />);
    expect(screen.getByTitle("Ferrum Playground Preview")).toBeInTheDocument();
  });

  it("renders device buttons with correct titles", () => {
    render(<LivePreview {...defaultProps} />);
    expect(screen.getByTitle("Desktop (1440px)")).toBeInTheDocument();
    expect(screen.getByTitle("Laptop (1024px)")).toBeInTheDocument();
    expect(screen.getByTitle("Tablet (768px)")).toBeInTheDocument();
    expect(screen.getByTitle("Mobile (375px)")).toBeInTheDocument();
  });

  it("calls onDeviceChange when a device button is clicked", () => {
    render(<LivePreview {...defaultProps} />);
    fireEvent.click(screen.getByTitle("Mobile (375px)"));
    expect(mockOnDeviceChange).toHaveBeenCalledWith("mobile");
  });

  it("renders the traffic light dots in the preview toolbar", () => {
    render(<LivePreview {...defaultProps} />);
    // The dots are div elements, not buttons. Verify they exist via the container.
    const toolbar = screen.getByText("Preview").closest("div");
    expect(toolbar?.querySelectorAll(".rounded-full").length).toBe(3);
  });

  it("sets iframe srcdoc on mount", () => {
    const html = "<html><body><p>Test</p></body></html>";
    render(<LivePreview {...defaultProps} html={html} />);
    const iframe = screen.getByTitle("Ferrum Playground Preview") as HTMLIFrameElement;
    expect(iframe.srcdoc).toBe(html);
  });
});

/* ════════════════════════════════════════════════════════════════
   ActivityBar & ComponentSidebar Tests
   ════════════════════════════════════════════════════════════════ */

describe("ActivityBar", () => {
  it("renders all three activity buttons", () => {
    render(<ActivityBar active={"components"} onChange={vi.fn()} />);
    expect(screen.getByTitle("Components")).toBeInTheDocument();
    expect(screen.getByTitle("Effects")).toBeInTheDocument();
    expect(screen.getByTitle("Templates")).toBeInTheDocument();
  });

  it("calls onChange when a button is clicked", () => {
    const onChange = vi.fn();
    render(<ActivityBar active={"components"} onChange={onChange} />);
    fireEvent.click(screen.getByTitle("Effects"));
    expect(onChange).toHaveBeenCalledWith("effects");
    fireEvent.click(screen.getByTitle("Templates"));
    expect(onChange).toHaveBeenCalledWith("templates");
  });
});

describe("ComponentSidebar", () => {
  const defaultProps = {
    activity: "components" as const,
    selectedComponent: "card",
    onSelectComponent: vi.fn(),
    selectedEffect: "",
    onSelectEffect: vi.fn(),
    onSelectTemplate: vi.fn(),
    effectsList: [],
    search: "",
    setSearch: vi.fn(),
    effectCategory: "all",
    setEffectCategory: vi.fn(),
  };

  it("renders the search input", () => {
    render(<ComponentSidebar {...defaultProps} />);
    expect(screen.getByLabelText("Search components")).toBeInTheDocument();
  });

  it("renders components from the components view", () => {
    render(<ComponentSidebar {...defaultProps} activity="components" />);
    // Should render component items — each has a label like 'Card' and description
    // Use a broader query since the component list is rendered
    const componentButtons = screen.getAllByText(/^Card$|^Button$|^Badge$|^Input$/i);
    expect(componentButtons.length).toBeGreaterThanOrEqual(1);
  });

  it("calls setSearch when typing in the search input", () => {
    const setSearch = vi.fn();
    render(<ComponentSidebar {...defaultProps} setSearch={setSearch} />);
    fireEvent.change(screen.getByLabelText("Search components"), { target: { value: "button" } });
    expect(setSearch).toHaveBeenCalledWith("button");
  });

  it("renders 'No effects found' when effects view has no matching effects", () => {
    render(<ComponentSidebar {...defaultProps} activity="effects" effectsList={[]} search="zzz" />);
    expect(screen.getByText("No effects found")).toBeInTheDocument();
  });

  it("renders templates in the templates view", () => {
    render(<ComponentSidebar {...defaultProps} activity="templates" />);
    // There should be at least one template label rendered
    const buttons = screen.getAllByText(/Landing Page|Dashboard|Pricing|Portfolio/i);
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("renders category filter pills in effects view", () => {
    render(<ComponentSidebar {...defaultProps} activity="effects" />);
    expect(screen.getByText("All")).toBeInTheDocument();
  });
});
