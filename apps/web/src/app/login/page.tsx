import React, { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { LoginAuthCard } from "./login-auth-card";
import { GoogleSignInButton } from "@/components";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Acesso do Educador — AdaptEdu",
  description:
    "Acesso à plataforma AdaptEdu para apoio à inclusão de alunos neurodivergentes na escola pública.",
};

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      {/* Top Navbar */}
      <header className={styles.loginNavbar}>
        <Link
          href="/"
          className={styles.brandLink}
          aria-label="AdaptEdu - Página Inicial"
        >
          <div className={styles.brandLogo} aria-hidden="true">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className={styles.brandTitle}>
            Adapt<span className={styles.brandTitleHighlight}>Edu</span>
          </span>
        </Link>

        <span className={styles.publicBadge}>
          <span aria-hidden="true">🏫</span> Apoio à Escola Pública
        </span>
      </header>

      {/* Main Two-Column Layout */}
      <main className={styles.mainGrid}>
        {/* Left Column: Mission & Educational Value */}
        <section className={styles.presentationColumn} aria-labelledby="mission-heading">
          <span className={styles.missionTag}>PLATAFORMA PEDAGÓGICA ABERTA</span>

          <h1 id="mission-heading" className={styles.mainTitle}>
            Inclusão real na sala de aula, sem sobrecarregar o professor.
          </h1>

          <p className={styles.missionDescription}>
            O AdaptEdu apoia educadores da rede pública brasileira a acolherem
            estudantes neurodivergentes de forma prática, com pequenas adaptações
            de rotina e planejamentos acessíveis para a realidade de cada turma.
          </p>

          {/* Neurodiversity Coverage Badges */}
          <div className={styles.neurodiversityList} aria-label="Condições e neurodivergências atendidas">
            <span className={styles.neuroPill}>Autismo (TEA)</span>
            <span className={styles.neuroPill}>TDAH</span>
            <span className={styles.neuroPill}>Dislexia</span>
            <span className={styles.neuroPill}>Discalculia</span>
            <span className={styles.neuroPill}>Síndrome de Tourette</span>
            <span className={styles.neuroPill}>Processamento Visual (Daltonismo)</span>
          </div>

          {/* Core Feature Highlights */}
          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <div className={styles.featureIconBox} aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className={styles.featureItemText}>
                <span className={styles.featureItemTitle}>Soluções práticas de baixo custo</span>
                <span className={styles.featureItemDescription}>
                  Adaptações de disposição de carteiras, rotinas visuais e mediação pedagógica sem demandar materiais caros.
                </span>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIconBox} aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div className={styles.featureItemText}>
                <span className={styles.featureItemTitle}>Redução da sobrecarga docente</span>
                <span className={styles.featureItemDescription}>
                  Agilidade na personalização do PEI (Plano de Ensino Individualizado) e sugestões alinhadas à BNCC.
                </span>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIconBox} aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className={styles.featureItemText}>
                <span className={styles.featureItemTitle}>Combate à evasão escolar</span>
                <span className={styles.featureItemDescription}>
                  Garantindo que o jovem construa autonomia e conclua os estudos preparado para o mercado de trabalho.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Google Login Action Card */}
        <section className={styles.cardColumn} aria-labelledby="auth-card-title">
          <Suspense
            fallback={
              <div className={styles.authCard}>
                <div className={styles.authActions}>
                  <GoogleSignInButton returnUrl="/minha-sala" />
                </div>
              </div>
            }
          >
            <LoginAuthCard />
          </Suspense>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>
          AdaptEdu — Plataforma de Código Aberto para Apoio ao Educador da Escola Pública.
        </p>
      </footer>
    </div>
  );
}
