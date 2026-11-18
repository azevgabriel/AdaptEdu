"use client";

import React from "react";
import type { CardProps } from "../types";
import styles from "./index.module.css";

export function CardRoot({
  as: Component = "div",
  variant = "default",
  interactive = false,
  selected = false,
  disabled = false,
  hasIcon = false,
  type = "button",
  className,
  children,
  onClick,
  ...props
}: CardProps) {
  const isButton = Component === "button";
  const isInteractive = interactive || isButton;

  const cardClasses = [
    styles.card,
    variant === "subtle" && styles.variantSubtle,
    variant === "bordered" && styles.variantBordered,
    isInteractive && styles.cardInteractive,
    selected && styles.cardSelected,
    disabled && styles.cardDisabled,
    hasIcon && styles.cardHasIcon,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const buttonProps = isButton
    ? {
        type,
        disabled,
        "aria-disabled": disabled ? true : undefined,
      }
    : {
        role: isInteractive ? "button" : undefined,
        tabIndex: isInteractive ? (disabled ? -1 : 0) : undefined,
        "aria-disabled": disabled ? true : undefined,
      };

  return (
    <Component
      className={cardClasses}
      onClick={handleClick}
      data-selected={selected ? "true" : undefined}
      data-disabled={disabled ? "true" : undefined}
      data-variant={variant}
      {...buttonProps}
      {...props}
    >
      {children}
    </Component>
  );
}
