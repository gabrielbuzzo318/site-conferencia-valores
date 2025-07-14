import { Router } from "express";

const router = Router();

// rota health‑check
router.get("/", (_req, res) => {
  res.json({ ok: true, message: "API funcionando 🎉" });
});

// exemplo de rota protegida (futura)
router.get("/ping", (_req, res) => {
  res.json({ pong: true, date: new Date() });
});

export default router;
