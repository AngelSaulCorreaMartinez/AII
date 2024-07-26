import React, { useState, useEffect } from 'react';
import { useCanister } from '@connect2ic/react';
import '../styles/verAdministrativosStyles.css';

function VerAdministrativos() {
  const [AII_backend] = useCanister('AII_backend');
  const [administrativos, setAdministrativos] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="ver-administrativos-container">
      <h2 className="table-heading">Administrativos</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="administrativos-table">
          <thead>
            <tr>
              <th>Principal</th>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>CURP</th>
              <th>Email Personal</th>
              <th>Cedula Profesional</th>
              {/* Agrega más encabezados según los campos que quieras mostrar */}
            </tr>
          </thead>
          <tbody>
            {administrativos.map(administrativo => (
              <tr key={administrativo.principalID.toString()}>
                <td>{administrativo.principalID.toString()}</td>
                <td>{administrativo.nombre}</td>
                <td>{administrativo.apellidoPaterno}</td>
                <td>{administrativo.apellidoMaterno}</td>
                <td>{administrativo.curp}</td>
                <td>{administrativo.emailPersonal}</td>
                <td>{administrativo.cedulaProfesional}</td>
                {/* Agrega más celdas según los campos que quieras mostrar */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default VerAdministrativos;