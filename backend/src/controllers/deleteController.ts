import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const deleteDocumento = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.documento.delete({ where: { id: Number(id) } });
    return res.json({ ok: true });
  } catch (err) {
    return res.status(500).json({ erro: "Erro ao deletar." });
  }
};
