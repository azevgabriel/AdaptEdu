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

  it("exports Drawer component and compound subcomponents", () => {
    expect(components.Drawer).toBeDefined();
    expect(typeof components.Drawer).toBe("function");
    expect(components.Drawer.Root).toBeDefined();
    expect(components.Drawer.Overlay).toBeDefined();
    expect(components.Drawer.Content).toBeDefined();
    expect(components.Drawer.Header).toBeDefined();
    expect(components.Drawer.Title).toBeDefined();
    expect(components.Drawer.Description).toBeDefined();
    expect(components.Drawer.Close).toBeDefined();
    expect(components.Drawer.Body).toBeDefined();
    expect(components.Drawer.Footer).toBeDefined();
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

  it("exports RadioCard component", () => {
    expect(components.RadioCard).toBeDefined();
    expect(typeof components.RadioCard).toBe("function");
  });

  it("exports Card component and subcomponents", () => {
    expect(components.Card).toBeDefined();
    expect(typeof components.Card).toBe("function");
    expect(components.CardHeader).toBeDefined();
    expect(components.CardTitle).toBeDefined();
    expect(components.CardDescription).toBeDefined();
    expect(components.CardBody).toBeDefined();
    expect(components.CardBadge).toBeDefined();
    expect(components.CardIcon).toBeDefined();
    expect(components.CardFooter).toBeDefined();
  });

  it("exports IconButton component", () => {
    expect(components.IconButton).toBeDefined();
    expect(typeof components.IconButton).toBe("object"); // forwardRef creates an object or function
  });

  it("exports Menu and Dropdown components and subcomponents", () => {
    expect(components.Menu).toBeDefined();
    expect(components.Dropdown).toBeDefined();
    expect(components.MenuItem).toBeDefined();
    expect(components.MenuSeparator).toBeDefined();
    expect(components.MenuHeader).toBeDefined();
  });

  it("exports Badge component", () => {
    expect(components.Badge).toBeDefined();
    expect(typeof components.Badge).toBe("function");
  });

  it("exports FloatButton and FloatGroup components", () => {
    expect(components.FloatButton).toBeDefined();
    expect(components.FloatGroup).toBeDefined();
    expect(components.FloatButtonGroup).toBeDefined();
  });

  it("exports Tabs component and subcomponents", () => {
    expect(components.Tabs).toBeDefined();
    expect(typeof components.Tabs).toBe("object");
    expect(components.Tabs.Root).toBeDefined();
    expect(components.Tabs.List).toBeDefined();
    expect(components.Tabs.Tab).toBeDefined();
    expect(components.Tabs.Panel).toBeDefined();
  });

  it("exports Breadcrumb and Breadcrumbs components and subcomponents", () => {
    expect(components.Breadcrumb).toBeDefined();
    expect(components.Breadcrumbs).toBeDefined();
    expect(typeof components.Breadcrumb).toBe("object");
    expect(components.Breadcrumb.Root).toBeDefined();
    expect(components.Breadcrumb.List).toBeDefined();
    expect(components.Breadcrumb.Item).toBeDefined();
    expect(components.Breadcrumb.Link).toBeDefined();
    expect(components.Breadcrumb.Page).toBeDefined();
    expect(components.Breadcrumb.Current).toBeDefined();
    expect(components.Breadcrumb.Separator).toBeDefined();
  });
});
