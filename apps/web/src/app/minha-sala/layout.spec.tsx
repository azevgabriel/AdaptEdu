import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ClassroomLayout, { metadata } from "./layout";

describe("ClassroomLayout", () => {
  it("has correct page title and description metadata", () => {
    expect(metadata.title).toBe("Minha Sala — AdaptEdu");
    expect(metadata.description).toContain("estudantes neurodivergentes");
  });

  it("renders header with section name and passes children into main content", () => {
    render(
      <ClassroomLayout>
        <div data-testid="test-child">Conteúdo da Turma</div>
      </ClassroomLayout>
    );

    expect(screen.getByText("Minha Sala")).toBeInTheDocument();
    expect(screen.getByTestId("test-child")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo da Turma")).toBeInTheDocument();
  });
});

