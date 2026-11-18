import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardIcon } from "./index";

describe("CardIcon", () => {
  it("renders with aria-hidden='true' for decorative iconography", () => {
    const { container } = render(
      <CardIcon>
        <span data-testid="test-icon">📚</span>
      </CardIcon>
    );

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
  });
});
