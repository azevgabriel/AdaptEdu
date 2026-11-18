"use client";

import React, { useState } from "react";
import { UserIcon } from "@/assets/icons";
import styles from "./index.module.css";

export type AvatarSize = "sm" | "md" | "lg" | "xl";
export type AvatarStatus = "online" | "offline" | "busy" | "away";

export interface AvatarProps {
  /**
   * Source image URL.
   */
  src?: string | null;
  /**
   * Accessible alternative text for the avatar.
   * Defaults to "Foto de perfil de <name>" if name is provided, or "Foto de perfil do usuário".
   */
  alt?: string;
  /**
   * Full name of the user to generate initials from if src is absent or fails to load.
   */
  name?: string;
  /**
   * Explicit custom initials to display (e.g., "ED", "AS").
   */
  initials?: string;
  /**
   * Size variant: "sm" (28px), "md" (36px, default), "lg" (48px), "xl" (64px).
   */
  size?: AvatarSize;
  /**
   * Optional presence indicator. Can be a boolean (true = "online") or specific status.
   */
  status?: AvatarStatus | boolean;
  /**
   * Accessible label for the presence indicator (e.g., "Online", "Ausente").
   */
  statusLabel?: string;
  /**
   * Additional custom CSS classes.
   */
  className?: string;
}

/**
 * Extracts clean uppercase initials from a name, ignoring common teacher honorifics.
 * If name is empty string, defaults to "ED" (Educador / Educadora).
 */
export function getAvatarInitials(name?: string): string {
  if (!name || !name.trim()) return "ED";
  const cleaned = name
    .replace(/^(Profª\.?|Prof\.?|Professor|Professora)\s+/i, "")
    .trim();

  if (!cleaned) return "ED";

  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase() || "ED";
}

const STATUS_LABELS: Record<AvatarStatus, string> = {
  online: "Online",
  offline: "Offline",
  busy: "Ocupado",
  away: "Ausente",
};

export function Avatar({
  src,
  alt,
  name,
  initials: explicitInitials,
  size = "md",
  status,
  statusLabel,
  className = "",
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  const resolvedInitials =
    explicitInitials || (name !== undefined ? getAvatarInitials(name) : "");
  const showImage = Boolean(src && !hasError);

  const defaultAlt = name
    ? `Foto de perfil de ${name}`
    : "Foto de perfil do usuário";
  const resolvedAlt = alt || defaultAlt;

  const resolvedStatus: AvatarStatus | null =
    typeof status === "boolean"
      ? status
        ? "online"
        : null
      : status || null;

  const defaultStatusTitle = resolvedStatus
    ? STATUS_LABELS[resolvedStatus]
    : undefined;
  const resolvedStatusTitle = statusLabel || defaultStatusTitle;

  const sizeClass = styles[size] || styles.md;

  return (
    <div
      className={`${styles.avatarWrapper} ${sizeClass} ${className}`.trim()}
      {...(!showImage && { role: "img", "aria-label": resolvedAlt })}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src as string}
          alt={resolvedAlt}
          className={styles.avatarImage}
          onError={() => setHasError(true)}
        />
      ) : resolvedInitials ? (
        <span className={styles.avatarInitials} aria-hidden="true">
          {resolvedInitials}
        </span>
      ) : (
        <UserIcon
          className={styles.fallbackIcon}
          data-testid="avatar-fallback-icon"
        />
      )}

      {resolvedStatus && (
        <span
          className={`${styles.statusIndicator} ${styles[resolvedStatus]}`}
          title={resolvedStatusTitle}
          aria-label={resolvedStatusTitle}
        />
      )}
    </div>
  );
}
