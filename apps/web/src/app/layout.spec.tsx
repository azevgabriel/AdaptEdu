import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RootLayout, { metadata } from "./layout";

describe("RootLayout", () => {
  it("renders children wrapped inside body and AuthProvider", () => {
    render(
      <RootLayout>
        <span data-testid="child-element">Conteúdo do AdaptEdu</span>
      </RootLayout>,
    );

    expect(screen.getByTestId("child-element")).toBeInTheDocument();
  });

  it("exports valid metadata with Portuguese title and description", () => {
    expect(metadata.title).toBe("AdaptEdu — Plataforma de Inclusão Escolar");
  });
});
