import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("devi_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = (userData) => {
    const profile = {
      name: userData.name,
      phone: userData.phone,
      id: userData.phone,
      joinedAt: new Date().toISOString(),
    };
    localStorage.setItem("devi_user", JSON.stringify(profile));
    setUser(profile);
  };

  const logout = () => {
    localStorage.removeItem("devi_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
