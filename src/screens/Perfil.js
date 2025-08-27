// src/screens/Perfil.jsx
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
      const photoURL = URL.createObjectURL(file); // cria URL temporária da imagem
      setUser((prev) => ({ ...prev, photo: photoURL }));
    }
  };
  
  const fileInputRef = useRef(null);

  const styles = {
    pageContainer: {
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      textAlign: 'center',
      marginBottom: '2rem',
      color: '#2c3e50',
      fontWeight: '600',
    },
    profileCard: {
      padding: '2.5rem',
      width: '100%',
      maxWidth: '900px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 6px 25px rgba(0, 0, 0, 0.07)',
      display: 'flex',
      flexDirection: 'row',
      gap: '3rem',
      flexWrap: 'wrap',
    },
    photoSection: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      flex: 1,
      minWidth: '200px',
    },
    photoCircle: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      backgroundColor: '#e9ecef',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      border: '4px solid #fff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    },
    photo: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    uploadButton: {
      padding: '0.5rem 1rem',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '0.9rem',
    },
    infoSection: {
      flex: 2,
      minWidth: '300px',
    },
    infoGroup: {
      marginBottom: '1.2rem',
    },
    infoLabel: {
      fontWeight: 'bold',
      color: '#34495e',
      display: 'block',
      marginBottom: '0.25rem',
    },
    infoValue: {
      color: '#555',
      fontSize: '1.05rem',
    },
    logoutButton: {
      marginTop: '2.5rem',
      width: '100%',
      padding: '0.85rem',
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      textAlign: 'center',
      transition: 'background-color 0.2s ease',
    }
  };

  return (
    <div style={styles.pageContainer}>
      <h2 style={styles.title}>Meu Perfil</h2>
      <div style={styles.profileCard}>
        <div style={styles.photoSection}>
          <div style={styles.photoCircle}>
            {user.photo ? (
              <img src={user.photo} alt="Foto de perfil" style={styles.photo} />
            ) : (
              <span style={{ fontSize: '3rem', color: '#666' }}>👤</span>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ display: 'none' }}
          />
          <button onClick={() => fileInputRef.current.click()} style={styles.uploadButton}>
            Alterar Foto
          </button>
        </div>

        <div style={styles.infoSection}>
          <div style={styles.infoGroup}><span style={styles.infoLabel}>Nome:</span><span style={styles.infoValue}>{user.name}</span></div>
          <div style={styles.infoGroup}><span style={styles.infoLabel}>Email:</span><span style={styles.infoValue}>{user.email}</span></div>
          <div style={styles.infoGroup}><span style={styles.infoLabel}>Plano:</span><span style={styles.infoValue}>{user.plan}</span></div>
          <div style={styles.infoGroup}><span style={styles.infoLabel}>Membro desde:</span><span style={styles.infoValue}>{new Date(user.registeredSince).toLocaleDateString()}</span></div>
          <button onClick={logout} style={styles.logoutButton} className="logout-button-hover">
            Sair da Conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
