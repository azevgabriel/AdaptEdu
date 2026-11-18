import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  AdaptEduIcon,
  GitHubIcon,
  GoogleIcon,
  LinkedInIcon,
} from "./index";

describe("Brand Icons", () => {
  it("renders AdaptEduIcon with default decorative aria-hidden", () => {
    const { container } = render(<AdaptEduIcon data-testid="adaptedu-icon" />);
    const svg = screen.getByTestId("adaptedu-icon");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll("path")).toHaveLength(3);
  });

  it("renders GoogleIcon with title and role img", () => {
    render(<GoogleIcon title="Logotipo da Google" />);
    expect(
      screen.getByRole("img", { name: "Logotipo da Google" })
    ).toBeInTheDocument();
  });

  it("renders GitHubIcon and LinkedInIcon with custom size", () => {
    render(
      <>
        <GitHubIcon size={20} data-testid="gh-icon" />
        <LinkedInIcon size={20} data-testid="li-icon" />
      </>
    );

    const gh = screen.getByTestId("gh-icon");
    const li = screen.getByTestId("li-icon");

    expect(gh).toHaveAttribute("width", "20");
    expect(gh).toHaveAttribute("height", "20");
    expect(li).toHaveAttribute("width", "20");
    expect(li).toHaveAttribute("height", "20");
  });
});
