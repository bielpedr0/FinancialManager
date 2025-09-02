// src/components/Header.jsx
import React from 'react';
import './Header.css';
import logo from '../assets/logo192.png';

// ✅ O componente agora recebe a foto do usuário
const Header = ({ title, userPhoto, onProfileClick }) => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="header-title">{title}</h1>
      </div>
      
      <div className="profile-icon" onClick={onProfileClick}>
        <img 
          // ✅ Usa a foto da propriedade ou um placeholder
          src={userPhoto || "https://via.placeholder.com/40"}
          alt="Perfil" 
          className="profile-picture" 
        />
      </div>
    </header>
  );
};

export default Header;