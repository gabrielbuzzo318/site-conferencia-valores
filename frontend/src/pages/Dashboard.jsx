import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { saveAs } from "file-saver";

export default function Dashboard() {
  const [progresso, setProgresso] = useState(0);
  const [resultado, setResultado] = useState([]);

  const upload = async (e) => {
    const files = Array.from(e.target.files);
    const form = new FormData();
    files.forEach((f) => form.append("files", f));

    const { data } = await axios.post("/api/upload", form, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      onUploadProgress: (p) => setProgresso(Math.round((p.loaded * 100) / p.total)),
    });
    setResultado(data.linhas);
  };

  const exportarCSV = () => {
    const header = "Linha,Soma\n";
    const corpo = resultado.map((r) => `\"${r.linha}\",${r.soma}`).join("\n");
    const blob = new Blob([header + corpo], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "conferencia_valores.csv");
  };

  const total = resultado.reduce((a, r) => a + r.soma, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Conferência de Valores</h1>
      <Input multiple accept=".txt,.pdf" onChange={upload} />
      {progresso > 0 && progresso < 100 && <Progress value={progresso} className="h-2" />}
      {resultado.length > 0 && (
        <>
          <Card>
            <CardContent className="max-h-72 overflow-auto font-mono text-sm">
              {resultado.map((r, i) => (
                <div key={i} className="border-b py-1 whitespace-pre-wrap">
                  {r.linha}
                  <span className="float-right font-bold">R$ {r.soma.toFixed(2)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between">
              <span className="font-bold text-lg">Total: R$ {total.toFixed(2)}</span>
              <Button onClick={exportarCSV}>Exportar CSV</Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
