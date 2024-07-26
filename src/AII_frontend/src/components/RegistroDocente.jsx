import React, { useState } from 'react';
import { useCanister } from '@connect2ic/react';
import '../styles/registroDocenteStyles.css';

function RegistroDocente() {
  const [AII_backend] = useCanister('AII_backend');
  const [form, setForm] = useState({
    nombre: '', apellidoPaterno: '', apellidoMaterno: '', tipoSanguineo: '', fechaNacimiento: '',
    curp: '', genero: '', lugarNacimiento: '', estadoCivil: '', emailPersonal: '', direcciones: [''],
    telefonos: [''], detallesMedicos: '', numeroSeguroSocial: '', cedulaProfesional: '', materias: ['']
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
      const response = await AII_backend.registrarseComoDocente(form);
      setMessage(response);
    } catch (error) {
      setMessage('Error al registrar docente.');
      console.error('Error al registrar docente:', error);
    }
  };

  return (
    <div className="registro-docente-container">
      <h2>Registrar Docente</h2>
      <form className="registro-docente-form" onSubmit={handleSubmit}>
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
          
          {form.materias.map((materia, index) => (
            <input key={index} type="text" value={materia} onChange={(e) => handleArrayChange(e, index, 'materias')} placeholder="Materia" required />
          ))}
          <div className="add-button-container">
            <button type="button" className="add-button" onClick={() => addArrayField('materias')}>Agregar Materia</button>
          </div>
          
          <input type="text" name="cedulaProfesional" value={form.cedulaProfesional} onChange={handleChange} placeholder="Cédula Profesional" required />
        </div>
        
        <button type="submit" className="form-button">Registrar</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default RegistroDocente;