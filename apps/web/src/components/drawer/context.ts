"use client";

import { createContext, useContext, type RefObject } from "react";
import type { DrawerPosition, DrawerSize } from "./types";

export interface DrawerContextValue {
  isOpen: boolean;
  onClose: () => void;
  position: DrawerPosition;
  size: DrawerSize;
  showOverlay: boolean;
  closeOnOverlayClick: boolean;
  titleId: string;
  descId: string;
  drawerRef: RefObject<HTMLElement | null>;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
}

export const DrawerContext = createContext<DrawerContextValue | null>(null);

export function useDrawerContext(): DrawerContextValue {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error(
      "Drawer compound components must be rendered within a <Drawer> or <Drawer.Root>."
    );
  }
  return context;
}
