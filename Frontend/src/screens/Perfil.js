import './Perfil.css';
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaPencilAlt, FaCheck } from 'react-icons/fa';

const Perfil = () => {
  const { logout, user, updateUser } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState('');

  // UseEffect para sincronizar o nome do estado local com o do contexto
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const fileInputRef = useRef(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoURL = URL.createObjectURL(file);
      // Atualiza o objeto do usuário com a nova foto
      updateUser({ photo: photoURL });
    }
  };

  const handleNameSave = () => {
    if (name.trim() !== '') {
      updateUser({ name }); // Chama a função do contexto para atualizar o nome
      setIsEditingName(false);
    }
  };

  // Exibe um carregamento ou mensagem se o usuário não estiver disponível
  if (!user) {
    return <div className="page-container">Carregando perfil...</div>;
  }

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
          <div className="info-group">
            <span className="info-label">Nome:</span>
            {isEditingName ? (
              <div className="edit-input-container">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="info-input"
                  onKeyDown={(e) => { if (e.key === 'Enter') handleNameSave(); }}
                />
                <button onClick={handleNameSave} className="edit-button">
                  <FaCheck />
                </button>
              </div>
            ) : (
              <div className="display-name-container">
                <span className="info-value">{user.name}</span>
                <button onClick={() => setIsEditingName(true)} className="edit-button">
                  <FaPencilAlt />
                </button>
              </div>
            )}
          </div>
          <div className="info-group">
            <span className="info-label">Email:</span>
            <span className="info-value">{user.email}</span>
          </div>
          <div className="info-group">
            <span className="info-label">Membro desde:</span>
            <span className="info-value">{new Date(user.registeredSince).toLocaleDateString()}</span>
          </div>
          <button onClick={logout} className="logout-button logout-button-hover">
            Sair da Conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;