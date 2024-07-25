import React, { useState, useEffect } from 'react';
import { useCanister } from '@connect2ic/react';
import '../styles/verAlumnosInscritosStyles.css';

function VerAlumnosInscritos() {
  const [AII_backend] = useCanister('AII_backend');
  const [alumnosInscritos, setAlumnosInscritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumnosInscritos = async () => {
      try {
        const result = await AII_backend.verAlumnos();
        setAlumnosInscritos(result);
      } catch (error) {
        console.error('Error al obtener los alumnos inscritos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumnosInscritos();
  }, [AII_backend]);

  return (
    <div className="ver-alumnos-inscritos-container">
      <h2 className="table-heading">Alumnos Inscritos</h2>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="alumnos-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Matrícula</th>
              <th>Email Institucional</th>
              <th>Carrera</th>
              <th>Semestre</th>
            </tr>
          </thead>
          <tbody>
            {alumnosInscritos.map(alumno => (
              <tr key={alumno.principal.toString()}>
                <td>{alumno.nombre}</td>
                <td>{alumno.apellidoPaterno}</td>
                <td>{alumno.apellidoMaterno}</td>
                <td>{alumno.matricula}</td>
                <td>{alumno.emailInstitucional}</td>
                <td>{alumno.carrera}</td>
                <td>{alumno.semestre.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default VerAlumnosInscritos;