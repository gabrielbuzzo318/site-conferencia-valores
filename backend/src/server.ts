import express from "express";
import cors from "cors";
import path from "path";
import router from "./routes"; // 👈 já tá certo

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// 🔥 Serve arquivos estáticos
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.use("/", router);

app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
