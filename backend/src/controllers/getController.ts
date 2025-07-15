import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getDocumentos = async (req: Request, res: Response) => {
  try {
    const documentos = await prisma.documento.findMany();
    return res.json(documentos);
  } catch (err) {
    return res.status(500).json({ erro: "Erro ao buscar documentos." });
  }
};
