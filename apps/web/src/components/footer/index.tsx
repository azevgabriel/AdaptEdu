import React from "react";
import { GitHubIcon, LinkedInIcon } from "@/assets/icons";
import styles from "./index.module.css";

export interface FooterProps {
  /**
   * Optional custom URL for the open-source GitHub repository.
   * Defaults to "https://github.com/azevgabriel/AdaptEdu".
   */
  githubUrl?: string;
  /**
   * Optional custom URL for the developer's LinkedIn newsletter subscription.
   * Defaults to "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7528476481568739328".
   */
  linkedinUrl?: string;
  /**
   * Optional additional CSS class for container customization.
   */
  className?: string;
}

const DEFAULT_GITHUB_URL = "https://github.com/azevgabriel/AdaptEdu";
const DEFAULT_LINKEDIN_URL =
  "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7528476481568739328";

export function Footer({
  githubUrl = DEFAULT_GITHUB_URL,
  linkedinUrl = DEFAULT_LINKEDIN_URL,
  className,
}: FooterProps) {
  const containerClassName = [styles.footerContainer, className]
    .filter(Boolean)
    .join(" ");

  return (
    <footer className={containerClassName}>
      <div className={styles.footerContent}>
        <p className={styles.footerText}>
          AdaptEdu — Plataforma de Código Aberto para Apoio ao Educador da Escola Pública.
        </p>

        <nav
          className={styles.footerLinks}
          aria-label="Links institucionais e do desenvolvedor"
        >
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
            aria-label="Repositório do projeto AdaptEdu no GitHub (abre em nova aba)"
          >
            <span className={styles.linkIcon} aria-hidden="true">
              <GitHubIcon size={16} />
            </span>
            <span>GitHub</span>
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.footerLink}
            aria-label="Assinar newsletter no LinkedIn (abre em nova aba)"
          >
            <span className={styles.linkIcon} aria-hidden="true">
              <LinkedInIcon size={16} />
            </span>
            <span>Assinar no LinkedIn</span>
          </a>
        </nav>
      </div>
    </footer>
  );
}
