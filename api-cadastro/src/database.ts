import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");
  }
});

// Criar tabela se não existir
db.run(
    `CREATE TABLE IF NOT EXISTS Empresa (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      razaoSocial VARCHAR(255) NOT NULL,
      cnpj VARCHAR(18) NOT NULL,
      dataRegistro DATETIME NOT NULL,
      status VARCHAR(50) NOT NULL,
      criadoEm DATETIME NOT NULL,
      atualizadoEm DATETIME NOT NULL
    )`
  );
  

export default db;
