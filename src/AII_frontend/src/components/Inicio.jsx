import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/commonStyles.css';

function Inicio() {
  return (
    <div className="main-content">
      <h1>Bienvenidos a la Gestión de Alumnos</h1>
      <Link to="/consultar" className="nav-link"><button className="button">Consultar Alumnos</button></Link>
      <Link to="/cargar" className="nav-link"><button className="button">Cargar Alumnos</button></Link>
    </div>
  );
}

export default Inicio;
