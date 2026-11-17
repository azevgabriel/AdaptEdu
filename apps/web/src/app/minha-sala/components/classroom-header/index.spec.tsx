import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ClassroomHeader } from "./index";
import { AuthProvider } from "@/contexts/auth-context";

describe("ClassroomHeader", () => {
  it("renders with default teacher when unauthenticated", () => {
    render(
      <AuthProvider initialUser={null}>
        <ClassroomHeader />
      </AuthProvider>,
    );

    expect(screen.getByText("Minha Sala")).toBeInTheDocument();
  });

  it("renders authenticated teacher profile and triggers signOut on logout", async () => {
    const user = userEvent.setup();
    const mockTeacher = {
      id: "u-teacher-1",
      name: "Profª. Roberta Lima",
      email: "roberta@escola.gov.br",
      role: "TEACHER",
      school: "E.E. Maria Montessori",
    };

    render(
      <AuthProvider initialUser={mockTeacher}>
        <ClassroomHeader />
      </AuthProvider>,
    );

    expect(screen.getByText("Profª. Roberta Lima")).toBeInTheDocument();
    expect(screen.getByText("Educadora")).toBeInTheDocument();

    // Open dropdown
    const menuBtn = screen.getByRole("button", {
      name: /menu do usuário: profª\. roberta lima/i,
    });
    await user.click(menuBtn);

    // Click logout
    const logoutBtn = screen.getByRole("menuitem", { name: /sair da conta/i });
    await user.click(logoutBtn);
  });

  it("renders custom role and default fallback school and avatar when omitted", async () => {
    const user = userEvent.setup();
    render(
      <AuthProvider
        initialUser={{
          id: "u-coord-2",
          name: "João Silva",
          email: "joao@escola.gov.br",
          role: "COORDINATOR",
          avatarUrl: "https://example.com/avatar.png",
        }}
      >
        <ClassroomHeader />
      </AuthProvider>,
    );

    expect(screen.getByText("João Silva")).toBeInTheDocument();
    expect(screen.getByText("COORDINATOR")).toBeInTheDocument();

    const menuBtn = screen.getByRole("button", {
      name: /menu do usuário: joão silva/i,
    });
    await user.click(menuBtn);

    expect(screen.getByText("Rede Pública de Ensino")).toBeInTheDocument();
  });
});
