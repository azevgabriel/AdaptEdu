"use client";

import React, { useState } from "react";
import {
  Header,
  Footer,
  Drawer,
  Badge,
  FloatGroup,
  FloatButton,
  Tabs,
  Breadcrumb,
} from "@/components";
import {
  DocumentIcon,
  PrismIcon,
  ResetIcon,
  SettingsIcon,
} from "@/assets/icons";
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
        sectionName="Acessibilidade & Visualização"
        teacher={teacherProfile}
        showProfile={Boolean(user)}
        onLogout={signOut}
      />

      <main className={styles.mainContent}>
        {/* Breadcrumb Navigation */}
        <Breadcrumb aria-label="Navegação estrutural">
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link
                href="/configuracoes"
                icon={<SettingsIcon size={14} />}
              >
                Configurações
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Page>
                Acessibilidade & Visualização
              </Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb>

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
        size="xl"
        position="right"
      >
        <Drawer.Overlay />
        <Drawer.Content>
          <Drawer.Header>
            <div>
              <Drawer.Title>
                Validação Cromática & Prévia em Tempo Real
              </Drawer.Title>
              <Drawer.Description>
                Acompanhe as mudanças visuais em tempo real conforme você personaliza as opções na tela.
              </Drawer.Description>
            </div>
            <Drawer.Close />
          </Drawer.Header>

          <Drawer.Body>
            <Tabs
              value={activeDrawerTab}
              onChange={setActiveDrawerTab}
              fitted
            >
              <Tabs.List aria-label="Abas de validação visual">
                <Tabs.Tab
                  value="handout"
                  icon={<DocumentIcon size={16} />}
                >
                  Prévia: Roteiro Pedagógico
                </Tabs.Tab>

                <Tabs.Tab
                  value="matrix"
                  icon={<PrismIcon size={16} />}
                >
                  Matriz de Comparação Cromática
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="handout">
                <HandoutPreview cvdMode={cvdMode} />
              </Tabs.Panel>

              <Tabs.Panel value="matrix">
                <ChromaticMatrix cvdMode={cvdMode} />
              </Tabs.Panel>
            </Tabs>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer>

      {/* Global Application Footer */}
      <Footer />
    </div>
  );
}
