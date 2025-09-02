import './Dashboard.css';
import React, { useState } from 'react';
import Header from '../components/Header';
import Resumo from './Resumo';
import NovoGasto from './NovoGasto';
import Historico from './Historico';
import Perfil from './Perfil';
import Configuracoes from './Configuracoes'; // ✅ nova aba

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
      case 'config':
        return <Configuracoes />; // ✅ nova opção
      default:
        return <Resumo />;
    }
  };

  const tabs = [
    { key: 'resumo', label: 'Painel' },
    { key: 'novo', label: 'Novo Gasto' },
    { key: 'historico', label: 'Histórico' },
    { key: 'perfil', label: 'Perfil' },
    { key: 'config', label: 'Configurações' }, // ✅ nova aba
  ];

  return (
    <div>
      <Header title="Gestor de Finanças" onProfileClick={() => setActiveTab('perfil')} />

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

      <footer >
        <p>
          &copy; 2025 Desenvolvido por Gabriel Pedro Alves e Tiago Narita. Todos os direitos
          reservados.
        </p>
      </footer>
    </div>
  );
};

export default DashboardPage;
