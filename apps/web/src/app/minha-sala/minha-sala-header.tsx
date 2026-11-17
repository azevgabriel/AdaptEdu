"use client";

import React from "react";
import { Header } from "@/components/header";
import { useAuth } from "@/contexts/auth-context";

export function MinhaSalaHeader() {
  const { user, signOut } = useAuth();

  const teacherProfile = user
    ? {
        name: user.name,
        email: user.email,
        role: user.role === "TEACHER" ? "Educadora" : user.role,
        school: user.school || "Rede Pública de Ensino",
        avatarUrl: user.avatarUrl || undefined,
      }
    : undefined;

  return (
    <Header
      sectionName="Minha Sala"
      teacher={teacherProfile}
      onLogout={signOut}
    />
  );
}
