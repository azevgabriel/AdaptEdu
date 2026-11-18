"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import styles from "./index.module.css";

/* -------------------------------------------------------------------------- */
/*                                Types & Props                               */
/* -------------------------------------------------------------------------- */

export type IconButtonVariant = "ghost" | "subtle" | "outline" | "primary";
export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Accessible name for screen readers. Required for accessibility unless aria-labelledby is provided.
   */
  "aria-label"?: string;
  ariaLabel?: string;
  /**
   * Optional destination URL. If provided, renders Next.js <Link>.
   */
  href?: string;
  /**
   * Visual variant. Defaults to "ghost".
   */
  variant?: IconButtonVariant;
  /**
   * Size variant. Defaults to "md" (38x38px with >= 44x44px touch area).
   */
  size?: IconButtonSize;
  /**
   * Marks button as active/selected state.
   */
  isActive?: boolean;
  /**
   * Displays an auxiliary indicator dot (e.g. active settings / accommodations).
   */
  hasIndicator?: boolean;
  /**
   * Accessible tooltip or title for the indicator dot.
   */
  indicatorTitle?: string;
  /**
   * Custom test ID for indicator dot.
   */
  indicatorTestId?: string;
  /**
   * Explicit icon element. Alternatively, pass icon as `children`.
   */
  icon?: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                              Component Body                                */
/* -------------------------------------------------------------------------- */

export const IconButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  IconButtonProps
>(function IconButton(
  {
    href,
    type = "button",
    variant = "ghost",
    size = "md",
    isActive = false,
    hasIndicator = false,
    indicatorTitle,
    indicatorTestId,
    icon,
    children,
    className,
    disabled = false,
    ariaLabel,
    "aria-label": ariaLabelAttr,
    title,
    onClick,
    ...props
  },
  ref
) {
  const resolvedAriaLabel = ariaLabelAttr || ariaLabel || title;

  const sizeClass =
    size === "sm"
      ? styles.sizeSm
      : size === "lg"
      ? styles.sizeLg
      : styles.sizeMd;

  const variantClass =
    variant === "subtle"
      ? styles.variantSubtle
      : variant === "outline"
      ? styles.variantOutline
      : variant === "primary"
      ? styles.variantPrimary
      : styles.variantGhost;

  const buttonClasses = [
    styles.iconButton,
    sizeClass,
    variantClass,
    isActive && styles.active,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon}
      {children}
      {hasIndicator && (
        <span
          className={styles.indicatorDot}
          aria-hidden="true"
          title={indicatorTitle}
          data-testid={indicatorTestId}
        />
      )}
    </>
  );

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e as React.MouseEvent<HTMLButtonElement>);
  };

  if (href) {
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={buttonClasses}
        aria-label={resolvedAriaLabel}
        title={title}
        aria-disabled={disabled ? true : undefined}
        onClick={handleClick}
        {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      className={buttonClasses}
      aria-label={resolvedAriaLabel}
      title={title}
      disabled={disabled}
      aria-disabled={disabled ? true : undefined}
      onClick={handleClick}
      {...props}
    >
      {content}
    </button>
  );
});
