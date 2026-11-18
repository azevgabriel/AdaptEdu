"use client";

import React from "react";
import type { ColorVisionMode } from "@/hooks/use-accessibility";
import styles from "./index.module.css";

export interface CvdSelectorProps {
  cvdMode: ColorVisionMode;
  onCvdChange: (mode: ColorVisionMode) => void;
}

interface CvdOption {
  id: ColorVisionMode;
  name: string;
  badge: string;
  description: string;
  opticalDetails: string;
}

const CVD_OPTIONS: CvdOption[] = [
  {
    id: "default",
    name: "Padrão (Tricromático Universal)",
    badge: "Cones S, M, L",
    description: "Visão com percepção cromática completa nos 3 espectros de cones.",
    opticalDetails: "Discriminação equilibrada de vermelhos, verdes e azuis sem remapeamento.",
  },
  {
    id: "deuteranopia",
    name: "Deuteranopia / Deuteranomalia",
    badge: "Deficiência de Verde (Cones M)",
    description: "Dificuldade na distinção entre tons de verde e vermelho (~6% da população masculina).",
    opticalDetails: "Remapeia verdes para ciano/azul-petróleo e reforça o contraste de conceitos-chave.",
  },
  {
    id: "protanopia",
    name: "Protanopia / Protanomalia",
    badge: "Deficiência de Vermelho (Cones L)",
    description: "Perda da sensibilidade ao vermelho, que se apresenta escuro ou amarronzado (~2% dos homens).",
    opticalDetails: "Substitui vermelhos por magenta vivo de alta luminância e adiciona sublinhados estruturais.",
  },
  {
    id: "tritanopia",
    name: "Tritanopia / Tritanomalia",
    badge: "Deficiência de Azul/Amarelo (Cones S)",
    description: "Rara deficiência nos cones azuis (~0.01%). Azul e verde se confundem; amarelo atenua-se.",
    opticalDetails: "Preserva o eixo óptico Vermelho-Ciano; fundos neutros puros e brand remapeado para ciano.",
  },
  {
    id: "achromatopsia",
    name: "Acromatopsia / Monocromia Total",
    badge: "Escudo Anti-Ofuscamento",
    description: "Ausência total de cones; visão mediada exclusivamente por bastonetes em escala de cinza.",
    opticalDetails: "Elimina branco puro (#ffffff); reforça bordas estruturais (sólida, dupla, pontilhada, tracejada).",
  },
];

export function CvdSelector({ cvdMode, onCvdChange }: CvdSelectorProps) {
  return (
    <section className={styles.container} aria-labelledby="cvd-selector-heading">
      <div className={styles.headingWrapper}>
        <h2 id="cvd-selector-heading" className={styles.title}>
          Modos de Daltonismo & Visão Cromática (CVD)
        </h2>
        <p className={styles.description}>
          Selecione a calibração óptica adequada para adaptar todos os códigos
          de cores pedagógicos e componentes do sistema.
        </p>
      </div>

      <div
        className={styles.optionsGrid}
        role="radiogroup"
        aria-label="Modo de visão de cores para daltonismo"
      >
        {CVD_OPTIONS.map((option) => {
          const isSelected = cvdMode === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`${styles.optionCard} ${
                isSelected ? styles.optionCardActive : ""
              }`}
              onClick={() => onCvdChange(option.id)}
              aria-label={`Modo ${option.name}`}
            >
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleWrapper}>
                  <span className={styles.cardTitle}>{option.name}</span>
                </div>
                <div className={styles.radioIndicator} aria-hidden="true">
                  {isSelected && <span className={styles.radioIndicatorDot} />}
                </div>
              </div>

              <span className={styles.coneBadge}>{option.badge}</span>
              <p className={styles.cardDescription}>{option.description}</p>
              <span className={styles.opticalDetails}>{option.opticalDetails}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
