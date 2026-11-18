import { describe, it, expect } from "vitest";
import * as components from "./index";

describe("Components Barrel Export", () => {
  it("exports Header component", () => {
    expect(components.Header).toBeDefined();
    expect(typeof components.Header).toBe("function");
  });

  it("exports GoogleSignInButton component", () => {
    expect(components.GoogleSignInButton).toBeDefined();
    expect(typeof components.GoogleSignInButton).toBe("function");
  });

  it("exports Footer component", () => {
    expect(components.Footer).toBeDefined();
    expect(typeof components.Footer).toBe("function");
  });

  it("exports Avatar component", () => {
    expect(components.Avatar).toBeDefined();
    expect(typeof components.Avatar).toBe("function");
  });

  it("exports Switch component", () => {
    expect(components.Switch).toBeDefined();
    expect(typeof components.Switch).toBe("function");
  });

  it("exports Drawer component", () => {
    expect(components.Drawer).toBeDefined();
    expect(typeof components.Drawer).toBe("function");
  });

  it("exports RadioGroup component", () => {
    expect(components.RadioGroup).toBeDefined();
    expect(typeof components.RadioGroup).toBe("function");
  });

  it("exports RadioButton component", () => {
    expect(components.RadioButton).toBeDefined();
    expect(typeof components.RadioButton).toBe("function");
  });

  it("exports RadioIndicator component", () => {
    expect(components.RadioIndicator).toBeDefined();
    expect(typeof components.RadioIndicator).toBe("function");
  });
});
