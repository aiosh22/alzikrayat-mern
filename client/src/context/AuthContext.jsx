import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Client-side session: React state + localStorage
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('alzikrayatUser')) || null;
    } catch {
      return null;
    }
  });

  const login = (profile) => {
    setUser(profile);
    try { localStorage.setItem('alzikrayatUser', JSON.stringify(profile)); } catch { /* ignore */ }
  };

  const logout = () => {
    setUser(null);
    try { localStorage.removeItem('alzikrayatUser'); } catch { /* ignore */ }
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
