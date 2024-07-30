import React, { useState, useEffect } from 'react';
import { useCanister } from '@connect2ic/react';
import { useParams } from 'react-router-dom';
import '../styles/detallesStyles.css';

function DetallesAdministrativo() {
  const [AII_backend] = useCanister('AII_backend');
  const { principal } = useParams();
  const [administrativo, setAdministrativo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdministrativoDetalles = async () => {
      try {
        const result = await AII_backend.verAdministrativos();
        const administrativo = result.find(a => a.principalID.toString() === principal);
        setAdministrativo(administrativo);
      } catch (error) {
        console.error('Error al obtener los detalles del administrativo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdministrativoDetalles();
  }, [AII_backend, principal]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!administrativo) {
    return <p>No se encontró información del administrativo.</p>;
  }

  return (
    <div className="detalles-dashboard">
      <h2 className="dashboard-heading">Detalles del Administrativo</h2>
      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h3>Información Personal</h3>
          <p><strong>Nombre:</strong> {administrativo.nombre}</p>
          <p><strong>Apellido Paterno:</strong> {administrativo.apellidoPaterno}</p>
          <p><strong>Apellido Materno:</strong> {administrativo.apellidoMaterno}</p>
          <p><strong>Fecha de Nacimiento:</strong> {administrativo.fechaNacimiento}</p>
          <p><strong>Género:</strong> {administrativo.genero}</p>
          <p><strong>CURP:</strong> {administrativo.curp}</p>
          <p><strong>Principal:</strong> {administrativo.principalID.toString()}</p>
        </div>
        <div className="dashboard-section">
          <h3>Información de Contacto</h3>
          <p><strong>Email Personal:</strong> {administrativo.emailPersonal}</p>
          <p><strong>Teléfonos:</strong> {administrativo.telefonos.join(', ')}</p>
          <p><strong>Direcciones:</strong> {administrativo.direcciones.join(', ')}</p>
        </div>
        <div className="dashboard-section">
          <h3>Información Profesional</h3>
          <p><strong>Cédula Profesional:</strong> {administrativo.cedulaProfesional}</p>
          <p><strong>Número de Seguro Social:</strong> {administrativo.numeroSeguroSocial}</p>
        </div>
      </div>
    </div>
  );
}

export default DetallesAdministrativo;
