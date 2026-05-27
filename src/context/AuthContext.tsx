import React, { createContext, useState, useContext, ReactNode } from "react";
import type { User } from "../data/mockdata";
import { mockUsers, mockLoginResponse } from "../data/mockdata";

// Define what shape our AuthContext will have
// This is like a contract - any component using this context will have access to these
interface AuthContextType {
  user: User | null; // The current logged-in user (or null if not logged in)
  login: (email: string, password: string) => Promise<boolean>; // Function to log in
  logout: () => void; // Function to log out
  isAuthenticated: boolean; // True if user is logged in
}

// Create the context with a default value of null
// We'll provide the actual value in the AuthProvider component
const AuthContext = createContext<AuthContextType | null>(null);

// This is a special component that wraps our app and provides the auth state
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // useState remembers values between re-renders
  // We try to get saved user from localStorage (browser storage)
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Login function - called when user submits login form
  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, you'd call an API here
    // For mock data, we check if email exists in our mockUsers

    // Find user with matching email (case-insensitive)
    const foundUser = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );

    if (foundUser && password === "password123") {
      // Mock password check
      // Save user to state
      setUser(foundUser);
      // Save to localStorage so user stays logged in after page refresh
      localStorage.setItem("user", JSON.stringify(foundUser));
      localStorage.setItem("access_token", mockLoginResponse.access);
      return true; // Login successful
    }
    return false; // Login failed
  };

  // Logout function - clears user data
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
  };

  // The value object that will be available to all child components
  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user, // !! converts to boolean (true if user exists)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
// This makes it easy to access auth data in any component
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
