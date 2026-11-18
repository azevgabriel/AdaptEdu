import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import {
  Drawer,
  DrawerRoot,
  DrawerOverlay,
  DrawerContent,
  DrawerPanel,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerBody,
  DrawerFooter,
  useDrawerContext,
} from "./index";

describe("Drawer Compound Barrel Exports", () => {
  it("exports root Drawer and individual subcomponents", () => {
    expect(Drawer).toBeDefined();
    expect(DrawerRoot).toBeDefined();
    expect(DrawerOverlay).toBeDefined();
    expect(DrawerContent).toBeDefined();
    expect(DrawerPanel).toBeDefined();
    expect(DrawerHeader).toBeDefined();
    expect(DrawerTitle).toBeDefined();
    expect(DrawerDescription).toBeDefined();
    expect(DrawerClose).toBeDefined();
    expect(DrawerBody).toBeDefined();
    expect(DrawerFooter).toBeDefined();
  });

  it("attaches all compound subcomponents onto Drawer", () => {
    expect(Drawer.Root).toBe(DrawerRoot);
    expect(Drawer.Overlay).toBe(DrawerOverlay);
    expect(Drawer.Content).toBe(DrawerContent);
    expect(Drawer.Panel).toBe(DrawerPanel);
    expect(Drawer.Header).toBe(DrawerHeader);
    expect(Drawer.Title).toBe(DrawerTitle);
    expect(Drawer.Description).toBe(DrawerDescription);
    expect(Drawer.Close).toBe(DrawerClose);
    expect(Drawer.CloseButton).toBe(DrawerClose);
    expect(Drawer.Body).toBe(DrawerBody);
    expect(Drawer.Footer).toBe(DrawerFooter);
  });

  it("throws an error when useDrawerContext is called outside DrawerProvider", () => {
    expect(() => renderHook(() => useDrawerContext())).toThrow(
      /Drawer compound components must be rendered within a <Drawer>/
    );
  });
});
