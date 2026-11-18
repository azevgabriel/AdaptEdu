"use client";

import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import styles from "./index.module.css";
import type { FloatGroupProps } from "../types";

export const FloatGroup = forwardRef<HTMLDivElement, FloatGroupProps>(
  (
    {
      children,
      placement = "bottom-right",
      direction = "column",
      gap = "0.75rem",
      offsetBottom = 32,
      offsetRight = 32,
      offsetLeft = 32,
      offsetTop = 32,
      avoidFooter = true,
      footerSelector = "footer",
      footerRef,
      role = "toolbar",
      "aria-label": ariaLabelProp,
      ariaLabel = "Ações flutuantes",
      className,
      style,
    },
    ref
  ) => {
    const internalRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => internalRef.current as HTMLDivElement);

    const [extraBottom, setExtraBottom] = useState<number>(0);

    useEffect(() => {
      if (!avoidFooter || typeof window === "undefined") {
        return;
      }

      const updateOffset = () => {
        const footerElement =
          footerRef?.current || document.querySelector(footerSelector);

        if (!footerElement) {
          setExtraBottom((prev) => (prev !== 0 ? 0 : prev));
          return;
        }

        const footerRect = footerElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // If the top edge of the footer has entered the visible viewport
        if (footerRect.top < viewportHeight) {
          const visibleFooterHeight = Math.max(0, viewportHeight - footerRect.top);
          setExtraBottom(visibleFooterHeight);
        } else {
          setExtraBottom(0);
        }
      };

      // Initial check on mount
      updateOffset();

      // Passive scroll and resize listeners for maximum fluidity and minimal CPU footprint
      window.addEventListener("scroll", updateOffset, { passive: true });
      window.addEventListener("resize", updateOffset, { passive: true });

      // Observe footer mutations / layout shifts when ResizeObserver is available
      let resizeObserver: ResizeObserver | null = null;
      if (typeof ResizeObserver !== "undefined") {
        const footerElement =
          footerRef?.current || document.querySelector(footerSelector);
        if (footerElement) {
          resizeObserver = new ResizeObserver(() => updateOffset());
          resizeObserver.observe(footerElement);
        }
      }

      return () => {
        window.removeEventListener("scroll", updateOffset);
        window.removeEventListener("resize", updateOffset);
        resizeObserver?.disconnect();
      };
    }, [avoidFooter, footerSelector, footerRef]);

    const isBottom = placement.startsWith("bottom");
    const isRight = placement.endsWith("right");

    const computedBottom = isBottom
      ? `${offsetBottom + extraBottom}px`
      : undefined;
    const computedTop = !isBottom ? `${offsetTop}px` : undefined;
    const computedRight = isRight ? `${offsetRight}px` : undefined;
    const computedLeft = !isRight ? `${offsetLeft}px` : undefined;

    const dynamicStyles: React.CSSProperties = {
      ...style,
      bottom: computedBottom,
      top: computedTop,
      right: computedRight,
      left: computedLeft,
      gap: typeof gap === "number" ? `${gap}px` : gap,
      flexDirection: direction,
    };

    const groupClasses = [
      styles.floatGroup,
      styles[placement],
      styles[direction],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={internalRef}
        className={groupClasses}
        style={dynamicStyles}
        role={role}
        aria-label={ariaLabelProp || ariaLabel}
      >
        {children}
      </div>
    );
  }
);

FloatGroup.displayName = "FloatGroup";
