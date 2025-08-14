// src/components/TransactionCard.jsx
import React from 'react';

const TransactionCard = ({ transaction }) => {
  const isExpense = transaction.type === 'expense';
  const valueColor = isExpense ? 'red' : 'green';

  return (
    <div style={{
      border: '1px solid #eee',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '0.8rem',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <h4 style={{ margin: 0, color: '#333' }}>{transaction.description}</h4>
        <p style={{ margin: '0.3rem 0', fontSize: '0.9rem', color: '#666' }}>
          {transaction.category} - {new Date(transaction.date).toLocaleDateString()}
        </p>
      </div>
      <span style={{ fontWeight: 'bold', color: valueColor }}>
        {isExpense ? '-' : '+'} R$ {transaction.value.toFixed(2).replace('.', ',')}
      </span>
    </div>
  );
};

export default TransactionCard;