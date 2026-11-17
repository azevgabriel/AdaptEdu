import type { Metadata } from "next";
import { ClassroomHeader } from "./components";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Minha Sala — AdaptEdu",
  description:
    "Gerenciamento inclusivo de sala de aula e adaptações pedagógicas para estudantes neurodivergentes.",
};

export default function ClassroomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.layoutContainer}>
      <ClassroomHeader />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
