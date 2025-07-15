import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";     // 👈  precisa disso
import pdfParse from "pdf-parse";                // 👈  e disso

const prisma = new PrismaClient();

export const uploadArquivo = async (req: Request, res: Response) => {
  const arquivo = req.file;

  if (!arquivo) {
    return res.status(400).json({ erro: "Arquivo não enviado." });
  }

  const data = await pdfParse(arquivo.buffer);

  const documentoSalvo = await prisma.documento.create({
    data: {
      nome: arquivo.originalname,
      conteudo: data.text || "Sem conteúdo extraído"
    }
  });

  return res.json(documentoSalvo);
};
