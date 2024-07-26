import React, { useState, useEffect } from 'react';
import { useCanister } from '@connect2ic/react';
import { Principal } from '@dfinity/principal'; // Cambiar la importación
import '../styles/verAlumnosIngresantesStyles.css'; // Asegúrate de tener este archivo en la carpeta styles

function VerAlumnosIngresantes() {
  const [AII_backend] = useCanister('AII_backend');
  const [alumnosIngresantes, setAlumnosIngresantes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlumnosIngresantes = async () => {
    try {
      const result = await AII_backend.verAlumnosIngresantes();
      setAlumnosIngresantes(result);
    } catch (error) {
      console.error('Error al obtener los alumnos ingresantes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumnosIngresantes();
  }, [AII_backend]);

  const aprobarAlumno = async (principalId) => {
    try {
      const principal = Principal.fromText(principalId);
      const response = await AII_backend.aprobarRegistroDeAlumno(principal);
      console.log(response);
      // Actualiza la lista de alumnos ingresantes después de aprobar uno
      fetchAlumnosIngresantes();
    } catch (error) {
      console.error('Error al aprobar el registro del alumno:', error);
    }
  };

  return (
    <div className="ver-alumnos-ingresantes-container">
      <h2 className="table-heading">Alumnos Ingresantes</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="alumnos-table">
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
            {alumnosIngresantes.map(([principal, alumno]) => (
              <tr key={principal.toString()}>
                <td>{principal.toString()}</td>
                <td>{alumno.nombre}</td>
                <td>{alumno.apellidoPaterno}</td>
                <td>{alumno.apellidoMaterno}</td>
                <td>{alumno.curp}</td>
                <td>{alumno.emailPersonal}</td>
                <td>
                  <button onClick={() => aprobarAlumno(principal.toString())} className="approve-button">
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

export default VerAlumnosIngresantes;
