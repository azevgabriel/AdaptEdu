import React from "react";

export type MenuItemVariant = "default" | "danger" | "brand";

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "left" | "right";
}

export interface MenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: MenuItemVariant;
  isActive?: boolean;
  icon?: React.ReactNode;
}

export type MenuSeparatorProps = React.HTMLAttributes<HTMLDivElement>;

export type MenuHeaderProps = React.HTMLAttributes<HTMLDivElement>;
