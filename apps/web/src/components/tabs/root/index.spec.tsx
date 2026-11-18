import { describe, it, expect, vi } from "vitest";
import React, { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TabsRoot } from "./index";
import { TabsList } from "../list";
import { TabsTab } from "../tab";
import { TabsPanel } from "../panel";

describe("TabsRoot Component", () => {
  it("renders uncontrolled tabs and switches active panel on tab click", async () => {
    const user = userEvent.setup();
    render(
      <TabsRoot defaultValue="tab-1">
        <TabsList aria-label="Abas">
          <TabsTab value="tab-1">Aba 1</TabsTab>
          <TabsTab value="tab-2">Aba 2</TabsTab>
        </TabsList>
        <TabsPanel value="tab-1">
          <p>Conteúdo 1</p>
        </TabsPanel>
        <TabsPanel value="tab-2">
          <p>Conteúdo 2</p>
        </TabsPanel>
      </TabsRoot>
    );

    expect(screen.getByText("Conteúdo 1")).toBeInTheDocument();
    expect(screen.queryByText("Conteúdo 2")).not.toBeInTheDocument();

    const tab2 = screen.getByRole("tab", { name: "Aba 2" });
    await user.click(tab2);

    expect(screen.queryByText("Conteúdo 1")).not.toBeInTheDocument();
    expect(screen.getByText("Conteúdo 2")).toBeInTheDocument();
  });

  it("handles controlled value and fires onChange", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <TabsRoot value="tab-1" onChange={handleChange}>
        <TabsList aria-label="Abas">
          <TabsTab value="tab-1">Aba 1</TabsTab>
          <TabsTab value="tab-2">Aba 2</TabsTab>
        </TabsList>
        <TabsPanel value="tab-1">
          <p>Conteúdo 1</p>
        </TabsPanel>
      </TabsRoot>
    );

    const tab2 = screen.getByRole("tab", { name: "Aba 2" });
    await user.click(tab2);

    expect(handleChange).toHaveBeenCalledWith("tab-2");
  });

  it("forwards ref to container div", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <TabsRoot ref={ref} defaultValue="tab-1">
        <TabsList ariaLabel="Abas">
          <TabsTab value="tab-1">Aba 1</TabsTab>
        </TabsList>
      </TabsRoot>
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
