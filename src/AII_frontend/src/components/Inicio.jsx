import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/inicioStyles.css';
import LoginButton from './LoginButton';
import UserInfo from './UserInfo';

function Inicio() {
  return (
    <div className="main-content">
      <div className="auth-section">
        <LoginButton />
      </div>
      <UserInfo />
      <img src="./PLANTEC.png" alt="Logo" className="logo" />
      <div className="welcome-message">Bienvenidos a la Gestión de Alumnos</div>
      <Link to="/consultar" className="nav-link"><button className="button">Consultar Alumnos</button></Link>
      <Link to="/cargar" className="nav-link"><button className="button">Cargar Alumnos</button></Link>
    </div>
  );
}

export default Inicio;
