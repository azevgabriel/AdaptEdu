import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardFooter } from "./index";

describe("CardFooter", () => {
  it("renders footer content", () => {
    render(<CardFooter>Nota de rodapé</CardFooter>);
    expect(screen.getByText("Nota de rodapé")).toBeInTheDocument();
  });
});
