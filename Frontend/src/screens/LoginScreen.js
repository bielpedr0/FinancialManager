// src/screens/LoginScreen.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { Navigate } from 'react-router-dom';

const LoginScreen = () => {
  const { login, isLoggedIn, loading, error } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true); // Alterna entre login e cadastro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleAuth = async (e) => {
    e.preventDefault();
    if (isLoginView) {
      await login(email, password);
    } else {
      // Aqui iria a lógica de cadastro, que pode ser adicionada no AuthContext
      alert(`Funcionalidade de cadastro ainda não implementada. Email: ${email}`);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
    }}>
      <div style={{
        padding: '2rem',
        width: '400px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {isLoginView ? 'Login' : 'Cadastro'}
        </h1>
        <form onSubmit={handleAuth}>
          <Input
            label="Email:"
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
          <Input
            label="Senha:"
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
          {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
          <Button type="submit" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Carregando...' : (isLoginView ? 'Entrar' : 'Cadastrar')}
          </Button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          {isLoginView ? "Não tem uma conta?" : "Já tem uma conta?"}
          <span
            onClick={() => setIsLoginView(!isLoginView)}
            style={{ color: '#007bff', cursor: 'pointer', marginLeft: '0.5rem', fontWeight: 'bold' }}
          >
            {isLoginView ? "Cadastre-se" : "Faça Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;

