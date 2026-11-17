import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function MinhaSalaPage() {
  return (
    <div className={styles.pageWrapper}>
      {/* Page Header */}
      <section className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Painel da Minha Sala — 7º Ano B</h1>
        <p className={styles.pageSubtitle}>
          Bem-vinda, Professora! Aqui você organiza a dinâmica espacial da sala,
          estrutura rotinas visuais e consulta adaptações pedagógicas personalizadas
          para cada estudante neurodivergente.
        </p>
      </section>

      {/* Quick Metrics */}
      <section className={styles.statsGrid} aria-label="Estatísticas da Turma">
        <article className={styles.statCard}>
          <span className={styles.statLabel}>Total de Estudantes</span>
          <span className={styles.statValue}>28</span>
          <span className={styles.statDescription}>Matriculados no 7º Ano B</span>
        </article>

        <article className={styles.statCard}>
          <span className={styles.statLabel}>Apoio com PEI Ativo</span>
          <span className={styles.statValue}>4</span>
          <span className={styles.statDescription}>TEA, TDAH e Dislexia</span>
        </article>

        <article className={styles.statCard}>
          <span className={styles.statLabel}>Próxima Aula</span>
          <span className={styles.statValue}>09:15</span>
          <span className={styles.statDescription}>Língua Portuguesa (Sala 14)</span>
        </article>

        <article className={styles.statCard}>
          <span className={styles.statLabel}>Adaptações em Dia</span>
          <span className={styles.statValue}>100%</span>
          <span className={styles.statDescription}>3 planos adaptados esta semana</span>
        </article>
      </section>

      {/* Main Feature Modules */}
      <section className={styles.modulesSection} aria-label="Ferramentas da Sala">
        <h2 className={styles.sectionHeading}>Ações Rápidas de Inclusão</h2>

        <div className={styles.modulesGrid}>
          {/* Spatial Classroom Arrangement */}
          <div className={styles.moduleCard}>
            <div className={styles.moduleCardHeader}>
              <div className={styles.moduleIconBox} aria-hidden="true">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                  <path d="M9 21V9" />
                </svg>
              </div>
              <div className={styles.moduleContent}>
                <h3 className={styles.moduleTitle}>Disposição das Carteiras</h3>
                <p className={styles.moduleText}>
                  Ajuste o mapa da sala de aula para minimizar estímulos sensoriais e
                  posicionar estudantes com TDAH ou TEA em locais ideais.
                </p>
              </div>
            </div>
            <Link
              href="/minha_sala/carteiras"
              className={styles.moduleActionButton}
            >
              Organizar Mapa de Carteiras
            </Link>
          </div>

          {/* Adapted Lesson Plans */}
          <div className={styles.moduleCard}>
            <div className={styles.moduleCardHeader}>
              <div className={styles.moduleIconBox} aria-hidden="true">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <div className={styles.moduleContent}>
                <h3 className={styles.moduleTitle}>Planos de Aula Adaptados</h3>
                <p className={styles.moduleText}>
                  Gere sugestões de diferenciação curricular e atividades adaptadas
                  respeitando os objetivos da BNCC e o ritmo individual.
                </p>
              </div>
            </div>
            <Link
              href="/minha_sala/planos_aula"
              className={styles.moduleActionButton}
            >
              Visualizar Planos
            </Link>
          </div>

          {/* Visual Routines */}
          <div className={styles.moduleCard}>
            <div className={styles.moduleCardHeader}>
              <div className={styles.moduleIconBox} aria-hidden="true">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div className={styles.moduleContent}>
                <h3 className={styles.moduleTitle}>Rotina Visual da Aula</h3>
                <p className={styles.moduleText}>
                  Crie sequências visuais previsíveis de etapas da aula para reduzir a
                  ansiedade e facilitar transições de tarefas.
                </p>
              </div>
            </div>
            <Link
              href="/minha_sala/rotinas"
              className={styles.moduleActionButton}
            >
              Configurar Rotina Visual
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

