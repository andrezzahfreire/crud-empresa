import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';

const Cadastro: React.FC = () => {
  const [formData, setFormData] = useState({
    razaoSocial: '',
    cnpj: '',
    dataRegistro: '',
    status: '',
  });

  const [errors, setErrors] = useState({
    razaoSocial: '',
    cnpj: '',
    dataRegistro: '',
    status: '',
  });

  const [message, setMessage] = useState<string>(''); // Para exibir mensagens de sucesso ou erro

  const navigate = useNavigate(); // Hook de navegação

  // Função para manipular o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let formIsValid = true;
    let newErrors = { ...errors };

    // Validação dos campos
    if (!formData.razaoSocial) {
      newErrors.razaoSocial = 'Razão Social é obrigatória';
      formIsValid = false;
    } else {
      newErrors.razaoSocial = '';
    }

    if (!formData.cnpj) {
      newErrors.cnpj = 'CNPJ é obrigatório';
      formIsValid = false;
    } else {
      newErrors.cnpj = '';
    }

    if (!formData.dataRegistro) {
      newErrors.dataRegistro = 'Data de Registro é obrigatória';
      formIsValid = false;
    } else {
      newErrors.dataRegistro = '';
    }

    if (!formData.status) {
      newErrors.status = 'Status é obrigatório';
      formIsValid = false;
    } else {
      newErrors.status = '';
    }

    setErrors(newErrors);

    // Se não houver erros, podemos enviar os dados para a API
    if (formIsValid) {
      try {
        const response = await fetch('http://localhost:8000/empresa', { // Altere para o endpoint da sua API
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            razaoSocial: formData.razaoSocial,
            cnpj: formData.cnpj,
            status: formData.status,
            dataRegistro: formData.dataRegistro,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('Empresa cadastrada com sucesso!');
          setFormData({
            razaoSocial: '',
            cnpj: '',
            dataRegistro: '',
            status: '',
          });
        } else {
          setMessage(data.error || 'Erro ao cadastrar empresa');
        }
      } catch (error) {
        setMessage('Erro na conexão com a API');
      }
    }
  };

  // Função para atualizar os campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Função para voltar
  const handleBack = () => {
    navigate(-1); // Navega para a página anterior
  };

  // Obtém a data de hoje no formato YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container">
         <Navbar />
      <h2>Formulário de Cadastro</h2>
      
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="razaoSocial" className="form-label">Razão Social</label>
          <input
            type="text"
            className="form-control"
            id="razaoSocial"
            name="razaoSocial"
            value={formData.razaoSocial}
            onChange={handleChange}
            required
          />
          {errors.razaoSocial && <div className="text-danger">{errors.razaoSocial}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="cnpj" className="form-label">CNPJ</label>
          <input
            type="text"
            className="form-control"
            id="cnpj"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            required
          />
          {errors.cnpj && <div className="text-danger">{errors.cnpj}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="dataRegistro" className="form-label">Data de Registro</label>
          <input
            type="date"
            className="form-control"
            id="dataRegistro"
            name="dataRegistro"
            value={formData.dataRegistro}
            onChange={handleChange}
            required
            max={today} // Limita a data de registro até hoje
          />
          {errors.dataRegistro && <div className="text-danger">{errors.dataRegistro}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status</label>
          <select
            className="form-control"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o status</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
          {errors.status && <div className="text-danger">{errors.status}</div>}
        </div>

        <button type="submit" className="btn btn-primary">Enviar</button>
      </form>

      {/* Botão de Voltar */}
      <button onClick={handleBack} className="btn btn-secondary mt-3">
        Voltar
      </button>
    </div>
  );
};

export default Cadastro;
