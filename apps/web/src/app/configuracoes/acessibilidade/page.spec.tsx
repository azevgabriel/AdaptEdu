import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AccessibilitySettingsPage from "./page";

const mockSignOut = vi.fn();
let mockUser: { name: string; email: string; role: string; school?: string; avatarUrl?: string } | null = null;

vi.mock("@/contexts/auth-context", () => ({
  useAuth: () => ({
    user: mockUser,
    signOut: mockSignOut,
    signInWithGoogle: vi.fn(),
    isLoading: false,
    refreshUser: vi.fn(),
  }),
}));

describe("AccessibilitySettingsPage", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.removeAttribute("data-cvd");
    document.documentElement.removeAttribute("data-font-size");
    document.documentElement.removeAttribute("data-dyslexia");
    document.documentElement.removeAttribute("data-high-contrast");
    document.documentElement.removeAttribute("data-reduced-motion");
    mockUser = null;
    vi.clearAllMocks();
  });

  it("renders page header, breadcrumbs, selectors, launcher card, floating button, and footer in Portuguese", () => {
    render(<AccessibilitySettingsPage />);

    expect(
      screen.getByRole("heading", {
        name: /configurações de acessibilidade & visualização/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("navigation", { name: /navegação estrutural/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /minha sala/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /tema da interface/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /modos de daltonismo/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /acomodações de leitura & sensoriais/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /matriz cromática & prévia pedagógica/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /validar cores e prévia em tempo real/i,
      })
    ).toBeInTheDocument();
  });

  it("renders authenticated teacher profile in header when teacher is logged in", () => {
    mockUser = {
      name: "Profª Maria Oliveira",
      email: "maria@escola.gov.br",
      role: "TEACHER",
      school: "E.E. Paulo Freire",
      avatarUrl: "https://example.com/avatar.png",
    };

    render(<AccessibilitySettingsPage />);

    expect(screen.getByText("Profª Maria Oliveira")).toBeInTheDocument();
    expect(screen.getByText("Educadora")).toBeInTheDocument();
  });

  it("handles non-teacher role and fallback school when omitted", () => {
    mockUser = {
      name: "Coordenador Carlos",
      email: "carlos@escola.gov.br",
      role: "COORDINATOR",
    };

    render(<AccessibilitySettingsPage />);

    expect(screen.getByText("Coordenador Carlos")).toBeInTheDocument();
    expect(screen.getByText("COORDINATOR")).toBeInTheDocument();
  });

  it("switches theme from light to dark mode and updates DOM attributes", async () => {
    const user = userEvent.setup();
    render(<AccessibilitySettingsPage />);

    const darkRadio = screen.getByRole("radio", { name: /ativar modo escuro/i });
    await user.click(darkRadio);

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(darkRadio).toHaveAttribute("aria-checked", "true");
  });

  it("switches CVD mode to Tritanopia and reflects in DOM and floating badge", async () => {
    const user = userEvent.setup();
    render(<AccessibilitySettingsPage />);

    const tritanopiaRadio = screen.getByRole("radio", { name: /tritanopia/i });
    await user.click(tritanopiaRadio);

    expect(document.documentElement.getAttribute("data-cvd")).toBe("tritanopia");
    expect(screen.getByText("Tritanopia")).toBeInTheDocument();
  });

  it("toggles dyslexia spacing, high contrast, font size, and resets settings", async () => {
    const user = userEvent.setup();
    render(<AccessibilitySettingsPage />);

    // Toggle dyslexia spacing
    const dyslexiaToggle = screen.getByLabelText(/espaçamento de leitura para dislexia/i);
    await user.click(dyslexiaToggle);
    expect(document.documentElement.getAttribute("data-dyslexia")).toBe("true");

    // Toggle high contrast
    const highContrastToggle = screen.getByLabelText(/alto contraste estrutural/i);
    await user.click(highContrastToggle);
    expect(document.documentElement.getAttribute("data-high-contrast")).toBe("true");

    // Change font size to large
    const largeFontRadio = screen.getByRole("radio", { name: /fonte grande \(115%\)/i });
    await user.click(largeFontRadio);
    expect(document.documentElement.getAttribute("data-font-size")).toBe("large");

    // Click reset button
    const resetBtn = screen.getByRole("button", {
      name: /restaurar configurações padrão/i,
    });
    await user.click(resetBtn);

    expect(document.documentElement.getAttribute("data-dyslexia")).toBeNull();
    expect(document.documentElement.getAttribute("data-high-contrast")).toBeNull();
    expect(document.documentElement.getAttribute("data-font-size")).toBeNull();
  });

  it("opens validation drawer, switches between tabs (handout and chromatic matrix), and closes drawer", async () => {
    const user = userEvent.setup();
    render(<AccessibilitySettingsPage />);

    // Initially drawer is not visible
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Click launcher button to open drawer
    const openBtn = screen.getByRole("button", {
      name: /abrir painel lateral de validação de cores e prévia/i,
    });
    await user.click(openBtn);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /prévia em tempo real: roteiro pedagógico adaptado/i,
      })
    ).toBeInTheDocument();

    // Switch to Chromatic Matrix tab
    const matrixTab = screen.getByRole("tab", {
      name: /matriz de comparação cromática/i,
    });
    await user.click(matrixTab);

    expect(
      screen.getByRole("heading", {
        name: /matriz de comparação cromática & simulação perceptiva/i,
      })
    ).toBeInTheDocument();

    // Close the drawer using the drawer's close button
    const closeBtn = within(dialog).getByRole("button", {
      name: /fechar painel lateral/i,
    });
    await user.click(closeBtn);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("toggles drawer using the floating action button", async () => {
    const user = userEvent.setup();
    render(<AccessibilitySettingsPage />);

    const fab = screen.getByRole("button", {
      name: /validar cores e prévia em tempo real/i,
    });
    await user.click(fab);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Click again to close
    const fabClose = screen.getByRole("button", {
      name: /fechar painel lateral de validação/i,
    });
    await user.click(fabClose);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the drawer when clicking on the overlay backdrop outside the panel", async () => {
    const user = userEvent.setup();
    render(<AccessibilitySettingsPage />);

    // Open drawer via launcher
    const openBtn = screen.getByRole("button", {
      name: /abrir painel lateral de validação de cores e prévia/i,
    });
    await user.click(openBtn);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    const overlay = screen.getByTestId("drawer-overlay");
    expect(overlay).toBeInTheDocument();

    // Click outside on the overlay
    await user.click(overlay);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
