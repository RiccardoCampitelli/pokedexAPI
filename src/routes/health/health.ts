import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/health", (_, res) => {
  res.send({ status: "healthy" });
});

export { healthRouter };
