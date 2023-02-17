import { Router } from "express";

export const getInitRouter = () => {
  const router = Router();

  router.get("/", (req, res) => {
    res.json({ message: "Hello from new project" });
  });

  return router;
};
