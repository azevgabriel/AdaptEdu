import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Header, GoogleSignInButton, Footer, Badge } from "@/components";
import { CheckIcon, ClockIcon, UsersIcon } from "@/assets/icons";
import { LoginAuthCard } from "./components";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Acesso do Educador — AdaptEdu",
  description:
    "Acesso à plataforma AdaptEdu para apoio à inclusão de alunos neurodivergentes na escola pública.",
};

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      {/* Top Navbar using shared Header component */}
      <Header showProfile={false} sectionName="Apoio à Escola Pública" />

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
            <Badge variant="outline" pill size="md">Autismo (TEA)</Badge>
            <Badge variant="outline" pill size="md">TDAH</Badge>
            <Badge variant="outline" pill size="md">Dislexia</Badge>
            <Badge variant="outline" pill size="md">Discalculia</Badge>
            <Badge variant="outline" pill size="md">Síndrome de Tourette</Badge>
            <Badge variant="outline" pill size="md">Processamento Visual (Daltonismo)</Badge>
          </div>

          {/* Core Feature Highlights */}
          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <div className={styles.featureIconBox} aria-hidden="true">
                <CheckIcon size={18} />
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
                <ClockIcon size={18} />
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
                <UsersIcon size={18} />
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
                  <GoogleSignInButton returnUrl="/configuracoes/acessibilidade" />
                </div>
              </div>
            }
          >
            <LoginAuthCard />
          </Suspense>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
