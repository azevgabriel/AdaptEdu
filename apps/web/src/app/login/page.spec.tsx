import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginPage, { metadata } from "./page";

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders core mission, neurodiversity badges and login card in Portuguese", () => {
    render(<LoginPage />);

    // Brand and Badge
    expect(
      screen.getByRole("link", { name: /adaptEdu - página inicial/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/apoio à escola pública/i)).toBeInTheDocument();

    // Reusable Header in unauthenticated state should NOT render user profile options
    expect(
      screen.queryByRole("button", { name: /menu do usuário/i }),
    ).not.toBeInTheDocument();

    // Accessibility option remains available in Header
    expect(
      screen.getByRole("link", {
        name: /configurações de acessibilidade e visualização/i,
      }),
    ).toBeInTheDocument();

    // Main mission headline
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /inclusão real na sala de aula, sem sobrecarregar o professor/i,
      }),
    ).toBeInTheDocument();

    // Neurodiversity condition pills
    expect(screen.getByText("Autismo (TEA)")).toBeInTheDocument();
    expect(screen.getByText("TDAH")).toBeInTheDocument();
    expect(screen.getByText("Dislexia")).toBeInTheDocument();
    expect(screen.getByText("Discalculia")).toBeInTheDocument();
    expect(screen.getByText("Síndrome de Tourette")).toBeInTheDocument();

    // Teacher Auth Card
    expect(
      screen.getByRole("heading", { level: 2, name: /acesso do educador/i }),
    ).toBeInTheDocument();

    // Google Sign-in button
    expect(
      screen.getByRole("button", {
        name: /entrar com a conta institucional google/i,
      }),
    ).toBeInTheDocument();

    // Privacy & LGPD notice
    expect(
      screen.getByText(/compromisso com a privacidade & lgpd/i),
    ).toBeInTheDocument();

    // Footer with project repository and developer links
    expect(
      screen.getByRole("link", {
        name: /repositório do projeto adaptedu no github/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /assinar newsletter no linkedin/i,
      }),
    ).toBeInTheDocument();
  });

  it("exports correct page metadata", () => {
    expect(metadata.title).toBe("Acesso do Educador — AdaptEdu");
  });
});
