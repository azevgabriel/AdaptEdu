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
});
