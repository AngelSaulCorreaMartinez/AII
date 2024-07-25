import React, { useEffect } from 'react';
import { useUser } from '../UserContext';
import '../styles/inicioStyles.css';

function Inicio() {
  const { principal } = useUser();

  useEffect(() => {
    console.log('Principal in Inicio:', principal);
  }, [principal]);

  return (
    <div className="main-content">
      <h1>Bienvenidos a la Gestión de Alumnos</h1>
      {principal ? (
        <p className="principal-text">Principal: {principal}</p>
      ) : (
        <p className="principal-text">No se ha encontrado el principal</p>
      )}
    </div>
  );
}

export default Inicio;