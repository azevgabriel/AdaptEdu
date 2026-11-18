"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAccessibility } from "@/hooks/use-accessibility";
import { Avatar } from "../avatar";
import styles from "./index.module.css";

export interface HeaderProps {
  /**
   * The name of the current active section to display next to the logo.
   * Defaults to "Minha Sala" when showProfile is true.
   */
  sectionName?: string;
  /**
   * Optional custom teacher profile data (mocked/synthetic by default).
   */
  teacher?: {
    name: string;
    email: string;
    role: string;
    school: string;
    avatarUrl?: string;
  };
  /**
   * Whether to display the teacher profile button and dropdown menu.
   * When `false`, the profile button, dropdown menu, and action divider are omitted.
   * Defaults to `true`.
   */
  showProfile?: boolean;
  /**
   * Optional custom URL destination for the brand link.
   * Defaults to "/minha-sala" when showProfile is true, or "/" when showProfile is false.
   */
  brandHref?: string;
  /**
   * Optional custom aria-label for the brand link.
   * Defaults to "AdaptEdu - Início da Minha Sala" when showProfile is true, or "AdaptEdu - Página Inicial" when showProfile is false.
   */
  brandAriaLabel?: string;
  /**
   * Optional callback triggered when user clicks logout.
   */
  onLogout?: () => void;
}

const DEFAULT_TEACHER = {
  name: "Profª Ana Silva",
  email: "ana.silva@escola.gov.br",
  role: "Educadora",
  school: "E.E. Cecília Meireles • Fundamental II",
  avatarUrl: "",
};

