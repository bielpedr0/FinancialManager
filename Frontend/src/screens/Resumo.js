import React, { useMemo, useState } from "react";
import TransactionCard from "../components/TransactionCard";
import ExpensePieChart from "../components/ExpensePieChart";
import BalanceLineChart from "../components/BalanceLineChart";
import MonthlyBarChart from "../components/MonthlyBarChart";
import { useFinances } from "../context/FinancesContext";
import "./Resumo.css";

const Resumo = () => {
  const {
    transactions,
    loading,
    error,
    totalIncome,
    totalExpense,
    currentBalance,
  } = useFinances();
  const [filter, setFilter] = useState("all");
  const [chartType, setChartType] = useState("balance"); // Novo estado para o seletor de gráfico

  const getFilteredTransactions = (period) => {
    const today = new Date();
    let startDate;
    switch (period) {
      case "last7days":
        startDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 7
        );
        break;
      case "last30days":
        startDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 30
        );
        break;
      case "lastYear":
        startDate = new Date(
          today.getFullYear() - 1,
          today.getMonth(),
          today.getDate()
        );
        break;
      default:
        return transactions;
    }
    return transactions.filter((t) => new Date(t.date) >= startDate);
  };

  const filteredTransactions = useMemo(
    () => getFilteredTransactions(filter),
    [transactions, filter]
  );

  const pieChartData = useMemo(() => {
    const expensesByCategory = filteredTransactions
      .filter((t) => t.type === "expense")
      .reduce((acc, { category, value }) => {
        acc[category] = (acc[category] || 0) + value;
        return acc;
      }, {});
    return Object.keys(expensesByCategory).map((category) => ({
      name: category,
      value: expensesByCategory[category],
    }));
  }, [filteredTransactions]);

  const balanceChartData = useMemo(() => {
    // Cálculo do saldo como antes
    let balance =
      currentBalance -
      filteredTransactions.reduce(
        (acc, t) => acc + (t.type === "expense" ? t.value : -t.value),
        0
      );
    const sortedTransactions = [...filteredTransactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    return sortedTransactions.map((t) => {
      balance += t.type === "income" ? t.value : -t.value;
      return {
        date: new Date(t.date).toLocaleDateString("pt-BR"),
        balance,
      };
    });
  }, [filteredTransactions, currentBalance]);

    const monthlyData = useMemo(() => {
    const monthlySummary = filteredTransactions.reduce((acc, t) => {
      const date = new Date(t.date);
      const monthYear = `${date.toLocaleString("default", {
        month: "short",
      })}/${date.getFullYear()}`;
      if (!acc[monthYear]) {
        acc[monthYear] = { income: 0, expense: 0 };
      }
      if (t.type === "income") {
        acc[monthYear].income += t.value;
      } else {
        acc[monthYear].expense += t.value;
      }
      return acc;
    }, {});
    // Converte o objeto em um array para o Recharts
    const sortedMonths = Object.keys(monthlySummary).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    return sortedMonths.map((month) => ({
      month,
      income: monthlySummary[month].income,
      expense: monthlySummary[month].expense,
    }));
  }, [filteredTransactions]);

  if (loading)
    return <p className="loading">Carregando resumo financeiro...</p>;
  if (error)
    return <p className="error">Erro ao carregar dados: {error.message}</p>;

  const latestTransactions = filteredTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);



  return (
    <div style={{ padding: "1rem", maxWidth: "1600px", margin: "0 auto" }}>
      <h2>Resumo Financeiro</h2>
      {/* Cards de resumo (receitas, despesas, saldo) */}
      <div className="summary-container">
        <div className="summary-card summary-income">
          <h3 className="summary-title">Receitas Totais</h3>
          <p className="summary-value income">
            R$ {totalIncome.toFixed(2).replace(".", ",")}
          </p>
        </div>
        <div className="summary-card summary-expense">
          <h3 className="summary-title">Despesas Totais</h3>
          <p className="summary-value expense">
            R$ {totalExpense.toFixed(2).replace(".", ",")}
          </p>
        </div>
        <div className="summary-card summary-balance">
          <h3 className="summary-title">Saldo Atual</h3>
          <p
            className={`summary-value ${
              currentBalance >= 0 ? "positive" : "negative"
            }`}
          >
            R$ {currentBalance.toFixed(2).replace(".", ",")}
          </p>
        </div>
      </div>

      <hr />

      {/* Seção de transações */}
      <h2>Últimas Transações</h2>
      {latestTransactions.length > 0 ? (
        latestTransactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))
      ) : (
        <p>Nenhuma transação recente encontrada.</p>
      )}

      <hr />

      {/* Seletor de período */}
      {/* Novo contêiner para o filtro e os gráficos */}
      <div className="chart-section-container">
        <div className="filter-panel">
          <h2>Filtro de Período</h2>
          <div className="filter-buttons vertical-buttons">
            {[
              { id: "all", label: "Todos" },
              { id: "last7days", label: "Últimos 7 dias" },
              { id: "last30days", label: "Últimos 30 dias" },
              { id: "lastYear", label: "Último ano" },
            ].map((btn) => (
              <button
                key={btn.id}
                className={`filter-button ${filter === btn.id ? "active" : ""}`}
                onClick={() => setFilter(btn.id)}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="chart-content">
          <h2>Gráficos</h2>
          <div className="chart-selector">
            <button
              className={`filter-button ${
                chartType === "balance" ? "active" : ""
              }`}
              onClick={() => setChartType("balance")}
            >
              Evolução do Saldo
            </button>
            <button
              className={`filter-button ${
                chartType === "expenses" ? "active" : ""
              }`}
              onClick={() => setChartType("expenses")}
            >
              Despesas por Categoria
            </button>
            <button
              className={`filter-button ${
                chartType === "monthly" ? "active" : ""
              }`}
              onClick={() => setChartType("monthly")}
            >
              Receita x Despesa
            </button>
          </div>
          <div className="charts-container">
            {chartType === "balance" && (
              <div className="chart-card">
                <BalanceLineChart data={balanceChartData} />
              </div>
            )}
            {chartType === "expenses" && (
              <div className="chart-card">
                <ExpensePieChart data={pieChartData} />
              </div>
            )}
            {chartType === "monthly" && (
              <div className="chart-card">
                <MonthlyBarChart data={monthlyData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resumo;
