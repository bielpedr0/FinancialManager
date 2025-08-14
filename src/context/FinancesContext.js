// src/context/FinancesContext.jsx
import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { transactionsMock } from '../services/mockData';

const FinancesContext = createContext();

export const FinancesProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTransactions(transactionsMock);
      setLoading(false);
    }, 500);
  }, []);

  const addTransaction = (newTransaction) => {
    setTransactions(prev => [
      ...prev,
      { ...newTransaction, id: Date.now().toString() }
    ]);
  };

  // Garanta que o valor inicial seja 0 para o reduce
  const totalIncome = useMemo(() => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + (parseFloat(t.value) || 0), 0); // Use parseFloat e garanta 0 se t.value for inválido
  }, [transactions]);

  const totalExpense = useMemo(() => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + (parseFloat(t.value) || 0), 0); // Use parseFloat e garanta 0 se t.value for inválido
  }, [transactions]);

  const currentBalance = useMemo(() => {
    return totalIncome - totalExpense;
  }, [totalIncome, totalExpense]);

  return (
    <FinancesContext.Provider
      value={{
        transactions,
        loading,
        error,
        addTransaction,
        totalIncome,
        totalExpense,
        currentBalance
      }}
    >
      {children}
    </FinancesContext.Provider>
  );
};

export const useFinances = () => useContext(FinancesContext);