"use client";

import React from "react";
import styles from "./index.module.css";

export interface SwatchItem {
  id: string;
  canonicalName: string;
  standardColorHex: string;
  perceivedColorHex: string;
  perceivedDescription: string;
  opticalNote: string;
  contrastTag: string;
  borderStyle?: string;
}

export interface ChromaticSwatchCardProps {
  item: SwatchItem;
}

export function ChromaticSwatchCard({ item }: ChromaticSwatchCardProps) {
  return (
    <div className={styles.swatchCard} data-testid={`swatch-card-${item.id}`}>
      <div
        className={styles.swatchPreview}
        style={{
          backgroundColor: item.perceivedColorHex,
          borderLeft: item.borderStyle || undefined,
        }}
      >
        <div className={styles.standardSwatchDot} title="Cor padrão original">
          <span
            className={styles.dot}
            style={{ backgroundColor: item.standardColorHex }}
          />
          <span>Padrão</span>
        </div>
        <span className={styles.contrastBadge}>{item.contrastTag}</span>
      </div>
      <div className={styles.swatchDetails}>
        <div className={styles.canonicalName}>
          <span>{item.canonicalName}</span>
        </div>
        <span className={styles.perceivedName}>{item.perceivedDescription}</span>
        <p className={styles.opticalNote}>{item.opticalNote}</p>
      </div>
    </div>
  );
}
