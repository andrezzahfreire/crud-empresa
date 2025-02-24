import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './navbar';

const DetalheEmpresa: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState<{ id: number; razaoSocial: string; cnpj: string; status: string } | null>(null);
  const [formData, setFormData] = useState({ razaoSocial: '', cnpj: '', status: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8000/empresa/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Empresa não encontrada');
        }
        return response.json();
      })
      .then((data) => {
        setEmpresa(data);
        setFormData({ razaoSocial: data.razaoSocial, cnpj: data.cnpj, status: data.status });
      })
      .catch((error) => setError(error.message));
  }, [id]);

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!empresa) {
    return <h2>Carregando...</h2>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    fetch(`http://localhost:8000/empresa/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        alert(`Empresa ${data.razaoSocial} atualizada com sucesso!`);
        setEmpresa(data);
        setIsEditing(false);
      })
      .catch((error) => alert(error.message));
  };

  const handleDelete = () => {
    fetch(`http://localhost:8000/empresa/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        alert(`Empresa ${empresa.razaoSocial} deletada!`);
        navigate('/');
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="container mt-5">
         <Navbar />
      <h1>Detalhes da Empresa</h1>

      <div className="card">
        <div className="card-body">
          {!isEditing ? (
            <>
              <h5 className="card-title"><strong>Razão Social:</strong> {empresa.razaoSocial}</h5>
              <p className="card-text"><strong>CNPJ:</strong> {empresa.cnpj}</p>
              <p className="card-text"><strong>Status:</strong> {empresa.status}</p>

              <div className="d-flex">
                <button onClick={() => setIsEditing(true)} className="btn btn-warning me-2">
                  Editar
                </button>
                <button onClick={handleDelete} className="btn btn-danger me-2">
                  Deletar
                </button>
                <button onClick={() => navigate(-1)} className="btn btn-primary">
                  Voltar
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-3">
                <label className="form-label">Razão Social</label>
                <input 
                  type="text"
                  className="form-control"
                  name="razaoSocial"
                  value={formData.razaoSocial}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">CNPJ</label>
                <input
                  type="text"
                  className="form-control"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
              <div className="d-flex">
                <button onClick={handleUpdate} className="btn btn-success me-2">
                  Salvar
                </button>
                <button onClick={() => setIsEditing(false)} className="btn btn-secondary me-2">
                  Cancelar
                </button>
                <button onClick={() => navigate(-1)} className="btn btn-primary">
                  Voltar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalheEmpresa;
