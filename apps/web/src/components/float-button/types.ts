import type { ButtonHTMLAttributes, ReactNode, RefObject } from "react";

/* -------------------------------------------------------------------------- */
/*                                FloatButton                                 */
/* -------------------------------------------------------------------------- */

export type FloatButtonVariant =
  | "primary"
  | "secondary"
  | "subtle"
  | "danger"
  | "default";

export type FloatButtonShape = "circle" | "pill" | "square";

export type FloatButtonSize = "sm" | "md" | "lg";

export interface FloatButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Accessible name for screen readers. Required if no visible label is provided.
   */
  "aria-label"?: string;
  ariaLabel?: string;
  /**
   * Icon element to render.
   */
  icon?: ReactNode;
  /**
   * Visible text label to display next to the icon.
   */
  label?: ReactNode;
  /**
   * Auxiliary tag or badge indicator (e.g. status, active mode, counter).
   */
  badge?: ReactNode;
  /**
   * Visual variant. Defaults to "default".
   */
  variant?: FloatButtonVariant;
  /**
   * Button geometry shape.
   * Defaults to "pill" when label or badge is provided, or "circle" when icon-only.
   */
  shape?: FloatButtonShape;
  /**
   * Size scale. Defaults to "md".
   */
  size?: FloatButtonSize;
  /**
   * Marks the button as active or toggled on (e.g. drawer is currently open).
   */
  isActive?: boolean;
  /**
   * Optional tooltip text (rendered as native `title`).
   */
  tooltip?: string;
  /**
   * Optional custom CSS class name.
   */
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*                                FloatGroup                                  */
/* -------------------------------------------------------------------------- */

export type FloatGroupPlacement =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";

export type FloatGroupDirection = "column" | "row";

export interface FloatGroupProps {
  /**
   * FloatButton elements to render inside the group.
   */
  children: ReactNode;
  /**
   * Viewport placement corner. Defaults to "bottom-right".
   */
  placement?: FloatGroupPlacement;
  /**
   * Flex layout direction. Defaults to "column".
   */
  direction?: FloatGroupDirection;
  /**
   * Gap between buttons. Defaults to "0.75rem" (12px).
   */
  gap?: string | number;
  /**
   * Base bottom offset from viewport edge in pixels. Defaults to 32 (2rem).
   */
  offsetBottom?: number;
  /**
   * Base right offset from viewport edge in pixels. Defaults to 32 (2rem).
   */
  offsetRight?: number;
  /**
   * Base left offset from viewport edge in pixels. Defaults to 32 (2rem).
   */
  offsetLeft?: number;
  /**
   * Base top offset from viewport edge in pixels. Defaults to 32 (2rem).
   */
  offsetTop?: number;
  /**
   * Whether to automatically adjust the bottom position when the footer enters the viewport,
   * guaranteeing that the floating buttons never overlap the footer.
   * Defaults to true.
   */
  avoidFooter?: boolean;
  /**
   * CSS selector for the footer element to track. Defaults to "footer".
   */
  footerSelector?: string;
  /**
   * Optional explicit ref to the footer element.
   */
  footerRef?: RefObject<HTMLElement | null>;
  /**
   * ARIA role for the group container. Defaults to "toolbar".
   */
  role?: string;
  /**
   * Accessible ARIA label for screen readers. Defaults to "Ações flutuantes".
   */
  "aria-label"?: string;
  ariaLabel?: string;
  /**
   * Optional custom CSS class name.
   */
  className?: string;
  /**
   * Optional style overrides.
   */
  style?: React.CSSProperties;
}
