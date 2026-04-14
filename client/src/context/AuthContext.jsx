import { createContext, useContext, useState, useEffect } from 'react';
import { mockApi } from '../services/mockData';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('walletwise_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const res = await mockApi.getMe();
          setUser(res.user);
        } catch {
          logout();
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await mockApi.login(email, password);
    setUser(res.user);
    setToken(res.token);
    localStorage.setItem('walletwise_token', res.token);
    localStorage.setItem('walletwise_user', JSON.stringify(res.user));
    return res;
  };

  const register = async (name, email, password) => {
    const res = await mockApi.register(name, email);
    setUser(res.user);
    setToken(res.token);
    localStorage.setItem('walletwise_token', res.token);
    localStorage.setItem('walletwise_user', JSON.stringify(res.user));
    return res;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('walletwise_token');
    localStorage.removeItem('walletwise_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
