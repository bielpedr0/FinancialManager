// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // Estado para armazenar os dados do usuário

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user'); // Busca os dados do usuário no localStorage
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser)); // Restaura o objeto do usuário
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        senha: password,
      });

      const data = response.data;

      if (data.token) {
        // Assumimos que o backend valida o email e a senha,
        // e você pode buscar os dados do usuário após o login.
        // Em um cenário real, o backend retornaria as informações do usuário aqui.
        // Exemplo simulado de dados do usuário:
        const userData = {
          name: 'Nome do Usuário',
          email: email,
          registeredSince: '2025-06-01',
          photo: null,
        };

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userData)); // Salva o objeto do usuário
        setToken(data.token);
        setUser(userData);
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
    localStorage.removeItem('user'); // Remove os dados do usuário
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
  };

  // Nova função para atualizar os dados do usuário
  const updateUser = (newUserData) => {
    setUser(prevUser => {
      const updatedUser = { ...prevUser, ...newUserData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const value = { token, isLoggedIn, loading, error, login, logout, user, updateUser };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};