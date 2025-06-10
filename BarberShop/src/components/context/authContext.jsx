import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('token') || null));
  const [autenticado, setAutenticado] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      sessionStorage.setItem('token', JSON.stringify(token));
      setAutenticado(true);
    } else {
      sessionStorage.removeItem('token');
      setAutenticado(false);

    }
  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, autenticado }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);