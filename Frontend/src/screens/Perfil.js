import './Perfil.css';
import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const Perfil = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState({
    name: 'Nome do Usuário',
    email: 'usuario@exemplo.com',
    plan: 'Básico (Gratuito)',
    registeredSince: '2025-06-01',
    photo: null, // foto de perfil
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      setUser((prev) => ({ ...prev, photo: photoURL }));
    }
  };

  const fileInputRef = useRef(null);

  return (
    <div className="page-container">
      <h2 className="title">Meu Perfil</h2>
      <div className="profile-card">
        <div className="photo-section">
          <div className="photo-circle">
            {user.photo ? (
              <img src={user.photo} alt="Foto de perfil" className="photo" />
            ) : (
              <span className="placeholder-icon">👤</span>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ display: 'none' }}
          />
          <button onClick={() => fileInputRef.current.click()} className="upload-button">
            Alterar Foto
          </button>
        </div>

        <div className="info-section">
          <div className="info-group"><span className="info-label">Nome:</span><span className="info-value">{user.name}</span></div>
          <div className="info-group"><span className="info-label">Email:</span><span className="info-value">{user.email}</span></div>
          <div className="info-group"><span className="info-label">Plano:</span><span className="info-value">{user.plan}</span></div>
          <div className="info-group"><span className="info-label">Membro desde:</span><span className="info-value">{new Date(user.registeredSince).toLocaleDateString()}</span></div>
          <button onClick={logout} className="logout-button logout-button-hover">
            Sair da Conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
