import { describe, it, expect } from "vitest";
import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { Breadcrumb, Breadcrumbs } from "./index";

describe("Breadcrumb Component", () => {
  it("renders accessible navigation landmark with default label in Portuguese", () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/inicio">Início</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );

    const nav = screen.getByRole("navigation", {
      name: "Navegação estrutural",
    });
    expect(nav).toBeInTheDocument();
  });

  it("supports custom aria-label", () => {
    render(
      <Breadcrumb aria-label="Trilha de navegação pedagógica">
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );

    expect(
      screen.getByRole("navigation", {
        name: "Trilha de navegação pedagógica",
      })
    ).toBeInTheDocument();
  });

  it("renders ordered list structure with items, links, separators, and current page", () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/configuracoes">Configurações</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>Acessibilidade & Visualização</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "Configurações" });
    expect(link).toHaveAttribute("href", "/configuracoes");

    const currentPage = screen.getByText("Acessibilidade & Visualização");
    expect(currentPage).toHaveAttribute("aria-current", "page");

    const separator = screen.getByRole("presentation", { hidden: true });
    expect(separator).toHaveAttribute("aria-hidden", "true");
    expect(separator).toHaveTextContent("/");
  });

  it("renders custom separator passed via context or separator children", () => {
    const { rerender } = render(
      <Breadcrumb separator=">">
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/a">A</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Page>B</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );

    expect(screen.getByRole("presentation", { hidden: true })).toHaveTextContent(">");

    rerender(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/a">A</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator>→</Breadcrumb.Separator>
          <Breadcrumb.Item>
            <Breadcrumb.Page>B</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );

    expect(screen.getByRole("presentation", { hidden: true })).toHaveTextContent("→");
  });

  it("renders optional icon slot in Breadcrumb.Link", () => {
    render(
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link
              href="/configuracoes"
              icon={<span data-testid="settings-icon">⚙</span>}
            >
              Configurações
            </Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );

    expect(screen.getByTestId("settings-icon")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /configurações/i })).toBeInTheDocument();
  });

  it("Breadcrumbs alias works identically to Breadcrumb", () => {
    render(
      <Breadcrumbs>
        <Breadcrumbs.List>
          <Breadcrumbs.Item>
            <Breadcrumbs.Current>Sala de Aula</Breadcrumbs.Current>
          </Breadcrumbs.Item>
        </Breadcrumbs.List>
      </Breadcrumbs>
    );

    expect(
      screen.getByRole("navigation", { name: "Navegação estrutural" })
    ).toBeInTheDocument();
    expect(screen.getByText("Sala de Aula")).toHaveAttribute("aria-current", "page");
  });

  it("forwards ref to respective HTML elements across all subcomponents", () => {
    const navRef = createRef<HTMLElement>();
    const listRef = createRef<HTMLOListElement>();
    const itemRef = createRef<HTMLLIElement>();
    const linkRef = createRef<HTMLAnchorElement>();
    const pageRef = createRef<HTMLSpanElement>();
    const sepRef = createRef<HTMLSpanElement>();

    render(
      <Breadcrumb ref={navRef}>
        <Breadcrumb.List ref={listRef}>
          <Breadcrumb.Item ref={itemRef}>
            <Breadcrumb.Link ref={linkRef} href="/test">
              Link
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator ref={sepRef} />
          <Breadcrumb.Item>
            <Breadcrumb.Page ref={pageRef}>Page</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );

    expect(navRef.current).toBeInstanceOf(HTMLElement);
    expect(listRef.current).toBeInstanceOf(HTMLOListElement);
    expect(itemRef.current).toBeInstanceOf(HTMLLIElement);
    expect(linkRef.current).toBeInstanceOf(HTMLAnchorElement);
    expect(pageRef.current).toBeInstanceOf(HTMLSpanElement);
    expect(sepRef.current).toBeInstanceOf(HTMLSpanElement);
  });
});
