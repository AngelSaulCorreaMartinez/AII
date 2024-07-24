import React, { useState } from 'react';
import { useCanister } from '@connect2ic/react';
import '../styles/registroAlumnoStyles.css';

function RegistroAlumno() {
  const [AII_backend] = useCanister('AII_backend');
  const [form, setForm] = useState({
    nombre: '', apellidoPaterno: '', apellidoMaterno: '', tipoSanguineo: '', fechaNacimiento: '',
    curp: '', genero: '', lugarNacimiento: '', estadoCivil: '', emailPersonal: '', direcciones: [''],
    telefonos: [''], detallesMedicos: '', numeroSeguroSocial: '', escuelasProcedencia: [''], ocupaciones: [''],
    tutorJefeFamilia: '', familiares: [''], pertenenciaEtniaIndigena: false, hablaLenguaIndigena: false,
    viveComunidadIndigena: false, folioCeneval: '', emailInstitucional: '', matricula: '', carrera: '', semestre: 1
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleArrayChange = (e, index, field) => {
    const newArray = form[field].slice();
    newArray[index] = e.target.value;
    setForm({ ...form, [field]: newArray });
  };

  const addArrayField = (field) => {
    setForm({ ...form, [field]: [...form[field], ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convertir semestre a número
      const formToSend = { ...form, semestre: Number(form.semestre) };
      const response = await AII_backend.registrarseComoAlumno(formToSend);
      setMessage(response);
    } catch (error) {
      setMessage('Error al registrar alumno.');
      console.error('Error al registrar alumno:', error);
    }
  };

  return (
    <div className="registro-alumno-container">
      <h2>Registrar Alumno</h2>
      <form className="registro-alumno-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
          <input type="text" name="apellidoPaterno" value={form.apellidoPaterno} onChange={handleChange} placeholder="Apellido Paterno" required />
          <input type="text" name="apellidoMaterno" value={form.apellidoMaterno} onChange={handleChange} placeholder="Apellido Materno" required />
          <input type="text" name="tipoSanguineo" value={form.tipoSanguineo} onChange={handleChange} placeholder="Tipo Sanguíneo" required />
          <input type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} placeholder="Fecha de Nacimiento" required />
          <input type="text" name="curp" value={form.curp} onChange={handleChange} placeholder="CURP" required />
          <input type="text" name="genero" value={form.genero} onChange={handleChange} placeholder="Género" required />
          <input type="text" name="lugarNacimiento" value={form.lugarNacimiento} onChange={handleChange} placeholder="Lugar de Nacimiento" required />
          <input type="text" name="estadoCivil" value={form.estadoCivil} onChange={handleChange} placeholder="Estado Civil" required />
          <input type="email" name="emailPersonal" value={form.emailPersonal} onChange={handleChange} placeholder="Email Personal" required />
        </div>
        <div className="form-group">
          {form.direcciones.map((direccion, index) => (
            <input key={index} type="text" value={direccion} onChange={(e) => handleArrayChange(e, index, 'direcciones')} placeholder="Dirección" required />
          ))}
          <div className="add-button-container">
            <button type="button" className="add-button" onClick={() => addArrayField('direcciones')}>Agregar Dirección</button>
          </div>
          
          {form.telefonos.map((telefono, index) => (
            <input key={index} type="text" value={telefono} onChange={(e) => handleArrayChange(e, index, 'telefonos')} placeholder="Teléfono" required />
          ))}
          <div className="add-button-container">
            <button type="button" className="add-button" onClick={() => addArrayField('telefonos')}>Agregar Teléfono</button>
          </div>
          
          <textarea name="detallesMedicos" value={form.detallesMedicos} onChange={handleChange} placeholder="Detalles Médicos" required />
          <input type="text" name="numeroSeguroSocial" value={form.numeroSeguroSocial} onChange={handleChange} placeholder="Número de Seguro Social" required />
          
          {form.escuelasProcedencia.map((escuela, index) => (
            <input key={index} type="text" value={escuela} onChange={(e) => handleArrayChange(e, index, 'escuelasProcedencia')} placeholder="Escuela de Procedencia" required />
          ))}
          <div className="add-button-container">
            <button type="button" className="add-button" onClick={() => addArrayField('escuelasProcedencia')}>Agregar Escuela</button>
          </div>
          
          {form.ocupaciones.map((ocupacion, index) => (
            <input key={index} type="text" value={ocupacion} onChange={(e) => handleArrayChange(e, index, 'ocupaciones')} placeholder="Ocupación" required />
          ))}
          <div className="add-button-container">
            <button type="button" className="add-button" onClick={() => addArrayField('ocupaciones')}>Agregar Ocupación</button>
          </div>
          
          <input type="text" name="tutorJefeFamilia" value={form.tutorJefeFamilia} onChange={handleChange} placeholder="Tutor o Jefe de Familia" required />
          
          {form.familiares.map((familiar, index) => (
            <input key={index} type="text" value={familiar} onChange={(e) => handleArrayChange(e, index, 'familiares')} placeholder="Familiar" required />
          ))}
          <div className="add-button-container">
            <button type="button" className="add-button" onClick={() => addArrayField('familiares')}>Agregar Familiar</button>
          </div>
          
          <div className="checkbox-group">
            <label>
              <input type="checkbox" name="pertenenciaEtniaIndigena" checked={form.pertenenciaEtniaIndigena} onChange={handleChange} />
              Pertenencia a Etnia Indígena
            </label>
            <label>
              <input type="checkbox" name="hablaLenguaIndigena" checked={form.hablaLenguaIndigena} onChange={handleChange} />
              Habla Lengua Indígena
            </label>
            <label>
              <input type="checkbox" name="viveComunidadIndigena" checked={form.viveComunidadIndigena} onChange={handleChange} />
              Vive en Comunidad Indígena
            </label>
          </div>
          
          <input type="text" name="folioCeneval" value={form.folioCeneval} onChange={handleChange} placeholder="Folio CENEVAL" required />
          <input type="email" name="emailInstitucional" value={form.emailInstitucional} onChange={handleChange} placeholder="Email Institucional" required />
          <input type="text" name="matricula" value={form.matricula} onChange={handleChange} placeholder="Matrícula" required />
          <input type="text" name="carrera" value={form.carrera} onChange={handleChange} placeholder="Carrera" required />
          <input type="number" name="semestre" value={form.semestre} onChange={handleChange} placeholder="Semestre" required min="1" />
        </div>
        
        <button type="submit" className="form-button">Registrar</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default RegistroAlumno;