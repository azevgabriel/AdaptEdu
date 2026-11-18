import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardHeader } from "./index";

describe("CardHeader", () => {
  it("renders children in a header container", () => {
    render(<CardHeader>Header Content</CardHeader>);
    expect(screen.getByText("Header Content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<CardHeader className="custom-header">Content</CardHeader>);
    expect(container.firstChild).toHaveClass("custom-header");
  });
});
