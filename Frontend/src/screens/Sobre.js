import React from 'react';
import './Sobre.css';

const Sobre = ({ onContactClick }) => {
  return (
    <div className="page-container">
      <h2 className="title">Sobre o Gestor de Finanças</h2>
      
      <div className="section">
        <p className="text">
          O Gestor de Finanças é uma aplicação projetada para simplificar a sua vida financeira. Nossa missão é oferecer uma ferramenta intuitiva e poderosa que ajude você a registrar seus gastos, acompanhar receitas e ter uma visão clara da sua saúde financeira.
        </p>
      </div>

      <div className="section">
        <h3 className="sub-title">Nossa Missão</h3>
        <p className="text">
          Empoderar as pessoas a terem um controle financeiro completo, eliminando a complexidade e tornando o planejamento financeiro acessível a todos.
        </p>
      </div>

      <div className="section">
        <h3 className="sub-title">Funcionalidades Principais</h3>
        <ul>
          <li>Registro fácil de despesas e receitas.</li>
          <li>Visualização do histórico de transações.</li>
          <li>Análise do seu perfil financeiro.</li>
          <li>Controle de categorias de gastos.</li>
        </ul>
      </div>

      <div className="section">
        <p className="text">
          Agradecemos por usar nossa aplicação. Se tiver alguma dúvida ou sugestão, entre em contato através da nossa aba <a href="#" className="link" onClick={onContactClick}>Fale conosco</a>.
        </p>
      </div>
    </div>
  );
};

export default Sobre;