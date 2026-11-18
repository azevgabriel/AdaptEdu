"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { GoogleSignInButton, Card } from "@/components";
import { AlertCircleIcon, DocumentIcon } from "@/assets/icons";
import styles from "../../page.module.css";

export function LoginAuthCard() {
  const searchParams = useSearchParams();
  const returnUrl =
    searchParams.get("returnUrl") || "/configuracoes/acessibilidade";
  const errorMessage = searchParams.get("error");

  return (
    <Card className={styles.authCard}>
      <Card.Header className={styles.authCardHeader}>
        <Card.Title
          as="h2"
          id="auth-card-title"
          className={styles.authCardTitle}
        >
          Acesso do Educador
        </Card.Title>
        <Card.Description className={styles.authCardSubtitle}>
          Acesse o painel da sua turma com sua conta Google institucional ou
          pessoal para consultar e registrar adaptações.
        </Card.Description>
      </Card.Header>

      {errorMessage && (
        <div className={styles.errorMessage} role="alert" aria-live="polite">
          <AlertCircleIcon size={18} />
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
          Todas as métricas tratam de hipóteses observacionais pedagógicas para
          apoiar a rotina docente e atender às diretrizes de adaptação razoável
          da Lei Brasileira de Inclusão (LBI nº 13.146/15).
        </p>
      </div>
    </Card>
  );
}
