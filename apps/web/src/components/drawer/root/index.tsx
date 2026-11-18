"use client";

import React, {
  useEffect,
  useId,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { DrawerContext, type DrawerContextValue } from "../context";
import { DrawerOverlay } from "../overlay";
import { DrawerContent } from "../content";
import { DrawerHeader } from "../header";
import { DrawerTitle } from "../title";
import { DrawerDescription } from "../description";
import { DrawerClose } from "../close";
import { DrawerBody } from "../body";
import { DrawerFooter } from "../footer";
import styles from "./index.module.css";
import type { DrawerProps } from "../types";

const emptySubscribe = () => () => {};

export function DrawerRoot({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  position = "right",
  size = "md",
  overlay = true,
  isModal,
  closeOnEscape = true,
  closeOnOverlayClick = true,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  className,
}: DrawerProps) {
  const generatedId = useId();
  const titleId = ariaLabelledBy || `drawer-title-${generatedId}`;
  const descId = ariaDescribedBy || `drawer-desc-${generatedId}`;

  const drawerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const showOverlay = isModal !== undefined ? isModal : overlay;

  // Handle document & body scroll locking
  useEffect(() => {
    if (!isOpen || !showOverlay) return;

    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [isOpen, showOverlay]);

  // Focus trap and keyboard navigation (Tab cycling & Escape)
  useEffect(() => {
    if (!isOpen) return;

    if (
      typeof document !== "undefined" &&
      document.activeElement instanceof HTMLElement
    ) {
      previousActiveElementRef.current = document.activeElement;
    }

    const getFocusableElements = (): HTMLElement[] => {
      if (!drawerRef.current) return [];
      const focusableSelector =
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])';
      return Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(focusableSelector)
      );
    };

    // Auto-focus close button on open
    const focusable = getFocusableElements();
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    } else if (focusable.length > 0) {
      focusable[0].focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape) {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const elements = getFocusableElements();
        if (elements.length === 0) {
          event.preventDefault();
          return;
        }

        const firstElement = elements[0];
        const lastElement = elements[elements.length - 1];

        if (event.shiftKey) {
          // Shift + Tab: moving backwards
          if (
            document.activeElement === firstElement ||
            !drawerRef.current?.contains(document.activeElement)
          ) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab: moving forwards
          if (
            document.activeElement === lastElement ||
            !drawerRef.current?.contains(document.activeElement)
          ) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previousActiveElementRef.current?.focus();
    };
  }, [isOpen, closeOnEscape, onClose]);

  const contextValue = useMemo<DrawerContextValue>(
    () => ({
      isOpen,
      onClose,
      position,
      size,
      showOverlay,
      closeOnOverlayClick,
      titleId,
      descId,
      drawerRef,
      closeButtonRef,
    }),
    [
      isOpen,
      onClose,
      position,
      size,
      showOverlay,
      closeOnOverlayClick,
      titleId,
      descId,
    ]
  );

  if (!isOpen || !isMounted) {
    return null;
  }

  // Detect whether children are composed compound components
  const hasComposedChild = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      (child.type === DrawerContent ||
        child.type === DrawerOverlay ||
        (child.type as { displayName?: string })?.displayName ===
          "DrawerContent" ||
        (child.type as { displayName?: string })?.displayName ===
          "DrawerOverlay")
  );

  const drawerContent = (
    <DrawerContext.Provider value={contextValue}>
      <div className={styles.root} data-testid="drawer-root">
        {hasComposedChild ? (
          children
        ) : (
          <>
            {showOverlay && <DrawerOverlay />}
            <DrawerContent
              position={position}
              size={size}
              ariaLabel={ariaLabel}
              ariaLabelledBy={title ? titleId : undefined}
              ariaDescribedBy={description ? descId : undefined}
              className={className}
            >
              {(title || description) && (
                <DrawerHeader>
                  <div className={styles.headerTitles}>
                    {title && <DrawerTitle>{title}</DrawerTitle>}
                    {description && (
                      <DrawerDescription>{description}</DrawerDescription>
                    )}
                  </div>
                  <DrawerClose />
                </DrawerHeader>
              )}

              <DrawerBody>{children}</DrawerBody>

              {footer && <DrawerFooter>{footer}</DrawerFooter>}
            </DrawerContent>
          </>
        )}
      </div>
    </DrawerContext.Provider>
  );

  return createPortal(drawerContent, document.body);
}

DrawerRoot.displayName = "DrawerRoot";
