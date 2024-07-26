// Archivo: src/components/AprobarAdministrativo.jsx
import React, { useState, useEffect } from 'react';
import { useCanister } from '@connect2ic/react';
import { Principal } from '@dfinity/principal'; // Asegúrate de importar Principal
import '../styles/aprobarAdministrativoStyles.css';

function AprobarAdministrativo() {
  const [AII_backend] = useCanister('AII_backend');
  const [administrativosIngresantes, setAdministrativosIngresantes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdministrativosIngresantes = async () => {
    try {
      const result = await AII_backend.verAdministrativosIngresantes();
      setAdministrativosIngresantes(result);
    } catch (error) {
      console.error('Error al obtener los administrativos ingresantes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdministrativosIngresantes();
  }, [AII_backend]);

  const aprobarAdministrativo = async (principalId) => {
    try {
      const principal = Principal.fromText(principalId);
      const response = await AII_backend.aprobarRegistroDeAdministrativo(principal);
      console.log(response);
      // Actualiza la lista de administrativos ingresantes después de aprobar uno
      fetchAdministrativosIngresantes();
    } catch (error) {
      console.error('Error al aprobar el registro del administrativo:', error);
    }
  };

  return (
    <div className="aprobar-administrativo-container">
      <h2 className="table-heading">Aprobar Administrativos</h2>
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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {administrativosIngresantes.map(([principal, administrativo]) => (
              <tr key={principal.toString()}>
                <td>{principal.toString()}</td>
                <td>{administrativo.nombre}</td>
                <td>{administrativo.apellidoPaterno}</td>
                <td>{administrativo.apellidoMaterno}</td>
                <td>{administrativo.curp}</td>
                <td>{administrativo.emailPersonal}</td>
                <td>
                  <button onClick={() => aprobarAdministrativo(principal.toString())} className="approve-button">
                    Aprobar
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

export default AprobarAdministrativo;