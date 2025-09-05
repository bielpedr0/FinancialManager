// src/pages/FaleConosco.jsx
import React, { useState } from "react";
import './FaleConosco.css'; // Importe o CSS aqui

const FaleConosco = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const enviarMensagem = () => {
    if (!nome.trim() || !email.trim() || !mensagem.trim()) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const destinatario = "Tiagobnarita@gmail.com";
    const assunto = encodeURIComponent("Mensagem do aplicativo");
    const corpo = encodeURIComponent(
      `Nome: ${nome}\nE-mail: ${email}\n\nMensagem:\n${mensagem}`
    );

    window.location.href = `mailto:${destinatario}?subject=${assunto}&body=${corpo}`;
  };

  return (
    <div className="contact-container">
      <h2>Fale Conosco</h2>
      <div className="contact-form-card">
        <section className="form-section">
          <label>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            className="form-input"
          />
        </section>

        <section className="form-section">
          <label>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seuemail@email.com"
            className="form-input"
          />
        </section>

        <section className="form-section">
          <label>Mensagem</label>
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Digite sua mensagem..."
            rows="5"
            className="form-textarea"
          />
        </section>

        <button className="submit-button" onClick={enviarMensagem}>
          Enviar Mensagem
        </button>
      </div>
    </div>
  );
};

export default FaleConosco;