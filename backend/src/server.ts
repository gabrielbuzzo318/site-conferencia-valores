import express from "express";
import cors from "cors";
import router from "./routes";   // 👈 importa

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// ⬇️ Usa todas as rotas definidas em routes/index.ts
app.use("/", router);

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
