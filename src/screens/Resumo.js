import React, { useMemo } from 'react';
import TransactionCard from '../components/TransactionCard';
import ExpensePieChart from '../components/ExpensePieChart'; // Importe o componente de gráfico
import { useFinances } from '../context/FinancesContext';

const Resumo = () => {
  const { transactions, loading, error, totalIncome, totalExpense, currentBalance } = useFinances();

     // CÁLCULO DOS DADOS PARA O GRÁFICO
  const pieChartData = useMemo(() => {
    // Agrupa as despesas por categoria
    const expensesByCategory = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, transaction) => {
        const { category, value } = transaction;
        acc[category] = (acc[category] || 0) + value;
        return acc;
      }, {});
    
    // Converte o objeto para um array de objetos no formato { name: 'Categoria', value: 100 }
    return Object.keys(expensesByCategory).map(category => ({
      name: category,
      value: expensesByCategory[category],
    }));
  }, [transactions]);

  if (loading) return <p style={{ textAlign: 'center', padding: '2rem' }}>Carregando resumo financeiro...</p>;
  if (error) return <p style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Erro ao carregar dados: {error.message}</p>;

  const latestTransactions = transactions.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <div>
      <h1 style={{ marginTop: '2rem' }}>Resumo Financeiro</h1> 
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ padding: '1.5rem', borderRadius: '8px', backgroundColor: '#e6ffe6', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: 0, color: '#333' }}>Receitas Totais</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'green' }}>R$ {totalIncome.toFixed(2).replace('.', ',')}</p>
          </div>
          <div style={{ padding: '1.5rem', borderRadius: '8px', backgroundColor: '#ffe6e6', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: 0, color: '#333' }}>Despesas Totais</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'red' }}>R$ {totalExpense.toFixed(2).replace('.', ',')}</p>
          </div>
          <div style={{ padding: '1.5rem', borderRadius: '8px', backgroundColor: '#e6f7ff', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: 0, color: '#333' }}>Saldo Atual</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: currentBalance >= 0 ? 'darkgreen' : 'darkred' }}>R$ {currentBalance.toFixed(2).replace('.', ',')}</p>
          </div>
        </div>

        <h2>Últimas Transações</h2>
        {latestTransactions.length > 0 ? (
          latestTransactions.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <p>Nenhuma transação recente encontrada.</p>
        )}

      <h2>Distribuição de Despesas por Categoria</h2>
      <div style={{ padding: '1.5rem', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <ExpensePieChart data={pieChartData} />
      </div>
    </div>
  );
};

export default Resumo;