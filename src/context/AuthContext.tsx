import React, { createContext, useState, useContext, ReactNode } from "react";
import type { User } from "../data/mockdata";
import { mockUsers, mockLoginResponse } from "../data/mockdata";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );

    if (foundUser && password === "password123") {
      setUser(foundUser);

      localStorage.setItem("user", JSON.stringify(foundUser));
      localStorage.setItem("access_token", mockLoginResponse.access);
      return true; // Login successful
    }
    return false; // Login failed
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
