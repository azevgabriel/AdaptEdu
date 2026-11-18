import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoginAuthCard } from "./index";
import * as navigation from "next/navigation";

describe("LoginAuthCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders educator access card title, subtitle, and privacy notice in Portuguese", () => {
    vi.spyOn(navigation, "useSearchParams").mockReturnValue({
      get: () => null,
    } as unknown as ReturnType<typeof navigation.useSearchParams>);

    render(<LoginAuthCard />);

    expect(
      screen.getByRole("heading", { level: 2, name: /acesso do educador/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/acesse o painel da sua turma com sua conta google/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /entrar com a conta institucional google/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/compromisso com a privacidade & lgpd/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/acesso gratuito para a rede pública • em conformidade com a lbi e a ldb/i),
    ).toBeInTheDocument();
  });

  it("renders error message alert when error query param is present", () => {
    const customError = "Código de autenticação expirado ou inválido";

    vi.spyOn(navigation, "useSearchParams").mockReturnValue({
      get: (param: string) => {
        if (param === "error") return customError;
        return null;
      },
    } as unknown as ReturnType<typeof navigation.useSearchParams>);

    render(<LoginAuthCard />);

    const alertBox = screen.getByRole("alert");
    expect(alertBox).toBeInTheDocument();
    expect(alertBox).toHaveTextContent(customError);
  });

  it("does not render error message alert when error query param is absent", () => {
    vi.spyOn(navigation, "useSearchParams").mockReturnValue({
      get: () => null,
    } as unknown as ReturnType<typeof navigation.useSearchParams>);

    render(<LoginAuthCard />);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
