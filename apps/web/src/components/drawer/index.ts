export * from "./types";
export * from "./context";
export * from "./root";
export * from "./overlay";
export * from "./content";
export * from "./header";
export * from "./title";
export * from "./description";
export * from "./close";
export * from "./body";
export * from "./footer";

import { DrawerRoot } from "./root";
import { DrawerOverlay } from "./overlay";
import { DrawerContent, DrawerPanel } from "./content";
import { DrawerHeader } from "./header";
import { DrawerTitle } from "./title";
import { DrawerDescription } from "./description";
import { DrawerClose } from "./close";
import { DrawerBody } from "./body";
import { DrawerFooter } from "./footer";

export type DrawerComponent = typeof DrawerRoot & {
  Root: typeof DrawerRoot;
  Overlay: typeof DrawerOverlay;
  Content: typeof DrawerContent;
  Panel: typeof DrawerPanel;
  Header: typeof DrawerHeader;
  Title: typeof DrawerTitle;
  Description: typeof DrawerDescription;
  Close: typeof DrawerClose;
  CloseButton: typeof DrawerClose;
  Body: typeof DrawerBody;
  Footer: typeof DrawerFooter;
};

export const Drawer = Object.assign(DrawerRoot, {
  Root: DrawerRoot,
  Overlay: DrawerOverlay,
  Content: DrawerContent,
  Panel: DrawerPanel,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Description: DrawerDescription,
  Close: DrawerClose,
  CloseButton: DrawerClose,
  Body: DrawerBody,
  Footer: DrawerFooter,
}) as DrawerComponent;
