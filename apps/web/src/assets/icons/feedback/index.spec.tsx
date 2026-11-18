import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AlertCircleIcon, CheckIcon, InfoIcon } from "./index";

describe("Feedback Icons", () => {
  it("renders AlertCircleIcon with title and role img", () => {
    render(<AlertCircleIcon title="Atenção: erro no formulário" />);
    expect(
      screen.getByRole("img", { name: "Atenção: erro no formulário" })
    ).toBeInTheDocument();
  });

  it("renders CheckIcon with default decorative aria-hidden", () => {
    render(<CheckIcon data-testid="check-icon" />);
    const svg = screen.getByTestId("check-icon");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("renders InfoIcon with aria-label", () => {
    render(<InfoIcon aria-label="Informação pedagógica" />);
    expect(
      screen.getByRole("img", { name: "Informação pedagógica" })
    ).toBeInTheDocument();
  });
});
