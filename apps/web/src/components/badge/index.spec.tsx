import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge, type BadgeVariant } from "./index";

describe("Badge Component", () => {
  it("renders with default props (neutral, md, not pill)", () => {
    render(<Badge>Padrão</Badge>);
    const badge = screen.getByText("Padrão");
    expect(badge).toBeInTheDocument();
    expect(badge.className).toMatch(/badge/);
    expect(badge.className).toMatch(/variantNeutral/);
    expect(badge.className).toMatch(/sizeMd/);
    expect(badge.className).not.toMatch(/pill/);
  });

  it("renders with pill shape", () => {
    render(<Badge pill>Pill Badge</Badge>);
    const badge = screen.getByText("Pill Badge");
    expect(badge.className).toMatch(/pill/);
  });

  it("renders with custom sizes", () => {
    const { rerender } = render(<Badge size="sm">Tamanho</Badge>);

    expect(screen.getByText("Tamanho").className).toMatch(/sizeSm/);

    rerender(<Badge size="lg">Tamanho</Badge>);
    expect(screen.getByText("Tamanho").className).toMatch(/sizeLg/);
  });

  it("renders with all status variants", () => {
    const variants: BadgeVariant[] = [
      "brand",
      "success",
      "warning",
      "danger",
      "info",
      "outline",
    ];

    variants.forEach((variant) => {
      const { unmount } = render(<Badge variant={variant}>{variant}</Badge>);
      const badge = screen.getByText(variant);
      expect(badge).toBeInTheDocument();
      unmount();
    });
  });

  it("renders with pedagogical hierarchy variants", () => {
    const hierarchyVariants: BadgeVariant[] = [
      "key-concept",
      "definition",
      "data",
      "example",
    ];

    hierarchyVariants.forEach((variant) => {
      const { unmount } = render(
        <Badge variant={variant}>{variant}</Badge>
      );
      const badge = screen.getByText(variant);
      expect(badge).toBeInTheDocument();
      unmount();
    });
  });

  it("renders with leading icon wrapped in aria-hidden", () => {
    render(
      <Badge icon={<span data-testid="badge-icon">⚠️</span>}>
        Atenção
      </Badge>
    );

    const icon = screen.getByTestId("badge-icon");
    expect(icon).toBeInTheDocument();
    expect(icon.parentElement).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("Atenção")).toBeInTheDocument();
  });

  it("merges custom className and passes HTML attributes", () => {
    render(
      <Badge className="custom-class" data-testid="custom-badge" id="my-badge">
        Customizado
      </Badge>
    );

    const badge = screen.getByTestId("custom-badge");
    expect(badge.className).toContain("custom-class");
    expect(badge.id).toBe("my-badge");
  });

  it("falls back to default neutral variant if invalid variant provided", () => {
    // @ts-expect-error Testing runtime invalid fallback
    render(<Badge variant="invalid-variant">Fallback</Badge>);
    const badge = screen.getByText("Fallback");
    expect(badge.className).toMatch(/variantNeutral/);
  });

  it("falls back to default md size if invalid size provided", () => {
    // @ts-expect-error Testing runtime invalid fallback
    render(<Badge size="invalid-size">Fallback Size</Badge>);
    const badge = screen.getByText("Fallback Size");
    expect(badge.className).toMatch(/sizeMd/);
  });
});
