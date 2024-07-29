// Archivo: src/components/DetallesDocente.jsx
import React, { useState, useEffect } from 'react';
import { useCanister } from '@connect2ic/react';
import { useParams } from 'react-router-dom';
import '../styles/detallesStyles.css';

function DetallesDocente() {
  const [AII_backend] = useCanister('AII_backend');
  const { principal } = useParams();
  const [docente, setDocente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocenteDetalles = async () => {
      try {
        const result = await AII_backend.verDocentes();
        const docente = result.find(d => d.principalID.toString() === principal);
        setDocente(docente);
      } catch (error) {
        console.error('Error al obtener los detalles del docente:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocenteDetalles();
  }, [AII_backend, principal]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!docente) {
    return <p>No se encontró información del docente.</p>;
  }

  return (
    <div className="detalles-dashboard">
      <h2 className="dashboard-heading">Detalles del Docente</h2>
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h3>Información Personal</h3>
          <p><strong>Principal:</strong> {docente.principalID.toString()}</p>
          <p><strong>Nombre:</strong> {docente.nombre}</p>
          <p><strong>Apellido Paterno:</strong> {docente.apellidoPaterno}</p>
          <p><strong>Apellido Materno:</strong> {docente.apellidoMaterno}</p>
          <p><strong>Fecha de Nacimiento:</strong> {docente.fechaNacimiento}</p>
          <p><strong>Género:</strong> {docente.genero}</p>
          <p><strong>CURP:</strong> {docente.curp}</p>
        </div>
        <div className="dashboard-section">
          <h3>Información de Contacto</h3>
          <p><strong>Email Personal:</strong> {docente.emailPersonal}</p>
          <p><strong>Teléfonos:</strong> {docente.telefonos.join(', ')}</p>
          <p><strong>Direcciones:</strong> {docente.direcciones.join(', ')}</p>
        </div>
        <div className="dashboard-section">
          <h3>Información Profesional</h3>
          <p><strong>Cédula Profesional:</strong> {docente.cedulaProfesional}</p>
          <p><strong>Materias:</strong> {docente.materias.join(', ')}</p>
        </div>
        <div className="dashboard-section">
          <h3>Información Médica</h3>
          <p><strong>Tipo Sanguíneo:</strong> {docente.tipoSanguineo}</p>
          <p><strong>Detalles Médicos:</strong> {docente.detallesMedicos}</p>
          <p><strong>Número de Seguro Social:</strong> {docente.numeroSeguroSocial}</p>
        </div>
      </div>
    </div>
  );
}

export default DetallesDocente;

