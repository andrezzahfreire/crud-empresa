import React from 'react';
import { Link } from 'react-router-dom';
import ListaEmpresas from './ListaEmpresas';
import Navbar from './navbar';

const Home: React.FC = () => {
  return (
    <div className="d-flex flex-column vh-100">
      <Navbar />
      <div className="container d-flex flex-column align-items-center mt-4">
        <ListaEmpresas />
        <Link to="/cadastro" className="btn btn-primary mt-3">
          Cadastrar Empresa
        </Link>
      </div>
    </div>
  );
};

export default Home;
