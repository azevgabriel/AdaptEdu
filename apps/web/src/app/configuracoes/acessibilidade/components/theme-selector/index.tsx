"use client";

import React from "react";
import { RadioGroup, RadioCard } from "@/components";
import { SunIcon, MoonIcon } from "@/assets/icons";
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

      <RadioGroup
        value={theme}
        onChange={onThemeChange}
        ariaLabel="Tema da interface"
        className={styles.cardsGrid}
      >
        {/* Light Mode Card */}
        <RadioCard
          value="light"
          ariaLabel="Ativar Modo Claro"
          title="Modo Claro"
          description="Fundo claro suave que reduz o ofuscamento e mantém alto contraste durante o dia."
          icon={<SunIcon size={24} />}
        />

        {/* Dark Mode Card */}
        <RadioCard
          value="dark"
          ariaLabel="Ativar Modo Escuro"
          title="Modo Escuro"
          description="Fundo escuro profundo calibrado para descanso ocular e salas com baixa iluminação."
          icon={<MoonIcon size={24} />}
        />
      </RadioGroup>
    </section>
  );
}
