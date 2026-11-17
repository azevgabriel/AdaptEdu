import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { AuthProvider, useAuth } from "./auth-context";

function TestConsumer() {
  const { user, isLoading, isAuthenticated, signOut, loginWithGoogle } =
    useAuth();

  return (
    <div>
      <span data-testid="loading-state">{isLoading ? "Carregando" : "Pronto"}</span>
      <span data-testid="auth-state">
        {isAuthenticated ? "Autenticado" : "Não autenticado"}
      </span>
      {user && <span data-testid="user-name">{user.name}</span>}
      <button onClick={() => void signOut()}>Desconectar</button>
      <button onClick={() => loginWithGoogle("/dashboard")}>Entrar</button>
    </div>
  );
}

describe("AuthContext & AuthProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns default unauthenticated state when useAuth is consumed outside AuthProvider", async () => {
    function Extractor() {
      const auth = useAuth();
      return (
        <div>
          <TestConsumer />
          <button
            onClick={() => {
              auth.loginWithGoogle();
              void auth.signOut();
              void auth.refreshProfile();
            }}
          >
            Invocar Fallbacks
          </button>
        </div>
      );
    }

    const user = userEvent.setup();
    render(<Extractor />);

    expect(screen.getByTestId("loading-state")).toHaveTextContent("Pronto");
    expect(screen.getByTestId("auth-state")).toHaveTextContent("Não autenticado");

    // Click button to invoke all fallback functions
    await user.click(screen.getByRole("button", { name: /invocar fallbacks/i }));
  });

  it("initializes with initialUser provided without fetching", () => {
    const mockUser = {
      id: faker.string.uuid(),
      name: `Profª. ${faker.person.fullName()}`,
      email: faker.internet.email(),
      role: "TEACHER",
    };

    render(
      <AuthProvider initialUser={mockUser}>
        <TestConsumer />
      </AuthProvider>,
    );

    expect(screen.getByTestId("loading-state")).toHaveTextContent("Pronto");
    expect(screen.getByTestId("auth-state")).toHaveTextContent("Autenticado");
    expect(screen.getByTestId("user-name")).toHaveTextContent(mockUser.name);
  });

  it("fetches /auth/me on mount when initialUser is not supplied", async () => {
    const mockUser = {
      id: "u-123",
      name: "Profª. Maria Silva",
      email: "maria@escola.gov.br",
      role: "TEACHER",
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    } as Response);

    render(
      <AuthProvider apiUrl="http://localhost:3000">
        <TestConsumer />
      </AuthProvider>,
    );

    expect(screen.getByTestId("loading-state")).toHaveTextContent("Carregando");

    await waitFor(() => {
      expect(screen.getByTestId("loading-state")).toHaveTextContent("Pronto");
    });

    expect(screen.getByTestId("auth-state")).toHaveTextContent("Autenticado");
    expect(screen.getByTestId("user-name")).toHaveTextContent(mockUser.name);
  });

  it("sets user to null when /auth/me returns 401 or fetch fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 401,
    } as Response);

    render(
      <AuthProvider apiUrl="http://localhost:3000">
        <TestConsumer />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading-state")).toHaveTextContent("Pronto");
    });

    expect(screen.getByTestId("auth-state")).toHaveTextContent("Não autenticado");
    expect(screen.queryByTestId("user-name")).not.toBeInTheDocument();
  });

  it("handles fetch throwing error in initial profile load", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("Network failed"));

    render(
      <AuthProvider apiUrl="http://localhost:3000">
        <TestConsumer />
      </AuthProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading-state")).toHaveTextContent("Pronto");
    });

    expect(screen.getByTestId("auth-state")).toHaveTextContent("Não autenticado");
  });

  it("handles explicit refreshProfile call when user needs refresh", async () => {
    const user = userEvent.setup();
    const mockUser = {
      id: "u-refresh",
      name: "Prof. Atualizado",
      email: "atualizado@escola.gov.br",
      role: "TEACHER",
    };

    function RefreshButton() {
      const { refreshProfile } = useAuth();
      return <button onClick={() => void refreshProfile()}>Atualizar Perfil</button>;
    }

    vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUser,
      } as Response);

    render(
      <AuthProvider initialUser={null} apiUrl="http://localhost:3000">
        <RefreshButton />
      </AuthProvider>,
    );

    await user.click(screen.getByRole("button", { name: /atualizar perfil/i }));
  });

  it("handles explicit refreshProfile throwing error", async () => {
    const user = userEvent.setup();

    function RefreshButton() {
      const { refreshProfile } = useAuth();
      return <button onClick={() => void refreshProfile()}>Atualizar Perfil</button>;
    }

    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("API offline"));

    render(
      <AuthProvider initialUser={null} apiUrl="http://localhost:3000">
        <RefreshButton />
      </AuthProvider>,
    );

    await user.click(screen.getByRole("button", { name: /atualizar perfil/i }));
  });

  it("handles signOut by calling logout endpoint and clearing user state", async () => {
    const user = userEvent.setup();
    const mockUser = {
      id: "u-456",
      name: "Prof. Carlos",
      email: "carlos@escola.gov.br",
      role: "TEACHER",
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    render(
      <AuthProvider initialUser={mockUser} apiUrl="http://localhost:3000">
        <TestConsumer />
      </AuthProvider>,
    );

    const logoutBtn = screen.getByRole("button", { name: /desconectar/i });
    await user.click(logoutBtn);

    expect(screen.getByTestId("auth-state")).toHaveTextContent("Não autenticado");
    expect(screen.queryByTestId("user-name")).not.toBeInTheDocument();
  });

  it("handles signOut gracefully when logout fetch throws network error", async () => {
    const user = userEvent.setup();
    const mockUser = {
      id: "u-456",
      name: "Prof. Carlos",
      email: "carlos@escola.gov.br",
      role: "TEACHER",
    };

    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(new Error("Network offline"));

    render(
      <AuthProvider initialUser={mockUser} apiUrl="http://localhost:3000">
        <TestConsumer />
      </AuthProvider>,
    );

    const logoutBtn = screen.getByRole("button", { name: /desconectar/i });
    await user.click(logoutBtn);

    expect(screen.getByTestId("auth-state")).toHaveTextContent("Não autenticado");
    expect(screen.queryByTestId("user-name")).not.toBeInTheDocument();
  });

  it("redirects window.location on loginWithGoogle", async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider apiUrl="http://localhost:3000">
        <TestConsumer />
      </AuthProvider>,
    );

    const loginBtn = screen.getByRole("button", { name: /entrar/i });
    await user.click(loginBtn);

    expect(window.location.assign).toHaveBeenCalledWith(
      "http://localhost:3000/auth/google?returnUrl=%2Fdashboard",
    );
  });
});
