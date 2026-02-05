import React from "react";
import type { User, AuthContextValue } from "./auth-types";
import { AuthContext } from "./auth-context-core";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);

  const login = (u: User) => setUser(u);
  const logout = () => setUser(null);

  const value: AuthContextValue = {
    user,
    isAuthed: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
