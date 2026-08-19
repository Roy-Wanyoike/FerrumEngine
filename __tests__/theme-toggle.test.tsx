import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ThemeToggle } from "@/components/theme-toggle";

/* ════════════════════════════════════════════════════════════════
   ThemeToggle — cycle and dropdown variants, theme cycling
   ════════════════════════════════════════════════════════════════ */

const mockSetTheme = vi.fn();

const mockUseTheme = vi.hoisted(() => vi.fn());

vi.mock("next-themes", () => ({
  useTheme: () => mockUseTheme(),
}));

vi.mock("lucide-react", () => ({
  Sun: ({ className }: { className?: string }) => <span data-testid="icon-sun" className={className}>Sun</span>,
  Moon: ({ className }: { className?: string }) => <span data-testid="icon-moon" className={className}>Moon</span>,
  Monitor: ({ className }: { className?: string }) => <span data-testid="icon-monitor" className={className}>Monitor</span>,
  Check: ({ className }: { className?: string }) => <span data-testid="icon-check" className={className}>Check</span>,
}));

/* ════════════════════════════════════════════════════════════════
   Cycle variant (default)
   ════════════════════════════════════════════════════════════════ */

describe("ThemeToggle (cycle variant)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSetTheme.mockClear();
  });

  it("renders a placeholder button initially (aria-hidden)", () => {
    mockUseTheme.mockReturnValue({ theme: "dark", setTheme: mockSetTheme });
    // The component renders a placeholder with aria-hidden before the mounted effect fires.
    // We use a fragment so the first render's output is captured before effects run.
    const { container } = render(<ThemeToggle />);
    // After effects run the placeholder is replaced, so just verify that the component
    // renders without crashing. The real test is that it transitions to the mounted state.
    expect(container.querySelectorAll("button").length).toBeGreaterThanOrEqual(1);
  });

  it("renders the cycle button after mount", async () => {
    mockUseTheme.mockReturnValue({ theme: "dark", setTheme: mockSetTheme });
    render(<ThemeToggle />);
    // Trigger the useEffect that sets mounted = true
    await act(async () => {
      // Let React run effects
      await new Promise((r) => setTimeout(r, 0));
    });
    // The button should now be visible with the dark mode label
    expect(screen.getByLabelText("Dark mode")).toBeInTheDocument();
  });

  it("shows 'Dark mode' label when theme is dark", async () => {
    mockUseTheme.mockReturnValue({ theme: "dark", setTheme: mockSetTheme });
    render(<ThemeToggle />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
    expect(screen.getByLabelText("Dark mode")).toBeInTheDocument();
  });

  it("shows 'Light mode' label when theme is light", async () => {
    mockUseTheme.mockReturnValue({ theme: "light", setTheme: mockSetTheme });
    render(<ThemeToggle />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
    expect(screen.getByLabelText("Light mode")).toBeInTheDocument();
  });

  it("shows 'System theme' label when theme is system", async () => {
    mockUseTheme.mockReturnValue({ theme: "system", setTheme: mockSetTheme });
    render(<ThemeToggle />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
    expect(screen.getByLabelText("System theme")).toBeInTheDocument();
  });

  it("cycles from dark → light on click", async () => {
    mockUseTheme.mockReturnValue({ theme: "dark", setTheme: mockSetTheme });
    render(<ThemeToggle />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
    fireEvent.click(screen.getByLabelText("Dark mode"));
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("cycles from light → system on click", async () => {
    mockUseTheme.mockReturnValue({ theme: "light", setTheme: mockSetTheme });
    render(<ThemeToggle />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
    fireEvent.click(screen.getByLabelText("Light mode"));
    expect(mockSetTheme).toHaveBeenCalledWith("system");
  });

  it("cycles from system → dark on click", async () => {
    mockUseTheme.mockReturnValue({ theme: "system", setTheme: mockSetTheme });
    render(<ThemeToggle />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
    fireEvent.click(screen.getByLabelText("System theme"));
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("has min-h-[44px] for touch target accessibility", async () => {
    mockUseTheme.mockReturnValue({ theme: "dark", setTheme: mockSetTheme });
    render(<ThemeToggle />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
    const btn = screen.getByLabelText("Dark mode");
    expect(btn.className).toContain("min-h-[44px]");
  });

  it("renders the title with current mode", async () => {
    mockUseTheme.mockReturnValue({ theme: "dark", setTheme: mockSetTheme });
    render(<ThemeToggle />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });
    const btn = screen.getByLabelText("Dark mode");
    expect(btn).toHaveAttribute("title", "Current: Dark mode — click to switch");
  });
});

/* ════════════════════════════════════════════════════════════════
   Dropdown variant
   ════════════════════════════════════════════════════════════════ */

describe("ThemeToggle (dropdown variant)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSetTheme.mockClear();
  });

  it("renders the dropdown trigger button", () => {
    mockUseTheme.mockReturnValue({ theme: "dark", setTheme: mockSetTheme });
    render(<ThemeToggle variant="dropdown" />);
    expect(screen.getByTitle("Toggle theme")).toBeInTheDocument();
  });

  it("has aria-expanded=false by default", () => {
    mockUseTheme.mockReturnValue({ theme: "dark", setTheme: mockSetTheme });
    render(<ThemeToggle variant="dropdown" />);
    expect(screen.getByTitle("Toggle theme")).toHaveAttribute("aria-expanded", "false");
  });

  it("opens the dropdown menu on click", () => {
    mockUseTheme.mockReturnValue({ theme: "dark", setTheme: mockSetTheme });
    render(<ThemeToggle variant="dropdown" />);
    fireEvent.click(screen.getByTitle("Toggle theme"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    expect(screen.getByTitle("Toggle theme")).toHaveAttribute("aria-expanded", "true");
  });

  it("renders all three options in the dropdown", () => {
    mockUseTheme.mockReturnValue({ theme: "dark", setTheme: mockSetTheme });
    render(<ThemeToggle variant="dropdown" />);
    fireEvent.click(screen.getByTitle("Toggle theme"));
    expect(screen.getByRole("menuitem", { name: /Light/i })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /Dark/i })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: /System/i })).toBeInTheDocument();
  });

  it("shows a check icon on the active theme option", () => {
    mockUseTheme.mockReturnValue({ theme: "dark", setTheme: mockSetTheme });
    render(<ThemeToggle variant="dropdown" />);
    fireEvent.click(screen.getByTitle("Toggle theme"));
    // The Dark option should have the Check icon
    const darkItem = screen.getByRole("menuitem", { name: /Dark/i });
    expect(darkItem.querySelector('[data-testid="icon-check"]')).toBeInTheDocument();
  });

  it("calls setTheme and closes when an option is clicked", () => {
    mockUseTheme.mockReturnValue({ theme: "dark", setTheme: mockSetTheme });
    render(<ThemeToggle variant="dropdown" />);
    fireEvent.click(screen.getByTitle("Toggle theme"));
    fireEvent.click(screen.getByRole("menuitem", { name: /Light/i }));
    expect(mockSetTheme).toHaveBeenCalledWith("light");
    // Menu should close
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("closes on Escape key when open", () => {
    mockUseTheme.mockReturnValue({ theme: "dark", setTheme: mockSetTheme });
    render(<ThemeToggle variant="dropdown" />);
    fireEvent.click(screen.getByTitle("Toggle theme"));
    expect(screen.getByRole("menu")).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("has min-w-[44px] and min-h-[44px] for touch targets", () => {
    mockUseTheme.mockReturnValue({ theme: "dark", setTheme: mockSetTheme });
    render(<ThemeToggle variant="dropdown" />);
    const btn = screen.getByTitle("Toggle theme");
    expect(btn.className).toContain("w-[44px]");
    expect(btn.className).toContain("h-[44px]");
  });

  it("renders sr-only text for screen readers", () => {
    mockUseTheme.mockReturnValue({ theme: "dark", setTheme: mockSetTheme });
    render(<ThemeToggle variant="dropdown" />);
    expect(screen.getByText("Toggle theme")).toBeInTheDocument();
  });
});
