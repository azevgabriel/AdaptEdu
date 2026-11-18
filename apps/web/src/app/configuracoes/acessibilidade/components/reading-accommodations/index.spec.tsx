import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReadingAccommodations } from "./index";

describe("ReadingAccommodations", () => {
  it("renders all font size options and accommodation switches", () => {
    const { container } = render(
      <ReadingAccommodations
        fontSize="normal"
        onFontSizeChange={vi.fn()}
        dyslexiaFont={false}
        onDyslexiaFontChange={vi.fn()}
        highContrast={false}
        onHighContrastChange={vi.fn()}
        reducedMotion={false}
        onReducedMotionChange={vi.fn()}
      />
    );

    expect(
      screen.getByRole("heading", { name: /acomodações de leitura & sensoriais/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("radio", { name: /fonte normal \(100%\)/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: /fonte grande \(115%\)/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: /fonte muito grande \(130%\)/i })
    ).toBeInTheDocument();

    // Verifies that radio indicators are rendered in each font size card
    const indicators = container.querySelectorAll('[class*="fontSizeIndicator"]');
    expect(indicators.length).toBe(3);

    expect(
      screen.getByLabelText(/alto contraste estrutural/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/espaçamento de leitura para dislexia & tdah/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/redução de movimento e animações/i)
    ).toBeInTheDocument();
  });

  it("handles font size selection changes", async () => {
    const user = userEvent.setup();
    const handleFontSizeChange = vi.fn();

    render(
      <ReadingAccommodations
        fontSize="normal"
        onFontSizeChange={handleFontSizeChange}
        dyslexiaFont={false}
        onDyslexiaFontChange={vi.fn()}
        highContrast={false}
        onHighContrastChange={vi.fn()}
        reducedMotion={false}
        onReducedMotionChange={vi.fn()}
      />
    );

    const largeBtn = screen.getByRole("radio", { name: /fonte grande \(115%\)/i });
    await user.click(largeBtn);

    expect(handleFontSizeChange).toHaveBeenCalledWith("large");
  });

  it("handles toggling high contrast, dyslexia spacing, and reduced motion", async () => {
    const user = userEvent.setup();
    const handleHighContrastChange = vi.fn();
    const handleDyslexiaChange = vi.fn();
    const handleReducedMotionChange = vi.fn();

    render(
      <ReadingAccommodations
        fontSize="normal"
        onFontSizeChange={vi.fn()}
        dyslexiaFont={false}
        onDyslexiaFontChange={handleDyslexiaChange}
        highContrast={false}
        onHighContrastChange={handleHighContrastChange}
        reducedMotion={false}
        onReducedMotionChange={handleReducedMotionChange}
      />
    );

    const highContrastCheck = screen.getByLabelText(/alto contraste estrutural/i);
    await user.click(highContrastCheck);
    expect(handleHighContrastChange).toHaveBeenCalledWith(true);

    const dyslexiaCheck = screen.getByLabelText(/espaçamento de leitura/i);
    await user.click(dyslexiaCheck);
    expect(handleDyslexiaChange).toHaveBeenCalledWith(true);

    const motionCheck = screen.getByLabelText(/redução de movimento/i);
    await user.click(motionCheck);
    expect(handleReducedMotionChange).toHaveBeenCalledWith(true);
  });

  it("toggles accommodation switches when clicking anywhere on the card surface", async () => {
    const user = userEvent.setup();
    const handleHighContrastChange = vi.fn();
    const handleDyslexiaChange = vi.fn();
    const handleReducedMotionChange = vi.fn();

    render(
      <ReadingAccommodations
        fontSize="normal"
        onFontSizeChange={vi.fn()}
        dyslexiaFont={false}
        onDyslexiaFontChange={handleDyslexiaChange}
        highContrast={false}
        onHighContrastChange={handleHighContrastChange}
        reducedMotion={false}
        onReducedMotionChange={handleReducedMotionChange}
      />
    );

    // Click on the text label / description inside the card rather than the switch button
    const titleText = screen.getByText("Alto Contraste Estrutural (Anti-Ofuscamento)");
    await user.click(titleText);
    expect(handleHighContrastChange).toHaveBeenCalledWith(true);

    const dyslexiaDesc = screen.getByText(/amplia o espaçamento entre caracteres/i);
    await user.click(dyslexiaDesc);
    expect(handleDyslexiaChange).toHaveBeenCalledWith(true);

    const motionTitle = screen.getByText("Redução de Movimento e Animações");
    await user.click(motionTitle);
    expect(handleReducedMotionChange).toHaveBeenCalledWith(true);
  });
});
