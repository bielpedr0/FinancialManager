// src/pages/DashboardPage.jsx
import './Dashboard.css';
import React, { useState } from 'react';
import Header from '../components/Header';
import Resumo from './Resumo';
import NovoGasto from './NovoGasto';
import Historico from './Historico';
import Perfil from './Perfil';
import Sobre from './Sobre';
import FaleConosco from './FaleConosco';

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
      case 'sobre':
        return <Sobre onContactClick={() => setActiveTab('fale conosco')} />;
      case 'fale conosco':
        return <FaleConosco />;
      default:
        return <Resumo />;
    }
  };

  const tabs = [
    { key: 'resumo', label: 'Painel' },
    { key: 'novo', label: 'Nova Transação' },
    { key: 'historico', label: 'Histórico' },
    { key: 'sobre', label: 'Sobre' }, 
    { key: 'fale conosco', label: 'Fale Conosco' }, 
  ];

  return (
    <div>
      <Header 
        title="Gestor de Finanças" 
        onProfileClick={() => setActiveTab('perfil')} 
        onLogoClick={() => setActiveTab('resumo')} 
      />

      <nav className="nav">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`tabButton ${activeTab === tab.key ? 'tabButtonActive' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="content">{renderContent()}</div>

      <footer>
        <p>
          &copy; 2025 Desenvolvido por Gabriel Pedro Alves e Tiago Narita. Todos os direitos
          reservados.
        </p>
      </footer>
    </div>
  );
};

export default DashboardPage;