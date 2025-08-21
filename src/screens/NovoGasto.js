// src/screens/NovoGasto.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import { useFinances } from '../context/FinancesContext';
import { categoriesMock } from '../services/mockData';
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

  // Formata o número para ter duas casas decimais, depois substitui o ponto pela vírgula
  // Multiplicamos por 100 para transformar em centavos e dividimos por 100 para o valor final
  // Ex: 1 -> 1.00 / 100 = 0.01
  // Ex: 11 -> 11.00 / 100 = 0.11
  // Ex: 111 -> 111.00 / 100 = 1.11
  // Ex: 1111 -> 1111.00 / 100 = 11.11
  return (numValue / 100).toFixed(2).replace('.', ',');
};

const NovoGasto = () => {
  const { addTransaction } = useFinances();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState({
    type: 'expense',
    description: '',
    value: '', // O valor agora será uma string formatada
    category: '',
    date: new Date().toISOString().slice(0, 10),
  });

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

    if (!transaction.description || !numericValue || !transaction.category || !transaction.date) {
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
      value: numericValue
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

  return (
    <div style={{ padding: '1rem', maxWidth: '1600px', margin: '0 auto' }}>
      <h2>Adicionar Transação</h2>
      <div style={{ padding: '2rem', maxWidth: '1600px', margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="type" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Tipo:</label>
            <select
              id="type"
              name="type"
              value={transaction.type}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            >
              <option value="expense">Despesa</option>
              <option value="income">Receita</option>
            </select>
          </div>

          <Input
            label="Descrição:"
            id="description"
            name="description"
            value={transaction.description}
            onChange={handleChange}
            placeholder="Ex: Almoço, Salário"
            maxLength={50}
          />

          <Input
            label="Valor (R$):"
            id="value"
            name="value"
            // O tipo agora é 'text' para podermos formatar a string
            type="text" 
            value={transaction.value}
            onChange={handleChange}
            placeholder="Ex: 50,00"
          />

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="category" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Categoria:</label>
            <select
              id="category"
              name="category"
              value={transaction.category}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Selecione uma categoria</option>
              {categoriesMock.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <Input
            label="Data:"
            id="date"
            name="date"
            type="date"
            value={transaction.date}
            onChange={handleChange}
          />

          <Button type="submit">Adicionar Transação</Button>
        </form>
      </div>
    </div>
  );
};

export default NovoGasto;