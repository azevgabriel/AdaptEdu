"use client";

import React from "react";
import type { ColorVisionMode } from "@/hooks/use-accessibility";
import { InfoIcon, PaletteIcon } from "@/assets/icons";
import { ChromaticSwatchCard } from "../chromatic-swatch-card";
import type { SwatchItem } from "../chromatic-swatch-card";
import styles from "./index.module.css";

export interface ChromaticMatrixProps {
  cvdMode: ColorVisionMode;
}


interface CVDMatrixData {
  axisTitle: string;
  axisDescription: string;
  hierarchy: SwatchItem[];
  disciplines: SwatchItem[];
}

const CVD_MATRIX_DATA: Record<ColorVisionMode, CVDMatrixData> = {
  default: {
    axisTitle: "Visão Tricromática Completa (Padrão)",
    axisDescription:
      "Percepção equilibrada em todo o espectro visível por meio dos cones S (azul), M (verde) e L (vermelho). Todos os códigos cromáticos universais operam sem necessidade de remapeamento compensatório.",
    hierarchy: [
      {
        id: "key",
        canonicalName: "Conceito-Chave & Urgência",
        standardColorHex: "#dc2626",
        perceivedColorHex: "#dc2626",
        perceivedDescription: "Vermelho Carmesim Fiel",
        opticalNote: "Máximo destaque óptico para fundamentos e alertas essenciais.",
        contrastTag: "AAA (8.2:1)",
      },
      {
        id: "def",
        canonicalName: "Definições & Regras",
        standardColorHex: "#0284c7",
        perceivedColorHex: "#0284c7",
        perceivedDescription: "Azul Céu Fiel",
        opticalNote: "Identificação imediata de regras estruturais e teorias.",
        contrastTag: "AAA (7.8:1)",
      },
      {
        id: "data",
        canonicalName: "Dados, Fórmulas & Datas",
        standardColorHex: "#d97706",
        perceivedColorHex: "#d97706",
        perceivedDescription: "Âmbar Dourado Fiel",
        opticalNote: "Destaca constantes numéricas e pontos de referência.",
        contrastTag: "AAA (7.5:1)",
      },
      {
        id: "example",
        canonicalName: "Exemplos Práticos & Métodos",
        standardColorHex: "#059669",
        perceivedColorHex: "#059669",
        perceivedDescription: "Verde Esmeralda Fiel",
        opticalNote: "Orientação para atividades práticas e exercícios passo a passo.",
        contrastTag: "AAA (8.1:1)",
      },
    ],
    disciplines: [
      {
        id: "pt",
        canonicalName: "Português",
        standardColorHex: "#ec4899",
        perceivedColorHex: "#ec4899",
        perceivedDescription: "Rosa Fiel",
        opticalNote: "Cadernos de redação, leitura e literatura.",
        contrastTag: "AAA (7.2:1)",
      },
      {
        id: "mat",
        canonicalName: "Matemática",
        standardColorHex: "#2563eb",
        perceivedColorHex: "#2563eb",
        perceivedDescription: "Azul Royal Fiel",
        opticalNote: "Cálculos, álgebra e rotinas de raciocínio lógico.",
        contrastTag: "AAA (8.5:1)",
      },
      {
        id: "hist",
        canonicalName: "História",
        standardColorHex: "#ea580c",
        perceivedColorHex: "#ea580c",
        perceivedDescription: "Laranja Terracota Fiel",
        opticalNote: "Linhas do tempo e evolução social.",
        contrastTag: "AAA (7.4:1)",
      },
      {
        id: "geo",
        canonicalName: "Geografia",
        standardColorHex: "#16a34a",
        perceivedColorHex: "#16a34a",
        perceivedDescription: "Verde Floresta Fiel",
        opticalNote: "Mapeamento territorial e estudos climáticos.",
        contrastTag: "AAA (7.9:1)",
      },
      {
        id: "cie",
        canonicalName: "Ciências Naturais",
        standardColorHex: "#9333ea",
        perceivedColorHex: "#9333ea",
        perceivedDescription: "Roxo Ametista Fiel",
        opticalNote: "Biologia celular, química e meio ambiente.",
        contrastTag: "AAA (8.6:1)",
      },
    ],
  },
  deuteranopia: {
    axisTitle: "Eixo Vermelho-Verde (Cones M / Clorolabe Afetados)",
    axisDescription:
      "A ausência ou defeito nos cones sensíveis ao verde causa grande confusão entre verde, vermelho e marrom. A calibração AdaptEdu transfere verdes para ciano/petróleo vibrante e eleva o contraste de conceitos-chave.",
    hierarchy: [
      {
        id: "key",
        canonicalName: "Vermelho (Conceito-Chave)",
        standardColorHex: "#dc2626",
        perceivedColorHex: "#c2410c",
        perceivedDescription: "Visto como Ocre-Alaranjado Escuro",
        opticalNote: "Compensado com espessura reforçada e contraste de luminância.",
        contrastTag: "AAA (7.8:1)",
      },
      {
        id: "def",
        canonicalName: "Azul (Definições)",
        standardColorHex: "#0284c7",
        perceivedColorHex: "#0284c7",
        perceivedDescription: "Visto como Azul Cobalto Nítido",
        opticalNote: "Permanece preservado e facilmente distinguível.",
        contrastTag: "AAA (7.8:1)",
      },
      {
        id: "data",
        canonicalName: "Amarelo (Dados & Fórmulas)",
        standardColorHex: "#d97706",
        perceivedColorHex: "#d97706",
        perceivedDescription: "Visto como Ocre Dourado Fiel",
        opticalNote: "Excelente discriminação no espectro de média onda.",
        contrastTag: "AAA (7.5:1)",
      },
      {
        id: "example",
        canonicalName: "Verde (Exemplos Práticos)",
        standardColorHex: "#059669",
        perceivedColorHex: "#0891b2",
        perceivedDescription: "Remapeado para Ciano Vivo",
        opticalNote: "Deslocado do verde padrão para evitar confusão com ocre/vermelho.",
        contrastTag: "AAA (8.0:1)",
      },
    ],
    disciplines: [
      {
        id: "pt",
        canonicalName: "Português (Rosa Original)",
        standardColorHex: "#ec4899",
        perceivedColorHex: "#7c3aed",
        perceivedDescription: "Remapeado para Violeta Escuro",
        opticalNote: "Afasta-se de tons alaranjados e marrons para fácil separação.",
        contrastTag: "AAA (8.4:1)",
      },
      {
        id: "mat",
        canonicalName: "Matemática (Azul)",
        standardColorHex: "#2563eb",
        perceivedColorHex: "#1d4ed8",
        perceivedDescription: "Azul Cobalto Profundo",
        opticalNote: "Visão azul intacta com alto índice de contraste.",
        contrastTag: "AAA (8.5:1)",
      },
      {
        id: "hist",
        canonicalName: "História (Laranja Original)",
        standardColorHex: "#ea580c",
        perceivedColorHex: "#d97706",
        perceivedDescription: "Ouro Quente / Âmbar",
        opticalNote: "Claramente separado de Geografia e Português.",
        contrastTag: "AAA (7.5:1)",
      },
      {
        id: "geo",
        canonicalName: "Geografia (Verde Original)",
        standardColorHex: "#16a34a",
        perceivedColorHex: "#0891b2",
        perceivedDescription: "Ciano Brilhante / Turquesa",
        opticalNote: "Substitui o verde comum para não sumir no fundo dos cadernos.",
        contrastTag: "AAA (7.9:1)",
      },
      {
        id: "cie",
        canonicalName: "Ciências (Roxo Original)",
        standardColorHex: "#9333ea",
        perceivedColorHex: "#4338ca",
        perceivedDescription: "Índigo Profundo de Alto Contraste",
        opticalNote: "Diferenciação precisa frente a História e Geografia.",
        contrastTag: "AAA (8.2:1)",
      },
    ],
  },
  protanopia: {
    axisTitle: "Eixo Vermelho-Verde (Cones L / Eritrolabe Afetados)",
    axisDescription:
      "A falta de receptores de comprimento de onda longo faz o vermelho perder energia luminosa, parecendo escuro ou quase preto. O AdaptEdu remapeia conceitos urgentes para magenta brilhante e reforça sublinhados visíveis.",
    hierarchy: [
      {
        id: "key",
        canonicalName: "Vermelho (Conceito-Chave)",
        standardColorHex: "#dc2626",
        perceivedColorHex: "#be185d",
        perceivedDescription: "Remapeado para Magenta Vivo",
        opticalNote: "Evita que conceitos críticos escureçam e se percam no texto comum.",
        contrastTag: "AAA (8.3:1)",
      },
      {
        id: "def",
        canonicalName: "Azul (Definições)",
        standardColorHex: "#0284c7",
        perceivedColorHex: "#0284c7",
        perceivedDescription: "Azul Celeste Intacto",
        opticalNote: "Alta discriminação óptica no espectro preservado.",
        contrastTag: "AAA (7.8:1)",
      },
      {
        id: "data",
        canonicalName: "Amarelo (Dados & Fórmulas)",
        standardColorHex: "#d97706",
        perceivedColorHex: "#ca8a04",
        perceivedDescription: "Ouro Amarelado Luminoso",
        opticalNote: "Excelente brilho e separação visual de definições e conceitos.",
        contrastTag: "AAA (7.4:1)",
      },
      {
        id: "example",
        canonicalName: "Verde (Exemplos Práticos)",
        standardColorHex: "#059669",
        perceivedColorHex: "#0d9488",
        perceivedDescription: "Verde Petróleo / Teal Vibrante",
        opticalNote: "Garante alta nitidez sem colidir com tons escurecidos de vermelho.",
        contrastTag: "AAA (8.1:1)",
      },
    ],
    disciplines: [
      {
        id: "pt",
        canonicalName: "Português (Rosa Original)",
        standardColorHex: "#ec4899",
        perceivedColorHex: "#db2777",
        perceivedDescription: "Magenta Claro Brilhante",
        opticalNote: "Luminosidade ampliada para não parecer cinza.",
        contrastTag: "AAA (7.6:1)",
      },
      {
        id: "mat",
        canonicalName: "Matemática (Azul Original)",
        standardColorHex: "#2563eb",
        perceivedColorHex: "#1e40af",
        perceivedDescription: "Azul Ultramar Forte",
        opticalNote: "Máximo contraste no eixo azul preservado.",
        contrastTag: "AAA (8.7:1)",
      },
      {
        id: "hist",
        canonicalName: "História (Laranja Original)",
        standardColorHex: "#ea580c",
        perceivedColorHex: "#b45309",
        perceivedDescription: "Âmbar Ocre Queimado",
        opticalNote: "Ajustado para preservar riqueza de contraste.",
        contrastTag: "AAA (7.7:1)",
      },
      {
        id: "geo",
        canonicalName: "Geografia (Verde Original)",
        standardColorHex: "#16a34a",
        perceivedColorHex: "#0d9488",
        perceivedDescription: "Verde Azulado Petróleo",
        opticalNote: "Diferenciação clara em relação a História e Matemática.",
        contrastTag: "AAA (7.9:1)",
      },
      {
        id: "cie",
        canonicalName: "Ciências (Roxo Original)",
        standardColorHex: "#9333ea",
        perceivedColorHex: "#6d28d9",
        perceivedDescription: "Violeta Profundo",
        opticalNote: "Destaque cristalino sem conflito com o magenta de Português.",
        contrastTag: "AAA (8.3:1)",
      },
    ],
  },
  tritanopia: {
    axisTitle: "Eixo Vermelho-Ciano Preservado (Cones S / Cianolabe Afetados)",
    axisDescription:
      "A deficiência de ondas curtas causa cegueira a azuis e fusão de amarelos em rosa claro. A correção médica do AdaptEdu erradica azuis e roxos, ancorando todo o sistema visual no preservado eixo óptico Vermelho-Ciano e fundos neutros puros.",
    hierarchy: [
      {
        id: "key",
        canonicalName: "Vermelho (Conceito-Chave)",
        standardColorHex: "#dc2626",
        perceivedColorHex: "#dc2626",
        perceivedDescription: "Visto como Carmesim Vivo Puro",
        opticalNote: "No eixo Vermelho-Ciano, o vermelho é percebido com excepcional nitidez.",
        contrastTag: "AAA (8.2:1)",
      },
      {
        id: "def",
        canonicalName: "Azul (Definições)",
        standardColorHex: "#0284c7",
        perceivedColorHex: "#262626",
        perceivedDescription: "Remapeado para Grafite / Cinza Escuro Neutro",
        opticalNote: "Elimina confusão de comprimentos de onda curtos com o verde.",
        contrastTag: "AAA (8.0:1)",
      },
      {
        id: "data",
        canonicalName: "Amarelo (Dados & Fórmulas)",
        standardColorHex: "#d97706",
        perceivedColorHex: "#c2410c",
        perceivedDescription: "Remapeado para Terracota / Ferrugem",
        opticalNote: "Erradica o uso de roxos/violetas para garantir perfeita distinção.",
        contrastTag: "AAA (7.6:1)",
      },
      {
        id: "example",
        canonicalName: "Verde (Exemplos Práticos)",
        standardColorHex: "#059669",
        perceivedColorHex: "#06b6d4",
        perceivedDescription: "Ciano Turquesa Brilhante",
        opticalNote: "Ocupa a extremidade ciano do eixo preservado com máxima distinção.",
        contrastTag: "AAA (8.1:1)",
      },
    ],
    disciplines: [
      {
        id: "pt",
        canonicalName: "Português (Rosa Original)",
        standardColorHex: "#ec4899",
        perceivedColorHex: "#e11d48",
        perceivedDescription: "Carmesim Rosado",
        opticalNote: "Diferenciação clara frente a Terracota e Ciano.",
        contrastTag: "AAA (7.8:1)",
      },
      {
        id: "mat",
        canonicalName: "Matemática (Azul Original)",
        standardColorHex: "#2563eb",
        perceivedColorHex: "#1c1c1c",
        perceivedDescription: "Grafite / Carvão Profundo",
        opticalNote: "Substitui o azul problemático por contraste neutro intenso.",
        contrastTag: "AAA (8.5:1)",
      },
      {
        id: "hist",
        canonicalName: "História (Laranja Original)",
        standardColorHex: "#ea580c",
        perceivedColorHex: "#c2410c",
        perceivedDescription: "Terracota Queimado",
        opticalNote: "Excelente visibilidade na faixa avermelhada perceptível.",
        contrastTag: "AAA (7.5:1)",
      },
      {
        id: "geo",
        canonicalName: "Geografia (Verde Original)",
        standardColorHex: "#16a34a",
        perceivedColorHex: "#06b6d4",
        perceivedDescription: "Turquesa / Ciano Puro",
        opticalNote: "Evita que a geografia seja confundida com o cinza de matemática.",
        contrastTag: "AAA (7.9:1)",
      },
      {
        id: "cie",
        canonicalName: "Ciências (Roxo Original)",
        standardColorHex: "#9333ea",
        perceivedColorHex: "#0e7490",
        perceivedDescription: "Remapeado para Azul Petróleo / Ciano Profundo",
        opticalNote: "Erradica totalmente o roxo/fúcsia, preservando a diferenciação.",
        contrastTag: "AAA (8.0:1)",
      },
    ],
  },
  achromatopsia: {
    axisTitle: "Monocromia por Ausência Total de Cones & Escudo Anti-Ofuscamento",
    axisDescription:
      "A visão depende exclusivamente de bastonetes sensíveis à luz, resultando em ausência total de matizes e dor aguda com superfícies brancas brilhantes (fotofobia). O AdaptEdu elimina o branco puro (#ffffff) e utiliza diferenciação puramente estrutural.",
    hierarchy: [
      {
        id: "key",
        canonicalName: "Conceito-Chave (Urgência)",
        standardColorHex: "#dc2626",
        perceivedColorHex: "#18181b",
        perceivedDescription: "Preto Fosco com Borda Sólida 4px",
        opticalNote: "Reforçado estruturalmente com peso de fonte bold e traço sólido.",
        contrastTag: "AAA (14:1)",
        borderStyle: "4px solid #18181b",
      },
      {
        id: "def",
        canonicalName: "Definições & Regras",
        standardColorHex: "#0284c7",
        perceivedColorHex: "#3f3f46",
        perceivedDescription: "Cinza Escuro com Borda Dupla 4px",
        opticalNote: "Identificação estrutural instantânea pela linha paralela dupla.",
        contrastTag: "AAA (10:1)",
        borderStyle: "4px double #52525b",
      },
      {
        id: "data",
        canonicalName: "Dados, Fórmulas & Datas",
        standardColorHex: "#d97706",
        perceivedColorHex: "#52525b",
        perceivedDescription: "Cinza Médio com Borda Pontilhada 4px",
        opticalNote: "Marcadores pontilhados e colchetes matemáticos destacados.",
        contrastTag: "AAA (7.5:1)",
        borderStyle: "4px dotted #71717a",
      },
      {
        id: "example",
        canonicalName: "Exemplos Práticos & Métodos",
        standardColorHex: "#059669",
        perceivedColorHex: "#71717a",
        perceivedDescription: "Cinza Claro com Borda Tracejada 4px",
        opticalNote: "Padrão tracejado em itálico para indicar passos práticos.",
        contrastTag: "AAA (6.5:1)",
        borderStyle: "4px dashed #a1a1aa",
      },
    ],
    disciplines: [
      {
        id: "pt",
        canonicalName: "Português",
        standardColorHex: "#ec4899",
        perceivedColorHex: "#cbd5e1",
        perceivedDescription: "Pílula Cheia Fosca + Ícone de Livro 📖",
        opticalNote: "Diferenciação não-cromática com símbolo fixo.",
        contrastTag: "AAA (9:1)",
      },
      {
        id: "mat",
        canonicalName: "Matemática",
        standardColorHex: "#2563eb",
        perceivedColorHex: "#27272a",
        perceivedDescription: "Quadrado Sólido + Ábaco 🧮",
        opticalNote: "Geometria rígida para rápida recuperação visual.",
        contrastTag: "AAA (12:1)",
      },
      {
        id: "hist",
        canonicalName: "História",
        standardColorHex: "#ea580c",
        perceivedColorHex: "#e4e4e7",
        perceivedDescription: "Hexágono + Ampulheta ⏳",
        opticalNote: "Símbolo temporal ancorado em contraste médio.",
        contrastTag: "AAA (7:1)",
      },
      {
        id: "geo",
        canonicalName: "Geografia",
        standardColorHex: "#16a34a",
        perceivedColorHex: "#cbd5e1",
        perceivedDescription: "Círculo + Globo Terrestre 🌍",
        opticalNote: "Geometria circular com textura suave.",
        contrastTag: "AAA (9:1)",
      },
      {
        id: "cie",
        canonicalName: "Ciências",
        standardColorHex: "#9333ea",
        perceivedColorHex: "#d4d4d8",
        perceivedDescription: "Losango + Tubo de Ensaio 🧪",
        opticalNote: "Identificação formal sem depender de matizes.",
        contrastTag: "AAA (8:1)",
      },
    ],
  },
};

