import { useEffect, useState } from "react";

interface Documento {
  id: string;
  nome: string;
  conteudo: string;   // 👈 novo
  criadoEm: string;
}


function App() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [documentos, setDocumentos] = useState<Documento[]>([]);

  const handleUpload = async () => {
    if (!file) {
      setStatus("Selecione um arquivo primeiro.");
      return;
    }

    const formData = new FormData();
    formData.append("arquivo", file);

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setStatus("Upload feito com sucesso!");
      console.log(result);
      fetchDocumentos(); // Atualiza a lista
    } catch (error) {
      console.error(error);
      setStatus("Erro ao enviar o arquivo.");
    }
  };

  const fetchDocumentos = async () => {
    try {
      const res = await fetch("http://localhost:3000/documentos");
      const data = await res.json();
      setDocumentos(data);
    } catch (err) {
      console.error("Erro ao buscar documentos:", err);
    }
  };

  useEffect(() => {
    fetchDocumentos();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Enviar PDF</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <br />
      <button onClick={handleUpload} style={{ marginTop: "1rem" }}>
        Enviar
      </button>

      <p>{status}</p>

      <h2>Documentos Enviados</h2>
      <ul>
  {documentos.map((doc) => (
    <li key={doc.id} style={{marginBottom:"1rem"}}>
      <strong>{doc.nome}</strong>{" "}
      <small>{new Date(doc.criadoEm).toLocaleString("pt-BR")}</small>
      <p style={{whiteSpace:"pre-wrap", fontSize:"0.9rem", marginTop:4}}>
        {doc.conteudo.substring(0, 300)}…
      </p>
    </li>
  ))}
</ul>

    </div>
  );
}

export default App;

