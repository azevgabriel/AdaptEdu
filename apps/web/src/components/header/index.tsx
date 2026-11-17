"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useAccessibility,
  ColorVisionMode,
} from "@/hooks/use-accessibility";
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
   * Defaults to "/minha_sala" when showProfile is true, or "/" when showProfile is false.
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const accessibilityMenuRef = useRef<HTMLDivElement>(null);
  const accessibilityButtonRef = useRef<HTMLButtonElement>(null);

  const {
    theme,
    toggleTheme,
    setTheme,
    cvdMode,
    setCvdMode,
    fontSize,
    setFontSize,
    dyslexiaFont,
    setDyslexiaFont,
    highContrast,
    setHighContrast,
    reducedMotion,
    setReducedMotion,
    resetSettings,
    hasActiveAccommodations,
  } = useAccessibility();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
    setIsAccessibilityOpen(false);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleAccessibility = useCallback(() => {
    setIsAccessibilityOpen((prev) => !prev);
    setIsMenuOpen(false);
  }, []);

  const closeAccessibility = useCallback(() => {
    setIsAccessibilityOpen(false);
  }, []);

  // Handle outside clicks to close dropdown menus
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      // Close teacher profile menu if clicked outside
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        closeMenu();
      }

      // Close accessibility popover if clicked outside
      if (
        accessibilityMenuRef.current &&
        !accessibilityMenuRef.current.contains(target) &&
        accessibilityButtonRef.current &&
        !accessibilityButtonRef.current.contains(target)
      ) {
        closeAccessibility();
      }
    }

    // Handle escape key to close menus
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (isAccessibilityOpen) {
          closeAccessibility();
          accessibilityButtonRef.current?.focus();
        } else if (isMenuOpen) {
          closeMenu();
          buttonRef.current?.focus();
        }
      }
    }

    if (isMenuOpen || isAccessibilityOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen, isAccessibilityOpen, closeMenu, closeAccessibility]);

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
    brandHref || (showProfile ? "/minha_sala" : "/");

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

        {/* Right Side: Theme & Accessibility Controls, Teacher Profile & Navigation Menu */}
        <div className={styles.rightSection}>
          <div className={styles.actionsGroup}>
            {/* Quick Dark/Light Mode Switcher Button */}
            <button
              type="button"
              className={styles.actionButton}
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Alternar tema: mudar para modo claro"
                  : "Alternar tema: mudar para modo escuro"
              }
              title={
                theme === "dark"
                  ? "Mudar para modo claro"
                  : "Mudar para modo escuro"
              }
            >
              {theme === "dark" ? (
                /* Sun Icon (shown in dark mode to switch to light) */
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                /* Moon Icon (shown in light mode to switch to dark) */
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Accessibility Popover Toggle Button */}
            <button
              ref={accessibilityButtonRef}
              type="button"
              className={`${styles.actionButton} ${
                isAccessibilityOpen ? styles.actionButtonActive : ""
              }`}
              onClick={toggleAccessibility}
              aria-expanded={isAccessibilityOpen}
              aria-haspopup="dialog"
              aria-controls="accessibility-settings-menu"
              aria-label="Opções de acessibilidade"
              title="Opções de acessibilidade e visualização"
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
                />
              )}
            </button>
          </div>

          {/* Section Divider between actions and profile */}
          {showProfile && (
            <span className={styles.actionsDivider} aria-hidden="true" />
          )}

          {/* Accessibility Settings Popover Modal */}
          {isAccessibilityOpen && (
            <div
              ref={accessibilityMenuRef}
              id="accessibility-settings-menu"
              className={styles.accessibilityMenu}
              role="dialog"
              aria-label="Opções de acessibilidade e tema"
            >
              {/* Accessibility Header */}
              <div className={styles.accessibilityHeader}>
                <div className={styles.accessibilityTitleWrapper}>
                  <div
                    className={styles.accessibilityTitleIcon}
                    aria-hidden="true"
                  >
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
                      <circle cx="12" cy="4" r="2" />
                      <path d="M4 8h16" />
                      <path d="M12 8v13" />
                      <path d="M8 21l4-5 4 5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className={styles.accessibilityTitle}>
                      Acessibilidade & Exibição
                    </h3>
                    <p className={styles.accessibilitySubtitle}>
                      Personalize o contraste, cores e leitura para o seu conforto.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.popoverCloseButton}
                  onClick={closeAccessibility}
                  aria-label="Fechar painel de acessibilidade"
                >
                  <svg
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
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              {/* Section 1: Tema da Interface */}
              <div className={styles.accessibilitySection}>
                <span className={styles.sectionLabel}>Tema da Interface</span>
                <div className={styles.themeOptionsGrid}>
                  <button
                    type="button"
                    className={
                      theme === "light"
                        ? styles.optionButtonActive
                        : styles.optionButton
                    }
                    onClick={() => setTheme("light")}
                    aria-pressed={theme === "light"}
                  >
                    <svg
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
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                    </svg>
                    <span>Modo Claro</span>
                  </button>

                  <button
                    type="button"
                    className={
                      theme === "dark"
                        ? styles.optionButtonActive
                        : styles.optionButton
                    }
                    onClick={() => setTheme("dark")}
                    aria-pressed={theme === "dark"}
                  >
                    <svg
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
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                    <span>Modo Escuro</span>
                  </button>
                </div>
              </div>

              {/* Section 2: Visão de Cores (Daltonismo) */}
              <div className={styles.accessibilitySection}>
                <label
                  htmlFor="header-cvd-select"
                  className={styles.sectionLabel}
                >
                  Visão de Cores (Daltonismo)
                </label>
                <select
                  id="header-cvd-select"
                  value={cvdMode}
                  onChange={(e) => setCvdMode(e.target.value as ColorVisionMode)}
                  className={styles.accessibilitySelect}
                  aria-label="Selecionar modo de visão cromática para daltonismo"
                >
                  <option value="default">Padrão (Cromático Universal)</option>
                  <option value="deuteranopia">
                    Deuteranopia (Deficiência de Verde)
                  </option>
                  <option value="protanopia">
                    Protanopia (Deficiência de Vermelho)
                  </option>
                  <option value="tritanopia">
                    Tritanopia (Deficiência de Azul / Amarelo)
                  </option>
                  <option value="achromatopsia">
                    Acromatopsia (Monocromático + Anti-Ofuscamento)
                  </option>
                </select>
              </div>

              {/* Section 3: Tamanho do Texto */}
              <div className={styles.accessibilitySection}>
                <span className={styles.sectionLabel}>Tamanho do Texto</span>
                <div className={styles.fontSizeOptionsGrid}>
                  <button
                    type="button"
                    className={
                      fontSize === "normal"
                        ? styles.optionButtonActive
                        : styles.optionButton
                    }
                    onClick={() => setFontSize("normal")}
                    aria-pressed={fontSize === "normal"}
                  >
                    Normal (100%)
                  </button>
                  <button
                    type="button"
                    className={
                      fontSize === "large"
                        ? styles.optionButtonActive
                        : styles.optionButton
                    }
                    onClick={() => setFontSize("large")}
                    aria-pressed={fontSize === "large"}
                  >
                    Grande (+15%)
                  </button>
                  <button
                    type="button"
                    className={
                      fontSize === "x-large"
                        ? styles.optionButtonActive
                        : styles.optionButton
                    }
                    onClick={() => setFontSize("x-large")}
                    aria-pressed={fontSize === "x-large"}
                  >
                    Muito Grande (+30%)
                  </button>
                </div>
              </div>

              {/* Section 4: Acomodações Visuais e Sensoriais */}
              <div className={styles.accessibilitySection}>
                <span className={styles.sectionLabel}>Acomodações Visuais</span>
                <div className={styles.checkboxList}>
                  <label className={styles.checkboxRow}>
                    <input
                      type="checkbox"
                      checked={dyslexiaFont}
                      onChange={(e) => setDyslexiaFont(e.target.checked)}
                      className={styles.checkboxInput}
                    />
                    <div className={styles.checkboxTextGroup}>
                      <span className={styles.checkboxLabel}>
                        Espaçamento para Leitura (Dislexia / TDAH)
                      </span>
                      <span className={styles.checkboxHint}>
                        Aumenta espaçamento entre letras, palavras e linhas para
                        evitar aglomeração visual.
                      </span>
                    </div>
                  </label>

                  <label className={styles.checkboxRow}>
                    <input
                      type="checkbox"
                      checked={highContrast}
                      onChange={(e) => setHighContrast(e.target.checked)}
                      className={styles.checkboxInput}
                    />
                    <div className={styles.checkboxTextGroup}>
                      <span className={styles.checkboxLabel}>
                        Alto Contraste
                      </span>
                      <span className={styles.checkboxHint}>
                        Reforça bordas e contornos para máxima diferenciação
                        visual.
                      </span>
                    </div>
                  </label>

                  <label className={styles.checkboxRow}>
                    <input
                      type="checkbox"
                      checked={reducedMotion}
                      onChange={(e) => setReducedMotion(e.target.checked)}
                      className={styles.checkboxInput}
                    />
                    <div className={styles.checkboxTextGroup}>
                      <span className={styles.checkboxLabel}>
                        Reduzir Animações
                      </span>
                      <span className={styles.checkboxHint}>
                        Desativa efeitos dinâmicos para diminuir sobrecarga
                        sensorial.
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Popover Footer: Reset */}
              <div className={styles.popoverFooter}>
                <button
                  type="button"
                  className={styles.resetButton}
                  onClick={resetSettings}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                  <span>Restaurar configurações padrão</span>
                </button>
              </div>
            </div>
          )}

          {/* Teacher Profile Trigger Button */}
          {showProfile && (
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
              <Avatar
                src={teacher.avatarUrl}
                name={teacher.name}
                status="online"
                size="md"
              />

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
          )}

          {/* Teacher Dropdown Menu */}
          {showProfile && isMenuOpen && (
            <div
              ref={menuRef}
              id="teacher-navigation-menu"
              className={styles.dropdownMenu}
              role="menu"
              aria-label="Opções de navegação do professor"
            >
              {/* Teacher Summary in Dropdown */}
              <div className={styles.dropdownHeader}>
                <Avatar
                  src={teacher.avatarUrl}
                  name={teacher.name}
                  size="lg"
                  className={styles.dropdownAvatar}
                />
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
