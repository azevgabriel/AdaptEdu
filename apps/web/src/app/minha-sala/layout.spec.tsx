import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MinhaSalaLayout, { metadata } from "./layout";

describe("MinhaSalaLayout", () => {
  it("has correct page title and description metadata", () => {
    expect(metadata.title).toBe("Minha Sala — AdaptEdu");
    expect(metadata.description).toContain("estudantes neurodivergentes");
  });

  it("renders header with section name and passes children into main content", () => {
    render(
      <MinhaSalaLayout>
        <div data-testid="test-child">Conteúdo da Turma</div>
      </MinhaSalaLayout>
    );

    expect(screen.getByText("Minha Sala")).toBeInTheDocument();
    expect(screen.getByTestId("test-child")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo da Turma")).toBeInTheDocument();
  });
});

