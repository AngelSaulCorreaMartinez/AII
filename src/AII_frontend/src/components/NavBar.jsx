import React from 'react';
import { Link } from 'react-router-dom';
import { useConnect } from '@connect2ic/react';
import '../styles/navBarStyles.css';

function NavBar() {
  const { isConnected, disconnect, connect } = useConnect();

  return (
    <nav className="nav-bar">
      <div className="nav-links">
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
