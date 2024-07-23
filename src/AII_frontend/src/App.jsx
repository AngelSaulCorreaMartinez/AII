import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ConsultaAlumnos from './components/ConsultaAlumnos';
import CargaAlumnos from './components/CargaAlumnos';
import Inicio from './components/Inicio';
import Login from './components/Login';
import Inscripcion from './components/Inscripcion';
import NavBar from './components/NavBar';
import { Connect2ICProvider, useConnect } from '@connect2ic/react';
import { createClient } from '@connect2ic/core';
import { InternetIdentity } from '@connect2ic/core/providers/internet-identity';
import './styles/commonStyles.css';
import { UserProvider } from './UserContext';
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
  const { isConnected } = useConnect();
  const location = useLocation();

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