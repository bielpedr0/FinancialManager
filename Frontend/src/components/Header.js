import React from 'react';

const Header = ({ title }) => {
  return (
    <header style={{
      backgroundColor: '#294296ff',
      padding: '1rem 2rem',
      borderBottom: '1px solid #ddd',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h2 style={{ margin: 0, color: '#fff' }}>{title}</h2>
      {/* Futuramente, aqui pode ter um botão de perfil ou logout */}
    </header>
  );
};

export default Header;