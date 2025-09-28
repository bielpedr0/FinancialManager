import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import { Navigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importa os ícones de olho

const LoginScreen = () => {
  const { login, register, isLoggedIn, loading, error } = useAuth();
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleAuth = async (e) => {
    e.preventDefault();
    if (isLoginView) {
      await login(email, password);
    } else {
      try {
        await register(name, email, password);
        alert('Cadastro realizado com sucesso! Por favor, faça o login.');
        setIsLoginView(true); // Muda para a tela de login
        setPassword(''); // Limpa a senha
      } catch (err) {
        // O erro já é tratado e exibido pelo AuthContext
      }
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
          {!isLoginView && (
            <Input
              label="Nome:"
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Digite seu nome completo"
              required
            />
          )}
          <Input
            label="Email:"
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
            <div style={{ position: 'relative' }}>
    <Input
      label="Senha:"
      id="password"
      type={showPassword ? 'text' : 'password'}
      value={password}
      onChange={e => setPassword(e.target.value)}
      placeholder="Digite sua senha"
      required
    />
    <span
      onClick={() => setShowPassword(!showPassword)}
      style={{
        position: 'absolute',
        right: '10px',
        top: '55%',
        //transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: '#888',
        zIndex: 10,
      }}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>
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
