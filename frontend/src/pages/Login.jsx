import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const handle = (e) => {
    e.preventDefault();
    login(email, senha);
  };
  return (
    <form onSubmit={handle} className="max-w-sm mx-auto my-24 space-y-4">
      <h1 className="text-2xl font-bold text-center">Entrar</h1>
      <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
      <Button className="w-full">Entrar</Button>
    </form>
  );
}
