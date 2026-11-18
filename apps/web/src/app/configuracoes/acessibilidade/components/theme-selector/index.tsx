"use client";

import React from "react";
import type { ThemeMode } from "@/hooks/use-accessibility";
import styles from "./index.module.css";

export interface ThemeSelectorProps {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export function ThemeSelector({ theme, onThemeChange }: ThemeSelectorProps) {
  return (
    <section
      className={styles.container}
      aria-labelledby="theme-selector-heading"
    >
      <div className={styles.headingWrapper}>
        <h2 id="theme-selector-heading" className={styles.title}>
          Tema da Interface
        </h2>
        <p className={styles.description}>
          Selecione a luminosidade ideal para a sua sala de aula e ambiente de
          trabalho.
        </p>
      </div>

      <div className={styles.cardsGrid} role="radiogroup" aria-label="Tema da interface">
        {/* Light Mode Card */}
        <button
          type="button"
          role="radio"
          aria-checked={theme === "light"}
          className={`${styles.themeCard} ${
            theme === "light" ? styles.themeCardActive : ""
          }`}
          onClick={() => onThemeChange("light")}
          aria-label="Ativar Modo Claro"
        >
          <div className={styles.iconWrapper} aria-hidden="true">
            {/* Sun Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
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
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardTitle}>
              <span>Modo Claro</span>
              {theme === "light" && (
                <span className={styles.activeBadge}>Ativo</span>
              )}
            </div>
            <p className={styles.cardDescription}>
              Fundo claro suave que reduz o ofuscamento e mantém alto contraste
              durante o dia.
            </p>
          </div>
        </button>

        {/* Dark Mode Card */}
        <button
          type="button"
          role="radio"
          aria-checked={theme === "dark"}
          className={`${styles.themeCard} ${
            theme === "dark" ? styles.themeCardActive : ""
          }`}
          onClick={() => onThemeChange("dark")}
          aria-label="Ativar Modo Escuro"
        >
          <div className={styles.iconWrapper} aria-hidden="true">
            {/* Moon Icon */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardTitle}>
              <span>Modo Escuro</span>
              {theme === "dark" && (
                <span className={styles.activeBadge}>Ativo</span>
              )}
            </div>
            <p className={styles.cardDescription}>
              Fundo escuro profundo calibrado para descanso ocular e salas com baixa
              iluminação.
            </p>
          </div>
        </button>
      </div>
    </section>
  );
}
