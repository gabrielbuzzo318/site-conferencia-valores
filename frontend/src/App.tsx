import { useEffect, useState } from "react";
import { DocumentViewer } from "./components/DocumentViewer";

interface Documento {
  id: string;
  nome: string;
  conteudo: string;
  criadoEm: string;
}

export default function App() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [arquivo, setArquivo] = useState<File | null>(null);

  useEffect(() => {
    buscarDocumentos();
  }, []);

  const buscarDocumentos = async () => {
    const res = await fetch("http://localhost:3000/documentos");
    const data = await res.json();
    setDocumentos(data);
  };

  const handleUpload = async () => {
    if (!arquivo) return;

    const form = new FormData();
    form.append("arquivo", arquivo);

    await fetch("http://localhost:3000/upload", {
      method: "POST",
      body: form,
    });

    setArquivo(null);
    buscarDocumentos();
  };

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:3000/documentos/${id}`, {
      method: "DELETE",
    });
    buscarDocumentos();
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>📁 Lista de Documentos</h1>

      <input
        type="file"
        onChange={(e) => setArquivo(e.target.files?.[0] || null)}
      />
      <button onClick={handleUpload} style={{ marginLeft: 10 }}>
        Enviar PDF
      </button>

      <div style={{ marginTop: 30 }}>
        {documentos.map((doc) => (
          <DocumentViewer
            key={doc.id}
            id={doc.id}
            nome={doc.nome}
            conteudo={atob(doc.conteudo)} // decodifica base64
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
