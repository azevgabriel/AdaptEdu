"use client";

import React from "react";
import { GoogleIcon } from "@/assets/icons";
import styles from "./index.module.css";

export interface GoogleSignInButtonProps {
  /**
   * The destination relative path to redirect after successful login.
   * Defaults to "/configuracoes/acessibilidade".
   */
  returnUrl?: string;
  /**
   * Optional base API URL. Defaults to NEXT_PUBLIC_API_URL or "http://localhost:3000".
   */
  apiUrl?: string;
  /**
   * Optional custom click handler (useful for testing or custom orchestration).
   */
  onSignIn?: () => void;
  /**
   * Disabled state for button.
   */
  disabled?: boolean;
  /**
   * Optional additional CSS class.
   */
  className?: string;
}

export function GoogleSignInButton({
  returnUrl = "/configuracoes/acessibilidade",
  apiUrl,
  onSignIn,
  disabled = false,
  className,
}: GoogleSignInButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    if (onSignIn) {
      onSignIn();
      return;
    }

    const baseApi =
      apiUrl ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:3000";

    const targetUrl = new URL("/auth/google", baseApi);
    if (returnUrl) {
      targetUrl.searchParams.set("returnUrl", returnUrl);
    }
    window.location.assign(targetUrl.toString());
  };

  return (
    <button
      type="button"
      className={`${styles.googleButton} ${className || ""}`.trim()}
      onClick={handleClick}
      disabled={disabled}
      aria-label="Entrar com a conta institucional Google"
    >
      <span className={styles.googleIconBox} aria-hidden="true">
        <GoogleIcon size={20} />
      </span>
      <span className={styles.buttonLabel}>Entrar com Google</span>
    </button>
  );
}
