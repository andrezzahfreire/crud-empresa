import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Cadastro from './Cadastro';
import DetalheEmpresa from './DatalheEmpresa';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/detalhes/:id" element={<DetalheEmpresa/>} /> {/* Detalhes da empresa */}
      </Routes>
    </Router>
  );
}

export default App;
