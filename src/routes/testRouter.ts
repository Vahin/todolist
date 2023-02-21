import { testController } from "./../controllers/testController";
import { Router } from "express";

export const getTestRouter = () => {
  const router = Router();
  const db = testController();

  router.delete("/task", (req, res) => {
    db.clearAllTask();
    res.sendStatus(204);
  });

  return router;
};
