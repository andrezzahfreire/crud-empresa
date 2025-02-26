# Sistema de Gerenciamento de Empresas

Este projeto consiste em um sistema de cadastro de empresas, dividido em frontend e backend. O backend é desenvolvido em Node.js com TypeScript e utiliza SQLite como banco de dados. O frontend é desenvolvido em React com TypeScript.

## Estrutura do Projeto

```
/desafioFullstack
│── backend (Backend)
│   │── api-cadastro
│   │   │── database.db (Banco de dados SQLite)
│   │   │── package.json (Configuração do Node.js)
│   │   │── routes.ts (Definição das rotas)
│   │   │── server.ts (Configuração do servidor)
│   │   │── database.ts (Conexão com o banco de dados)
│   │   │── validacao.ts (Regras de validação)
│   │   │── .env (Configuração da porta do servidor)
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
- dotenv (Para gerenciar variáveis de ambiente)

### Frontend
- React.js
- TypeScript

## Instalação e Execução

### Backend
1. Acesse a pasta do backend:
   ```sh
   cd backend/api-cadastro
   ```
2. Crie um arquivo `.env` e adicione a seguinte configuração:
   ```sh
   PORT=8000
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Inicie o servidor backend:
   ```sh
   npm run dev
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

O frontend se conecta ao backend na porta definida no arquivo `.env` (padrão: 8000).

## Regras de Cadastro
- O CNPJ deve conter apenas números.

## Licença
Este projeto está sob a licença MIT.

