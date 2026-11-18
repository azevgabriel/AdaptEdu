"use client";

import React from "react";
import { Switch, RadioGroup, RadioCard } from "@/components";
import type { FontSizeMode } from "@/hooks/use-accessibility";
import styles from "./index.module.css";

export interface ReadingAccommodationsProps {
  fontSize: FontSizeMode;
  onFontSizeChange: (fontSize: FontSizeMode) => void;
  dyslexiaFont: boolean;
  onDyslexiaFontChange: (val: boolean) => void;
  highContrast: boolean;
  onHighContrastChange: (val: boolean) => void;
  reducedMotion: boolean;
  onReducedMotionChange: (val: boolean) => void;
}

const FONT_SIZE_OPTIONS: { id: FontSizeMode; name: string; previewSize: string }[] = [
  { id: "normal", name: "Normal (100%)", previewSize: "1.1rem" },
  { id: "large", name: "Grande (115%)", previewSize: "1.35rem" },
  { id: "x-large", name: "Muito Grande (130%)", previewSize: "1.65rem" },
];

export function ReadingAccommodations({
  fontSize,
  onFontSizeChange,
  dyslexiaFont,
  onDyslexiaFontChange,
  highContrast,
  onHighContrastChange,
  reducedMotion,
  onReducedMotionChange,
}: ReadingAccommodationsProps) {
  return (
    <section
      className={styles.container}
      aria-labelledby="reading-accommodations-heading"
    >
      <div className={styles.headingWrapper}>
        <h2 id="reading-accommodations-heading" className={styles.title}>
          Acomodações de Leitura & Sensoriais
        </h2>
        <p className={styles.description}>
          Ajustes cognitivos desenvolvidos para educadores e estudantes com
          Dislexia, TDAH, baixa visão e sensibilidade a estímulos.
        </p>
      </div>

      {/* Font Size Scaling */}
      <div className={styles.section}>
        <span className={styles.sectionLabel} id="font-size-group-label">
          Escala de Tamanho da Fonte
        </span>
        <RadioGroup
          value={fontSize}
          onChange={onFontSizeChange}
          ariaLabelledBy="font-size-group-label"
          className={styles.fontSizeGrid}
        >
          {FONT_SIZE_OPTIONS.map((opt) => (
            <RadioCard
              key={opt.id}
              value={opt.id}
              ariaLabel={`Fonte ${opt.name}`}
              className={styles.fontSizeButton}
              activeClassName={styles.fontSizeButtonActive}
            >
              <span
                className={styles.sampleLetter}
                style={{ fontSize: opt.previewSize }}
                aria-hidden="true"
              >
                Aa
              </span>
              <span className={styles.fontSizeName}>{opt.name}</span>
            </RadioCard>
          ))}
        </RadioGroup>
      </div>

      {/* Toggles */}
      <div className={styles.togglesList}>
        {/* Adaptive High Contrast */}
        <div className={styles.toggleCard}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle} id="high-contrast-label">
              Alto Contraste Estrutural (Anti-Ofuscamento)
            </span>
            <p className={styles.toggleDescription}>
              Reforça o contorno de cartões e botões com bordas grossas sem
              provocar o clarão retiniano que agrava fotofobia.
            </p>
          </div>
          <Switch
            id="high-contrast-switch"
            checked={highContrast}
            onChange={onHighContrastChange}
            ariaLabel="Alto Contraste Estrutural (Anti-Ofuscamento)"
            ariaLabelledBy="high-contrast-label"
          />
        </div>

        {/* Dyslexia & ADHD Spacing */}
        <div className={styles.toggleCard}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle} id="dyslexia-font-label">
              Espaçamento de Leitura para Dislexia & TDAH
            </span>
            <p className={styles.toggleDescription}>
              Amplia o espaçamento entre caracteres (+0.04em), palavras (+0.1em) e
              linhas (1.75) para mitigar aglomerações e linhas flutuantes (&quot;rivering&quot;).
            </p>
          </div>
          <Switch
            id="dyslexia-font-switch"
            checked={dyslexiaFont}
            onChange={onDyslexiaFontChange}
            ariaLabel="Espaçamento de Leitura para Dislexia & TDAH"
            ariaLabelledBy="dyslexia-font-label"
          />
        </div>

        {/* Reduced Motion */}
        <div className={styles.toggleCard}>
          <div className={styles.toggleInfo}>
            <span className={styles.toggleTitle} id="reduced-motion-label">
              Redução de Movimento e Animações
            </span>
            <p className={styles.toggleDescription}>
              Desativa transições dinâmicas para evitar vertigem, náusea e
              sobrecarga sensorial visual.
            </p>
          </div>
          <Switch
            id="reduced-motion-switch"
            checked={reducedMotion}
            onChange={onReducedMotionChange}
            ariaLabel="Redução de Movimento e Animações"
            ariaLabelledBy="reduced-motion-label"
          />
        </div>
      </div>
    </section>
  );
}
