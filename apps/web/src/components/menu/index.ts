export * from "./types";
export * from "./root";
export * from "./item";
export * from "./separator";
export * from "./header";

import { MenuRoot } from "./root";
import { MenuItem } from "./item";
import { MenuSeparator } from "./separator";
import { MenuHeader } from "./header";

export type MenuComponent = typeof MenuRoot & {
  Item: typeof MenuItem;
  Separator: typeof MenuSeparator;
  Header: typeof MenuHeader;
};

export const Menu = Object.assign(MenuRoot, {
  Item: MenuItem,
  Separator: MenuSeparator,
  Header: MenuHeader,
}) as MenuComponent;

/* Aliases for flexible API semantics */
export const Dropdown = Menu;
export const DropdownMenu = Menu;
export const DropdownItem = MenuItem;
export const DropdownSeparator = MenuSeparator;
export const DropdownHeader = MenuHeader;
