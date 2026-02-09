import React from "react";
import type { User, AuthContextValue } from "./auth-types";
import { AuthContext } from "./auth-context-core";

const AUTH_STORAGE_KEY = "auth_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(() => {
    const stored = sessionStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const login = (u: User) => {
    sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  };

  const value: AuthContextValue = {
    user,
    isAuthed: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
