import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar';

const ListaEmpresas: React.FC = () => {
  const [empresas, setEmpresas] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/empresa')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao buscar empresas');
        }
        return response.json();
      })
      .then((data) => setEmpresas(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Lista de Empresas</h2>
      {error && <p className="text-danger">{error}</p>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">CNPJ</th>
            <th scope="col">Razão Social</th>
            <th scope="col">Status</th>
            <th scope="col">Detalhes</th>
          </tr>
        </thead>
        <tbody>
          {empresas.map((empresa: any) => (
            <tr key={empresa.id}>
              <td>{empresa.cnpj}</td>
              <td>{empresa.razaoSocial}</td>
              <td>{empresa.status}</td>
              <td>
                <Link to={`/detalhes/${empresa.id}`} className="btn btn-info">
                  Ver Detalhes
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaEmpresas;
