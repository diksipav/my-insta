import cookieParser from "cookie-parser";
import express from "express";

export function createApp() {
  const app = express();

  // Most managed hosts terminate HTTPS at their edge/load balancer, and forward the req to Express.
  const isProduction = process.env.NODE_ENV === "prod";
  app.set("trust proxy", isProduction ? 1 : false); // todo: check if there's only 1 hop  when u deploy

  app.disable("x-powered-by");

  app.use(express.json({ limit: "100kb" }));
  app.use(cookieParser());

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  return app;
}
