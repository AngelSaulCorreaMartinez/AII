import React, { useState, useEffect } from 'react';
import { AII_backend } from 'declarations/AII_backend';
import { useUser } from '../UserContext'; // Importa el contexto
import '../styles/inscripcion.css';

function Inscripcion({ mode }) {
  const { principal } = useUser(); // Obtén el principal del contexto
  const [aspirante, setAspirante] = useState({
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    fecha_nacimiento: '',
    curp: '',
    genero: '',
    lugar_nacimiento: '',
    estado_civil: '',
    correo_electronico: '',
    direccion: '',
    telefono: '',
    detalles_medicos: '',
    numero_seguro_social: '',
    escuela_procedencia: '',
    ocupacion: '',
    tutor: '',
    etnia_indigena: '',
    lengua_indigena: '',
    comunidad_indigena: '',
    folio_ceneval: ''
  });

  useEffect(() => {
    if (principal) {
      setAspirante((prev) => ({
        ...prev,
        principal: principal.toString(), // Auto-completa el campo principal
      }));
    }
  }, [principal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAspirante((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AII_backend.sendAspiranteData(aspirante);
      console.log('Respuesta del servidor:', response);
    } catch (error) {
      console.error('Error al enviar los datos del aspirante:', error);
    }
  };

  const handleValidate = async (e) => {
    e.preventDefault();
    try {
      const response = await AII_backend.validateAspirante(principal);
      if (response) {
        setAspirante(response);
      } else {
        console.error('No se encontraron datos para este principal');
      }
    } catch (error) {
      console.error('Error al validar los datos del aspirante:', error);
    }
  };

  return (
    <div className="inscripcion-container">
      <h2>Solicitud de Examen de Admisión</h2>
      {mode === 'nuevo' && (
        <form onSubmit={handleSubmit} className="inscripcion-form">
          <input name="principal" value={aspirante.principal} readOnly className="form-input" />
          <input name="nombre" value={aspirante.nombre} onChange={handleInputChange} placeholder="Nombre" required className="form-input" />
          <input name="apellido_paterno" value={aspirante.apellido_paterno} onChange={handleInputChange} placeholder="Apellido Paterno" required className="form-input" />
          <input name="apellido_materno" value={aspirante.apellido_materno} onChange={handleInputChange} placeholder="Apellido Materno" required className="form-input" />
          <input type="date" name="fecha_nacimiento" value={aspirante.fecha_nacimiento} onChange={handleInputChange} required className="form-input" />
          <input name="curp" value={aspirante.curp} onChange={handleInputChange} placeholder="CURP" required className="form-input" />
          
          <select name="genero" value={aspirante.genero} onChange={handleInputChange} required className="form-input">
            <option value="">Selecciona Género</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
            <option value="Otro">Otro</option>
          </select>
          
          <input name="lugar_nacimiento" value={aspirante.lugar_nacimiento} onChange={handleInputChange} placeholder="Lugar de Nacimiento" required className="form-input" />
          
          <select name="estado_civil" value={aspirante.estado_civil} onChange={handleInputChange} required className="form-input">
            <option value="">Selecciona Estado Civil</option>
            <option value="Soltero">Soltero</option>
            <option value="Casado">Casado</option>
            <option value="Divorciado">Divorciado</option>
            <option value="Viudo">Viudo</option>
          </select>
          
          <input type="email" name="correo_electronico" value={aspirante.correo_electronico} onChange={handleInputChange} placeholder="Correo Electrónico" required className="form-input" />
          <input name="direccion" value={aspirante.direccion} onChange={handleInputChange} placeholder="Dirección" required className="form-input" />
          <input name="telefono" value={aspirante.telefono} onChange={handleInputChange} placeholder="Teléfono" required className="form-input" />
          <input name="detalles_medicos" value={aspirante.detalles_medicos} onChange={handleInputChange} placeholder="Detalles Médicos" required className="form-input" />
          <input name="numero_seguro_social" value={aspirante.numero_seguro_social} onChange={handleInputChange} placeholder="Número de Seguro Social" required className="form-input" />
          <input name="escuela_procedencia" value={aspirante.escuela_procedencia} onChange={handleInputChange} placeholder="Escuela de Procedencia" required className="form-input" />
          <input name="ocupacion" value={aspirante.ocupacion} onChange={handleInputChange} placeholder="Ocupación" required className="form-input" />
          <input name="tutor" value={aspirante.tutor} onChange={handleInputChange} placeholder="Tutor o Jefe de Familia" required className="form-input" />
          
          <select name="etnia_indigena" value={aspirante.etnia_indigena} onChange={handleInputChange} required className="form-input">
            <option value="">¿Perteneces a alguna etnia indígena?</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
          
          <select name="lengua_indigena" value={aspirante.lengua_indigena} onChange={handleInputChange} required className="form-input">
            <option value="">¿Hablas alguna lengua indígena?</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
          
          <select name="comunidad_indigena" value={aspirante.comunidad_indigena} onChange={handleInputChange} required className="form-input">
            <option value="">¿Vives en una comunidad indígena?</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
          
          <input name="folio_ceneval" value={aspirante.folio_ceneval} onChange={handleInputChange} placeholder="Folio Ceneval" required className="form-input" />
          <button type="submit" className="form-button">Enviar Solicitud</button>
        </form>
      )}
      {mode === 'validar' && (
        <form onSubmit={handleValidate} className="inscripcion-form">
          <input name="principal" value={principal} readOnly className="form-input" />
          <button type="submit" className="form-button">Validar Datos</button>
        </form>
      )}
      {mode === 'validar' && aspirante && (
        <form onSubmit={handleSubmit} className="inscripcion-form">
          <input name="principal" value={aspirante.principal} readOnly className="form-input" />
          <input name="nombre" value={aspirante.nombre} onChange={handleInputChange} placeholder="Nombre" required className="form-input" />
          <input name="apellido_paterno" value={aspirante.apellido_paterno} onChange={handleInputChange} placeholder="Apellido Paterno" required className="form-input" />
          <input name="apellido_materno" value={aspirante.apellido_materno} onChange={handleInputChange} placeholder="Apellido Materno" required className="form-input" />
          <input type="date" name="fecha_nacimiento" value={aspirante.fecha_nacimiento} onChange={handleInputChange} required className="form-input" />
          <input name="curp" value={aspirante.curp} onChange={handleInputChange} placeholder="CURP" required className="form-input" />
          
          <select name="genero" value={aspirante.genero} onChange={handleInputChange} required className="form-input" disabled>
            <option value="">Selecciona Género</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
            <option value="Otro">Otro</option>
          </select>
          
          <input name="lugar_nacimiento" value={aspirante.lugar_nacimiento} onChange={handleInputChange} placeholder="Lugar de Nacimiento" required className="form-input" />
          
          <select name="estado_civil" value={aspirante.estado_civil} onChange={handleInputChange} required className="form-input">
            <option value="">Selecciona Estado Civil</option>
            <option value="Soltero">Soltero</option>
            <option value="Casado">Casado</option>
            <option value="Divorciado">Divorciado</option>
            <option value="Viudo">Viudo</option>
          </select>
          
          <input type="email" name="correo_electronico" value={aspirante.correo_electronico} onChange={handleInputChange} placeholder="Correo Electrónico" required className="form-input" />
          <input name="direccion" value={aspirante.direccion} onChange={handleInputChange} placeholder="Dirección" required className="form-input" />
          <input name="telefono" value={aspirante.telefono} onChange={handleInputChange} placeholder="Teléfono" required className="form-input" />
          <input name="detalles_medicos" value={aspirante.detalles_medicos} onChange={handleInputChange} placeholder="Detalles Médicos" required className="form-input" />
          <input name="numero_seguro_social" value={aspirante.numero_seguro_social} onChange={handleInputChange} placeholder="Número de Seguro Social" required className="form-input" />
          <input name="escuela_procedencia" value={aspirante.escuela_procedencia} onChange={handleInputChange} placeholder="Escuela de Procedencia" required className="form-input" disabled />
          <input name="ocupacion" value={aspirante.ocupacion} onChange={handleInputChange} placeholder="Ocupación" required className="form-input" />
          <input name="tutor" value={aspirante.tutor} onChange={handleInputChange} placeholder="Tutor o Jefe de Familia" required className="form-input" />
          
          <select name="etnia_indigena" value={aspirante.etnia_indigena} onChange={handleInputChange} required className="form-input" disabled>
            <option value="">¿Perteneces a alguna etnia indígena?</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
          
          <select name="lengua_indigena" value={aspirante.lengua_indigena} onChange={handleInputChange} required className="form-input" disabled>
            <option value="">¿Hablas alguna lengua indígena?</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
          
          <select name="comunidad_indigena" value={aspirante.comunidad_indigena} onChange={handleInputChange} required className="form-input" disabled>
            <option value="">¿Vives en una comunidad indígena?</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>
          
          <input name="folio_ceneval" value={aspirante.folio_ceneval} onChange={handleInputChange} placeholder="Folio Ceneval" required className="form-input" disabled />
          <button type="submit" className="form-button">Actualizar Datos</button>
        </form>
      )}
    </div>
  );
}

export default Inscripcion;
