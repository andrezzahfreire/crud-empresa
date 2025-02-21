import { Router, Request, Response } from "express";
import db from "./database";
import { Empresa } from "./types";
import sqlite3 from "sqlite3";
import { validarCNPJ } from "./validacao";


const router: Router = Router();


// Criar uma empresa
router.post("/empresa", (req: Request, res: Response) => {
    const { razaoSocial, cnpj, status } = req.body;
    const criadoEm = new Date().toISOString();
    const atualizadoEm = criadoEm;
    const dataRegistro = criadoEm;

    if (!razaoSocial) {
        res.status(400).json({ error: "Razão social é obrigatória" });
        return;
    }
    if (!cnpj) {
        res.status(400).json({ error: "CNPJ é obrigatório" });
        return;
    }
    if (!validarCNPJ(cnpj)) {
        res.status(400).json({ error: "CNPJ inválido" });
        return;
    }

    // Verifica se o CNPJ já existe no banco
    db.get(`SELECT id FROM Empresa WHERE cnpj = ?`, [cnpj], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (row) {
            res.status(400).json({ error: "CNPJ já cadastrado" });
            return;
        }

        // Insere a nova empresa se o CNPJ for único
        const sql = `INSERT INTO Empresa (razaoSocial, cnpj, status, dataRegistro,criadoEm, atualizadoEm) VALUES (?, ?,?, ?, ?, ?)`;
        db.run(sql, [razaoSocial, cnpj, status, dataRegistro, criadoEm, atualizadoEm], function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }

            res.status(201).json({
                id: this?.lastID, // Adicionado `?` para evitar erro caso `lastID` não esteja definido
                razaoSocial,
                cnpj,
                status,
                dataRegistro,
                criadoEm,
                atualizadoEm
            });
        });
    });
});

  
  
  

// Listar todas as empresas
router.get("/empresa", (_, res) => {
  db.all("SELECT * FROM Empresa", [], (err, rows: Empresa[]) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(rows);
  });
});

// listar uma empresa
router.get("/empresa/:id", (req: Request, res: Response): void => {
    const { id } = req.params;
    
    db.get(`SELECT * FROM Empresa WHERE id = ?`, [id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!row) {
        return res.status(404).json({ error: "Empresa não encontrada" });
      }
      res.json(row);
    });
  });
  

// atualiza uma empresa
  router.put("/empresa/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const { razaoSocial, cnpj, status } = req.body;
    const atualizadoEm = new Date().toISOString();
  
    db.run(
      `UPDATE Empresa SET razaoSocial = ?, cnpj = ?, status = ?, atualizadoEm = ? WHERE id = ?`,
      [razaoSocial, cnpj, status, atualizadoEm, id],
      function (err: Error | null) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0)
          return res.status(404).json({ error: "Empresa não encontrada" });
        res.json({ id, razaoSocial, cnpj, status, atualizadoEm });
      }
    );
  });
  
//deleta uma empresa
router.delete("/empresa/:id", (req: Request, res: Response) => {
    const { id } = req.params;
  
    db.run(`DELETE FROM Empresa WHERE id = ?`, [id], function (err: Error | null) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0)
        return res.status(404).json({ error: "Empresa não encontrada" });
      res.json({ message: "Empresa deletada" });
    });
  });
  
  

export default router;
