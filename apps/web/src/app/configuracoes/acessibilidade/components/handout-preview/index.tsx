"use client";

import React, { useState } from "react";
import { Switch, Badge } from "@/components";
import { DocumentIcon } from "@/assets/icons";
import type { ColorVisionMode } from "@/hooks/use-accessibility";
import styles from "./index.module.css";

export interface HandoutPreviewProps {
  cvdMode: ColorVisionMode;
}

export function HandoutPreview({ cvdMode }: HandoutPreviewProps) {
  const [isLensActive, setIsLensActive] = useState(false);

  const filterMap: Record<ColorVisionMode, string | undefined> = {
    default: undefined,
    deuteranopia: "url(#sim-deuteranopia)",
    protanopia: "url(#sim-protanopia)",
    tritanopia: "url(#sim-tritanopia)",
    achromatopsia: "url(#sim-achromatopsia)",
  };

  const activeFilter =
    isLensActive && cvdMode !== "default" ? filterMap[cvdMode] : undefined;

  return (
    <section className={styles.container} aria-labelledby="handout-preview-heading">
      {/* SVG Color Defect Simulation Filters */}
      <svg style={{ display: "none" }} aria-hidden="true">
        <defs>
          {/* Deuteranopia Simulation Filter */}
          <filter id="sim-deuteranopia">
            <feColorMatrix
              type="matrix"
              values="0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0"
            />
          </filter>
          {/* Protanopia Simulation Filter */}
          <filter id="sim-protanopia">
            <feColorMatrix
              type="matrix"
              values="0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0"
            />
          </filter>
          {/* Tritanopia Simulation Filter */}
          <filter id="sim-tritanopia">
            <feColorMatrix
              type="matrix"
              values="0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0"
            />
          </filter>
          {/* Achromatopsia Simulation Filter */}
          <filter id="sim-achromatopsia">
            <feColorMatrix
              type="matrix"
              values="0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>

      <div className={styles.header}>
        <div className={styles.headingWrapper}>
          <h2 id="handout-preview-heading" className={styles.title}>
            <span className={styles.titleIcon} aria-hidden="true">
              <DocumentIcon size={22} />
            </span>
            Prévia em Tempo Real: Roteiro Pedagógico Adaptado
          </h2>
          <p className={styles.description}>
            Veja instantaneamente como os tokens de contraste, daltonismo,
            espaçamento e tamanho de fonte se aplicam em materiais de aula reais.
          </p>
        </div>

        {/* Educator Simulation Lens Switch */}
        {cvdMode !== "default" && (
          <div className={styles.lensControl}>
            <label htmlFor="sim-lens-toggle" className={styles.lensLabel}>
              Lente de Simulação Óptica do Aluno
            </label>
            <Switch
              id="sim-lens-toggle"
              checked={isLensActive}
              onChange={setIsLensActive}
              ariaLabel="Ativar lente de simulação óptica do aluno na prévia"
              size="sm"
            />
          </div>
        )}
      </div>

      {/* Realistic Interactive Classroom Handout */}
      <article
        className={styles.handoutCard}
        style={{ filter: activeFilter }}
        data-testid="classroom-handout-preview"
      >
        <div className={styles.handoutMetaHeader}>
          <span className={styles.disciplineBadge}>
            <span aria-hidden="true">🌍</span> Geografia • Ensino Fundamental II
          </span>
          <span className={styles.handoutDate}>Roteiro de Aula Inclusivo • 2026</span>
        </div>

        <h3 className={styles.handoutTitle}>
          Biomas Brasileiros e Segurança Hídrica das Bacias Hidrográficas
        </h3>

        <p className={styles.handoutLead}>
          Este roteiro pedagógico utiliza a codificação visual AdaptEdu para
          facilitar a assimilação de conceitos por estudantes com TEA, TDAH,
          Dislexia e Daltonismo.
        </p>

        <div className={styles.blocksList}>
          {/* Conceito-Chave Block */}
          <div className={`${styles.highlightBlock} ${styles.keyConcept}`}>
            <Badge variant="key-concept" size="md" icon="⚠️">
              Conceito-Chave & Atenção
            </Badge>
            <p className={styles.blockText}>
              A preservação da vegetação nativa do Cerrado (&quot;berço das águas&quot;) é
              indispensável para o abastecimento de 8 das 12 principais bacias
              hidrográficas brasileiras.
            </p>
          </div>

          {/* Definição Block */}
          <div className={`${styles.highlightBlock} ${styles.definition}`}>
            <Badge variant="definition" size="md" icon="📖">
              Definição & Estrutura
            </Badge>
            <p className={styles.blockText}>
              Bacia hidrográfica é uma área delimitada pelo relevo onde toda a água
              da chuva escoa para um rio principal e seus afluentes.
            </p>
          </div>

          {/* Dados & Fórmulas Block */}
          <div className={`${styles.highlightBlock} ${styles.dataFormula}`}>
            <Badge variant="data" size="md" icon="📊">
              Dados Numéricos & Metas
            </Badge>
            <p className={styles.blockText}>
              Extensão total mapeada: 2.036.448 km² | Precipitação média anual: 1.200 a
              1.800 mm | Meta de conservação escolar: 100% de conscientização comunitária.
            </p>
          </div>

          {/* Exemplos Práticos Block */}
          <div className={`${styles.highlightBlock} ${styles.example}`}>
            <Badge variant="example" size="md" icon="💡">
              Exemplo Prático & Exercício
            </Badge>
            <p className={styles.blockText}>
              Exercício inclusivo em duplas: Identifique no mapa hidrográfico as
              nascentes mais próximas da sua escola e liste 3 ações práticas de
              combate ao desperdício de água.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
