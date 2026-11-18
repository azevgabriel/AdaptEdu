import React, { useState } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fakerPT_BR as faker } from "@faker-js/faker";
import {
  RadioGroup,
  RadioButton,
  RadioIndicator,
} from "./index";

describe("RadioGroup & RadioButton Components", () => {
  it("renders default radio items with Portuguese labels and descriptions", () => {
    const label1 = faker.lorem.words(2);
    const desc1 = faker.lorem.sentence();
    const label2 = faker.lorem.words(2);

    render(
      <RadioGroup value="opt1" onChange={vi.fn()} ariaLabel="Grupo de opções">
        <RadioButton value="opt1" label={label1} description={desc1} />
        <RadioButton value="opt2" label={label2} />
      </RadioGroup>
    );

    const group = screen.getByRole("radiogroup", { name: "Grupo de opções" });
    expect(group).toBeInTheDocument();

    const radio1 = screen.getByRole("radio", { name: new RegExp(label1, "i") });
    const radio2 = screen.getByRole("radio", { name: new RegExp(label2, "i") });

    expect(radio1).toBeInTheDocument();
    expect(radio2).toBeInTheDocument();
    expect(screen.getByText(desc1)).toBeInTheDocument();

    expect(radio1).toHaveAttribute("aria-checked", "true");
    expect(radio2).toHaveAttribute("aria-checked", "false");
  });

  it("calls onChange callback with the selected value when clicked", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <RadioGroup value="opt1" onChange={handleChange} ariaLabel="Selecione um tema">
        <RadioButton value="opt1" label="Opção Clara" />
        <RadioButton value="opt2" label="Opção Escura" />
      </RadioGroup>
    );

    const radio2 = screen.getByRole("radio", { name: "Opção Escura" });
    await user.click(radio2);

    expect(handleChange).toHaveBeenCalledWith("opt2");
  });

  it("supports uncontrolled mode with defaultValue", async () => {
    const user = userEvent.setup();

    render(
      <RadioGroup defaultValue="b" ariaLabel="Escolha">
        <RadioButton value="a" label="Item A" />
        <RadioButton value="b" label="Item B" />
        <RadioButton value="c" label="Item C" />
      </RadioGroup>
    );

    const radioA = screen.getByRole("radio", { name: "Item A" });
    const radioB = screen.getByRole("radio", { name: "Item B" });

    expect(radioB).toHaveAttribute("aria-checked", "true");
    expect(radioA).toHaveAttribute("aria-checked", "false");

    await user.click(radioA);

    expect(radioA).toHaveAttribute("aria-checked", "true");
    expect(radioB).toHaveAttribute("aria-checked", "false");
  });

  it("supports custom card children and activeClassName", () => {
    function ControlledTest() {
      const [val, setVal] = useState("card1");
      return (
        <RadioGroup value={val} onChange={setVal} ariaLabel="Cartões">
          <RadioButton
            value="card1"
            className="custom-card"
            activeClassName="active-card"
            ariaLabel="Cartão 1"
          >
            <span>Conteúdo 1</span>
          </RadioButton>
          <RadioButton
            value="card2"
            className="custom-card"
            activeClassName="active-card"
            ariaLabel="Cartão 2"
          >
            <span>Conteúdo 2</span>
          </RadioButton>
        </RadioGroup>
      );
    }

    render(<ControlledTest />);

    const card1 = screen.getByRole("radio", { name: "Cartão 1" });
    const card2 = screen.getByRole("radio", { name: "Cartão 2" });

    expect(card1).toHaveClass("custom-card");
    expect(card1).toHaveClass("active-card");
    expect(card1).toHaveAttribute("data-state", "checked");

    expect(card2).toHaveClass("custom-card");
    expect(card2).not.toHaveClass("active-card");
    expect(card2).toHaveAttribute("data-state", "unchecked");

    fireEvent.click(card2);

    expect(card2).toHaveClass("active-card");
    expect(card1).not.toHaveClass("active-card");
  });

  it("supports render props for dynamic custom children", () => {
    render(
      <RadioGroup value="yes" onChange={vi.fn()} ariaLabel="Confirmação">
        <RadioButton value="yes" ariaLabel="Sim">
          {({ checked }) => <span>{checked ? "Ativo: Sim" : "Inativo"}</span>}
        </RadioButton>
        <RadioButton value="no" ariaLabel="Não">
          {({ checked }) => <span>{checked ? "Ativo: Não" : "Inativo"}</span>}
        </RadioButton>
      </RadioGroup>
    );

    expect(screen.getByText("Ativo: Sim")).toBeInTheDocument();
    expect(screen.getByText("Inativo")).toBeInTheDocument();
  });

  it("supports compound component syntax (RadioGroup.Item and RadioGroup.Indicator)", () => {
    render(
      <RadioGroup value="item-1" onChange={vi.fn()} ariaLabel="Composto">
        <RadioGroup.Item value="item-1" ariaLabel="Item 1">
          <RadioGroup.Indicator />
          <span>Rótulo Composto</span>
        </RadioGroup.Item>
        <RadioGroup.Item value="item-2" ariaLabel="Item 2">
          <RadioButton.Indicator />
          <span>Outro Rótulo</span>
        </RadioGroup.Item>
      </RadioGroup>
    );

    const item1 = screen.getByRole("radio", { name: "Item 1" });
    expect(item1).toHaveAttribute("aria-checked", "true");
    expect(screen.getByText("Rótulo Composto")).toBeInTheDocument();
  });

  it("navigates options via keyboard arrows, Home, and End", () => {
    const handleChange = vi.fn();

    render(
      <RadioGroup value="opt1" onChange={handleChange} ariaLabel="Navegação Teclado">
        <RadioButton value="opt1" label="Opção 1" />
        <RadioButton value="opt2" label="Opção 2" />
        <RadioButton value="opt3" label="Opção 3" />
      </RadioGroup>
    );

    const group = screen.getByRole("radiogroup");
    const radio1 = screen.getByRole("radio", { name: "Opção 1" });
    const radio2 = screen.getByRole("radio", { name: "Opção 2" });
    const radio3 = screen.getByRole("radio", { name: "Opção 3" });

    // Initial focus on selected radio
    radio1.focus();
    expect(document.activeElement).toBe(radio1);

    // ArrowDown navigates to next
    fireEvent.keyDown(group, { key: "ArrowDown" });
    expect(document.activeElement).toBe(radio2);
    expect(handleChange).toHaveBeenCalledWith("opt2");

    // ArrowRight navigates to next
    fireEvent.keyDown(group, { key: "ArrowRight" });
    expect(document.activeElement).toBe(radio3);
    expect(handleChange).toHaveBeenCalledWith("opt3");

    // ArrowRight at end wraps to first
    fireEvent.keyDown(group, { key: "ArrowRight" });
    expect(document.activeElement).toBe(radio1);
    expect(handleChange).toHaveBeenCalledWith("opt1");

    // ArrowUp at start wraps to end
    fireEvent.keyDown(group, { key: "ArrowUp" });
    expect(document.activeElement).toBe(radio3);
    expect(handleChange).toHaveBeenCalledWith("opt3");

    // Home jumps to first
    fireEvent.keyDown(group, { key: "Home" });
    expect(document.activeElement).toBe(radio1);
    expect(handleChange).toHaveBeenCalledWith("opt1");

    // End jumps to last
    fireEvent.keyDown(group, { key: "End" });
    expect(document.activeElement).toBe(radio3);
    expect(handleChange).toHaveBeenCalledWith("opt3");
  });

  it("respects group-level disabled state", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <RadioGroup value="opt1" onChange={handleChange} disabled ariaLabel="Desabilitado">
        <RadioButton value="opt1" label="Opção 1" />
        <RadioButton value="opt2" label="Opção 2" />
      </RadioGroup>
    );

    const radio1 = screen.getByRole("radio", { name: "Opção 1" });
    const radio2 = screen.getByRole("radio", { name: "Opção 2" });

    expect(radio1).toBeDisabled();
    expect(radio2).toBeDisabled();

    await user.click(radio2);
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("respects item-level disabled state and skips disabled items in navigation", () => {
    const handleChange = vi.fn();

    render(
      <RadioGroup value="opt1" onChange={handleChange} ariaLabel="Item Desabilitado">
        <RadioButton value="opt1" label="Opção 1" />
        <RadioButton value="opt2" label="Opção 2 (Desativada)" disabled />
        <RadioButton value="opt3" label="Opção 3" />
      </RadioGroup>
    );

    const group = screen.getByRole("radiogroup");
    const radio1 = screen.getByRole("radio", { name: "Opção 1" });
    const radio2 = screen.getByRole("radio", { name: "Opção 2 (Desativada)" });
    const radio3 = screen.getByRole("radio", { name: "Opção 3" });

    expect(radio2).toBeDisabled();

    radio1.focus();
    fireEvent.keyDown(group, { key: "ArrowDown" });

    // Should skip radio2 and focus radio3 directly!
    expect(document.activeElement).toBe(radio3);
    expect(handleChange).toHaveBeenCalledWith("opt3");
  });

  it("renders standalone RadioIndicator with custom sizes and styles", () => {
    const { container, rerender } = render(<RadioIndicator checked={true} size="lg" />);
    const indicator = container.firstChild as HTMLElement;
    expect(indicator).toHaveAttribute("aria-hidden", "true");

    rerender(<RadioIndicator checked={false} size="sm" />);
    expect(container.querySelector(".radioIndicatorDot")).toBeNull();
  });
});
