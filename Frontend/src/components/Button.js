import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', ...props }) => {
  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.2s ease',
  };

  const primaryStyle = {
    backgroundColor: '#00796b',
    color: 'white',
  };

  const secondaryStyle = {
    backgroundColor: '#6c757d',
    color: 'white',
  };

  const currentStyle = variant === 'primary' ? primaryStyle : secondaryStyle;

  return (
    <button
      type={type}
      onClick={onClick}
      style={{ ...buttonStyle, ...currentStyle }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;