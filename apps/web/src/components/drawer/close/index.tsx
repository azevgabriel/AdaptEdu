"use client";

import React, { forwardRef, useContext } from "react";
import { CloseIcon } from "@/assets/icons";
import { DrawerContext } from "../context";
import styles from "./index.module.css";
import type { DrawerCloseProps } from "../types";

export const DrawerClose = forwardRef<HTMLButtonElement, DrawerCloseProps>(
  (
    {
      type = "button",
      className,
      ariaLabel = "Fechar painel lateral",
      onClick,
      children,
      icon,
      ...props
    },
    ref
  ) => {
    const context = useContext(DrawerContext);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (!event.defaultPrevented && context) {
        context.onClose();
      }
    };

    return (
      <button
        ref={(node) => {
          if (context?.closeButtonRef) {
            context.closeButtonRef.current = node;
          }
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        type={type}
        className={`${styles.closeButton} ${className || ""}`.trim()}
        onClick={handleClick}
        aria-label={ariaLabel}
        {...props}
      >
        {children || icon || <CloseIcon size={20} />}
      </button>
    );
  }
);

DrawerClose.displayName = "DrawerClose";
