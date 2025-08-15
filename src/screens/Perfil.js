// src/screens/Perfil.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import Input from '../components/Input'; // Importe o componente de Input
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const navigate = useNavigate();
  // Estado para controlar o modo de edição
  const [isEditing, setIsEditing] = useState(false);

  // Estado para armazenar os dados do usuário
  // Usamos useState para que os dados possam ser editados
  const [user, setUser] = useState({
    name: 'Nome do Usuário',
    email: 'usuario@email.com',
    plan: 'Básico (Gratuito)',
    registeredSince: '2025-06-01'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Aqui, no futuro, você faria a requisição PUT ou PATCH para o backend
    // No momento, apenas saímos do modo de edição.
    // alert('Perfil salvo com sucesso!');
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    alert('Você foi desconectado.');
    navigate('/login');
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '1600px', margin: '0 auto' }}>
      <h2>Meu Perfil</h2>
      <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#333' }}>Informações do Usuário</h2>

        {isEditing ? (
          // MODO DE EDIÇÃO
          <>
            <Input
              label="Nome:"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
            <Input
              label="Email:"
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
            />
            {/* Outros campos editáveis podem ser adicionados aqui */}
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
              <Button onClick={handleSave}>Salvar</Button>
              <Button onClick={() => setIsEditing(false)} variant="secondary">Cancelar</Button>
            </div>
          </>
        ) : (
          // MODO DE VISUALIZAÇÃO
          <>
            <div style={{ marginBottom: '1rem' }}>
              <p><strong>Nome:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Plano:</strong> {user.plan}</p>
              <p><strong>Membro desde:</strong> {new Date(user.registeredSince).toLocaleDateString()}</p>
            </div>
            <h3 style={{ marginTop: '2rem', marginBottom: '1.5rem', color: '#333' }}>Configurações</h3>
            <Button onClick={() => setIsEditing(true)} style={{ marginRight: '1rem' }}>
              Editar Perfil
            </Button>
            <Button onClick={() => alert('Funcionalidade de alterar senha (em desenvolvimento)')} variant="secondary">
              Alterar Senha
            </Button>
          </>
        )}

        <div style={{ marginTop: '3rem', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
          <Button onClick={handleLogout} variant="secondary" style={{ backgroundColor: '#dc3545', color: 'white' }}>
            Sair da Conta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;