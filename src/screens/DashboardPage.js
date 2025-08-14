// src/screens/DashboardPage.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Resumo from './Resumo';
import NovoGasto from './NovoGasto';
import Historico from './Historico';
import Perfil from './Perfil';

const DashboardPage = () => {
  // Estado para controlar qual aba está ativa
  const [activeTab, setActiveTab] = useState('resumo'); // 'resumo', 'novo', 'historico', 'perfil'

  const renderContent = () => {
    switch (activeTab) {
      case 'resumo':
        return <Resumo />;
      case 'novo':
        return <NovoGasto />;
      case 'historico':
        return <Historico />;
      case 'perfil':
        return <Perfil />;
      default:
        return <Resumo />;
    }
  };

  const tabButtonStyle = (tabName) => ({
    padding: '0.8rem 1.5rem',
    border: 'none',
    backgroundColor: activeTab === tabName ? '#007bff' : '#f0f0f0',
    color: activeTab === tabName ? 'white' : '#333',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    borderRadius: '5px 5px 0 0',
    marginRight: '5px',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  });

  return (
    <div>
      <Header title="Gestor de Finanças" />

      {/* Navegação por abas */}
      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#e9ecef',
        paddingTop: '10px',
        borderBottom: '1px solid #dee2e6'
      }}>
        <button style={tabButtonStyle('resumo')} onClick={() => setActiveTab('resumo')}>
          Painel
        </button>
        <button style={tabButtonStyle('novo')} onClick={() => setActiveTab('novo')}>
          Novo Gasto
        </button>
        <button style={tabButtonStyle('historico')} onClick={() => setActiveTab('historico')}>
          Histórico
        </button>
        <button style={tabButtonStyle('perfil')} onClick={() => setActiveTab('perfil')}>
          Perfil
        </button>
      </nav>

      {/* Conteúdo da aba selecionada */}
    <div style={{ padding: '0 2rem 2rem 2rem', width: '100%' }}>
     {renderContent()}
    </div>

    </div>
  );
};

export default DashboardPage;