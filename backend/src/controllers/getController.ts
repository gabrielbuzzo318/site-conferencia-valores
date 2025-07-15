export const getDocumentos = async (req: Request, res: Response) => {
  try {
    const documentos = await prisma.documento.findMany();

    const docsComUrl = documentos.map((doc) => ({
      ...doc,
      url: `http://localhost:3000/uploads/${doc.nome}`, // 👈 ajusta aqui conforme a pasta onde os PDFs são salvos
    }));

    return res.json(docsComUrl);
  } catch (err) {
    return res.status(500).json({ erro: "Erro ao buscar documentos." });
  }
};
