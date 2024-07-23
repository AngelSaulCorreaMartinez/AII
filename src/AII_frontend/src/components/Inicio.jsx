import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext'; // Importa el contexto
import '../styles/inicioStyles.css';

function Inicio() {
  const { principal } = useUser(); // Obtén el principal del contexto

  useEffect(() => {
    console.log('Principal in Inicio:', principal);
  }, [principal]); // Asegúrate de que solo se ejecute cuando `principal` cambie

  return (
    <div className="main-content">
      <h1>Bienvenidos a la Gestión de Alumnos</h1>
      {principal ? (
        <p className="principal-text">Principal: {principal}</p>
      ) : (
        <p className="principal-text">No se ha encontrado el principal</p>
      )}
      <div className="button-container">
        <Link to="/consultar" className="nav-link"><button className="button">Consultar Alumnos</button></Link>
        <Link to="/cargar" className="nav-link"><button className="button">Cargar Alumnos</button></Link>
      </div>
    </div>
  );
}

export default Inicio;