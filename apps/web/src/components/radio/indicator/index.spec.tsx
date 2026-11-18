import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { RadioIndicator } from "./index";
import { RadioButtonContext } from "../context";

describe("RadioIndicator Component", () => {
  it("renders unchecked indicator with aria-hidden", () => {
    const { container } = render(<RadioIndicator checked={false} />);
    const indicator = container.firstChild as HTMLElement;

    expect(indicator).toBeInTheDocument();
    expect(indicator).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector('[class*="radioIndicatorDot"]')).toBeNull();
  });

  it("renders checked dot when checked=true", () => {
    const { container } = render(<RadioIndicator checked={true} />);
    expect(
      container.querySelector('[class*="radioIndicatorDot"]')
    ).not.toBeNull();
  });

  it("applies different size classes (sm, md, lg)", () => {
    const { container, rerender } = render(<RadioIndicator size="sm" />);
    expect((container.firstChild as HTMLElement).className).toMatch(
      /indicatorSm/
    );

    rerender(<RadioIndicator size="md" />);
    expect((container.firstChild as HTMLElement).className).toMatch(
      /indicatorMd/
    );

    rerender(<RadioIndicator size="lg" />);
    expect((container.firstChild as HTMLElement).className).toMatch(
      /indicatorLg/
    );
  });

  it("consumes checked and size from RadioButtonContext when props are omitted", () => {
    const { container } = render(
      <RadioButtonContext.Provider
        value={{ checked: true, disabled: false, value: "test", size: "lg" }}
      >
        <RadioIndicator />
      </RadioButtonContext.Provider>
    );

    expect((container.firstChild as HTMLElement).className).toMatch(
      /indicatorLg/
    );
    expect(
      container.querySelector('[class*="radioIndicatorDot"]')
    ).not.toBeNull();
  });
});
