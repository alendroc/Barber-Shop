import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(JSON.parse(sessionStorage.getItem('token')) || null);

  // Cuando token cambie, actualizar sessionStorage
  useEffect(() => {
    if (token) {
      console.log("Token2", token)
      sessionStorage.setItem('token', JSON.stringify(token));
    } else {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    }
  }, [token]);

  // Funciones para login y logout
  const login = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);