export * from "./types";
export * from "./context";
export * from "./root";
export * from "./list";
export * from "./item";
export * from "./link";
export * from "./page";
export * from "./separator";

import { BreadcrumbRoot } from "./root";
import { BreadcrumbList } from "./list";
import { BreadcrumbItem } from "./item";
import { BreadcrumbLink } from "./link";
import { BreadcrumbPage, BreadcrumbCurrent } from "./page";
import { BreadcrumbSeparator } from "./separator";

export type BreadcrumbComponent = typeof BreadcrumbRoot & {
  Root: typeof BreadcrumbRoot;
  List: typeof BreadcrumbList;
  Item: typeof BreadcrumbItem;
  Link: typeof BreadcrumbLink;
  Page: typeof BreadcrumbPage;
  Current: typeof BreadcrumbCurrent;
  Separator: typeof BreadcrumbSeparator;
};

export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Root: BreadcrumbRoot,
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Page: BreadcrumbPage,
  Current: BreadcrumbCurrent,
  Separator: BreadcrumbSeparator,
}) as BreadcrumbComponent;

/* Semantic plural alias */
export const Breadcrumbs = Breadcrumb;
