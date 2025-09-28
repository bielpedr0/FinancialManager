// src/components/EditTransactionModal.js
import React, { useState, useEffect, useMemo } from 'react';
import Modal from 'react-modal';
import Input from './Input';
import Button from './Button';
import './EditTransactionModal.css';

Modal.setAppElement('#root');

const EditTransactionModal = ({ isOpen, onClose, transaction, onSave, allCategories, loadingCategories }) => {
  const [formData, setFormData] = useState(transaction);
  
  useEffect(() => {
    // Atualiza o formulário se a transação mudar
    setFormData(transaction);
  }, [transaction]);

  // Filtra as categorias com base no tipo de transação (deve ser declarado antes do return)
  const filteredCategories = useMemo(() => {
    // Se não houver dados do formulário (inicialização), retorna array vazio
    if (!allCategories || !formData) return [];
    const typeToFilter = formData.type.toUpperCase();
    return allCategories.filter(cat => cat.tipo === typeToFilter);
  }, [allCategories, formData]);

  if (!transaction) {
    return null;
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Converte o categoryId para número ao mudar
    const finalValue = name === 'categoryId' ? parseInt(value, 10) : value;
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    // A data do input é 'YYYY-MM-DD', precisamos converter para o formato ISOString que o resto da app usa
    const date = new Date(value);
    // Ajusta o fuso horário para não ter problemas de um dia a menos
    const userTimezoneOffset = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
    setFormData(prev => ({ ...prev, date: adjustedDate.toISOString() }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert(`Salvando: ${formData.description}`);
    // onSave(formData); // Futura implementação
    onClose();
  };

  // Formata a data para o input type="date" (YYYY-MM-DD)
  const getFormattedDate = (isoDate) => {
    if (!isoDate) return '';
    return new Date(isoDate).toISOString().split('T')[0];
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Editar Transação</h2>
      <form onSubmit={handleSave} className="modal-form">
        <div className="form-group">
          <label htmlFor="description">Descrição</label>
          <Input
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="value">Valor</label>
          <Input
            id="value"
            name="value"
            type="number"
            value={formData.value}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Data</label>
          <Input
            id="date"
            name="date"
            type="date"
            value={getFormattedDate(formData.date)}
            onChange={handleDateChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoryId">Categoria</label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="modal-select"
            required
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

        <div className="modal-actions">
          <div className="main-actions">
            <Button onClick={onClose} type="button" className="cancel-btn">
              Cancelar
            </Button>
            <Button type="submit">
              Salvar
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditTransactionModal;