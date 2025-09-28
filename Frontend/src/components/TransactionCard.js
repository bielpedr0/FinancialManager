// src/components/TransactionCard.js
import React, { useState, useRef, useEffect } from 'react';
import './TransactionCard.css';
import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa';

const TransactionCard = ({ transaction, onEdit }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const { id, type, description, value, category, date } = transaction;
  const formattedValue = `R$ ${value.toFixed(2).replace('.', ',')}`;
  const formattedDate = new Date(date).toLocaleDateString('pt-BR');
  const isExpense = type === 'expense';

  const handleEdit = () => {
    onEdit(transaction);
    setShowMenu(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja excluir a transação "${description}"?`)) {
      alert(`Excluir transação ID: ${id}`);
    }
    setShowMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`transaction-card ${isExpense ? 'expense' : 'income'}`}>
      <div className="transaction-details">
        <span className="transaction-description">{description}</span>
        <span className="transaction-category">{category} - {formattedDate}</span>
      </div>
      <div className="transaction-value-menu">
        <span className="transaction-value">{isExpense ? `- ${formattedValue}` : `+ ${formattedValue}`}</span>
        <div className="transaction-menu" ref={menuRef}>
          <button onClick={() => setShowMenu(!showMenu)} className="menu-button">
            <FaEllipsisV />
          </button>
          {showMenu && (
            <div className="dropdown-menu">
              <button onClick={handleEdit}><FaEdit /> Editar</button>
              <button onClick={handleDelete}><FaTrash /> Excluir</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;