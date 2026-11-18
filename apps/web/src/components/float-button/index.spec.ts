import { describe, it, expect } from "vitest";
import {
  FloatButton,
  FloatGroup,
  FloatButtonGroup,
  FloatActionButton,
  FloatActionGroup,
} from "./index";

describe("FloatButton Barrel Exports", () => {
  it("exports FloatButton and FloatGroup components", () => {
    expect(FloatButton).toBeDefined();
    expect(FloatGroup).toBeDefined();
  });

  it("assigns Group as subcomponent on FloatButton", () => {
    expect(FloatButton.Group).toBe(FloatGroup);
  });

  it("exports expected semantic aliases", () => {
    expect(FloatButtonGroup).toBe(FloatGroup);
    expect(FloatActionButton).toBe(FloatButton);
    expect(FloatActionGroup).toBe(FloatGroup);
  });
});
