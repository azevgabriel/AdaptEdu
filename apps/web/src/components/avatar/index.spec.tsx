import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { Avatar, getAvatarInitials } from "./index";

describe("Avatar Component", () => {
  it("renders image when valid src is provided", () => {
    const fakeName = faker.person.fullName();
    const fakeUrl = faker.image.avatar();

    render(<Avatar src={fakeUrl} name={fakeName} />);

    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    const imgElement = screen.getByAltText(`Foto de perfil de ${fakeName}`);
    expect(imgElement).toHaveAttribute("src", fakeUrl);
  });

  it("renders fallback initials when src is omitted", () => {
    render(<Avatar name="Roberta Lima" />);

    expect(screen.getByText("RL")).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: /foto de perfil de roberta lima/i })).toBeInTheDocument();
  });

  it("falls back to initials when image fails to load via onError", () => {
    const fakeName = "Carlos Eduardo";
    render(<Avatar src="https://invalid-url.com/nonexistent.png" name={fakeName} />);

    const img = screen.getByAltText(`Foto de perfil de ${fakeName}`);
    expect(img).toBeInTheDocument();

    // Trigger onError
    fireEvent.error(img);

    // Image should be removed and initials displayed
    expect(screen.queryByAltText(`Foto de perfil de ${fakeName}`)).not.toBeInTheDocument();
    expect(screen.getByText("CE")).toBeInTheDocument();
  });

  it("strips teacher honorifics correctly when computing initials", () => {
    expect(getAvatarInitials("Profª. Ana Silva")).toBe("AS");
    expect(getAvatarInitials("Profª Maria Costa")).toBe("MC");
    expect(getAvatarInitials("Prof. João Santos")).toBe("JS");
    expect(getAvatarInitials("Professor Marcelo")).toBe("MA");
    expect(getAvatarInitials("Professora Beatriz Souza")).toBe("BS");
    expect(getAvatarInitials("Lucas")).toBe("LU");
    expect(getAvatarInitials("")).toBe("ED");
    expect(getAvatarInitials()).toBe("ED");
  });

  it("prioritizes explicit initials prop over calculated initials", () => {
    render(<Avatar name="Roberto Gomes" initials="RB" />);

    expect(screen.getByText("RB")).toBeInTheDocument();
    expect(screen.queryByText("RG")).not.toBeInTheDocument();
  });

  it("renders fallback SVG user icon when neither src, name, nor initials are provided", () => {
    render(<Avatar />);

    expect(screen.getByTestId("avatar-fallback-icon")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Foto de perfil do usuário" })).toBeInTheDocument();
  });

  it("renders size classes accurately", () => {
    const { container: smContainer } = render(<Avatar size="sm" name="Ana Silva" />);
    expect(smContainer.firstChild).toHaveClass(/sm/);

    const { container: lgContainer } = render(<Avatar size="lg" name="Ana Silva" />);
    expect(lgContainer.firstChild).toHaveClass(/lg/);

    const { container: xlContainer } = render(<Avatar size="xl" name="Ana Silva" />);
    expect(xlContainer.firstChild).toHaveClass(/xl/);
  });

  it("renders presence status indicators correctly", () => {
    render(<Avatar name="João Silva" status="online" />);
    expect(screen.getByTitle("Online")).toBeInTheDocument();

    render(<Avatar name="Maria Silva" status="busy" />);
    expect(screen.getByTitle("Ocupado")).toBeInTheDocument();

    render(<Avatar name="Carlos Silva" status="away" />);
    expect(screen.getByTitle("Ausente")).toBeInTheDocument();

    render(<Avatar name="Lucas Silva" status="offline" />);
    expect(screen.getByTitle("Offline")).toBeInTheDocument();

    render(<Avatar name="Ana Silva" status={true} />);
    expect(screen.getAllByTitle("Online").length).toBeGreaterThanOrEqual(1);
  });

  it("allows custom status label override", () => {
    render(<Avatar name="Mariana" status="online" statusLabel="Disponível para atendimento" />);
    expect(screen.getByTitle("Disponível para atendimento")).toBeInTheDocument();
  });
});
