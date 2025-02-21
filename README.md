# Sistema de gerenciamento de empresas

Este projeto consiste em um sistema de cadastro de empresas, dividido em frontend e backend. O backend é desenvolvido em Node.js com TypeScript e utiliza SQLite como banco de dados. O frontend é desenvolvido em React com TypeScript.

## Estrutura do Projeto

```
/desafioLiberium
│── api-cadastro (Backend)
│   │── database.db (Banco de dados SQLite)
│   │── package.json (Configuração do Node.js)
│   │── routes.ts (Definição das rotas)
│   │── server.ts (Configuração do servidor)
│   │── database.ts (Conexão com o banco de dados)
│   │── validacao.ts (Regras de validação)
│
│── frontend (Frontend React)
│   │── sistema-cadastro
│       │── src
│       │   │── App.tsx (Componente principal)
│       │   │── Cadastro.tsx (Página de cadastro)
│       │   │── DetalheEmpresa.tsx (Página de detalhes)
│       │   │── ListaEmpresas.tsx (Lista de empresas cadastradas)
│       │   │── navbar.tsx (Componente de navegação)
│       │── package.json (Configuração do frontend)
```

## Tecnologias Utilizadas

### Backend
- Node.js
- TypeScript
- Express
- SQLite

### Frontend
- React.js
- TypeScript

## Instalação e Execução

### Backend
1. Acesse a pasta do backend:
   ```sh
   cd api-cadastro
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Inicie o servidor backend (porta 8000):
   ```sh
   npm start
   ```

### Frontend
1. Acesse a pasta do frontend:
   ```sh
   cd frontend/sistema-cadastro
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Inicie o frontend:
   ```sh
   npm start
   ```

O frontend se conecta ao backend na porta 8000.

## Licença
Este projeto está sob a licença MIT.

