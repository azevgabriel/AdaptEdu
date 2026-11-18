"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import type { MenuItemProps } from "../types";
import styles from "./index.module.css";

export const MenuItem = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  MenuItemProps
>(function MenuItem(
  {
    href,
    type = "button",
    role = "menuitem",
    variant = "default",
    isActive = false,
    icon,
    className,
    disabled = false,
    children,
    onClick,
    ...props
  },
  ref
) {
  const variantClass =
    variant === "danger"
      ? styles.variantDanger
      : variant === "brand"
      ? styles.variantBrand
      : "";

  const itemClasses = [
    styles.menuItem,
    variantClass,
    isActive && styles.itemActive,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && (
        <span className={styles.itemIcon} aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
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
        role={role}
        className={itemClasses}
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
      role={role}
      className={itemClasses}
      disabled={disabled}
      aria-disabled={disabled ? true : undefined}
      onClick={handleClick}
      {...props}
    >
      {content}
    </button>
  );
});
