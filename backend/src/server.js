// BACKEND RESUMIDO
import express from "express";
import multer from "multer";
import cors from "cors";
import jwt from "jsonwebtoken";
import pdf from "pdf-parse";
import fs from "fs/promises";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });
const SECRET = process.env.JWT_SECRET || "secret";

app.post("/api/login", async (req, res) => {
  const { email, senha } = req.body;
  if (senha !== "123") return res.status(401).send("Invalid");
  const token = jwt.sign({ email }, SECRET, { expiresIn: "8h" });
  res.json({ token });
});

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.sendStatus(401);
  }
}

app.post("/api/upload", auth, upload.array("files"), async (req, res) => {
  const linhas = [];
  const usuario = req.user.email;

  for (const file of req.files) {
    let texto = "";
    if (file.mimetype === "text/plain") {
      texto = await fs.readFile(file.path, "utf8");
    } else if (file.mimetype === "application/pdf") {
      const dataBuffer = await fs.readFile(file.path);
      const pdfData = await pdf(dataBuffer);
      texto = pdfData.text;
    }
    await fs.unlink(file.path);

    const novas = texto
      .split(/\r?\n/)
      .filter((l) => l.trim())
      .map((linha) => {
        const nums = linha.match(/[-+]?[0-9]*\.?[0-9]+/g);
        const soma = nums ? nums.reduce((a, n) => a + parseFloat(n), 0) : 0;
        return { texto: linha, soma, usuario };
      });

    await prisma.linha.createMany({ data: novas });
    linhas.push(...novas);
  }

  res.json({ linhas });
});

app.get("/api/linhas", auth, async (req, res) => {
  const usuario = req.user.email;
  const linhas = await prisma.linha.findMany({
    where: { usuario },
    orderBy: { criado: "desc" },
  });
  res.json({ linhas });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
