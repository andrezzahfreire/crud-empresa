"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("./database"));
const router = (0, express_1.Router)();
// 1️⃣ Criar uma tarefa
router.post("/tasks", (req, res) => {
    const { title } = req.body;
    if (!title)
        return res.status(400).json({ error: "O título é obrigatório" });
    const sql = `INSERT INTO tasks (title) VALUES (?)`;
    database_1.default.run(sql, [title], function (err) {
        if (err)
            return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, title, completed: false });
    });
});
// 2️⃣ Listar todas as tarefas
router.get("/tasks", (_, res) => {
    database_1.default.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err)
            return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});
// 3️⃣ Atualizar uma tarefa
router.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    database_1.default.run(`UPDATE tasks SET title = ?, completed = ? WHERE id = ?`, [title, completed, id], function (err) {
        if (err)
            return res.status(500).json({ error: err.message });
        if (this.changes === 0)
            return res.status(404).json({ error: "Tarefa não encontrada" });
        res.json({ id, title, completed });
    });
});
// 4️⃣ Deletar uma tarefa
router.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    database_1.default.run(`DELETE FROM tasks WHERE id = ?`, id, function (err) {
        if (err)
            return res.status(500).json({ error: err.message });
        if (this.changes === 0)
            return res.status(404).json({ error: "Tarefa não encontrada" });
        res.json({ message: "Tarefa deletada" });
    });
});
exports.default = router;
