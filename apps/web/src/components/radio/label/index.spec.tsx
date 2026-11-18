import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RadioLabel, RadioDescription } from "./index";

describe("RadioLabel & RadioDescription Components", () => {
  it("renders RadioLabel with children and custom class", () => {
    render(<RadioLabel className="custom-label">Título do Radio</RadioLabel>);
    const label = screen.getByText("Título do Radio");

    expect(label).toBeInTheDocument();
    expect(label.className).toMatch(/defaultLabel/);
    expect(label).toHaveClass("custom-label");
  });

  it("renders RadioDescription with children and custom class", () => {
    render(
      <RadioDescription className="custom-desc">
        Descrição de apoio
      </RadioDescription>
    );
    const desc = screen.getByText("Descrição de apoio");

    expect(desc).toBeInTheDocument();
    expect(desc.className).toMatch(/defaultDescription/);
    expect(desc).toHaveClass("custom-desc");
  });
});
