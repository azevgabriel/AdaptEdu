import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardBody } from "./index";

describe("CardBody", () => {
  it("renders body content", () => {
    render(<CardBody>Conteúdo do Corpo</CardBody>);
    expect(screen.getByText("Conteúdo do Corpo")).toBeInTheDocument();
  });
});
