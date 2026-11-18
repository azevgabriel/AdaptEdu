import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CvdSelector } from "./index";

describe("CvdSelector", () => {
  it("renders all 5 CVD options with descriptive Portuguese labels and badges", () => {
    const handleCvdChange = vi.fn();
    render(<CvdSelector cvdMode="default" onCvdChange={handleCvdChange} />);

    expect(
      screen.getByRole("heading", { name: /modos de daltonismo/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("radio", { name: /padrão \(tricromático universal\)/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: /deuteranopia/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: /protanopia/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: /tritanopia/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("radio", { name: /acromatopsia/i })
    ).toBeInTheDocument();
  });

  it("indicates the currently selected CVD mode", () => {
    const { rerender } = render(
      <CvdSelector cvdMode="deuteranopia" onCvdChange={vi.fn()} />
    );

    const deuteranopiaCard = screen.getByRole("radio", { name: /deuteranopia/i });
    const protanopiaCard = screen.getByRole("radio", { name: /protanopia/i });

    expect(deuteranopiaCard).toHaveAttribute("aria-checked", "true");
    expect(protanopiaCard).toHaveAttribute("aria-checked", "false");

    rerender(<CvdSelector cvdMode="tritanopia" onCvdChange={vi.fn()} />);

    expect(deuteranopiaCard).toHaveAttribute("aria-checked", "false");
    expect(
      screen.getByRole("radio", { name: /tritanopia/i })
    ).toHaveAttribute("aria-checked", "true");
  });

  it("calls onCvdChange callback when a CVD card is clicked", async () => {
    const user = userEvent.setup();
    const handleCvdChange = vi.fn();

    render(<CvdSelector cvdMode="default" onCvdChange={handleCvdChange} />);

    const tritanopiaCard = screen.getByRole("radio", { name: /tritanopia/i });
    await user.click(tritanopiaCard);

    expect(handleCvdChange).toHaveBeenCalledWith("tritanopia");
  });
});
