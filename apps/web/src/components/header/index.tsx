"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./index.module.css";

export interface HeaderProps {
  /**
   * The name of the current active section to display next to the logo.
   * Defaults to "Minha Sala".
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
  sectionName = "Minha Sala",
  teacher = DEFAULT_TEACHER,
  onLogout,
}: HeaderProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Handle outside click to close dropdown menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    }

    // Handle escape key to close menu
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

  // Generate initials for avatar fallback (e.g. "AS")
  const getInitials = (name: string) => {
    const parts = name.replace(/^(Profª|Prof\.|Professor|Professora)\s+/i, "").trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return (parts[0] ? parts[0].substring(0, 2) : "ED").toUpperCase();
  };

  const initials = getInitials(teacher.name);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Left Side: Brand Logo, Divider, Section Name */}
        <div className={styles.leftSection}>
          <Link
            href="/minha_sala"
            className={styles.brandLink}
            aria-label="AdaptEdu - Início da Minha Sala"
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
          <span className={styles.divider} aria-hidden="true" />

          {/* Current Section Name (Nunito) */}
          <div className={styles.sectionBadge} aria-current="page">
            <span>{sectionName}</span>
          </div>
        </div>

        {/* Right Side: Teacher Profile & Navigation Menu */}
        <div className={styles.rightSection}>
          <button
            ref={buttonRef}
            type="button"
            className={`${styles.profileButton} ${
              isMenuOpen ? styles.profileButtonActive : ""
            }`}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            aria-controls="teacher-navigation-menu"
            aria-label={`Menu do usuário: ${teacher.name}`}
          >
            <div className={styles.avatarWrapper}>
              {teacher.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={teacher.avatarUrl}
                  alt={`Foto de perfil de ${teacher.name}`}
                  className={styles.avatarImage}
                />
              ) : (
                <span aria-hidden="true">{initials}</span>
              )}
              <span className={styles.statusIndicator} title="Online" />
            </div>

            <div className={styles.teacherInfoBrief}>
              <span className={styles.teacherName}>{teacher.name}</span>
              <span className={styles.teacherRole}>{teacher.role}</span>
            </div>

            {/* Chevron Icon */}
            <svg
              className={`${styles.chevronIcon} ${
                isMenuOpen ? styles.chevronIconRotated : ""
              }`}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div
              ref={menuRef}
              id="teacher-navigation-menu"
              className={styles.dropdownMenu}
              role="menu"
              aria-label="Opções de navegação do professor"
            >
              {/* Teacher Summary in Dropdown */}
              <div className={styles.dropdownHeader}>
                <div className={styles.dropdownAvatar} aria-hidden="true">
                  {initials}
                </div>
                <div className={styles.dropdownUserDetails}>
                  <span className={styles.dropdownUserName}>{teacher.name}</span>
                  <span className={styles.dropdownUserEmail}>{teacher.email}</span>
                  <span className={styles.dropdownSchoolBadge}>{teacher.school}</span>
                </div>
              </div>

              {/* Navigation Options */}
              <ul className={styles.menuList} role="none">
                <li role="none">
                  <Link
                    href="/minha_sala"
                    className={`${styles.menuItemLink} ${
                      sectionName === "Minha Sala" ? styles.menuItemActive : ""
                    }`}
                    role="menuitem"
                    onClick={closeMenu}
                  >
                    <span className={styles.menuIcon} aria-hidden="true">
                      {/* Blackboard / Classroom Icon */}
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
                    href="/minha_sala/planos_aula"
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
                    href="/minha_sala/estudantes"
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
                    href="/minha_sala/configuracoes"
                    className={styles.menuItemLink}
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
