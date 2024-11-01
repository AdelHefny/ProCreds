"use client";
import { User } from "firebase/auth";
import { createContext, useState } from "react";
import { useAuth } from "../hooks";
interface AuthContextType {
  user: User | null;
  loading: boolean;
}
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

function AuthProvidor({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default AuthProvidor;
