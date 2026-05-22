import { createContext, useContext, useState } from 'react';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'UKBuilders@2024';
const STORAGE_KEY = 'ukb_admin';

const DEFAULT = { isAdmin: false, login: () => false, logout: () => {} };
const AuthContext = createContext(DEFAULT);

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'true'; } catch { return false; }
  });

  const login = (username, password) => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      try { localStorage.setItem(STORAGE_KEY, 'true'); } catch {}
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
