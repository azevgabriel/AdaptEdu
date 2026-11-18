import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MenuSeparator } from "./index";

describe("MenuSeparator Component", () => {
  it("renders with role='separator'", () => {
    render(<MenuSeparator />);
    const separator = screen.getByRole("separator");
    expect(separator).toBeInTheDocument();
  });
});
