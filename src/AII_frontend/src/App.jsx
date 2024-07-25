import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ConsultaAlumnos from './components/ConsultaAlumnos';
import CargaAlumnos from './components/CargaAlumnos';
import Inicio from './components/Inicio';
import Login from './components/Login';
import Inscripcion from './components/Inscripcion';
import NavBar from './components/NavBar';
import RegistroAlumno from './components/RegistroAlumno';
import RegistroAdministrativo from './components/RegistroAdministrativo';
import VerAlumnosIngresantes from './components/VerAlumnosIngresantes'; // Importa el nuevo componente
import { Connect2ICProvider, useConnect, useCanister } from '@connect2ic/react';
import { createClient } from '@connect2ic/core';
import { InternetIdentity } from '@connect2ic/core/providers/internet-identity';
import './styles/commonStyles.css';
import { UserProvider, useUser } from './UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as AII_backend from "declarations/AII_backend";

// Configura el cliente con el proveedor InternetIdentity
const client = createClient({
  canisters: {
    AII_backend,
  },
  providers: [
    new InternetIdentity({ providerUrl: "http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai" })
  ],
  globalProviderConfig: {
    dev: true,
  },
});

function AppRoutes() {
  const { isConnected, principal } = useConnect();
  const { setPrincipal } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [AII_backend] = useCanister('AII_backend');
  const hasCheckedUser = useRef(false);

  useEffect(() => {
    const checkUser = async () => {
      if (isConnected && principal && !hasCheckedUser.current) {
        console.log('Principal:', principal);
        setPrincipal(principal);
        hasCheckedUser.current = true;
        try {
          const user = await AII_backend.getMyUser();
          console.log('Respuesta de getMyUser:', user);
          if (user && user.length > 0) {
            navigate('/inicio');
          } else {
            console.log('Usuario no registrado. Favor de registrarse.');
          }
        } catch (error) {
          console.error('Error al verificar si el usuario está registrado:', error);
        }
      } else if (!isConnected && location.pathname !== '/') {
        navigate('/');
      }
    };

    checkUser();
  }, [isConnected, principal, setPrincipal, navigate, location, AII_backend]);

  return (
    <>
      {location.pathname !== '/' && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/consultar" element={<ConsultaAlumnos />} />
        <Route path="/cargar" element={<CargaAlumnos />} />
        <Route path="/inscripcion/nuevo" element={<Inscripcion mode="nuevo" />} />
        <Route path="/inscripcion/validar" element={<Inscripcion mode="validar" />} />
        <Route path="/registro-alumno" element={<RegistroAlumno />} />
        <Route path="/registro-administrativo" element={<RegistroAdministrativo />} />
        <Route path="/ver-alumnos-ingresantes" element={<VerAlumnosIngresantes />} /> {/* Agrega la nueva ruta */}
      </Routes>
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <Connect2ICProvider client={client}>
        <Router>
          <AppRoutes />
        </Router>
      </Connect2ICProvider>
    </UserProvider>
  );
}

export default App;