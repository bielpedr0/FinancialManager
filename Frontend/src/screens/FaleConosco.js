import React, { useState } from "react";


const FaleConosco = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const enviarMensagem = () => {
    if (!nome.trim() || !email.trim() || !mensagem.trim()) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const destinatario = "Tiagobnarita@gmail.com"; // seu e-mail de contato
    const assunto = encodeURIComponent("Mensagem do aplicativo");
    const corpo = encodeURIComponent(
      `Nome: ${nome}\nE-mail: ${email}\n\nMensagem:\n${mensagem}`
    );

    // abre o cliente de e-mail do usuário
    window.location.href = `mailto:${destinatario}?subject=${assunto}&body=${corpo}`;
  };

  return (
    <div className="config-container">
      <h2>Fale Conosco</h2>
      <div className="config-page">
        
        <section className="config-section">
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            className="config-input"
          />
        </section>

        <section className="config-section">
          <label>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@email.com"
            className="config-input"
          />
        </section>

        <section className="config-section">
          <label>Mensagem</label>
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Digite sua mensagem..."
            rows="5"
            className="config-input"
          />
        </section>

        <button className="config-button" onClick={enviarMensagem}>
          Enviar Mensagem
        </button>
      </div>
    </div>
  );
};

export default FaleConosco;
