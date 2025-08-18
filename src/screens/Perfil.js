// src/screens/Perfil.jsx
import React, { useState } from 'react';

const Perfil = () => {
  const [user, setUser] = useState({
    name: 'Nome do Usuário',
    email: 'usuario@email.com',
    plan: 'Básico (Gratuito)',
    registeredSince: '2025-06-01',
    photo: null, // foto de perfil
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoURL = URL.createObjectURL(file); // cria URL temporária da imageme
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '1600px', margin: '0 auto' }}>
      <h2>Meu Perfil</h2>
      <div
        style={{
          padding: '2rem',
          display: 'flex',
          gap: '2rem',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        {/* COLUNA ESQUERDA: FOTO DE PERFIL */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: '1',
            minWidth: '200px',
          }}
        >
          <div
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              backgroundColor: '#eee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              overflow: 'hidden',
            }}
          >
            {user.photo ? (
              <img
                src={user.photo}
                alt="Foto de perfil"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{ fontSize: '3rem', color: '#666' }}>👤</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ marginTop: '0.5rem' }}
          />
          <h3 style={{ margin: '1rem 0 0', color: '#333' }}>{user.name}</h3>
        </div>

        {/* COLUNA DIREITA: INFORMAÇÕES */}
        <div style={{ flex: '2', minWidth: '400px' }}>
          <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>
            Informações do Usuário
          </h2>
          <div style={{ marginBottom: '1rem' }}>
            <p>
              <strong>Nome:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Plano:</strong> {user.plan}
            </p>
            <p>
              <strong>Membro desde:</strong>{' '}
              {new Date(user.registeredSince).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
