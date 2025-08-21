// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Inicia como true para verificar o token
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
    setLoading(false); // Finaliza a verificação inicial
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        senha: password, // Usando "senha" para corresponder ao seu backend
      });

      const data = response.data;

      if (data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setIsLoggedIn(true);
      } else {
        throw new Error('Token não encontrado na resposta do servidor.');
      }
    } catch (e) {
      const errorMessage = e.response?.data?.message || e.message || 'Falha no login. Verifique suas credenciais.';
      setError(errorMessage);
      console.error("Login failed:", e);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsLoggedIn(false);
  };

  const value = { token, isLoggedIn, loading, error, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};