export function Header({
  sectionName,
  teacher = DEFAULT_TEACHER,
  showProfile = true,
  brandHref,
  brandAriaLabel,
  onLogout,
}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { hasActiveAccommodations } = useAccessibility();

  const isAccessibilityActive =
    pathname === "/configuracoes/acessibilidade" ||
    (typeof pathname === "string" &&
      pathname.startsWith("/configuracoes/acessibilidade"));

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Handle outside clicks to close profile menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        closeMenu();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isMenuOpen) {
        closeMenu();
        buttonRef.current?.focus();
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen, closeMenu]);

  const handleLogoutClick = () => {
    closeMenu();
    if (onLogout) {
      onLogout();
    } else {
      router.push("/");
    }
  };

  const resolvedSectionName =
    sectionName !== undefined
      ? sectionName
      : showProfile
      ? "Minha Sala"
      : undefined;

  const resolvedBrandHref =
    brandHref || (showProfile ? "/minha-sala" : "/");

  const resolvedBrandAriaLabel =
    brandAriaLabel ||
    (showProfile
      ? "AdaptEdu - Início da Minha Sala"
      : "AdaptEdu - Página Inicial");

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Left Side: Brand Logo, Divider, Section Name */}
        <div className={styles.leftSection}>
          <Link
            href={resolvedBrandHref}
            className={styles.brandLink}
            aria-label={resolvedBrandAriaLabel}
          >
            <div className={styles.brandLogo} aria-hidden="true">
              {/* AdaptEdu Brand Icon SVG: Seedling / Inclusive Education Spark */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className={styles.brandName}>
              Adapt<span className={styles.brandNameHighlight}>Edu</span>
            </span>
          </Link>

          {/* Section Divider */}
          {resolvedSectionName && (
            <span className={styles.divider} aria-hidden="true" />
          )}

          {/* Current Section Name (Nunito) */}
          {resolvedSectionName && (
            <div className={styles.sectionBadge} aria-current="page">
              <span>{resolvedSectionName}</span>
            </div>
          )}
        </div>

        {/* Right Side: Theme & Accessibility Link, Teacher Profile & Navigation Menu */}
        <div className={styles.rightSection}>
          <div className={styles.actionsGroup}>
            {/* Direct Link to Visual Accessibility Settings Page */}
            <Link
              href="/configuracoes/acessibilidade"
              className={`${styles.actionButton} ${
                isAccessibilityActive ? styles.actionButtonActive : ""
              }`}
              aria-label="Configurações de acessibilidade e visualização"
              title="Configurações de acessibilidade e visualização"
            >
              {/* Universal Accessibility Icon */}
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
                <circle cx="12" cy="4" r="2" />
                <path d="M4 8h16" />
                <path d="M12 8v13" />
                <path d="M8 21l4-5 4 5" />
              </svg>
              {hasActiveAccommodations && (
                <span
                  className={styles.activeIndicatorDot}
                  aria-hidden="true"
                  title="Acomodações ativas"
                  data-testid="accessibility-active-dot"
                />
              )}
            </Link>
          </div>

          {/* Section Divider between actions and profile */}
          {showProfile && (
            <span className={styles.actionsDivider} aria-hidden="true" />
          )}

          {/* Teacher Profile Trigger Button */}
          {showProfile && (
            <button
              ref={buttonRef}
              type="button"
              className={styles.profileButton}
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-haspopup="menu"
              aria-controls="user-navigation-menu"
              aria-label={`Menu do usuário: ${teacher.name}`}
            >
              <Avatar
                name={teacher.name}
                src={teacher.avatarUrl}
                size="sm"
              />
              <div className={styles.profileTextWrapper}>
                <span className={styles.teacherName}>{teacher.name}</span>
                <span className={styles.teacherRole}>{teacher.role}</span>
              </div>
              <span
                className={`${styles.chevronIcon} ${
                  isMenuOpen ? styles.chevronOpen : ""
                }`}
                aria-hidden="true"
              >
                {/* Chevron Down SVG */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>
          )}

          {/* Teacher Profile Dropdown Menu */}
          {showProfile && isMenuOpen && (
            <div
              ref={menuRef}
              id="user-navigation-menu"
              className={styles.dropdownMenu}
              role="menu"
              aria-label="Opções de navegação do professor"
            >
              {/* Menu User Header */}
              <div className={styles.menuHeader}>
                <Avatar
                  name={teacher.name}
                  src={teacher.avatarUrl}
                  size="md"
                />
                <div className={styles.menuUserInfo}>
                  <strong className={styles.menuUserName}>
                    {teacher.name}
                  </strong>
                  <span className={styles.menuUserEmail}>
                    {teacher.email}
                  </span>
                  <span className={styles.menuUserSchool}>
                    {teacher.school}
                  </span>
                </div>
              </div>

              {/* Menu Divider */}
              <div className={styles.menuDivider} role="separator" />

              {/* Navigation Options List */}
              <ul className={styles.menuList} role="none">
                <li role="none">
                  <Link
                    href="/minha-sala"
                    className={`${styles.menuItemLink} ${
                      resolvedSectionName === "Minha Sala"
                        ? styles.menuItemActive
                        : ""
                    }`}
                    role="menuitem"
                    onClick={closeMenu}
                  >
                    <span className={styles.menuIcon} aria-hidden="true">
                      {/* Chalkboard / Classroom Icon */}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="3" width="20" height="14" rx="2" />
                        <line x1="8" y1="21" x2="16" y2="21" />
                        <line x1="12" y1="17" x2="12" y2="21" />
                      </svg>
                    </span>
                    <span>Minha Sala</span>
                  </Link>
                </li>

                <li role="none">
                  <Link
                    href="/planejamento"
                    className={styles.menuItemLink}
                    role="menuitem"
                    onClick={closeMenu}
                  >
                    <span className={styles.menuIcon} aria-hidden="true">
                      {/* Document / Lesson Plan Icon */}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </span>
                    <span>Planos de Aula Adaptados</span>
                  </Link>
                </li>

                <li role="none">
                  <Link
                    href="/turmas"
                    className={styles.menuItemLink}
                    role="menuitem"
                    onClick={closeMenu}
                  >
                    <span className={styles.menuIcon} aria-hidden="true">
                      {/* Students / Inclusion Icon */}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </span>
                    <span>Estudantes & Adaptações</span>
                  </Link>
                </li>

                <li role="none">
                  <Link
                    href="/configuracoes/acessibilidade"
                    className={`${styles.menuItemLink} ${
                      resolvedSectionName === "Acessibilidade" ||
                      resolvedSectionName === "Configurações"
                        ? styles.menuItemActive
                        : ""
                    }`}
                    role="menuitem"
                    onClick={closeMenu}
                  >
                    <span className={styles.menuIcon} aria-hidden="true">
                      {/* Settings Gear Icon */}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                      </svg>
                    </span>
                    <span>Configurações</span>
                  </Link>
                </li>
              </ul>

              {/* Menu Divider */}
              <div className={styles.menuDivider} role="separator" />

              {/* Logout Option */}
              <button
                type="button"
                className={styles.logoutButton}
                role="menuitem"
                onClick={handleLogoutClick}
              >
                <span className={styles.logoutIcon} aria-hidden="true">
                  {/* Logout / Exit Door Icon */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </span>
                <span>Sair da conta</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
