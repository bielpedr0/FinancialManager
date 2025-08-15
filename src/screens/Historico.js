// src/screens/Historico.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import TransactionCard from '../components/TransactionCard';
import Input from '../components/Input';
import { useFinances } from '../context/FinancesContext';

const Historico = () => {
  const { transactions, loading, error } = useFinances();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'income', 'expense'

  if (loading) return <p style={{ textAlign: 'center', padding: '2rem' }}>Carregando histórico...</p>;
  if (error) return <p style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Erro ao carregar dados: {error.message}</p>;

  // Filtragem e ordenação das transações
  const filteredAndSortedTransactions = transactions
    .filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || transaction.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Mais recentes primeiro

  return (
    <div style={{ padding: '1rem', maxWidth: '1600px', margin: '0 auto' }}>
      <h2>Histórico de Transações </h2> 

      <div >
        {/* Filtros e Busca */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
          <div style={{ flexGrow: 1 }}>
            <Input
              label="Buscar por descrição ou categoria:"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ex: Supermercado, Salário"
            />
          </div>
          <div>
            <label htmlFor="filterType" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Tipo:</label>
            <select
              id="filterType"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{
                padding: '0.75rem',
                border: '1px solid #ccc',
                borderRadius: '5px',
                minWidth: '150px'
              }}
            >
              <option value="all">Todas</option>
              <option value="income">Receitas</option>
              <option value="expense">Despesas</option>
            </select>
          </div>
        </div>

        {/* Lista de Transações */}
        {filteredAndSortedTransactions.length > 0 ? (
          filteredAndSortedTransactions.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <p style={{ textAlign: 'center', marginTop: '2rem' }}>Nenhuma transação encontrada com os filtros aplicados.</p>
        )}
      </div>
    </div>
  );
};

export default Historico;