import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useConnect } from '@connect2ic/react';
import '../styles/navBarStyles.css';
import logo from '/logo-completo-utma.png'; // Asegúrate de que la ruta es correcta

function NavBar() {
  const { isConnected, disconnect, connect } = useConnect();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        <img src={logo} alt="Logo" className="nav-logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Menú" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/consultar">Consultar Alumnos</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/cargar">Cargar Alumnos</NavDropdown.Item>
            <NavDropdown title={<span className="inscripcion-dropdown">Inscripción</span>} id="inscripcion-nav-dropdown" className="submenu-right">
              <NavDropdown.Item as={Link} to="/inscripcion/nuevo">Nuevo Ingreso</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/inscripcion/validar">Validar Datos</NavDropdown.Item>
            </NavDropdown>
          </NavDropdown>
        </Nav>
        <Nav>
          {isConnected ? (
            <Nav.Link onClick={disconnect}>Cerrar Sesión</Nav.Link>
          ) : (
            <Nav.Link onClick={connect}>Iniciar Sesión</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
