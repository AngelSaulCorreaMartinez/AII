import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConnect } from '@connect2ic/react';
import { ConnectButton, ConnectDialog } from '@connect2ic/react';
import { defaultProviders } from '@connect2ic/core/providers';
import { createClient } from '@connect2ic/core';
import '@connect2ic/core/style.css';
import '../styles/loginStyles.css';
import logo from '../../public/logo-completo-utma.png'; // Asegúrate de que la ruta es correcta

const client = createClient({
  providers: defaultProviders,
  globalProviderConfig: {
    dev: import.meta.env.DEV,
  },
});

function Login() {
  const { isConnected } = useConnect();
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected) {
      navigate('/inicio');
    }
  }, [isConnected, navigate]);

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="login-logo" />
      <h1>Iniciar Sesión</h1>
      <ConnectButton />
      <ConnectDialog />
    </div>
  );
}

export default Login;
