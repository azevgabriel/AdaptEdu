import { describe, it, expect } from "vitest";
import Home from "./page";
import { redirect } from "next/navigation";

describe("Home Page", () => {
  it("redirects user to '/configuracoes/acessibilidade'", () => {
    Home();
    expect(redirect).toHaveBeenCalledWith("/configuracoes/acessibilidade");
  });
});
