import React from 'react';
import { Link } from 'react-router-dom';
import { useConnect } from '@connect2ic/react';
import '../styles/navBarStyles.css';
import logo from '../../public/logo-completo-utma.png'; // Asegúrate de que la ruta es correcta

function NavBar() {
  const { isConnected, disconnect, connect } = useConnect();

  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <img src={logo} alt="Logo" className="nav-logo" />
        <Link to="/" className="nav-link">Inicio</Link>
      </div>
      <div className="auth-button">
        {isConnected ? (
          <button onClick={disconnect}>Cerrar Sesión</button>
        ) : (
          <button onClick={() => connect()}>Iniciar Sesión</button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
