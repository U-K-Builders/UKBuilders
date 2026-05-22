import { createContext, useContext, useState } from 'react';
import CryptoJS from 'crypto-js';

const ADMIN_USER = 'admin';
const ADMIN_HASH = '5616841d9219aca97a7625c96e5114d8f9ed963b378f6aac39a38c2fc5536476';
const STORAGE_KEY = 'ukb_admin';

const DEFAULT = { isAdmin: false, login: () => false, logout: () => {} };
const AuthContext = createContext(DEFAULT);

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'true'; } catch { return false; }
  });

  const login = (username, password) => {
    const hash = CryptoJS.SHA256(password).toString();
    if (username === ADMIN_USER && hash === ADMIN_HASH) {
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
