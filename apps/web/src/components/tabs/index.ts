export * from "./types";
export * from "./context";
export * from "./root";
export * from "./list";
export * from "./tab";
export * from "./panel";

import { TabsRoot } from "./root";
import { TabsList } from "./list";
import { TabsTab, TabsTrigger } from "./tab";
import { TabsPanel, TabsContent } from "./panel";
import type { TabsProps } from "./types";

export type TabsComponent = (<T extends string = string>(
  props: TabsProps<T> & React.RefAttributes<HTMLDivElement>
) => React.ReactNode) & {
  displayName?: string;
  Root: typeof TabsRoot;
  List: typeof TabsList;
  Tab: typeof TabsTab;
  Trigger: typeof TabsTrigger;
  Panel: typeof TabsPanel;
  Content: typeof TabsContent;
};

export const Tabs = Object.assign(TabsRoot, {
  Root: TabsRoot,
  List: TabsList,
  Tab: TabsTab,
  Trigger: TabsTrigger,
  Panel: TabsPanel,
  Content: TabsContent,
}) as TabsComponent;

/* Semantic Aliases */
export const TabList = TabsList;
export const Tab = TabsTab;
export const TabTrigger = TabsTrigger;
export const TabPanel = TabsPanel;
export const TabContent = TabsContent;
