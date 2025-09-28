// src/screens/Historico.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useFinances } from '../context/FinancesContext';
import TransactionCard from '../components/TransactionCard';
import Input from '../components/Input';
import EditTransactionModal from '../components/EditTransactionModal';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const Historico = () => {
  const { token, logout } = useAuth();
  const { allCategories, loadingCategories } = useFinances();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [filterType, setFilterType] = useState('all'); // 'all', 'income', 'expense'
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const fetchTransactions = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const api = axios.create({
        baseURL: API_URL,
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const params = new URLSearchParams({
        page: page,
        size: 10,
        sort: 'data,desc',
        month: month,
        year: year,
      });

      // Assumindo que o backend suporta estes parâmetros para filtro
      if (debouncedSearchTerm) {
        params.append('description', debouncedSearchTerm);
      }
      if (filterType !== 'all') {
        params.append('tipo', filterType.toUpperCase());
      }

      const response = await api.get(`/transactions?${params.toString()}`);
      const data = response.data;

      if (data && Array.isArray(data.content)) {
        const sanitizedTransactions = data.content.map(tx => {
          const dateArray = tx.data || [];
          const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4]);
          return {
            id: tx.id,
            description: tx.descricao,
            value: tx.valor,
            date: date.toISOString(),
            category: tx.categoria.nome,
            categoryId: tx.categoria.id,
            type: tx.categoria.tipo.toLowerCase(),
          };
        });
        setTransactions(sanitizedTransactions);
        setTotalPages(data.totalPages);
      } else {
        setTransactions([]);
        setTotalPages(0);
      }
    } catch (err) {
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        setError(new Error('Sua sessão expirou. Por favor, faça o login novamente.'));
        logout();
      } else {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearchTerm, filterType, token, logout, month, year]);

  // Efeito para aplicar o "debounce" no termo de busca
  useEffect(() => {
    const timer = setTimeout(() => {
      // Quando o termo de busca "estabiliza", nós o atualizamos
      // e resetamos a página para 0 para iniciar a busca do início.
      setPage(0);
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Aguarda 500ms após o usuário parar de digitar

    // Limpa o timeout se o usuário continuar digitando
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handlePreviousPage = () => setPage(prev => Math.max(prev - 1, 0));
  const handleNextPage = () => setPage(prev => Math.min(prev + 1, totalPages - 1));

  const handleOpenEditModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTransaction(null);
    // Opcional: Recarregar transações para refletir mudanças
    // fetchTransactions();
  };
  const months = [
    { value: 1, label: 'Janeiro' }, { value: 2, label: 'Fevereiro' },
    { value: 3, label: 'Março' }, { value: 4, label: 'Abril' },
    { value: 5, label: 'Maio' }, { value: 6, label: 'Junho' },
    { value: 7, label: 'Julho' }, { value: 8, label: 'Agosto' },
    { value: 9, label: 'Setembro' }, { value: 10, label: 'Outubro' },
    { value: 11, label: 'Novembro' }, { value: 12, label: 'Dezembro' },
  ];

  const styles = {
    pageContainer: {
      padding: '1rem',
      maxWidth: '1600px',
      margin: '0 auto',
      fontFamily: 'sans-serif',
    },
    title: {
      color: '#2c3e50',
      fontWeight: '600',
      marginBottom: '2rem',
    },
    filtersContainer: {
      marginBottom: '2rem',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1.5rem',
      alignItems: 'baseline',
      padding: '1.5rem',
      backgroundColor: '#fdfdfd',
      borderRadius: '8px',
      border: '1px solid #eee',
    },
    filterGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    searchInput: {
      flexGrow: 1,
      minWidth: '250px',
    },
    label: {
      fontWeight: '600',
      color: '#34495e',
      fontSize: '0.9rem',
    },
    select: {
      minWidth: '180px',
      padding: '0.75rem',
      border: '1px solid #bdc3c7',
      borderRadius: '8px',
      backgroundColor: '#fff',
      fontSize: '1rem',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 0.75rem center',
      backgroundSize: '16px 12px',
    },
    paginationContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '2.5rem',
      gap: '0.75rem',
    },
    paginationButton: {
      border: '1px solid #ddd',
      backgroundColor: '#fff',
      color: '#007bff',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      fontSize: '0.9rem',
      fontWeight: '600',
    },
    paginationButtonDisabled: {
      cursor: 'not-allowed',
      opacity: 0.6,
      color: '#6c757d',
      backgroundColor: '#f8f9fa',
    },
    pageInfo: {
      padding: '8px 16px',
      color: '#495057',
      fontWeight: '600',
      fontSize: '0.95rem',
    },
  };

  if (error) return <p style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Erro ao carregar dados: {error.message}</p>;

  return (
    <div style={styles.pageContainer}>
      <h2 style={styles.title}>Histórico de Transações</h2> 

      <div>
        {/* Filtros e Busca */}
        <div style={styles.filtersContainer}>
          <div style={{ ...styles.filterGroup, ...styles.searchInput }}>
            <label htmlFor="search" style={styles.label}>Buscar por descrição ou categoria:</label>
            <Input
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ex: Supermercado, Salário"
            />
          </div>
          <div style={styles.filterGroup}>
            <label htmlFor="month" style={styles.label}>Mês:</label>
            <select
              id="month"
              value={month}
              onChange={(e) => {
                setMonth(e.target.value);
                setPage(0);
              }}
              style={styles.select}
            >
              {months.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>
          <div style={styles.filterGroup}>
            <label htmlFor="year" style={styles.label}>Ano:</label>
            <Input
              id="year"
              type="number"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setPage(0);
              }}
              placeholder="Ano"
            />
          </div>
          <div style={styles.filterGroup}>
            <label htmlFor="filterType" style={styles.label}>Tipo:</label>
            <select
              id="filterType"
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                setPage(0); // Reseta a página imediatamente ao mudar o tipo
              }}
              style={styles.select}
            >
              <option value="all">Todas</option>
              <option value="income">Receitas</option>
              <option value="expense">Despesas</option>
            </select>
          </div>
        </div>

        {/* Lista de Transações */}
        {loading && <p style={{ textAlign: 'center' }}>Atualizando...</p>}
        {!loading && transactions.length > 0 ? (
          transactions.map(transaction => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              onEdit={handleOpenEditModal}
            />
          ))
        ) : (
          !loading && <p style={{ textAlign: 'center', marginTop: '2rem' }}>Nenhuma transação encontrada com os filtros aplicados.</p>
        )}

        {/* Paginação */}
        {totalPages > 1 && (
          <div style={styles.paginationContainer}>
            <button 
              onClick={handlePreviousPage} 
              disabled={page === 0 || loading}
              style={{ ...styles.paginationButton, ...(page === 0 || loading ? styles.paginationButtonDisabled : {}) }}
            >
              &laquo; Anterior
            </button>
            <span style={styles.pageInfo}>
              Página {page + 1} de {totalPages}
            </span>
            <button 
              onClick={handleNextPage} 
              disabled={page >= totalPages - 1 || loading}
              style={{ ...styles.paginationButton, ...(page >= totalPages - 1 || loading ? styles.paginationButtonDisabled : {}) }}
            >
              Próxima &raquo;
            </button>
          </div>
        )}
      </div>

      {isEditModalOpen && (
        <EditTransactionModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          transaction={selectedTransaction}
          allCategories={allCategories}
          loadingCategories={loadingCategories}
        />
      )}
    </div>
  );
};

export default Historico;