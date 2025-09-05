import React, { useState, useMemo } from 'react';

import Input from '../components/Input';
import Button from '../components/Button';
import { useFinances } from '../context/FinancesContext';
import { useNavigate } from 'react-router-dom';
import './NovoGasto.css'; // Importação do arquivo CSS

// Função utilitária para formatar o valor como monetário
const formatCurrency = (value) => {
  // Remove todos os caracteres que não sejam dígitos
  const cleanValue = value.replace(/\D/g, '');
  if (cleanValue.length === 0) {
    return '';
  }
  const numValue = parseInt(cleanValue, 10);
  return (numValue / 100).toFixed(2).replace('.', ',');
};

const NovoGasto = () => {
  const { addTransaction, allCategories, loadingCategories } = useFinances();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState({
    type: 'expense',
    description: '',
    value: '',
    categoryId: '',
    date: new Date().toISOString().slice(0, 10),
  });

  // Filtra as categorias com base no tipo de transação selecionado
  const filteredCategories = useMemo(() => {
    if (!allCategories) return [];
    const typeToFilter = transaction.type.toUpperCase();
    return allCategories.filter(cat => cat.tipo === typeToFilter);
  }, [allCategories, transaction.type]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'value') {
      setTransaction(prev => ({ ...prev, [name]: formatCurrency(value) }));
    } else {
      setTransaction(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

    const transactionToSave = {
      ...transaction,
      value: numericValue,
      categoryId: parseInt(transaction.categoryId, 10),
    };

    try {
      await addTransaction(transactionToSave);
      alert('Transação adicionada com sucesso!');
      navigate('/');
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
      alert(`Não foi possível adicionar a transação: ${error.message || 'Erro desconhecido.'}`);
    }
  };

  return (
    <div className="page-container">
      <h2 className="title">Adicionar Nova Transação</h2>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          {/* Linha 1: Tipo e Data */}
          <div className="form-group">
            <label htmlFor="type" className="label">Tipo:</label>
            <select
              id="type"
              name="type"
              value={transaction.type}
              onChange={handleChange}
              className="select"
            >
              <option value="expense">Despesa</option>
              <option value="income">Receita</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date" className="label">Data:</label>
            <Input
              id="date"
              name="date"
              type="date"
              value={transaction.date}
              onChange={handleChange}
            />
          </div>

          {/* Linha 2: Descrição (Largura total) */}
          <div className="form-group full-width">
            <label htmlFor="description" className="label">Descrição:</label>
            <Input
              id="description"
              name="description"
              value={transaction.description}
              onChange={handleChange}
              placeholder="Ex: Almoço, Salário"
              maxLength={50}
            />
          </div>

          {/* Linha 3: Valor e Categoria */}
          <div className="form-group">
            <label htmlFor="value" className="label">Valor (R$):</label>
            <Input
              id="value"
              name="value"
              type="text"
              value={transaction.value}
              onChange={handleChange}
              placeholder="Ex: 50,00"
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryId" className="label">Categoria:</label>
            <select
              id="categoryId"
              name="categoryId"
              value={transaction.categoryId}
              onChange={handleChange}
              className="select"
            >
              <option value="" disabled>Selecione uma categoria</option>
              {loadingCategories ? (
                <option disabled>Carregando...</option>
              ) : (
                filteredCategories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nome}</option>
                ))
              )}
            </select>
          </div>

          {/* Linha 4: Botão (Largura total) */}
          <div className="full-width">
            <Button type="submit" className="submit-button">
              Adicionar Transação
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NovoGasto;