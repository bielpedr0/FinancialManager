import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Import useAuth

const FinancesContext = createContext();

// The base URL for the API, read from environment variables
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const FinancesProvider = ({ children }) => {
  const { token, isLoggedIn, logout } = useAuth(); // Get token, login status, and logout function
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, balance: 0 });
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = useCallback(async () => {
    if (!isLoggedIn || !token) {
      setTransactions([]);
      setSummary({ totalIncome: 0, totalExpense: 0, balance: 0 });
      setAllCategories([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const api = axios.create({
      baseURL: API_URL,
      headers: { 'Authorization': `Bearer ${token}` },
    });

    try {
      const now = new Date();
      const month = now.getMonth() + 1; // JS months are 0-indexed
      const year = now.getFullYear();

      // Use Promise.allSettled() to fetch data in parallel and handle individual errors
      const [transactionsResult, summaryResult, categoriesResult] = await Promise.allSettled([
        api.get('/transactions'),
        api.get(`/dashboard/summary?month=${month}&year=${year}`),
        api.get('/categorias'),
      ]);
      
      // Processar Transações
      if (transactionsResult.status === 'fulfilled' && transactionsResult.value.data.content) {
        const sanitizedTransactions = transactionsResult.value.data.content.map(tx => {
          const dateArray = tx.data || [];
          const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4]);
          return {
            id: tx.id,
            description: tx.descricao,
            value: tx.valor,
            date: date.toISOString(),
            category: tx.categoria.nome,
            type: tx.categoria.tipo.toLowerCase(),
          };
        });
        setTransactions(sanitizedTransactions);
      } else {
        console.error("Failed to fetch transactions:", transactionsResult.reason);
        setTransactions([]);
      }

      // Processar Resumo
      if (summaryResult.status === 'fulfilled' && summaryResult.value.data) {
        setSummary({
          totalIncome: summaryResult.value.data.totalIncome || 0,
          totalExpense: Math.abs(summaryResult.value.data.totalExpense) || 0,
          balance: summaryResult.value.data.balance || 0,
        });
      } else {
        console.error("Failed to fetch summary:", summaryResult.reason);
        setSummary({ totalIncome: 0, totalExpense: 0, balance: 0 });
      }

      // Processar Categorias
      if (categoriesResult.status === 'fulfilled' && categoriesResult.value.data) {
        setAllCategories(categoriesResult.value.data);
      } else {
        console.error("Failed to fetch categories:", categoriesResult.reason);
        setAllCategories([]);
      }
      
    } catch (e) {
      const errorMessage = e.response?.data?.message || e.message || 'Falha ao buscar dados financeiros.';
      setError(errorMessage);
      console.error("An unexpected error occurred:", e);
    } finally {
      setLoading(false);
    }
  }, [token, isLoggedIn, logout]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const addTransaction = async (newTransaction) => {
    if (!token) {
      setError("Token de autenticação não encontrado.");
      throw new Error("Token de autenticação não encontrado.");
    }
    try {
      const api = axios.create({
        baseURL: API_URL,
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const transactionForApi = {
        descricao: newTransaction.description,
        valor: newTransaction.value,
        data: new Date(newTransaction.date).toISOString(),
        categoriaId: newTransaction.categoryId,
      };
      await api.post('/transactions', transactionForApi);

      await fetchAllData();
    } catch (e) {
      if (e.response && (e.response.status === 401 || e.response.status === 403)) {
        setError('Sua sessão expirou. Por favor, faça o login novamente.');
        logout();
      } else {
        const errorMessage = e.response?.data?.message || e.message || 'Falha ao adicionar transação.';
        setError(errorMessage);
      }
      console.error("Failed to add transaction:", e);
      throw e;
    }
  };

  return (
    <FinancesContext.Provider
      value={{
        transactions,
        loading,
        error,
        addTransaction,
        totalIncome: summary.totalIncome,
        totalExpense: summary.totalExpense,
        currentBalance: summary.balance,
        allCategories,
      }}
    >
      {children}
    </FinancesContext.Provider>
  );
};

export const useFinances = () => useContext(FinancesContext);