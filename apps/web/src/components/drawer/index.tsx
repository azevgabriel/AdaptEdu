"use client";

import React, { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@/assets/icons";
import styles from "./index.module.css";

const emptySubscribe = () => () => {};

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  position?: "right" | "left";
  size?: "sm" | "md" | "lg" | "xl" | "full";
  overlay?: boolean;
  isModal?: boolean;
  closeOnEscape?: boolean;
  closeOnOverlayClick?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  className?: string;
}

export function Drawer({
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
  className,
}: DrawerProps) {
  const generatedId = useId();
  const titleId = ariaLabelledBy || `drawer-title-${generatedId}`;
  const descId = `drawer-desc-${generatedId}`;
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

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

    if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
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

  if (!isOpen || !isMounted) {
    return null;
  }

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  const drawerContent = (
    <div className={styles.root} data-testid="drawer-root">
      {/* Overlay Backdrop */}
      {showOverlay && (
        <div
          className={styles.overlay}
          onClick={handleOverlayClick}
          aria-hidden="true"
          data-testid="drawer-overlay"
        />
      )}

      {/* Drawer Panel */}
      <section
        ref={drawerRef}
        role="dialog"
        aria-modal={showOverlay}
        aria-label={ariaLabel}
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        className={`${styles.panel} ${styles[position]} ${styles[size]} ${className || ""}`.trim()}
        tabIndex={-1}
      >
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerTitles}>
            {title && (
              <h2 id={titleId} className={styles.title}>
                {title}
              </h2>
            )}
            {description && (
              <p id={descId} className={styles.description}>
                {description}
              </p>
            )}
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fechar painel lateral"
          >
            <CloseIcon size={20} />
          </button>
        </header>

        {/* Content Body */}
        <div className={styles.body}>{children}</div>

        {/* Optional Footer */}
        {footer && <footer className={styles.footer}>{footer}</footer>}
      </section>
    </div>
  );

  return createPortal(drawerContent, document.body);
}
