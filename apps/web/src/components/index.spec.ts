import { describe, it, expect } from "vitest";
import * as components from "./index";

describe("Components Barrel Export", () => {
  it("exports Header component", () => {
    expect(components.Header).toBeDefined();
    expect(typeof components.Header).toBe("function");
  });
});

