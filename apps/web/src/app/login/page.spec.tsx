import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginPage, { metadata } from "./page";
import { LoginAuthCard } from "./login-auth-card";
import * as navigation from "next/navigation";

describe("LoginPage & LoginAuthCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders core mission, neurodiversity badges and login card in Portuguese", () => {
    render(<LoginPage />);

    // Brand and Badge
    expect(screen.getByText(/apoio à escola pública/i)).toBeInTheDocument();

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
  });

  it("displays error message alert in LoginAuthCard when error query param is present", () => {
    const customError = "Código de autenticação expirado ou inválido";

    vi.spyOn(navigation, "useSearchParams").mockReturnValue({
      get: (param: string) => {
        if (param === "error") return customError;
        if (param === "returnUrl") return "/dashboard";
        return null;
      },
    } as unknown as ReturnType<typeof navigation.useSearchParams>);

    render(<LoginAuthCard />);

    const alertBox = screen.getByRole("alert");
    expect(alertBox).toBeInTheDocument();
    expect(alertBox).toHaveTextContent(customError);
  });

  it("exports correct page metadata", () => {
    expect(metadata.title).toBe("Acesso do Educador — AdaptEdu");
  });
});
