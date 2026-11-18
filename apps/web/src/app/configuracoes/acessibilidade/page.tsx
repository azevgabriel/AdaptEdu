"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header, Footer, Drawer } from "@/components";
import { useAuth } from "@/contexts/auth-context";
import { useAccessibility } from "@/hooks/use-accessibility";
import {
  ThemeSelector,
  CvdSelector,
  ChromaticMatrix,
  ReadingAccommodations,
  HandoutPreview,
} from "./components";
import styles from "./page.module.css";

export default function AccessibilitySettingsPage() {
  const { user, signOut } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeDrawerTab, setActiveDrawerTab] = useState<"handout" | "matrix">("handout");

  const {
    theme,
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
  } = useAccessibility();

  const teacherProfile = user
    ? {
        name: user.name,
        email: user.email,
        role: user.role === "TEACHER" ? "Educadora" : user.role,
        school: user.school || "Rede Pública de Ensino",
        avatarUrl: user.avatarUrl || undefined,
      }
    : undefined;

  return (
    <div className={styles.pageWrapper}>
      {/* Global Application Header */}
      <Header
        sectionName="Acessibilidade"
        teacher={teacherProfile}
        showProfile={Boolean(user)}
        onLogout={signOut}
      />

      <main className={styles.mainContent}>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Navegação estrutural" className={styles.breadcrumbNav}>
          <Link href="/minha-sala" className={styles.breadcrumbLink}>
            {/* Home Icon */}
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
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Minha Sala
          </Link>
          <span className={styles.breadcrumbSeparator} aria-hidden="true">
            /
          </span>
          <span className={styles.breadcrumbCurrent} aria-current="page">
            Acessibilidade & Visualização
          </span>
        </nav>

        {/* Hero Page Header */}
        <header className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>
            Configurações de Acessibilidade & Visualização
            <span className={styles.pageTitleBadge}>WCAG 2.1 AA / AAA</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Centralize e personalize os modos de daltonismo, temas, contraste e
            acomodações sensoriais para uma experiência de ensino inclusiva,
            confortável e livre de ofuscamento visual.
          </p>
        </header>

        {/* Sections Stack */}
        <div className={styles.sectionsStack}>
          {/* 1. Centralized Theme Selector */}
          <ThemeSelector theme={theme} onThemeChange={setTheme} />

          {/* 2. Color Vision Deficiency Selector */}
          <CvdSelector cvdMode={cvdMode} onCvdChange={setCvdMode} />

          {/* 3. Sensory & Reading Accommodations */}
          <ReadingAccommodations
            fontSize={fontSize}
            onFontSizeChange={setFontSize}
            dyslexiaFont={dyslexiaFont}
            onDyslexiaFontChange={setDyslexiaFont}
            highContrast={highContrast}
            onHighContrastChange={setHighContrast}
            reducedMotion={reducedMotion}
            onReducedMotionChange={setReducedMotion}
            onReset={resetSettings}
          />

          {/* 4. Live Validation & Preview Launcher Card */}
          <section
            className={styles.launcherCard}
            aria-labelledby="validation-drawer-heading"
          >
            <div className={styles.launcherInfo}>
              <span className={styles.launcherBadge}>Validação em Tempo Real</span>
              <h2 id="validation-drawer-heading" className={styles.launcherTitle}>
                Matriz Cromática & Prévia Pedagógica
              </h2>
              <p className={styles.launcherDescription}>
                Abra o painel lateral para validar como os códigos de cores, contraste
                e lentes de simulação óptica atuam em materiais reais enquanto você ajusta
                as configurações da plataforma.
              </p>
            </div>
            <button
              type="button"
              className={styles.launcherOpenButton}
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Abrir painel lateral de validação de cores e prévia"
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
                aria-hidden="true"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Abrir Painel de Validação
            </button>
          </section>
        </div>
      </main>

      {/* Floating Action Button for Real-Time Validation */}
      <button
        type="button"
        className={`${styles.floatingActionButton} ${isDrawerOpen ? styles.floatingActive : ""}`}
        onClick={() => setIsDrawerOpen((prev) => !prev)}
        aria-label={
          isDrawerOpen
            ? "Fechar painel lateral de validação"
            : "Validar cores e prévia em tempo real"
        }
        aria-expanded={isDrawerOpen}
      >
        <span className={styles.floatingIcon} aria-hidden="true">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 10 10 0 0 0 0-20" />
          </svg>
        </span>
        <span className={styles.floatingText}>Validar Cores & Prévia</span>
        {cvdMode !== "default" && (
          <span className={styles.floatingTag}>
            {cvdMode === "deuteranopia" && "Deuteranopia"}
            {cvdMode === "protanopia" && "Protanopia"}
            {cvdMode === "tritanopia" && "Tritanopia"}
            {cvdMode === "achromatopsia" && "Acromatopsia"}
          </span>
        )}
      </button>

      {/* Side Drawer for Real-Time Validation */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Validação Cromática & Prévia em Tempo Real"
        description="Acompanhe as mudanças visuais em tempo real conforme você personaliza as opções na tela."
        size="xl"
        position="right"
      >
        <div
          className={styles.drawerTabNav}
          role="tablist"
          aria-label="Abas de validação visual"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeDrawerTab === "handout"}
            className={`${styles.drawerTabButton} ${activeDrawerTab === "handout" ? styles.drawerTabActive : ""}`}
            onClick={() => setActiveDrawerTab("handout")}
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
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Prévia: Roteiro Pedagógico
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeDrawerTab === "matrix"}
            className={`${styles.drawerTabButton} ${activeDrawerTab === "matrix" ? styles.drawerTabActive : ""}`}
            onClick={() => setActiveDrawerTab("matrix")}
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
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 10 10 0 0 0 0-20" />
            </svg>
            Matriz de Comparação Cromática
          </button>
        </div>

        <div className={styles.drawerTabBody}>
          {activeDrawerTab === "handout" ? (
            <HandoutPreview cvdMode={cvdMode} />
          ) : (
            <ChromaticMatrix cvdMode={cvdMode} />
          )}
        </div>
      </Drawer>

      {/* Global Application Footer */}
      <Footer />
    </div>
  );
}
