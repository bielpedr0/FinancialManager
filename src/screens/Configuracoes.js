import React, { useState, useEffect } from "react";
import "./Configuracoes.css";

const Configuracoes = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [moeda, setMoeda] = useState("R$");
  const [nome, setNome] = useState("Gabriel");

  // Aplica ou remove o dark mode no body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const salvar = () => {
    alert("Configurações salvas!");
  };

  return (
    <div className="config-page"  style={{ padding: '1rem', maxWidth: '1600px', margin: '0 auto' }}>
           <h2>Configurações Gerais</h2> 
           
      {/* Perfil */}
      <section className="config-section" >
        <h2>Perfil</h2>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome"
          className="config-input"
        />
      </section>

      {/* Tema */}
      <section className="config-section">
        <h2>Tema</h2>
        <label className="config-switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span>Ativar modo escuro</span>
        </label>
      </section>

      {/* Moeda */}
      <section className="config-section">
        <h2>Moeda Padrão</h2>
        <input
          type="text"
          value={moeda}
          onChange={(e) => setMoeda(e.target.value)}
          placeholder="Ex: R$, US$, €"
          className="config-input"
        />
      </section>

      {/* Sobre */}
      <section className="config-section">
        <h2>Sobre o aplicativo</h2>
        <p>Versão: 1.0.0</p>
        <p>Desenvolvido por Gabriel Alves e Tiago Narita</p>
      </section>

      {/* Botão */}
      <button className="config-button" onClick={salvar}>
        Salvar Alterações
      </button>
    </div>
  );
};

export default Configuracoes;
