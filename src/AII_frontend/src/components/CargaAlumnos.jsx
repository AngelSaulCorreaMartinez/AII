import React, { useState } from 'react';
import { AII_backend } from 'declarations/AII_backend';
import '../styles/cargaAlumnos.css';

function CargaAlumnos() {
  const [alumno, setAlumno] = useState({
    id: '',
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    carrera: '',
    fecha_nacimiento: '',
    semestre: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAlumno((prev) => ({
      ...prev,
      [name]: name === 'semestre' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const alumnoToSend = {
      ...alumno,
      id: parseInt(alumno.id, 10),
      semestre: parseInt(alumno.semestre, 10),
    };

    if (!Number.isNaN(alumnoToSend.semestre) && !Number.isNaN(alumnoToSend.id)) {
      try {
        const response = await AII_backend.sendAlumnoData(alumnoToSend);
        console.log('Respuesta del servidor:', response);
      } catch (error) {
        console.error('Error al enviar los datos del alumno:', error);
      }
    } else {
      console.error('El ID y el semestre deben ser números válidos.');
    }
  };

  return (
    <div className="cargar-alumnos-container">
      <h2>Cargar Nuevo Alumno</h2>
      <form onSubmit={handleSubmit} className="cargar-alumnos-form">
        <input
          type="number"
          name="id"
          value={alumno.id}
          onChange={handleInputChange}
          placeholder="ID"
          required
          className="form-input"
        />
        <input
          name="nombre"
          value={alumno.nombre}
          onChange={handleInputChange}
          placeholder="Nombre"
          required
          className="form-input"
        />
        <input
          name="apellido_paterno"
          value={alumno.apellido_paterno}
          onChange={handleInputChange}
          placeholder="Apellido Paterno"
          required
          className="form-input"
        />
        <input
          name="apellido_materno"
          value={alumno.apellido_materno}
          onChange={handleInputChange}
          placeholder="Apellido Materno"
          required
          className="form-input"
        />
        <input
          name="carrera"
          value={alumno.carrera}
          onChange={handleInputChange}
          placeholder="Carrera"
          required
          className="form-input"
        />
        <input
          type="date"
          name="fecha_nacimiento"
          value={alumno.fecha_nacimiento}
          onChange={handleInputChange}
          required
          className="form-input"
        />
        <input
          type="number"
          name="semestre"
          value={alumno.semestre}
          onChange={handleInputChange}
          placeholder="Semestre"
          required
          className="form-input"
        />
        <button type="submit" className="form-button">Cargar Alumno</button>
      </form>
    </div>
  );
}

export default CargaAlumnos;
