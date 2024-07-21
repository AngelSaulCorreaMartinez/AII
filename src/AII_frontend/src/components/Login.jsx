import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConnect } from '@connect2ic/react';
import { ConnectButton, ConnectDialog } from '@connect2ic/react';
import { defaultProviders } from '@connect2ic/core/providers';
import { createClient } from '@connect2ic/core';
import { AII_backend } from 'declarations/AII_backend'; // Importa tu backend
import '@connect2ic/core/style.css';
import '../styles/loginStyles.css';
import logo from '/logo-completo-utma.png'; // Asegúrate de que la ruta es correcta

const client = createClient({
  providers: defaultProviders,
  globalProviderConfig: {
    dev: import.meta.env.DEV,
  },
});

function Login() {
  const { isConnected, principal } = useConnect();
  const navigate = useNavigate();

  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'nick') setNick(value);
    if (name === 'email') setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!principal) {
        setErrorMessage('Error: Principal is undefined');
        return;
    }

    if (!nick || !email) {
        setErrorMessage('Error: Todos los campos son obligatorios');
        return;
    }

    try {
        const response = await AII_backend.registrarse(nick, email); // Llama a registrarse con solo dos argumentos
        console.log('Respuesta del servidor:', response);
        navigate('/inicio'); // Redirigir a /inicio solo si el registro es exitoso
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        setErrorMessage('Error al registrar el usuario');
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="login-logo" />
      <h1>Iniciar Sesión</h1>
      <ConnectButton />
      <ConnectDialog />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="nick"
          value={nick}
          onChange={handleInputChange}
          placeholder="Nickname"
          required
          className="form-input"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleInputChange}
          placeholder="Email"
          required
          className="form-input"
        />
        <button type="submit" className="form-button">Registrar Usuario</button>
      </form>
    </div>
  );
}

export default Login;
