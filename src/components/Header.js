import React from 'react';

const Header = ({ title }) => {
  return (
    <header style={{
      backgroundColor: '#f0f0f0',
      padding: '1rem 2rem',
      borderBottom: '1px solid #ddd',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h2 style={{ margin: 0, color: '#333' }}>{title}</h2>
      {/* Futuramente, aqui pode ter um botão de perfil ou logout */}
    </header>
  );
};

export default Header;