import React from 'react';

const Sobre = () => {
  const styles = {
    pageContainer: {
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'sans-serif',
      backgroundColor: '#fdfdfd',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    },
    title: {
      color: '#2c3e50',
      fontWeight: '600',
      marginBottom: '1rem',
      textAlign: 'center',
    },
    section: {
      marginBottom: '1.5rem',
      lineHeight: '1.6',
      color: '#34495e',
    },
    subTitle: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '0.5rem',
      color: '#2c3e50',
    },
    text: {
      fontSize: '1rem',
    },
    link: {
      color: '#007bff',
      textDecoration: 'underline',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.pageContainer}>
      <h2 style={styles.title}>Sobre o Gestor de Finanças</h2>
      
      <div style={styles.section}>
        <p style={styles.text}>
          O Gestor de Finanças é uma aplicação projetada para simplificar a sua vida financeira. Nossa missão é oferecer uma ferramenta intuitiva e poderosa que ajude você a registrar seus gastos, acompanhar receitas e ter uma visão clara da sua saúde financeira.
        </p>
      </div>

      <div style={styles.section}>
        <h3 style={styles.subTitle}>Nossa Missão</h3>
        <p style={styles.text}>
          Empoderar as pessoas a terem um controle financeiro completo, eliminando a complexidade e tornando o planejamento financeiro acessível a todos.
        </p>
      </div>

      <div style={styles.section}>
        <h3 style={styles.subTitle}>Funcionalidades Principais</h3>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '0.5rem' }}>Registro fácil de despesas e receitas.</li>
          <li style={{ marginBottom: '0.5rem' }}>Visualização do histórico de transações.</li>
          <li style={{ marginBottom: '0.5rem' }}>Análise do seu perfil financeiro.</li>
          <li>Controle de categorias de gastos.</li>
        </ul>
      </div>

      <div style={styles.section}>
        <p style={styles.text}>
          Agradecemos por usar nossa aplicação. Se tiver alguma dúvida ou sugestão, entre em contato através da sua aba de Configurações.
        </p>
      </div>

    </div>
  );
};

export default Sobre;