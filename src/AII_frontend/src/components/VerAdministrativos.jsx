// Archivo: src/components/VerAdministrativos.jsx
import React, { useState, useEffect } from 'react';
import { useCanister } from '@connect2ic/react';
import { useNavigate } from 'react-router-dom';
import '../styles/verAdministrativosStyles.css';

function VerAdministrativos() {
  const [AII_backend] = useCanister('AII_backend');
  const [administrativos, setAdministrativos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdministrativos = async () => {
      try {
        const result = await AII_backend.verAdministrativos();
        setAdministrativos(result);
      } catch (error) {
        console.error('Error al obtener los administrativos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdministrativos();
  }, [AII_backend]);

  const handleVerDetalles = (principalId) => {
    navigate(`/detalles-administrativo/${principalId}`);
  };

  return (
    <div className="ver-administrativos-container">
      <h2 className="table-heading">Administrativos</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="administrativos-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>CURP</th>
              <th>Email Personal</th>
              <th>Cedula Profesional</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {administrativos.map(administrativo => (
              <tr key={administrativo.principalID.toString()}>
                <td>{administrativo.nombre}</td>
                <td>{administrativo.apellidoPaterno}</td>
                <td>{administrativo.apellidoMaterno}</td>
                <td>{administrativo.curp}</td>
                <td>{administrativo.emailPersonal}</td>
                <td>{administrativo.cedulaProfesional}</td>
                <td>
                  <button onClick={() => handleVerDetalles(administrativo.principalID.toString())} className="details-button">
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default VerAdministrativos;