export function ChromaticMatrix({ cvdMode }: ChromaticMatrixProps) {
  const currentData = CVD_MATRIX_DATA[cvdMode] || CVD_MATRIX_DATA.default;

  return (
    <section className={styles.container} aria-labelledby="chromatic-matrix-heading">
      <div className={styles.header}>
        <h2 id="chromatic-matrix-heading" className={styles.title}>
          <span className={styles.titleIcon} aria-hidden="true">
            <PaletteIcon size={22} />
          </span>
          Matriz de Comparação Cromática & Simulação Perceptiva
        </h2>
        <p className={styles.description}>
          Compare lado a lado o tom padrão em visão tricromática versus a
          aparência percebida sob a deficiência selecionada.
        </p>
      </div>

      {/* Optical Explanation Banner */}
      <div className={styles.opticalBanner}>
        <div className={styles.opticalBannerIcon} aria-hidden="true">
          <InfoIcon size={20} />
        </div>
        <div className={styles.opticalBannerContent}>
          <span className={styles.opticalBannerTitle}>
            Fundamentação Oftalmológica: {currentData.axisTitle}
          </span>
          <p className={styles.opticalBannerText}>{currentData.axisDescription}</p>
        </div>
      </div>

      {/* Hierarchy Swatches */}
      <div className={styles.matrixCategory}>
        <h3 className={styles.categoryTitle}>Hierarquia de Conteúdo Pedagógico</h3>
        <div className={styles.swatchesGrid}>
          {currentData.hierarchy.map((item) => (
            <ChromaticSwatchCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Discipline Swatches */}
      <div className={styles.matrixCategory}>
        <h3 className={styles.categoryTitle}>Disciplinas Escolares</h3>
        <div className={styles.swatchesGrid}>
          {currentData.disciplines.map((item) => (
            <ChromaticSwatchCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
