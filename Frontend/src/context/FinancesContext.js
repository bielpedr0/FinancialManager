// src/context/FinancesContext.jsx
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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [error, setError] = useState(null);

  const fetchFinancialData = useCallback(async () => {
    if (!isLoggedIn || !token) {
      setTransactions([]);
      setSummary({ totalIncome: 0, totalExpense: 0, balance: 0 });
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Cria uma instância do axios com o token de autorização
      const api = axios.create({
        baseURL: API_URL,
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const now = new Date();
      const month = now.getMonth() + 1; // JS months are 0-indexed
      const year = now.getFullYear();

      // Usa axios.all para buscar dados em paralelo
      const [transactionsResponse, summaryResponse] = await axios.all([
        api.get('/transactions'),
        api.get(`/dashboard/summary?month=${month}&year=${year}`)
      ]);

      const transactionsData = transactionsResponse.data;
      const summaryData = summaryResponse.data;

      if (transactionsData && Array.isArray(transactionsData.content)) {
        // Mapeia os dados da API para o formato que o frontend espera
        const sanitizedTransactions = transactionsData.content.map(tx => {
          const dateArray = tx.data || [];
          // O mês no construtor de Date do JS é 0-indexado (0-11), então subtraímos 1.
          const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4]);
          return {
            id: tx.id,
            description: tx.descricao,
            value: tx.valor,
            date: date.toISOString(), // Formato padrão que o JS entende bem
            category: tx.categoria.nome,
            type: tx.categoria.tipo.toLowerCase(), // 'INCOME' -> 'income'
          };
        });
        setTransactions(sanitizedTransactions);
      } else {
        throw new Error('Formato de dados de transações inesperado da API.');
      }

      if (summaryData) {
        setSummary({
          totalIncome: summaryData.totalIncome || 0,
          // O backend retorna despesa como valor negativo, mas para exibição é melhor positivo.
          totalExpense: Math.abs(summaryData.totalExpense) || 0,
          balance: summaryData.balance || 0,
        });
      } else {
        throw new Error('Formato de dados de resumo inesperado da API.');
      }
    } catch (e) {
      // Se o erro for 401 ou 403, o token é inválido ou expirou.
      if (e.response && (e.response.status === 401 || e.response.status === 403)) {
        setError('Sua sessão expirou. Por favor, faça o login novamente.');
        logout(); // Desloga o usuário
      } else {
        const errorMessage = e.response?.data?.message || e.message || 'Falha ao buscar dados financeiros.';
        setError(errorMessage);
      }
      console.error("Failed to fetch financial data:", e);
    } finally {
      setLoading(false);
    }
  }, [token, isLoggedIn, logout]);

  useEffect(() => {
    fetchFinancialData();
  }, [fetchFinancialData]);

  const fetchCategories = useCallback(async (type) => {
    if (!token || !type) {
      setCategories([]);
      return;
    }
    setLoadingCategories(true);
    try {
      const api = axios.create({
        baseURL: API_URL,
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const response = await api.get(`/categorias?type=${type.toUpperCase()}`);
      setCategories(response.data || []);
    } catch (e) {
      console.error("Failed to fetch categories:", e);
      setCategories([]); // Limpa categorias em caso de erro
    } finally {
      setLoadingCategories(false);
    }
  }, [token]);

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

      // Após adicionar com sucesso, busca os dados financeiros novamente para atualizar o painel
      await fetchFinancialData();
    } catch (e) {
      if (e.response && (e.response.status === 401 || e.response.status === 403)) {
        setError('Sua sessão expirou. Por favor, faça o login novamente.');
        logout(); // Desloga o usuário
      } else {
        const errorMessage = e.response?.data?.message || e.message || 'Falha ao adicionar transação.';
        setError(errorMessage);
      }
      console.error("Failed to add transaction:", e);
      throw e; // Re-lança o erro para que o componente que chamou possa tratá-lo
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
        categories,
        loadingCategories,
        fetchCategories,
      }}
    >
      {children}
    </FinancesContext.Provider>
  );
};

export const useFinances = () => useContext(FinancesContext);