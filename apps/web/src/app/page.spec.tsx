import { describe, it, expect } from "vitest";
import Home from "./page";
import { redirect } from "next/navigation";

describe("Home Page", () => {
  it("redirects user to '/minha-sala'", () => {
    Home();
    expect(redirect).toHaveBeenCalledWith("/minha-sala");
  });
});
