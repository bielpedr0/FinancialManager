// src/components/Header.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Header.css';
import logo from '../assets/logo192.png';

// Adicione onLogoClick nas props
const Header = ({ title, onProfileClick, onLogoClick }) => {
  const { user } = useAuth();
  
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '👤';

  return (
    <header className="header">
      <div className="logo-container" onClick={onLogoClick}> {/* Adicione o onClick */}
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="header-title">{title}</h1>
      </div>
      
      <div className="profile-icon" onClick={onProfileClick}>
        <div className="profile-initials">
          {userInitial}
        </div>
      </div>
    </header>
  );
};

export default Header;