import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useConnect } from '@connect2ic/react';
import '../styles/navBarStyles.css';
import logo from '/logo-completo-utma.png';

function NavBar() {
  const { isConnected, disconnect, connect } = useConnect();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/inicio');
  };

  const handleLogout = async () => {
    await disconnect();
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="Logo" className="nav-logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Menú" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/consultar">Consultar Alumnos</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/cargar">Cargar Alumnos</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/registro-alumno">Registrar Alumno</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/registro-administrativo">Registrar Administrativo</NavDropdown.Item>
            <NavDropdown title={<span className="inscripcion-dropdown">Inscripción</span>} id="inscripcion-nav-dropdown" className="submenu-right">
              <NavDropdown.Item as={Link} to="/inscripcion/nuevo">Nuevo Ingreso</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/inscripcion/validar">Validar Datos</NavDropdown.Item>
            </NavDropdown>
          </NavDropdown>
        </Nav>
        <Nav>
          {isConnected ? (
            <Nav.Link onClick={handleLogout}>Cerrar Sesión</Nav.Link>
          ) : (
            <Nav.Link onClick={connect}>Iniciar Sesión</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;