import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MenuHeader } from "./index";

describe("MenuHeader Component", () => {
  it("renders header container with children", () => {
    render(<MenuHeader>Informações do Professor</MenuHeader>);
    expect(screen.getByText("Informações do Professor")).toBeInTheDocument();
  });
});
