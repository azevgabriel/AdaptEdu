"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Header,
  Footer,
  Drawer,
  Badge,
  FloatGroup,
  FloatButton,
} from "@/components";
import { DocumentIcon, HomeIcon, PrismIcon, ResetIcon } from "@/assets/icons";
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
            <HomeIcon size={14} />
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
            <Badge variant="brand" pill size="sm">
              WCAG 2.1 AA / AAA
            </Badge>
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
          />
        </div>
      </main>

      {/* Floating Action Group for Real-Time Validation & Settings Reset */}
      <FloatGroup
        avoidFooter
        aria-label="Ações rápidas da página de acessibilidade"
      >
        <FloatButton
          variant="secondary"
          icon={<ResetIcon size={18} />}
          label="Restaurar Configurações Padrão"
          onClick={resetSettings}
          aria-label="Restaurar configurações padrão"
          tooltip="Restaurar todas as opções visuais para os padrões originais"
        />

        <FloatButton
          variant="primary"
          icon={<PrismIcon size={20} />}
          label="Validar Cores & Prévia"
          onClick={() => setIsDrawerOpen((prev) => !prev)}
          aria-label={
            isDrawerOpen
              ? "Fechar painel lateral de validação"
              : "Validar cores e prévia em tempo real"
          }
          aria-expanded={isDrawerOpen}
          isActive={isDrawerOpen}
          badge={
            cvdMode !== "default"
              ? cvdMode === "deuteranopia"
                ? "Deuteranopia"
                : cvdMode === "protanopia"
                  ? "Protanopia"
                  : cvdMode === "tritanopia"
                    ? "Tritanopia"
                    : "Acromatopsia"
              : undefined
          }
        />
      </FloatGroup>

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
            <DocumentIcon size={16} />
            Prévia: Roteiro Pedagógico
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeDrawerTab === "matrix"}
            className={`${styles.drawerTabButton} ${activeDrawerTab === "matrix" ? styles.drawerTabActive : ""}`}
            onClick={() => setActiveDrawerTab("matrix")}
          >
            <PrismIcon size={16} />
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
