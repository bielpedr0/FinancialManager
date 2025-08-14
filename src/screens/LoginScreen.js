// src/screens/LoginScreen.jsx
import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true); // Alterna entre login e cadastro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    if (isLogin) {
      alert(`Tentativa de Login com Email: ${email}, Senha: ${password}`);
      // Lógica de autenticação com o backend virá aqui
    } else {
      alert(`Tentativa de Cadastro com Email: ${email}, Senha: ${password}`);
      // Lógica de cadastro com o backend virá aqui
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
          {isLogin ? 'Login' : 'Cadastro'}
        </h1>
        <form onSubmit={handleAuth}>
          <Input
            label="Email:"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />
          <Input
            label="Senha:"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
          <Button type="submit" style={{ width: '100%', marginTop: '1rem' }}>
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </Button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
          {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: '#007bff', cursor: 'pointer', marginLeft: '0.5rem' }}
          >
            {isLogin ? "Cadastre-se" : "Faça Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;