import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ConsultaAlumnos from './components/ConsultaAlumnos';
import CargaAlumnos from './components/CargaAlumnos';
import Inicio from './components/Inicio';
import Login from './components/Login';
import Inscripcion from './components/Inscripcion';  // Asegúrate de importar Inscripcion
import NavBar from './components/NavBar';
import { Connect2ICProvider, useConnect } from '@connect2ic/react';
import { createClient } from '@connect2ic/core';
import { InternetIdentity } from '@connect2ic/core/providers/internet-identity';
import './styles/commonStyles.css';
import { UserProvider, useUser } from './UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as AII_backend from "declarations/AII_backend";

// Configura el cliente con el proveedor InternetIdentity
const client = createClient({
  canisters: {
    AII_backend, // Asegúrate de que el canister está definido aquí
  },
  providers: [
    //new InternetIdentity({ providerUrl: "https://identity.ic0.app" })
    new InternetIdentity({ providerUrl: "http://127.0.0.1:8000/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai" })
  ],
  globalProviderConfig: {
    dev: true,
  },
});

function AppRoutes() {
  const { isConnected, principal } = useConnect();
  const { setPrincipal } = useUser(); // Obtén la función para establecer el principal
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isConnected && principal) {
      console.log('Principal:', principal);
      setPrincipal(principal);
    }
    if (!isConnected && location.pathname !== '/') {
      navigate('/');
    }
  }, [isConnected, principal, setPrincipal, navigate, location]);

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
