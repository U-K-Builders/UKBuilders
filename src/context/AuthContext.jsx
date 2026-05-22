import { createContext, useContext, useState, useEffect } from 'react';
import { apiGet, apiPost } from '../utils/api.js';

const DEFAULT = { isAdmin: false, loading: true, login: async () => false, logout: async () => {} };
const AuthContext = createContext(DEFAULT);

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet('/api/auth/verify')
      .then(({ isAdmin }) => setIsAdmin(Boolean(isAdmin)))
      .catch(() => setIsAdmin(false))
      .finally(() => setLoading(false));
  }, []);

  const login = async (username, password) => {
    try {
      await apiPost('/api/auth/login', { username, password });
      setIsAdmin(true);
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try { await apiPost('/api/auth/logout', {}); } catch {}
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
