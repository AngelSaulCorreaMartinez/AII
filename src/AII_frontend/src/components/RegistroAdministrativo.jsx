import React, { useState, useEffect } from 'react';
import { useCanister, useConnect } from '@connect2ic/react';
import '../styles/registroAdministrativoStyles.css';

function RegistroAdministrativo() {
  const [AII_backend] = useCanister('AII_backend');
  const { principal } = useConnect();
  const [form, setForm] = useState({
    principalID: '', nombre: '', apellidoPaterno: '', apellidoMaterno: '', tipoSanguineo: '', fechaNacimiento: '',
    curp: '', genero: '', lugarNacimiento: '', estadoCivil: '', emailPersonal: '', direcciones: [''],
    telefonos: [''], detallesMedicos: '', numeroSeguroSocial: '', cedulaProfesional: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (principal) {
      setForm(prevForm => ({ ...prevForm, principalID: principal.toString() }));
    }
  }, [principal]);

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
      const response = await AII_backend.registrarseComoAdministrativo({
        ...form,
        principalID: principal
      });
      setMessage(response);
    } catch (error) {
      setMessage('Error al registrar administrativo.');
      console.error('Error al registrar administrativo:', error);
    }
  };

  return (
    <div className="registro-admin-container">
      <h2>Solicitar Registro como Administrativo</h2>
      <form className="registro-admin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" name="principalID" value={form.principalID} readOnly placeholder="Principal ID" />
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
          <input type="text" name="cedulaProfesional" value={form.cedulaProfesional} onChange={handleChange} placeholder="Cédula Profesional" required />
        </div>
        
        <button type="submit" className="form-button">Registrar</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default RegistroAdministrativo;
