"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { GoogleSignInButton } from "@/components";
import styles from "../../page.module.css";

export function LoginAuthCard() {
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/minha-sala";
  const errorMessage = searchParams.get("error");

  return (
    <div className={styles.authCard}>
      <div className={styles.authCardHeader}>
        <h2 id="auth-card-title" className={styles.authCardTitle}>
          Acesso do Educador
        </h2>
        <p className={styles.authCardSubtitle}>
          Acesse o painel da sua turma com sua conta Google institucional ou pessoal para consultar e registrar adaptações.
        </p>
      </div>

      {errorMessage && (
        <div
          className={styles.errorMessage}
          role="alert"
          aria-live="polite"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      <div className={styles.authActions}>
        <GoogleSignInButton returnUrl={returnUrl} />
      </div>

      <div className={styles.cardDivider} />

      <div className={styles.privacyNotice}>
        <span className={styles.privacyNoticeTitle}>
          Compromisso com a Privacidade & LGPD
        </span>
        <p>
          O AdaptEdu não armazena dados médicos sensíveis ou laudos clínicos.
          Todas as métricas tratam de hipóteses observacionais pedagógicas
          para suporte à rotina em sala de aula.
        </p>
      </div>
    </div>
  );
}
