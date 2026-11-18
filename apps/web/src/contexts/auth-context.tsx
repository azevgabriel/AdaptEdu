"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string | null;
  school?: string;
  createdAt?: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginWithGoogle: (returnUrl?: string) => void;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const DEFAULT_AUTH_CONTEXT: AuthContextType = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  loginWithGoogle: () => {},
  signOut: async () => {},
  refreshProfile: async () => {},
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthProviderProps {
  children: React.ReactNode;
  initialUser?: UserProfile | null;
  apiUrl?: string;
}

export function AuthProvider({
  children,
  initialUser = null,
  apiUrl,
}: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(initialUser);
  const [isLoading, setIsLoading] = useState<boolean>(!initialUser);

  const baseApiUrl =
    apiUrl ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3000";

  const refreshProfile = useCallback(async () => {
    try {
      const res = await fetch(`${baseApiUrl}/auth/me`, {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [baseApiUrl]);

  useEffect(() => {
    if (initialUser) return;

    let isMounted = true;
    async function loadInitialProfile() {
      try {
        const res = await fetch(`${baseApiUrl}/auth/me`, {
          credentials: "include",
        });

        if (!isMounted) return;

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch {
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadInitialProfile();

    return () => {
      isMounted = false;
    };
  }, [initialUser, baseApiUrl]);

  const loginWithGoogle = useCallback(
    (returnUrl: string = "/configuracoes/acessibilidade") => {
      const targetUrl = new URL("/auth/google", baseApiUrl);
      if (returnUrl) {
        targetUrl.searchParams.set("returnUrl", returnUrl);
      }
      window.location.assign(targetUrl.toString());
    },
    [baseApiUrl],
  );

  const signOut = useCallback(async () => {
    try {
      await fetch(`${baseApiUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Ignore network errors on logout
    } finally {
      setUser(null);
      router.push("/login");
    }
  }, [baseApiUrl, router]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      loginWithGoogle,
      signOut,
      refreshProfile,
    }),
    [user, isLoading, loginWithGoogle, signOut, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  return context || DEFAULT_AUTH_CONTEXT;
}