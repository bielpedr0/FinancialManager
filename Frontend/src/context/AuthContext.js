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

      if (data && data.token) {
        // Usa os dados do usuário retornados pelo backend
        const userData = {
          id: data.id, // Supondo que o ID também venha na resposta
          nome: data.nome,
          email: email,
          // Se a data de cadastro vier, use-a, senão, use a data atual como fallback.
          registeredSince: data.dataCadastro || new Date().toISOString(),
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
      const errorMessage = e.response?.data?.message || e.response?.data || e.message || 'Falha no login. Verifique suas credenciais.';
      setError(errorMessage);
      console.error("Login failed:", e);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      // O DTO espera: nome, email, senha
      await axios.post(`${API_URL}/auth/register`, {
        nome: name,
        email: email,
        senha: password,
      });
      // Se o registro for bem-sucedido, não fazemos login automático,
      // apenas informamos o sucesso para o componente.
    } catch (e) {
      const errorMessage = e.response?.data || e.message || 'Falha no cadastro. Tente novamente.';
      setError(errorMessage);
      throw e; // Re-lança o erro para o componente poder tratá-lo
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

  const value = { token, isLoggedIn, loading, error, login, logout, user, updateUser, register };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};