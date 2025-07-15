import { useEffect, useState } from "react";
import DocumentViewer from "./components/DocumentViewer";

interface Documento {
  id: string;
  nome: string;
  conteudo: string;
}

function App() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);

  useEffect(() => {
    async function buscar() {
      const res = await fetch("http://localhost:3000/documentos");
      const data = await res.json();
      setDocumentos(data);
    }

    buscar();
  }, []);

  return (
    <div>
      <h1>Documentos</h1>
      {documentos.map((doc) => (
        <DocumentViewer key={doc.id} nome={doc.nome} conteudo={doc.conteudo} />
      ))}
    </div>
  );
}

export default App;
