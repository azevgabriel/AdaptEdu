import type { Metadata } from "next";
import { Header } from "@/components/header";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Minha Sala — AdaptEdu",
  description:
    "Gerenciamento inclusivo de sala de aula e adaptações pedagógicas para estudantes neurodivergentes.",
};

export default function MinhaSalaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.layoutContainer}>
      <Header sectionName="Minha Sala" />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}

