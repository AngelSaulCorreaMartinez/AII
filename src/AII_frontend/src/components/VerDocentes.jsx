// Archivo: src/components/VerDocentes.jsx
import React, { useState, useEffect } from 'react';
import { useCanister } from '@connect2ic/react';
import { useNavigate } from 'react-router-dom';
import '../styles/verDocentesStyles.css';

function VerDocentes() {
  const [AII_backend] = useCanister('AII_backend');
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const result = await AII_backend.verDocentes();
        setDocentes(result);
      } catch (error) {
        console.error('Error al obtener los docentes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocentes();
  }, [AII_backend]);

  const handleVerDetalles = (principal) => {
    navigate(`/detalles-docente/${principal}`);
  };

  return (
    <div className="ver-docentes-container">
      <h2 className="table-heading">Docentes</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="docentes-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>CURP</th>
              <th>Email Personal</th>
              <th>Cedula Profesional</th>
              <th>Acciones</th>
              {/* Agrega más encabezados según los campos que quieras mostrar */}
            </tr>
          </thead>
          <tbody>
            {docentes.map(docente => (
              <tr key={docente.principalID.toString()}>
                <td>{docente.nombre}</td>
                <td>{docente.apellidoPaterno}</td>
                <td>{docente.apellidoMaterno}</td>
                <td>{docente.curp}</td>
                <td>{docente.emailPersonal}</td>
                <td>{docente.cedulaProfesional}</td>
                <td>
                  <button onClick={() => handleVerDetalles(docente.principalID.toString())} className="details-button">
                    Ver Detalles
                  </button>
                </td>
                {/* Agrega más celdas según los campos que quieras mostrar */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default VerDocentes;