import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeSelector } from "./index";

describe("ThemeSelector", () => {
  it("renders light and dark mode option cards with radio indicators", () => {
    const handleThemeChange = vi.fn();
    const { container } = render(
      <ThemeSelector theme="light" onThemeChange={handleThemeChange} />
    );

    expect(
      screen.getByRole("heading", { name: /tema da interface/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: /ativar modo claro/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: /ativar modo escuro/i })
    ).toBeInTheDocument();

    const indicators = container.querySelectorAll('[class*="radioIndicator"]');
    expect(indicators.length).toBeGreaterThanOrEqual(2);
  });

  it("indicates which theme is currently active", () => {
    const { rerender } = render(
      <ThemeSelector theme="light" onThemeChange={vi.fn()} />
    );

    const lightCard = screen.getByRole("radio", { name: /ativar modo claro/i });
    const darkCard = screen.getByRole("radio", { name: /ativar modo escuro/i });

    expect(lightCard).toHaveAttribute("aria-checked", "true");
    expect(darkCard).toHaveAttribute("aria-checked", "false");

    rerender(<ThemeSelector theme="dark" onThemeChange={vi.fn()} />);

    expect(lightCard).toHaveAttribute("aria-checked", "false");
    expect(darkCard).toHaveAttribute("aria-checked", "true");
  });

  it("calls onThemeChange callback when a theme card is clicked", async () => {
    const user = userEvent.setup();
    const handleThemeChange = vi.fn();

    const { rerender } = render(
      <ThemeSelector theme="light" onThemeChange={handleThemeChange} />
    );

    const darkCard = screen.getByRole("radio", { name: /ativar modo escuro/i });
    await user.click(darkCard);
    expect(handleThemeChange).toHaveBeenCalledWith("dark");

    rerender(<ThemeSelector theme="dark" onThemeChange={handleThemeChange} />);
    const lightCard = screen.getByRole("radio", { name: /ativar modo claro/i });
    await user.click(lightCard);
    expect(handleThemeChange).toHaveBeenCalledWith("light");
  });
});
