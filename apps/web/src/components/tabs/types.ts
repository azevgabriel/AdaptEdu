import type { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type TabsVariant = "line" | "enclosed" | "pills";
export type TabsOrientation = "horizontal" | "vertical";
export type TabsSize = "sm" | "md" | "lg";

export interface TabsProps<T = string>
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /**
   * Controlled active tab value.
   */
  value?: T;
  /**
   * Initial active tab value for uncontrolled usage.
   */
  defaultValue?: T;
  /**
   * Callback fired when active tab changes.
   */
  onChange?: (value: T) => void;
  /**
   * Semantic alias for `onChange`.
   */
  onValueChange?: (value: T) => void;
  /**
   * Tab list layout orientation. Defaults to "horizontal".
   */
  orientation?: TabsOrientation;
  /**
   * Visual indicator variant. Defaults to "line".
   */
  variant?: TabsVariant;
  /**
   * Component dimension scale. Defaults to "md".
   */
  size?: TabsSize;
  /**
   * When true, tabs expand equally to fill the entire container width.
   */
  fitted?: boolean;
  /**
   * Whether tabs activate immediately on arrow key focus ("automatic")
   * or require Space/Enter to activate ("manual"). Defaults to "automatic".
   */
  activationMode?: "automatic" | "manual";
  /**
   * Compound subcomponents (`Tabs.List`, `Tabs.Tab`, `Tabs.Panel`).
   */
  children: ReactNode;
  /**
   * Custom CSS class name.
   */
  className?: string;
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Accessible name for the tablist container.
   */
  "aria-label"?: string;
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
}

export interface TabsTabProps<T = string>
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  /**
   * Unique tab key value matching corresponding `Tabs.Panel`.
   */
  value: T;
  /**
   * Leading icon element.
   */
  icon?: ReactNode;
  /**
   * Optional badge indicator or counter.
   */
  badge?: ReactNode;
  className?: string;
  activeClassName?: string;
  children: ReactNode;
}

export interface TabsPanelProps<T = string>
  extends HTMLAttributes<HTMLDivElement> {
  /**
   * Tab key value matching the corresponding `Tabs.Tab`.
   */
  value: T;
  /**
   * If true, delays rendering children until the tab becomes active. Defaults to true.
   */
  lazy?: boolean;
  className?: string;
  children: ReactNode;
}
