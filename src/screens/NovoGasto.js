// src/screens/NovoGasto.jsx
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import { useFinances } from '../context/FinancesContext';
import { useNavigate } from 'react-router-dom';

// Função utilitária para formatar o valor como monetário
const formatCurrency = (value) => {
  // Remove todos os caracteres que não sejam dígitos
  const cleanValue = value.replace(/\D/g, '');

  if (cleanValue.length === 0) {
    return ''; // Retorna vazio se não houver dígitos
  }

  // Converte para um número para evitar problemas com zeros à esquerda desnecessários
  const numValue = parseInt(cleanValue, 10);
  return (numValue / 100).toFixed(2).replace('.', ',');
};

const NovoGasto = () => {
  const { addTransaction, fetchCategories, categories, loadingCategories } = useFinances();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState({
    type: 'expense',
    description: '',
    value: '', // O valor agora será uma string formatada
    categoryId: '',
    date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    if (transaction.type) {
      fetchCategories(transaction.type);
    }
  }, [transaction.type, fetchCategories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'value') {
      // Formata o valor antes de atualizar o estado
      setTransaction(prev => ({ ...prev, [name]: formatCurrency(value) }));
    } else {
      setTransaction(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Primeiro, desformatamos o valor para poder fazer a validação e conversão
    const cleanValue = transaction.value.replace(',', '.');
    const numericValue = parseFloat(cleanValue);

    if (!transaction.description || !numericValue || !transaction.categoryId || !transaction.date) {
      alert('Por favor, preencha todos os campos!');
      return;
    }
    
    if (isNaN(numericValue) || numericValue <= 0) {
      alert('O valor deve ser um número positivo.');
      return;
    }

    // Convertendo o valor para número
    const transactionToSave = {
      ...transaction,
      value: numericValue,
      categoryId: parseInt(transaction.categoryId, 10),
    };

    try {
      await addTransaction(transactionToSave);
      alert('Transação adicionada com sucesso!');
      navigate('/'); // Navega para a página inicial após o sucesso
    } catch (error) {
      // O erro já é logado no context, aqui podemos apenas notificar o usuário.
      console.error("Erro ao adicionar transação:", error);
      alert(`Não foi possível adicionar a transação: ${error.message || 'Erro desconhecido.'}`);
    }
  };

  const styles = {
    pageContainer: {
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#2c3e50',
      fontWeight: '600',
    },
    formContainer: {
      padding: '2.5rem',
      width: '100%',
      maxWidth: '800px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 6px 25px rgba(0, 0, 0, 0.07)',
    },
    form: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem 2rem',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    fullWidth: {
      gridColumn: '1 / -1',
    },
    label: {
      fontWeight: '600',
      color: '#34495e',
      fontSize: '0.9rem',
    },
    select: {
      width: '100%',
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
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    },
    submitButton: {
      width: '100%',
      padding: '0.85rem',
      fontSize: '1.05rem',
      fontWeight: '600',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <h2 style={styles.title}>Adicionar Nova Transação</h2>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          
          {/* --- Linha 1: Tipo e Data --- */}
          <div style={styles.formGroup}>
            <label htmlFor="type" style={styles.label}>Tipo:</label>
            <select
              id="type"
              name="type"
              value={transaction.type}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="expense">Despesa</option>
              <option value="income">Receita</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="date" style={styles.label}>Data:</label>
            <Input
              id="date"
              name="date"
              type="date"
              value={transaction.date}
              onChange={handleChange}
            />
          </div>

          {/* --- Linha 2: Descrição (Largura total) --- */}
          <div style={{ ...styles.formGroup, ...styles.fullWidth }}>
            <label htmlFor="description" style={styles.label}>Descrição:</label>
            <Input
              id="description"
              name="description"
              value={transaction.description}
              onChange={handleChange}
              placeholder="Ex: Almoço, Salário"
              maxLength={50}
            />
          </div>

          {/* --- Linha 3: Valor e Categoria --- */}
          <div style={styles.formGroup}>
            <label htmlFor="value" style={styles.label}>Valor (R$):</label>
            <Input
              id="value"
              name="value"
              type="text" 
              value={transaction.value}
              onChange={handleChange}
              placeholder="Ex: 50,00"
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="categoryId" style={styles.label}>Categoria:</label>
            <select
              id="categoryId"
              name="categoryId"
              value={transaction.categoryId}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="" disabled>Selecione uma categoria</option>
              {loadingCategories ? (
                <option disabled>Carregando...</option>
              ) : (
                categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nome}</option>
                ))
              )}
            </select>
          </div>

          {/* --- Linha 4: Botão (Largura total) --- */}
          <div style={styles.fullWidth}>
            <Button type="submit" style={styles.submitButton}>
              Adicionar Transação
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovoGasto;