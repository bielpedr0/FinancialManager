import React from 'react';

const Input = ({ label, id, type = 'text', value, onChange, ...props }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && <label htmlFor={id} style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>{label}</label>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '0.75rem',
          border: '1px solid #ccc',
          borderRadius: '5px',
          boxSizing: 'border-box' // Para que o padding não aumente a largura
        }}
        {...props}
      />
    </div>
  );
};

export default Input;