import { describe, it, expect, vi } from "vitest";
import { redirect } from "next/navigation";
import ConfiguracoesRootPage from "./page";

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

describe("ConfiguracoesRootPage", () => {
  it("redirects immediately to /configuracoes/acessibilidade", () => {
    ConfiguracoesRootPage();
    expect(redirect).toHaveBeenCalledWith("/configuracoes/acessibilidade");
  });
});
