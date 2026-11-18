import type { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type DrawerPosition = "right" | "left";
export type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";

export interface DrawerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * Whether the drawer panel is open and visible.
   */
  isOpen: boolean;
  /**
   * Callback fired when closing the drawer via close button, escape key, or overlay click.
   */
  onClose: () => void;
  /**
   * Optional title node for prop-driven usage.
   */
  title?: ReactNode;
  /**
   * Optional description node for prop-driven usage.
   */
  description?: ReactNode;
  /**
   * Optional footer node for prop-driven usage.
   */
  footer?: ReactNode;
  /**
   * Screen anchor edge. Defaults to "right".
   */
  position?: DrawerPosition;
  /**
   * Panel dimension scale. Defaults to "md".
   */
  size?: DrawerSize;
  /**
   * Whether to display the semi-transparent backdrop overlay. Defaults to true.
   */
  overlay?: boolean;
  /**
   * Legacy alias for `overlay`.
   */
  isModal?: boolean;
  /**
   * Whether pressing Escape closes the drawer. Defaults to true.
   */
  closeOnEscape?: boolean;
  /**
   * Whether clicking the backdrop overlay closes the drawer. Defaults to true.
   */
  closeOnOverlayClick?: boolean;
  /**
   * Accessible ARIA label for screen readers.
   */
  ariaLabel?: string;
  /**
   * Custom ID of the element labeling the drawer.
   */
  ariaLabelledBy?: string;
  /**
   * Custom ID of the element describing the drawer.
   */
  ariaDescribedBy?: string;
  /**
   * Custom CSS class name for the panel.
   */
  className?: string;
  /**
   * Composed child elements or body content.
   */
  children?: ReactNode;
}

export interface DrawerOverlayProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export interface DrawerContentProps extends HTMLAttributes<HTMLElement> {
  position?: DrawerPosition;
  size?: DrawerSize;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  className?: string;
  children: ReactNode;
}

export interface DrawerHeaderProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  children: ReactNode;
}

export interface DrawerTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div";
  className?: string;
  children: ReactNode;
}

export interface DrawerDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children: ReactNode;
}

export interface DrawerCloseProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  ariaLabel?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export interface DrawerBodyProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export interface DrawerFooterProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  children: ReactNode;
}
