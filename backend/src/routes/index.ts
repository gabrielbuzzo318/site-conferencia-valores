import { Router } from "express";
import multer from "multer";
import { uploadArquivo } from "../controllers/uploadController"; // 👈  mesmo nome!

const router = Router();
const upload = multer(); // salva em memória

router.get("/", (_req, res) => {
  res.json({ ok: true, msg: "API funcionando 🎉" });
});

router.post("/upload", upload.single("arquivo"), uploadArquivo); // 👈 usa a função

export default router;

import { getDocumentos } from "../controllers/getController";
router.get("/documentos", getDocumentos);

import { deleteDocumento } from "../controllers/deleteController";


router.delete("/documentos/:id", deleteDocumento); // rota delete
// Outras rotas...
export default router;
