import './Dashboard.css';
import React, { useState } from 'react';
import Header from '../components/Header';
import Resumo from './Resumo';
import NovoGasto from './NovoGasto';
import Historico from './Historico';
import Perfil from './Perfil';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('resumo');

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

  return (
    <div>
      <Header title="Gestor de Finanças" />

      <nav className="nav">
        <button
          className={`tabButton ${activeTab === 'resumo' ? 'tabButtonActive' : ''}`}
          onClick={() => setActiveTab('resumo')}
        >
          Painel
        </button>
        <button
          className={`tabButton ${activeTab === 'novo' ? 'tabButtonActive' : ''}`}
          onClick={() => setActiveTab('novo')}
        >
          Novo Gasto
        </button>
        <button
          className={`tabButton ${activeTab === 'historico' ? 'tabButtonActive' : ''}`}
          onClick={() => setActiveTab('historico')}
        >
          Histórico
        </button>
        <button
          className={`tabButton ${activeTab === 'perfil' ? 'tabButtonActive' : ''}`}
          onClick={() => setActiveTab('perfil')}
        >
          Perfil
        </button>
      </nav>

      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardPage;
