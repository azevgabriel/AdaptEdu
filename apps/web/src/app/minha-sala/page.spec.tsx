import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MinhaSalaPage from "./page";

describe("MinhaSalaPage", () => {
  it("renders page header and welcoming subtitle in Portuguese", () => {
    render(<MinhaSalaPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /painel da minha sala — 7º ano b/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/aqui você organiza a dinâmica espacial da sala/i)
    ).toBeInTheDocument();
  });

  it("renders quick statistical overview cards for the classroom", () => {
    render(<MinhaSalaPage />);

    expect(screen.getByText("Total de Estudantes")).toBeInTheDocument();
    expect(screen.getByText("28")).toBeInTheDocument();

    expect(screen.getByText("Apoio com PEI Ativo")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();

    expect(screen.getByText("Próxima Aula")).toBeInTheDocument();
    expect(screen.getByText("09:15")).toBeInTheDocument();

    expect(screen.getByText("Adaptações em Dia")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("renders inclusion quick action cards with links to features", () => {
    render(<MinhaSalaPage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /ações rápidas de inclusão/i,
      })
    ).toBeInTheDocument();

    // Classroom seating arrangement
    expect(
      screen.getByRole("heading", { level: 3, name: /disposição das carteiras/i })
    ).toBeInTheDocument();
    const seatingLink = screen.getByRole("link", {
      name: /organizar mapa de carteiras/i,
    });
    expect(seatingLink).toHaveAttribute("href", "/minha_sala/carteiras");

    // Adapted lesson plans
    expect(
      screen.getByRole("heading", { level: 3, name: /planos de aula adaptados/i })
    ).toBeInTheDocument();
    const plansLink = screen.getByRole("link", { name: /visualizar planos/i });
    expect(plansLink).toHaveAttribute("href", "/minha_sala/planos_aula");

    // Visual routine
    expect(
      screen.getByRole("heading", { level: 3, name: /rotina visual da aula/i })
    ).toBeInTheDocument();
    const routineLink = screen.getByRole("link", {
      name: /configurar rotina visual/i,
    });
    expect(routineLink).toHaveAttribute("href", "/minha_sala/rotinas");
  });
});

