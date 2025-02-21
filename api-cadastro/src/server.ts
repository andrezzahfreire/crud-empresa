import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(routes);

app.get("/", (req, res) => {
  res.send("api funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
