import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext'; // Importa el contexto
import '../styles/commonStyles.css';

function Inicio() {
  const { principal } = useUser(); // Obtén el principal del contexto

  console.log('Principal in Inicio:', principal);

  return (
    <div className="main-content">
      <h1>Bienvenidos a la Gestión de Alumnos</h1>
      {principal ? (
        <p>Principal: {principal}</p>
      ) : (
        <p>No se ha encontrado el principal</p>
      )}
      <Link to="/consultar" className="nav-link"><button className="button">Consultar Alumnos</button></Link>
      <Link to="/cargar" className="nav-link"><button className="button">Cargar Alumnos</button></Link>
    </div>
  );
}

export default Inicio;
