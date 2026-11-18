import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./index";

describe("Footer", () => {
  it("renders educational mission text in Brazilian Portuguese", () => {
    render(<Footer />);
    expect(
      screen.getByText(
        /AdaptEdu — Plataforma de Código Aberto para Apoio ao Educador da Escola Pública\./i
      )
    ).toBeInTheDocument();
  });

  it("renders default GitHub and LinkedIn links with correct attributes and security rel", () => {
    render(<Footer />);

    const githubLink = screen.getByRole("link", {
      name: /repositório do projeto adaptedu no github/i,
    });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/azevgabriel/AdaptEdu"
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");

    const linkedinLink = screen.getByRole("link", {
      name: /perfil profissional de gabriel azevedo no linkedin/i,
    });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/azevgabriel/"
    );
    expect(linkedinLink).toHaveAttribute("target", "_blank");
    expect(linkedinLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("allows custom URLs for GitHub and LinkedIn", () => {
    render(
      <Footer
        githubUrl="https://github.com/custom/repo"
        linkedinUrl="https://linkedin.com/in/custom-user"
      />
    );

    const githubLink = screen.getByRole("link", {
      name: /repositório do projeto adaptedu no github/i,
    });
    expect(githubLink).toHaveAttribute("href", "https://github.com/custom/repo");

    const linkedinLink = screen.getByRole("link", {
      name: /perfil profissional de gabriel azevedo no linkedin/i,
    });
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://linkedin.com/in/custom-user"
    );
  });

  it("applies custom className when provided", () => {
    const { container } = render(<Footer className="custom-footer-class" />);
    expect(container.querySelector("footer")).toHaveClass("custom-footer-class");
  });

  it("renders semantic landmarks: contentinfo footer and accessible navigation", () => {
    render(<Footer />);
    const footerLandmark = screen.getByRole("contentinfo");
    expect(footerLandmark).toBeInTheDocument();

    const navLandmark = screen.getByRole("navigation", {
      name: /links institucionais e do desenvolvedor/i,
    });
    expect(navLandmark).toBeInTheDocument();
  });

  it("marks decorative SVG icons inside external links with aria-hidden='true'", () => {
    const { container } = render(<Footer />);
    const linkIcons = container.querySelectorAll('[class*="linkIcon"]');
    expect(linkIcons.length).toBe(2);
    linkIcons.forEach((icon) => {
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });
});
