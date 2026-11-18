"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAccessibility } from "@/hooks/use-accessibility";
import { Avatar } from "../avatar";
import { IconButton } from "../icon-button";
import { Menu } from "../menu";
import {
  AccessibilityIcon,
  AdaptEduIcon,
  ChevronDownIcon,
  LogoutIcon,
  SettingsIcon,
} from "@/assets/icons";
import styles from "./index.module.css";

export interface HeaderProps {
  /**
   * The name of the current active section to display next to the logo.
   * Defaults to "Configurações" when showProfile is true.
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
   * Defaults to "/configuracoes/acessibilidade" when showProfile is true, or "/" when showProfile is false.
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
      ? "Configurações"
      : undefined;

  const resolvedBrandHref =
    brandHref || (showProfile ? "/configuracoes/acessibilidade" : "/");

  const resolvedBrandAriaLabel =
    brandAriaLabel ||
    (showProfile
      ? "AdaptEdu - Configurações"
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
              <AdaptEduIcon size={20} />
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
            <IconButton
              href="/configuracoes/acessibilidade"
              className={`${styles.actionButton} ${
                isAccessibilityActive ? styles.actionButtonActive : ""
              }`}
              aria-label="Configurações de acessibilidade e visualização"
              title="Configurações de acessibilidade e visualização"
              isActive={isAccessibilityActive}
              hasIndicator={hasActiveAccommodations}
              indicatorTitle="Acomodações ativas"
              indicatorTestId="accessibility-active-dot"
            >
              <AccessibilityIcon size={20} />
            </IconButton>
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
                <span className={styles.teacherName} title={teacher.name}>
                  {teacher.name}
                </span>
                <span className={styles.teacherRole} title={teacher.role}>
                  {teacher.role}
                </span>
              </div>
              <span
                className={`${styles.chevronIcon} ${
                  isMenuOpen ? styles.chevronOpen : ""
                }`}
                aria-hidden="true"
              >
                <ChevronDownIcon size={16} />
              </span>
            </button>
          )}

          {/* Teacher Profile Dropdown Menu */}
          {showProfile && isMenuOpen && (
            <Menu
              ref={menuRef}
              id="user-navigation-menu"
              className={styles.dropdownMenu}
              aria-label="Opções de navegação do professor"
            >
              {/* Menu User Header */}
              <Menu.Header className={styles.menuHeader}>
                <Avatar
                  name={teacher.name}
                  src={teacher.avatarUrl}
                  size="md"
                />
                <div className={styles.menuUserInfo}>
                  <strong
                    className={styles.menuUserName}
                    title={teacher.name}
                  >
                    {teacher.name}
                  </strong>
                  <span
                    className={styles.menuUserEmail}
                    title={teacher.email}
                  >
                    {teacher.email}
                  </span>
                  <span
                    className={styles.menuUserSchool}
                    title={teacher.school}
                  >
                    {teacher.school}
                  </span>
                </div>
              </Menu.Header>

              {/* Menu Divider */}
              <Menu.Separator />

              {/* Navigation Options List */}
              <ul className={styles.menuList} role="none">
                <li role="none">
                  <Menu.Item
                    href="/configuracoes/acessibilidade"
                    className={`${styles.menuItemLink} ${
                      resolvedSectionName === "Acessibilidade" ||
                      resolvedSectionName === "Configurações" ||
                      resolvedSectionName === "Acessibilidade & Visualização"
                        ? styles.menuItemActive
                        : ""
                    }`}
                    isActive={
                      resolvedSectionName === "Acessibilidade" ||
                      resolvedSectionName === "Configurações" ||
                      resolvedSectionName === "Acessibilidade & Visualização"
                    }
                    onClick={closeMenu}
                    icon={<SettingsIcon size={18} />}
                  >
                    Configurações
                  </Menu.Item>
                </li>
              </ul>

              {/* Menu Divider */}
              <Menu.Separator />

              {/* Logout Option */}
              <Menu.Item
                variant="danger"
                className={styles.logoutButton}
                onClick={handleLogoutClick}
                icon={<LogoutIcon size={18} />}
              >
                Sair da conta
              </Menu.Item>
            </Menu>
          )}
        </div>
      </div>
    </header>
  );
}
