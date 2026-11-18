"use client";

import React, { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
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
  isModal = true,
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
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  // Handle body scroll locking
  useEffect(() => {
    if (!isOpen || !isModal) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, isModal]);

  // Handle keyboard Escape
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeOnEscape, onClose]);

  // Auto focus close button when opened
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen || !isMounted) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const drawerContent = (
    <div
      className={`${styles.root} ${isModal ? styles.modal : styles.nonModal}`}
      onClick={handleBackdropClick}
      data-testid="drawer-root"
    >
      {/* Optional Backdrop */}
      {isModal && <div className={styles.backdrop} aria-hidden="true" />}

      {/* Drawer Panel */}
      <section
        ref={drawerRef}
        role="dialog"
        aria-modal={isModal}
        aria-label={ariaLabel}
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descId : undefined}
        className={`${styles.panel} ${styles[position]} ${styles[size]} ${className || ""}`.trim()}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
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
            {/* Close / X Icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
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
